(ns parinfer-site.toc
  "Table of contents generator and highlighting"
  (:require
    [om.core :as om :include-macros true]
    [sablono.core :refer-macros [html]]
    [goog.dom :as gdom]))


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
                                  :ancestors stack
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

(defn sibling-section?
  [current sibling]
  (= (:ancestors current)
     (:ancestors sibling)))

(defn section-attrs
  [current active]
  (let [active?                      (= active current)
        ancestor-of-active?          (some #{current} (:ancestors active))
        child-of-active?             (= active (last (:ancestors current)))
        sibling-of-active-ancestors? (some #(sibling-section? current %) (:ancestors active))
        sibling-of-active?           (sibling-section? current active)

        ;; currently unused:
        show-with-auto-collapse?
        (or active?
            ancestor-of-active?
            child-of-active?
            sibling-of-active-ancestors?
            sibling-of-active?)]

    {:show? true
     :ancestor-of-active? ancestor-of-active?}))

(defn toc-component
  [{:keys [sections section-map visible?]} owner]
  (reify
    om/IRender
    (render [_this]
      (let [active (apply min-key :order visible?)]  ;; top most visible element is "active"
        (html
          [:div
           (for [{:keys [id level title] :as current} sections]
             (let [attrs (section-attrs current active)
                   classes (cond-> (str "toc-link toc-level-" level)
                             (= current active)           (str " toc-active")
                             (not (:show? attrs))      (str " toc-hide")
                             (:ancestor-of-active? attrs) (str " toc-active-ancestor"))]
               [:div {:class classes}
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
