(ns parinfer.formatter-test
  (:require
    [clojure.string :as string :refer [split-lines]]
    [parinfer.formatter :refer [format-text]]
    [cljs.test :refer-macros [is deftest]]
    ))

(def fs (js/require "fs"))

;; All test cases are parsed from this markdown file.
(def test-filepath "formatter-test.md")

(defn error-msg
  [line-no msg]
  (str "error at test-case line #" line-no ": " msg))

(defmulti parse-test-line
  (fn [state [line-no line]]
    (cond
      (= "```" line)          :end-block
      (re-find #"^```" line)  :start-block
      (:block-key state)      :in-block
      :else                   :default)))

(defmethod parse-test-line :end-block
  [{:keys [block-key test-case test-cases] :as state} [line-no line]]
  (if-not block-key
    (throw (error-msg line-no "opening block must have a name: 'in' or 'out'"))
    (let [test-case-done? (:out test-case)]
      (if test-case-done?

        ;; close test case
        (-> state
            (update-in [:test-cases] conj test-case)
            (assoc :block-key nil)
            (assoc :test-case {}))

        ;; close test block
        (assoc state :block-key nil)))))

(defmethod parse-test-line :start-block
  [{:keys [block-key test-case test-cases] :as state} [line-no line]]
  (if block-key
    (throw (error-msg line-no "must close previous block before starting new one"))
    (let [block-name (second (re-find #"^```(.*)$" line))
          block-key (keyword block-name)]
      (cond

        (not (#{:in :out} block-key))
        (throw (error-msg line-no (str "block name " (pr-str block-name) "must be either 'in' or 'out'")))

        (and (= :in block-key) (:in test-case))
        (throw (error-msg line-no (str "there is already an 'in' block for this test case.")))

        (and (= :out block-key) (not (:in test-case)))
        (throw (error-msg line-no (str "must include an 'in' block before an 'out' block.")))

        :else
        (-> state
            (assoc :block-key block-key)
            (assoc-in [:test-case block-key] {:line-no line-no :text ""}))))))

(defmethod parse-test-line :in-block
  [{:keys [block-key test-case test-cases] :as state} [line-no line]]
  (let [cursor-x (.indexOf line "|")
        cursor-line (when (and (= :in block-key)
                               (not= -1 cursor-x))
                      (- line-no (:line-no (:in test-case))))
        line (string/replace line "|" "")]
    (-> state
        (update-in [:test-case block-key :text] str "\n" line)
        (update-in [:test-case block-key :cursor-x] #(or % cursor-x))
        (update-in [:test-case block-key :cursor-line] #(or % cursor-line)))))

(defmethod parse-test-line :default
  [state [line-no line]]
  state)

(defn parse-test-cases [text]
  (let [lines (split-lines text)
        initial-state {:test-cases []
                       :block-key nil ;; :in or :out
                       :test-case {:in nil, :out nil}}
        numbered-lines (map-indexed (fn [line-no line] [(inc line-no) line]) lines)
        state (reduce parse-test-line initial-state numbered-lines)]

    (when (:block-key state)
      (throw (error-msg "EOF" "code block not closed")))

    (when (not= {} (:test-case state))
      (throw (error-msg "EOF" "test case 'out' block not completed")))

    (:test-cases state)))

(deftest run-test-cases
  (let [text (.readFileSync fs test-filepath)
        test-cases (parse-test-cases text)]
    (doseq [{:keys [in out]} test-cases]
      (let [cursor-line (:cursor-line in)
            cursor-x (:cursor-x in)]
        (is (= (:text out) (format-text {:cursor-line cursor-line
                                         :cursor-x cursor-x} (:text in)))
            (cond-> (str "test case @ line #" (:line-no in))
              (and cursor-line cursor-x) (str " with cursor at line=" cursor-line " x=" cursor-x)))))))

