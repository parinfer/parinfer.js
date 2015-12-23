#!/usr/bin/env lein-exec

;; This script extracts test cases from the .md files
;; and dumps them into .json files.

(use '[leiningen.exec :only (deps)])
(deps '[[org.clojure/data.json "0.2.6"]])

(require '[clojure.java.io :as io]
         '[clojure.data.json :as json]
         '[clojure.string :as string :refer [split-lines]])

;; Get the directory of this file.
;; source: http://stackoverflow.com/a/3986092/142317
(defn dirname [path] (.getParent (java.io.File. path)))
(defn expand-path [path] (.getCanonicalPath (java.io.File. path)))
(def DIRNAME (expand-path (dirname *file*)))

(def cases-path DIRNAME)

(defn error
  [file-line-no msg]
  (let [whole-msg (str "error at test-case line #" file-line-no ": " msg)]
    (Exception. whole-msg)))

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
    (throw (error file-line-no "opening block must have a name: 'in' or 'out'"))
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
    (throw (error file-line-no "must close previous block before starting new one"))
    (let [block-name (second (re-find #"^```(.*)$" line))
          block-key (keyword block-name)]
      (cond

        (not (#{:in :out} block-key))
        (throw (error file-line-no (str "block name " (pr-str block-name) "must be either 'in' or 'out'")))

        (and (= :in block-key) (:in test-case))
        (throw (error file-line-no (str "there is already an 'in' block for this test case.")))

        (and (= :out block-key) (not (:in test-case)))
        (throw (error file-line-no (str "must include an 'in' block before an 'out' block.")))

        :else
        (-> state
            (assoc :block-key block-key)
            (assoc-in [:test-case block-key] {:fileLineNo file-line-no
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
               (throw (error file-line-no "only one cursor allowed on a line"))
               line-without-cursor)

        ;; process and remove diff char
        diff-ch (#{"-" "+"} (str (first line)))
        line (if diff-ch
               (if (:closed? diff)
                 (throw (error file-line-no "diff lines must be contiguous"))
                 (str " " (subs line 1)))
               line)

        ;; prevent special chars in 'out' block
        _ (when (= :out block-key)
            (when cursor-x (throw (error file-line-no "no cursor allowed in 'out' block yet")))
            (when diff-ch (throw (error file-line-no "no diff chars allowed in 'out' block"))))

        ;; prevent multiple cursors
        _ (when cursor-x
            (if (= diff-ch "+")
              (when (:cursor diff) (throw (error file-line-no "only one cursor allowed in all '+' diff lines")))
              (when (:cursor block) (throw (error file-line-no "only one cursor allowed in all normal and '-' diff lines")))))

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
               (= diff-ch "-") (update-in [:end-line-no] inc))

        ;; commit diff to block
        block (assoc block :diff diff)

        ;; finish determining cursor
        cursor (when cursor-x
                 {:cursorX cursor-x
                  :cursorLine (if (= diff-ch "+")
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
                "-" (update-in block [:lines] conj line)
                (cond-> block
                  true (update-in [:lines] conj line)
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
      (throw (error "EOF" "code block not closed")))

    (when (not= {} (:test-case state))
      (throw (error "EOF" "test case 'out' block not completed")))

    (:test-cases state)))

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

(extract-tests)
