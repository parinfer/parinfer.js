(ns parinfer.editor
  (:require-macros
    [cljs.core.async.macros :refer [go go-loop]])
  (:require
    [cljs.core.async :refer [<! timeout chan]]
    [clojure.string :as string :refer [join]]
    [parinfer.formatter :refer [format-text]]
    [goog.dom.classlist :as classlist]
    [goog.dom :as gdom]
    [cljsjs.codemirror]
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
  (js/console.log "change object:" change)
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
  {:lineNumbers true
   :mode "clojure-parinfer"
   :extraKeys {:Tab on-tab}})

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

(defn create-editor!
  [element-id key-]
  (let [element (js/document.getElementById element-id)
        cm (js/CodeMirror.fromTextArea element (clj->js editor-opts))]

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

    cm))

(defn start-editor-sync! []
  ;; sync state changes to the editor
  (add-watch state :editor-updater on-state-change)
  (force-editor-sync!))

(defn start-recording!
  [key-]
  (let [{:keys [text cm] :as editor} (get @state key-)]
    (swap! vcr update-in [key-]
           assoc
           :changes []
           :init-value text
           :recording? true
           :last-time nil)))

(defn stop-recording!
  [key-]
  (swap! vcr assoc-in [key- :recording?] false))

(defn freeze-editor!
  [cm]
  (let [element (.getWrapperElement cm)
        cursor (gdom/getElementByClass "CodeMirror-cursors" element)]
    (.setOption cm "readOnly" "nocursor")
    (classlist/add element "CodeMirror-focused")
    (set! (.. cursor -style -visibility) "visible")))

(defn thaw-editor!
  [cm]
  (let [element (.getWrapperElement cm)
        cursor (gdom/getElementByClass "CodeMirror-cursors" element)]
    (.setOption cm "readOnly" false)))

(defn play-recording!
  [key-]
  (let [cm (get-in @state [key- :cm])
        recording (get @vcr key-)
        element (.getWrapperElement cm)]
    (freeze-editor! cm)
    (go
      (swap! state assoc-in [key- :text] (:init-value recording))
      (doseq [{:keys [change selections dt] :as data} (:changes recording)]
        (<! (timeout (/ dt 2)))
        (cond
          change (apply-change cm change)
          selections (apply-selections cm selections)
          :else nil))
      (thaw-editor! cm))))

