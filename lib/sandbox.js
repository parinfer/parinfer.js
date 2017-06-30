var parinfer = require('./parinfer');

console.log(parinfer.testIndentMode(`
(foo
 [bar]
  bar) baz
`));

console.log(parinfer.testParenMode(`
(defn foo
  [arg
|x
sdfsd
`, {partialResult: true}));
