(ns parinfer.site.toc
  "Table of contents generator and highlighting"
  (:require
    [om.core :as om :include-macros true]
    [sablono.core :refer-macros [html]]
    [goog.dom :as gdom]
    ))

(defonce state
  (atom {:sections nil
         :visible? #{}}))

(defn get-sections!
  "get a list of sections for the table of contents"
  []
  (let [headers (.. js/document
                     (getElementById "app")
                     (querySelectorAll "h2,h3,h4,h5,h6"))
        result (reduce
                 (fn [{:keys [stack sections] :as result} i]
                   (let [header-elm (aget headers i)
                         section-elm (.-parentElement header-elm)
                         id (.-id section-elm)
                         title (.-textContent header-elm)
                         prefix-elm (gdom/createDom
                                      "a"
                                      #js {:href (str "#" id)
                                           :class "header-link"}
                                      "#")
                         level (js/parseInt (subs (.-tagName header-elm) 1))
                         keep? #(< (:level %) level)
                         stack (vec (take-while keep? stack))
                         section {:id id
                                  :parent-ids (set (mapv :id stack))
                                  :level level
                                  :order i
                                  :section-elm section-elm
                                  :title title}
                         stack (conj stack section)]
                     (gdom/insertChildAt header-elm prefix-elm 0)
                     {:stack stack
                      :sections (conj sections section)}))

                 {:stack []
                  :sections []}
                 (range (.-length headers)))]
    (:sections result)))

(defn toc-component
  [{:keys [sections visible?]} owner]
  (reify
    om/IRender
    (render [_this]
      (let [top-most-visible (apply min-key :order visible?)]
        (html
          [:div
           (for [{:keys [id level title]} sections]
             (let [current? (= id (:id top-most-visible))
                   parent? (get (:parent-ids top-most-visible) id)]
               [:div {:class (cond-> (str "toc-link toc-level-" level)
                               parent? (str " toc-parent")
                               current? (str " toc-current"))}
                [:a {:href (str "#" id)} title]]))])))))

(defn track-section-visibility!
  []
  (doseq [s (:sections @state)]
    (doto (js/scrollMonitor.create (:section-elm s))
      (.enterViewport #(swap! state update :visible? conj s))
      (.exitViewport #(swap! state update :visible? disj s)))))

(defn init! []
  (when-not (:sections @state)
    (swap! state assoc :sections (get-sections!))
    (track-section-visibility!)
    (om/root
      toc-component
      state
      {:target (js/document.getElementById "toc")})))
