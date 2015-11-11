# Parinfer [![Build Status](https://travis-ci.org/shaunlebron/parinfer.svg?branch=master)](https://travis-ci.org/shaunlebron/parinfer)

 <table>
<tr>
<td>__[Home Page](http://shaunlebron.github.io/parinfer/)__</td>
<td>[Atom editor plugin in progress](https://github.com/oakmac/atom-parinfer)</td>
</tr>
</table>

<img src="http://zippy.gfycat.com/WeirdOddBluefintuna.gif" width="400">
<hr>

Parinfer is an experiment to simplify the way we write Lisp by auto-adjusting
parens when indentation changes and vice versa.  It is intended to simplify
the main [Paredit] operations in an intuitive way.

[Paredit]:http://danmidwood.com/content/2014/11/21/animated-paredit.html

Parinfer is currently built with Clojure(Script) and CodeMirror.

## Running the site

```
lein figwheel dev
open http://localhost:3449
```

## Running the tests

[Test cases] are described in markdown code block pairs for readability.

[Test cases]:test-cases

Test ClojureScript build:

```
lein cljsbuild test
```

Test Clojure build:

```
lein test parinfer.test
```

## License

MIT
