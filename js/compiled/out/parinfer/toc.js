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
return (function parinfer$toc$get_sections_$_iter__47464(s__47465){
return (new cljs.core.LazySeq(null,((function (headers){
return (function (){
var s__47465__$1 = s__47465;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__47465__$1);
if(temp__4425__auto__){
var s__47465__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__47465__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__47465__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__47467 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__47466 = (0);
while(true){
if((i__47466 < size__17038__auto__)){
var i = cljs.core._nth.call(null,c__17037__auto__,i__47466);
cljs.core.chunk_append.call(null,b__47467,(function (){var header = (headers[i]);
var section = header.parentElement;
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),section.id,new cljs.core.Keyword(null,"level","level",1290497552),cljs.core.subs.call(null,header.tagName,(1)),new cljs.core.Keyword(null,"section","section",-300141526),section,new cljs.core.Keyword(null,"title","title",636505583),header.textContent], null);
})());

var G__47468 = (i__47466 + (1));
i__47466 = G__47468;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__47467),parinfer$toc$get_sections_$_iter__47464.call(null,cljs.core.chunk_rest.call(null,s__47465__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__47467),null);
}
} else {
var i = cljs.core.first.call(null,s__47465__$2);
return cljs.core.cons.call(null,(function (){var header = (headers[i]);
var section = header.parentElement;
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),section.id,new cljs.core.Keyword(null,"level","level",1290497552),cljs.core.subs.call(null,header.tagName,(1)),new cljs.core.Keyword(null,"section","section",-300141526),section,new cljs.core.Keyword(null,"title","title",636505583),header.textContent], null);
})(),parinfer$toc$get_sections_$_iter__47464.call(null,cljs.core.rest.call(null,s__47465__$2)));
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
parinfer.toc.toc_component = (function parinfer$toc$toc_component(p__47469,owner){
var map__47491 = p__47469;
var map__47491__$1 = ((((!((map__47491 == null)))?((((map__47491.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47491.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47491):map__47491);
var sections = cljs.core.get.call(null,map__47491__$1,new cljs.core.Keyword(null,"sections","sections",-886710106));
var visible_QMARK_ = cljs.core.get.call(null,map__47491__$1,new cljs.core.Keyword(null,"visible?","visible?",2129863715));
if(typeof parinfer.toc.t_parinfer$toc47493 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
parinfer.toc.t_parinfer$toc47493 = (function (toc_component,p__47469,owner,map__47491,sections,visible_QMARK_,meta47494){
this.toc_component = toc_component;
this.p__47469 = p__47469;
this.owner = owner;
this.map__47491 = map__47491;
this.sections = sections;
this.visible_QMARK_ = visible_QMARK_;
this.meta47494 = meta47494;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
parinfer.toc.t_parinfer$toc47493.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__47491,map__47491__$1,sections,visible_QMARK_){
return (function (_47495,meta47494__$1){
var self__ = this;
var _47495__$1 = this;
return (new parinfer.toc.t_parinfer$toc47493(self__.toc_component,self__.p__47469,self__.owner,self__.map__47491,self__.sections,self__.visible_QMARK_,meta47494__$1));
});})(map__47491,map__47491__$1,sections,visible_QMARK_))
;

parinfer.toc.t_parinfer$toc47493.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__47491,map__47491__$1,sections,visible_QMARK_){
return (function (_47495){
var self__ = this;
var _47495__$1 = this;
return self__.meta47494;
});})(map__47491,map__47491__$1,sections,visible_QMARK_))
;

parinfer.toc.t_parinfer$toc47493.prototype.om$core$IRender$ = true;

parinfer.toc.t_parinfer$toc47493.prototype.om$core$IRender$render$arity$1 = ((function (map__47491,map__47491__$1,sections,visible_QMARK_){
return (function (_this){
var self__ = this;
var _this__$1 = this;
return React.createElement("div",null,cljs.core.into_array.call(null,(function (){var iter__17039__auto__ = ((function (_this__$1,map__47491,map__47491__$1,sections,visible_QMARK_){
return (function parinfer$toc$toc_component_$_iter__47496(s__47497){
return (new cljs.core.LazySeq(null,((function (_this__$1,map__47491,map__47491__$1,sections,visible_QMARK_){
return (function (){
var s__47497__$1 = s__47497;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__47497__$1);
if(temp__4425__auto__){
var s__47497__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__47497__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__47497__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__47499 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__47498 = (0);
while(true){
if((i__47498 < size__17038__auto__)){
var map__47506 = cljs.core._nth.call(null,c__17037__auto__,i__47498);
var map__47506__$1 = ((((!((map__47506 == null)))?((((map__47506.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47506.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47506):map__47506);
var id = cljs.core.get.call(null,map__47506__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var level = cljs.core.get.call(null,map__47506__$1,new cljs.core.Keyword(null,"level","level",1290497552));
var title = cljs.core.get.call(null,map__47506__$1,new cljs.core.Keyword(null,"title","title",636505583));
cljs.core.chunk_append.call(null,b__47499,React.createElement("div",{"className": (function (){var G__47508 = [cljs.core.str("toc-link toc-level-"),cljs.core.str(level)].join('');
var G__47508__$1 = (cljs.core.truth_(self__.visible_QMARK_.call(null,id))?[cljs.core.str(G__47508),cljs.core.str(" toc-visible")].join(''):G__47508);
return G__47508__$1;
})()},React.createElement("a",{"href": [cljs.core.str("#"),cljs.core.str(id)].join('')},sablono.interpreter.interpret.call(null,title))));

var G__47512 = (i__47498 + (1));
i__47498 = G__47512;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__47499),parinfer$toc$toc_component_$_iter__47496.call(null,cljs.core.chunk_rest.call(null,s__47497__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__47499),null);
}
} else {
var map__47509 = cljs.core.first.call(null,s__47497__$2);
var map__47509__$1 = ((((!((map__47509 == null)))?((((map__47509.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47509.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47509):map__47509);
var id = cljs.core.get.call(null,map__47509__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var level = cljs.core.get.call(null,map__47509__$1,new cljs.core.Keyword(null,"level","level",1290497552));
var title = cljs.core.get.call(null,map__47509__$1,new cljs.core.Keyword(null,"title","title",636505583));
return cljs.core.cons.call(null,React.createElement("div",{"className": (function (){var G__47511 = [cljs.core.str("toc-link toc-level-"),cljs.core.str(level)].join('');
var G__47511__$1 = (cljs.core.truth_(self__.visible_QMARK_.call(null,id))?[cljs.core.str(G__47511),cljs.core.str(" toc-visible")].join(''):G__47511);
return G__47511__$1;
})()},React.createElement("a",{"href": [cljs.core.str("#"),cljs.core.str(id)].join('')},sablono.interpreter.interpret.call(null,title))),parinfer$toc$toc_component_$_iter__47496.call(null,cljs.core.rest.call(null,s__47497__$2)));
}
} else {
return null;
}
break;
}
});})(_this__$1,map__47491,map__47491__$1,sections,visible_QMARK_))
,null,null));
});})(_this__$1,map__47491,map__47491__$1,sections,visible_QMARK_))
;
return iter__17039__auto__.call(null,self__.sections);
})()));
});})(map__47491,map__47491__$1,sections,visible_QMARK_))
;

parinfer.toc.t_parinfer$toc47493.getBasis = ((function (map__47491,map__47491__$1,sections,visible_QMARK_){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"toc-component","toc-component",-1006380267,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"sections","sections",753821421,null),new cljs.core.Symbol(null,"visible?","visible?",-524572054,null)], null)], null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"p__47469","p__47469",398282376,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"map__47491","map__47491",-984817706,null),new cljs.core.Symbol(null,"sections","sections",753821421,null),new cljs.core.Symbol(null,"visible?","visible?",-524572054,null),new cljs.core.Symbol(null,"meta47494","meta47494",-835847862,null)], null);
});})(map__47491,map__47491__$1,sections,visible_QMARK_))
;

parinfer.toc.t_parinfer$toc47493.cljs$lang$type = true;

parinfer.toc.t_parinfer$toc47493.cljs$lang$ctorStr = "parinfer.toc/t_parinfer$toc47493";

parinfer.toc.t_parinfer$toc47493.cljs$lang$ctorPrWriter = ((function (map__47491,map__47491__$1,sections,visible_QMARK_){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"parinfer.toc/t_parinfer$toc47493");
});})(map__47491,map__47491__$1,sections,visible_QMARK_))
;

parinfer.toc.__GT_t_parinfer$toc47493 = ((function (map__47491,map__47491__$1,sections,visible_QMARK_){
return (function parinfer$toc$toc_component_$___GT_t_parinfer$toc47493(toc_component__$1,p__47469__$1,owner__$1,map__47491__$2,sections__$1,visible_QMARK___$1,meta47494){
return (new parinfer.toc.t_parinfer$toc47493(toc_component__$1,p__47469__$1,owner__$1,map__47491__$2,sections__$1,visible_QMARK___$1,meta47494));
});})(map__47491,map__47491__$1,sections,visible_QMARK_))
;

}

return (new parinfer.toc.t_parinfer$toc47493(parinfer$toc$toc_component,p__47469,owner,map__47491__$1,sections,visible_QMARK_,cljs.core.PersistentArrayMap.EMPTY));
});
parinfer.toc.track_section_visibility_BANG_ = (function parinfer$toc$track_section_visibility_BANG_(){
var seq__47519 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"sections","sections",-886710106).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,parinfer.toc.state)));
var chunk__47520 = null;
var count__47521 = (0);
var i__47522 = (0);
while(true){
if((i__47522 < count__47521)){
var s = cljs.core._nth.call(null,chunk__47520,i__47522);
var G__47523_47525 = scrollMonitor.create(new cljs.core.Keyword(null,"section","section",-300141526).cljs$core$IFn$_invoke$arity$1(s));
G__47523_47525.enterViewport(((function (seq__47519,chunk__47520,count__47521,i__47522,G__47523_47525,s){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.conj,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(s));
});})(seq__47519,chunk__47520,count__47521,i__47522,G__47523_47525,s))
);

G__47523_47525.exitViewport(((function (seq__47519,chunk__47520,count__47521,i__47522,G__47523_47525,s){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.disj,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(s));
});})(seq__47519,chunk__47520,count__47521,i__47522,G__47523_47525,s))
);


var G__47526 = seq__47519;
var G__47527 = chunk__47520;
var G__47528 = count__47521;
var G__47529 = (i__47522 + (1));
seq__47519 = G__47526;
chunk__47520 = G__47527;
count__47521 = G__47528;
i__47522 = G__47529;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__47519);
if(temp__4425__auto__){
var seq__47519__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__47519__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__47519__$1);
var G__47530 = cljs.core.chunk_rest.call(null,seq__47519__$1);
var G__47531 = c__17070__auto__;
var G__47532 = cljs.core.count.call(null,c__17070__auto__);
var G__47533 = (0);
seq__47519 = G__47530;
chunk__47520 = G__47531;
count__47521 = G__47532;
i__47522 = G__47533;
continue;
} else {
var s = cljs.core.first.call(null,seq__47519__$1);
var G__47524_47534 = scrollMonitor.create(new cljs.core.Keyword(null,"section","section",-300141526).cljs$core$IFn$_invoke$arity$1(s));
G__47524_47534.enterViewport(((function (seq__47519,chunk__47520,count__47521,i__47522,G__47524_47534,s,seq__47519__$1,temp__4425__auto__){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.conj,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(s));
});})(seq__47519,chunk__47520,count__47521,i__47522,G__47524_47534,s,seq__47519__$1,temp__4425__auto__))
);

G__47524_47534.exitViewport(((function (seq__47519,chunk__47520,count__47521,i__47522,G__47524_47534,s,seq__47519__$1,temp__4425__auto__){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.disj,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(s));
});})(seq__47519,chunk__47520,count__47521,i__47522,G__47524_47534,s,seq__47519__$1,temp__4425__auto__))
);


var G__47535 = cljs.core.next.call(null,seq__47519__$1);
var G__47536 = null;
var G__47537 = (0);
var G__47538 = (0);
seq__47519 = G__47535;
chunk__47520 = G__47536;
count__47521 = G__47537;
i__47522 = G__47538;
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

//# sourceMappingURL=toc.js.map?rel=1445965100777