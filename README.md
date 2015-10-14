# Parinfer [![Build Status](https://travis-ci.org/shaunlebron/parinfer.svg?branch=master)](https://travis-ci.org/shaunlebron/parinfer)

This is an experiment that tries to demonstrate a possible replacement for
[paredit] as a simpler and more natural way to write Lisp code.

[paredit]:http://danmidwood.com/content/2014/11/21/animated-paredit.html

## Source

| File  | Description  |
|------:|:-------------|
| [`core.cljs`] | entry point |
| [`reader.cljs`] | clojure reader for tracking parens and token states |
| [`infer.cljs`] | corrects parens based on indentation |
| [`prep.cljs`] | corrects indentation based on parens |
| [`editor.cljs`] | glues formatter to CodeMirror |
| [`state.cljs`] | state of each editor |
| [`vcr.cljs`] | editor recording and playback |
| [`vcr_data.cljs`] | editor animation data |

[`core.cljs`]:src/parinfer/core.cljs
[`reader.cljs`]:src/parinfer/reader.cljs
[`infer.cljs`]:src/parinfer/infer.cljs
[`prep.cljs`]:src/parinfer/prep.cljs
[`editor.cljs`]:src/parinfer/editor.cljs
[`state.cljs`]:src/parinfer/state.cljs
[`vcr.cljs`]:src/parinfer/vcr.cljs
[`vcr_data.cljs`]:src/parinfer/vcr_data.cljs

## Formatter Details

The _formatter_ comes in two parts (see [overview]):

- __prep__: ([details][prep-details], [tests][prep-tests]) correct indentation based on parens 
  - (used to preprocess existing files)
- __infer__: ([details][infer-details], [tests][infer-tests]) correct parens based on indentation 
  - (used while editing a file)

[overview]:doc/overview.md
[prep-details]:doc/prep-details.md
[prep-tests]:doc/prep-tests.md
[infer-details]:doc/infer-details.md
[infer-tests]:doc/infer-tests.md

Run tests with:

```
lein cljsbuild test
```

## Presentation Page

```
lein figwheel dev
open http://localhost:3449
```
