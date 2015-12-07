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
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__39731_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__39731_SHARP_));
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
var seq__39736 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__39737 = null;
var count__39738 = (0);
var i__39739 = (0);
while(true){
if((i__39739 < count__39738)){
var n = cljs.core._nth.call(null,chunk__39737,i__39739);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__39740 = seq__39736;
var G__39741 = chunk__39737;
var G__39742 = count__39738;
var G__39743 = (i__39739 + (1));
seq__39736 = G__39740;
chunk__39737 = G__39741;
count__39738 = G__39742;
i__39739 = G__39743;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__39736);
if(temp__4425__auto__){
var seq__39736__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39736__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__39736__$1);
var G__39744 = cljs.core.chunk_rest.call(null,seq__39736__$1);
var G__39745 = c__17070__auto__;
var G__39746 = cljs.core.count.call(null,c__17070__auto__);
var G__39747 = (0);
seq__39736 = G__39744;
chunk__39737 = G__39745;
count__39738 = G__39746;
i__39739 = G__39747;
continue;
} else {
var n = cljs.core.first.call(null,seq__39736__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__39748 = cljs.core.next.call(null,seq__39736__$1);
var G__39749 = null;
var G__39750 = (0);
var G__39751 = (0);
seq__39736 = G__39748;
chunk__39737 = G__39749;
count__39738 = G__39750;
i__39739 = G__39751;
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

var seq__39790_39797 = cljs.core.seq.call(null,deps);
var chunk__39791_39798 = null;
var count__39792_39799 = (0);
var i__39793_39800 = (0);
while(true){
if((i__39793_39800 < count__39792_39799)){
var dep_39801 = cljs.core._nth.call(null,chunk__39791_39798,i__39793_39800);
topo_sort_helper_STAR_.call(null,dep_39801,(depth + (1)),state);

var G__39802 = seq__39790_39797;
var G__39803 = chunk__39791_39798;
var G__39804 = count__39792_39799;
var G__39805 = (i__39793_39800 + (1));
seq__39790_39797 = G__39802;
chunk__39791_39798 = G__39803;
count__39792_39799 = G__39804;
i__39793_39800 = G__39805;
continue;
} else {
var temp__4425__auto___39806 = cljs.core.seq.call(null,seq__39790_39797);
if(temp__4425__auto___39806){
var seq__39790_39807__$1 = temp__4425__auto___39806;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39790_39807__$1)){
var c__17070__auto___39808 = cljs.core.chunk_first.call(null,seq__39790_39807__$1);
var G__39809 = cljs.core.chunk_rest.call(null,seq__39790_39807__$1);
var G__39810 = c__17070__auto___39808;
var G__39811 = cljs.core.count.call(null,c__17070__auto___39808);
var G__39812 = (0);
seq__39790_39797 = G__39809;
chunk__39791_39798 = G__39810;
count__39792_39799 = G__39811;
i__39793_39800 = G__39812;
continue;
} else {
var dep_39813 = cljs.core.first.call(null,seq__39790_39807__$1);
topo_sort_helper_STAR_.call(null,dep_39813,(depth + (1)),state);

var G__39814 = cljs.core.next.call(null,seq__39790_39807__$1);
var G__39815 = null;
var G__39816 = (0);
var G__39817 = (0);
seq__39790_39797 = G__39814;
chunk__39791_39798 = G__39815;
count__39792_39799 = G__39816;
i__39793_39800 = G__39817;
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
return (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__39794){
var vec__39796 = p__39794;
var x = cljs.core.nth.call(null,vec__39796,(0),null);
var xs = cljs.core.nthnext.call(null,vec__39796,(1));
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,((function (vec__39796,x,xs,get_deps__$1){
return (function (p1__39752_SHARP_){
return clojure.set.difference.call(null,p1__39752_SHARP_,x);
});})(vec__39796,x,xs,get_deps__$1))
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
var seq__39830 = cljs.core.seq.call(null,provides);
var chunk__39831 = null;
var count__39832 = (0);
var i__39833 = (0);
while(true){
if((i__39833 < count__39832)){
var prov = cljs.core._nth.call(null,chunk__39831,i__39833);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__39834_39842 = cljs.core.seq.call(null,requires);
var chunk__39835_39843 = null;
var count__39836_39844 = (0);
var i__39837_39845 = (0);
while(true){
if((i__39837_39845 < count__39836_39844)){
var req_39846 = cljs.core._nth.call(null,chunk__39835_39843,i__39837_39845);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_39846,prov);

var G__39847 = seq__39834_39842;
var G__39848 = chunk__39835_39843;
var G__39849 = count__39836_39844;
var G__39850 = (i__39837_39845 + (1));
seq__39834_39842 = G__39847;
chunk__39835_39843 = G__39848;
count__39836_39844 = G__39849;
i__39837_39845 = G__39850;
continue;
} else {
var temp__4425__auto___39851 = cljs.core.seq.call(null,seq__39834_39842);
if(temp__4425__auto___39851){
var seq__39834_39852__$1 = temp__4425__auto___39851;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39834_39852__$1)){
var c__17070__auto___39853 = cljs.core.chunk_first.call(null,seq__39834_39852__$1);
var G__39854 = cljs.core.chunk_rest.call(null,seq__39834_39852__$1);
var G__39855 = c__17070__auto___39853;
var G__39856 = cljs.core.count.call(null,c__17070__auto___39853);
var G__39857 = (0);
seq__39834_39842 = G__39854;
chunk__39835_39843 = G__39855;
count__39836_39844 = G__39856;
i__39837_39845 = G__39857;
continue;
} else {
var req_39858 = cljs.core.first.call(null,seq__39834_39852__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_39858,prov);

var G__39859 = cljs.core.next.call(null,seq__39834_39852__$1);
var G__39860 = null;
var G__39861 = (0);
var G__39862 = (0);
seq__39834_39842 = G__39859;
chunk__39835_39843 = G__39860;
count__39836_39844 = G__39861;
i__39837_39845 = G__39862;
continue;
}
} else {
}
}
break;
}

var G__39863 = seq__39830;
var G__39864 = chunk__39831;
var G__39865 = count__39832;
var G__39866 = (i__39833 + (1));
seq__39830 = G__39863;
chunk__39831 = G__39864;
count__39832 = G__39865;
i__39833 = G__39866;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__39830);
if(temp__4425__auto__){
var seq__39830__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39830__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__39830__$1);
var G__39867 = cljs.core.chunk_rest.call(null,seq__39830__$1);
var G__39868 = c__17070__auto__;
var G__39869 = cljs.core.count.call(null,c__17070__auto__);
var G__39870 = (0);
seq__39830 = G__39867;
chunk__39831 = G__39868;
count__39832 = G__39869;
i__39833 = G__39870;
continue;
} else {
var prov = cljs.core.first.call(null,seq__39830__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__39838_39871 = cljs.core.seq.call(null,requires);
var chunk__39839_39872 = null;
var count__39840_39873 = (0);
var i__39841_39874 = (0);
while(true){
if((i__39841_39874 < count__39840_39873)){
var req_39875 = cljs.core._nth.call(null,chunk__39839_39872,i__39841_39874);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_39875,prov);

var G__39876 = seq__39838_39871;
var G__39877 = chunk__39839_39872;
var G__39878 = count__39840_39873;
var G__39879 = (i__39841_39874 + (1));
seq__39838_39871 = G__39876;
chunk__39839_39872 = G__39877;
count__39840_39873 = G__39878;
i__39841_39874 = G__39879;
continue;
} else {
var temp__4425__auto___39880__$1 = cljs.core.seq.call(null,seq__39838_39871);
if(temp__4425__auto___39880__$1){
var seq__39838_39881__$1 = temp__4425__auto___39880__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39838_39881__$1)){
var c__17070__auto___39882 = cljs.core.chunk_first.call(null,seq__39838_39881__$1);
var G__39883 = cljs.core.chunk_rest.call(null,seq__39838_39881__$1);
var G__39884 = c__17070__auto___39882;
var G__39885 = cljs.core.count.call(null,c__17070__auto___39882);
var G__39886 = (0);
seq__39838_39871 = G__39883;
chunk__39839_39872 = G__39884;
count__39840_39873 = G__39885;
i__39841_39874 = G__39886;
continue;
} else {
var req_39887 = cljs.core.first.call(null,seq__39838_39881__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_39887,prov);

var G__39888 = cljs.core.next.call(null,seq__39838_39881__$1);
var G__39889 = null;
var G__39890 = (0);
var G__39891 = (0);
seq__39838_39871 = G__39888;
chunk__39839_39872 = G__39889;
count__39840_39873 = G__39890;
i__39841_39874 = G__39891;
continue;
}
} else {
}
}
break;
}

var G__39892 = cljs.core.next.call(null,seq__39830__$1);
var G__39893 = null;
var G__39894 = (0);
var G__39895 = (0);
seq__39830 = G__39892;
chunk__39831 = G__39893;
count__39832 = G__39894;
i__39833 = G__39895;
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
var seq__39900_39904 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__39901_39905 = null;
var count__39902_39906 = (0);
var i__39903_39907 = (0);
while(true){
if((i__39903_39907 < count__39902_39906)){
var ns_39908 = cljs.core._nth.call(null,chunk__39901_39905,i__39903_39907);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_39908);

var G__39909 = seq__39900_39904;
var G__39910 = chunk__39901_39905;
var G__39911 = count__39902_39906;
var G__39912 = (i__39903_39907 + (1));
seq__39900_39904 = G__39909;
chunk__39901_39905 = G__39910;
count__39902_39906 = G__39911;
i__39903_39907 = G__39912;
continue;
} else {
var temp__4425__auto___39913 = cljs.core.seq.call(null,seq__39900_39904);
if(temp__4425__auto___39913){
var seq__39900_39914__$1 = temp__4425__auto___39913;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39900_39914__$1)){
var c__17070__auto___39915 = cljs.core.chunk_first.call(null,seq__39900_39914__$1);
var G__39916 = cljs.core.chunk_rest.call(null,seq__39900_39914__$1);
var G__39917 = c__17070__auto___39915;
var G__39918 = cljs.core.count.call(null,c__17070__auto___39915);
var G__39919 = (0);
seq__39900_39904 = G__39916;
chunk__39901_39905 = G__39917;
count__39902_39906 = G__39918;
i__39903_39907 = G__39919;
continue;
} else {
var ns_39920 = cljs.core.first.call(null,seq__39900_39914__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_39920);

var G__39921 = cljs.core.next.call(null,seq__39900_39914__$1);
var G__39922 = null;
var G__39923 = (0);
var G__39924 = (0);
seq__39900_39904 = G__39921;
chunk__39901_39905 = G__39922;
count__39902_39906 = G__39923;
i__39903_39907 = G__39924;
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
var G__39925__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__39925 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__39926__i = 0, G__39926__a = new Array(arguments.length -  0);
while (G__39926__i < G__39926__a.length) {G__39926__a[G__39926__i] = arguments[G__39926__i + 0]; ++G__39926__i;}
  args = new cljs.core.IndexedSeq(G__39926__a,0);
} 
return G__39925__delegate.call(this,args);};
G__39925.cljs$lang$maxFixedArity = 0;
G__39925.cljs$lang$applyTo = (function (arglist__39927){
var args = cljs.core.seq(arglist__39927);
return G__39925__delegate(args);
});
G__39925.cljs$core$IFn$_invoke$arity$variadic = G__39925__delegate;
return G__39925;
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
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__39928 = cljs.core._EQ_;
var expr__39929 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__39928.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__39929))){
return ((function (pred__39928,expr__39929){
return (function (request_url,callback){

var root = clojure.string.join.call(null,"/",cljs.core.reverse.call(null,cljs.core.drop.call(null,(2),cljs.core.reverse.call(null,clojure.string.split.call(null,__dirname,"/")))));
var path = [cljs.core.str(root),cljs.core.str("/"),cljs.core.str(figwheel.client.file_reloading.fix_node_request_url.call(null,request_url))].join('');
(require.cache[path] = null);

return callback.call(null,(function (){try{return require(path);
}catch (e39931){if((e39931 instanceof Error)){
var e = e39931;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e39931;

}
}})());
});
;})(pred__39928,expr__39929))
} else {
if(cljs.core.truth_(pred__39928.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__39929))){
return ((function (pred__39928,expr__39929){
return (function (request_url,callback){

var deferred = goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),{"cleanupWhenDone": true});
deferred.addCallback(((function (deferred,pred__39928,expr__39929){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(deferred,pred__39928,expr__39929))
);

return deferred.addErrback(((function (deferred,pred__39928,expr__39929){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(deferred,pred__39928,expr__39929))
);
});
;})(pred__39928,expr__39929))
} else {
return ((function (pred__39928,expr__39929){
return (function (a,b){
throw "Reload not defined for this platform";
});
;})(pred__39928,expr__39929))
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__39932,callback){
var map__39935 = p__39932;
var map__39935__$1 = ((((!((map__39935 == null)))?((((map__39935.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39935.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39935):map__39935);
var file_msg = map__39935__$1;
var request_url = cljs.core.get.call(null,map__39935__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Attempting to load "),cljs.core.str(request_url)].join(''));

return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,((function (map__39935,map__39935__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Successfully loaded "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__39935,map__39935__$1,file_msg,request_url))
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
figwheel.client.file_reloading.reloader_loop = (function (){var c__20534__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto__){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto__){
return (function (state_39959){
var state_val_39960 = (state_39959[(1)]);
if((state_val_39960 === (7))){
var inst_39955 = (state_39959[(2)]);
var state_39959__$1 = state_39959;
var statearr_39961_39981 = state_39959__$1;
(statearr_39961_39981[(2)] = inst_39955);

(statearr_39961_39981[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39960 === (1))){
var state_39959__$1 = state_39959;
var statearr_39962_39982 = state_39959__$1;
(statearr_39962_39982[(2)] = null);

(statearr_39962_39982[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39960 === (4))){
var inst_39939 = (state_39959[(7)]);
var inst_39939__$1 = (state_39959[(2)]);
var state_39959__$1 = (function (){var statearr_39963 = state_39959;
(statearr_39963[(7)] = inst_39939__$1);

return statearr_39963;
})();
if(cljs.core.truth_(inst_39939__$1)){
var statearr_39964_39983 = state_39959__$1;
(statearr_39964_39983[(1)] = (5));

} else {
var statearr_39965_39984 = state_39959__$1;
(statearr_39965_39984[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39960 === (6))){
var state_39959__$1 = state_39959;
var statearr_39966_39985 = state_39959__$1;
(statearr_39966_39985[(2)] = null);

(statearr_39966_39985[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39960 === (3))){
var inst_39957 = (state_39959[(2)]);
var state_39959__$1 = state_39959;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_39959__$1,inst_39957);
} else {
if((state_val_39960 === (2))){
var state_39959__$1 = state_39959;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39959__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_39960 === (11))){
var inst_39951 = (state_39959[(2)]);
var state_39959__$1 = (function (){var statearr_39967 = state_39959;
(statearr_39967[(8)] = inst_39951);

return statearr_39967;
})();
var statearr_39968_39986 = state_39959__$1;
(statearr_39968_39986[(2)] = null);

(statearr_39968_39986[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39960 === (9))){
var inst_39945 = (state_39959[(9)]);
var inst_39943 = (state_39959[(10)]);
var inst_39947 = inst_39945.call(null,inst_39943);
var state_39959__$1 = state_39959;
var statearr_39969_39987 = state_39959__$1;
(statearr_39969_39987[(2)] = inst_39947);

(statearr_39969_39987[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39960 === (5))){
var inst_39939 = (state_39959[(7)]);
var inst_39941 = figwheel.client.file_reloading.blocking_load.call(null,inst_39939);
var state_39959__$1 = state_39959;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39959__$1,(8),inst_39941);
} else {
if((state_val_39960 === (10))){
var inst_39943 = (state_39959[(10)]);
var inst_39949 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_39943);
var state_39959__$1 = state_39959;
var statearr_39970_39988 = state_39959__$1;
(statearr_39970_39988[(2)] = inst_39949);

(statearr_39970_39988[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39960 === (8))){
var inst_39939 = (state_39959[(7)]);
var inst_39945 = (state_39959[(9)]);
var inst_39943 = (state_39959[(2)]);
var inst_39944 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_39945__$1 = cljs.core.get.call(null,inst_39944,inst_39939);
var state_39959__$1 = (function (){var statearr_39971 = state_39959;
(statearr_39971[(9)] = inst_39945__$1);

(statearr_39971[(10)] = inst_39943);

return statearr_39971;
})();
if(cljs.core.truth_(inst_39945__$1)){
var statearr_39972_39989 = state_39959__$1;
(statearr_39972_39989[(1)] = (9));

} else {
var statearr_39973_39990 = state_39959__$1;
(statearr_39973_39990[(1)] = (10));

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
});})(c__20534__auto__))
;
return ((function (switch__20513__auto__,c__20534__auto__){
return (function() {
var figwheel$client$file_reloading$state_machine__20514__auto__ = null;
var figwheel$client$file_reloading$state_machine__20514__auto____0 = (function (){
var statearr_39977 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_39977[(0)] = figwheel$client$file_reloading$state_machine__20514__auto__);

(statearr_39977[(1)] = (1));

return statearr_39977;
});
var figwheel$client$file_reloading$state_machine__20514__auto____1 = (function (state_39959){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_39959);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e39978){if((e39978 instanceof Object)){
var ex__20517__auto__ = e39978;
var statearr_39979_39991 = state_39959;
(statearr_39979_39991[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_39959);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e39978;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39992 = state_39959;
state_39959 = G__39992;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__20514__auto__ = function(state_39959){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__20514__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__20514__auto____1.call(this,state_39959);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__20514__auto____0;
figwheel$client$file_reloading$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__20514__auto____1;
return figwheel$client$file_reloading$state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto__))
})();
var state__20536__auto__ = (function (){var statearr_39980 = f__20535__auto__.call(null);
(statearr_39980[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto__);

return statearr_39980;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto__))
);

return c__20534__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(url){
return cljs.core.async.put_BANG_.call(null,figwheel.client.file_reloading.reload_chan,url);
});
figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__39993,callback){
var map__39996 = p__39993;
var map__39996__$1 = ((((!((map__39996 == null)))?((((map__39996.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39996.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39996):map__39996);
var file_msg = map__39996__$1;
var namespace = cljs.core.get.call(null,map__39996__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,((function (request_url,map__39996,map__39996__$1,file_msg,namespace){
return (function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
});})(request_url,map__39996,map__39996__$1,file_msg,namespace))
);

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__39998){
var map__40001 = p__39998;
var map__40001__$1 = ((((!((map__40001 == null)))?((((map__40001.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40001.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__40001):map__40001);
var file_msg = map__40001__$1;
var namespace = cljs.core.get.call(null,map__40001__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

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
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__40003,callback){
var map__40006 = p__40003;
var map__40006__$1 = ((((!((map__40006 == null)))?((((map__40006.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40006.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__40006):map__40006);
var file_msg = map__40006__$1;
var request_url = cljs.core.get.call(null,map__40006__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__40006__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

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
var c__20534__auto___40094 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___40094,out){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___40094,out){
return (function (state_40076){
var state_val_40077 = (state_40076[(1)]);
if((state_val_40077 === (1))){
var inst_40054 = cljs.core.nth.call(null,files,(0),null);
var inst_40055 = cljs.core.nthnext.call(null,files,(1));
var inst_40056 = files;
var state_40076__$1 = (function (){var statearr_40078 = state_40076;
(statearr_40078[(7)] = inst_40054);

(statearr_40078[(8)] = inst_40055);

(statearr_40078[(9)] = inst_40056);

return statearr_40078;
})();
var statearr_40079_40095 = state_40076__$1;
(statearr_40079_40095[(2)] = null);

(statearr_40079_40095[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40077 === (2))){
var inst_40056 = (state_40076[(9)]);
var inst_40059 = (state_40076[(10)]);
var inst_40059__$1 = cljs.core.nth.call(null,inst_40056,(0),null);
var inst_40060 = cljs.core.nthnext.call(null,inst_40056,(1));
var inst_40061 = (inst_40059__$1 == null);
var inst_40062 = cljs.core.not.call(null,inst_40061);
var state_40076__$1 = (function (){var statearr_40080 = state_40076;
(statearr_40080[(11)] = inst_40060);

(statearr_40080[(10)] = inst_40059__$1);

return statearr_40080;
})();
if(inst_40062){
var statearr_40081_40096 = state_40076__$1;
(statearr_40081_40096[(1)] = (4));

} else {
var statearr_40082_40097 = state_40076__$1;
(statearr_40082_40097[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40077 === (3))){
var inst_40074 = (state_40076[(2)]);
var state_40076__$1 = state_40076;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40076__$1,inst_40074);
} else {
if((state_val_40077 === (4))){
var inst_40059 = (state_40076[(10)]);
var inst_40064 = figwheel.client.file_reloading.reload_js_file.call(null,inst_40059);
var state_40076__$1 = state_40076;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40076__$1,(7),inst_40064);
} else {
if((state_val_40077 === (5))){
var inst_40070 = cljs.core.async.close_BANG_.call(null,out);
var state_40076__$1 = state_40076;
var statearr_40083_40098 = state_40076__$1;
(statearr_40083_40098[(2)] = inst_40070);

(statearr_40083_40098[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40077 === (6))){
var inst_40072 = (state_40076[(2)]);
var state_40076__$1 = state_40076;
var statearr_40084_40099 = state_40076__$1;
(statearr_40084_40099[(2)] = inst_40072);

(statearr_40084_40099[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40077 === (7))){
var inst_40060 = (state_40076[(11)]);
var inst_40066 = (state_40076[(2)]);
var inst_40067 = cljs.core.async.put_BANG_.call(null,out,inst_40066);
var inst_40056 = inst_40060;
var state_40076__$1 = (function (){var statearr_40085 = state_40076;
(statearr_40085[(12)] = inst_40067);

(statearr_40085[(9)] = inst_40056);

return statearr_40085;
})();
var statearr_40086_40100 = state_40076__$1;
(statearr_40086_40100[(2)] = null);

(statearr_40086_40100[(1)] = (2));


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
});})(c__20534__auto___40094,out))
;
return ((function (switch__20513__auto__,c__20534__auto___40094,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__20514__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__20514__auto____0 = (function (){
var statearr_40090 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40090[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__20514__auto__);

(statearr_40090[(1)] = (1));

return statearr_40090;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__20514__auto____1 = (function (state_40076){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_40076);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e40091){if((e40091 instanceof Object)){
var ex__20517__auto__ = e40091;
var statearr_40092_40101 = state_40076;
(statearr_40092_40101[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40076);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40091;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40102 = state_40076;
state_40076 = G__40102;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__20514__auto__ = function(state_40076){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__20514__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__20514__auto____1.call(this,state_40076);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__20514__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__20514__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___40094,out))
})();
var state__20536__auto__ = (function (){var statearr_40093 = f__20535__auto__.call(null);
(statearr_40093[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___40094);

return statearr_40093;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___40094,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__40103,opts){
var map__40107 = p__40103;
var map__40107__$1 = ((((!((map__40107 == null)))?((((map__40107.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40107.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__40107):map__40107);
var eval_body__$1 = cljs.core.get.call(null,map__40107__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__40107__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
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
}catch (e40109){var e = e40109;
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
return (function (p1__40110_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__40110_SHARP_),n);
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
return cljs.core.map.call(null,(function (p__40115){
var vec__40116 = p__40115;
var k = cljs.core.nth.call(null,vec__40116,(0),null);
var v = cljs.core.nth.call(null,vec__40116,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__40117){
var vec__40118 = p__40117;
var k = cljs.core.nth.call(null,vec__40118,(0),null);
var v = cljs.core.nth.call(null,vec__40118,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__40122,p__40123){
var map__40370 = p__40122;
var map__40370__$1 = ((((!((map__40370 == null)))?((((map__40370.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40370.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__40370):map__40370);
var opts = map__40370__$1;
var before_jsload = cljs.core.get.call(null,map__40370__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__40370__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__40370__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__40371 = p__40123;
var map__40371__$1 = ((((!((map__40371 == null)))?((((map__40371.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40371.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__40371):map__40371);
var msg = map__40371__$1;
var files = cljs.core.get.call(null,map__40371__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__40371__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__40371__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__20534__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (state_40524){
var state_val_40525 = (state_40524[(1)]);
if((state_val_40525 === (7))){
var inst_40387 = (state_40524[(7)]);
var inst_40385 = (state_40524[(8)]);
var inst_40386 = (state_40524[(9)]);
var inst_40388 = (state_40524[(10)]);
var inst_40393 = cljs.core._nth.call(null,inst_40386,inst_40388);
var inst_40394 = figwheel.client.file_reloading.eval_body.call(null,inst_40393,opts);
var inst_40395 = (inst_40388 + (1));
var tmp40526 = inst_40387;
var tmp40527 = inst_40385;
var tmp40528 = inst_40386;
var inst_40385__$1 = tmp40527;
var inst_40386__$1 = tmp40528;
var inst_40387__$1 = tmp40526;
var inst_40388__$1 = inst_40395;
var state_40524__$1 = (function (){var statearr_40529 = state_40524;
(statearr_40529[(7)] = inst_40387__$1);

(statearr_40529[(8)] = inst_40385__$1);

(statearr_40529[(9)] = inst_40386__$1);

(statearr_40529[(11)] = inst_40394);

(statearr_40529[(10)] = inst_40388__$1);

return statearr_40529;
})();
var statearr_40530_40616 = state_40524__$1;
(statearr_40530_40616[(2)] = null);

(statearr_40530_40616[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (20))){
var inst_40428 = (state_40524[(12)]);
var inst_40436 = figwheel.client.file_reloading.sort_files.call(null,inst_40428);
var state_40524__$1 = state_40524;
var statearr_40531_40617 = state_40524__$1;
(statearr_40531_40617[(2)] = inst_40436);

(statearr_40531_40617[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (27))){
var state_40524__$1 = state_40524;
var statearr_40532_40618 = state_40524__$1;
(statearr_40532_40618[(2)] = null);

(statearr_40532_40618[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (1))){
var inst_40377 = (state_40524[(13)]);
var inst_40374 = before_jsload.call(null,files);
var inst_40375 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_40376 = (function (){return ((function (inst_40377,inst_40374,inst_40375,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__40119_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__40119_SHARP_);
});
;})(inst_40377,inst_40374,inst_40375,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_40377__$1 = cljs.core.filter.call(null,inst_40376,files);
var inst_40378 = cljs.core.not_empty.call(null,inst_40377__$1);
var state_40524__$1 = (function (){var statearr_40533 = state_40524;
(statearr_40533[(13)] = inst_40377__$1);

(statearr_40533[(14)] = inst_40374);

(statearr_40533[(15)] = inst_40375);

return statearr_40533;
})();
if(cljs.core.truth_(inst_40378)){
var statearr_40534_40619 = state_40524__$1;
(statearr_40534_40619[(1)] = (2));

} else {
var statearr_40535_40620 = state_40524__$1;
(statearr_40535_40620[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (24))){
var state_40524__$1 = state_40524;
var statearr_40536_40621 = state_40524__$1;
(statearr_40536_40621[(2)] = null);

(statearr_40536_40621[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (39))){
var inst_40478 = (state_40524[(16)]);
var state_40524__$1 = state_40524;
var statearr_40537_40622 = state_40524__$1;
(statearr_40537_40622[(2)] = inst_40478);

(statearr_40537_40622[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (46))){
var inst_40519 = (state_40524[(2)]);
var state_40524__$1 = state_40524;
var statearr_40538_40623 = state_40524__$1;
(statearr_40538_40623[(2)] = inst_40519);

(statearr_40538_40623[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (4))){
var inst_40422 = (state_40524[(2)]);
var inst_40423 = cljs.core.List.EMPTY;
var inst_40424 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_40423);
var inst_40425 = (function (){return ((function (inst_40422,inst_40423,inst_40424,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__40120_SHARP_){
var and__16255__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__40120_SHARP_);
if(cljs.core.truth_(and__16255__auto__)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__40120_SHARP_));
} else {
return and__16255__auto__;
}
});
;})(inst_40422,inst_40423,inst_40424,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_40426 = cljs.core.filter.call(null,inst_40425,files);
var inst_40427 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_40428 = cljs.core.concat.call(null,inst_40426,inst_40427);
var state_40524__$1 = (function (){var statearr_40539 = state_40524;
(statearr_40539[(17)] = inst_40424);

(statearr_40539[(12)] = inst_40428);

(statearr_40539[(18)] = inst_40422);

return statearr_40539;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_40540_40624 = state_40524__$1;
(statearr_40540_40624[(1)] = (16));

} else {
var statearr_40541_40625 = state_40524__$1;
(statearr_40541_40625[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (15))){
var inst_40412 = (state_40524[(2)]);
var state_40524__$1 = state_40524;
var statearr_40542_40626 = state_40524__$1;
(statearr_40542_40626[(2)] = inst_40412);

(statearr_40542_40626[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (21))){
var inst_40438 = (state_40524[(19)]);
var inst_40438__$1 = (state_40524[(2)]);
var inst_40439 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_40438__$1);
var state_40524__$1 = (function (){var statearr_40543 = state_40524;
(statearr_40543[(19)] = inst_40438__$1);

return statearr_40543;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40524__$1,(22),inst_40439);
} else {
if((state_val_40525 === (31))){
var inst_40522 = (state_40524[(2)]);
var state_40524__$1 = state_40524;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40524__$1,inst_40522);
} else {
if((state_val_40525 === (32))){
var inst_40478 = (state_40524[(16)]);
var inst_40483 = inst_40478.cljs$lang$protocol_mask$partition0$;
var inst_40484 = (inst_40483 & (64));
var inst_40485 = inst_40478.cljs$core$ISeq$;
var inst_40486 = (inst_40484) || (inst_40485);
var state_40524__$1 = state_40524;
if(cljs.core.truth_(inst_40486)){
var statearr_40544_40627 = state_40524__$1;
(statearr_40544_40627[(1)] = (35));

} else {
var statearr_40545_40628 = state_40524__$1;
(statearr_40545_40628[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (40))){
var inst_40499 = (state_40524[(20)]);
var inst_40498 = (state_40524[(2)]);
var inst_40499__$1 = cljs.core.get.call(null,inst_40498,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_40500 = cljs.core.get.call(null,inst_40498,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_40501 = cljs.core.not_empty.call(null,inst_40499__$1);
var state_40524__$1 = (function (){var statearr_40546 = state_40524;
(statearr_40546[(20)] = inst_40499__$1);

(statearr_40546[(21)] = inst_40500);

return statearr_40546;
})();
if(cljs.core.truth_(inst_40501)){
var statearr_40547_40629 = state_40524__$1;
(statearr_40547_40629[(1)] = (41));

} else {
var statearr_40548_40630 = state_40524__$1;
(statearr_40548_40630[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (33))){
var state_40524__$1 = state_40524;
var statearr_40549_40631 = state_40524__$1;
(statearr_40549_40631[(2)] = false);

(statearr_40549_40631[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (13))){
var inst_40398 = (state_40524[(22)]);
var inst_40402 = cljs.core.chunk_first.call(null,inst_40398);
var inst_40403 = cljs.core.chunk_rest.call(null,inst_40398);
var inst_40404 = cljs.core.count.call(null,inst_40402);
var inst_40385 = inst_40403;
var inst_40386 = inst_40402;
var inst_40387 = inst_40404;
var inst_40388 = (0);
var state_40524__$1 = (function (){var statearr_40550 = state_40524;
(statearr_40550[(7)] = inst_40387);

(statearr_40550[(8)] = inst_40385);

(statearr_40550[(9)] = inst_40386);

(statearr_40550[(10)] = inst_40388);

return statearr_40550;
})();
var statearr_40551_40632 = state_40524__$1;
(statearr_40551_40632[(2)] = null);

(statearr_40551_40632[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (22))){
var inst_40438 = (state_40524[(19)]);
var inst_40441 = (state_40524[(23)]);
var inst_40446 = (state_40524[(24)]);
var inst_40442 = (state_40524[(25)]);
var inst_40441__$1 = (state_40524[(2)]);
var inst_40442__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_40441__$1);
var inst_40443 = (function (){var all_files = inst_40438;
var res_SINGLEQUOTE_ = inst_40441__$1;
var res = inst_40442__$1;
return ((function (all_files,res_SINGLEQUOTE_,res,inst_40438,inst_40441,inst_40446,inst_40442,inst_40441__$1,inst_40442__$1,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__40121_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__40121_SHARP_));
});
;})(all_files,res_SINGLEQUOTE_,res,inst_40438,inst_40441,inst_40446,inst_40442,inst_40441__$1,inst_40442__$1,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_40444 = cljs.core.filter.call(null,inst_40443,inst_40441__$1);
var inst_40445 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_40446__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_40445);
var inst_40447 = cljs.core.not_empty.call(null,inst_40446__$1);
var state_40524__$1 = (function (){var statearr_40552 = state_40524;
(statearr_40552[(23)] = inst_40441__$1);

(statearr_40552[(24)] = inst_40446__$1);

(statearr_40552[(26)] = inst_40444);

(statearr_40552[(25)] = inst_40442__$1);

return statearr_40552;
})();
if(cljs.core.truth_(inst_40447)){
var statearr_40553_40633 = state_40524__$1;
(statearr_40553_40633[(1)] = (23));

} else {
var statearr_40554_40634 = state_40524__$1;
(statearr_40554_40634[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (36))){
var state_40524__$1 = state_40524;
var statearr_40555_40635 = state_40524__$1;
(statearr_40555_40635[(2)] = false);

(statearr_40555_40635[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (41))){
var inst_40499 = (state_40524[(20)]);
var inst_40503 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_40504 = cljs.core.map.call(null,inst_40503,inst_40499);
var inst_40505 = cljs.core.pr_str.call(null,inst_40504);
var inst_40506 = [cljs.core.str("figwheel-no-load meta-data: "),cljs.core.str(inst_40505)].join('');
var inst_40507 = figwheel.client.utils.log.call(null,inst_40506);
var state_40524__$1 = state_40524;
var statearr_40556_40636 = state_40524__$1;
(statearr_40556_40636[(2)] = inst_40507);

(statearr_40556_40636[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (43))){
var inst_40500 = (state_40524[(21)]);
var inst_40510 = (state_40524[(2)]);
var inst_40511 = cljs.core.not_empty.call(null,inst_40500);
var state_40524__$1 = (function (){var statearr_40557 = state_40524;
(statearr_40557[(27)] = inst_40510);

return statearr_40557;
})();
if(cljs.core.truth_(inst_40511)){
var statearr_40558_40637 = state_40524__$1;
(statearr_40558_40637[(1)] = (44));

} else {
var statearr_40559_40638 = state_40524__$1;
(statearr_40559_40638[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (29))){
var inst_40438 = (state_40524[(19)]);
var inst_40478 = (state_40524[(16)]);
var inst_40441 = (state_40524[(23)]);
var inst_40446 = (state_40524[(24)]);
var inst_40444 = (state_40524[(26)]);
var inst_40442 = (state_40524[(25)]);
var inst_40474 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_40477 = (function (){var all_files = inst_40438;
var res_SINGLEQUOTE_ = inst_40441;
var res = inst_40442;
var files_not_loaded = inst_40444;
var dependencies_that_loaded = inst_40446;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_40438,inst_40478,inst_40441,inst_40446,inst_40444,inst_40442,inst_40474,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__40476){
var map__40560 = p__40476;
var map__40560__$1 = ((((!((map__40560 == null)))?((((map__40560.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40560.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__40560):map__40560);
var namespace = cljs.core.get.call(null,map__40560__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
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
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_40438,inst_40478,inst_40441,inst_40446,inst_40444,inst_40442,inst_40474,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_40478__$1 = cljs.core.group_by.call(null,inst_40477,inst_40444);
var inst_40480 = (inst_40478__$1 == null);
var inst_40481 = cljs.core.not.call(null,inst_40480);
var state_40524__$1 = (function (){var statearr_40562 = state_40524;
(statearr_40562[(16)] = inst_40478__$1);

(statearr_40562[(28)] = inst_40474);

return statearr_40562;
})();
if(inst_40481){
var statearr_40563_40639 = state_40524__$1;
(statearr_40563_40639[(1)] = (32));

} else {
var statearr_40564_40640 = state_40524__$1;
(statearr_40564_40640[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (44))){
var inst_40500 = (state_40524[(21)]);
var inst_40513 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_40500);
var inst_40514 = cljs.core.pr_str.call(null,inst_40513);
var inst_40515 = [cljs.core.str("not required: "),cljs.core.str(inst_40514)].join('');
var inst_40516 = figwheel.client.utils.log.call(null,inst_40515);
var state_40524__$1 = state_40524;
var statearr_40565_40641 = state_40524__$1;
(statearr_40565_40641[(2)] = inst_40516);

(statearr_40565_40641[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (6))){
var inst_40419 = (state_40524[(2)]);
var state_40524__$1 = state_40524;
var statearr_40566_40642 = state_40524__$1;
(statearr_40566_40642[(2)] = inst_40419);

(statearr_40566_40642[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (28))){
var inst_40444 = (state_40524[(26)]);
var inst_40471 = (state_40524[(2)]);
var inst_40472 = cljs.core.not_empty.call(null,inst_40444);
var state_40524__$1 = (function (){var statearr_40567 = state_40524;
(statearr_40567[(29)] = inst_40471);

return statearr_40567;
})();
if(cljs.core.truth_(inst_40472)){
var statearr_40568_40643 = state_40524__$1;
(statearr_40568_40643[(1)] = (29));

} else {
var statearr_40569_40644 = state_40524__$1;
(statearr_40569_40644[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (25))){
var inst_40442 = (state_40524[(25)]);
var inst_40458 = (state_40524[(2)]);
var inst_40459 = cljs.core.not_empty.call(null,inst_40442);
var state_40524__$1 = (function (){var statearr_40570 = state_40524;
(statearr_40570[(30)] = inst_40458);

return statearr_40570;
})();
if(cljs.core.truth_(inst_40459)){
var statearr_40571_40645 = state_40524__$1;
(statearr_40571_40645[(1)] = (26));

} else {
var statearr_40572_40646 = state_40524__$1;
(statearr_40572_40646[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (34))){
var inst_40493 = (state_40524[(2)]);
var state_40524__$1 = state_40524;
if(cljs.core.truth_(inst_40493)){
var statearr_40573_40647 = state_40524__$1;
(statearr_40573_40647[(1)] = (38));

} else {
var statearr_40574_40648 = state_40524__$1;
(statearr_40574_40648[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (17))){
var state_40524__$1 = state_40524;
var statearr_40575_40649 = state_40524__$1;
(statearr_40575_40649[(2)] = recompile_dependents);

(statearr_40575_40649[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (3))){
var state_40524__$1 = state_40524;
var statearr_40576_40650 = state_40524__$1;
(statearr_40576_40650[(2)] = null);

(statearr_40576_40650[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (12))){
var inst_40415 = (state_40524[(2)]);
var state_40524__$1 = state_40524;
var statearr_40577_40651 = state_40524__$1;
(statearr_40577_40651[(2)] = inst_40415);

(statearr_40577_40651[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (2))){
var inst_40377 = (state_40524[(13)]);
var inst_40384 = cljs.core.seq.call(null,inst_40377);
var inst_40385 = inst_40384;
var inst_40386 = null;
var inst_40387 = (0);
var inst_40388 = (0);
var state_40524__$1 = (function (){var statearr_40578 = state_40524;
(statearr_40578[(7)] = inst_40387);

(statearr_40578[(8)] = inst_40385);

(statearr_40578[(9)] = inst_40386);

(statearr_40578[(10)] = inst_40388);

return statearr_40578;
})();
var statearr_40579_40652 = state_40524__$1;
(statearr_40579_40652[(2)] = null);

(statearr_40579_40652[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (23))){
var inst_40438 = (state_40524[(19)]);
var inst_40441 = (state_40524[(23)]);
var inst_40446 = (state_40524[(24)]);
var inst_40444 = (state_40524[(26)]);
var inst_40442 = (state_40524[(25)]);
var inst_40449 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_40451 = (function (){var all_files = inst_40438;
var res_SINGLEQUOTE_ = inst_40441;
var res = inst_40442;
var files_not_loaded = inst_40444;
var dependencies_that_loaded = inst_40446;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_40438,inst_40441,inst_40446,inst_40444,inst_40442,inst_40449,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__40450){
var map__40580 = p__40450;
var map__40580__$1 = ((((!((map__40580 == null)))?((((map__40580.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40580.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__40580):map__40580);
var request_url = cljs.core.get.call(null,map__40580__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_40438,inst_40441,inst_40446,inst_40444,inst_40442,inst_40449,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_40452 = cljs.core.reverse.call(null,inst_40446);
var inst_40453 = cljs.core.map.call(null,inst_40451,inst_40452);
var inst_40454 = cljs.core.pr_str.call(null,inst_40453);
var inst_40455 = figwheel.client.utils.log.call(null,inst_40454);
var state_40524__$1 = (function (){var statearr_40582 = state_40524;
(statearr_40582[(31)] = inst_40449);

return statearr_40582;
})();
var statearr_40583_40653 = state_40524__$1;
(statearr_40583_40653[(2)] = inst_40455);

(statearr_40583_40653[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (35))){
var state_40524__$1 = state_40524;
var statearr_40584_40654 = state_40524__$1;
(statearr_40584_40654[(2)] = true);

(statearr_40584_40654[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (19))){
var inst_40428 = (state_40524[(12)]);
var inst_40434 = figwheel.client.file_reloading.expand_files.call(null,inst_40428);
var state_40524__$1 = state_40524;
var statearr_40585_40655 = state_40524__$1;
(statearr_40585_40655[(2)] = inst_40434);

(statearr_40585_40655[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (11))){
var state_40524__$1 = state_40524;
var statearr_40586_40656 = state_40524__$1;
(statearr_40586_40656[(2)] = null);

(statearr_40586_40656[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (9))){
var inst_40417 = (state_40524[(2)]);
var state_40524__$1 = state_40524;
var statearr_40587_40657 = state_40524__$1;
(statearr_40587_40657[(2)] = inst_40417);

(statearr_40587_40657[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (5))){
var inst_40387 = (state_40524[(7)]);
var inst_40388 = (state_40524[(10)]);
var inst_40390 = (inst_40388 < inst_40387);
var inst_40391 = inst_40390;
var state_40524__$1 = state_40524;
if(cljs.core.truth_(inst_40391)){
var statearr_40588_40658 = state_40524__$1;
(statearr_40588_40658[(1)] = (7));

} else {
var statearr_40589_40659 = state_40524__$1;
(statearr_40589_40659[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (14))){
var inst_40398 = (state_40524[(22)]);
var inst_40407 = cljs.core.first.call(null,inst_40398);
var inst_40408 = figwheel.client.file_reloading.eval_body.call(null,inst_40407,opts);
var inst_40409 = cljs.core.next.call(null,inst_40398);
var inst_40385 = inst_40409;
var inst_40386 = null;
var inst_40387 = (0);
var inst_40388 = (0);
var state_40524__$1 = (function (){var statearr_40590 = state_40524;
(statearr_40590[(7)] = inst_40387);

(statearr_40590[(8)] = inst_40385);

(statearr_40590[(9)] = inst_40386);

(statearr_40590[(10)] = inst_40388);

(statearr_40590[(32)] = inst_40408);

return statearr_40590;
})();
var statearr_40591_40660 = state_40524__$1;
(statearr_40591_40660[(2)] = null);

(statearr_40591_40660[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (45))){
var state_40524__$1 = state_40524;
var statearr_40592_40661 = state_40524__$1;
(statearr_40592_40661[(2)] = null);

(statearr_40592_40661[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (26))){
var inst_40438 = (state_40524[(19)]);
var inst_40441 = (state_40524[(23)]);
var inst_40446 = (state_40524[(24)]);
var inst_40444 = (state_40524[(26)]);
var inst_40442 = (state_40524[(25)]);
var inst_40461 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_40463 = (function (){var all_files = inst_40438;
var res_SINGLEQUOTE_ = inst_40441;
var res = inst_40442;
var files_not_loaded = inst_40444;
var dependencies_that_loaded = inst_40446;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_40438,inst_40441,inst_40446,inst_40444,inst_40442,inst_40461,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__40462){
var map__40593 = p__40462;
var map__40593__$1 = ((((!((map__40593 == null)))?((((map__40593.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40593.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__40593):map__40593);
var namespace = cljs.core.get.call(null,map__40593__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__40593__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_40438,inst_40441,inst_40446,inst_40444,inst_40442,inst_40461,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_40464 = cljs.core.map.call(null,inst_40463,inst_40442);
var inst_40465 = cljs.core.pr_str.call(null,inst_40464);
var inst_40466 = figwheel.client.utils.log.call(null,inst_40465);
var inst_40467 = (function (){var all_files = inst_40438;
var res_SINGLEQUOTE_ = inst_40441;
var res = inst_40442;
var files_not_loaded = inst_40444;
var dependencies_that_loaded = inst_40446;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_40438,inst_40441,inst_40446,inst_40444,inst_40442,inst_40461,inst_40463,inst_40464,inst_40465,inst_40466,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_40438,inst_40441,inst_40446,inst_40444,inst_40442,inst_40461,inst_40463,inst_40464,inst_40465,inst_40466,state_val_40525,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_40468 = setTimeout(inst_40467,(10));
var state_40524__$1 = (function (){var statearr_40595 = state_40524;
(statearr_40595[(33)] = inst_40461);

(statearr_40595[(34)] = inst_40466);

return statearr_40595;
})();
var statearr_40596_40662 = state_40524__$1;
(statearr_40596_40662[(2)] = inst_40468);

(statearr_40596_40662[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (16))){
var state_40524__$1 = state_40524;
var statearr_40597_40663 = state_40524__$1;
(statearr_40597_40663[(2)] = reload_dependents);

(statearr_40597_40663[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (38))){
var inst_40478 = (state_40524[(16)]);
var inst_40495 = cljs.core.apply.call(null,cljs.core.hash_map,inst_40478);
var state_40524__$1 = state_40524;
var statearr_40598_40664 = state_40524__$1;
(statearr_40598_40664[(2)] = inst_40495);

(statearr_40598_40664[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (30))){
var state_40524__$1 = state_40524;
var statearr_40599_40665 = state_40524__$1;
(statearr_40599_40665[(2)] = null);

(statearr_40599_40665[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (10))){
var inst_40398 = (state_40524[(22)]);
var inst_40400 = cljs.core.chunked_seq_QMARK_.call(null,inst_40398);
var state_40524__$1 = state_40524;
if(inst_40400){
var statearr_40600_40666 = state_40524__$1;
(statearr_40600_40666[(1)] = (13));

} else {
var statearr_40601_40667 = state_40524__$1;
(statearr_40601_40667[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (18))){
var inst_40432 = (state_40524[(2)]);
var state_40524__$1 = state_40524;
if(cljs.core.truth_(inst_40432)){
var statearr_40602_40668 = state_40524__$1;
(statearr_40602_40668[(1)] = (19));

} else {
var statearr_40603_40669 = state_40524__$1;
(statearr_40603_40669[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (42))){
var state_40524__$1 = state_40524;
var statearr_40604_40670 = state_40524__$1;
(statearr_40604_40670[(2)] = null);

(statearr_40604_40670[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (37))){
var inst_40490 = (state_40524[(2)]);
var state_40524__$1 = state_40524;
var statearr_40605_40671 = state_40524__$1;
(statearr_40605_40671[(2)] = inst_40490);

(statearr_40605_40671[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40525 === (8))){
var inst_40385 = (state_40524[(8)]);
var inst_40398 = (state_40524[(22)]);
var inst_40398__$1 = cljs.core.seq.call(null,inst_40385);
var state_40524__$1 = (function (){var statearr_40606 = state_40524;
(statearr_40606[(22)] = inst_40398__$1);

return statearr_40606;
})();
if(inst_40398__$1){
var statearr_40607_40672 = state_40524__$1;
(statearr_40607_40672[(1)] = (10));

} else {
var statearr_40608_40673 = state_40524__$1;
(statearr_40608_40673[(1)] = (11));

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
});})(c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents))
;
return ((function (switch__20513__auto__,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__20514__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__20514__auto____0 = (function (){
var statearr_40612 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40612[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__20514__auto__);

(statearr_40612[(1)] = (1));

return statearr_40612;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__20514__auto____1 = (function (state_40524){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_40524);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e40613){if((e40613 instanceof Object)){
var ex__20517__auto__ = e40613;
var statearr_40614_40674 = state_40524;
(statearr_40614_40674[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40524);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40613;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40675 = state_40524;
state_40524 = G__40675;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__20514__auto__ = function(state_40524){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__20514__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__20514__auto____1.call(this,state_40524);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__20514__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__20514__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var state__20536__auto__ = (function (){var statearr_40615 = f__20535__auto__.call(null);
(statearr_40615[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto__);

return statearr_40615;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto__,map__40370,map__40370__$1,opts,before_jsload,on_jsload,reload_dependents,map__40371,map__40371__$1,msg,files,figwheel_meta,recompile_dependents))
);

return c__20534__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str(location.protocol),cljs.core.str("//")].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__40678,link){
var map__40681 = p__40678;
var map__40681__$1 = ((((!((map__40681 == null)))?((((map__40681.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40681.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__40681):map__40681);
var file = cljs.core.get.call(null,map__40681__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4425__auto__ = link.href;
if(cljs.core.truth_(temp__4425__auto__)){
var link_href = temp__4425__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__4425__auto__,map__40681,map__40681__$1,file){
return (function (p1__40676_SHARP_,p2__40677_SHARP_){
if(cljs.core._EQ_.call(null,p1__40676_SHARP_,p2__40677_SHARP_)){
return p1__40676_SHARP_;
} else {
return false;
}
});})(link_href,temp__4425__auto__,map__40681,map__40681__$1,file))
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
var temp__4425__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__40687){
var map__40688 = p__40687;
var map__40688__$1 = ((((!((map__40688 == null)))?((((map__40688.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40688.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__40688):map__40688);
var match_length = cljs.core.get.call(null,map__40688__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__40688__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__40683_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__40683_SHARP_);
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
var args40690 = [];
var len__17325__auto___40693 = arguments.length;
var i__17326__auto___40694 = (0);
while(true){
if((i__17326__auto___40694 < len__17325__auto___40693)){
args40690.push((arguments[i__17326__auto___40694]));

var G__40695 = (i__17326__auto___40694 + (1));
i__17326__auto___40694 = G__40695;
continue;
} else {
}
break;
}

var G__40692 = args40690.length;
switch (G__40692) {
case 1:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40690.length)].join('')));

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
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__40697_SHARP_,p2__40698_SHARP_){
return cljs.core.assoc.call(null,p1__40697_SHARP_,cljs.core.get.call(null,p2__40698_SHARP_,key),p2__40698_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,seqq));
});
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(p__40699){
var map__40702 = p__40699;
var map__40702__$1 = ((((!((map__40702 == null)))?((((map__40702.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40702.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__40702):map__40702);
var f_data = map__40702__$1;
var file = cljs.core.get.call(null,map__40702__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4425__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__4425__auto__)){
var link = temp__4425__auto__;
return figwheel.client.file_reloading.add_link_to_doc.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href));
} else {
return null;
}
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__40704,files_msg){
var map__40711 = p__40704;
var map__40711__$1 = ((((!((map__40711 == null)))?((((map__40711.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40711.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__40711):map__40711);
var opts = map__40711__$1;
var on_cssload = cljs.core.get.call(null,map__40711__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var seq__40713_40717 = cljs.core.seq.call(null,figwheel.client.file_reloading.distictify.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg)));
var chunk__40714_40718 = null;
var count__40715_40719 = (0);
var i__40716_40720 = (0);
while(true){
if((i__40716_40720 < count__40715_40719)){
var f_40721 = cljs.core._nth.call(null,chunk__40714_40718,i__40716_40720);
figwheel.client.file_reloading.reload_css_file.call(null,f_40721);

var G__40722 = seq__40713_40717;
var G__40723 = chunk__40714_40718;
var G__40724 = count__40715_40719;
var G__40725 = (i__40716_40720 + (1));
seq__40713_40717 = G__40722;
chunk__40714_40718 = G__40723;
count__40715_40719 = G__40724;
i__40716_40720 = G__40725;
continue;
} else {
var temp__4425__auto___40726 = cljs.core.seq.call(null,seq__40713_40717);
if(temp__4425__auto___40726){
var seq__40713_40727__$1 = temp__4425__auto___40726;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__40713_40727__$1)){
var c__17070__auto___40728 = cljs.core.chunk_first.call(null,seq__40713_40727__$1);
var G__40729 = cljs.core.chunk_rest.call(null,seq__40713_40727__$1);
var G__40730 = c__17070__auto___40728;
var G__40731 = cljs.core.count.call(null,c__17070__auto___40728);
var G__40732 = (0);
seq__40713_40717 = G__40729;
chunk__40714_40718 = G__40730;
count__40715_40719 = G__40731;
i__40716_40720 = G__40732;
continue;
} else {
var f_40733 = cljs.core.first.call(null,seq__40713_40727__$1);
figwheel.client.file_reloading.reload_css_file.call(null,f_40733);

var G__40734 = cljs.core.next.call(null,seq__40713_40727__$1);
var G__40735 = null;
var G__40736 = (0);
var G__40737 = (0);
seq__40713_40717 = G__40734;
chunk__40714_40718 = G__40735;
count__40715_40719 = G__40736;
i__40716_40720 = G__40737;
continue;
}
} else {
}
}
break;
}

return setTimeout(((function (map__40711,map__40711__$1,opts,on_cssload){
return (function (){
return on_cssload.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg));
});})(map__40711,map__40711__$1,opts,on_cssload))
,(100));
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map?rel=1449460879408