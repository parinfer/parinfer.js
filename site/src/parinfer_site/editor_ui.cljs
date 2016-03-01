(ns parinfer-site.editor-ui
  (:require
    [parinfer-site.state :refer [state]]
    [om.core :as om]
    [sablono.core :refer-macros [html]]
    ))

(defn editor-ui
  [editor]
  (reify
    om/IRender
    (render [_]
      (html
        [:div.devcomp
         [:div.version (aget js/window "parinfer" "version")]

         [:select.mode
          {:value (name (:mode editor))
           :on-change (fn [e]
                        (om/update! editor :mode (keyword (.. e -target -value))))}
          [:option {:value "indent-mode"} "Indent Mode"]
          [:option {:value "paren-mode"} "Paren Mode"]]

         (when (= (:mode editor) :indent-mode)
           (let [path [:options :preview-cursor-scope]]
             [:label
              [:input
               {:type "checkbox"
                :checked (get-in editor path)
                :on-change (fn [e]
                             (om/update! editor path (.. e -target -checked)))}]
              "preview cursor scope"]))

         (let [{:keys [cursor-line cursor-x cursor-dx]} (:prev-options editor)]
           [:div.cursor
            [:div.cursor-line "cursorLine:" cursor-line]
            [:div.cursor-line "cursorX" cursor-x]
            (when (= (:mode editor) :paren-mode)
              [:div.cursor-dx "cursorDx:" cursor-dx])])

         (let [{:keys [name message]} (get-in editor [:result :error])]
           [:div.error
            [:div.error-name name]
            [:div.error-msg message]])]))))

(defn render! [editor-key]
  (om/root
    (fn [editors]
      (reify
        om/IRender
        (render [_]
          (om/build editor-ui (get editors editor-key)))))
    state
    {:target (js/document.getElementById "editor-ui")}))

