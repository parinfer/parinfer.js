(ns parinfer.runner
  "Test runner (must be run on Node.js)"
  (:require
    [cljs.nodejs :refer [enable-util-print!]]
    [cljs.test :refer-macros [run-tests]]
    [parinfer.formatter-test]))
    

(enable-util-print!)

(defn runner []
  (if (cljs.test/successful?
        (run-tests
          'parinfer.formatter-test))
    0
    1))

(set! *main-cli-fn* runner)
