// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer_site.toc');
goog.require('cljs.core');
goog.require('om.core');
goog.require('sablono.core');
goog.require('goog.dom');
if(typeof parinfer_site.toc.state !== 'undefined'){
} else {
parinfer_site.toc.state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"sections","sections",-886710106),null,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.PersistentHashSet.EMPTY], null));
}
/**
 * get a list of sections for the table of contents
 */
parinfer_site.toc.get_sections_BANG_ = (function parinfer_site$toc$get_sections_BANG_(){
var headers = document.getElementById("app").querySelectorAll("h2,h3,h4,h5,h6");
var result = cljs.core.reduce.call(null,((function (headers){
return (function (p__31086,i){
var map__31087 = p__31086;
var map__31087__$1 = ((((!((map__31087 == null)))?((((map__31087.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31087.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31087):map__31087);
var result = map__31087__$1;
var stack = cljs.core.get.call(null,map__31087__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var sections = cljs.core.get.call(null,map__31087__$1,new cljs.core.Keyword(null,"sections","sections",-886710106));
var header_elm = (headers[i]);
var section_elm = header_elm.parentElement;
var id = section_elm.id;
var title = header_elm.textContent;
var prefix_elm = goog.dom.createDom("a",{"href": [cljs.core.str("#"),cljs.core.str(id)].join(''), "class": "header-link"},"#");
var level = parseInt(cljs.core.subs.call(null,header_elm.tagName,(1)));
var keep_QMARK_ = ((function (header_elm,section_elm,id,title,prefix_elm,level,map__31087,map__31087__$1,result,stack,sections,headers){
return (function (p1__31082_SHARP_){
return (new cljs.core.Keyword(null,"level","level",1290497552).cljs$core$IFn$_invoke$arity$1(p1__31082_SHARP_) < level);
});})(header_elm,section_elm,id,title,prefix_elm,level,map__31087,map__31087__$1,result,stack,sections,headers))
;
var stack__$1 = cljs.core.vec.call(null,cljs.core.take_while.call(null,keep_QMARK_,stack));
var section = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"ancestors","ancestors",-776045424),stack__$1,new cljs.core.Keyword(null,"level","level",1290497552),level,new cljs.core.Keyword(null,"order","order",-1254677256),i,new cljs.core.Keyword(null,"section-elm","section-elm",-1980192654),section_elm,new cljs.core.Keyword(null,"title","title",636505583),title], null);
var stack__$2 = cljs.core.conj.call(null,stack__$1,section);
goog.dom.insertChildAt(header_elm,prefix_elm,(0));

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stack","stack",-793405930),stack__$2,new cljs.core.Keyword(null,"sections","sections",-886710106),cljs.core.conj.call(null,sections,section)], null);
});})(headers))
,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"sections","sections",-886710106),cljs.core.PersistentVector.EMPTY], null),cljs.core.range.call(null,headers.length));
return new cljs.core.Keyword(null,"sections","sections",-886710106).cljs$core$IFn$_invoke$arity$1(result);
});
parinfer_site.toc.sibling_section_QMARK_ = (function parinfer_site$toc$sibling_section_QMARK_(current,sibling){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"ancestors","ancestors",-776045424).cljs$core$IFn$_invoke$arity$1(current),new cljs.core.Keyword(null,"ancestors","ancestors",-776045424).cljs$core$IFn$_invoke$arity$1(sibling));
});
parinfer_site.toc.section_attrs = (function parinfer_site$toc$section_attrs(current,active){
var active_QMARK_ = cljs.core._EQ_.call(null,active,current);
var ancestor_of_active_QMARK_ = cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([current], true),new cljs.core.Keyword(null,"ancestors","ancestors",-776045424).cljs$core$IFn$_invoke$arity$1(active));
var child_of_active_QMARK_ = cljs.core._EQ_.call(null,active,cljs.core.last.call(null,new cljs.core.Keyword(null,"ancestors","ancestors",-776045424).cljs$core$IFn$_invoke$arity$1(current)));
var sibling_of_active_ancestors_QMARK_ = cljs.core.some.call(null,((function (active_QMARK_,ancestor_of_active_QMARK_,child_of_active_QMARK_){
return (function (p1__31089_SHARP_){
return parinfer_site.toc.sibling_section_QMARK_.call(null,current,p1__31089_SHARP_);
});})(active_QMARK_,ancestor_of_active_QMARK_,child_of_active_QMARK_))
,new cljs.core.Keyword(null,"ancestors","ancestors",-776045424).cljs$core$IFn$_invoke$arity$1(active));
var sibling_of_active_QMARK_ = parinfer_site.toc.sibling_section_QMARK_.call(null,current,active);
var show_with_auto_collapse_QMARK_ = (function (){var or__16267__auto__ = active_QMARK_;
if(or__16267__auto__){
return or__16267__auto__;
} else {
var or__16267__auto____$1 = ancestor_of_active_QMARK_;
if(cljs.core.truth_(or__16267__auto____$1)){
return or__16267__auto____$1;
} else {
var or__16267__auto____$2 = child_of_active_QMARK_;
if(or__16267__auto____$2){
return or__16267__auto____$2;
} else {
var or__16267__auto____$3 = sibling_of_active_ancestors_QMARK_;
if(cljs.core.truth_(or__16267__auto____$3)){
return or__16267__auto____$3;
} else {
return sibling_of_active_QMARK_;
}
}
}
}
})();
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"show?","show?",1543842127),true,new cljs.core.Keyword(null,"ancestor-of-active?","ancestor-of-active?",-2078380373),ancestor_of_active_QMARK_], null);
});
parinfer_site.toc.toc_component = (function parinfer_site$toc$toc_component(p__31090,owner){
var map__31112 = p__31090;
var map__31112__$1 = ((((!((map__31112 == null)))?((((map__31112.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31112.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31112):map__31112);
var sections = cljs.core.get.call(null,map__31112__$1,new cljs.core.Keyword(null,"sections","sections",-886710106));
var section_map = cljs.core.get.call(null,map__31112__$1,new cljs.core.Keyword(null,"section-map","section-map",747555764));
var visible_QMARK_ = cljs.core.get.call(null,map__31112__$1,new cljs.core.Keyword(null,"visible?","visible?",2129863715));
if(typeof parinfer_site.toc.t_parinfer_site$toc31114 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
parinfer_site.toc.t_parinfer_site$toc31114 = (function (toc_component,p__31090,owner,map__31112,sections,section_map,visible_QMARK_,meta31115){
this.toc_component = toc_component;
this.p__31090 = p__31090;
this.owner = owner;
this.map__31112 = map__31112;
this.sections = sections;
this.section_map = section_map;
this.visible_QMARK_ = visible_QMARK_;
this.meta31115 = meta31115;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
parinfer_site.toc.t_parinfer_site$toc31114.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__31112,map__31112__$1,sections,section_map,visible_QMARK_){
return (function (_31116,meta31115__$1){
var self__ = this;
var _31116__$1 = this;
return (new parinfer_site.toc.t_parinfer_site$toc31114(self__.toc_component,self__.p__31090,self__.owner,self__.map__31112,self__.sections,self__.section_map,self__.visible_QMARK_,meta31115__$1));
});})(map__31112,map__31112__$1,sections,section_map,visible_QMARK_))
;

parinfer_site.toc.t_parinfer_site$toc31114.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__31112,map__31112__$1,sections,section_map,visible_QMARK_){
return (function (_31116){
var self__ = this;
var _31116__$1 = this;
return self__.meta31115;
});})(map__31112,map__31112__$1,sections,section_map,visible_QMARK_))
;

parinfer_site.toc.t_parinfer_site$toc31114.prototype.om$core$IRender$ = true;

parinfer_site.toc.t_parinfer_site$toc31114.prototype.om$core$IRender$render$arity$1 = ((function (map__31112,map__31112__$1,sections,section_map,visible_QMARK_){
return (function (_this){
var self__ = this;
var _this__$1 = this;
var active = cljs.core.apply.call(null,cljs.core.min_key,new cljs.core.Keyword(null,"order","order",-1254677256),self__.visible_QMARK_);
return React.createElement("div",null,cljs.core.into_array.call(null,(function (){var iter__17039__auto__ = ((function (active,_this__$1,map__31112,map__31112__$1,sections,section_map,visible_QMARK_){
return (function parinfer_site$toc$toc_component_$_iter__31117(s__31118){
return (new cljs.core.LazySeq(null,((function (active,_this__$1,map__31112,map__31112__$1,sections,section_map,visible_QMARK_){
return (function (){
var s__31118__$1 = s__31118;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__31118__$1);
if(temp__4425__auto__){
var s__31118__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__31118__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__31118__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__31120 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__31119 = (0);
while(true){
if((i__31119 < size__17038__auto__)){
var map__31127 = cljs.core._nth.call(null,c__17037__auto__,i__31119);
var map__31127__$1 = ((((!((map__31127 == null)))?((((map__31127.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31127.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31127):map__31127);
var current = map__31127__$1;
var id = cljs.core.get.call(null,map__31127__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var level = cljs.core.get.call(null,map__31127__$1,new cljs.core.Keyword(null,"level","level",1290497552));
var title = cljs.core.get.call(null,map__31127__$1,new cljs.core.Keyword(null,"title","title",636505583));
cljs.core.chunk_append.call(null,b__31120,sablono.interpreter.interpret.call(null,(function (){var attrs = parinfer_site.toc.section_attrs.call(null,current,active);
var classes = (function (){var G__31129 = [cljs.core.str("toc-link toc-level-"),cljs.core.str(level)].join('');
var G__31129__$1 = ((cljs.core._EQ_.call(null,current,active))?[cljs.core.str(G__31129),cljs.core.str(" toc-active")].join(''):G__31129);
var G__31129__$2 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"show?","show?",1543842127).cljs$core$IFn$_invoke$arity$1(attrs)))?[cljs.core.str(G__31129__$1),cljs.core.str(" toc-hide")].join(''):G__31129__$1);
var G__31129__$3 = (cljs.core.truth_(new cljs.core.Keyword(null,"ancestor-of-active?","ancestor-of-active?",-2078380373).cljs$core$IFn$_invoke$arity$1(attrs))?[cljs.core.str(G__31129__$2),cljs.core.str(" toc-active-ancestor")].join(''):G__31129__$2);
return G__31129__$3;
})();
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),classes], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),[cljs.core.str("#"),cljs.core.str(id)].join('')], null),title], null)], null);
})()));

var G__31133 = (i__31119 + (1));
i__31119 = G__31133;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__31120),parinfer_site$toc$toc_component_$_iter__31117.call(null,cljs.core.chunk_rest.call(null,s__31118__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__31120),null);
}
} else {
var map__31130 = cljs.core.first.call(null,s__31118__$2);
var map__31130__$1 = ((((!((map__31130 == null)))?((((map__31130.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31130.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31130):map__31130);
var current = map__31130__$1;
var id = cljs.core.get.call(null,map__31130__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var level = cljs.core.get.call(null,map__31130__$1,new cljs.core.Keyword(null,"level","level",1290497552));
var title = cljs.core.get.call(null,map__31130__$1,new cljs.core.Keyword(null,"title","title",636505583));
return cljs.core.cons.call(null,sablono.interpreter.interpret.call(null,(function (){var attrs = parinfer_site.toc.section_attrs.call(null,current,active);
var classes = (function (){var G__31132 = [cljs.core.str("toc-link toc-level-"),cljs.core.str(level)].join('');
var G__31132__$1 = ((cljs.core._EQ_.call(null,current,active))?[cljs.core.str(G__31132),cljs.core.str(" toc-active")].join(''):G__31132);
var G__31132__$2 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"show?","show?",1543842127).cljs$core$IFn$_invoke$arity$1(attrs)))?[cljs.core.str(G__31132__$1),cljs.core.str(" toc-hide")].join(''):G__31132__$1);
var G__31132__$3 = (cljs.core.truth_(new cljs.core.Keyword(null,"ancestor-of-active?","ancestor-of-active?",-2078380373).cljs$core$IFn$_invoke$arity$1(attrs))?[cljs.core.str(G__31132__$2),cljs.core.str(" toc-active-ancestor")].join(''):G__31132__$2);
return G__31132__$3;
})();
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),classes], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),[cljs.core.str("#"),cljs.core.str(id)].join('')], null),title], null)], null);
})()),parinfer_site$toc$toc_component_$_iter__31117.call(null,cljs.core.rest.call(null,s__31118__$2)));
}
} else {
return null;
}
break;
}
});})(active,_this__$1,map__31112,map__31112__$1,sections,section_map,visible_QMARK_))
,null,null));
});})(active,_this__$1,map__31112,map__31112__$1,sections,section_map,visible_QMARK_))
;
return iter__17039__auto__.call(null,self__.sections);
})()));
});})(map__31112,map__31112__$1,sections,section_map,visible_QMARK_))
;

parinfer_site.toc.t_parinfer_site$toc31114.getBasis = ((function (map__31112,map__31112__$1,sections,section_map,visible_QMARK_){
return (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"toc-component","toc-component",-1006380267,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"sections","sections",753821421,null),new cljs.core.Symbol(null,"section-map","section-map",-1906880005,null),new cljs.core.Symbol(null,"visible?","visible?",-524572054,null)], null)], null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"p__31090","p__31090",-2081043744,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"map__31112","map__31112",785205564,null),new cljs.core.Symbol(null,"sections","sections",753821421,null),new cljs.core.Symbol(null,"section-map","section-map",-1906880005,null),new cljs.core.Symbol(null,"visible?","visible?",-524572054,null),new cljs.core.Symbol(null,"meta31115","meta31115",1915528425,null)], null);
});})(map__31112,map__31112__$1,sections,section_map,visible_QMARK_))
;

parinfer_site.toc.t_parinfer_site$toc31114.cljs$lang$type = true;

parinfer_site.toc.t_parinfer_site$toc31114.cljs$lang$ctorStr = "parinfer-site.toc/t_parinfer_site$toc31114";

parinfer_site.toc.t_parinfer_site$toc31114.cljs$lang$ctorPrWriter = ((function (map__31112,map__31112__$1,sections,section_map,visible_QMARK_){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"parinfer-site.toc/t_parinfer_site$toc31114");
});})(map__31112,map__31112__$1,sections,section_map,visible_QMARK_))
;

parinfer_site.toc.__GT_t_parinfer_site$toc31114 = ((function (map__31112,map__31112__$1,sections,section_map,visible_QMARK_){
return (function parinfer_site$toc$toc_component_$___GT_t_parinfer_site$toc31114(toc_component__$1,p__31090__$1,owner__$1,map__31112__$2,sections__$1,section_map__$1,visible_QMARK___$1,meta31115){
return (new parinfer_site.toc.t_parinfer_site$toc31114(toc_component__$1,p__31090__$1,owner__$1,map__31112__$2,sections__$1,section_map__$1,visible_QMARK___$1,meta31115));
});})(map__31112,map__31112__$1,sections,section_map,visible_QMARK_))
;

}

return (new parinfer_site.toc.t_parinfer_site$toc31114(parinfer_site$toc$toc_component,p__31090,owner,map__31112__$1,sections,section_map,visible_QMARK_,cljs.core.PersistentArrayMap.EMPTY));
});
parinfer_site.toc.track_section_visibility_BANG_ = (function parinfer_site$toc$track_section_visibility_BANG_(){
var seq__31140 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"sections","sections",-886710106).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,parinfer_site.toc.state)));
var chunk__31141 = null;
var count__31142 = (0);
var i__31143 = (0);
while(true){
if((i__31143 < count__31142)){
var s = cljs.core._nth.call(null,chunk__31141,i__31143);
var G__31144_31146 = scrollMonitor.create(new cljs.core.Keyword(null,"section-elm","section-elm",-1980192654).cljs$core$IFn$_invoke$arity$1(s));
G__31144_31146.enterViewport(((function (seq__31140,chunk__31141,count__31142,i__31143,G__31144_31146,s){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer_site.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.conj,s);
});})(seq__31140,chunk__31141,count__31142,i__31143,G__31144_31146,s))
);

G__31144_31146.exitViewport(((function (seq__31140,chunk__31141,count__31142,i__31143,G__31144_31146,s){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer_site.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.disj,s);
});})(seq__31140,chunk__31141,count__31142,i__31143,G__31144_31146,s))
);


var G__31147 = seq__31140;
var G__31148 = chunk__31141;
var G__31149 = count__31142;
var G__31150 = (i__31143 + (1));
seq__31140 = G__31147;
chunk__31141 = G__31148;
count__31142 = G__31149;
i__31143 = G__31150;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__31140);
if(temp__4425__auto__){
var seq__31140__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__31140__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__31140__$1);
var G__31151 = cljs.core.chunk_rest.call(null,seq__31140__$1);
var G__31152 = c__17070__auto__;
var G__31153 = cljs.core.count.call(null,c__17070__auto__);
var G__31154 = (0);
seq__31140 = G__31151;
chunk__31141 = G__31152;
count__31142 = G__31153;
i__31143 = G__31154;
continue;
} else {
var s = cljs.core.first.call(null,seq__31140__$1);
var G__31145_31155 = scrollMonitor.create(new cljs.core.Keyword(null,"section-elm","section-elm",-1980192654).cljs$core$IFn$_invoke$arity$1(s));
G__31145_31155.enterViewport(((function (seq__31140,chunk__31141,count__31142,i__31143,G__31145_31155,s,seq__31140__$1,temp__4425__auto__){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer_site.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.conj,s);
});})(seq__31140,chunk__31141,count__31142,i__31143,G__31145_31155,s,seq__31140__$1,temp__4425__auto__))
);

G__31145_31155.exitViewport(((function (seq__31140,chunk__31141,count__31142,i__31143,G__31145_31155,s,seq__31140__$1,temp__4425__auto__){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer_site.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.disj,s);
});})(seq__31140,chunk__31141,count__31142,i__31143,G__31145_31155,s,seq__31140__$1,temp__4425__auto__))
);


var G__31156 = cljs.core.next.call(null,seq__31140__$1);
var G__31157 = null;
var G__31158 = (0);
var G__31159 = (0);
seq__31140 = G__31156;
chunk__31141 = G__31157;
count__31142 = G__31158;
i__31143 = G__31159;
continue;
}
} else {
return null;
}
}
break;
}
});
parinfer_site.toc.init_BANG_ = (function parinfer_site$toc$init_BANG_(){
if(cljs.core.truth_(new cljs.core.Keyword(null,"sections","sections",-886710106).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,parinfer_site.toc.state)))){
return null;
} else {
cljs.core.swap_BANG_.call(null,parinfer_site.toc.state,cljs.core.assoc,new cljs.core.Keyword(null,"sections","sections",-886710106),parinfer_site.toc.get_sections_BANG_.call(null));

parinfer_site.toc.track_section_visibility_BANG_.call(null);

return om.core.root.call(null,parinfer_site.toc.toc_component,parinfer_site.toc.state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("toc")], null));
}
});

//# sourceMappingURL=toc.js.map?rel=1449460869350