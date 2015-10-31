(ns parinfer.formatter-test
  "Parses and verifies tests written in doc/*-tests.md
  (cljs stuff is Node.js specific)"
  (:require
    #?(:clj  [clojure.test :refer [is deftest]]
       :cljs [cljs.test :refer-macros [is deftest]])
    [clojure.string :as string :refer [join split-lines]]
    [parinfer.format.infer :as infer]
    [parinfer.format.prep :as prep]))

#?(:cljs (def fs (js/require "fs")))

(defn error-msg
  [file-line-no msg]
  (str "error at test-case line #" file-line-no ": " msg))

(defmulti parse-test-line
  (fn [state [file-line-no line]]
    (cond
      (= "```" line)          :end-block
      (re-find #"^```" line)  :start-block
      (:block-key state)      :inside-block
      :else                   :default)))

(defmethod parse-test-line :end-block
  [{:keys [block-key test-case test-cases] :as state} [file-line-no line]]
  (if-not block-key
    (throw (error-msg file-line-no "opening block must have a name: 'in' or 'out'"))
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
  [{:keys [block-key test-case test-cases] :as state} [file-line-no line]]
  (if block-key
    (throw (error-msg file-line-no "must close previous block before starting new one"))
    (let [block-name (second (re-find #"^```(.*)$" line))
          block-key (keyword block-name)]
      (cond

        (not (#{:in :out} block-key))
        (throw (error-msg file-line-no (str "block name " (pr-str block-name) "must be either 'in' or 'out'")))

        (and (= :in block-key) (:in test-case))
        (throw (error-msg file-line-no (str "there is already an 'in' block for this test case.")))

        (and (= :out block-key) (not (:in test-case)))
        (throw (error-msg file-line-no (str "must include an 'in' block before an 'out' block.")))

        :else
        (-> state
            (assoc :block-key block-key)
            (assoc-in [:test-case block-key] {:file-line-no file-line-no
                                              :lines []}))))))

(defmethod parse-test-line :inside-block
  [{:keys [block-key test-case test-cases] :as state} [file-line-no line]]
  (let [cursor-x (.indexOf line "|")
        cursor-line (when (and (= :in block-key)
                               (not= -1 cursor-x))
                      (dec (- file-line-no (:file-line-no (:in test-case)))))
        line (string/replace line "|" "")]
    (-> state
        (update-in [:test-case block-key :lines] conj line)
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

(defn idempotent-check
  [type- message result overrides format-text]
  (let [post-result (format-text overrides result)
        message (str type- " idempotence over " message)]
    (is (= result post-result) message)))

(defn run-test-cases
  ([type- format-text] (run-test-cases type- format-text nil))
  ([type- format-text post-test]
   (let [filename (str "doc/" type- "-tests.md")
         text #?(:clj (slurp filename)
                 :cljs (.readFileSync fs filename))
         test-cases (parse-test-cases text)]
     (doseq [{:keys [in out]} test-cases]
       (let [cursor-line (:cursor-line in)
             cursor-x (:cursor-x in)
             cursor? (and cursor-line cursor-x)
             overrides (select-keys in [:cursor-line :cursor-x])
             message (cond-> (str type- " test case @ line #" (:file-line-no in))
                       cursor? (str " with cursor at line=" cursor-line " x=" cursor-x))
             text-in (join "\n" (:lines in))
             text-out (join "\n" (:lines out))
             result (format-text overrides text-in)]
         (is (= text-out result))
         (idempotent-check "infer" message result overrides infer/format-text)
         (when-not cursor?
           (idempotent-check "prep" message result overrides prep/format-text)))))))

(deftest run-infer-cases
  (run-test-cases "infer" infer/format-text))

(deftest run-prep-cases
  (run-test-cases "prep" prep/format-text))
