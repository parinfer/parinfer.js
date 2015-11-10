(ns parinfer.site.vcr
  "VCR - editor animation recording and playback"
  (:require-macros
    [cljs.core.async.macros :refer [go go-loop]])
  (:require
    [cljs.core.async :refer [<! timeout chan alts! close!]]
    [om.core :as om :include-macros true]
    [sablono.core :refer-macros [html]]

    [parinfer.site.state :refer [state]]
    [parinfer.site.editor-support :refer [get-prev-state]]
    [cljs.pprint :refer [pprint]]
    [goog.dom :as gdom]))

;; map of editor key -> recording state
(defonce vcr
  (atom {}))

(def empty-recording
  {:changes []
   :init-value nil
   :last-time nil
   :recording? false})

;;----------------------------------------------------------------------
;; Capturing and Playing changes
;;----------------------------------------------------------------------

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
   :head (parse-pos (.-head selection))})
   

(defn parse-selections
  [selections]
  (map parse-selection selections))

(defn apply-selections
  [cm selections]
  (.setSelections cm (clj->js selections)))

;;----------------------------------------------------------------------
;; VCR Controls
;;----------------------------------------------------------------------

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
  (when (seq (get-in @vcr [key- :changes]))
    (swap! vcr assoc-in [key- :stop-chan] (chan))
    (let [cm (get-in @state [key- :cm])
          recording (get @vcr key-)
          timescale (get recording :timescale 1)
          loop? (get recording :loop? true)
          loop-delay (get recording :loop-delay 2000)
          element (.getWrapperElement cm)
          cursor (gdom/getElementByClass "CodeMirror-cursors" element)]
      (set! (.. cursor -style -visibility) "visible")
      (go-loop []
        (reset! (get-prev-state cm) nil)
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
              (recur))))))))

(defn stop-playing!
  [key-]
  (when-let [stop-chan (get-in @vcr [key- :stop-chan])]
    (close! stop-chan)))

(defn print-recording!
  "Pretty print the data to the console, so we can paste it into vcr_data.cljs"
  [key-]
  (let [cm (get-in @state [key- :cm])
        recording (get @vcr key-)]
    (pprint (dissoc recording :stop-chan))))

;;----------------------------------------------------------------------
;; VCR Controls UI
;;----------------------------------------------------------------------

;; do not modify this line, set by publish script.
(def SHOW_CONTROLS true)

(defonce controls-state
  (atom {:show? SHOW_CONTROLS
         :target-key nil}))

(defn controls-view
  [{:keys [target-key show?] :as data} owner]
  (reify
    om/IRender
    (render [_]
      (when show?
        (html
          [:div
           [:code (if target-key
                    (str target-key)
                    "(click an editor)")]
           [:br]
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
