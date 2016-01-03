//
// Parinfer 1.3.0
//
// Copyright 2015-2016 © Shaun LeBron
// MIT License
//
// Home Page: http://shaunlebron.github.io/parinfer/
// GitHub: https://github.com/shaunlebron/parinfer
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

function isWhitespace(c) {
  return c === " " || c === TAB || c === NEWLINE;
}

//------------------------------------------------------------------------------
// Result Structure
//------------------------------------------------------------------------------

// This represents the running result.  As we scan through each character
// of a given text, we mutate this structure to update the state of our
// system.

function getInitialResult() {

  var result = {

    lines: [],              // [string array] - resulting lines (with corrected parens or indentation)

    lineNo: -1,             // [integer] - line number we are processing
    ch: "",                 // [string] - character we are processing (can be changed to indicate a replacement)
    x: 0,                   // [integer] - x position of the current character (ch)

    stack: [],              // We track where we are in the Lisp tree by keeping a stack (array) of open-parens.
                            // Stack elements are objects containing keys {ch, x, indentDelta}
                            // whose values are the same as those described here in this result structure.

    backup: [],             // When the `parenTrail` of each line is removed by Indent Mode,
                            // this backup stack (array) of open parens allows us to restore
                            // the `stack` to where it was prior to parsing the `parenTrail`.
                            // Its type is identical to that of `stack`.

    parenTrail: {           // the range of parens at the end of a line
      lineNo: null,         // [integer] - line number of the last parsed paren trail
      startX: null,         // [integer or null] - x position of first paren in this range
      endX: null            // [integer or null] - x position after the last paren in this range
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
    trackIndent: false,     // [boolean] - are we looking for the indentation point of the current line?
    quit: false,            // [boolean] - should we stop processing immediately?
    process: false,         // [boolean] - should we process the current character? (false make us skip)
    success: false,         // [boolean] - was the input properly formatted enough to create a valid result?

    maxIndent: null,        // [integer or null] - maximum allowed indentation of subsequent lines in Paren Mode
    indentDelta: 0          // [integer] - how far indentation was shifted by Paren Mode
                            //  (preserves relative indentation of nested expressions)

  };

  // make sure no new properties are added to result
  // (for type safety)
  Object.preventExtensions(result);

  return result;
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
// Paren Locator
//------------------------------------------------------------------------------

function peek(stack) {
  if (stack.length === 0) {
    return null;
  }
  return stack[stack.length-1];
}

function isValidCloser(stack, ch) {
  if (stack.length === 0) {
    return false;
  }
  return peek(stack).ch === PARENS[ch];
}

function pushOpenParen(result) {
  if (result.isInCode) {
    result.stack.push({
      x: result.x,
      ch: result.ch,
      indentDelta: result.indentDelta
    });
  }
}

function onRealCloseParen(result, opener) {
  // we have encountered a real close-paren (i.e. not in a string, comment, or char)
  result.parenTrail.endX = result.x+1;
  result.maxIndent = opener.x;
  result.backup.push(opener);
}

function pushCloseParen(result) {
  if (result.isInCode) {
    if (isValidCloser(result.stack, result.ch)) {
      var opener = result.stack.pop();
      onRealCloseParen(result, opener);
    }
    else {
      // erase non-matched paren
      result.ch = "";
    }
  }
}

function pushTab(result) {
  if (result.isInCode) {
    result.ch = "  ";
  }
}

function pushSemicolon(result) {
  if (result.isInCode) {
    result.isInComment = true;
    result.commentX = result.x;
  }
}

function pushNewline(result) {
  result.isEscaping = false;
  result.isInComment = false;
  result.ch = "";
}

function pushBackslash(result) {
  result.isEscaping = true;
}

function pushQuote(result) {
  if (result.isInStr) {
    result.isInStr = false;
  }
  else if (result.isInComment) {
    result.quoteDanger = !result.quoteDanger;
  }
  else {
    result.isInStr = true;
  }
}

function pushChar(result) {
  if (result.isEscaping)            { result.isEscaping = false; }
  else if (isOpenParen(result.ch))  { pushOpenParen(result); }
  else if (isCloseParen(result.ch)) { pushCloseParen(result); }
  else {
    switch (result.ch) {
      case DOUBLE_QUOTE:            pushQuote(result); break;
      case SEMICOLON:               pushSemicolon(result); break;
      case BACKSLASH:               pushBackslash(result); break;
      case TAB:                     pushTab(result); break;
      case NEWLINE:                 pushNewline(result); break;
    }
  }
  result.isInCode = !result.isInComment && !result.isInStr;
}

//------------------------------------------------------------------------------
// Paren Trail functions
//------------------------------------------------------------------------------

// update the head of the paren trail as we scan each character.
// NOTE: `onRealCloseParen` modifies the endX
function updateParenTrail(result) {
  var line = result.lines[result.lineNo];
  var prevChIdx = result.x - 1;
  var prevCh = null;
  if (prevChIdx >= 0) {
    prevCh = line[prevChIdx];
  }
  var ch = result.ch;

  var shouldReset = (
    result.isInCode &&
    ch !== "" &&
    (!isWhitespace(ch) || prevCh === BACKSLASH) &&
    !isCloseParen(ch)
  );

  if (shouldReset) {
    result.backup = [];
    result.parenTrail = {
      lineNo: result.lineNo,
      startX: result.x+1,
      endX: result.x+1
    };
    result.maxIndent = null;
  }
}

// INDENT MODE: allow the cursor to block off the paren trail
function blockParenTrail(result) {
  var startX = result.parenTrail.startX;
  var endX = result.parenTrail.endX;
  var cursorInComment = (
      result.lineNo === result.cursorLine &&
      result.commentX !== null &&
      result.commentX < result.cursorX
  );
  var isCursorBlocking = (
    result.lineNo === result.cursorLine &&
    startX !== null &&
    result.cursorX > startX &&
    !cursorInComment
  );

  if (startX !== null && isCursorBlocking) {
    startX = Math.max(startX, result.cursorX);
  }

  if (endX !== null && isCursorBlocking) {
    endX = Math.max(endX, result.cursorX);
  }

  result.parenTrail.startX = startX;
  result.parenTrail.endX = endX;
}

// INDENT MODE: removes the paren trail from the line
function removeParenTrail(result) {
  var startX = result.parenTrail.startX;
  var endX = result.parenTrail.endX;

  if (startX === null || endX === null || startX === endX || result.lineNo !== result.parenTrail.lineNo) {
    return;
  }

  var stack = result.stack;
  var backup = result.backup;

  var line = result.lines[result.lineNo];

  var removeCount = 0;
  var i;
  for (i=startX; i<endX; i++) {
    if (isCloseParen(line[i])) {
      removeCount++;
    }
  }

  var ignoreCount = backup.length - removeCount;
  while (ignoreCount !== backup.length) {
    stack.push(backup.pop());
  }

  result.lines[result.lineNo] = removeStringRange(line, startX, endX);
}

// INDENT MODE: infer paren trail from indentation
function inferParenTrail(result, indentX) {

  var stack = result.stack;
  var parens = "";

  while (stack.length > 0) {
    var opener = peek(stack);
    if (opener !== null && opener.x >= indentX) {
      stack.pop();
      parens += PARENS[opener.ch];
    }
    else {
      break;
    }
  }

  var line = result.lines[result.parenTrail.lineNo];
  var newString =
    insertString(
      line,
      result.parenTrail.startX,
      parens
    );

  result.lines[result.parenTrail.lineNo] = newString;
}

// PAREN MODE: remove spaces from the paren trail
function cleanParenTrail(result) {
  var startX = result.parenTrail.startX;
  var endX = result.parenTrail.endX;

  if (startX === null || endX === null || startX === endX || result.lineNo !== result.parenTrail.lineNo) {
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
    endX -= spaceCount;
  }

  if (result.parenTrail.lineNo === result.lineNo) {
    result.parenTrail.endX = endX;
  }
}

// PAREN MODE: append a valid close-paren to the end of the paren trail
function appendParenTrail(result) {
  var opener = result.stack.pop();
  var closeCh = PARENS[opener.ch];
  result.maxIndent = opener.x;
  var i = result.parenTrail.lineNo;
  var line = result.lines[i];
  result.lines[i] = insertString(line, result.parenTrail.endX, closeCh);
  result.parenTrail.endX++;
}

//------------------------------------------------------------------------------
// Indentation functions
//------------------------------------------------------------------------------

// INDENT MODE:
function processIndent(result) {
  var ch = result.ch;

  var checkIndent = (
    result.trackIndent &&
    result.isInCode &&
    !isWhitespace(ch) &&
    ch !== SEMICOLON
  );
  var skip = checkIndent && isCloseParen(ch);
  var atIndent = checkIndent && !skip;
  var quit = atIndent && result.quoteDanger;

  result.quit = quit;
  result.process = !skip && !quit;

  if (atIndent && !quit) {
    inferParenTrail(result, result.x);
    result.trackIndent = false;
  }
}

// PAREN MODE:
function minIndent(x, result) {
  var opener = peek(result.stack);
  if (opener !== null) {
    var startX = opener.x;
    return Math.max(startX+1, x);
  }
  return x;
}

// PAREN MODE:
function minDedent(x, result) {
  if (result.maxIndent !== null) {
    return Math.min(result.maxIndent, x);
  }
  return x;
}

// PAREN MODE:
function correctIndent(result) {
  var opener = peek(result.stack);
  var delta = 0;
  if (opener !== null && opener.indentDelta !== null) {
    delta = opener.indentDelta;
  }
  var newX1 = result.x + delta;
  var newX2 = minIndent(newX1, result);
  var newX3 = minDedent(newX2, result);

  result.indentDelta += (newX3 - result.x);

  if (newX3 !== result.x) {
    var i,indentStr="";
    for (i=0; i<newX3; i++) {
      indentStr += " ";
    }
    var line = result.lines[result.lineNo];
    var newLine = replaceStringRange(line, 0, result.x, indentStr);
    result.lines[result.lineNo] = newLine;
    result.x = newX3;
  }

  result.trackIndent = false;
  result.maxIndent = null;
}

// PAREN MODE:
function handleCursorDelta(result) {
  var hasCursorDelta = (
    result.cursorLine === result.lineNo &&
    result.cursorX === result.x &&
    result.cursorX !== null
  );

  if (hasCursorDelta && typeof result.cursorDx === 'number') {
    result.indentDelta += result.cursorDx;
  }
}

// PAREN MODE:
function processIndent_paren(result) {
  var ch = result.ch;
  var stack = result.stack;
  var closeParen = isCloseParen(ch);

  var checkIndent = (
    result.trackIndent &&
    result.isInCode &&
    !isWhitespace(ch) &&
    result.ch !== SEMICOLON
  );

  var atValidCloser = (
    checkIndent &&
    closeParen &&
    isValidCloser(stack, ch)
  );

  var isCursorHolding = (
    result.lineNo === result.cursorLine &&
    result.cursorX !== null &
    result.cursorX <= result.x
  );

  var shouldMoveCloser = (
    atValidCloser &&
    !isCursorHolding
  );

  var skip = (
    checkIndent &&
    closeParen &&
    !isCursorHolding
  );

  var atIndent = checkIndent && !skip;
  var quit = atIndent && result.quoteDanger;

  result.quit = quit;
  result.process = !skip;

  if (quit) {
    return;
  }

  if (shouldMoveCloser) {
    appendParenTrail(result);
  }

  handleCursorDelta(result);

  if (atIndent) {
    correctIndent(result);
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
  result.backup = [];
  result.commentX = null;
  result.indentDelta = 0;
}

function updateLine(result, origCh) {
  var ch = result.ch
  if (origCh !== ch) {
    var line = result.lines[result.lineNo];
    result.lines[result.lineNo] = replaceStringRange(line, result.x, result.x+origCh.length, ch);
  }
}

//------------------------------------------------------------------------------
// INDENT MODE
//------------------------------------------------------------------------------

function processChar(result, ch) {
  var origCh = ch;
  result.ch = ch;
  processIndent(result);

  if (result.quit) {
    return;
  }

  if (result.process) {
    // NOTE: the order here is important!
    pushChar(result);
    updateParenTrail(result);
  }
  else {
    result.ch = "";
  }

  updateLine(result, origCh);
  result.x += result.ch.length;
}

function processLine(result, line) {
  initLine(result, line);
  result.trackIndent = (result.stack.length > 0 && !result.isInStr);

  var i;
  var chars = line + NEWLINE;
  for (i=0; i<chars.length; i++) {
    processChar(result, chars[i]);
    if (result.quit) {
      break;
    }
  }

  if (!result.quit) {
    blockParenTrail(result);
    removeParenTrail(result);
  }
}

function finalizeResult(result) {
  var stack = result.stack;
  result.success = !result.isInStr && !result.quoteDanger;
  if (result.success && stack.length > 0) {
    inferParenTrail(result, 0);
  }
}

function processText(text, options) {

  var lines = text.split(LINE_ENDING);

  var result = getInitialResult();
  if (options) {
    result.cursorX = options.cursorX;
    result.cursorLine = options.cursorLine;
  }

  var i;
  for (i=0; i<lines.length; i++) {
    processLine(result, lines[i]);
    if (result.quit) {
      break;
    }
  }
  finalizeResult(result);
  return result;
}

//------------------------------------------------------------------------------
// PAREN MODE
//------------------------------------------------------------------------------

function processChar_paren(result, ch) {
  var origCh = ch;
  result.ch = ch;
  processIndent_paren(result);

  if (result.quit) {
    return;
  }

  if (result.process) {
    // NOTE: the order here is important!
    pushChar(result);
    updateParenTrail(result);
  }
  else {
    result.ch = "";
  }

  updateLine(result, origCh);
  result.x += result.ch.length;
}

function processLine_paren(result, line) {
  initLine(result, line);
  result.trackIndent = !result.isInStr;

  var i;
  var chars = line + NEWLINE;
  for (i=0; i<chars.length; i++) {
    processChar_paren(result, chars[i]);
    if (result.quit) {
      break;
    }
  }

  if (!result.quit) {
    cleanParenTrail(result);
  }
}

function finalizeResult_paren(result) {
  result.success = (
    result.stack.length === 0 &&
    !result.quoteDanger
  );
}

function processText_paren(text, options) {

  var lines = text.split(LINE_ENDING);

  var result = getInitialResult();

  if (options) {
    result.cursorX = options.cursorX;
    result.cursorLine = options.cursorLine;
    result.cursorDx = options.cursorDx;
  }

  var i;
  for (i=0; i<lines.length; i++) {
    processLine_paren(result, lines[i]);
    if (result.quit) {
      break;
    }
  }
  finalizeResult_paren(result);
  return result;
}

//------------------------------------------------------------------------------
// Public API
//------------------------------------------------------------------------------

function indentMode(text, options) {
  var lineEnding = getLineEnding(text);
  var result = processText(text, options);
  var outText = result.success ? result.lines.join(lineEnding) : text;
  return {
    text: outText,
    success: result.success
  };
}

function parenMode(text, options) {
  var lineEnding = getLineEnding(text);
  var result = processText_paren(text, options);
  var outText = result.success ? result.lines.join(lineEnding) : text;
  return {
    text: outText,
    success: result.success
  };
}

var API = {
  indentMode: indentMode,
  parenMode: parenMode
};

return API;

})); // end module anonymous scope
