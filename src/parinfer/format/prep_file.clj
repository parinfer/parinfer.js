(ns parinfer.format.prep-file
  (:require
    [parinfer.format.prep :as prep]))

(def usage
  "prep-file <filenames>
  Corrects indentation of the given files, backing up originals to .bak")

(defn prep-file
  [filename]
  (println "Reading" filename "...")
  (let [orig-text (slurp filename)
        prep-text (:text (prep/format-text orig-text))]
    (println "Writing" filename "...")
    (spit filename prep-text)
    (spit (str filename ".bak") orig-text)))

(defn -main
  [& args]
  (if (empty? args)
    (println usage)
    (doseq [filename args]
      (prep-file filename))))
