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
var seq__29347_29361 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__29348_29362 = null;
var count__29349_29363 = (0);
var i__29350_29364 = (0);
while(true){
if((i__29350_29364 < count__29349_29363)){
var f_29365 = cljs.core._nth.call(null,chunk__29348_29362,i__29350_29364);
cljs.core.println.call(null,"  ",f_29365);

var G__29366 = seq__29347_29361;
var G__29367 = chunk__29348_29362;
var G__29368 = count__29349_29363;
var G__29369 = (i__29350_29364 + (1));
seq__29347_29361 = G__29366;
chunk__29348_29362 = G__29367;
count__29349_29363 = G__29368;
i__29350_29364 = G__29369;
continue;
} else {
var temp__4425__auto___29370 = cljs.core.seq.call(null,seq__29347_29361);
if(temp__4425__auto___29370){
var seq__29347_29371__$1 = temp__4425__auto___29370;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29347_29371__$1)){
var c__17070__auto___29372 = cljs.core.chunk_first.call(null,seq__29347_29371__$1);
var G__29373 = cljs.core.chunk_rest.call(null,seq__29347_29371__$1);
var G__29374 = c__17070__auto___29372;
var G__29375 = cljs.core.count.call(null,c__17070__auto___29372);
var G__29376 = (0);
seq__29347_29361 = G__29373;
chunk__29348_29362 = G__29374;
count__29349_29363 = G__29375;
i__29350_29364 = G__29376;
continue;
} else {
var f_29377 = cljs.core.first.call(null,seq__29347_29371__$1);
cljs.core.println.call(null,"  ",f_29377);

var G__29378 = cljs.core.next.call(null,seq__29347_29371__$1);
var G__29379 = null;
var G__29380 = (0);
var G__29381 = (0);
seq__29347_29361 = G__29378;
chunk__29348_29362 = G__29379;
count__29349_29363 = G__29380;
i__29350_29364 = G__29381;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_29382 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__16267__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_29382);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_29382)))?cljs.core.second.call(null,arglists_29382):arglists_29382));
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
var seq__29351 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__29352 = null;
var count__29353 = (0);
var i__29354 = (0);
while(true){
if((i__29354 < count__29353)){
var vec__29355 = cljs.core._nth.call(null,chunk__29352,i__29354);
var name = cljs.core.nth.call(null,vec__29355,(0),null);
var map__29356 = cljs.core.nth.call(null,vec__29355,(1),null);
var map__29356__$1 = ((((!((map__29356 == null)))?((((map__29356.cljs$lang$protocol_mask$partition0$ & (64))) || (map__29356.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29356):map__29356);
var doc = cljs.core.get.call(null,map__29356__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__29356__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__29383 = seq__29351;
var G__29384 = chunk__29352;
var G__29385 = count__29353;
var G__29386 = (i__29354 + (1));
seq__29351 = G__29383;
chunk__29352 = G__29384;
count__29353 = G__29385;
i__29354 = G__29386;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__29351);
if(temp__4425__auto__){
var seq__29351__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29351__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__29351__$1);
var G__29387 = cljs.core.chunk_rest.call(null,seq__29351__$1);
var G__29388 = c__17070__auto__;
var G__29389 = cljs.core.count.call(null,c__17070__auto__);
var G__29390 = (0);
seq__29351 = G__29387;
chunk__29352 = G__29388;
count__29353 = G__29389;
i__29354 = G__29390;
continue;
} else {
var vec__29358 = cljs.core.first.call(null,seq__29351__$1);
var name = cljs.core.nth.call(null,vec__29358,(0),null);
var map__29359 = cljs.core.nth.call(null,vec__29358,(1),null);
var map__29359__$1 = ((((!((map__29359 == null)))?((((map__29359.cljs$lang$protocol_mask$partition0$ & (64))) || (map__29359.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29359):map__29359);
var doc = cljs.core.get.call(null,map__29359__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__29359__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__29391 = cljs.core.next.call(null,seq__29351__$1);
var G__29392 = null;
var G__29393 = (0);
var G__29394 = (0);
seq__29351 = G__29391;
chunk__29352 = G__29392;
count__29353 = G__29393;
i__29354 = G__29394;
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

//# sourceMappingURL=repl.js.map?rel=1450835349099