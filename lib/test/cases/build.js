var fs = require("fs");

//------------------------------------------------------------------------------
// String Polyfill
//------------------------------------------------------------------------------

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

//------------------------------------------------------------------------------
// Result Data
//------------------------------------------------------------------------------

function getInitialResult() {
  var result = {
    cases: [],
    currLabel: null, // "in" or "out"
    currCase: getInitialCase()
  };
  Object.preventExtensions(result);
  return result;
}

function getInitialCase() {
  var testCase = {
    "in": null,
    "out": null
  };
  Object.preventExtensions(testCase);
  return testCase;
}

//------------------------------------------------------------------------------
// Error Handling
//------------------------------------------------------------------------------

function error(fileLineNo, msg) {
  console.error("error at test-case line #" + (fileLineNo+1) + ": " + msg);
  process.exit(1);
}

//------------------------------------------------------------------------------
// Test case parsing
//------------------------------------------------------------------------------

function parseLine_endBlock(result, fileLineNo, line) {
  if (result.currLabel === null) {
    error(fileLineNo, "opening block must have a name: 'in' or 'out'.");
  }

  var isTestCaseDone = (result.currCase.out !== null);

  if (isTestCaseDone) {
    result.cases.push(result.currCase);
    result.currLabel = null;
    result.currCase = getInitialCase();
  }
  else {
    result.currLabel = null;
  }
}

function parseLine_startBlock(result, fileLineNo, line) {
  if (result.currLabel !== null) {
    error(fileLineNo, "must close previous block '" + result.currLabel + "' before starting new one.");
  }

  var label = line.substring("```".length);

  if (label !== "in" && label !== "out") {
    error(fileLineNo, "block name '" + label + "' must be either 'in' or 'out'.");
  }
  if (label === "in" && result.currCase.in !== null) {
    error(fileLineNo, "there is already an 'in' block for this test case.");
  }
  if (label === "out" && result.currCase.in === null) {
    error(fileLineNo, "must include an 'in' block before an 'out' block.");
  }

  result.currLabel = label;
  result.currCase[label] = {
    "fileLineNo": fileLineNo,
    "lines": [],
    "cursor": null
  };
}

function parseLine_insideBlock(result, fileLineNo, line) {
  var block = result.currCase[result.currLabel];

  var cursorX = line.indexOf("|");
  if (cursorX !== -1) {
    if (result.currLabel === "out") {
      error(fileLineNo, "no cursor allowed in 'out' block yet");
    }
    if (block.cursor !== null) {
      error(fileLineNo, "only one cursor allowed.  cursor already found at line", block.cursor.cursorLine);
    }

    var lineClean = line.split("|").join("");
    if (lineClean.length < line.length-1) {
      error(fileLineNo, "only one cursor allowed");
    }
    line = lineClean;

    block.cursor = {
      "cursorX": cursorX,
      "cursorLine": block.lines.length
    };
  }

  block.lines.push(line);
}

function parseLine_default(result, fileLineNo, line) {
  return result;
}

function parseLine(result, fileLineNo, line) {

  var f;
  if (line === "```")                 { f = parseLine_endBlock; }
  else if (line.startsWith("```"))    { f = parseLine_startBlock; }
  else if (result.currLabel !== null) { f = parseLine_insideBlock; }
  else                                { f = parseLine_default; }

  return f(result, fileLineNo, line);
}

function parseText(text) {
  var lines = text.split("\n");
  var result = getInitialResult();
  var i;
  for (i=0; i<lines.length; i++) {
    parseLine(result, i, lines[i]);
  }

  if (result.currLabel !== null) {
    error("EOF", "code block not closed");
  }
  if (result.currCase.in !== null ||
      result.currCase.out !== null) {
    error("EOF", "test case 'out' block not completed");
  }

  return result.cases;
}

//------------------------------------------------------------------------------
// JSON builder
//------------------------------------------------------------------------------

var casesPath = __dirname;

function buildJson(name) {
  // JSON.stringify(data, null, "  ");
  var inFile = casesPath + "/" + name + ".md";
  var outFile = casesPath + "/" + name + ".json";
  var inText = fs.readFileSync(inFile, "utf8");

  console.log(
    "  compiling " +
    name + ".md" +
    "  -->  " +
    name + ".json"
  );

  var cases = parseText(inText);
  var outText = JSON.stringify(cases, null, "  ");
  fs.writeFileSync(outFile, outText);
}

function buildAll() {
  console.log("\nReading test cases described in Markdown and compiling to JSON...");
  buildJson("indent-mode");
  buildJson("paren-mode");
  console.log();
}

//------------------------------------------------------------------------------
// Exports and Entry
//------------------------------------------------------------------------------

// export api
exports.buildAll = buildAll;

// allow running this file directly with Node
if (require.main === module) {
  buildAll();
}
