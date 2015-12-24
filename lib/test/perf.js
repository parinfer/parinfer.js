var parinfer = require("../parinfer.js");
var path = require("path");
var fs = require("fs");

function timeProcess(string, options) {
  var numLines = string.split("\n").length;
  console.log("Testing file with", numLines, "lines");

  console.time("indent");
  parinfer.indentMode(string, options);
  console.timeEnd("indent");

  console.time("paren");
  parinfer.parenMode(string, options);
  console.timeEnd("paren");
}

var longFile = fs.readFileSync(path.resolve(__dirname, 'really_long_file.clj'), "utf8");
timeProcess(longFile);
