var parinfer = require("../parinfer.js");
var assert = require("assert");

describe("CRLF line-endings", function(){
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

function testErrorName(mode, textIn, errorName) {
  var result = mode(textIn);
  assert.strictEqual(result.success, false);
  assert.strictEqual(result.error.name, errorName);
}

describe("Error Messages", function(){
  it("unclosed-quote", function(){
    testErrorName(parinfer.indentMode, '(foo"', "unclosed-quote");
    testErrorName(parinfer.parenMode, '(foo"', "unclosed-quote");
  });
  it("unclosed-paren", function(){
    testErrorName(parinfer.parenMode, '(foo', "unclosed-paren");
  });
  it("quote-danger", function(){
    testErrorName(parinfer.parenMode, '; "foo', "quote-danger");
  });
  it("eol-backslash", function(){
    testErrorName(parinfer.parenMode, '(foo \\', "eol-backslash");
  });
});
