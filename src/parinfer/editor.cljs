(ns parinfer.editor
  (:require-macros
    [cljs.core.async.macros :refer [go go-loop]])
  (:require
    [om.core :as om :include-macros true]
    [sablono.core :refer-macros [html]]

    [cljs.pprint :refer [pprint]]
    [cljs.core.async :refer [<! timeout chan alts! close!]]
    [clojure.string :as string :refer [join]]

    [parinfer.formatter :refer [format-text]]

    [goog.dom.classlist :as classlist]
    [goog.dom :as gdom]

    [cljsjs.codemirror]
    [cljsjs.codemirror.addon.selection.active-line]
    [cljsjs.codemirror.addon.edit.matchbrackets]
    [cljsjs.codemirror.mode.clojure]
    [cljsjs.codemirror.mode.clojure-parinfer]))

;; map of editor key -> editor state
(defonce state
  (atom {}))

(def empty-editor-state
  {:text ""     ;; text of the editor
   :cm nil})    ;; the CodeMirror instance

(defprotocol IEditor
  "Custom data/methods for a CodeMirror editor."
  (cm-key [this])
  (frame-updated? [this])
  (set-frame-updated! [this value])
  (record-change! [this thing]))

;;----------------------------------------------------------------------
;; Operations
;;----------------------------------------------------------------------

(defn fix-text!
  "Correctly format the text from the given editor."
  [cm]
  (let [;; get the current state of the editor
        ;; (e.g. text, cursor, selections, scroll)
        current-text (.getValue cm)
        selection? (.somethingSelected cm)
        selections (.listSelections cm)
        cursor (.getCursor cm)
        scroller (.getScrollerElement cm)
        scroll-x (.-scrollLeft scroller)
        scroll-y (.-scrollTop scroller) 

        ;; format the text
        opts {:cursor-line (.-line cursor)
               :cursor-x (.-ch cursor)}
        new-text (format-text opts current-text)]

    ;; update the text
    (swap! state assoc-in [(cm-key cm) :text] new-text)

    ;; restore the selection, cursor, and scroll
    ;; since these are reset when overwriting codemirror's value.
    (if selection?
      (.setSelections cm selections)
      (.setCursor cm cursor))
    (.scrollTo cm scroll-x scroll-y)))

(defn update-cursor!
  "Correctly position cursor after text that was just typed.
  We need this since reformatting the text can shift things forward past our cursor."
  [cm change]
  (when (= "+input" (.-origin change))
    (let [text (join "\n" (.-text change))
          from-x (.. change -from -ch)
          line-no (.. change -from -line)
          line (.getLine cm line-no)
          insert-x (.indexOf line text from-x)]
      (cond

        ;; pressing return, keep current position then.
        (= text "\n")
        nil

        ;; typed character not found, we probably prevented it. keep cursor where it was.
        (= -1 insert-x)
        (.setCursor cm line-no from-x)

        ;; move cursor to after the typed characters were found.
        :else
        (.setCursor cm line-no (+ insert-x (count text)))))))

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

(def empty-recording
  {:changes []
   :init-value nil
   :last-time nil
   :recording? false})

(defonce vcr
  (atom {}))

(defn before-change
  "Called before any change is applied to the editor."
  [cm change]
  ;; keep CodeMirror from reacting to a change from "setValue"
  ;; if it is not a new value.
  (when (and (= "setValue" (.-origin change))
             (= (.getValue cm) (join "\n" (.-text change))))
    (.cancel change)))

(defn parse-pos
  [pos]
  {:line (.-line pos)
   :ch (.-ch pos)})

(defn parse-change
  [change]
  {:from (parse-pos (.-from change))
   :to (parse-pos (.-to change))
   :text (seq (.-text change))
   :origin (.-origin change)})

(defn apply-change
  [cm {:keys [text from to origin]}]
  (.replaceRange cm
     (clj->js text)
     (clj->js from)
     (clj->js to)
     origin))

(defn parse-selection
  [selection]
  {:anchor (parse-pos (.-anchor selection))
   :head (parse-pos (.-head selection))
   })

(defn parse-selections
  [selections]
  (map parse-selection selections))

(defn apply-selections
  [cm selections]
  (.setSelections cm (clj->js selections)))

(defn on-change
  "Called after any change is applied to the editor."
  [cm change]
  (when (not= "setValue" (.-origin change))
    (record-change! cm {:change (parse-change change)})
    (fix-text! cm)
    (update-cursor! cm change)
    (set-frame-updated! cm true)))

(defn on-cursor-activity
  "Called after the cursor moves in the editor."
  [cm]
  (when-not (frame-updated? cm)
    (record-change! cm {:selections (parse-selections (.listSelections cm))})
    (fix-text! cm))
  (set-frame-updated! cm false))

(defn on-tab
  "Indent selection or insert two spaces when tab is pressed.
  from: https://github.com/codemirror/CodeMirror/issues/988#issuecomment-14921785"
  [cm]
  (if (.somethingSelected cm)
    (.indentSelection cm)
    (let [n (.getOption cm "indentUnit")
          spaces (apply str (repeat n " "))]
      (.replaceSelection cm spaces))))

;;----------------------------------------------------------------------
;; Setup
;;----------------------------------------------------------------------

(def editor-opts
  {:mode "clojure-parinfer"
   :extraKeys {:Tab on-tab}})

(aset js/CodeMirror "keyMap" "default" "Shift-Tab" "indentLess")

(defn on-state-change
  "Called everytime the state changes to sync the code editor."
  [_ _ old-state new-state]
  (doseq [[k {:keys [cm text]}] new-state]
    (let [changed? (not= text (.getValue cm))]
      (when changed?
        (.setValue cm text)))))

(defn force-editor-sync! []
  (doseq [[k {:keys [cm text]}] @state]
    (.setValue cm text)))

(defn create-regular-editor!
  ([element-id] (create-regular-editor! element-id {}))
  ([element-id opts]
   (let [element (js/document.getElementById element-id)
         cm (js/CodeMirror.fromTextArea element (clj->js (merge editor-opts {:mode "clojure"} opts)))
         wrapper (.getWrapperElement cm)]
     (set! (.-id wrapper) (str "cm-" element-id))
     cm)))

(defn freeze-editor!
  [cm-or-key]
  (let [cm (if (keyword? cm-or-key) (get-in @state [cm-or-key :cm]) cm-or-key)
        element (.getWrapperElement cm)
        cursor (gdom/getElementByClass "CodeMirror-cursors" element)]
    (set! (.. cursor -style -visibility) "visible")))

(defn thaw-editor!
  [cm-or-key]
  (let [cm (if (keyword? cm-or-key) (get-in @state [cm-or-key :cm]) cm-or-key)
        element (.getWrapperElement cm)
        cursor (gdom/getElementByClass "CodeMirror-cursors" element)]
    ))

(defn start-recording!
  [key-]
  (let [{:keys [text cm] :as editor} (get @state key-)]
    (swap! vcr update-in [key-]
           assoc
           :changes []
           :init-value text
           :recording? true
           :last-time nil)))

(defn done-recording!
  [key-]
  (swap! vcr assoc-in [key- :recording?] false))

(defn play-recording!
  [key-]
  (when-let [stop-chan (get-in @vcr [key- :stop-chan])]
    (close! stop-chan))
  (swap! vcr assoc-in [key- :stop-chan] (chan))
  (let [cm (get-in @state [key- :cm])
        recording (get @vcr key-)
        timescale (get recording :timescale 1)
        loop? (get recording :loop? true)
        loop-delay (get recording :loop-delay 2000)
        element (.getWrapperElement cm)]
    (freeze-editor! cm)
    (go-loop []
      (swap! state assoc-in [key- :text] (:init-value recording))
      (loop [changes (:changes recording)]
        (when (seq changes)
          (let [{:keys [change selections dt] :as data} (first changes)
                tchan (timeout (/ dt timescale))
                stop-chan (:stop-chan recording)
                [v c] (alts! [tchan stop-chan])]
            (when (not= c stop-chan)
              (cond
                change (apply-change cm change)
                selections (apply-selections cm selections)
                :else nil)
              (recur (rest changes))))))
      (when loop?
        (let [tchan (timeout loop-delay)
              stop-chan (:stop-chan recording)
              [v c] (alts! [tchan stop-chan])]
          (when (not= c stop-chan)
            (recur))))
      (thaw-editor! cm))))

(defn stop-playing!
  [key-]
  (when-let [stop-chan (get-in @vcr [key- :stop-chan])]
    (close! stop-chan)))

(defn print-recording!
  [key-]
  (let [cm (get-in @state [key- :cm])
        recording (get @vcr key-)]
    (pprint recording)))

(defonce controls-state
  (atom {:show? true
         :target-key nil}))

(defn controls-view
  [{:keys [target-key show?] :as data} owner]
  (reify
    om/IRender
    (render [_]
      (when show?
        (html
          [:div
           [:code (str target-key)] [:br]
           "Recording "
           [:button {:on-click #(start-recording! target-key)} "Start Record"]
           [:button {:on-click #(done-recording! target-key)} "Stop Record"]
           [:button {:on-click #(play-recording! target-key)} "Play"]
           [:button {:on-click #(stop-playing! target-key)} "Stop"]
           [:button {:on-click #(print-recording! target-key)} "Print"]])))))

(defn render-controls! []
  (om/root
    controls-view
    controls-state
    {:target (js/document.getElementById "controls")}))

(defn create-editor!
  ([element-id key-] (create-editor! element-id key- {}))
  ([element-id key- opts]
   (let [element (js/document.getElementById element-id)
         cm (js/CodeMirror.fromTextArea element (clj->js (merge editor-opts opts)))
         wrapper (.getWrapperElement cm)]


     (set! (.-id wrapper) (str "cm-" element-id))

     ;; on blur, start playing animation again, if we are not dev mode.
     (.on cm "blur" (fn [e]
                      (when-not (:show? @controls-state)
                        (play-recording! key-))))

     ;; on focus, set recording controls to focus on this editor.
     ;; and stop any animation.
     (.on cm "focus" (fn [e]
                       (swap! controls-state assoc :target-key key-)
                       (stop-playing! key-)))

     (when-not (get @state key-)
       (swap! frame-updates assoc key- {}))

     (swap! state update-in [key-]
            #(-> (or % empty-editor-state)
                 (assoc :cm cm)))

     (swap! vcr update-in [key-]
            #(or % empty-recording))

     ;; Extend the code mirror object with some utility methods.
     (specify! cm
               IEditor
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

     cm)))

(defn start-editor-sync! []
  ;; sync state changes to the editor
  (add-watch state :editor-updater on-state-change)
  (force-editor-sync!))

