var parinfer = require('./parinfer');

console.log(parinfer.testIndentMode(`
(foo [bar (|...] baz)
`));

// console.log(parinfer.testParenMode(`
// (defn foo
//   [arg
// }  bar)
// `));
