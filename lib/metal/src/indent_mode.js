
Parinfer.indentMode = (function(){

  var reader = Parinfer.reader;
  var string = Parinfer.string;

  function getInitialState() {
    return {
      lines: [],
      insert: {lineDy: null, x: null},
      lineNo: -1,
      quoteDanger: false,
      trackIndent: false,
      delimTrail: {start: null, end: null},
      stack: [],
      backup: []
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
      var opener = reader.peek(stack);
      if (opener.x >= indentX) {
        stack.pop();
        delims += reader.matchingDelim[opener.ch];
      }
      else {
        break;
      }
    }

    var insertLineNo = state.insert.lineDy + state.lineNo;
    var newString =
      string.insert(
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
      reader.isWhitespace(ch) ||
      reader.isCloseDelim(ch)
    );

    var stack = state.stack;
    var shouldReset = (
      reader.isInCode(stack) && (
        reader.isEscaping(stack) ||
        !shouldPass
      )
    );

    state.isCursorInComment = (
      state.isCursorInComment || (
        state.cursorLine === state.lineNo &&
        state.x === state.cursorX &&
        reader.isInComment(stack)
      )
    );

    var shouldUpdate = (
      reader.isInCode(stack) &&
      !reader.isEscaping(stack) &&
      reader.isCloseDelim(ch) &&
      reader.isValidCloser(stack, ch)
    );

    if (shouldReset) {
      state.backup = [];
      state.delimTrail = {};
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

    var line = state.lines[state.lineNo];
    var delims = [];
    var trail = line.substr(line, start, end);
    var i;
    for (i=0; i<trail.length; i++) {
      if (reader.isCloseDelim(trail[i])) {
        delims.push(trail[i]);
      }
    }

    var removeCount = delims.length;
    var ignoreCount = state.backup.length - removeCount;


    if (state.insert.lineDy === 0) {
      state.insert.x = Math.min(state.insert.x, start);
    }
  }

  function updateInsertionPt(state) {
    var line = state.lines[state.lineNo];
    var prevCh = line[line.length-1];
    var ch = state.ch;

    var shouldInsert = (
      reader.isInCode(state.stack) &&
      ch !== "" &&
      (!reader.isWhitespace(ch) || prevCh === "\\") &&
      (!reader.isCloseDelim(ch) || state.lineNo === state.cursorLine)
    );

    if (shouldInsert) {
      state.insert = {lineDy:0, x: state.x+1};
    }
  }

  function processIndentTrigger(state) {
    closeDelims(state, state.x);
    state.trackIndent = false;
    state.processedIndent = true;
  }

  function processIndent(state) {
    var stack = state.stack;
    var ch = state.ch;

    var checkIndent = (
      state.trackIndent &&
      reader.isInCode(stack) &&
      !reader.isWhitespace(ch) &&
      ch !== ";"
    );
    var skip = checkIndent && reader.isCloseDelim(ch);
    var atIndent = checkIndent && !skip;
    var quit = atIndent && state.quoteDanger;

    state.quit = quit;
    state.process = !skip && !quit;

    if (atIndent && !quit) {
      processIndentTrigger(state);
    }
  }

  function updateLine(state) {
    state.lines[state.lineNo] += state.ch;
  }

  function savePreinsertLine(state) {
    if (state.insert.lineDy === 0) {
      state.insert.line = state.lines[state.lineNo];
    }
  }

  function processChar(state, ch) {
    state.x = state.lines[state.lineNo].length;
    state.ch = ch;
    processIndent(state);
    if (!state.quit && state.process) {
      // NOTE: the order here is important!
      updateDelimTrail(state);
      reader.pushChar(state);
      updateInsertionPt(state);
      updateLine(state);
    }
  }

  function postProcessLine(state) {
    blockDelimTrail(state);
    removeDelimTrail(state);
    savePreinsertLine(state);
  }

  function processLine(state, line) {
    var stack = state.stack;

    state.lineNo++;
    state.backup = [];
    state.cursorInComment = false;
    state.delimTrail = {start: null, end: null};
    state.trackIndent = (stack.length > 0 && !reader.isInStr(stack));
    state.processedIndent = false;
    state.lines.push("");
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
    var stack = state.stack;
    state.isValid = !reader.isInStr(stack) && !state.quoteDanger;
    if (state.isValid && stack.length > 0) {
      closeDelims(state);
    }
  }

  function processText(text, options) {
    var state = getInitialState();
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
    closeDelims: closeDelims,
    updateDelimTrail: updateDelimTrail,
    blockDelimTrail: blockDelimTrail,
    removeDelimTrail: removeDelimTrail,
    updateInsertionPt: updateInsertionPt,
    processIndentTrigger: processIndentTrigger,
    processIndent: processIndent,
    updateLine: updateLine,
    savePreinsertLine: savePreinsertLine,
    processChar: processChar,
    postProcessLine: postProcessLine,
    finalizeState: finalizeState,
    processLine: processLine,
    processText: processText,
    formatText: formatText,
  };

})();
