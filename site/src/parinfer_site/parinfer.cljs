(ns parinfer-site.parinfer)

(defn- convert-changed-line [e]
  {:line-no (aget e "lineNo")
   :line (aget e "line")})

(defn- convert-error [e]
  (when e
    {:name (aget e "name")
     :message (aget e "message")
     :line-no (aget e "lineNo")
     :x (aget e "x")}))

(defn- convert-result [result]
  {:text (aget result "text")
   :cursor-x (aget result "cursorX")
   :success? (aget result "success")
   :changed-lines (mapv convert-changed-line (aget result "changedLines"))
   :error (convert-error (aget result "error"))})

(defn- convert-options [option]
  #js {:cursorX (:cursor-x option)
       :cursorLine (:cursor-line option)
       :cursorDx (:cursor-dx option)})

(def indent-mode* (aget js/window "parinfer" "indentMode"))
(def paren-mode* (aget js/window "parinfer" "parenMode"))

(defn indent-mode
  ([text] (convert-result (indent-mode* text)))
  ([text options] (convert-result (indent-mode* text (convert-options options)))))

(defn paren-mode
  ([text] (convert-result (paren-mode* text)))
  ([text options] (convert-result (paren-mode* text (convert-options options)))))
