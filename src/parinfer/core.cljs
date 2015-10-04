(ns ^:figwheel-always parinfer.core
  (:require-macros
    [hiccups.core :refer [defhtml html]])
  (:require
    [hiccups.runtime]
    [parinfer.vcr-data :refer [intro-vcr-state]]
    [parinfer.editor :refer [create-editor!
                             create-regular-editor!
                             start-editor-sync!
                             vcr
                             play-recording!]]
    [ajax.core :refer [GET]]
    [cljsjs.marked]
    ))

(enable-console-print!)

(defn render!
  [md-text]

  ;; initialize page
  (let [element (js/document.getElementById "app")
        html-text (js/marked md-text)]
    (set! (.-innerHTML element) html-text))

  ;; create editors
  (create-editor! "code-intro" :intro)
  (start-editor-sync!)

  (let [opts {:lineNumbers false}]
    (create-regular-editor! "code-lisp-style" opts)
    (create-regular-editor! "code-c-style" opts)
    (create-regular-editor! "code-skim" opts)
    (create-regular-editor! "code-inspect" opts)
    )

  ;; create editor animations
  (swap! vcr assoc :intro intro-vcr-state)
  (play-recording! :intro)

  )

(defn init! []
  (GET "content.md" {:handler render!}))

(init!)
