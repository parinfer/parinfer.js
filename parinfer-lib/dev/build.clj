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

(defn- test-setup []
  (-> (cljs/init-state)
      (cljs/set-build-options
        {:public-dir (io/file "target/cljs-tests")
         :public-path "target/cljs-tests"})
      (cljs/find-resources-in-classpath)
      ))

(defn test-runner []
  (-> (test-setup)
      (node/make-test-runner))
  :done)

(defn run-all-tests []
  (-> (test-setup)
      (node/execute-all-tests!))
  :done)

(defn autotest
  [& args]
  (-> (test-setup)
      (cljs/watch-and-repeat!
        (fn [state modified]
          (-> state
              (cond->
                ;; first pass, run all tests
                (empty? modified)
                (node/execute-all-tests!)
                ;; only execute tests that might have been affected by the modified files
                (not (empty? modified))
                (node/execute-affected-tests! modified))
              )))))
