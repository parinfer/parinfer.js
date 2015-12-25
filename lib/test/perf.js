var parinfer = require("../parinfer.js");
var path = require("path");
var fs = require("fs");

function timeProcess(filename, text, options) {
  var numChars = text.length;
  var numLines = text.split("\n").length;
  console.log("Processing",filename,":", numLines, "lines,", numChars, "chars");

  console.time("indent");
  parinfer.indentMode(text, options);
  console.timeEnd("indent");

  console.time("paren");
  parinfer.parenMode(text, options);
  console.timeEnd("paren");

  console.log();
}

var perfDir = path.resolve(__dirname, "perf");
var files = fs.readdirSync(perfDir);
var i;

for (i=0; i<files.length; i++) {
  var filename = files[i];
  var fullpath = path.resolve(perfDir, filename);
  var text = fs.readFileSync(fullpath, "utf8");
  timeProcess(filename, text, {});
}
