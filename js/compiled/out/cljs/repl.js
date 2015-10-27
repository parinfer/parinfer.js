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
var seq__54717_54731 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__54718_54732 = null;
var count__54719_54733 = (0);
var i__54720_54734 = (0);
while(true){
if((i__54720_54734 < count__54719_54733)){
var f_54735 = cljs.core._nth.call(null,chunk__54718_54732,i__54720_54734);
cljs.core.println.call(null,"  ",f_54735);

var G__54736 = seq__54717_54731;
var G__54737 = chunk__54718_54732;
var G__54738 = count__54719_54733;
var G__54739 = (i__54720_54734 + (1));
seq__54717_54731 = G__54736;
chunk__54718_54732 = G__54737;
count__54719_54733 = G__54738;
i__54720_54734 = G__54739;
continue;
} else {
var temp__4425__auto___54740 = cljs.core.seq.call(null,seq__54717_54731);
if(temp__4425__auto___54740){
var seq__54717_54741__$1 = temp__4425__auto___54740;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__54717_54741__$1)){
var c__17070__auto___54742 = cljs.core.chunk_first.call(null,seq__54717_54741__$1);
var G__54743 = cljs.core.chunk_rest.call(null,seq__54717_54741__$1);
var G__54744 = c__17070__auto___54742;
var G__54745 = cljs.core.count.call(null,c__17070__auto___54742);
var G__54746 = (0);
seq__54717_54731 = G__54743;
chunk__54718_54732 = G__54744;
count__54719_54733 = G__54745;
i__54720_54734 = G__54746;
continue;
} else {
var f_54747 = cljs.core.first.call(null,seq__54717_54741__$1);
cljs.core.println.call(null,"  ",f_54747);

var G__54748 = cljs.core.next.call(null,seq__54717_54741__$1);
var G__54749 = null;
var G__54750 = (0);
var G__54751 = (0);
seq__54717_54731 = G__54748;
chunk__54718_54732 = G__54749;
count__54719_54733 = G__54750;
i__54720_54734 = G__54751;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_54752 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__16267__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_54752);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_54752)))?cljs.core.second.call(null,arglists_54752):arglists_54752));
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
var seq__54721 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__54722 = null;
var count__54723 = (0);
var i__54724 = (0);
while(true){
if((i__54724 < count__54723)){
var vec__54725 = cljs.core._nth.call(null,chunk__54722,i__54724);
var name = cljs.core.nth.call(null,vec__54725,(0),null);
var map__54726 = cljs.core.nth.call(null,vec__54725,(1),null);
var map__54726__$1 = ((((!((map__54726 == null)))?((((map__54726.cljs$lang$protocol_mask$partition0$ & (64))) || (map__54726.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__54726):map__54726);
var doc = cljs.core.get.call(null,map__54726__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__54726__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__54753 = seq__54721;
var G__54754 = chunk__54722;
var G__54755 = count__54723;
var G__54756 = (i__54724 + (1));
seq__54721 = G__54753;
chunk__54722 = G__54754;
count__54723 = G__54755;
i__54724 = G__54756;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__54721);
if(temp__4425__auto__){
var seq__54721__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__54721__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__54721__$1);
var G__54757 = cljs.core.chunk_rest.call(null,seq__54721__$1);
var G__54758 = c__17070__auto__;
var G__54759 = cljs.core.count.call(null,c__17070__auto__);
var G__54760 = (0);
seq__54721 = G__54757;
chunk__54722 = G__54758;
count__54723 = G__54759;
i__54724 = G__54760;
continue;
} else {
var vec__54728 = cljs.core.first.call(null,seq__54721__$1);
var name = cljs.core.nth.call(null,vec__54728,(0),null);
var map__54729 = cljs.core.nth.call(null,vec__54728,(1),null);
var map__54729__$1 = ((((!((map__54729 == null)))?((((map__54729.cljs$lang$protocol_mask$partition0$ & (64))) || (map__54729.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__54729):map__54729);
var doc = cljs.core.get.call(null,map__54729__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__54729__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__54761 = cljs.core.next.call(null,seq__54721__$1);
var G__54762 = null;
var G__54763 = (0);
var G__54764 = (0);
seq__54721 = G__54761;
chunk__54722 = G__54762;
count__54723 = G__54763;
i__54724 = G__54764;
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

//# sourceMappingURL=repl.js.map?rel=1445965109472