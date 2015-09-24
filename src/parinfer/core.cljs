(ns ^:figwheel-always parinfer.core
  (:require
    [clojure.string :as string :refer [split-lines join]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [sablono.core :refer-macros [html]]
    [cljsjs.codemirror]
    [cljsjs.codemirror.mode.clojure]
    ))

(enable-console-print!)

(def stress-text
  "
(\tdefn foo
  \"docstring with \\\" [({
  second line\"
  [arg
  \\[
  ret ;; a comment

a
b
c
(def s nil

[:div
  [:a {:href \"hi\"
       :style {:color \"#f00\"
       :id \"link\"
  [:span \"hello\"
  ")

(defonce app-state (atom {:text ""}))

;;------------------------------------------------------------------------
;; Simple clojure delimiter parsing
;;
;; It handles:
;;  - multi-line strings
;;  - comments
;;  - escaped characters
;;------------------------------------------------------------------------

(def matching-delim
  {"{" "}", "}" "{"
   "[" "]", "]" "["
   "(" ")", ")" "("})

(def char-hierarchy
  (-> (make-hierarchy)
      (derive "{" :open)
      (derive "[" :open)
      (derive "(" :open)
      (derive "}" :close)
      (derive "]" :close)
      (derive ")" :close)))

;;; We track delimiters by using a stack of [x-pos char] tuples.

;; Simple state tracking by checking last character.

(defn prev-ch [stack]
  (second (peek stack)))

;;; A delimiter stack can be in any of the following states:

(defn escaping?
  "Next character will be escaped."
  [stack]
  (= \\ (prev-ch stack)))

(defn in-str?
  "Next character is inside a string."
  [stack]
  (= \" (prev-ch stack)))

(defn in-comment?
  "Next character is inside a comment."
  [stack]
  (= \; (prev-ch stack)))

(defn in-code?
  "Next character is inside actual code."
  [stack]
  (and (not (in-str? stack))
       (not (in-comment? stack))))

(defn valid-closer?
  "Determine if the given closing delimiter can be used next, assuming we are inside code."
  [stack ch]
  (= (prev-ch stack) (matching-delim ch)))

;; Push operations

(defmulti push-char
  "Update the delimiter stack with the given character."
  (fn [result [x-pos ch]] ch)
  :hierarchy #'char-hierarchy)

(defmethod push-char "\t"
  [{:keys [stack]} [x-pos ch]]
  (cond
    (not (in-str? stack)) {:ch "  "} ;; replace with two spaces
    :else nil))

(defmethod push-char :open
  [{:keys [stack]} [x-pos ch]]
  (cond
    (escaping? stack) {:stack (pop stack)}
    (in-code? stack) {:stack (conj stack [x-pos ch])}
    :else nil))

(defmethod push-char :close
  [{:keys [stack backup]} [x-pos ch]]
  (cond
    (escaping? stack) {:stack (pop stack)}
    (in-code? stack) (if (valid-closer? stack ch)
                       {:backup (conj backup (peek stack))
                        :stack (pop stack)}
                       {:ch ""}) ;; erase non-matched delimiter
    :else nil))

(defmethod push-char ";"
  [{:keys [stack]} [x-pos ch]]
  (cond
    (escaping? stack) {:stack (pop stack)}
    (in-code? stack) {:stack (conj stack [x-pos ch])}
    :else nil))

(defmethod push-char "\n"
  [{:keys [stack backup]} [x-pos ch]]
  (let [stack (cond-> stack (escaping? stack) pop)
        stack (cond-> stack (in-comment? stack) pop)
        ]
    {:ch ""
     :backup backup
     :stack stack}))

(defmethod push-char "\\"
  [{:keys [stack]} [x-pos ch]]
  (cond
    (escaping? stack) {:stack (pop stack)}
    :else {:stack (conj stack [x-pos ch])}))

(defmethod push-char "\""
  [{:keys [stack]} [x-pos ch]]
  (cond
    (escaping? stack) {:stack (pop stack)}
    (in-str? stack) {:stack (pop stack)}
    :else {:stack (conj stack [x-pos ch])}))

(defmethod push-char :default
  [{:keys [stack]} [x-pos ch]]
  (cond
    (escaping? stack) {:stack (pop stack)}
    :else nil))

;;------------------------------------------------------------------------
;; Closing Delimiter inferencing
;;------------------------------------------------------------------------

;; Utilities

(defn whitespace? [ch]
  (re-find #"[\s,]" ch))

(defn insert-string
  [orig idx insert]
  (str (subs orig 0 idx)
       insert
       (subs orig idx)))

(defn remove-str-range
  [orig start end]
  (str (subs orig 0 start)
       (subs orig end)))

;; Parsing/inferencing

(def empty-result
  "An initial state of our running result."
  {:lines []                           ;; final lines containing the inferenced closing delimiters.
   :line-no -1                         ;; current line number we are processing.
   :track-indent? false                ;; "true" when we are looking for the first char on a line to signify indentation.
   :delim-trail {:start nil :end nil}  ;; track EOL delims since we replace them wholesale with inferred delims.
   :insert {:line nil :col nil}        ;; the place to insert closing delimiters whenever we hit appropriate indentation.
   :stack []})                         ;; the delimiter stack

(defn close-delims
  "Update the given result by inferring closing delimiters.
  Do this by using the given indentation level."
  ([result] (close-delims result 0))
  ([result indent-x]

   (let [;; Pop the appropriate delims off the stack, and create the inferred delim string.
         [stack delims]
         (loop [stack (:stack result), delims ""]
           (if-not (seq stack)
             [stack delims]
             (let [[x ch] (peek stack)]
               (if (>= x indent-x)
                 (recur (pop stack) (str delims (matching-delim ch)))
                 [stack delims]))))

         ;; Insert the delims in the correct place, then update the result.
         {:keys [line-no x-pos]} (:insert result)
         result (-> result
                    (update-in [:lines line-no] insert-string x-pos delims)
                    (assoc :track-indent? false
                           :stack stack))]
     result)))

(defn process-delim-trail
  [{:keys [stack delim-trail backup] :as result} [x-pos ch]]
  (let [closing-delim? (isa? char-hierarchy ch :close)

        ;; Determine if our tracked delimiters are not at the end of the line.
        reset? (and (in-code? stack)
                    (not= ";" ch)
                    (not (whitespace? ch))
                    (not closing-delim?))

        ;; Determine if we have a delimiter we can track.
        update? (and (in-code? stack)
                     closing-delim?
                     (valid-closer? stack ch))

        ;; Clear the backup delimiters if we reset.
        backup (cond-> backup reset? empty)

        ;; Update the delimiter trail range if needed.
        delim-trail (cond
                      reset? {}
                      update? (-> delim-trail
                                  (update-in [:start] #(or % x-pos))
                                  (assoc :end (inc x-pos)))
                      :else delim-trail)]

    (assoc result
      :backup backup
      :stack stack
      :delim-trail delim-trail)))

(defn remove-delim-trail
  [{:keys [delim-trail line-no backup stack] :as result}]
  (if-let [{:keys [start end]} delim-trail]
    (let [[backup stack] (loop [backup backup, stack stack]
                           (if (empty? backup)
                             [backup stack]
                             (recur (pop backup) (conj stack (peek backup)))))]
      (-> result
          (update-in [:lines line-no] remove-str-range start end)
          (assoc :backup backup :stack stack)))
    result))

(defn process-char
  "Update the given result by processing the given character and its position."
  [{:keys [stack line-no track-indent?] :as result} [x-pos ch]]

  (let [result (process-delim-trail result [x-pos ch])
        backup (:backup result)

        ;; Try pushing the char onto the delimiter stack,
        ;; and see if it returns a replacement character or modified stack.
        new-data (push-char result [x-pos ch])
        ch (or (:ch new-data) ch)
        backup (or (:backup new-data) backup)
        stack (or (:stack new-data) stack)
        result (-> result
                   (assoc :stack stack)
                   (assoc :backup backup)
                   (update-in [:lines line-no] str ch))

        ;; Add potential insert point for closing delimiters if required.
        insert (when (and (not= "" ch)

                          ;; only allow whitespace as an insert if we have already found the indentation point
                          ;; (i.e. a whitespace-only line)
                          (or (and (not track-indent?) (whitespace? ch))
                              (not (whitespace? ch)))
                          (not (isa? char-hierarchy ch :close))
                          (seq stack)
                          (in-code? stack))
                 {:line-no line-no
                  :x-pos (inc x-pos)})
        result (cond-> result insert (assoc :insert insert))]
    result))

(defn pre-process-char
  "Update the given result by processing the given character.
  Checks if the char signifies indentation to kick off closing delimiter inference."
  [{:keys [stack
           track-indent?
           lines
           line-no] :as result}
   ch]
  (let [x-pos (count (get lines line-no))
        at-indent? (and track-indent?
                        (in-code? stack)
                        (not (whitespace? ch))
                        (not= ";" ch))
        skip? (and at-indent? (isa? char-hierarchy ch :close))]
    (if skip?
      result
      (-> result
          (cond-> at-indent? (close-delims x-pos))
          (process-char [x-pos ch])))))

(defn process-line
  "Update the given result by processing the given line of text."
  ([line] (process-line empty-result line))
  ([{:keys [stack lines line-no] :as result} line]
   (let [result (assoc result
                  :backup []
                  :delim-trail {:start nil :end nil}
                  :track-indent? (and (seq stack) (not (in-str? stack)))
                  :lines (conj lines "")
                  :line-no (inc line-no))
         result (reduce pre-process-char result (str line "\n"))
         result (remove-delim-trail result)
         ]
     result)))

(defn process-text
  "Update the given result by processing the given text."
  ([text] (process-text empty-result text))
  ([result text]
   (let [result (reduce process-line result (split-lines text))
         result (cond-> result (seq (:stack result)) close-delims)]
     result)))

;;------------------------------------------------------------------------
;; Editor
;;------------------------------------------------------------------------

;; EVENTS: TODO:
;; when editing current line, prevent invalid closers
;; when leaving current line, remove trailing closers
;; when edited, updated paren overlay

(defn remove-trailing-closers
  [line]
  (string/replace line #"[\]})]+\s*$" ""))

;; VIEW

(defn update-text!
  [cursor-index text]
  (let [{:keys [stack lines]} (process-text text)]
    (swap! app-state assoc :stack stack)
    (swap! app-state assoc :text text)
    (swap! app-state assoc :full-text (join "\n" lines))))

(defn root-comp
  [data owner]
  (reify
    om/IRender
    (render [_this]
      (html
        [:div
         [:textarea
          {:on-change (fn [evt]
                        (let [target (.-target evt)]
                          (update-text! (.-selectionStart target) (.-value target))))}]
         [:pre.computed (:full-text data)]]))))

;; hack to initialize the state on first load (not when reloading)
(declare loaded)
(when-not loaded
  (update-text! 0 stress-text))
(def loaded true)

(om/root
  root-comp
  app-state
  {:target (. js/document (getElementById "app"))})


