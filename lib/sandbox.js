var parinfer = require('./parinfer');

parinfer.testInput(`
  (foobar
   -------
      {:a 1|
----
     :b 2})
`);

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
