var parinfer = require("../parinfer.js");
var assert = require("assert");

describe("Respecting CRLF line-endings", function(){
  it("indent mode", function(){
    var textIn = "(foo\r\nbar";
    var textExpected = "(foo)\r\nbar";
    var textOut = parinfer.indentMode(textIn).text;
    assert.strictEqual(textOut, textExpected);
  });
  it("paren mode", function(){
    var textIn = "(foo\r\nbar)";
    var textExpected = "(foo\r\n bar)";
    var textOut = parinfer.parenMode(textIn).text;
    assert.strictEqual(textOut, textExpected);
  });
});

function testErrorName(mode, textIn, errorName, lineNo, x) {
  var result = mode(textIn);
  assert.strictEqual(result.success, false);
  assert.strictEqual(result.error.name, errorName);
  assert.strictEqual(result.error.lineNo, lineNo);
  assert.strictEqual(result.error.x, x);
}

describe("Returning appropriate errors", function(){
  it("unclosed-quote", function(){
    testErrorName(parinfer.indentMode, '(foo"', "unclosed-quote", 0, 4);
    testErrorName(parinfer.parenMode, '(foo"', "unclosed-quote", 0, 4);
  });
  it("unclosed-paren", function(){
    testErrorName(parinfer.parenMode, '(foo', "unclosed-paren", 0, 0);
  });
  it("quote-danger", function(){
    testErrorName(parinfer.parenMode, '; "foo', "quote-danger", 0, 2);
  });
  it("eol-backslash", function(){
    testErrorName(parinfer.parenMode, '(foo \\', "eol-backslash", 0, 5);
  });
});

describe("Returning changed lines", function(){
  it("indent mode: single change", function(){
    var textIn = "(foo\nbar";
    var actual = parinfer.indentMode(textIn).changedLines;
    var expected = [
      { lineNo: 0, line: "(foo)" }
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it("indent mode: multiple changes", function(){
    var textIn = "(foo\nbar)";
    var actual = parinfer.indentMode(textIn).changedLines;
    var expected = [
      { lineNo: 0, line: "(foo)" },
      { lineNo: 1, line: "bar" },
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it("paren mode: single change", function(){
    var textIn = "(foo\nbar)";
    var actual = parinfer.parenMode(textIn).changedLines;
    var expected = [
      { lineNo: 1, line: " bar)" },
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it("paren mode: multiple changes", function(){
    var textIn = "(foo]\nbar)";
    var actual = parinfer.parenMode(textIn).changedLines;
    var expected = [
      { lineNo: 0, line: "(foo" },
      { lineNo: 1, line: " bar)" },
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
