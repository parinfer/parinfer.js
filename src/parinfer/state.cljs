(ns parinfer.state)

;; map of editor key -> editor state
(defonce state
  (atom {}))

(def empty-editor-state
  {:text ""     ;; text of the editor
   :cm nil})    ;; the CodeMirror instance


