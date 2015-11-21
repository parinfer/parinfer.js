# Parinfer 

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

__Parinfer__ is an experiment to simplify the way we write Lisp by auto-adjusting
parens when indentation changes and vice versa.  The hope is to make
basic Lisp-editing easier for newcomers and experts alike, while still allowing
existing plugins like Paredit to satisfy the need for more advanced operations.

[Paredit]:http://danmidwood.com/content/2014/11/21/animated-paredit.html

## Using as a library

We publish an _editor-agnostic_ implementation which you can use from Clojure
or ClojureScript.  It is simply a pure function of your text, returning new
text with corrected parens or indentation.  To use, include the following in
your leiningen project.clj dependencies:

```clj
[parinfer "0.1.0"]
```

Use the library as seen below. Please see the docstrings for the mentioned
functions [here](parinfer-lib/src/parinfer).

```clj
(ns example.core
  (:require
    [parinfer.indent-mode :as indent-mode]
    [parinfer.paren-mode :as paren-mode]))

;; fully process a given text
(indent-mode/format-text ...)  ;; <-- use this to get started!
(paren-mode/format-text ...)

;; process a partial text change (for faster performance on large files)
(indent-mode/format-text-change ...)
(paren-mode/format-text-change ...)
```

Parinfer's home page shows animated/interactive examples by connecting this
library to a browser-based code editor called [CodeMirror]. The relevant source
code for doing this is
[here](https://github.com/shaunlebron/parinfer/blob/master/site-src/parinfer_site/editor_support.cljs).

Also see [Make a Plugin] wiki page for extra guidance on understanding the implementation
if you wish to port it, and existing plugins you can use as reference.

[CodeMirror]:https://codemirror.net/
[Make a Plugin]:https://github.com/shaunlebron/parinfer/wiki/Make-a-Plugin

## Development setup

- Run `rlwrap lein figwheel`
- Open <http://localhost:3449> to view the site.
- Open <http://localhost:3449/dev.html> to view Indent and Paren mode editors.

See [parinfer-lib/](parinfer-lib) directory for running tests.

---

[MIT License](LICENSE.md)
