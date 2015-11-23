# Parinfer Lib

This is the standalone library for using Parinfer in Clojure or ClojureScript.

See [usage notes].

[usage notes]:https://github.com/shaunlebron/parinfer#using-as-a-library

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

