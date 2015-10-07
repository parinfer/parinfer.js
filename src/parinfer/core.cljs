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

  (create-editor! "code-indent" :indent)
  (create-editor! "code-indent-far" :indent-far)
  (create-editor! "code-indent-multi" :indent-multi)

  (create-editor! "code-idea-insert-delete" :idea-insert-delete)
  (create-editor! "code-idea-string" :idea-string)
  (create-editor! "code-idea-paredit" :idea-paredit)

  (create-editor! "code-cue-dim" :cue-dim)
  (create-editor! "code-cue-block" :cue-block)
  (create-editor! "code-cue-cursor" :cue-cursor)

  (start-editor-sync!)

  (create-regular-editor! "code-lisp-style")
  (create-regular-editor! "code-c-style")
  (create-regular-editor! "code-skim")
  (create-regular-editor! "code-inspect" {:matchBrackets true})

  ;; create editor animations
  (swap! vcr update-in [:intro] merge vcr/intro
  (swap! vcr update-in [:indent] merge vcr/indent)
  (swap! vcr update-in [:indent-far] merge vcr/indent-far)
  (swap! vcr update-in [:indent-multi] merge vcr/indent-multi)
  (swap! vcr update-in [:idea-insert-delete] merge vcr/idea-insert-delete))
  (swap! vcr update-in [:idea-string] merge vcr/idea-string)
  (swap! vcr update-in [:idea-paredit] merge vcr/idea-paredit)
  (swap! vcr update-in [:cue-dim] merge vcr/cue-dim)
  (swap! vcr update-in [:cue-block] merge vcr/cue-block)
  (swap! vcr update-in [:cue-cursor] merge vcr/cue-cursor)

  (play-recording! :intro)
  (play-recording! :indent)
  (play-recording! :indent-far)
  (play-recording! :indent-multi)
  (play-recording! :idea-insert-delete)
  (play-recording! :idea-string)
  (play-recording! :idea-paredit)
  (play-recording! :cue-dim)
  (play-recording! :cue-block)
  (play-recording! :cue-cursor)

  (render-controls!))

(defn init! []
  (GET "content.md" {:handler render!}))

(init!)
