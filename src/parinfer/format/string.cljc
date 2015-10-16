(ns parinfer.format.string
  (:require
    [clojure.string :as string]))

(defn insert-string
  [orig idx insert]
  (str (subs orig 0 idx)
       insert
       (subs orig idx)))

(defn remove-str-range
  [orig start end]
  (str (subs orig 0 start)
       (subs orig end)))

(defn get-lines
  "fix split-lines by including the last empty line."
  [text]
  (let [last-char (str (last text))]
    (cond-> (vec (string/split-lines text))
      (= "\n" last-char) (conj ""))))
