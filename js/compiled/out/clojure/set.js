// Compiled by ClojureScript 1.7.122 {}
goog.provide('clojure.set');
goog.require('cljs.core');
clojure.set.bubble_max_key = (function clojure$set$bubble_max_key(k,coll){

var max = cljs.core.apply.call(null,cljs.core.max_key,k,coll);
return cljs.core.cons.call(null,max,cljs.core.remove.call(null,((function (max){
return (function (p1__27141_SHARP_){
return (max === p1__27141_SHARP_);
});})(max))
,coll));
});
/**
 * Return a set that is the union of the input sets
 */
clojure.set.union = (function clojure$set$union(var_args){
var args27142 = [];
var len__17325__auto___27148 = arguments.length;
var i__17326__auto___27149 = (0);
while(true){
if((i__17326__auto___27149 < len__17325__auto___27148)){
args27142.push((arguments[i__17326__auto___27149]));

var G__27150 = (i__17326__auto___27149 + (1));
i__17326__auto___27149 = G__27150;
continue;
} else {
}
break;
}

var G__27147 = args27142.length;
switch (G__27147) {
case 0:
return clojure.set.union.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return clojure.set.union.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojure.set.union.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__17344__auto__ = (new cljs.core.IndexedSeq(args27142.slice((2)),(0)));
return clojure.set.union.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__17344__auto__);

}
});

clojure.set.union.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.PersistentHashSet.EMPTY;
});

clojure.set.union.cljs$core$IFn$_invoke$arity$1 = (function (s1){
return s1;
});

clojure.set.union.cljs$core$IFn$_invoke$arity$2 = (function (s1,s2){
if((cljs.core.count.call(null,s1) < cljs.core.count.call(null,s2))){
return cljs.core.reduce.call(null,cljs.core.conj,s2,s1);
} else {
return cljs.core.reduce.call(null,cljs.core.conj,s1,s2);
}
});

clojure.set.union.cljs$core$IFn$_invoke$arity$variadic = (function (s1,s2,sets){
var bubbled_sets = clojure.set.bubble_max_key.call(null,cljs.core.count,cljs.core.conj.call(null,sets,s2,s1));
return cljs.core.reduce.call(null,cljs.core.into,cljs.core.first.call(null,bubbled_sets),cljs.core.rest.call(null,bubbled_sets));
});

clojure.set.union.cljs$lang$applyTo = (function (seq27143){
var G__27144 = cljs.core.first.call(null,seq27143);
var seq27143__$1 = cljs.core.next.call(null,seq27143);
var G__27145 = cljs.core.first.call(null,seq27143__$1);
var seq27143__$2 = cljs.core.next.call(null,seq27143__$1);
return clojure.set.union.cljs$core$IFn$_invoke$arity$variadic(G__27144,G__27145,seq27143__$2);
});

clojure.set.union.cljs$lang$maxFixedArity = (2);
/**
 * Return a set that is the intersection of the input sets
 */
clojure.set.intersection = (function clojure$set$intersection(var_args){
var args27153 = [];
var len__17325__auto___27159 = arguments.length;
var i__17326__auto___27160 = (0);
while(true){
if((i__17326__auto___27160 < len__17325__auto___27159)){
args27153.push((arguments[i__17326__auto___27160]));

var G__27161 = (i__17326__auto___27160 + (1));
i__17326__auto___27160 = G__27161;
continue;
} else {
}
break;
}

var G__27158 = args27153.length;
switch (G__27158) {
case 1:
return clojure.set.intersection.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojure.set.intersection.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__17344__auto__ = (new cljs.core.IndexedSeq(args27153.slice((2)),(0)));
return clojure.set.intersection.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__17344__auto__);

}
});

clojure.set.intersection.cljs$core$IFn$_invoke$arity$1 = (function (s1){
return s1;
});

clojure.set.intersection.cljs$core$IFn$_invoke$arity$2 = (function (s1,s2){
while(true){
if((cljs.core.count.call(null,s2) < cljs.core.count.call(null,s1))){
var G__27163 = s2;
var G__27164 = s1;
s1 = G__27163;
s2 = G__27164;
continue;
} else {
return cljs.core.reduce.call(null,((function (s1,s2){
return (function (result,item){
if(cljs.core.contains_QMARK_.call(null,s2,item)){
return result;
} else {
return cljs.core.disj.call(null,result,item);
}
});})(s1,s2))
,s1,s1);
}
break;
}
});

clojure.set.intersection.cljs$core$IFn$_invoke$arity$variadic = (function (s1,s2,sets){
var bubbled_sets = clojure.set.bubble_max_key.call(null,(function (p1__27152_SHARP_){
return (- cljs.core.count.call(null,p1__27152_SHARP_));
}),cljs.core.conj.call(null,sets,s2,s1));
return cljs.core.reduce.call(null,clojure.set.intersection,cljs.core.first.call(null,bubbled_sets),cljs.core.rest.call(null,bubbled_sets));
});

clojure.set.intersection.cljs$lang$applyTo = (function (seq27154){
var G__27155 = cljs.core.first.call(null,seq27154);
var seq27154__$1 = cljs.core.next.call(null,seq27154);
var G__27156 = cljs.core.first.call(null,seq27154__$1);
var seq27154__$2 = cljs.core.next.call(null,seq27154__$1);
return clojure.set.intersection.cljs$core$IFn$_invoke$arity$variadic(G__27155,G__27156,seq27154__$2);
});

clojure.set.intersection.cljs$lang$maxFixedArity = (2);
/**
 * Return a set that is the first set without elements of the remaining sets
 */
clojure.set.difference = (function clojure$set$difference(var_args){
var args27165 = [];
var len__17325__auto___27171 = arguments.length;
var i__17326__auto___27172 = (0);
while(true){
if((i__17326__auto___27172 < len__17325__auto___27171)){
args27165.push((arguments[i__17326__auto___27172]));

var G__27173 = (i__17326__auto___27172 + (1));
i__17326__auto___27172 = G__27173;
continue;
} else {
}
break;
}

var G__27170 = args27165.length;
switch (G__27170) {
case 1:
return clojure.set.difference.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojure.set.difference.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__17344__auto__ = (new cljs.core.IndexedSeq(args27165.slice((2)),(0)));
return clojure.set.difference.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__17344__auto__);

}
});

clojure.set.difference.cljs$core$IFn$_invoke$arity$1 = (function (s1){
return s1;
});

clojure.set.difference.cljs$core$IFn$_invoke$arity$2 = (function (s1,s2){
if((cljs.core.count.call(null,s1) < cljs.core.count.call(null,s2))){
return cljs.core.reduce.call(null,(function (result,item){
if(cljs.core.contains_QMARK_.call(null,s2,item)){
return cljs.core.disj.call(null,result,item);
} else {
return result;
}
}),s1,s1);
} else {
return cljs.core.reduce.call(null,cljs.core.disj,s1,s2);
}
});

clojure.set.difference.cljs$core$IFn$_invoke$arity$variadic = (function (s1,s2,sets){
return cljs.core.reduce.call(null,clojure.set.difference,s1,cljs.core.conj.call(null,sets,s2));
});

clojure.set.difference.cljs$lang$applyTo = (function (seq27166){
var G__27167 = cljs.core.first.call(null,seq27166);
var seq27166__$1 = cljs.core.next.call(null,seq27166);
var G__27168 = cljs.core.first.call(null,seq27166__$1);
var seq27166__$2 = cljs.core.next.call(null,seq27166__$1);
return clojure.set.difference.cljs$core$IFn$_invoke$arity$variadic(G__27167,G__27168,seq27166__$2);
});

clojure.set.difference.cljs$lang$maxFixedArity = (2);
/**
 * Returns a set of the elements for which pred is true
 */
clojure.set.select = (function clojure$set$select(pred,xset){
return cljs.core.reduce.call(null,(function (s,k){
if(cljs.core.truth_(pred.call(null,k))){
return s;
} else {
return cljs.core.disj.call(null,s,k);
}
}),xset,xset);
});
/**
 * Returns a rel of the elements of xrel with only the keys in ks
 */
clojure.set.project = (function clojure$set$project(xrel,ks){
return cljs.core.set.call(null,cljs.core.map.call(null,(function (p1__27175_SHARP_){
return cljs.core.select_keys.call(null,p1__27175_SHARP_,ks);
}),xrel));
});
/**
 * Returns the map with the keys in kmap renamed to the vals in kmap
 */
clojure.set.rename_keys = (function clojure$set$rename_keys(map,kmap){
return cljs.core.reduce.call(null,(function (m,p__27178){
var vec__27179 = p__27178;
var old = cljs.core.nth.call(null,vec__27179,(0),null);
var new$ = cljs.core.nth.call(null,vec__27179,(1),null);
if(cljs.core.contains_QMARK_.call(null,map,old)){
return cljs.core.assoc.call(null,m,new$,cljs.core.get.call(null,map,old));
} else {
return m;
}
}),cljs.core.apply.call(null,cljs.core.dissoc,map,cljs.core.keys.call(null,kmap)),kmap);
});
/**
 * Returns a rel of the maps in xrel with the keys in kmap renamed to the vals in kmap
 */
clojure.set.rename = (function clojure$set$rename(xrel,kmap){
return cljs.core.set.call(null,cljs.core.map.call(null,(function (p1__27180_SHARP_){
return clojure.set.rename_keys.call(null,p1__27180_SHARP_,kmap);
}),xrel));
});
/**
 * Returns a map of the distinct values of ks in the xrel mapped to a
 *   set of the maps in xrel with the corresponding values of ks.
 */
clojure.set.index = (function clojure$set$index(xrel,ks){
return cljs.core.reduce.call(null,(function (m,x){
var ik = cljs.core.select_keys.call(null,x,ks);
return cljs.core.assoc.call(null,m,ik,cljs.core.conj.call(null,cljs.core.get.call(null,m,ik,cljs.core.PersistentHashSet.EMPTY),x));
}),cljs.core.PersistentArrayMap.EMPTY,xrel);
});
/**
 * Returns the map with the vals mapped to the keys.
 */
clojure.set.map_invert = (function clojure$set$map_invert(m){
return cljs.core.reduce.call(null,(function (m__$1,p__27183){
var vec__27184 = p__27183;
var k = cljs.core.nth.call(null,vec__27184,(0),null);
var v = cljs.core.nth.call(null,vec__27184,(1),null);
return cljs.core.assoc.call(null,m__$1,v,k);
}),cljs.core.PersistentArrayMap.EMPTY,m);
});
/**
 * When passed 2 rels, returns the rel corresponding to the natural
 *   join. When passed an additional keymap, joins on the corresponding
 *   keys.
 */
clojure.set.join = (function clojure$set$join(var_args){
var args27189 = [];
var len__17325__auto___27194 = arguments.length;
var i__17326__auto___27195 = (0);
while(true){
if((i__17326__auto___27195 < len__17325__auto___27194)){
args27189.push((arguments[i__17326__auto___27195]));

var G__27196 = (i__17326__auto___27195 + (1));
i__17326__auto___27195 = G__27196;
continue;
} else {
}
break;
}

var G__27191 = args27189.length;
switch (G__27191) {
case 2:
return clojure.set.join.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return clojure.set.join.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27189.length)].join('')));

}
});

clojure.set.join.cljs$core$IFn$_invoke$arity$2 = (function (xrel,yrel){
if((cljs.core.seq.call(null,xrel)) && (cljs.core.seq.call(null,yrel))){
var ks = clojure.set.intersection.call(null,cljs.core.set.call(null,cljs.core.keys.call(null,cljs.core.first.call(null,xrel))),cljs.core.set.call(null,cljs.core.keys.call(null,cljs.core.first.call(null,yrel))));
var vec__27192 = (((cljs.core.count.call(null,xrel) <= cljs.core.count.call(null,yrel)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [xrel,yrel], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [yrel,xrel], null));
var r = cljs.core.nth.call(null,vec__27192,(0),null);
var s = cljs.core.nth.call(null,vec__27192,(1),null);
var idx = clojure.set.index.call(null,r,ks);
return cljs.core.reduce.call(null,((function (ks,vec__27192,r,s,idx){
return (function (ret,x){
var found = idx.call(null,cljs.core.select_keys.call(null,x,ks));
if(cljs.core.truth_(found)){
return cljs.core.reduce.call(null,((function (found,ks,vec__27192,r,s,idx){
return (function (p1__27185_SHARP_,p2__27186_SHARP_){
return cljs.core.conj.call(null,p1__27185_SHARP_,cljs.core.merge.call(null,p2__27186_SHARP_,x));
});})(found,ks,vec__27192,r,s,idx))
,ret,found);
} else {
return ret;
}
});})(ks,vec__27192,r,s,idx))
,cljs.core.PersistentHashSet.EMPTY,s);
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
});

clojure.set.join.cljs$core$IFn$_invoke$arity$3 = (function (xrel,yrel,km){
var vec__27193 = (((cljs.core.count.call(null,xrel) <= cljs.core.count.call(null,yrel)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [xrel,yrel,clojure.set.map_invert.call(null,km)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [yrel,xrel,km], null));
var r = cljs.core.nth.call(null,vec__27193,(0),null);
var s = cljs.core.nth.call(null,vec__27193,(1),null);
var k = cljs.core.nth.call(null,vec__27193,(2),null);
var idx = clojure.set.index.call(null,r,cljs.core.vals.call(null,k));
return cljs.core.reduce.call(null,((function (vec__27193,r,s,k,idx){
return (function (ret,x){
var found = idx.call(null,clojure.set.rename_keys.call(null,cljs.core.select_keys.call(null,x,cljs.core.keys.call(null,k)),k));
if(cljs.core.truth_(found)){
return cljs.core.reduce.call(null,((function (found,vec__27193,r,s,k,idx){
return (function (p1__27187_SHARP_,p2__27188_SHARP_){
return cljs.core.conj.call(null,p1__27187_SHARP_,cljs.core.merge.call(null,p2__27188_SHARP_,x));
});})(found,vec__27193,r,s,k,idx))
,ret,found);
} else {
return ret;
}
});})(vec__27193,r,s,k,idx))
,cljs.core.PersistentHashSet.EMPTY,s);
});

clojure.set.join.cljs$lang$maxFixedArity = 3;
/**
 * Is set1 a subset of set2?
 */
clojure.set.subset_QMARK_ = (function clojure$set$subset_QMARK_(set1,set2){
return ((cljs.core.count.call(null,set1) <= cljs.core.count.call(null,set2))) && (cljs.core.every_QMARK_.call(null,(function (p1__27198_SHARP_){
return cljs.core.contains_QMARK_.call(null,set2,p1__27198_SHARP_);
}),set1));
});
/**
 * Is set1 a superset of set2?
 */
clojure.set.superset_QMARK_ = (function clojure$set$superset_QMARK_(set1,set2){
return ((cljs.core.count.call(null,set1) >= cljs.core.count.call(null,set2))) && (cljs.core.every_QMARK_.call(null,(function (p1__27199_SHARP_){
return cljs.core.contains_QMARK_.call(null,set1,p1__27199_SHARP_);
}),set2));
});

//# sourceMappingURL=set.js.map?rel=1450835346110