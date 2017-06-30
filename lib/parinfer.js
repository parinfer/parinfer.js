//
// Parinfer 2.3.1
//
// Copyright 2015-2016 © Shaun LeBron
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
// The main result object uses a lot of "Integer or null" values.
// Using a sentinel integer is faster than actual null because it cuts down on
// type coercion overhead.
// https://en.wikipedia.org/wiki/Sentinel_value
var SENTINEL_NULL = -999;

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

function isBoolean(x) {
  return typeof x === 'boolean';
}

function isInteger(x) {
  return typeof x === 'number' &&
         isFinite(x) &&
         Math.floor(x) === x;
}

function isOpenParen(c) {
  return c === "{" || c === "(" || c === "[";
}

function isCloseParen(c) {
  return c === "}" || c === ")" || c === "]";
}

//------------------------------------------------------------------------------
// Options Structure
//------------------------------------------------------------------------------

function parseOptions(options) {
  options = options || {};
  return {
    cursorX: options.cursorX,
    cursorLine: options.cursorLine,
    cursorDx: options.cursorDx,
    partialResult: options.partialResult
  };
}

//------------------------------------------------------------------------------
// Result Structure
//------------------------------------------------------------------------------

// This represents the running result. As we scan through each character
// of a given text, we mutate this structure to update the state of our
// system.

function getInitialResult(text, options, mode) {

  var result = {

    mode: mode,                // [enum] - current processing mode (INDENT_MODE or PAREN_MODE)

    origText: text,            // [string] - original text
    origCursorX: SENTINEL_NULL,
    origCursorLine: SENTINEL_NULL,

    inputLines:                // [string array] - input lines that we process line-by-line, char-by-char
      text.split(LINE_ENDING_REGEX),
    inputLineNo: -1,           // [integer] - the current input line number
    inputX: -1,                // [integer] - the current input x position of the current character (ch)

    lines: [],                 // [string array] - output lines (with corrected parens or indentation)
    lineNo: -1,                // [integer] - output line number we are on
    ch: "",                    // [string] - character we are processing (can be changed to indicate a replacement)
    x: 0,                      // [integer] - output x position of the current character (ch)

    parenStack: [],            // We track where we are in the Lisp tree by keeping a stack (array) of open-parens.
                               // Stack elements are objects containing keys {ch, x, lineNo, indentDelta}
                               // whose values are the same as those described here in this result structure.
    tabStops: [],              // In Indent Mode, it is useful for editors to snap a line's indentation
                               // to certain critical points.  Thus, we have a `tabStops` array of objects containing
                               // keys {ch, x, lineNo}, which is just the state of the `parenStack` at the cursor line.

    parenTrail: {              // the range of parens at the end of a line
      lineNo: SENTINEL_NULL,   // [integer] - line number of the last parsed paren trail
      startX: SENTINEL_NULL,   // [integer] - x position of first paren in this range
      endX: SENTINEL_NULL,     // [integer] - x position after the last paren in this range
      openers: []              // [array of stack elements] - corresponding open-paren for each close-paren in this range
    },

    cursorX: SENTINEL_NULL,    // [integer] - x position of the cursor
    cursorLine: SENTINEL_NULL, // [integer] - line number of the cursor
    cursorDx: SENTINEL_NULL,   // [integer] - amount that the cursor moved horizontally if something was inserted or deleted

    isInCode: true,            // [boolean] - indicates if we are currently in "code space" (not string or comment)
    isEscaping: false,         // [boolean] - indicates if the next character will be escaped (e.g. `\c`).  This may be inside string, comment, or code.
    isInStr: false,            // [boolean] - indicates if we are currently inside a string
    isInComment: false,        // [boolean] - indicates if we are currently inside a comment
    commentX: SENTINEL_NULL,   // [integer] - x position of the start of comment on current line (if any)

    quoteDanger: false,        // [boolean] - indicates if quotes are imbalanced inside of a comment (dangerous)
    trackingIndent: false,     // [boolean] - are we looking for the indentation point of the current line?
    skipChar: false,           // [boolean] - should we skip the processing of the current character?
    success: false,            // [boolean] - was the input properly formatted enough to create a valid result?
    partialResult: false,      // [boolean] - should we return a partial result when an error occurs?

    maxIndent: SENTINEL_NULL,  // [integer] - maximum allowed indentation of subsequent lines in Paren Mode
    indentDelta: 0,            // [integer] - how far indentation was shifted by Paren Mode
                               //  (preserves relative indentation of nested expressions)
    nextIndentDelta: 0,        // [integer] - allows a previous line to set indentDelta of next line

    error: {                   // if 'success' is false, return this error to the user
      name: SENTINEL_NULL,     // [string] - Parinfer's unique name for this error
      message: SENTINEL_NULL,  // [string] - error message to display
      lineNo: SENTINEL_NULL,   // [integer] - line number of error
      x: SENTINEL_NULL,        // [integer] - start x position of error
      extra: {
        name: SENTINEL_NULL,
        lineNo: SENTINEL_NULL,
        x: SENTINEL_NULL
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
    if (isInteger(options.cursorDx))           { result.cursorDx           = options.cursorDx; }
    if (isBoolean(options.partialResult))      { result.partialResult      = options.partialResult; }
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
var ERROR_UNHANDLED = "unhandled";

var errorMessages = {};
errorMessages[ERROR_QUOTE_DANGER] = "Quotes must balanced inside comment blocks.";
errorMessages[ERROR_EOL_BACKSLASH] = "Line cannot end in a hanging backslash.";
errorMessages[ERROR_UNCLOSED_QUOTE] = "String is missing a closing quote.";
errorMessages[ERROR_UNCLOSED_PAREN] = "Unclosed open-paren.";
errorMessages[ERROR_UNMATCHED_CLOSE_PAREN] = "Unmatched close-paren.";
errorMessages[ERROR_UNMATCHED_OPEN_PAREN] = "Unmatched open-paren.";
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
  var opener = peek(result.parenStack);

  if (name === ERROR_UNMATCHED_CLOSE_PAREN) {
    // extra error info for locating the open-paren that it should've matched
    cache = result.errorPosCache[ERROR_UNMATCHED_OPEN_PAREN];
    if (cache || opener !== SENTINEL_NULL) {
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

function repeatString(text, n) {
  var i;
  var result = "";
  for (i = 0; i < n; i++) {
    result += text;
  }
  return result;
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
      result.cursorX !== SENTINEL_NULL &&
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

function initLine(result, line) {
  result.x = 0;
  result.lineNo++;
  result.lines.push(line);

  // reset line-specific state
  result.commentX = SENTINEL_NULL;
  result.indentDelta = result.nextIndentDelta;
  result.nextIndentDelta = 0;
  delete result.errorPosCache[ERROR_UNMATCHED_CLOSE_PAREN];
  delete result.errorPosCache[ERROR_UNMATCHED_OPEN_PAREN];
}

// if the current character has changed, commit its change to the current line.
function commitChar(result, origCh) {
  var ch = result.ch;
  if (origCh !== ch) {
    replaceWithinLine(result, result.lineNo, result.x, result.x + origCh.length, ch);
  }
  result.x += ch.length;
}

//------------------------------------------------------------------------------
// Misc Utils
//------------------------------------------------------------------------------

function clamp(val, minN, maxN) {
  if (minN !== SENTINEL_NULL) {
    val = Math.max(minN, val);
  }
  if (maxN !== SENTINEL_NULL) {
    val = Math.min(maxN, val);
  }
  return val;
}

function peek(array) {
  if (array.length === 0) {
    return SENTINEL_NULL;
  }
  return array[array.length - 1];
}

//------------------------------------------------------------------------------
// Character functions
//------------------------------------------------------------------------------

function isValidCloseParen(parenStack, ch) {
  if (parenStack.length === 0) {
    return false;
  }
  return peek(parenStack).ch === MATCH_PAREN[ch];
}

function onOpenParen(result) {
  if (result.isInCode) {
    result.parenStack.push({
      inputLineNo: result.inputLineNo,
      inputX: result.inputX,

      lineNo: result.lineNo,
      x: result.x,
      ch: result.ch,
      indentDelta: result.indentDelta
    });
  }
}

function onMatchedCloseParen(result) {
  var opener = peek(result.parenStack);
  result.parenTrail.endX = result.x + 1;
  result.parenTrail.openers.push(opener);
  result.maxIndent = opener.x;
  result.parenStack.pop();
}

function onUnmatchedCloseParen(result) {
  if (result.mode === PAREN_MODE) {
    throw error(result, ERROR_UNMATCHED_CLOSE_PAREN);
  }
  if (!result.errorPosCache[ERROR_UNMATCHED_CLOSE_PAREN]) {
    cacheErrorPos(result, ERROR_UNMATCHED_CLOSE_PAREN);
    var opener = peek(result.parenStack);
    if (opener !== SENTINEL_NULL) {
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

  if (result.ch === NEWLINE) {
    if (result.isInCode) {
      throw error(result, ERROR_EOL_BACKSLASH);
    }
    onNewline(result);
  }
}

function onChar(result) {
  var ch = result.ch;
  var escaped = result.isEscaping;
  if (escaped)                  { afterBackslash(result); }
  else if (isOpenParen(ch))     { onOpenParen(result); }
  else if (isCloseParen(ch))    { onCloseParen(result); }
  else if (ch === DOUBLE_QUOTE) { onQuote(result); }
  else if (ch === SEMICOLON)    { onSemicolon(result); }
  else if (ch === BACKSLASH)    { onBackslash(result); }
  else if (ch === TAB)          { onTab(result); }
  else if (ch === NEWLINE)      { onNewline(result); }

  result.isInCode = !result.isInComment && !result.isInStr;

  ch = result.ch;
  var blank = ch === "" || ch === BLANK_SPACE || ch === DOUBLE_SPACE;
  var trailable = !blank && !isCloseParen(ch);
  if (result.isInCode && (escaped || trailable)) {
    resetParenTrail(result, result.lineNo, result.x+ch.length);
  }
}

//------------------------------------------------------------------------------
// Cursor functions
//------------------------------------------------------------------------------

function isCursorOnLeft(result) {
  return (
    result.lineNo === result.cursorLine &&
    result.cursorX !== SENTINEL_NULL &&
    result.cursorX <= result.x
  );
}

function isCursorOnRight(result, x) {
  return (
    result.lineNo === result.cursorLine &&
    result.cursorX !== SENTINEL_NULL &&
    x !== SENTINEL_NULL &&
    result.cursorX > x
  );
}

function isCursorInComment(result) {
  return isCursorOnRight(result, result.commentX);
}

function handleCursorDelta(result) {
  var hasCursorDelta = (
    result.cursorDx !== SENTINEL_NULL &&
    result.cursorLine === result.lineNo &&
    result.cursorX === result.x
  );

  if (hasCursorDelta) {
    result.indentDelta += result.cursorDx;
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
  result.maxIndent = SENTINEL_NULL;
}

// INDENT MODE: allow the cursor to clamp the paren trail
function clampParenTrailToCursor(result) {
  var startX = result.parenTrail.startX;
  var endX = result.parenTrail.endX;

  var isCursorClamping = (
    isCursorOnRight(result, startX) &&
    !isCursorInComment(result)
  );

  if (isCursorClamping) {
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

    result.parenTrail.openers.splice(0, removeCount);
    result.parenTrail.startX = newStartX;
    result.parenTrail.endX = newEndX;
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

// INDENT MODE: correct paren trail from indentation
function correctParenTrail(result, indentX) {
  var parens = "";

  while (result.parenStack.length > 0) {
    var opener = peek(result.parenStack);
    if (opener.x >= indentX) {
      result.parenStack.pop();
      parens += MATCH_PAREN[opener.ch];
    }
    else {
      break;
    }
  }

  if (result.parenTrail.lineNo !== SENTINEL_NULL) {
    replaceWithinLine(result, result.parenTrail.lineNo, result.parenTrail.startX, result.parenTrail.endX, parens);
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

  result.maxIndent = opener.x;
  insertWithinLine(result, result.parenTrail.lineNo, result.parenTrail.endX, closeCh);
  result.parenTrail.endX++;
}

function invalidateParenTrail(result) {
  result.parenTrail = {
    lineNo: SENTINEL_NULL,
    startX: SENTINEL_NULL,
    endX: SENTINEL_NULL,
    openers: []
  };
}

function checkUnmatchedOutsideParenTrail(result) {
  var cache = result.errorPosCache[ERROR_UNMATCHED_CLOSE_PAREN];
  if (cache && cache.x < result.parenTrail.startX) {
    throw error(result, ERROR_UNMATCHED_CLOSE_PAREN);
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
    if (result.lineNo !== result.cursorLine) {
      cleanParenTrail(result);
    }
  }
}

//------------------------------------------------------------------------------
// Indentation functions
//------------------------------------------------------------------------------

function correctIndent(result) {
  var origIndent = result.x;
  var newIndent = origIndent;
  var minIndent = 0;
  var maxIndent = result.maxIndent;

  var opener = peek(result.parenStack);
  if (opener !== SENTINEL_NULL) {
    minIndent = opener.x + 1;
    newIndent += opener.indentDelta;
  }

  newIndent = clamp(newIndent, minIndent, maxIndent);

  if (newIndent !== origIndent) {
    var indentStr = repeatString(BLANK_SPACE, newIndent);
    replaceWithinLine(result, result.lineNo, 0, origIndent, indentStr);
    result.x = newIndent;
    result.indentDelta += (newIndent - origIndent);
  }
}

function onIndent(result) {
  result.trackingIndent = false;

  if (result.quoteDanger) {
    throw error(result, ERROR_QUOTE_DANGER);
  }

  if (result.mode === INDENT_MODE) {
    correctParenTrail(result, result.x);
  }
  else if (result.mode === PAREN_MODE) {
    correctIndent(result);
  }
}

function onLeadingCloseParen(result) {
  result.skipChar = true;
  if (result.mode === INDENT_MODE) {
    throw {indentModeLeadingCloseParen: true};
  }
  if (result.mode === PAREN_MODE) {
    if (!isValidCloseParen(result.parenStack, result.ch)) {
      throw error(result, ERROR_UNMATCHED_CLOSE_PAREN);
    }
    if (isCursorOnLeft(result)) {
      result.skipChar = false;
      onIndent(result);
    }
    else {
      appendParenTrail(result);
    }
  }
}

function checkIndent(result) {
  if (isCloseParen(result.ch)) {
    onLeadingCloseParen(result);
  }
  else if (result.ch === SEMICOLON) {
    // comments don't count as indentation points
    result.trackingIndent = false;
  }
  else if (result.ch !== NEWLINE &&
           result.ch !== BLANK_SPACE &&
           result.ch !== TAB) {
    onIndent(result);
  }
}

function initIndent(result) {
  if (result.mode === INDENT_MODE) {
    result.trackingIndent = (
      result.parenStack.length !== 0 &&
      !result.isInStr
    );
  }
  else if (result.mode === PAREN_MODE) {
    result.trackingIndent = !result.isInStr;
  }
}

function setTabStops(result) {
  if (result.cursorLine !== result.lineNo ||
      result.mode !== INDENT_MODE) {
    return;
  }

  var i,e;
  for (i=0; i<result.parenStack.length; i++) {
    e = result.parenStack[i];
    result.tabStops.push({
      ch: e.ch,
      x: e.x,
      lineNo: e.lineNo
    });
  }
}

//------------------------------------------------------------------------------
// High-level processing functions
//------------------------------------------------------------------------------

function processChar(result, ch) {
  var origCh = ch;

  result.ch = ch;
  result.skipChar = false;

  if (result.mode === PAREN_MODE) {
    handleCursorDelta(result);
  }

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
  initLine(result, result.inputLines[lineNo]);
  initIndent(result);

  setTabStops(result);

  var x;
  for (x = 0; x < result.inputLines[lineNo].length; x++) {
    result.inputX = x;
    processChar(result, result.inputLines[lineNo][x]);
  }
  processChar(result, NEWLINE);

  checkUnmatchedOutsideParenTrail(result);

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
  }
}

function processText(text, options, mode) {
  var result = getInitialResult(text, options, mode);

  try {
    var i;
    for (i = 0; i < result.inputLines.length; i++) {
      result.inputLineNo = i;
      processLine(result, i);
    }
    finalizeResult(result);
  }
  catch (e) {
    if (e.indentModeLeadingCloseParen) {
      return processText(text, options, PAREN_MODE);
    }
    processError(result, e);
  }

  return result;
}

//------------------------------------------------------------------------------
// Test Helper functions
//------------------------------------------------------------------------------

function test_error(lineNo, msg) {
  throw "test parse error at line " + lineNo + ": " + msg;
}

function test_parseCaretLine(options, lineNo, line) {
  var cursorDxMatch = line.match(/^\s*\^\s*cursorDx (-?\d+)\s*$/);
  var hasMatch = cursorDxMatch;
  if (hasMatch) {
    var x = line.indexOf("^");
    if (x != options.cursorX) {
      test_error(lineNo, "the ^ annotation does not point to a cursor.");
    }
    if (cursorDxMatch) {
      options.cursorDx = parseInt(cursorDxMatch[1], 10);
    }
  }
  return hasMatch;
}

function test_parseCursorFromLine(options, lineNo, line) {
  var cursorX = line.indexOf("|");
  if (cursorX !== -1) {
    if (options.cursorX) {
      test_error(lineNo, "only one cursor allowed.  cursor already found at line", options.cursorLine);
    }
    var lineClean = line.split("|").join("");
    if (lineClean.length < line.length - 1) {
      test_error(lineNo, "only one cursor allowed");
    }
    line = lineClean;
    options.cursorX = cursorX;
    options.cursorLine = lineNo;
  }
  return line;
}

function test_parse(text) {
  var options = {};
  var newLines = [];
  var origLines = text.split(LINE_ENDING_REGEX);
  var i;
  for (i=0; i<origLines.length; i++) {
    var line = origLines[i];
    if (!test_parseCaretLine(options, i, line)) {
      line = test_parseCursorFromLine(options, i, line);
      newLines.push(line);
    }
  }
  var newText = newLines.join("\n");
  return {
    text: newText,
    options: options
  };
}

function test_errorLine(result) {
  // shift x position back if previous line has cursor before our error caret
  var x = result.error.x;
  if (result.cursorLine === result.error.lineNo &&
      result.cursorX <= x) {
    x++;
  }
  return repeatString(" ", x) + "^ error: " + result.error.name;
}

function test_tabStopLine(tabStops) {
  var i,x;
  var lastX = -1;
  var line = "";
  for (i=0; i < tabStops.length; i++) {
    x = tabStops[i].x;
    line += repeatString(" ", x-lastX-1) + "^";
    lastX = x;
  }
  line += " tabStop" + (tabStops.length > 1 ? "s" :"");
  return line;
}

function test_format(result, printOptions) {
  var lines = result.text.split(LINE_ENDING_REGEX);
  var hasCursor = (
    result.cursorX !== SENTINEL_NULL &&
    result.cursorLine !== SENTINEL_NULL &&

    // could be false if `partialResult` is true and parinfer failed before reaching cursor line
    result.cursorLine < lines.length
  );
  if (hasCursor) {
    var line = lines[result.cursorLine];
    lines[result.cursorLine] = replaceWithinString(line, result.cursorX, result.cursorX, "|");
  }
  if (result.error) {
    lines.splice(result.error.lineNo+1, 0, test_errorLine(result));
  }
  else if (hasCursor && printOptions.tabStops && result.tabStops.length > 0) {
    lines.splice(result.cursorLine, 0, test_tabStopLine(result.tabStops));
  }
  return lines.join("\n");
}

//------------------------------------------------------------------------------
// Public API
//------------------------------------------------------------------------------

function publicResult(result) {
  var lineEnding = getLineEnding(result.origText);

  if (!result.success) {
    return {
      text: result.partialResult ? result.lines.join(lineEnding) : result.origText,
      cursorX: result.partialResult ? result.cursorX : result.origCursorX,
      cursorLine: result.partialResult ? result. cursorLine : result.origCursorLine,
      success: false,
      error: result.error
    };
  }

  return {
    text: result.lines.join(lineEnding),
    cursorX: result.cursorX,
    cursorLine: result.cursorLine,
    success: true,
    tabStops: result.tabStops
  };
}

function indentMode(text, options) {
  options = parseOptions(options);
  return publicResult(processText(text, options, INDENT_MODE));
}

function parenMode(text, options) {
  options = parseOptions(options);
  return publicResult(processText(text, options, PAREN_MODE));
}


function testIndentMode(text, printOptions) {
  printOptions = printOptions || {};
  var parsed = test_parse(text);
  var result = indentMode(parsed.text, parsed.options);
  return test_format(result, printOptions);
}

function testParenMode(text, printOptions) {
  printOptions = printOptions || {};
  var parsed = test_parse(text);
  if (printOptions.partialResult) {
    parsed.options.partialResult = true;
  }
  var result = parenMode(parsed.text, parsed.options);
  return test_format(result, printOptions);
}

var API = {
  version: "2.3.1",
  indentMode: indentMode,
  parenMode: parenMode,
  testIndentMode: testIndentMode,
  testParenMode: testParenMode
};

return API;

})); // end module anonymous scope
