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

Parinfer is currently built with Clojure(Script) and CodeMirror.

---

__Development setup__

- Run `lein figwheel dev`
- Open <http://localhost:3449> to view the site.
- Open <http://localhost:3449/dev.html> to view Indent and Paren mode editors.

To run the [test cases]:

- Run `lein cljsbuild test` for ClojureScript
- Run `lein test parinfer.test` for Clojure.

[test cases]:test-cases

---

[MIT License](LICENSE.md)
