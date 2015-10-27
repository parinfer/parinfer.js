// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer.format.prep');
goog.require('cljs.core');
goog.require('parinfer.format.reader');
goog.require('parinfer.format.infer');
goog.require('parinfer.format.string');
goog.require('clojure.string');
/**
 * An initial state of our running state.
 */
parinfer.format.prep.initial_state = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"backup","backup",26347393),new cljs.core.Keyword(null,"insert","insert",1286475395),new cljs.core.Keyword(null,"dedent-x","dedent-x",1097411627),new cljs.core.Keyword(null,"lines","lines",-700165781),new cljs.core.Keyword(null,"track-indent?","track-indent?",-1967553136),new cljs.core.Keyword(null,"line-no","line-no",-666819466),new cljs.core.Keyword(null,"stack","stack",-793405930),new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762),new cljs.core.Keyword(null,"indent-delta","indent-delta",-1753368232)],[cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line-no","line-no",-666819466),null,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),null], null),null,cljs.core.PersistentVector.EMPTY,false,(-1),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",-355208981),null,new cljs.core.Keyword(null,"end","end",-268185958),null], null),(0)]);
parinfer.format.prep.append_delim_trail = (function parinfer$format$prep$append_delim_trail(p__47293){
var map__47296 = p__47293;
var map__47296__$1 = ((((!((map__47296 == null)))?((((map__47296.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47296.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47296):map__47296);
var state = map__47296__$1;
var stack = cljs.core.get.call(null,map__47296__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var line_no = cljs.core.get.call(null,map__47296__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var insert = cljs.core.get.call(null,map__47296__$1,new cljs.core.Keyword(null,"insert","insert",1286475395));
var opener = cljs.core.peek.call(null,stack);
var close_ch = parinfer.format.reader.matching_delim.call(null,new cljs.core.Keyword(null,"ch","ch",-554717905).cljs$core$IFn$_invoke$arity$1(opener));
var stack__$1 = cljs.core.pop.call(null,stack);
return cljs.core.update_in.call(null,cljs.core.update_in.call(null,cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"stack","stack",-793405930),stack__$1,new cljs.core.Keyword(null,"dedent-x","dedent-x",1097411627),new cljs.core.Keyword(null,"x-pos","x-pos",-382213783).cljs$core$IFn$_invoke$arity$1(opener)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lines","lines",-700165781),new cljs.core.Keyword(null,"line-no","line-no",-666819466).cljs$core$IFn$_invoke$arity$1(insert)], null),parinfer.format.string.insert_string,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783).cljs$core$IFn$_invoke$arity$1(insert),close_ch),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"insert","insert",1286475395),new cljs.core.Keyword(null,"x-pos","x-pos",-382213783)], null),cljs.core.inc);
});
parinfer.format.prep.min_indent = (function parinfer$format$prep$min_indent(x,p__47298){
var map__47301 = p__47298;
var map__47301__$1 = ((((!((map__47301 == null)))?((((map__47301.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47301.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47301):map__47301);
var stack = cljs.core.get.call(null,map__47301__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var opener = cljs.core.peek.call(null,stack);
var temp__4423__auto__ = new cljs.core.Keyword(null,"x-pos","x-pos",-382213783).cljs$core$IFn$_invoke$arity$1(opener);
if(cljs.core.truth_(temp__4423__auto__)){
var start_x = temp__4423__auto__;
var x__16598__auto__ = (start_x + (1));
var y__16599__auto__ = x;
return ((x__16598__auto__ > y__16599__auto__) ? x__16598__auto__ : y__16599__auto__);
} else {
return x;
}
});
parinfer.format.prep.min_dedent = (function parinfer$format$prep$min_dedent(x,p__47303){
var map__47306 = p__47303;
var map__47306__$1 = ((((!((map__47306 == null)))?((((map__47306.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47306.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47306):map__47306);
var dedent_x = cljs.core.get.call(null,map__47306__$1,new cljs.core.Keyword(null,"dedent-x","dedent-x",1097411627));
if(cljs.core.truth_(dedent_x)){
var x__16605__auto__ = dedent_x;
var y__16606__auto__ = x;
return ((x__16605__auto__ < y__16606__auto__) ? x__16605__auto__ : y__16606__auto__);
} else {
return x;
}
});
parinfer.format.prep.correct_indent = (function parinfer$format$prep$correct_indent(p__47308){
var map__47311 = p__47308;
var map__47311__$1 = ((((!((map__47311 == null)))?((((map__47311.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47311.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47311):map__47311);
var state = map__47311__$1;
var indent_delta = cljs.core.get.call(null,map__47311__$1,new cljs.core.Keyword(null,"indent-delta","indent-delta",-1753368232));
var x_pos = cljs.core.get.call(null,map__47311__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var stack = cljs.core.get.call(null,map__47311__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var dedent_x = cljs.core.get.call(null,map__47311__$1,new cljs.core.Keyword(null,"dedent-x","dedent-x",1097411627));
var line_no = cljs.core.get.call(null,map__47311__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var opener = cljs.core.peek.call(null,stack);
var delta = new cljs.core.Keyword(null,"indent-delta","indent-delta",-1753368232).cljs$core$IFn$_invoke$arity$2(opener,(0));
var new_x = parinfer.format.prep.min_dedent.call(null,parinfer.format.prep.min_indent.call(null,(x_pos + delta),state),state);
var new_delta = (indent_delta + (new_x - x_pos));
var indent_str = cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,new_x," "));
return cljs.core.assoc.call(null,cljs.core.assoc_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lines","lines",-700165781),line_no], null),indent_str),new cljs.core.Keyword(null,"indent-delta","indent-delta",-1753368232),new_delta,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),new_x,new cljs.core.Keyword(null,"track-indent?","track-indent?",-1967553136),false,new cljs.core.Keyword(null,"dedent-x","dedent-x",1097411627),null);
});
parinfer.format.prep.handle_cursor_delta = (function parinfer$format$prep$handle_cursor_delta(p__47313){
var map__47317 = p__47313;
var map__47317__$1 = ((((!((map__47317 == null)))?((((map__47317.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47317.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47317):map__47317);
var state = map__47317__$1;
var indent_delta = cljs.core.get.call(null,map__47317__$1,new cljs.core.Keyword(null,"indent-delta","indent-delta",-1753368232));
var line_no = cljs.core.get.call(null,map__47317__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var x_pos = cljs.core.get.call(null,map__47317__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var cursor_line = cljs.core.get.call(null,map__47317__$1,new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007));
var cursor_x = cljs.core.get.call(null,map__47317__$1,new cljs.core.Keyword(null,"cursor-x","cursor-x",475204266));
var cursor_dx = cljs.core.get.call(null,map__47317__$1,new cljs.core.Keyword(null,"cursor-dx","cursor-dx",133069327));
var cursor_delta_QMARK_ = (function (){var and__16255__auto__ = cljs.core._EQ_.call(null,cursor_line,line_no);
if(and__16255__auto__){
var and__16255__auto____$1 = cljs.core._EQ_.call(null,cursor_x,x_pos);
if(and__16255__auto____$1){
return cursor_dx;
} else {
return and__16255__auto____$1;
}
} else {
return and__16255__auto__;
}
})();
var G__47319 = state;
var G__47319__$1 = (cljs.core.truth_(cursor_delta_QMARK_)?cljs.core.update.call(null,G__47319,new cljs.core.Keyword(null,"indent-delta","indent-delta",-1753368232),cljs.core._PLUS_,cursor_dx):G__47319);
return G__47319__$1;
});
/**
 * Update the state by handling a possible indentation trigger.
 */
parinfer.format.prep.process_indent = (function parinfer$format$prep$process_indent(p__47320){
var map__47324 = p__47320;
var map__47324__$1 = ((((!((map__47324 == null)))?((((map__47324.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47324.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47324):map__47324);
var state = map__47324__$1;
var stack = cljs.core.get.call(null,map__47324__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var track_indent_QMARK_ = cljs.core.get.call(null,map__47324__$1,new cljs.core.Keyword(null,"track-indent?","track-indent?",-1967553136));
var lines = cljs.core.get.call(null,map__47324__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var line_no = cljs.core.get.call(null,map__47324__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var ch = cljs.core.get.call(null,map__47324__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
var x_pos = cljs.core.get.call(null,map__47324__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var cursor_line = cljs.core.get.call(null,map__47324__$1,new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007));
var cursor_x = cljs.core.get.call(null,map__47324__$1,new cljs.core.Keyword(null,"cursor-x","cursor-x",475204266));
var cursor_dx = cljs.core.get.call(null,map__47324__$1,new cljs.core.Keyword(null,"cursor-dx","cursor-dx",133069327));
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
var matching_QMARK_ = (function (){var and__16255__auto__ = check_indent_QMARK_;
if(cljs.core.truth_(and__16255__auto__)){
var and__16255__auto____$1 = parinfer.format.reader.closing_delim_QMARK_.call(null,ch);
if(cljs.core.truth_(and__16255__auto____$1)){
return parinfer.format.reader.valid_closer_QMARK_.call(null,stack,ch);
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
var G__47326 = state__$1;
var G__47326__$1 = (cljs.core.truth_(matching_QMARK_)?parinfer.format.prep.append_delim_trail.call(null,G__47326):G__47326);
var G__47326__$2 = parinfer.format.prep.handle_cursor_delta.call(null,G__47326__$1)
;
var G__47326__$3 = (cljs.core.truth_(at_indent_QMARK_)?parinfer.format.prep.correct_indent.call(null,G__47326__$2):G__47326__$2);
return G__47326__$3;
});
/**
 * Update the state by processing the given character and its position.
 */
parinfer.format.prep.process_char = (function parinfer$format$prep$process_char(p__47327,ch){
var map__47331 = p__47327;
var map__47331__$1 = ((((!((map__47331 == null)))?((((map__47331.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47331.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47331):map__47331);
var state = map__47331__$1;
var lines = cljs.core.get.call(null,map__47331__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var line_no = cljs.core.get.call(null,map__47331__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var x_pos = cljs.core.count.call(null,cljs.core.get.call(null,lines,line_no));
var state__$1 = cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),x_pos,new cljs.core.Keyword(null,"ch","ch",-554717905),[cljs.core.str(ch)].join(''));
var state__$2 = parinfer.format.prep.process_indent.call(null,state__$1);
var G__47333 = state__$2;
var G__47333__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"process?","process?",-106844121).cljs$core$IFn$_invoke$arity$1(state__$2))?parinfer.format.infer.process_char_STAR_.call(null,G__47333):G__47333);
return G__47333__$1;
});
parinfer.format.prep.reinsert_delims = (function parinfer$format$prep$reinsert_delims(p__47334){
var map__47337 = p__47334;
var map__47337__$1 = ((((!((map__47337 == null)))?((((map__47337.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47337.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47337):map__47337);
var state = map__47337__$1;
var removed_delims = cljs.core.get.call(null,map__47337__$1,new cljs.core.Keyword(null,"removed-delims","removed-delims",137127226));
return cljs.core.reduce.call(null,((function (map__47337,map__47337__$1,state,removed_delims){
return (function (state__$1,_delim){
return parinfer.format.prep.append_delim_trail.call(null,state__$1);
});})(map__47337,map__47337__$1,state,removed_delims))
,state,removed_delims);
});
/**
 * Update the state by processing the given line of text.
 */
parinfer.format.prep.process_line = (function parinfer$format$prep$process_line(var_args){
var args47339 = [];
var len__17325__auto___47345 = arguments.length;
var i__17326__auto___47346 = (0);
while(true){
if((i__17326__auto___47346 < len__17325__auto___47345)){
args47339.push((arguments[i__17326__auto___47346]));

var G__47347 = (i__17326__auto___47346 + (1));
i__17326__auto___47346 = G__47347;
continue;
} else {
}
break;
}

var G__47341 = args47339.length;
switch (G__47341) {
case 1:
return parinfer.format.prep.process_line.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.format.prep.process_line.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47339.length)].join('')));

}
});

parinfer.format.prep.process_line.cljs$core$IFn$_invoke$arity$1 = (function (line){
return parinfer.format.prep.process_line.call(null,parinfer.format.prep.initial_state,line);
});

parinfer.format.prep.process_line.cljs$core$IFn$_invoke$arity$2 = (function (p__47342,line){
var map__47343 = p__47342;
var map__47343__$1 = ((((!((map__47343 == null)))?((((map__47343.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47343.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47343):map__47343);
var state = map__47343__$1;
var stack = cljs.core.get.call(null,map__47343__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var lines = cljs.core.get.call(null,map__47343__$1,new cljs.core.Keyword(null,"lines","lines",-700165781));
var line_no = cljs.core.get.call(null,map__47343__$1,new cljs.core.Keyword(null,"line-no","line-no",-666819466));
var cursor_line = cljs.core.get.call(null,map__47343__$1,new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007));
var line_no__$1 = (line_no + (1));
var state__$1 = cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"backup","backup",26347393),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"cursor-in-comment?","cursor-in-comment?",1676951135),false,new cljs.core.Keyword(null,"delim-trail","delim-trail",-1171858762),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",-355208981),null,new cljs.core.Keyword(null,"end","end",-268185958),null], null),new cljs.core.Keyword(null,"track-indent?","track-indent?",-1967553136),cljs.core.not.call(null,parinfer.format.reader.in_str_QMARK_.call(null,stack)),new cljs.core.Keyword(null,"indent-delta","indent-delta",-1753368232),(0),new cljs.core.Keyword(null,"lines","lines",-700165781),cljs.core.conj.call(null,lines,""),new cljs.core.Keyword(null,"line-no","line-no",-666819466),line_no__$1,new cljs.core.Keyword(null,"removed-delims","removed-delims",137127226),cljs.core.PersistentVector.EMPTY);
var state__$2 = cljs.core.reduce.call(null,parinfer.format.prep.process_char,state__$1,[cljs.core.str(line),cljs.core.str("\n")].join(''));
var state__$3 = parinfer.format.prep.reinsert_delims.call(null,parinfer.format.infer.remove_delim_trail.call(null,state__$2));
return state__$3;
});

parinfer.format.prep.process_line.cljs$lang$maxFixedArity = 2;
/**
 * Update the state by processing the given text.
 */
parinfer.format.prep.process_text = (function parinfer$format$prep$process_text(var_args){
var args47349 = [];
var len__17325__auto___47352 = arguments.length;
var i__17326__auto___47353 = (0);
while(true){
if((i__17326__auto___47353 < len__17325__auto___47352)){
args47349.push((arguments[i__17326__auto___47353]));

var G__47354 = (i__17326__auto___47353 + (1));
i__17326__auto___47353 = G__47354;
continue;
} else {
}
break;
}

var G__47351 = args47349.length;
switch (G__47351) {
case 1:
return parinfer.format.prep.process_text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.format.prep.process_text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47349.length)].join('')));

}
});

parinfer.format.prep.process_text.cljs$core$IFn$_invoke$arity$1 = (function (text){
return parinfer.format.prep.process_text.call(null,parinfer.format.prep.initial_state,text);
});

parinfer.format.prep.process_text.cljs$core$IFn$_invoke$arity$2 = (function (state,text){
var state__$1 = cljs.core.merge.call(null,parinfer.format.prep.initial_state,state);
var lines = parinfer.format.string.get_lines.call(null,text);
var state__$2 = cljs.core.reduce.call(null,parinfer.format.prep.process_line,state__$1,lines);
var stack = new cljs.core.Keyword(null,"stack","stack",-793405930).cljs$core$IFn$_invoke$arity$1(state__$2);
if(cljs.core.empty_QMARK_.call(null,stack)){
return state__$2;
} else {
return null;
}
});

parinfer.format.prep.process_text.cljs$lang$maxFixedArity = 2;
/**
 * Format the given text by repositioning any trailing closing delimiters based on indentation.
 */
parinfer.format.prep.format_text = (function parinfer$format$prep$format_text(var_args){
var args47356 = [];
var len__17325__auto___47359 = arguments.length;
var i__17326__auto___47360 = (0);
while(true){
if((i__17326__auto___47360 < len__17325__auto___47359)){
args47356.push((arguments[i__17326__auto___47360]));

var G__47361 = (i__17326__auto___47360 + (1));
i__17326__auto___47360 = G__47361;
continue;
} else {
}
break;
}

var G__47358 = args47356.length;
switch (G__47358) {
case 1:
return parinfer.format.prep.format_text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.format.prep.format_text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47356.length)].join('')));

}
});

parinfer.format.prep.format_text.cljs$core$IFn$_invoke$arity$1 = (function (text){
return parinfer.format.prep.format_text.call(null,parinfer.format.prep.initial_state,text);
});

parinfer.format.prep.format_text.cljs$core$IFn$_invoke$arity$2 = (function (state,text){
var temp__4423__auto__ = parinfer.format.prep.process_text.call(null,state,text);
if(cljs.core.truth_(temp__4423__auto__)){
var state__$1 = temp__4423__auto__;
return clojure.string.join.call(null,"\n",new cljs.core.Keyword(null,"lines","lines",-700165781).cljs$core$IFn$_invoke$arity$1(state__$1));
} else {
return text;
}
});

parinfer.format.prep.format_text.cljs$lang$maxFixedArity = 2;

//# sourceMappingURL=prep.js.map?rel=1445965100539