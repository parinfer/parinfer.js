//
// Parinfer Test 3.12.0
//
// Copyright 2015-2017 © Shaun Lebron
// MIT License
//

var parinfer = require('./parinfer');

var LINE_ENDING_REGEX = /\r?\n/;

function isOpenParen(c) {
  return c === "{" || c === "(" || c === "[";
}

function isCloseParen(c) {
  return c === "}" || c === ")" || c === "]";
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

//------------------------------------------------------------------------------
// Input Parser
//------------------------------------------------------------------------------

function error(lineNo, msg) {
  return "test parse error at line " + lineNo + ": " + msg;
}

function parsePrevCursorLine(options, inputLineNo, outputLineNo, input) {
  var match = input.match(/^\s*\^\s*prevCursor\s*$/);
  if (!match) {
    return false;
  }
  var x = input.indexOf("^");
  if (options.cursorX < x && options.cursorLine == outputLineNo) {
    x++;
  }
  options.prevCursorX = x;
  options.prevCursorLine = outputLineNo;
  return true;
}

function parseCursorFromLine(options, inputLineNo, outputLineNo, input) {
  var cursorX = input.indexOf("|");
  if (cursorX !== -1) {
    if (options.cursorX) {
      throw error(inputLineNo, "only one cursor allowed.  cursor already found at line", options.cursorLine);
    }
    var clean = input.split("|").join("");
    if (clean.length < input.length - 1) {
      throw error(inputLineNo, "only one cursor allowed");
    }
    input = clean;
    options.cursorX = cursorX;
    options.cursorLine = outputLineNo;
  }
  return input;
}

function initialDiffState() {
  var diff = {
    code: null,           // the code that the diff line is annotating
    codeLineNo: null,
    prevCode: null,       // the code that the previous diff line annotated
    prevCodeLineNo: null,
    prevNewlineChar: '',  // the previous diff line's newline annotation ('', '-', or '+')
    merge: null,          // the code should be merged with the next code line?
    mergeOffset: 0        // code growth after merge
  };
  return diff;
}

function parseDiffLine(options, inputLineNo, input, diff) {
  // lines with only -/+ chars are considered diff lines.
  var looseMatch = input.match(/^\s*[-+]+[-+\s]*$/);
  if (!looseMatch) {
    return;
  }
  var match = input.match(/^((\s*)(-*)(\+*))\s*$/);
  if (!match) {
    throw error(inputLineNo, " diff chars must be adjacent with '-'s before '+'s.");
  }
  var x = match[2].length;
  if (!diff.code) {
    throw error(inputLineNo, " diff lines must be directly below a code line");
  }

  // "open" means current and previous diffs can be connected
  var prevDiffOpen = (
    diff.prevCode &&
    diff.prevNewlineChar !== '' &&
    (diff.prevCodeLineNo === diff.codeLineNo ||
     diff.prevCodeLineNo+1 === diff.codeLineNo)
  );
  var currDiffOpen = x === 0;

  var change;
  if (prevDiffOpen && currDiffOpen) {
    if (diff.prevNewlineChar === '+' && input[0] === '-') {
      throw error(inputLineNo, "diff line starts with '-', which cannot come after '+' which previous diff line ends with");
    }
  }
  else {
    // create a new change since diffs are not connected
    options.changes = options.changes || [];
    options.changes.push({
      lineNo: diff.codeLineNo,
      x: x + diff.mergeOffset,
      oldText: '',
      newText: ''
    });
  }

  // get the current active change
  change = options.changes[options.changes.length-1];

  if (match[1].length > diff.code.length+1) {
    throw error(inputLineNo, "diff line can only extend one character past the previous line length (to annotate the 'newline' char)");
  }

  x += diff.mergeOffset;
  var oldLen = match[3].length;
  var newLen = match[4].length;
  var oldX = x;
  var newX = x+oldLen;
  var len = oldLen + newLen;
  var xEnd = x+len-1;

  if (options.cursorLine === diff.codeLineNo) {
    if (x <= options.cursorX && options.cursorX < x+len) {
      throw error(inputLineNo, "cursor cannot be over a diff annotation");
    } else if (options.cursorX < x) {
      x--; oldX--; newX--;
    } else {
      options.cursorX -= oldLen;
    }
  }

  var newlineChar = (diff.code.length === xEnd ? input.charAt(xEnd) : '');
  var oldText = diff.code.substring(oldX, oldX+oldLen) + (newlineChar === '-' ? '\n' : '');
  var newText = diff.code.substring(newX, newX+newLen) + (newlineChar === '+' ? '\n' : '');
  change.oldText += oldText;
  change.newText += newText;

  // update diff state
  diff.prevCode = diff.code;
  diff.prevCodeLineNo = diff.codeLineNo;
  diff.merge = newlineChar === '-';
  diff.prevNewlineChar = newlineChar;

  return replaceWithinString(diff.code, oldX, oldX+oldLen, '');
}

function handlePostDiffLine(options, inputLineNo, outputLineNo, outputLines, output, diff) {
  var j = outputLineNo;
  if (diff.merge) {
    diff.mergeOffset = outputLines[j-1].length;
    if (options.cursorLine === j) {
      options.cursorLine = j-1;
      options.cursorX += diff.mergeOffset;
    }
    outputLines[j-1] += output;
  } else {
    diff.mergeOffset = 0;
    outputLines.push(output);
  }
  diff.merge = false;
  diff.codeLineNo = outputLines.length-1;
  diff.code = outputLines[diff.codeLineNo];
}

function _parseInput(text, extras) {
  extras = extras || {};
  var options = {};
  if (extras.forceBalance) { options.forceBalance = true; }
  if (extras.partialResult) { options.partialResult = true; }
  if (extras.printParensOnly) { options.returnParens = true; }

  var inputLines = text.split(LINE_ENDING_REGEX);
  var outputLines = [];

  var i, j;          // input and output line numbers
  var input, output; // input and output line text
  var diff = initialDiffState();

  for (i=0; i<inputLines.length; i++) {
    input = inputLines[i];
    j = outputLines.length;

    if (parsePrevCursorLine(options, i, j-1, input)) {
      continue;
    }

    output = parseDiffLine(options, i, input, diff);
    if (output != null) {
      outputLines[j-1] = output;
      delete diff.code;
      continue;
    }

    output = parseCursorFromLine(options, i, j, input);
    handlePostDiffLine(options, i, j, outputLines, output, diff);
  }

  return {
    text: outputLines.join("\n"),
    options: options
  };
}

function parseInput(texts, extras) {
  if (!Array.isArray(texts)) {
    return _parseInput(texts, extras);
  }

  var changes = [];
  var resultText;
  var resultOptions;
  var i, j;
  for (i=0; i<texts.length; i++) {
    var result = _parseInput(texts[i], extras);
    resultText = result.text;
    resultOptions = result.options;
    var newChanges = result.options.changes;
    if (newChanges) {
      for (j=0; j<newChanges.length; j++) {
        changes.push(newChanges[j]);
      }
    }
  }

  if (changes.length > 0) {
    resultOptions.changes = changes;
  }

  return {
    text: resultText,
    options: resultOptions
  };
}

//------------------------------------------------------------------------------
// Output Parser
//------------------------------------------------------------------------------

function parseErrorLine(result, inputLineNo, outputLineNo, input) {
  var match = input.match(/^\s*\^\s*error: ([a-z-]+)\s*$/);
  if (!match) {
    return false;
  }
  if (result.error) {
    throw error(inputLineNo, "only one error can be specified");
  }
  var x = input.indexOf("^");
  if (result.cursorLine === outputLineNo && result.cursorX < x) {
    x--;
  }
  result.error = {
    name: match[1],
    lineNo: outputLineNo,
    x: x
  };
  return true;
}

function parseTabStopsLine(result, inputLineNo, outputLineNo, input) {
  var match = input.match(/^([\^>\s]+)tabStops?\s*$/);
  if (!match) {
    return false;
  }
  if (result.tabStops) {
    throw error(inputLineNo, "only one tabStop line can be specified");
  }
  result.tabStops = [];
  var sym,ch,x,i,tabStop;
  for (x=0; x<input.length; x++) {
    sym = input[x];
    if (sym === '^') {
      tabStop = {x:x};
      for (i=outputLineNo; i>=0; i--) {
        ch = result.lines[i][x];
        if (isOpenParen(ch)) {
          tabStop.ch = ch;
          tabStop.lineNo = i;
          break;
        }
      }
      if (!tabStop.ch) {
        throw error(inputLineNo, 'tabStop at ' + x + ' does not point to open paren');
      }
      result.tabStops.push(tabStop);
    }
    else if (sym === '>') {
      tabStop = result.tabStops[result.tabStops.length-1];
      if (!tabStop) {
        throw error(inputLineNo, 'tabStop at ' + x + ' ">" is a dependent on a preceding "^"');
      }
      if (tabStop.argX != null) {
        throw error(inputLineNo, 'tabStop at ' + x + ' ">" cannot come after another ">"');
      }
      tabStop.argX = x;
    }
  }
  return true;
}

function parseParenTrailLine(result, inputLineNo, outputLineNo, input) {
  var match = input.match(/^\s*(\^*)\s*parenTrail\s*$/);
  if (!match) {
    return false;
  }
  if (result.cursorLine != null) {
    throw error(inputLineNo, 'parenTrail cannot currently be printed when a cursor is present');
  }
  var trail = match[1];
  var startX = input.indexOf("^");
  var endX = startX + trail.length;

  var x;
  for (x=startX; x<endX; x++) {
    var ch = result.lines[outputLineNo][x];
    if (!isCloseParen(ch)) {
      throw error(inputLineNo, '^ parenTrail must point to close-parens only');
    }
  }

  if (!result.parenTrails) {
    result.parenTrails = [];
  }
  result.parenTrails.push({
    lineNo: outputLineNo,
    startX: startX,
    endX: endX
  });
  return true;
}

function parseOutput(text) {
  var lines = text.split(LINE_ENDING_REGEX);
  var result = {
    lines: []
  };

  var i, j;          // input and output line numbers
  var input, output; // input and output line text

  for (i=0; i<lines.length; i++) {
    input = lines[i];
    j = result.lines.length;

    if (parseErrorLine(result, i, j-1, input) ||
        parseTabStopsLine(result, i, j-1, input) ||
        parseParenTrailLine(result, i, j-1, input)) {
      continue;
    }

    output = parseCursorFromLine(result, i, j, input);
    result.lines.push(output);
  }
  result.text = result.lines.join("\n");
  result.success = result.error == null;
  delete result.lines;
  return result;
}


//------------------------------------------------------------------------------
// Output Printer
//------------------------------------------------------------------------------

function printErrorLine(result) {
  // shift x position back if previous line has cursor before our error caret
  var x = result.error.x;
  if (result.cursorLine === result.error.lineNo &&
      result.cursorX <= x) {
    x++;
  }
  return repeatString(" ", x) + "^ error: " + result.error.name;
}

function printTabStopLine(tabStops) {
  var i,x;
  var lastX = -1;
  var line = "";
  var count = 0;
  for (i=0; i < tabStops.length; i++) {
    x = tabStops[i].x;
    line += repeatString(" ", x-lastX-1) + "^";
    lastX = x;
    count++;

    x = tabStops[i].argX;
    if (x != null) {
      line += repeatString(" ", x-lastX-1) + ">";
      lastX = x;
      count++;
    }
  }
  line += " tabStop" + (count > 1 ? "s" :"");
  return line;
}

function printParenTrailLine(parenTrail) {
  return (
    repeatString(" ", parenTrail.startX) +
    repeatString("^", parenTrail.endX - parenTrail.startX) +
    " parenTrail"
  );
}

function printPadding(lineNo, x, nextLineNo, nextX) {
  var newlines = nextLineNo - lineNo;
  var spaces = (nextLineNo > lineNo) ? nextX : nextX - x - 1;
  return repeatString("\n", newlines) + repeatString(" ", spaces);
}

function printParen(lineNo, x, opener) {
  var s = printPadding(lineNo, x, opener.lineNo, opener.x);
  s += opener.ch;
  lineNo = opener.lineNo;
  x = opener.x;

  s += printParens(lineNo, x, opener.children);
  var lastChild = opener.children[opener.children.length-1];
  if (lastChild) {
    lineNo = lastChild.closer.lineNo;
    x = lastChild.closer.x;
  }

  s += printPadding(lineNo, x, opener.closer.lineNo, opener.closer.x);
  s += opener.closer.ch;
  if (opener.closer.trail) {
    s += '*';
  }
  return s;
}

function printParens(lineNo, x, parens) {
  var s = "";
  var i;
  var opener;
  for (i=0; i<parens.length; i++) {
    opener = parens[i];
    s += printParen(lineNo, x, opener);
    lineNo = opener.closer.lineNo;
    x = opener.closer.x;
  }
  return s;
}

function printOutput(result, extras) {
  extras = extras || {};
  var lines = result.text.split(LINE_ENDING_REGEX);
  var hasCursor = (
    result.cursorX != null &&
    result.cursorLine != null &&

    // could be false if `partialResult` is true and parinfer failed before reaching cursor line
    result.cursorLine < lines.length
  );
  if (hasCursor) {
    var line = lines[result.cursorLine];
    lines[result.cursorLine] = replaceWithinString(line, result.cursorX, result.cursorX, "|");
  }
  if (result.error) {
    lines.splice(result.error.lineNo+1, 0, printErrorLine(result));
  }
  else if (extras.printParensOnly) {
    return printParens(0, 0, result.parens);
  }
  else if (extras.printParenTrails && result.parenTrails) {
    var i, parenTrail;
    for (i=result.parenTrails.length-1; i>=0; i--) {
      parenTrail = result.parenTrails[i];
      lines.splice(parenTrail.lineNo+1, 0, printParenTrailLine(parenTrail));
    }
  }
  else if (hasCursor && extras.printTabStops && result.tabStops.length > 0) {
    lines.splice(result.cursorLine, 0, printTabStopLine(result.tabStops));
  }
  return lines.join("\n");
}

//------------------------------------------------------------------------------
// Public API
//------------------------------------------------------------------------------

function indentMode(text, extras) {
  var parsed = parseInput(text, extras);
  var result = parinfer.indentMode(parsed.text, parsed.options);
  return printOutput(result, extras);
}

function parenMode(text, extras) {
  var parsed = parseInput(text, extras);
  var result = parinfer.parenMode(parsed.text, parsed.options);
  return printOutput(result, extras);
}

function smartMode(text, extras) {
  var parsed = parseInput(text, extras);
  var result = parinfer.smartMode(parsed.text, parsed.options);
  return printOutput(result, extras);
}

module.exports = {
  indentMode: indentMode,
  parenMode: parenMode,
  smartMode: smartMode,

  parseInput: parseInput,
  parseOutput: parseOutput,
  printOutput: printOutput
};
