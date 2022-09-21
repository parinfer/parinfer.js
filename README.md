# Parinfer.js

> Pronounced "par-in-fur". "par" rhymes with car and star; "fur" rhymes with blur and stir

<em>See the __[Parinfer Home Page]__ for the original animated demo page.</em>

__Parinfer__ is a proof-of-concept editor mode for Lisp programming languages.
It simplifies the way we write Lisp by auto-adjusting parens when indentation
changes and vice versa.  The hope is to make basic Lisp-editing easier for
newcomers and experts alike, while still allowing existing plugins like Paredit
to satisfy the need for more advanced operations.

## npm package

This library is published on npm under the package name [`parinfer`](https://www.npmjs.com/package/parinfer)

```sh
## using npm
npm install parinfer

## using yarn
yarn add parinfer
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
[integrating.md]:https://github.com/parinfer/parinfer.js/blob/master/doc/integrating.md

## API

##### `smartMode(text[, options])`
##### `indentMode(text[, options])`
##### `parenMode(text[, options])`

Runs
[Indent Mode](http://shaunlebron.github.io/parinfer/#indent-mode)
or
[Paren Mode](http://shaunlebron.github.io/parinfer/#paren-mode)
on the given text. Smart Mode is currently something in between.

Arguments:

- `text` is the full text input.
- `options` is an object with the following properties:
  - `commentChars` - a character (ie: string of length 1) or array of characters that should be considered comments in the code (defaults to `[";"]`)
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

<!-- file links need to be full path to make them work for the NPM readme -->
[`parinfer.js`]:https://github.com/parinfer/parinfer.js/blob/master/parinfer.js
[`code.md`]:https://github.com/parinfer/parinfer.js/blob/master/doc/code.md
[`test/cases/`]:https://github.com/parinfer/parinfer.js/tree/master/test/cases
[annotation syntax]:https://github.com/parinfer/parinfer.js/tree/master/test/cases#annotations
[Paren Trails]:https://github.com/parinfer/parinfer.js/blob/master/doc/code.md#paren-trail

## A stable core for editor plugins

> __Want to use Parinfer on a team?__ Introduce [Parlinter] as your project's linter!

[Parlinter]:https://github.com/shaunlebron/parlinter

The behavior and implementation of the Parinfer library is stable and
canonicalized.  To allow different editors to use it, we have ported the
implementation to the languages required by the plugin
APIs of most major text editors.  All language ports pass the same
comprehensive test suite to help ensure consistent behavior.

| implemented in | link               | relevant editor          |
|:---------------|:-------------------|:-------------------------|
| JavaScript     | parinfer.js (here) | Atom, VSCode, LightTable |
| Rust           | [parinfer-rust]    | Vim                      |
| Python         | [parinfer.py]      | Sublime Text             |
| Kotlin (JVM)   | [parinfer-jvm]     | Cursive IDE, Nightcode   |
| Emacs Lisp     | [parinfer-elisp]   | Emacs                    |
| Vim Script     | [parinfer-viml]    | Vim                      |
| Lua            | [parinfer-lua]     | TextAdept                |

[parinfer-rust]:https://github.com/eraserhd/parinfer-rust
[parinfer.py]:https://github.com/oakmac/parinfer.py
[parinfer-jvm]:https://github.com/oakmac/parinfer-jvm
[parinfer-elisp]:https://github.com/oakmac/parinfer-elisp
[parinfer-viml]:https://github.com/oakmac/parinfer-viml
[parinfer-lua]:https://github.com/oakmac/parinfer-lua

## Status Update 2019 (Smart Mode)

**Smart Mode** (available in [demo]) was an experiment to eliminate switching between Indent Mode and Paren Mode—by looking at a change and determining whether to run Indent Mode or Paren Mode. It is well tested and worked great in our sandboxes, but we found that the majority of editor APIs do not allow us to integrate Smart Mode's rules _safely_.

For example, if we don't catch a search/replace change in multiple locations of your document, but we infer from the next typing operation that we should run Indent Mode, then Smart Mode will make its decision without knowing the previous search/replace operation took place—thereby breaking its promise of choosing the best mode, and unsafely modifying your code.

The larger problem is that Smart Mode requires the synchronous interception of _every type of change_ coming from the editor.  It must decide the right thing to do for input changes at single/multiple cursors, search/replace, copy/paste, advanced macro operations, buffer refreshes from changes on disk, and maybe some others we haven't thought of yet.  The interface for receiving these kinds of changes from the editor are not consistent—they either come in asynchronously or sychronously or _not at all_.  This forces us to resort to computing diffs, a lossy mapping from _changes_ to _patches_.

We have made separate attempts to implement Smart Mode in Cursive, Vim, Atom, and Emacs through some wrangling that made integration very difficult and delicate, and ultimately incomplete.  _Editors simply are not yet designed to allow an ideal version of Parinfer to exist_—probably because nothing like Parinfer has demanded them before.  The practicality of requesting these (likely non-trivial) changes on the editor is to be determined.

## License

[MIT License](LICENSE.md)
