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

  (create-editor! "code-line" :line)
  (create-editor! "code-comment" :comment)
  (create-editor! "code-wrap" :wrap)
  (create-editor! "code-splice" :splice)
  (create-editor! "code-barf" :barf)
  (create-editor! "code-slurp" :slurp)
  (create-editor! "code-string" :string)

  (create-editor! "code-displaced" :displaced)
  (create-editor! "code-not-displaced" :not-displaced)

  (start-editor-sync!)

  (create-regular-editor! "code-lisp-style")
  (create-regular-editor! "code-c-style")
  (create-regular-editor! "code-skim")
  (create-regular-editor! "code-inspect" {:matchBrackets true})
  (create-regular-editor! "code-how-control")
  (create-regular-editor! "code-how-infer")

  ;; create editor animations
  (swap! vcr update-in [:intro] merge vcr/intro)
  (swap! vcr update-in [:indent] merge vcr/indent)
  (swap! vcr update-in [:indent-far] merge vcr/indent-far)
  (swap! vcr update-in [:indent-multi] merge vcr/indent-multi)
  (swap! vcr update-in [:line] merge vcr/line)
  (swap! vcr update-in [:wrap] merge vcr/wrap)
  (swap! vcr update-in [:splice] merge vcr/splice)
  (swap! vcr update-in [:barf] merge vcr/barf)
  (swap! vcr update-in [:slurp] merge vcr/slurp-)
  (swap! vcr update-in [:displaced] merge vcr/displaced)
  (swap! vcr update-in [:not-displaced] merge vcr/not-displaced)
  (swap! vcr update-in [:comment] merge vcr/comment-)
  
  (swap! vcr update-in [:string] merge vcr/string)

  (play-recording! :intro)
  (play-recording! :indent)
  (play-recording! :indent-far)
  (play-recording! :indent-multi)
  (play-recording! :line)
  (play-recording! :wrap)
  (play-recording! :splice)
  (play-recording! :barf)
  (play-recording! :slurp)
  (play-recording! :comment)
  (play-recording! :string)
  (play-recording! :displaced)
  (play-recording! :not-displaced)

  (render-controls!))

(defn init! []
  (GET "content.md" {:handler render!}))

(init!)
