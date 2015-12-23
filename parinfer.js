//
// Parinfer 1.1.0
//
// Copyright 2015 © Shaun LeBron
// MIT License
//
// Home Page: http://shaunlebron.github.io/parinfer/
// GitHub: https://github.com/shaunlebron/parinfer
//

/**************************** JS MODULE BOILERPLATE *******************************/

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
}(this, function() {
  "use strict";

/**************************** RESULT STRUCTURE *******************************/

  // This represents the running result.  As we scan through each character
  // of a given text, we mutate this structure to update the state of our
  // system.

  function getInitialResult() {

    return {

      lines: [],              // [string array] - resulting lines (with corrected parens or indentation)

      lineNo: -1,             // [integer] - line number we are processing
      ch: "",                 // [string] - character we are processing (can be changed to indicate a replacement)
      x: 0,                   // [integer] - x position of the current character (ch)

      stack: [],              // We track where we are in the Lisp tree by keeping a stack (array) of
                              // relevant opening characters (parens, quotes, backslashes, semicolons).
                              // Stack elements are objects containing keys {ch, x, indentDelta}
                              // whose values are the same as those described here in this result structure.

      backup: [],             // When the `parenTrail` of each line is removed by Indent Mode,
                              // this backup stack (array) of open parens allows us to restore
                              // the `stack` to where it was prior to parsing the `parenTrail`.
                              // Its type is identical to that of `stack`.

      insert: {               // end-of-line insertion point for close-parens, specifically:
                              // - in Indent Mode, inferred close-parens are placed here
                              // - in Paren Mode, close-parens at the start of a subsequent line are moved here

        lineNo: null,         // [integer or null] - line number of insertion point
        x: null               // [integer or null] - x position of insertion point
      },

      parenTrail: {           // the range of parens at the end of a line
        start: null,          // [integer or null] - x position of first paren in this range
        end: null             // [integer or null] - x position after the last paren in this range
      },

      cursorX: null,          // [integer or null] - x position of the cursor
      cursorLine: null,       // [integer or null] - line number of the cursor
      cursorDx: null,         // [integer or null] - amount that the cursor moved horizontally if something was inserted or deleted

      quoteDanger: false,     // [boolean] - indicates if quotes are imbalanced inside of a comment (dangerous)
      trackIndent: false,     // [boolean] - are we looking for the indentation point of the current line?
      cursorInComment: false, // [boolean] - is the cursor inside a comment?
      quit: false,            // [boolean] - should we stop processing immediately?
      process: false,         // [boolean] - should we process the current character? (false make us skip)
      success: false,         // [boolean] - was the input properly formatted enough to create a valid result?

      maxIndent: null,        // [integer or null] - maximum allowed indentation of subsequent lines in Paren Mode
      indentDelta: 0          // [integer] - how far indentation was shifted by Paren Mode
                              //  (preserves relative indentation of nested expressions)

    };
  }

/**************************** STRING OPERATIONS *******************************/

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

/**************************** READER OPERATIONS *******************************/

  var matchingParen = {
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
    return c === " " || c === "\t" || c=== "\n";
  }

  //------------------------------------------------------------------------
  // Lisp states
  //------------------------------------------------------------------------

  function peek(stack, i) {
    if (i == null) {
      i = 1;
    }
    return stack[stack.length-i];
  }

  function getPrevCh(stack, i) {
    var e = peek(stack, i);
    return e && e.ch;
  }

  function isEscaping(stack) {
    return getPrevCh(stack) === "\\";
  }

  function prevNonEscCh(stack) {
    var i = isEscaping(stack) ? 2 : 1;
    return getPrevCh(stack, i);
  }

  function isInStr(stack) {
    return prevNonEscCh(stack) === "\"";
  }

  function isInComment(stack) {
    return prevNonEscCh(stack) === ";";
  }

  function isInCode(stack) {
    return !isInStr(stack) && !isInComment(stack);
  }

  function isValidCloser(stack, ch) {
    return getPrevCh(stack) === matchingParen[ch];
  }

  //------------------------------------------------------------------------
  // Lisp stack operations
  //------------------------------------------------------------------------

  function pushChar(result) {
    var ch = result.ch;
    if (isOpenParen(ch))       { pushOpen(result); }
    else if (isCloseParen(ch)) { pushClose(result); }
    else {
      switch (ch) {
        case "\t": pushTab(result); break;
        case ";":  pushSemicolon(result); break;
        case "\n": pushNewline(result); break;
        case "\\": pushEscape(result); break;
        case "\"": pushQuote(result); break;
        default:   pushDefault(result);
      }
    }
  }

  function pushOpen(result) {
    var stack = result.stack;
    if (isEscaping(stack)) {
      stack.pop();
    }
    else if (isInCode(stack)) {
      stack.push({
        x: result.x,
        ch: result.ch,
        indentDelta: result.indentDelta
      });
    }
  }

  function pushClose(result) {
    var stack = result.stack;
    var backup = result.backup;
    var ch = result.ch;
    var opener;

    if (isEscaping(stack)) {
      stack.pop();
    }
    else if (isInCode(stack)) {
      if (isValidCloser(stack, ch)) {
        opener = stack.pop();
        result.maxIndent = opener.x;
        backup.push(opener);
      }
      else {
        // erase non-matched paren
        result.ch = "";
      }
    }
  }

  function pushTab(result) {
    if (!isInStr(result.stack)) {
      result.ch = "  ";
    }
  }

  function pushSemicolon(result) {
    var stack = result.stack;
    if (isEscaping(stack)) {
      stack.pop();
    }
    else if (isInCode(stack)) {
      stack.push({
        x: result.x,
        ch: result.ch
      });
    }
  }

  function pushNewline(result) {
    var stack = result.stack;
    if (isEscaping(stack)) {
      stack.pop();
    }
    if (isInComment(stack)) {
      stack.pop();
    }
    result.ch = "";
  }

  function pushEscape(result) {
    var stack = result.stack;
    if (isEscaping(stack)) {
      stack.pop();
    }
    else {
      stack.push({
        x: result.x,
        ch: result.ch
      });
    }
  }

  function pushQuote(result) {
    var stack = result.stack;
    if (isEscaping(stack)) {
      stack.pop();
    }
    else if (isInStr(stack)) {
      stack.pop();
    }
    else if (isInComment(stack)) {
      result.quoteDanger = !result.quoteDanger;
    }
    else {
      stack.push({
        x: result.x,
        ch: result.ch
      });
    }
  }

  function pushDefault(result) {
    var stack = result.stack;
    if (isEscaping(stack)) {
      stack.pop();
    }
  }

/**************************** INDENT MODE OPERATIONS *******************************/

  function closeParens(result, indentX) {
    if (indentX == null) {
      indentX = 0;
    }

    var stack = result.stack;
    var parens = "";

    while (stack.length > 0) {
      var opener = peek(stack);
      if (opener.x >= indentX) {
        stack.pop();
        parens += matchingParen[opener.ch];
      }
      else {
        break;
      }
    }

    var newString =
      insertString(
        result.lines[result.insert.lineNo],
        result.insert.x,
        parens
      );

    result.lines[result.insert.lineNo] = newString;
  }

  function updateParenTrail(result) {
    var ch = result.ch;
    var shouldPass = (
      ch === ";" ||
      ch === "," ||
      isWhitespace(ch) ||
      isCloseParen(ch)
    );

    var stack = result.stack;
    var shouldReset = (
      isInCode(stack) && (
        isEscaping(stack) ||
        !shouldPass
      )
    );

    result.isCursorInComment = (
      result.isCursorInComment || (
        result.cursorLine === result.lineNo &&
        result.x === result.cursorX &&
        isInComment(stack)
      )
    );

    var shouldUpdate = (
      isInCode(stack) &&
      !isEscaping(stack) &&
      isCloseParen(ch) &&
      isValidCloser(stack, ch)
    );

    if (shouldReset) {
      result.backup = [];
      result.parenTrail = {};
      result.maxIndent = null;
    }
    else if (shouldUpdate) {
      if (result.parenTrail.start == null) {
        result.parenTrail.start = result.x;
      }
      result.parenTrail.end = result.x+1;
    }
  }

  function blockParenTrail(result) {
    var start = result.parenTrail.start;
    var end = result.parenTrail.end;
    var isCursorBlocking = (
      result.lineNo === result.cursorLine &&
      start != null &&
      result.cursorX > start &&
      !result.isCursorInComment
    );

    if (start != null && isCursorBlocking) {
      start = Math.max(start, result.cursorX);
    }

    if (end != null && isCursorBlocking) {
      end = Math.max(end, result.cursorX);
    }

    if (start === end) {
      start = end = null;
    }

    result.parenTrail.start = start;
    result.parenTrail.end = end;
  }

  function removeParenTrail(result) {
    var start = result.parenTrail.start;
    var end = result.parenTrail.end;

    if (start == null || end == null) {
      return;
    }

    var stack = result.stack;
    var backup = result.backup;

    var line = result.lines[result.lineNo];
    var removeCount = 0;
    var i;
    for (i=start; i<end; i++) {
      if (isCloseParen(line[i])) {
        removeCount++;
      }
    }

    var ignoreCount = backup.length - removeCount;
    while (ignoreCount !== backup.length) {
      stack.push(backup.pop());
    }

    result.lines[result.lineNo] = removeStringRange(line, start, end);

    if (result.insert.lineNo === result.lineNo) {
      result.insert.x = Math.min(result.insert.x, start);
    }
  }

  function updateInsertionPt(result) {
    var line = result.lines[result.lineNo];
    var prevCh = line[result.x-1];
    var ch = result.ch;

    var shouldInsert = (
      isInCode(result.stack) &&
      ch !== "" &&
      (!isWhitespace(ch) || prevCh === "\\") &&
      (!isCloseParen(ch) || result.lineNo === result.cursorLine)
    );

    if (shouldInsert) {
      result.insert = {lineNo: result.lineNo, x: result.x+1};
    }
  }

  function processIndentTrigger(result) {
    closeParens(result, result.x);
    result.trackIndent = false;
  }

  function processIndent(result) {
    var stack = result.stack;
    var ch = result.ch;

    var checkIndent = (
      result.trackIndent &&
      isInCode(stack) &&
      !isWhitespace(ch) &&
      ch !== ";"
    );
    var skip = checkIndent && isCloseParen(ch);
    var atIndent = checkIndent && !skip;
    var quit = atIndent && result.quoteDanger;

    result.quit = quit;
    result.process = !skip && !quit;

    if (atIndent && !quit) {
      processIndentTrigger(result);
    }
  }

  function updateLine(result, origCh) {
    var ch = result.ch
    if (origCh !== ch) {
      var line = result.lines[result.lineNo];
      result.lines[result.lineNo] = replaceStringRange(line, result.x, result.x+origCh.length, ch);
    }
  }

  function processChar(result, ch) {
    var origCh = ch;
    result.ch = ch;
    processIndent(result);

    if (result.quit) {
      return;
    }

    if (result.process) {
      // NOTE: the order here is important!
      updateParenTrail(result);
      pushChar(result);
      updateInsertionPt(result);
    }
    else {
      result.ch = "";
    }

    updateLine(result, origCh);
    result.x += result.ch.length;
  }

  function processLine(result, line) {
    var stack = result.stack;

    result.lineNo++;
    result.backup = [];
    result.cursorInComment = false;
    result.parenTrail = {start: null, end: null};
    result.trackIndent = (stack.length > 0 && !isInStr(stack));
    result.lines.push(line);
    result.x = 0;

    var i;
    var chars = line + "\n";
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
    result.success = !isInStr(stack) && !result.quoteDanger;
    if (result.success && stack.length > 0) {
      closeParens(result);
    }
  }

  function processText(text, options) {
    var result = getInitialResult();

    if (options) {
      result.cursorX = options.cursorX;
      result.cursorLine = options.cursorLine;
    }

    var lines = text.split("\n");
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

  function formatText(text, options) {
    var result = processText(text, options);
    var outText = result.success ? result.lines.join("\n") : text;
    return {
      text: outText,
      success: result.success
    };
  }


/**************************** PAREN MODE OPERATIONS *******************************/

  // NOTE: Paren Mode reuses some Indent Mode functions

  function appendParenTrail(result) {
    var opener = result.stack.pop();
    var closeCh = matchingParen[opener.ch];
    result.maxIndent = opener.x;
    var i = result.insert.lineNo;
    var line = result.lines[i];
    result.lines[i] = insertString(line, result.insert.x, closeCh);
    result.insert.x++;
  }

  function minIndent(x, result) {
    var opener = peek(result.stack);
    if (opener != null) {
      var startX = opener.x;
      return Math.max(startX+1, x);
    }
    return x;
  }

  function minDedent(x, result) {
    if (result.maxIndent != null) {
      return Math.min(result.maxIndent, x);
    }
    return x;
  }

  function correctIndent(result) {
    var opener = peek(result.stack);
    var delta = 0;
    if (opener != null && opener.indentDelta != null) {
      delta = opener.indentDelta;
    }
    var newX = result.x + delta;
    newX = minIndent(newX, result);
    newX = minDedent(newX, result);

    result.indentDelta += (newX - result.x);

    if (newX !== result.x) {
      var i,indentStr="";
      for (i=0; i<newX; i++) {
        indentStr += " ";
      }
      var line = result.lines[result.lineNo];
      var newLine = replaceStringRange(line, 0, result.x, indentStr);
      result.lines[result.lineNo] = newLine;
      result.x = newX;
    }

    result.trackIndent = false;
    result.maxIndent = null;
  }

  function handleCursorDelta(result) {
    var hasCursorDelta = (
      result.cursorLine === result.lineNo &&
      result.cursorX === result.x &&
      result.cursorX != null
    );

    if (hasCursorDelta) {
      result.indentDelta += result.cursorDx;
    }
  }

  function processIndent_paren(result) {
    var ch = result.ch;
    var stack = result.stack;

    var checkIndent = (
      result.trackIndent &&
      isInCode(stack) &&
      !isWhitespace(ch) &&
      result.ch !== ";"
    );

    var atValidCloser = (
      checkIndent &&
      isCloseParen(ch) &&
      isValidCloser(stack, ch)
    );

    var isCursorHolding = (
      result.lineNo === result.cursorLine &&
      result.cursorX != null &
      result.cursorX <= result.x
    );

    var shouldMoveCloser = (
      atValidCloser &&
      !isCursorHolding
    );

    var skip = (
      checkIndent &&
      isCloseParen(ch) &&
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

  function processChar_paren(result, ch) {
    var origCh = ch;
    result.ch = ch;
    processIndent_paren(result);

    if (result.quit) {
      return;
    }

    if (result.process) {
      // NOTE: the order here is important!
      updateParenTrail(result);
      pushChar(result);
      updateInsertionPt(result);
    }
    else {
      result.ch = "";
    }

    updateLine(result, origCh);
    result.x += result.ch.length;
  }

  function formatParenTrail(result) {
    var start = result.parenTrail.start;
    var end = result.parenTrail.end;

    if (start == null || end == null) {
      return;
    }

    var line = result.lines[result.lineNo];
    var newTrail = "";
    var spaceCount = 0;
    var i;
    for (i=start; i<end; i++) {
      if (isCloseParen(line[i])) {
        newTrail += line[i];
      }
      else {
        spaceCount++;
      }
    }

    if (spaceCount > 0) {
      result.lines[result.lineNo] = replaceStringRange(line, start, end, newTrail);
      end -= spaceCount;
    }

    if (result.insert.lineNo === result.lineNo) {
      result.insert.x = end;
    }
  }

  function processLine_paren(result, line) {
    result.lineNo++;
    result.backup = [];
    result.cursorInComment = false;
    result.parenTrail = {start: null, end: null};
    result.trackIndent = !isInStr(result.stack);
    result.lines.push(line);
    result.x = 0;

    result.indentDelta = 0;

    var i;
    var chars = line + "\n";
    for (i=0; i<chars.length; i++) {
      processChar_paren(result, chars[i]);
      if (result.quit) {
        break;
      }
    }

    if (!result.quit) {
      formatParenTrail(result);
    }
  }

  function finalizeResult_paren(result) {
    result.success = (
      result.stack.length === 0 &&
      !result.quoteDanger
    );
  }

  function processText_paren(text, options) {
    var result = getInitialResult();

    if (options) {
      result.cursorX = options.cursorX;
      result.cursorLine = options.cursorLine;
      result.cursorDx = options.cursorDx;
    }

    var lines = text.split("\n");
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

  function formatText_paren(text, options) {
    var result = processText_paren(text, options);
    var outText = result.success ? result.lines.join("\n") : text;
    return {
      text: outText,
      success: result.success
    };
  }

/**************************** PUBLIC API *******************************/

  var API = {
    indentMode: formatText,
    parenMode: formatText_paren
  };

  return API;

}));
