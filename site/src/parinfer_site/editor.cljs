(ns parinfer-site.editor
  "Glues Parinfer's formatter to a CodeMirror editor"
  (:require
    [clojure.string :refer [join]]
    [parinfer-site.state :refer [state
                                 empty-editor-state]]
    [parinfer-site.editor-support :refer [cm-key
                                          IEditor
                                          get-prev-state
                                          frame-updated?
                                          set-frame-updated!
                                          record-change!]]
    [parinfer-site.vcr :refer [vcr
                               empty-recording
                               parse-change
                               parse-selections
                               controls-state
                               play-recording!
                               stop-playing!]]))

;;----------------------------------------------------------------------
;; Life Cycle events
;;----------------------------------------------------------------------

;; NOTE:
;; Text is either updated after a change in text or
;; a cursor movement, but not both.
;;
;; When typing, on-change is called, then on-cursor-activity.
;; So we prevent updating the text twice by using an update flag.

(def frame-updates (atom {}))

(defn before-change
  "Called before any change is applied to the editor."
  [cm change]
  ;; keep CodeMirror from reacting to a change from "setValue"
  ;; if it is not a new value.
  (when (and (= "setValue" (.-origin change))
             (= (.getValue cm) (join "\n" (.-text change))))
    (.cancel change)))

(defn on-change
  "Called after any change is applied to the editor."
  [cm change]
  (when (not= "setValue" (.-origin change))
    (record-change! cm {:change (parse-change change)})
    (set-frame-updated! cm true)))

(defn on-cursor-activity
  "Called after the cursor moves in the editor."
  [cm]
  (when-not (frame-updated? cm)
    (record-change! cm {:selections (parse-selections (.listSelections cm))}))
  (set-frame-updated! cm false))

;;----------------------------------------------------------------------
;; Setup
;;----------------------------------------------------------------------

(def editor-opts
  {:mode "clojure-parinfer"
   :theme "github"
   :matchBrackets true})

(aset js/CodeMirror "keyMap" "default" "Shift-Tab" "indentLess")

(defn create-regular-editor!
  "Create a non-parinfer editor."
  ([element-id] (create-regular-editor! element-id {}))
  ([element-id opts]
   (let [element (js/document.getElementById element-id)]
     (when-not (= "none" (aget element "style" "display"))
       (let [cm (js/CodeMirror.fromTextArea element (clj->js (merge editor-opts {:mode "clojure"} opts)))
             wrapper (.getWrapperElement cm)]
         (set! (.-id wrapper) (str "cm-" element-id))
         cm)))))

(defn create-editor!
  "Create a parinfer editor."
  ([element-id key-] (create-editor! element-id key- {}))
  ([element-id key- opts]
   (when-not (get @state key-)
     (let [element (js/document.getElementById element-id)
           cm (js/CodeMirror.fromTextArea element (clj->js (merge editor-opts opts)))
           wrapper (.getWrapperElement cm)
           watcher (js/scrollMonitor.create wrapper)
           mode (or (:parinfer-mode opts) :indent-mode)
           initial-state (assoc empty-editor-state :mode mode)
           prev-editor-state (atom nil)]


       (set! (.-id wrapper) (str "cm-" element-id))

       (when-not (:readOnly opts)

         ;; on blur, start playing animation again, if we are not dev mode.
         (.on cm "blur" (fn [e]
                          (when-not (:show? @controls-state)
                            (when (.-isInViewport watcher)
                              (play-recording! key-)))))

         ;; on focus, set recording controls to focus on this editor.
         ;; and stop any animation.
         (.on cm "focus" (fn [e]
                           (swap! controls-state assoc :target-key key-)
                           (stop-playing! key-)
                           (on-cursor-activity cm))))

       (when-not (get @state key-)
         (swap! frame-updates assoc key- {}))

       (swap! state update-in [key-]
              #(-> (or % initial-state)
                   (assoc :cm cm
                          :watcher watcher)))

       (swap! vcr update-in [key-]
              #(or % empty-recording))

       ;; Extend the code mirror object with some utility methods.
       (specify! cm
                 IEditor
                 (get-prev-state [this] prev-editor-state)
                 (cm-key [this] key-)
                 (frame-updated? [this] (get-in @frame-updates [key- :frame-updated?]))
                 (set-frame-updated! [this value] (swap! frame-updates assoc-in [key- :frame-updated?] value))
                 (record-change! [this new-thing]
                                 (let [data (get @vcr key-)]
                                   (when (:recording? data)
                                     (let [last-time (:last-time data)
                                           now (.getTime (js/Date.))
                                           dt (if last-time (- now last-time) 0)
                                           new-changes (conj (:changes data) (assoc new-thing :dt dt))
                                           new-data (assoc data
                                                           :last-time now
                                                           :changes new-changes)]
                                       (swap! vcr assoc key- new-data))))))

       ;; handle code mirror events
       (.on cm "change" on-change)
       (.on cm "beforeChange" before-change)
       (.on cm "cursorActivity" on-cursor-activity)

       (when-let [init-value (:init-value opts)]
         (.setValue cm init-value))

       (.init js/parinferCodeMirror
         cm
         ({:indent-mode "indent"
           :paren-mode "paren"
           :smart-mode "smart"} mode)
         #js {:forceBalance (:forceBalance opts true)
              :guides (:guides opts)
              :locus (:locus opts)})

       cm))))
