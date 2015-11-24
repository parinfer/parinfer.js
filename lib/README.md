# Parinfer Lib

This is the standalone _editor-agnostic_ library for using [Parinfer].  It consists
of a few pure functions of your text, returning new text with corrected parens
or indentation.

[Parinfer]:http://shaunlebron.github.io/parinfer/

## Installation and Usage

__JavaScript users__, please [see the npm package page](https://www.npmjs.com/package/parinfer)

The library is written in portable Clojure. Include the following in your leiningen project.clj dependencies:

```clj
[parinfer "0.2.0"]
```

__Quick Start__: Run `lein repl` inside this directory and try the following:

```clj
(require '[parinfer.indent-mode :as indent-mode])

;; this is the input text that you want Parinfer to format
(def in  "(def foo [a b")

;; format the text with Indent Mode
(def out (indent-mode/format-text in))
(:text out)
;;=> "(def foo [a b])"
```

__Public API__:

| namespace     | function (see docstring)                               | effects                 | tests\*                      | JavaScript API       |
|--------------:|:-------------------------------------------------------|-------------------------|------------------------------|----------------------|
| `indent-mode` | [`format-text`][indent-mode/format-text]               | [learn][indent-effects] | [tests][indent-tests]        | [`indentMode`]       |
| `paren-mode`  | [`format-text`][paren-mode/format-text]                | [learn][paren-effects]  | [tests][paren-tests]         | [`parenMode`]        |
| `indent-mode` | [`format-text-change`][indent-mode/format-text-change] |                         | [tests][indent-change-tests] | [`indentModeChange`] |
| `paren-mode`  | ~~`format-text-change`~~ (wip)                         |                         | [tests][paren-change-tests]  |                      |

_\* see [test format][test-format]_

[indent-mode/format-text]:https://github.com/shaunlebron/parinfer/blob/master/lib/src/parinfer/indent_mode.cljc#L424-L446
[indent-mode/format-text-change]:https://github.com/shaunlebron/parinfer/blob/master/lib/src/parinfer/indent_mode.cljc#L448-L481
[paren-mode/format-text]:https://github.com/shaunlebron/parinfer/blob/master/lib/src/parinfer/paren_mode.cljc#L164-L174
[`indentMode`]:https://github.com/shaunlebron/parinfer/blob/master/lib/src/parinfer/api_js.cljs#L34-L40
[`parenMode`]:https://github.com/shaunlebron/parinfer/blob/master/lib/src/parinfer/api_js.cljs#L51-L57
[`indentModeChange`]:https://github.com/shaunlebron/parinfer/blob/master/lib/src/parinfer/api_js.cljs#L42-L49

[test-format]:https://github.com/shaunlebron/parinfer/tree/master/lib/test/parinfer/cases#parinfer-test-cases

[indent-tests]:lib/test/parinfer/cases/indent-mode.md
[paren-tests]:lib/test/parinfer/cases/paren-mode.md
[indent-change-tests]:lib/test/parinfer/cases/indent-mode-change.md
[paren-change-tests]:lib/test/parinfer/cases/paren-mode-change.md

[indent-effects]:http://shaunlebron.github.io/parinfer/#indent-how-it-works
[paren-effects]:http://shaunlebron.github.io/parinfer/#fixing-existing-files

## Add Parinfer to an Editor

> <em>Check existing [editor plugins] as reference, or see how
> Parinfer's home page connects the library to [CodeMirror] using the code
> [here][editor-support]</em>.

[editor plugins]:http://shaunlebron.github.io/parinfer/#editor-plugins
[CodeMirror]:https://codemirror.net/
[editor-support]:https://github.com/shaunlebron/parinfer/blob/master/site/src/parinfer_site/editor_support.cljs

If you want to integrate this Parinfer library into an editor, here are some
small steps you can take to get something quickly working.  Each step produces
something that you can try:

1. __First run__: After every keystroke, pass the contents of the editor to
   [`indent-mode/format-text`][indent-mode/format-text]
   and replace the contents with its result.  You now have Indent Mode.
1. __Locate the cursor__: Since Parinfer relaxes its rules around the cursor,
   make sure the aforementioned function receives the location of the cursor.
1. __When the editor opens a file__ you must first pass their content to
  [`paren-mode/format-text`][paren-mode/format-text] and replace its contents
  with the result.  This ensures indentation of a file is correct before using
  with Indent Mode.
1. __Allow mode toggling__ by using some hotkeys.  For example:
  - <kbd>Ctrl</kbd>+<kbd>(</kbd> to toggle between Indent Mode and Paren Mode
  - <kbd>Ctrl</kbd>+<kbd>)</kbd> to turn Parinfer off
1. __Make Indent Mode fast__ by using
   [`indent-mode/format-text-change`][indent-mode/format-text-change]
   after the initial call to `format-text`.  This unfortunately requires some
   digging around in your editor's API for finding which lines were changed by
   the most recent edit.

## Add Parinfer to a REPL

> <em>Check [Replete, the iOS REPL][replete] for reference, relevant code [here][replete-code]</em>.

[replete]:https://github.com/mfikes/replete
[replete-code]:https://github.com/mfikes/replete/blob/9caccfbd5db447a0eb2f98698d3a98b584310e55/ClojureScript/replete/src/replete/core.cljs#L71-L77

REPLs can benefit from Parinfer as well, and they are simpler to setup since
we can assume a default subset of the features for quick input:

1. __First run__: After every keystroke, pass the contents of the editor to
   [`indent-mode/format-text`][indent-mode/format-text]
   and replace the contents with its result.  You now have Indent Mode.
1. __Locate the cursor__: Since Parinfer relaxes its rules around the cursor,
   make sure the aforementioned function receives the location of the cursor.
1. __For auto-indent__, run
   [`paren-mode/format-text`][paren-mode/format-text]
   instead of Indent Mode when pressing enter, and reposition the cursor
   at the first non-space character of its line.

## Porting Parinfer

If your editor doesn't support using this library directly, you may consider
just having your plugin spin up an instance of Node and connecting to it via
some socket. The plugin authors for [nvim-parinfer.js] and
[sublime-text-parinfer] have taken this route.

[nvim-parinfer.js]:https://github.com/snoe/nvim-parinfer.js
[sublime-text-parinfer]:https://github.com/oakmac/sublime-text-parinfer

If you wish instead to port Parinfer to another language, I would suggest
approaching it with the following steps:

1. __Get a feel__ for what Parinfer does using the home page [animations].
1. __Clarify specifics__ by reading the [test cases].
1. __Interactively probe__ the rules with the side-by-side editor for each mode, [Indent] and [Paren].
1. __Follow the source__ of the [Clojure implementation].
1. __Strengthen__ your understanding using the [formal analysis] if that's your thing.
1. __Reference__ the source code of [existing plugins].

[animations]:http://shaunlebron.github.io/parinfer
[test cases]:https://github.com/shaunlebron/parinfer/tree/master/lib/test/parinfer/cases
[Indent]:http://shaunlebron.github.io/parinfer/#indent-how-it-works
[Paren]:http://shaunlebron.github.io/parinfer/#fixing-existing-files
[Clojure implementation]:https://github.com/shaunlebron/parinfer/tree/master/lib/src/parinfer
[formal analysis]:http://shaunlebron.github.io/parinfer/#mathematical-foundation
[existing plugins]:http://shaunlebron.github.io/parinfer/#editor-plugins

## Questions?

Thanks for asking!  You're helping make Parinfer better.  You can [email me], or join the
[clojurians slack] community and post a question in the `#parinfer` channel.
Feel free to tag me there `@shaunlebron`.  I'll answer questions as soon
as I can.

[email me]:shaunewilliams@gmail.com
[clojurians slack]:http://clojurians.net/

## Development

__Build__ the standalone JS library (published on npm):

- Run `lein run -m build/release`
- Compiled file can be found at `npm-publish/parinfer.js`

__Test__ the library's [test cases]:

- Run `lein run -m build/run-all-tests` for ClojureScript
- Run `lein test parinfer.test` for Clojure.
- (no tests for javascript API yet)

[test cases]:test/parinfer/cases

__Publish__ the library to:

- clojars via `lein deploy clojars`
- npm via `cd npm-publish; npm publish`

