// Compiled by ClojureScript 1.7.122 {}
goog.provide('ajax.core');
goog.require('cljs.core');
goog.require('cognitect.transit');
goog.require('goog.net.XhrIo');
goog.require('ajax.xml_http_request');
goog.require('goog.json');
goog.require('goog.Uri.QueryData');
goog.require('goog.structs');
goog.require('clojure.string');
goog.require('goog.json.Serializer');
goog.require('ajax.protocols');
goog.require('ajax.xhrio');
ajax.core.process_response = (function ajax$core$process_response(response,interceptor){

return ajax.protocols._process_response.call(null,interceptor,response);
});
ajax.core.process_request = (function ajax$core$process_request(request,interceptor){

return ajax.protocols._process_request.call(null,interceptor,request);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {ajax.protocols.Interceptor}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
ajax.core.StandardInterceptor = (function (name,request,response,__meta,__extmap,__hash){
this.name = name;
this.request = request;
this.response = response;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
ajax.core.StandardInterceptor.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__16881__auto__,k__16882__auto__){
var self__ = this;
var this__16881__auto____$1 = this;
return cljs.core._lookup.call(null,this__16881__auto____$1,k__16882__auto__,null);
});

ajax.core.StandardInterceptor.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__16883__auto__,k47581,else__16884__auto__){
var self__ = this;
var this__16883__auto____$1 = this;
var G__47583 = (((k47581 instanceof cljs.core.Keyword))?k47581.fqn:null);
switch (G__47583) {
case "name":
return self__.name;

break;
case "request":
return self__.request;

break;
case "response":
return self__.response;

break;
default:
return cljs.core.get.call(null,self__.__extmap,k47581,else__16884__auto__);

}
});

ajax.core.StandardInterceptor.prototype.ajax$protocols$Interceptor$ = true;

ajax.core.StandardInterceptor.prototype.ajax$protocols$Interceptor$_process_request$arity$2 = (function (p__47584,opts){
var self__ = this;
var map__47585 = p__47584;
var map__47585__$1 = ((((!((map__47585 == null)))?((((map__47585.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47585.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47585):map__47585);
var request__$1 = cljs.core.get.call(null,map__47585__$1,new cljs.core.Keyword(null,"request","request",1772954723));
var map__47587 = this;
var map__47587__$1 = ((((!((map__47587 == null)))?((((map__47587.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47587.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47587):map__47587);
var request__$2 = cljs.core.get.call(null,map__47587__$1,new cljs.core.Keyword(null,"request","request",1772954723));
return request__$2.call(null,opts);
});

ajax.core.StandardInterceptor.prototype.ajax$protocols$Interceptor$_process_response$arity$2 = (function (p__47589,xhrio){
var self__ = this;
var map__47590 = p__47589;
var map__47590__$1 = ((((!((map__47590 == null)))?((((map__47590.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47590.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47590):map__47590);
var response__$1 = cljs.core.get.call(null,map__47590__$1,new cljs.core.Keyword(null,"response","response",-1068424192));
var map__47592 = this;
var map__47592__$1 = ((((!((map__47592 == null)))?((((map__47592.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47592.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47592):map__47592);
var response__$2 = cljs.core.get.call(null,map__47592__$1,new cljs.core.Keyword(null,"response","response",-1068424192));
return response__$2.call(null,xhrio);
});

ajax.core.StandardInterceptor.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__16895__auto__,writer__16896__auto__,opts__16897__auto__){
var self__ = this;
var this__16895__auto____$1 = this;
var pr_pair__16898__auto__ = ((function (this__16895__auto____$1){
return (function (keyval__16899__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__16896__auto__,cljs.core.pr_writer,""," ","",opts__16897__auto__,keyval__16899__auto__);
});})(this__16895__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__16896__auto__,pr_pair__16898__auto__,"#ajax.core.StandardInterceptor{",", ","}",opts__16897__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"name","name",1843675177),self__.name],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"request","request",1772954723),self__.request],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"response","response",-1068424192),self__.response],null))], null),self__.__extmap));
});

ajax.core.StandardInterceptor.prototype.cljs$core$IIterable$ = true;

ajax.core.StandardInterceptor.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__47580){
var self__ = this;
var G__47580__$1 = this;
return (new cljs.core.RecordIter((0),G__47580__$1,3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"request","request",1772954723),new cljs.core.Keyword(null,"response","response",-1068424192)], null),cljs.core._iterator.call(null,self__.__extmap)));
});

ajax.core.StandardInterceptor.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__16879__auto__){
var self__ = this;
var this__16879__auto____$1 = this;
return self__.__meta;
});

ajax.core.StandardInterceptor.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__16875__auto__){
var self__ = this;
var this__16875__auto____$1 = this;
return (new ajax.core.StandardInterceptor(self__.name,self__.request,self__.response,self__.__meta,self__.__extmap,self__.__hash));
});

ajax.core.StandardInterceptor.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__16885__auto__){
var self__ = this;
var this__16885__auto____$1 = this;
return (3 + cljs.core.count.call(null,self__.__extmap));
});

ajax.core.StandardInterceptor.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__16876__auto__){
var self__ = this;
var this__16876__auto____$1 = this;
var h__16702__auto__ = self__.__hash;
if(!((h__16702__auto__ == null))){
return h__16702__auto__;
} else {
var h__16702__auto____$1 = cljs.core.hash_imap.call(null,this__16876__auto____$1);
self__.__hash = h__16702__auto____$1;

return h__16702__auto____$1;
}
});

ajax.core.StandardInterceptor.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__16877__auto__,other__16878__auto__){
var self__ = this;
var this__16877__auto____$1 = this;
if(cljs.core.truth_((function (){var and__16255__auto__ = other__16878__auto__;
if(cljs.core.truth_(and__16255__auto__)){
var and__16255__auto____$1 = (this__16877__auto____$1.constructor === other__16878__auto__.constructor);
if(and__16255__auto____$1){
return cljs.core.equiv_map.call(null,this__16877__auto____$1,other__16878__auto__);
} else {
return and__16255__auto____$1;
}
} else {
return and__16255__auto__;
}
})())){
return true;
} else {
return false;
}
});

ajax.core.StandardInterceptor.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__16890__auto__,k__16891__auto__){
var self__ = this;
var this__16890__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"response","response",-1068424192),null,new cljs.core.Keyword(null,"request","request",1772954723),null,new cljs.core.Keyword(null,"name","name",1843675177),null], null), null),k__16891__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__16890__auto____$1),self__.__meta),k__16891__auto__);
} else {
return (new ajax.core.StandardInterceptor(self__.name,self__.request,self__.response,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__16891__auto__)),null));
}
});

ajax.core.StandardInterceptor.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__16888__auto__,k__16889__auto__,G__47580){
var self__ = this;
var this__16888__auto____$1 = this;
var pred__47594 = cljs.core.keyword_identical_QMARK_;
var expr__47595 = k__16889__auto__;
if(cljs.core.truth_(pred__47594.call(null,new cljs.core.Keyword(null,"name","name",1843675177),expr__47595))){
return (new ajax.core.StandardInterceptor(G__47580,self__.request,self__.response,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__47594.call(null,new cljs.core.Keyword(null,"request","request",1772954723),expr__47595))){
return (new ajax.core.StandardInterceptor(self__.name,G__47580,self__.response,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__47594.call(null,new cljs.core.Keyword(null,"response","response",-1068424192),expr__47595))){
return (new ajax.core.StandardInterceptor(self__.name,self__.request,G__47580,self__.__meta,self__.__extmap,null));
} else {
return (new ajax.core.StandardInterceptor(self__.name,self__.request,self__.response,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__16889__auto__,G__47580),null));
}
}
}
});

ajax.core.StandardInterceptor.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__16893__auto__){
var self__ = this;
var this__16893__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"name","name",1843675177),self__.name],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"request","request",1772954723),self__.request],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"response","response",-1068424192),self__.response],null))], null),self__.__extmap));
});

ajax.core.StandardInterceptor.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__16880__auto__,G__47580){
var self__ = this;
var this__16880__auto____$1 = this;
return (new ajax.core.StandardInterceptor(self__.name,self__.request,self__.response,G__47580,self__.__extmap,self__.__hash));
});

ajax.core.StandardInterceptor.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__16886__auto__,entry__16887__auto__){
var self__ = this;
var this__16886__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__16887__auto__)){
return cljs.core._assoc.call(null,this__16886__auto____$1,cljs.core._nth.call(null,entry__16887__auto__,(0)),cljs.core._nth.call(null,entry__16887__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__16886__auto____$1,entry__16887__auto__);
}
});

ajax.core.StandardInterceptor.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"name","name",-810760592,null),new cljs.core.Symbol(null,"request","request",-881481046,null),new cljs.core.Symbol(null,"response","response",572107335,null)], null);
});

ajax.core.StandardInterceptor.cljs$lang$type = true;

ajax.core.StandardInterceptor.cljs$lang$ctorPrSeq = (function (this__16915__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"ajax.core/StandardInterceptor");
});

ajax.core.StandardInterceptor.cljs$lang$ctorPrWriter = (function (this__16915__auto__,writer__16916__auto__){
return cljs.core._write.call(null,writer__16916__auto__,"ajax.core/StandardInterceptor");
});

ajax.core.__GT_StandardInterceptor = (function ajax$core$__GT_StandardInterceptor(name,request,response){
return (new ajax.core.StandardInterceptor(name,request,response,null,null,null));
});

ajax.core.map__GT_StandardInterceptor = (function ajax$core$map__GT_StandardInterceptor(G__47582){
return (new ajax.core.StandardInterceptor(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(G__47582),new cljs.core.Keyword(null,"request","request",1772954723).cljs$core$IFn$_invoke$arity$1(G__47582),new cljs.core.Keyword(null,"response","response",-1068424192).cljs$core$IFn$_invoke$arity$1(G__47582),null,cljs.core.dissoc.call(null,G__47582,new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"request","request",1772954723),new cljs.core.Keyword(null,"response","response",-1068424192)),null));
});

ajax.core.to_interceptor = (function ajax$core$to_interceptor(m){
return ajax.core.map__GT_StandardInterceptor.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"request","request",1772954723),cljs.core.identity,new cljs.core.Keyword(null,"response","response",-1068424192),cljs.core.identity], null),m));
});
ajax.core.get_content_type = (function ajax$core$get_content_type(response){
var or__16267__auto__ = ajax.protocols._get_response_header.call(null,response,"Content-Type");
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return "";
}
});
ajax.core.abort = (function ajax$core$abort(this$){
return ajax.protocols._abort.call(null,this$);
});
ajax.core.success_QMARK_ = (function ajax$core$success_QMARK_(status){
return cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([status], true),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(200),(201),(202),(204),(205),(206)], null));
});
ajax.core.exception_message = (function ajax$core$exception_message(e){
return e.message;
});
ajax.core.exception_response = (function ajax$core$exception_response(e,status,p__47598,xhrio){
var map__47601 = p__47598;
var map__47601__$1 = ((((!((map__47601 == null)))?((((map__47601.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47601.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47601):map__47601);
var description = cljs.core.get.call(null,map__47601__$1,new cljs.core.Keyword(null,"description","description",-1428560544));
var response = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),status,new cljs.core.Keyword(null,"failure","failure",720415879),new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"response","response",-1068424192),null], null);
var status_text = [cljs.core.str(ajax.core.exception_message.call(null,e)),cljs.core.str("  Format should have been "),cljs.core.str(description)].join('');
var parse_error = cljs.core.assoc.call(null,response,new cljs.core.Keyword(null,"status-text","status-text",-1834235478),status_text,new cljs.core.Keyword(null,"failure","failure",720415879),new cljs.core.Keyword(null,"parse","parse",-1162164619),new cljs.core.Keyword(null,"original-text","original-text",744448452),ajax.protocols._body.call(null,xhrio));
if(cljs.core.truth_(ajax.core.success_QMARK_.call(null,status))){
return parse_error;
} else {
return cljs.core.assoc.call(null,response,new cljs.core.Keyword(null,"status-text","status-text",-1834235478),ajax.protocols._status_text.call(null,xhrio),new cljs.core.Keyword(null,"parse-error","parse-error",255902478),parse_error);
}
});
ajax.core.fail = (function ajax$core$fail(var_args){
var args__17332__auto__ = [];
var len__17325__auto___47607 = arguments.length;
var i__17326__auto___47608 = (0);
while(true){
if((i__17326__auto___47608 < len__17325__auto___47607)){
args__17332__auto__.push((arguments[i__17326__auto___47608]));

var G__47609 = (i__17326__auto___47608 + (1));
i__17326__auto___47608 = G__47609;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((3) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((3)),(0))):null);
return ajax.core.fail.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__17333__auto__);
});

ajax.core.fail.cljs$core$IFn$_invoke$arity$variadic = (function (status,status_text,failure,params){
var response = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),status,new cljs.core.Keyword(null,"status-text","status-text",-1834235478),status_text,new cljs.core.Keyword(null,"failure","failure",720415879),failure], null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [false,cljs.core.reduce.call(null,cljs.core.conj,response,cljs.core.map.call(null,cljs.core.vec,cljs.core.partition.call(null,(2),params)))], null);
});

ajax.core.fail.cljs$lang$maxFixedArity = (3);

ajax.core.fail.cljs$lang$applyTo = (function (seq47603){
var G__47604 = cljs.core.first.call(null,seq47603);
var seq47603__$1 = cljs.core.next.call(null,seq47603);
var G__47605 = cljs.core.first.call(null,seq47603__$1);
var seq47603__$2 = cljs.core.next.call(null,seq47603__$1);
var G__47606 = cljs.core.first.call(null,seq47603__$2);
var seq47603__$3 = cljs.core.next.call(null,seq47603__$2);
return ajax.core.fail.cljs$core$IFn$_invoke$arity$variadic(G__47604,G__47605,G__47606,seq47603__$3);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {ajax.protocols.Interceptor}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
ajax.core.ResponseFormat = (function (read,description,content_type,__meta,__extmap,__hash){
this.read = read;
this.description = description;
this.content_type = content_type;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
ajax.core.ResponseFormat.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__16881__auto__,k__16882__auto__){
var self__ = this;
var this__16881__auto____$1 = this;
return cljs.core._lookup.call(null,this__16881__auto____$1,k__16882__auto__,null);
});

ajax.core.ResponseFormat.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__16883__auto__,k47612,else__16884__auto__){
var self__ = this;
var this__16883__auto____$1 = this;
var G__47614 = (((k47612 instanceof cljs.core.Keyword))?k47612.fqn:null);
switch (G__47614) {
case "read":
return self__.read;

break;
case "description":
return self__.description;

break;
case "content-type":
return self__.content_type;

break;
default:
return cljs.core.get.call(null,self__.__extmap,k47612,else__16884__auto__);

}
});

ajax.core.ResponseFormat.prototype.ajax$protocols$Interceptor$ = true;

ajax.core.ResponseFormat.prototype.ajax$protocols$Interceptor$_process_request$arity$2 = (function (p__47615,request){
var self__ = this;
var map__47616 = p__47615;
var map__47616__$1 = ((((!((map__47616 == null)))?((((map__47616.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47616.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47616):map__47616);
var content_type__$1 = cljs.core.get.call(null,map__47616__$1,new cljs.core.Keyword(null,"content-type","content-type",-508222634));
var map__47618 = this;
var map__47618__$1 = ((((!((map__47618 == null)))?((((map__47618.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47618.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47618):map__47618);
var content_type__$2 = cljs.core.get.call(null,map__47618__$1,new cljs.core.Keyword(null,"content-type","content-type",-508222634));

return cljs.core.update.call(null,request,new cljs.core.Keyword(null,"headers","headers",-835030129),((function (map__47618,map__47618__$1,content_type__$2,map__47616,map__47616__$1,content_type__$1){
return (function (p1__47610_SHARP_){
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, ["Accept",clojure.string.join.call(null,", ",content_type__$2)], null),(function (){var or__16267__auto__ = p1__47610_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})());
});})(map__47618,map__47618__$1,content_type__$2,map__47616,map__47616__$1,content_type__$1))
);
});

ajax.core.ResponseFormat.prototype.ajax$protocols$Interceptor$_process_response$arity$2 = (function (p__47620,xhrio){
var self__ = this;
var map__47621 = p__47620;
var map__47621__$1 = ((((!((map__47621 == null)))?((((map__47621.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47621.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47621):map__47621);
var format = map__47621__$1;
var read__$1 = cljs.core.get.call(null,map__47621__$1,new cljs.core.Keyword(null,"read","read",1140058661));
var map__47623 = this;
var map__47623__$1 = ((((!((map__47623 == null)))?((((map__47623.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47623.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47623):map__47623);
var format__$1 = map__47623__$1;
var read__$2 = cljs.core.get.call(null,map__47623__$1,new cljs.core.Keyword(null,"read","read",1140058661));

try{var status = ajax.protocols._status.call(null,xhrio);
var fail = cljs.core.partial.call(null,ajax.core.fail,status);
var G__47626 = status;
switch (G__47626) {
case (0):
if((xhrio instanceof ajax.protocols.Response)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [false,xhrio], null);
} else {
return fail.call(null,"Request failed.",new cljs.core.Keyword(null,"failed","failed",-1397425762));
}

break;
case (-1):
if(cljs.core.truth_(ajax.protocols._was_aborted.call(null,xhrio))){
return fail.call(null,"Request aborted by client.",new cljs.core.Keyword(null,"aborted","aborted",1775972619));
} else {
return fail.call(null,"Request timed out.",new cljs.core.Keyword(null,"timeout","timeout",-318625318));
}

break;
case (204):
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,null], null);

break;
case (205):
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,null], null);

break;
default:
try{var response = read__$2.call(null,xhrio);
if(cljs.core.truth_(ajax.core.success_QMARK_.call(null,status))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,response], null);
} else {
return fail.call(null,ajax.protocols._status_text.call(null,xhrio),new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"response","response",-1068424192),response);
}
}catch (e47627){if((e47627 instanceof Object)){
var e = e47627;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [false,ajax.core.exception_response.call(null,e,status,format__$1,xhrio)], null);
} else {
throw e47627;

}
}
}
}catch (e47625){if((e47625 instanceof Object)){
var e = e47625;
var message = e.message;
return ajax.core.fail.call(null,(0),message,new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"exception","exception",-335277064),e);
} else {
throw e47625;

}
}});

ajax.core.ResponseFormat.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__16895__auto__,writer__16896__auto__,opts__16897__auto__){
var self__ = this;
var this__16895__auto____$1 = this;
var pr_pair__16898__auto__ = ((function (this__16895__auto____$1){
return (function (keyval__16899__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__16896__auto__,cljs.core.pr_writer,""," ","",opts__16897__auto__,keyval__16899__auto__);
});})(this__16895__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__16896__auto__,pr_pair__16898__auto__,"#ajax.core.ResponseFormat{",", ","}",opts__16897__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"read","read",1140058661),self__.read],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"description","description",-1428560544),self__.description],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"content-type","content-type",-508222634),self__.content_type],null))], null),self__.__extmap));
});

ajax.core.ResponseFormat.prototype.cljs$core$IIterable$ = true;

ajax.core.ResponseFormat.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__47611){
var self__ = this;
var G__47611__$1 = this;
return (new cljs.core.RecordIter((0),G__47611__$1,3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"read","read",1140058661),new cljs.core.Keyword(null,"description","description",-1428560544),new cljs.core.Keyword(null,"content-type","content-type",-508222634)], null),cljs.core._iterator.call(null,self__.__extmap)));
});

ajax.core.ResponseFormat.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__16879__auto__){
var self__ = this;
var this__16879__auto____$1 = this;
return self__.__meta;
});

ajax.core.ResponseFormat.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__16875__auto__){
var self__ = this;
var this__16875__auto____$1 = this;
return (new ajax.core.ResponseFormat(self__.read,self__.description,self__.content_type,self__.__meta,self__.__extmap,self__.__hash));
});

ajax.core.ResponseFormat.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__16885__auto__){
var self__ = this;
var this__16885__auto____$1 = this;
return (3 + cljs.core.count.call(null,self__.__extmap));
});

ajax.core.ResponseFormat.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__16876__auto__){
var self__ = this;
var this__16876__auto____$1 = this;
var h__16702__auto__ = self__.__hash;
if(!((h__16702__auto__ == null))){
return h__16702__auto__;
} else {
var h__16702__auto____$1 = cljs.core.hash_imap.call(null,this__16876__auto____$1);
self__.__hash = h__16702__auto____$1;

return h__16702__auto____$1;
}
});

ajax.core.ResponseFormat.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__16877__auto__,other__16878__auto__){
var self__ = this;
var this__16877__auto____$1 = this;
if(cljs.core.truth_((function (){var and__16255__auto__ = other__16878__auto__;
if(cljs.core.truth_(and__16255__auto__)){
var and__16255__auto____$1 = (this__16877__auto____$1.constructor === other__16878__auto__.constructor);
if(and__16255__auto____$1){
return cljs.core.equiv_map.call(null,this__16877__auto____$1,other__16878__auto__);
} else {
return and__16255__auto____$1;
}
} else {
return and__16255__auto__;
}
})())){
return true;
} else {
return false;
}
});

ajax.core.ResponseFormat.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__16890__auto__,k__16891__auto__){
var self__ = this;
var this__16890__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"description","description",-1428560544),null,new cljs.core.Keyword(null,"read","read",1140058661),null,new cljs.core.Keyword(null,"content-type","content-type",-508222634),null], null), null),k__16891__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__16890__auto____$1),self__.__meta),k__16891__auto__);
} else {
return (new ajax.core.ResponseFormat(self__.read,self__.description,self__.content_type,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__16891__auto__)),null));
}
});

ajax.core.ResponseFormat.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__16888__auto__,k__16889__auto__,G__47611){
var self__ = this;
var this__16888__auto____$1 = this;
var pred__47628 = cljs.core.keyword_identical_QMARK_;
var expr__47629 = k__16889__auto__;
if(cljs.core.truth_(pred__47628.call(null,new cljs.core.Keyword(null,"read","read",1140058661),expr__47629))){
return (new ajax.core.ResponseFormat(G__47611,self__.description,self__.content_type,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__47628.call(null,new cljs.core.Keyword(null,"description","description",-1428560544),expr__47629))){
return (new ajax.core.ResponseFormat(self__.read,G__47611,self__.content_type,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__47628.call(null,new cljs.core.Keyword(null,"content-type","content-type",-508222634),expr__47629))){
return (new ajax.core.ResponseFormat(self__.read,self__.description,G__47611,self__.__meta,self__.__extmap,null));
} else {
return (new ajax.core.ResponseFormat(self__.read,self__.description,self__.content_type,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__16889__auto__,G__47611),null));
}
}
}
});

ajax.core.ResponseFormat.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__16893__auto__){
var self__ = this;
var this__16893__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"read","read",1140058661),self__.read],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"description","description",-1428560544),self__.description],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"content-type","content-type",-508222634),self__.content_type],null))], null),self__.__extmap));
});

ajax.core.ResponseFormat.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__16880__auto__,G__47611){
var self__ = this;
var this__16880__auto____$1 = this;
return (new ajax.core.ResponseFormat(self__.read,self__.description,self__.content_type,G__47611,self__.__extmap,self__.__hash));
});

ajax.core.ResponseFormat.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__16886__auto__,entry__16887__auto__){
var self__ = this;
var this__16886__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__16887__auto__)){
return cljs.core._assoc.call(null,this__16886__auto____$1,cljs.core._nth.call(null,entry__16887__auto__,(0)),cljs.core._nth.call(null,entry__16887__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__16886__auto____$1,entry__16887__auto__);
}
});

ajax.core.ResponseFormat.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"read","read",-1514377108,null),new cljs.core.Symbol(null,"description","description",211970983,null),new cljs.core.Symbol(null,"content-type","content-type",1132308893,null)], null);
});

ajax.core.ResponseFormat.cljs$lang$type = true;

ajax.core.ResponseFormat.cljs$lang$ctorPrSeq = (function (this__16915__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"ajax.core/ResponseFormat");
});

ajax.core.ResponseFormat.cljs$lang$ctorPrWriter = (function (this__16915__auto__,writer__16916__auto__){
return cljs.core._write.call(null,writer__16916__auto__,"ajax.core/ResponseFormat");
});

ajax.core.__GT_ResponseFormat = (function ajax$core$__GT_ResponseFormat(read,description,content_type){
return (new ajax.core.ResponseFormat(read,description,content_type,null,null,null));
});

ajax.core.map__GT_ResponseFormat = (function ajax$core$map__GT_ResponseFormat(G__47613){
return (new ajax.core.ResponseFormat(new cljs.core.Keyword(null,"read","read",1140058661).cljs$core$IFn$_invoke$arity$1(G__47613),new cljs.core.Keyword(null,"description","description",-1428560544).cljs$core$IFn$_invoke$arity$1(G__47613),new cljs.core.Keyword(null,"content-type","content-type",-508222634).cljs$core$IFn$_invoke$arity$1(G__47613),null,cljs.core.dissoc.call(null,G__47613,new cljs.core.Keyword(null,"read","read",1140058661),new cljs.core.Keyword(null,"description","description",-1428560544),new cljs.core.Keyword(null,"content-type","content-type",-508222634)),null));
});

ajax.core.params_to_str_old = (function ajax$core$params_to_str_old(params){
if(cljs.core.truth_(params)){
return goog.Uri.QueryData.createFromMap((new goog.structs.Map(cljs.core.clj__GT_js.call(null,params)))).toString();
} else {
return null;
}
});
ajax.core.param_to_str;
ajax.core.vec_param_to_str = (function ajax$core$vec_param_to_str(var_args){
var args47633 = [];
var len__17325__auto___47636 = arguments.length;
var i__17326__auto___47637 = (0);
while(true){
if((i__17326__auto___47637 < len__17325__auto___47636)){
args47633.push((arguments[i__17326__auto___47637]));

var G__47638 = (i__17326__auto___47637 + (1));
i__17326__auto___47637 = G__47638;
continue;
} else {
}
break;
}

var G__47635 = args47633.length;
switch (G__47635) {
case 3:
return ajax.core.vec_param_to_str.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return ajax.core.vec_param_to_str.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return ajax.core.vec_param_to_str.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47633.length)].join('')));

}
});

ajax.core.vec_param_to_str.cljs$core$IFn$_invoke$arity$3 = (function (prefix,key,value){
return ajax.core.param_to_str.call(null,prefix,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key,value], null));
});

ajax.core.vec_param_to_str.cljs$core$IFn$_invoke$arity$2 = (function (prefix,key){
return (function (value){
return ajax.core.param_to_str.call(null,prefix,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key,value], null));
});
});

ajax.core.vec_param_to_str.cljs$core$IFn$_invoke$arity$1 = (function (prefix){
return (function (key,value){
return ajax.core.param_to_str.call(null,prefix,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key,value], null));
});
});

ajax.core.vec_param_to_str.cljs$lang$maxFixedArity = 3;
ajax.core.param_to_str = (function ajax$core$param_to_str(var_args){
var args47640 = [];
var len__17325__auto___47647 = arguments.length;
var i__17326__auto___47648 = (0);
while(true){
if((i__17326__auto___47648 < len__17325__auto___47647)){
args47640.push((arguments[i__17326__auto___47648]));

var G__47649 = (i__17326__auto___47648 + (1));
i__17326__auto___47648 = G__47649;
continue;
} else {
}
break;
}

var G__47642 = args47640.length;
switch (G__47642) {
case 2:
return ajax.core.param_to_str.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return ajax.core.param_to_str.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47640.length)].join('')));

}
});

ajax.core.param_to_str.cljs$core$IFn$_invoke$arity$2 = (function (prefix,p__47643){
var vec__47644 = p__47643;
var key = cljs.core.nth.call(null,vec__47644,(0),null);
var value = cljs.core.nth.call(null,vec__47644,(1),null);
var k1 = (((key instanceof cljs.core.Keyword))?cljs.core.name.call(null,key):key);
var new_key = (cljs.core.truth_(prefix)?[cljs.core.str(prefix),cljs.core.str("["),cljs.core.str(k1),cljs.core.str("]")].join(''):k1);
if(typeof value === 'string'){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_key,value], null)], null);
} else {
if(cljs.core.map_QMARK_.call(null,value)){
return cljs.core.mapcat.call(null,ajax.core.param_to_str.call(null,new_key),cljs.core.seq.call(null,value));
} else {
if(cljs.core.sequential_QMARK_.call(null,value)){
return cljs.core.apply.call(null,cljs.core.concat,cljs.core.map_indexed.call(null,ajax.core.vec_param_to_str.call(null,new_key),cljs.core.seq.call(null,value)));
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_key,value], null)], null);

}
}
}
});

ajax.core.param_to_str.cljs$core$IFn$_invoke$arity$1 = (function (prefix){
return (function (p__47645){
var vec__47646 = p__47645;
var key = cljs.core.nth.call(null,vec__47646,(0),null);
var value = cljs.core.nth.call(null,vec__47646,(1),null);
var k1 = (((key instanceof cljs.core.Keyword))?cljs.core.name.call(null,key):key);
var new_key = (cljs.core.truth_(prefix)?[cljs.core.str(prefix),cljs.core.str("["),cljs.core.str(k1),cljs.core.str("]")].join(''):k1);
if(typeof value === 'string'){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_key,value], null)], null);
} else {
if(cljs.core.map_QMARK_.call(null,value)){
return cljs.core.mapcat.call(null,ajax.core.param_to_str.call(null,new_key),cljs.core.seq.call(null,value));
} else {
if(cljs.core.sequential_QMARK_.call(null,value)){
return cljs.core.apply.call(null,cljs.core.concat,cljs.core.map_indexed.call(null,ajax.core.vec_param_to_str.call(null,new_key),cljs.core.seq.call(null,value)));
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_key,value], null)], null);

}
}
}
});
});

ajax.core.param_to_str.cljs$lang$maxFixedArity = 2;
ajax.core.to_utf8_writer = (function ajax$core$to_utf8_writer(to_str){
return to_str;
});
ajax.core.params_to_str = (function ajax$core$params_to_str(params){
return clojure.string.join.call(null,"&",cljs.core.map.call(null,(function (p__47653){
var vec__47654 = p__47653;
var k = cljs.core.nth.call(null,vec__47654,(0),null);
var v = cljs.core.nth.call(null,vec__47654,(1),null);
return [cljs.core.str(k),cljs.core.str("="),cljs.core.str(v)].join('');
}),cljs.core.mapcat.call(null,ajax.core.param_to_str.call(null,null),cljs.core.seq.call(null,params))));
});
ajax.core.uri_with_params = (function ajax$core$uri_with_params(uri,params){
if(cljs.core.truth_(params)){
return [cljs.core.str(uri),cljs.core.str((cljs.core.truth_(cljs.core.re_find.call(null,/\?/,uri))?"&":"?")),cljs.core.str(ajax.core.params_to_str.call(null,params))].join('');
} else {
return uri;
}
});
ajax.core.get_request_format = (function ajax$core$get_request_format(format){
if(cljs.core.map_QMARK_.call(null,format)){
return format;
} else {
if(cljs.core.ifn_QMARK_.call(null,format)){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"write","write",-1857649168),format,new cljs.core.Keyword(null,"content-type","content-type",-508222634),"text/plain"], null);
} else {
return cljs.core.PersistentArrayMap.EMPTY;

}
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {ajax.protocols.Interceptor}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
ajax.core.ProcessGet = (function (__meta,__extmap,__hash){
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
ajax.core.ProcessGet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__16881__auto__,k__16882__auto__){
var self__ = this;
var this__16881__auto____$1 = this;
return cljs.core._lookup.call(null,this__16881__auto____$1,k__16882__auto__,null);
});

ajax.core.ProcessGet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__16883__auto__,k47657,else__16884__auto__){
var self__ = this;
var this__16883__auto____$1 = this;
var G__47659 = k47657;
switch (G__47659) {
default:
return cljs.core.get.call(null,self__.__extmap,k47657,else__16884__auto__);

}
});

ajax.core.ProcessGet.prototype.ajax$protocols$Interceptor$ = true;

ajax.core.ProcessGet.prototype.ajax$protocols$Interceptor$_process_request$arity$2 = (function (_,p__47660){
var self__ = this;
var map__47661 = p__47660;
var map__47661__$1 = ((((!((map__47661 == null)))?((((map__47661.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47661.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47661):map__47661);
var request = map__47661__$1;
var method = cljs.core.get.call(null,map__47661__$1,new cljs.core.Keyword(null,"method","method",55703592));
var ___$1 = this;
if(cljs.core._EQ_.call(null,method,"GET")){
return cljs.core.reduced.call(null,cljs.core.update.call(null,request,new cljs.core.Keyword(null,"uri","uri",-774711847),((function (___$1,map__47661,map__47661__$1,request,method){
return (function (p1__47655_SHARP_){
return ajax.core.uri_with_params.call(null,p1__47655_SHARP_,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(request));
});})(___$1,map__47661,map__47661__$1,request,method))
));
} else {
return request;
}
});

ajax.core.ProcessGet.prototype.ajax$protocols$Interceptor$_process_response$arity$2 = (function (_,response){
var self__ = this;
var ___$1 = this;
return response;
});

ajax.core.ProcessGet.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__16895__auto__,writer__16896__auto__,opts__16897__auto__){
var self__ = this;
var this__16895__auto____$1 = this;
var pr_pair__16898__auto__ = ((function (this__16895__auto____$1){
return (function (keyval__16899__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__16896__auto__,cljs.core.pr_writer,""," ","",opts__16897__auto__,keyval__16899__auto__);
});})(this__16895__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__16896__auto__,pr_pair__16898__auto__,"#ajax.core.ProcessGet{",", ","}",opts__16897__auto__,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});

ajax.core.ProcessGet.prototype.cljs$core$IIterable$ = true;

ajax.core.ProcessGet.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__47656){
var self__ = this;
var G__47656__$1 = this;
return (new cljs.core.RecordIter((0),G__47656__$1,0,cljs.core.PersistentVector.EMPTY,cljs.core._iterator.call(null,self__.__extmap)));
});

ajax.core.ProcessGet.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__16879__auto__){
var self__ = this;
var this__16879__auto____$1 = this;
return self__.__meta;
});

ajax.core.ProcessGet.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__16875__auto__){
var self__ = this;
var this__16875__auto____$1 = this;
return (new ajax.core.ProcessGet(self__.__meta,self__.__extmap,self__.__hash));
});

ajax.core.ProcessGet.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__16885__auto__){
var self__ = this;
var this__16885__auto____$1 = this;
return (0 + cljs.core.count.call(null,self__.__extmap));
});

ajax.core.ProcessGet.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__16876__auto__){
var self__ = this;
var this__16876__auto____$1 = this;
var h__16702__auto__ = self__.__hash;
if(!((h__16702__auto__ == null))){
return h__16702__auto__;
} else {
var h__16702__auto____$1 = cljs.core.hash_imap.call(null,this__16876__auto____$1);
self__.__hash = h__16702__auto____$1;

return h__16702__auto____$1;
}
});

ajax.core.ProcessGet.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__16877__auto__,other__16878__auto__){
var self__ = this;
var this__16877__auto____$1 = this;
if(cljs.core.truth_((function (){var and__16255__auto__ = other__16878__auto__;
if(cljs.core.truth_(and__16255__auto__)){
var and__16255__auto____$1 = (this__16877__auto____$1.constructor === other__16878__auto__.constructor);
if(and__16255__auto____$1){
return cljs.core.equiv_map.call(null,this__16877__auto____$1,other__16878__auto__);
} else {
return and__16255__auto____$1;
}
} else {
return and__16255__auto__;
}
})())){
return true;
} else {
return false;
}
});

ajax.core.ProcessGet.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__16890__auto__,k__16891__auto__){
var self__ = this;
var this__16890__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.EMPTY,k__16891__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__16890__auto____$1),self__.__meta),k__16891__auto__);
} else {
return (new ajax.core.ProcessGet(self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__16891__auto__)),null));
}
});

ajax.core.ProcessGet.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__16888__auto__,k__16889__auto__,G__47656){
var self__ = this;
var this__16888__auto____$1 = this;
var pred__47663 = cljs.core.keyword_identical_QMARK_;
var expr__47664 = k__16889__auto__;
return (new ajax.core.ProcessGet(self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__16889__auto__,G__47656),null));
});

ajax.core.ProcessGet.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__16893__auto__){
var self__ = this;
var this__16893__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});

ajax.core.ProcessGet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__16880__auto__,G__47656){
var self__ = this;
var this__16880__auto____$1 = this;
return (new ajax.core.ProcessGet(G__47656,self__.__extmap,self__.__hash));
});

ajax.core.ProcessGet.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__16886__auto__,entry__16887__auto__){
var self__ = this;
var this__16886__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__16887__auto__)){
return cljs.core._assoc.call(null,this__16886__auto____$1,cljs.core._nth.call(null,entry__16887__auto__,(0)),cljs.core._nth.call(null,entry__16887__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__16886__auto____$1,entry__16887__auto__);
}
});

ajax.core.ProcessGet.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

ajax.core.ProcessGet.cljs$lang$type = true;

ajax.core.ProcessGet.cljs$lang$ctorPrSeq = (function (this__16915__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"ajax.core/ProcessGet");
});

ajax.core.ProcessGet.cljs$lang$ctorPrWriter = (function (this__16915__auto__,writer__16916__auto__){
return cljs.core._write.call(null,writer__16916__auto__,"ajax.core/ProcessGet");
});

ajax.core.__GT_ProcessGet = (function ajax$core$__GT_ProcessGet(){
return (new ajax.core.ProcessGet(null,null,null));
});

ajax.core.map__GT_ProcessGet = (function ajax$core$map__GT_ProcessGet(G__47658){
return (new ajax.core.ProcessGet(null,cljs.core.dissoc.call(null,G__47658),null));
});

ajax.core.throw_error = (function ajax$core$throw_error(args){
throw (new Error([cljs.core.str(args)].join('')));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {ajax.protocols.Interceptor}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
ajax.core.DirectSubmission = (function (__meta,__extmap,__hash){
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
ajax.core.DirectSubmission.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__16881__auto__,k__16882__auto__){
var self__ = this;
var this__16881__auto____$1 = this;
return cljs.core._lookup.call(null,this__16881__auto____$1,k__16882__auto__,null);
});

ajax.core.DirectSubmission.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__16883__auto__,k47668,else__16884__auto__){
var self__ = this;
var this__16883__auto____$1 = this;
var G__47670 = k47668;
switch (G__47670) {
default:
return cljs.core.get.call(null,self__.__extmap,k47668,else__16884__auto__);

}
});

ajax.core.DirectSubmission.prototype.ajax$protocols$Interceptor$ = true;

ajax.core.DirectSubmission.prototype.ajax$protocols$Interceptor$_process_request$arity$2 = (function (_,p__47671){
var self__ = this;
var map__47672 = p__47671;
var map__47672__$1 = ((((!((map__47672 == null)))?((((map__47672.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47672.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47672):map__47672);
var request = map__47672__$1;
var body = cljs.core.get.call(null,map__47672__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var params = cljs.core.get.call(null,map__47672__$1,new cljs.core.Keyword(null,"params","params",710516235));
var ___$1 = this;
if((body == null)){
return request;
} else {
return cljs.core.reduced.call(null,request);
}
});

ajax.core.DirectSubmission.prototype.ajax$protocols$Interceptor$_process_response$arity$2 = (function (_,response){
var self__ = this;
var ___$1 = this;
return response;
});

ajax.core.DirectSubmission.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__16895__auto__,writer__16896__auto__,opts__16897__auto__){
var self__ = this;
var this__16895__auto____$1 = this;
var pr_pair__16898__auto__ = ((function (this__16895__auto____$1){
return (function (keyval__16899__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__16896__auto__,cljs.core.pr_writer,""," ","",opts__16897__auto__,keyval__16899__auto__);
});})(this__16895__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__16896__auto__,pr_pair__16898__auto__,"#ajax.core.DirectSubmission{",", ","}",opts__16897__auto__,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});

ajax.core.DirectSubmission.prototype.cljs$core$IIterable$ = true;

ajax.core.DirectSubmission.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__47667){
var self__ = this;
var G__47667__$1 = this;
return (new cljs.core.RecordIter((0),G__47667__$1,0,cljs.core.PersistentVector.EMPTY,cljs.core._iterator.call(null,self__.__extmap)));
});

ajax.core.DirectSubmission.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__16879__auto__){
var self__ = this;
var this__16879__auto____$1 = this;
return self__.__meta;
});

ajax.core.DirectSubmission.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__16875__auto__){
var self__ = this;
var this__16875__auto____$1 = this;
return (new ajax.core.DirectSubmission(self__.__meta,self__.__extmap,self__.__hash));
});

ajax.core.DirectSubmission.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__16885__auto__){
var self__ = this;
var this__16885__auto____$1 = this;
return (0 + cljs.core.count.call(null,self__.__extmap));
});

ajax.core.DirectSubmission.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__16876__auto__){
var self__ = this;
var this__16876__auto____$1 = this;
var h__16702__auto__ = self__.__hash;
if(!((h__16702__auto__ == null))){
return h__16702__auto__;
} else {
var h__16702__auto____$1 = cljs.core.hash_imap.call(null,this__16876__auto____$1);
self__.__hash = h__16702__auto____$1;

return h__16702__auto____$1;
}
});

ajax.core.DirectSubmission.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__16877__auto__,other__16878__auto__){
var self__ = this;
var this__16877__auto____$1 = this;
if(cljs.core.truth_((function (){var and__16255__auto__ = other__16878__auto__;
if(cljs.core.truth_(and__16255__auto__)){
var and__16255__auto____$1 = (this__16877__auto____$1.constructor === other__16878__auto__.constructor);
if(and__16255__auto____$1){
return cljs.core.equiv_map.call(null,this__16877__auto____$1,other__16878__auto__);
} else {
return and__16255__auto____$1;
}
} else {
return and__16255__auto__;
}
})())){
return true;
} else {
return false;
}
});

ajax.core.DirectSubmission.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__16890__auto__,k__16891__auto__){
var self__ = this;
var this__16890__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.EMPTY,k__16891__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__16890__auto____$1),self__.__meta),k__16891__auto__);
} else {
return (new ajax.core.DirectSubmission(self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__16891__auto__)),null));
}
});

ajax.core.DirectSubmission.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__16888__auto__,k__16889__auto__,G__47667){
var self__ = this;
var this__16888__auto____$1 = this;
var pred__47674 = cljs.core.keyword_identical_QMARK_;
var expr__47675 = k__16889__auto__;
return (new ajax.core.DirectSubmission(self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__16889__auto__,G__47667),null));
});

ajax.core.DirectSubmission.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__16893__auto__){
var self__ = this;
var this__16893__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});

ajax.core.DirectSubmission.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__16880__auto__,G__47667){
var self__ = this;
var this__16880__auto____$1 = this;
return (new ajax.core.DirectSubmission(G__47667,self__.__extmap,self__.__hash));
});

ajax.core.DirectSubmission.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__16886__auto__,entry__16887__auto__){
var self__ = this;
var this__16886__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__16887__auto__)){
return cljs.core._assoc.call(null,this__16886__auto____$1,cljs.core._nth.call(null,entry__16887__auto__,(0)),cljs.core._nth.call(null,entry__16887__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__16886__auto____$1,entry__16887__auto__);
}
});

ajax.core.DirectSubmission.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

ajax.core.DirectSubmission.cljs$lang$type = true;

ajax.core.DirectSubmission.cljs$lang$ctorPrSeq = (function (this__16915__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"ajax.core/DirectSubmission");
});

ajax.core.DirectSubmission.cljs$lang$ctorPrWriter = (function (this__16915__auto__,writer__16916__auto__){
return cljs.core._write.call(null,writer__16916__auto__,"ajax.core/DirectSubmission");
});

ajax.core.__GT_DirectSubmission = (function ajax$core$__GT_DirectSubmission(){
return (new ajax.core.DirectSubmission(null,null,null));
});

ajax.core.map__GT_DirectSubmission = (function ajax$core$map__GT_DirectSubmission(G__47669){
return (new ajax.core.DirectSubmission(null,cljs.core.dissoc.call(null,G__47669),null));
});

ajax.core.apply_request_format = (function ajax$core$apply_request_format(write,params){
return write.call(null,params);
});
ajax.core.content_type_to_request_header = (function ajax$core$content_type_to_request_header(content_type){
return clojure.string.join.call(null,", ",cljs.core.map.call(null,(function (p1__47678_SHARP_){
return [cljs.core.str(p1__47678_SHARP_),cljs.core.str("; charset=utf-8")].join('');
}),((typeof content_type === 'string')?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [content_type], null):content_type)));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {ajax.protocols.Interceptor}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
ajax.core.ApplyRequestFormat = (function (__meta,__extmap,__hash){
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
ajax.core.ApplyRequestFormat.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__16881__auto__,k__16882__auto__){
var self__ = this;
var this__16881__auto____$1 = this;
return cljs.core._lookup.call(null,this__16881__auto____$1,k__16882__auto__,null);
});

ajax.core.ApplyRequestFormat.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__16883__auto__,k47680,else__16884__auto__){
var self__ = this;
var this__16883__auto____$1 = this;
var G__47682 = k47680;
switch (G__47682) {
default:
return cljs.core.get.call(null,self__.__extmap,k47680,else__16884__auto__);

}
});

ajax.core.ApplyRequestFormat.prototype.ajax$protocols$Interceptor$ = true;

ajax.core.ApplyRequestFormat.prototype.ajax$protocols$Interceptor$_process_request$arity$2 = (function (_,p__47683){
var self__ = this;
var map__47684 = p__47683;
var map__47684__$1 = ((((!((map__47684 == null)))?((((map__47684.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47684.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47684):map__47684);
var request = map__47684__$1;
var uri = cljs.core.get.call(null,map__47684__$1,new cljs.core.Keyword(null,"uri","uri",-774711847));
var method = cljs.core.get.call(null,map__47684__$1,new cljs.core.Keyword(null,"method","method",55703592));
var format = cljs.core.get.call(null,map__47684__$1,new cljs.core.Keyword(null,"format","format",-1306924766));
var params = cljs.core.get.call(null,map__47684__$1,new cljs.core.Keyword(null,"params","params",710516235));
var headers = cljs.core.get.call(null,map__47684__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var ___$1 = this;
var map__47686 = ajax.core.get_request_format.call(null,format);
var map__47686__$1 = ((((!((map__47686 == null)))?((((map__47686.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47686.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47686):map__47686);
var write = cljs.core.get.call(null,map__47686__$1,new cljs.core.Keyword(null,"write","write",-1857649168));
var content_type = cljs.core.get.call(null,map__47686__$1,new cljs.core.Keyword(null,"content-type","content-type",-508222634));
var body = ((!((write == null)))?ajax.core.apply_request_format.call(null,write,params):ajax.core.throw_error.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["unrecognized request format: ",format], null)));
var headers__$1 = (function (){var or__16267__auto__ = headers;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return cljs.core.assoc.call(null,request,new cljs.core.Keyword(null,"body","body",-2049205669),body,new cljs.core.Keyword(null,"headers","headers",-835030129),(cljs.core.truth_(content_type)?cljs.core.assoc.call(null,headers__$1,"Content-Type",ajax.core.content_type_to_request_header.call(null,content_type)):headers__$1));
});

ajax.core.ApplyRequestFormat.prototype.ajax$protocols$Interceptor$_process_response$arity$2 = (function (_,xhrio){
var self__ = this;
var ___$1 = this;
return xhrio;
});

ajax.core.ApplyRequestFormat.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__16895__auto__,writer__16896__auto__,opts__16897__auto__){
var self__ = this;
var this__16895__auto____$1 = this;
var pr_pair__16898__auto__ = ((function (this__16895__auto____$1){
return (function (keyval__16899__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__16896__auto__,cljs.core.pr_writer,""," ","",opts__16897__auto__,keyval__16899__auto__);
});})(this__16895__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__16896__auto__,pr_pair__16898__auto__,"#ajax.core.ApplyRequestFormat{",", ","}",opts__16897__auto__,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});

ajax.core.ApplyRequestFormat.prototype.cljs$core$IIterable$ = true;

ajax.core.ApplyRequestFormat.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__47679){
var self__ = this;
var G__47679__$1 = this;
return (new cljs.core.RecordIter((0),G__47679__$1,0,cljs.core.PersistentVector.EMPTY,cljs.core._iterator.call(null,self__.__extmap)));
});

ajax.core.ApplyRequestFormat.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__16879__auto__){
var self__ = this;
var this__16879__auto____$1 = this;
return self__.__meta;
});

ajax.core.ApplyRequestFormat.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__16875__auto__){
var self__ = this;
var this__16875__auto____$1 = this;
return (new ajax.core.ApplyRequestFormat(self__.__meta,self__.__extmap,self__.__hash));
});

ajax.core.ApplyRequestFormat.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__16885__auto__){
var self__ = this;
var this__16885__auto____$1 = this;
return (0 + cljs.core.count.call(null,self__.__extmap));
});

ajax.core.ApplyRequestFormat.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__16876__auto__){
var self__ = this;
var this__16876__auto____$1 = this;
var h__16702__auto__ = self__.__hash;
if(!((h__16702__auto__ == null))){
return h__16702__auto__;
} else {
var h__16702__auto____$1 = cljs.core.hash_imap.call(null,this__16876__auto____$1);
self__.__hash = h__16702__auto____$1;

return h__16702__auto____$1;
}
});

ajax.core.ApplyRequestFormat.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__16877__auto__,other__16878__auto__){
var self__ = this;
var this__16877__auto____$1 = this;
if(cljs.core.truth_((function (){var and__16255__auto__ = other__16878__auto__;
if(cljs.core.truth_(and__16255__auto__)){
var and__16255__auto____$1 = (this__16877__auto____$1.constructor === other__16878__auto__.constructor);
if(and__16255__auto____$1){
return cljs.core.equiv_map.call(null,this__16877__auto____$1,other__16878__auto__);
} else {
return and__16255__auto____$1;
}
} else {
return and__16255__auto__;
}
})())){
return true;
} else {
return false;
}
});

ajax.core.ApplyRequestFormat.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__16890__auto__,k__16891__auto__){
var self__ = this;
var this__16890__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.EMPTY,k__16891__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__16890__auto____$1),self__.__meta),k__16891__auto__);
} else {
return (new ajax.core.ApplyRequestFormat(self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__16891__auto__)),null));
}
});

ajax.core.ApplyRequestFormat.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__16888__auto__,k__16889__auto__,G__47679){
var self__ = this;
var this__16888__auto____$1 = this;
var pred__47688 = cljs.core.keyword_identical_QMARK_;
var expr__47689 = k__16889__auto__;
return (new ajax.core.ApplyRequestFormat(self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__16889__auto__,G__47679),null));
});

ajax.core.ApplyRequestFormat.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__16893__auto__){
var self__ = this;
var this__16893__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});

ajax.core.ApplyRequestFormat.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__16880__auto__,G__47679){
var self__ = this;
var this__16880__auto____$1 = this;
return (new ajax.core.ApplyRequestFormat(G__47679,self__.__extmap,self__.__hash));
});

ajax.core.ApplyRequestFormat.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__16886__auto__,entry__16887__auto__){
var self__ = this;
var this__16886__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__16887__auto__)){
return cljs.core._assoc.call(null,this__16886__auto____$1,cljs.core._nth.call(null,entry__16887__auto__,(0)),cljs.core._nth.call(null,entry__16887__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__16886__auto____$1,entry__16887__auto__);
}
});

ajax.core.ApplyRequestFormat.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

ajax.core.ApplyRequestFormat.cljs$lang$type = true;

ajax.core.ApplyRequestFormat.cljs$lang$ctorPrSeq = (function (this__16915__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"ajax.core/ApplyRequestFormat");
});

ajax.core.ApplyRequestFormat.cljs$lang$ctorPrWriter = (function (this__16915__auto__,writer__16916__auto__){
return cljs.core._write.call(null,writer__16916__auto__,"ajax.core/ApplyRequestFormat");
});

ajax.core.__GT_ApplyRequestFormat = (function ajax$core$__GT_ApplyRequestFormat(){
return (new ajax.core.ApplyRequestFormat(null,null,null));
});

ajax.core.map__GT_ApplyRequestFormat = (function ajax$core$map__GT_ApplyRequestFormat(G__47681){
return (new ajax.core.ApplyRequestFormat(null,cljs.core.dissoc.call(null,G__47681),null));
});

ajax.core.transit_type = (function ajax$core$transit_type(p__47692){
var map__47695 = p__47692;
var map__47695__$1 = ((((!((map__47695 == null)))?((((map__47695.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47695.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47695):map__47695);
var type = cljs.core.get.call(null,map__47695__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var or__16267__auto__ = type;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return new cljs.core.Keyword(null,"json","json",1279968570);
}
});
ajax.core.transit_write_fn = (function ajax$core$transit_write_fn(type,request){
var writer = (function (){var or__16267__auto__ = new cljs.core.Keyword(null,"writer","writer",-277568236).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return cognitect.transit.writer.call(null,type,request);
}
})();
return ((function (writer){
return (function ajax$core$transit_write_fn_$_transit_write_params(params){
return cognitect.transit.write.call(null,writer,params);
});
;})(writer))
});
ajax.core.transit_request_format = (function ajax$core$transit_request_format(var_args){
var args47697 = [];
var len__17325__auto___47700 = arguments.length;
var i__17326__auto___47701 = (0);
while(true){
if((i__17326__auto___47701 < len__17325__auto___47700)){
args47697.push((arguments[i__17326__auto___47701]));

var G__47702 = (i__17326__auto___47701 + (1));
i__17326__auto___47701 = G__47702;
continue;
} else {
}
break;
}

var G__47699 = args47697.length;
switch (G__47699) {
case 0:
return ajax.core.transit_request_format.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return ajax.core.transit_request_format.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47697.length)].join('')));

}
});

ajax.core.transit_request_format.cljs$core$IFn$_invoke$arity$0 = (function (){
return ajax.core.transit_request_format.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

ajax.core.transit_request_format.cljs$core$IFn$_invoke$arity$1 = (function (request){
var type = ajax.core.transit_type.call(null,request);
var mime_type = ((cljs.core._EQ_.call(null,type,new cljs.core.Keyword(null,"json","json",1279968570)))?"json":"msgpack");
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"write","write",-1857649168),ajax.core.transit_write_fn.call(null,type,request),new cljs.core.Keyword(null,"content-type","content-type",-508222634),[cljs.core.str("application/transit+"),cljs.core.str(mime_type)].join('')], null);
});

ajax.core.transit_request_format.cljs$lang$maxFixedArity = 1;
ajax.core.transit_read_fn = (function ajax$core$transit_read_fn(request){
var reader = (function (){var or__16267__auto__ = new cljs.core.Keyword(null,"reader","reader",169660853).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return cognitect.transit.reader.call(null,new cljs.core.Keyword(null,"json","json",1279968570),request);
}
})();
return ((function (reader){
return (function ajax$core$transit_read_fn_$_transit_read_response(response){
var data = cognitect.transit.read.call(null,reader,ajax.protocols._body.call(null,response));
if(cljs.core.truth_(new cljs.core.Keyword(null,"raw","raw",1604651272).cljs$core$IFn$_invoke$arity$1(request))){
return data;
} else {
return cljs.core.js__GT_clj.call(null,data);
}
});
;})(reader))
});
ajax.core.transit_response_format = (function ajax$core$transit_response_format(var_args){
var args47704 = [];
var len__17325__auto___47707 = arguments.length;
var i__17326__auto___47708 = (0);
while(true){
if((i__17326__auto___47708 < len__17325__auto___47707)){
args47704.push((arguments[i__17326__auto___47708]));

var G__47709 = (i__17326__auto___47708 + (1));
i__17326__auto___47708 = G__47709;
continue;
} else {
}
break;
}

var G__47706 = args47704.length;
switch (G__47706) {
case 0:
return ajax.core.transit_response_format.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return ajax.core.transit_response_format.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ajax.core.transit_response_format.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47704.length)].join('')));

}
});

ajax.core.transit_response_format.cljs$core$IFn$_invoke$arity$0 = (function (){
return ajax.core.transit_response_format.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

ajax.core.transit_response_format.cljs$core$IFn$_invoke$arity$1 = (function (request){
return ajax.core.transit_response_format.call(null,ajax.core.transit_type.call(null,request),request);
});

ajax.core.transit_response_format.cljs$core$IFn$_invoke$arity$2 = (function (type,request){
return ajax.core.map__GT_ResponseFormat.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"read","read",1140058661),ajax.core.transit_read_fn.call(null,request),new cljs.core.Keyword(null,"description","description",-1428560544),"Transit",new cljs.core.Keyword(null,"content-type","content-type",-508222634),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["application/transit+json"], null)], null));
});

ajax.core.transit_response_format.cljs$lang$maxFixedArity = 2;
ajax.core.url_request_format = (function ajax$core$url_request_format(){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"write","write",-1857649168),ajax.core.to_utf8_writer.call(null,ajax.core.params_to_str),new cljs.core.Keyword(null,"content-type","content-type",-508222634),"application/x-www-form-urlencoded"], null);
});
ajax.core.raw_response_format = (function ajax$core$raw_response_format(var_args){
var args47711 = [];
var len__17325__auto___47714 = arguments.length;
var i__17326__auto___47715 = (0);
while(true){
if((i__17326__auto___47715 < len__17325__auto___47714)){
args47711.push((arguments[i__17326__auto___47715]));

var G__47716 = (i__17326__auto___47715 + (1));
i__17326__auto___47715 = G__47716;
continue;
} else {
}
break;
}

var G__47713 = args47711.length;
switch (G__47713) {
case 0:
return ajax.core.raw_response_format.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return ajax.core.raw_response_format.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47711.length)].join('')));

}
});

ajax.core.raw_response_format.cljs$core$IFn$_invoke$arity$0 = (function (){
return ajax.core.map__GT_ResponseFormat.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"read","read",1140058661),ajax.protocols._body,new cljs.core.Keyword(null,"description","description",-1428560544),"raw text",new cljs.core.Keyword(null,"content-type","content-type",-508222634),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["*/*"], null)], null));
});

ajax.core.raw_response_format.cljs$core$IFn$_invoke$arity$1 = (function (_){
return ajax.core.raw_response_format.call(null);
});

ajax.core.raw_response_format.cljs$lang$maxFixedArity = 1;
ajax.core.text_request_format = (function ajax$core$text_request_format(){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"write","write",-1857649168),ajax.core.to_utf8_writer.call(null,cljs.core.identity),new cljs.core.Keyword(null,"content-type","content-type",-508222634),"text/plain"], null);
});
ajax.core.text_response_format = ajax.core.raw_response_format;
ajax.core.write_json = (function ajax$core$write_json(data){
return (new goog.json.Serializer()).serialize(cljs.core.clj__GT_js.call(null,data));
});
ajax.core.json_request_format = (function ajax$core$json_request_format(){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"write","write",-1857649168),ajax.core.write_json,new cljs.core.Keyword(null,"content-type","content-type",-508222634),"application/json"], null);
});
ajax.core.strip_prefix = (function ajax$core$strip_prefix(prefix,text){
if(cljs.core.truth_((function (){var and__16255__auto__ = prefix;
if(cljs.core.truth_(and__16255__auto__)){
return cljs.core._EQ_.call(null,(0),text.indexOf(prefix));
} else {
return and__16255__auto__;
}
})())){
return text.substring(prefix.length);
} else {
return text;
}
});
ajax.core.json_read = (function ajax$core$json_read(var_args){
var args47718 = [];
var len__17325__auto___47721 = arguments.length;
var i__17326__auto___47722 = (0);
while(true){
if((i__17326__auto___47722 < len__17325__auto___47721)){
args47718.push((arguments[i__17326__auto___47722]));

var G__47723 = (i__17326__auto___47722 + (1));
i__17326__auto___47722 = G__47723;
continue;
} else {
}
break;
}

var G__47720 = args47718.length;
switch (G__47720) {
case 4:
return ajax.core.json_read.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 3:
return ajax.core.json_read.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return ajax.core.json_read.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return ajax.core.json_read.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47718.length)].join('')));

}
});

ajax.core.json_read.cljs$core$IFn$_invoke$arity$4 = (function (prefix,raw,keywords_QMARK_,xhrio){
var text = ajax.core.strip_prefix.call(null,prefix,ajax.protocols._body.call(null,xhrio));
var json = goog.json.parse(text);
if(cljs.core.truth_(raw)){
return json;
} else {
return cljs.core.js__GT_clj.call(null,json,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),keywords_QMARK_);
}
});

ajax.core.json_read.cljs$core$IFn$_invoke$arity$3 = (function (prefix,raw,keywords_QMARK_){
return (function (xhrio){
var text = ajax.core.strip_prefix.call(null,prefix,ajax.protocols._body.call(null,xhrio));
var json = goog.json.parse(text);
if(cljs.core.truth_(raw)){
return json;
} else {
return cljs.core.js__GT_clj.call(null,json,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),keywords_QMARK_);
}
});
});

ajax.core.json_read.cljs$core$IFn$_invoke$arity$2 = (function (prefix,raw){
return (function (keywords_QMARK_,xhrio){
var text = ajax.core.strip_prefix.call(null,prefix,ajax.protocols._body.call(null,xhrio));
var json = goog.json.parse(text);
if(cljs.core.truth_(raw)){
return json;
} else {
return cljs.core.js__GT_clj.call(null,json,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),keywords_QMARK_);
}
});
});

ajax.core.json_read.cljs$core$IFn$_invoke$arity$1 = (function (prefix){
return (function (raw,keywords_QMARK_,xhrio){
var text = ajax.core.strip_prefix.call(null,prefix,ajax.protocols._body.call(null,xhrio));
var json = goog.json.parse(text);
if(cljs.core.truth_(raw)){
return json;
} else {
return cljs.core.js__GT_clj.call(null,json,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),keywords_QMARK_);
}
});
});

ajax.core.json_read.cljs$lang$maxFixedArity = 4;
/**
 * Returns a JSON response format.  Options include
 * :keywords? Returns the keys as keywords
 * :prefix A prefix that needs to be stripped off.  This is to
 * combat JSON hijacking.  If you're using JSON with GET request,
 * you should think about using this.
 * http://stackoverflow.com/questions/2669690/why-does-google-prepend-while1-to-their-json-responses
 * http://haacked.com/archive/2009/06/24/json-hijacking.aspx
 */
ajax.core.json_response_format = (function ajax$core$json_response_format(var_args){
var args47725 = [];
var len__17325__auto___47731 = arguments.length;
var i__17326__auto___47732 = (0);
while(true){
if((i__17326__auto___47732 < len__17325__auto___47731)){
args47725.push((arguments[i__17326__auto___47732]));

var G__47733 = (i__17326__auto___47732 + (1));
i__17326__auto___47732 = G__47733;
continue;
} else {
}
break;
}

var G__47727 = args47725.length;
switch (G__47727) {
case 0:
return ajax.core.json_response_format.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return ajax.core.json_response_format.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47725.length)].join('')));

}
});

ajax.core.json_response_format.cljs$core$IFn$_invoke$arity$0 = (function (){
return ajax.core.json_response_format.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

ajax.core.json_response_format.cljs$core$IFn$_invoke$arity$1 = (function (p__47728){
var map__47729 = p__47728;
var map__47729__$1 = ((((!((map__47729 == null)))?((((map__47729.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47729.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47729):map__47729);
var prefix = cljs.core.get.call(null,map__47729__$1,new cljs.core.Keyword(null,"prefix","prefix",-265908465));
var keywords_QMARK_ = cljs.core.get.call(null,map__47729__$1,new cljs.core.Keyword(null,"keywords?","keywords?",764949733));
var raw = cljs.core.get.call(null,map__47729__$1,new cljs.core.Keyword(null,"raw","raw",1604651272));
return ajax.core.map__GT_ResponseFormat.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"read","read",1140058661),ajax.core.json_read.call(null,prefix,raw,keywords_QMARK_),new cljs.core.Keyword(null,"description","description",-1428560544),[cljs.core.str("JSON"),cljs.core.str((cljs.core.truth_(prefix)?[cljs.core.str(" prefix '"),cljs.core.str(prefix),cljs.core.str("'")].join(''):null)),cljs.core.str((cljs.core.truth_(keywords_QMARK_)?" keywordize":null))].join(''),new cljs.core.Keyword(null,"content-type","content-type",-508222634),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["application/json"], null)], null));
});

ajax.core.json_response_format.cljs$lang$maxFixedArity = 1;
ajax.core.default_formats = new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["application/json",ajax.core.json_response_format], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["application/transit+json",ajax.core.transit_response_format], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["application/transit+transit",ajax.core.transit_response_format], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["text/plain",ajax.core.text_response_format], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["text/html",ajax.core.text_response_format], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["*/*",ajax.core.raw_response_format], null)], null);
ajax.core.get_format = (function ajax$core$get_format(var_args){
var args47735 = [];
var len__17325__auto___47738 = arguments.length;
var i__17326__auto___47739 = (0);
while(true){
if((i__17326__auto___47739 < len__17325__auto___47738)){
args47735.push((arguments[i__17326__auto___47739]));

var G__47740 = (i__17326__auto___47739 + (1));
i__17326__auto___47739 = G__47740;
continue;
} else {
}
break;
}

var G__47737 = args47735.length;
switch (G__47737) {
case 2:
return ajax.core.get_format.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return ajax.core.get_format.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47735.length)].join('')));

}
});

ajax.core.get_format.cljs$core$IFn$_invoke$arity$2 = (function (request,format_entry){
if(((format_entry == null)) || (cljs.core.map_QMARK_.call(null,format_entry))){
return format_entry;
} else {
if(cljs.core.vector_QMARK_.call(null,format_entry)){
return ajax.core.get_format.call(null,request,cljs.core.second.call(null,format_entry));
} else {
return format_entry.call(null,request);

}
}
});

ajax.core.get_format.cljs$core$IFn$_invoke$arity$1 = (function (request){
return (function (format_entry){
if(((format_entry == null)) || (cljs.core.map_QMARK_.call(null,format_entry))){
return format_entry;
} else {
if(cljs.core.vector_QMARK_.call(null,format_entry)){
return ajax.core.get_format.call(null,request,cljs.core.second.call(null,format_entry));
} else {
return format_entry.call(null,request);

}
}
});
});

ajax.core.get_format.cljs$lang$maxFixedArity = 2;
ajax.core.get_accept_entries = (function ajax$core$get_accept_entries(var_args){
var args47742 = [];
var len__17325__auto___47745 = arguments.length;
var i__17326__auto___47746 = (0);
while(true){
if((i__17326__auto___47746 < len__17325__auto___47745)){
args47742.push((arguments[i__17326__auto___47746]));

var G__47747 = (i__17326__auto___47746 + (1));
i__17326__auto___47746 = G__47747;
continue;
} else {
}
break;
}

var G__47744 = args47742.length;
switch (G__47744) {
case 2:
return ajax.core.get_accept_entries.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return ajax.core.get_accept_entries.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47742.length)].join('')));

}
});

ajax.core.get_accept_entries.cljs$core$IFn$_invoke$arity$2 = (function (request,format_entry){
var fe = ((cljs.core.vector_QMARK_.call(null,format_entry))?cljs.core.first.call(null,format_entry):new cljs.core.Keyword(null,"content-type","content-type",-508222634).cljs$core$IFn$_invoke$arity$1(ajax.core.get_format.call(null,request,format_entry)));
if((fe == null)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["*/*"], null);
} else {
if(typeof fe === 'string'){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [fe], null);
} else {
return fe;

}
}
});

ajax.core.get_accept_entries.cljs$core$IFn$_invoke$arity$1 = (function (request){
return (function (format_entry){
var fe = ((cljs.core.vector_QMARK_.call(null,format_entry))?cljs.core.first.call(null,format_entry):new cljs.core.Keyword(null,"content-type","content-type",-508222634).cljs$core$IFn$_invoke$arity$1(ajax.core.get_format.call(null,request,format_entry)));
if((fe == null)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["*/*"], null);
} else {
if(typeof fe === 'string'){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [fe], null);
} else {
return fe;

}
}
});
});

ajax.core.get_accept_entries.cljs$lang$maxFixedArity = 2;
ajax.core.content_type_matches = (function ajax$core$content_type_matches(var_args){
var args47749 = [];
var len__17325__auto___47752 = arguments.length;
var i__17326__auto___47753 = (0);
while(true){
if((i__17326__auto___47753 < len__17325__auto___47752)){
args47749.push((arguments[i__17326__auto___47753]));

var G__47754 = (i__17326__auto___47753 + (1));
i__17326__auto___47753 = G__47754;
continue;
} else {
}
break;
}

var G__47751 = args47749.length;
switch (G__47751) {
case 2:
return ajax.core.content_type_matches.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return ajax.core.content_type_matches.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47749.length)].join('')));

}
});

ajax.core.content_type_matches.cljs$core$IFn$_invoke$arity$2 = (function (content_type,accept){
return (cljs.core._EQ_.call(null,accept,"*/*")) || ((content_type.indexOf(accept) >= (0)));
});

ajax.core.content_type_matches.cljs$core$IFn$_invoke$arity$1 = (function (content_type){
return (function (accept){
return (cljs.core._EQ_.call(null,accept,"*/*")) || ((content_type.indexOf(accept) >= (0)));
});
});

ajax.core.content_type_matches.cljs$lang$maxFixedArity = 2;
ajax.core.detect_content_type = (function ajax$core$detect_content_type(var_args){
var args47756 = [];
var len__17325__auto___47759 = arguments.length;
var i__17326__auto___47760 = (0);
while(true){
if((i__17326__auto___47760 < len__17325__auto___47759)){
args47756.push((arguments[i__17326__auto___47760]));

var G__47761 = (i__17326__auto___47760 + (1));
i__17326__auto___47760 = G__47761;
continue;
} else {
}
break;
}

var G__47758 = args47756.length;
switch (G__47758) {
case 3:
return ajax.core.detect_content_type.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return ajax.core.detect_content_type.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return ajax.core.detect_content_type.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47756.length)].join('')));

}
});

ajax.core.detect_content_type.cljs$core$IFn$_invoke$arity$3 = (function (content_type,request,format_entry){
var accept = ajax.core.get_accept_entries.call(null,request,format_entry);
return cljs.core.some.call(null,ajax.core.content_type_matches.call(null,content_type),accept);
});

ajax.core.detect_content_type.cljs$core$IFn$_invoke$arity$2 = (function (content_type,request){
return (function (format_entry){
var accept = ajax.core.get_accept_entries.call(null,request,format_entry);
return cljs.core.some.call(null,ajax.core.content_type_matches.call(null,content_type),accept);
});
});

ajax.core.detect_content_type.cljs$core$IFn$_invoke$arity$1 = (function (content_type){
return (function (request,format_entry){
var accept = ajax.core.get_accept_entries.call(null,request,format_entry);
return cljs.core.some.call(null,ajax.core.content_type_matches.call(null,content_type),accept);
});
});

ajax.core.detect_content_type.cljs$lang$maxFixedArity = 3;
ajax.core.get_default_format = (function ajax$core$get_default_format(response,p__47763){
var map__47766 = p__47763;
var map__47766__$1 = ((((!((map__47766 == null)))?((((map__47766.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47766.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47766):map__47766);
var request = map__47766__$1;
var response_format = cljs.core.get.call(null,map__47766__$1,new cljs.core.Keyword(null,"response-format","response-format",1664465322));
var f = ajax.core.detect_content_type.call(null,ajax.core.get_content_type.call(null,response),request);
return ajax.core.get_format.call(null,request,cljs.core.first.call(null,cljs.core.filter.call(null,f,response_format)));
});
ajax.core.detect_response_format_read = (function ajax$core$detect_response_format_read(var_args){
var args47768 = [];
var len__17325__auto___47771 = arguments.length;
var i__17326__auto___47772 = (0);
while(true){
if((i__17326__auto___47772 < len__17325__auto___47771)){
args47768.push((arguments[i__17326__auto___47772]));

var G__47773 = (i__17326__auto___47772 + (1));
i__17326__auto___47772 = G__47773;
continue;
} else {
}
break;
}

var G__47770 = args47768.length;
switch (G__47770) {
case 2:
return ajax.core.detect_response_format_read.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return ajax.core.detect_response_format_read.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47768.length)].join('')));

}
});

ajax.core.detect_response_format_read.cljs$core$IFn$_invoke$arity$2 = (function (request,response){
var format = ajax.core.get_default_format.call(null,response,request);
return new cljs.core.Keyword(null,"read","read",1140058661).cljs$core$IFn$_invoke$arity$1(format).call(null,response);
});

ajax.core.detect_response_format_read.cljs$core$IFn$_invoke$arity$1 = (function (request){
return (function (response){
var format = ajax.core.get_default_format.call(null,response,request);
return new cljs.core.Keyword(null,"read","read",1140058661).cljs$core$IFn$_invoke$arity$1(format).call(null,response);
});
});

ajax.core.detect_response_format_read.cljs$lang$maxFixedArity = 2;
ajax.core.accept_header = (function ajax$core$accept_header(p__47775){
var map__47778 = p__47775;
var map__47778__$1 = ((((!((map__47778 == null)))?((((map__47778.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47778.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47778):map__47778);
var request = map__47778__$1;
var response_format = cljs.core.get.call(null,map__47778__$1,new cljs.core.Keyword(null,"response-format","response-format",1664465322));
if(cljs.core.vector_QMARK_.call(null,response_format)){
return clojure.string.join.call(null,", ",cljs.core.mapcat.call(null,ajax.core.get_accept_entries.call(null,request),response_format));
} else {
return ajax.core.get_accept_entries.call(null,request,response_format);
}
});
ajax.core.detect_response_format = (function ajax$core$detect_response_format(var_args){
var args47780 = [];
var len__17325__auto___47783 = arguments.length;
var i__17326__auto___47784 = (0);
while(true){
if((i__17326__auto___47784 < len__17325__auto___47783)){
args47780.push((arguments[i__17326__auto___47784]));

var G__47785 = (i__17326__auto___47784 + (1));
i__17326__auto___47784 = G__47785;
continue;
} else {
}
break;
}

var G__47782 = args47780.length;
switch (G__47782) {
case 0:
return ajax.core.detect_response_format.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return ajax.core.detect_response_format.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47780.length)].join('')));

}
});

ajax.core.detect_response_format.cljs$core$IFn$_invoke$arity$0 = (function (){
return ajax.core.detect_response_format.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.default_formats], null));
});

ajax.core.detect_response_format.cljs$core$IFn$_invoke$arity$1 = (function (opts){
var accept = ajax.core.accept_header.call(null,opts);
return ajax.core.map__GT_ResponseFormat.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"read","read",1140058661),ajax.core.detect_response_format_read.call(null,opts),new cljs.core.Keyword(null,"format","format",-1306924766),[cljs.core.str("(from "),cljs.core.str(accept),cljs.core.str(")")].join(''),new cljs.core.Keyword(null,"content-type","content-type",-508222634),accept], null));
});

ajax.core.detect_response_format.cljs$lang$maxFixedArity = 1;
ajax.core.get_response_format = (function ajax$core$get_response_format(p__47787){
var map__47790 = p__47787;
var map__47790__$1 = ((((!((map__47790 == null)))?((((map__47790.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47790.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47790):map__47790);
var opts = map__47790__$1;
var response_format = cljs.core.get.call(null,map__47790__$1,new cljs.core.Keyword(null,"response-format","response-format",1664465322));
if((response_format instanceof ajax.core.ResponseFormat)){
return response_format;
} else {
if(cljs.core.vector_QMARK_.call(null,response_format)){
return ajax.core.detect_response_format.call(null,opts);
} else {
if(cljs.core.map_QMARK_.call(null,response_format)){
return ajax.core.map__GT_ResponseFormat.call(null,response_format);
} else {
if(cljs.core.ifn_QMARK_.call(null,response_format)){
return ajax.core.map__GT_ResponseFormat.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"read","read",1140058661),response_format,new cljs.core.Keyword(null,"description","description",-1428560544),"custom",new cljs.core.Keyword(null,"content-type","content-type",-508222634),"*/*"], null));
} else {
return ajax.core.throw_error.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["unrecognized response format: ",response_format], null));

}
}
}
}
});
ajax.core.normalize_method = (function ajax$core$normalize_method(method){
if((method instanceof cljs.core.Keyword)){
return clojure.string.upper_case.call(null,cljs.core.name.call(null,method));
} else {
return method;
}
});
ajax.core.js_handler = (function ajax$core$js_handler(var_args){
var args47792 = [];
var len__17325__auto___47795 = arguments.length;
var i__17326__auto___47796 = (0);
while(true){
if((i__17326__auto___47796 < len__17325__auto___47795)){
args47792.push((arguments[i__17326__auto___47796]));

var G__47797 = (i__17326__auto___47796 + (1));
i__17326__auto___47796 = G__47797;
continue;
} else {
}
break;
}

var G__47794 = args47792.length;
switch (G__47794) {
case 3:
return ajax.core.js_handler.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return ajax.core.js_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return ajax.core.js_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47792.length)].join('')));

}
});

ajax.core.js_handler.cljs$core$IFn$_invoke$arity$3 = (function (handler,interceptors,response){
var process = (function ajax$core$process(response__$1,interceptor){
return ajax.protocols._process_response.call(null,interceptor,response__$1);
});
var processed = cljs.core.reduce.call(null,process,response,interceptors);
return handler.call(null,processed);
});

ajax.core.js_handler.cljs$core$IFn$_invoke$arity$2 = (function (handler,interceptors){
return (function (response){
var process = (function ajax$core$process(response__$1,interceptor){
return ajax.protocols._process_response.call(null,interceptor,response__$1);
});
var processed = cljs.core.reduce.call(null,process,response,interceptors);
return handler.call(null,processed);
});
});

ajax.core.js_handler.cljs$core$IFn$_invoke$arity$1 = (function (handler){
return (function (interceptors,response){
var process = (function ajax$core$process(response__$1,interceptor){
return ajax.protocols._process_response.call(null,interceptor,response__$1);
});
var processed = cljs.core.reduce.call(null,process,response,interceptors);
return handler.call(null,processed);
});
});

ajax.core.js_handler.cljs$lang$maxFixedArity = 3;
ajax.core.base_handler = (function ajax$core$base_handler(interceptors,p__47799){
var map__47802 = p__47799;
var map__47802__$1 = ((((!((map__47802 == null)))?((((map__47802.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47802.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47802):map__47802);
var handler = cljs.core.get.call(null,map__47802__$1,new cljs.core.Keyword(null,"handler","handler",-195596612));
if(cljs.core.truth_(handler)){
return ajax.core.js_handler.call(null,handler,interceptors);
} else {
return ajax.core.throw_error.call(null,"No ajax handler provided.");
}
});
ajax.core.request_interceptors = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new ajax.core.ProcessGet(null,null,null)),(new ajax.core.DirectSubmission(null,null,null)),(new ajax.core.ApplyRequestFormat(null,null,null))], null);
ajax.core.default_interceptors = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
ajax.core.normalize_request = (function ajax$core$normalize_request(request){
var response_format = ajax.core.get_response_format.call(null,request);
return cljs.core.update.call(null,cljs.core.update.call(null,request,new cljs.core.Keyword(null,"method","method",55703592),ajax.core.normalize_method),new cljs.core.Keyword(null,"interceptors","interceptors",-1546782951),((function (response_format){
return (function (p1__47804_SHARP_){
return cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [response_format], null),(function (){var or__16267__auto__ = p1__47804_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return cljs.core.deref.call(null,ajax.core.default_interceptors);
}
})(),ajax.core.request_interceptors);
});})(response_format))
);
});
ajax.core.new_default_api = (function ajax$core$new_default_api(){
return (new goog.net.XhrIo());
});
ajax.core.raw_ajax_request = (function ajax$core$raw_ajax_request(p__47805){
var map__47808 = p__47805;
var map__47808__$1 = ((((!((map__47808 == null)))?((((map__47808.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47808.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47808):map__47808);
var request = map__47808__$1;
var interceptors = cljs.core.get.call(null,map__47808__$1,new cljs.core.Keyword(null,"interceptors","interceptors",-1546782951));
var request__$1 = cljs.core.reduce.call(null,ajax.core.process_request,request,interceptors);
var handler = ajax.core.base_handler.call(null,cljs.core.reverse.call(null,interceptors),request__$1);
var api = (function (){var or__16267__auto__ = new cljs.core.Keyword(null,"api","api",-899839580).cljs$core$IFn$_invoke$arity$1(request__$1);
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return ajax.core.new_default_api.call(null);
}
})();
return ajax.protocols._js_ajax_request.call(null,api,request__$1,handler);
});
ajax.core.ajax_request = (function ajax$core$ajax_request(request){
return ajax.core.raw_ajax_request.call(null,ajax.core.normalize_request.call(null,request));
});
ajax.core.keyword_request_format = (function ajax$core$keyword_request_format(format,format_params){
if(cljs.core.map_QMARK_.call(null,format)){
return format;
} else {
if(cljs.core.fn_QMARK_.call(null,format)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"write","write",-1857649168),format], null);
} else {
if((format == null)){
return ajax.core.transit_request_format.call(null,format_params);
} else {
var G__47811 = (((format instanceof cljs.core.Keyword))?format.fqn:null);
switch (G__47811) {
case "transit":
return ajax.core.transit_request_format.call(null,format_params);

break;
case "json":
return ajax.core.json_request_format.call(null);

break;
case "text":
return ajax.core.text_request_format.call(null);

break;
case "raw":
return ajax.core.url_request_format.call(null);

break;
case "url":
return ajax.core.url_request_format.call(null);

break;
default:
return null;

}

}
}
}
});
ajax.core.keyword_response_format_element = (function ajax$core$keyword_response_format_element(format,format_params){
if(cljs.core.vector_QMARK_.call(null,format)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,format),ajax$core$keyword_response_format_element.call(null,cljs.core.second.call(null,format),format_params)], null);
} else {
if(cljs.core.map_QMARK_.call(null,format)){
return format;
} else {
if(cljs.core.fn_QMARK_.call(null,format)){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"read","read",1140058661),format,new cljs.core.Keyword(null,"description","description",-1428560544),"custom"], null);
} else {
if((format == null)){
return ajax.core.detect_response_format.call(null);
} else {
var G__47814 = (((format instanceof cljs.core.Keyword))?format.fqn:null);
switch (G__47814) {
case "transit":
return ajax.core.transit_response_format.call(null,format_params);

break;
case "json":
return ajax.core.json_response_format.call(null,format_params);

break;
case "text":
return ajax.core.text_response_format.call(null);

break;
case "raw":
return ajax.core.raw_response_format.call(null);

break;
case "detect":
return ajax.core.detect_response_format.call(null);

break;
default:
return null;

}

}
}
}
}
});
ajax.core.keyword_response_format = (function ajax$core$keyword_response_format(format,format_params){
if(cljs.core.vector_QMARK_.call(null,format)){
return cljs.core.apply.call(null,cljs.core.vector,cljs.core.map.call(null,(function (p1__47816_SHARP_){
return ajax.core.keyword_response_format_element.call(null,p1__47816_SHARP_,format_params);
}),format));
} else {
return ajax.core.keyword_response_format_element.call(null,format,format_params);
}
});
ajax.core.transform_handler = (function ajax$core$transform_handler(var_args){
var args47817 = [];
var len__17325__auto___47830 = arguments.length;
var i__17326__auto___47831 = (0);
while(true){
if((i__17326__auto___47831 < len__17325__auto___47830)){
args47817.push((arguments[i__17326__auto___47831]));

var G__47832 = (i__17326__auto___47831 + (1));
i__17326__auto___47831 = G__47832;
continue;
} else {
}
break;
}

var G__47819 = args47817.length;
switch (G__47819) {
case 2:
return ajax.core.transform_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return ajax.core.transform_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47817.length)].join('')));

}
});

ajax.core.transform_handler.cljs$core$IFn$_invoke$arity$2 = (function (p__47820,p__47821){
var map__47822 = p__47820;
var map__47822__$1 = ((((!((map__47822 == null)))?((((map__47822.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47822.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47822):map__47822);
var handler = cljs.core.get.call(null,map__47822__$1,new cljs.core.Keyword(null,"handler","handler",-195596612));
var error_handler = cljs.core.get.call(null,map__47822__$1,new cljs.core.Keyword(null,"error-handler","error-handler",-484945776));
var finally$ = cljs.core.get.call(null,map__47822__$1,new cljs.core.Keyword(null,"finally","finally",1589088705));
var vec__47823 = p__47821;
var ok = cljs.core.nth.call(null,vec__47823,(0),null);
var result = cljs.core.nth.call(null,vec__47823,(1),null);
var temp__4423__auto___47834 = (cljs.core.truth_(ok)?handler:error_handler);
if(cljs.core.truth_(temp__4423__auto___47834)){
var h_47835 = temp__4423__auto___47834;
h_47835.call(null,result);
} else {
}

if(cljs.core.fn_QMARK_.call(null,finally$)){
return finally$.call(null);
} else {
return null;
}
});

ajax.core.transform_handler.cljs$core$IFn$_invoke$arity$1 = (function (p__47825){
var map__47826 = p__47825;
var map__47826__$1 = ((((!((map__47826 == null)))?((((map__47826.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47826.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47826):map__47826);
var handler = cljs.core.get.call(null,map__47826__$1,new cljs.core.Keyword(null,"handler","handler",-195596612));
var error_handler = cljs.core.get.call(null,map__47826__$1,new cljs.core.Keyword(null,"error-handler","error-handler",-484945776));
var finally$ = cljs.core.get.call(null,map__47826__$1,new cljs.core.Keyword(null,"finally","finally",1589088705));
return ((function (map__47826,map__47826__$1,handler,error_handler,finally$){
return (function (p__47828){
var vec__47829 = p__47828;
var ok = cljs.core.nth.call(null,vec__47829,(0),null);
var result = cljs.core.nth.call(null,vec__47829,(1),null);
var temp__4423__auto___47836 = (cljs.core.truth_(ok)?handler:error_handler);
if(cljs.core.truth_(temp__4423__auto___47836)){
var h_47837 = temp__4423__auto___47836;
h_47837.call(null,result);
} else {
}

if(cljs.core.fn_QMARK_.call(null,finally$)){
return finally$.call(null);
} else {
return null;
}
});
;})(map__47826,map__47826__$1,handler,error_handler,finally$))
});

ajax.core.transform_handler.cljs$lang$maxFixedArity = 2;
ajax.core.transform_opts = (function ajax$core$transform_opts(p__47838){
var map__47841 = p__47838;
var map__47841__$1 = ((((!((map__47841 == null)))?((((map__47841.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47841.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47841):map__47841);
var opts = map__47841__$1;
var method = cljs.core.get.call(null,map__47841__$1,new cljs.core.Keyword(null,"method","method",55703592));
var format = cljs.core.get.call(null,map__47841__$1,new cljs.core.Keyword(null,"format","format",-1306924766));
var response_format = cljs.core.get.call(null,map__47841__$1,new cljs.core.Keyword(null,"response-format","response-format",1664465322));
var params = cljs.core.get.call(null,map__47841__$1,new cljs.core.Keyword(null,"params","params",710516235));
var body = cljs.core.get.call(null,map__47841__$1,new cljs.core.Keyword(null,"body","body",-2049205669));

var needs_format = ((body == null)) && (cljs.core.not_EQ_.call(null,method,"GET"));
var rf = (cljs.core.truth_((function (){var or__16267__auto__ = format;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return needs_format;
}
})())?ajax.core.keyword_request_format.call(null,format,opts):null);
return cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"handler","handler",-195596612),ajax.core.transform_handler.call(null,opts),new cljs.core.Keyword(null,"format","format",-1306924766),rf,new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.keyword_response_format.call(null,response_format,opts));
});
ajax.core.easy_ajax_request = (function ajax$core$easy_ajax_request(uri,method,opts){
return ajax.core.ajax_request.call(null,ajax.core.transform_opts.call(null,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"uri","uri",-774711847),uri,new cljs.core.Keyword(null,"method","method",55703592),method)));
});
/**
 * accepts the URI and an optional map of options, options include:
 *      :handler - the handler function for successful operation
 *                 should accept a single parameter which is the
 *                 deserialized response
 *      :error-handler - the handler function for errors, should accept a
 *                       map with keys :status and :status-text
 *      :format - the format for the request
 *      :response-format - the format for the response
 *      :params - a map of parameters that will be sent with the request
 */
ajax.core.GET = (function ajax$core$GET(var_args){
var args__17332__auto__ = [];
var len__17325__auto___47845 = arguments.length;
var i__17326__auto___47846 = (0);
while(true){
if((i__17326__auto___47846 < len__17325__auto___47845)){
args__17332__auto__.push((arguments[i__17326__auto___47846]));

var G__47847 = (i__17326__auto___47846 + (1));
i__17326__auto___47846 = G__47847;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return ajax.core.GET.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

ajax.core.GET.cljs$core$IFn$_invoke$arity$variadic = (function (uri,opts){
var f__18459__auto__ = cljs.core.first.call(null,opts);
return ajax.core.easy_ajax_request.call(null,uri,"GET",(((f__18459__auto__ instanceof cljs.core.Keyword))?cljs.core.apply.call(null,cljs.core.hash_map,opts):f__18459__auto__));
});

ajax.core.GET.cljs$lang$maxFixedArity = (1);

ajax.core.GET.cljs$lang$applyTo = (function (seq47843){
var G__47844 = cljs.core.first.call(null,seq47843);
var seq47843__$1 = cljs.core.next.call(null,seq47843);
return ajax.core.GET.cljs$core$IFn$_invoke$arity$variadic(G__47844,seq47843__$1);
});
/**
 * accepts the URI and an optional map of options, options include:
 *      :handler - the handler function for successful operation
 *                 should accept a single parameter which is the
 *                 deserialized response
 *      :error-handler - the handler function for errors, should accept a
 *                       map with keys :status and :status-text
 *      :format - the format for the request
 *      :response-format - the format for the response
 *      :params - a map of parameters that will be sent with the request
 */
ajax.core.HEAD = (function ajax$core$HEAD(var_args){
var args__17332__auto__ = [];
var len__17325__auto___47850 = arguments.length;
var i__17326__auto___47851 = (0);
while(true){
if((i__17326__auto___47851 < len__17325__auto___47850)){
args__17332__auto__.push((arguments[i__17326__auto___47851]));

var G__47852 = (i__17326__auto___47851 + (1));
i__17326__auto___47851 = G__47852;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return ajax.core.HEAD.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

ajax.core.HEAD.cljs$core$IFn$_invoke$arity$variadic = (function (uri,opts){
var f__18459__auto__ = cljs.core.first.call(null,opts);
return ajax.core.easy_ajax_request.call(null,uri,"HEAD",(((f__18459__auto__ instanceof cljs.core.Keyword))?cljs.core.apply.call(null,cljs.core.hash_map,opts):f__18459__auto__));
});

ajax.core.HEAD.cljs$lang$maxFixedArity = (1);

ajax.core.HEAD.cljs$lang$applyTo = (function (seq47848){
var G__47849 = cljs.core.first.call(null,seq47848);
var seq47848__$1 = cljs.core.next.call(null,seq47848);
return ajax.core.HEAD.cljs$core$IFn$_invoke$arity$variadic(G__47849,seq47848__$1);
});
/**
 * accepts the URI and an optional map of options, options include:
 *      :handler - the handler function for successful operation
 *                 should accept a single parameter which is the
 *                 deserialized response
 *      :error-handler - the handler function for errors, should accept a
 *                       map with keys :status and :status-text
 *      :format - the format for the request
 *      :response-format - the format for the response
 *      :params - a map of parameters that will be sent with the request
 */
ajax.core.POST = (function ajax$core$POST(var_args){
var args__17332__auto__ = [];
var len__17325__auto___47855 = arguments.length;
var i__17326__auto___47856 = (0);
while(true){
if((i__17326__auto___47856 < len__17325__auto___47855)){
args__17332__auto__.push((arguments[i__17326__auto___47856]));

var G__47857 = (i__17326__auto___47856 + (1));
i__17326__auto___47856 = G__47857;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return ajax.core.POST.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

ajax.core.POST.cljs$core$IFn$_invoke$arity$variadic = (function (uri,opts){
var f__18459__auto__ = cljs.core.first.call(null,opts);
return ajax.core.easy_ajax_request.call(null,uri,"POST",(((f__18459__auto__ instanceof cljs.core.Keyword))?cljs.core.apply.call(null,cljs.core.hash_map,opts):f__18459__auto__));
});

ajax.core.POST.cljs$lang$maxFixedArity = (1);

ajax.core.POST.cljs$lang$applyTo = (function (seq47853){
var G__47854 = cljs.core.first.call(null,seq47853);
var seq47853__$1 = cljs.core.next.call(null,seq47853);
return ajax.core.POST.cljs$core$IFn$_invoke$arity$variadic(G__47854,seq47853__$1);
});
/**
 * accepts the URI and an optional map of options, options include:
 *      :handler - the handler function for successful operation
 *                 should accept a single parameter which is the
 *                 deserialized response
 *      :error-handler - the handler function for errors, should accept a
 *                       map with keys :status and :status-text
 *      :format - the format for the request
 *      :response-format - the format for the response
 *      :params - a map of parameters that will be sent with the request
 */
ajax.core.PUT = (function ajax$core$PUT(var_args){
var args__17332__auto__ = [];
var len__17325__auto___47860 = arguments.length;
var i__17326__auto___47861 = (0);
while(true){
if((i__17326__auto___47861 < len__17325__auto___47860)){
args__17332__auto__.push((arguments[i__17326__auto___47861]));

var G__47862 = (i__17326__auto___47861 + (1));
i__17326__auto___47861 = G__47862;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return ajax.core.PUT.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

ajax.core.PUT.cljs$core$IFn$_invoke$arity$variadic = (function (uri,opts){
var f__18459__auto__ = cljs.core.first.call(null,opts);
return ajax.core.easy_ajax_request.call(null,uri,"PUT",(((f__18459__auto__ instanceof cljs.core.Keyword))?cljs.core.apply.call(null,cljs.core.hash_map,opts):f__18459__auto__));
});

ajax.core.PUT.cljs$lang$maxFixedArity = (1);

ajax.core.PUT.cljs$lang$applyTo = (function (seq47858){
var G__47859 = cljs.core.first.call(null,seq47858);
var seq47858__$1 = cljs.core.next.call(null,seq47858);
return ajax.core.PUT.cljs$core$IFn$_invoke$arity$variadic(G__47859,seq47858__$1);
});
/**
 * accepts the URI and an optional map of options, options include:
 *      :handler - the handler function for successful operation
 *                 should accept a single parameter which is the
 *                 deserialized response
 *      :error-handler - the handler function for errors, should accept a
 *                       map with keys :status and :status-text
 *      :format - the format for the request
 *      :response-format - the format for the response
 *      :params - a map of parameters that will be sent with the request
 */
ajax.core.DELETE = (function ajax$core$DELETE(var_args){
var args__17332__auto__ = [];
var len__17325__auto___47865 = arguments.length;
var i__17326__auto___47866 = (0);
while(true){
if((i__17326__auto___47866 < len__17325__auto___47865)){
args__17332__auto__.push((arguments[i__17326__auto___47866]));

var G__47867 = (i__17326__auto___47866 + (1));
i__17326__auto___47866 = G__47867;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return ajax.core.DELETE.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

ajax.core.DELETE.cljs$core$IFn$_invoke$arity$variadic = (function (uri,opts){
var f__18459__auto__ = cljs.core.first.call(null,opts);
return ajax.core.easy_ajax_request.call(null,uri,"DELETE",(((f__18459__auto__ instanceof cljs.core.Keyword))?cljs.core.apply.call(null,cljs.core.hash_map,opts):f__18459__auto__));
});

ajax.core.DELETE.cljs$lang$maxFixedArity = (1);

ajax.core.DELETE.cljs$lang$applyTo = (function (seq47863){
var G__47864 = cljs.core.first.call(null,seq47863);
var seq47863__$1 = cljs.core.next.call(null,seq47863);
return ajax.core.DELETE.cljs$core$IFn$_invoke$arity$variadic(G__47864,seq47863__$1);
});
/**
 * accepts the URI and an optional map of options, options include:
 *      :handler - the handler function for successful operation
 *                 should accept a single parameter which is the
 *                 deserialized response
 *      :error-handler - the handler function for errors, should accept a
 *                       map with keys :status and :status-text
 *      :format - the format for the request
 *      :response-format - the format for the response
 *      :params - a map of parameters that will be sent with the request
 */
ajax.core.OPTIONS = (function ajax$core$OPTIONS(var_args){
var args__17332__auto__ = [];
var len__17325__auto___47870 = arguments.length;
var i__17326__auto___47871 = (0);
while(true){
if((i__17326__auto___47871 < len__17325__auto___47870)){
args__17332__auto__.push((arguments[i__17326__auto___47871]));

var G__47872 = (i__17326__auto___47871 + (1));
i__17326__auto___47871 = G__47872;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return ajax.core.OPTIONS.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

ajax.core.OPTIONS.cljs$core$IFn$_invoke$arity$variadic = (function (uri,opts){
var f__18459__auto__ = cljs.core.first.call(null,opts);
return ajax.core.easy_ajax_request.call(null,uri,"OPTIONS",(((f__18459__auto__ instanceof cljs.core.Keyword))?cljs.core.apply.call(null,cljs.core.hash_map,opts):f__18459__auto__));
});

ajax.core.OPTIONS.cljs$lang$maxFixedArity = (1);

ajax.core.OPTIONS.cljs$lang$applyTo = (function (seq47868){
var G__47869 = cljs.core.first.call(null,seq47868);
var seq47868__$1 = cljs.core.next.call(null,seq47868);
return ajax.core.OPTIONS.cljs$core$IFn$_invoke$arity$variadic(G__47869,seq47868__$1);
});
/**
 * accepts the URI and an optional map of options, options include:
 *      :handler - the handler function for successful operation
 *                 should accept a single parameter which is the
 *                 deserialized response
 *      :error-handler - the handler function for errors, should accept a
 *                       map with keys :status and :status-text
 *      :format - the format for the request
 *      :response-format - the format for the response
 *      :params - a map of parameters that will be sent with the request
 */
ajax.core.TRACE = (function ajax$core$TRACE(var_args){
var args__17332__auto__ = [];
var len__17325__auto___47875 = arguments.length;
var i__17326__auto___47876 = (0);
while(true){
if((i__17326__auto___47876 < len__17325__auto___47875)){
args__17332__auto__.push((arguments[i__17326__auto___47876]));

var G__47877 = (i__17326__auto___47876 + (1));
i__17326__auto___47876 = G__47877;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return ajax.core.TRACE.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

ajax.core.TRACE.cljs$core$IFn$_invoke$arity$variadic = (function (uri,opts){
var f__18459__auto__ = cljs.core.first.call(null,opts);
return ajax.core.easy_ajax_request.call(null,uri,"TRACE",(((f__18459__auto__ instanceof cljs.core.Keyword))?cljs.core.apply.call(null,cljs.core.hash_map,opts):f__18459__auto__));
});

ajax.core.TRACE.cljs$lang$maxFixedArity = (1);

ajax.core.TRACE.cljs$lang$applyTo = (function (seq47873){
var G__47874 = cljs.core.first.call(null,seq47873);
var seq47873__$1 = cljs.core.next.call(null,seq47873);
return ajax.core.TRACE.cljs$core$IFn$_invoke$arity$variadic(G__47874,seq47873__$1);
});
/**
 * accepts the URI and an optional map of options, options include:
 *      :handler - the handler function for successful operation
 *                 should accept a single parameter which is the
 *                 deserialized response
 *      :error-handler - the handler function for errors, should accept a
 *                       map with keys :status and :status-text
 *      :format - the format for the request
 *      :response-format - the format for the response
 *      :params - a map of parameters that will be sent with the request
 */
ajax.core.PATCH = (function ajax$core$PATCH(var_args){
var args__17332__auto__ = [];
var len__17325__auto___47880 = arguments.length;
var i__17326__auto___47881 = (0);
while(true){
if((i__17326__auto___47881 < len__17325__auto___47880)){
args__17332__auto__.push((arguments[i__17326__auto___47881]));

var G__47882 = (i__17326__auto___47881 + (1));
i__17326__auto___47881 = G__47882;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return ajax.core.PATCH.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

ajax.core.PATCH.cljs$core$IFn$_invoke$arity$variadic = (function (uri,opts){
var f__18459__auto__ = cljs.core.first.call(null,opts);
return ajax.core.easy_ajax_request.call(null,uri,"PATCH",(((f__18459__auto__ instanceof cljs.core.Keyword))?cljs.core.apply.call(null,cljs.core.hash_map,opts):f__18459__auto__));
});

ajax.core.PATCH.cljs$lang$maxFixedArity = (1);

ajax.core.PATCH.cljs$lang$applyTo = (function (seq47878){
var G__47879 = cljs.core.first.call(null,seq47878);
var seq47878__$1 = cljs.core.next.call(null,seq47878);
return ajax.core.PATCH.cljs$core$IFn$_invoke$arity$variadic(G__47879,seq47878__$1);
});

//# sourceMappingURL=core.js.map?rel=1445965101396