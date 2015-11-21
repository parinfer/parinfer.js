(defproject parinfer "0.1.0"
  :description "a simpler way to write Lisp"
  :url "http://shaunlebron.github.io/parinfer"

  :license {:name "MIT License"
            :url "https://github.com/shaunlebron/parinfer/blob/master/LICENSE.md"
            :distribution :repo}

  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.122"]]

  :plugins [[lein-cljsbuild "1.1.0"]]

  :source-paths ["src"]

  :clean-targets ^{:protect false} ["target"]

  :aliases {"prep" ["run" "-m" "parinfer.prep-file"]}

  :cljsbuild {
    :test-commands {"test" ["node" "compiled/parinfer-test.js"]}
    :builds [{:id "min"
              :source-paths ["src"]
              :compiler {:output-to "compiled/parinfer.js"
                         :optimizations :advanced
                         :pretty-print false}}

             {:id "test"
              :source-paths ["src" "test"]
              :compiler {:output-to "compiled/parinfer-test.js"
                         :output-dir "compiled/out-test"
                         :main parinfer.runner
                         :optimizations :none
                         :target :nodejs
                         :hashbang false}}
             ]}

  )
