//
// Want to know how I quickly tested the latest feature? This is where I do it.
//
// I have full tests for things, but this file represents a transient sandbox,
// an ephemeral space for my latest manual tests for things.
//

const parinferTest = require('./test');
const parinfer = require('./parinfer');

const code = `
(foo
  bar)          |
`;

const {text, options} = parinferTest.parseInput(code);

const result = parinfer.indentMode(text, options);

console.log(JSON.stringify(result, null, 2));
