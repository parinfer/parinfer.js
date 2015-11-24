(defproject parinfer-site "0.0-SNAPSHOT"
  :description "site for illustrating the value of Parinfer"
  :url "http://shaunlebron.github.io/parinfer"

  :license {:name "MIT License"
            :url "https://github.com/shaunlebron/parinfer/blob/master/LICENSE.md"
            :distribution :repo}

  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.122"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                 [org.omcljs/om "0.9.0"]
                 [sablono "0.3.6"]]

  :plugins [[lein-cljsbuild "1.1.0"]
            [lein-figwheel "0.4.0"]]

  :source-paths ["../lib/src"]

  :clean-targets ^{:protect false} ["resources/public/js/compiled" "target"]

  :cljsbuild {
    :test-commands {"test" ["node" "resources/public/js/compiled/parinfer-test.js"]}
    :builds [{:id "dev"
              :source-paths ["src" "../lib/src"]
              :figwheel {:on-jsload "parinfer-site.core/on-js-reload" }
              :compiler {:main parinfer-site.core
                         :asset-path "js/compiled/out"
                         :output-to "resources/public/js/compiled/parinfer.js"
                         :output-dir "resources/public/js/compiled/out"
                         :source-map-timestamp true }}
             {:id "min"
              :source-paths ["src" "../lib/src"]
              :compiler {:output-to "resources/public/js/compiled/parinfer.js"
                         :externs ["resources/public/codemirror/lib/closure-externs.js"
                                   "resources/public/js/lib/scrollMonitor.externs.js"
                                   "resources/public/js/lib/gears.d3.externs.js"
                                   "resources/public/js/lib/d3.ext.js"
                                   "resources/public/js/lib/jsdiff.externs.js"]
                         :main parinfer-site.core
                         :optimizations :advanced
                         :pretty-print false}}

             ]}

  :figwheel {
             ;; :http-server-root "public" ;; default and assumes "resources"
             ;; :server-port 3449 ;; default
             ;; :server-ip "127.0.0.1"

             :css-dirs ["resources/public/css"] ;; watch and update CSS

             ;; Start an nREPL server into the running figwheel process
             ;; :nrepl-port 7888

             ;; Server Ring Handler (optional)
             ;; if you want to embed a ring handler into the figwheel http-kit
             ;; server, this is for simple ring servers, if this
             ;; doesn't work for you just run your own server :)
             ;; :ring-handler hello_world.server/handler

             ;; To be able to open files in your editor from the heads up display
             ;; you will need to put a script on your path.
             ;; that script will have to take a file path and a line number
             ;; ie. in  ~/bin/myfile-opener
             ;; #! /bin/sh
             ;; emacsclient -n +$2 $1
             ;;
             ;; :open-file-command "myfile-opener"

             ;; if you want to disable the REPL
             ;; :repl false

             ;; to configure a different figwheel logfile path
             ;; :server-logfile "tmp/logs/figwheel-logfile.log"
             })
