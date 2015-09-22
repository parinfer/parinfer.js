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

(defmulti push-char
  (fn [stack [i ch]] ch)
  :hierarchy #'char-hierarchy)

(defmethod push-char :open
  [stack [i ch]]
  (cond
    (in-escape? stack) (pop stack)
    (in-code? stack) (conj stack [i ch])
    :else stack))

(defmethod push-char :close
  [stack [i ch]]
  (println (valid-closer? stack ch) (in-code? stack))
  (cond
    (in-escape? stack) (pop stack)
    (in-code? stack) (if (valid-closer? stack ch)
                       (pop stack)
                       (do
                         (swap! app-state assoc :stack stack)
                         (throw (str "no matching open delimiter for " ch))))
    :else stack))

(defmethod push-char ";"
  [stack [i ch]]
  (cond
    (in-escape? stack) (pop stack)
    (in-code? stack) (conj stack [i ch])
    :else stack))

(defmethod push-char "\n"
  [stack [i ch]]
  (let [s0 (cond-> stack (in-escape? stack) pop)
        s1 (cond-> s0 (in-comment? s0) pop)]
    s1))

(defmethod push-char "\\"
  [stack [i ch]]
  (cond
    (in-escape? stack) (pop stack)
    :else (conj stack [i ch])))

(defmethod push-char "\""
  [stack [i ch]]
  (cond
    (in-escape? stack) (pop stack)
    (in-str? stack) (pop stack)
    :else (conj stack [i ch])))

(defmethod push-char :default
  [stack [i ch]]
  (cond
    (in-escape? stack) (pop stack)
    :else stack))

;; main parsers

(defn parse-line
  ([line] (parse-line [] line))
  ([stack line] (reduce push-char stack (map-indexed vector (str line "\n")))))

(defn parse-text
  ([text] (parse-text [] text))
  ([stack text] (reduce parse-line stack (split-lines text))))


(defn add-trailing-closers
  [lines]
  )

;; EVENTS
;; when editing current line, prevent invalid closers
;; when leaving current line, remove trailing closers
;; when edited, updated paren overlay

;; VIEW

(defn update-text!
  [cursor-index text]
  (println cursor-index)
  (try
    (let [stack (parse-text text)]
      (swap! app-state assoc :stack stack)
      (swap! app-state assoc :text text))
    (catch :default e
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

