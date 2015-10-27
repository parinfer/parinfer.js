(ns parinfer.toc
  "table of contents generator and highlighting"
  (:require
    [om.core :as om :include-macros true]
    [sablono.core :refer-macros [html]]))

(defonce state
  (atom {:sections nil
         :visible? #{}}))

(defn get-sections
  "get a list of sections for the table of contents"
  []
  (let [headers (.. js/document
                     (getElementById "app")
                     (querySelectorAll "h2,h3,h4,h5,h6"))]
    (for [i (range (.-length headers))]
      (let [header (aget headers i)
            section (.-parentElement header)]
        {:id (.-id section)
         :level (subs (.-tagName header) 1)
         :section section
         :title (.-textContent header)}))))

(defn toc-component
  [{:keys [sections visible?]} owner]
  (reify
    om/IRender
    (render [_this]
      (html
        [:div
         (for [{:keys [id level title]} sections]
           [:div {:class (cond-> (str "toc-link toc-level-" level)
                           (visible? id) (str " toc-visible"))}
            [:a {:href (str "#" id)} title]])]))))

(defn track-section-visibility!
  []
  (doseq [s (:sections @state)]
    (doto (js/scrollMonitor.create (:section s))
      (.enterViewport #(swap! state update :visible? conj (:id s)))
      (.exitViewport #(swap! state update :visible? disj (:id s))))))

(defn init! []
  (when-not (:sections @state)
    (swap! state assoc :sections (get-sections))
    (track-section-visibility!)
    (om/root
      toc-component
      state
      {:target (js/document.getElementById "toc")})))
