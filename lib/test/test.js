var parinfer = require("../parinfer.js");
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

function runTestCase(testCase, mode, filename) {
  var textIn = testCase.in.lines.join("\n");
  var textExpected = testCase.out.lines.join("\n");
  var fileLineNo = testCase.in.fileLineNo;
  var cursor = testCase.in.cursor;
  var options = cursor;

  it(filename + ":" + fileLineNo, function(){
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
