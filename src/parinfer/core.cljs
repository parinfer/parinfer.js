(ns ^:figwheel-always parinfer.core
  (:require-macros
    [hiccups.core :refer [defhtml html]])
  (:require
    [hiccups.runtime]
    [parinfer.editor :refer [create-editor! start-editor-sync!]]
    [ajax.core :refer [GET]]
    cljsjs.marked
    ))

(enable-console-print!)

(defn render!
  [md-text]

  ;; initialize page
  (let [element (js/document.getElementById "app")
        html-text (js/marked md-text)]
    (set! (.-innerHTML element) html-text))
  
  ;; create editors
  ; (create-editor! "main" :main)
  ; (create-editor! "second" :second)
  ; (start-editor-sync!)

  )

(defn init! []
  (GET "content.md" {:handler render!}))

(init!)
