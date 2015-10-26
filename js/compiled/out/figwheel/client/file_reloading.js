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
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__45511_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__45511_SHARP_));
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
var seq__45516 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__45517 = null;
var count__45518 = (0);
var i__45519 = (0);
while(true){
if((i__45519 < count__45518)){
var n = cljs.core._nth.call(null,chunk__45517,i__45519);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__45520 = seq__45516;
var G__45521 = chunk__45517;
var G__45522 = count__45518;
var G__45523 = (i__45519 + (1));
seq__45516 = G__45520;
chunk__45517 = G__45521;
count__45518 = G__45522;
i__45519 = G__45523;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__45516);
if(temp__4425__auto__){
var seq__45516__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45516__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__45516__$1);
var G__45524 = cljs.core.chunk_rest.call(null,seq__45516__$1);
var G__45525 = c__17070__auto__;
var G__45526 = cljs.core.count.call(null,c__17070__auto__);
var G__45527 = (0);
seq__45516 = G__45524;
chunk__45517 = G__45525;
count__45518 = G__45526;
i__45519 = G__45527;
continue;
} else {
var n = cljs.core.first.call(null,seq__45516__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__45528 = cljs.core.next.call(null,seq__45516__$1);
var G__45529 = null;
var G__45530 = (0);
var G__45531 = (0);
seq__45516 = G__45528;
chunk__45517 = G__45529;
count__45518 = G__45530;
i__45519 = G__45531;
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

var seq__45570_45577 = cljs.core.seq.call(null,deps);
var chunk__45571_45578 = null;
var count__45572_45579 = (0);
var i__45573_45580 = (0);
while(true){
if((i__45573_45580 < count__45572_45579)){
var dep_45581 = cljs.core._nth.call(null,chunk__45571_45578,i__45573_45580);
topo_sort_helper_STAR_.call(null,dep_45581,(depth + (1)),state);

var G__45582 = seq__45570_45577;
var G__45583 = chunk__45571_45578;
var G__45584 = count__45572_45579;
var G__45585 = (i__45573_45580 + (1));
seq__45570_45577 = G__45582;
chunk__45571_45578 = G__45583;
count__45572_45579 = G__45584;
i__45573_45580 = G__45585;
continue;
} else {
var temp__4425__auto___45586 = cljs.core.seq.call(null,seq__45570_45577);
if(temp__4425__auto___45586){
var seq__45570_45587__$1 = temp__4425__auto___45586;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45570_45587__$1)){
var c__17070__auto___45588 = cljs.core.chunk_first.call(null,seq__45570_45587__$1);
var G__45589 = cljs.core.chunk_rest.call(null,seq__45570_45587__$1);
var G__45590 = c__17070__auto___45588;
var G__45591 = cljs.core.count.call(null,c__17070__auto___45588);
var G__45592 = (0);
seq__45570_45577 = G__45589;
chunk__45571_45578 = G__45590;
count__45572_45579 = G__45591;
i__45573_45580 = G__45592;
continue;
} else {
var dep_45593 = cljs.core.first.call(null,seq__45570_45587__$1);
topo_sort_helper_STAR_.call(null,dep_45593,(depth + (1)),state);

var G__45594 = cljs.core.next.call(null,seq__45570_45587__$1);
var G__45595 = null;
var G__45596 = (0);
var G__45597 = (0);
seq__45570_45577 = G__45594;
chunk__45571_45578 = G__45595;
count__45572_45579 = G__45596;
i__45573_45580 = G__45597;
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
return (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__45574){
var vec__45576 = p__45574;
var x = cljs.core.nth.call(null,vec__45576,(0),null);
var xs = cljs.core.nthnext.call(null,vec__45576,(1));
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,((function (vec__45576,x,xs,get_deps__$1){
return (function (p1__45532_SHARP_){
return clojure.set.difference.call(null,p1__45532_SHARP_,x);
});})(vec__45576,x,xs,get_deps__$1))
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
var seq__45610 = cljs.core.seq.call(null,provides);
var chunk__45611 = null;
var count__45612 = (0);
var i__45613 = (0);
while(true){
if((i__45613 < count__45612)){
var prov = cljs.core._nth.call(null,chunk__45611,i__45613);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__45614_45622 = cljs.core.seq.call(null,requires);
var chunk__45615_45623 = null;
var count__45616_45624 = (0);
var i__45617_45625 = (0);
while(true){
if((i__45617_45625 < count__45616_45624)){
var req_45626 = cljs.core._nth.call(null,chunk__45615_45623,i__45617_45625);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_45626,prov);

var G__45627 = seq__45614_45622;
var G__45628 = chunk__45615_45623;
var G__45629 = count__45616_45624;
var G__45630 = (i__45617_45625 + (1));
seq__45614_45622 = G__45627;
chunk__45615_45623 = G__45628;
count__45616_45624 = G__45629;
i__45617_45625 = G__45630;
continue;
} else {
var temp__4425__auto___45631 = cljs.core.seq.call(null,seq__45614_45622);
if(temp__4425__auto___45631){
var seq__45614_45632__$1 = temp__4425__auto___45631;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45614_45632__$1)){
var c__17070__auto___45633 = cljs.core.chunk_first.call(null,seq__45614_45632__$1);
var G__45634 = cljs.core.chunk_rest.call(null,seq__45614_45632__$1);
var G__45635 = c__17070__auto___45633;
var G__45636 = cljs.core.count.call(null,c__17070__auto___45633);
var G__45637 = (0);
seq__45614_45622 = G__45634;
chunk__45615_45623 = G__45635;
count__45616_45624 = G__45636;
i__45617_45625 = G__45637;
continue;
} else {
var req_45638 = cljs.core.first.call(null,seq__45614_45632__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_45638,prov);

var G__45639 = cljs.core.next.call(null,seq__45614_45632__$1);
var G__45640 = null;
var G__45641 = (0);
var G__45642 = (0);
seq__45614_45622 = G__45639;
chunk__45615_45623 = G__45640;
count__45616_45624 = G__45641;
i__45617_45625 = G__45642;
continue;
}
} else {
}
}
break;
}

var G__45643 = seq__45610;
var G__45644 = chunk__45611;
var G__45645 = count__45612;
var G__45646 = (i__45613 + (1));
seq__45610 = G__45643;
chunk__45611 = G__45644;
count__45612 = G__45645;
i__45613 = G__45646;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__45610);
if(temp__4425__auto__){
var seq__45610__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45610__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__45610__$1);
var G__45647 = cljs.core.chunk_rest.call(null,seq__45610__$1);
var G__45648 = c__17070__auto__;
var G__45649 = cljs.core.count.call(null,c__17070__auto__);
var G__45650 = (0);
seq__45610 = G__45647;
chunk__45611 = G__45648;
count__45612 = G__45649;
i__45613 = G__45650;
continue;
} else {
var prov = cljs.core.first.call(null,seq__45610__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__45618_45651 = cljs.core.seq.call(null,requires);
var chunk__45619_45652 = null;
var count__45620_45653 = (0);
var i__45621_45654 = (0);
while(true){
if((i__45621_45654 < count__45620_45653)){
var req_45655 = cljs.core._nth.call(null,chunk__45619_45652,i__45621_45654);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_45655,prov);

var G__45656 = seq__45618_45651;
var G__45657 = chunk__45619_45652;
var G__45658 = count__45620_45653;
var G__45659 = (i__45621_45654 + (1));
seq__45618_45651 = G__45656;
chunk__45619_45652 = G__45657;
count__45620_45653 = G__45658;
i__45621_45654 = G__45659;
continue;
} else {
var temp__4425__auto___45660__$1 = cljs.core.seq.call(null,seq__45618_45651);
if(temp__4425__auto___45660__$1){
var seq__45618_45661__$1 = temp__4425__auto___45660__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45618_45661__$1)){
var c__17070__auto___45662 = cljs.core.chunk_first.call(null,seq__45618_45661__$1);
var G__45663 = cljs.core.chunk_rest.call(null,seq__45618_45661__$1);
var G__45664 = c__17070__auto___45662;
var G__45665 = cljs.core.count.call(null,c__17070__auto___45662);
var G__45666 = (0);
seq__45618_45651 = G__45663;
chunk__45619_45652 = G__45664;
count__45620_45653 = G__45665;
i__45621_45654 = G__45666;
continue;
} else {
var req_45667 = cljs.core.first.call(null,seq__45618_45661__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_45667,prov);

var G__45668 = cljs.core.next.call(null,seq__45618_45661__$1);
var G__45669 = null;
var G__45670 = (0);
var G__45671 = (0);
seq__45618_45651 = G__45668;
chunk__45619_45652 = G__45669;
count__45620_45653 = G__45670;
i__45621_45654 = G__45671;
continue;
}
} else {
}
}
break;
}

var G__45672 = cljs.core.next.call(null,seq__45610__$1);
var G__45673 = null;
var G__45674 = (0);
var G__45675 = (0);
seq__45610 = G__45672;
chunk__45611 = G__45673;
count__45612 = G__45674;
i__45613 = G__45675;
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
var seq__45680_45684 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__45681_45685 = null;
var count__45682_45686 = (0);
var i__45683_45687 = (0);
while(true){
if((i__45683_45687 < count__45682_45686)){
var ns_45688 = cljs.core._nth.call(null,chunk__45681_45685,i__45683_45687);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_45688);

var G__45689 = seq__45680_45684;
var G__45690 = chunk__45681_45685;
var G__45691 = count__45682_45686;
var G__45692 = (i__45683_45687 + (1));
seq__45680_45684 = G__45689;
chunk__45681_45685 = G__45690;
count__45682_45686 = G__45691;
i__45683_45687 = G__45692;
continue;
} else {
var temp__4425__auto___45693 = cljs.core.seq.call(null,seq__45680_45684);
if(temp__4425__auto___45693){
var seq__45680_45694__$1 = temp__4425__auto___45693;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45680_45694__$1)){
var c__17070__auto___45695 = cljs.core.chunk_first.call(null,seq__45680_45694__$1);
var G__45696 = cljs.core.chunk_rest.call(null,seq__45680_45694__$1);
var G__45697 = c__17070__auto___45695;
var G__45698 = cljs.core.count.call(null,c__17070__auto___45695);
var G__45699 = (0);
seq__45680_45684 = G__45696;
chunk__45681_45685 = G__45697;
count__45682_45686 = G__45698;
i__45683_45687 = G__45699;
continue;
} else {
var ns_45700 = cljs.core.first.call(null,seq__45680_45694__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_45700);

var G__45701 = cljs.core.next.call(null,seq__45680_45694__$1);
var G__45702 = null;
var G__45703 = (0);
var G__45704 = (0);
seq__45680_45684 = G__45701;
chunk__45681_45685 = G__45702;
count__45682_45686 = G__45703;
i__45683_45687 = G__45704;
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
var G__45705__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__45705 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__45706__i = 0, G__45706__a = new Array(arguments.length -  0);
while (G__45706__i < G__45706__a.length) {G__45706__a[G__45706__i] = arguments[G__45706__i + 0]; ++G__45706__i;}
  args = new cljs.core.IndexedSeq(G__45706__a,0);
} 
return G__45705__delegate.call(this,args);};
G__45705.cljs$lang$maxFixedArity = 0;
G__45705.cljs$lang$applyTo = (function (arglist__45707){
var args = cljs.core.seq(arglist__45707);
return G__45705__delegate(args);
});
G__45705.cljs$core$IFn$_invoke$arity$variadic = G__45705__delegate;
return G__45705;
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
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__45708 = cljs.core._EQ_;
var expr__45709 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__45708.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__45709))){
return ((function (pred__45708,expr__45709){
return (function (request_url,callback){

var root = clojure.string.join.call(null,"/",cljs.core.reverse.call(null,cljs.core.drop.call(null,(2),cljs.core.reverse.call(null,clojure.string.split.call(null,__dirname,"/")))));
var path = [cljs.core.str(root),cljs.core.str("/"),cljs.core.str(figwheel.client.file_reloading.fix_node_request_url.call(null,request_url))].join('');
(require.cache[path] = null);

return callback.call(null,(function (){try{return require(path);
}catch (e45711){if((e45711 instanceof Error)){
var e = e45711;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e45711;

}
}})());
});
;})(pred__45708,expr__45709))
} else {
if(cljs.core.truth_(pred__45708.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__45709))){
return ((function (pred__45708,expr__45709){
return (function (request_url,callback){

var deferred = goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),{"cleanupWhenDone": true});
deferred.addCallback(((function (deferred,pred__45708,expr__45709){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(deferred,pred__45708,expr__45709))
);

return deferred.addErrback(((function (deferred,pred__45708,expr__45709){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(deferred,pred__45708,expr__45709))
);
});
;})(pred__45708,expr__45709))
} else {
return ((function (pred__45708,expr__45709){
return (function (a,b){
throw "Reload not defined for this platform";
});
;})(pred__45708,expr__45709))
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__45712,callback){
var map__45715 = p__45712;
var map__45715__$1 = ((((!((map__45715 == null)))?((((map__45715.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45715.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45715):map__45715);
var file_msg = map__45715__$1;
var request_url = cljs.core.get.call(null,map__45715__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Attempting to load "),cljs.core.str(request_url)].join(''));

return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,((function (map__45715,map__45715__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Successfully loaded "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__45715,map__45715__$1,file_msg,request_url))
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
figwheel.client.file_reloading.reloader_loop = (function (){var c__19891__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto__){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto__){
return (function (state_45739){
var state_val_45740 = (state_45739[(1)]);
if((state_val_45740 === (7))){
var inst_45735 = (state_45739[(2)]);
var state_45739__$1 = state_45739;
var statearr_45741_45761 = state_45739__$1;
(statearr_45741_45761[(2)] = inst_45735);

(statearr_45741_45761[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_45740 === (1))){
var state_45739__$1 = state_45739;
var statearr_45742_45762 = state_45739__$1;
(statearr_45742_45762[(2)] = null);

(statearr_45742_45762[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_45740 === (4))){
var inst_45719 = (state_45739[(7)]);
var inst_45719__$1 = (state_45739[(2)]);
var state_45739__$1 = (function (){var statearr_45743 = state_45739;
(statearr_45743[(7)] = inst_45719__$1);

return statearr_45743;
})();
if(cljs.core.truth_(inst_45719__$1)){
var statearr_45744_45763 = state_45739__$1;
(statearr_45744_45763[(1)] = (5));

} else {
var statearr_45745_45764 = state_45739__$1;
(statearr_45745_45764[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_45740 === (6))){
var state_45739__$1 = state_45739;
var statearr_45746_45765 = state_45739__$1;
(statearr_45746_45765[(2)] = null);

(statearr_45746_45765[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_45740 === (3))){
var inst_45737 = (state_45739[(2)]);
var state_45739__$1 = state_45739;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_45739__$1,inst_45737);
} else {
if((state_val_45740 === (2))){
var state_45739__$1 = state_45739;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_45739__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_45740 === (11))){
var inst_45731 = (state_45739[(2)]);
var state_45739__$1 = (function (){var statearr_45747 = state_45739;
(statearr_45747[(8)] = inst_45731);

return statearr_45747;
})();
var statearr_45748_45766 = state_45739__$1;
(statearr_45748_45766[(2)] = null);

(statearr_45748_45766[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_45740 === (9))){
var inst_45723 = (state_45739[(9)]);
var inst_45725 = (state_45739[(10)]);
var inst_45727 = inst_45725.call(null,inst_45723);
var state_45739__$1 = state_45739;
var statearr_45749_45767 = state_45739__$1;
(statearr_45749_45767[(2)] = inst_45727);

(statearr_45749_45767[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_45740 === (5))){
var inst_45719 = (state_45739[(7)]);
var inst_45721 = figwheel.client.file_reloading.blocking_load.call(null,inst_45719);
var state_45739__$1 = state_45739;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_45739__$1,(8),inst_45721);
} else {
if((state_val_45740 === (10))){
var inst_45723 = (state_45739[(9)]);
var inst_45729 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_45723);
var state_45739__$1 = state_45739;
var statearr_45750_45768 = state_45739__$1;
(statearr_45750_45768[(2)] = inst_45729);

(statearr_45750_45768[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_45740 === (8))){
var inst_45719 = (state_45739[(7)]);
var inst_45725 = (state_45739[(10)]);
var inst_45723 = (state_45739[(2)]);
var inst_45724 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_45725__$1 = cljs.core.get.call(null,inst_45724,inst_45719);
var state_45739__$1 = (function (){var statearr_45751 = state_45739;
(statearr_45751[(9)] = inst_45723);

(statearr_45751[(10)] = inst_45725__$1);

return statearr_45751;
})();
if(cljs.core.truth_(inst_45725__$1)){
var statearr_45752_45769 = state_45739__$1;
(statearr_45752_45769[(1)] = (9));

} else {
var statearr_45753_45770 = state_45739__$1;
(statearr_45753_45770[(1)] = (10));

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
});})(c__19891__auto__))
;
return ((function (switch__19826__auto__,c__19891__auto__){
return (function() {
var figwheel$client$file_reloading$state_machine__19827__auto__ = null;
var figwheel$client$file_reloading$state_machine__19827__auto____0 = (function (){
var statearr_45757 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_45757[(0)] = figwheel$client$file_reloading$state_machine__19827__auto__);

(statearr_45757[(1)] = (1));

return statearr_45757;
});
var figwheel$client$file_reloading$state_machine__19827__auto____1 = (function (state_45739){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_45739);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e45758){if((e45758 instanceof Object)){
var ex__19830__auto__ = e45758;
var statearr_45759_45771 = state_45739;
(statearr_45759_45771[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_45739);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e45758;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__45772 = state_45739;
state_45739 = G__45772;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__19827__auto__ = function(state_45739){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__19827__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__19827__auto____1.call(this,state_45739);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__19827__auto____0;
figwheel$client$file_reloading$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__19827__auto____1;
return figwheel$client$file_reloading$state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto__))
})();
var state__19893__auto__ = (function (){var statearr_45760 = f__19892__auto__.call(null);
(statearr_45760[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto__);

return statearr_45760;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto__))
);

return c__19891__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(url){
return cljs.core.async.put_BANG_.call(null,figwheel.client.file_reloading.reload_chan,url);
});
figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__45773,callback){
var map__45776 = p__45773;
var map__45776__$1 = ((((!((map__45776 == null)))?((((map__45776.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45776.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45776):map__45776);
var file_msg = map__45776__$1;
var namespace = cljs.core.get.call(null,map__45776__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,((function (request_url,map__45776,map__45776__$1,file_msg,namespace){
return (function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
});})(request_url,map__45776,map__45776__$1,file_msg,namespace))
);

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__45778){
var map__45781 = p__45778;
var map__45781__$1 = ((((!((map__45781 == null)))?((((map__45781.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45781.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45781):map__45781);
var file_msg = map__45781__$1;
var namespace = cljs.core.get.call(null,map__45781__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

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
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__45783,callback){
var map__45786 = p__45783;
var map__45786__$1 = ((((!((map__45786 == null)))?((((map__45786.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45786.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45786):map__45786);
var file_msg = map__45786__$1;
var request_url = cljs.core.get.call(null,map__45786__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__45786__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

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
var c__19891__auto___45874 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___45874,out){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___45874,out){
return (function (state_45856){
var state_val_45857 = (state_45856[(1)]);
if((state_val_45857 === (1))){
var inst_45834 = cljs.core.nth.call(null,files,(0),null);
var inst_45835 = cljs.core.nthnext.call(null,files,(1));
var inst_45836 = files;
var state_45856__$1 = (function (){var statearr_45858 = state_45856;
(statearr_45858[(7)] = inst_45835);

(statearr_45858[(8)] = inst_45834);

(statearr_45858[(9)] = inst_45836);

return statearr_45858;
})();
var statearr_45859_45875 = state_45856__$1;
(statearr_45859_45875[(2)] = null);

(statearr_45859_45875[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_45857 === (2))){
var inst_45836 = (state_45856[(9)]);
var inst_45839 = (state_45856[(10)]);
var inst_45839__$1 = cljs.core.nth.call(null,inst_45836,(0),null);
var inst_45840 = cljs.core.nthnext.call(null,inst_45836,(1));
var inst_45841 = (inst_45839__$1 == null);
var inst_45842 = cljs.core.not.call(null,inst_45841);
var state_45856__$1 = (function (){var statearr_45860 = state_45856;
(statearr_45860[(10)] = inst_45839__$1);

(statearr_45860[(11)] = inst_45840);

return statearr_45860;
})();
if(inst_45842){
var statearr_45861_45876 = state_45856__$1;
(statearr_45861_45876[(1)] = (4));

} else {
var statearr_45862_45877 = state_45856__$1;
(statearr_45862_45877[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_45857 === (3))){
var inst_45854 = (state_45856[(2)]);
var state_45856__$1 = state_45856;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_45856__$1,inst_45854);
} else {
if((state_val_45857 === (4))){
var inst_45839 = (state_45856[(10)]);
var inst_45844 = figwheel.client.file_reloading.reload_js_file.call(null,inst_45839);
var state_45856__$1 = state_45856;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_45856__$1,(7),inst_45844);
} else {
if((state_val_45857 === (5))){
var inst_45850 = cljs.core.async.close_BANG_.call(null,out);
var state_45856__$1 = state_45856;
var statearr_45863_45878 = state_45856__$1;
(statearr_45863_45878[(2)] = inst_45850);

(statearr_45863_45878[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_45857 === (6))){
var inst_45852 = (state_45856[(2)]);
var state_45856__$1 = state_45856;
var statearr_45864_45879 = state_45856__$1;
(statearr_45864_45879[(2)] = inst_45852);

(statearr_45864_45879[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_45857 === (7))){
var inst_45840 = (state_45856[(11)]);
var inst_45846 = (state_45856[(2)]);
var inst_45847 = cljs.core.async.put_BANG_.call(null,out,inst_45846);
var inst_45836 = inst_45840;
var state_45856__$1 = (function (){var statearr_45865 = state_45856;
(statearr_45865[(9)] = inst_45836);

(statearr_45865[(12)] = inst_45847);

return statearr_45865;
})();
var statearr_45866_45880 = state_45856__$1;
(statearr_45866_45880[(2)] = null);

(statearr_45866_45880[(1)] = (2));


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
});})(c__19891__auto___45874,out))
;
return ((function (switch__19826__auto__,c__19891__auto___45874,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__19827__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__19827__auto____0 = (function (){
var statearr_45870 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_45870[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__19827__auto__);

(statearr_45870[(1)] = (1));

return statearr_45870;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__19827__auto____1 = (function (state_45856){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_45856);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e45871){if((e45871 instanceof Object)){
var ex__19830__auto__ = e45871;
var statearr_45872_45881 = state_45856;
(statearr_45872_45881[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_45856);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e45871;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__45882 = state_45856;
state_45856 = G__45882;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__19827__auto__ = function(state_45856){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__19827__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__19827__auto____1.call(this,state_45856);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__19827__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__19827__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___45874,out))
})();
var state__19893__auto__ = (function (){var statearr_45873 = f__19892__auto__.call(null);
(statearr_45873[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___45874);

return statearr_45873;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___45874,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__45883,opts){
var map__45887 = p__45883;
var map__45887__$1 = ((((!((map__45887 == null)))?((((map__45887.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45887.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45887):map__45887);
var eval_body__$1 = cljs.core.get.call(null,map__45887__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__45887__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
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
}catch (e45889){var e = e45889;
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
return (function (p1__45890_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__45890_SHARP_),n);
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
return cljs.core.map.call(null,(function (p__45895){
var vec__45896 = p__45895;
var k = cljs.core.nth.call(null,vec__45896,(0),null);
var v = cljs.core.nth.call(null,vec__45896,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__45897){
var vec__45898 = p__45897;
var k = cljs.core.nth.call(null,vec__45898,(0),null);
var v = cljs.core.nth.call(null,vec__45898,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__45902,p__45903){
var map__46150 = p__45902;
var map__46150__$1 = ((((!((map__46150 == null)))?((((map__46150.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46150.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46150):map__46150);
var opts = map__46150__$1;
var before_jsload = cljs.core.get.call(null,map__46150__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__46150__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__46150__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__46151 = p__45903;
var map__46151__$1 = ((((!((map__46151 == null)))?((((map__46151.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46151.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46151):map__46151);
var msg = map__46151__$1;
var files = cljs.core.get.call(null,map__46151__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__46151__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__46151__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__19891__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (state_46304){
var state_val_46305 = (state_46304[(1)]);
if((state_val_46305 === (7))){
var inst_46168 = (state_46304[(7)]);
var inst_46165 = (state_46304[(8)]);
var inst_46167 = (state_46304[(9)]);
var inst_46166 = (state_46304[(10)]);
var inst_46173 = cljs.core._nth.call(null,inst_46166,inst_46168);
var inst_46174 = figwheel.client.file_reloading.eval_body.call(null,inst_46173,opts);
var inst_46175 = (inst_46168 + (1));
var tmp46306 = inst_46165;
var tmp46307 = inst_46167;
var tmp46308 = inst_46166;
var inst_46165__$1 = tmp46306;
var inst_46166__$1 = tmp46308;
var inst_46167__$1 = tmp46307;
var inst_46168__$1 = inst_46175;
var state_46304__$1 = (function (){var statearr_46309 = state_46304;
(statearr_46309[(7)] = inst_46168__$1);

(statearr_46309[(8)] = inst_46165__$1);

(statearr_46309[(11)] = inst_46174);

(statearr_46309[(9)] = inst_46167__$1);

(statearr_46309[(10)] = inst_46166__$1);

return statearr_46309;
})();
var statearr_46310_46396 = state_46304__$1;
(statearr_46310_46396[(2)] = null);

(statearr_46310_46396[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (20))){
var inst_46208 = (state_46304[(12)]);
var inst_46216 = figwheel.client.file_reloading.sort_files.call(null,inst_46208);
var state_46304__$1 = state_46304;
var statearr_46311_46397 = state_46304__$1;
(statearr_46311_46397[(2)] = inst_46216);

(statearr_46311_46397[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (27))){
var state_46304__$1 = state_46304;
var statearr_46312_46398 = state_46304__$1;
(statearr_46312_46398[(2)] = null);

(statearr_46312_46398[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (1))){
var inst_46157 = (state_46304[(13)]);
var inst_46154 = before_jsload.call(null,files);
var inst_46155 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_46156 = (function (){return ((function (inst_46157,inst_46154,inst_46155,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__45899_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__45899_SHARP_);
});
;})(inst_46157,inst_46154,inst_46155,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_46157__$1 = cljs.core.filter.call(null,inst_46156,files);
var inst_46158 = cljs.core.not_empty.call(null,inst_46157__$1);
var state_46304__$1 = (function (){var statearr_46313 = state_46304;
(statearr_46313[(13)] = inst_46157__$1);

(statearr_46313[(14)] = inst_46154);

(statearr_46313[(15)] = inst_46155);

return statearr_46313;
})();
if(cljs.core.truth_(inst_46158)){
var statearr_46314_46399 = state_46304__$1;
(statearr_46314_46399[(1)] = (2));

} else {
var statearr_46315_46400 = state_46304__$1;
(statearr_46315_46400[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (24))){
var state_46304__$1 = state_46304;
var statearr_46316_46401 = state_46304__$1;
(statearr_46316_46401[(2)] = null);

(statearr_46316_46401[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (39))){
var inst_46258 = (state_46304[(16)]);
var state_46304__$1 = state_46304;
var statearr_46317_46402 = state_46304__$1;
(statearr_46317_46402[(2)] = inst_46258);

(statearr_46317_46402[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (46))){
var inst_46299 = (state_46304[(2)]);
var state_46304__$1 = state_46304;
var statearr_46318_46403 = state_46304__$1;
(statearr_46318_46403[(2)] = inst_46299);

(statearr_46318_46403[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (4))){
var inst_46202 = (state_46304[(2)]);
var inst_46203 = cljs.core.List.EMPTY;
var inst_46204 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_46203);
var inst_46205 = (function (){return ((function (inst_46202,inst_46203,inst_46204,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__45900_SHARP_){
var and__16255__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__45900_SHARP_);
if(cljs.core.truth_(and__16255__auto__)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__45900_SHARP_));
} else {
return and__16255__auto__;
}
});
;})(inst_46202,inst_46203,inst_46204,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_46206 = cljs.core.filter.call(null,inst_46205,files);
var inst_46207 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_46208 = cljs.core.concat.call(null,inst_46206,inst_46207);
var state_46304__$1 = (function (){var statearr_46319 = state_46304;
(statearr_46319[(17)] = inst_46204);

(statearr_46319[(12)] = inst_46208);

(statearr_46319[(18)] = inst_46202);

return statearr_46319;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_46320_46404 = state_46304__$1;
(statearr_46320_46404[(1)] = (16));

} else {
var statearr_46321_46405 = state_46304__$1;
(statearr_46321_46405[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (15))){
var inst_46192 = (state_46304[(2)]);
var state_46304__$1 = state_46304;
var statearr_46322_46406 = state_46304__$1;
(statearr_46322_46406[(2)] = inst_46192);

(statearr_46322_46406[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (21))){
var inst_46218 = (state_46304[(19)]);
var inst_46218__$1 = (state_46304[(2)]);
var inst_46219 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_46218__$1);
var state_46304__$1 = (function (){var statearr_46323 = state_46304;
(statearr_46323[(19)] = inst_46218__$1);

return statearr_46323;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_46304__$1,(22),inst_46219);
} else {
if((state_val_46305 === (31))){
var inst_46302 = (state_46304[(2)]);
var state_46304__$1 = state_46304;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_46304__$1,inst_46302);
} else {
if((state_val_46305 === (32))){
var inst_46258 = (state_46304[(16)]);
var inst_46263 = inst_46258.cljs$lang$protocol_mask$partition0$;
var inst_46264 = (inst_46263 & (64));
var inst_46265 = inst_46258.cljs$core$ISeq$;
var inst_46266 = (inst_46264) || (inst_46265);
var state_46304__$1 = state_46304;
if(cljs.core.truth_(inst_46266)){
var statearr_46324_46407 = state_46304__$1;
(statearr_46324_46407[(1)] = (35));

} else {
var statearr_46325_46408 = state_46304__$1;
(statearr_46325_46408[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (40))){
var inst_46279 = (state_46304[(20)]);
var inst_46278 = (state_46304[(2)]);
var inst_46279__$1 = cljs.core.get.call(null,inst_46278,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_46280 = cljs.core.get.call(null,inst_46278,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_46281 = cljs.core.not_empty.call(null,inst_46279__$1);
var state_46304__$1 = (function (){var statearr_46326 = state_46304;
(statearr_46326[(21)] = inst_46280);

(statearr_46326[(20)] = inst_46279__$1);

return statearr_46326;
})();
if(cljs.core.truth_(inst_46281)){
var statearr_46327_46409 = state_46304__$1;
(statearr_46327_46409[(1)] = (41));

} else {
var statearr_46328_46410 = state_46304__$1;
(statearr_46328_46410[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (33))){
var state_46304__$1 = state_46304;
var statearr_46329_46411 = state_46304__$1;
(statearr_46329_46411[(2)] = false);

(statearr_46329_46411[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (13))){
var inst_46178 = (state_46304[(22)]);
var inst_46182 = cljs.core.chunk_first.call(null,inst_46178);
var inst_46183 = cljs.core.chunk_rest.call(null,inst_46178);
var inst_46184 = cljs.core.count.call(null,inst_46182);
var inst_46165 = inst_46183;
var inst_46166 = inst_46182;
var inst_46167 = inst_46184;
var inst_46168 = (0);
var state_46304__$1 = (function (){var statearr_46330 = state_46304;
(statearr_46330[(7)] = inst_46168);

(statearr_46330[(8)] = inst_46165);

(statearr_46330[(9)] = inst_46167);

(statearr_46330[(10)] = inst_46166);

return statearr_46330;
})();
var statearr_46331_46412 = state_46304__$1;
(statearr_46331_46412[(2)] = null);

(statearr_46331_46412[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (22))){
var inst_46222 = (state_46304[(23)]);
var inst_46218 = (state_46304[(19)]);
var inst_46221 = (state_46304[(24)]);
var inst_46226 = (state_46304[(25)]);
var inst_46221__$1 = (state_46304[(2)]);
var inst_46222__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_46221__$1);
var inst_46223 = (function (){var all_files = inst_46218;
var res_SINGLEQUOTE_ = inst_46221__$1;
var res = inst_46222__$1;
return ((function (all_files,res_SINGLEQUOTE_,res,inst_46222,inst_46218,inst_46221,inst_46226,inst_46221__$1,inst_46222__$1,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__45901_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__45901_SHARP_));
});
;})(all_files,res_SINGLEQUOTE_,res,inst_46222,inst_46218,inst_46221,inst_46226,inst_46221__$1,inst_46222__$1,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_46224 = cljs.core.filter.call(null,inst_46223,inst_46221__$1);
var inst_46225 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_46226__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_46225);
var inst_46227 = cljs.core.not_empty.call(null,inst_46226__$1);
var state_46304__$1 = (function (){var statearr_46332 = state_46304;
(statearr_46332[(23)] = inst_46222__$1);

(statearr_46332[(24)] = inst_46221__$1);

(statearr_46332[(25)] = inst_46226__$1);

(statearr_46332[(26)] = inst_46224);

return statearr_46332;
})();
if(cljs.core.truth_(inst_46227)){
var statearr_46333_46413 = state_46304__$1;
(statearr_46333_46413[(1)] = (23));

} else {
var statearr_46334_46414 = state_46304__$1;
(statearr_46334_46414[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (36))){
var state_46304__$1 = state_46304;
var statearr_46335_46415 = state_46304__$1;
(statearr_46335_46415[(2)] = false);

(statearr_46335_46415[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (41))){
var inst_46279 = (state_46304[(20)]);
var inst_46283 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_46284 = cljs.core.map.call(null,inst_46283,inst_46279);
var inst_46285 = cljs.core.pr_str.call(null,inst_46284);
var inst_46286 = [cljs.core.str("figwheel-no-load meta-data: "),cljs.core.str(inst_46285)].join('');
var inst_46287 = figwheel.client.utils.log.call(null,inst_46286);
var state_46304__$1 = state_46304;
var statearr_46336_46416 = state_46304__$1;
(statearr_46336_46416[(2)] = inst_46287);

(statearr_46336_46416[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (43))){
var inst_46280 = (state_46304[(21)]);
var inst_46290 = (state_46304[(2)]);
var inst_46291 = cljs.core.not_empty.call(null,inst_46280);
var state_46304__$1 = (function (){var statearr_46337 = state_46304;
(statearr_46337[(27)] = inst_46290);

return statearr_46337;
})();
if(cljs.core.truth_(inst_46291)){
var statearr_46338_46417 = state_46304__$1;
(statearr_46338_46417[(1)] = (44));

} else {
var statearr_46339_46418 = state_46304__$1;
(statearr_46339_46418[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (29))){
var inst_46258 = (state_46304[(16)]);
var inst_46222 = (state_46304[(23)]);
var inst_46218 = (state_46304[(19)]);
var inst_46221 = (state_46304[(24)]);
var inst_46226 = (state_46304[(25)]);
var inst_46224 = (state_46304[(26)]);
var inst_46254 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_46257 = (function (){var all_files = inst_46218;
var res_SINGLEQUOTE_ = inst_46221;
var res = inst_46222;
var files_not_loaded = inst_46224;
var dependencies_that_loaded = inst_46226;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_46258,inst_46222,inst_46218,inst_46221,inst_46226,inst_46224,inst_46254,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__46256){
var map__46340 = p__46256;
var map__46340__$1 = ((((!((map__46340 == null)))?((((map__46340.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46340.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46340):map__46340);
var namespace = cljs.core.get.call(null,map__46340__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
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
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_46258,inst_46222,inst_46218,inst_46221,inst_46226,inst_46224,inst_46254,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_46258__$1 = cljs.core.group_by.call(null,inst_46257,inst_46224);
var inst_46260 = (inst_46258__$1 == null);
var inst_46261 = cljs.core.not.call(null,inst_46260);
var state_46304__$1 = (function (){var statearr_46342 = state_46304;
(statearr_46342[(16)] = inst_46258__$1);

(statearr_46342[(28)] = inst_46254);

return statearr_46342;
})();
if(inst_46261){
var statearr_46343_46419 = state_46304__$1;
(statearr_46343_46419[(1)] = (32));

} else {
var statearr_46344_46420 = state_46304__$1;
(statearr_46344_46420[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (44))){
var inst_46280 = (state_46304[(21)]);
var inst_46293 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_46280);
var inst_46294 = cljs.core.pr_str.call(null,inst_46293);
var inst_46295 = [cljs.core.str("not required: "),cljs.core.str(inst_46294)].join('');
var inst_46296 = figwheel.client.utils.log.call(null,inst_46295);
var state_46304__$1 = state_46304;
var statearr_46345_46421 = state_46304__$1;
(statearr_46345_46421[(2)] = inst_46296);

(statearr_46345_46421[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (6))){
var inst_46199 = (state_46304[(2)]);
var state_46304__$1 = state_46304;
var statearr_46346_46422 = state_46304__$1;
(statearr_46346_46422[(2)] = inst_46199);

(statearr_46346_46422[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (28))){
var inst_46224 = (state_46304[(26)]);
var inst_46251 = (state_46304[(2)]);
var inst_46252 = cljs.core.not_empty.call(null,inst_46224);
var state_46304__$1 = (function (){var statearr_46347 = state_46304;
(statearr_46347[(29)] = inst_46251);

return statearr_46347;
})();
if(cljs.core.truth_(inst_46252)){
var statearr_46348_46423 = state_46304__$1;
(statearr_46348_46423[(1)] = (29));

} else {
var statearr_46349_46424 = state_46304__$1;
(statearr_46349_46424[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (25))){
var inst_46222 = (state_46304[(23)]);
var inst_46238 = (state_46304[(2)]);
var inst_46239 = cljs.core.not_empty.call(null,inst_46222);
var state_46304__$1 = (function (){var statearr_46350 = state_46304;
(statearr_46350[(30)] = inst_46238);

return statearr_46350;
})();
if(cljs.core.truth_(inst_46239)){
var statearr_46351_46425 = state_46304__$1;
(statearr_46351_46425[(1)] = (26));

} else {
var statearr_46352_46426 = state_46304__$1;
(statearr_46352_46426[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (34))){
var inst_46273 = (state_46304[(2)]);
var state_46304__$1 = state_46304;
if(cljs.core.truth_(inst_46273)){
var statearr_46353_46427 = state_46304__$1;
(statearr_46353_46427[(1)] = (38));

} else {
var statearr_46354_46428 = state_46304__$1;
(statearr_46354_46428[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (17))){
var state_46304__$1 = state_46304;
var statearr_46355_46429 = state_46304__$1;
(statearr_46355_46429[(2)] = recompile_dependents);

(statearr_46355_46429[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (3))){
var state_46304__$1 = state_46304;
var statearr_46356_46430 = state_46304__$1;
(statearr_46356_46430[(2)] = null);

(statearr_46356_46430[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (12))){
var inst_46195 = (state_46304[(2)]);
var state_46304__$1 = state_46304;
var statearr_46357_46431 = state_46304__$1;
(statearr_46357_46431[(2)] = inst_46195);

(statearr_46357_46431[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (2))){
var inst_46157 = (state_46304[(13)]);
var inst_46164 = cljs.core.seq.call(null,inst_46157);
var inst_46165 = inst_46164;
var inst_46166 = null;
var inst_46167 = (0);
var inst_46168 = (0);
var state_46304__$1 = (function (){var statearr_46358 = state_46304;
(statearr_46358[(7)] = inst_46168);

(statearr_46358[(8)] = inst_46165);

(statearr_46358[(9)] = inst_46167);

(statearr_46358[(10)] = inst_46166);

return statearr_46358;
})();
var statearr_46359_46432 = state_46304__$1;
(statearr_46359_46432[(2)] = null);

(statearr_46359_46432[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (23))){
var inst_46222 = (state_46304[(23)]);
var inst_46218 = (state_46304[(19)]);
var inst_46221 = (state_46304[(24)]);
var inst_46226 = (state_46304[(25)]);
var inst_46224 = (state_46304[(26)]);
var inst_46229 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_46231 = (function (){var all_files = inst_46218;
var res_SINGLEQUOTE_ = inst_46221;
var res = inst_46222;
var files_not_loaded = inst_46224;
var dependencies_that_loaded = inst_46226;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_46222,inst_46218,inst_46221,inst_46226,inst_46224,inst_46229,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__46230){
var map__46360 = p__46230;
var map__46360__$1 = ((((!((map__46360 == null)))?((((map__46360.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46360.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46360):map__46360);
var request_url = cljs.core.get.call(null,map__46360__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_46222,inst_46218,inst_46221,inst_46226,inst_46224,inst_46229,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_46232 = cljs.core.reverse.call(null,inst_46226);
var inst_46233 = cljs.core.map.call(null,inst_46231,inst_46232);
var inst_46234 = cljs.core.pr_str.call(null,inst_46233);
var inst_46235 = figwheel.client.utils.log.call(null,inst_46234);
var state_46304__$1 = (function (){var statearr_46362 = state_46304;
(statearr_46362[(31)] = inst_46229);

return statearr_46362;
})();
var statearr_46363_46433 = state_46304__$1;
(statearr_46363_46433[(2)] = inst_46235);

(statearr_46363_46433[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (35))){
var state_46304__$1 = state_46304;
var statearr_46364_46434 = state_46304__$1;
(statearr_46364_46434[(2)] = true);

(statearr_46364_46434[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (19))){
var inst_46208 = (state_46304[(12)]);
var inst_46214 = figwheel.client.file_reloading.expand_files.call(null,inst_46208);
var state_46304__$1 = state_46304;
var statearr_46365_46435 = state_46304__$1;
(statearr_46365_46435[(2)] = inst_46214);

(statearr_46365_46435[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (11))){
var state_46304__$1 = state_46304;
var statearr_46366_46436 = state_46304__$1;
(statearr_46366_46436[(2)] = null);

(statearr_46366_46436[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (9))){
var inst_46197 = (state_46304[(2)]);
var state_46304__$1 = state_46304;
var statearr_46367_46437 = state_46304__$1;
(statearr_46367_46437[(2)] = inst_46197);

(statearr_46367_46437[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (5))){
var inst_46168 = (state_46304[(7)]);
var inst_46167 = (state_46304[(9)]);
var inst_46170 = (inst_46168 < inst_46167);
var inst_46171 = inst_46170;
var state_46304__$1 = state_46304;
if(cljs.core.truth_(inst_46171)){
var statearr_46368_46438 = state_46304__$1;
(statearr_46368_46438[(1)] = (7));

} else {
var statearr_46369_46439 = state_46304__$1;
(statearr_46369_46439[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (14))){
var inst_46178 = (state_46304[(22)]);
var inst_46187 = cljs.core.first.call(null,inst_46178);
var inst_46188 = figwheel.client.file_reloading.eval_body.call(null,inst_46187,opts);
var inst_46189 = cljs.core.next.call(null,inst_46178);
var inst_46165 = inst_46189;
var inst_46166 = null;
var inst_46167 = (0);
var inst_46168 = (0);
var state_46304__$1 = (function (){var statearr_46370 = state_46304;
(statearr_46370[(7)] = inst_46168);

(statearr_46370[(8)] = inst_46165);

(statearr_46370[(9)] = inst_46167);

(statearr_46370[(10)] = inst_46166);

(statearr_46370[(32)] = inst_46188);

return statearr_46370;
})();
var statearr_46371_46440 = state_46304__$1;
(statearr_46371_46440[(2)] = null);

(statearr_46371_46440[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (45))){
var state_46304__$1 = state_46304;
var statearr_46372_46441 = state_46304__$1;
(statearr_46372_46441[(2)] = null);

(statearr_46372_46441[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (26))){
var inst_46222 = (state_46304[(23)]);
var inst_46218 = (state_46304[(19)]);
var inst_46221 = (state_46304[(24)]);
var inst_46226 = (state_46304[(25)]);
var inst_46224 = (state_46304[(26)]);
var inst_46241 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_46243 = (function (){var all_files = inst_46218;
var res_SINGLEQUOTE_ = inst_46221;
var res = inst_46222;
var files_not_loaded = inst_46224;
var dependencies_that_loaded = inst_46226;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_46222,inst_46218,inst_46221,inst_46226,inst_46224,inst_46241,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__46242){
var map__46373 = p__46242;
var map__46373__$1 = ((((!((map__46373 == null)))?((((map__46373.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46373.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46373):map__46373);
var namespace = cljs.core.get.call(null,map__46373__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__46373__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_46222,inst_46218,inst_46221,inst_46226,inst_46224,inst_46241,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_46244 = cljs.core.map.call(null,inst_46243,inst_46222);
var inst_46245 = cljs.core.pr_str.call(null,inst_46244);
var inst_46246 = figwheel.client.utils.log.call(null,inst_46245);
var inst_46247 = (function (){var all_files = inst_46218;
var res_SINGLEQUOTE_ = inst_46221;
var res = inst_46222;
var files_not_loaded = inst_46224;
var dependencies_that_loaded = inst_46226;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_46222,inst_46218,inst_46221,inst_46226,inst_46224,inst_46241,inst_46243,inst_46244,inst_46245,inst_46246,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_46222,inst_46218,inst_46221,inst_46226,inst_46224,inst_46241,inst_46243,inst_46244,inst_46245,inst_46246,state_val_46305,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_46248 = setTimeout(inst_46247,(10));
var state_46304__$1 = (function (){var statearr_46375 = state_46304;
(statearr_46375[(33)] = inst_46241);

(statearr_46375[(34)] = inst_46246);

return statearr_46375;
})();
var statearr_46376_46442 = state_46304__$1;
(statearr_46376_46442[(2)] = inst_46248);

(statearr_46376_46442[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (16))){
var state_46304__$1 = state_46304;
var statearr_46377_46443 = state_46304__$1;
(statearr_46377_46443[(2)] = reload_dependents);

(statearr_46377_46443[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (38))){
var inst_46258 = (state_46304[(16)]);
var inst_46275 = cljs.core.apply.call(null,cljs.core.hash_map,inst_46258);
var state_46304__$1 = state_46304;
var statearr_46378_46444 = state_46304__$1;
(statearr_46378_46444[(2)] = inst_46275);

(statearr_46378_46444[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (30))){
var state_46304__$1 = state_46304;
var statearr_46379_46445 = state_46304__$1;
(statearr_46379_46445[(2)] = null);

(statearr_46379_46445[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (10))){
var inst_46178 = (state_46304[(22)]);
var inst_46180 = cljs.core.chunked_seq_QMARK_.call(null,inst_46178);
var state_46304__$1 = state_46304;
if(inst_46180){
var statearr_46380_46446 = state_46304__$1;
(statearr_46380_46446[(1)] = (13));

} else {
var statearr_46381_46447 = state_46304__$1;
(statearr_46381_46447[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (18))){
var inst_46212 = (state_46304[(2)]);
var state_46304__$1 = state_46304;
if(cljs.core.truth_(inst_46212)){
var statearr_46382_46448 = state_46304__$1;
(statearr_46382_46448[(1)] = (19));

} else {
var statearr_46383_46449 = state_46304__$1;
(statearr_46383_46449[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (42))){
var state_46304__$1 = state_46304;
var statearr_46384_46450 = state_46304__$1;
(statearr_46384_46450[(2)] = null);

(statearr_46384_46450[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (37))){
var inst_46270 = (state_46304[(2)]);
var state_46304__$1 = state_46304;
var statearr_46385_46451 = state_46304__$1;
(statearr_46385_46451[(2)] = inst_46270);

(statearr_46385_46451[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46305 === (8))){
var inst_46165 = (state_46304[(8)]);
var inst_46178 = (state_46304[(22)]);
var inst_46178__$1 = cljs.core.seq.call(null,inst_46165);
var state_46304__$1 = (function (){var statearr_46386 = state_46304;
(statearr_46386[(22)] = inst_46178__$1);

return statearr_46386;
})();
if(inst_46178__$1){
var statearr_46387_46452 = state_46304__$1;
(statearr_46387_46452[(1)] = (10));

} else {
var statearr_46388_46453 = state_46304__$1;
(statearr_46388_46453[(1)] = (11));

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
});})(c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents))
;
return ((function (switch__19826__auto__,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__19827__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__19827__auto____0 = (function (){
var statearr_46392 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_46392[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__19827__auto__);

(statearr_46392[(1)] = (1));

return statearr_46392;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__19827__auto____1 = (function (state_46304){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_46304);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e46393){if((e46393 instanceof Object)){
var ex__19830__auto__ = e46393;
var statearr_46394_46454 = state_46304;
(statearr_46394_46454[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_46304);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e46393;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__46455 = state_46304;
state_46304 = G__46455;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__19827__auto__ = function(state_46304){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__19827__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__19827__auto____1.call(this,state_46304);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__19827__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__19827__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var state__19893__auto__ = (function (){var statearr_46395 = f__19892__auto__.call(null);
(statearr_46395[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto__);

return statearr_46395;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto__,map__46150,map__46150__$1,opts,before_jsload,on_jsload,reload_dependents,map__46151,map__46151__$1,msg,files,figwheel_meta,recompile_dependents))
);

return c__19891__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str(location.protocol),cljs.core.str("//")].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__46458,link){
var map__46461 = p__46458;
var map__46461__$1 = ((((!((map__46461 == null)))?((((map__46461.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46461.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46461):map__46461);
var file = cljs.core.get.call(null,map__46461__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4425__auto__ = link.href;
if(cljs.core.truth_(temp__4425__auto__)){
var link_href = temp__4425__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__4425__auto__,map__46461,map__46461__$1,file){
return (function (p1__46456_SHARP_,p2__46457_SHARP_){
if(cljs.core._EQ_.call(null,p1__46456_SHARP_,p2__46457_SHARP_)){
return p1__46456_SHARP_;
} else {
return false;
}
});})(link_href,temp__4425__auto__,map__46461,map__46461__$1,file))
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
var temp__4425__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__46467){
var map__46468 = p__46467;
var map__46468__$1 = ((((!((map__46468 == null)))?((((map__46468.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46468.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46468):map__46468);
var match_length = cljs.core.get.call(null,map__46468__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__46468__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__46463_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__46463_SHARP_);
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
var args46470 = [];
var len__17325__auto___46473 = arguments.length;
var i__17326__auto___46474 = (0);
while(true){
if((i__17326__auto___46474 < len__17325__auto___46473)){
args46470.push((arguments[i__17326__auto___46474]));

var G__46475 = (i__17326__auto___46474 + (1));
i__17326__auto___46474 = G__46475;
continue;
} else {
}
break;
}

var G__46472 = args46470.length;
switch (G__46472) {
case 1:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args46470.length)].join('')));

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
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__46477_SHARP_,p2__46478_SHARP_){
return cljs.core.assoc.call(null,p1__46477_SHARP_,cljs.core.get.call(null,p2__46478_SHARP_,key),p2__46478_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,seqq));
});
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(p__46479){
var map__46482 = p__46479;
var map__46482__$1 = ((((!((map__46482 == null)))?((((map__46482.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46482.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46482):map__46482);
var f_data = map__46482__$1;
var file = cljs.core.get.call(null,map__46482__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4425__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__4425__auto__)){
var link = temp__4425__auto__;
return figwheel.client.file_reloading.add_link_to_doc.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href));
} else {
return null;
}
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__46484,files_msg){
var map__46491 = p__46484;
var map__46491__$1 = ((((!((map__46491 == null)))?((((map__46491.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46491.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46491):map__46491);
var opts = map__46491__$1;
var on_cssload = cljs.core.get.call(null,map__46491__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var seq__46493_46497 = cljs.core.seq.call(null,figwheel.client.file_reloading.distictify.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg)));
var chunk__46494_46498 = null;
var count__46495_46499 = (0);
var i__46496_46500 = (0);
while(true){
if((i__46496_46500 < count__46495_46499)){
var f_46501 = cljs.core._nth.call(null,chunk__46494_46498,i__46496_46500);
figwheel.client.file_reloading.reload_css_file.call(null,f_46501);

var G__46502 = seq__46493_46497;
var G__46503 = chunk__46494_46498;
var G__46504 = count__46495_46499;
var G__46505 = (i__46496_46500 + (1));
seq__46493_46497 = G__46502;
chunk__46494_46498 = G__46503;
count__46495_46499 = G__46504;
i__46496_46500 = G__46505;
continue;
} else {
var temp__4425__auto___46506 = cljs.core.seq.call(null,seq__46493_46497);
if(temp__4425__auto___46506){
var seq__46493_46507__$1 = temp__4425__auto___46506;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__46493_46507__$1)){
var c__17070__auto___46508 = cljs.core.chunk_first.call(null,seq__46493_46507__$1);
var G__46509 = cljs.core.chunk_rest.call(null,seq__46493_46507__$1);
var G__46510 = c__17070__auto___46508;
var G__46511 = cljs.core.count.call(null,c__17070__auto___46508);
var G__46512 = (0);
seq__46493_46497 = G__46509;
chunk__46494_46498 = G__46510;
count__46495_46499 = G__46511;
i__46496_46500 = G__46512;
continue;
} else {
var f_46513 = cljs.core.first.call(null,seq__46493_46507__$1);
figwheel.client.file_reloading.reload_css_file.call(null,f_46513);

var G__46514 = cljs.core.next.call(null,seq__46493_46507__$1);
var G__46515 = null;
var G__46516 = (0);
var G__46517 = (0);
seq__46493_46497 = G__46514;
chunk__46494_46498 = G__46515;
count__46495_46499 = G__46516;
i__46496_46500 = G__46517;
continue;
}
} else {
}
}
break;
}

return setTimeout(((function (map__46491,map__46491__$1,opts,on_cssload){
return (function (){
return on_cssload.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg));
});})(map__46491,map__46491__$1,opts,on_cssload))
,(100));
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map?rel=1445823450688