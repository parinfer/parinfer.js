//
// Parinfer Test 3.1.1
//
// Copyright 2015-2017 © Shaun LeBron
// MIT License
//

var parinfer = require('./parinfer');

var UINT_NULL = -999;
var LINE_ENDING_REGEX = /\r?\n/;

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
  throw "test parse error at line " + lineNo + ": " + msg;
}

function parseCursorFromLine(options, inputLineNo, outputLineNo, input) {
  var cursorX = input.indexOf("|");
  if (cursorX !== -1) {
    if (options.cursorX) {
      error(inputLineNo, "only one cursor allowed.  cursor already found at line", options.cursorLine);
    }
    var clean = input.split("|").join("");
    if (clean.length < input.length - 1) {
      error(inputLineNo, "only one cursor allowed");
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
    error(inputLineNo, " diff chars must be adjacent with '-'s before '+'s.");
  }
  var x = match[2].length;
  if (!diff.code) {
    error(inputLineNo, " diff lines must be directly below a code line");
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
      error(inputLineNo, "diff line starts with '-', which cannot come after '+' which previous diff line ends with");
    }
  }
  else {
    // create a new change since diffs are not connected
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
    error(inputLineNo, "diff line can only extend one character past the previous line length (to annotate the 'newline' char)");
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
      error(inputLineNo, "cursor cannot be over a diff annotation");
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

function parseInput(text, extras) {
  extras = extras || {};
  var options = {
    changes: []
  };
  if (extras.forceBalance) { options.forceBalance = true; }
  if (extras.partialResult) { options.partialResult = true; }

  var inputLines = text.split(LINE_ENDING_REGEX);
  var outputLines = [];

  var i, j;          // input and output line numbers
  var input, output; // input and output line text
  var diff = initialDiffState();

  for (i=0; i<inputLines.length; i++) {
    input = inputLines[i];
    j = outputLines.length;

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
  for (i=0; i < tabStops.length; i++) {
    x = tabStops[i].x;
    line += repeatString(" ", x-lastX-1) + "^";
    lastX = x;
  }
  line += " tabStop" + (tabStops.length > 1 ? "s" :"");
  return line;
}

function printOutput(result, extras) {
  extras = extras || {};
  var lines = result.text.split(LINE_ENDING_REGEX);
  var hasCursor = (
    result.cursorX !== UINT_NULL &&
    result.cursorLine !== UINT_NULL &&

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

module.exports = {
  indentMode: indentMode,
  parenMode: parenMode,
  parseInput: parseInput,
  printOutput: printOutput
};
