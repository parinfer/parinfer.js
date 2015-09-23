(ns ^:figwheel-always parinfer.core
  (:require
    [clojure.string :as string :refer [split-lines]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [sablono.core :refer-macros [html]]))

(enable-console-print!)

(defonce app-state (atom {:text ""}))

(defn remove-trailing-closers
  [line]
  (string/replace line #"[\]})]+\s*$" ""))

;;------------------------------------------------------------------------
;; Simple clojure delimiter parsing
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

;; Simple state tracking by checking last character.

(defn prev-ch [stack]
  (second (peek stack)))

(defn in-escape? [stack]
  (= \\ (prev-ch stack)))

(defn in-str? [stack]
  (= \" (prev-ch stack)))

(defn in-comment? [stack]
  (= \; (prev-ch stack)))

(defn in-code? [stack]
  (and (not (in-str? stack))
       (not (in-comment? stack))))

(defn valid-closer? [stack ch]
  (= (prev-ch stack) (matching-delim ch)))

;; Push operations

(defmulti push-char*
  (fn [stack [x-pos ch]] ch)
  :hierarchy #'char-hierarchy)

(defmethod push-char* "\t"
  [stack [x-pos ch]]
  (cond
    (not (in-str? stack)) (throw (str "no tabs allowed outside strings"))
    :else stack))

(defmethod push-char* :open
  [stack [x-pos ch]]
  (cond
    (in-escape? stack) (pop stack)
    (in-code? stack) (conj stack [x-pos ch])
    :else stack))

(defmethod push-char* :close
  [stack [x-pos ch]]
  (cond
    (in-escape? stack) (pop stack)
    (in-code? stack) (if (valid-closer? stack ch)
                       (pop stack)
                       (do
                         (swap! app-state assoc :stack stack)
                         (throw (str "no matching open delimiter for " ch))))
    :else stack))

(defmethod push-char* ";"
  [stack [x-pos ch]]
  (cond
    (in-escape? stack) (pop stack)
    (in-code? stack) (conj stack [x-pos ch])
    :else stack))

(defmethod push-char* "\n"
  [stack [x-pos ch]]
  (let [s0 (cond-> stack (in-escape? stack) pop)
        s1 (cond-> s0 (in-comment? s0) pop)]
    s1))

(defmethod push-char* "\\"
  [stack [x-pos ch]]
  (cond
    (in-escape? stack) (pop stack)
    :else (conj stack [x-pos ch])))

(defmethod push-char* "\""
  [stack [x-pos ch]]
  (cond
    (in-escape? stack) (pop stack)
    (in-str? stack) (pop stack)
    :else (conj stack [x-pos ch])))

(defmethod push-char* :default
  [stack [x-pos ch]]
  (cond
    (in-escape? stack) (pop stack)
    :else stack))

(defn whitespace? [ch]
  (re-find #"[\s,]" ch))

(defn close-delims
  ([result] (close-delims result 0))
  ([result x-pos]
   ;; TODO: close all delimiters that are >= x-pos, and insert at insertion point
   (assoc result :track-indent? false)))

(defn push-char
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
        result (update-in result [:stack] push-char* [x-pos ch])
        stack (:stack result)

        ;; Add potential insert point for closing delimiters if required.
        insert (when (and (seq stack)
                          (in-code? stack)
                          (not (whitespace? ch)))
                 {:line-no line-no
                  :x-pos x-pos})
        result (cond-> result insert (assoc :insert insert))]
    result))

;; main parsers

(def empty-result
  {:lines []
   :line-no -1
   :track-indent? false
   :insert {:line nil :col nil}
   :stack []})

(defn parse-line
  ([line] (parse-line empty-result line))
  ([{:keys [stack lines line-no] :as result} line]
   (let [result (assoc result
                  :track-indent? (and (seq stack) (not (in-str? stack)))
                  :lines (conj lines line)
                  :line-no (inc line-no))
         result (reduce push-char result (map-indexed vector (str line "\n")))]
     result)))

(defn parse-text
  ([text] (parse-text empty-result text))
  ([result text]
   (let [result (reduce parse-line result (split-lines text))
         result (cond-> result (seq (:stack result)) close-delims)]
     result)))

;; EVENTS
;; when editing current line, prevent invalid closers
;; when leaving current line, remove trailing closers
;; when edited, updated paren overlay

;; VIEW

(defn update-text!
  [cursor-index text]
  (try
    (let [stack (parse-text text)]
      (swap! app-state assoc :stack stack)
      (swap! app-state assoc :text text))
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
         [:pre.internal
          (:text data)
          ]]))))

(om/root
  root-comp
  app-state
  {:target (. js/document (getElementById "app"))})

