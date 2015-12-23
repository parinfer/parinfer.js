(ns parinfer-site.parinfer)

(defn convert-result [result]
  {:text (aget result "text")
   :valid? (aget result "isValid")
   :state (aget result "state")})

(def indent-mode* (aget js/window "parinfer" "indentMode"))
(def paren-mode* (aget js/window "parinfer" "parenMode"))

(defn indent-mode
  ([text] (convert-result (indent-mode* text)))
  ([text options] (convert-result (indent-mode* text options))))

(defn paren-mode
  ([text] (convert-result (paren-mode* text)))
  ([text options] (convert-result (paren-mode* text options))))
