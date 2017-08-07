//
// Parinfer 3.10.0
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
    lineStart: UINT_NULL,    // [integer] - start offset of the line of the paren trail
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

    lineNo: -1,                // [integer] - line number we are processing
    ch: "",                    // [string] - character we are processing (can be changed to indicate a replacement)
    x: 0,                      // [integer] - x position of the current character (ch)
    offset: 0,                 // [integer] - current char offset in input document
    lineStart: 0,              // [integer] - the offset at which the current line starts
    nextLineStart: 0,          // [integer] - the offset at which the next line will start

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
    errorPosCache: {},         // [object] - maps error name to a potential error position
    edits: []                  // [object] - list of {startOffset, endOffset, replacement} to apply to original text
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
    x: result.x
  };
  result.errorPosCache[errorName] = e;
  return e;
}

function error(result, name) {
  var cache = result.errorPosCache[name];

  var e = {
    parinferError: true,
    name: name,
    message: errorMessages[name],
    lineNo: cache ? cache.lineNo : result.lineNo,
    x: cache ? cache.x : result.x
  };
  var opener = peek(result.parenStack, 0);

  if (name === ERROR_UNMATCHED_CLOSE_PAREN) {
    // extra error info for locating the open-paren that it should've matched
    cache = result.errorPosCache[ERROR_UNMATCHED_OPEN_PAREN];
    if (cache || opener) {
      e.extra = {
        name: ERROR_UNMATCHED_OPEN_PAREN,
        lineNo: cache ? cache.lineNo : opener.lineNo,
        x: cache ? cache.x : opener.x
      };
    }
  }
  else if (name === ERROR_UNCLOSED_PAREN) {
    e.lineNo = opener.lineNo;
    e.x = opener.x;
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

function isInsertion(edit) {
  return edit.startOffset === edit.endOffset && edit.replacement.length > 0
}

function replaceWithinLine(result, lineNo, lineStart, start, end, replace) {
  if (start === end && replace.length === 0) return;

  var startOffset = lineStart + start;
  var endOffset = lineStart + end;

  if (start !== end && replace.length > 0 && result.origText.substring(startOffset, endOffset) === replace) return;

  var edit = {startOffset: startOffset, endOffset: endOffset, replace: replace};

  // Maintain the edits array in sorted order.
  if (result.edits.length === 0) {
    result.edits.push(edit);
  } else {
    var last = result.edits[result.edits.length - 1];
    if (last.endOffset <= startOffset) {
      result.edits.push(edit)
    } else {
      var i;
      for (i = 0; i < result.edits.length; i++) {
        if (startOffset < result.edits[i].startOffset ||
            (startOffset === result.edits[i].startOffset && !isInsertion(result.edits[i]))) {
          var startIndex = i;
          var endIndex = i;
          while (endIndex < result.edits.size &&
                 result.edits[endIndex].startOffset >= startOffset &&
                 (result.edits[endIndex].endOffset < endOffset ||
                  (result.edits[endIndex].endOffset === endOffset && !isInsertion(result.edits[endIndex])))) {
            endIndex++;
          }
          result.edits.splice(startIndex, endIndex, edit);
          break
        }
      }
    }
  }

  shiftCursorOnEdit(result, lineNo, start, end, replace);
}

function insertWithinLine(result, lineNo, lineStart, idx, insert) {
  replaceWithinLine(result, lineNo, lineStart, idx, idx, insert);
}

function initLine(result) {
  result.x = 0;
  result.lineNo++;
  result.lineStart = result.offset;

  // reset line-specific state
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
    replaceWithinLine(result, result.lineNo, result.lineStart, result.x, result.x + origCh.length, ch);
    result.indentDelta -= (origCh.length - ch.length);
  }
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
  return !result.isEscaped && (ch === BLANK_SPACE || ch === DOUBLE_SPACE || ch === NEWLINE);
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
    resetParenTrail(result, result.x + 1);
    result.parenTrail.clamped.startX = origStartX;
    result.parenTrail.clamped.endX = origEndX;
    result.parenTrail.clamped.openers = origOpeners;
  }
  result.parenStack.pop();
  result.trackingArgTabStop = null;
}

function onUnmatchedCloseParen(result) {
  if (result.mode === PAREN_MODE) {
    throw error(result, ERROR_UNMATCHED_CLOSE_PAREN);
  }
  if (!result.errorPosCache[ERROR_UNMATCHED_CLOSE_PAREN]) {
    cacheErrorPos(result, ERROR_UNMATCHED_CLOSE_PAREN);
    var opener = peek(result.parenStack, 0);
    if (opener) {
      cacheErrorPos(result, ERROR_UNMATCHED_OPEN_PAREN);
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
  if (!result.forceBalance) {
    checkUnmatchedOutsideParenTrail(result);
    checkLeadingCloseParen(result);
  }

  if (result.lineNo === result.parenTrail.lineNo) {
    finishNewParenTrail(result);
  }

  result.isInComment = false;
  result.nextLineStart = result.offset + 1
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
  cacheErrorPos(result, ERROR_EOL_BACKSLASH);
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
    resetParenTrail(result, result.x + ch.length);
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
    var line = result.changes[result.lineNo];
    if (line) {
      var change = line[result.x];
      if (change) {
        result.indentDelta += (change.newEndX - change.oldEndX);
      }
    }
  }
}

//------------------------------------------------------------------------------
// Paren Trail functions
//------------------------------------------------------------------------------

function resetParenTrail(result, x) {
  result.parenTrail.lineNo = result.lineNo;
  result.parenTrail.lineStart = result.lineStart;
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

    var text = result.origText;
    var removeCount = 0;
    var i;
    for (i = result.lineStart + startX; i < result.lineStart + newStartX; i++) {
      if (isCloseParen(text[i])) {
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

function getParentOpenerIndex(result, indentX) {
  var i;
  for (i=0; i<result.parenStack.length; i++) {
    var opener = peek(result.parenStack, i);
    var currOutside = (opener.x < indentX);
    var prevOutside = (opener.x - opener.indentDelta < indentX);

    if (prevOutside) {
      // If an open-paren WAS outside, its `indentDelta` will be used to KEEP IT
      // outside, by adjusting the indentation of its child lines.
      break;
    }
    if (currOutside) {
      // If an open-paren was JUST pushed outside and its parent open-paren was
      // not pushed by same amount, new child line(s) will be adopted.
      // Clear `indentDelta` since it is reserved for previous child lines only.
      var nextOpener = peek(result.parenStack, i+1);
      if (!nextOpener || nextOpener.indentDelta !== opener.indentDelta) {
        opener.indentDelta = 0;
        break;
      }
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
    replaceWithinLine(result, result.parenTrail.lineNo, result.parenTrail.lineStart, result.parenTrail.startX, result.parenTrail.endX, parens);
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

  var text = result.origText;
  var newTrail = "";
  var spaceCount = 0;
  var i;
  for (i = result.lineStart + startX; i < result.lineStart + endX; i++) {
    if (isCloseParen(text[i])) {
      newTrail += text[i];
    }
    else {
      spaceCount++;
    }
  }

  if (spaceCount > 0) {
    replaceWithinLine(result, result.lineNo, result.lineStart, startX, endX, newTrail);
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
  insertWithinLine(result, result.parenTrail.lineNo, result.parenTrail.lineStart, result.parenTrail.endX, closeCh);

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
  replaceWithinLine(result, result.lineNo, result.lineStart, 0, origIndent, indentStr);
  result.x = newIndent;
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
      throw error(result, ERROR_UNMATCHED_CLOSE_PAREN);
    }
    if (isCursorLeftOf(result.cursorX, result.cursorLine, result.x, result.lineNo)) {
      onIndent(result);
    }
    else {
      appendParenTrail(result);
      result.skipChar = true;
    }
  }
}

function shiftCommentLine(result) {
  var parenTrailLength = result.parenTrail.openers.length;

  // restore the openers matching the previous paren trail
  var j;
  if (result.mode === PAREN_MODE) {
    for (j=0; j<parenTrailLength; j++) {
      result.parenStack.push(peek(result.parenTrail.openers, j));
    }
  }

  // shift the comment line based on the parent open paren
  var i = getParentOpenerIndex(result, result.x);
  var opener = peek(result.parenStack, i);
  if (opener && shouldAddOpenerIndent(result, opener)) {
    addIndent(result, opener.indentDelta);
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
    shiftCommentLine(result);
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
  if (opener.argX !== null) {
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
    if (prevArgX !== null && prevArgX >= x) {
      delete result.tabStops[i-1].argX;
    }
  }
}

//------------------------------------------------------------------------------
// High-level processing functions
//------------------------------------------------------------------------------

function processChar(result, ch) {
  if (result.offset === result.nextLineStart) {
    initLine(result);

    setTabStops(result);
  }

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

function finalizeResult(result) {
  if (!result.forceBalance) {
    checkUnmatchedOutsideParenTrail(result);
    checkLeadingCloseParen(result);
  }

  if (result.lineNo === result.parenTrail.lineNo) {
    finishNewParenTrail(result);
  }

  if (result.quoteDanger) { throw error(result, ERROR_QUOTE_DANGER); }
  if (result.isInStr)     { throw error(result, ERROR_UNCLOSED_QUOTE); }

  if (result.parenStack.length !== 0) {
    if (result.mode === PAREN_MODE) {
      throw error(result, ERROR_UNCLOSED_PAREN);
    }
  }
  if (result.mode === INDENT_MODE) {
    result.x = 0;
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
    for (i = 0; i < result.origText.length; i++) {
      result.offset = i;
      processChar(result, result.origText[i]);
      result.x++;
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

function resultText(result) {
  var text = result.origText;
  var resultText = "";
  var resultOffset = 0;        // Offset in result in original source coords

  var i;
  for (i = 0; i < result.edits.length; i++) {
    var edit = result.edits[i];
    if (edit.startOffset > resultOffset) {
      resultText = resultText + text.substring(resultOffset, edit.startOffset);
    }
    resultText = resultText + edit.replace;
    resultOffset = edit.endOffset;
  }

  if (resultOffset < text.length) {
    resultText = resultText + text.substring(resultOffset);
  }

  return resultText;
}

function publicResult(result) {
  var final;
  if (result.success) {
    final = {
      text: resultText(result),
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
      text: result.partialResult ? resultText(result) : result.origText,
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
  var smart = options.selectionStartLine === null;
  return publicResult(processText(text, options, INDENT_MODE, smart));
}

var API = {
  version: "3.10.0",
  indentMode: indentMode,
  parenMode: parenMode,
  smartMode: smartMode
};

return API;

})); // end module anonymous scope
