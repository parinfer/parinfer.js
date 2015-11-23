# Parinfer Lib

This is the standalone library for using Parinfer in Clojure or ClojureScript.

See [usage notes].

[usage notes]:https://github.com/shaunlebron/parinfer#using-as-a-library

To build the standalone JS library:

- Run `lein run -m build/release`
- Compiled file can be found at `compiled/parinfer.js`

To run the [test cases]:

- Run `lein run -m build/run-all-tests` for ClojureScript
- Run `lein test parinfer.test` for Clojure.

[test cases]:test/parinfer/cases

