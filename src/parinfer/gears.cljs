(ns parinfer.gears)

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
  [selector {:keys [gears anims]} {:keys [width height] :as svg-opts}]
  (.. (js/$ selector)
      (on "mousedown" (fn [e] (.. e -originalEvent (preventDefault)))))
  (let [svg (.. js/d3
                (select selector)
                (append "svg")
                (attr "viewbox" (str "0 0 " width " " height))
                (attr "width" width)
                (attr "height" height))
        gear-array #js []
        drag-behavior (js/Gear.dragBehaviour gear-array svg)
        gear-objs (for [[name- opts] gears]
                    (make-gear svg drag-behavior (merge default-options opts)))
        gear-map (zipmap (keys gears) gear-objs)]

    (doseq [g gear-objs]
      (.push gear-array g))

    (animate-gears! svg gear-map anims)))

