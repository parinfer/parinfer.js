(ns ajax.protocols)

(defprotocol AjaxImpl
  "An abstraction for a javascript class that implements
   Ajax calls."
  (-js-ajax-request [this request handler]
    "Makes an actual ajax request.  All parameters except opts
     are in JS format.  Should return an AjaxRequest."))

(defprotocol AjaxRequest
  "An abstraction for a running ajax request."
  (-abort [this]
    "Aborts a running ajax request, if possible."))

(defprotocol AjaxResponse
  "An abstraction for an ajax response."
  (-status [this]
    "Returns the HTTP Status of the response as an integer.")
  (-status-text [this]
    "Returns the HTTP Status Text of the response as a string.")
  (-body [this]
    "Returns the response body as a string or as type specified in response-format such as a blob or arraybuffer.")
  (-get-response-header [this header]
    "Gets the specified response header (specified by a string) as a string.")
  (-was-aborted [this]
    "Was the response aborted."))

(defprotocol Interceptor
  "An abstraction for something that processes requests and responses."
  (-process-request [this request]
    "Transforms the opts")
  (-process-response [this response]
    "Transforms the raw response (an implementation of AjaxResponse)"))

(defrecord Response [status body status-text headers was-aborted]
  AjaxResponse
  (-body [this] (:body this))
  (-status [this] (:status this))
  (-status-text [this] (:status-text this))
  (-get-response-header [this header] (get (:headers this) header))
  (-was-aborted [this] (:was-aborted this)))
