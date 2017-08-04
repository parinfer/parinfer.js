> __Want to use Parinfer on a team?__ Introduce [Parlinter] as your project's linter!

[Parlinter]:https://github.com/shaunlebron/parlinter

__NEW: Smart Mode__ is an ongoing experiment to hopefully eliminate the need for
users to switch between Indent Mode and Paren Mode. Try out the [demo]!

# Parinfer Lib [![Travis](https://travis-ci.org/shaunlebron/parinfer.svg?branch=master)](https://travis-ci.org/shaunlebron/parinfer)

This is the canonical implementation of [Parinfer]'s core transformation
functions. Though it is written in JavaScript, it is ported and synchronized to
other languages to reach most major text editors.

- [Parinfer Demo Editor][demo] - Try it out online.
- [Parinfer Code Documentation][code.md] - Read for deep knowledge on inner workings.

<!-- file links need to be full path to make them work for the NPM readme -->
[code.md]:https://github.com/shaunlebron/parinfer/blob/master/lib/doc/code.md

[Parinfer]:http://shaunlebron.github.io/parinfer/
[demo]:http://shaunlebron.github.io/parinfer/demo

## A stable core for editor plugins

The behavior and implementation of the Parinfer library is stable and
canonicalized.  To allow different editors to use it, we have ported the
implementation to the languages required by the plugin
APIs of most major text editors.  All language ports pass the same
comprehensive test suite to help ensure consistent behavior.

| implemented in | link               | relevant editor          |
|:---------------|:-------------------|:-------------------------|
| JavaScript     | parinfer.js (here) | Atom, VSCode, LightTable |
| Python         | [parinfer.py]      | Sublime Text             |
| Kotlin (JVM)   | [parinfer-jvm]     | Cursive IDE, Nightcode   |
| Emacs Lisp     | [parinfer-elisp]   | Emacs                    |
| Vim Script     | [parinfer-viml]    | Vim                      |

_<strong>[Open an issue]</strong> if you would like Parinfer ported to another language for
use in an editor not listed above._

[parinfer.py]:https://github.com/oakmac/parinfer.py
[parinfer-jvm]:https://github.com/oakmac/parinfer-jvm
[parinfer-elisp]:https://github.com/oakmac/parinfer-elisp
[parinfer-viml]:https://github.com/oakmac/parinfer-viml
[Open an issue]:https://github.com/shaunlebron/parinfer/issues/new?title=port%20request

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

## Integrating with an Editor or REPL

_See [integrating.md]_

<!-- file links need to be full path to make them work for the NPM readme -->
[integrating.md]:https://github.com/shaunlebron/parinfer/blob/master/lib/doc/integrating.md

## API

##### `smartMode(text[, options])`
##### `indentMode(text[, options])`
##### `parenMode(text[, options])`

Runs
[Indent Mode](http://shaunlebron.github.io/parinfer/#indent-mode)
or
[Paren Mode](http://shaunlebron.github.io/parinfer/#paren-mode)
on the given text.  Smart Mode is currently something in between.

Arguments:

- `text` is the full text input.
- `options` is an object with the following properties:
  - `cursorLine` - zero-based line number of the cursor
  - `cursorX` - zero-based x-position of the cursor
  - `prevCursorLine` and `prevCursorX` is required by Smart Mode (previous cursor position)
  - `selectionStartLine` - first line of the current selection
  - `changes` - ordered array of change objects with the following:
    - `lineNo` - starting line number of the change
    - `x` - starting x of the change
    - `oldText` - original text that was replaced
    - `newText` - new text that replaced the original text
  - `forceBalance` - employ the aggressive paren-balancing rules from v1 (defaults to false)
  - `partialResult` - return partially processed text/cursor if an error occurs (defaults to false)

Returns an object with the following properties:

- `success` is a boolean indicating if the input was properly formatted enough to create a valid result
- `text` is the full text output (if `success` is false, returns original text unless `partialResult` is enabled)
- `cursorX`/`cursorLine` is the new position of the cursor (since parinfer may shift it around)
- `error` is an object populated if `success` is false:
  - `name` is the name of the error, which will be any of the following:
    - `"quote-danger"`
    - `"eol-backslash"`
    - `"unclosed-quote"`
    - `"unclosed-paren"`
    - `"unmatched-close-paren"`
    - `"unhandled"`
  - `message` is a message describing the error
  - `lineNo` is a zero-based line number where the error occurred
  - `x` is a zero-based column where the error occurred
  - `extra` has lineNo and x of open-paren for `unmatched-close-paren`
- `tabStops` is an array of objects representing [Tab stops], which is
  populated if a cursor position or selection is supplied. We identify tab
  stops at relevant open-parens, and supply the following extra information so
  you may compute extra tab stops for one-space or two-space indentation
  conventions based on the type of open-paren.
  - `x` is a zero-based x-position of the tab stop
  - `argX` position of the first argument after `x` (e.g. position of bar in `(foo bar`)
  - `lineNo` is a zero-based line number of the open-paren responsible for the tab stop
  - `ch` is the character of the open-paren responsible for the tab stop (e.g. `(`,`[`,`{`)
- `parenTrails` is an array of object representing the [Paren Trails] at the end
  of each line that Parinfer may move
  - `lineNo` is a zero-based line number
  - `startX` is a zero-based x-position of the first close-paren
  - `endX` is a zero-based x-position after the last close-paren

[Tab stops]:https://en.wikipedia.org/wiki/Tab_stop

## Test API

You can use our testing API for a fast, visual way to specify options and verify
results. This allows all metadata required by and returned from Parinfer to be
specified inside the text using our annotation syntax.

__[See here for Annotation Syntax details][annotation syntax]__

```js
// Currently only supported in Node
var parinferTest = require('parinfer/test');
```

### Test Example

The following code is a quick way to verify behavior of Indent Mode.
The `|` is parsed as the cursor and removed from the text before processing.

```js
parinterTest.indentMode(`
(def foo
  "|
  "(a b)
      c")
`);
```

This returns the processed text below, with `|` reinserted to show cursor
result, and an `^ error` annotation line since a string was not closed:

```
(def foo
  "|
  "(a b)
      c")
       ^ error: unclosed-quote
```

### Test Usage

```js
parinferTest.smartMode(inputText, extras); // returns string
parinferTest.indentMode(inputText, extras); // returns string
parinferTest.parenMode(inputText, extras);  // returns string
```

`extras` allows us to specify options for which there is no annotation syntax yet:

- `forceBalance`
- `partialResult`
- `printTabStops`

You can also use the input/output functions directly:

```js
parinferTest.parseInput(inputText, extras); // returns {text, options}
parinferTest.parseOutput(inputText, extras); // returns result

parinferTest.printOutput(result, extras);   // returns string

// `result` is returned by main indentMode or parenMode functions
```

## Questions?

Thanks for asking!  You're helping make Parinfer better.  You can [email me]
or chat with us on [clojurians slack] at `#parinfer`.  I'll answer questions as soon as I can.

[email me]:shaunewilliams@gmail.com
[clojurians slack]:http://clojurians.net/

## Development

__Code__: [`parinfer.js`] is implemented in ECMAScript 5 for easy speed and portability. Also:

__Documentation__: Code is documented in [`code.md`].

__Performance__: To run a performance stress test:

```
node test/perf.js
```

__Testing__: See [`test/cases/`] directory for testing details.  Or just run the following:

```
npm install
npm test
```

__Sandbox__: See [`sandbox.js`] for how I manually test things (always changing
based on what I'm currently working on).

<!-- file links need to be full path to make them work for the NPM readme -->
[`parinfer.js`]:https://github.com/shaunlebron/parinfer/blob/master/lib/parinfer.js
[`code.md`]:https://github.com/shaunlebron/parinfer/blob/master/lib/doc/code.md
[`test/cases/`]:https://github.com/shaunlebron/parinfer/tree/master/lib/test/cases
[annotation syntax]:https://github.com/shaunlebron/parinfer/blob/master/lib/test/cases/README.md#annotations
[`sandbox.js`]:https://github.com/shaunlebron/parinfer/blob/master/lib/sandbox.js
[Paren Trails]:https://github.com/shaunlebron/parinfer/blob/master/lib/doc/code.md#paren-trail
