(ns parinfer.editor
  (:require
    [clojure.string :as string :refer [join]]
    [parinfer.formatter :refer [format-text]]
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
  (set-frame-updated! [this value]))

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
    (fix-text! cm)
    (update-cursor! cm change)
    (set-frame-updated! cm true)))

(defn on-cursor-activity
  "Called after the cursor moves in the editor."
  [cm]
  (when-not (frame-updated? cm)
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
    (.setValue cm text)))

(defn create-editor!
  [element key-]
  (let [cm (.fromTextArea js/CodeMirror element (clj->js editor-opts))]

    ;; create a state entry for this editor if needed (allows reloading state)
    (when-not (get @state key-)
      (swap! frame-updates assoc key- {})
      (swap! state assoc key- empty-editor-state))

    ;; attach editor object to state
    (swap! state assoc-in [key- :cm] cm)

    ;; Extend the code mirror object with some utility methods.
    (specify! cm
      IEditor
      (cm-key [this] key-)
      (frame-updated? [this] (get-in @frame-updates [key- :frame-updated?]))
      (set-frame-updated! [this value] (swap! frame-updates assoc-in [key- :frame-updated?] value)))

    ;; sync state changes to the editor
    (add-watch state :editor-updater on-state-change)

    ;; handle code mirror events
    (.on cm "change" on-change)
    (.on cm "beforeChange" before-change)
    (.on cm "cursorActivity" on-cursor-activity)

    ;; trigger first state sync
    (swap! state identity)

    cm))

