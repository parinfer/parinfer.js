(ns ^:figwheel-always parinfer.core
  (:require
    [clojure.string :as string :refer [split-lines join]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [sablono.core :refer-macros [html]]
    [cljsjs.codemirror]
    [cljsjs.codemirror.mode.clojure]
    [parinfer.formatter :refer [process-text]]
    ))

(enable-console-print!)

(def stress-text
  "
(\tdefn foo
  \"docstring with \\\" [({
  second line\"
  [arg
  \\[
  ret ;; a comment

a
b
c
(def s nil

[:div
  [:a {:href \"hi\"
       :style {:color \"#f00\"
       :id \"link\"
  [:span \"hello\"
  ")

(defonce app-state (atom {:text ""}))

;;------------------------------------------------------------------------
;; Editor
;;------------------------------------------------------------------------


(defn before-change
  [_inst change]
  ;; TODO: calculate and store processed text
  ;; TODO: prevent typing a bad delimiter
  ;;       (will have to find whether the character type is successfully seen in the processed text)
  )

(defn on-change
  [_inst change]
  ;; TODO: apply pre-calculated text (from beforeChange),
  ;;       only if it is different from current value to prevent possible cycling.
  )

(defn on-cursor-activity
  [_inst]
  ;; TODO: trigger a change if we move lines
  )

(def editor-opts
  {:lineNumbers "true"
   :mode "clojure"})

(defn setup-editor
  [elm]
  (let [cm (.fromTextArea js/CodeMirror elm (clj->js editor-opts))]
    (.on cm "change" on-change)
    (.on cm "beforeChange" before-change)
    (.on cm "cursorActivity" on-cursor-activity)))

(defn root-comp
  [data owner]
  (reify
    om/IDidMount
    (did-mount [_this]
      (let [elm (om/get-node owner "editor")]
        (setup-editor elm)))

    om/IRender
    (render [_this]
      (html
        [:div
         [:textarea {:ref "editor"}]]))))

(om/root
  root-comp
  app-state
  {:target (. js/document (getElementById "app"))})


