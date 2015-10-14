(ns parinfer.reader
  "a basic clojure reader for tracking parens and token states")

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

(defn whitespace? [ch]
  (re-find #"[\s,]" ch))

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
                       (let [opener (peek stack)]
                         {:stack (pop stack)
                          :backup (conj backup opener)})
                       {:ch ""}) ;; erase non-matched delimiter
    :else nil))

(defmethod push-char* ";"
  [{:keys [stack x-pos ch]}]
  (cond
    (escaping? stack) {:stack (pop stack)}
    (in-code? stack) {:stack (conj stack [x-pos ch])}
    :else nil))

(defmethod push-char* "\n"
  [{:keys [stack x-pos ch]}]
  (let [stack (cond-> stack (escaping? stack) pop)
        stack (cond-> stack (in-comment? stack) pop)]
    {:ch ""
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
    (in-comment? stack) nil
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

