(ns build
  (:require [shadow.cljs.build :as cljs]
            [shadow.cljs.node :as node]
            [shadow.cljs.umd :as umd]
            [clojure.java.io :as io]
            [clojure.data.json :as json]
            [parinfer.test :refer [cases-path]]
            [parinfer.parse-md-tests :refer [parse-test-cases]]))

(defn release
  "Create a Parinfer release for JavaScript users."
  []
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

(defn extract-test
  "Extracts the test case data from a Markdown doc, and dumps it into JSON.
  (allows people porting Parinfer to have easy access to test cases)"
  [name-]
  (let [in-file (str cases-path "/" name- ".md")
        out-file (str cases-path "/" name- ".json")
        in-str (slurp in-file)
        _ (println (str "Parsing test cases from " in-file "..."))
        cases (parse-test-cases in-str)
        out-str (with-out-str (json/pprint cases))]
    (println (str "Extracting test cases to " out-file "..."))
    (spit out-file out-str)))

(defn extract-tests []
  (extract-test "indent-mode")
  (extract-test "indent-mode-change")
  (extract-test "paren-mode"))

(defn- test-setup []
  (-> (cljs/init-state)
      (cljs/set-build-options
        {:public-dir (io/file "target/cljs-tests")
         :public-path "target/cljs-tests"})
      (cljs/find-resources-in-classpath)))

(defn run-all-tests
  "Build and run all ClojureScript tests under Node.
  Ensures that the exit code reflects test results."
  []
  (-> (test-setup)
      (node/execute-all-tests-and-exit!))
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
                (node/execute-affected-tests! modified)))))))
