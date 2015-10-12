// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer.formatter');
goog.require('cljs.core');
goog.require('clojure.string');
parinfer.formatter.matching_delim = new cljs.core.PersistentArrayMap(null, 6, ["{","}","}","{","[","]","]","[","(",")",")","("], null);
parinfer.formatter.char_hierarchy = cljs.core.derive.call(null,cljs.core.derive.call(null,cljs.core.derive.call(null,cljs.core.derive.call(null,cljs.core.derive.call(null,cljs.core.derive.call(null,cljs.core.make_hierarchy.call(null),"{",new cljs.core.Keyword(null,"open","open",-1763596448)),"[",new cljs.core.Keyword(null,"open","open",-1763596448)),"(",new cljs.core.Keyword(null,"open","open",-1763596448)),"}",new cljs.core.Keyword(null,"close","close",1835149582)),"]",new cljs.core.Keyword(null,"close","close",1835149582)),")",new cljs.core.Keyword(null,"close","close",1835149582));
parinfer.formatter.prev_ch = (function parinfer$formatter$prev_ch(stack){
return cljs.core.second.call(null,cljs.core.peek.call(null,stack));
});
/**
 * Next character will be escaped.
 */
parinfer.formatter.escaping_QMARK_ = (function parinfer$formatter$escaping_QMARK_(stack){
return cljs.core._EQ_.call(null,"\\",parinfer.formatter.prev_ch.call(null,stack));
});
/**
 * Next character is inside a string.
 */
parinfer.formatter.in_str_QMARK_ = (function parinfer$formatter$in_str_QMARK_(stack){
return cljs.core._EQ_.call(null,"\"",parinfer.formatter.prev_ch.call(null,stack));
});
/**
 * Next character is inside a comment.
 */
parinfer.formatter.in_comment_QMARK_ = (function parinfer$formatter$in_comment_QMARK_(stack){
return cljs.core._EQ_.call(null,";",parinfer.formatter.prev_ch.call(null,stack));
});
/**
 * Next character is inside actual code.
 */
parinfer.formatter.in_code_QMARK_ = (function parinfer$formatter$in_code_QMARK_(stack){
return (cljs.core.not.call(null,parinfer.formatter.in_str_QMARK_.call(null,stack))) && (cljs.core.not.call(null,parinfer.formatter.in_comment_QMARK_.call(null,stack)));
});
/**
 * Determine if the given closing delimiter can be used next, assuming we are inside code.
 */
parinfer.formatter.valid_closer_QMARK_ = (function parinfer$formatter$valid_closer_QMARK_(stack,ch){
return cljs.core._EQ_.call(null,parinfer.formatter.prev_ch.call(null,stack),parinfer.formatter.matching_delim.call(null,ch));
});
if(typeof parinfer.formatter.push_char_STAR_ !== 'undefined'){
} else {
/**
 * Update the delimiter stack with the given character.
 */
parinfer.formatter.push_char_STAR_ = (function (){var method_table__17180__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__17181__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__17182__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__17183__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__17184__auto__ = cljs.core.get.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),new cljs.core.Var(function(){return parinfer.formatter.char_hierarchy;},new cljs.core.Symbol("parinfer.formatter","char-hierarchy","parinfer.formatter/char-hierarchy",2087485730,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"parinfer.formatter","parinfer.formatter",1347899091,null),new cljs.core.Symbol(null,"char-hierarchy","char-hierarchy",413992331,null),"src/parinfer/formatter.cljs",20,1,11,11,cljs.core.List.EMPTY,null,(cljs.core.truth_(parinfer.formatter.char_hierarchy)?parinfer.formatter.char_hierarchy.cljs$lang$test:null)]))], null),new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"parinfer.formatter","push-char*"),((function (method_table__17180__auto__,prefer_table__17181__auto__,method_cache__17182__auto__,cached_hierarchy__17183__auto__,hierarchy__17184__auto__){
return (function (state){
return new cljs.core.Keyword(null,"ch","ch",-554717905).cljs$core$IFn$_invoke$arity$1(state);
});})(method_table__17180__auto__,prefer_table__17181__auto__,method_cache__17182__auto__,cached_hierarchy__17183__auto__,hierarchy__17184__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__17184__auto__,method_table__17180__auto__,prefer_table__17181__auto__,method_cache__17182__auto__,cached_hierarchy__17183__auto__));
})();
}
cljs.core._add_method.call(null,parinfer.formatter.push_char_STAR_,"\t",(function (p__25852){
var map__25853 = p__25852;
var map__25853__$1 = ((((!((map__25853 == null)))?((((map__25853.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25853.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25853):map__25853);
var stack = cljs.core.get.call(null,map__25853__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var x_pos = cljs.core.get.call(null,map__25853__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var ch = cljs.core.get.call(null,map__25853__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
if(cljs.core.not.call(null,parinfer.formatter.in_str_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ch","ch",-554717905),"  "], null);
} else {
return null;

}
}));
cljs.core._add_method.call(null,parinfer.formatter.push_char_STAR_,new cljs.core.Keyword(null,"open","open",-1763596448),(function (p__25855){
var map__25856 = p__25855;
var map__25856__$1 = ((((!((map__25856 == null)))?((((map__25856.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25856.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25856):map__25856);
var stack = cljs.core.get.call(null,map__25856__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var x_pos = cljs.core.get.call(null,map__25856__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var ch = cljs.core.get.call(null,map__25856__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
if(cljs.core.truth_(parinfer.formatter.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
if(cljs.core.truth_(parinfer.formatter.in_code_QMARK_.call(null,stack))){
