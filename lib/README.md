# Parinfer Lib [<img src="https://travis-ci.org/shaunlebron/parinfer.svg?branch=master" valign="middle">](https://travis-ci.org/shaunlebron/parinfer)

This is the standalone _editor-agnostic_ library for using [Parinfer].  It consists
of a few pure functions of your text, returning new text with corrected parens
or indentation.

[Parinfer]:http://shaunlebron.github.io/parinfer/

## Installation

```
npm install parinfer
```

or download [parinfer.js](parinfer.js) and include directly in html:

```html
<script src="parinfer.js"></script>
```

## Usage

Parinfer consists of a couple pure functions of your text, returning new text with
corrected parens or indentation.

```js
// 'parinfer' is a global object if not used as Node module.
var parinfer = require('parinfer');

// Run Indent Mode on the given text:
var result = parinfer.indentMode("(def foo [a b");
console.log(result.text);
// prints:
// (def foo [a b])

// Run Paren Mode on the given text:
var result = parinfer.parenMode("(def foo\n[a b\nc])");
console.log(result.text);
// prints:
// (def foo
//  [a b
//   c])
```

## Adding Parinfer to an Editor

> See [Parinfer for Atom][atom-parinfer] to see an example of these steps implemented.

[atom-parinfer]:https://github.com/oakmac/atom-parinfer

If you want to integrate this Parinfer library into an editor, here are some
small steps you can take to get something quickly working.  Each step produces
something that you can try:

1. __First run__: After every keystroke, pass the contents of the editor to
   `indentMode` and replace the contents with its result.  You now have Indent Mode.
1. __Locate the cursor__: Since Parinfer relaxes its rules around the cursor,
   make sure the aforementioned function receives the location of the cursor.
1. __When the editor opens a file__ you must first pass their content to
  `parenMode` and replace its contents with the result.  This ensures
  indentation of a file is correct before using with Indent Mode.
1. __Allow mode toggling__ by using some hotkeys.  For example:
  - <kbd>Ctrl</kbd>+<kbd>(</kbd> to toggle between Indent Mode and Paren Mode
  - <kbd>Ctrl</kbd>+<kbd>)</kbd> to turn Parinfer off

## Add Parinfer to a REPL

> See this [gif][replete-gif] for an example of [Replete] for iOS using Parinfer in its REPL.

[replete-gif]:https://twitter.com/mfikes/status/668435676438900737
[replete]:https://github.com/mfikes/replete

REPLs can benefit from Parinfer as well, and they are simpler to setup since
we can assume a default subset of the features for quick input:

1. __First run__: After every keystroke, pass the contents of the editor to
   `indentMode` and replace the contents with its result.  You now have Indent
   Mode.
1. __Locate the cursor__: Since Parinfer relaxes its rules around the cursor,
   make sure the aforementioned function receives the location of the cursor.
1. __For auto-indent__, run
   `parenMode` instead of Indent Mode when pressing enter, and reposition the
   cursor at the first non-space character of its line.

## API

##### `indentMode(text[, options])`
##### `parenMode(text[, options])`

Runs
[Indent Mode](http://shaunlebron.github.io/parinfer/#indent-mode)
or
[Paren Mode](http://shaunlebron.github.io/parinfer/#paren-mode)
on the given text.

Arguments:

- `text` is the full text input.
- `options` is an object with the following properties:
  - `cursorLine` - zero-based line number of the cursor
  - `cursorX` - zero-based x-position of the cursor
  - `cursorDx` - amount that the cursor moved horizontally if something was inserted or deleted
    - only used by Paren Mode for preserving relative indentation of subsequent lines

Returns an object with the following properties:

- `text` is the full text output
- `isValid` is a boolean indicating if the input was valid
- `state` is the state result of parinfer's internal processor

## Using Parinfer outside JS

__Node RPC__: If your editor doesn't support using this library directly, you
have the option of connecting your editor to a running Node instance for RPC,
like [nvim-parinfer.js] has done.

__Porting__: You may also want to make a native port of Parinfer to a language
that your editor supports. Rest assured that you don't have to understand the
implementation to port it.  `parinfer.js` is implemented such that it can be
translated in a straightforward way to most scripting languages.

__Testing__: To verify your port works, you'll want to run some tests.  Parinfer's
test cases are compiled to JSON.  Look at `test/test.js` to see how the files are
loaded and tested against Parinfer's functions.

[nvim-parinfer.js]:https://github.com/snoe/nvim-parinfer.js

## Questions?

Thanks for asking!  You're helping make Parinfer better.  You can [email me], or join the
[clojurians slack] community and post a question in the `#parinfer` channel.
Feel free to tag me there `@shaunlebron`.  I'll answer questions as soon
as I can.

[email me]:shaunewilliams@gmail.com
[clojurians slack]:http://clojurians.net/

## Development

Parinfer is implemented in ECMAScript 5, which is old JavaScript supported
nearly everywhere.  It was created initially in Clojure ([see
here][old-clojure]), which was useful for exploring the idea in a pure
environment, but it is now maintained in JS because of speed demands and ease
of portability to different environments.

To run the [test cases]:

```
npm install
npm test
```

To run a performance stress test:

```
node test/perf.js
```

To build the test case JSON files from Markdown ([lein-exec] required for now):

```
test/cases/build.clj
```

[old-clojure]:https://github.com/shaunlebron/parinfer/tree/clojure/lib
[test cases]:test/cases
[lein-exec]:https://github.com/kumarshantanu/lein-exec
