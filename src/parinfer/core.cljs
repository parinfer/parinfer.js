(ns ^:figwheel-always parinfer.core
  (:require-macros
    [hiccups.core :refer [defhtml html]])
  (:require
    [hiccups.runtime]
    [parinfer.vcr-data :as vcr]
    [parinfer.editor :refer [render-controls!
                             create-editor!
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
  (create-editor! "code-intro" :intro {:styleActiveLine true})
  (create-editor! "code-try" :try)

  (create-editor! "code-idea-nest" :idea-nest)
  (create-editor! "code-idea-wide-nest" :idea-wide-nest)
  (create-editor! "code-idea-deep-nest" :idea-deep-nest {:styleActiveLine true})
  (create-editor! "code-idea-insert-delete" :idea-insert-delete {:styleActiveLine true})

  (create-editor! "code-cue-dim" :cue-dim)
  (create-editor! "code-cue-block" :cue-block)
  (create-editor! "code-cue-comment" :cue-comment)
  (create-editor! "code-cue-cursor" :cue-cursor)

  (start-editor-sync!)

  (create-regular-editor! "code-lisp-style")
  (create-regular-editor! "code-c-style")
  (create-regular-editor! "code-skim")
  (create-regular-editor! "code-inspect" {:matchBrackets true})

  ;; create editor animations
  (swap! vcr assoc
         :intro vcr/intro
         :idea-nest vcr/idea-nest
         :idea-wide-nest vcr/idea-wide-nest
         :idea-deep-nest vcr/idea-deep-nest
         :idea-insert-delete vcr/idea-insert-delete)

  (play-recording! :intro)
  (play-recording! :idea-nest)
  (play-recording! :idea-wide-nest)
  (play-recording! :idea-deep-nest)
  (play-recording! :idea-insert-delete)

  (render-controls!))

(defn init! []
  (GET "content.md" {:handler render!}))

(init!)
