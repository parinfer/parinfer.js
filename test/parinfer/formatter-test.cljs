(ns parinfer.formatter-test
  (:require
    [clojure.string :as string :refer [split-lines]]
    [parinfer.formatter :refer [format-text]]
    [cljs.test :refer-macros [is deftest]]
    ))

(def fs (js/require "fs"))

(defn parse-test-cases! []
  (let [text (.readFileSync fs "formatter-test.md")
        lines (split-lines text)
        error-msg (fn [line-no msg]
                    (str "error at test-case line #" line-no ": " msg))

        state
        (reduce
          (fn [{:keys [block-key test-case test-cases] :as state} [line-no line]]
            (println line-no ":" (pr-str line))
            (cond

              ;;; Block is ending?
              (= "```" line)
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
                    (assoc state :block-key nil))))

              ;;; Block is starting?
              (re-find #"^```" line)
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
                        (assoc-in [:test-case block-key] {:line-no line-no :text ""})))))

              ;;; Inside a block?
              block-key
              (let [cursor-x (.indexOf line "|")
                    cursor (when (and (= :in block-key)
                                      (not= -1 cursor-x))
                             {:cursor-x cursor-x
                              :cursor-line (- line-no (:line-no (:in test-case)))})
                    line (string/replace line "|" "")]
                (println "CURSOR:" (pr-str cursor))
                (-> state
                   (update-in [:test-case block-key :text] str "\n" line)
                   (assoc-in [:test-case block-key :cursor] cursor)))

              ;;; Outside a block?
              :else
              state))

          {:test-cases []
           :block-key nil ;; :in or :out
           :test-case {:in nil, :out nil}}

          (map-indexed (fn [line-no line] [(inc line-no) line]) lines))]
    
    (when (:block-key state)
      (throw (error-msg "EOF" "code block not closed")))

    (when (not= {} (:test-case state))
      (throw (error-msg "EOF" "test case 'out' block not completed")))

    (:test-cases state)))

(deftest run-test-cases
  (let [test-cases (parse-test-cases!)]
    (doseq [{:keys [in out cursor]} test-cases]
      (is (= (:text out) (format-text cursor (:text in)))
          (cond-> (str "test case @ line #" (:line-no in))
            cursor (str " with cursor:" (pr-str cursor)))))))

