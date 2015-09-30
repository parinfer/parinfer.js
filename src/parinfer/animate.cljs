(ns parinfer.animate)

;; TODO: Animating an editor requires the following steps:
;; - set initial state of the editor
;; - delay: time to wait after operation
;; - take a string of what I want to type

;; operations:
;; - change selection (select some text, or move the cursor)  <-- how do we catch this event?
;; - replace selection (insert or remove text)
;; - indent                                                   <-- change object's "text" will have multiple attributes?

(def operations [{:delay 12
                  :op nil ;; :change, :replace,  change object's "origin" +input, +delete, 
                  :text ""
                  }
                 ])


;; start
;; hit record button
;; record initial value and cursor position
;; record whitelist of changes inside "change" and "cursorActivity" events
;; hit stop button
;; start looping what we recorded
;; LOOP:
;; set initial state of value and cursor
;; (replaceSelection or setSelection), then delay until next step
;; restart

;; make the editor read-only

;; how to handle multiple editors? each have their own cm object?
