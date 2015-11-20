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

We publish a implementation which you can use from Clojure or ClojureScript
by including the following in your project.clj dependencies:

```clj
[parinfer "0.1.0"]
```

Use the library as seen below. Please see the docstrings for the mentioned
functions.

```clj
(ns example.core
  (:require
    [parinfer.indent-mode :as indent-mode]
    [parinfer.paren-mode :as paren-mode]))

;; fully process a given text
(indent-mode/format-text ...)
(paren-mode/format-text ...)

;; process a partial text change
(indent-mode/format-text-change ...)
(paren-mode/format-text-change ...)
```

> __NOTE__:
> The `parinfer.site` namespace is non-public.  It is included as a visual component for development
> testing and for ensuring that our implementation and features demonstrated
> on the website are in sync.

## Plugging it into an editor

Parinfer's home page shows animated/interactive examples by connecting the
aforementioned Parinfer library to a browser-based code editor called
[CodeMirror]. The relevant source code for doing this is in
[`parinfer.site.editor-support`], which you can use as reference.

Also see [Make a Plugin] wiki page for extra guidance on understanding the implementation
if you wish to port it, and existing plugins you can use as reference.

[`parinfer.site.editor-support`]:https://github.com/shaunlebron/parinfer/blob/master/src/parinfer/site/editor_support.cljs
[CodeMirror]:https://codemirror.net/
[Make a Plugin]:https://github.com/shaunlebron/parinfer/wiki/Make-a-Plugin

## Development setup

- Run `lein figwheel dev`
- Open <http://localhost:3449> to view the site.
- Open <http://localhost:3449/dev.html> to view Indent and Paren mode editors.

To run the [test cases]:

- Run `lein cljsbuild test` for ClojureScript
- Run `lein test parinfer.test` for Clojure.

[test cases]:test-cases

---

[MIT License](LICENSE.md)
