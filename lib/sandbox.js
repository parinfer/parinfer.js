//
// Want to know how I quickly tested the latest feature? This is where I do it.
//
// I have full tests for things, but this file represents a transient sandbox,
// an ephemeral space for my latest manual tests for things.
//

const parinferTest = require('./test');
const parinfer = require('./parinfer');

const code = `
(a (b (c (d ""
            (e)))))
`;

console.log(parinfer.smartMode(code, {
  changes: [
    {lineNo:1, x:3,  oldText: '   ', newText: ''},
    {lineNo:1, x:6,  oldText: ' ', newText: ''},
    {lineNo:2, x:0, oldText: '    ', newText: ''},
  ],
}).text);

// TODO: this should become a test case, but the current test parser
// does not allow it - it returns an error: "diff chars must be adjacent"
// My JS regexp-fu is not up to fixing that, sorry.

// Here's what the test case looks like:

// Form is indented by editor when wrapping with parens:
//
// ```in
// ((reduce-kv (fn [m k v]
// +
//             {}
//            +
//             {})))
//            +    +
// ```
//
//   ```out
// ((reduce-kv (fn [m k v]
//             {}
//             {})))
// ```
