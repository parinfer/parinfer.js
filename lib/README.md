# Parinfer Lib

[![Gitter](https://badges.gitter.im/shaunlebron/parinfer.svg)](https://gitter.im/shaunlebron/parinfer?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Travis](https://travis-ci.org/shaunlebron/parinfer.svg?branch=master)](https://travis-ci.org/shaunlebron/parinfer)

This is the canonical implementation of [Parinfer]'s core transformation
functions. Though it is written in JavaScript, it is ported and synchronized to
other languages to reach most major text editors.

- [Parinfer Demo Editor](http://shaunlebron.github.io/parinfer/demo) - Try it out online.
- [Parinfer Design and Implementation](parinfer.js.md) - Read for deep knowledge on inner workings.

[Parinfer]:http://shaunlebron.github.io/parinfer/

## A stable core for editor plugins

The behavior and implementation of this Parinfer library is stable and
canonicalized.  To allow different editors to make use of this, [@oakmac] has
graciously ported this implementation to the languages required by the plugin
APIs of most major text editors.  All language ports pass the same
comprehensive test suite to help ensure consistent behavior.

| implemented in | link               | relevant editor          |
|----------------|--------------------|--------------------------|
| JavaScript     | parinfer.js (here) | Atom, VSCode, LightTable |
| Python         | [parinfer.py]      | Sublime Text             |
| Kotlin (JVM)   | [parinfer-jvm]     | Cursive IDE, Nightcode   |
| Emacs Lisp     | [parinfer-elisp]   | Emacs                    |
| Vim Script     | [parinfer-viml]    | Vim                      |

_<strong>[Open an issue]</strong> if you would like Parinfer ported to another language for
use in an editor not listed above._

[@oakmac]:https://github.com/oakmac
[parinfer.py]:https://github.com/oakmac/parinfer.py
[parinfer-jvm]:https://github.com/oakmac/parinfer-jvm
[parinfer-elisp]:https://github.com/oakmac/parinfer-elisp
[parinfer-viml]:https://github.com/oakmac/parinfer-viml
[parinfer-cljs]:https://github.com/shaunlebron/parinfer-cljs
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
1. __Update the cursor__: Parinfer may have to shift your cursor around since
   some parts of a line may be added/removed/replaced.  Move your cursor to
   the position at `cursorX`.
1. __When the editor opens a file__ you must first pass their content to
  `parenMode` and replace its contents with the result.  This ensures
  indentation of a file is correct before using with Indent Mode.
1. __Use Tab Stops__ to allow the user to quickly indent/dedent lines to
   important points in Indent Mode.  When the user presses <kbd>Tab</kbd> or
   <kbd>Shift</kbd>+<kbd>Tab</kbd>, do the following:
   1. Prevent <kbd>Tab</kbd> from doing its normal space insertion, or just
      remove them prior to the next step.
   1. Run Indent Mode on the text, passing the cursor in as normal. BUT, if you
      have multiple lines selected, you must instead pass in the
      _starting position of the selection_ as the cursor.
   1. The result returned by the previous step should include a `tabStops`
      property.  These returned tab stops only represent open-paren positions,
      so you need to insert extra tab stops depending on your desired
      indentation conventions.  For example, you can add a tab stop to
      represent a one-space indentation after every `[`, a two-space indentation
      after every `(`, or even get fancy by reading the text that comes after `(`
      to determine context-specific indentation, as is common in Lisp.
   1. If you pressed <kbd>Tab</kbd>, indent the current line (or first line of
      the selection) to the next tab stop.
   1. If you pressed <kbd>Shift</kbd>+<kbd>Tab</kbd>, dedent the current line
      (or first line of the selection) to the previous tab stop.
   1. If there is more than one selected line that you are indenting, shift the
      subsequent lines by the same delta applied to the first.
   1. If no tab stop is available in the direction you're indenting, just use
      two spaces as normal.

1. __Allow mode toggling__ by using some hotkeys.  For example:
  - <kbd>Ctrl</kbd>+<kbd>(</kbd> to toggle between Indent Mode and Paren Mode
  - <kbd>Ctrl</kbd>+<kbd>)</kbd> to turn Parinfer off
1. __Supply extra info to Paren Mode__ to allow it to preserve relative indentaiton
   as you type.  If your editor can notify you of the _type_ of change the user
   just performed, such as the portion of text that was inserted, deleted, or removed,
   then you can calculate a `cursorDx` value from it, allowing Paren Mode
   to keep expressions well-formatted. (TODO, explain how to compute this)
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
1. __Update the cursor__: Parinfer may have to shift your cursor around since
   some parts of a line may be added/removed/replaced.  Move your cursor to
   the position at `cursorX`.
1. __For auto-indent__, run `parenMode` instead of `indentMode` when pressing enter.

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
  - `previewCursorScope` - when set to true in Indent Mode, it shows the cursor's scope on an empty line by inserting close-parens after it. For example:

     With `previewCursorScope = false`:

     ```clj
     (let [foo 1
           bar 2]
           |
       (+ foo bar))
     ```

     And with `previewCursorScope = true`:

     ```clj
     (let [foo 1
           bar 2
           |]
       (+ foo bar))
     ```

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
