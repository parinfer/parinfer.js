;; alias js => javascript
(macro js (rest...) (javascript ~@rest...))

;; Example: (while (< i 10) (console.log i))
(macro while (condition rest...)
  (do
    (js "for(;") ~condition (js "){")
    ~rest...
    (js "}")
    undefined))

;; Example: (forindex i 0 10 (console.log i))
(macro forindex (idx start end rest...)
  (do
    (js "var") ~idx
    (js "for(") (set ~idx ~start) (< ~idx ~end) (js "){")
    ~rest...
    (set ~idx (+ ~idx 1))
    (js "}")
    undefined))

;; Example: (foreach e [1 2 3] (console.log e))
(macro foreach (elm arr rest...)
  ((.forEach ~arr) (function (~elm) ~rest...)))
