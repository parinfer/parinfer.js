JavaScript API for [Parinfer], a simpler editing mode for Lisp.

[Parinfer]:http://shaunlebron.github.io/parinfer/

## Installation

```
npm install parinfer
```

or download [parinfer.js][download] and include directly in html:

```html
<script src="parinfer.js"></script>
```

[download]:https://github.com/shaunlebron/parinfer/releases/download/0.2.1/parinfer.js

## Usage

Parinfer consists of a few pure functions of your text, returning new text with
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
1. __Make Indent Mode fast__ by using
   `indentModeChange` after the initial call to `indentMode`.  This
   unfortunately requires some digging around in your editor's API for finding
   which lines were changed by the most recent edit.

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

---

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

Returns an object with the following properties:

- `text` is the full text output
- `isValid` is a boolean indicating if the input was valid
- `state` is an object you can pass to `indentModeChange` for faster change processing

---

##### `indentModeChange(text, prevState, change[, options])`

Runs a faster Indent Mode by only recalculating what has changed.

Arguments:

- `text` is the full text input (including the change).
- `prevState` is the previous state returned by `indentMode` or `indentModeChange`
- `change` is an object describing the change, with the following properties:
  - `lineNo` a number or [min,max] range of lines to replace
  - `newLine` a line string or array of line strings replacing the range specified by `lineNo`
- `options` (same options as `indentMode`)

Returns the same result as `indentMode`.

