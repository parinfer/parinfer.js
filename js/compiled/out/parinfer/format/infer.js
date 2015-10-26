// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer.format.infer');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('parinfer.format.string');
goog.require('parinfer.format.reader');
/**
 * An initial state of our running state.
 */
parinfer.format.infer.initial_state = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"lines","lines",-700165781),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"line-no","line-no",-666819466),(-1),new cljs.core.Keyword(null,"track-indent?","track-indent?",-1967553136),false,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",-355208981),null,new cljs.core.Keyword(null,"end","end",-268185958),null], null),new cljs.core.Keyword(null,"insert","insert",1286475395),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line-no","line-no",-666819466),null,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),null], null),new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"backup","backup",26347393),cljs.core.PersistentVector.EMPTY], null);
/**
 * Update the state by inferring closing delimiters.
 *   Do this by using the given indentation level.
 *   
 *   Example:
 *   
 *   (defn foo [a b
 *   ret           ;; <---  When we process `r`, we detect indentation, then...
 * 
 *   (defn foo [a b]  ;; <---  ... we insert a `]` after `b` since `[` is after `r` on the x-axis.
 *   ret           ;; <---  A `)` is inserted after `ret` if no further indented lines found.
 *   
 */
parinfer.format.infer.close_delims = (function parinfer$format$infer$close_delims(var_args){
var args37539 = [];
var len__17325__auto___37547 = arguments.length;
var i__17326__auto___37548 = (0);
while(true){
if((i__17326__auto___37548 < len__17325__auto___37547)){
args37539.push((arguments[i__17326__auto___37548]));

var G__37549 = (i__17326__auto___37548 + (1));
i__17326__auto___37548 = G__37549;
continue;
} else {
}
break;
}

var G__37541 = args37539.length;
switch (G__37541) {
case 1:
return parinfer.format.infer.close_delims.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.format.infer.close_delims.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37539.length)].join('')));

}
});

parinfer.format.infer.close_delims.cljs$core$IFn$_invoke$arity$1 = (function (state){
return parinfer.format.infer.close_delims.call(null,state,(0));
});

parinfer.format.infer.close_delims.cljs$core$IFn$_invoke$arity$2 = (function (state,indent_x){
var vec__37542 = (function (){var stack = new cljs.core.Keyword(null,"stack","stack",-793405930).cljs$core$IFn$_invoke$arity$1(state);
var delims = "";
while(true){
if(cljs.core.not.call(null,cljs.core.seq.call(null,stack))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [stack,delims], null);
} else {
var map__37544 = cljs.core.peek.call(null,stack);
var map__37544__$1 = ((((!((map__37544 == null)))?((((map__37544.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37544.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37544):map__37544);
var x_pos = cljs.core.get.call(null,map__37544__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var ch = cljs.core.get.call(null,map__37544__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
if((x_pos >= indent_x)){
var G__37551 = cljs.core.pop.call(null,stack);
var G__37552 = [cljs.core.str(delims),cljs.core.str(parinfer.format.reader.matching_delim.call(null,ch))].join('');
stack = G__37551;
delims = G__37552;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [stack,delims], null);
}
}
break;
}
})();
var stack = cljs.core.nth.call(null,vec__37542,(0),null);
var delims = cljs.core.nth.call(null,vec__37542,(1),null);
var map__37543 = new cljs.core.Keyword(null,"insert","insert",1286475395).cljs$core$IFn$_invoke$arity$1(state);
var map__37543__$1 = ((((!((map__37543 == null)))?((((map__37543.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37543.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37543):map__37543);
var line_no = cljs.core.get.call(null,map__37543__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var x_pos = cljs.core.get.call(null,map__37543__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var state__$1 = cljs.core.assoc.call(null,cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lines","lines",-700165781),line_no], null),parinfer.format.string.insert_string,x_pos,delims),new cljs.core.Keyword(null,"track-indent?","track-indent?",-1967553136),false,new cljs.core.Keyword(null,"stack","stack",-793405930),stack);
return state__$1;
});

parinfer.format.infer.close_delims.cljs$lang$maxFixedArity = 2;
/**
 * Update the state's delim trail as we scan across a line.
 *   We eventually remove the delim trail since we indented
 *   content below can cause the delims to move.
 * 
 *   Example:
 *   
 *   (foo (+ 2 3) [(bar)] )    ;; a potential comment
 *                  ^^^^
 *                   |
 *                   +-- trailing delims that we will remove
 *                        (notice whitespace will also be removed)
 *   
 */
parinfer.format.infer.update_delim_trail = (function parinfer$format$infer$update_delim_trail(p__37554){
var map__37558 = p__37554;
var map__37558__$1 = ((((!((map__37558 == null)))?((((map__37558.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37558.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37558):map__37558);
var state = map__37558__$1;
var stack = cljs.core.get.call(null,map__37558__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var delim_trail = cljs.core.get.call(null,map__37558__$1,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762));
var backup = cljs.core.get.call(null,map__37558__$1,new cljs.core.Keyword(null,"backup","backup",26347393));
var x_pos = cljs.core.get.call(null,map__37558__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var ch = cljs.core.get.call(null,map__37558__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
var cursor_line = cljs.core.get.call(null,map__37558__$1,new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007));
var line_no = cljs.core.get.call(null,map__37558__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var cursor_x = cljs.core.get.call(null,map__37558__$1,new cljs.core.Keyword(null,"cursor-x","cursor-x",475204266));
var cursor_in_comment_QMARK_ = cljs.core.get.call(null,map__37558__$1,new cljs.core.Keyword(null,"cursor-in-comment?","cursor-in-comment?",1676951135));
var pass_char_QMARK_ = (function (){var or__16267__auto__ = cljs.core._EQ_.call(null,";",ch);
if(or__16267__auto__){
return or__16267__auto__;
} else {
var or__16267__auto____$1 = parinfer.format.reader.whitespace_QMARK_.call(null,ch);
if(cljs.core.truth_(or__16267__auto____$1)){
return or__16267__auto____$1;
} else {
return parinfer.format.reader.closing_delim_QMARK_.call(null,ch);
}
}
})();
var reset_QMARK_ = (cljs.core.truth_(parinfer.format.reader.in_code_QMARK_.call(null,stack))?(function (){var or__16267__auto__ = parinfer.format.reader.escaping_QMARK_.call(null,stack);
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return cljs.core.not.call(null,pass_char_QMARK_);
}
})():null);
var cursor_in_comment_QMARK___$1 = (function (){var or__16267__auto__ = cursor_in_comment_QMARK_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
var and__16255__auto__ = cljs.core._EQ_.call(null,cursor_line,line_no);
if(and__16255__auto__){
var and__16255__auto____$1 = cljs.core._EQ_.call(null,x_pos,cursor_x);
if(and__16255__auto____$1){
return parinfer.format.reader.in_comment_QMARK_.call(null,stack);
} else {
return and__16255__auto____$1;
}
} else {
return and__16255__auto__;
}
}
})();
var update_QMARK_ = (function (){var and__16255__auto__ = parinfer.format.reader.in_code_QMARK_.call(null,stack);
if(cljs.core.truth_(and__16255__auto__)){
var and__16255__auto____$1 = cljs.core.not.call(null,parinfer.format.reader.escaping_QMARK_.call(null,stack));
if(and__16255__auto____$1){
var and__16255__auto____$2 = parinfer.format.reader.closing_delim_QMARK_.call(null,ch);
if(cljs.core.truth_(and__16255__auto____$2)){
return parinfer.format.reader.valid_closer_QMARK_.call(null,stack,ch);
} else {
return and__16255__auto____$2;
}
} else {
return and__16255__auto____$1;
}
} else {
return and__16255__auto__;
}
})();
var backup__$1 = (function (){var G__37560 = backup;
var G__37560__$1 = (cljs.core.truth_(reset_QMARK_)?cljs.core.empty.call(null,G__37560):G__37560);
return G__37560__$1;
})();
var delim_trail__$1 = (cljs.core.truth_(reset_QMARK_)?cljs.core.PersistentArrayMap.EMPTY:(cljs.core.truth_(update_QMARK_)?cljs.core.assoc.call(null,cljs.core.update_in.call(null,delim_trail,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"start","start",-355208981)], null),((function (pass_char_QMARK_,reset_QMARK_,cursor_in_comment_QMARK___$1,update_QMARK_,backup__$1,map__37558,map__37558__$1,state,stack,delim_trail,backup,x_pos,ch,cursor_line,line_no,cursor_x,cursor_in_comment_QMARK_){
return (function (p1__37553_SHARP_){
var or__16267__auto__ = p1__37553_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return x_pos;
}
});})(pass_char_QMARK_,reset_QMARK_,cursor_in_comment_QMARK___$1,update_QMARK_,backup__$1,map__37558,map__37558__$1,state,stack,delim_trail,backup,x_pos,ch,cursor_line,line_no,cursor_x,cursor_in_comment_QMARK_))
),new cljs.core.Keyword(null,"end","end",-268185958),(x_pos + (1))):delim_trail
));
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"cursor-in-comment?","cursor-in-comment?",1676951135),cursor_in_comment_QMARK___$1,new cljs.core.Keyword(null,"backup","backup",26347393),backup__$1,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762),delim_trail__$1);
});
/**
 * The presence of the cursor can block the removal of some part of the delim trail.
 */
parinfer.format.infer.block_delim_trail = (function parinfer$format$infer$block_delim_trail(p__37561){
var map__37569 = p__37561;
var map__37569__$1 = ((((!((map__37569 == null)))?((((map__37569.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37569.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37569):map__37569);
var state = map__37569__$1;
var delim_trail = cljs.core.get.call(null,map__37569__$1,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762));
var line_no = cljs.core.get.call(null,map__37569__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var cursor_line = cljs.core.get.call(null,map__37569__$1,new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007));
var cursor_x = cljs.core.get.call(null,map__37569__$1,new cljs.core.Keyword(null,"cursor-x","cursor-x",475204266));
var cursor_in_comment_QMARK_ = cljs.core.get.call(null,map__37569__$1,new cljs.core.Keyword(null,"cursor-in-comment?","cursor-in-comment?",1676951135));
var map__37571 = delim_trail;
var map__37571__$1 = ((((!((map__37571 == null)))?((((map__37571.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37571.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37571):map__37571);
var start = cljs.core.get.call(null,map__37571__$1,new cljs.core.Keyword(null,"start","start",-355208981));
var end = cljs.core.get.call(null,map__37571__$1,new cljs.core.Keyword(null,"end","end",-268185958));
var cursor_block_QMARK_ = (function (){var and__16255__auto__ = cljs.core._EQ_.call(null,line_no,cursor_line);
if(and__16255__auto__){
var and__16255__auto____$1 = start;
if(cljs.core.truth_(and__16255__auto____$1)){
return ((cursor_x > start)) && (cljs.core.not.call(null,cursor_in_comment_QMARK_));
} else {
return and__16255__auto____$1;
}
} else {
return and__16255__auto__;
}
})();
var start__$1 = (function (){var G__37574 = start;
var G__37574__$1 = (cljs.core.truth_((function (){var and__16255__auto__ = start;
if(cljs.core.truth_(and__16255__auto__)){
return cursor_block_QMARK_;
} else {
return and__16255__auto__;
}
})())?(function (){var x__16598__auto__ = G__37574;
var y__16599__auto__ = cursor_x;
return ((x__16598__auto__ > y__16599__auto__) ? x__16598__auto__ : y__16599__auto__);
})():G__37574);
return G__37574__$1;
})();
var end__$1 = (function (){var G__37575 = end;
var G__37575__$1 = (cljs.core.truth_((function (){var and__16255__auto__ = end;
if(cljs.core.truth_(and__16255__auto__)){
return cursor_block_QMARK_;
} else {
return and__16255__auto__;
}
})())?(function (){var x__16598__auto__ = G__37575;
var y__16599__auto__ = cursor_x;
return ((x__16598__auto__ > y__16599__auto__) ? x__16598__auto__ : y__16599__auto__);
})():G__37575);
return G__37575__$1;
})();
var vec__37572 = ((cljs.core._EQ_.call(null,start__$1,end__$1))?null:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start__$1,end__$1], null));
var start__$2 = cljs.core.nth.call(null,vec__37572,(0),null);
var end__$2 = cljs.core.nth.call(null,vec__37572,(1),null);
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",-355208981),start__$2,new cljs.core.Keyword(null,"end","end",-268185958),end__$2], null));
});
/**
 * Update the state by removing our marked delim trail.
 *   We remove the delims from the appropriate line of text,
 *   while also restoring their matching delims onto the stack.
 * 
 *   Example:
 *   
 *   (foo (+ 2 3) [(bar)] )    ;; a potential comment
 *   ^            ^^   ^^^^
 *   |            |     |
 *   |____________|     +-- Remove these from the text.
 *       |
 *       +-- Restore these onto the delim stack.
 *           (fyi, we originally popped them off to validate
 *            the closing delims. now we need them back to
 *            infer closing delims for indented lines.)
 *   
 */
parinfer.format.infer.remove_delim_trail = (function parinfer$format$infer$remove_delim_trail(p__37576){
var map__37583 = p__37576;
var map__37583__$1 = ((((!((map__37583 == null)))?((((map__37583.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37583.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37583):map__37583);
var state = map__37583__$1;
var delim_trail = cljs.core.get.call(null,map__37583__$1,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762));
var insert = cljs.core.get.call(null,map__37583__$1,new cljs.core.Keyword(null,"insert","insert",1286475395));
var line_no = cljs.core.get.call(null,map__37583__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var lines = cljs.core.get.call(null,map__37583__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var backup = cljs.core.get.call(null,map__37583__$1,new cljs.core.Keyword(null,"backup","backup",26347393));
var stack = cljs.core.get.call(null,map__37583__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var map__37585 = delim_trail;
var map__37585__$1 = ((((!((map__37585 == null)))?((((map__37585.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37585.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37585):map__37585);
var start = cljs.core.get.call(null,map__37585__$1,new cljs.core.Keyword(null,"start","start",-355208981));
var end = cljs.core.get.call(null,map__37585__$1,new cljs.core.Keyword(null,"end","end",-268185958));
if(cljs.core.truth_((function (){var and__16255__auto__ = start;
if(cljs.core.truth_(and__16255__auto__)){
return end;
} else {
return and__16255__auto__;
}
})())){
var line = cljs.core.get.call(null,lines,line_no);
var delims = cljs.core.filter.call(null,parinfer.format.reader.closing_delim_QMARK_,cljs.core.map.call(null,cljs.core.str,cljs.core.subs.call(null,line,start,end)));
var remove_count = cljs.core.count.call(null,delims);
var ignore_count = (cljs.core.count.call(null,backup) - remove_count);
var vec__37587 = (function (){var backup__$1 = backup;
var stack__$1 = stack;
while(true){
if(cljs.core._EQ_.call(null,ignore_count,cljs.core.count.call(null,backup__$1))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [backup__$1,stack__$1], null);
} else {
var G__37589 = cljs.core.pop.call(null,backup__$1);
var G__37590 = cljs.core.conj.call(null,stack__$1,cljs.core.peek.call(null,backup__$1));
backup__$1 = G__37589;
stack__$1 = G__37590;
continue;
}
break;
}
})();
var backup__$1 = cljs.core.nth.call(null,vec__37587,(0),null);
var stack__$1 = cljs.core.nth.call(null,vec__37587,(1),null);
var state__$1 = cljs.core.assoc.call(null,cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lines","lines",-700165781),line_no], null),parinfer.format.string.remove_str_range,start,end),new cljs.core.Keyword(null,"backup","backup",26347393),backup__$1,new cljs.core.Keyword(null,"stack","stack",-793405930),stack__$1,new cljs.core.Keyword(null,"removed-delims","removed-delims",137127226),delims);
var insert_line_QMARK_ = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"line-no","line-no",-666819466).cljs$core$IFn$_invoke$arity$1(insert),line_no);
var state__$2 = (function (){var G__37588 = state__$1;
var G__37588__$1 = ((insert_line_QMARK_)?cljs.core.update_in.call(null,G__37588,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"insert","insert",1286475395),new cljs.core.Keyword(null,"x-pos","x-pos",-382213783)], null),cljs.core.min,start):G__37588);
return G__37588__$1;
})();
return state__$2;
} else {
return state;
}
});
/**
 * Update the state's trailing delimiter insertion point as we scan the line.
 *   
 *   Example:
 *   
 *   (defn foo [a b] ret)
 *   ^^^^^ ^^^ ^^ ^  ^^^
 *                  |
 *                  +-- final insertion point candidate
 * 
 *   Special rules allow the user to freely position the trailing
 *   delimiters while editing a line.
 * 
 *   
 */
parinfer.format.infer.update_insertion_pt = (function parinfer$format$infer$update_insertion_pt(p__37591){
var map__37595 = p__37591;
var map__37595__$1 = ((((!((map__37595 == null)))?((((map__37595.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37595.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37595):map__37595);
var state = map__37595__$1;
var track_indent_QMARK_ = cljs.core.get.call(null,map__37595__$1,new cljs.core.Keyword(null,"track-indent?","track-indent?",-1967553136));
var cursor_line = cljs.core.get.call(null,map__37595__$1,new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007));
var lines = cljs.core.get.call(null,map__37595__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var line_no = cljs.core.get.call(null,map__37595__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var stack = cljs.core.get.call(null,map__37595__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var x_pos = cljs.core.get.call(null,map__37595__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var ch = cljs.core.get.call(null,map__37595__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
var prev_ch = [cljs.core.str(cljs.core.last.call(null,cljs.core.get.call(null,lines,line_no)))].join('');
var insert_at_char_QMARK_ = (function (){var and__16255__auto__ = parinfer.format.reader.in_code_QMARK_.call(null,stack);
if(cljs.core.truth_(and__16255__auto__)){
return (cljs.core.not_EQ_.call(null,"",ch)) && ((cljs.core.not.call(null,parinfer.format.reader.whitespace_QMARK_.call(null,ch))) || (cljs.core._EQ_.call(null,"\\",prev_ch))) && ((cljs.core.not.call(null,parinfer.format.reader.closing_delim_QMARK_.call(null,ch))) || (cljs.core._EQ_.call(null,line_no,cursor_line)));
} else {
return and__16255__auto__;
}
})();
var insert = (cljs.core.truth_(insert_at_char_QMARK_)?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line-no","line-no",-666819466),line_no,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),(x_pos + (1))], null):null);
var G__37597 = state;
var G__37597__$1 = (cljs.core.truth_(insert)?cljs.core.assoc.call(null,G__37597,new cljs.core.Keyword(null,"insert","insert",1286475395),insert):G__37597);
return G__37597__$1;
});
/**
 * Update the state by handling a possible indentation trigger.
 * 
 *   Example:
 *   
 *   (defn foo [a b
 *   ret           ;; <---  When we process `r`, we detect indentation, then
 *                 ;;       we start backtracking to insert closing delimiters on a previous line.
 * 
 * 
 *   (defn foo [a b]
 *   )             ;; <---  If a line starts with a closing delimiter, it is not
 *                 ;;       considered an indentation trigger.  In fact, we skip
 *                 ;;       the character completely, removing it from the line.
 *   
 */
parinfer.format.infer.process_indent = (function parinfer$format$infer$process_indent(p__37598){
var map__37602 = p__37598;
var map__37602__$1 = ((((!((map__37602 == null)))?((((map__37602.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37602.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37602):map__37602);
var state = map__37602__$1;
var stack = cljs.core.get.call(null,map__37602__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var track_indent_QMARK_ = cljs.core.get.call(null,map__37602__$1,new cljs.core.Keyword(null,"track-indent?","track-indent?",-1967553136));
var lines = cljs.core.get.call(null,map__37602__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var line_no = cljs.core.get.call(null,map__37602__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var x_pos = cljs.core.get.call(null,map__37602__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var ch = cljs.core.get.call(null,map__37602__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
var check_indent_QMARK_ = (function (){var and__16255__auto__ = track_indent_QMARK_;
if(cljs.core.truth_(and__16255__auto__)){
var and__16255__auto____$1 = parinfer.format.reader.in_code_QMARK_.call(null,stack);
if(cljs.core.truth_(and__16255__auto____$1)){
return (cljs.core.not.call(null,parinfer.format.reader.whitespace_QMARK_.call(null,ch))) && (cljs.core.not_EQ_.call(null,";",ch));
} else {
return and__16255__auto____$1;
}
} else {
return and__16255__auto__;
}
})();
var skip_QMARK_ = (function (){var and__16255__auto__ = check_indent_QMARK_;
if(cljs.core.truth_(and__16255__auto__)){
return parinfer.format.reader.closing_delim_QMARK_.call(null,ch);
} else {
return and__16255__auto__;
}
})();
var at_indent_QMARK_ = (function (){var and__16255__auto__ = check_indent_QMARK_;
if(cljs.core.truth_(and__16255__auto__)){
return cljs.core.not.call(null,skip_QMARK_);
} else {
return and__16255__auto__;
}
})();
var state__$1 = cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"process?","process?",-106844121),cljs.core.not.call(null,skip_QMARK_));
var G__37604 = state__$1;
var G__37604__$1 = (cljs.core.truth_(at_indent_QMARK_)?parinfer.format.infer.close_delims.call(null,G__37604,x_pos):G__37604);
return G__37604__$1;
});
/**
 * Update the state by addding processed character to the line.
 */
parinfer.format.infer.update_line = (function parinfer$format$infer$update_line(p__37605){
var map__37608 = p__37605;
var map__37608__$1 = ((((!((map__37608 == null)))?((((map__37608.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37608.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37608):map__37608);
var state = map__37608__$1;
var ch = cljs.core.get.call(null,map__37608__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
var line_no = cljs.core.get.call(null,map__37608__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
return cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lines","lines",-700165781),line_no], null),cljs.core.str,ch);
});
parinfer.format.infer.process_char_STAR_ = (function parinfer$format$infer$process_char_STAR_(state){
return parinfer.format.infer.update_line.call(null,parinfer.format.infer.update_insertion_pt.call(null,parinfer.format.reader.push_char.call(null,parinfer.format.infer.update_delim_trail.call(null,state))));
});
/**
 * Update the state by processing the given character and its position.
 */
parinfer.format.infer.process_char = (function parinfer$format$infer$process_char(p__37610,ch){
var map__37614 = p__37610;
var map__37614__$1 = ((((!((map__37614 == null)))?((((map__37614.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37614.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37614):map__37614);
var state = map__37614__$1;
var lines = cljs.core.get.call(null,map__37614__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var line_no = cljs.core.get.call(null,map__37614__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var x_pos = cljs.core.count.call(null,cljs.core.get.call(null,lines,line_no));
var state__$1 = cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),x_pos,new cljs.core.Keyword(null,"ch","ch",-554717905),[cljs.core.str(ch)].join(''));
var state__$2 = parinfer.format.infer.process_indent.call(null,state__$1);
var G__37616 = state__$2;
var G__37616__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"process?","process?",-106844121).cljs$core$IFn$_invoke$arity$1(state__$2))?parinfer.format.infer.process_char_STAR_.call(null,G__37616):G__37616);
return G__37616__$1;
});
/**
 * Update the state by processing the given line of text.
 */
parinfer.format.infer.process_line = (function parinfer$format$infer$process_line(var_args){
var args37617 = [];
var len__17325__auto___37623 = arguments.length;
var i__17326__auto___37624 = (0);
while(true){
if((i__17326__auto___37624 < len__17325__auto___37623)){
args37617.push((arguments[i__17326__auto___37624]));

var G__37625 = (i__17326__auto___37624 + (1));
i__17326__auto___37624 = G__37625;
continue;
} else {
}
break;
}

var G__37619 = args37617.length;
switch (G__37619) {
case 1:
return parinfer.format.infer.process_line.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.format.infer.process_line.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37617.length)].join('')));

}
});

parinfer.format.infer.process_line.cljs$core$IFn$_invoke$arity$1 = (function (line){
return parinfer.format.infer.process_line.call(null,parinfer.format.infer.initial_state,line);
});

parinfer.format.infer.process_line.cljs$core$IFn$_invoke$arity$2 = (function (p__37620,line){
var map__37621 = p__37620;
var map__37621__$1 = ((((!((map__37621 == null)))?((((map__37621.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37621.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37621):map__37621);
var state = map__37621__$1;
var stack = cljs.core.get.call(null,map__37621__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var lines = cljs.core.get.call(null,map__37621__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var line_no = cljs.core.get.call(null,map__37621__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var cursor_line = cljs.core.get.call(null,map__37621__$1,new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007));
var line_no__$1 = (line_no + (1));
var state__$1 = cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"backup","backup",26347393),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"cursor-in-comment?","cursor-in-comment?",1676951135),false,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",-355208981),null,new cljs.core.Keyword(null,"end","end",-268185958),null], null),new cljs.core.Keyword(null,"track-indent?","track-indent?",-1967553136),(cljs.core.seq.call(null,stack)) && (cljs.core.not.call(null,parinfer.format.reader.in_str_QMARK_.call(null,stack))),new cljs.core.Keyword(null,"lines","lines",-700165781),cljs.core.conj.call(null,lines,""),new cljs.core.Keyword(null,"line-no","line-no",-666819466),line_no__$1,new cljs.core.Keyword(null,"removed-delims","removed-delims",137127226),cljs.core.PersistentVector.EMPTY);
var state__$2 = cljs.core.reduce.call(null,parinfer.format.infer.process_char,state__$1,[cljs.core.str(line),cljs.core.str("\n")].join(''));
var state__$3 = parinfer.format.infer.remove_delim_trail.call(null,parinfer.format.infer.block_delim_trail.call(null,state__$2));
return state__$3;
});

parinfer.format.infer.process_line.cljs$lang$maxFixedArity = 2;
/**
 * Update the state by processing the given text.
 */
parinfer.format.infer.process_text = (function parinfer$format$infer$process_text(var_args){
var args37627 = [];
var len__17325__auto___37631 = arguments.length;
var i__17326__auto___37632 = (0);
while(true){
if((i__17326__auto___37632 < len__17325__auto___37631)){
args37627.push((arguments[i__17326__auto___37632]));

var G__37633 = (i__17326__auto___37632 + (1));
i__17326__auto___37632 = G__37633;
continue;
} else {
}
break;
}

var G__37629 = args37627.length;
switch (G__37629) {
case 1:
return parinfer.format.infer.process_text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.format.infer.process_text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37627.length)].join('')));

}
});

parinfer.format.infer.process_text.cljs$core$IFn$_invoke$arity$1 = (function (text){
return parinfer.format.infer.process_text.call(null,parinfer.format.infer.initial_state,text);
});

parinfer.format.infer.process_text.cljs$core$IFn$_invoke$arity$2 = (function (state,text){
var state__$1 = cljs.core.merge.call(null,parinfer.format.infer.initial_state,state);
var lines = parinfer.format.string.get_lines.call(null,text);
var state__$2 = cljs.core.reduce.call(null,parinfer.format.infer.process_line,state__$1,lines);
var stack = new cljs.core.Keyword(null,"stack","stack",-793405930).cljs$core$IFn$_invoke$arity$1(state__$2);
if(cljs.core.truth_(parinfer.format.reader.in_str_QMARK_.call(null,stack))){
return null;
} else {
var G__37630 = state__$2;
var G__37630__$1 = ((cljs.core.seq.call(null,stack))?parinfer.format.infer.close_delims.call(null,G__37630):G__37630);
return G__37630__$1;
}
});

parinfer.format.infer.process_text.cljs$lang$maxFixedArity = 2;
/**
 * Format the given text by repositioning any trailing closing delimiters based on indentation.
 */
parinfer.format.infer.format_text = (function parinfer$format$infer$format_text(var_args){
var args37635 = [];
var len__17325__auto___37638 = arguments.length;
var i__17326__auto___37639 = (0);
while(true){
if((i__17326__auto___37639 < len__17325__auto___37638)){
args37635.push((arguments[i__17326__auto___37639]));

var G__37640 = (i__17326__auto___37639 + (1));
i__17326__auto___37639 = G__37640;
continue;
} else {
}
break;
}

var G__37637 = args37635.length;
switch (G__37637) {
case 1:
return parinfer.format.infer.format_text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.format.infer.format_text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37635.length)].join('')));

}
});

parinfer.format.infer.format_text.cljs$core$IFn$_invoke$arity$1 = (function (text){
return parinfer.format.infer.format_text.call(null,parinfer.format.infer.initial_state,text);
});

parinfer.format.infer.format_text.cljs$core$IFn$_invoke$arity$2 = (function (state,text){
var temp__4423__auto__ = parinfer.format.infer.process_text.call(null,state,text);
if(cljs.core.truth_(temp__4423__auto__)){
var state__$1 = temp__4423__auto__;
return clojure.string.join.call(null,"\n",new cljs.core.Keyword(null,"lines","lines",-700165781).cljs$core$IFn$_invoke$arity$1(state__$1));
} else {
return text;
}
});

parinfer.format.infer.format_text.cljs$lang$maxFixedArity = 2;

//# sourceMappingURL=infer.js.map?rel=1445823441139