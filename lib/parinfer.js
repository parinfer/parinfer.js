//
// Parinfer 3.12.0
//
// Copyright 2015-2017 © Shaun Lebron
// MIT License
//
// Home Page: http://shaunlebron.github.io/parinfer/
// GitHub: https://github.com/shaunlebron/parinfer
//
// For DOCUMENTATION on this file, please see `doc/code.md`.
// Use `sync.sh` to keep the function/var links in `doc/code.md` accurate.
//

//------------------------------------------------------------------------------
// JS Module Boilerplate
//------------------------------------------------------------------------------

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  }
  else {
    root.parinfer = factory();
  }
}(this, function() { // start module anonymous scope
"use strict";

//------------------------------------------------------------------------------
// Constants / Predicates
//------------------------------------------------------------------------------

// NOTE: this is a performance hack
// The main result object uses a lot of "unsigned integer or null" values.
// Using a negative integer is faster than actual null because it cuts down on
// type coercion overhead.
var UINT_NULL = -999;

var INDENT_MODE = "INDENT_MODE",
    PAREN_MODE = "PAREN_MODE";

var BACKSLASH = '\\',
    BLANK_SPACE = ' ',
    DOUBLE_SPACE = '  ',
    DOUBLE_QUOTE = '"',
    NEWLINE = '\n',
    SEMICOLON = ';',
    TAB = '\t';

var LINE_ENDING_REGEX = /\r?\n/;

var MATCH_PAREN = {
  "{": "}",
  "}": "{",
  "[": "]",
  "]": "[",
  "(": ")",
  ")": "("
};

// toggle this to check the asserts during development
var RUN_ASSERTS = false;

function isBoolean(x) {
  return typeof x === 'boolean';
}

function isArray(x) {
  return Array.isArray(x);
}

function isInteger(x) {
  return typeof x === 'number' &&
         isFinite(x) &&
         Math.floor(x) === x;
}

//------------------------------------------------------------------------------
// Options Structure
//------------------------------------------------------------------------------

function transformChange(change) {
  if (!change) {
    return undefined;
  }

  var newLines = change.newText.split(LINE_ENDING_REGEX);
  var oldLines = change.oldText.split(LINE_ENDING_REGEX);

  // single line case:
  //     (defn foo| [])
  //              ^ newEndX, newEndLineNo
  //           +++

  // multi line case:
  //     (defn foo
  //           ++++
  //        "docstring."
  //     ++++++++++++++++
  //       |[])
  //     ++^ newEndX, newEndLineNo

  var lastOldLineLen = oldLines[oldLines.length-1].length;
  var lastNewLineLen = newLines[newLines.length-1].length;

  var oldEndX = (oldLines.length === 1 ? change.x : 0) + lastOldLineLen;
  var newEndX = (newLines.length === 1 ? change.x : 0) + lastNewLineLen;
  var newEndLineNo = change.lineNo + (newLines.length-1);

  return {
    x: change.x,
    lineNo: change.lineNo,
    oldText: change.oldText,
    newText: change.newText,

    oldEndX: oldEndX,
    newEndX: newEndX,
    newEndLineNo: newEndLineNo,

    lookupLineNo: newEndLineNo,
    lookupX: newEndX
  };
}

function transformChanges(changes) {
  if (changes.length === 0) {
    return null;
  }
  var lines = {};
  var line, i, change;
  for (i=0; i<changes.length; i++) {
    change = transformChange(changes[i]);
    line = lines[change.lookupLineNo];
    if (!line) {
      line = lines[change.lookupLineNo] = {};
    }
    line[change.lookupX] = change;
  }
  return lines;
}

function parseOptions(options) {
  options = options || {};
  return {
    cursorX: options.cursorX,
    cursorLine: options.cursorLine,
    prevCursorX: options.prevCursorX,
    prevCursorLine: options.prevCursorLine,
    selectionStartLine: options.selectionStartLine,
    changes: options.changes,
    partialResult: options.partialResult,
    forceBalance: options.forceBalance,
    returnParens: options.returnParens
  };
}

//------------------------------------------------------------------------------
// Result Structure
//------------------------------------------------------------------------------

// This represents the running result. As we scan through each character
// of a given text, we mutate this structure to update the state of our
// system.

function initialParenTrail() {
  return {
    lineNo: UINT_NULL,       // [integer] - line number of the last parsed paren trail
    startX: UINT_NULL,       // [integer] - x position of first paren in this range
    endX: UINT_NULL,         // [integer] - x position after the last paren in this range
    openers: [],             // [array of stack elements] - corresponding open-paren for each close-paren in this range
    clamped: {
      startX: UINT_NULL,     // startX before paren trail was clamped
      endX: UINT_NULL,       // endX before paren trail was clamped
      openers: []            // openers that were cut out after paren trail was clamped
    }
  };
}

function getInitialResult(text, options, mode, smart) {

  var result = {

    mode: mode,                // [enum] - current processing mode (INDENT_MODE or PAREN_MODE)
    smart: smart,              // [boolean] - smart mode attempts special user-friendly behavior

    origText: text,            // [string] - original text
    origCursorX: UINT_NULL,    // [integer] - original cursorX option
    origCursorLine: UINT_NULL, // [integer] - original cursorLine option

    inputLines:                // [string array] - input lines that we process line-by-line, char-by-char
      text.split(LINE_ENDING_REGEX),
    inputLineNo: -1,           // [integer] - the current input line number
    inputX: -1,                // [integer] - the current input x position of the current character (ch)

    lines: [],                 // [string array] - output lines (with corrected parens or indentation)
    lineNo: -1,                // [integer] - output line number we are on
    ch: "",                    // [string] - character we are processing (can be changed to indicate a replacement)
    x: 0,                      // [integer] - output x position of the current character (ch)
    indentX: UINT_NULL,        // [integer] - x position of the indentation point if present

    parenStack: [],            // We track where we are in the Lisp tree by keeping a stack (array) of open-parens.
                               // Stack elements are objects containing keys {ch, x, lineNo, indentDelta}
                               // whose values are the same as those described here in this result structure.

    tabStops: [],              // In Indent Mode, it is useful for editors to snap a line's indentation
                               // to certain critical points.  Thus, we have a `tabStops` array of objects containing
                               // keys {ch, x, lineNo, argX}, which is just the state of the `parenStack` at the cursor line.

    parenTrail: initialParenTrail(), // the range of parens at the end of a line

    parenTrails: [],           // [array of {lineNo, startX, endX}] - all non-empty parenTrails to be returned

    returnParens: false,       // [boolean] - determines if we return `parens` described below
    parens: [],                // [array of {lineNo, x, closer, children}] - paren tree if `returnParens` is true

    cursorX: UINT_NULL,        // [integer] - x position of the cursor
    cursorLine: UINT_NULL,     // [integer] - line number of the cursor
    prevCursorX: UINT_NULL,    // [integer] - x position of the previous cursor
    prevCursorLine: UINT_NULL, // [integer] - line number of the previous cursor

    selectionStartLine: UINT_NULL, // [integer] - line number of the current selection starting point

    changes: null,             // [object] - mapping change.key to a change object (please see `transformChange` for object structure)

    isInCode: true,            // [boolean] - indicates if we are currently in "code space" (not string or comment)
    isEscaping: false,         // [boolean] - indicates if the next character will be escaped (e.g. `\c`).  This may be inside string, comment, or code.
    isEscaped: false,          // [boolean] - indicates if the current character is escaped (e.g. `\c`).  This may be inside string, comment, or code.
    isInStr: false,            // [boolean] - indicates if we are currently inside a string
    isInComment: false,        // [boolean] - indicates if we are currently inside a comment
    commentX: UINT_NULL,       // [integer] - x position of the start of comment on current line (if any)

    quoteDanger: false,        // [boolean] - indicates if quotes are imbalanced inside of a comment (dangerous)
    trackingIndent: false,     // [boolean] - are we looking for the indentation point of the current line?
    skipChar: false,           // [boolean] - should we skip the processing of the current character?
    success: false,            // [boolean] - was the input properly formatted enough to create a valid result?
    partialResult: false,      // [boolean] - should we return a partial result when an error occurs?
    forceBalance: false,       // [boolean] - should indent mode aggressively enforce paren balance?

    maxIndent: UINT_NULL,      // [integer] - maximum allowed indentation of subsequent lines in Paren Mode
    indentDelta: 0,            // [integer] - how far indentation was shifted by Paren Mode
                               //  (preserves relative indentation of nested expressions)

    trackingArgTabStop: null,  // [string] - enum to track how close we are to the first-arg tabStop in a list
                               //  For example a tabStop occurs at `bar` below:
                               //
                               //         `   (foo    bar`
                               //          00011112222000  <-- state after processing char (enums below)
                               //
                               //         0   null    => not searching
                               //         1   'space' => searching for next space
                               //         2   'arg'   => searching for arg
                               //
                               //    (We create the tabStop when the change from 2->0 happens.)
                               //

    error: {                   // if 'success' is false, return this error to the user
      name: null,              // [string] - Parinfer's unique name for this error
      message: null,           // [string] - error message to display
      lineNo: null,            // [integer] - line number of error
      x: null,                 // [integer] - start x position of error
      extra: {
        name: null,
        lineNo: null,
        x: null
      }
    },
    errorPosCache: {}          // [object] - maps error name to a potential error position
  };

  // Make sure no new properties are added to the result, for type safety.
  // (uncomment only when debugging, since it incurs a perf penalty)
  // Object.preventExtensions(result);
  // Object.preventExtensions(result.parenTrail);

  // merge options if they are valid
  if (options) {
    if (isInteger(options.cursorX))            { result.cursorX            = options.cursorX;
                                                 result.origCursorX        = options.cursorX; }
    if (isInteger(options.cursorLine))         { result.cursorLine         = options.cursorLine;
                                                 result.origCursorLine     = options.cursorLine; }
    if (isInteger(options.prevCursorX))        { result.prevCursorX        = options.prevCursorX; }
    if (isInteger(options.prevCursorLine))     { result.prevCursorLine     = options.prevCursorLine; }
    if (isInteger(options.selectionStartLine)) { result.selectionStartLine = options.selectionStartLine; }
    if (isArray(options.changes))              { result.changes            = transformChanges(options.changes); }
    if (isBoolean(options.partialResult))      { result.partialResult      = options.partialResult; }
    if (isBoolean(options.forceBalance))       { result.forceBalance       = options.forceBalance; }
    if (isBoolean(options.returnParens))       { result.returnParens       = options.returnParens; }
  }

  return result;
}

//------------------------------------------------------------------------------
// Possible Errors
//------------------------------------------------------------------------------

// `result.error.name` is set to any of these
var ERROR_QUOTE_DANGER = "quote-danger";
var ERROR_EOL_BACKSLASH = "eol-backslash";
var ERROR_UNCLOSED_QUOTE = "unclosed-quote";
var ERROR_UNCLOSED_PAREN = "unclosed-paren";
var ERROR_UNMATCHED_CLOSE_PAREN = "unmatched-close-paren";
var ERROR_UNMATCHED_OPEN_PAREN = "unmatched-open-paren";
var ERROR_LEADING_CLOSE_PAREN = "leading-close-paren";
var ERROR_UNHANDLED = "unhandled";

var errorMessages = {};
errorMessages[ERROR_QUOTE_DANGER] = "Quotes must balanced inside comment blocks.";
errorMessages[ERROR_EOL_BACKSLASH] = "Line cannot end in a hanging backslash.";
errorMessages[ERROR_UNCLOSED_QUOTE] = "String is missing a closing quote.";
errorMessages[ERROR_UNCLOSED_PAREN] = "Unclosed open-paren.";
errorMessages[ERROR_UNMATCHED_CLOSE_PAREN] = "Unmatched close-paren.";
errorMessages[ERROR_UNMATCHED_OPEN_PAREN] = "Unmatched open-paren.";
errorMessages[ERROR_LEADING_CLOSE_PAREN] = "Line cannot lead with a close-paren.";
errorMessages[ERROR_UNHANDLED] = "Unhandled error.";

function cacheErrorPos(result, errorName) {
  var e = {
    lineNo: result.lineNo,
    x: result.x,
    inputLineNo: result.inputLineNo,
    inputX: result.inputX
  };
  result.errorPosCache[errorName] = e;
  return e;
}

function error(result, name) {
  var cache = result.errorPosCache[name];

  var keyLineNo = result.partialResult ? 'lineNo' : 'inputLineNo';
  var keyX = result.partialResult ? 'x' : 'inputX';

  var e = {
    parinferError: true,
    name: name,
    message: errorMessages[name],
    lineNo: cache ? cache[keyLineNo] : result[keyLineNo],
    x: cache ? cache[keyX] : result[keyX]
  };
  var opener = peek(result.parenStack, 0);

  if (name === ERROR_UNMATCHED_CLOSE_PAREN) {
    // extra error info for locating the open-paren that it should've matched
    cache = result.errorPosCache[ERROR_UNMATCHED_OPEN_PAREN];
    if (cache || opener) {
      e.extra = {
        name: ERROR_UNMATCHED_OPEN_PAREN,
        lineNo: cache ? cache[keyLineNo] : opener[keyLineNo],
        x: cache ? cache[keyX] : opener[keyX]
      };
    }
  }
  else if (name === ERROR_UNCLOSED_PAREN) {
    e.lineNo = opener[keyLineNo];
    e.x = opener[keyX];
  }
  return e;
}

//------------------------------------------------------------------------------
// String Operations
//------------------------------------------------------------------------------

function replaceWithinString(orig, start, end, replace) {
  return (
    orig.substring(0, start) +
    replace +
    orig.substring(end)
  );
}

if (RUN_ASSERTS) {
  console.assert(replaceWithinString('aaa', 0, 2, '') === 'a');
  console.assert(replaceWithinString('aaa', 0, 1, 'b') === 'baa');
  console.assert(replaceWithinString('aaa', 0, 2, 'b') === 'ba');
}

function repeatString(text, n) {
  var i;
  var result = "";
  for (i = 0; i < n; i++) {
    result += text;
  }
  return result;
}

if (RUN_ASSERTS) {
  console.assert(repeatString('a', 2) === 'aa');
  console.assert(repeatString('aa', 3) === 'aaaaaa');
  console.assert(repeatString('aa', 0) === '');
  console.assert(repeatString('', 0) === '');
  console.assert(repeatString('', 5) === '');
}

function getLineEnding(text) {
  // NOTE: We assume that if the CR char "\r" is used anywhere,
  //       then we should use CRLF line-endings after every line.
  var i = text.search("\r");
  if (i !== -1) {
    return "\r\n";
  }
  return "\n";
}

//------------------------------------------------------------------------------
// Line operations
//------------------------------------------------------------------------------

function isCursorAffected(result, start, end) {
  if (result.cursorX === start &&
      result.cursorX === end) {
    return result.cursorX === 0;
  }
  return result.cursorX >= end;
}

function shiftCursorOnEdit(result, lineNo, start, end, replace) {
  var oldLength = end - start;
  var newLength = replace.length;
  var dx = newLength - oldLength;

  if (dx !== 0 &&
      result.cursorLine === lineNo &&
      result.cursorX !== UINT_NULL &&
      isCursorAffected(result, start, end)) {
    result.cursorX += dx;
  }
}

function replaceWithinLine(result, lineNo, start, end, replace) {
  var line = result.lines[lineNo];
  var newLine = replaceWithinString(line, start, end, replace);
  result.lines[lineNo] = newLine;

  shiftCursorOnEdit(result, lineNo, start, end, replace);
}

function insertWithinLine(result, lineNo, idx, insert) {
  replaceWithinLine(result, lineNo, idx, idx, insert);
}

function initLine(result) {
  result.x = 0;
  result.lineNo++;

  // reset line-specific state
  result.indentX = UINT_NULL;
  result.commentX = UINT_NULL;
  result.indentDelta = 0;
  delete result.errorPosCache[ERROR_UNMATCHED_CLOSE_PAREN];
  delete result.errorPosCache[ERROR_UNMATCHED_OPEN_PAREN];
  delete result.errorPosCache[ERROR_LEADING_CLOSE_PAREN];

  result.trackingArgTabStop = null;
  result.trackingIndent = !result.isInStr;
}

// if the current character has changed, commit its change to the current line.
function commitChar(result, origCh) {
  var ch = result.ch;
  if (origCh !== ch) {
    replaceWithinLine(result, result.lineNo, result.x, result.x + origCh.length, ch);
    result.indentDelta -= (origCh.length - ch.length);
  }
  result.x += ch.length;
}

//------------------------------------------------------------------------------
// Misc Utils
//------------------------------------------------------------------------------

function clamp(val, minN, maxN) {
  if (minN !== UINT_NULL) {
    val = Math.max(minN, val);
  }
  if (maxN !== UINT_NULL) {
    val = Math.min(maxN, val);
  }
  return val;
}

if (RUN_ASSERTS) {
  console.assert(clamp(1, 3, 5) === 3);
  console.assert(clamp(9, 3, 5) === 5);
  console.assert(clamp(1, 3, UINT_NULL) === 3);
  console.assert(clamp(5, 3, UINT_NULL) === 5);
  console.assert(clamp(1, UINT_NULL, 5) === 1);
  console.assert(clamp(9, UINT_NULL, 5) === 5);
  console.assert(clamp(1, UINT_NULL, UINT_NULL) === 1);
}

function peek(arr, idxFromBack) {
  var maxIdx = arr.length - 1;
  if (idxFromBack > maxIdx) {
    return null;
  }
  return arr[maxIdx - idxFromBack];
}

if (RUN_ASSERTS) {
  console.assert(peek(['a'], 0) === 'a');
  console.assert(peek(['a'], 1) === null);
  console.assert(peek(['a', 'b', 'c'], 0) === 'c');
  console.assert(peek(['a', 'b', 'c'], 1) === 'b');
  console.assert(peek(['a', 'b', 'c'], 5) === null);
  console.assert(peek([], 0) === null);
  console.assert(peek([], 1) === null);
}

//------------------------------------------------------------------------------
// Questions about characters
//------------------------------------------------------------------------------

function isOpenParen(ch) {
  return ch === "{" || ch === "(" || ch === "[";
}

function isCloseParen(ch) {
  return ch === "}" || ch === ")" || ch === "]";
}

function isValidCloseParen(parenStack, ch) {
  if (parenStack.length === 0) {
    return false;
  }
  return peek(parenStack, 0).ch === MATCH_PAREN[ch];
}

function isWhitespace(result) {
  var ch = result.ch;
  return !result.isEscaped && (ch === BLANK_SPACE || ch === DOUBLE_SPACE);
}

// can this be the last code character of a list?
function isClosable(result) {
  var ch = result.ch;
  var closer = (isCloseParen(ch) && !result.isEscaped);
  return result.isInCode && !isWhitespace(result) && ch !== "" && !closer;
}

//------------------------------------------------------------------------------
// Advanced operations on characters
//------------------------------------------------------------------------------

function checkCursorHolding(result) {
  var opener = peek(result.parenStack, 0);
  var parent = peek(result.parenStack, 1);
  var holdMinX = parent ? parent.x+1 : 0;
  var holdMaxX = opener.x;

  var holding = (
    result.cursorLine === opener.lineNo &&
    holdMinX <= result.cursorX && result.cursorX <= holdMaxX
  );
  var shouldCheckPrev = !result.changes && result.prevCursorLine !== UINT_NULL;
  if (shouldCheckPrev) {
    var prevHolding = (
      result.prevCursorLine === opener.lineNo &&
      holdMinX <= result.prevCursorX && result.prevCursorX <= holdMaxX
    );
    if (prevHolding && !holding) {
      throw {releaseCursorHold: true};
    }
  }
  return holding;
}

function trackArgTabStop(result, state) {
  if (state === 'space') {
    if (result.isInCode && isWhitespace(result)) {
      result.trackingArgTabStop = 'arg';
    }
  }
  else if (state === 'arg') {
    if (!isWhitespace(result)) {
        var opener = peek(result.parenStack, 0);
        opener.argX = result.x;
        result.trackingArgTabStop = null;
    }
  }
}

//------------------------------------------------------------------------------
// Literal character events
//------------------------------------------------------------------------------

function onOpenParen(result) {
  if (result.isInCode) {
    var opener = {
      inputLineNo: result.inputLineNo,
      inputX: result.inputX,

      lineNo: result.lineNo,
      x: result.x,
      ch: result.ch,
      indentDelta: result.indentDelta,
      maxChildIndent: UINT_NULL
    };

    if (result.returnParens) {
      opener.children = [];
      opener.closer = {
        lineNo: UINT_NULL,
        x: UINT_NULL,
        ch: ''
      };
      var parent = peek(result.parenStack, 0);
      parent = parent ? parent.children : result.parens;
      parent.push(opener);
    }

    result.parenStack.push(opener);
    result.trackingArgTabStop = 'space';
  }
}

function setCloser(opener, lineNo, x, ch) {
  opener.closer.lineNo = lineNo;
  opener.closer.x = x;
  opener.closer.ch = ch;
}

function onMatchedCloseParen(result) {
  var opener = peek(result.parenStack, 0);
  if (result.returnParens) {
    setCloser(opener, result.lineNo, result.x, result.ch);
  }

  result.parenTrail.endX = result.x + 1;
  result.parenTrail.openers.push(opener);

  if (result.mode === INDENT_MODE && result.smart && checkCursorHolding(result)) {
    var origStartX = result.parenTrail.startX;
    var origEndX = result.parenTrail.endX;
    var origOpeners = result.parenTrail.openers;
    resetParenTrail(result, result.lineNo, result.x+1);
    result.parenTrail.clamped.startX = origStartX;
    result.parenTrail.clamped.endX = origEndX;
    result.parenTrail.clamped.openers = origOpeners;
  }
  result.parenStack.pop();
  result.trackingArgTabStop = null;
}

function onUnmatchedCloseParen(result) {
  if (result.mode === PAREN_MODE) {
    var trail = result.parenTrail;
    var inLeadingParenTrail = trail.lineNo === result.lineNo && trail.startX === result.indentX;
    var canRemove = result.smart && inLeadingParenTrail;
    if (!canRemove) {
      throw error(result, ERROR_UNMATCHED_CLOSE_PAREN);
    }
  }
  else if (result.mode === INDENT_MODE && !result.errorPosCache[ERROR_UNMATCHED_CLOSE_PAREN]) {
    cacheErrorPos(result, ERROR_UNMATCHED_CLOSE_PAREN);
    var opener = peek(result.parenStack, 0);
    if (opener) {
      var e = cacheErrorPos(result, ERROR_UNMATCHED_OPEN_PAREN);
      e.inputLineNo = opener.inputLineNo;
      e.inputX = opener.inputX;
    }
  }
  result.ch = "";
}

function onCloseParen(result) {
  if (result.isInCode) {
    if (isValidCloseParen(result.parenStack, result.ch)) {
      onMatchedCloseParen(result);
    }
    else {
      onUnmatchedCloseParen(result);
    }
  }
}

function onTab(result) {
  if (result.isInCode) {
    result.ch = DOUBLE_SPACE;
  }
}

function onSemicolon(result) {
  if (result.isInCode) {
    result.isInComment = true;
    result.commentX = result.x;
    result.trackingArgTabStop = null;
  }
}

function onNewline(result) {
  result.isInComment = false;
  result.ch = "";
}

function onQuote(result) {
  if (result.isInStr) {
    result.isInStr = false;
  }
  else if (result.isInComment) {
    result.quoteDanger = !result.quoteDanger;
    if (result.quoteDanger) {
      cacheErrorPos(result, ERROR_QUOTE_DANGER);
    }
  }
  else {
    result.isInStr = true;
    cacheErrorPos(result, ERROR_UNCLOSED_QUOTE);
  }
}

function onBackslash(result) {
  result.isEscaping = true;
}

function afterBackslash(result) {
  result.isEscaping = false;
  result.isEscaped = true;

  if (result.ch === NEWLINE) {
    if (result.isInCode) {
      throw error(result, ERROR_EOL_BACKSLASH);
    }
    onNewline(result);
  }
}

//------------------------------------------------------------------------------
// Character dispatch
//------------------------------------------------------------------------------

function onChar(result) {
  var ch = result.ch;
  result.isEscaped = false;

  if (result.isEscaping)        { afterBackslash(result); }
  else if (isOpenParen(ch))     { onOpenParen(result); }
  else if (isCloseParen(ch))    { onCloseParen(result); }
  else if (ch === DOUBLE_QUOTE) { onQuote(result); }
  else if (ch === SEMICOLON)    { onSemicolon(result); }
  else if (ch === BACKSLASH)    { onBackslash(result); }
  else if (ch === TAB)          { onTab(result); }
  else if (ch === NEWLINE)      { onNewline(result); }

  ch = result.ch;

  result.isInCode = !result.isInComment && !result.isInStr;

  if (isClosable(result)) {
    resetParenTrail(result, result.lineNo, result.x+ch.length);
  }

  var state = result.trackingArgTabStop;
  if (state) {
     trackArgTabStop(result, state);
  }
}

//------------------------------------------------------------------------------
// Cursor functions
//------------------------------------------------------------------------------

function isCursorLeftOf(cursorX, cursorLine, x, lineNo) {
  return (
    cursorLine === lineNo &&
    x !== UINT_NULL &&
    cursorX !== UINT_NULL &&
    cursorX <= x // inclusive since (cursorX = x) implies (x-1 < cursor < x)
  );
}

function isCursorRightOf(cursorX, cursorLine, x, lineNo) {
  return (
    cursorLine === lineNo &&
    x !== UINT_NULL &&
    cursorX !== UINT_NULL &&
    cursorX > x
  );
}

function isCursorInComment(result, cursorX, cursorLine) {
  return isCursorRightOf(cursorX, cursorLine, result.commentX, result.lineNo);
}

function handleChangeDelta(result) {
  if (result.changes && (result.smart || result.mode === PAREN_MODE)) {
    var line = result.changes[result.inputLineNo];
    if (line) {
      var change = line[result.inputX];
      if (change) {
        result.indentDelta += (change.newEndX - change.oldEndX);
      }
    }
  }
}

//------------------------------------------------------------------------------
// Paren Trail functions
//------------------------------------------------------------------------------

function resetParenTrail(result, lineNo, x) {
  result.parenTrail.lineNo = lineNo;
  result.parenTrail.startX = x;
  result.parenTrail.endX = x;
  result.parenTrail.openers = [];
  result.parenTrail.clamped.startX = UINT_NULL;
  result.parenTrail.clamped.endX = UINT_NULL;
  result.parenTrail.clamped.openers = [];
}

function isCursorClampingParenTrail(result, cursorX, cursorLine) {
  return (
    isCursorRightOf(cursorX, cursorLine, result.parenTrail.startX, result.lineNo) &&
    !isCursorInComment(result, cursorX, cursorLine)
  );
}

// INDENT MODE: allow the cursor to clamp the paren trail
function clampParenTrailToCursor(result) {
  var startX = result.parenTrail.startX;
  var endX = result.parenTrail.endX;

  var clamping = isCursorClampingParenTrail(result, result.cursorX, result.cursorLine);

  if (clamping) {
    var newStartX = Math.max(startX, result.cursorX);
    var newEndX = Math.max(endX, result.cursorX);

    var line = result.lines[result.lineNo];
    var removeCount = 0;
    var i;
    for (i = startX; i < newStartX; i++) {
      if (isCloseParen(line[i])) {
        removeCount++;
      }
    }

    var openers = result.parenTrail.openers;

    result.parenTrail.openers = openers.slice(removeCount);
    result.parenTrail.startX = newStartX;
    result.parenTrail.endX = newEndX;

    result.parenTrail.clamped.openers = openers.slice(0, removeCount);
    result.parenTrail.clamped.startX = startX;
    result.parenTrail.clamped.endX = endX;
  }
}

// INDENT MODE: pops the paren trail from the stack
function popParenTrail(result) {
  var startX = result.parenTrail.startX;
  var endX = result.parenTrail.endX;

  if (startX === endX) {
    return;
  }

  var openers = result.parenTrail.openers;
  while (openers.length !== 0) {
    result.parenStack.push(openers.pop());
  }
}

// Determine which open-paren (if any) on the parenStack should be considered
// the direct parent of the current line (given its indentation point).
// This allows Smart Mode to simulate Paren Mode's structure-preserving
// behavior by adding its `opener.indentDelta` to the current line's indentation.
// (care must be taken to prevent redundant indentation correction, detailed below)
function getParentOpenerIndex(result, indentX) {
  var i;
  for (i=0; i<result.parenStack.length; i++) {
    var opener = peek(result.parenStack, i);

    var currOutside = (opener.x < indentX);

    var prevIndentX = indentX - result.indentDelta;
    var prevOutside = (opener.x - opener.indentDelta < prevIndentX);

    var isParent = false;

    if (prevOutside && currOutside) {
      isParent = true;
    }
    else if (!prevOutside && !currOutside) {
      isParent = false;
    }
    else if (prevOutside && !currOutside) {
      // POSSIBLE FRAGMENTATION
      // (foo    --\
      //            +--- FRAGMENT `(foo bar)` => `(foo) bar`
      // bar)    --/

      // 1. PREVENT FRAGMENTATION
      // ```in
      //   (foo
      // ++
      //   bar
      // ```
      // ```out
      //   (foo
      //     bar
      // ```
      if (result.indentDelta === 0) {
        isParent = true;
      }

      // 2. ALLOW FRAGMENTATION
      // ```in
      // (foo
      //   bar
      // --
      // ```
      // ```out
      // (foo)
      // bar
      // ```
      else if (opener.indentDelta === 0) {
        isParent = false;
      }

      else {
        // TODO: identify legitimate cases where both are nonzero

        // allow the fragmentation by default
        isParent = false;

        // TODO: should we throw to exit instead?  either of:
        // 1. give up, just `throw error(...)`
        // 2. fallback to paren mode to preserve structure
      }
    }
    else if (!prevOutside && currOutside) {
      // POSSIBLE ADOPTION
      // (foo)   --\
      //            +--- ADOPT `(foo) bar` => `(foo bar)`
      //   bar   --/

      var nextOpener = peek(result.parenStack, i+1);

      // 1. DISALLOW ADOPTION
      // ```in
      //   (foo
      // --
      //     (bar)
      // --
      //     baz)
      // ```
      // ```out
      // (foo
      //   (bar)
      //   baz)
      // ```
      // OR
      // ```in
      //   (foo
      // --
      //     (bar)
      // -
      //     baz)
      // ```
      // ```out
      // (foo
      //  (bar)
      //  baz)
      // ```
      if (nextOpener && nextOpener.indentDelta <= opener.indentDelta) {
        // we can only disallow adoption if nextOpener.indentDelta will actually
        // prevent the indentX from being in the opener's threshold.
        if (indentX + nextOpener.indentDelta > opener.x) {
          isParent = true;
        }
        else {
          isParent = false;
        }
      }

      // 2. ALLOW ADOPTION
      // ```in
      // (foo
      //     (bar)
      // --
      //     baz)
      // ```
      // ```out
      // (foo
      //   (bar
      //     baz))
      // ```
      // OR
      // ```in
      //   (foo
      // -
      //     (bar)
      // --
      //     baz)
      // ```
      // ```out
      //  (foo
      //   (bar)
      //    baz)
      // ```
      else if (nextOpener && nextOpener.indentDelta > opener.indentDelta) {
        isParent = true;
      }

      // 3. ALLOW ADOPTION
      // ```in
      //   (foo)
      // --
      //   bar
      // ```
      // ```out
      // (foo
      //   bar)
      // ```
      // OR
      // ```in
      // (foo)
      //   bar
      // ++
      // ```
      // ```out
      // (foo
      //   bar
      // ```
      // OR
      // ```in
      //  (foo)
      // +
      //   bar
      // ++
      // ```
      // ```out
      //  (foo
      //   bar)
      // ```
      else if (result.indentDelta > opener.indentDelta) {
        isParent = true;
      }

      if (isParent) { // if new parent
        // Clear `indentDelta` since it is reserved for previous child lines only.
        opener.indentDelta = 0;
      }
    }

    if (isParent) {
      break;
    }
  }
  return i;
}

// INDENT MODE: correct paren trail from indentation
function correctParenTrail(result, indentX) {
  var parens = "";

  var index = getParentOpenerIndex(result, indentX);
  var i;
  for (i=0; i<index; i++) {
    var opener = result.parenStack.pop();
    result.parenTrail.openers.push(opener);
    var closeCh = MATCH_PAREN[opener.ch];
    parens += closeCh;

    if (result.returnParens) {
      setCloser(opener, result.parenTrail.lineNo, result.parenTrail.startX+i, closeCh);
    }
  }

  if (result.parenTrail.lineNo !== UINT_NULL) {
    replaceWithinLine(result, result.parenTrail.lineNo, result.parenTrail.startX, result.parenTrail.endX, parens);
    result.parenTrail.endX = result.parenTrail.startX + parens.length;
    rememberParenTrail(result);
  }
}

// PAREN MODE: remove spaces from the paren trail
function cleanParenTrail(result) {
  var startX = result.parenTrail.startX;
  var endX = result.parenTrail.endX;

  if (startX === endX ||
      result.lineNo !== result.parenTrail.lineNo) {
    return;
  }

  var line = result.lines[result.lineNo];
  var newTrail = "";
  var spaceCount = 0;
  var i;
  for (i = startX; i < endX; i++) {
    if (isCloseParen(line[i])) {
      newTrail += line[i];
    }
    else {
      spaceCount++;
    }
  }

  if (spaceCount > 0) {
    replaceWithinLine(result, result.lineNo, startX, endX, newTrail);
    result.parenTrail.endX -= spaceCount;
  }
}

// PAREN MODE: append a valid close-paren to the end of the paren trail
function appendParenTrail(result) {
  var opener = result.parenStack.pop();
  var closeCh = MATCH_PAREN[opener.ch];
  if (result.returnParens) {
    setCloser(opener, result.parenTrail.lineNo, result.parenTrail.endX, closeCh);
  }

  setMaxIndent(result, opener);
  insertWithinLine(result, result.parenTrail.lineNo, result.parenTrail.endX, closeCh);

  result.parenTrail.endX++;
  result.parenTrail.openers.push(opener);
  updateRememberedParenTrail(result);
}

function invalidateParenTrail(result) {
  result.parenTrail = initialParenTrail();
}

function checkUnmatchedOutsideParenTrail(result) {
  var cache = result.errorPosCache[ERROR_UNMATCHED_CLOSE_PAREN];
  if (cache && cache.x < result.parenTrail.startX) {
    throw error(result, ERROR_UNMATCHED_CLOSE_PAREN);
  }
}

function setMaxIndent(result, opener) {
  if (opener) {
    var parent = peek(result.parenStack, 0);
    if (parent) {
      parent.maxChildIndent = opener.x;
    }
    else {
      result.maxIndent = opener.x;
    }
  }
}

function rememberParenTrail(result) {
  var trail = result.parenTrail;
  var openers = trail.clamped.openers.concat(trail.openers);
  if (openers.length > 0) {
    var isClamped = trail.clamped.startX !== UINT_NULL;
    var allClamped = trail.openers.length === 0;
    var shortTrail = {
      lineNo: trail.lineNo,
      startX: isClamped ? trail.clamped.startX : trail.startX,
      endX: allClamped ? trail.clamped.endX : trail.endX
    };
    result.parenTrails.push(shortTrail);

    if (result.returnParens) {
      var i;
      for (i=0; i<openers.length; i++) {
        openers[i].closer.trail = shortTrail;
      }
    }
  }
}

function updateRememberedParenTrail(result) {
  var trail = result.parenTrails[result.parenTrails.length-1];
  if (!trail || trail.lineNo !== result.parenTrail.lineNo) {
    rememberParenTrail(result);
  }
  else {
    trail.endX = result.parenTrail.endX;
    if (result.returnParens) {
      var opener = result.parenTrail.openers[result.parenTrail.openers.length-1];
      opener.closer.trail = trail;
    }
  }
}

function finishNewParenTrail(result) {
  if (result.isInStr) {
    invalidateParenTrail(result);
  }
  else if (result.mode === INDENT_MODE) {
    clampParenTrailToCursor(result);
    popParenTrail(result);
  }
  else if (result.mode === PAREN_MODE) {
    setMaxIndent(result, peek(result.parenTrail.openers, 0));
    if (result.lineNo !== result.cursorLine) {
      cleanParenTrail(result);
    }
    rememberParenTrail(result);
  }
}

//------------------------------------------------------------------------------
// Indentation functions
//------------------------------------------------------------------------------

function addIndent(result, delta) {
  var origIndent = result.x;
  var newIndent = origIndent + delta;
  var indentStr = repeatString(BLANK_SPACE, newIndent);
  replaceWithinLine(result, result.lineNo, 0, origIndent, indentStr);
  result.x = newIndent;
  result.indentX = newIndent;
  result.indentDelta += delta;
}

function shouldAddOpenerIndent(result, opener) {
  // Don't add opener.indentDelta if the user already added it.
  // (happens when multiple lines are indented together)
  return (opener.indentDelta !== result.indentDelta);
}

function correctIndent(result) {
  var origIndent = result.x;
  var newIndent = origIndent;
  var minIndent = 0;
  var maxIndent = result.maxIndent;

  var opener = peek(result.parenStack, 0);
  if (opener) {
    minIndent = opener.x + 1;
    maxIndent = opener.maxChildIndent;
    if (shouldAddOpenerIndent(result, opener)) {
      newIndent += opener.indentDelta;
    }
  }

  newIndent = clamp(newIndent, minIndent, maxIndent);

  if (newIndent !== origIndent) {
    addIndent(result, newIndent - origIndent);
  }
}

function onIndent(result) {
  result.indentX = result.x;
  result.trackingIndent = false;

  if (result.quoteDanger) {
    throw error(result, ERROR_QUOTE_DANGER);
  }

  if (result.mode === INDENT_MODE) {

    correctParenTrail(result, result.x);

    var opener = peek(result.parenStack, 0);
    if (opener && shouldAddOpenerIndent(result, opener)) {
      addIndent(result, opener.indentDelta);
    }
  }
  else if (result.mode === PAREN_MODE) {
    correctIndent(result);
  }
}

function checkLeadingCloseParen(result) {
  if (result.errorPosCache[ERROR_LEADING_CLOSE_PAREN] &&
      result.parenTrail.lineNo === result.lineNo) {
    throw error(result, ERROR_LEADING_CLOSE_PAREN);
  }
}

function onLeadingCloseParen(result) {
  if (result.mode === INDENT_MODE) {
    if (!result.forceBalance) {
      if (result.smart) {
        throw {leadingCloseParen: true};
      }
      if (!result.errorPosCache[ERROR_LEADING_CLOSE_PAREN]) {
        cacheErrorPos(result, ERROR_LEADING_CLOSE_PAREN);
      }
    }
    result.skipChar = true;
  }
  if (result.mode === PAREN_MODE) {
    if (!isValidCloseParen(result.parenStack, result.ch)) {
      if (result.smart) {
        result.skipChar = true;
      }
      else {
        throw error(result, ERROR_UNMATCHED_CLOSE_PAREN);
      }
    }
    else if (isCursorLeftOf(result.cursorX, result.cursorLine, result.x, result.lineNo)) {
      resetParenTrail(result, result.lineNo, result.x);
      onIndent(result);
    }
    else {
      appendParenTrail(result);
      result.skipChar = true;
    }
  }
}

function onCommentLine(result) {
  var parenTrailLength = result.parenTrail.openers.length;

  // restore the openers matching the previous paren trail
  var j;
  if (result.mode === PAREN_MODE) {
    for (j=0; j<parenTrailLength; j++) {
      result.parenStack.push(peek(result.parenTrail.openers, j));
    }
  }

  var i = getParentOpenerIndex(result, result.x);
  var opener = peek(result.parenStack, i);
  if (opener) {
    // shift the comment line based on the parent open paren
    if (shouldAddOpenerIndent(result, opener)) {
      addIndent(result, opener.indentDelta);
    }
    // TODO: store some information here if we need to place close-parens after comment lines
  }

  // repop the openers matching the previous paren trail
  if (result.mode === PAREN_MODE) {
    for (j=0; j<parenTrailLength; j++) {
      result.parenStack.pop();
    }
  }
}

function checkIndent(result) {
  if (isCloseParen(result.ch)) {
    onLeadingCloseParen(result);
  }
  else if (result.ch === SEMICOLON) {
    // comments don't count as indentation points
    onCommentLine(result);
    result.trackingIndent = false;
  }
  else if (result.ch !== NEWLINE &&
           result.ch !== BLANK_SPACE &&
           result.ch !== TAB) {
    onIndent(result);
  }
}

function makeTabStop(result, opener) {
  var tabStop = {
    ch: opener.ch,
    x: opener.x,
    lineNo: opener.lineNo
  };
  if (opener.argX != null) {
    tabStop.argX = opener.argX;
  }
  return tabStop;
}

function getTabStopLine(result) {
  return result.selectionStartLine !== UINT_NULL ? result.selectionStartLine : result.cursorLine;
}

function setTabStops(result) {
  if (getTabStopLine(result) !== result.lineNo) {
    return;
  }

  var i;
  for (i=0; i<result.parenStack.length; i++) {
    result.tabStops.push(makeTabStop(result, result.parenStack[i]));
  }

  if (result.mode === PAREN_MODE) {
    for (i=result.parenTrail.openers.length-1; i>=0; i--) {
      result.tabStops.push(makeTabStop(result, result.parenTrail.openers[i]));
    }
  }

  // remove argX if it falls to the right of the next stop
  for (i=1; i<result.tabStops.length; i++) {
    var x = result.tabStops[i].x;
    var prevArgX = result.tabStops[i-1].argX;
    if (prevArgX != null && prevArgX >= x) {
      delete result.tabStops[i-1].argX;
    }
  }
}

//------------------------------------------------------------------------------
// High-level processing functions
//------------------------------------------------------------------------------

function processChar(result, ch) {
  var origCh = ch;

  result.ch = ch;
  result.skipChar = false;

  handleChangeDelta(result);

  if (result.trackingIndent) {
    checkIndent(result);
  }

  if (result.skipChar) {
    result.ch = "";
  }
  else {
    onChar(result);
  }

  commitChar(result, origCh);
}

function processLine(result, lineNo) {
  initLine(result);
  result.lines.push(result.inputLines[lineNo]);

  setTabStops(result);

  var x;
  for (x = 0; x < result.inputLines[lineNo].length; x++) {
    result.inputX = x;
    processChar(result, result.inputLines[lineNo][x]);
  }
  processChar(result, NEWLINE);

  if (!result.forceBalance) {
    checkUnmatchedOutsideParenTrail(result);
    checkLeadingCloseParen(result);
  }

  if (result.lineNo === result.parenTrail.lineNo) {
    finishNewParenTrail(result);
  }
}

function finalizeResult(result) {
  if (result.quoteDanger) { throw error(result, ERROR_QUOTE_DANGER); }
  if (result.isInStr)     { throw error(result, ERROR_UNCLOSED_QUOTE); }

  if (result.parenStack.length !== 0) {
    if (result.mode === PAREN_MODE) {
      throw error(result, ERROR_UNCLOSED_PAREN);
    }
  }
  if (result.mode === INDENT_MODE) {
    initLine(result);
    onIndent(result);
  }
  result.success = true;
}

function processError(result, e) {
  result.success = false;
  if (e.parinferError) {
    delete e.parinferError;
    result.error = e;
  }
  else {
    result.error.name = ERROR_UNHANDLED;
    result.error.message = e.stack;
    throw e;
  }
}

function processText(text, options, mode, smart) {
  var result = getInitialResult(text, options, mode, smart);

  try {
    var i;
    for (i = 0; i < result.inputLines.length; i++) {
      result.inputLineNo = i;
      processLine(result, i);
    }
    finalizeResult(result);
  }
  catch (e) {
    if (e.leadingCloseParen || e.releaseCursorHold) {
      return processText(text, options, PAREN_MODE, smart);
    }
    processError(result, e);
  }

  return result;
}

//------------------------------------------------------------------------------
// Public API
//------------------------------------------------------------------------------

function publicResult(result) {
  var lineEnding = getLineEnding(result.origText);
  var final;
  if (result.success) {
    final = {
      text: result.lines.join(lineEnding),
      cursorX: result.cursorX,
      cursorLine: result.cursorLine,
      success: true,
      tabStops: result.tabStops,
      parenTrails: result.parenTrails
    };
    if (result.returnParens) {
      final.parens = result.parens;
    }
  }
  else {
    final = {
      text: result.partialResult ? result.lines.join(lineEnding) : result.origText,
      cursorX: result.partialResult ? result.cursorX : result.origCursorX,
      cursorLine: result.partialResult ? result.cursorLine : result.origCursorLine,
      parenTrails: result.partialResult ? result.parenTrails : null,
      success: false,
      error: result.error
    };
    if (result.partialResult && result.returnParens) {
      final.parens = result.parens;
    }
  }
  if (final.cursorX === UINT_NULL) { delete final.cursorX; }
  if (final.cursorLine === UINT_NULL) { delete final.cursorLine; }
  if (final.tabStops && final.tabStops.length === 0) { delete final.tabStops; }
  return final;
}

function indentMode(text, options) {
  options = parseOptions(options);
  return publicResult(processText(text, options, INDENT_MODE));
}

function parenMode(text, options) {
  options = parseOptions(options);
  return publicResult(processText(text, options, PAREN_MODE));
}

function smartMode(text, options) {
  options = parseOptions(options);
  var smart = options.selectionStartLine == null;
  return publicResult(processText(text, options, INDENT_MODE, smart));
}

var API = {
  version: "3.12.0",
  indentMode: indentMode,
  parenMode: parenMode,
  smartMode: smartMode
};

return API;

})); // end module anonymous scope
