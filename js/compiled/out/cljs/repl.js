// Compiled by ClojureScript 1.7.122 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
cljs.repl.print_doc = (function cljs$repl$print_doc(m){
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,[cljs.core.str((function (){var temp__4425__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4425__auto__)){
var ns = temp__4425__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__39679_39693 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__39680_39694 = null;
var count__39681_39695 = (0);
var i__39682_39696 = (0);
while(true){
if((i__39682_39696 < count__39681_39695)){
var f_39697 = cljs.core._nth.call(null,chunk__39680_39694,i__39682_39696);
cljs.core.println.call(null,"  ",f_39697);

var G__39698 = seq__39679_39693;
var G__39699 = chunk__39680_39694;
var G__39700 = count__39681_39695;
var G__39701 = (i__39682_39696 + (1));
seq__39679_39693 = G__39698;
chunk__39680_39694 = G__39699;
count__39681_39695 = G__39700;
i__39682_39696 = G__39701;
continue;
} else {
var temp__4425__auto___39702 = cljs.core.seq.call(null,seq__39679_39693);
if(temp__4425__auto___39702){
var seq__39679_39703__$1 = temp__4425__auto___39702;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39679_39703__$1)){
var c__17070__auto___39704 = cljs.core.chunk_first.call(null,seq__39679_39703__$1);
var G__39705 = cljs.core.chunk_rest.call(null,seq__39679_39703__$1);
var G__39706 = c__17070__auto___39704;
var G__39707 = cljs.core.count.call(null,c__17070__auto___39704);
var G__39708 = (0);
seq__39679_39693 = G__39705;
chunk__39680_39694 = G__39706;
count__39681_39695 = G__39707;
i__39682_39696 = G__39708;
continue;
} else {
var f_39709 = cljs.core.first.call(null,seq__39679_39703__$1);
cljs.core.println.call(null,"  ",f_39709);

var G__39710 = cljs.core.next.call(null,seq__39679_39703__$1);
var G__39711 = null;
var G__39712 = (0);
var G__39713 = (0);
seq__39679_39693 = G__39710;
chunk__39680_39694 = G__39711;
count__39681_39695 = G__39712;
i__39682_39696 = G__39713;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_39714 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__16267__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_39714);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_39714)))?cljs.core.second.call(null,arglists_39714):arglists_39714));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__39683 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__39684 = null;
var count__39685 = (0);
var i__39686 = (0);
while(true){
if((i__39686 < count__39685)){
var vec__39687 = cljs.core._nth.call(null,chunk__39684,i__39686);
var name = cljs.core.nth.call(null,vec__39687,(0),null);
var map__39688 = cljs.core.nth.call(null,vec__39687,(1),null);
var map__39688__$1 = ((((!((map__39688 == null)))?((((map__39688.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39688.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39688):map__39688);
var doc = cljs.core.get.call(null,map__39688__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__39688__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__39715 = seq__39683;
var G__39716 = chunk__39684;
var G__39717 = count__39685;
var G__39718 = (i__39686 + (1));
seq__39683 = G__39715;
chunk__39684 = G__39716;
count__39685 = G__39717;
i__39686 = G__39718;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__39683);
if(temp__4425__auto__){
var seq__39683__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39683__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__39683__$1);
var G__39719 = cljs.core.chunk_rest.call(null,seq__39683__$1);
var G__39720 = c__17070__auto__;
var G__39721 = cljs.core.count.call(null,c__17070__auto__);
var G__39722 = (0);
seq__39683 = G__39719;
chunk__39684 = G__39720;
count__39685 = G__39721;
i__39686 = G__39722;
continue;
} else {
var vec__39690 = cljs.core.first.call(null,seq__39683__$1);
var name = cljs.core.nth.call(null,vec__39690,(0),null);
var map__39691 = cljs.core.nth.call(null,vec__39690,(1),null);
var map__39691__$1 = ((((!((map__39691 == null)))?((((map__39691.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39691.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39691):map__39691);
var doc = cljs.core.get.call(null,map__39691__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__39691__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__39723 = cljs.core.next.call(null,seq__39683__$1);
var G__39724 = null;
var G__39725 = (0);
var G__39726 = (0);
seq__39683 = G__39723;
chunk__39684 = G__39724;
count__39685 = G__39725;
i__39686 = G__39726;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}
});

//# sourceMappingURL=repl.js.map?rel=1449460878919