(ns parinfer.prep
  "Corrects indentation based on parens.
  (used to preprocess existing files)"
  (:require
    [parinfer.reader :refer [in-str?
                             in-code?
                             whitespace?
                             valid-closer?
                             matching-delim
                             char-hierarchy]]
    [parinfer.infer :refer [update-delim-trail
                            remove-delim-trail
                            update-insertion-pt
                            update-line
                            process-char*]]
    [parinfer.string :refer [insert-string]]
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
   :dedent-x 0                         ;; current x-position subsequent lines cannot be nested inside
   :indent-delta 0                     ;; how much the current line's indentation was changed
   })

(defn append-delim-trail
  [{:keys [stack line-no insert] :as state}]
  (let [[dedent-x open-ch] (peek stack)
        close-ch (matching-delim open-ch)
        stack (pop stack)]
    (-> state
        (assoc :stack stack
               :dedent-x dedent-x)
        (update-in [:lines line-no] insert-string (:x-pos insert) close-ch)
        (update-in [:insert :x-pos] inc))))

(defn process-indent
  "Update the state by handling a possible indentation trigger.

  Example:
  
  (defn foo [a b
     ret           ;; <---  When we process `r`, we detect indentation, then
                   ;;       we start backtracking to insert closing delimiters on a previous line.


  (defn foo [a b]
     )             ;; <---  If a line starts with a closing delimiter, it is not
                   ;;       considered an indentation trigger.  In fact, we skip
                   ;;       the character completely, removing it from the line.
  "
  [{:keys [stack track-indent? lines line-no x-pos ch] :as state}]
  (let [at-indent? (and track-indent?
                        (in-code? stack)
                        (not (whitespace? ch))
                        (not= ";" ch))
        close-delim? (isa? char-hierarchy ch :close)
        matching? (and close-delim?
                       (valid-closer? stack ch))
        skip? (and at-indent? close-delim?)
        process? (not skip?)
        state (assoc state :process? process?)]
    (cond-> state
      matching? append-delim-trail)))

(defn process-char
  "Update the state by processing the given character and its position."
  [{:keys [lines line-no] :as state} ch]
  (let [x-pos (count (get lines line-no))
        state (assoc state :x-pos x-pos :ch ch)
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
                  :track-indent? (and (seq stack) (not (in-str? stack)))
                  :lines (conj lines "")
                  :line-no line-no)
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
         lines (.split text "\n") ;; different from clojure.string/split (respects empty lines)
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

