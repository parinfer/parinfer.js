// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer.toc');
goog.require('cljs.core');
goog.require('om.core');
goog.require('sablono.core');
if(typeof parinfer.toc.state !== 'undefined'){
} else {
parinfer.toc.state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"sections","sections",-886710106),null,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.PersistentHashSet.EMPTY], null));
}
/**
 * get a list of sections for the table of contents
 */
parinfer.toc.get_sections = (function parinfer$toc$get_sections(){
var headers = document.getElementById("app").querySelectorAll("h2,h3,h4,h5,h6");
var iter__17039__auto__ = ((function (headers){
return (function parinfer$toc$get_sections_$_iter__38206(s__38207){
return (new cljs.core.LazySeq(null,((function (headers){
return (function (){
var s__38207__$1 = s__38207;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__38207__$1);
if(temp__4425__auto__){
var s__38207__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__38207__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__38207__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__38209 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__38208 = (0);
while(true){
if((i__38208 < size__17038__auto__)){
var i = cljs.core._nth.call(null,c__17037__auto__,i__38208);
cljs.core.chunk_append.call(null,b__38209,(function (){var header = (headers[i]);
var section = header.parentElement;
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),section.id,new cljs.core.Keyword(null,"level","level",1290497552),cljs.core.subs.call(null,header.tagName,(1)),new cljs.core.Keyword(null,"section","section",-300141526),section,new cljs.core.Keyword(null,"title","title",636505583),header.textContent], null);
})());

var G__38210 = (i__38208 + (1));
i__38208 = G__38210;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__38209),parinfer$toc$get_sections_$_iter__38206.call(null,cljs.core.chunk_rest.call(null,s__38207__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__38209),null);
}
} else {
var i = cljs.core.first.call(null,s__38207__$2);
return cljs.core.cons.call(null,(function (){var header = (headers[i]);
var section = header.parentElement;
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),section.id,new cljs.core.Keyword(null,"level","level",1290497552),cljs.core.subs.call(null,header.tagName,(1)),new cljs.core.Keyword(null,"section","section",-300141526),section,new cljs.core.Keyword(null,"title","title",636505583),header.textContent], null);
})(),parinfer$toc$get_sections_$_iter__38206.call(null,cljs.core.rest.call(null,s__38207__$2)));
}
} else {
return null;
}
break;
}
});})(headers))
,null,null));
});})(headers))
;
return iter__17039__auto__.call(null,cljs.core.range.call(null,headers.length));
});
parinfer.toc.toc_component = (function parinfer$toc$toc_component(p__38211,owner){
var map__38233 = p__38211;
var map__38233__$1 = ((((!((map__38233 == null)))?((((map__38233.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38233.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38233):map__38233);
var sections = cljs.core.get.call(null,map__38233__$1,new cljs.core.Keyword(null,"sections","sections",-886710106));
var visible_QMARK_ = cljs.core.get.call(null,map__38233__$1,new cljs.core.Keyword(null,"visible?","visible?",2129863715));
if(typeof parinfer.toc.t_parinfer$toc38235 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
parinfer.toc.t_parinfer$toc38235 = (function (toc_component,p__38211,owner,map__38233,sections,visible_QMARK_,meta38236){
this.toc_component = toc_component;
this.p__38211 = p__38211;
this.owner = owner;
this.map__38233 = map__38233;
this.sections = sections;
this.visible_QMARK_ = visible_QMARK_;
this.meta38236 = meta38236;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
parinfer.toc.t_parinfer$toc38235.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__38233,map__38233__$1,sections,visible_QMARK_){
return (function (_38237,meta38236__$1){
var self__ = this;
var _38237__$1 = this;
return (new parinfer.toc.t_parinfer$toc38235(self__.toc_component,self__.p__38211,self__.owner,self__.map__38233,self__.sections,self__.visible_QMARK_,meta38236__$1));
});})(map__38233,map__38233__$1,sections,visible_QMARK_))
;

parinfer.toc.t_parinfer$toc38235.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__38233,map__38233__$1,sections,visible_QMARK_){
return (function (_38237){
var self__ = this;
var _38237__$1 = this;
return self__.meta38236;
});})(map__38233,map__38233__$1,sections,visible_QMARK_))
;

parinfer.toc.t_parinfer$toc38235.prototype.om$core$IRender$ = true;

parinfer.toc.t_parinfer$toc38235.prototype.om$core$IRender$render$arity$1 = ((function (map__38233,map__38233__$1,sections,visible_QMARK_){
return (function (_this){
var self__ = this;
var _this__$1 = this;
return React.createElement("div",null,cljs.core.into_array.call(null,(function (){var iter__17039__auto__ = ((function (_this__$1,map__38233,map__38233__$1,sections,visible_QMARK_){
return (function parinfer$toc$toc_component_$_iter__38238(s__38239){
return (new cljs.core.LazySeq(null,((function (_this__$1,map__38233,map__38233__$1,sections,visible_QMARK_){
return (function (){
var s__38239__$1 = s__38239;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__38239__$1);
if(temp__4425__auto__){
var s__38239__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__38239__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__38239__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__38241 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__38240 = (0);
while(true){
if((i__38240 < size__17038__auto__)){
var map__38248 = cljs.core._nth.call(null,c__17037__auto__,i__38240);
var map__38248__$1 = ((((!((map__38248 == null)))?((((map__38248.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38248.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38248):map__38248);
var id = cljs.core.get.call(null,map__38248__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var level = cljs.core.get.call(null,map__38248__$1,new cljs.core.Keyword(null,"level","level",1290497552));
var title = cljs.core.get.call(null,map__38248__$1,new cljs.core.Keyword(null,"title","title",636505583));
cljs.core.chunk_append.call(null,b__38241,React.createElement("div",{"className": (function (){var G__38250 = [cljs.core.str("toc-link toc-level-"),cljs.core.str(level)].join('');
var G__38250__$1 = (cljs.core.truth_(self__.visible_QMARK_.call(null,id))?[cljs.core.str(G__38250),cljs.core.str(" toc-visible")].join(''):G__38250);
return G__38250__$1;
})()},React.createElement("a",{"href": [cljs.core.str("#"),cljs.core.str(id)].join('')},sablono.interpreter.interpret.call(null,title))));

var G__38254 = (i__38240 + (1));
i__38240 = G__38254;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__38241),parinfer$toc$toc_component_$_iter__38238.call(null,cljs.core.chunk_rest.call(null,s__38239__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__38241),null);
}
} else {
var map__38251 = cljs.core.first.call(null,s__38239__$2);
var map__38251__$1 = ((((!((map__38251 == null)))?((((map__38251.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38251.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38251):map__38251);
var id = cljs.core.get.call(null,map__38251__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var level = cljs.core.get.call(null,map__38251__$1,new cljs.core.Keyword(null,"level","level",1290497552));
var title = cljs.core.get.call(null,map__38251__$1,new cljs.core.Keyword(null,"title","title",636505583));
return cljs.core.cons.call(null,React.createElement("div",{"className": (function (){var G__38253 = [cljs.core.str("toc-link toc-level-"),cljs.core.str(level)].join('');
var G__38253__$1 = (cljs.core.truth_(self__.visible_QMARK_.call(null,id))?[cljs.core.str(G__38253),cljs.core.str(" toc-visible")].join(''):G__38253);
return G__38253__$1;
})()},React.createElement("a",{"href": [cljs.core.str("#"),cljs.core.str(id)].join('')},sablono.interpreter.interpret.call(null,title))),parinfer$toc$toc_component_$_iter__38238.call(null,cljs.core.rest.call(null,s__38239__$2)));
}
} else {
return null;
}
break;
}
});})(_this__$1,map__38233,map__38233__$1,sections,visible_QMARK_))
,null,null));
});})(_this__$1,map__38233,map__38233__$1,sections,visible_QMARK_))
;
return iter__17039__auto__.call(null,self__.sections);
})()));
});})(map__38233,map__38233__$1,sections,visible_QMARK_))
;

parinfer.toc.t_parinfer$toc38235.getBasis = ((function (map__38233,map__38233__$1,sections,visible_QMARK_){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"toc-component","toc-component",-1006380267,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"sections","sections",753821421,null),new cljs.core.Symbol(null,"visible?","visible?",-524572054,null)], null)], null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"p__38211","p__38211",1758539021,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"map__38233","map__38233",-281859113,null),new cljs.core.Symbol(null,"sections","sections",753821421,null),new cljs.core.Symbol(null,"visible?","visible?",-524572054,null),new cljs.core.Symbol(null,"meta38236","meta38236",-1755678083,null)], null);
});})(map__38233,map__38233__$1,sections,visible_QMARK_))
;

parinfer.toc.t_parinfer$toc38235.cljs$lang$type = true;

parinfer.toc.t_parinfer$toc38235.cljs$lang$ctorStr = "parinfer.toc/t_parinfer$toc38235";

parinfer.toc.t_parinfer$toc38235.cljs$lang$ctorPrWriter = ((function (map__38233,map__38233__$1,sections,visible_QMARK_){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"parinfer.toc/t_parinfer$toc38235");
});})(map__38233,map__38233__$1,sections,visible_QMARK_))
;

parinfer.toc.__GT_t_parinfer$toc38235 = ((function (map__38233,map__38233__$1,sections,visible_QMARK_){
return (function parinfer$toc$toc_component_$___GT_t_parinfer$toc38235(toc_component__$1,p__38211__$1,owner__$1,map__38233__$2,sections__$1,visible_QMARK___$1,meta38236){
return (new parinfer.toc.t_parinfer$toc38235(toc_component__$1,p__38211__$1,owner__$1,map__38233__$2,sections__$1,visible_QMARK___$1,meta38236));
});})(map__38233,map__38233__$1,sections,visible_QMARK_))
;

}

return (new parinfer.toc.t_parinfer$toc38235(parinfer$toc$toc_component,p__38211,owner,map__38233__$1,sections,visible_QMARK_,cljs.core.PersistentArrayMap.EMPTY));
});
parinfer.toc.track_section_visibility_BANG_ = (function parinfer$toc$track_section_visibility_BANG_(){
var seq__38261 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"sections","sections",-886710106).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,parinfer.toc.state)));
var chunk__38262 = null;
var count__38263 = (0);
var i__38264 = (0);
while(true){
if((i__38264 < count__38263)){
var s = cljs.core._nth.call(null,chunk__38262,i__38264);
var G__38265_38267 = scrollMonitor.create(new cljs.core.Keyword(null,"section","section",-300141526).cljs$core$IFn$_invoke$arity$1(s));
G__38265_38267.enterViewport(((function (seq__38261,chunk__38262,count__38263,i__38264,G__38265_38267,s){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.conj,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(s));
});})(seq__38261,chunk__38262,count__38263,i__38264,G__38265_38267,s))
);

G__38265_38267.exitViewport(((function (seq__38261,chunk__38262,count__38263,i__38264,G__38265_38267,s){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.disj,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(s));
});})(seq__38261,chunk__38262,count__38263,i__38264,G__38265_38267,s))
);


var G__38268 = seq__38261;
var G__38269 = chunk__38262;
var G__38270 = count__38263;
var G__38271 = (i__38264 + (1));
seq__38261 = G__38268;
chunk__38262 = G__38269;
count__38263 = G__38270;
i__38264 = G__38271;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__38261);
if(temp__4425__auto__){
var seq__38261__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__38261__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__38261__$1);
var G__38272 = cljs.core.chunk_rest.call(null,seq__38261__$1);
var G__38273 = c__17070__auto__;
var G__38274 = cljs.core.count.call(null,c__17070__auto__);
var G__38275 = (0);
seq__38261 = G__38272;
chunk__38262 = G__38273;
count__38263 = G__38274;
i__38264 = G__38275;
continue;
} else {
var s = cljs.core.first.call(null,seq__38261__$1);
var G__38266_38276 = scrollMonitor.create(new cljs.core.Keyword(null,"section","section",-300141526).cljs$core$IFn$_invoke$arity$1(s));
G__38266_38276.enterViewport(((function (seq__38261,chunk__38262,count__38263,i__38264,G__38266_38276,s,seq__38261__$1,temp__4425__auto__){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.conj,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(s));
});})(seq__38261,chunk__38262,count__38263,i__38264,G__38266_38276,s,seq__38261__$1,temp__4425__auto__))
);

G__38266_38276.exitViewport(((function (seq__38261,chunk__38262,count__38263,i__38264,G__38266_38276,s,seq__38261__$1,temp__4425__auto__){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.disj,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(s));
});})(seq__38261,chunk__38262,count__38263,i__38264,G__38266_38276,s,seq__38261__$1,temp__4425__auto__))
);


var G__38277 = cljs.core.next.call(null,seq__38261__$1);
var G__38278 = null;
var G__38279 = (0);
var G__38280 = (0);
seq__38261 = G__38277;
chunk__38262 = G__38278;
count__38263 = G__38279;
i__38264 = G__38280;
continue;
}
} else {
return null;
}
}
break;
}
});
parinfer.toc.init_BANG_ = (function parinfer$toc$init_BANG_(){
if(cljs.core.truth_(new cljs.core.Keyword(null,"sections","sections",-886710106).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,parinfer.toc.state)))){
return null;
} else {
cljs.core.swap_BANG_.call(null,parinfer.toc.state,cljs.core.assoc,new cljs.core.Keyword(null,"sections","sections",-886710106),parinfer.toc.get_sections.call(null));

parinfer.toc.track_section_visibility_BANG_.call(null);

return om.core.root.call(null,parinfer.toc.toc_component,parinfer.toc.state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("toc")], null));
}
});

//# sourceMappingURL=toc.js.map?rel=1445823441660