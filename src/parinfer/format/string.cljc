(ns parinfer.format.string)

(defn insert-string
  [orig idx insert]
  (str (subs orig 0 idx)
       insert
       (subs orig idx)))

(defn remove-str-range
  [orig start end]
  (str (subs orig 0 start)
       (subs orig end)))

