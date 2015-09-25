(ns ^:figwheel-always parinfer.core
  (:require
    [cljs.pprint :refer [pprint]]
    [clojure.string :as string :refer [split-lines join]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [sablono.core :refer-macros [html]]
    [cljsjs.codemirror]
    [cljsjs.codemirror.mode.clojure]
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

(defn replace-string-range
  [orig from to diff]
  (str
    (subs orig 0 from)
    diff
    (subs orig to)))

(defn calc-new-value
  "Calculate the new value of Code Mirror given this change.
  Might be able to ignore this"
  [cm change]
  (let [text (.getValue cm)
        no-lines (.lineCount cm)

        line-lengths (as-> text $
                          (split-lines $)
                          (map count $)
                          (concat $ (repeat 0))
                          (map inc $)
                          (take no-lines $))

        line-indexes (reduce
                         (fn [indexes length]
                           (let [prev-index (last indexes)
                                 new-index (+ prev-index length)]
                             (conj indexes new-index)))
                         [0]
                         line-lengths)

        diff (join "\n" (.-text change))

        get-marker (fn [end] {:x-pos (.-ch end) :line-no (.-line end)})
        markers [(get-marker (.-from change)) (get-marker (.-to change))]
        marker-sort-key (fn [x] [(:line-no x) (:x-pos x)])
        marker-to-index (fn [{:keys [line-no x-pos]}]
                          (+ x-pos (line-indexes line-no)))

        [from to] (->> markers
                       (sort-by marker-sort-key)
                       (map marker-to-index))

        new-text (replace-string-range text from to diff)]

    new-text))

(def target-text (atom ""))
(def global-cm nil)

(defn before-change
  [cm change]
  (println "BEFORE CHANGE")
  (let [new-text (calc-new-value cm change)]
    (println "new target:" (pr-str new-text))
    (println "current target:" (pr-str @target-text))

    (when-not (= new-text @target-text)
      (let [line-no (.. change -from -line)
            x-pos (.. change -from -ch)
            state {:cursor-line line-no
                   :cursor-x (inc x-pos)}
            formatted (format-text state new-text)]
        (reset! target-text formatted))))

  ;; (.update change from to text)
  ;; TODO: prevent typing a bad delimiter
  ;;       (will have to find whether the character type is successfully seen in the processed text)
  )

(defn on-change
  [cm change]
  (println "ON CHANGE")
  (let [cursor (.getCursor cm)
        current-text (.getValue cm)
        ]
    (println "current value:" (pr-str current-text))
    (println "current target:" (pr-str @target-text))
    (when-not (= current-text @target-text)
      (.setValue cm @target-text)
      (.setCursor cm cursor)
      ;; TODO: also restore scroll:
      ;;      scrollTop and scrollLeft from cm.getScrollerElement()
      ;;      source: https://groups.google.com/forum/#!topic/codemirror/oNzsevQW1DE
      ))

  ;; TODO: apply pre-calculated text (from beforeChange),
  ;;       only if it is different from current value to prevent possible cycling.
  )

(defn on-cursor-activity
  [cm]
  (let [cursor (.getCursor cm)]
    ;; TODO: trigger a change if we move lines, sending only the line. don't care about x-pos
    )
  )

(def editor-opts
  {:lineNumbers "true"
   :mode "clojure"})

(defn setup-editor
  [elm]
  (let [cm (.fromTextArea js/CodeMirror elm (clj->js editor-opts))]
    (set! global-cm cm)
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


