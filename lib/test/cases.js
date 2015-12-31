var parinfer = require("../parinfer.js");

// if tests were added, compile them to json.
// NOTE TO PORT AUTHORS: you don't need this.  just use existing compiled json tests.
var testBuilder = require("./cases/build.js");
testBuilder.buildAll();

var indentCases = require("./cases/indent-mode.json");
var parenCases = require("./cases/paren-mode.json");
var assert = require("assert");

var modeFn = {
  "indent": parinfer.indentMode,
  "paren": parinfer.parenMode,
};

var oppositeModeFn = {
  "indent": parinfer.parenMode,
  "paren": parinfer.indentMode
};

var lineEndings = [
  {string: "\r\n", name: "CRLF"},
  {string: "\n", name: "LF"}
];

function runTestCase_lineEnding(testCase, mode, filename, lineEnding) {
  var textIn = testCase.in.lines.join(lineEnding.string);
  var textExpected = testCase.out.lines.join(lineEnding.string);
  var fileLineNo = testCase.in.fileLineNo;
  var cursor = testCase.in.cursor;
  var options = cursor;

  it(filename + ":" + fileLineNo + " (" + lineEnding.name + ")", function(){
    var textOut = modeFn[mode](textIn, options).text;
    assert.strictEqual(textOut, textExpected);

    var textOut2 = modeFn[mode](textOut, options).text;
    assert.strictEqual(textOut2, textExpected, "idempotence");

    if (cursor == null) {
      var textOut3 = oppositeModeFn[mode](textOut, options).text;
      assert.strictEqual(textOut3, textExpected, "cross-mode preservation");
    }
  });
}

function runTestCase(testCase, mode, filename) {
  // run test case with each type of line ending
  for (var i=0; i<lineEndings.length; i++) {
    runTestCase_lineEnding(testCase, mode, filename, lineEndings[i]);
  }
}

describe("Indent Mode", function(){
  for (var i=0; i<indentCases.length; i++) {
    runTestCase(indentCases[i], "indent", "cases/indent-mode.md");
  }
});

describe("Paren Mode", function(){
  for (var i=0; i<parenCases.length; i++) {
    runTestCase(parenCases[i], "paren", "cases/paren-mode.md");
  }
});
