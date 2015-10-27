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
var ch = parinfer.format.reader.prev_ch.call(null,(function (){var G__46734 = stack;
var G__46734__$1 = (cljs.core.truth_(parinfer.format.reader.escaping_QMARK_.call(null,stack))?cljs.core.pop.call(null,G__46734):G__46734);
return G__46734__$1;
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
return (function (p__46735){
var map__46736 = p__46735;
var map__46736__$1 = ((((!((map__46736 == null)))?((((map__46736.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46736.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46736):map__46736);
var ch = cljs.core.get.call(null,map__46736__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
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
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,"\t",(function (p__46738){
var map__46739 = p__46738;
var map__46739__$1 = ((((!((map__46739 == null)))?((((map__46739.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46739.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46739):map__46739);
var stack = cljs.core.get.call(null,map__46739__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.not.call(null,parinfer.format.reader.in_str_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ch","ch",-554717905),"  "], null);
} else {
return null;

}
}));
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,new cljs.core.Keyword(null,"open","open",-1763596448),(function (p__46741){
var map__46742 = p__46741;
var map__46742__$1 = ((((!((map__46742 == null)))?((((map__46742.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46742.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46742):map__46742);
var state = map__46742__$1;
var stack = cljs.core.get.call(null,map__46742__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
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
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,new cljs.core.Keyword(null,"close","close",1835149582),(function (p__46744){
var map__46745 = p__46744;
var map__46745__$1 = ((((!((map__46745 == null)))?((((map__46745.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46745.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46745):map__46745);
var stack = cljs.core.get.call(null,map__46745__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var backup = cljs.core.get.call(null,map__46745__$1,new cljs.core.Keyword(null,"backup","backup",26347393));
var ch = cljs.core.get.call(null,map__46745__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
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
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,";",(function (p__46747){
var map__46748 = p__46747;
var map__46748__$1 = ((((!((map__46748 == null)))?((((map__46748.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46748.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46748):map__46748);
var state = map__46748__$1;
var stack = cljs.core.get.call(null,map__46748__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
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
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,"\n",(function (p__46750){
var map__46751 = p__46750;
var map__46751__$1 = ((((!((map__46751 == null)))?((((map__46751.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46751.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46751):map__46751);
var stack = cljs.core.get.call(null,map__46751__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var stack__$1 = (function (){var G__46753 = stack;
var G__46753__$1 = (cljs.core.truth_(parinfer.format.reader.escaping_QMARK_.call(null,stack))?cljs.core.pop.call(null,G__46753):G__46753);
return G__46753__$1;
})();
var stack__$2 = (function (){var G__46754 = stack__$1;
var G__46754__$1 = (cljs.core.truth_(parinfer.format.reader.in_comment_QMARK_.call(null,stack__$1))?cljs.core.pop.call(null,G__46754):G__46754);
return G__46754__$1;
})();
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ch","ch",-554717905),"",new cljs.core.Keyword(null,"stack","stack",-793405930),stack__$2], null);
}));
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,"\\",(function (p__46755){
var map__46756 = p__46755;
var map__46756__$1 = ((((!((map__46756 == null)))?((((map__46756.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46756.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46756):map__46756);
var state = map__46756__$1;
var stack = cljs.core.get.call(null,map__46756__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
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
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,"\"",(function (p__46758){
var map__46759 = p__46758;
var map__46759__$1 = ((((!((map__46759 == null)))?((((map__46759.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46759.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46759):map__46759);
var state = map__46759__$1;
var stack = cljs.core.get.call(null,map__46759__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
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
cljs.core._add_method.call(null,parinfer.format.reader.push_char_STAR_,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__46761){
var map__46762 = p__46761;
var map__46762__$1 = ((((!((map__46762 == null)))?((((map__46762.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46762.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46762):map__46762);
var stack = cljs.core.get.call(null,map__46762__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.truth_(parinfer.format.reader.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
return null;

}
}));
parinfer.format.reader.push_char = (function parinfer$format$reader$push_char(state){
var new_data = parinfer.format.reader.push_char_STAR_.call(null,state);
return cljs.core.merge_with.call(null,((function (new_data){
return (function (p1__46765_SHARP_,p2__46764_SHARP_){
var or__16267__auto__ = p2__46764_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return p1__46765_SHARP_;
}
});})(new_data))
,state,new_data);
});

//# sourceMappingURL=reader.js.map?rel=1445965100033