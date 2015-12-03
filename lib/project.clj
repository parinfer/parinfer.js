(defproject parinfer "0.2.3"
  :description "a simpler way to write Lisp"
  :url "http://shaunlebron.github.io/parinfer"

  :license {:name "MIT License"
            :url "https://github.com/shaunlebron/parinfer/blob/master/LICENSE.md"
            :distribution :repo}

  :dependencies []

  :source-paths ["src"]

  :aliases {"prep" ["run" "-m" "parinfer.prep-file"]}

  :set-version {:updates [{:path "README.md"}
                          {:path "npm-publish/README.md"}
                          {:path "npm-publish/preamble.js"}]}

  :profiles {:dev {:source-paths ["dev" "test"]
                   :plugins [[lein-set-version "0.4.1"]]
                   :dependencies [[org.clojure/clojure "1.7.0"]
                                  [org.clojure/clojurescript "1.7.170"]
                                  [thheller/shadow-build "1.0.182"]]}}

  )
