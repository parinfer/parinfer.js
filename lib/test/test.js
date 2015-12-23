var parinfer = require("../parinfer.js");
var indentCases = require("./cases/indent-mode.json");
var parenCases = require("./cases/paren-mode.json");
var fs = require("fs");

var modeFormatText = {
  "indent": parinfer.indentMode.formatText,
  "paren": parinfer.parenMode.formatText,
};

var oppositeMode = {
  "indent": "paren",
  "paren": "indent"
};

var error = false;

function runTestCase(testCase, mode) {
  var textIn = testCase.in.lines.join("\n");
  var textExpected = testCase.out.lines.join("\n");
  var cursor = testCase.in.cursor;
  var options = cursor;
  var caseName = mode + " mode test case at line " + testCase.in.fileLineNo;
  console.time(caseName);
  var textActual = modeFormatText[mode](textIn, options).text;
  console.timeEnd(caseName);
  if (textExpected !== textActual) {
    console.error("Test case at line", testCase.in.fileLineNo, "failed");
    console.info("Expected");
    console.log(textExpected);
    console.info("Actual");
    console.log(textActual);
    error = true;
  }
  else {

    var prevActual = textActual;

    // idempotence check
    textActual = modeFormatText[mode](prevActual, options).text;
    if (textExpected !== textActual) {
      console.error("idempotent check at line", testCase.in.fileLineNo, "failed");
      console.info("Expected");
      console.log(textExpected);
      console.info("Actual");
      console.log(textActual);
      error = true;
    }

    // check for cross-mode preservation
    if (cursor == null) {
      textActual = modeFormatText[oppositeMode[mode]](prevActual, options).text;
      if (textExpected !== textActual) {
        console.error("cross-mode preservation check at line", testCase.in.fileLineNo, "failed");
        console.info("Expected");
        console.log(textExpected);
        console.info("Actual");
        console.log(textActual);
        error = true;
      }
    }
  }
}

function runAllTests() {

  console.info("INDENT MODE TESTS:");
  for (var i=0; i<indentCases.length; i++) {
    runTestCase(indentCases[i], "indent");
  }
  console.info("PAREN MODE TESTS:");
  for (var i=0; i<parenCases.length; i++) {
    runTestCase(parenCases[i], "paren");
  }

  var longFile = fs.readFileSync("testfile.clj", "utf8");
  timeProcess(longFile);
}

function timeProcess(string, options) {
  var t0,t1;

  console.time("indent");
  parinfer.indentMode.processText(string, options);
  console.timeEnd("indent");

  console.time("paren");
  parinfer.parenMode.processText(string, options);
  console.timeEnd("paren");
}

runAllTests();
if (error) {
  process.exit(1);
}
