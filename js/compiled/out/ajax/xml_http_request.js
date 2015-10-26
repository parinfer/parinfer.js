// Compiled by ClojureScript 1.7.122 {}
goog.provide('ajax.xml_http_request');
goog.require('cljs.core');
goog.require('ajax.protocols');
ajax.xml_http_request.ready_state = (function ajax$xml_http_request$ready_state(e){
return new cljs.core.PersistentArrayMap(null, 5, [(0),new cljs.core.Keyword(null,"not-initialized","not-initialized",-1937378906),(1),new cljs.core.Keyword(null,"connection-established","connection-established",-1403749733),(2),new cljs.core.Keyword(null,"request-received","request-received",2110590540),(3),new cljs.core.Keyword(null,"processing-request","processing-request",-264947221),(4),new cljs.core.Keyword(null,"response-ready","response-ready",245208276)], null).call(null,e.target.readyState);
});
XMLHttpRequest.prototype.ajax$protocols$AjaxImpl$ = true;

XMLHttpRequest.prototype.ajax$protocols$AjaxImpl$_js_ajax_request$arity$3 = (function (this$,p__38802,handler){
var map__38803 = p__38802;
var map__38803__$1 = ((((!((map__38803 == null)))?((((map__38803.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38803.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38803):map__38803);
var uri = cljs.core.get.call(null,map__38803__$1,new cljs.core.Keyword(null,"uri","uri",-774711847));
var method = cljs.core.get.call(null,map__38803__$1,new cljs.core.Keyword(null,"method","method",55703592));
var body = cljs.core.get.call(null,map__38803__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var headers = cljs.core.get.call(null,map__38803__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var timeout = cljs.core.get.call(null,map__38803__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(0));
var with_credentials = cljs.core.get.call(null,map__38803__$1,new cljs.core.Keyword(null,"with-credentials","with-credentials",-1163127235),false);
var response_format = cljs.core.get.call(null,map__38803__$1,new cljs.core.Keyword(null,"response-format","response-format",1664465322));
var this$__$1 = this;
this$__$1.withCredentials = with_credentials;

this$__$1.onreadystatechange = ((function (this$__$1,map__38803,map__38803__$1,uri,method,body,headers,timeout,with_credentials,response_format){
return (function (p1__38801_SHARP_){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"response-ready","response-ready",245208276),ajax.xml_http_request.ready_state.call(null,p1__38801_SHARP_))){
return handler.call(null,this$__$1);
} else {
return null;
}
});})(this$__$1,map__38803,map__38803__$1,uri,method,body,headers,timeout,with_credentials,response_format))
;

this$__$1.open(method,uri,true);

this$__$1.timeout = timeout;

var temp__4425__auto___38811 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(response_format);
if(cljs.core.truth_(temp__4425__auto___38811)){
var response_type_38812 = temp__4425__auto___38811;
this$__$1.responseType = cljs.core.name.call(null,response_type_38812);
} else {
}

var seq__38805_38813 = cljs.core.seq.call(null,headers);
var chunk__38806_38814 = null;
var count__38807_38815 = (0);
var i__38808_38816 = (0);
while(true){
if((i__38808_38816 < count__38807_38815)){
var vec__38809_38817 = cljs.core._nth.call(null,chunk__38806_38814,i__38808_38816);
var k_38818 = cljs.core.nth.call(null,vec__38809_38817,(0),null);
var v_38819 = cljs.core.nth.call(null,vec__38809_38817,(1),null);
this$__$1.setRequestHeader(k_38818,v_38819);

var G__38820 = seq__38805_38813;
var G__38821 = chunk__38806_38814;
var G__38822 = count__38807_38815;
var G__38823 = (i__38808_38816 + (1));
seq__38805_38813 = G__38820;
chunk__38806_38814 = G__38821;
count__38807_38815 = G__38822;
i__38808_38816 = G__38823;
continue;
} else {
var temp__4425__auto___38824 = cljs.core.seq.call(null,seq__38805_38813);
if(temp__4425__auto___38824){
var seq__38805_38825__$1 = temp__4425__auto___38824;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__38805_38825__$1)){
var c__17070__auto___38826 = cljs.core.chunk_first.call(null,seq__38805_38825__$1);
var G__38827 = cljs.core.chunk_rest.call(null,seq__38805_38825__$1);
var G__38828 = c__17070__auto___38826;
var G__38829 = cljs.core.count.call(null,c__17070__auto___38826);
var G__38830 = (0);
seq__38805_38813 = G__38827;
chunk__38806_38814 = G__38828;
count__38807_38815 = G__38829;
i__38808_38816 = G__38830;
continue;
} else {
var vec__38810_38831 = cljs.core.first.call(null,seq__38805_38825__$1);
var k_38832 = cljs.core.nth.call(null,vec__38810_38831,(0),null);
var v_38833 = cljs.core.nth.call(null,vec__38810_38831,(1),null);
this$__$1.setRequestHeader(k_38832,v_38833);

var G__38834 = cljs.core.next.call(null,seq__38805_38825__$1);
var G__38835 = null;
var G__38836 = (0);
var G__38837 = (0);
seq__38805_38813 = G__38834;
chunk__38806_38814 = G__38835;
count__38807_38815 = G__38836;
i__38808_38816 = G__38837;
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

//# sourceMappingURL=xml_http_request.js.map?rel=1445823442737