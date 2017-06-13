var parinfer = require('./parinfer');

parinfer.testIndentMode(`
(defn foo
  [arg
  bar)
`);

parinfer.testParenMode(`
(defn foo
  [arg
  bar)
`);
