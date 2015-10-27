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
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__54769_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__54769_SHARP_));
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
var seq__54774 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__54775 = null;
var count__54776 = (0);
var i__54777 = (0);
while(true){
if((i__54777 < count__54776)){
var n = cljs.core._nth.call(null,chunk__54775,i__54777);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__54778 = seq__54774;
var G__54779 = chunk__54775;
var G__54780 = count__54776;
var G__54781 = (i__54777 + (1));
seq__54774 = G__54778;
chunk__54775 = G__54779;
count__54776 = G__54780;
i__54777 = G__54781;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__54774);
if(temp__4425__auto__){
var seq__54774__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__54774__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__54774__$1);
var G__54782 = cljs.core.chunk_rest.call(null,seq__54774__$1);
var G__54783 = c__17070__auto__;
var G__54784 = cljs.core.count.call(null,c__17070__auto__);
var G__54785 = (0);
seq__54774 = G__54782;
chunk__54775 = G__54783;
count__54776 = G__54784;
i__54777 = G__54785;
continue;
} else {
var n = cljs.core.first.call(null,seq__54774__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__54786 = cljs.core.next.call(null,seq__54774__$1);
var G__54787 = null;
var G__54788 = (0);
var G__54789 = (0);
seq__54774 = G__54786;
chunk__54775 = G__54787;
count__54776 = G__54788;
i__54777 = G__54789;
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

var seq__54828_54835 = cljs.core.seq.call(null,deps);
var chunk__54829_54836 = null;
var count__54830_54837 = (0);
var i__54831_54838 = (0);
while(true){
if((i__54831_54838 < count__54830_54837)){
var dep_54839 = cljs.core._nth.call(null,chunk__54829_54836,i__54831_54838);
topo_sort_helper_STAR_.call(null,dep_54839,(depth + (1)),state);

var G__54840 = seq__54828_54835;
var G__54841 = chunk__54829_54836;
var G__54842 = count__54830_54837;
var G__54843 = (i__54831_54838 + (1));
seq__54828_54835 = G__54840;
chunk__54829_54836 = G__54841;
count__54830_54837 = G__54842;
i__54831_54838 = G__54843;
continue;
} else {
var temp__4425__auto___54844 = cljs.core.seq.call(null,seq__54828_54835);
if(temp__4425__auto___54844){
var seq__54828_54845__$1 = temp__4425__auto___54844;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__54828_54845__$1)){
var c__17070__auto___54846 = cljs.core.chunk_first.call(null,seq__54828_54845__$1);
var G__54847 = cljs.core.chunk_rest.call(null,seq__54828_54845__$1);
var G__54848 = c__17070__auto___54846;
var G__54849 = cljs.core.count.call(null,c__17070__auto___54846);
var G__54850 = (0);
seq__54828_54835 = G__54847;
chunk__54829_54836 = G__54848;
count__54830_54837 = G__54849;
i__54831_54838 = G__54850;
continue;
} else {
var dep_54851 = cljs.core.first.call(null,seq__54828_54845__$1);
topo_sort_helper_STAR_.call(null,dep_54851,(depth + (1)),state);

var G__54852 = cljs.core.next.call(null,seq__54828_54845__$1);
var G__54853 = null;
var G__54854 = (0);
var G__54855 = (0);
seq__54828_54835 = G__54852;
chunk__54829_54836 = G__54853;
count__54830_54837 = G__54854;
i__54831_54838 = G__54855;
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
return (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__54832){
var vec__54834 = p__54832;
var x = cljs.core.nth.call(null,vec__54834,(0),null);
var xs = cljs.core.nthnext.call(null,vec__54834,(1));
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,((function (vec__54834,x,xs,get_deps__$1){
return (function (p1__54790_SHARP_){
return clojure.set.difference.call(null,p1__54790_SHARP_,x);
});})(vec__54834,x,xs,get_deps__$1))
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
var seq__54868 = cljs.core.seq.call(null,provides);
var chunk__54869 = null;
var count__54870 = (0);
var i__54871 = (0);
while(true){
if((i__54871 < count__54870)){
var prov = cljs.core._nth.call(null,chunk__54869,i__54871);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__54872_54880 = cljs.core.seq.call(null,requires);
var chunk__54873_54881 = null;
var count__54874_54882 = (0);
var i__54875_54883 = (0);
while(true){
if((i__54875_54883 < count__54874_54882)){
var req_54884 = cljs.core._nth.call(null,chunk__54873_54881,i__54875_54883);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_54884,prov);

var G__54885 = seq__54872_54880;
var G__54886 = chunk__54873_54881;
var G__54887 = count__54874_54882;
var G__54888 = (i__54875_54883 + (1));
seq__54872_54880 = G__54885;
chunk__54873_54881 = G__54886;
count__54874_54882 = G__54887;
i__54875_54883 = G__54888;
continue;
} else {
var temp__4425__auto___54889 = cljs.core.seq.call(null,seq__54872_54880);
if(temp__4425__auto___54889){
var seq__54872_54890__$1 = temp__4425__auto___54889;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__54872_54890__$1)){
var c__17070__auto___54891 = cljs.core.chunk_first.call(null,seq__54872_54890__$1);
var G__54892 = cljs.core.chunk_rest.call(null,seq__54872_54890__$1);
var G__54893 = c__17070__auto___54891;
var G__54894 = cljs.core.count.call(null,c__17070__auto___54891);
var G__54895 = (0);
seq__54872_54880 = G__54892;
chunk__54873_54881 = G__54893;
count__54874_54882 = G__54894;
i__54875_54883 = G__54895;
continue;
} else {
var req_54896 = cljs.core.first.call(null,seq__54872_54890__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_54896,prov);

var G__54897 = cljs.core.next.call(null,seq__54872_54890__$1);
var G__54898 = null;
var G__54899 = (0);
var G__54900 = (0);
seq__54872_54880 = G__54897;
chunk__54873_54881 = G__54898;
count__54874_54882 = G__54899;
i__54875_54883 = G__54900;
continue;
}
} else {
}
}
break;
}

var G__54901 = seq__54868;
var G__54902 = chunk__54869;
var G__54903 = count__54870;
var G__54904 = (i__54871 + (1));
seq__54868 = G__54901;
chunk__54869 = G__54902;
count__54870 = G__54903;
i__54871 = G__54904;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__54868);
if(temp__4425__auto__){
var seq__54868__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__54868__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__54868__$1);
var G__54905 = cljs.core.chunk_rest.call(null,seq__54868__$1);
var G__54906 = c__17070__auto__;
var G__54907 = cljs.core.count.call(null,c__17070__auto__);
var G__54908 = (0);
seq__54868 = G__54905;
chunk__54869 = G__54906;
count__54870 = G__54907;
i__54871 = G__54908;
continue;
} else {
var prov = cljs.core.first.call(null,seq__54868__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__54876_54909 = cljs.core.seq.call(null,requires);
var chunk__54877_54910 = null;
var count__54878_54911 = (0);
var i__54879_54912 = (0);
while(true){
if((i__54879_54912 < count__54878_54911)){
var req_54913 = cljs.core._nth.call(null,chunk__54877_54910,i__54879_54912);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_54913,prov);

var G__54914 = seq__54876_54909;
var G__54915 = chunk__54877_54910;
var G__54916 = count__54878_54911;
var G__54917 = (i__54879_54912 + (1));
seq__54876_54909 = G__54914;
chunk__54877_54910 = G__54915;
count__54878_54911 = G__54916;
i__54879_54912 = G__54917;
continue;
} else {
var temp__4425__auto___54918__$1 = cljs.core.seq.call(null,seq__54876_54909);
if(temp__4425__auto___54918__$1){
var seq__54876_54919__$1 = temp__4425__auto___54918__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__54876_54919__$1)){
var c__17070__auto___54920 = cljs.core.chunk_first.call(null,seq__54876_54919__$1);
var G__54921 = cljs.core.chunk_rest.call(null,seq__54876_54919__$1);
var G__54922 = c__17070__auto___54920;
var G__54923 = cljs.core.count.call(null,c__17070__auto___54920);
var G__54924 = (0);
seq__54876_54909 = G__54921;
chunk__54877_54910 = G__54922;
count__54878_54911 = G__54923;
i__54879_54912 = G__54924;
continue;
} else {
var req_54925 = cljs.core.first.call(null,seq__54876_54919__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_54925,prov);

var G__54926 = cljs.core.next.call(null,seq__54876_54919__$1);
var G__54927 = null;
var G__54928 = (0);
var G__54929 = (0);
seq__54876_54909 = G__54926;
chunk__54877_54910 = G__54927;
count__54878_54911 = G__54928;
i__54879_54912 = G__54929;
continue;
}
} else {
}
}
break;
}

var G__54930 = cljs.core.next.call(null,seq__54868__$1);
var G__54931 = null;
var G__54932 = (0);
var G__54933 = (0);
seq__54868 = G__54930;
chunk__54869 = G__54931;
count__54870 = G__54932;
i__54871 = G__54933;
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
var seq__54938_54942 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__54939_54943 = null;
var count__54940_54944 = (0);
var i__54941_54945 = (0);
while(true){
if((i__54941_54945 < count__54940_54944)){
var ns_54946 = cljs.core._nth.call(null,chunk__54939_54943,i__54941_54945);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_54946);

var G__54947 = seq__54938_54942;
var G__54948 = chunk__54939_54943;
var G__54949 = count__54940_54944;
var G__54950 = (i__54941_54945 + (1));
seq__54938_54942 = G__54947;
chunk__54939_54943 = G__54948;
count__54940_54944 = G__54949;
i__54941_54945 = G__54950;
continue;
} else {
var temp__4425__auto___54951 = cljs.core.seq.call(null,seq__54938_54942);
if(temp__4425__auto___54951){
var seq__54938_54952__$1 = temp__4425__auto___54951;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__54938_54952__$1)){
var c__17070__auto___54953 = cljs.core.chunk_first.call(null,seq__54938_54952__$1);
var G__54954 = cljs.core.chunk_rest.call(null,seq__54938_54952__$1);
var G__54955 = c__17070__auto___54953;
var G__54956 = cljs.core.count.call(null,c__17070__auto___54953);
var G__54957 = (0);
seq__54938_54942 = G__54954;
chunk__54939_54943 = G__54955;
count__54940_54944 = G__54956;
i__54941_54945 = G__54957;
continue;
} else {
var ns_54958 = cljs.core.first.call(null,seq__54938_54952__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_54958);

var G__54959 = cljs.core.next.call(null,seq__54938_54952__$1);
var G__54960 = null;
var G__54961 = (0);
var G__54962 = (0);
seq__54938_54942 = G__54959;
chunk__54939_54943 = G__54960;
count__54940_54944 = G__54961;
i__54941_54945 = G__54962;
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
var G__54963__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__54963 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__54964__i = 0, G__54964__a = new Array(arguments.length -  0);
while (G__54964__i < G__54964__a.length) {G__54964__a[G__54964__i] = arguments[G__54964__i + 0]; ++G__54964__i;}
  args = new cljs.core.IndexedSeq(G__54964__a,0);
} 
return G__54963__delegate.call(this,args);};
G__54963.cljs$lang$maxFixedArity = 0;
G__54963.cljs$lang$applyTo = (function (arglist__54965){
var args = cljs.core.seq(arglist__54965);
return G__54963__delegate(args);
});
G__54963.cljs$core$IFn$_invoke$arity$variadic = G__54963__delegate;
return G__54963;
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
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__54966 = cljs.core._EQ_;
var expr__54967 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__54966.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__54967))){
return ((function (pred__54966,expr__54967){
return (function (request_url,callback){

var root = clojure.string.join.call(null,"/",cljs.core.reverse.call(null,cljs.core.drop.call(null,(2),cljs.core.reverse.call(null,clojure.string.split.call(null,__dirname,"/")))));
var path = [cljs.core.str(root),cljs.core.str("/"),cljs.core.str(figwheel.client.file_reloading.fix_node_request_url.call(null,request_url))].join('');
(require.cache[path] = null);

return callback.call(null,(function (){try{return require(path);
}catch (e54969){if((e54969 instanceof Error)){
var e = e54969;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e54969;

}
}})());
});
;})(pred__54966,expr__54967))
} else {
if(cljs.core.truth_(pred__54966.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__54967))){
return ((function (pred__54966,expr__54967){
return (function (request_url,callback){

var deferred = goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),{"cleanupWhenDone": true});
deferred.addCallback(((function (deferred,pred__54966,expr__54967){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(deferred,pred__54966,expr__54967))
);

return deferred.addErrback(((function (deferred,pred__54966,expr__54967){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(deferred,pred__54966,expr__54967))
);
});
;})(pred__54966,expr__54967))
} else {
return ((function (pred__54966,expr__54967){
return (function (a,b){
throw "Reload not defined for this platform";
});
;})(pred__54966,expr__54967))
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__54970,callback){
var map__54973 = p__54970;
var map__54973__$1 = ((((!((map__54973 == null)))?((((map__54973.cljs$lang$protocol_mask$partition0$ & (64))) || (map__54973.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__54973):map__54973);
var file_msg = map__54973__$1;
var request_url = cljs.core.get.call(null,map__54973__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Attempting to load "),cljs.core.str(request_url)].join(''));

return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,((function (map__54973,map__54973__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Successfully loaded "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__54973,map__54973__$1,file_msg,request_url))
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
figwheel.client.file_reloading.reloader_loop = (function (){var c__19920__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto__){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto__){
return (function (state_54997){
var state_val_54998 = (state_54997[(1)]);
if((state_val_54998 === (7))){
var inst_54993 = (state_54997[(2)]);
var state_54997__$1 = state_54997;
var statearr_54999_55019 = state_54997__$1;
(statearr_54999_55019[(2)] = inst_54993);

(statearr_54999_55019[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54998 === (1))){
var state_54997__$1 = state_54997;
var statearr_55000_55020 = state_54997__$1;
(statearr_55000_55020[(2)] = null);

(statearr_55000_55020[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54998 === (4))){
var inst_54977 = (state_54997[(7)]);
var inst_54977__$1 = (state_54997[(2)]);
var state_54997__$1 = (function (){var statearr_55001 = state_54997;
(statearr_55001[(7)] = inst_54977__$1);

return statearr_55001;
})();
if(cljs.core.truth_(inst_54977__$1)){
var statearr_55002_55021 = state_54997__$1;
(statearr_55002_55021[(1)] = (5));

} else {
var statearr_55003_55022 = state_54997__$1;
(statearr_55003_55022[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54998 === (6))){
var state_54997__$1 = state_54997;
var statearr_55004_55023 = state_54997__$1;
(statearr_55004_55023[(2)] = null);

(statearr_55004_55023[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54998 === (3))){
var inst_54995 = (state_54997[(2)]);
var state_54997__$1 = state_54997;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_54997__$1,inst_54995);
} else {
if((state_val_54998 === (2))){
var state_54997__$1 = state_54997;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54997__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_54998 === (11))){
var inst_54989 = (state_54997[(2)]);
var state_54997__$1 = (function (){var statearr_55005 = state_54997;
(statearr_55005[(8)] = inst_54989);

return statearr_55005;
})();
var statearr_55006_55024 = state_54997__$1;
(statearr_55006_55024[(2)] = null);

(statearr_55006_55024[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54998 === (9))){
var inst_54983 = (state_54997[(9)]);
var inst_54981 = (state_54997[(10)]);
var inst_54985 = inst_54983.call(null,inst_54981);
var state_54997__$1 = state_54997;
var statearr_55007_55025 = state_54997__$1;
(statearr_55007_55025[(2)] = inst_54985);

(statearr_55007_55025[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54998 === (5))){
var inst_54977 = (state_54997[(7)]);
var inst_54979 = figwheel.client.file_reloading.blocking_load.call(null,inst_54977);
var state_54997__$1 = state_54997;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54997__$1,(8),inst_54979);
} else {
if((state_val_54998 === (10))){
var inst_54981 = (state_54997[(10)]);
var inst_54987 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_54981);
var state_54997__$1 = state_54997;
var statearr_55008_55026 = state_54997__$1;
(statearr_55008_55026[(2)] = inst_54987);

(statearr_55008_55026[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54998 === (8))){
var inst_54977 = (state_54997[(7)]);
var inst_54983 = (state_54997[(9)]);
var inst_54981 = (state_54997[(2)]);
var inst_54982 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_54983__$1 = cljs.core.get.call(null,inst_54982,inst_54977);
var state_54997__$1 = (function (){var statearr_55009 = state_54997;
(statearr_55009[(9)] = inst_54983__$1);

(statearr_55009[(10)] = inst_54981);

return statearr_55009;
})();
if(cljs.core.truth_(inst_54983__$1)){
var statearr_55010_55027 = state_54997__$1;
(statearr_55010_55027[(1)] = (9));

} else {
var statearr_55011_55028 = state_54997__$1;
(statearr_55011_55028[(1)] = (10));

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
});})(c__19920__auto__))
;
return ((function (switch__19855__auto__,c__19920__auto__){
return (function() {
var figwheel$client$file_reloading$state_machine__19856__auto__ = null;
var figwheel$client$file_reloading$state_machine__19856__auto____0 = (function (){
var statearr_55015 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_55015[(0)] = figwheel$client$file_reloading$state_machine__19856__auto__);

(statearr_55015[(1)] = (1));

return statearr_55015;
});
var figwheel$client$file_reloading$state_machine__19856__auto____1 = (function (state_54997){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_54997);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e55016){if((e55016 instanceof Object)){
var ex__19859__auto__ = e55016;
var statearr_55017_55029 = state_54997;
(statearr_55017_55029[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_54997);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e55016;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55030 = state_54997;
state_54997 = G__55030;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__19856__auto__ = function(state_54997){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__19856__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__19856__auto____1.call(this,state_54997);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__19856__auto____0;
figwheel$client$file_reloading$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__19856__auto____1;
return figwheel$client$file_reloading$state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto__))
})();
var state__19922__auto__ = (function (){var statearr_55018 = f__19921__auto__.call(null);
(statearr_55018[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto__);

return statearr_55018;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto__))
);

return c__19920__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(url){
return cljs.core.async.put_BANG_.call(null,figwheel.client.file_reloading.reload_chan,url);
});
figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__55031,callback){
var map__55034 = p__55031;
var map__55034__$1 = ((((!((map__55034 == null)))?((((map__55034.cljs$lang$protocol_mask$partition0$ & (64))) || (map__55034.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__55034):map__55034);
var file_msg = map__55034__$1;
var namespace = cljs.core.get.call(null,map__55034__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,((function (request_url,map__55034,map__55034__$1,file_msg,namespace){
return (function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
});})(request_url,map__55034,map__55034__$1,file_msg,namespace))
);

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__55036){
var map__55039 = p__55036;
var map__55039__$1 = ((((!((map__55039 == null)))?((((map__55039.cljs$lang$protocol_mask$partition0$ & (64))) || (map__55039.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__55039):map__55039);
var file_msg = map__55039__$1;
var namespace = cljs.core.get.call(null,map__55039__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

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
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__55041,callback){
var map__55044 = p__55041;
var map__55044__$1 = ((((!((map__55044 == null)))?((((map__55044.cljs$lang$protocol_mask$partition0$ & (64))) || (map__55044.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__55044):map__55044);
var file_msg = map__55044__$1;
var request_url = cljs.core.get.call(null,map__55044__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__55044__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

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
var c__19920__auto___55132 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___55132,out){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___55132,out){
return (function (state_55114){
var state_val_55115 = (state_55114[(1)]);
if((state_val_55115 === (1))){
var inst_55092 = cljs.core.nth.call(null,files,(0),null);
var inst_55093 = cljs.core.nthnext.call(null,files,(1));
var inst_55094 = files;
var state_55114__$1 = (function (){var statearr_55116 = state_55114;
(statearr_55116[(7)] = inst_55094);

(statearr_55116[(8)] = inst_55092);

(statearr_55116[(9)] = inst_55093);

return statearr_55116;
})();
var statearr_55117_55133 = state_55114__$1;
(statearr_55117_55133[(2)] = null);

(statearr_55117_55133[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55115 === (2))){
var inst_55094 = (state_55114[(7)]);
var inst_55097 = (state_55114[(10)]);
var inst_55097__$1 = cljs.core.nth.call(null,inst_55094,(0),null);
var inst_55098 = cljs.core.nthnext.call(null,inst_55094,(1));
var inst_55099 = (inst_55097__$1 == null);
var inst_55100 = cljs.core.not.call(null,inst_55099);
var state_55114__$1 = (function (){var statearr_55118 = state_55114;
(statearr_55118[(11)] = inst_55098);

(statearr_55118[(10)] = inst_55097__$1);

return statearr_55118;
})();
if(inst_55100){
var statearr_55119_55134 = state_55114__$1;
(statearr_55119_55134[(1)] = (4));

} else {
var statearr_55120_55135 = state_55114__$1;
(statearr_55120_55135[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55115 === (3))){
var inst_55112 = (state_55114[(2)]);
var state_55114__$1 = state_55114;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_55114__$1,inst_55112);
} else {
if((state_val_55115 === (4))){
var inst_55097 = (state_55114[(10)]);
var inst_55102 = figwheel.client.file_reloading.reload_js_file.call(null,inst_55097);
var state_55114__$1 = state_55114;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_55114__$1,(7),inst_55102);
} else {
if((state_val_55115 === (5))){
var inst_55108 = cljs.core.async.close_BANG_.call(null,out);
var state_55114__$1 = state_55114;
var statearr_55121_55136 = state_55114__$1;
(statearr_55121_55136[(2)] = inst_55108);

(statearr_55121_55136[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55115 === (6))){
var inst_55110 = (state_55114[(2)]);
var state_55114__$1 = state_55114;
var statearr_55122_55137 = state_55114__$1;
(statearr_55122_55137[(2)] = inst_55110);

(statearr_55122_55137[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55115 === (7))){
var inst_55098 = (state_55114[(11)]);
var inst_55104 = (state_55114[(2)]);
var inst_55105 = cljs.core.async.put_BANG_.call(null,out,inst_55104);
var inst_55094 = inst_55098;
var state_55114__$1 = (function (){var statearr_55123 = state_55114;
(statearr_55123[(7)] = inst_55094);

(statearr_55123[(12)] = inst_55105);

return statearr_55123;
})();
var statearr_55124_55138 = state_55114__$1;
(statearr_55124_55138[(2)] = null);

(statearr_55124_55138[(1)] = (2));


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
});})(c__19920__auto___55132,out))
;
return ((function (switch__19855__auto__,c__19920__auto___55132,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__19856__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__19856__auto____0 = (function (){
var statearr_55128 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_55128[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__19856__auto__);

(statearr_55128[(1)] = (1));

return statearr_55128;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__19856__auto____1 = (function (state_55114){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_55114);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e55129){if((e55129 instanceof Object)){
var ex__19859__auto__ = e55129;
var statearr_55130_55139 = state_55114;
(statearr_55130_55139[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_55114);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e55129;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55140 = state_55114;
state_55114 = G__55140;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__19856__auto__ = function(state_55114){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__19856__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__19856__auto____1.call(this,state_55114);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__19856__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__19856__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___55132,out))
})();
var state__19922__auto__ = (function (){var statearr_55131 = f__19921__auto__.call(null);
(statearr_55131[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___55132);

return statearr_55131;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___55132,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__55141,opts){
var map__55145 = p__55141;
var map__55145__$1 = ((((!((map__55145 == null)))?((((map__55145.cljs$lang$protocol_mask$partition0$ & (64))) || (map__55145.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__55145):map__55145);
var eval_body__$1 = cljs.core.get.call(null,map__55145__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__55145__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
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
}catch (e55147){var e = e55147;
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
return (function (p1__55148_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__55148_SHARP_),n);
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
return cljs.core.map.call(null,(function (p__55153){
var vec__55154 = p__55153;
var k = cljs.core.nth.call(null,vec__55154,(0),null);
var v = cljs.core.nth.call(null,vec__55154,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__55155){
var vec__55156 = p__55155;
var k = cljs.core.nth.call(null,vec__55156,(0),null);
var v = cljs.core.nth.call(null,vec__55156,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__55160,p__55161){
var map__55408 = p__55160;
var map__55408__$1 = ((((!((map__55408 == null)))?((((map__55408.cljs$lang$protocol_mask$partition0$ & (64))) || (map__55408.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__55408):map__55408);
var opts = map__55408__$1;
var before_jsload = cljs.core.get.call(null,map__55408__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__55408__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__55408__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__55409 = p__55161;
var map__55409__$1 = ((((!((map__55409 == null)))?((((map__55409.cljs$lang$protocol_mask$partition0$ & (64))) || (map__55409.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__55409):map__55409);
var msg = map__55409__$1;
var files = cljs.core.get.call(null,map__55409__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__55409__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__55409__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__19920__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (state_55562){
var state_val_55563 = (state_55562[(1)]);
if((state_val_55563 === (7))){
var inst_55426 = (state_55562[(7)]);
var inst_55424 = (state_55562[(8)]);
var inst_55423 = (state_55562[(9)]);
var inst_55425 = (state_55562[(10)]);
var inst_55431 = cljs.core._nth.call(null,inst_55424,inst_55426);
var inst_55432 = figwheel.client.file_reloading.eval_body.call(null,inst_55431,opts);
var inst_55433 = (inst_55426 + (1));
var tmp55564 = inst_55424;
var tmp55565 = inst_55423;
var tmp55566 = inst_55425;
var inst_55423__$1 = tmp55565;
var inst_55424__$1 = tmp55564;
var inst_55425__$1 = tmp55566;
var inst_55426__$1 = inst_55433;
var state_55562__$1 = (function (){var statearr_55567 = state_55562;
(statearr_55567[(11)] = inst_55432);

(statearr_55567[(7)] = inst_55426__$1);

(statearr_55567[(8)] = inst_55424__$1);

(statearr_55567[(9)] = inst_55423__$1);

(statearr_55567[(10)] = inst_55425__$1);

return statearr_55567;
})();
var statearr_55568_55654 = state_55562__$1;
(statearr_55568_55654[(2)] = null);

(statearr_55568_55654[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (20))){
var inst_55466 = (state_55562[(12)]);
var inst_55474 = figwheel.client.file_reloading.sort_files.call(null,inst_55466);
var state_55562__$1 = state_55562;
var statearr_55569_55655 = state_55562__$1;
(statearr_55569_55655[(2)] = inst_55474);

(statearr_55569_55655[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (27))){
var state_55562__$1 = state_55562;
var statearr_55570_55656 = state_55562__$1;
(statearr_55570_55656[(2)] = null);

(statearr_55570_55656[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (1))){
var inst_55415 = (state_55562[(13)]);
var inst_55412 = before_jsload.call(null,files);
var inst_55413 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_55414 = (function (){return ((function (inst_55415,inst_55412,inst_55413,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__55157_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__55157_SHARP_);
});
;})(inst_55415,inst_55412,inst_55413,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_55415__$1 = cljs.core.filter.call(null,inst_55414,files);
var inst_55416 = cljs.core.not_empty.call(null,inst_55415__$1);
var state_55562__$1 = (function (){var statearr_55571 = state_55562;
(statearr_55571[(14)] = inst_55412);

(statearr_55571[(15)] = inst_55413);

(statearr_55571[(13)] = inst_55415__$1);

return statearr_55571;
})();
if(cljs.core.truth_(inst_55416)){
var statearr_55572_55657 = state_55562__$1;
(statearr_55572_55657[(1)] = (2));

} else {
var statearr_55573_55658 = state_55562__$1;
(statearr_55573_55658[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (24))){
var state_55562__$1 = state_55562;
var statearr_55574_55659 = state_55562__$1;
(statearr_55574_55659[(2)] = null);

(statearr_55574_55659[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (39))){
var inst_55516 = (state_55562[(16)]);
var state_55562__$1 = state_55562;
var statearr_55575_55660 = state_55562__$1;
(statearr_55575_55660[(2)] = inst_55516);

(statearr_55575_55660[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (46))){
var inst_55557 = (state_55562[(2)]);
var state_55562__$1 = state_55562;
var statearr_55576_55661 = state_55562__$1;
(statearr_55576_55661[(2)] = inst_55557);

(statearr_55576_55661[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (4))){
var inst_55460 = (state_55562[(2)]);
var inst_55461 = cljs.core.List.EMPTY;
var inst_55462 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_55461);
var inst_55463 = (function (){return ((function (inst_55460,inst_55461,inst_55462,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__55158_SHARP_){
var and__16255__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__55158_SHARP_);
if(cljs.core.truth_(and__16255__auto__)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__55158_SHARP_));
} else {
return and__16255__auto__;
}
});
;})(inst_55460,inst_55461,inst_55462,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_55464 = cljs.core.filter.call(null,inst_55463,files);
var inst_55465 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_55466 = cljs.core.concat.call(null,inst_55464,inst_55465);
var state_55562__$1 = (function (){var statearr_55577 = state_55562;
(statearr_55577[(17)] = inst_55462);

(statearr_55577[(18)] = inst_55460);

(statearr_55577[(12)] = inst_55466);

return statearr_55577;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_55578_55662 = state_55562__$1;
(statearr_55578_55662[(1)] = (16));

} else {
var statearr_55579_55663 = state_55562__$1;
(statearr_55579_55663[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (15))){
var inst_55450 = (state_55562[(2)]);
var state_55562__$1 = state_55562;
var statearr_55580_55664 = state_55562__$1;
(statearr_55580_55664[(2)] = inst_55450);

(statearr_55580_55664[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (21))){
var inst_55476 = (state_55562[(19)]);
var inst_55476__$1 = (state_55562[(2)]);
var inst_55477 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_55476__$1);
var state_55562__$1 = (function (){var statearr_55581 = state_55562;
(statearr_55581[(19)] = inst_55476__$1);

return statearr_55581;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_55562__$1,(22),inst_55477);
} else {
if((state_val_55563 === (31))){
var inst_55560 = (state_55562[(2)]);
var state_55562__$1 = state_55562;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_55562__$1,inst_55560);
} else {
if((state_val_55563 === (32))){
var inst_55516 = (state_55562[(16)]);
var inst_55521 = inst_55516.cljs$lang$protocol_mask$partition0$;
var inst_55522 = (inst_55521 & (64));
var inst_55523 = inst_55516.cljs$core$ISeq$;
var inst_55524 = (inst_55522) || (inst_55523);
var state_55562__$1 = state_55562;
if(cljs.core.truth_(inst_55524)){
var statearr_55582_55665 = state_55562__$1;
(statearr_55582_55665[(1)] = (35));

} else {
var statearr_55583_55666 = state_55562__$1;
(statearr_55583_55666[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (40))){
var inst_55537 = (state_55562[(20)]);
var inst_55536 = (state_55562[(2)]);
var inst_55537__$1 = cljs.core.get.call(null,inst_55536,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_55538 = cljs.core.get.call(null,inst_55536,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_55539 = cljs.core.not_empty.call(null,inst_55537__$1);
var state_55562__$1 = (function (){var statearr_55584 = state_55562;
(statearr_55584[(21)] = inst_55538);

(statearr_55584[(20)] = inst_55537__$1);

return statearr_55584;
})();
if(cljs.core.truth_(inst_55539)){
var statearr_55585_55667 = state_55562__$1;
(statearr_55585_55667[(1)] = (41));

} else {
var statearr_55586_55668 = state_55562__$1;
(statearr_55586_55668[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (33))){
var state_55562__$1 = state_55562;
var statearr_55587_55669 = state_55562__$1;
(statearr_55587_55669[(2)] = false);

(statearr_55587_55669[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (13))){
var inst_55436 = (state_55562[(22)]);
var inst_55440 = cljs.core.chunk_first.call(null,inst_55436);
var inst_55441 = cljs.core.chunk_rest.call(null,inst_55436);
var inst_55442 = cljs.core.count.call(null,inst_55440);
var inst_55423 = inst_55441;
var inst_55424 = inst_55440;
var inst_55425 = inst_55442;
var inst_55426 = (0);
var state_55562__$1 = (function (){var statearr_55588 = state_55562;
(statearr_55588[(7)] = inst_55426);

(statearr_55588[(8)] = inst_55424);

(statearr_55588[(9)] = inst_55423);

(statearr_55588[(10)] = inst_55425);

return statearr_55588;
})();
var statearr_55589_55670 = state_55562__$1;
(statearr_55589_55670[(2)] = null);

(statearr_55589_55670[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (22))){
var inst_55476 = (state_55562[(19)]);
var inst_55479 = (state_55562[(23)]);
var inst_55484 = (state_55562[(24)]);
var inst_55480 = (state_55562[(25)]);
var inst_55479__$1 = (state_55562[(2)]);
var inst_55480__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_55479__$1);
var inst_55481 = (function (){var all_files = inst_55476;
var res_SINGLEQUOTE_ = inst_55479__$1;
var res = inst_55480__$1;
return ((function (all_files,res_SINGLEQUOTE_,res,inst_55476,inst_55479,inst_55484,inst_55480,inst_55479__$1,inst_55480__$1,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__55159_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__55159_SHARP_));
});
;})(all_files,res_SINGLEQUOTE_,res,inst_55476,inst_55479,inst_55484,inst_55480,inst_55479__$1,inst_55480__$1,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_55482 = cljs.core.filter.call(null,inst_55481,inst_55479__$1);
var inst_55483 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_55484__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_55483);
var inst_55485 = cljs.core.not_empty.call(null,inst_55484__$1);
var state_55562__$1 = (function (){var statearr_55590 = state_55562;
(statearr_55590[(23)] = inst_55479__$1);

(statearr_55590[(26)] = inst_55482);

(statearr_55590[(24)] = inst_55484__$1);

(statearr_55590[(25)] = inst_55480__$1);

return statearr_55590;
})();
if(cljs.core.truth_(inst_55485)){
var statearr_55591_55671 = state_55562__$1;
(statearr_55591_55671[(1)] = (23));

} else {
var statearr_55592_55672 = state_55562__$1;
(statearr_55592_55672[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (36))){
var state_55562__$1 = state_55562;
var statearr_55593_55673 = state_55562__$1;
(statearr_55593_55673[(2)] = false);

(statearr_55593_55673[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (41))){
var inst_55537 = (state_55562[(20)]);
var inst_55541 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_55542 = cljs.core.map.call(null,inst_55541,inst_55537);
var inst_55543 = cljs.core.pr_str.call(null,inst_55542);
var inst_55544 = [cljs.core.str("figwheel-no-load meta-data: "),cljs.core.str(inst_55543)].join('');
var inst_55545 = figwheel.client.utils.log.call(null,inst_55544);
var state_55562__$1 = state_55562;
var statearr_55594_55674 = state_55562__$1;
(statearr_55594_55674[(2)] = inst_55545);

(statearr_55594_55674[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (43))){
var inst_55538 = (state_55562[(21)]);
var inst_55548 = (state_55562[(2)]);
var inst_55549 = cljs.core.not_empty.call(null,inst_55538);
var state_55562__$1 = (function (){var statearr_55595 = state_55562;
(statearr_55595[(27)] = inst_55548);

return statearr_55595;
})();
if(cljs.core.truth_(inst_55549)){
var statearr_55596_55675 = state_55562__$1;
(statearr_55596_55675[(1)] = (44));

} else {
var statearr_55597_55676 = state_55562__$1;
(statearr_55597_55676[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (29))){
var inst_55476 = (state_55562[(19)]);
var inst_55516 = (state_55562[(16)]);
var inst_55479 = (state_55562[(23)]);
var inst_55482 = (state_55562[(26)]);
var inst_55484 = (state_55562[(24)]);
var inst_55480 = (state_55562[(25)]);
var inst_55512 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_55515 = (function (){var all_files = inst_55476;
var res_SINGLEQUOTE_ = inst_55479;
var res = inst_55480;
var files_not_loaded = inst_55482;
var dependencies_that_loaded = inst_55484;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_55476,inst_55516,inst_55479,inst_55482,inst_55484,inst_55480,inst_55512,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__55514){
var map__55598 = p__55514;
var map__55598__$1 = ((((!((map__55598 == null)))?((((map__55598.cljs$lang$protocol_mask$partition0$ & (64))) || (map__55598.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__55598):map__55598);
var namespace = cljs.core.get.call(null,map__55598__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
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
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_55476,inst_55516,inst_55479,inst_55482,inst_55484,inst_55480,inst_55512,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_55516__$1 = cljs.core.group_by.call(null,inst_55515,inst_55482);
var inst_55518 = (inst_55516__$1 == null);
var inst_55519 = cljs.core.not.call(null,inst_55518);
var state_55562__$1 = (function (){var statearr_55600 = state_55562;
(statearr_55600[(28)] = inst_55512);

(statearr_55600[(16)] = inst_55516__$1);

return statearr_55600;
})();
if(inst_55519){
var statearr_55601_55677 = state_55562__$1;
(statearr_55601_55677[(1)] = (32));

} else {
var statearr_55602_55678 = state_55562__$1;
(statearr_55602_55678[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (44))){
var inst_55538 = (state_55562[(21)]);
var inst_55551 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_55538);
var inst_55552 = cljs.core.pr_str.call(null,inst_55551);
var inst_55553 = [cljs.core.str("not required: "),cljs.core.str(inst_55552)].join('');
var inst_55554 = figwheel.client.utils.log.call(null,inst_55553);
var state_55562__$1 = state_55562;
var statearr_55603_55679 = state_55562__$1;
(statearr_55603_55679[(2)] = inst_55554);

(statearr_55603_55679[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (6))){
var inst_55457 = (state_55562[(2)]);
var state_55562__$1 = state_55562;
var statearr_55604_55680 = state_55562__$1;
(statearr_55604_55680[(2)] = inst_55457);

(statearr_55604_55680[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (28))){
var inst_55482 = (state_55562[(26)]);
var inst_55509 = (state_55562[(2)]);
var inst_55510 = cljs.core.not_empty.call(null,inst_55482);
var state_55562__$1 = (function (){var statearr_55605 = state_55562;
(statearr_55605[(29)] = inst_55509);

return statearr_55605;
})();
if(cljs.core.truth_(inst_55510)){
var statearr_55606_55681 = state_55562__$1;
(statearr_55606_55681[(1)] = (29));

} else {
var statearr_55607_55682 = state_55562__$1;
(statearr_55607_55682[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (25))){
var inst_55480 = (state_55562[(25)]);
var inst_55496 = (state_55562[(2)]);
var inst_55497 = cljs.core.not_empty.call(null,inst_55480);
var state_55562__$1 = (function (){var statearr_55608 = state_55562;
(statearr_55608[(30)] = inst_55496);

return statearr_55608;
})();
if(cljs.core.truth_(inst_55497)){
var statearr_55609_55683 = state_55562__$1;
(statearr_55609_55683[(1)] = (26));

} else {
var statearr_55610_55684 = state_55562__$1;
(statearr_55610_55684[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (34))){
var inst_55531 = (state_55562[(2)]);
var state_55562__$1 = state_55562;
if(cljs.core.truth_(inst_55531)){
var statearr_55611_55685 = state_55562__$1;
(statearr_55611_55685[(1)] = (38));

} else {
var statearr_55612_55686 = state_55562__$1;
(statearr_55612_55686[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (17))){
var state_55562__$1 = state_55562;
var statearr_55613_55687 = state_55562__$1;
(statearr_55613_55687[(2)] = recompile_dependents);

(statearr_55613_55687[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (3))){
var state_55562__$1 = state_55562;
var statearr_55614_55688 = state_55562__$1;
(statearr_55614_55688[(2)] = null);

(statearr_55614_55688[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (12))){
var inst_55453 = (state_55562[(2)]);
var state_55562__$1 = state_55562;
var statearr_55615_55689 = state_55562__$1;
(statearr_55615_55689[(2)] = inst_55453);

(statearr_55615_55689[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (2))){
var inst_55415 = (state_55562[(13)]);
var inst_55422 = cljs.core.seq.call(null,inst_55415);
var inst_55423 = inst_55422;
var inst_55424 = null;
var inst_55425 = (0);
var inst_55426 = (0);
var state_55562__$1 = (function (){var statearr_55616 = state_55562;
(statearr_55616[(7)] = inst_55426);

(statearr_55616[(8)] = inst_55424);

(statearr_55616[(9)] = inst_55423);

(statearr_55616[(10)] = inst_55425);

return statearr_55616;
})();
var statearr_55617_55690 = state_55562__$1;
(statearr_55617_55690[(2)] = null);

(statearr_55617_55690[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (23))){
var inst_55476 = (state_55562[(19)]);
var inst_55479 = (state_55562[(23)]);
var inst_55482 = (state_55562[(26)]);
var inst_55484 = (state_55562[(24)]);
var inst_55480 = (state_55562[(25)]);
var inst_55487 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_55489 = (function (){var all_files = inst_55476;
var res_SINGLEQUOTE_ = inst_55479;
var res = inst_55480;
var files_not_loaded = inst_55482;
var dependencies_that_loaded = inst_55484;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_55476,inst_55479,inst_55482,inst_55484,inst_55480,inst_55487,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__55488){
var map__55618 = p__55488;
var map__55618__$1 = ((((!((map__55618 == null)))?((((map__55618.cljs$lang$protocol_mask$partition0$ & (64))) || (map__55618.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__55618):map__55618);
var request_url = cljs.core.get.call(null,map__55618__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_55476,inst_55479,inst_55482,inst_55484,inst_55480,inst_55487,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_55490 = cljs.core.reverse.call(null,inst_55484);
var inst_55491 = cljs.core.map.call(null,inst_55489,inst_55490);
var inst_55492 = cljs.core.pr_str.call(null,inst_55491);
var inst_55493 = figwheel.client.utils.log.call(null,inst_55492);
var state_55562__$1 = (function (){var statearr_55620 = state_55562;
(statearr_55620[(31)] = inst_55487);

return statearr_55620;
})();
var statearr_55621_55691 = state_55562__$1;
(statearr_55621_55691[(2)] = inst_55493);

(statearr_55621_55691[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (35))){
var state_55562__$1 = state_55562;
var statearr_55622_55692 = state_55562__$1;
(statearr_55622_55692[(2)] = true);

(statearr_55622_55692[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (19))){
var inst_55466 = (state_55562[(12)]);
var inst_55472 = figwheel.client.file_reloading.expand_files.call(null,inst_55466);
var state_55562__$1 = state_55562;
var statearr_55623_55693 = state_55562__$1;
(statearr_55623_55693[(2)] = inst_55472);

(statearr_55623_55693[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (11))){
var state_55562__$1 = state_55562;
var statearr_55624_55694 = state_55562__$1;
(statearr_55624_55694[(2)] = null);

(statearr_55624_55694[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (9))){
var inst_55455 = (state_55562[(2)]);
var state_55562__$1 = state_55562;
var statearr_55625_55695 = state_55562__$1;
(statearr_55625_55695[(2)] = inst_55455);

(statearr_55625_55695[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (5))){
var inst_55426 = (state_55562[(7)]);
var inst_55425 = (state_55562[(10)]);
var inst_55428 = (inst_55426 < inst_55425);
var inst_55429 = inst_55428;
var state_55562__$1 = state_55562;
if(cljs.core.truth_(inst_55429)){
var statearr_55626_55696 = state_55562__$1;
(statearr_55626_55696[(1)] = (7));

} else {
var statearr_55627_55697 = state_55562__$1;
(statearr_55627_55697[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (14))){
var inst_55436 = (state_55562[(22)]);
var inst_55445 = cljs.core.first.call(null,inst_55436);
var inst_55446 = figwheel.client.file_reloading.eval_body.call(null,inst_55445,opts);
var inst_55447 = cljs.core.next.call(null,inst_55436);
var inst_55423 = inst_55447;
var inst_55424 = null;
var inst_55425 = (0);
var inst_55426 = (0);
var state_55562__$1 = (function (){var statearr_55628 = state_55562;
(statearr_55628[(32)] = inst_55446);

(statearr_55628[(7)] = inst_55426);

(statearr_55628[(8)] = inst_55424);

(statearr_55628[(9)] = inst_55423);

(statearr_55628[(10)] = inst_55425);

return statearr_55628;
})();
var statearr_55629_55698 = state_55562__$1;
(statearr_55629_55698[(2)] = null);

(statearr_55629_55698[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (45))){
var state_55562__$1 = state_55562;
var statearr_55630_55699 = state_55562__$1;
(statearr_55630_55699[(2)] = null);

(statearr_55630_55699[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (26))){
var inst_55476 = (state_55562[(19)]);
var inst_55479 = (state_55562[(23)]);
var inst_55482 = (state_55562[(26)]);
var inst_55484 = (state_55562[(24)]);
var inst_55480 = (state_55562[(25)]);
var inst_55499 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_55501 = (function (){var all_files = inst_55476;
var res_SINGLEQUOTE_ = inst_55479;
var res = inst_55480;
var files_not_loaded = inst_55482;
var dependencies_that_loaded = inst_55484;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_55476,inst_55479,inst_55482,inst_55484,inst_55480,inst_55499,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__55500){
var map__55631 = p__55500;
var map__55631__$1 = ((((!((map__55631 == null)))?((((map__55631.cljs$lang$protocol_mask$partition0$ & (64))) || (map__55631.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__55631):map__55631);
var namespace = cljs.core.get.call(null,map__55631__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__55631__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_55476,inst_55479,inst_55482,inst_55484,inst_55480,inst_55499,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_55502 = cljs.core.map.call(null,inst_55501,inst_55480);
var inst_55503 = cljs.core.pr_str.call(null,inst_55502);
var inst_55504 = figwheel.client.utils.log.call(null,inst_55503);
var inst_55505 = (function (){var all_files = inst_55476;
var res_SINGLEQUOTE_ = inst_55479;
var res = inst_55480;
var files_not_loaded = inst_55482;
var dependencies_that_loaded = inst_55484;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_55476,inst_55479,inst_55482,inst_55484,inst_55480,inst_55499,inst_55501,inst_55502,inst_55503,inst_55504,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_55476,inst_55479,inst_55482,inst_55484,inst_55480,inst_55499,inst_55501,inst_55502,inst_55503,inst_55504,state_val_55563,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_55506 = setTimeout(inst_55505,(10));
var state_55562__$1 = (function (){var statearr_55633 = state_55562;
(statearr_55633[(33)] = inst_55499);

(statearr_55633[(34)] = inst_55504);

return statearr_55633;
})();
var statearr_55634_55700 = state_55562__$1;
(statearr_55634_55700[(2)] = inst_55506);

(statearr_55634_55700[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (16))){
var state_55562__$1 = state_55562;
var statearr_55635_55701 = state_55562__$1;
(statearr_55635_55701[(2)] = reload_dependents);

(statearr_55635_55701[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (38))){
var inst_55516 = (state_55562[(16)]);
var inst_55533 = cljs.core.apply.call(null,cljs.core.hash_map,inst_55516);
var state_55562__$1 = state_55562;
var statearr_55636_55702 = state_55562__$1;
(statearr_55636_55702[(2)] = inst_55533);

(statearr_55636_55702[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (30))){
var state_55562__$1 = state_55562;
var statearr_55637_55703 = state_55562__$1;
(statearr_55637_55703[(2)] = null);

(statearr_55637_55703[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (10))){
var inst_55436 = (state_55562[(22)]);
var inst_55438 = cljs.core.chunked_seq_QMARK_.call(null,inst_55436);
var state_55562__$1 = state_55562;
if(inst_55438){
var statearr_55638_55704 = state_55562__$1;
(statearr_55638_55704[(1)] = (13));

} else {
var statearr_55639_55705 = state_55562__$1;
(statearr_55639_55705[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (18))){
var inst_55470 = (state_55562[(2)]);
var state_55562__$1 = state_55562;
if(cljs.core.truth_(inst_55470)){
var statearr_55640_55706 = state_55562__$1;
(statearr_55640_55706[(1)] = (19));

} else {
var statearr_55641_55707 = state_55562__$1;
(statearr_55641_55707[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (42))){
var state_55562__$1 = state_55562;
var statearr_55642_55708 = state_55562__$1;
(statearr_55642_55708[(2)] = null);

(statearr_55642_55708[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (37))){
var inst_55528 = (state_55562[(2)]);
var state_55562__$1 = state_55562;
var statearr_55643_55709 = state_55562__$1;
(statearr_55643_55709[(2)] = inst_55528);

(statearr_55643_55709[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55563 === (8))){
var inst_55423 = (state_55562[(9)]);
var inst_55436 = (state_55562[(22)]);
var inst_55436__$1 = cljs.core.seq.call(null,inst_55423);
var state_55562__$1 = (function (){var statearr_55644 = state_55562;
(statearr_55644[(22)] = inst_55436__$1);

return statearr_55644;
})();
if(inst_55436__$1){
var statearr_55645_55710 = state_55562__$1;
(statearr_55645_55710[(1)] = (10));

} else {
var statearr_55646_55711 = state_55562__$1;
(statearr_55646_55711[(1)] = (11));

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
});})(c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents))
;
return ((function (switch__19855__auto__,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__19856__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__19856__auto____0 = (function (){
var statearr_55650 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_55650[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__19856__auto__);

(statearr_55650[(1)] = (1));

return statearr_55650;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__19856__auto____1 = (function (state_55562){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_55562);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e55651){if((e55651 instanceof Object)){
var ex__19859__auto__ = e55651;
var statearr_55652_55712 = state_55562;
(statearr_55652_55712[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_55562);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e55651;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55713 = state_55562;
state_55562 = G__55713;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__19856__auto__ = function(state_55562){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__19856__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__19856__auto____1.call(this,state_55562);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__19856__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__19856__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var state__19922__auto__ = (function (){var statearr_55653 = f__19921__auto__.call(null);
(statearr_55653[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto__);

return statearr_55653;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto__,map__55408,map__55408__$1,opts,before_jsload,on_jsload,reload_dependents,map__55409,map__55409__$1,msg,files,figwheel_meta,recompile_dependents))
);

return c__19920__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str(location.protocol),cljs.core.str("//")].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__55716,link){
var map__55719 = p__55716;
var map__55719__$1 = ((((!((map__55719 == null)))?((((map__55719.cljs$lang$protocol_mask$partition0$ & (64))) || (map__55719.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__55719):map__55719);
var file = cljs.core.get.call(null,map__55719__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4425__auto__ = link.href;
if(cljs.core.truth_(temp__4425__auto__)){
var link_href = temp__4425__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__4425__auto__,map__55719,map__55719__$1,file){
return (function (p1__55714_SHARP_,p2__55715_SHARP_){
if(cljs.core._EQ_.call(null,p1__55714_SHARP_,p2__55715_SHARP_)){
return p1__55714_SHARP_;
} else {
return false;
}
});})(link_href,temp__4425__auto__,map__55719,map__55719__$1,file))
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
var temp__4425__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__55725){
var map__55726 = p__55725;
var map__55726__$1 = ((((!((map__55726 == null)))?((((map__55726.cljs$lang$protocol_mask$partition0$ & (64))) || (map__55726.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__55726):map__55726);
var match_length = cljs.core.get.call(null,map__55726__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__55726__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__55721_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__55721_SHARP_);
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
var args55728 = [];
var len__17325__auto___55731 = arguments.length;
var i__17326__auto___55732 = (0);
while(true){
if((i__17326__auto___55732 < len__17325__auto___55731)){
args55728.push((arguments[i__17326__auto___55732]));

var G__55733 = (i__17326__auto___55732 + (1));
i__17326__auto___55732 = G__55733;
continue;
} else {
}
break;
}

var G__55730 = args55728.length;
switch (G__55730) {
case 1:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args55728.length)].join('')));

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
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__55735_SHARP_,p2__55736_SHARP_){
return cljs.core.assoc.call(null,p1__55735_SHARP_,cljs.core.get.call(null,p2__55736_SHARP_,key),p2__55736_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,seqq));
});
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(p__55737){
var map__55740 = p__55737;
var map__55740__$1 = ((((!((map__55740 == null)))?((((map__55740.cljs$lang$protocol_mask$partition0$ & (64))) || (map__55740.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__55740):map__55740);
var f_data = map__55740__$1;
var file = cljs.core.get.call(null,map__55740__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4425__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__4425__auto__)){
var link = temp__4425__auto__;
return figwheel.client.file_reloading.add_link_to_doc.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href));
} else {
return null;
}
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__55742,files_msg){
var map__55749 = p__55742;
var map__55749__$1 = ((((!((map__55749 == null)))?((((map__55749.cljs$lang$protocol_mask$partition0$ & (64))) || (map__55749.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__55749):map__55749);
var opts = map__55749__$1;
var on_cssload = cljs.core.get.call(null,map__55749__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var seq__55751_55755 = cljs.core.seq.call(null,figwheel.client.file_reloading.distictify.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg)));
var chunk__55752_55756 = null;
var count__55753_55757 = (0);
var i__55754_55758 = (0);
while(true){
if((i__55754_55758 < count__55753_55757)){
var f_55759 = cljs.core._nth.call(null,chunk__55752_55756,i__55754_55758);
figwheel.client.file_reloading.reload_css_file.call(null,f_55759);

var G__55760 = seq__55751_55755;
var G__55761 = chunk__55752_55756;
var G__55762 = count__55753_55757;
var G__55763 = (i__55754_55758 + (1));
seq__55751_55755 = G__55760;
chunk__55752_55756 = G__55761;
count__55753_55757 = G__55762;
i__55754_55758 = G__55763;
continue;
} else {
var temp__4425__auto___55764 = cljs.core.seq.call(null,seq__55751_55755);
if(temp__4425__auto___55764){
var seq__55751_55765__$1 = temp__4425__auto___55764;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__55751_55765__$1)){
var c__17070__auto___55766 = cljs.core.chunk_first.call(null,seq__55751_55765__$1);
var G__55767 = cljs.core.chunk_rest.call(null,seq__55751_55765__$1);
var G__55768 = c__17070__auto___55766;
var G__55769 = cljs.core.count.call(null,c__17070__auto___55766);
var G__55770 = (0);
seq__55751_55755 = G__55767;
chunk__55752_55756 = G__55768;
count__55753_55757 = G__55769;
i__55754_55758 = G__55770;
continue;
} else {
var f_55771 = cljs.core.first.call(null,seq__55751_55765__$1);
figwheel.client.file_reloading.reload_css_file.call(null,f_55771);

var G__55772 = cljs.core.next.call(null,seq__55751_55765__$1);
var G__55773 = null;
var G__55774 = (0);
var G__55775 = (0);
seq__55751_55755 = G__55772;
chunk__55752_55756 = G__55773;
count__55753_55757 = G__55774;
i__55754_55758 = G__55775;
continue;
}
} else {
}
}
break;
}

return setTimeout(((function (map__55749,map__55749__$1,opts,on_cssload){
return (function (){
return on_cssload.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg));
});})(map__55749,map__55749__$1,opts,on_cssload))
,(100));
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map?rel=1445965109963