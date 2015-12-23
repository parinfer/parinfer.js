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
return (function (p__21035,i){
var map__21036 = p__21035;
var map__21036__$1 = ((((!((map__21036 == null)))?((((map__21036.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21036.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21036):map__21036);
var result = map__21036__$1;
var stack = cljs.core.get.call(null,map__21036__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var sections = cljs.core.get.call(null,map__21036__$1,new cljs.core.Keyword(null,"sections","sections",-886710106));
var header_elm = (headers[i]);
var section_elm = header_elm.parentElement;
var id = section_elm.id;
var title = header_elm.textContent;
var prefix_elm = goog.dom.createDom("a",{"href": [cljs.core.str("#"),cljs.core.str(id)].join(''), "class": "header-link"},"#");
var level = parseInt(cljs.core.subs.call(null,header_elm.tagName,(1)));
var keep_QMARK_ = ((function (header_elm,section_elm,id,title,prefix_elm,level,map__21036,map__21036__$1,result,stack,sections,headers){
return (function (p1__21031_SHARP_){
return (new cljs.core.Keyword(null,"level","level",1290497552).cljs$core$IFn$_invoke$arity$1(p1__21031_SHARP_) < level);
});})(header_elm,section_elm,id,title,prefix_elm,level,map__21036,map__21036__$1,result,stack,sections,headers))
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
return (function (p1__21038_SHARP_){
return parinfer_site.toc.sibling_section_QMARK_.call(null,current,p1__21038_SHARP_);
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
parinfer_site.toc.toc_component = (function parinfer_site$toc$toc_component(p__21039,owner){
var map__21061 = p__21039;
var map__21061__$1 = ((((!((map__21061 == null)))?((((map__21061.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21061.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21061):map__21061);
var sections = cljs.core.get.call(null,map__21061__$1,new cljs.core.Keyword(null,"sections","sections",-886710106));
var section_map = cljs.core.get.call(null,map__21061__$1,new cljs.core.Keyword(null,"section-map","section-map",747555764));
var visible_QMARK_ = cljs.core.get.call(null,map__21061__$1,new cljs.core.Keyword(null,"visible?","visible?",2129863715));
if(typeof parinfer_site.toc.t_parinfer_site$toc21063 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
parinfer_site.toc.t_parinfer_site$toc21063 = (function (toc_component,p__21039,owner,map__21061,sections,section_map,visible_QMARK_,meta21064){
this.toc_component = toc_component;
this.p__21039 = p__21039;
this.owner = owner;
this.map__21061 = map__21061;
this.sections = sections;
this.section_map = section_map;
this.visible_QMARK_ = visible_QMARK_;
this.meta21064 = meta21064;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
parinfer_site.toc.t_parinfer_site$toc21063.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__21061,map__21061__$1,sections,section_map,visible_QMARK_){
return (function (_21065,meta21064__$1){
var self__ = this;
var _21065__$1 = this;
return (new parinfer_site.toc.t_parinfer_site$toc21063(self__.toc_component,self__.p__21039,self__.owner,self__.map__21061,self__.sections,self__.section_map,self__.visible_QMARK_,meta21064__$1));
});})(map__21061,map__21061__$1,sections,section_map,visible_QMARK_))
;

parinfer_site.toc.t_parinfer_site$toc21063.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__21061,map__21061__$1,sections,section_map,visible_QMARK_){
return (function (_21065){
var self__ = this;
var _21065__$1 = this;
return self__.meta21064;
});})(map__21061,map__21061__$1,sections,section_map,visible_QMARK_))
;

parinfer_site.toc.t_parinfer_site$toc21063.prototype.om$core$IRender$ = true;

parinfer_site.toc.t_parinfer_site$toc21063.prototype.om$core$IRender$render$arity$1 = ((function (map__21061,map__21061__$1,sections,section_map,visible_QMARK_){
return (function (_this){
var self__ = this;
var _this__$1 = this;
var active = cljs.core.apply.call(null,cljs.core.min_key,new cljs.core.Keyword(null,"order","order",-1254677256),self__.visible_QMARK_);
return React.createElement("div",null,cljs.core.into_array.call(null,(function (){var iter__17039__auto__ = ((function (active,_this__$1,map__21061,map__21061__$1,sections,section_map,visible_QMARK_){
return (function parinfer_site$toc$toc_component_$_iter__21066(s__21067){
return (new cljs.core.LazySeq(null,((function (active,_this__$1,map__21061,map__21061__$1,sections,section_map,visible_QMARK_){
return (function (){
var s__21067__$1 = s__21067;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__21067__$1);
if(temp__4425__auto__){
var s__21067__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__21067__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__21067__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__21069 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__21068 = (0);
while(true){
if((i__21068 < size__17038__auto__)){
var map__21076 = cljs.core._nth.call(null,c__17037__auto__,i__21068);
var map__21076__$1 = ((((!((map__21076 == null)))?((((map__21076.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21076.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21076):map__21076);
var current = map__21076__$1;
var id = cljs.core.get.call(null,map__21076__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var level = cljs.core.get.call(null,map__21076__$1,new cljs.core.Keyword(null,"level","level",1290497552));
var title = cljs.core.get.call(null,map__21076__$1,new cljs.core.Keyword(null,"title","title",636505583));
cljs.core.chunk_append.call(null,b__21069,sablono.interpreter.interpret.call(null,(function (){var attrs = parinfer_site.toc.section_attrs.call(null,current,active);
var classes = (function (){var G__21078 = [cljs.core.str("toc-link toc-level-"),cljs.core.str(level)].join('');
var G__21078__$1 = ((cljs.core._EQ_.call(null,current,active))?[cljs.core.str(G__21078),cljs.core.str(" toc-active")].join(''):G__21078);
var G__21078__$2 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"show?","show?",1543842127).cljs$core$IFn$_invoke$arity$1(attrs)))?[cljs.core.str(G__21078__$1),cljs.core.str(" toc-hide")].join(''):G__21078__$1);
var G__21078__$3 = (cljs.core.truth_(new cljs.core.Keyword(null,"ancestor-of-active?","ancestor-of-active?",-2078380373).cljs$core$IFn$_invoke$arity$1(attrs))?[cljs.core.str(G__21078__$2),cljs.core.str(" toc-active-ancestor")].join(''):G__21078__$2);
return G__21078__$3;
})();
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),classes], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),[cljs.core.str("#"),cljs.core.str(id)].join('')], null),title], null)], null);
})()));

var G__21082 = (i__21068 + (1));
i__21068 = G__21082;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__21069),parinfer_site$toc$toc_component_$_iter__21066.call(null,cljs.core.chunk_rest.call(null,s__21067__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__21069),null);
}
} else {
var map__21079 = cljs.core.first.call(null,s__21067__$2);
var map__21079__$1 = ((((!((map__21079 == null)))?((((map__21079.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21079.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21079):map__21079);
var current = map__21079__$1;
var id = cljs.core.get.call(null,map__21079__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var level = cljs.core.get.call(null,map__21079__$1,new cljs.core.Keyword(null,"level","level",1290497552));
var title = cljs.core.get.call(null,map__21079__$1,new cljs.core.Keyword(null,"title","title",636505583));
return cljs.core.cons.call(null,sablono.interpreter.interpret.call(null,(function (){var attrs = parinfer_site.toc.section_attrs.call(null,current,active);
var classes = (function (){var G__21081 = [cljs.core.str("toc-link toc-level-"),cljs.core.str(level)].join('');
var G__21081__$1 = ((cljs.core._EQ_.call(null,current,active))?[cljs.core.str(G__21081),cljs.core.str(" toc-active")].join(''):G__21081);
var G__21081__$2 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"show?","show?",1543842127).cljs$core$IFn$_invoke$arity$1(attrs)))?[cljs.core.str(G__21081__$1),cljs.core.str(" toc-hide")].join(''):G__21081__$1);
var G__21081__$3 = (cljs.core.truth_(new cljs.core.Keyword(null,"ancestor-of-active?","ancestor-of-active?",-2078380373).cljs$core$IFn$_invoke$arity$1(attrs))?[cljs.core.str(G__21081__$2),cljs.core.str(" toc-active-ancestor")].join(''):G__21081__$2);
return G__21081__$3;
})();
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),classes], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),[cljs.core.str("#"),cljs.core.str(id)].join('')], null),title], null)], null);
})()),parinfer_site$toc$toc_component_$_iter__21066.call(null,cljs.core.rest.call(null,s__21067__$2)));
}
} else {
return null;
}
break;
}
});})(active,_this__$1,map__21061,map__21061__$1,sections,section_map,visible_QMARK_))
,null,null));
});})(active,_this__$1,map__21061,map__21061__$1,sections,section_map,visible_QMARK_))
;
return iter__17039__auto__.call(null,self__.sections);
})()));
});})(map__21061,map__21061__$1,sections,section_map,visible_QMARK_))
;

parinfer_site.toc.t_parinfer_site$toc21063.getBasis = ((function (map__21061,map__21061__$1,sections,section_map,visible_QMARK_){
return (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"toc-component","toc-component",-1006380267,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"sections","sections",753821421,null),new cljs.core.Symbol(null,"section-map","section-map",-1906880005,null),new cljs.core.Symbol(null,"visible?","visible?",-524572054,null)], null)], null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"p__21039","p__21039",855277999,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"map__21061","map__21061",-573947723,null),new cljs.core.Symbol(null,"sections","sections",753821421,null),new cljs.core.Symbol(null,"section-map","section-map",-1906880005,null),new cljs.core.Symbol(null,"visible?","visible?",-524572054,null),new cljs.core.Symbol(null,"meta21064","meta21064",-1392488243,null)], null);
});})(map__21061,map__21061__$1,sections,section_map,visible_QMARK_))
;

parinfer_site.toc.t_parinfer_site$toc21063.cljs$lang$type = true;

parinfer_site.toc.t_parinfer_site$toc21063.cljs$lang$ctorStr = "parinfer-site.toc/t_parinfer_site$toc21063";

parinfer_site.toc.t_parinfer_site$toc21063.cljs$lang$ctorPrWriter = ((function (map__21061,map__21061__$1,sections,section_map,visible_QMARK_){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"parinfer-site.toc/t_parinfer_site$toc21063");
});})(map__21061,map__21061__$1,sections,section_map,visible_QMARK_))
;

parinfer_site.toc.__GT_t_parinfer_site$toc21063 = ((function (map__21061,map__21061__$1,sections,section_map,visible_QMARK_){
return (function parinfer_site$toc$toc_component_$___GT_t_parinfer_site$toc21063(toc_component__$1,p__21039__$1,owner__$1,map__21061__$2,sections__$1,section_map__$1,visible_QMARK___$1,meta21064){
return (new parinfer_site.toc.t_parinfer_site$toc21063(toc_component__$1,p__21039__$1,owner__$1,map__21061__$2,sections__$1,section_map__$1,visible_QMARK___$1,meta21064));
});})(map__21061,map__21061__$1,sections,section_map,visible_QMARK_))
;

}

return (new parinfer_site.toc.t_parinfer_site$toc21063(parinfer_site$toc$toc_component,p__21039,owner,map__21061__$1,sections,section_map,visible_QMARK_,cljs.core.PersistentArrayMap.EMPTY));
});
parinfer_site.toc.track_section_visibility_BANG_ = (function parinfer_site$toc$track_section_visibility_BANG_(){
var seq__21089 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"sections","sections",-886710106).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,parinfer_site.toc.state)));
var chunk__21090 = null;
var count__21091 = (0);
var i__21092 = (0);
while(true){
if((i__21092 < count__21091)){
var s = cljs.core._nth.call(null,chunk__21090,i__21092);
var G__21093_21095 = scrollMonitor.create(new cljs.core.Keyword(null,"section-elm","section-elm",-1980192654).cljs$core$IFn$_invoke$arity$1(s));
G__21093_21095.enterViewport(((function (seq__21089,chunk__21090,count__21091,i__21092,G__21093_21095,s){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer_site.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.conj,s);
});})(seq__21089,chunk__21090,count__21091,i__21092,G__21093_21095,s))
);

G__21093_21095.exitViewport(((function (seq__21089,chunk__21090,count__21091,i__21092,G__21093_21095,s){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer_site.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.disj,s);
});})(seq__21089,chunk__21090,count__21091,i__21092,G__21093_21095,s))
);


var G__21096 = seq__21089;
var G__21097 = chunk__21090;
var G__21098 = count__21091;
var G__21099 = (i__21092 + (1));
seq__21089 = G__21096;
chunk__21090 = G__21097;
count__21091 = G__21098;
i__21092 = G__21099;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__21089);
if(temp__4425__auto__){
var seq__21089__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21089__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__21089__$1);
var G__21100 = cljs.core.chunk_rest.call(null,seq__21089__$1);
var G__21101 = c__17070__auto__;
var G__21102 = cljs.core.count.call(null,c__17070__auto__);
var G__21103 = (0);
seq__21089 = G__21100;
chunk__21090 = G__21101;
count__21091 = G__21102;
i__21092 = G__21103;
continue;
} else {
var s = cljs.core.first.call(null,seq__21089__$1);
var G__21094_21104 = scrollMonitor.create(new cljs.core.Keyword(null,"section-elm","section-elm",-1980192654).cljs$core$IFn$_invoke$arity$1(s));
G__21094_21104.enterViewport(((function (seq__21089,chunk__21090,count__21091,i__21092,G__21094_21104,s,seq__21089__$1,temp__4425__auto__){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer_site.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.conj,s);
});})(seq__21089,chunk__21090,count__21091,i__21092,G__21094_21104,s,seq__21089__$1,temp__4425__auto__))
);

G__21094_21104.exitViewport(((function (seq__21089,chunk__21090,count__21091,i__21092,G__21094_21104,s,seq__21089__$1,temp__4425__auto__){
return (function (){
return cljs.core.swap_BANG_.call(null,parinfer_site.toc.state,cljs.core.update,new cljs.core.Keyword(null,"visible?","visible?",2129863715),cljs.core.disj,s);
});})(seq__21089,chunk__21090,count__21091,i__21092,G__21094_21104,s,seq__21089__$1,temp__4425__auto__))
);


var G__21105 = cljs.core.next.call(null,seq__21089__$1);
var G__21106 = null;
var G__21107 = (0);
var G__21108 = (0);
seq__21089 = G__21105;
chunk__21090 = G__21106;
count__21091 = G__21107;
i__21092 = G__21108;
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

//# sourceMappingURL=toc.js.map?rel=1450835340668