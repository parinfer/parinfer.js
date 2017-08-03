//
// Want to know how I quickly tested the latest feature? This is where I do it.
//
// I have full tests for things, but this file represents a transient sandbox,
// an ephemeral space for my latest manual tests for things.
//

var parinferTest = require('./test');

var code = `
(|foo (bar)
     ^prevCursor
         sdfs)
`;

console.log(parinferTest.smartMode(code, {printParensOnly: true}));

console.log(parinferTest.smartMode(code));
