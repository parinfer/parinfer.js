(ns parinfer-site.editor-ui
  (:require
    [parinfer-site.state :refer [state]]
    [om.core :as om]
    [sablono.core :refer-macros [html]]
    [parinfer-site.parinfer :refer [major-version]]
    [goog.dom :as gdom]))

(defn refresh!
  "Called after settings are updated to cause the editor to reflect them."
  [cm]

  ;; update the text by running parinfer on it
  ; (fix-text! cm)

  ;; make sure cursor is still visible
  (let [element (.getWrapperElement cm)
        cursor (gdom/getElementByClass "CodeMirror-cursors" element)]
    (aset cursor "style" "visibility" "visible")))

(def smart-caption
  (list
    [:em "Smart Mode"]
    "New experimental behavior, hopefully making it unnecessary
     to switch between Indent Mode and Paren Mode"))

(def indent-caption
  (list
    [:em "Indent Mode "]
    "transforms your code after every edit in order to make Lisp an
    indentation-based language like Python.  It does this by moving around
    end-of-line close-parens (dimmed in the editor) in a formalized way.
    This gives us implicit indentation while allowing us to see explicit
    structure."))

(def paren-caption
  (list
    [:em "Paren Mode "]
    "transforms your code after every edit by constraining indentation to
    proper thresholds determined by parens. It is a LOOSE pretty-printer
    in that it respects and preserves your chosen indentation without
    configuration, as long as it falls within standard thresholds."))

(def cursor-dx-caption
  (list
    [:em "cursorDx:"]
    "We must track how far the
    open-parens on the right side of the cursor have shifted after each edit.
    That way we can shift subsequent lines by the same amount to preserve
    relative indentation.  This cursorDx (delta x) value must be determined by
    the editor and given to Parinfer."))

(def force-balance-caption
  (list
    "Employ v1's aggressive rules to ensure parens are always balanced."))

(def mode->caption
  {:smart-mode smart-caption
   :indent-mode indent-caption
   :paren-mode paren-caption})

(defn editor-header
  [editor]
  (reify
    om/IRender
    (render [_]
      (html
        [:div
         [:h1 "Par" [:em "infer"] [:em (str " v" (major-version))]]
         [:div.subtitle
          {:style {:opacity 0.5
                   :display "inline-block"
                   :margin-left 10}}

          "(demo editor)"]

         [:div.subtitle
          {:style {:margin-top -42
                   :text-align "right"}}
          "v" (aget js/window "parinfer" "version")
          " | "
          [:a {:href "https://github.com/shaunlebron/parinfer"} "GitHub"]]]))))



(defn editor-footer
  [editor]
  (reify
    om/IRender
    (render [_]
      (html
        [:div
          [:select.mode
           {:value (name (:mode editor))
            :on-mouse-over (fn [e] (om/update! editor :help-caption (mode->caption (:mode editor))))
            :on-mouse-out (fn [e] (om/update! editor :help-caption ""))
            :on-change (fn [e]
                         (let [new-mode (keyword (aget e "target" "value"))]
                           (om/update! editor :help-caption (mode->caption new-mode))
                           (om/update! editor :mode new-mode)
                           (js/parinferCodeMirror.setMode
                             (:cm editor)
                             ({:indent-mode "indent"
                               :paren-mode "paren"
                               :smart-mode "smart"} new-mode))))}
           [:option {:value "smart-mode"} "Smart Mode"]
           [:option {:value "indent-mode"} "Indent Mode"]
           [:option {:value "paren-mode"} "Paren Mode"]]

         (when (#{:indent-mode :smart-mode} (:mode editor))
           (let [path [:options :force-balance]]
             [:label.user-option
              {:on-mouse-over (fn [e] (om/update! editor :help-caption force-balance-caption))
               :on-mouse-out (fn [e] (om/update! editor :help-caption ""))}
              [:input
               {:type "checkbox"
                :checked (get-in editor path)
                :on-change (fn [e]
                             (let [checked (aget e "target" "checked")]
                               (om/update! editor path checked)
                               (js/parinferCodeMirror.setOptions
                                 (:cm editor)
                                 #js{:forceBalance checked})))}]
              "forceBalance"]))

         (let [{:keys [name message] :as error} (get-in editor [:result :error])]
           (when error
             [:div.status.error
              [:div.status-name "Parinfer is suspended: "]
              [:div.status-msg message]]))
         [:div.help-caption (:help-caption editor)]]))))

(defn prevent-backspace-navigation!
  "Since the cursor is always showing in the text editor because
  it's useful to see when cursor position is significant, we disable the
  backspace key to prevent it from making the browser go back to the previous
  page."
  []
  (js/window.addEventListener
    "keydown"
    (fn [e]
      (when (= 8 (aget e "keyCode"))
        (.preventDefault e)
        false))))

(defn create-ui-section
  "Start rendering the ui header or footer for the given editor"
  [editor-key section element-id]
  (om/root
    (fn [editors]
      (reify
        om/IRender
        (render [_]
          (om/build section (get editors editor-key)))))
    state
    {:target (js/document.getElementById element-id)}))

(defn render! [editor-key]
  (prevent-backspace-navigation!)
  (create-ui-section editor-key editor-header "editor-header")
  (create-ui-section editor-key editor-footer "editor-footer"))
