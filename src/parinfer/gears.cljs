(ns parinfer.gears)

(def default-options
  {:radius 16
   :hole-radius 0.4
   :addendum 8
   :dedendum 3
   :thickness 0.7
   :profile-slope 0.5})

(defn make-gear
  [svg drag-behavior {:keys [factor style-class
                             x y addendum dedendum
                             thickness profile-slope hole-radius] :as opts}]
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
                     :profileSlope profile-slope}]
    (doto (js/Gear.create svg js-opts)
      (.call drag-behavior)
      (.classed style-class true))))

(defn tick-svg!
  [svg]
  (.. svg
      (selectAll ".gear-path")
      (attr "transform"
            (fn [d]
              (set! (.-angle d) (+ (.-angle d) (.-speed d)))
              (let [degrees (* (.-angle d) (/ 180 Math/PI))]
                (str "rotate(" degrees ")"))))))

(defonce state (atom {}))

(defn animate-gears!
  [svg gear-map anims]
  (js/d3.timer #(tick-svg! svg)))

(defn create-gears!
  [element-id {:keys [gears anims]} {:keys [width height] :as svg-opts}]
  (let [svg (.. js/d3
                (select element-id)
                (append "svg")
                (attr "viewbox" (str "0 0 " width " " height))
                (attr "preserveAspectRatio" "xMinYMin slice"))
        gear-array #js []
        drag-behavior (js/Gear.dragBehaviour gear-array svg)
        gear-objs (for [[name- opts] gears]
                    (make-gear svg drag-behavior (merge default-options opts)))
        gear-map (zipmap (keys gears) gear-objs)]

    (doseq [g gears]
      (.push gear-array g))

    (animate-gears! svg gear-map anims)))

