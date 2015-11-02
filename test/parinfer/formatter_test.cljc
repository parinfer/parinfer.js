(ns parinfer.formatter-test
  "Parses and verifies tests written in doc/*-tests.md
  (cljs stuff is Node.js specific)"
  (:require
    #?(:clj  [clojure.test :refer [is deftest]]
       :cljs [cljs.test :refer-macros [is deftest]])
    #?(:clj  [clojure.pprint :refer [pprint]]
       :cljs [cljs.pprint :refer [pprint]])
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
                                              :lines []
                                              :cursor nil
                                              :diff nil}))))))

(defn index-of
  [string ch]
  (let [i (.indexOf string ch)]
    (when-not (= -1 i) i)))

(defmethod parse-test-line :inside-block
  [{:keys [block-key] :as state} [file-line-no line]]
  (let [block (get-in state [:test-case block-key])
        diff (:diff block)

        ;; process and remove cursor char
        cursor-x (index-of line "|")
        line-without-cursor (string/replace line "|" "")
        multiple-cursors? (< (count line-without-cursor) (dec (count line)))
        line (if multiple-cursors?
               (throw (error-msg file-line-no "only one cursor allowed on a line"))
               line-without-cursor)

        ;; process and remove diff char
        diff-ch (#{"-" "+"} (str (first line)))
        line (if diff-ch
               (if (:closed? diff)
                 (throw (error-msg file-line-no "diff lines must be contiguous"))
                 (str " " (subs line 1)))
               line)

        ;; prevent special chars in 'out' block
        _ (when (= :out block-key)
            (when cursor-x (throw (error-msg file-line-no "no cursor allowed in 'out' block yet")))
            (when diff-ch (throw (error-msg file-line-no "no diff chars allowed in 'out' block"))))

        ;; prevent multiple cursors
        _ (when cursor-x
            (if (= diff-ch "+")
              (when (:cursor diff) (throw (error-msg file-line-no "only one cursor allowed in all '+' diff lines")))
              (when (:cursor block) (throw (error-msg file-line-no "only one cursor allowed in all normal and '-' diff lines")))))

        ;; initialize or close diff
        diff (if-not diff

               ;; initialize diff
               (when diff-ch
                 (let [line-no (count (:lines block))]
                   {:start-line-no line-no
                    :end-line-no line-no
                    :lines (:lines block)
                    :new-lines []}))

               ;; close diff
               (cond-> diff
                 (not diff-ch) (assoc :closed? true)))

        ;; update diff end line
        diff (cond-> diff
               (= diff-ch "-") (update :end-line-no inc))

        ;; commit diff to block
        block (assoc block :diff diff)

        ;; finish determining cursor
        cursor (when cursor-x
                 {:cursor-x cursor-x
                  :cursor-line (if (= diff-ch "+")
                                 (count (:lines diff))
                                 (count (:lines block)))})

        ;; set appropriate cursor
        block (if cursor
                (if (= diff-ch "+")
                  (assoc-in block [:diff :cursor] cursor)
                  (assoc block :cursor cursor))
                block)

        ;; conj line to appropriate vector
        block (case diff-ch
                "+" (-> block
                        (update-in [:diff :lines] conj line)
                        (update-in [:diff :new-lines] conj line))
                "-" (update block :lines conj line)
                (cond-> block
                  true (update :lines conj line)
                  diff (update-in [:diff :lines] conj line)))

        ;; update state
        state (assoc-in state [:test-case block-key] block)]

    state))

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
  [type- message text overrides format-text]
  (let [result (format-text text overrides)
        message (str type- " idempotence over " message)]
    (is (= text (:text result)) message)))

(defn run-test-cases
  [type- format-text format-text-change]
  (let [filename (str "doc/" type- "-tests.md")
        text #?(:clj (slurp filename)
                     :cljs (.readFileSync fs filename))
        test-cases (parse-test-cases text)]
    (doseq [{:keys [in out]} test-cases]
      (let [
            ;; cursor states
            cursor (:cursor in)
            diff-cursor (:cursor (:diff in))
            final-cursor (if (:diff in) diff-cursor cursor)

            ;; overrides allow the initial state to be overwritten by something
            ;; (we only use it for the cursor right now)
            overrides (merge cursor)
            diff-overrides (merge diff-cursor)
            final-overrides (merge final-cursor)

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
            result (format-text text-in overrides)
            result (if change
                     (format-text-change text-in2 (:state result) change diff-overrides)
                     result)
            text-actual (:text result)]

        (is (= text-expected text-actual)
            (join "\n" ["" message
                        "expected----------------------------------"
                        text-expected
                        "actual------------------------------------"
                        text-actual]))

        (idempotent-check "infer" message text-actual final-overrides infer/format-text)
        (when-not final-cursor
          (idempotent-check "prep" message text-actual final-overrides prep/format-text))))))

(deftest run-infer-cases
  (run-test-cases
    "infer"
    infer/format-text
    infer/format-text-change))

(deftest run-infer-change-cases
  (run-test-cases
    "infer-change"
    infer/format-text
    infer/format-text-change))

(deftest run-prep-cases
  (run-test-cases
    "prep"
    prep/format-text
    nil ;; no format-text-change for prep yet
    ))
