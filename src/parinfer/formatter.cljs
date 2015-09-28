(ns parinfer.formatter
  (:require
    [clojure.string :refer [join]]))

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

;;------------------------------------------------------------------------
;; Delimiter Stack states
;;
;;   We track delimiters by using a stack of [x-pos char] tuples.
;;   State is tracked by checking last character.
;;------------------------------------------------------------------------

(defn prev-ch [stack]
  (second (peek stack)))

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

;;------------------------------------------------------------------------
;; Delimiter Stack operations
;;
;; 
;;   We track delimiters by using a stack of [x-pos char] tuples.
;;   State is tracked by checking last character.
;;------------------------------------------------------------------------

(defmulti push-char*
  "Update the delimiter stack with the given character."
  (fn [state] (:ch state))
  :hierarchy #'char-hierarchy)

(defmethod push-char* "\t"
  [{:keys [stack x-pos ch]}]
  (cond
    (not (in-str? stack)) {:ch "  "} ;; replace with two spaces
    :else nil))

(defmethod push-char* :open
  [{:keys [stack x-pos ch]}]
  (cond
    (escaping? stack) {:stack (pop stack)}
    (in-code? stack) {:stack (conj stack [x-pos ch])}
    :else nil))

(defmethod push-char* :close
  [{:keys [stack backup x-pos ch]}]
  (cond
    (escaping? stack) {:stack (pop stack)}
    (in-code? stack) (if (valid-closer? stack ch)
                       {:backup (conj backup (peek stack))
                        :stack (pop stack)}
                       {:ch ""}) ;; erase non-matched delimiter
    :else nil))

(defmethod push-char* ";"
  [{:keys [stack x-pos ch]}]
  (cond
    (escaping? stack) {:stack (pop stack)}
    (in-code? stack) {:stack (conj stack [x-pos ch])}
    :else nil))

(defmethod push-char* "\n"
  [{:keys [stack backup x-pos ch]}]
  (let [stack (cond-> stack (escaping? stack) pop)
        stack (cond-> stack (in-comment? stack) pop)]
    {:ch ""
     :backup backup
     :stack stack}))

(defmethod push-char* "\\"
  [{:keys [stack x-pos ch]}]
  (cond
    (escaping? stack) {:stack (pop stack)}
    :else {:stack (conj stack [x-pos ch])}))

(defmethod push-char* "\""
  [{:keys [stack x-pos ch]}]
  (cond
    (escaping? stack) {:stack (pop stack)}
    (in-str? stack) {:stack (pop stack)}
    :else {:stack (conj stack [x-pos ch])}))

(defmethod push-char* :default
  [{:keys [stack x-pos ch]}]
  (cond
    (escaping? stack) {:stack (pop stack)}
    :else nil))

(defn push-char
  [state]
  (let [new-data (push-char* state)]
    (merge-with #(or %2 %1) state new-data)))

;;------------------------------------------------------------------------
;; Utilities
;;------------------------------------------------------------------------

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

;;------------------------------------------------------------------------
;; Utilities
;;------------------------------------------------------------------------

(def initial-state
  "An initial state of our running state."
  {:lines []                           ;; final lines containing the inferenced closing delimiters.
   :line-no -1                         ;; current line number we are processing.
   :track-indent? false                ;; "true" when we are looking for the first char on a line to signify indentation.
   :delim-trail {:start nil :end nil}  ;; track EOL delims since we replace them wholesale with inferred delims.
   :insert {:line-no nil :x-pos nil}   ;; the place to insert closing delimiters whenever we hit appropriate indentation.
   :stack []                           ;; the delimiter stack, [x-pos char] tuples
   :backup []                          ;; trailing delims that are pushed back onto the stack at EOL
   })                         

(defn close-delims
  "Update the state by inferring closing delimiters.
  Do this by using the given indentation level.
  
  Example:
  
  (defn foo [a b
     ret           ;; <---  When we process `r`, we detect indentation, then...

  (defn foo [a b]  ;; <---  ... we insert a `]` after `b` since `[` is after `r` on the x-axis.
     ret           ;; <---  A `)` is inserted after `ret` if no further indented lines found.
  "
  ([state] (close-delims state 0))
  ([state indent-x]

   (let [;; Pop the appropriate delims off the stack, and create the inferred delim string.
         [stack delims]
         (loop [stack (:stack state), delims ""]
           (if-not (seq stack)
             [stack delims]
             (let [[x ch] (peek stack)]
               (if (>= x indent-x)
                 (recur (pop stack) (str delims (matching-delim ch)))
                 [stack delims]))))

         ;; Insert the delims in the correct place, then update the state
         {:keys [line-no x-pos]} (:insert state)
         state (-> state
                    (update-in [:lines line-no] insert-string x-pos delims)
                    (assoc :track-indent? false
                           :stack stack))]
     state)))

(defn update-delim-trail
  "Update the state's delim trail as we scan across a line.
  We eventually remove the delim trail since we indented
  content below can cause the delims to move.

  Example:
  
  (foo (+ 2 3) [(bar)] )    ;; a potential comment
                    ^^^^
                     |
                     +-- trailing delims that we will remove
                          (notice whitespace will also be removed)
  "
  [{:keys [stack delim-trail backup x-pos ch] :as state}]
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

    (assoc state
      :backup backup
      :delim-trail delim-trail)))

(defn remove-delim-trail
  "Update the state by removing our marked delim trail.
  We remove the delims from the appropriate line of text,
  while also restoring their matching delims onto the stack.

  Example:
  
  (foo (+ 2 3) [(bar)] )    ;; a potential comment
  ^            ^^   ^^^^
  |            |     |
  |____________|     +-- Remove these from the text.
         |
         +-- Restore these onto the delim stack.
             (fyi, we originally popped them off to validate
              the closing delims. now we need them back to
              infer closing delims for indented lines.)
  "
  [{:keys [delim-trail insert line-no backup stack] :as state}]
  (let [{:keys [start end]} delim-trail]
    (if (and start end)
      (let [[backup stack] (loop [backup backup, stack stack]
                             (if (empty? backup)
                               [backup stack]
                               (recur (pop backup) (conj stack (peek backup)))))
            state (-> state
                       (update-in [:lines line-no] remove-str-range start end)
                       (assoc :backup backup :stack stack))

            insert-line? (= (:line-no insert) line-no)
            state (cond-> state
                     insert-line? (update-in [:insert :x-pos] min start))]
        state)
      state)))

(defn update-insertion-pt
  "Update the state's trailing delimiter insertion point as we scan the line.
  
  Example:
  
  (defn foo [a b] ret)
  ^^^^^ ^^^ ^^ ^  ^^^
                    |
                    +-- final insertion point candidate

  Special rules allow the user to freely position the trailing
  delimiters while editing a line.

  "
  [{:keys [track-indent? cursor-line line-no stack x-pos ch] :as state}]
  (let [closing-delim? (isa? char-hierarchy ch :close)
        insert-at-char? (and (not= "" ch)
                             (not (whitespace? ch))
                             (or (and (= line-no cursor-line)
                                      closing-delim?)
                                 (not closing-delim?))
                             (in-code? stack))

        ;; Add potential insert point for closing delimiters if required.
        insert (when insert-at-char?
                 {:line-no line-no
                  :x-pos (inc x-pos)})]

    (cond-> state
      insert (assoc :insert insert))))

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
        skip? (and at-indent? (isa? char-hierarchy ch :close))]
    (when-not skip?
      (cond-> state
        at-indent? (close-delims x-pos)))))

(defn update-line
  "Update the state by addding processed character to the line."
  [{:keys [ch line-no] :as state}]
  (update-in state [:lines line-no] str ch))

(defn process-char
  "Update the state by processing the given character and its position."
  [{:keys [lines line-no] :as state} ch]
  (let [x-pos (count (get lines line-no))
        state (assoc state :x-pos x-pos :ch ch)
        orig-state state]
    (if-let [state (process-indent state)]
      (-> state
          update-delim-trail
          push-char
          update-line
          update-insertion-pt)
      orig-state)))

(defn process-line
  "Update the state by processing the given line of text."
  ([line] (process-line initial-state line))
  ([{:keys [stack lines line-no cursor-line] :as state} line]
   (let [line-no (inc line-no)
         state (assoc state
                  :backup []
                  :delim-trail {:start nil :end nil}
                  :track-indent? (and (seq stack) (not (in-str? stack)))
                  :lines (conj lines "")
                  :line-no line-no)
         state (reduce process-char state (str line "\n"))
         state (cond-> state
                  (not= line-no cursor-line) remove-delim-trail)]
     state)))

(defn process-text
  "Update the state by processing the given text."
  ([text] (process-text initial-state text))
  ([state text]
   (let [state (merge initial-state state)
         lines (.split text "\n") ;; different from clojure.string/split (respects empty lines)
         state (reduce process-line state lines)
         stack (:stack state)
         close? (and (seq stack)
                     (not (in-str? stack)))
         state (cond-> state close? close-delims)]
     state)))

(defn format-text
  "Format the given text by repositioning any trailing closing delimiters based on indentation."
  ([text] (format-text initial-state text))
  ([state text]
   (let [state (process-text state text)
         final-text (join "\n" (:lines state))]
     final-text)))

