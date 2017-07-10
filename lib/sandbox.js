var parinfer = require('./parinfer');

console.log(parinfer.testIndentMode(`
  (let [a 1
        ]); <-- spaces
      `));
