# Parinfer 

_parentheses inference for Lisp_

 <table>
<tr>
<td>[<img src="https://travis-ci.org/shaunlebron/parinfer.svg?branch=master" valign="middle">](https://travis-ci.org/shaunlebron/parinfer)</td>
<td>__[Home Page](http://shaunlebron.github.io/parinfer/)__</td>
<td>[Download Plugins](http://shaunlebron.github.io/parinfer/#editor-plugins)</td>
<td>[Make a Plugin](https://github.com/shaunlebron/parinfer/wiki/Make-a-Plugin)</td>
</tr>
</table>

<img src="http://zippy.gfycat.com/WeirdOddBluefintuna.gif" width="400">

---

__Parinfer__ is a proof-of-concept editor mode for Lisp programming languages.
It simplifies the way we write Lisp by auto-adjusting parens when indentation
changes and vice versa.  The hope is to make basic Lisp-editing easier for
newcomers and experts alike, while still allowing existing plugins like Paredit
to satisfy the need for more advanced operations.

[Paredit]:http://danmidwood.com/content/2014/11/21/animated-paredit.html

## Using as a library

We publish an _editor-agnostic_ implementation which you can use from Clojure
or ClojureScript.  It is simply a pure function of your text, returning new
text with corrected parens or indentation.  To use, include the following in
your leiningen project.clj dependencies:

```clj
[parinfer "0.2.0"]
```

__Quick Start__: Run `lein repl` inside this repo and try the following:

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

| function                           | description                     | effects                 | tests ([format][test-format]) |
|-----------------------------------:|---------------------------------|-------------------------|-------------------------------|
| [`indent-mode/format-text`]        | Indent Mode: process full text  | [learn][indent-effects] | [tests][indent-tests]         |
| [`paren-mode/format-text`]         | Paren Mode: process full text   | [learn][paren-effects]  | [tests][paren-tests]          |
| [`indent-mode/format-text-change`] | faster processing of changes    |                         | [tests][indent-change-tests]  |
| `paren-mode/format-text-change`    | (not implemented yet)           |                         | [tests][paren-change-tests]   |

[`indent-mode/format-text`]:https://github.com/shaunlebron/parinfer/blob/master/lib/src/parinfer/indent_mode.cljc#L424-L446
[`indent-mode/format-text-change`]:https://github.com/shaunlebron/parinfer/blob/master/lib/src/parinfer/indent_mode.cljc#L448-L481
[`paren-mode/format-text`]:https://github.com/shaunlebron/parinfer/blob/master/lib/src/parinfer/paren_mode.cljc#L158-L168

[test-format]:https://github.com/shaunlebron/parinfer/tree/master/lib/test/parinfer/cases#parinfer-test-cases

[indent-tests]:lib/test/parinfer/cases/indent-mode.md
[paren-tests]:lib/test/parinfer/cases/paren-mode.md
[indent-change-tests]:lib/test/parinfer/cases/indent-mode-change.md
[paren-change-tests]:lib/test/parinfer/cases/paren-mode-change.md

[indent-effects]:http://shaunlebron.github.io/parinfer/#indent-how-it-works
[paren-effects]:http://shaunlebron.github.io/parinfer/#fixing-existing-files

## Connecting to an Editor/REPL

Parinfer's home page shows animated/interactive examples by connecting this
library to a browser-based code editor called [CodeMirror]. The relevant source
code for doing this is
[here](https://github.com/shaunlebron/parinfer/blob/master/site/src/parinfer_site/editor_support.cljs).

Also see [Make a Plugin] wiki page for extra guidance on understanding the implementation
if you wish to port it, and existing plugins you can use as reference.

[CodeMirror]:https://codemirror.net/
[Make a Plugin]:https://github.com/shaunlebron/parinfer/wiki/Make-a-Plugin

## Development setup

- Run `rlwrap lein figwheel`
- Open <http://localhost:3449> to view the site.
- Open <http://localhost:3449/dev.html> to view Indent and Paren mode editors.

See [lib/](lib) directory for running tests.

---

[MIT License](LICENSE.md)
