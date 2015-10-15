(ns parinfer.format.prep-file
  (:require
    [parinfer.format.prep :as prep]))

(def usage
  "prep-file <filenames>
  Corrects indentation of the given files, writing to .prep.clj files.")

(defn prep-file
  [filename]
  (let [i (.lastIndexOf filename ".")
        [prefix ext] (if (>= 0 i)
                       [(subs filename 0 i) (subs filename i)]
                       [filename ".clj"])
        prep-filename (str prefix ".prep" ext)
        _ (println "Reading" filename "...")
        orig-text (slurp filename)
        prep-text (prep/format-text orig-text)]
    (println "Writing" prep-filename "...")
    (spit prep-filename prep-text)))

(defn -main
  [& args]
  (if (empty? args)
    (println usage)
    (doseq [filename args]
      (prep-file filename))))

