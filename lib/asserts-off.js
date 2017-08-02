// this file sets the RUN_ASSERTS flag to false in parinfer.js
var fs = require("fs");
var fileTxt = fs.readFileSync("./parinfer.js", "utf8");
fileTxt = fileTxt.replace(/var RUN_ASSERTS = (true|false)/, "var RUN_ASSERTS = false");
fs.writeFileSync("./parinfer.js", fileTxt);
console.log("Disabled RUN_ASSERTS in parinfer.js\n");
