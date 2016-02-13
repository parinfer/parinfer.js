var parinfer = require("../parinfer.js");
var assert = require("assert");

var modeFn = {
  indent: parinfer.indentMode,
  paren: parinfer.parenMode
};

function checkMode(mode, textIn, textExpected) {
  var textOut = modeFn[mode](textIn).text;
  assert.strictEqual(textOut, textExpected);
}

describe("Respecting CRLF line-endings", function(){
  it("indent mode", function(){ checkMode('indent', "(foo\r\nbar", "(foo)\r\nbar"); });
  it("paren mode",  function(){ checkMode('paren',  "(foo\r\nbar)", "(foo\r\n bar)"); });
});

function checkError(mode, textIn, errorName, lineNo, x) {
  var result = modeFn[mode](textIn);
  assert.strictEqual(result.success, false);
  assert.strictEqual(result.error.name, errorName);
  assert.strictEqual(result.error.lineNo, lineNo);
  assert.strictEqual(result.error.x, x);
}

describe("Returning appropriate errors", function(){
  it("unclosed-quote", function(){ checkError('indent', '(foo"',   "unclosed-quote", 0, 4);
                                   checkError('paren',  '(foo"',   "unclosed-quote", 0, 4); });
  it("unclosed-paren", function(){ checkError('paren',  '(foo',    "unclosed-paren", 0, 0); });
  it("quote-danger",   function(){ checkError('paren',  '; "foo',  "quote-danger",   0, 2); });
  it("eol-backslash",  function(){ checkError('paren',  '(foo \\', "eol-backslash",  0, 5); });
});

function checkLines(mode, text, changedLines) {
  var result = modeFn[mode](text);
  assert.deepStrictEqual(result.changedLines, changedLines);
}

describe("Returning changed lines", function(){
  it("indent mode: single change",    function(){ checkLines('indent', "(foo\nbar",   [{lineNo: 0, line: "(foo)"}]); });
  it("indent mode: multiple changes", function(){ checkLines('indent', "(foo\nbar)",  [{lineNo: 0, line: "(foo)"},
                                                                                       {lineNo: 1, line: "bar"}]); });
  it("paren mode: single change",     function(){ checkLines('paren',  "(foo\nbar)",  [{lineNo: 1, line: " bar)"}]); });
  it("paren mode: multiple changes",  function(){ checkLines('paren',  "(foo]\nbar)", [{lineNo: 0, line: "(foo"},
                                                                                       {lineNo: 1, line: " bar)"}]); });
});
