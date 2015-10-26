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
var seq__45459_45473 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__45460_45474 = null;
var count__45461_45475 = (0);
var i__45462_45476 = (0);
while(true){
if((i__45462_45476 < count__45461_45475)){
var f_45477 = cljs.core._nth.call(null,chunk__45460_45474,i__45462_45476);
cljs.core.println.call(null,"  ",f_45477);

var G__45478 = seq__45459_45473;
var G__45479 = chunk__45460_45474;
var G__45480 = count__45461_45475;
var G__45481 = (i__45462_45476 + (1));
seq__45459_45473 = G__45478;
chunk__45460_45474 = G__45479;
count__45461_45475 = G__45480;
i__45462_45476 = G__45481;
continue;
} else {
var temp__4425__auto___45482 = cljs.core.seq.call(null,seq__45459_45473);
if(temp__4425__auto___45482){
var seq__45459_45483__$1 = temp__4425__auto___45482;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45459_45483__$1)){
var c__17070__auto___45484 = cljs.core.chunk_first.call(null,seq__45459_45483__$1);
var G__45485 = cljs.core.chunk_rest.call(null,seq__45459_45483__$1);
var G__45486 = c__17070__auto___45484;
var G__45487 = cljs.core.count.call(null,c__17070__auto___45484);
var G__45488 = (0);
seq__45459_45473 = G__45485;
chunk__45460_45474 = G__45486;
count__45461_45475 = G__45487;
i__45462_45476 = G__45488;
continue;
} else {
var f_45489 = cljs.core.first.call(null,seq__45459_45483__$1);
cljs.core.println.call(null,"  ",f_45489);

var G__45490 = cljs.core.next.call(null,seq__45459_45483__$1);
var G__45491 = null;
var G__45492 = (0);
var G__45493 = (0);
seq__45459_45473 = G__45490;
chunk__45460_45474 = G__45491;
count__45461_45475 = G__45492;
i__45462_45476 = G__45493;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_45494 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__16267__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_45494);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_45494)))?cljs.core.second.call(null,arglists_45494):arglists_45494));
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
var seq__45463 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__45464 = null;
var count__45465 = (0);
var i__45466 = (0);
while(true){
if((i__45466 < count__45465)){
var vec__45467 = cljs.core._nth.call(null,chunk__45464,i__45466);
var name = cljs.core.nth.call(null,vec__45467,(0),null);
var map__45468 = cljs.core.nth.call(null,vec__45467,(1),null);
var map__45468__$1 = ((((!((map__45468 == null)))?((((map__45468.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45468.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45468):map__45468);
var doc = cljs.core.get.call(null,map__45468__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__45468__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__45495 = seq__45463;
var G__45496 = chunk__45464;
var G__45497 = count__45465;
var G__45498 = (i__45466 + (1));
seq__45463 = G__45495;
chunk__45464 = G__45496;
count__45465 = G__45497;
i__45466 = G__45498;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__45463);
if(temp__4425__auto__){
var seq__45463__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45463__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__45463__$1);
var G__45499 = cljs.core.chunk_rest.call(null,seq__45463__$1);
var G__45500 = c__17070__auto__;
var G__45501 = cljs.core.count.call(null,c__17070__auto__);
var G__45502 = (0);
seq__45463 = G__45499;
chunk__45464 = G__45500;
count__45465 = G__45501;
i__45466 = G__45502;
continue;
} else {
var vec__45470 = cljs.core.first.call(null,seq__45463__$1);
var name = cljs.core.nth.call(null,vec__45470,(0),null);
var map__45471 = cljs.core.nth.call(null,vec__45470,(1),null);
var map__45471__$1 = ((((!((map__45471 == null)))?((((map__45471.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45471.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45471):map__45471);
var doc = cljs.core.get.call(null,map__45471__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__45471__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__45503 = cljs.core.next.call(null,seq__45463__$1);
var G__45504 = null;
var G__45505 = (0);
var G__45506 = (0);
seq__45463 = G__45503;
chunk__45464 = G__45504;
count__45465 = G__45505;
i__45466 = G__45506;
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

//# sourceMappingURL=repl.js.map?rel=1445823450215