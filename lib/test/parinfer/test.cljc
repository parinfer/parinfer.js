(ns parinfer.test
  "Parses and verifies tests written in doc/*-tests.md
  (cljs stuff is Node.js specific)"
  (:require
    #?(:clj  [clojure.test :refer [is deftest]]
       :cljs [cljs.test :refer-macros [is deftest]])
    #?(:clj  [clojure.pprint :refer [pprint]]
       :cljs [cljs.pprint :refer [pprint]])
    [clojure.string :as string :refer [join split-lines]]
    [parinfer.parse-md-tests :refer [parse-test-cases]]
    [parinfer.indent-mode :as indent-mode]
    [parinfer.paren-mode :as paren-mode]))

#?(:cljs (def fs (js/require "fs")))

(def cases-path "test/parinfer/cases")

(defn idempotent-check
  [type- message text options format-text]
  (let [result (format-text text options)
        message (str type- " idempotence over " message)]
    (is (= text (:text result)) message)))

(defn run-test-cases
  [type- format-text format-text-change]
  (let [filename (str cases-path "/" type- ".md")
        text #?(:clj (slurp filename)
                     :cljs (.readFileSync fs filename))
        test-cases (parse-test-cases text)]
    (doseq [{:keys [in out]} test-cases]
      (let [
            ;; cursor states
            cursor (:cursor in)
            diff-cursor (:cursor (:diff in))
            final-cursor (if (:diff in) diff-cursor cursor)

            ;; options allow the initial state to be overwritten by something
            ;; (we only use it for the cursor right now)
            options (merge cursor)
            diff-options (merge diff-cursor)
            final-options (merge final-cursor)

            ;; message needed for tracking errors
            message (cond-> (str type- " test case @ line #" (:file-line-no in))
                      cursor      (str "\n   with cursor at line=" (:cursor-line cursor) " x=" (:cursor-x cursor))
                      diff-cursor (str "\n   with diff-cursor at line=" (:cursor-line diff-cursor) " x=" (:cursor-x diff-cursor)))

            ;; input and expected output
            text-in (join "\n" (:lines in))
            text-expected (join "\n" (:lines out))

            ;; calculate input change if needed
            change (when-let [diff (:diff in)]
                     (is (not (nil? format-text-change)) message)
                     {:line-no [(:start-line-no diff) (:end-line-no diff)]
                      :new-line (:new-lines diff)})
            text-in2 (when change
                       (join "\n" (get-in in [:diff :lines])))

            ;; calculate result (with change if needed)
            result (format-text text-in options)
            result (if change
                     (format-text-change text-in2 (:state result) change diff-options)
                     result)
            text-actual (:text result)]

        (is (= text-expected text-actual)
            (join "\n" ["" message
                        "expected----------------------------------"
                        text-expected
                        "actual------------------------------------"
                        text-actual]))

        ;; check idempotence against the same mode.
        (idempotent-check type- message text-actual final-options format-text)

        ;; The cursor temporarily allows the modes to break cross-mode idempotence.
        ;; So we only check this if the cursor is not present.
        (when-not final-cursor
          (let [[other-type other-format-text]
                (case type-
                  ("indent-mode" "indent-mode-change") ["paren-mode" paren-mode/format-text]
                  ("paren-mode"  "paren-mode-change")  ["indent-mode" indent-mode/format-text]
                  nil)]
            (idempotent-check other-type message text-actual final-options other-format-text)))))))

(deftest run-indent-mode-cases
  (run-test-cases
    "indent-mode"
    indent-mode/format-text
    indent-mode/format-text-change))

(deftest run-indent-mode-change-cases
  (run-test-cases
    "indent-mode-change"
    indent-mode/format-text
    indent-mode/format-text-change))

(deftest run-paren-mode-cases
  (run-test-cases
    "paren-mode"
    paren-mode/format-text
    nil)) ;; no format-text-change for paren-mode yet

