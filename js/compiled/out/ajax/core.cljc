(ns ajax.core
  (:require [clojure.string :as str]
            [cognitect.transit :as t]
            [clojure.string :as s]
            [ajax.protocols :refer
             [-body -process-request -process-response -abort -status
              -get-response-header -status-text -js-ajax-request
              -was-aborted
              #?@ (:cljs [AjaxImpl AjaxRequest AjaxResponse
                          Interceptor Response])]]
            #?@ (:clj  [[ajax.macros :as m]
                        [poppea :as p]
                        [cheshire.core :as c]
                        [ajax.apache]
                        [clojure.java.io :as io]]
                 :cljs [[goog.net.XhrIo :as xhr]
                        [ajax.xhrio]
                        [ajax.xml-http-request]
                        [goog.json :as goog-json]
                        [goog.Uri.QueryData :as query-data]
                        [goog.json.Serializer]
                        [goog.structs :as structs]]))
  #? (:clj
      (:import [java.io OutputStreamWriter ByteArrayOutputStream
                InputStreamReader Closeable OutputStream
                InputStream]
               [java.lang String]
               [java.util Scanner]
               [ajax.apache Connection]
               [ajax.protocols AjaxImpl AjaxRequest
                AjaxResponse Interceptor Response])
      :cljs
      (:require-macros [ajax.macros :as m]
                       [poppea :as p])))

(defn process-response [response interceptor]
  "-process-response with the arguments flipped for use in reduce"
  (-process-response interceptor response))

(defn process-request [request interceptor]
  "-process-request with the arguments flipped for use in reduce"
  (-process-request interceptor request))

(defrecord StandardInterceptor [name request response]
  Interceptor
  (-process-request [{:keys [request]} opts]
    (request opts))
  (-process-response [{:keys [response]} xhrio]
    (response xhrio)))

(defn to-interceptor [m]
  (map->StandardInterceptor (merge
                             {:request identity :response identity}
                             m)))

(defn get-content-type ^String [response]
  (or (-get-response-header response "Content-Type") ""))

(defn abort ([this] (-abort this)))

(defn success? [status]
  (some #{status} [200 201 202 204 205 206]))

;;; Response Format record

#? (:clj (defn exception-message [^Exception e] (.getMessage e))
    :cljs (defn exception-message [e] (.-message e)))

(defn exception-response [e status {:keys [description]} xhrio]
  (let [response {:status status
                  :failure :error
                  :response nil}
        status-text (str (exception-message e)
                         "  Format should have been "
                         description)
        parse-error (assoc response
                      :status-text status-text
                      :failure :parse
                      :original-text (-body xhrio))]
    (if (success? status)
      parse-error
      (assoc response
        :status-text (-status-text xhrio)
        :parse-error parse-error))))

(defn fail [status status-text failure & params]
  (let [response {:status status
                  :status-text status-text
                  :failure failure}]
    [false (reduce conj
                   response
                   (map vec (partition 2 params)))]))

(defrecord ResponseFormat [read description content-type]
  Interceptor
  (-process-request [{:keys [content-type]} request]
    "Sets the headers on the request"
    (update request
            :headers
            #(merge {"Accept" (str/join ", " content-type)}
                    (or % {}))))
  (-process-response [{:keys [read] :as format} xhrio]
    "Transforms the raw response (an implementation of AjaxResponse)"
    (try
      (let [status #? (:clj (long (-status xhrio))
                       :cljs (-status xhrio))
            fail (partial fail status)]
        (case status
          0 (if (instance? Response xhrio)
              [false xhrio]
              (fail "Request failed." :failed))
          -1 (if (-was-aborted xhrio)
               (fail "Request aborted by client." :aborted)
               (fail "Request timed out." :timeout))
          204 [true nil]       ; 204 and 205 should have empty responses
          205 [true nil]
          (try
            (let [response (read xhrio)]
              (if (success? status)
                [true response]
                (fail (-status-text xhrio) :error :response response)))
            (catch #? (:clj Exception :cljs js/Object) e
                   [false (exception-response e status format xhrio)]))))
      (catch #? (:clj Exception :cljs js/Object) e
                                        ; These errors should never happen
             (let [message #? (:clj (.getMessage e)
                               :cljs (.-message e))]
               (fail 0 message :exception :exception e))))))

;;; Request Format Record

#? (:cljs
    (defn params-to-str-old [params]
      (if params
        (-> params
            clj->js
            structs/Map.
            query-data/createFromMap
            .toString))))

(declare param-to-str)

(p/defn-curried vec-param-to-str [prefix key value]
  (param-to-str prefix [key value]))

(p/defn-curried param-to-str [prefix [key value]]
  (let [k1 (if (keyword? key) (name key) key)
        new-key (if prefix (str prefix "[" k1 "]") k1)]
    (cond (string? value)
          [[new-key value]]

          (map? value)
          (mapcat (param-to-str new-key) (seq value))

          (sequential? value)
          (apply concat (map-indexed (vec-param-to-str new-key)
                                     (seq value)))

          :else [[new-key value]])))

(defn to-utf8-writer [to-str]
  #? (:cljs to-str
      :clj (fn write-utf8 [stream params]
             (doto (OutputStreamWriter. stream)
               (.write ^String (to-str params))
               (.flush)))))

(defn params-to-str [params]
  (->> (seq params)
       (mapcat (param-to-str nil))
       (map (fn [[k v]] (str k "=" v)))
       (str/join "&")))

(defn uri-with-params [uri params]
  (if params
    (str uri
         (if (re-find #"\?" uri) "&" "?") ; add & if uri contains ?
         (params-to-str params))
    uri))

(defn get-request-format [format]
  (cond
   (map? format) format
   (ifn? format) {:write format :content-type "text/plain"}
   :else {}))

(defrecord ProcessGet []
  Interceptor
  (-process-request [_ {:keys [method] :as request}]
    (if (= method "GET")
      (reduced (update request :uri
                       #(uri-with-params % (:params request))))
      request))
  (-process-response [_ response] response))

(defn throw-error [args]
  (throw (#? (:clj Exception. :cljs js/Error.)
             (str args))))

(defrecord DirectSubmission []
  Interceptor
  (-process-request [_ {:keys [body params] :as request}]
    (if (nil? body) request (reduced request)))
  (-process-response [_ response] response))

(defn apply-request-format [write params]
  #? (:cljs (write params)
      :clj (let [stream (ByteArrayOutputStream.)]
             (write stream params)
             (.toByteArray stream))))

(defn content-type-to-request-header [content-type]
  (->> (if (string? content-type)
         [content-type]
         content-type)
       (map #(str % "; charset=utf-8"))
       (s/join ", ")))

(defrecord ApplyRequestFormat []
  Interceptor
  (-process-request
    [_ {:keys [uri method format params headers] :as request}]
    (let [{:keys [write content-type]} (get-request-format format)
          body (if-not (nil? write)
                 (apply-request-format write params)
                 (throw-error ["unrecognized request format: "
                               format]))
          headers (or headers {})]
      (assoc request
        :body body
        :headers (if content-type
                   (assoc headers "Content-Type"
                          (content-type-to-request-header
                           content-type))
                   headers))))
  (-process-response [_ xhrio] xhrio))

;;; Standard Formats

(defn transit-type [{:keys [type]}]
  (or type #? (:cljs :json :clj :msgpack)))

#? (:cljs (defn transit-write-fn
            [type request]
            (let [writer (or (:writer request)
                             (t/writer type request))]
              (fn transit-write-params [params]
                (t/write writer params))))
    :clj (p/defn-curried transit-write-fn
           [type request stream params]
           (let [writer (t/writer stream type request)]
             (t/write writer params))))

(defn transit-request-format
  ([] (transit-request-format {}))
  ([request]
     (let [type (transit-type request)
           mime-type (if (= type :json) "json" "msgpack")]
       {:write (transit-write-fn type request)
        :content-type (str "application/transit+" mime-type)})))

#? (:cljs (defn transit-read-fn [request]
            (let [reader (or (:reader request)
                             (t/reader :json request))]
              (fn transit-read-response [response]
                (let [data (t/read reader (-body response))]
                  (if (:raw request)
                    data
                    (js->clj data))))))
    :clj (p/defn-curried transit-read-fn [request response]
           (let [content-type (get-content-type response)
                 type (if (.contains content-type "msgpack")
                        :msgpack :json)
                 stream (-body response)
                 reader (t/reader stream type request)]
             (t/read reader))))

(defn transit-response-format
  ([] (transit-response-format {}))
  ([request]
     (transit-response-format (transit-type request) request))
  ([type request]
     (map->ResponseFormat
      {:read (transit-read-fn request)
       :description "Transit"
       :content-type
       #? (:cljs ["application/transit+json"]
           :clj ["application/transit+msgpack"
                 "application/transit+json"])})))

(defn url-request-format []
  {:write (to-utf8-writer params-to-str)
   :content-type "application/x-www-form-urlencoded"})

(defn raw-response-format
  ([] (map->ResponseFormat {:read -body
                            :description #? (:cljs "raw text"
                                             :clj "raw binary")
                            :content-type ["*/*"]}))
  ([_] (raw-response-format)))

(defn text-request-format []
  {:write (to-utf8-writer identity)
   :content-type "text/plain"})

#? (:clj
    ;;; http://stackoverflow.com/questions/309424/read-convert-an-inputstream-to-a-string
    (do
      (defn response-to-string [response]
        (let [s (doto (Scanner. ^InputStream (-body response)
                                "UTF-8")
                  (.useDelimiter "\\A"))]
          (if (.hasNext s) (.next s) "")))

      (defn text-response-format
        ([] (map->ResponseFormat {:read response-to-string
                                  :description "raw text"
                                  :content-type ["*/*"]}))
        ([_] (text-response-format))))
    :cljs
    (def text-response-format raw-response-format))

#? (:cljs (defn write-json [data]
            (.serialize (goog.json.Serializer.) (clj->js data)))
    :clj (defn write-json [stream data]
           (c/generate-stream data (io/writer stream))))

(defn json-request-format []
  {:write write-json
   :content-type "application/json"})


;;; strip prefix for CLJ

;;; Sort out stream closing

#? (:clj (defn strip-prefix
           ^InputStream [^String prefix ^InputStream text]
           (if prefix
             (let [utf8 (.getBytes prefix "UTF-8")]
               (loop [i 0]
                 (if (and (< i (alength utf8))
                          (= (aget utf8 i) (.read text)))
                   (recur (inc i))
                   text)))
             text))
     :cljs (defn strip-prefix [^String prefix text]
             (if (and prefix (= 0 (.indexOf text prefix)))
               (.substring text (.-length prefix))
               text)))

(p/defn-curried json-read [prefix raw keywords? xhrio]
  (let [text (strip-prefix prefix (-body xhrio))]
    #? (:cljs (let [json (goog-json/parse text)]
                (if raw
                  json
                  (js->clj json :keywordize-keys keywords?)))
        :clj (c/parse-stream (io/reader text) keywords?))))

(defn json-response-format
  "Returns a JSON response format.  Options include
   :keywords? Returns the keys as keywords
   :prefix A prefix that needs to be stripped off.  This is to
   combat JSON hijacking.  If you're using JSON with GET request,
   you should think about using this.
   http://stackoverflow.com/questions/2669690/why-does-google-prepend-while1-to-their-json-responses
   http://haacked.com/archive/2009/06/24/json-hijacking.aspx"
  ([] (json-response-format {}))
  ([{:keys [prefix keywords? raw]}]
     (map->ResponseFormat
      {:read (json-read prefix raw keywords?)
       :description (str "JSON"
                         (if prefix (str " prefix '" prefix "'"))
                         (if keywords? " keywordize"))
       :content-type ["application/json"]})))

;;; Detection and Accept Code

(def default-formats
  [["application/json" json-response-format]
   ["application/transit+json" transit-response-format]
   ["application/transit+transit" transit-response-format]
   ["text/plain" text-response-format]
   ["text/html" text-response-format]
   ["*/*" raw-response-format]])

(p/defn-curried get-format [request format-entry]
  (cond
   (or (nil? format-entry) (map? format-entry))
   format-entry

   (vector? format-entry)
   (get-format request (second format-entry))

   ;;; Must be a format generating function
   :else (format-entry request)))

(p/defn-curried get-accept-entries [request format-entry]
  (let [fe (if (vector? format-entry)
             (first format-entry)
             (:content-type (get-format request format-entry)))]
    (cond (nil? fe) ["*/*"]
          (string? fe) [fe]
          :else fe)))

(p/defn-curried content-type-matches
  [^String content-type ^String accept]
  (or (= accept "*/*")
      (>= (.indexOf content-type accept) 0)))

(p/defn-curried detect-content-type
  [content-type request format-entry]
  (let [accept (get-accept-entries request format-entry)]
    (some (content-type-matches content-type) accept)))

(defn get-default-format
  [response {:keys [response-format] :as request}]
  (let [f (detect-content-type (get-content-type response) request)]
    (->> response-format
         (filter f)
         first
         (get-format request))))

(p/defn-curried detect-response-format-read
  [request response]
  (let [format (get-default-format response request)]
    ((:read format) response)))

(defn accept-header [{:keys [response-format] :as request}]
  (if (vector? response-format)
    (str/join ", "
              (mapcat (get-accept-entries request) response-format))
    (get-accept-entries request response-format)))

(defn detect-response-format
  ([] (detect-response-format {:response-format default-formats}))
  ([opts]
     (let [accept (accept-header opts)]
       (map->ResponseFormat
        {:read (detect-response-format-read opts)
         :format (str "(from " accept ")")
         :content-type accept}))))

;;; AJAX calls

(defn get-response-format [{:keys [response-format] :as opts}]
  (cond
   (instance? ResponseFormat response-format) response-format
   (vector? response-format) (detect-response-format opts)
   (map? response-format) (map->ResponseFormat response-format)
   (ifn? response-format)
   (map->ResponseFormat {:read response-format
                         :description "custom"
                         :content-type "*/*"})
   :else (throw-error ["unrecognized response format: "
                       response-format])))

(defn normalize-method [method]
  (if (keyword? method)
    (str/upper-case (name method))
    method))

(p/defn-curried js-handler [handler interceptors response]
  (let [process (fn process [response interceptor]
            (-process-response interceptor response))
        processed (reduce process response interceptors)]
    ;;; This requires a bit of explanation: if we return a closeable,
    ;;; it should be wrapping the original response, so we _don't_
    ;;; close the original response stream
    ;;; If you're writing a weird interceptor that doesn't do this,
    ;;; remember to close the original stream yourself
    #? (:clj (if (and response
                      (instance? Closeable (second processed)))
               (.close ^Closeable (-body response))))
    (handler processed)))

(defn base-handler [interceptors {:keys [handler]}]
  (if handler
    (js-handler handler interceptors)
    (throw-error "No ajax handler provided.")))

(def request-interceptors [(ProcessGet.) (DirectSubmission.) (ApplyRequestFormat.)])

(def default-interceptors (atom []))

(defn normalize-request [request]
  (let [response-format (get-response-format request)]
    (-> request
        (update :method normalize-method)
        (update :interceptors
                #(concat [response-format]
                         (or % @default-interceptors)
                         request-interceptors)))))

(defn new-default-api []
  #? (:clj  (ajax.apache/Connection.)
      :cljs (new goog.net.XhrIo)))

(defn raw-ajax-request [{:keys [interceptors] :as request}]
  (let [request (reduce process-request request interceptors)
        handler (base-handler (reverse interceptors) request)
        api (or (:api request) (new-default-api))]
    (-js-ajax-request api request handler)))

(defn ajax-request [request]
  (-> request normalize-request raw-ajax-request))

;;; "Easy" API beyond this point

(defn keyword-request-format [format format-params]
  (cond
   (map? format) format
   (fn? format) {:write format}
   (nil? format) (transit-request-format format-params)
   :else (case format
           :transit (transit-request-format format-params)
           :json (json-request-format)
           :text (text-request-format)
           :raw (url-request-format)
           :url (url-request-format)
           nil)))

(defn keyword-response-format-element [format format-params]
  (cond
   (vector? format) [(first format)
                  (keyword-response-format-element (second format)
                                             format-params)]
   (map? format) format
   (fn? format) {:read format :description "custom"}
   (nil? format) (detect-response-format)
   :else (case format
           :transit (transit-response-format format-params)
           :json (json-response-format format-params)
           :text (text-response-format)
           :raw (raw-response-format)
           :detect (detect-response-format)
           nil)))

(defn keyword-response-format [format format-params]
  (if (vector? format)
    (->> format
         (map #(keyword-response-format-element % format-params))
         (apply vector))
    (keyword-response-format-element format format-params)))

(p/defn-curried transform-handler
  [{:keys [handler error-handler finally]} [ok result]]
  (if-let [h (if ok handler error-handler)]
    (h result))
  (when (fn? finally)
    (finally)))

(defn transform-opts [{:keys [method format response-format
                              params body]
                       :as opts}]
  "Note that if you call GET, POST et al, this function gets
   called and will include JSON code in your JS.
   If you don't want this to happen, use ajax-request directly
   (and use advanced optimisation)."
  (let [needs-format (and (nil? body) (not= method "GET"))
        rf (if (or format needs-format)
             (keyword-request-format format opts))]
    (assoc opts
      :handler (transform-handler opts)
      :format rf
      :response-format (keyword-response-format response-format opts))))

(defn easy-ajax-request [uri method opts]
  (-> opts
      (assoc :uri uri
             :method method)
      ajax.core/transform-opts
      ajax.core/ajax-request))

(m/easy-api GET)
(m/easy-api HEAD)
(m/easy-api POST)
(m/easy-api PUT)
(m/easy-api DELETE)
(m/easy-api OPTIONS)
(m/easy-api TRACE)
(m/easy-api PATCH)
