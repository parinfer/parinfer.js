# Parinfer Lib

This is the standalone library for using Parinfer in Clojure or ClojureScript.

See [usage notes].

[usage notes]:https://github.com/shaunlebron/parinfer#using-as-a-library

To build the standalone JS library:

- Run `lein cljsbuild once min`
- Compiled file can be found at `compiled/parinfer.js`

To run the [test cases]:

- Run `lein cljsbuild test` for ClojureScript
- Run `lein test parinfer.test` for Clojure.

[test cases]:test-cases

