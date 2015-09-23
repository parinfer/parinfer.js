(ns ^:figwheel-always parinfer.core
  (:require
    [clojure.string :as string :refer [split-lines join]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [sablono.core :refer-macros [html]]))

(enable-console-print!)

(def stress-text
  "
(defn foo
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
  (fn [stack [x-pos ch]] ch)
  :hierarchy #'char-hierarchy)

(defmethod push-char "\t"
  [stack [x-pos ch]]
  (cond
    (not (in-str? stack)) (throw (str "no tabs allowed outside strings"))
    :else stack))

(defmethod push-char :open
  [stack [x-pos ch]]
  (cond
    (escaping? stack) (pop stack)
    (in-code? stack) (conj stack [x-pos ch])
    :else stack))

(defmethod push-char :close
  [stack [x-pos ch]]
  (cond
    (escaping? stack) (pop stack)
    (in-code? stack) (if (valid-closer? stack ch)
                       (pop stack)
                       (do
                         (swap! app-state assoc :stack stack)
                         (throw (str "no matching open delimiter for " ch))))
    :else stack))

(defmethod push-char ";"
  [stack [x-pos ch]]
  (cond
    (escaping? stack) (pop stack)
    (in-code? stack) (conj stack [x-pos ch])
    :else stack))

(defmethod push-char "\n"
  [stack [x-pos ch]]
  (let [s0 (cond-> stack (escaping? stack) pop)
        s1 (cond-> s0 (in-comment? s0) pop)]
    s1))

(defmethod push-char "\\"
  [stack [x-pos ch]]
  (cond
    (escaping? stack) (pop stack)
    :else (conj stack [x-pos ch])))

(defmethod push-char "\""
  [stack [x-pos ch]]
  (cond
    (escaping? stack) (pop stack)
    (in-str? stack) (pop stack)
    :else (conj stack [x-pos ch])))

(defmethod push-char :default
  [stack [x-pos ch]]
  (cond
    (escaping? stack) (pop stack)
    :else stack))

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

;; Parsing/inferencing

(def empty-result
  "An initial state of our running result."
  {:lines []                        ;; final lines containing the inferenced closing delimiters.
   :line-no -1                      ;; current line number we are processing.
   :track-indent? false             ;; "true" when we are looking for the first char on a line to signify indentation.
   :insert {:line nil :col nil}     ;; the place to insert closing delimiters whenever we hit appropriate indentation.
   :stack []})                      ;; the delimiter stack

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

(defn process-char
  "Update the given result by processing the given character and its position."
  [{:keys [stack track-indent? line-no] :as result} [x-pos ch]]

  (let [;; Insert closing delimiters if required.
        should-close? (and track-indent?
                           (in-code? stack)
                           (not (whitespace? ch))
                           (not= ";" ch)
                           (or (not (isa? char-hierarchy ch :close))
                               (throw (str "cannot start line with closing delimiter: " ch))))
        result (cond-> result should-close? (close-delims x-pos))

        ;; Update the delimiter stack with this character.
        result (update-in result [:stack] push-char [x-pos ch])
        stack (:stack result)

        ;; Add potential insert point for closing delimiters if required.
        insert (when (and (seq stack)
                          (in-code? stack)
                          (not (whitespace? ch)))
                 {:line-no line-no
                  :x-pos (inc x-pos)})
        result (cond-> result insert (assoc :insert insert))]
    result))

(defn process-line
  "Update the given result by processing the given line of text."
  ([line] (process-line empty-result line))
  ([{:keys [stack lines line-no] :as result} line]
   (let [result (assoc result
                  :track-indent? (and (seq stack) (not (in-str? stack)))
                  :lines (conj lines line)
                  :line-no (inc line-no))
         result (reduce process-char result (map-indexed vector (str line "\n")))]
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
  (try
    (let [{:keys [stack lines]} (process-text text)]
      (swap! app-state assoc :stack stack)
      (swap! app-state assoc :text text)
      (swap! app-state assoc :full-text (join "\n" lines)))
    (catch :default e
      (println "EXCEPTION:" e)
      nil ;; don't update the text
      )))

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
                          (update-text! (.-selectionStart target) (.-value target))))
           :value (:text data)}]
         [:pre.internal (str ";; internal state\n" (:text data))]
         [:pre.computed (str ";; w/ inferred delims\n" (:full-text data))]]))))

;; hack to initialize the state on first load (not when reloading)
(declare loaded)
(when-not loaded
  (update-text! 0 stress-text))
(def loaded true)

(om/root
  root-comp
  app-state
  {:target (. js/document (getElementById "app"))})


