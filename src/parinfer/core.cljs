(ns ^:figwheel-always parinfer.core
  (:require
    [om.core :as om :include-macros true]
    [sablono.core :refer-macros [html]]
    [clojure.string :as string]
    [parinfer.vcr-data :as vcr-data]
    [parinfer.vcr :refer [vcr
                          play-recording!
                          stop-playing!
                          render-controls!]]
    [parinfer.editor :refer [create-editor!
                             create-regular-editor!
                             start-editor-sync!]]
    [parinfer.editor-support :refer [get-prev-state]]
    [parinfer.state :refer [state]]
    [parinfer.format.infer :as infer]
    [parinfer.format.prep :as prep]
    [parinfer.format.string :refer [get-lines]]
    [parinfer.toc :as toc]
    [parinfer.gears :refer [create-gears!]]
    [ajax.core :refer [GET]]))

(enable-console-print!)

(defn create-indent-before-after! []
  (let [cm-input (create-regular-editor! "code-indent-input" {:mode "clojure-parinfer"})
        cm-output (create-regular-editor! "code-indent-output" {:readOnly true
                                                                :mode "clojure-parinfer"})
        sync! #(.setValue cm-output (:text (infer/format-text (.getValue cm-input))))]
    (when cm-input
      (.on cm-input "change" sync!)
      (sync!))))

(defn create-paren-before-after! []
  (let [cm-input (create-regular-editor! "code-paren-input")
        cm-output (create-regular-editor! "code-paren-output" {:readOnly true
                                                               :mode "clojure-parinfer"})
        clear-marks! (fn [cm]
                       (doseq [m (.getAllMarks cm)]
                         (.clear m)))

        add-mark! (fn [cm line-no x value class-name]
                    (let [from #js {:line line-no :ch x}
                          to #js {:line line-no :ch (+ x (count value))}
                          opts #js {:className class-name}]
                      (.markText cm from to opts)))

        diff! (fn []
                (clear-marks! cm-input)
                (clear-marks! cm-output)
                (let [in-lines (get-lines (.getValue cm-input))
                      out-lines (get-lines (.getValue cm-output))]
                  (doseq [[line-no in out] (map vector (range) in-lines out-lines)]
                    (let [changes (js/JsDiff.diffChars in out)]
                      (reduce
                        (fn [{:keys [in-x out-x] :as result} change]
                          (let [value (aget change "value")
                                length (count value)]
                            (cond
                              (aget change "added")
                              (do
                                (add-mark! cm-output line-no out-x value "inserted")
                                (update result :out-x + length))

                              (aget change "removed")
                              (do
                                (add-mark! cm-input line-no in-x value "removed")
                                (update result :in-x + length))

                              :else
                              {:in-x (+ in-x length)
                               :out-x (+ out-x length)})))
                        {:in-x 0 :out-x 0}
                        changes)))))
        sync! (fn []
                (let [in-text (.getValue cm-input)
                      out-text (:text (prep/format-text in-text))]
                  (.setValue cm-output out-text)
                  (diff!)))]

    (when cm-input
      (.on cm-input "change" sync!)
      (sync!))))


(defn create-index-editors! []

  (create-editor! "code-intro-indent" :intro-indent)
  (create-editor! "code-intro-insert" :intro-insert)
  (create-editor! "code-intro-comment" :intro-comment)
  (create-editor! "code-intro-paredit" :intro-paredit)
  (create-editor! "code-intro-paren" :intro-paren {:parinfer-mode :prep})

  (create-editor! "code-indent" :indent)
  (create-editor! "code-indent-far" :indent-far)
  (create-editor! "code-indent-multi" :indent-multi)

  (create-editor! "code-line" :line)
  (create-editor! "code-comment" :comment)
  (create-editor! "code-wrap" :wrap)
  (create-editor! "code-splice" :splice)
  (create-editor! "code-barf" :barf)
  (create-editor! "code-slurp" :slurp)
  (create-editor! "code-string" :string)
  (create-editor! "code-enter" :enter)

  (let [opts {:readOnly true}]
    (create-editor! "code-warn-good" :warn-good opts)
    (create-editor! "code-warn-bad" :warn-bad opts))

  (create-editor! "code-displaced" :displaced)
  (create-editor! "code-not-displaced" :not-displaced)

  (let [opts {:parinfer-mode :prep}]
    (create-editor! "code-paren-tune" :paren-tune opts)
    (create-editor! "code-paren-frac" :paren-frac opts)
    (create-editor! "code-paren-comment" :paren-comment opts)
    (create-editor! "code-paren-wrap" :paren-wrap opts)) 

  (start-editor-sync!)

  (create-regular-editor! "code-c-expr" {:mode "javascript"})
  (create-regular-editor! "code-lisp-expr")
  (create-regular-editor! "code-c-indent")
  (create-regular-editor! "code-lisp-indent")
  (create-regular-editor! "code-skim")
  (create-regular-editor! "code-inspect" {:matchBrackets true})

  (create-indent-before-after!)
  (create-paren-before-after!))

(defn animate-when-visible!
  [key-]
  (doto (get-in @state [key- :watcher])
    (.enterViewport #(play-recording! key-))
    (.exitViewport #(stop-playing! key-))))

(def index-anims
  {:intro-indent vcr-data/indent-multi
   :intro-insert vcr-data/line
   :intro-comment vcr-data/comment-
   :intro-paredit vcr-data/intro-paredit
   :intro-paren vcr-data/intro-paren

   :indent vcr-data/indent
   :indent-far vcr-data/indent-far
   :indent-multi vcr-data/indent-multi
   :line vcr-data/line
   :wrap vcr-data/wrap
   :splice vcr-data/splice
   :barf vcr-data/barf
   :slurp vcr-data/slurp-
   :displaced vcr-data/displaced
   :not-displaced vcr-data/not-displaced
   :comment vcr-data/comment-
   :string vcr-data/string
   :warn-bad vcr-data/warn-bad
   :warn-good vcr-data/warn-good
   :enter vcr-data/enter
   :paren-tune vcr-data/paren-tune
   :paren-frac vcr-data/paren-frac
   :paren-comment vcr-data/paren-comment
   :paren-wrap vcr-data/paren-wrap})

(defn load-index-anims! []
  (swap! vcr
    (fn [data]
      (reduce
        (fn [result [key- state]]
          (update result key- merge state))
        data
        index-anims)))
  
  (doseq [[key- _] index-anims]
    (animate-when-visible! key-))

  (js/scrollMonitor.recalculateLocations))

(def base-gears
  {:paren  {:x 280 :y 70
            :factor 96 ;:hole-radius 0.5
            :classes ["paren-gear"]
            :caption {:text "change parens" :side :left}}
   :indent {:x 420 :y 70
            :factor 96
            :classes ["indent-gear"]
            :caption {:text "change indentation" :side :right}}})

(def svg-opts {:width "100%" :height 170})

(def index-gears
  {"naive-gears"
   {:svg-opts svg-opts
    :data {:init-gears base-gears
           :anim-frames [{:gear-attrs {:paren {:power 0.01}}
                          :dt 2000}
                         {:gear-attrs {:paren {:power 0}}
                          :dt 1000}
                         {:gear-attrs {:indent {:power -0.01}}
                          :dt 2000}
                         {:gear-attrs {:indent {:power 0}}
                          :dt 1000}
                         ]}}

   "helper-gears"
   {:svg-opts svg-opts
    :data {:init-gears (merge
                         base-gears
                         {:auto-indent {:x 465 :y 116
                                        :factor 48
                                        :classes ["auto-indent-gear"]
                                        :caption {:text "auto-indent" :side :right}}
                          :paredit {:x 235 :y 116
                                    :factor 48
                                    :classes ["paredit-gear"]
                                    :caption {:text "paredit" :side :left}}})
           :anim-frames [{:gear-attrs {:auto-indent {:classes {"invisible" false}}}
                          :dt 500}
                         {:gear-attrs {:auto-indent {:power 0.15
                                                     :classes {"invisible" false}}}
                          :dt 500}
                         {:gear-attrs {:auto-indent {:power 0}}
                          :dt 500}
                         {:gear-attrs {:auto-indent {:classes {"invisible" true}}}
                          :dt 1000}

                         {:gear-attrs {:paredit {:power 0.05}}
                          :dt 1000}
                         {:gear-attrs {:paredit {:power 0}}
                          :dt 1000}
                         ]}}

   "parinfer-gears"
   {:svg-opts svg-opts
    :data {:init-gears (merge
                         base-gears
                         {:parinfer {:x 350 :y 95
                                     :factor 64
                                     :classes ["parinfer-gear"]
                                     :caption {:text "Parinfer" :side :bottom}}})
           :anim-frames [{:gear-attrs {:indent {:power 0.01}
                                       }
                          :dt 2000}
                         {:gear-attrs {:indent {:power 0}}
                          :dt 1000}
                         {:gear-attrs {:paren {:power -0.01}
                                       }
                          :dt 2000}
                         {:gear-attrs {:paren {:power 0}}
                          :dt 1000}
                         ]}}})

(defn create-index-gears! []
  (doseq [[id {:keys [data svg-opts]}] index-gears]
    (create-gears! (str "#" id) data svg-opts)))

(defn render-index! []
  (toc/init!)
  (create-index-editors!)
  (create-index-gears!)
  (load-index-anims!)
  (render-controls!))

(defn render-dev! []
  (create-editor! "code-indent-mode" :indent-mode)
  (create-editor! "code-paren-mode" :paren-mode {:parinfer-mode :prep})
  (start-editor-sync!))

(defn state-viewer
  [{:keys [postline-states cursor-line]} owner]
  (reify
    om/IRender
    (render [_]
      (html
        [:table.state-table
         (for [[i {:keys [insert stack]}] (map-indexed vector postline-states)]
           [:tr {:class (when (= i cursor-line) "active-line")}
            [:td.line-no (inc i)]
            [:td.line-dy (:line-dy insert)]
            [:td (:x-pos insert)]
            [:td (:string (reduce
                           (fn [{:keys [next-x] :as result}
                                {:keys [x-pos ch]}]
                             (let [pad (apply str (repeat (- x-pos next-x) " "))]
                               (-> result
                                   (update :string str pad ch)
                                   (assoc :next-x (inc x-pos)))))
                           {:next-x 0 :string ""}
                           stack))]])]))))

(defn render-debug-state! []
  (when-let [cm (create-editor! "code-editor" :editor {:viewportMargin Infinity
                                                       :lineNumbers true
                                                       :styleActiveLine true})]
    (start-editor-sync!)
    (om/root
      state-viewer
      (get-prev-state cm)
      {:target (js/document.getElementById "debug-state")})))

(defn init! []
  (cond
    js/window.parinfer_devpage (render-dev!)
    js/window.parinfer_debug_state (render-debug-state!)
    :else (render-index!)))

(init!)
