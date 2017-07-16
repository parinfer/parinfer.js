(ns parinfer-site.editor-support
  "Connects parinfer mode functions to CodeMirror"
  (:require
    [clojure.string :as string :refer [join]]
    [parinfer-site.parinfer :refer [indent-mode
                                    paren-mode]]
    [parinfer-site.state :refer [state]]))


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

(defn convert-change
  [change]
  {:x (.. change -from -ch)
   :lineNo (.. change -from -line)
   :oldText (.join (.. change -removed) "\n")
   :newText (.join (.. change -text) "\n")})

(defn mark-error! [cm {:keys [error]}]
  (let [clear-marks! (fn [cm]
                       (doseq [m (.getAllMarks cm)]
                         (.clear m)))

        add-mark! (fn [cm line-no x class-name]
                    (let [from #js {:line line-no :ch x}
                          to #js {:line line-no :ch (+ x 1)}
                          opts #js {:className class-name}]
                      (.markText cm from to opts)))]
    ;; currently assuming no other marks
    (clear-marks! cm)
    (when error
      (add-mark! cm (:line-no error) (:x error) "error")
      (when-let [extra (:extra error)]
        (add-mark! cm (:line-no extra) (:x extra) "error")))))

(defn fix-text!
  "Correctly format the text from the given editor."
  [cm & {:keys [changes use-cache?]
         :or {changes [], use-cache? false}}]
  (let [;; get the current state of the editor
        ;; (e.g. text, cursor, selections, scroll)

        current-text (.getValue cm)
        selection? (.somethingSelected cm)
        selections (.listSelections cm)
        cursor (.getCursor cm)
        scroller (.getScrollerElement cm)
        scroll-x (.-scrollLeft scroller)
        scroll-y (.-scrollTop scroller)

        options {:cursor-line (.-line cursor)
                 :cursor-x (.-ch cursor)
                 :changes (mapv convert-change changes)}

        key- (cm-key cm)
        options (merge options (get-in @state [key- :options]))
        mode (or (get-in @state [key- :mode]) :indent-mode)

        prev-state (get-prev-state cm)

        result
        (case mode
          :indent-mode (indent-mode current-text options)
          :paren-mode (paren-mode current-text options)
          nil)

        ;; format the text
        new-text (:text result)
        new-cursor-x (:cursor-x result)]

    (when (= key- :demo)
      (swap! state assoc-in [key- :result] result)
      (swap! state assoc-in [key- :prev-options] options))

    ;; update the text
    (swap! state assoc-in [key- :text] new-text)
    (mark-error! cm result)

    ;; restore the selection, cursor, and scroll
    ;; since these are reset when overwriting codemirror's value.
    (if selection?
      (.setSelections cm selections)
      (.setCursor cm (aget cursor "line") new-cursor-x))
    (.scrollTo cm scroll-x scroll-y)))
