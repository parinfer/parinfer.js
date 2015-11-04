(ns parinfer.gears
  (:require-macros
    [cljs.core.async.macros :refer [go go-loop]])
  (:require
    [cljs.core.async :refer [<! timeout chan alts! close!]]))

(def default-options
  {:radius 16
   :hole-radius 0.4
   :addendum 8
   :dedendum 3
   :thickness 0.7
   :profile-slope 0.5})

(defn caption-side-attrs
  [gear side]
  (let [datum (.datum gear)
        r (aget datum "outsideRadius")
        pad 10
        r (+ r pad)
        [x y] ({:top    [0 (- r)]
                :bottom [0 r]
                :right  [r 0]
                :left   [(- r) 0]} side)
        anchor ({:top    "middle"
                 :bottom "middle"
                 :right "start"
                 :left "end"} side)
        baseline ({:top "alphabetical"
                   :bottom "hanging"
                   :right "middle"
                   :left "middle"} side)]
    {:x x :y y
     :anchor anchor
     :baseline baseline}))

(defn add-gear-caption!
  [gear {:keys [text side]}]
  (let [{:keys [x y anchor baseline]} (caption-side-attrs gear side)]
    (-> gear
        (.append "text")
        (.attr "text-anchor" anchor)
        (.attr "dominant-baseline" baseline)
        (.attr "x" x)
        (.attr "y" y)
        (.text text))))

(defn make-gear
  [svg drag-behavior {:keys [factor x y style-class caption
                             addendum dedendum thickness profile-slope hole-radius] :as opts}]
  (let [radius (/ factor 2)
        teeth (/ radius 4)
        inner-radius (- radius addendum dedendum)
        hole-radius (if (> factor 96)
                      (+ (* inner-radius 0.5)
                         (* inner-radius 0.5 hole-radius))
                      (* inner-radius hole-radius))
        js-opts #js {:radius radius
                     :teeth teeth
                     :x x
                     :y y
                     :holeRadius hole-radius
                     :addendum addendum
                     :dedendum dedendum
                     :thickness thickness
                     :profileSlope profile-slope}
        gear (doto (js/Gear.create svg js-opts)
               (.call drag-behavior)
               (.classed style-class true))]

    (when caption
      (add-gear-caption! gear caption))

    gear))

(defn tick-svg!
  [svg]
  (-> svg
      (.selectAll ".gear-path")
      (.attr "transform"
            (fn [d]
              (set! (.-angle d) (+ (.-angle d) (.-speed d)))
              (let [degrees (* (.-angle d) (/ 180 Math/PI))]
                (str "rotate(" degrees ")"))))))

(defn apply-gear-attrs!
  [gear-obj attrs]
  (doseq [[k v] attrs]
    (if (= k :power)
      (js/Gear.setPower gear-obj v)
      (.attr gear-obj (name k) v))))

(defonce reload-index (atom 0))

(defn animate-gears!
  [svg gear-map gear-array anim-frames]

  (let [index (swap! reload-index inc)]

    (when (seq anim-frames)
      (go-loop []
        (doseq [{:keys [gear-attrs dt]} anim-frames]
          (doseq [[key- attrs] gear-attrs]
            (apply-gear-attrs! (gear-map key-) attrs))
          (js/Gear.updateGears gear-array)
          (<! (timeout dt)))

        ;; only continue if this is still the active timer
        (when (= index @reload-index)
          (recur)))

      (js/d3.timer
        (fn []
          (tick-svg! svg)

          ;; only continue if this is still the active timer
          (not= index @reload-index))))))

(defn create-gears!
  [selector
   {:keys [init-gears anim-frames]}
   {:keys [width height] :as svg-opts}]
  (-> (js/$ selector)
      (.on "mousedown" (fn [e] (-> e .-originalEvent (.preventDefault)))))
  (let [container (js/d3.select selector)
        _ (-> container
              (.select "svg")
              (.remove))
        svg (-> container
                (.append "svg")
                (.attr "viewbox" (str "0 0 " width " " height))
                (.attr "width" width)
                (.attr "height" height))
        gear-array #js []
        drag-behavior (js/Gear.dragBehaviour gear-array svg)
        gear-objs (for [[name- opts] init-gears]
                    (make-gear svg drag-behavior (merge default-options opts)))
        gear-map (zipmap (keys init-gears) gear-objs)]

    (doseq [g gear-objs]
      (.push gear-array g))

    (animate-gears! svg gear-map gear-array anim-frames)))

