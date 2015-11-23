(ns build
  (:require [shadow.cljs.build :as cljs]
            [shadow.cljs.node :as node]
            [shadow.cljs.umd :as umd]
            [clojure.java.io :as io]))

(defn release []
  (-> (cljs/init-state)
      (cljs/find-resources-in-classpath)
      (umd/create-module
        {:indentMode 'parinfer.api-js/js-indent-mode
         :indentModeChange 'parinfer.api-js/js-indent-mode-change
         :parenMode 'parinfer.api-js/js-paren-mode})
      (cljs/compile-modules)
      (cljs/closure-optimize :advanced)
      (umd/flush-module "npm-publish/parinfer.js"))
  :done)

(defn run-all-tests []
  (-> (cljs/init-state)
      (cljs/set-build-options
        {:public-dir (io/file "target/cljs-tests")
         :public-path "target/cljs-tests"})
      (cljs/find-resources-in-classpath)
      (node/execute-all-tests!))
  :done)
