var parinferTest = require('./test');

// console.log(parinferTest.indentMode(`
// (if ((or true
//     +
//         false))
//               +
//   (do-something))
// `));

console.log(parinferTest.smartMode(`
(defn foo []
  "docstring"
  |(let [[a b] my-nums
        {:keys [c d]} my-map]))


`, {printTabStops: true}));
