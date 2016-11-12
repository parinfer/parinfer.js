# Parinfer Lib [![Travis](https://travis-ci.org/shaunlebron/parinfer.svg?branch=master)](https://travis-ci.org/shaunlebron/parinfer)

This is the canonical implementation of [Parinfer]'s core transformation
functions. Though it is written in JavaScript, it is ported and synchronized to
other languages to reach most major text editors.

- [Parinfer Demo Editor](http://shaunlebron.github.io/parinfer/demo) - Try it out online.
- [Parinfer Design and Implementation][design.md] - Read for deep knowledge on inner workings.

<!-- file links need to be full path to make them work for the NPM readme -->
[design.md]:https://github.com/shaunlebron/parinfer/blob/master/lib/doc/design.md

[Parinfer]:http://shaunlebron.github.io/parinfer/

## A stable core for editor plugins

The behavior and implementation of the Parinfer library is stable and
canonicalized.  To allow different editors to use it, we have ported the
implementation to the languages required by the plugin
APIs of most major text editors.  All language ports pass the same
comprehensive test suite to help ensure consistent behavior.

| implemented in | link                 | relevant editor          |
|:---------------|:---------------------|:-------------------------|
| JavaScript     | parinfer.js (here)   | Atom, VSCode, LightTable |
| LispyScript    | parinfer.lisp (here) | 〃                       |
| Python         | [parinfer.py]        | Sublime Text             |
| Kotlin (JVM)   | [parinfer-jvm]       | Cursive IDE, Nightcode   |
| Emacs Lisp     | [parinfer-elisp]     | Emacs                    |
| Vim Script     | [parinfer-viml]      | Vim                      |

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
  - `cursorDx` - (Paren Mode only) indicates the amount the cursor moved horizontally if something was inserted or deleted in order to help preserve relative indentation of child expressions ([see docs][cursorDx]).
  - `previewCursorScope` - (Indent Mode only) when set to true, shows the cursor's scope on an empty line by inserting close-parens after it ([see docs][previewCursorScope]).

<!-- file links need to be full path to make them work for the NPM readme -->
[cursorDx]:https://github.com/shaunlebron/parinfer/blob/master/lib/doc/design.md#preserving-relative-indentation-while-typing
[previewCursorScope]:https://github.com/shaunlebron/parinfer/blob/master/lib/doc/design.md#seeing-cursor-scope-in-indent-mode

Returns an object with the following properties:

- `success` is a boolean indicating if the input was properly formatted enough to create a valid result
- `text` is the full text output (this is just the original text if `success` is false)
- `cursorX` is the new x-position of the cursor (since parinfer may shift it around)
- `changedLines` is an array of objects representing only the lines which Parinfer changed:
  - `lineNo` is the zero-based line number
  - `line` is the full text of the line
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
- `tabStops` is an array of objects representing [Tab stops], which is
  populated in Indent Mode if a cursor position is supplied. We identify tab
  stops at relevant open-parens, and supply the following extra information so
  you may compute extra tab stops for one-space or two-space indentation
  conventions based on the type of open-paren.
  - `x` is a zero-based x-position of the tab stop
  - `lineNo` is a zero-based line number of the open-paren responsible for the tab stop
  - `ch` is the character of the open-paren responsible for the tab stop (e.g. `(`,`[`,`{`)

[Tab stops]:https://en.wikipedia.org/wiki/Tab_stop

## Questions?

Thanks for asking!  You're helping make Parinfer better.  You can [email me]
or chat with us on [clojurians slack] at `#parinfer`.  I'll answer questions as soon as I can.

[email me]:shaunewilliams@gmail.com
[clojurians slack]:http://clojurians.net/

## Development

__Code__: [`parinfer.js`] is implemented in ECMAScript 5 for easy speed and portability. Also:

- Original version was in ClojureScript [here][old-clojure].
- Currently maintaining [`parinfer.lisp`] in LispyScript, compiling to JS comparable
  in size and performance to direct JS-- about as close as I can get to using
  Parinfer while coding Parinfer.

__Documentation__: Design and implementation is documented in [`design.md`].

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
[`parinfer.js`]:https://github.com/shaunlebron/parinfer/blob/master/lib/parinfer.js
[`design.md`]:https://github.com/shaunlebron/parinfer/blob/master/lib/doc/design.md
[`parinfer.lisp`]:https://github.com/shaunlebron/parinfer/blob/master/lib/lisp/parinfer.lisp
[`test/cases/`]:https://github.com/shaunlebron/parinfer/tree/master/lib/test/cases
