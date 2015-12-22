//
// Parinfer 0.2.3
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

  function pushChar(obj) {
    var ch = obj.ch;
    if (isOpenDelim(ch))       { pushOpen(obj); }
    else if (isCloseDelim(ch)) { pushClose(obj); }
    else {
      switch (ch) {
        case "\t": pushTab(obj); break;
        case ";":  pushSemicolon(obj); break;
        case "\n": pushNewline(obj); break;
        case "\\": pushEscape(obj); break;
        case "\"": pushQuote(obj); break;
        default:   pushDefault(obj);
      }
    }
  }

  function pushOpen(obj) {
    var stack = obj.stack;
    if (isEscaping(stack)) {
      stack.pop();
    }
    else if (isInCode(stack)) {
      stack.push({
        x: obj.x,
        ch: obj.ch,
        indentDelta: obj.indentDelta
      });
    }
  }

  function pushClose(obj) {
    var stack = obj.stack;
    var backup = obj.backup;
    var ch = obj.ch;
    var opener;

    if (isEscaping(stack)) {
      stack.pop();
    }
    else if (isInCode(stack)) {
      if (isValidCloser(stack, ch)) {
        opener = stack.pop();
        obj.dedentX = opener.x;
        backup.push(opener);
      }
      else {
        // erase non-matched delimiter
        obj.ch = "";
      }
    }
  }

  function pushTab(obj) {
    if (!isInStr(obj.stack)) {
      obj.ch = "  ";
    }
  }

  function pushSemicolon(obj) {
    var stack = obj.stack;
    if (isEscaping(stack)) {
      stack.pop();
    }
    else if (isInCode(stack)) {
      stack.push({
        x: obj.x,
        ch: obj.ch
      });
    }
  }

  function pushNewline(obj) {
    var stack = obj.stack;
    if (isEscaping(stack)) {
      stack.pop();
    }
    if (isInComment(stack)) {
      stack.pop();
    }
    obj.ch = "";
  }

  function pushEscape(obj) {
    var stack = obj.stack;
    if (isEscaping(stack)) {
      stack.pop();
    }
    else {
      stack.push({
        x: obj.x,
        ch: obj.ch
      });
    }
  }

  function pushQuote(obj) {
    var stack = obj.stack;
    if (isEscaping(stack)) {
      stack.pop();
    }
    else if (isInStr(stack)) {
      stack.pop();
    }
    else if (isInComment(stack)) {
      obj.quoteDanger = !obj.quoteDanger;
    }
    else {
      stack.push({
        x: obj.x,
        ch: obj.ch
      });
    }
  }

  function pushDefault(obj) {
    var stack = obj.stack;
    if (isEscaping(stack)) {
      stack.pop();
    }
  }

/**************************** INDENT MODE OPERATIONS *******************************/

  function getInitialState(mode) {
    return {
      lines: [],
      insert: {lineDy: null, x: null},
      lineNo: -1,
      quoteDanger: false,
      trackIndent: false,
      delimTrail: {start: null, end: null},
      stack: [],
      backup: [],
      dedentX: null,
      indentDelta: 0
    };
  }

  function closeDelims(state, indentX) {
    if (indentX == null) {
      indentX = 0;
    }

    var stack = state.stack;
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

    var insertLineNo = state.insert.lineDy + state.lineNo;
    var newString =
      insertString(
        state.lines[insertLineNo],
        state.insert.x,
        delims
      );

    state.lines[insertLineNo] = newString;
  }

  function updateDelimTrail(state) {
    var ch = state.ch;
    var shouldPass = (
      ch === ";" ||
      ch === "," ||
      isWhitespace(ch) ||
      isCloseDelim(ch)
    );

    var stack = state.stack;
    var shouldReset = (
      isInCode(stack) && (
        isEscaping(stack) ||
        !shouldPass
      )
    );

    state.isCursorInComment = (
      state.isCursorInComment || (
        state.cursorLine === state.lineNo &&
        state.x === state.cursorX &&
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
      state.backup = [];
      state.delimTrail = {};
      state.dedentX = null;
    }
    else if (shouldUpdate) {
      if (state.delimTrail.start == null) {
        state.delimTrail.start = state.x;
      }
      state.delimTrail.end = state.x+1;
    }
  }

  function blockDelimTrail(state) {
    var start = state.delimTrail.start;
    var end = state.delimTrail.end;
    var isCursorBlocking = (
      state.lineNo === state.cursorLine &&
      start != null &&
      state.cursorX > start &&
      !state.isCursorInComment
    );

    if (start != null && isCursorBlocking) {
      start = Math.max(start, state.cursorX);
    }

    if (end != null && isCursorBlocking) {
      end = Math.max(end, state.cursorX);
    }

    if (start === end) {
      start = end = null;
    }

    state.delimTrail.start = start;
    state.delimTrail.end = end;
  }

  function removeDelimTrail(state) {
    var start = state.delimTrail.start;
    var end = state.delimTrail.end;

    if (start == null || end == null) {
      return;
    }

    var stack = state.stack;
    var backup = state.backup;

    var line = state.lines[state.lineNo];
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

    state.lines[state.lineNo] = removeStringRange(line, start, end);

    if (state.insert.lineDy === 0) {
      state.insert.x = Math.min(state.insert.x, start);
    }
  }

  function updateInsertionPt(state) {
    var line = state.lines[state.lineNo];
    var prevCh = line[state.x-1];
    var ch = state.ch;

    var shouldInsert = (
      isInCode(state.stack) &&
      ch !== "" &&
      (!isWhitespace(ch) || prevCh === "\\") &&
      (!isCloseDelim(ch) || state.lineNo === state.cursorLine)
    );

    if (shouldInsert) {
      state.insert = {lineDy:0, x: state.x+1};
    }
  }

  function processIndentTrigger(state) {
    closeDelims(state, state.x);
    state.trackIndent = false;
  }

  function processIndent(state) {
    var stack = state.stack;
    var ch = state.ch;

    var checkIndent = (
      state.trackIndent &&
      isInCode(stack) &&
      !isWhitespace(ch) &&
      ch !== ";"
    );
    var skip = checkIndent && isCloseDelim(ch);
    var atIndent = checkIndent && !skip;
    var quit = atIndent && state.quoteDanger;

    state.quit = quit;
    state.process = !skip && !quit;

    if (atIndent && !quit) {
      processIndentTrigger(state);
    }
  }

  function updateLine(state, origCh) {
    var ch = state.ch
    if (origCh === ch) {
    }
    else {
      var line = state.lines[state.lineNo];
      state.lines[state.lineNo] = replaceStringRange(line, state.x, state.x+origCh.length, ch);
    }
  }

  function processChar(state, ch) {
    var origCh = ch;
    state.ch = ch;
    processIndent(state);

    if (state.quit) {
      return;
    }

    if (state.process) {
      // NOTE: the order here is important!
      updateDelimTrail(state);
      pushChar(state);
      updateInsertionPt(state);
    }
    else {
      state.ch = "";
    }

    updateLine(state, origCh);
    state.x += state.ch.length;
  }

  function processLine(state, line) {
    var stack = state.stack;

    state.lineNo++;
    state.backup = [];
    state.cursorInComment = false;
    state.delimTrail = {start: null, end: null};
    state.trackIndent = (stack.length > 0 && !isInStr(stack));
    state.lines.push(line);
    state.x = 0;

    if (state.insert.lineDy != null) {
      state.insert.lineDy--;
    }

    var i;
    var chars = line + "\n";
    for (i=0; i<chars.length; i++) {
      processChar(state, chars[i]);
      if (state.quit) {
        break;
      }
    }

    if (!state.quit) {
      blockDelimTrail(state);
      removeDelimTrail(state);
    }
  }

  function finalizeState(state) {
    var stack = state.stack;
    state.isValid = !isInStr(stack) && !state.quoteDanger;
    if (state.isValid && stack.length > 0) {
      closeDelims(state);
    }
  }

  function processText(text, options) {
    var state = getInitialState();

    if (options) {
      state.cursorX = options.cursorX;
      state.cursorLine = options.cursorLine;
    }

    var lines = text.split("\n");
    var i;
    for (i=0; i<lines.length; i++) {
      processLine(state, lines[i]);
      if (state.quit) {
        break;
      }
    }
    finalizeState(state);
    return state;
  }

  function formatText(text, options) {
    var state = processText(text, options);
    var outText = state.isValid ? state.lines.join("\n") : text;
    return {
      text: outText,
      isValid: state.isValid,
      state: state
    };
  }


/**************************** PAREN MODE OPERATIONS *******************************/

  // NOTE: Paren Mode reuses some Indent Mode functions

  function appendDelimTrail(state) {
    var opener = state.stack.pop();
    var closeCh = matchingDelim[opener.ch];
    state.dedentX = opener.x;
    var i = state.lineNo + state.insert.lineDy;
    var line = state.lines[i];
    state.lines[i] = insertString(line, state.insert.x, closeCh);
    state.insert.x++;
  }

  function minIndent(x, state) {
    var opener = peek(state.stack);
    if (opener != null) {
      var startX = opener.x;
      return Math.max(startX+1, x);
    }
    return x;
  }

  function minDedent(x, state) {
    if (state.dedentX != null) {
      return Math.min(state.dedentX, x);
    }
    return x;
  }

  function correctIndent(state) {
    var opener = peek(state.stack);
    var delta = 0;
    if (opener != null && opener.indentDelta != null) {
      delta = opener.indentDelta;
    }
    var newX = state.x + delta;
    newX = minIndent(newX, state);
    newX = minDedent(newX, state);

    state.indentDelta += (newX - state.x);

    if (newX !== state.x) {
      var i,indentStr="";
      for (i=0; i<newX; i++) {
        indentStr += " ";
      }
      var line = state.lines[state.lineNo];
      var newLine = replaceStringRange(line, 0, state.x, indentStr);
      state.lines[state.lineNo] = newLine;
      state.x = newX;
    }

    state.trackIndent = false;
    state.dedentX = null;
  }

  function handleCursorDelta(state) {
    var hasCursorDelta = (
      state.cursorLine === state.lineNo &&
      state.cursorX === state.x &&
      state.cursorX != null
    );

    if (hasCursorDelta) {
      state.indentDelta += state.cursorDx;
    }
  }

  function processIndent_paren(state) {
    var ch = state.ch;
    var stack = state.stack;

    var checkIndent = (
      state.trackIndent &&
      isInCode(stack) &&
      !isWhitespace(ch) &&
      state.ch !== ";"
    );

    var atValidCloser = (
      checkIndent &&
      isCloseDelim(ch) &&
      isValidCloser(stack, ch)
    );

    var isCursorHolding = (
      state.lineNo === state.cursorLine &&
      state.cursorX != null &
      state.cursorX <= state.x
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
    var quit = atIndent && state.quoteDanger;

    state.quit = quit;
    state.process = !skip;

    if (quit) {
      return;
    }

    if (shouldMoveCloser) {
      appendDelimTrail(state);
    }

    handleCursorDelta(state);

    if (atIndent) {
      correctIndent(state);
    }
  }

  function processChar_paren(state, ch) {
    var origCh = ch;
    state.ch = ch;
    processIndent_paren(state);

    if (state.quit) {
      return;
    }

    if (state.process) {
      // NOTE: the order here is important!
      updateDelimTrail(state);
      pushChar(state);
      updateInsertionPt(state);
    }
    else {
      state.ch = "";
    }

    updateLine(state, origCh);
    state.x += state.ch.length;
  }

  function formatDelimTrail(state) {
    var start = state.delimTrail.start;
    var end = state.delimTrail.end;

    if (start == null || end == null) {
      return;
    }

    var line = state.lines[state.lineNo];
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
      state.lines[state.lineNo] = replaceStringRange(line, start, end, newTrail);
      end -= spaceCount;
    }

    if (state.insert.lineDy === 0) {
      state.insert.x = end;
    }
  }

  function processLine_paren(state, line) {
    state.lineNo++;
    state.backup = [];
    state.cursorInComment = false;
    state.delimTrail = {start: null, end: null};
    state.trackIndent = !isInStr(state.stack);
    state.lines.push(line);
    state.x = 0;

    state.indentDelta = 0;

    if (state.insert.lineDy != null) {
      state.insert.lineDy--;
    }

    var i;
    var chars = line + "\n";
    for (i=0; i<chars.length; i++) {
      processChar_paren(state, chars[i]);
      if (state.quit) {
        break;
      }
    }

    if (!state.quit) {
      formatDelimTrail(state);
    }
  }

  function finalizeState_paren(state) {
    state.isValid = (
      state.stack.length === 0 &&
      !state.quoteDanger
    );
  }

  function processText_paren(text, options) {
    var state = getInitialState();

    if (options) {
      state.cursorX = options.cursorX;
      state.cursorLine = options.cursorLine;
    }

    var lines = text.split("\n");
    var i;
    for (i=0; i<lines.length; i++) {
      processLine_paren(state, lines[i]);
      if (state.quit) {
        break;
      }
    }
    finalizeState_paren(state);
    return state;
  }

  function formatText_paren(text, options) {
    var state = processText_paren(text, options);
    var outText = state.isValid ? state.lines.join("\n") : text;
    return {
      text: outText,
      isValid: state.isValid,
      state: state
    };
  }

/**************************** PUBLIC API *******************************/

  var API = {
    indentMode: {
      processText: processText,
      formatText: formatText,
    },
    parenMode: {
      processText: processText_paren,
      formatText: formatText_paren,
    }
  };

  return API;

}));
