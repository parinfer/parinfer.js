// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer.format.infer');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('parinfer.format.string');
goog.require('parinfer.format.reader');
/**
 * An initial state of our running state.
 */
parinfer.format.infer.initial_state = new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"lines","lines",-700165781),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"postline-states","postline-states",1667653678),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"line-no","line-no",-666819466),(-1),new cljs.core.Keyword(null,"track-indent?","track-indent?",-1967553136),false,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",-355208981),null,new cljs.core.Keyword(null,"end","end",-268185958),null], null),new cljs.core.Keyword(null,"insert","insert",1286475395),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line-no","line-no",-666819466),null,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),null], null),new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"backup","backup",26347393),cljs.core.PersistentVector.EMPTY], null);
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
var args46768 = [];
var len__17325__auto___46776 = arguments.length;
var i__17326__auto___46777 = (0);
while(true){
if((i__17326__auto___46777 < len__17325__auto___46776)){
args46768.push((arguments[i__17326__auto___46777]));

var G__46778 = (i__17326__auto___46777 + (1));
i__17326__auto___46777 = G__46778;
continue;
} else {
}
break;
}

var G__46770 = args46768.length;
switch (G__46770) {
case 1:
return parinfer.format.infer.close_delims.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.format.infer.close_delims.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args46768.length)].join('')));

}
});

parinfer.format.infer.close_delims.cljs$core$IFn$_invoke$arity$1 = (function (state){
return parinfer.format.infer.close_delims.call(null,state,(0));
});

parinfer.format.infer.close_delims.cljs$core$IFn$_invoke$arity$2 = (function (state,indent_x){
var vec__46771 = (function (){var stack = new cljs.core.Keyword(null,"stack","stack",-793405930).cljs$core$IFn$_invoke$arity$1(state);
var delims = "";
while(true){
if(cljs.core.not.call(null,cljs.core.seq.call(null,stack))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [stack,delims], null);
} else {
var map__46773 = cljs.core.peek.call(null,stack);
var map__46773__$1 = ((((!((map__46773 == null)))?((((map__46773.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46773.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46773):map__46773);
var x_pos = cljs.core.get.call(null,map__46773__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var ch = cljs.core.get.call(null,map__46773__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
if((x_pos >= indent_x)){
var G__46780 = cljs.core.pop.call(null,stack);
var G__46781 = [cljs.core.str(delims),cljs.core.str(parinfer.format.reader.matching_delim.call(null,ch))].join('');
stack = G__46780;
delims = G__46781;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [stack,delims], null);
}
}
break;
}
})();
var stack = cljs.core.nth.call(null,vec__46771,(0),null);
var delims = cljs.core.nth.call(null,vec__46771,(1),null);
var map__46772 = new cljs.core.Keyword(null,"insert","insert",1286475395).cljs$core$IFn$_invoke$arity$1(state);
var map__46772__$1 = ((((!((map__46772 == null)))?((((map__46772.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46772.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46772):map__46772);
var line_no = cljs.core.get.call(null,map__46772__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var x_pos = cljs.core.get.call(null,map__46772__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
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
parinfer.format.infer.update_delim_trail = (function parinfer$format$infer$update_delim_trail(p__46783){
var map__46787 = p__46783;
var map__46787__$1 = ((((!((map__46787 == null)))?((((map__46787.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46787.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46787):map__46787);
var state = map__46787__$1;
var stack = cljs.core.get.call(null,map__46787__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var delim_trail = cljs.core.get.call(null,map__46787__$1,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762));
var backup = cljs.core.get.call(null,map__46787__$1,new cljs.core.Keyword(null,"backup","backup",26347393));
var x_pos = cljs.core.get.call(null,map__46787__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var ch = cljs.core.get.call(null,map__46787__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
var cursor_line = cljs.core.get.call(null,map__46787__$1,new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007));
var line_no = cljs.core.get.call(null,map__46787__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var cursor_x = cljs.core.get.call(null,map__46787__$1,new cljs.core.Keyword(null,"cursor-x","cursor-x",475204266));
var cursor_in_comment_QMARK_ = cljs.core.get.call(null,map__46787__$1,new cljs.core.Keyword(null,"cursor-in-comment?","cursor-in-comment?",1676951135));
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
var backup__$1 = (function (){var G__46789 = backup;
var G__46789__$1 = (cljs.core.truth_(reset_QMARK_)?cljs.core.empty.call(null,G__46789):G__46789);
return G__46789__$1;
})();
var delim_trail__$1 = (cljs.core.truth_(reset_QMARK_)?cljs.core.PersistentArrayMap.EMPTY:(cljs.core.truth_(update_QMARK_)?cljs.core.assoc.call(null,cljs.core.update_in.call(null,delim_trail,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"start","start",-355208981)], null),((function (pass_char_QMARK_,reset_QMARK_,cursor_in_comment_QMARK___$1,update_QMARK_,backup__$1,map__46787,map__46787__$1,state,stack,delim_trail,backup,x_pos,ch,cursor_line,line_no,cursor_x,cursor_in_comment_QMARK_){
return (function (p1__46782_SHARP_){
var or__16267__auto__ = p1__46782_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return x_pos;
}
});})(pass_char_QMARK_,reset_QMARK_,cursor_in_comment_QMARK___$1,update_QMARK_,backup__$1,map__46787,map__46787__$1,state,stack,delim_trail,backup,x_pos,ch,cursor_line,line_no,cursor_x,cursor_in_comment_QMARK_))
),new cljs.core.Keyword(null,"end","end",-268185958),(x_pos + (1))):delim_trail
));
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"cursor-in-comment?","cursor-in-comment?",1676951135),cursor_in_comment_QMARK___$1,new cljs.core.Keyword(null,"backup","backup",26347393),backup__$1,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762),delim_trail__$1);
});
/**
 * The presence of the cursor can block the removal of some part of the delim trail.
 */
parinfer.format.infer.block_delim_trail = (function parinfer$format$infer$block_delim_trail(p__46790){
var map__46798 = p__46790;
var map__46798__$1 = ((((!((map__46798 == null)))?((((map__46798.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46798.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46798):map__46798);
var state = map__46798__$1;
var delim_trail = cljs.core.get.call(null,map__46798__$1,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762));
var line_no = cljs.core.get.call(null,map__46798__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var cursor_line = cljs.core.get.call(null,map__46798__$1,new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007));
var cursor_x = cljs.core.get.call(null,map__46798__$1,new cljs.core.Keyword(null,"cursor-x","cursor-x",475204266));
var cursor_in_comment_QMARK_ = cljs.core.get.call(null,map__46798__$1,new cljs.core.Keyword(null,"cursor-in-comment?","cursor-in-comment?",1676951135));
var map__46800 = delim_trail;
var map__46800__$1 = ((((!((map__46800 == null)))?((((map__46800.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46800.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46800):map__46800);
var start = cljs.core.get.call(null,map__46800__$1,new cljs.core.Keyword(null,"start","start",-355208981));
var end = cljs.core.get.call(null,map__46800__$1,new cljs.core.Keyword(null,"end","end",-268185958));
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
var start__$1 = (function (){var G__46803 = start;
var G__46803__$1 = (cljs.core.truth_((function (){var and__16255__auto__ = start;
if(cljs.core.truth_(and__16255__auto__)){
return cursor_block_QMARK_;
} else {
return and__16255__auto__;
}
})())?(function (){var x__16598__auto__ = G__46803;
var y__16599__auto__ = cursor_x;
return ((x__16598__auto__ > y__16599__auto__) ? x__16598__auto__ : y__16599__auto__);
})():G__46803);
return G__46803__$1;
})();
var end__$1 = (function (){var G__46804 = end;
var G__46804__$1 = (cljs.core.truth_((function (){var and__16255__auto__ = end;
if(cljs.core.truth_(and__16255__auto__)){
return cursor_block_QMARK_;
} else {
return and__16255__auto__;
}
})())?(function (){var x__16598__auto__ = G__46804;
var y__16599__auto__ = cursor_x;
return ((x__16598__auto__ > y__16599__auto__) ? x__16598__auto__ : y__16599__auto__);
})():G__46804);
return G__46804__$1;
})();
var vec__46801 = ((cljs.core._EQ_.call(null,start__$1,end__$1))?null:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start__$1,end__$1], null));
var start__$2 = cljs.core.nth.call(null,vec__46801,(0),null);
var end__$2 = cljs.core.nth.call(null,vec__46801,(1),null);
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
parinfer.format.infer.remove_delim_trail = (function parinfer$format$infer$remove_delim_trail(p__46805){
var map__46812 = p__46805;
var map__46812__$1 = ((((!((map__46812 == null)))?((((map__46812.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46812.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46812):map__46812);
var state = map__46812__$1;
var delim_trail = cljs.core.get.call(null,map__46812__$1,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762));
var insert = cljs.core.get.call(null,map__46812__$1,new cljs.core.Keyword(null,"insert","insert",1286475395));
var line_no = cljs.core.get.call(null,map__46812__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var lines = cljs.core.get.call(null,map__46812__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var backup = cljs.core.get.call(null,map__46812__$1,new cljs.core.Keyword(null,"backup","backup",26347393));
var stack = cljs.core.get.call(null,map__46812__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var map__46814 = delim_trail;
var map__46814__$1 = ((((!((map__46814 == null)))?((((map__46814.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46814.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46814):map__46814);
var start = cljs.core.get.call(null,map__46814__$1,new cljs.core.Keyword(null,"start","start",-355208981));
var end = cljs.core.get.call(null,map__46814__$1,new cljs.core.Keyword(null,"end","end",-268185958));
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
var vec__46816 = (function (){var backup__$1 = backup;
var stack__$1 = stack;
while(true){
if(cljs.core._EQ_.call(null,ignore_count,cljs.core.count.call(null,backup__$1))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [backup__$1,stack__$1], null);
} else {
var G__46818 = cljs.core.pop.call(null,backup__$1);
var G__46819 = cljs.core.conj.call(null,stack__$1,cljs.core.peek.call(null,backup__$1));
backup__$1 = G__46818;
stack__$1 = G__46819;
continue;
}
break;
}
})();
var backup__$1 = cljs.core.nth.call(null,vec__46816,(0),null);
var stack__$1 = cljs.core.nth.call(null,vec__46816,(1),null);
var state__$1 = cljs.core.assoc.call(null,cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lines","lines",-700165781),line_no], null),parinfer.format.string.remove_str_range,start,end),new cljs.core.Keyword(null,"backup","backup",26347393),backup__$1,new cljs.core.Keyword(null,"stack","stack",-793405930),stack__$1,new cljs.core.Keyword(null,"removed-delims","removed-delims",137127226),delims);
var insert_line_QMARK_ = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"line-no","line-no",-666819466).cljs$core$IFn$_invoke$arity$1(insert),line_no);
var state__$2 = (function (){var G__46817 = state__$1;
var G__46817__$1 = ((insert_line_QMARK_)?cljs.core.update_in.call(null,G__46817,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"insert","insert",1286475395),new cljs.core.Keyword(null,"x-pos","x-pos",-382213783)], null),cljs.core.min,start):G__46817);
return G__46817__$1;
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
parinfer.format.infer.update_insertion_pt = (function parinfer$format$infer$update_insertion_pt(p__46820){
var map__46824 = p__46820;
var map__46824__$1 = ((((!((map__46824 == null)))?((((map__46824.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46824.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46824):map__46824);
var state = map__46824__$1;
var track_indent_QMARK_ = cljs.core.get.call(null,map__46824__$1,new cljs.core.Keyword(null,"track-indent?","track-indent?",-1967553136));
var cursor_line = cljs.core.get.call(null,map__46824__$1,new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007));
var lines = cljs.core.get.call(null,map__46824__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var line_no = cljs.core.get.call(null,map__46824__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var stack = cljs.core.get.call(null,map__46824__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var x_pos = cljs.core.get.call(null,map__46824__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var ch = cljs.core.get.call(null,map__46824__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
var prev_ch = [cljs.core.str(cljs.core.last.call(null,cljs.core.get.call(null,lines,line_no)))].join('');
var insert_at_char_QMARK_ = (function (){var and__16255__auto__ = parinfer.format.reader.in_code_QMARK_.call(null,stack);
if(cljs.core.truth_(and__16255__auto__)){
return (cljs.core.not_EQ_.call(null,"",ch)) && ((cljs.core.not.call(null,parinfer.format.reader.whitespace_QMARK_.call(null,ch))) || (cljs.core._EQ_.call(null,"\\",prev_ch))) && ((cljs.core.not.call(null,parinfer.format.reader.closing_delim_QMARK_.call(null,ch))) || (cljs.core._EQ_.call(null,line_no,cursor_line)));
} else {
return and__16255__auto__;
}
})();
var insert = (cljs.core.truth_(insert_at_char_QMARK_)?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line-no","line-no",-666819466),line_no,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),(x_pos + (1))], null):null);
var G__46826 = state;
var G__46826__$1 = (cljs.core.truth_(insert)?cljs.core.assoc.call(null,G__46826,new cljs.core.Keyword(null,"insert","insert",1286475395),insert):G__46826);
return G__46826__$1;
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
parinfer.format.infer.process_indent = (function parinfer$format$infer$process_indent(p__46827){
var map__46831 = p__46827;
var map__46831__$1 = ((((!((map__46831 == null)))?((((map__46831.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46831.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46831):map__46831);
var state = map__46831__$1;
var stack = cljs.core.get.call(null,map__46831__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var track_indent_QMARK_ = cljs.core.get.call(null,map__46831__$1,new cljs.core.Keyword(null,"track-indent?","track-indent?",-1967553136));
var lines = cljs.core.get.call(null,map__46831__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var line_no = cljs.core.get.call(null,map__46831__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var x_pos = cljs.core.get.call(null,map__46831__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var ch = cljs.core.get.call(null,map__46831__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
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
var G__46833 = state__$1;
var G__46833__$1 = (cljs.core.truth_(at_indent_QMARK_)?parinfer.format.infer.close_delims.call(null,G__46833,x_pos):G__46833);
return G__46833__$1;
});
/**
 * Update the state by adding processed character to the line.
 */
parinfer.format.infer.update_line = (function parinfer$format$infer$update_line(p__46834){
var map__46837 = p__46834;
var map__46837__$1 = ((((!((map__46837 == null)))?((((map__46837.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46837.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46837):map__46837);
var state = map__46837__$1;
var ch = cljs.core.get.call(null,map__46837__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
var line_no = cljs.core.get.call(null,map__46837__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
return cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lines","lines",-700165781),line_no], null),cljs.core.str,ch);
});
/**
 * Save the text of a line before trailing delims were inserted.
 *   This allows to restore them when skipping to changed lines in
 *   process-text-change.
 */
parinfer.format.infer.save_preinsert_line = (function parinfer$format$infer$save_preinsert_line(p__46839){
var map__46843 = p__46839;
var map__46843__$1 = ((((!((map__46843 == null)))?((((map__46843.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46843.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46843):map__46843);
var state = map__46843__$1;
var line_no = cljs.core.get.call(null,map__46843__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var insert = cljs.core.get.call(null,map__46843__$1,new cljs.core.Keyword(null,"insert","insert",1286475395));
var lines = cljs.core.get.call(null,map__46843__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var G__46845 = state;
var G__46845__$1 = ((cljs.core._EQ_.call(null,line_no,new cljs.core.Keyword(null,"line-no","line-no",-666819466).cljs$core$IFn$_invoke$arity$1(insert)))?cljs.core.assoc_in.call(null,G__46845,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"insert","insert",1286475395),new cljs.core.Keyword(null,"line","line",212345235)], null),cljs.core.get.call(null,lines,line_no)):G__46845);
return G__46845__$1;
});
/**
 * Cache a subset of the state after the current line has been processed.
 *   This is used by process-text-change.
 */
parinfer.format.infer.cache_postline_state = (function parinfer$format$infer$cache_postline_state(state){
var cached = cljs.core.select_keys.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stack","stack",-793405930),new cljs.core.Keyword(null,"insert","insert",1286475395)], null));
return cljs.core.update.call(null,state,new cljs.core.Keyword(null,"postline-states","postline-states",1667653678),cljs.core.conj,cached);
});
parinfer.format.infer.process_char_STAR_ = (function parinfer$format$infer$process_char_STAR_(state){
return parinfer.format.infer.update_line.call(null,parinfer.format.infer.update_insertion_pt.call(null,parinfer.format.reader.push_char.call(null,parinfer.format.infer.update_delim_trail.call(null,state))));
});
/**
 * Update the state by processing the given character and its position.
 */
parinfer.format.infer.process_char = (function parinfer$format$infer$process_char(p__46846,ch){
var map__46850 = p__46846;
var map__46850__$1 = ((((!((map__46850 == null)))?((((map__46850.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46850.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46850):map__46850);
var state = map__46850__$1;
var lines = cljs.core.get.call(null,map__46850__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var line_no = cljs.core.get.call(null,map__46850__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var x_pos = cljs.core.count.call(null,cljs.core.get.call(null,lines,line_no));
var state__$1 = cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),x_pos,new cljs.core.Keyword(null,"ch","ch",-554717905),[cljs.core.str(ch)].join(''));
var state__$2 = parinfer.format.infer.process_indent.call(null,state__$1);
var G__46852 = state__$2;
var G__46852__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"process?","process?",-106844121).cljs$core$IFn$_invoke$arity$1(state__$2))?parinfer.format.infer.process_char_STAR_.call(null,G__46852):G__46852);
return G__46852__$1;
});
/**
 * Update the state by processing the given line of text.
 */
parinfer.format.infer.process_line = (function parinfer$format$infer$process_line(var_args){
var args46853 = [];
var len__17325__auto___46859 = arguments.length;
var i__17326__auto___46860 = (0);
while(true){
if((i__17326__auto___46860 < len__17325__auto___46859)){
args46853.push((arguments[i__17326__auto___46860]));

var G__46861 = (i__17326__auto___46860 + (1));
i__17326__auto___46860 = G__46861;
continue;
} else {
}
break;
}

var G__46855 = args46853.length;
switch (G__46855) {
case 1:
return parinfer.format.infer.process_line.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.format.infer.process_line.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args46853.length)].join('')));

}
});

parinfer.format.infer.process_line.cljs$core$IFn$_invoke$arity$1 = (function (line){
return parinfer.format.infer.process_line.call(null,parinfer.format.infer.initial_state,line);
});

parinfer.format.infer.process_line.cljs$core$IFn$_invoke$arity$2 = (function (p__46856,line){
var map__46857 = p__46856;
var map__46857__$1 = ((((!((map__46857 == null)))?((((map__46857.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46857.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46857):map__46857);
var state = map__46857__$1;
var stack = cljs.core.get.call(null,map__46857__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var lines = cljs.core.get.call(null,map__46857__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var line_no = cljs.core.get.call(null,map__46857__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var cursor_line = cljs.core.get.call(null,map__46857__$1,new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007));
var line_no__$1 = (line_no + (1));
var state__$1 = cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"backup","backup",26347393),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"cursor-in-comment?","cursor-in-comment?",1676951135),false,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",-355208981),null,new cljs.core.Keyword(null,"end","end",-268185958),null], null),new cljs.core.Keyword(null,"track-indent?","track-indent?",-1967553136),(cljs.core.seq.call(null,stack)) && (cljs.core.not.call(null,parinfer.format.reader.in_str_QMARK_.call(null,stack))),new cljs.core.Keyword(null,"lines","lines",-700165781),cljs.core.conj.call(null,lines,""),new cljs.core.Keyword(null,"line-no","line-no",-666819466),line_no__$1,new cljs.core.Keyword(null,"removed-delims","removed-delims",137127226),cljs.core.PersistentVector.EMPTY);
var state__$2 = cljs.core.reduce.call(null,parinfer.format.infer.process_char,state__$1,[cljs.core.str(line),cljs.core.str("\n")].join(''));
var state__$3 = parinfer.format.infer.cache_postline_state.call(null,parinfer.format.infer.save_preinsert_line.call(null,parinfer.format.infer.remove_delim_trail.call(null,parinfer.format.infer.block_delim_trail.call(null,state__$2))));
return state__$3;
});

parinfer.format.infer.process_line.cljs$lang$maxFixedArity = 2;
/**
 * Update the state by processing the given text.
 */
parinfer.format.infer.process_text = (function parinfer$format$infer$process_text(var_args){
var args46863 = [];
var len__17325__auto___46867 = arguments.length;
var i__17326__auto___46868 = (0);
while(true){
if((i__17326__auto___46868 < len__17325__auto___46867)){
args46863.push((arguments[i__17326__auto___46868]));

var G__46869 = (i__17326__auto___46868 + (1));
i__17326__auto___46868 = G__46869;
continue;
} else {
}
break;
}

var G__46865 = args46863.length;
switch (G__46865) {
case 1:
return parinfer.format.infer.process_text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.format.infer.process_text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args46863.length)].join('')));

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
var G__46866 = state__$2;
var G__46866__$1 = ((cljs.core.seq.call(null,stack))?parinfer.format.infer.close_delims.call(null,G__46866):G__46866);
return G__46866__$1;
}
});

parinfer.format.infer.process_text.cljs$lang$maxFixedArity = 2;
/**
 * Format the given text by repositioning any trailing closing delimiters based on indentation.
 */
parinfer.format.infer.format_text = (function parinfer$format$infer$format_text(var_args){
var args46871 = [];
var len__17325__auto___46874 = arguments.length;
var i__17326__auto___46875 = (0);
while(true){
if((i__17326__auto___46875 < len__17325__auto___46874)){
args46871.push((arguments[i__17326__auto___46875]));

var G__46876 = (i__17326__auto___46875 + (1));
i__17326__auto___46875 = G__46876;
continue;
} else {
}
break;
}

var G__46873 = args46871.length;
switch (G__46873) {
case 1:
return parinfer.format.infer.format_text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.format.infer.format_text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args46871.length)].join('')));

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
/**
 * A faster way to process an incremental change.
 * 
 *   prev-state: previous state
 * 
 *   change:
 *  a map of
 *    :line-no  (num or min,max line range)
 *    :new-line (string or seq if multiple lines)
 *   
 */
parinfer.format.infer.process_text_change = (function parinfer$format$infer$process_text_change(p__46878,p__46879){
var map__46890 = p__46878;
var map__46890__$1 = ((((!((map__46890 == null)))?((((map__46890.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46890.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46890):map__46890);
var prev_state = map__46890__$1;
var postline_states = cljs.core.get.call(null,map__46890__$1,new cljs.core.Keyword(null,"postline-states","postline-states",1667653678));
var map__46891 = p__46879;
var map__46891__$1 = ((((!((map__46891 == null)))?((((map__46891.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46891.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46891):map__46891);
var change = map__46891__$1;
var line_no = cljs.core.get.call(null,map__46891__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var new_line = cljs.core.get.call(null,map__46891__$1,new cljs.core.Keyword(null,"new-line","new-line",1060819447));
var vec__46894 = ((typeof line_no === 'number')?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line_no,(line_no + (1))], null):line_no);
var start_line = cljs.core.nth.call(null,vec__46894,(0),null);
var end_line = cljs.core.nth.call(null,vec__46894,(1),null);
var replacing_lines = ((typeof new_line === 'string')?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_line], null):new_line);
var cache = cljs.core.get.call(null,postline_states,(start_line - (1)));
var lines_before = cljs.core.subvec.call(null,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(prev_state),(0),start_line);
var lines_before__$1 = (function (){var temp__4423__auto__ = new cljs.core.Keyword(null,"insert","insert",1286475395).cljs$core$IFn$_invoke$arity$1(cache);
if(cljs.core.truth_(temp__4423__auto__)){
var map__46895 = temp__4423__auto__;
var map__46895__$1 = ((((!((map__46895 == null)))?((((map__46895.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46895.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46895):map__46895);
var line_no__$1 = cljs.core.get.call(null,map__46895__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var line = cljs.core.get.call(null,map__46895__$1,new cljs.core.Keyword(null,"line","line",212345235));
return cljs.core.assoc.call(null,lines_before,line_no__$1,line);
} else {
return null;
}
})();
var state = cljs.core.merge.call(null,cljs.core.assoc.call(null,parinfer.format.infer.initial_state,new cljs.core.Keyword(null,"lines","lines",-700165781),lines_before__$1,new cljs.core.Keyword(null,"postline-states","postline-states",1667653678),cljs.core.subvec.call(null,postline_states,(0),start_line),new cljs.core.Keyword(null,"line-no","line-no",-666819466),(start_line - (1))),cache);
var state__$1 = cljs.core.reduce.call(null,parinfer.format.infer.process_line,state,replacing_lines);
var old_lines = new cljs.core.Keyword(null,"lines","lines",-700165781).cljs$core$IFn$_invoke$arity$1(prev_state);
var state__$2 = cljs.core.reduce.call(null,((function (vec__46894,start_line,end_line,replacing_lines,cache,lines_before,lines_before__$1,state,state__$1,old_lines,map__46890,map__46890__$1,prev_state,postline_states,map__46891,map__46891__$1,change,line_no,new_line){
return (function (state__$2,p__46897){
var vec__46898 = p__46897;
var old_i = cljs.core.nth.call(null,vec__46898,(0),null);
var line = cljs.core.nth.call(null,vec__46898,(1),null);
var cache__$1 = cljs.core.nth.call(null,vec__46898,(2),null);
var state__$3 = parinfer.format.infer.process_line.call(null,state__$2,line);
var new_cache = cljs.core.last.call(null,new cljs.core.Keyword(null,"postline-states","postline-states",1667653678).cljs$core$IFn$_invoke$arity$1(state__$3));
var more_QMARK_ = ((old_i + (1)) < cljs.core.count.call(null,old_lines));
var can_skip_QMARK_ = cljs.core._EQ_.call(null,new_cache,cache__$1);
if((can_skip_QMARK_) && (more_QMARK_)){
return cljs.core.reduced.call(null,cljs.core.update.call(null,cljs.core.update.call(null,state__$3,new cljs.core.Keyword(null,"postline-states","postline-states",1667653678),cljs.core.into,cljs.core.subvec.call(null,postline_states,(old_i + (1)))),new cljs.core.Keyword(null,"lines","lines",-700165781),cljs.core.into,cljs.core.subvec.call(null,old_lines,(old_i + (1)))));
} else {
return state__$3;
}
});})(vec__46894,start_line,end_line,replacing_lines,cache,lines_before,lines_before__$1,state,state__$1,old_lines,map__46890,map__46890__$1,prev_state,postline_states,map__46891,map__46891__$1,change,line_no,new_line))
,state__$1,cljs.core.map.call(null,cljs.core.vector,cljs.core.iterate.call(null,cljs.core.inc,end_line),cljs.core.subvec.call(null,old_lines,end_line),cljs.core.subvec.call(null,postline_states,end_line)));
var stack = new cljs.core.Keyword(null,"stack","stack",-793405930).cljs$core$IFn$_invoke$arity$1(state__$2);
if(cljs.core.truth_(parinfer.format.reader.in_str_QMARK_.call(null,stack))){
return null;
} else {
var G__46899 = state__$2;
var G__46899__$1 = ((cljs.core.seq.call(null,stack))?parinfer.format.infer.close_delims.call(null,G__46899):G__46899);
return G__46899__$1;
}
});

//# sourceMappingURL=infer.js.map?rel=1445965100226