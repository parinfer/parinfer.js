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
  [cm change options prev-state]
  (let [{:keys [start-line end-line num-new-lines]}
        (if change
          {:start-line (.. change -from -line)
           :end-line (inc (.. change -to -line))
           :num-new-lines (alength (.-text change))}

          (let [start (:cursor-line prev-state)
                end (inc start)]
            {:start-line start
             :end-line end
             :num-new-lines (- end start)}))

        lines (for [i (range start-line (+ start-line num-new-lines))]
                (.getLine cm i))]
    {:line-no [start-line end-line]
     :new-line lines}))

(defn fix-text!
  "Correctly format the text from the given editor."
  [cm & {:keys [change use-cache?]
         :or {change nil, use-cache? false}}]
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
                 :cursor-dx (compute-cursor-dx cursor change)}

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

    ;; restore the selection, cursor, and scroll
    ;; since these are reset when overwriting codemirror's value.
    (if selection?
      (.setSelections cm selections)
      (.setCursor cm (aget cursor "line") new-cursor-x))
    (.scrollTo cm scroll-x scroll-y)))
