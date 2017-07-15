//----------------------------------------------------------------------
// Compile tests from Markdown to JSON
//----------------------------------------------------------------------
require("./cases/build.js").buildAll();
var indentCases = require("./cases/indent-mode.json");
var parenCases = require("./cases/paren-mode.json");

//----------------------------------------------------------------------
// STRUCTURE TEST
// Diff the relevant result properties.
//----------------------------------------------------------------------
var parinfer = require("../parinfer.js");
var assert = require("assert");

function assertStructure(actual, expected, description) {

  assert.strictEqual(actual.text, expected.text);
  assert.strictEqual(actual.success, expected.success);
  assert.strictEqual(actual.cursorX, expected.cursorX);
  assert.strictEqual(actual.cursorLine, expected.cursorLine);

  assert.strictEqual(actual.error == null, expected.error == null);
  if (actual.error) {
    // NOTE: we currently do not test 'message' and 'extra'
    assert.strictEqual(actual.error.name, expected.error.name);
    assert.strictEqual(actual.error.lineNo, expected.error.lineNo);
    assert.strictEqual(actual.error.x, expected.error.x);
  }

  if (expected.tabStops) {
    assert.strictEqual(actual.tabStops == null, false);
    var i;
    for (i=0; i<actual.tabStops.length; i++) {
      assert.strictEqual(actual.tabStops[i].lineNo, expected.tabStops[i].lineNo);
      assert.strictEqual(actual.tabStops[i].x, expected.tabStops[i].x);
      assert.strictEqual(actual.tabStops[i].ch, expected.tabStops[i].ch);
    }
  }
}

function testStructure(testCase, mode) {
  var expected = testCase.result;
  var text = testCase.text;
  var options = testCase.options;
  var actual, actual2, actual3;

  it('should generate the correct result structure', function() {
    switch (mode) {
      case "indent": actual = parinfer.indentMode(text, options); break;
      case "paren": actual = parinfer.parenMode(text, options); break;
    }
    assertStructure(actual, expected);
  });

  if (expected.error || expected.tabStops) {
    return;
  }

  it('should generate the same result structure on idempotence check', function() {
    var options2 = {
      cursorX: actual.cursorX,
      cursorLine: actual.cursorLine
    };
    switch (mode) {
      case "indent": actual2 = parinfer.indentMode(actual.text, options2); break;
      case "paren": actual2 = parinfer.parenMode(actual.text, options2); break;
    }
    assertStructure(actual2, actual);
  });

  it('should generate the same result structure on cross-mode check', function() {
    var hasCursor = expected.cursorX != null;
    if (!hasCursor) {
      switch (mode) {
        case "indent": actual3 = parinfer.parenMode(actual.text); break;
        case "paren": actual3 = parinfer.indentMode(actual.text); break;
      }
      assertStructure(actual3, actual);
    }
  });
}

//----------------------------------------------------------------------
// STRING TESTS
// Diff the annotated text instead of the data for easy reading.
// (requires extra parser/printer code that we may not want to port)
//----------------------------------------------------------------------
var parinferTest = require("../test.js");

function testString(testCase, mode) {
  var expected = testCase.result;
  var source = testCase.source;
  var prettyOptions = {printTabStops: expected.tabStops};
  var pretty, pretty2, pretty3;

  it('should generate the correct annotated output', function() {
    switch (mode) {
      case "indent": pretty = parinferTest.indentMode(source.in, prettyOptions); break;
      case "paren": pretty = parinferTest.parenMode(source.in, prettyOptions); break;
    }
    assert.strictEqual(pretty, source.out, "\n\nINPUT:\n" + source.in + "\n");
  });

  if (expected.error || expected.tabStops) {
    return;
  }

  it('should generate the same annotated output on idempotence check', function() {
    switch (mode) {
      case "indent": pretty2 = parinferTest.indentMode(pretty, prettyOptions); break;
      case "paren": pretty2 = parinferTest.parenMode(pretty, prettyOptions); break;
    }
    assert.strictEqual(pretty2, pretty);
  });

  it('should generate the same annotated output on cross-mode check', function() {
    var hasCursor = expected.cursorX != null;
    if (!hasCursor) {
      switch (mode) {
        case "indent": pretty3 = parinferTest.parenMode(pretty, prettyOptions); break;
        case "paren": pretty3 = parinferTest.indentMode(pretty, prettyOptions); break;
      }
      assert.strictEqual(pretty3, pretty);
    }
  });
}

//----------------------------------------------------------------------
// Test execution order
//----------------------------------------------------------------------

function runTest(testCase, mode, filename) {
  describe(filename + ":" + testCase.source.lineNo, function(){
    testString(testCase, mode);
    testStructure(testCase, mode);
  });
}

describe("Indent Mode cases from markdown", function(){
  for (var i=0; i<indentCases.length; i++) {
    runTest(indentCases[i], "indent", "cases/indent-mode.md");
  }
});

describe("Paren Mode cases from markdown", function(){
  for (var i=0; i<parenCases.length; i++) {
    runTest(parenCases[i], "paren", "cases/paren-mode.md");
  }
});
