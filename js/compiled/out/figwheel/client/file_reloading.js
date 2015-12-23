// Compiled by ClojureScript 1.7.122 {}
goog.provide('figwheel.client.file_reloading');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('goog.Uri');
goog.require('goog.net.jsloader');
goog.require('cljs.core.async');
goog.require('goog.object');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('figwheel.client.utils');
figwheel.client.file_reloading.queued_file_reload;
if(typeof figwheel.client.file_reloading.figwheel_meta_pragmas !== 'undefined'){
} else {
figwheel.client.file_reloading.figwheel_meta_pragmas = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
figwheel.client.file_reloading.on_jsload_custom_event = (function figwheel$client$file_reloading$on_jsload_custom_event(url){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.js-reload",url);
});
figwheel.client.file_reloading.before_jsload_custom_event = (function figwheel$client$file_reloading$before_jsload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.before-js-reload",files);
});
figwheel.client.file_reloading.namespace_file_map_QMARK_ = (function figwheel$client$file_reloading$namespace_file_map_QMARK_(m){
var or__16267__auto__ = (cljs.core.map_QMARK_.call(null,m)) && (typeof new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(m) === 'string') && (((new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) == null)) || (typeof new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) === 'string')) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"namespace","namespace",-377510372)));
if(or__16267__auto__){
return or__16267__auto__;
} else {
cljs.core.println.call(null,"Error not namespace-file-map",cljs.core.pr_str.call(null,m));

return false;
}
});
figwheel.client.file_reloading.add_cache_buster = (function figwheel$client$file_reloading$add_cache_buster(url){

return goog.Uri.parse(url).makeUnique();
});
figwheel.client.file_reloading.name__GT_path = (function figwheel$client$file_reloading$name__GT_path(ns){

return (goog.dependencies_.nameToPath[ns]);
});
figwheel.client.file_reloading.provided_QMARK_ = (function figwheel$client$file_reloading$provided_QMARK_(ns){
return (goog.dependencies_.written[figwheel.client.file_reloading.name__GT_path.call(null,ns)]);
});
figwheel.client.file_reloading.fix_node_request_url = (function figwheel$client$file_reloading$fix_node_request_url(url){

if(cljs.core.truth_(goog.string.startsWith(url,"../"))){
return clojure.string.replace.call(null,url,"../","");
} else {
return [cljs.core.str("goog/"),cljs.core.str(url)].join('');
}
});
figwheel.client.file_reloading.immutable_ns_QMARK_ = (function figwheel$client$file_reloading$immutable_ns_QMARK_(name){
var or__16267__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, ["svgpan.SvgPan",null,"far.out",null,"testDep.bar",null,"someprotopackage.TestPackageTypes",null,"goog",null,"an.existing.path",null,"cljs.core",null,"ns",null,"dup.base",null], null), null).call(null,name);
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return cljs.core.some.call(null,cljs.core.partial.call(null,goog.string.startsWith,name),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["goog.","cljs.","clojure.","fake.","proto2."], null));
}
});
figwheel.client.file_reloading.get_requires = (function figwheel$client$file_reloading$get_requires(ns){
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__29399_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__29399_SHARP_));
}),goog.object.getKeys((goog.dependencies_.requires[figwheel.client.file_reloading.name__GT_path.call(null,ns)]))));
});
if(typeof figwheel.client.file_reloading.dependency_data !== 'undefined'){
} else {
figwheel.client.file_reloading.dependency_data = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"dependents","dependents",136812837),cljs.core.PersistentArrayMap.EMPTY], null));
}
figwheel.client.file_reloading.path_to_name_BANG_ = (function figwheel$client$file_reloading$path_to_name_BANG_(path,name){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.fromArray([name], true));
});
/**
 * Setup a path to name dependencies map.
 * That goes from path -> #{ ns-names }
 */
figwheel.client.file_reloading.setup_path__GT_name_BANG_ = (function figwheel$client$file_reloading$setup_path__GT_name_BANG_(){
var nameToPath = goog.object.filter(goog.dependencies_.nameToPath,(function (v,k,o){
return goog.string.startsWith(v,"../");
}));
return goog.object.forEach(nameToPath,((function (nameToPath){
return (function (v,k,o){
return figwheel.client.file_reloading.path_to_name_BANG_.call(null,v,k);
});})(nameToPath))
);
});
/**
 * returns a set of namespaces defined by a path
 */
figwheel.client.file_reloading.path__GT_name = (function figwheel$client$file_reloading$path__GT_name(path){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null));
});
figwheel.client.file_reloading.name_to_parent_BANG_ = (function figwheel$client$file_reloading$name_to_parent_BANG_(ns,parent_ns){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.fromArray([parent_ns], true));
});
/**
 * This reverses the goog.dependencies_.requires for looking up ns-dependents.
 */
figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_ = (function figwheel$client$file_reloading$setup_ns__GT_dependents_BANG_(){
var requires = goog.object.filter(goog.dependencies_.requires,(function (v,k,o){
return goog.string.startsWith(k,"../");
}));
return goog.object.forEach(requires,((function (requires){
return (function (v,k,_){
return goog.object.forEach(v,((function (requires){
return (function (v_SINGLEQUOTE_,k_SINGLEQUOTE_,___$1){
var seq__29404 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__29405 = null;
var count__29406 = (0);
var i__29407 = (0);
while(true){
if((i__29407 < count__29406)){
var n = cljs.core._nth.call(null,chunk__29405,i__29407);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__29408 = seq__29404;
var G__29409 = chunk__29405;
var G__29410 = count__29406;
var G__29411 = (i__29407 + (1));
seq__29404 = G__29408;
chunk__29405 = G__29409;
count__29406 = G__29410;
i__29407 = G__29411;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__29404);
if(temp__4425__auto__){
var seq__29404__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29404__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__29404__$1);
var G__29412 = cljs.core.chunk_rest.call(null,seq__29404__$1);
var G__29413 = c__17070__auto__;
var G__29414 = cljs.core.count.call(null,c__17070__auto__);
var G__29415 = (0);
seq__29404 = G__29412;
chunk__29405 = G__29413;
count__29406 = G__29414;
i__29407 = G__29415;
continue;
} else {
var n = cljs.core.first.call(null,seq__29404__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__29416 = cljs.core.next.call(null,seq__29404__$1);
var G__29417 = null;
var G__29418 = (0);
var G__29419 = (0);
seq__29404 = G__29416;
chunk__29405 = G__29417;
count__29406 = G__29418;
i__29407 = G__29419;
continue;
}
} else {
return null;
}
}
break;
}
});})(requires))
);
});})(requires))
);
});
figwheel.client.file_reloading.ns__GT_dependents = (function figwheel$client$file_reloading$ns__GT_dependents(ns){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null));
});
figwheel.client.file_reloading.build_topo_sort = (function figwheel$client$file_reloading$build_topo_sort(get_deps){
var get_deps__$1 = cljs.core.memoize.call(null,get_deps);
var topo_sort_helper_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_topo_sort_helper_STAR_(x,depth,state){
var deps = get_deps__$1.call(null,x);
if(cljs.core.empty_QMARK_.call(null,deps)){
return null;
} else {
return topo_sort_STAR_.call(null,deps,depth,state);
}
});})(get_deps__$1))
;
var topo_sort_STAR_ = ((function (get_deps__$1){
return (function() {
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = null;
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1 = (function (deps){
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.call(null,deps,(0),cljs.core.atom.call(null,cljs.core.sorted_map.call(null)));
});
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3 = (function (deps,depth,state){
cljs.core.swap_BANG_.call(null,state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [depth], null),cljs.core.fnil.call(null,cljs.core.into,cljs.core.PersistentHashSet.EMPTY),deps);

var seq__29458_29465 = cljs.core.seq.call(null,deps);
var chunk__29459_29466 = null;
var count__29460_29467 = (0);
var i__29461_29468 = (0);
while(true){
if((i__29461_29468 < count__29460_29467)){
var dep_29469 = cljs.core._nth.call(null,chunk__29459_29466,i__29461_29468);
topo_sort_helper_STAR_.call(null,dep_29469,(depth + (1)),state);

var G__29470 = seq__29458_29465;
var G__29471 = chunk__29459_29466;
var G__29472 = count__29460_29467;
var G__29473 = (i__29461_29468 + (1));
seq__29458_29465 = G__29470;
chunk__29459_29466 = G__29471;
count__29460_29467 = G__29472;
i__29461_29468 = G__29473;
continue;
} else {
var temp__4425__auto___29474 = cljs.core.seq.call(null,seq__29458_29465);
if(temp__4425__auto___29474){
var seq__29458_29475__$1 = temp__4425__auto___29474;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29458_29475__$1)){
var c__17070__auto___29476 = cljs.core.chunk_first.call(null,seq__29458_29475__$1);
var G__29477 = cljs.core.chunk_rest.call(null,seq__29458_29475__$1);
var G__29478 = c__17070__auto___29476;
var G__29479 = cljs.core.count.call(null,c__17070__auto___29476);
var G__29480 = (0);
seq__29458_29465 = G__29477;
chunk__29459_29466 = G__29478;
count__29460_29467 = G__29479;
i__29461_29468 = G__29480;
continue;
} else {
var dep_29481 = cljs.core.first.call(null,seq__29458_29475__$1);
topo_sort_helper_STAR_.call(null,dep_29481,(depth + (1)),state);

var G__29482 = cljs.core.next.call(null,seq__29458_29475__$1);
var G__29483 = null;
var G__29484 = (0);
var G__29485 = (0);
seq__29458_29465 = G__29482;
chunk__29459_29466 = G__29483;
count__29460_29467 = G__29484;
i__29461_29468 = G__29485;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,depth,(0))){
return elim_dups_STAR_.call(null,cljs.core.reverse.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,state))));
} else {
return null;
}
});
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = function(deps,depth,state){
switch(arguments.length){
case 1:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1.call(this,deps);
case 3:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3.call(this,deps,depth,state);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1;
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$3 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3;
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_;
})()
;})(get_deps__$1))
;
var elim_dups_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__29462){
var vec__29464 = p__29462;
var x = cljs.core.nth.call(null,vec__29464,(0),null);
var xs = cljs.core.nthnext.call(null,vec__29464,(1));
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,((function (vec__29464,x,xs,get_deps__$1){
return (function (p1__29420_SHARP_){
return clojure.set.difference.call(null,p1__29420_SHARP_,x);
});})(vec__29464,x,xs,get_deps__$1))
,xs)));
}
});})(get_deps__$1))
;
return topo_sort_STAR_;
});
figwheel.client.file_reloading.get_all_dependencies = (function figwheel$client$file_reloading$get_all_dependencies(ns){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.get_requires);
return cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns], null))));
});
figwheel.client.file_reloading.get_all_dependents = (function figwheel$client$file_reloading$get_all_dependents(nss){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.ns__GT_dependents);
return cljs.core.reverse.call(null,cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,nss))));
});
figwheel.client.file_reloading.unprovide_BANG_ = (function figwheel$client$file_reloading$unprovide_BANG_(ns){
var path = figwheel.client.file_reloading.name__GT_path.call(null,ns);
goog.object.remove(goog.dependencies_.visited,path);

goog.object.remove(goog.dependencies_.written,path);

return goog.object.remove(goog.dependencies_.written,[cljs.core.str(goog.basePath),cljs.core.str(path)].join(''));
});
figwheel.client.file_reloading.resolve_ns = (function figwheel$client$file_reloading$resolve_ns(ns){
return [cljs.core.str(goog.basePath),cljs.core.str(figwheel.client.file_reloading.name__GT_path.call(null,ns))].join('');
});
figwheel.client.file_reloading.addDependency = (function figwheel$client$file_reloading$addDependency(path,provides,requires){
var seq__29498 = cljs.core.seq.call(null,provides);
var chunk__29499 = null;
var count__29500 = (0);
var i__29501 = (0);
while(true){
if((i__29501 < count__29500)){
var prov = cljs.core._nth.call(null,chunk__29499,i__29501);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__29502_29510 = cljs.core.seq.call(null,requires);
var chunk__29503_29511 = null;
var count__29504_29512 = (0);
var i__29505_29513 = (0);
while(true){
if((i__29505_29513 < count__29504_29512)){
var req_29514 = cljs.core._nth.call(null,chunk__29503_29511,i__29505_29513);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_29514,prov);

var G__29515 = seq__29502_29510;
var G__29516 = chunk__29503_29511;
var G__29517 = count__29504_29512;
var G__29518 = (i__29505_29513 + (1));
seq__29502_29510 = G__29515;
chunk__29503_29511 = G__29516;
count__29504_29512 = G__29517;
i__29505_29513 = G__29518;
continue;
} else {
var temp__4425__auto___29519 = cljs.core.seq.call(null,seq__29502_29510);
if(temp__4425__auto___29519){
var seq__29502_29520__$1 = temp__4425__auto___29519;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29502_29520__$1)){
var c__17070__auto___29521 = cljs.core.chunk_first.call(null,seq__29502_29520__$1);
var G__29522 = cljs.core.chunk_rest.call(null,seq__29502_29520__$1);
var G__29523 = c__17070__auto___29521;
var G__29524 = cljs.core.count.call(null,c__17070__auto___29521);
var G__29525 = (0);
seq__29502_29510 = G__29522;
chunk__29503_29511 = G__29523;
count__29504_29512 = G__29524;
i__29505_29513 = G__29525;
continue;
} else {
var req_29526 = cljs.core.first.call(null,seq__29502_29520__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_29526,prov);

var G__29527 = cljs.core.next.call(null,seq__29502_29520__$1);
var G__29528 = null;
var G__29529 = (0);
var G__29530 = (0);
seq__29502_29510 = G__29527;
chunk__29503_29511 = G__29528;
count__29504_29512 = G__29529;
i__29505_29513 = G__29530;
continue;
}
} else {
}
}
break;
}

var G__29531 = seq__29498;
var G__29532 = chunk__29499;
var G__29533 = count__29500;
var G__29534 = (i__29501 + (1));
seq__29498 = G__29531;
chunk__29499 = G__29532;
count__29500 = G__29533;
i__29501 = G__29534;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__29498);
if(temp__4425__auto__){
var seq__29498__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29498__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__29498__$1);
var G__29535 = cljs.core.chunk_rest.call(null,seq__29498__$1);
var G__29536 = c__17070__auto__;
var G__29537 = cljs.core.count.call(null,c__17070__auto__);
var G__29538 = (0);
seq__29498 = G__29535;
chunk__29499 = G__29536;
count__29500 = G__29537;
i__29501 = G__29538;
continue;
} else {
var prov = cljs.core.first.call(null,seq__29498__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__29506_29539 = cljs.core.seq.call(null,requires);
var chunk__29507_29540 = null;
var count__29508_29541 = (0);
var i__29509_29542 = (0);
while(true){
if((i__29509_29542 < count__29508_29541)){
var req_29543 = cljs.core._nth.call(null,chunk__29507_29540,i__29509_29542);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_29543,prov);

var G__29544 = seq__29506_29539;
var G__29545 = chunk__29507_29540;
var G__29546 = count__29508_29541;
var G__29547 = (i__29509_29542 + (1));
seq__29506_29539 = G__29544;
chunk__29507_29540 = G__29545;
count__29508_29541 = G__29546;
i__29509_29542 = G__29547;
continue;
} else {
var temp__4425__auto___29548__$1 = cljs.core.seq.call(null,seq__29506_29539);
if(temp__4425__auto___29548__$1){
var seq__29506_29549__$1 = temp__4425__auto___29548__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29506_29549__$1)){
var c__17070__auto___29550 = cljs.core.chunk_first.call(null,seq__29506_29549__$1);
var G__29551 = cljs.core.chunk_rest.call(null,seq__29506_29549__$1);
var G__29552 = c__17070__auto___29550;
var G__29553 = cljs.core.count.call(null,c__17070__auto___29550);
var G__29554 = (0);
seq__29506_29539 = G__29551;
chunk__29507_29540 = G__29552;
count__29508_29541 = G__29553;
i__29509_29542 = G__29554;
continue;
} else {
var req_29555 = cljs.core.first.call(null,seq__29506_29549__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_29555,prov);

var G__29556 = cljs.core.next.call(null,seq__29506_29549__$1);
var G__29557 = null;
var G__29558 = (0);
var G__29559 = (0);
seq__29506_29539 = G__29556;
chunk__29507_29540 = G__29557;
count__29508_29541 = G__29558;
i__29509_29542 = G__29559;
continue;
}
} else {
}
}
break;
}

var G__29560 = cljs.core.next.call(null,seq__29498__$1);
var G__29561 = null;
var G__29562 = (0);
var G__29563 = (0);
seq__29498 = G__29560;
chunk__29499 = G__29561;
count__29500 = G__29562;
i__29501 = G__29563;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.file_reloading.figwheel_require = (function figwheel$client$file_reloading$figwheel_require(src,reload){
goog.require = figwheel$client$file_reloading$figwheel_require;

if(cljs.core._EQ_.call(null,reload,"reload-all")){
var seq__29568_29572 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__29569_29573 = null;
var count__29570_29574 = (0);
var i__29571_29575 = (0);
while(true){
if((i__29571_29575 < count__29570_29574)){
var ns_29576 = cljs.core._nth.call(null,chunk__29569_29573,i__29571_29575);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_29576);

var G__29577 = seq__29568_29572;
var G__29578 = chunk__29569_29573;
var G__29579 = count__29570_29574;
var G__29580 = (i__29571_29575 + (1));
seq__29568_29572 = G__29577;
chunk__29569_29573 = G__29578;
count__29570_29574 = G__29579;
i__29571_29575 = G__29580;
continue;
} else {
var temp__4425__auto___29581 = cljs.core.seq.call(null,seq__29568_29572);
if(temp__4425__auto___29581){
var seq__29568_29582__$1 = temp__4425__auto___29581;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29568_29582__$1)){
var c__17070__auto___29583 = cljs.core.chunk_first.call(null,seq__29568_29582__$1);
var G__29584 = cljs.core.chunk_rest.call(null,seq__29568_29582__$1);
var G__29585 = c__17070__auto___29583;
var G__29586 = cljs.core.count.call(null,c__17070__auto___29583);
var G__29587 = (0);
seq__29568_29572 = G__29584;
chunk__29569_29573 = G__29585;
count__29570_29574 = G__29586;
i__29571_29575 = G__29587;
continue;
} else {
var ns_29588 = cljs.core.first.call(null,seq__29568_29582__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_29588);

var G__29589 = cljs.core.next.call(null,seq__29568_29582__$1);
var G__29590 = null;
var G__29591 = (0);
var G__29592 = (0);
seq__29568_29572 = G__29589;
chunk__29569_29573 = G__29590;
count__29570_29574 = G__29591;
i__29571_29575 = G__29592;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(reload)){
figwheel.client.file_reloading.unprovide_BANG_.call(null,src);
} else {
}

return goog.require_figwheel_backup_(src);
});
/**
 * Reusable browser REPL bootstrapping. Patches the essential functions
 *   in goog.base to support re-loading of namespaces after page load.
 */
figwheel.client.file_reloading.bootstrap_goog_base = (function figwheel$client$file_reloading$bootstrap_goog_base(){
if(cljs.core.truth_(COMPILED)){
return null;
} else {
goog.require_figwheel_backup_ = (function (){var or__16267__auto__ = goog.require__;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return goog.require;
}
})();

goog.isProvided_ = (function (name){
return false;
});

figwheel.client.file_reloading.setup_path__GT_name_BANG_.call(null);

figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_.call(null);

goog.addDependency_figwheel_backup_ = goog.addDependency;

goog.addDependency = (function() { 
var G__29593__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__29593 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__29594__i = 0, G__29594__a = new Array(arguments.length -  0);
while (G__29594__i < G__29594__a.length) {G__29594__a[G__29594__i] = arguments[G__29594__i + 0]; ++G__29594__i;}
  args = new cljs.core.IndexedSeq(G__29594__a,0);
} 
return G__29593__delegate.call(this,args);};
G__29593.cljs$lang$maxFixedArity = 0;
G__29593.cljs$lang$applyTo = (function (arglist__29595){
var args = cljs.core.seq(arglist__29595);
return G__29593__delegate(args);
});
G__29593.cljs$core$IFn$_invoke$arity$variadic = G__29593__delegate;
return G__29593;
})()
;

goog.constructNamespace_("cljs.user");

goog.global.CLOSURE_IMPORT_SCRIPT = figwheel.client.file_reloading.queued_file_reload;

return goog.require = figwheel.client.file_reloading.figwheel_require;
}
});
figwheel.client.file_reloading.patch_goog_base = (function figwheel$client$file_reloading$patch_goog_base(){
if(typeof figwheel.client.file_reloading.bootstrapped_cljs !== 'undefined'){
return null;
} else {
figwheel.client.file_reloading.bootstrapped_cljs = (function (){
figwheel.client.file_reloading.bootstrap_goog_base.call(null);

return true;
})()
;
}
});
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__29596 = cljs.core._EQ_;
var expr__29597 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__29596.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__29597))){
return ((function (pred__29596,expr__29597){
return (function (request_url,callback){

var root = clojure.string.join.call(null,"/",cljs.core.reverse.call(null,cljs.core.drop.call(null,(2),cljs.core.reverse.call(null,clojure.string.split.call(null,__dirname,"/")))));
var path = [cljs.core.str(root),cljs.core.str("/"),cljs.core.str(figwheel.client.file_reloading.fix_node_request_url.call(null,request_url))].join('');
(require.cache[path] = null);

return callback.call(null,(function (){try{return require(path);
}catch (e29599){if((e29599 instanceof Error)){
var e = e29599;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e29599;

}
}})());
});
;})(pred__29596,expr__29597))
} else {
if(cljs.core.truth_(pred__29596.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__29597))){
return ((function (pred__29596,expr__29597){
return (function (request_url,callback){

var deferred = goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),{"cleanupWhenDone": true});
deferred.addCallback(((function (deferred,pred__29596,expr__29597){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(deferred,pred__29596,expr__29597))
);

return deferred.addErrback(((function (deferred,pred__29596,expr__29597){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(deferred,pred__29596,expr__29597))
);
});
;})(pred__29596,expr__29597))
} else {
return ((function (pred__29596,expr__29597){
return (function (a,b){
throw "Reload not defined for this platform";
});
;})(pred__29596,expr__29597))
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__29600,callback){
var map__29603 = p__29600;
var map__29603__$1 = ((((!((map__29603 == null)))?((((map__29603.cljs$lang$protocol_mask$partition0$ & (64))) || (map__29603.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29603):map__29603);
var file_msg = map__29603__$1;
var request_url = cljs.core.get.call(null,map__29603__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Attempting to load "),cljs.core.str(request_url)].join(''));

return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,((function (map__29603,map__29603__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Successfully loaded "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__29603,map__29603__$1,file_msg,request_url))
);
});
if(typeof figwheel.client.file_reloading.reload_chan !== 'undefined'){
} else {
figwheel.client.file_reloading.reload_chan = cljs.core.async.chan.call(null);
}
if(typeof figwheel.client.file_reloading.on_load_callbacks !== 'undefined'){
} else {
figwheel.client.file_reloading.on_load_callbacks = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
if(typeof figwheel.client.file_reloading.dependencies_loaded !== 'undefined'){
} else {
figwheel.client.file_reloading.dependencies_loaded = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
}
figwheel.client.file_reloading.blocking_load = (function figwheel$client$file_reloading$blocking_load(url){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.reload_file.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"request-url","request-url",2100346596),url], null),((function (out){
return (function (file_msg){
cljs.core.async.put_BANG_.call(null,out,file_msg);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
if(typeof figwheel.client.file_reloading.reloader_loop !== 'undefined'){
} else {
figwheel.client.file_reloading.reloader_loop = (function (){var c__20372__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto__){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto__){
return (function (state_29627){
var state_val_29628 = (state_29627[(1)]);
if((state_val_29628 === (7))){
var inst_29623 = (state_29627[(2)]);
var state_29627__$1 = state_29627;
var statearr_29629_29649 = state_29627__$1;
(statearr_29629_29649[(2)] = inst_29623);

(statearr_29629_29649[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29628 === (1))){
var state_29627__$1 = state_29627;
var statearr_29630_29650 = state_29627__$1;
(statearr_29630_29650[(2)] = null);

(statearr_29630_29650[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29628 === (4))){
var inst_29607 = (state_29627[(7)]);
var inst_29607__$1 = (state_29627[(2)]);
var state_29627__$1 = (function (){var statearr_29631 = state_29627;
(statearr_29631[(7)] = inst_29607__$1);

return statearr_29631;
})();
if(cljs.core.truth_(inst_29607__$1)){
var statearr_29632_29651 = state_29627__$1;
(statearr_29632_29651[(1)] = (5));

} else {
var statearr_29633_29652 = state_29627__$1;
(statearr_29633_29652[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29628 === (6))){
var state_29627__$1 = state_29627;
var statearr_29634_29653 = state_29627__$1;
(statearr_29634_29653[(2)] = null);

(statearr_29634_29653[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29628 === (3))){
var inst_29625 = (state_29627[(2)]);
var state_29627__$1 = state_29627;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_29627__$1,inst_29625);
} else {
if((state_val_29628 === (2))){
var state_29627__$1 = state_29627;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29627__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_29628 === (11))){
var inst_29619 = (state_29627[(2)]);
var state_29627__$1 = (function (){var statearr_29635 = state_29627;
(statearr_29635[(8)] = inst_29619);

return statearr_29635;
})();
var statearr_29636_29654 = state_29627__$1;
(statearr_29636_29654[(2)] = null);

(statearr_29636_29654[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29628 === (9))){
var inst_29613 = (state_29627[(9)]);
var inst_29611 = (state_29627[(10)]);
var inst_29615 = inst_29613.call(null,inst_29611);
var state_29627__$1 = state_29627;
var statearr_29637_29655 = state_29627__$1;
(statearr_29637_29655[(2)] = inst_29615);

(statearr_29637_29655[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29628 === (5))){
var inst_29607 = (state_29627[(7)]);
var inst_29609 = figwheel.client.file_reloading.blocking_load.call(null,inst_29607);
var state_29627__$1 = state_29627;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29627__$1,(8),inst_29609);
} else {
if((state_val_29628 === (10))){
var inst_29611 = (state_29627[(10)]);
var inst_29617 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_29611);
var state_29627__$1 = state_29627;
var statearr_29638_29656 = state_29627__$1;
(statearr_29638_29656[(2)] = inst_29617);

(statearr_29638_29656[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29628 === (8))){
var inst_29613 = (state_29627[(9)]);
var inst_29607 = (state_29627[(7)]);
var inst_29611 = (state_29627[(2)]);
var inst_29612 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_29613__$1 = cljs.core.get.call(null,inst_29612,inst_29607);
var state_29627__$1 = (function (){var statearr_29639 = state_29627;
(statearr_29639[(9)] = inst_29613__$1);

(statearr_29639[(10)] = inst_29611);

return statearr_29639;
})();
if(cljs.core.truth_(inst_29613__$1)){
var statearr_29640_29657 = state_29627__$1;
(statearr_29640_29657[(1)] = (9));

} else {
var statearr_29641_29658 = state_29627__$1;
(statearr_29641_29658[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__20372__auto__))
;
return ((function (switch__20351__auto__,c__20372__auto__){
return (function() {
var figwheel$client$file_reloading$state_machine__20352__auto__ = null;
var figwheel$client$file_reloading$state_machine__20352__auto____0 = (function (){
var statearr_29645 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_29645[(0)] = figwheel$client$file_reloading$state_machine__20352__auto__);

(statearr_29645[(1)] = (1));

return statearr_29645;
});
var figwheel$client$file_reloading$state_machine__20352__auto____1 = (function (state_29627){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_29627);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e29646){if((e29646 instanceof Object)){
var ex__20355__auto__ = e29646;
var statearr_29647_29659 = state_29627;
(statearr_29647_29659[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_29627);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e29646;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29660 = state_29627;
state_29627 = G__29660;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__20352__auto__ = function(state_29627){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__20352__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__20352__auto____1.call(this,state_29627);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__20352__auto____0;
figwheel$client$file_reloading$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__20352__auto____1;
return figwheel$client$file_reloading$state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto__))
})();
var state__20374__auto__ = (function (){var statearr_29648 = f__20373__auto__.call(null);
(statearr_29648[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto__);

return statearr_29648;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto__))
);

return c__20372__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(url){
return cljs.core.async.put_BANG_.call(null,figwheel.client.file_reloading.reload_chan,url);
});
figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__29661,callback){
var map__29664 = p__29661;
var map__29664__$1 = ((((!((map__29664 == null)))?((((map__29664.cljs$lang$protocol_mask$partition0$ & (64))) || (map__29664.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29664):map__29664);
var file_msg = map__29664__$1;
var namespace = cljs.core.get.call(null,map__29664__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,((function (request_url,map__29664,map__29664__$1,file_msg,namespace){
return (function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
});})(request_url,map__29664,map__29664__$1,file_msg,namespace))
);

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__29666){
var map__29669 = p__29666;
var map__29669__$1 = ((((!((map__29669 == null)))?((((map__29669.cljs$lang$protocol_mask$partition0$ & (64))) || (map__29669.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29669):map__29669);
var file_msg = map__29669__$1;
var namespace = cljs.core.get.call(null,map__29669__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
var and__16255__auto__ = cljs.core.not.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_pragmas));
if(and__16255__auto__){
var or__16267__auto__ = new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
var or__16267__auto____$1 = new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__16267__auto____$1)){
return or__16267__auto____$1;
} else {
return figwheel.client.file_reloading.provided_QMARK_.call(null,cljs.core.name.call(null,namespace));
}
}
} else {
return and__16255__auto__;
}
});
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__29671,callback){
var map__29674 = p__29671;
var map__29674__$1 = ((((!((map__29674 == null)))?((((map__29674.cljs$lang$protocol_mask$partition0$ & (64))) || (map__29674.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29674):map__29674);
var file_msg = map__29674__$1;
var request_url = cljs.core.get.call(null,map__29674__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__29674__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

if(cljs.core.truth_(figwheel.client.file_reloading.reload_file_QMARK_.call(null,file_msg))){
return figwheel.client.file_reloading.require_with_callback.call(null,file_msg,callback);
} else {
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Figwheel: Not trying to load file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});
figwheel.client.file_reloading.reload_js_file = (function figwheel$client$file_reloading$reload_js_file(file_msg){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.js_reload.call(null,file_msg,((function (out){
return (function (url){
cljs.core.async.put_BANG_.call(null,out,url);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
/**
 * Returns a chanel with one collection of loaded filenames on it.
 */
figwheel.client.file_reloading.load_all_js_files = (function figwheel$client$file_reloading$load_all_js_files(files){
var out = cljs.core.async.chan.call(null);
var c__20372__auto___29762 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___29762,out){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___29762,out){
return (function (state_29744){
var state_val_29745 = (state_29744[(1)]);
if((state_val_29745 === (1))){
var inst_29722 = cljs.core.nth.call(null,files,(0),null);
var inst_29723 = cljs.core.nthnext.call(null,files,(1));
var inst_29724 = files;
var state_29744__$1 = (function (){var statearr_29746 = state_29744;
(statearr_29746[(7)] = inst_29723);

(statearr_29746[(8)] = inst_29722);

(statearr_29746[(9)] = inst_29724);

return statearr_29746;
})();
var statearr_29747_29763 = state_29744__$1;
(statearr_29747_29763[(2)] = null);

(statearr_29747_29763[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29745 === (2))){
var inst_29727 = (state_29744[(10)]);
var inst_29724 = (state_29744[(9)]);
var inst_29727__$1 = cljs.core.nth.call(null,inst_29724,(0),null);
var inst_29728 = cljs.core.nthnext.call(null,inst_29724,(1));
var inst_29729 = (inst_29727__$1 == null);
var inst_29730 = cljs.core.not.call(null,inst_29729);
var state_29744__$1 = (function (){var statearr_29748 = state_29744;
(statearr_29748[(10)] = inst_29727__$1);

(statearr_29748[(11)] = inst_29728);

return statearr_29748;
})();
if(inst_29730){
var statearr_29749_29764 = state_29744__$1;
(statearr_29749_29764[(1)] = (4));

} else {
var statearr_29750_29765 = state_29744__$1;
(statearr_29750_29765[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29745 === (3))){
var inst_29742 = (state_29744[(2)]);
var state_29744__$1 = state_29744;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_29744__$1,inst_29742);
} else {
if((state_val_29745 === (4))){
var inst_29727 = (state_29744[(10)]);
var inst_29732 = figwheel.client.file_reloading.reload_js_file.call(null,inst_29727);
var state_29744__$1 = state_29744;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29744__$1,(7),inst_29732);
} else {
if((state_val_29745 === (5))){
var inst_29738 = cljs.core.async.close_BANG_.call(null,out);
var state_29744__$1 = state_29744;
var statearr_29751_29766 = state_29744__$1;
(statearr_29751_29766[(2)] = inst_29738);

(statearr_29751_29766[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29745 === (6))){
var inst_29740 = (state_29744[(2)]);
var state_29744__$1 = state_29744;
var statearr_29752_29767 = state_29744__$1;
(statearr_29752_29767[(2)] = inst_29740);

(statearr_29752_29767[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_29745 === (7))){
var inst_29728 = (state_29744[(11)]);
var inst_29734 = (state_29744[(2)]);
var inst_29735 = cljs.core.async.put_BANG_.call(null,out,inst_29734);
var inst_29724 = inst_29728;
var state_29744__$1 = (function (){var statearr_29753 = state_29744;
(statearr_29753[(9)] = inst_29724);

(statearr_29753[(12)] = inst_29735);

return statearr_29753;
})();
var statearr_29754_29768 = state_29744__$1;
(statearr_29754_29768[(2)] = null);

(statearr_29754_29768[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(c__20372__auto___29762,out))
;
return ((function (switch__20351__auto__,c__20372__auto___29762,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__20352__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__20352__auto____0 = (function (){
var statearr_29758 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_29758[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__20352__auto__);

(statearr_29758[(1)] = (1));

return statearr_29758;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__20352__auto____1 = (function (state_29744){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_29744);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e29759){if((e29759 instanceof Object)){
var ex__20355__auto__ = e29759;
var statearr_29760_29769 = state_29744;
(statearr_29760_29769[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_29744);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e29759;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29770 = state_29744;
state_29744 = G__29770;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__20352__auto__ = function(state_29744){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__20352__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__20352__auto____1.call(this,state_29744);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__20352__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__20352__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___29762,out))
})();
var state__20374__auto__ = (function (){var statearr_29761 = f__20373__auto__.call(null);
(statearr_29761[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___29762);

return statearr_29761;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___29762,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__29771,opts){
var map__29775 = p__29771;
var map__29775__$1 = ((((!((map__29775 == null)))?((((map__29775.cljs$lang$protocol_mask$partition0$ & (64))) || (map__29775.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29775):map__29775);
var eval_body__$1 = cljs.core.get.call(null,map__29775__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__29775__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_((function (){var and__16255__auto__ = eval_body__$1;
if(cljs.core.truth_(and__16255__auto__)){
return typeof eval_body__$1 === 'string';
} else {
return and__16255__auto__;
}
})())){
var code = eval_body__$1;
try{figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Evaling file "),cljs.core.str(file)].join(''));

return figwheel.client.utils.eval_helper.call(null,code,opts);
}catch (e29777){var e = e29777;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Unable to evaluate "),cljs.core.str(file)].join(''));
}} else {
return null;
}
});
figwheel.client.file_reloading.expand_files = (function figwheel$client$file_reloading$expand_files(files){
var deps = figwheel.client.file_reloading.get_all_dependents.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["figwheel.connect",null], null), null),new cljs.core.Keyword(null,"namespace","namespace",-377510372)),cljs.core.map.call(null,((function (deps){
return (function (n){
var temp__4423__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (deps){
return (function (p1__29778_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__29778_SHARP_),n);
});})(deps))
,files));
if(cljs.core.truth_(temp__4423__auto__)){
var file_msg = temp__4423__auto__;
return file_msg;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372),new cljs.core.Keyword(null,"namespace","namespace",-377510372),n], null);
}
});})(deps))
,deps));
});
figwheel.client.file_reloading.sort_files = (function figwheel$client$file_reloading$sort_files(files){
var keep_files = cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,keep_files,new cljs.core.Keyword(null,"namespace","namespace",-377510372)),figwheel.client.file_reloading.expand_files.call(null,files));
});
figwheel.client.file_reloading.get_figwheel_always = (function figwheel$client$file_reloading$get_figwheel_always(){
return cljs.core.map.call(null,(function (p__29783){
var vec__29784 = p__29783;
var k = cljs.core.nth.call(null,vec__29784,(0),null);
var v = cljs.core.nth.call(null,vec__29784,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__29785){
var vec__29786 = p__29785;
var k = cljs.core.nth.call(null,vec__29786,(0),null);
var v = cljs.core.nth.call(null,vec__29786,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__29790,p__29791){
var map__30038 = p__29790;
var map__30038__$1 = ((((!((map__30038 == null)))?((((map__30038.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30038.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30038):map__30038);
var opts = map__30038__$1;
var before_jsload = cljs.core.get.call(null,map__30038__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__30038__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__30038__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__30039 = p__29791;
var map__30039__$1 = ((((!((map__30039 == null)))?((((map__30039.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30039.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30039):map__30039);
var msg = map__30039__$1;
var files = cljs.core.get.call(null,map__30039__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__30039__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__30039__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__20372__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (state_30192){
var state_val_30193 = (state_30192[(1)]);
if((state_val_30193 === (7))){
var inst_30056 = (state_30192[(7)]);
var inst_30053 = (state_30192[(8)]);
var inst_30055 = (state_30192[(9)]);
var inst_30054 = (state_30192[(10)]);
var inst_30061 = cljs.core._nth.call(null,inst_30054,inst_30056);
var inst_30062 = figwheel.client.file_reloading.eval_body.call(null,inst_30061,opts);
var inst_30063 = (inst_30056 + (1));
var tmp30194 = inst_30053;
var tmp30195 = inst_30055;
var tmp30196 = inst_30054;
var inst_30053__$1 = tmp30194;
var inst_30054__$1 = tmp30196;
var inst_30055__$1 = tmp30195;
var inst_30056__$1 = inst_30063;
var state_30192__$1 = (function (){var statearr_30197 = state_30192;
(statearr_30197[(7)] = inst_30056__$1);

(statearr_30197[(8)] = inst_30053__$1);

(statearr_30197[(9)] = inst_30055__$1);

(statearr_30197[(11)] = inst_30062);

(statearr_30197[(10)] = inst_30054__$1);

return statearr_30197;
})();
var statearr_30198_30284 = state_30192__$1;
(statearr_30198_30284[(2)] = null);

(statearr_30198_30284[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (20))){
var inst_30096 = (state_30192[(12)]);
var inst_30104 = figwheel.client.file_reloading.sort_files.call(null,inst_30096);
var state_30192__$1 = state_30192;
var statearr_30199_30285 = state_30192__$1;
(statearr_30199_30285[(2)] = inst_30104);

(statearr_30199_30285[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (27))){
var state_30192__$1 = state_30192;
var statearr_30200_30286 = state_30192__$1;
(statearr_30200_30286[(2)] = null);

(statearr_30200_30286[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (1))){
var inst_30045 = (state_30192[(13)]);
var inst_30042 = before_jsload.call(null,files);
var inst_30043 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_30044 = (function (){return ((function (inst_30045,inst_30042,inst_30043,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__29787_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__29787_SHARP_);
});
;})(inst_30045,inst_30042,inst_30043,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_30045__$1 = cljs.core.filter.call(null,inst_30044,files);
var inst_30046 = cljs.core.not_empty.call(null,inst_30045__$1);
var state_30192__$1 = (function (){var statearr_30201 = state_30192;
(statearr_30201[(13)] = inst_30045__$1);

(statearr_30201[(14)] = inst_30043);

(statearr_30201[(15)] = inst_30042);

return statearr_30201;
})();
if(cljs.core.truth_(inst_30046)){
var statearr_30202_30287 = state_30192__$1;
(statearr_30202_30287[(1)] = (2));

} else {
var statearr_30203_30288 = state_30192__$1;
(statearr_30203_30288[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (24))){
var state_30192__$1 = state_30192;
var statearr_30204_30289 = state_30192__$1;
(statearr_30204_30289[(2)] = null);

(statearr_30204_30289[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (39))){
var inst_30146 = (state_30192[(16)]);
var state_30192__$1 = state_30192;
var statearr_30205_30290 = state_30192__$1;
(statearr_30205_30290[(2)] = inst_30146);

(statearr_30205_30290[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (46))){
var inst_30187 = (state_30192[(2)]);
var state_30192__$1 = state_30192;
var statearr_30206_30291 = state_30192__$1;
(statearr_30206_30291[(2)] = inst_30187);

(statearr_30206_30291[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (4))){
var inst_30090 = (state_30192[(2)]);
var inst_30091 = cljs.core.List.EMPTY;
var inst_30092 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_30091);
var inst_30093 = (function (){return ((function (inst_30090,inst_30091,inst_30092,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__29788_SHARP_){
var and__16255__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__29788_SHARP_);
if(cljs.core.truth_(and__16255__auto__)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__29788_SHARP_));
} else {
return and__16255__auto__;
}
});
;})(inst_30090,inst_30091,inst_30092,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_30094 = cljs.core.filter.call(null,inst_30093,files);
var inst_30095 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_30096 = cljs.core.concat.call(null,inst_30094,inst_30095);
var state_30192__$1 = (function (){var statearr_30207 = state_30192;
(statearr_30207[(17)] = inst_30090);

(statearr_30207[(12)] = inst_30096);

(statearr_30207[(18)] = inst_30092);

return statearr_30207;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_30208_30292 = state_30192__$1;
(statearr_30208_30292[(1)] = (16));

} else {
var statearr_30209_30293 = state_30192__$1;
(statearr_30209_30293[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (15))){
var inst_30080 = (state_30192[(2)]);
var state_30192__$1 = state_30192;
var statearr_30210_30294 = state_30192__$1;
(statearr_30210_30294[(2)] = inst_30080);

(statearr_30210_30294[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (21))){
var inst_30106 = (state_30192[(19)]);
var inst_30106__$1 = (state_30192[(2)]);
var inst_30107 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_30106__$1);
var state_30192__$1 = (function (){var statearr_30211 = state_30192;
(statearr_30211[(19)] = inst_30106__$1);

return statearr_30211;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30192__$1,(22),inst_30107);
} else {
if((state_val_30193 === (31))){
var inst_30190 = (state_30192[(2)]);
var state_30192__$1 = state_30192;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30192__$1,inst_30190);
} else {
if((state_val_30193 === (32))){
var inst_30146 = (state_30192[(16)]);
var inst_30151 = inst_30146.cljs$lang$protocol_mask$partition0$;
var inst_30152 = (inst_30151 & (64));
var inst_30153 = inst_30146.cljs$core$ISeq$;
var inst_30154 = (inst_30152) || (inst_30153);
var state_30192__$1 = state_30192;
if(cljs.core.truth_(inst_30154)){
var statearr_30212_30295 = state_30192__$1;
(statearr_30212_30295[(1)] = (35));

} else {
var statearr_30213_30296 = state_30192__$1;
(statearr_30213_30296[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (40))){
var inst_30167 = (state_30192[(20)]);
var inst_30166 = (state_30192[(2)]);
var inst_30167__$1 = cljs.core.get.call(null,inst_30166,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_30168 = cljs.core.get.call(null,inst_30166,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_30169 = cljs.core.not_empty.call(null,inst_30167__$1);
var state_30192__$1 = (function (){var statearr_30214 = state_30192;
(statearr_30214[(21)] = inst_30168);

(statearr_30214[(20)] = inst_30167__$1);

return statearr_30214;
})();
if(cljs.core.truth_(inst_30169)){
var statearr_30215_30297 = state_30192__$1;
(statearr_30215_30297[(1)] = (41));

} else {
var statearr_30216_30298 = state_30192__$1;
(statearr_30216_30298[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (33))){
var state_30192__$1 = state_30192;
var statearr_30217_30299 = state_30192__$1;
(statearr_30217_30299[(2)] = false);

(statearr_30217_30299[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (13))){
var inst_30066 = (state_30192[(22)]);
var inst_30070 = cljs.core.chunk_first.call(null,inst_30066);
var inst_30071 = cljs.core.chunk_rest.call(null,inst_30066);
var inst_30072 = cljs.core.count.call(null,inst_30070);
var inst_30053 = inst_30071;
var inst_30054 = inst_30070;
var inst_30055 = inst_30072;
var inst_30056 = (0);
var state_30192__$1 = (function (){var statearr_30218 = state_30192;
(statearr_30218[(7)] = inst_30056);

(statearr_30218[(8)] = inst_30053);

(statearr_30218[(9)] = inst_30055);

(statearr_30218[(10)] = inst_30054);

return statearr_30218;
})();
var statearr_30219_30300 = state_30192__$1;
(statearr_30219_30300[(2)] = null);

(statearr_30219_30300[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (22))){
var inst_30110 = (state_30192[(23)]);
var inst_30114 = (state_30192[(24)]);
var inst_30109 = (state_30192[(25)]);
var inst_30106 = (state_30192[(19)]);
var inst_30109__$1 = (state_30192[(2)]);
var inst_30110__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_30109__$1);
var inst_30111 = (function (){var all_files = inst_30106;
var res_SINGLEQUOTE_ = inst_30109__$1;
var res = inst_30110__$1;
return ((function (all_files,res_SINGLEQUOTE_,res,inst_30110,inst_30114,inst_30109,inst_30106,inst_30109__$1,inst_30110__$1,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__29789_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__29789_SHARP_));
});
;})(all_files,res_SINGLEQUOTE_,res,inst_30110,inst_30114,inst_30109,inst_30106,inst_30109__$1,inst_30110__$1,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_30112 = cljs.core.filter.call(null,inst_30111,inst_30109__$1);
var inst_30113 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_30114__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_30113);
var inst_30115 = cljs.core.not_empty.call(null,inst_30114__$1);
var state_30192__$1 = (function (){var statearr_30220 = state_30192;
(statearr_30220[(23)] = inst_30110__$1);

(statearr_30220[(24)] = inst_30114__$1);

(statearr_30220[(26)] = inst_30112);

(statearr_30220[(25)] = inst_30109__$1);

return statearr_30220;
})();
if(cljs.core.truth_(inst_30115)){
var statearr_30221_30301 = state_30192__$1;
(statearr_30221_30301[(1)] = (23));

} else {
var statearr_30222_30302 = state_30192__$1;
(statearr_30222_30302[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (36))){
var state_30192__$1 = state_30192;
var statearr_30223_30303 = state_30192__$1;
(statearr_30223_30303[(2)] = false);

(statearr_30223_30303[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (41))){
var inst_30167 = (state_30192[(20)]);
var inst_30171 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_30172 = cljs.core.map.call(null,inst_30171,inst_30167);
var inst_30173 = cljs.core.pr_str.call(null,inst_30172);
var inst_30174 = [cljs.core.str("figwheel-no-load meta-data: "),cljs.core.str(inst_30173)].join('');
var inst_30175 = figwheel.client.utils.log.call(null,inst_30174);
var state_30192__$1 = state_30192;
var statearr_30224_30304 = state_30192__$1;
(statearr_30224_30304[(2)] = inst_30175);

(statearr_30224_30304[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (43))){
var inst_30168 = (state_30192[(21)]);
var inst_30178 = (state_30192[(2)]);
var inst_30179 = cljs.core.not_empty.call(null,inst_30168);
var state_30192__$1 = (function (){var statearr_30225 = state_30192;
(statearr_30225[(27)] = inst_30178);

return statearr_30225;
})();
if(cljs.core.truth_(inst_30179)){
var statearr_30226_30305 = state_30192__$1;
(statearr_30226_30305[(1)] = (44));

} else {
var statearr_30227_30306 = state_30192__$1;
(statearr_30227_30306[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (29))){
var inst_30146 = (state_30192[(16)]);
var inst_30110 = (state_30192[(23)]);
var inst_30114 = (state_30192[(24)]);
var inst_30112 = (state_30192[(26)]);
var inst_30109 = (state_30192[(25)]);
var inst_30106 = (state_30192[(19)]);
var inst_30142 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_30145 = (function (){var all_files = inst_30106;
var res_SINGLEQUOTE_ = inst_30109;
var res = inst_30110;
var files_not_loaded = inst_30112;
var dependencies_that_loaded = inst_30114;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_30146,inst_30110,inst_30114,inst_30112,inst_30109,inst_30106,inst_30142,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__30144){
var map__30228 = p__30144;
var map__30228__$1 = ((((!((map__30228 == null)))?((((map__30228.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30228.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30228):map__30228);
var namespace = cljs.core.get.call(null,map__30228__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_data = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
if((meta_data == null)){
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);
} else {
if(cljs.core.truth_(meta_data.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179)))){
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179);
} else {
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);

}
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_30146,inst_30110,inst_30114,inst_30112,inst_30109,inst_30106,inst_30142,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_30146__$1 = cljs.core.group_by.call(null,inst_30145,inst_30112);
var inst_30148 = (inst_30146__$1 == null);
var inst_30149 = cljs.core.not.call(null,inst_30148);
var state_30192__$1 = (function (){var statearr_30230 = state_30192;
(statearr_30230[(16)] = inst_30146__$1);

(statearr_30230[(28)] = inst_30142);

return statearr_30230;
})();
if(inst_30149){
var statearr_30231_30307 = state_30192__$1;
(statearr_30231_30307[(1)] = (32));

} else {
var statearr_30232_30308 = state_30192__$1;
(statearr_30232_30308[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (44))){
var inst_30168 = (state_30192[(21)]);
var inst_30181 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_30168);
var inst_30182 = cljs.core.pr_str.call(null,inst_30181);
var inst_30183 = [cljs.core.str("not required: "),cljs.core.str(inst_30182)].join('');
var inst_30184 = figwheel.client.utils.log.call(null,inst_30183);
var state_30192__$1 = state_30192;
var statearr_30233_30309 = state_30192__$1;
(statearr_30233_30309[(2)] = inst_30184);

(statearr_30233_30309[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (6))){
var inst_30087 = (state_30192[(2)]);
var state_30192__$1 = state_30192;
var statearr_30234_30310 = state_30192__$1;
(statearr_30234_30310[(2)] = inst_30087);

(statearr_30234_30310[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (28))){
var inst_30112 = (state_30192[(26)]);
var inst_30139 = (state_30192[(2)]);
var inst_30140 = cljs.core.not_empty.call(null,inst_30112);
var state_30192__$1 = (function (){var statearr_30235 = state_30192;
(statearr_30235[(29)] = inst_30139);

return statearr_30235;
})();
if(cljs.core.truth_(inst_30140)){
var statearr_30236_30311 = state_30192__$1;
(statearr_30236_30311[(1)] = (29));

} else {
var statearr_30237_30312 = state_30192__$1;
(statearr_30237_30312[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (25))){
var inst_30110 = (state_30192[(23)]);
var inst_30126 = (state_30192[(2)]);
var inst_30127 = cljs.core.not_empty.call(null,inst_30110);
var state_30192__$1 = (function (){var statearr_30238 = state_30192;
(statearr_30238[(30)] = inst_30126);

return statearr_30238;
})();
if(cljs.core.truth_(inst_30127)){
var statearr_30239_30313 = state_30192__$1;
(statearr_30239_30313[(1)] = (26));

} else {
var statearr_30240_30314 = state_30192__$1;
(statearr_30240_30314[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (34))){
var inst_30161 = (state_30192[(2)]);
var state_30192__$1 = state_30192;
if(cljs.core.truth_(inst_30161)){
var statearr_30241_30315 = state_30192__$1;
(statearr_30241_30315[(1)] = (38));

} else {
var statearr_30242_30316 = state_30192__$1;
(statearr_30242_30316[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (17))){
var state_30192__$1 = state_30192;
var statearr_30243_30317 = state_30192__$1;
(statearr_30243_30317[(2)] = recompile_dependents);

(statearr_30243_30317[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (3))){
var state_30192__$1 = state_30192;
var statearr_30244_30318 = state_30192__$1;
(statearr_30244_30318[(2)] = null);

(statearr_30244_30318[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (12))){
var inst_30083 = (state_30192[(2)]);
var state_30192__$1 = state_30192;
var statearr_30245_30319 = state_30192__$1;
(statearr_30245_30319[(2)] = inst_30083);

(statearr_30245_30319[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (2))){
var inst_30045 = (state_30192[(13)]);
var inst_30052 = cljs.core.seq.call(null,inst_30045);
var inst_30053 = inst_30052;
var inst_30054 = null;
var inst_30055 = (0);
var inst_30056 = (0);
var state_30192__$1 = (function (){var statearr_30246 = state_30192;
(statearr_30246[(7)] = inst_30056);

(statearr_30246[(8)] = inst_30053);

(statearr_30246[(9)] = inst_30055);

(statearr_30246[(10)] = inst_30054);

return statearr_30246;
})();
var statearr_30247_30320 = state_30192__$1;
(statearr_30247_30320[(2)] = null);

(statearr_30247_30320[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (23))){
var inst_30110 = (state_30192[(23)]);
var inst_30114 = (state_30192[(24)]);
var inst_30112 = (state_30192[(26)]);
var inst_30109 = (state_30192[(25)]);
var inst_30106 = (state_30192[(19)]);
var inst_30117 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_30119 = (function (){var all_files = inst_30106;
var res_SINGLEQUOTE_ = inst_30109;
var res = inst_30110;
var files_not_loaded = inst_30112;
var dependencies_that_loaded = inst_30114;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_30110,inst_30114,inst_30112,inst_30109,inst_30106,inst_30117,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__30118){
var map__30248 = p__30118;
var map__30248__$1 = ((((!((map__30248 == null)))?((((map__30248.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30248.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30248):map__30248);
var request_url = cljs.core.get.call(null,map__30248__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_30110,inst_30114,inst_30112,inst_30109,inst_30106,inst_30117,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_30120 = cljs.core.reverse.call(null,inst_30114);
var inst_30121 = cljs.core.map.call(null,inst_30119,inst_30120);
var inst_30122 = cljs.core.pr_str.call(null,inst_30121);
var inst_30123 = figwheel.client.utils.log.call(null,inst_30122);
var state_30192__$1 = (function (){var statearr_30250 = state_30192;
(statearr_30250[(31)] = inst_30117);

return statearr_30250;
})();
var statearr_30251_30321 = state_30192__$1;
(statearr_30251_30321[(2)] = inst_30123);

(statearr_30251_30321[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (35))){
var state_30192__$1 = state_30192;
var statearr_30252_30322 = state_30192__$1;
(statearr_30252_30322[(2)] = true);

(statearr_30252_30322[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (19))){
var inst_30096 = (state_30192[(12)]);
var inst_30102 = figwheel.client.file_reloading.expand_files.call(null,inst_30096);
var state_30192__$1 = state_30192;
var statearr_30253_30323 = state_30192__$1;
(statearr_30253_30323[(2)] = inst_30102);

(statearr_30253_30323[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (11))){
var state_30192__$1 = state_30192;
var statearr_30254_30324 = state_30192__$1;
(statearr_30254_30324[(2)] = null);

(statearr_30254_30324[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (9))){
var inst_30085 = (state_30192[(2)]);
var state_30192__$1 = state_30192;
var statearr_30255_30325 = state_30192__$1;
(statearr_30255_30325[(2)] = inst_30085);

(statearr_30255_30325[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (5))){
var inst_30056 = (state_30192[(7)]);
var inst_30055 = (state_30192[(9)]);
var inst_30058 = (inst_30056 < inst_30055);
var inst_30059 = inst_30058;
var state_30192__$1 = state_30192;
if(cljs.core.truth_(inst_30059)){
var statearr_30256_30326 = state_30192__$1;
(statearr_30256_30326[(1)] = (7));

} else {
var statearr_30257_30327 = state_30192__$1;
(statearr_30257_30327[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (14))){
var inst_30066 = (state_30192[(22)]);
var inst_30075 = cljs.core.first.call(null,inst_30066);
var inst_30076 = figwheel.client.file_reloading.eval_body.call(null,inst_30075,opts);
var inst_30077 = cljs.core.next.call(null,inst_30066);
var inst_30053 = inst_30077;
var inst_30054 = null;
var inst_30055 = (0);
var inst_30056 = (0);
var state_30192__$1 = (function (){var statearr_30258 = state_30192;
(statearr_30258[(7)] = inst_30056);

(statearr_30258[(8)] = inst_30053);

(statearr_30258[(9)] = inst_30055);

(statearr_30258[(32)] = inst_30076);

(statearr_30258[(10)] = inst_30054);

return statearr_30258;
})();
var statearr_30259_30328 = state_30192__$1;
(statearr_30259_30328[(2)] = null);

(statearr_30259_30328[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (45))){
var state_30192__$1 = state_30192;
var statearr_30260_30329 = state_30192__$1;
(statearr_30260_30329[(2)] = null);

(statearr_30260_30329[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (26))){
var inst_30110 = (state_30192[(23)]);
var inst_30114 = (state_30192[(24)]);
var inst_30112 = (state_30192[(26)]);
var inst_30109 = (state_30192[(25)]);
var inst_30106 = (state_30192[(19)]);
var inst_30129 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_30131 = (function (){var all_files = inst_30106;
var res_SINGLEQUOTE_ = inst_30109;
var res = inst_30110;
var files_not_loaded = inst_30112;
var dependencies_that_loaded = inst_30114;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_30110,inst_30114,inst_30112,inst_30109,inst_30106,inst_30129,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__30130){
var map__30261 = p__30130;
var map__30261__$1 = ((((!((map__30261 == null)))?((((map__30261.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30261.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30261):map__30261);
var namespace = cljs.core.get.call(null,map__30261__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__30261__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_30110,inst_30114,inst_30112,inst_30109,inst_30106,inst_30129,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_30132 = cljs.core.map.call(null,inst_30131,inst_30110);
var inst_30133 = cljs.core.pr_str.call(null,inst_30132);
var inst_30134 = figwheel.client.utils.log.call(null,inst_30133);
var inst_30135 = (function (){var all_files = inst_30106;
var res_SINGLEQUOTE_ = inst_30109;
var res = inst_30110;
var files_not_loaded = inst_30112;
var dependencies_that_loaded = inst_30114;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_30110,inst_30114,inst_30112,inst_30109,inst_30106,inst_30129,inst_30131,inst_30132,inst_30133,inst_30134,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_30110,inst_30114,inst_30112,inst_30109,inst_30106,inst_30129,inst_30131,inst_30132,inst_30133,inst_30134,state_val_30193,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_30136 = setTimeout(inst_30135,(10));
var state_30192__$1 = (function (){var statearr_30263 = state_30192;
(statearr_30263[(33)] = inst_30129);

(statearr_30263[(34)] = inst_30134);

return statearr_30263;
})();
var statearr_30264_30330 = state_30192__$1;
(statearr_30264_30330[(2)] = inst_30136);

(statearr_30264_30330[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (16))){
var state_30192__$1 = state_30192;
var statearr_30265_30331 = state_30192__$1;
(statearr_30265_30331[(2)] = reload_dependents);

(statearr_30265_30331[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (38))){
var inst_30146 = (state_30192[(16)]);
var inst_30163 = cljs.core.apply.call(null,cljs.core.hash_map,inst_30146);
var state_30192__$1 = state_30192;
var statearr_30266_30332 = state_30192__$1;
(statearr_30266_30332[(2)] = inst_30163);

(statearr_30266_30332[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (30))){
var state_30192__$1 = state_30192;
var statearr_30267_30333 = state_30192__$1;
(statearr_30267_30333[(2)] = null);

(statearr_30267_30333[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (10))){
var inst_30066 = (state_30192[(22)]);
var inst_30068 = cljs.core.chunked_seq_QMARK_.call(null,inst_30066);
var state_30192__$1 = state_30192;
if(inst_30068){
var statearr_30268_30334 = state_30192__$1;
(statearr_30268_30334[(1)] = (13));

} else {
var statearr_30269_30335 = state_30192__$1;
(statearr_30269_30335[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (18))){
var inst_30100 = (state_30192[(2)]);
var state_30192__$1 = state_30192;
if(cljs.core.truth_(inst_30100)){
var statearr_30270_30336 = state_30192__$1;
(statearr_30270_30336[(1)] = (19));

} else {
var statearr_30271_30337 = state_30192__$1;
(statearr_30271_30337[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (42))){
var state_30192__$1 = state_30192;
var statearr_30272_30338 = state_30192__$1;
(statearr_30272_30338[(2)] = null);

(statearr_30272_30338[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (37))){
var inst_30158 = (state_30192[(2)]);
var state_30192__$1 = state_30192;
var statearr_30273_30339 = state_30192__$1;
(statearr_30273_30339[(2)] = inst_30158);

(statearr_30273_30339[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30193 === (8))){
var inst_30066 = (state_30192[(22)]);
var inst_30053 = (state_30192[(8)]);
var inst_30066__$1 = cljs.core.seq.call(null,inst_30053);
var state_30192__$1 = (function (){var statearr_30274 = state_30192;
(statearr_30274[(22)] = inst_30066__$1);

return statearr_30274;
})();
if(inst_30066__$1){
var statearr_30275_30340 = state_30192__$1;
(statearr_30275_30340[(1)] = (10));

} else {
var statearr_30276_30341 = state_30192__$1;
(statearr_30276_30341[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents))
;
return ((function (switch__20351__auto__,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__20352__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__20352__auto____0 = (function (){
var statearr_30280 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30280[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__20352__auto__);

(statearr_30280[(1)] = (1));

return statearr_30280;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__20352__auto____1 = (function (state_30192){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_30192);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e30281){if((e30281 instanceof Object)){
var ex__20355__auto__ = e30281;
var statearr_30282_30342 = state_30192;
(statearr_30282_30342[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30192);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30281;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30343 = state_30192;
state_30192 = G__30343;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__20352__auto__ = function(state_30192){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__20352__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__20352__auto____1.call(this,state_30192);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__20352__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__20352__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var state__20374__auto__ = (function (){var statearr_30283 = f__20373__auto__.call(null);
(statearr_30283[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto__);

return statearr_30283;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto__,map__30038,map__30038__$1,opts,before_jsload,on_jsload,reload_dependents,map__30039,map__30039__$1,msg,files,figwheel_meta,recompile_dependents))
);

return c__20372__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str(location.protocol),cljs.core.str("//")].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__30346,link){
var map__30349 = p__30346;
var map__30349__$1 = ((((!((map__30349 == null)))?((((map__30349.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30349.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30349):map__30349);
var file = cljs.core.get.call(null,map__30349__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4425__auto__ = link.href;
if(cljs.core.truth_(temp__4425__auto__)){
var link_href = temp__4425__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__4425__auto__,map__30349,map__30349__$1,file){
return (function (p1__30344_SHARP_,p2__30345_SHARP_){
if(cljs.core._EQ_.call(null,p1__30344_SHARP_,p2__30345_SHARP_)){
return p1__30344_SHARP_;
} else {
return false;
}
});})(link_href,temp__4425__auto__,map__30349,map__30349__$1,file))
,cljs.core.reverse.call(null,clojure.string.split.call(null,file,"/")),cljs.core.reverse.call(null,clojure.string.split.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href),"/")))));
var match_length = cljs.core.count.call(null,match);
var file_name_length = cljs.core.count.call(null,cljs.core.last.call(null,clojure.string.split.call(null,file,"/")));
if((match_length >= file_name_length)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"link","link",-1769163468),link,new cljs.core.Keyword(null,"link-href","link-href",-250644450),link_href,new cljs.core.Keyword(null,"match-length","match-length",1101537310),match_length,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083),cljs.core.count.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href))], null);
} else {
return null;
}
} else {
return null;
}
});
figwheel.client.file_reloading.get_correct_link = (function figwheel$client$file_reloading$get_correct_link(f_data){
var temp__4425__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__30355){
var map__30356 = p__30355;
var map__30356__$1 = ((((!((map__30356 == null)))?((((map__30356.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30356.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30356):map__30356);
var match_length = cljs.core.get.call(null,map__30356__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__30356__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__30351_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__30351_SHARP_);
}),figwheel.client.file_reloading.current_links.call(null))));
if(cljs.core.truth_(temp__4425__auto__)){
var res = temp__4425__auto__;
return new cljs.core.Keyword(null,"link","link",-1769163468).cljs$core$IFn$_invoke$arity$1(res);
} else {
return null;
}
});
figwheel.client.file_reloading.clone_link = (function figwheel$client$file_reloading$clone_link(link,url){
var clone = document.createElement("link");
clone.rel = "stylesheet";

clone.media = link.media;

clone.disabled = link.disabled;

clone.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return clone;
});
figwheel.client.file_reloading.create_link = (function figwheel$client$file_reloading$create_link(url){
var link = document.createElement("link");
link.rel = "stylesheet";

link.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return link;
});
figwheel.client.file_reloading.add_link_to_doc = (function figwheel$client$file_reloading$add_link_to_doc(var_args){
var args30358 = [];
var len__17325__auto___30361 = arguments.length;
var i__17326__auto___30362 = (0);
while(true){
if((i__17326__auto___30362 < len__17325__auto___30361)){
args30358.push((arguments[i__17326__auto___30362]));

var G__30363 = (i__17326__auto___30362 + (1));
i__17326__auto___30362 = G__30363;
continue;
} else {
}
break;
}

var G__30360 = args30358.length;
switch (G__30360) {
case 1:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30358.length)].join('')));

}
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1 = (function (new_link){
return (document.getElementsByTagName("head")[(0)]).appendChild(new_link);
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2 = (function (orig_link,klone){
var parent = orig_link.parentNode;
if(cljs.core._EQ_.call(null,orig_link,parent.lastChild)){
parent.appendChild(klone);
} else {
parent.insertBefore(klone,orig_link.nextSibling);
}

return setTimeout(((function (parent){
return (function (){
return parent.removeChild(orig_link);
});})(parent))
,(300));
});

figwheel.client.file_reloading.add_link_to_doc.cljs$lang$maxFixedArity = 2;
figwheel.client.file_reloading.distictify = (function figwheel$client$file_reloading$distictify(key,seqq){
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__30365_SHARP_,p2__30366_SHARP_){
return cljs.core.assoc.call(null,p1__30365_SHARP_,cljs.core.get.call(null,p2__30366_SHARP_,key),p2__30366_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,seqq));
});
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(p__30367){
var map__30370 = p__30367;
var map__30370__$1 = ((((!((map__30370 == null)))?((((map__30370.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30370.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30370):map__30370);
var f_data = map__30370__$1;
var file = cljs.core.get.call(null,map__30370__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4425__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__4425__auto__)){
var link = temp__4425__auto__;
return figwheel.client.file_reloading.add_link_to_doc.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href));
} else {
return null;
}
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__30372,files_msg){
var map__30379 = p__30372;
var map__30379__$1 = ((((!((map__30379 == null)))?((((map__30379.cljs$lang$protocol_mask$partition0$ & (64))) || (map__30379.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30379):map__30379);
var opts = map__30379__$1;
var on_cssload = cljs.core.get.call(null,map__30379__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var seq__30381_30385 = cljs.core.seq.call(null,figwheel.client.file_reloading.distictify.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg)));
var chunk__30382_30386 = null;
var count__30383_30387 = (0);
var i__30384_30388 = (0);
while(true){
if((i__30384_30388 < count__30383_30387)){
var f_30389 = cljs.core._nth.call(null,chunk__30382_30386,i__30384_30388);
figwheel.client.file_reloading.reload_css_file.call(null,f_30389);

var G__30390 = seq__30381_30385;
var G__30391 = chunk__30382_30386;
var G__30392 = count__30383_30387;
var G__30393 = (i__30384_30388 + (1));
seq__30381_30385 = G__30390;
chunk__30382_30386 = G__30391;
count__30383_30387 = G__30392;
i__30384_30388 = G__30393;
continue;
} else {
var temp__4425__auto___30394 = cljs.core.seq.call(null,seq__30381_30385);
if(temp__4425__auto___30394){
var seq__30381_30395__$1 = temp__4425__auto___30394;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__30381_30395__$1)){
var c__17070__auto___30396 = cljs.core.chunk_first.call(null,seq__30381_30395__$1);
var G__30397 = cljs.core.chunk_rest.call(null,seq__30381_30395__$1);
var G__30398 = c__17070__auto___30396;
var G__30399 = cljs.core.count.call(null,c__17070__auto___30396);
var G__30400 = (0);
seq__30381_30385 = G__30397;
chunk__30382_30386 = G__30398;
count__30383_30387 = G__30399;
i__30384_30388 = G__30400;
continue;
} else {
var f_30401 = cljs.core.first.call(null,seq__30381_30395__$1);
figwheel.client.file_reloading.reload_css_file.call(null,f_30401);

var G__30402 = cljs.core.next.call(null,seq__30381_30395__$1);
var G__30403 = null;
var G__30404 = (0);
var G__30405 = (0);
seq__30381_30385 = G__30402;
chunk__30382_30386 = G__30403;
count__30383_30387 = G__30404;
i__30384_30388 = G__30405;
continue;
}
} else {
}
}
break;
}

return setTimeout(((function (map__30379,map__30379__$1,opts,on_cssload){
return (function (){
return on_cssload.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg));
});})(map__30379,map__30379__$1,opts,on_cssload))
,(100));
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map?rel=1450835349576