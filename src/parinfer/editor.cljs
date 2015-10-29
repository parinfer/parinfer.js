(ns parinfer.editor
  "Glues Parinfer's formatter to a CodeMirror editor"
  (:require
    [clojure.string :as string :refer [join]]
    [parinfer.format.infer :as infer]
    [parinfer.format.prep :as prep]
    [parinfer.state :refer [state
                            empty-editor-state]]
    [parinfer.vcr :refer [vcr
                          empty-recording
                          parse-change
                          parse-selections
                          controls-state
                          play-recording!
                          stop-playing!]]))

(defprotocol IEditor
  "Custom data/methods for a CodeMirror editor."
  (cm-key [this])
  (get-prev-state [this])
  (frame-updated? [this])
  (set-frame-updated! [this value])
  (record-change! [this thing]))

;;----------------------------------------------------------------------
;; Operations
;;----------------------------------------------------------------------

(defn compute-cursor-dx
  [cursor change]
  (when change
    (let [;; This is a hack for codemirror.
          ;; For some reason codemirror triggers an "+input" change after the
          ;; indent spaces are already applied.  So I modified codemirror to
          ;; label these changes as +indenthack so we can ignore them.
          ignore? (= "+indenthack" (.-origin change))]
      (if ignore?
        0
        (let [start-x (.. change -to -ch)
              new-lines (.. change -text)
              len-last-line (count (last new-lines))
              end-x (if (> (count new-lines) 1)
                      len-last-line
                      (+ len-last-line (.. change -from -ch)))]
          (- end-x start-x))))))

(defn compute-cm-change
  [cm change overrides prev-state]
  (let [{:keys [start-line end-line num-new-lines]}
        (if change
          {:start-line (.. change -from -line)
           :end-line (inc (.. change -to -line))
           :num-new-lines (alength (.-text change))}

          (let [[start end] (sort [(:cursor-line prev-state)
                                   (:cursor-line overrides)])
                end (inc end)]
            {:start-line start
             :end-line end
             :num-new-lines (- end start)}))

        lines (for [i (range start-line (+ start-line num-new-lines))]
                (.getLine cm i))]
    {:line-no [start-line end-line]
     :new-line lines}))

(defn fix-text!
  "Correctly format the text from the given editor."
  ([cm] (fix-text! cm nil))
  ([cm change]
   (let [;; get the current state of the editor
         ;; (e.g. text, cursor, selections, scroll)
         current-text (.getValue cm)
         selection? (.somethingSelected cm)
         selections (.listSelections cm)
         cursor (.getCursor cm)
         scroller (.getScrollerElement cm)
         scroll-x (.-scrollLeft scroller)
         scroll-y (.-scrollTop scroller) 

         overrides {:cursor-line (.-line cursor)
                    :cursor-x (.-ch cursor)
                    :cursor-dx (compute-cursor-dx cursor change)}

         key- (cm-key cm)
         mode (or (get-in @state [key- :mode]) :infer)

         prev-state (get-prev-state cm)

         ;; format the text
         new-text
         (case mode
           :infer
           (let [use-cache? true
                 state (if (and use-cache? @prev-state)
                         (infer/process-text-change
                           @prev-state
                           (compute-cm-change cm change overrides @prev-state)
                           overrides)
                         (infer/process-text overrides current-text))]

             (when (:valid? state)
               (reset! prev-state state))
             (if (:valid? state)
               (join "\n" (:lines state))
               current-text))

           :prep
           (prep/format-text overrides current-text)

           nil)]

     ;; update the text
     (swap! state assoc-in [key- :text] new-text)

     ;; restore the selection, cursor, and scroll
     ;; since these are reset when overwriting codemirror's value.
     (if selection?
       (.setSelections cm selections)
       (.setCursor cm cursor))
     (.scrollTo cm scroll-x scroll-y))))

(defn update-cursor!
  "Correctly position cursor after text that was just typed.
  We need this since reformatting the text can shift things forward past our cursor."
  [cm change]
  (when (= "+input" (.-origin change))
    (let [selection? (.somethingSelected cm)
          text (join "\n" (.-text change))
          from-x (.. change -from -ch)
          line-no (.. change -from -line)
          line (.getLine cm line-no)
          insert-x (.indexOf line text from-x)
          after-x (+ insert-x (count text))]
      (cond
        ;; something is selected, don't touch the cursor
        selection?
        nil

        ;; pressing return, keep current position then.
        (= text "\n")
        nil

        ;; only move the semicolon ahead since it can be pushed forward by
        ;; commenting out inferred parens meaning they are immediately
        ;; reinserted behind it.
        (= text ";")
        (.setCursor cm line-no after-x)

        ;; typed character not found where expected it, we probably prevented it. keep cursor where it was.
        (or (= -1 insert-x)
            (> insert-x from-x))
        (.setCursor cm line-no from-x)

        :else nil))))

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
    (fix-text! cm change)
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
   :theme "github"
   :matchBrackets true
   :extraKeys {:Tab on-tab}})

(aset js/CodeMirror "keyMap" "default" "Shift-Tab" "indentLess")

(defn create-regular-editor!
  "Create a non-parinfer editor."
  ([element-id] (create-regular-editor! element-id {}))
  ([element-id opts]
   (let [element (js/document.getElementById element-id)]
     (when-not (= "none" (.. element -style -display))
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
           initial-state (assoc empty-editor-state
                                :mode (:parinfer-mode opts))
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

       cm))))

;;----------------------------------------------------------------------
;; Setup
;;----------------------------------------------------------------------

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

(defn start-editor-sync! []
  ;; sync state changes to the editor
  (add-watch state :editor-updater on-state-change)
  (force-editor-sync!))
