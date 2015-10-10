# Parinfer [![Build Status](https://travis-ci.org/shaunlebron/parinfer.svg?branch=master)](https://travis-ci.org/shaunlebron/parinfer)

This is an experiment that tries to demonstrate a possible replacement for
[paredit] as a simpler and more natural way to write Lisp code.

[paredit]:http://danmidwood.com/content/2014/11/21/animated-paredit.html

## Files

| File  | Description  |
|------:|:-------------|
| [`core.cljs`] | entry point |
| [`formatter.cljs`] | transforms code |
| [`editor.cljs`] | glues formatter to CodeMirror |
| [`state.cljs`] | state of each editor |
| [`vcr.cljs`] | editor recording and playback |
| [`vcr_data.cljs`] | editor animation data |

[`core.cljs`]:src/parinfer/core.cljs
[`formatter.cljs`]:src/parinfer/formatter.cljs
[`editor.cljs`]:src/parinfer/editor.cljs
[`state.cljs`]:src/parinfer/state.cljs
[`vcr.cljs`]:src/parinfer/vcr.cljs
[`vcr_data.cljs`]:src/parinfer/vcr_data.cljs

## Formatter Details

The _formatter_ performs the indentation-based restructuring of code.
You can read about the details of its design at [`formatter-details.md`].

All tests are kept in [`formatter-tests.md`], which is parsed and tested here
under Node.js:

```
lein cljsbuild test
```

[`formatter-details.md`]:doc/formatter-details.md
[`formatter-tests.md`]:doc/formatter-tests.md

## Presentation Page

not quite ready yet.

```
lein figwheel dev
open http://localhost:3449
```
