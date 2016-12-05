var fs = require('fs');
var parinfer = require('../parinfer.lisp.js');

var filename = process.argv[2] || 'case2';

var text = fs.readFileSync(filename, 'utf-8');

console.log('');
console.log('```in');
console.log(text);
console.log('```');
console.log('');
console.log('```out');
parinfer.testIndentMode(text);
console.log('```');
