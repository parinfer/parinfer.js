var parinfer = require("./parinfer.js");
var indentCases = require("./test/cases/indent-mode.json");
var parenCases = require("./test/cases/paren-mode.json");

var testIdx = 17;

var test = indentCases[testIdx];
var textIn = test.in.lines.join("\n");
var options = test.in.cursor;

parinfer.indentMode(textIn, options);
