// this file sets the RUN_ASSERTS flag to true in parinfer.js
var fs = require("fs");
var fileTxt = fs.readFileSync("./parinfer.js", "utf8");
fileTxt = fileTxt.replace(/var RUN_ASSERTS = (true|false)/, "var RUN_ASSERTS = true");
fs.writeFileSync("./parinfer.js", fileTxt);
console.log("Enabled RUN_ASSERTS in parinfer.js\n");
