(ns parinfer-site.parinfer)

(defn convert-result [result]
  {:text (aget result "text")
   :valid? (aget result "isValid")
   :state (aget result "state")})

(defn convert-options [options]
  #js {:cursorX (:cursor-x options)
       :cursorLine (:cursor-line options)
       :cursorDx (:cursor-dx options)})

(def indent-mode* (aget js/window "parinfer" "indentMode"))
(def paren-mode* (aget js/window "parinfer" "parenMode"))

(defn indent-mode
  ([text] (convert-result (indent-mode* text)))
  ([text options] (convert-result (indent-mode* text (convert-options options)))))

(defn paren-mode
  ([text] (convert-result (paren-mode* text)))
  ([text options] (convert-result (paren-mode* text (convert-options options)))))
