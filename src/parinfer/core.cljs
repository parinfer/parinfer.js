(ns ^:figwheel-always parinfer.core
  (:require
    [cljs.pprint :refer [pprint]]
    [clojure.string :as string :refer [split-lines join]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [sablono.core :refer-macros [html]]
    [cljsjs.codemirror]
    [cljsjs.codemirror.mode.clojure]
    [cljsjs.codemirror.keymap.vim]
    [parinfer.formatter :refer [format-text]]
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

(def target-text (atom ""))
(def global-cm nil)

(defn update-text!
  "Read the current value of the editor, and correct its value.
  (rearranges closing delimiters based on indentation)"
  [cm]
  (let [current-text (.getValue cm)
        cursor (.getCursor cm)
        state {:cursor-line (.-line cursor)
               :cursor-x (.-ch cursor)}

        ;; FIXME: this can be slow for large files (need to cache state at each line)
        formatted (format-text state current-text)

        scroller (.getScrollerElement cm)
        scroll-x (.-scrollLeft scroller)
        scroll-y (.-scrollTop scroller)]

    (reset! target-text formatted)

    (when-not (= current-text @target-text)
      (.setValue cm @target-text)

      ;; We have to restore the cursor and scroll position after updating the
      ;; value of the editor. Otherwise, it will reset to the top left.
      ;;
      ;;   source: https://groups.google.com/forum/#!topic/codemirror/oNzsevQW1DE
      ;;
      (.setCursor cm cursor)
      (.scrollTo cm scroll-x scroll-y))))

;; NOTE:
;; Text is either updated after a change in text or
;; a cursor movement, but not both.
;;
;; When typing, on-change is called, then on-cursor-activity.
;; So we prevent updating the text twice by using an update flag.

(def frame-updated? (atom false))

(defn on-change
  "Called after typing something."
  [cm change]
  (update-text! cm)
  (reset! frame-updated? true))

(defn on-cursor-activity
  "Called after the cursor moves."
  [cm]
  (when-not @frame-updated?
    (update-text! cm))
  (reset! frame-updated? false))

(def editor-opts
  {:lineNumbers "true"
   :mode "clojure"
   :keyMap "vim"
   })

(defn setup-editor
  [elm]
  (let [cm (.fromTextArea js/CodeMirror elm (clj->js editor-opts))]
    (set! global-cm cm)
    (.on cm "change" on-change)
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


