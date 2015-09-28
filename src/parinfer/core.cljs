(ns ^:figwheel-always parinfer.core
  (:require-macros
    [hiccups.core :refer [defhtml html]])
  (:require
    [hiccups.runtime]
    [parinfer.editor :refer [create-editor!]]
    ))

(enable-console-print!)

(defhtml home []
  [:div
   [:textarea#main]])

(defn init! []

  ;; initialize page
  (let [app (.getElementById js/document "app")]
    (set! (.-innerHTML app) (home)))
  
  ;; create editors
  (create-editor! (.getElementById js/document "main") :main)

  )

(init!)
