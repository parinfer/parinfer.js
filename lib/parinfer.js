//
// Parinfer 1.0.0
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

/**************************** RESULT STRUCTURE *******************************/

  function getInitialResult(mode) {
    return {
      cursorX: null,
      cursorLine: null,
      cursorDx: null,
      lines: [],
      insert: {lineDy: null, x: null},
      lineNo: -1,
      quoteDanger: false,
      trackIndent: false,
      delimTrail: {start: null, end: null},
      stack: [],
      backup: [],
      dedentX: null,
      indentDelta: 0,
      cursorInComment: false,
      ch: "",
      x: 0,
      quit: false,
      process: false,
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

  var matchingDelim = {
    "{": "}",
    "}": "{",
    "[": "]",
    "]": "[",
    "(": ")",
    ")": "("
  };

  function isOpenDelim(c) {
    return c === "{" || c === "(" || c === "[";
  }

  function isCloseDelim(c) {
    return c === "}" || c === ")" || c === "]";
  }

  function isWhitespace(c) {
    return c === " " || c === "\t" || c=== "\n";
  }

  //------------------------------------------------------------------------
  // Delimiter Stack states
  //
  //   State is tracked by checking last pushed character.
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
    return getPrevCh(stack) === matchingDelim[ch];
  }

  //------------------------------------------------------------------------
  // Delimiter Stack operations (they MUTATE)
  //
  //
  //   We track delimiters by using a stack of maps containing [:x-pos :ch :indent-delta].
  //   State is tracked by checking last character.
  //------------------------------------------------------------------------

  function pushChar(result) {
    var ch = result.ch;
    if (isOpenDelim(ch))       { pushOpen(result); }
    else if (isCloseDelim(ch)) { pushClose(result); }
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
        result.dedentX = opener.x;
        backup.push(opener);
      }
      else {
        // erase non-matched delimiter
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

  function closeDelims(result, indentX) {
    if (indentX == null) {
      indentX = 0;
    }

    var stack = result.stack;
    var delims = "";

    while (true) {
      if (stack.length === 0) {
        break;
      }
      var opener = peek(stack);
      if (opener.x >= indentX) {
        stack.pop();
        delims += matchingDelim[opener.ch];
      }
      else {
        break;
      }
    }

    var insertLineNo = result.insert.lineDy + result.lineNo;
    var newString =
      insertString(
        result.lines[insertLineNo],
        result.insert.x,
        delims
      );

    result.lines[insertLineNo] = newString;
  }

  function updateDelimTrail(result) {
    var ch = result.ch;
    var shouldPass = (
      ch === ";" ||
      ch === "," ||
      isWhitespace(ch) ||
      isCloseDelim(ch)
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
      isCloseDelim(ch) &&
      isValidCloser(stack, ch)
    );

    if (shouldReset) {
      result.backup = [];
      result.delimTrail = {};
      result.dedentX = null;
    }
    else if (shouldUpdate) {
      if (result.delimTrail.start == null) {
        result.delimTrail.start = result.x;
      }
      result.delimTrail.end = result.x+1;
    }
  }

  function blockDelimTrail(result) {
    var start = result.delimTrail.start;
    var end = result.delimTrail.end;
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

    result.delimTrail.start = start;
    result.delimTrail.end = end;
  }

  function removeDelimTrail(result) {
    var start = result.delimTrail.start;
    var end = result.delimTrail.end;

    if (start == null || end == null) {
      return;
    }

    var stack = result.stack;
    var backup = result.backup;

    var line = result.lines[result.lineNo];
    var removeCount = 0;
    var i;
    for (i=start; i<end; i++) {
      if (isCloseDelim(line[i])) {
        removeCount++;
      }
    }

    var ignoreCount = backup.length - removeCount;
    while (ignoreCount !== backup.length) {
      stack.push(backup.pop());
    }

    result.lines[result.lineNo] = removeStringRange(line, start, end);

    if (result.insert.lineDy === 0) {
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
      (!isCloseDelim(ch) || result.lineNo === result.cursorLine)
    );

    if (shouldInsert) {
      result.insert = {lineDy:0, x: result.x+1};
    }
  }

  function processIndentTrigger(result) {
    closeDelims(result, result.x);
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
    var skip = checkIndent && isCloseDelim(ch);
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
    if (origCh === ch) {
    }
    else {
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
      updateDelimTrail(result);
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
    result.delimTrail = {start: null, end: null};
    result.trackIndent = (stack.length > 0 && !isInStr(stack));
    result.lines.push(line);
    result.x = 0;

    if (result.insert.lineDy != null) {
      result.insert.lineDy--;
    }

    var i;
    var chars = line + "\n";
    for (i=0; i<chars.length; i++) {
      processChar(result, chars[i]);
      if (result.quit) {
        break;
      }
    }

    if (!result.quit) {
      blockDelimTrail(result);
      removeDelimTrail(result);
    }
  }

  function finalizeResult(result) {
    var stack = result.stack;
    result.isValid = !isInStr(stack) && !result.quoteDanger;
    if (result.isValid && stack.length > 0) {
      closeDelims(result);
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
    var outText = result.isValid ? result.lines.join("\n") : text;
    return {
      text: outText,
      isValid: result.isValid,
      result: result
    };
  }


/**************************** PAREN MODE OPERATIONS *******************************/

  // NOTE: Paren Mode reuses some Indent Mode functions

  function appendDelimTrail(result) {
    var opener = result.stack.pop();
    var closeCh = matchingDelim[opener.ch];
    result.dedentX = opener.x;
    var i = result.lineNo + result.insert.lineDy;
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
    if (result.dedentX != null) {
      return Math.min(result.dedentX, x);
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
    result.dedentX = null;
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
      isCloseDelim(ch) &&
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
      isCloseDelim(ch) &&
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
      appendDelimTrail(result);
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
      updateDelimTrail(result);
      pushChar(result);
      updateInsertionPt(result);
    }
    else {
      result.ch = "";
    }

    updateLine(result, origCh);
    result.x += result.ch.length;
  }

  function formatDelimTrail(result) {
    var start = result.delimTrail.start;
    var end = result.delimTrail.end;

    if (start == null || end == null) {
      return;
    }

    var line = result.lines[result.lineNo];
    var newTrail = "";
    var spaceCount = 0;
    var i;
    for (i=start; i<end; i++) {
      if (isCloseDelim(line[i])) {
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

    if (result.insert.lineDy === 0) {
      result.insert.x = end;
    }
  }

  function processLine_paren(result, line) {
    result.lineNo++;
    result.backup = [];
    result.cursorInComment = false;
    result.delimTrail = {start: null, end: null};
    result.trackIndent = !isInStr(result.stack);
    result.lines.push(line);
    result.x = 0;

    result.indentDelta = 0;

    if (result.insert.lineDy != null) {
      result.insert.lineDy--;
    }

    var i;
    var chars = line + "\n";
    for (i=0; i<chars.length; i++) {
      processChar_paren(result, chars[i]);
      if (result.quit) {
        break;
      }
    }

    if (!result.quit) {
      formatDelimTrail(result);
    }
  }

  function finalizeResult_paren(result) {
    result.isValid = (
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
    var outText = result.isValid ? result.lines.join("\n") : text;
    return {
      text: outText,
      isValid: result.isValid,
      result: result
    };
  }

/**************************** PUBLIC API *******************************/

  var API = {
    indentMode: formatText,
    parenMode: formatText_paren
  };

  return API;

}));
