//
// Parinfer 1.4.0
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
// Constants
//------------------------------------------------------------------------------

var INDENT_MODE = "INDENT_MODE",
    PAREN_MODE = "PAREN_MODE";

var BACKSLASH = '\\',
    DOUBLE_QUOTE = '"',
    NEWLINE = '\n',
    SEMICOLON = ';',
    TAB = '\t';

var LINE_ENDING = /\r?\n/;

var PARENS = {
  "{": "}",
  "}": "{",
  "[": "]",
  "]": "[",
  "(": ")",
  ")": "("
};

function isOpenParen(c) {
  return c === "{" || c === "(" || c === "[";
}

function isCloseParen(c) {
  return c === "}" || c === ")" || c === "]";
}

//------------------------------------------------------------------------------
// Result Structure
//------------------------------------------------------------------------------

// This represents the running result.  As we scan through each character
// of a given text, we mutate this structure to update the state of our
// system.

function getInitialResult() {

  var result = {

    mode: null,             // [enum] - current processing mode (INDENT_MODE or PAREN_MODE)

    origLines: [],          // [string array] - original lines
    origText: null,         // [string] - original text

    lines: [],              // [string array] - resulting lines (with corrected parens or indentation)
    lineNo: -1,             // [integer] - line number we are processing
    ch: "",                 // [string] - character we are processing (can be changed to indicate a replacement)
    x: 0,                   // [integer] - x position of the current character (ch)

    parenStack: [],         // We track where we are in the Lisp tree by keeping a stack (array) of open-parens.
                            // Stack elements are objects containing keys {ch, x, indentDelta}
                            // whose values are the same as those described here in this result structure.

    parenTrail: {           // the range of parens at the end of a line
      lineNo: null,         // [integer] - line number of the last parsed paren trail
      startX: null,         // [integer or null] - x position of first paren in this range
      endX: null,           // [integer or null] - x position after the last paren in this range
      openers: []           // [array of stack elements] - corresponding open-paren for each close-paren in this range
    },

    cursorX: null,          // [integer or null] - x position of the cursor
    cursorLine: null,       // [integer or null] - line number of the cursor
    cursorDx: null,         // [integer or null] - amount that the cursor moved horizontally if something was inserted or deleted

    isInCode: true,         // [boolean] - indicates if we are currently in "code space" (not string or comment)
    isEscaping: false,      // [boolean] - indicates if the next character will be escaped (e.g. `\c`).  This may be inside string, comment, or code.
    isInStr: false,         // [boolean] - indicates if we are currently inside a string
    isInComment: false,     // [boolean] - indicates if we are currently inside a comment
    commentX: null,         // [integer or null] - x position of the start of comment on current line (if any)

    quoteDanger: false,     // [boolean] - indicates if quotes are imbalanced inside of a comment (dangerous)
    trackingIndent: false,  // [boolean] - are we looking for the indentation point of the current line?
    skipChar: false,        // [boolean] - should we skip the processing of the current character?
    success: false,         // [boolean] - was the input properly formatted enough to create a valid result?

    maxIndent: null,        // [integer or null] - maximum allowed indentation of subsequent lines in Paren Mode
    indentDelta: 0,         // [integer] - how far indentation was shifted by Paren Mode
                            //  (preserves relative indentation of nested expressions)

    error: {                // if 'success' is false, return this error to the user
      name: null,           // [string or null] - Parinfer's unique name for this error
      message: null,        // [string or null] - error message to display
      lineNo: null,         // [integer] - line number of error
      x: null               // [integer] - start x position of error
    },
    errorPosCache: {}       // [object] - maps error name to a potential error position
  };

  // make sure no new properties are added to result
  // (for type safety)
  Object.preventExtensions(result);
  Object.preventExtensions(result.parenTrail);

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

function cacheErrorPos(result, name, lineNo, x) {
  result.errorPosCache[name] = { lineNo: lineNo, x: x };
}

function error(result, name, lineNo, x) {
  var cache = result.errorPosCache[name];
  return {
    parinferError: true,
    name: name,
    message: errorMessages[name],
    lineNo: (lineNo === undefined ? cache.lineNo : lineNo),
    x: (x === undefined ? cache.x : x)
  };
}

//------------------------------------------------------------------------------
// String Operations
//------------------------------------------------------------------------------

function insertString(orig, idx, insert) {
  return (
    orig.substring(0, idx) +
    insert +
    orig.substring(idx)
  );
}

function replaceStringRange(orig, start, end, replace) {
  return (
    orig.substring(0, start) +
    replace +
    orig.substring(end)
  );
}

function removeStringRange(orig, start, end) {
  return (
    orig.substring(0, start) +
    orig.substring(end)
  );
}

function multiplyString(text, n) {
  var i;
  var result = "";
  for (i=0; i<n; i++) {
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
// Misc Utils
//------------------------------------------------------------------------------

function clamp(val, min, max) {
  if (min !== null) {
    val = Math.max(min, val);
  }
  if (max !== null) {
    val = Math.min(max, val);
  }
  return val;
}

function peek(array) {
  if (array.length === 0) {
    return null;
  }
  return array[array.length-1];
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

function onRealCloseParen(result, opener) {
  // we have encountered a real close-paren (i.e. not in a string, comment, or char)
  result.parenTrail.endX = result.x+1;
  result.parenTrail.openers.push(opener);
  result.maxIndent = opener.x;
}

function onCloseParen(result) {
  if (result.isInCode) {
    if (isValidCloseParen(result.parenStack, result.ch)) {
      var opener = result.parenStack.pop();
      onRealCloseParen(result, opener);
    }
    else {
      // erase non-matched paren
      result.ch = "";
    }
  }
}

function onTab(result) {
  if (result.isInCode) {
    result.ch = "  ";
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
      throw error(result, ERROR_EOL_BACKSLASH, result.lineNo, result.x-1);
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
    result.cursorX !== null &&
    result.cursorX <= result.x
  );
}

function isCursorOnRight(result, x) {
  return (
    result.lineNo === result.cursorLine &&
    result.cursorX !== null &&
    x !== null &&
    result.cursorX > x
  );
}

function isCursorInComment(result) {
  return isCursorOnRight(result, result.commentX);
}

function handleCursorDelta(result) {
  var hasCursorDelta = (
    result.cursorDx !== null &&
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
// NOTE: `onRealCloseParen` modifies the endX
function updateParenTrailBounds(result) {
  var line = result.lines[result.lineNo];
  var prevCh = (result.x > 0) ? line[result.x-1] : null;
  var ch = result.ch;

  var shouldReset = (
    result.isInCode &&
    !isCloseParen(ch) &&
    ch !== "" &&                            // erased character
    (ch !== " " || prevCh === BACKSLASH) && // non-escaped space
    ch != "  "                              // double-space (converted tab)
  );

  if (shouldReset) {
    result.parenTrail.lineNo = result.lineNo;
    result.parenTrail.startX = result.x+1;
    result.parenTrail.endX = result.x+1;
    result.parenTrail.openers = [];
    result.maxIndent = null;
  }
}

// INDENT MODE: allow the cursor to block off the paren trail
function truncateParenTrailBounds(result) {
  var startX = result.parenTrail.startX;
  var endX = result.parenTrail.endX;

  var isCursorBlocking = (
    isCursorOnRight(result, startX) &&
    !isCursorInComment(result)
  );

  if (isCursorBlocking) {
    var newStartX = Math.max(startX, result.cursorX);
    var newEndX = Math.max(endX, result.cursorX);

    var line = result.lines[result.lineNo];
    var removeCount = 0;
    var i;
    for (i=startX; i<newStartX; i++) {
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

  var line = result.lines[result.lineNo];
  result.lines[result.lineNo] = removeStringRange(line, startX, endX);
}

// INDENT MODE: infer paren trail from indentation
function inferParenTrail(result, indentX) {
  var parens = "";

  while (result.parenStack.length > 0) {
    var opener = peek(result.parenStack);
    if (opener !== null && opener.x >= indentX) {
      result.parenStack.pop();
      parens += PARENS[opener.ch];
    }
    else {
      break;
    }
  }

  var line = result.lines[result.parenTrail.lineNo];
  var newString = insertString(line, result.parenTrail.startX, parens);
  result.lines[result.parenTrail.lineNo] = newString;
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
  for (i=startX; i<endX; i++) {
    if (isCloseParen(line[i])) {
      newTrail += line[i];
    }
    else {
      spaceCount++;
    }
  }

  if (spaceCount > 0) {
    result.lines[result.lineNo] = replaceStringRange(line, startX, endX, newTrail);
    result.parenTrail.endX -= spaceCount;
  }
}

// PAREN MODE: append a valid close-paren to the end of the paren trail
function appendParenTrail(result) {
  var opener = result.parenStack.pop();
  var closeCh = PARENS[opener.ch];
  var lineNo =  result.parenTrail.lineNo;
  var line = result.lines[lineNo];

  result.maxIndent = opener.x;
  result.lines[lineNo] = insertString(line, result.parenTrail.endX, closeCh);
  result.parenTrail.endX++;
}

function finishNewParenTrail(result) {
  if (result.mode === INDENT_MODE) {
    truncateParenTrailBounds(result);
    removeParenTrail(result);
  }
  else if (result.mode === PAREN_MODE) {
    cleanParenTrail(result);
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
  if (opener !== null) {
    minIndent = opener.x+1;
    newIndent += opener.indentDelta;
  }

  newIndent = clamp(newIndent, minIndent, maxIndent);

  if (newIndent !== origIndent) {
    var indentStr = multiplyString(" ", newIndent);
    var line = result.lines[result.lineNo];
    var newLine = replaceStringRange(line, 0, origIndent, indentStr);

    result.x = newIndent;
    result.lines[result.lineNo] = newLine;
    result.indentDelta += (newIndent - origIndent);
  }
}

function onIndentationPoint(result) {
  result.trackingIndent = false;

  if (result.quoteDanger) {
    throw error(result, ERROR_QUOTE_DANGER);
  }

  if (result.mode === INDENT_MODE) {
    inferParenTrail(result, result.x);
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
        onIndentationPoint(result);
      }
      else {
        appendParenTrail(result);
      }
    }
  }
}

//------------------------------------------------------------------------------
// Line functions
//------------------------------------------------------------------------------

function initLine(result, line) {
  result.x = 0;
  result.lineNo++;
  result.lines.push(line);

  // reset line-specific state
  result.commentX = null;
  result.indentDelta = 0;
}

// if the current character has changed, commit its change to the current line.
function commitChar(result, origCh) {
  var ch = result.ch
  if (origCh !== ch) {
    var line = result.lines[result.lineNo];
    result.lines[result.lineNo] = replaceStringRange(line, result.x, result.x+origCh.length, ch);
  }
  result.x += ch.length;
}

//------------------------------------------------------------------------------
// High-level processing functions
//------------------------------------------------------------------------------

function processIndent(result) {
  if (isCloseParen(result.ch)) {
    onLeadingCloseParen(result);
  }
  else if (result.ch === SEMICOLON) {
    // comments don't count as indentation points
    result.trackingIndent = false;
  }
  else if (result.ch !== NEWLINE) {
    onIndentationPoint(result);
  }
}

function processChar(result, ch) {
  var origCh = ch;

  result.ch = ch;
  result.skipChar = false;

  if (result.mode === PAREN_MODE) {
    handleCursorDelta(result);
  }

  if (result.trackingIndent && ch !== " " && ch !== TAB) {
    processIndent(result);
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
  for (i=0; i<chars.length; i++) {
    processChar(result, chars[i]);
  }

  if (result.lineNo === result.parenTrail.lineNo) {
    finishNewParenTrail(result);
  }
}

function finalizeResult(result) {
  if (result.quoteDanger) {
    throw error(result, ERROR_QUOTE_DANGER);
  }
  if (result.isInStr) {
    throw error(result, ERROR_UNCLOSED_QUOTE);
  }
  if (result.parenStack.length !== 0) {
    if (result.mode === INDENT_MODE) {
      inferParenTrail(result, 0);
    }
    else if (result.mode === PAREN_MODE) {
      var opener = peek(result.parenStack);
      throw error(result, ERROR_UNCLOSED_PAREN, opener.lineNo, opener.x);
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

function mergeOption(result, options, key) {
  if (options.hasOwnProperty(key)) {
    result[key] = options[key];
  }
}

function processText(text, options, mode) {
  var result = getInitialResult();

  result.mode = mode;
  result.origText = text;
  result.origLines = text.split(LINE_ENDING);

  if (options) {
    mergeOption(result, options, "cursorX");
    mergeOption(result, options, "cursorLine");
    mergeOption(result, options, "cursorDx");
  }

  try {
    var i;
    for (i=0; i<result.origLines.length; i++) {
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
  for (i=0; i<result.lines.length; i++) {
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
