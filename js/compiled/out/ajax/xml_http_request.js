// Compiled by ClojureScript 1.7.122 {}
goog.provide('ajax.xml_http_request');
goog.require('cljs.core');
goog.require('ajax.protocols');
ajax.xml_http_request.ready_state = (function ajax$xml_http_request$ready_state(e){
return new cljs.core.PersistentArrayMap(null, 5, [(0),new cljs.core.Keyword(null,"not-initialized","not-initialized",-1937378906),(1),new cljs.core.Keyword(null,"connection-established","connection-established",-1403749733),(2),new cljs.core.Keyword(null,"request-received","request-received",2110590540),(3),new cljs.core.Keyword(null,"processing-request","processing-request",-264947221),(4),new cljs.core.Keyword(null,"response-ready","response-ready",245208276)], null).call(null,e.target.readyState);
});
XMLHttpRequest.prototype.ajax$protocols$AjaxImpl$ = true;

XMLHttpRequest.prototype.ajax$protocols$AjaxImpl$_js_ajax_request$arity$3 = (function (this$,p__48060,handler){
var map__48061 = p__48060;
var map__48061__$1 = ((((!((map__48061 == null)))?((((map__48061.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48061.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__48061):map__48061);
var uri = cljs.core.get.call(null,map__48061__$1,new cljs.core.Keyword(null,"uri","uri",-774711847));
var method = cljs.core.get.call(null,map__48061__$1,new cljs.core.Keyword(null,"method","method",55703592));
var body = cljs.core.get.call(null,map__48061__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var headers = cljs.core.get.call(null,map__48061__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var timeout = cljs.core.get.call(null,map__48061__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(0));
var with_credentials = cljs.core.get.call(null,map__48061__$1,new cljs.core.Keyword(null,"with-credentials","with-credentials",-1163127235),false);
var response_format = cljs.core.get.call(null,map__48061__$1,new cljs.core.Keyword(null,"response-format","response-format",1664465322));
var this$__$1 = this;
this$__$1.withCredentials = with_credentials;

this$__$1.onreadystatechange = ((function (this$__$1,map__48061,map__48061__$1,uri,method,body,headers,timeout,with_credentials,response_format){
return (function (p1__48059_SHARP_){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"response-ready","response-ready",245208276),ajax.xml_http_request.ready_state.call(null,p1__48059_SHARP_))){
return handler.call(null,this$__$1);
} else {
return null;
}
});})(this$__$1,map__48061,map__48061__$1,uri,method,body,headers,timeout,with_credentials,response_format))
;

this$__$1.open(method,uri,true);

this$__$1.timeout = timeout;

var temp__4425__auto___48069 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(response_format);
if(cljs.core.truth_(temp__4425__auto___48069)){
var response_type_48070 = temp__4425__auto___48069;
this$__$1.responseType = cljs.core.name.call(null,response_type_48070);
} else {
}

var seq__48063_48071 = cljs.core.seq.call(null,headers);
var chunk__48064_48072 = null;
var count__48065_48073 = (0);
var i__48066_48074 = (0);
while(true){
if((i__48066_48074 < count__48065_48073)){
var vec__48067_48075 = cljs.core._nth.call(null,chunk__48064_48072,i__48066_48074);
var k_48076 = cljs.core.nth.call(null,vec__48067_48075,(0),null);
var v_48077 = cljs.core.nth.call(null,vec__48067_48075,(1),null);
this$__$1.setRequestHeader(k_48076,v_48077);

var G__48078 = seq__48063_48071;
var G__48079 = chunk__48064_48072;
var G__48080 = count__48065_48073;
var G__48081 = (i__48066_48074 + (1));
seq__48063_48071 = G__48078;
chunk__48064_48072 = G__48079;
count__48065_48073 = G__48080;
i__48066_48074 = G__48081;
continue;
} else {
var temp__4425__auto___48082 = cljs.core.seq.call(null,seq__48063_48071);
if(temp__4425__auto___48082){
var seq__48063_48083__$1 = temp__4425__auto___48082;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__48063_48083__$1)){
var c__17070__auto___48084 = cljs.core.chunk_first.call(null,seq__48063_48083__$1);
var G__48085 = cljs.core.chunk_rest.call(null,seq__48063_48083__$1);
var G__48086 = c__17070__auto___48084;
var G__48087 = cljs.core.count.call(null,c__17070__auto___48084);
var G__48088 = (0);
seq__48063_48071 = G__48085;
chunk__48064_48072 = G__48086;
count__48065_48073 = G__48087;
i__48066_48074 = G__48088;
continue;
} else {
var vec__48068_48089 = cljs.core.first.call(null,seq__48063_48083__$1);
var k_48090 = cljs.core.nth.call(null,vec__48068_48089,(0),null);
var v_48091 = cljs.core.nth.call(null,vec__48068_48089,(1),null);
this$__$1.setRequestHeader(k_48090,v_48091);

var G__48092 = cljs.core.next.call(null,seq__48063_48083__$1);
var G__48093 = null;
var G__48094 = (0);
var G__48095 = (0);
seq__48063_48071 = G__48092;
chunk__48064_48072 = G__48093;
count__48065_48073 = G__48094;
i__48066_48074 = G__48095;
continue;
}
} else {
}
}
break;
}

this$__$1.send((function (){var or__16267__auto__ = body;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return "";
}
})());

return this$__$1;
});

XMLHttpRequest.prototype.ajax$protocols$AjaxRequest$ = true;

XMLHttpRequest.prototype.ajax$protocols$AjaxRequest$_abort$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.abort();
});

XMLHttpRequest.prototype.ajax$protocols$AjaxResponse$ = true;

XMLHttpRequest.prototype.ajax$protocols$AjaxResponse$_body$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.response;
});

XMLHttpRequest.prototype.ajax$protocols$AjaxResponse$_status$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.status;
});

XMLHttpRequest.prototype.ajax$protocols$AjaxResponse$_status_text$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.statusText;
});

XMLHttpRequest.prototype.ajax$protocols$AjaxResponse$_get_response_header$arity$2 = (function (this$,header){
var this$__$1 = this;
return this$__$1.getResponseHeader(header);
});

XMLHttpRequest.prototype.ajax$protocols$AjaxResponse$_was_aborted$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core._EQ_.call(null,(0),this$__$1.readyState);
});

//# sourceMappingURL=xml_http_request.js.map?rel=1445965101820