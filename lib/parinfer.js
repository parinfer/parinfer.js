//
// Parinfer 1.5.2+dev
//
// Copyright 2015-2016 © Shaun LeBron
// MIT License
//
// Home Page: http://shaunlebron.github.io/parinfer/
// GitHub: https://github.com/shaunlebron/parinfer
//
// For DOCUMENTATION on this file, please see `parinfer.js.md`
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

var PARENS = {
  "{": "}",
  "}": "{",
  "[": "]",
  "]": "[",
  "(": ")",
  ")": "("
};

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
// Result Structure
//------------------------------------------------------------------------------

// This represents the running result. As we scan through each character
// of a given text, we mutate this structure to update the state of our
// system.

function getInitialResult(text, options, mode) {

  var result = {

    mode: mode,                // [enum] - current processing mode (INDENT_MODE or PAREN_MODE)

    origText: text,            // [string] - original text
    origLines:                 // [string array] - original lines
      text.split(LINE_ENDING_REGEX),

    lines: [],                 // [string array] - resulting lines (with corrected parens or indentation)
    lineNo: -1,                // [integer] - line number we are processing
    ch: "",                    // [string] - character we are processing (can be changed to indicate a replacement)
    x: 0,                      // [integer] - x position of the current character (ch)

    parenStack: [],            // We track where we are in the Lisp tree by keeping a stack (array) of open-parens.
                               // Stack elements are objects containing keys {ch, x, indentDelta}
                               // whose values are the same as those described here in this result structure.

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

    maxIndent: SENTINEL_NULL,  // [integer] - maximum allowed indentation of subsequent lines in Paren Mode
    indentDelta: 0,            // [integer] - how far indentation was shifted by Paren Mode
                               //  (preserves relative indentation of nested expressions)

    error: {                   // if 'success' is false, return this error to the user
      name: SENTINEL_NULL,     // [string] - Parinfer's unique name for this error
      message: SENTINEL_NULL,  // [string] - error message to display
      lineNo: SENTINEL_NULL,   // [integer] - line number of error
      x: SENTINEL_NULL         // [integer] - start x position of error
    },
    errorPosCache: {}          // [object] - maps error name to a potential error position
  };

  // make sure no new properties are added to result
  // (for type safety)
  Object.preventExtensions(result);
  Object.preventExtensions(result.parenTrail);

  // merge options if they are valid
  if (options) {
    if (isInteger(options.cursorX))    { result.cursorX = options.cursorX; }
    if (isInteger(options.cursorLine)) { result.cursorLine = options.cursorLine; }
    if (isInteger(options.cursorDx))   { result.cursorDx = options.cursorDx; }
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
var ERROR_UNHANDLED = "unhandled";

var errorMessages = {};
errorMessages[ERROR_QUOTE_DANGER] = "Quotes must balanced inside comment blocks.";
errorMessages[ERROR_EOL_BACKSLASH] = "Line cannot end in a hanging backslash.";
errorMessages[ERROR_UNCLOSED_QUOTE] = "String is missing a closing quote.";
errorMessages[ERROR_UNCLOSED_PAREN] = "Unmatched open-paren.";

function cacheErrorPos(result, errorName, lineNo, x) {
  result.errorPosCache[errorName] = { lineNo: lineNo, x: x };
}

function error(result, errorName, lineNo, x) {
  if (lineNo === SENTINEL_NULL) {
    lineNo = result.errorPosCache[errorName].lineNo;
  }
  if (x === SENTINEL_NULL) {
    x = result.errorPosCache[errorName].x;
  }

  return {
    parinferError: true,
    name: errorName,
    message: errorMessages[errorName],
    lineNo: lineNo,
    x: x
  };
}

//------------------------------------------------------------------------------
// String Operations
//------------------------------------------------------------------------------

function insertWithinString(orig, idx, insert) {
  return (
    orig.substring(0, idx) +
    insert +
    orig.substring(idx)
  );
}

function replaceWithinString(orig, start, end, replace) {
  return (
    orig.substring(0, start) +
    replace +
    orig.substring(end)
  );
}

function removeWithinString(orig, start, end) {
  return (
    orig.substring(0, start) +
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

function insertWithinLine(result, lineNo, idx, insert) {
  var line = result.lines[lineNo];
  result.lines[lineNo] = insertWithinString(line, idx, insert);
}

function replaceWithinLine(result, lineNo, start, end, replace) {
  var line = result.lines[lineNo];
  result.lines[lineNo] = replaceWithinString(line, start, end, replace);
}

function removeWithinLine(result, lineNo, start, end) {
  var line = result.lines[lineNo];
  result.lines[lineNo] = removeWithinString(line, start, end);
}

function initLine(result, line) {
  result.x = 0;
  result.lineNo++;
  result.lines.push(line);

  // reset line-specific state
  result.commentX = SENTINEL_NULL;
  result.indentDelta = 0;
}

// if the current character has changed, commit its change to the current line.
function commitChar(result, origCh) {
  var ch = result.ch
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
  return peek(parenStack).ch === PARENS[ch];
}

function onOpenParen(result) {
  if (result.isInCode) {
    result.parenStack.push({
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
      cacheErrorPos(result, ERROR_QUOTE_DANGER, result.lineNo, result.x);
    }
  }
  else {
    result.isInStr = true;
    cacheErrorPos(result, ERROR_UNCLOSED_QUOTE, result.lineNo, result.x);
  }
}

function onBackslash(result) {
  result.isEscaping = true;
}

function afterBackslash(result) {
  result.isEscaping = false;

  if (result.ch === NEWLINE) {
    if (result.isInCode) {
      throw error(result, ERROR_EOL_BACKSLASH, result.lineNo, result.x - 1);
    }
    onNewline(result);
  }
}

function onChar(result) {
  var ch = result.ch;
  if (result.isEscaping)        { afterBackslash(result); }
  else if (isOpenParen(ch))     { onOpenParen(result); }
  else if (isCloseParen(ch))    { onCloseParen(result); }
  else if (ch === DOUBLE_QUOTE) { onQuote(result); }
  else if (ch === SEMICOLON)    { onSemicolon(result); }
  else if (ch === BACKSLASH)    { onBackslash(result); }
  else if (ch === TAB)          { onTab(result); }
  else if (ch === NEWLINE)      { onNewline(result); }

  result.isInCode = !result.isInComment && !result.isInStr;
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

// update the head of the paren trail as we scan each character.
// NOTE: `onMatchedCloseParen` modifies the endX
function updateParenTrailBounds(result) {
  var line = result.lines[result.lineNo];
  var prevCh = SENTINEL_NULL;
  if (result.x > 0) { prevCh = line[result.x - 1]; }
  var ch = result.ch;

  var shouldReset = (
    result.isInCode &&
    !isCloseParen(ch) &&
    ch !== "" &&                                    // erased character
    (ch !== BLANK_SPACE || prevCh === BACKSLASH) && // non-escaped space
    ch != DOUBLE_SPACE                              // double-space (converted tab)
  );

  if (shouldReset) {
    result.parenTrail.lineNo = result.lineNo;
    result.parenTrail.startX = result.x + 1;
    result.parenTrail.endX = result.x + 1;
    result.parenTrail.openers = [];
    result.maxIndent = SENTINEL_NULL;
  }
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

// INDENT MODE: removes the paren trail from the line
function removeParenTrail(result) {
  var startX = result.parenTrail.startX;
  var endX = result.parenTrail.endX;

  if (startX === endX) {
    return;
  }

  var openers = result.parenTrail.openers;
  while (openers.length !== 0) {
    result.parenStack.push(openers.pop());
  }

  removeWithinLine(result, result.lineNo, startX, endX);
}

// INDENT MODE: correct paren trail from indentation
function correctParenTrail(result, indentX) {
  var parens = "";

  while (result.parenStack.length > 0) {
    var opener = peek(result.parenStack);
    if (opener.x >= indentX) {
      result.parenStack.pop();
      parens += PARENS[opener.ch];
    }
    else {
      break;
    }
  }

  insertWithinLine(result, result.parenTrail.lineNo, result.parenTrail.startX, parens);
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
  var closeCh = PARENS[opener.ch];

  result.maxIndent = opener.x;
  insertWithinLine(result, result.parenTrail.lineNo, result.parenTrail.endX, closeCh);
  result.parenTrail.endX++;
}

function finishNewParenTrail(result) {
  if (result.mode === INDENT_MODE) {
    clampParenTrailToCursor(result);
    removeParenTrail(result);
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

function onProperIndent(result) {
  result.trackingIndent = false;

  if (result.quoteDanger) {
    throw error(result, ERROR_QUOTE_DANGER, SENTINEL_NULL, SENTINEL_NULL);
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
  result.trackingIndent = true;

  if (result.mode === PAREN_MODE) {
    if (isValidCloseParen(result.parenStack, result.ch)) {
      if (isCursorOnLeft(result)) {
        result.skipChar = false;
        onProperIndent(result);
      }
      else {
        appendParenTrail(result);
      }
    }
  }
}

function onIndent(result) {
  if (isCloseParen(result.ch)) {
    onLeadingCloseParen(result);
  }
  else if (result.ch === SEMICOLON) {
    // comments don't count as indentation points
    result.trackingIndent = false;
  }
  else if (result.ch !== NEWLINE) {
    onProperIndent(result);
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

  if (result.trackingIndent && ch !== BLANK_SPACE && ch !== TAB) {
    onIndent(result);
  }

  if (result.skipChar) {
    result.ch = "";
  }
  else {
    onChar(result);
    updateParenTrailBounds(result);
  }

  commitChar(result, origCh);
}

function processLine(result, line) {
  initLine(result, line);

  if (result.mode === INDENT_MODE) {
    result.trackingIndent = (
      result.parenStack.length !== 0 &&
      !result.isInStr
    );
  }
  else if (result.mode === PAREN_MODE) {
    result.trackingIndent = !result.isInStr;
  }

  var i;
  var chars = line + NEWLINE;
  for (i = 0; i < chars.length; i++) {
    processChar(result, chars[i]);
  }

  if (result.lineNo === result.parenTrail.lineNo) {
    finishNewParenTrail(result);
  }
}

function finalizeResult(result) {
  if (result.quoteDanger) { throw error(result, ERROR_QUOTE_DANGER, SENTINEL_NULL, SENTINEL_NULL); }
  if (result.isInStr)     { throw error(result, ERROR_UNCLOSED_QUOTE, SENTINEL_NULL, SENTINEL_NULL); }

  if (result.parenStack.length !== 0) {
    if (result.mode === PAREN_MODE) {
      var opener = peek(result.parenStack);
      throw error(result, ERROR_UNCLOSED_PAREN, opener.lineNo, opener.x);
    }
    else if (result.mode === INDENT_MODE) {
      correctParenTrail(result, 0);
    }
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
    for (i = 0; i < result.origLines.length; i++) {
      processLine(result, result.origLines[i]);
    }
    finalizeResult(result);
  }
  catch (e) {
    processError(result, e);
  }

  return result;
}

//------------------------------------------------------------------------------
// Public API
//------------------------------------------------------------------------------

function getChangedLines(result) {
  var changedLines = [];
  var i;
  for (i = 0; i < result.lines.length; i++) {
    if (result.lines[i] !== result.origLines[i]) {
      changedLines.push({
        lineNo: i,
        line: result.lines[i]
      });
    }
  }
  return changedLines;
}

function publicResult(result) {
  if (!result.success) {
    return {
      text: result.origText,
      success: false,
      error: result.error
    };
  }

  var lineEnding = getLineEnding(result.origText);
  return {
    text: result.lines.join(lineEnding),
    success: true,
    changedLines: getChangedLines(result)
  }
}

function indentMode(text, options) {
  var result = processText(text, options, INDENT_MODE);
  return publicResult(result);
}

function parenMode(text, options) {
  var result = processText(text, options, PAREN_MODE);
  return publicResult(result);
}

var API = {
  indentMode: indentMode,
  parenMode: parenMode
};

return API;

})); // end module anonymous scope
