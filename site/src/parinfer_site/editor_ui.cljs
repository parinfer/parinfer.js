(ns parinfer-site.editor-ui
  (:require
    [parinfer-site.state :refer [state]]
    [om.core :as om]
    [sablono.core :refer-macros [html]]
    [parinfer-site.editor-support :refer [fix-text!]]
    [goog.dom :as gdom]))

(defn refresh!
  [cm]
  (fix-text! cm)
  (let [element (.getWrapperElement cm)
        cursor (gdom/getElementByClass "CodeMirror-cursors" element)]
    (set! (.. cursor -style -visibility) "visible")))

(defn editor-header
  [editor]
  (reify
    om/IRender
    (render [_]
      (html
        [:div
         [:h1 "Par" [:em "infer"]]
         [:div.subtitle "Demo Editor for " (aget js/window "parinfer" "version")]

         [:select.mode
          {:value (name (:mode editor))
           :on-change (fn [e]
                        (om/update! editor :mode (keyword (.. e -target -value)))
                        (refresh! (:cm editor)))}
          [:option {:value "indent-mode"} "Indent Mode"]
          [:option {:value "paren-mode"} "Paren Mode"]]

         (when (= (:mode editor) :indent-mode)
           (let [path [:options :preview-cursor-scope]]
             [:label.option
              [:input.option
               {:type "checkbox"
                :checked (get-in editor path)
                :on-change (fn [e]
                             (om/update! editor path (.. e -target -checked))
                             (refresh! (:cm editor)))}]
              "preview cursor scope"]))

         (when (= (:mode editor) :paren-mode)
           (list
             [:label.option "cursorDx = " (:cursor-dx (:prev-options editor))]))]))))

(defn editor-footer
  [editor]
  (reify
    om/IRender
     (render [_]
       (html
         [:div
          (let [{:keys [name message] :as error} (get-in editor [:result :error])]
            (if error
              [:div.status.error
               [:div.status-name "Parinfer suspended: "]
               [:div.status-msg message]]
              [:div.status.success
               [:div.status-name "Parinfer succeeded."]]))]))))

(defn render! [editor-key]
  (om/root
    (fn [editors] (reify om/IRender (render [_] (om/build editor-header (get editors editor-key)))))
    state
    {:target (js/document.getElementById "editor-header")})
  (om/root
    (fn [editors] (reify om/IRender (render [_] (om/build editor-footer (get editors editor-key)))))
    state
    {:target (js/document.getElementById "editor-footer")}))

