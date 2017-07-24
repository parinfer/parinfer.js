var parinferTest = require('./test');

// console.log(parinferTest.indentMode(`
// (if ((or true
//     +
//         false))
//               +
//   (do-something))
// `));

console.log(parinferTest.smartMode(`
((|((1
    2
    3)))
 4)
`, {printParenTrails: true}));
