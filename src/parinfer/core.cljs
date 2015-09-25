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

(defn update-text!
  [cursor-index text]
  (let [lines (split-lines (subs text 0 cursor-index))
        cursor-x (count (last lines))
        cursor-line (dec (count lines))
        data {:cursor-line cursor-line
              :cursor-x cursor-x}
        {:keys [stack lines]} (process-text data text)]
    (swap! app-state assoc :stack stack)
    (swap! app-state assoc :text text)
    (swap! app-state assoc :full-text (join "\n" lines))))

(defn trigger-change!
  "should be called when text or cursor position changes."
  [evt]
  (let [target (.-target evt)]
    (update-text! (.-selectionStart target) (.-value target))))

(defn root-comp
  [data owner]
  (reify
    om/IRender
    (render [_this]
      (html
        [:div
         [:textarea
          {:on-change trigger-change!}]
         [:pre.computed (:full-text data)]]))))

;; hack to initialize the state on first load (not when reloading)
(declare loaded)
(when-not loaded
  (update-text! 0 stress-text))
(def loaded true)

(om/root
  root-comp
  app-state
  {:target (. js/document (getElementById "app"))})


