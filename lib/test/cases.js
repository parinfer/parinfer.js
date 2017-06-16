var parinfer = require("../parinfer.js");
var assert = require("assert");

// if tests were added, compile them to json.
// NOTE TO PORT AUTHORS: you don't need this.  just use existing compiled json tests.
var testBuilder = require("./cases/build.js");
testBuilder.buildAll();

// test cases parsed from markdown
var indentCases = require("./cases/indent-mode.json");
var parenCases = require("./cases/paren-mode.json");

var testModeFn = {
  "indent": parinfer.testIndentMode,
  "paren": parinfer.testParenMode,
};

var oppositeTestModeFn = {
  "indent": parinfer.testParenMode,
  "paren": parinfer.testIndentMode
};

function runMarkdownTestCase(testCase, mode, filename) {
  var textIn = testCase.in.text;
  var textOutExpect = testCase.out.text;
  var fileLineNo = testCase.in.fileLineNo;

  var hasCursor = textIn.includes("|");
  var hasCursorDx = textIn.includes("^ cursorDx");
  var hasTabStops = textOutExpect.includes("^ tabStop");
  var hasError = textOutExpect.includes("^ error");

  it(filename + ":" + fileLineNo, function(){
    var textOutActual = testModeFn[mode](textIn, {
      tabStops: hasTabStops,
    });
    assert.strictEqual(textOutActual, textOutExpect, "\n\nINPUT:\n" + textIn + "\n");

    if (hasError || hasTabStops) {
      return;
    }

    var textOutActual2 = testModeFn[mode](textOutActual);

    if (!hasCursorDx) {
      assert.strictEqual(textOutActual2, textOutExpect, "idempotence");
    }

    if (!hasCursor) {
      var textOutActual3 = oppositeTestModeFn[mode](textOutActual);
      assert.strictEqual(textOutActual3, textOutExpect, "cross-mode preservation");
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
