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
  |)
`;

console.log(parinferTest.smartMode(code, {printParensOnly: true}));
