// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer.format.reader');
goog.require('cljs.core');
parinfer.format.reader.matching_delim = new cljs.core.PersistentArrayMap(null, 6, ["{","}","}","{","[","]","]","[","(",")",")","("], null);
parinfer.format.reader.opening_delim_QMARK_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["(",null,"{",null,"[",null], null), null);
parinfer.format.reader.closing_delim_QMARK_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["]",null,")",null,"}",null], null), null);
parinfer.format.reader.whitespace_QMARK_ = (function parinfer$format$reader$whitespace_QMARK_(ch){
return cljs.core.re_find.call(null,/[\s,]/,ch);
});
parinfer.format.reader.prev_ch = (function parinfer$format$reader$prev_ch(stack){
return new cljs.core.Keyword(null,"ch","ch",-554717905).cljs$core$IFn$_invoke$arity$1(cljs.core.peek.call(null,stack));
});
/**
 * Next character will be escaped.
 */
parinfer.format.reader.escaping_QMARK_ = (function parinfer$format$reader$escaping_QMARK_(stack){
return cljs.core._EQ_.call(null,"\\",parinfer.format.reader.prev_ch.call(null,stack));
});
/**
 * Next character is inside a string.
 */
parinfer.format.reader.in_str_QMARK_ = (function parinfer$format$reader$in_str_QMARK_(stack){
var ch = parinfer.format.reader.prev_ch.call(null,(function (){var G__37505 = stack;
var G__37505__$1 = (cljs.core.truth_(parinfer.format.reader.escaping_QMARK_.call(null,stack))?cljs.core.pop.call(null,G__37505):G__37505);
return G__37505__$1;
})());
return cljs.core._EQ_.call(null,"\"",ch);
});
/**
 * Next character is inside a comment.
 */
parinfer.format.reader.in_comment_QMARK_ = (function parinfer$format$reader$in_comment_QMARK_(stack){
return cljs.core._EQ_.call(null,";",parinfer.format.reader.prev_ch.call(null,stack));
});
/**
 * Next character is inside actual code.
 */
parinfer.format.reader.in_code_QMARK_ = (function parinfer$format$reader$in_code_QMARK_(stack){
return (cljs.core.not.call(null,parinfer.format.reader.in_str_QMARK_.call(null,stack))) && (cljs.core.not.call(null,parinfer.format.reader.in_comment_QMARK_.call(null,stack)));
});
/**
 * Determine if the given closing delimiter can be used next, assuming we are inside code.
 */
parinfer.format.reader.valid_closer_QMARK_ = (function parinfer$format$reader$valid_closer_QMARK_(stack,ch){
return cljs.core._EQ_.call(null,parinfer.format.reader.prev_ch.call(null,stack),parinfer.format.reader.matching_delim.call(null,ch));
});
if(typeof parinfer.format.reader.push_char_STAR_ !== 'undefined'){
} else {
/**
 * Update the delimiter stack with the given character.
 */
parinfer.format.reader.push_char_STAR_ = (function (){var method_table__17180__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__17181__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__17182__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__17183__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__17184__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"parinfer.format.reader","push-char*"),((function (method_table__17180__auto__,prefer_table__17181__auto__,method_cache__17182__auto__,cached_hierarchy__17183__auto__,hierarchy__17184__auto__){
return (function (p__37506){
var map__37507 = p__37506;
var map__37507__$1 = ((((!((map__37507 == null)))?((((map__37507.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37507.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37507):map__37507);
var ch = cljs.core.get.call(null,map__37507__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
if(cljs.core.truth_(parinfer.format.reader.opening_delim_QMARK_.call(null,ch))){
return new cljs.core.Keyword(null,"open","open",-1763596448);
} else {
if(cljs.core.truth_(parinfer.format.reader.closing_delim_QMARK_.call(null,ch))){
return new cljs.core.Keyword(null,"close","close",1835149582);
} else {
return ch;

}
}
});})(method_table__17180__auto__,prefer_table__17181__auto__,method_cache__17182__auto__,cached_hierarchy__17183__auto__,hierarchy__17184__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__17184__auto__,method_table__17180__auto__,prefer_table__17181__auto__,method_cache__17182__auto__,cached_hierarchy__17183__auto__));
})();
}
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,"\t",(function (p__37509){
var map__37510 = p__37509;
var map__37510__$1 = ((((!((map__37510 == null)))?((((map__37510.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37510.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37510):map__37510);
var stack = cljs.core.get.call(null,map__37510__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.not.call(null,parinfer.format.reader.in_str_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ch","ch",-554717905),"  "], null);
} else {
return null;

}
}));
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,new cljs.core.Keyword(null,"open","open",-1763596448),(function (p__37512){
var map__37513 = p__37512;
var map__37513__$1 = ((((!((map__37513 == null)))?((((map__37513.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37513.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37513):map__37513);
var state = map__37513__$1;
var stack = cljs.core.get.call(null,map__37513__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.truth_(parinfer.format.reader.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
if(cljs.core.truth_(parinfer.format.reader.in_code_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.conj.call(null,stack,cljs.core.select_keys.call(null,state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),new cljs.core.Keyword(null,"ch","ch",-554717905),new cljs.core.Keyword(null,"indent-delta","indent-delta",-1753368232)], null)))], null);
} else {
return null;

}
}
}));
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,new cljs.core.Keyword(null,"close","close",1835149582),(function (p__37515){
var map__37516 = p__37515;
var map__37516__$1 = ((((!((map__37516 == null)))?((((map__37516.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37516.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37516):map__37516);
var stack = cljs.core.get.call(null,map__37516__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var backup = cljs.core.get.call(null,map__37516__$1,new cljs.core.Keyword(null,"backup","backup",26347393));
var ch = cljs.core.get.call(null,map__37516__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
if(cljs.core.truth_(parinfer.format.reader.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
if(cljs.core.truth_(parinfer.format.reader.in_code_QMARK_.call(null,stack))){
if(cljs.core.truth_(parinfer.format.reader.valid_closer_QMARK_.call(null,stack,ch))){
var opener = cljs.core.peek.call(null,stack);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack),new cljs.core.Keyword(null,"backup","backup",26347393),cljs.core.conj.call(null,backup,opener)], null);
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ch","ch",-554717905),""], null);
}
} else {
return null;

}
}
}));
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,";",(function (p__37518){
var map__37519 = p__37518;
var map__37519__$1 = ((((!((map__37519 == null)))?((((map__37519.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37519.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37519):map__37519);
var state = map__37519__$1;
var stack = cljs.core.get.call(null,map__37519__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.truth_(parinfer.format.reader.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
if(cljs.core.truth_(parinfer.format.reader.in_code_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.conj.call(null,stack,cljs.core.select_keys.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),new cljs.core.Keyword(null,"ch","ch",-554717905)], null)))], null);
} else {
return null;

}
}
}));
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,"\n",(function (p__37521){
var map__37522 = p__37521;
var map__37522__$1 = ((((!((map__37522 == null)))?((((map__37522.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37522.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37522):map__37522);
var stack = cljs.core.get.call(null,map__37522__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var stack__$1 = (function (){var G__37524 = stack;
var G__37524__$1 = (cljs.core.truth_(parinfer.format.reader.escaping_QMARK_.call(null,stack))?cljs.core.pop.call(null,G__37524):G__37524);
return G__37524__$1;
})();
var stack__$2 = (function (){var G__37525 = stack__$1;
var G__37525__$1 = (cljs.core.truth_(parinfer.format.reader.in_comment_QMARK_.call(null,stack__$1))?cljs.core.pop.call(null,G__37525):G__37525);
return G__37525__$1;
})();
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ch","ch",-554717905),"",new cljs.core.Keyword(null,"stack","stack",-793405930),stack__$2], null);
}));
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,"\\",(function (p__37526){
var map__37527 = p__37526;
var map__37527__$1 = ((((!((map__37527 == null)))?((((map__37527.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37527.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37527):map__37527);
var state = map__37527__$1;
var stack = cljs.core.get.call(null,map__37527__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.truth_(parinfer.format.reader.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
if(cljs.core.truth_(parinfer.format.reader.in_comment_QMARK_.call(null,stack))){
return null;
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.conj.call(null,stack,cljs.core.select_keys.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),new cljs.core.Keyword(null,"ch","ch",-554717905)], null)))], null);

}
}
}));
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,"\"",(function (p__37529){
var map__37530 = p__37529;
var map__37530__$1 = ((((!((map__37530 == null)))?((((map__37530.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37530.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37530):map__37530);
var state = map__37530__$1;
var stack = cljs.core.get.call(null,map__37530__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.truth_(parinfer.format.reader.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
if(cljs.core.truth_(parinfer.format.reader.in_str_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
if(cljs.core.truth_(parinfer.format.reader.in_comment_QMARK_.call(null,stack))){
return null;
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.conj.call(null,stack,cljs.core.select_keys.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),new cljs.core.Keyword(null,"ch","ch",-554717905)], null)))], null);

}
}
}
}));
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__37532){
var map__37533 = p__37532;
var map__37533__$1 = ((((!((map__37533 == null)))?((((map__37533.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37533.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37533):map__37533);
var stack = cljs.core.get.call(null,map__37533__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.truth_(parinfer.format.reader.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
return null;

}
}));
parinfer.format.reader.push_char = (function parinfer$format$reader$push_char(state){
var new_data = parinfer.format.reader.push_char_STAR_.call(null,state);
return cljs.core.merge_with.call(null,((function (new_data){
return (function (p1__37536_SHARP_,p2__37535_SHARP_){
var or__16267__auto__ = p2__37535_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return p1__37536_SHARP_;
}
});})(new_data))
,state,new_data);
});

//# sourceMappingURL=reader.js.map?rel=1445823440988