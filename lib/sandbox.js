var parinferTest = require('./test');

console.log(parinferTest.indentMode(`
(if ((or true
    +
        false))
              +
  (do-something))
`));
