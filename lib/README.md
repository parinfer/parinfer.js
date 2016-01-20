# Parinfer Lib

[![Gitter](https://badges.gitter.im/shaunlebron/parinfer.svg)](https://gitter.im/shaunlebron/parinfer?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Travis](https://travis-ci.org/shaunlebron/parinfer.svg?branch=master)](https://travis-ci.org/shaunlebron/parinfer)

This is the canonical implementation of [Parinfer], written in JavaScript.  It
has a dead simple API and can be used directly by any editor or REPL that can
use JavaScript.  It has also been designed to be simple to port.

To learn about its __design and implementation__, please see [`parinfer.js.md`].


| implemented in | link |
|----------|------|
| JavaScript\* | _you are here_ |
| Python | [parinfer.py] |
| ClojureScript | [parinfer-cljs] |

_\* canonical implementation_


[Parinfer]:http://shaunlebron.github.io/parinfer/
[parinfer.py]:https://github.com/oakmac/parinfer.py
[parinfer-cljs]:https://github.com/shaunlebron/parinfer-cljs

## Installation

```
npm install parinfer
```

or download `parinfer.js` from [latest release] and include directly in html:

[latest release]:https://github.com/shaunlebron/parinfer/releases/latest

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
1. __For better performance__ on larger files, you can limit the call frequency
  of `indentMode` and `parenMode` by waiting for the user to stop typing after
  some interval, or by [debouncing] the function.

[debouncing]:https://davidwalsh.name/javascript-debounce-function

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
    - only used by Paren Mode for preserving relative indentation of child expressions when their parents are shifted

Returns an object with the following properties:

- `success` is a boolean indicating if the input was properly formatted enough to create a valid result
- `text` is the full text output (this is just the original text if `success` is false)
- `changedLines` is an array of objects representing only the lines which Parinfer changed:
  - `lineNo` is the zero-based line number
  - `line` is the full text of the line
- `error` is an object populated if `success` is false:
  - `name` is the name of the error, which will be any of the following:
    - `"quote-danger"`
    - `"eol-backslash"`
    - `"unclosed-quote"`
    - `"unclosed-paren"`
    - `"unhandled"`
  - `message` is a message describing the error
  - `lineNo` is a zero-based line number where the error occurred
  - `x` is a zero-based column where the error occurred

## Using Parinfer outside JS

__Node RPC__: If your editor doesn't support using this library directly, you
have the option of connecting your editor to a running Node instance for RPC,
like [nvim-parinfer.js] has done.

__Porting__: You may also want to make a native port of Parinfer to a language
that your editor supports. Rest assured that you don't have to understand the
implementation to port it.  `parinfer.js` is implemented such that it can be
translated in a straightforward way to most scripting languages.

__Testing__: To verify your port works, you'll want to run some tests.  Parinfer's
test cases are compiled to JSON.  Look at [`test/cases.js`] to see how the files are
loaded and tested against Parinfer's functions.

[nvim-parinfer.js]:https://github.com/snoe/nvim-parinfer.js

## Questions?

Thanks for asking!  You're helping make Parinfer better.  You can [email me]
or use our [gitter chatroom].  I'll answer questions as soon as I can.

[email me]:shaunewilliams@gmail.com
[gitter chatroom]:https://gitter.im/shaunlebron/parinfer

## Development

__Language choice__: Parinfer is implemented in ECMAScript 5, which is old JavaScript
supported nearly everywhere.  It was created initially in Clojure ([see
here][old-clojure]), which was useful for exploring the idea in an immutable
environment, but it is now maintained in JS because of speed demands and ease
of portability to different environments.

__Documentation__: Design and implementation is documented in [`parinfer.js.md`].

__Testing__: See [`test/cases/`] directory for testing details.  Or just run the following:

```
npm install
npm test
```

__Performance__: To run a performance stress test:

```
node test/perf.js
```

[old-clojure]:https://github.com/shaunlebron/parinfer/tree/clojure/lib/src/parinfer

<!-- file links need to be full path to make them work for the NPM readme -->

[`test/cases.js`]:https://github.com/shaunlebron/parinfer/blob/master/lib/test/cases.js
[`parinfer.js.md`]:https://github.com/shaunlebron/parinfer/blob/master/lib/parinfer.js.md
[`test/cases/`]:https://github.com/shaunlebron/parinfer/tree/master/lib/test/cases
