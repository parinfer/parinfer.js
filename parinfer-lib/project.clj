(defproject parinfer "0.2.0"
  :description "a simpler way to write Lisp"
  :url "http://shaunlebron.github.io/parinfer"

  :license {:name "MIT License"
            :url "https://github.com/shaunlebron/parinfer/blob/master/LICENSE.md"
            :distribution :repo}

  :dependencies []

  :source-paths ["src"]

  :aliases {"prep" ["run" "-m" "parinfer.prep-file"]}

  :profiles {:dev {:source-paths ["dev" "test"]
                   :dependencies [[org.clojure/clojure "1.7.0"]
                                  [org.clojure/clojurescript "1.7.170"]
                                  [thheller/shadow-build "1.0.180"]]}}

  )
