(ns parinfer-site.editor-support
  "Connects parinfer mode functions to CodeMirror"
  (:require
    [clojure.string :as string :refer [join]]
    [parinfer-site.parinfer :refer [smart-mode
                                    indent-mode
                                    paren-mode]]
    [parinfer-site.state :refer [state]]))

(defprotocol IEditor
  "Custom data/methods for a CodeMirror editor."
  (cm-key [this])
  (get-prev-state [this])
  (frame-updated? [this])
  (set-frame-updated! [this value])
  (record-change! [this thing]))
