(ns parinfer.format.prep
  "Corrects indentation based on parens.
  (used to preprocess existing files)"
  (:require
    [parinfer.format.reader :refer [in-str?
                                    in-code?
                                    whitespace?
                                    valid-closer?
                                    matching-delim
                                    closing-delim?]]
    [parinfer.format.infer :refer [update-delim-trail
                                   remove-delim-trail
                                   update-insertion-pt
                                   update-line
                                   process-char*]]
    [parinfer.format.string :refer [insert-string
                                    get-lines]]
    [clojure.string :refer [join]]))

(def initial-state
  "An initial state of our running state."
  {:lines []                           ;; final lines containing the inferenced closing delimiters.
   :line-no -1                         ;; current line number we are processing.
   :track-indent? false                ;; "true" when we are looking for the first char on a line to signify indentation.
   :delim-trail {:start nil :end nil}  ;; track EOL delims since we replace them wholesale with inferred delims.
   :insert {:line-no nil :x-pos nil}   ;; the place to insert closing delimiters whenever we hit appropriate indentation.
   :stack []                           ;; the delimiter stack, maps of [:x-pos :ch :indent-delta]
   :backup []                          ;; (unused, but required by the reader because of the infer process)
   :dedent-x nil                       ;; current x-position subsequent lines cannot be nested inside
   :indent-delta 0})                     ;; how much the current line's indentation was changed
   

(defn append-delim-trail
  [{:keys [stack line-no insert] :as state}]
  (let [opener (peek stack)
        close-ch (matching-delim (:ch opener))
        stack (pop stack)]
    (-> state
        (assoc :stack stack
               :dedent-x (:x-pos opener))
        (update-in [:lines (:line-no insert)] insert-string (:x-pos insert) close-ch)
        (update-in [:insert :x-pos] inc))))

(defn min-indent
  [x {:keys [stack]}]
  (let [opener (peek stack)]
    (if-let [start-x (:x-pos opener)]
      (max (inc start-x) x)
      x)))

(defn min-dedent
  [x {:keys [dedent-x]}]
  (if dedent-x
    (min dedent-x x)
    x))

(defn correct-indent
  [{:keys [x-pos stack dedent-x line-no] :as state}]
  (let [opener (peek stack)
        delta (:indent-delta opener 0)
        new-x (-> (+ x-pos delta)
                  (min-indent state)
                  (min-dedent state))
        new-delta (- new-x x-pos)
        indent-str (apply str (repeat new-x " "))]
    (-> state
        (assoc-in [:lines line-no] indent-str)
        (assoc :indent-delta new-delta
               :x-pos new-x
               :track-indent? false
               :dedent-x nil))))

(defn handle-cursor-delta
  [{:keys [line-no x-pos cursor-line cursor-x cursor-dx] :as state}]
  (let [cursor-delta? (and (= cursor-line line-no)
                           (= cursor-x x-pos)
                           cursor-dx)]
    (cond-> state
      cursor-delta? (update :indent-delta + cursor-dx))))

(defn process-indent
  "Update the state by handling a possible indentation trigger."
  [{:keys [stack track-indent? lines line-no ch
           x-pos cursor-line cursor-x cursor-dx] :as state}]
  (let [check-indent? (and track-indent?
                        (in-code? stack)
                        (not (whitespace? ch))
                        (not= ";" ch))
        matching? (and check-indent?
                       (closing-delim? ch)
                       (valid-closer? stack ch))
        skip? (and check-indent? (closing-delim? ch))
        at-indent? (and check-indent? (not skip?))
        state (assoc state :process? (not skip?))]
    (cond-> state
      matching? append-delim-trail
      at-indent? correct-indent
      true handle-cursor-delta)))

(defn process-char
  "Update the state by processing the given character and its position."
  [{:keys [lines line-no] :as state} ch]
  (let [x-pos (count (get lines line-no))
        state (assoc state :x-pos x-pos :ch (str ch))
        state (process-indent state)]
    (cond-> state
      (:process? state) process-char*)))

(defn reinsert-delims
  [{:keys [removed-delims] :as state}]
  (reduce
    (fn [state _delim]
      (append-delim-trail state))
    state
    removed-delims))

(defn process-line
  "Update the state by processing the given line of text."
  ([line] (process-line initial-state line))
  ([{:keys [stack lines line-no cursor-line] :as state} line]
   (let [line-no (inc line-no)
         state (assoc state
                  :backup []
                  :cursor-in-comment? false
                  :delim-trail {:start nil :end nil}

                  ;; different from process-line in parinfer.format.infer
                  ;; (even if the stack is empty, we still have to track indentation)
                  :track-indent? (not (in-str? stack))

                  :lines (conj lines "")
                  :line-no line-no
                  :removed-delims [])
         state (reduce process-char state (str line "\n"))
         state (-> state
                   remove-delim-trail
                   reinsert-delims)]
     state)))

(defn process-text
  "Update the state by processing the given text."
  ([text] (process-text initial-state text))
  ([state text]
   (let [state (merge initial-state state)
         lines (get-lines text)
         state (reduce process-line state lines)
         stack (:stack state)]

     ;; abandon processing if something is left unclosed since we cannot infer anything.
     (when (empty? stack)
       state))))

(defn format-text
  "Format the given text by repositioning any trailing closing delimiters based on indentation."
  ([text] (format-text initial-state text))
  ([state text]
   (if-let [state (process-text state text)]
     (join "\n" (:lines state))
     text)))
