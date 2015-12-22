Parinfer.parenMode = (function(){

  var indentMode = Parinfer.indentMode;
  var reader = Parinfer.reader;
  var string = Parinfer.string;

  function getInitialState() {
    var state = indentMode.getInitialState();
    state.dedentX = null;
    state.indentDelta = 0;
    return state;
  }

  function appendDelimTrail(state) {
    var opener = state.stack.pop();
    var closeCh = reader.matchingDelim[opener.ch];
    state.dedentX = opener.x;
    var i = state.lineNo + state.insert.lineDy;
    var line = state.lines[i];
    state.lines[i] = string.insert(line, state.insert.x, closeCh);
    state.insert.x++;
  }

  function minIndent(x, state) {
    var opener = reader.peek(state.stack);
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
    var opener = reader.peek(state.stack);
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
      var newLine = string.replaceRange(line, 0, state.x, indentStr);
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

  function processIndent(state) {
    var ch = state.ch;
    var stack = state.stack;

    var checkIndent = (
      state.trackIndent &&
      reader.isInCode(stack) &&
      !reader.isWhitespace(ch) &&
      state.ch !== ";"
    );

    var atValidCloser = (
      checkIndent &&
      reader.isCloseDelim(ch) &&
      reader.isValidCloser(stack, ch)
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
      reader.isCloseDelim(ch) &&
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

  function processChar(state, ch) {
    var origCh = ch;
    state.ch = ch;
    processIndent(state);

    if (state.quit) {
      return;
    }

    if (state.process) {
      // NOTE: the order here is important!
      indentMode.updateDelimTrail(state);
      reader.pushChar(state);
      indentMode.updateInsertionPt(state);
    }
    else {
      state.ch = "";
    }

    indentMode.updateLine(state, origCh);
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
      if (reader.isCloseDelim(line[i])) {
        newTrail += line[i];
      }
      else {
        spaceCount++;
      }
    }

    if (spaceCount > 0) {
      state.lines[state.lineNo] = string.replaceRange(line, start, end, newTrail);
      end -= spaceCount;
    }

    if (state.insert.lineDy === 0) {
      state.insert.x = end;
    }
  }

  function postProcessLine(state) {
    formatDelimTrail(state);
  }

  function processLine(state, line) {
    state.lineNo++;
    state.backup = [];
    state.cursorInComment = false;
    state.delimTrail = {start: null, end: null};
    state.trackIndent = !reader.isInStr(state.stack);
    state.lines.push(line);
    state.x = 0;

    state.indentDelta = 0;
    state.removedDelims = [];

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
      postProcessLine(state);
    }
  }

  function finalizeState(state) {
    state.isValid = (
      state.stack.length === 0 &&
      !state.quoteDanger
    );
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

  return {
    getInitialState: getInitialState,
    appendDelimTrail: appendDelimTrail,
    minIndent: minIndent,
    minDedent: minDedent,
    correctIndent: correctIndent,
    handleCursorDelta: handleCursorDelta,
    processIndent: processIndent,
    processChar: processChar,
    processLine: processLine,
    finalizeState: finalizeState,
    processText: processText,
    formatText: formatText
  };
})();
