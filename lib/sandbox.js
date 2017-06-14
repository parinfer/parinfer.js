var parinfer = require('./parinfer');

parinfer.testIndentMode(`
(foo
  |)
`);

parinfer.testParenMode(`
(defn foo
  [arg
}  bar)
`);
