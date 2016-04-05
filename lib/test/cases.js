var parinfer = require("../parinfer.js");
var assert = require("assert");

// if tests were added, compile them to json.
// NOTE TO PORT AUTHORS: you don't need this.  just use existing compiled json tests.
var testBuilder = require("./cases/build.js");
testBuilder.buildAll();

// test cases parsed from markdown
var indentCases = require("./cases/indent-mode.json");
var parenCases = require("./cases/paren-mode.json");

var modeFn = {
  "indent": parinfer.indentMode,
  "paren": parinfer.parenMode,
};

var oppositeModeFn = {
  "indent": parinfer.parenMode,
  "paren": parinfer.indentMode
};

function runMarkdownTestCase(testCase, mode, filename) {
  var textIn = testCase.in.lines.join("\n");
  var textExpected = testCase.out.lines.join("\n");
  var fileLineNo = testCase.in.fileLineNo;
  var cursor = testCase.in.cursor;
  var options = cursor;

  it(filename + ":" + fileLineNo, function(){
    var result = modeFn[mode](textIn, options);
    var textOut = result.text;
    assert.strictEqual(textOut, textExpected);
    if (options) {
      assert.strictEqual(result.cursorX, testCase.out.cursor.cursorX);
    }

    if (testCase.out.error) {
      assert.strictEqual(result.success, false);
      assert.strictEqual(result.error.name, testCase.out.error.name);
      assert.strictEqual(result.error.lineNo, testCase.out.error.lineNo);
      assert.strictEqual(result.error.x, testCase.out.error.x);
      return;
    }

    if (testCase.out.tabStops) {
      assert.deepEqual(result.tabStops, testCase.out.tabStops);
      return;
    }

    var textOut2 = modeFn[mode](textOut, options).text;
    var hasCursorDx = cursor !== null && cursor.cursorDx;
    if (!hasCursorDx) {
      assert.strictEqual(textOut2, textExpected, "idempotence");
    }

    if (cursor == null) {
      var textOut3 = oppositeModeFn[mode](textOut, options).text;
      assert.strictEqual(textOut3, textExpected, "cross-mode preservation");
    }
  });
}

describe("Indent Mode cases from markdown", function(){
  for (var i=0; i<indentCases.length; i++) {
    runMarkdownTestCase(indentCases[i], "indent", "cases/indent-mode.md");
  }
});

describe("Paren Mode cases from markdown", function(){
  for (var i=0; i<parenCases.length; i++) {
    runMarkdownTestCase(parenCases[i], "paren", "cases/paren-mode.md");
  }
});
