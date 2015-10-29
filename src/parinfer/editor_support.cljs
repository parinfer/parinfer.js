(ns parinfer.editor-support
  (:require
    [clojure.string :as string :refer [join]]
    [parinfer.format.infer :as infer]
    [parinfer.format.prep :as prep]
    [parinfer.state :refer [state]]
    ))

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
         :or {change nil, use-cache? true}}]
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
          (let [state (if (and use-cache? @prev-state)
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
    (.scrollTo cm scroll-x scroll-y)))

