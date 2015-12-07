// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer_site.core');
goog.require('cljs.core');
goog.require('parinfer.paren_mode');
goog.require('parinfer_site.vcr_data');
goog.require('parinfer_site.editor_support');
goog.require('parinfer_site.toc');
goog.require('parinfer.string');
goog.require('parinfer.indent_mode');
goog.require('sablono.core');
goog.require('parinfer_site.vcr');
goog.require('om.core');
goog.require('parinfer_site.gears');
goog.require('parinfer_site.editor');
goog.require('parinfer_site.state');
cljs.core.enable_console_print_BANG_.call(null);
parinfer_site.core.create_indent_before_after_BANG_ = (function parinfer_site$core$create_indent_before_after_BANG_(){
var cm_input = parinfer_site.editor.create_regular_editor_BANG_.call(null,"code-indent-input",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mode","mode",654403691),"clojure-parinfer"], null));
var cm_output = parinfer_site.editor.create_regular_editor_BANG_.call(null,"code-indent-output",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"readOnly","readOnly",-1749118317),true,new cljs.core.Keyword(null,"mode","mode",654403691),"clojure-parinfer"], null));
var sync_BANG_ = ((function (cm_input,cm_output){
return (function (){
return cm_output.setValue(new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(parinfer.indent_mode.format_text.call(null,cm_input.getValue())));
});})(cm_input,cm_output))
;
if(cljs.core.truth_(cm_input)){
cm_input.on("change",sync_BANG_);

return sync_BANG_.call(null);
} else {
return null;
}
});
parinfer_site.core.create_paren_before_after_BANG_ = (function parinfer_site$core$create_paren_before_after_BANG_(){
var cm_input = parinfer_site.editor.create_regular_editor_BANG_.call(null,"code-paren-input");
var cm_output = parinfer_site.editor.create_regular_editor_BANG_.call(null,"code-paren-output",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"readOnly","readOnly",-1749118317),true,new cljs.core.Keyword(null,"mode","mode",654403691),"clojure-parinfer"], null));
var clear_marks_BANG_ = ((function (cm_input,cm_output){
return (function (cm){
var seq__32560 = cljs.core.seq.call(null,cm.getAllMarks());
var chunk__32561 = null;
var count__32562 = (0);
var i__32563 = (0);
while(true){
if((i__32563 < count__32562)){
var m = cljs.core._nth.call(null,chunk__32561,i__32563);
m.clear();

var G__32576 = seq__32560;
var G__32577 = chunk__32561;
var G__32578 = count__32562;
var G__32579 = (i__32563 + (1));
seq__32560 = G__32576;
chunk__32561 = G__32577;
count__32562 = G__32578;
i__32563 = G__32579;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__32560);
if(temp__4425__auto__){
var seq__32560__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__32560__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__32560__$1);
var G__32580 = cljs.core.chunk_rest.call(null,seq__32560__$1);
var G__32581 = c__17070__auto__;
var G__32582 = cljs.core.count.call(null,c__17070__auto__);
var G__32583 = (0);
seq__32560 = G__32580;
chunk__32561 = G__32581;
count__32562 = G__32582;
i__32563 = G__32583;
continue;
} else {
var m = cljs.core.first.call(null,seq__32560__$1);
m.clear();

var G__32584 = cljs.core.next.call(null,seq__32560__$1);
var G__32585 = null;
var G__32586 = (0);
var G__32587 = (0);
seq__32560 = G__32584;
chunk__32561 = G__32585;
count__32562 = G__32586;
i__32563 = G__32587;
continue;
}
} else {
return null;
}
}
break;
}
});})(cm_input,cm_output))
;
var add_mark_BANG_ = ((function (cm_input,cm_output,clear_marks_BANG_){
return (function (cm,line_no,x,value,class_name){
var from = {"line": line_no, "ch": x};
var to = {"line": line_no, "ch": (x + cljs.core.count.call(null,value))};
var opts = {"className": class_name};
return cm.markText(from,to,opts);
});})(cm_input,cm_output,clear_marks_BANG_))
;
var diff_BANG_ = ((function (cm_input,cm_output,clear_marks_BANG_,add_mark_BANG_){
return (function (){
clear_marks_BANG_.call(null,cm_input);

clear_marks_BANG_.call(null,cm_output);

var in_lines = parinfer.string.get_lines.call(null,cm_input.getValue());
var out_lines = parinfer.string.get_lines.call(null,cm_output.getValue());
var seq__32564 = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.vector,cljs.core.range.call(null),in_lines,out_lines));
var chunk__32565 = null;
var count__32566 = (0);
var i__32567 = (0);
while(true){
if((i__32567 < count__32566)){
var vec__32568 = cljs.core._nth.call(null,chunk__32565,i__32567);
var line_no = cljs.core.nth.call(null,vec__32568,(0),null);
var in$ = cljs.core.nth.call(null,vec__32568,(1),null);
var out = cljs.core.nth.call(null,vec__32568,(2),null);
var changes_32588 = JsDiff.diffChars(in$,out);
cljs.core.reduce.call(null,((function (seq__32564,chunk__32565,count__32566,i__32567,changes_32588,vec__32568,line_no,in$,out,in_lines,out_lines,cm_input,cm_output,clear_marks_BANG_,add_mark_BANG_){
return (function (p__32569,change){
var map__32570 = p__32569;
var map__32570__$1 = ((((!((map__32570 == null)))?((((map__32570.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32570.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32570):map__32570);
var result = map__32570__$1;
var in_x = cljs.core.get.call(null,map__32570__$1,new cljs.core.Keyword(null,"in-x","in-x",771816369));
var out_x = cljs.core.get.call(null,map__32570__$1,new cljs.core.Keyword(null,"out-x","out-x",-1435897095));
var value = (change["value"]);
var length = cljs.core.count.call(null,value);
if(cljs.core.truth_((change["added"]))){
add_mark_BANG_.call(null,cm_output,line_no,out_x,value,"inserted");

return cljs.core.update.call(null,result,new cljs.core.Keyword(null,"out-x","out-x",-1435897095),cljs.core._PLUS_,length);
} else {
if(cljs.core.truth_((change["removed"]))){
add_mark_BANG_.call(null,cm_input,line_no,in_x,value,"removed");

return cljs.core.update.call(null,result,new cljs.core.Keyword(null,"in-x","in-x",771816369),cljs.core._PLUS_,length);
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"in-x","in-x",771816369),(in_x + length),new cljs.core.Keyword(null,"out-x","out-x",-1435897095),(out_x + length)], null);

}
}
});})(seq__32564,chunk__32565,count__32566,i__32567,changes_32588,vec__32568,line_no,in$,out,in_lines,out_lines,cm_input,cm_output,clear_marks_BANG_,add_mark_BANG_))
,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"in-x","in-x",771816369),(0),new cljs.core.Keyword(null,"out-x","out-x",-1435897095),(0)], null),changes_32588);

var G__32589 = seq__32564;
var G__32590 = chunk__32565;
var G__32591 = count__32566;
var G__32592 = (i__32567 + (1));
seq__32564 = G__32589;
chunk__32565 = G__32590;
count__32566 = G__32591;
i__32567 = G__32592;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__32564);
if(temp__4425__auto__){
var seq__32564__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__32564__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__32564__$1);
var G__32593 = cljs.core.chunk_rest.call(null,seq__32564__$1);
var G__32594 = c__17070__auto__;
var G__32595 = cljs.core.count.call(null,c__17070__auto__);
var G__32596 = (0);
seq__32564 = G__32593;
chunk__32565 = G__32594;
count__32566 = G__32595;
i__32567 = G__32596;
continue;
} else {
var vec__32572 = cljs.core.first.call(null,seq__32564__$1);
var line_no = cljs.core.nth.call(null,vec__32572,(0),null);
var in$ = cljs.core.nth.call(null,vec__32572,(1),null);
var out = cljs.core.nth.call(null,vec__32572,(2),null);
var changes_32597 = JsDiff.diffChars(in$,out);
cljs.core.reduce.call(null,((function (seq__32564,chunk__32565,count__32566,i__32567,changes_32597,vec__32572,line_no,in$,out,seq__32564__$1,temp__4425__auto__,in_lines,out_lines,cm_input,cm_output,clear_marks_BANG_,add_mark_BANG_){
return (function (p__32573,change){
var map__32574 = p__32573;
var map__32574__$1 = ((((!((map__32574 == null)))?((((map__32574.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32574.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32574):map__32574);
var result = map__32574__$1;
var in_x = cljs.core.get.call(null,map__32574__$1,new cljs.core.Keyword(null,"in-x","in-x",771816369));
var out_x = cljs.core.get.call(null,map__32574__$1,new cljs.core.Keyword(null,"out-x","out-x",-1435897095));
var value = (change["value"]);
var length = cljs.core.count.call(null,value);
if(cljs.core.truth_((change["added"]))){
add_mark_BANG_.call(null,cm_output,line_no,out_x,value,"inserted");

return cljs.core.update.call(null,result,new cljs.core.Keyword(null,"out-x","out-x",-1435897095),cljs.core._PLUS_,length);
} else {
if(cljs.core.truth_((change["removed"]))){
add_mark_BANG_.call(null,cm_input,line_no,in_x,value,"removed");

return cljs.core.update.call(null,result,new cljs.core.Keyword(null,"in-x","in-x",771816369),cljs.core._PLUS_,length);
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"in-x","in-x",771816369),(in_x + length),new cljs.core.Keyword(null,"out-x","out-x",-1435897095),(out_x + length)], null);

}
}
});})(seq__32564,chunk__32565,count__32566,i__32567,changes_32597,vec__32572,line_no,in$,out,seq__32564__$1,temp__4425__auto__,in_lines,out_lines,cm_input,cm_output,clear_marks_BANG_,add_mark_BANG_))
,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"in-x","in-x",771816369),(0),new cljs.core.Keyword(null,"out-x","out-x",-1435897095),(0)], null),changes_32597);

var G__32598 = cljs.core.next.call(null,seq__32564__$1);
var G__32599 = null;
var G__32600 = (0);
var G__32601 = (0);
seq__32564 = G__32598;
chunk__32565 = G__32599;
count__32566 = G__32600;
i__32567 = G__32601;
continue;
}
} else {
return null;
}
}
break;
}
});})(cm_input,cm_output,clear_marks_BANG_,add_mark_BANG_))
;
var sync_BANG_ = ((function (cm_input,cm_output,clear_marks_BANG_,add_mark_BANG_,diff_BANG_){
return (function (){
var in_text = cm_input.getValue();
var out_text = new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(parinfer.paren_mode.format_text.call(null,in_text));
cm_output.setValue(out_text);

return diff_BANG_.call(null);
});})(cm_input,cm_output,clear_marks_BANG_,add_mark_BANG_,diff_BANG_))
;
if(cljs.core.truth_(cm_input)){
cm_input.on("change",sync_BANG_);

return sync_BANG_.call(null);
} else {
return null;
}
});
parinfer_site.core.create_index_editors_BANG_ = (function parinfer_site$core$create_index_editors_BANG_(){
parinfer_site.editor.create_editor_BANG_.call(null,"code-intro-indent",new cljs.core.Keyword(null,"intro-indent","intro-indent",-813700553));

parinfer_site.editor.create_editor_BANG_.call(null,"code-intro-insert",new cljs.core.Keyword(null,"intro-insert","intro-insert",-230366434));

parinfer_site.editor.create_editor_BANG_.call(null,"code-intro-comment",new cljs.core.Keyword(null,"intro-comment","intro-comment",-769304496));

parinfer_site.editor.create_editor_BANG_.call(null,"code-intro-paredit",new cljs.core.Keyword(null,"intro-paredit","intro-paredit",841862079));

parinfer_site.editor.create_editor_BANG_.call(null,"code-intro-paren",new cljs.core.Keyword(null,"intro-paren","intro-paren",-775257330),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"parinfer-mode","parinfer-mode",-851652980),new cljs.core.Keyword(null,"paren-mode","paren-mode",-2068924645)], null));

parinfer_site.editor.create_editor_BANG_.call(null,"code-indent",new cljs.core.Keyword(null,"indent","indent",-148200125));

parinfer_site.editor.create_editor_BANG_.call(null,"code-indent-far",new cljs.core.Keyword(null,"indent-far","indent-far",-1792364104));

parinfer_site.editor.create_editor_BANG_.call(null,"code-indent-multi",new cljs.core.Keyword(null,"indent-multi","indent-multi",92834895));

parinfer_site.editor.create_editor_BANG_.call(null,"code-line",new cljs.core.Keyword(null,"line","line",212345235));

parinfer_site.editor.create_editor_BANG_.call(null,"code-comment",new cljs.core.Keyword(null,"comment","comment",532206069));

parinfer_site.editor.create_editor_BANG_.call(null,"code-wrap",new cljs.core.Keyword(null,"wrap","wrap",851669987));

parinfer_site.editor.create_editor_BANG_.call(null,"code-splice",new cljs.core.Keyword(null,"splice","splice",449588165));

parinfer_site.editor.create_editor_BANG_.call(null,"code-barf",new cljs.core.Keyword(null,"barf","barf",1329753296));

parinfer_site.editor.create_editor_BANG_.call(null,"code-slurp",new cljs.core.Keyword(null,"slurp","slurp",1288450555));

parinfer_site.editor.create_editor_BANG_.call(null,"code-string",new cljs.core.Keyword(null,"string","string",-1989541586));

parinfer_site.editor.create_editor_BANG_.call(null,"code-enter",new cljs.core.Keyword(null,"enter","enter",1792452624));

var opts_32602 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"readOnly","readOnly",-1749118317),true], null);
parinfer_site.editor.create_editor_BANG_.call(null,"code-warn-good",new cljs.core.Keyword(null,"warn-good","warn-good",-1077746036),opts_32602);

parinfer_site.editor.create_editor_BANG_.call(null,"code-warn-bad",new cljs.core.Keyword(null,"warn-bad","warn-bad",-2133697481),opts_32602);

parinfer_site.editor.create_editor_BANG_.call(null,"code-displaced",new cljs.core.Keyword(null,"displaced","displaced",-136492349));

parinfer_site.editor.create_editor_BANG_.call(null,"code-not-displaced",new cljs.core.Keyword(null,"not-displaced","not-displaced",-1750218077));

var opts_32603 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"parinfer-mode","parinfer-mode",-851652980),new cljs.core.Keyword(null,"paren-mode","paren-mode",-2068924645)], null);
parinfer_site.editor.create_editor_BANG_.call(null,"code-paren-tune",new cljs.core.Keyword(null,"paren-tune","paren-tune",-218999215),opts_32603);

parinfer_site.editor.create_editor_BANG_.call(null,"code-paren-frac",new cljs.core.Keyword(null,"paren-frac","paren-frac",858872585),opts_32603);

parinfer_site.editor.create_editor_BANG_.call(null,"code-paren-comment",new cljs.core.Keyword(null,"paren-comment","paren-comment",263180335),opts_32603);

parinfer_site.editor.create_editor_BANG_.call(null,"code-paren-wrap",new cljs.core.Keyword(null,"paren-wrap","paren-wrap",1218947070),opts_32603);

parinfer_site.editor.create_editor_BANG_.call(null,"code-displaced-after-balance",new cljs.core.Keyword(null,"displaced-after-balance","displaced-after-balance",449431016),opts_32603);

parinfer_site.editor.create_editor_BANG_.call(null,"code-not-displaced-on-enter",new cljs.core.Keyword(null,"not-displaced-on-enter","not-displaced-on-enter",-747667702),opts_32603);

parinfer_site.editor.create_editor_BANG_.call(null,"code-displaced-after-cursor-leaves",new cljs.core.Keyword(null,"displaced-after-cursor-leaves","displaced-after-cursor-leaves",-1478894415),opts_32603);

parinfer_site.editor.start_editor_sync_BANG_.call(null);

parinfer_site.editor.create_regular_editor_BANG_.call(null,"code-c-expr",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mode","mode",654403691),"javascript"], null));

parinfer_site.editor.create_regular_editor_BANG_.call(null,"code-lisp-expr");

parinfer_site.editor.create_regular_editor_BANG_.call(null,"code-c-indent");

parinfer_site.editor.create_regular_editor_BANG_.call(null,"code-lisp-indent");

parinfer_site.editor.create_regular_editor_BANG_.call(null,"code-skim");

parinfer_site.editor.create_regular_editor_BANG_.call(null,"code-inspect",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"matchBrackets","matchBrackets",1256448936),true], null));

parinfer_site.core.create_indent_before_after_BANG_.call(null);

return parinfer_site.core.create_paren_before_after_BANG_.call(null);
});
parinfer_site.core.animate_when_visible_BANG_ = (function parinfer_site$core$animate_when_visible_BANG_(key_){
var G__32605 = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer_site.state.state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"watcher","watcher",2145165251)], null));
G__32605.enterViewport(((function (G__32605){
return (function (){
return parinfer_site.vcr.play_recording_BANG_.call(null,key_);
});})(G__32605))
);

G__32605.exitViewport(((function (G__32605){
return (function (){
return parinfer_site.vcr.stop_playing_BANG_.call(null,key_);
});})(G__32605))
);

return G__32605;
});
parinfer_site.core.index_anims = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"indent","indent",-148200125),new cljs.core.Keyword(null,"not-displaced","not-displaced",-1750218077),new cljs.core.Keyword(null,"displaced","displaced",-136492349),new cljs.core.Keyword(null,"wrap","wrap",851669987),new cljs.core.Keyword(null,"splice","splice",449588165),new cljs.core.Keyword(null,"displaced-after-balance","displaced-after-balance",449431016),new cljs.core.Keyword(null,"paren-frac","paren-frac",858872585),new cljs.core.Keyword(null,"not-displaced-on-enter","not-displaced-on-enter",-747667702),new cljs.core.Keyword(null,"warn-good","warn-good",-1077746036),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.Keyword(null,"intro-paren","intro-paren",-775257330),new cljs.core.Keyword(null,"paren-comment","paren-comment",263180335),new cljs.core.Keyword(null,"indent-multi","indent-multi",92834895),new cljs.core.Keyword(null,"enter","enter",1792452624),new cljs.core.Keyword(null,"intro-comment","intro-comment",-769304496),new cljs.core.Keyword(null,"barf","barf",1329753296),new cljs.core.Keyword(null,"displaced-after-cursor-leaves","displaced-after-cursor-leaves",-1478894415),new cljs.core.Keyword(null,"paren-tune","paren-tune",-218999215),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"comment","comment",532206069),new cljs.core.Keyword(null,"warn-bad","warn-bad",-2133697481),new cljs.core.Keyword(null,"intro-indent","intro-indent",-813700553),new cljs.core.Keyword(null,"indent-far","indent-far",-1792364104),new cljs.core.Keyword(null,"slurp","slurp",1288450555),new cljs.core.Keyword(null,"intro-insert","intro-insert",-230366434),new cljs.core.Keyword(null,"paren-wrap","paren-wrap",1218947070),new cljs.core.Keyword(null,"intro-paredit","intro-paredit",841862079)],[parinfer_site.vcr_data.indent,parinfer_site.vcr_data.not_displaced,parinfer_site.vcr_data.displaced,parinfer_site.vcr_data.wrap,parinfer_site.vcr_data.splice,parinfer_site.vcr_data.displaced_after_balance,parinfer_site.vcr_data.paren_frac,parinfer_site.vcr_data.not_displaced_on_enter,parinfer_site.vcr_data.warn_good,parinfer_site.vcr_data.string,parinfer_site.vcr_data.intro_paren,parinfer_site.vcr_data.paren_comment,parinfer_site.vcr_data.indent_multi,parinfer_site.vcr_data.enter,parinfer_site.vcr_data.comment_,parinfer_site.vcr_data.barf,parinfer_site.vcr_data.displaced_after_cursor_leaves,parinfer_site.vcr_data.paren_tune,parinfer_site.vcr_data.line,parinfer_site.vcr_data.comment_,parinfer_site.vcr_data.warn_bad,parinfer_site.vcr_data.indent_multi,parinfer_site.vcr_data.indent_far,parinfer_site.vcr_data.slurp_,parinfer_site.vcr_data.line,parinfer_site.vcr_data.paren_wrap,parinfer_site.vcr_data.intro_paredit]);
parinfer_site.core.load_index_anims_BANG_ = (function parinfer_site$core$load_index_anims_BANG_(){
cljs.core.swap_BANG_.call(null,parinfer_site.vcr.vcr,(function (data){
return cljs.core.reduce.call(null,(function (result,p__32614){
var vec__32615 = p__32614;
var key_ = cljs.core.nth.call(null,vec__32615,(0),null);
var state = cljs.core.nth.call(null,vec__32615,(1),null);
return cljs.core.update.call(null,result,key_,cljs.core.merge,state);
}),data,parinfer_site.core.index_anims);
}));

var seq__32616_32622 = cljs.core.seq.call(null,parinfer_site.core.index_anims);
var chunk__32617_32623 = null;
var count__32618_32624 = (0);
var i__32619_32625 = (0);
while(true){
if((i__32619_32625 < count__32618_32624)){
var vec__32620_32626 = cljs.core._nth.call(null,chunk__32617_32623,i__32619_32625);
var key__32627 = cljs.core.nth.call(null,vec__32620_32626,(0),null);
var __32628 = cljs.core.nth.call(null,vec__32620_32626,(1),null);
parinfer_site.core.animate_when_visible_BANG_.call(null,key__32627);

var G__32629 = seq__32616_32622;
var G__32630 = chunk__32617_32623;
var G__32631 = count__32618_32624;
var G__32632 = (i__32619_32625 + (1));
seq__32616_32622 = G__32629;
chunk__32617_32623 = G__32630;
count__32618_32624 = G__32631;
i__32619_32625 = G__32632;
continue;
} else {
var temp__4425__auto___32633 = cljs.core.seq.call(null,seq__32616_32622);
if(temp__4425__auto___32633){
var seq__32616_32634__$1 = temp__4425__auto___32633;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__32616_32634__$1)){
var c__17070__auto___32635 = cljs.core.chunk_first.call(null,seq__32616_32634__$1);
var G__32636 = cljs.core.chunk_rest.call(null,seq__32616_32634__$1);
var G__32637 = c__17070__auto___32635;
var G__32638 = cljs.core.count.call(null,c__17070__auto___32635);
var G__32639 = (0);
seq__32616_32622 = G__32636;
chunk__32617_32623 = G__32637;
count__32618_32624 = G__32638;
i__32619_32625 = G__32639;
continue;
} else {
var vec__32621_32640 = cljs.core.first.call(null,seq__32616_32634__$1);
var key__32641 = cljs.core.nth.call(null,vec__32621_32640,(0),null);
var __32642 = cljs.core.nth.call(null,vec__32621_32640,(1),null);
parinfer_site.core.animate_when_visible_BANG_.call(null,key__32641);

var G__32643 = cljs.core.next.call(null,seq__32616_32634__$1);
var G__32644 = null;
var G__32645 = (0);
var G__32646 = (0);
seq__32616_32622 = G__32643;
chunk__32617_32623 = G__32644;
count__32618_32624 = G__32645;
i__32619_32625 = G__32646;
continue;
}
} else {
}
}
break;
}

return scrollMonitor.recalculateLocations();
});
parinfer_site.core.base_gears = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"paren","paren",-294107600),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"x","x",2099068185),(280),new cljs.core.Keyword(null,"y","y",-1757859776),(70),new cljs.core.Keyword(null,"factor","factor",-2103172748),(96),new cljs.core.Keyword(null,"classes","classes",2037804510),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["paren-gear"], null),new cljs.core.Keyword(null,"caption","caption",-855383902),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"change parens",new cljs.core.Keyword(null,"side","side",389652279),new cljs.core.Keyword(null,"left","left",-399115937)], null)], null),new cljs.core.Keyword(null,"indent","indent",-148200125),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"x","x",2099068185),(420),new cljs.core.Keyword(null,"y","y",-1757859776),(70),new cljs.core.Keyword(null,"factor","factor",-2103172748),(96),new cljs.core.Keyword(null,"classes","classes",2037804510),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["indent-gear"], null),new cljs.core.Keyword(null,"caption","caption",-855383902),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"change indentation",new cljs.core.Keyword(null,"side","side",389652279),new cljs.core.Keyword(null,"right","right",-452581833)], null)], null)], null);
parinfer_site.core.svg_opts = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"height","height",1025178622),(170)], null);
parinfer_site.core.index_gears = new cljs.core.PersistentArrayMap(null, 3, ["naive-gears",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"svg-opts","svg-opts",1860471806),parinfer_site.core.svg_opts,new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"init-gears","init-gears",1422313814),parinfer_site.core.base_gears,new cljs.core.Keyword(null,"anim-frames","anim-frames",2117672923),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"paren","paren",-294107600),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"power","power",-937852079),0.01], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(2000)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"paren","paren",-294107600),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"power","power",-937852079),(0)], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(1000)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"indent","indent",-148200125),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"power","power",-937852079),-0.01], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(2000)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"indent","indent",-148200125),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"power","power",-937852079),(0)], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(1000)], null)], null)], null)], null),"helper-gears",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"svg-opts","svg-opts",1860471806),parinfer_site.core.svg_opts,new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"init-gears","init-gears",1422313814),cljs.core.merge.call(null,parinfer_site.core.base_gears,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"auto-indent","auto-indent",2046865160),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"x","x",2099068185),(465),new cljs.core.Keyword(null,"y","y",-1757859776),(116),new cljs.core.Keyword(null,"factor","factor",-2103172748),(48),new cljs.core.Keyword(null,"classes","classes",2037804510),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["auto-indent-gear"], null),new cljs.core.Keyword(null,"caption","caption",-855383902),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"auto-indent",new cljs.core.Keyword(null,"side","side",389652279),new cljs.core.Keyword(null,"right","right",-452581833)], null)], null),new cljs.core.Keyword(null,"paredit","paredit",-1195358877),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"x","x",2099068185),(235),new cljs.core.Keyword(null,"y","y",-1757859776),(116),new cljs.core.Keyword(null,"factor","factor",-2103172748),(48),new cljs.core.Keyword(null,"classes","classes",2037804510),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["paredit-gear"], null),new cljs.core.Keyword(null,"caption","caption",-855383902),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"paredit",new cljs.core.Keyword(null,"side","side",389652279),new cljs.core.Keyword(null,"left","left",-399115937)], null)], null)], null)),new cljs.core.Keyword(null,"anim-frames","anim-frames",2117672923),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"auto-indent","auto-indent",2046865160),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"classes","classes",2037804510),new cljs.core.PersistentArrayMap(null, 1, ["invisible",false], null)], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(500)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"auto-indent","auto-indent",2046865160),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"power","power",-937852079),0.15,new cljs.core.Keyword(null,"classes","classes",2037804510),new cljs.core.PersistentArrayMap(null, 1, ["invisible",false], null)], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(500)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"auto-indent","auto-indent",2046865160),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"power","power",-937852079),(0)], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(500)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"auto-indent","auto-indent",2046865160),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"classes","classes",2037804510),new cljs.core.PersistentArrayMap(null, 1, ["invisible",true], null)], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(1000)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"paredit","paredit",-1195358877),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"power","power",-937852079),0.05], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(1000)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"paredit","paredit",-1195358877),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"power","power",-937852079),(0)], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(1000)], null)], null)], null)], null),"parinfer-gears",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"svg-opts","svg-opts",1860471806),parinfer_site.core.svg_opts,new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"init-gears","init-gears",1422313814),cljs.core.merge.call(null,parinfer_site.core.base_gears,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"parinfer","parinfer",1893066885),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"x","x",2099068185),(350),new cljs.core.Keyword(null,"y","y",-1757859776),(95),new cljs.core.Keyword(null,"factor","factor",-2103172748),(64),new cljs.core.Keyword(null,"classes","classes",2037804510),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["parinfer-gear"], null),new cljs.core.Keyword(null,"caption","caption",-855383902),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Parinfer",new cljs.core.Keyword(null,"side","side",389652279),new cljs.core.Keyword(null,"bottom","bottom",-1550509018)], null)], null)], null)),new cljs.core.Keyword(null,"anim-frames","anim-frames",2117672923),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"indent","indent",-148200125),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"power","power",-937852079),0.01], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(2000)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"indent","indent",-148200125),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"power","power",-937852079),(0)], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(1000)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"paren","paren",-294107600),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"power","power",-937852079),-0.01], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(2000)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"paren","paren",-294107600),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"power","power",-937852079),(0)], null)], null),new cljs.core.Keyword(null,"dt","dt",-368444759),(1000)], null)], null)], null)], null)], null);
parinfer_site.core.create_index_gears_BANG_ = (function parinfer_site$core$create_index_gears_BANG_(){
var seq__32657 = cljs.core.seq.call(null,parinfer_site.core.index_gears);
var chunk__32658 = null;
var count__32659 = (0);
var i__32660 = (0);
while(true){
if((i__32660 < count__32659)){
var vec__32661 = cljs.core._nth.call(null,chunk__32658,i__32660);
var id = cljs.core.nth.call(null,vec__32661,(0),null);
var map__32662 = cljs.core.nth.call(null,vec__32661,(1),null);
var map__32662__$1 = ((((!((map__32662 == null)))?((((map__32662.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32662.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32662):map__32662);
var data = cljs.core.get.call(null,map__32662__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var svg_opts = cljs.core.get.call(null,map__32662__$1,new cljs.core.Keyword(null,"svg-opts","svg-opts",1860471806));
parinfer_site.gears.create_gears_BANG_.call(null,[cljs.core.str("#"),cljs.core.str(id)].join(''),data,svg_opts);

var G__32667 = seq__32657;
var G__32668 = chunk__32658;
var G__32669 = count__32659;
var G__32670 = (i__32660 + (1));
seq__32657 = G__32667;
chunk__32658 = G__32668;
count__32659 = G__32669;
i__32660 = G__32670;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__32657);
if(temp__4425__auto__){
var seq__32657__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__32657__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__32657__$1);
var G__32671 = cljs.core.chunk_rest.call(null,seq__32657__$1);
var G__32672 = c__17070__auto__;
var G__32673 = cljs.core.count.call(null,c__17070__auto__);
var G__32674 = (0);
seq__32657 = G__32671;
chunk__32658 = G__32672;
count__32659 = G__32673;
i__32660 = G__32674;
continue;
} else {
var vec__32664 = cljs.core.first.call(null,seq__32657__$1);
var id = cljs.core.nth.call(null,vec__32664,(0),null);
var map__32665 = cljs.core.nth.call(null,vec__32664,(1),null);
var map__32665__$1 = ((((!((map__32665 == null)))?((((map__32665.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32665.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32665):map__32665);
var data = cljs.core.get.call(null,map__32665__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var svg_opts = cljs.core.get.call(null,map__32665__$1,new cljs.core.Keyword(null,"svg-opts","svg-opts",1860471806));
parinfer_site.gears.create_gears_BANG_.call(null,[cljs.core.str("#"),cljs.core.str(id)].join(''),data,svg_opts);

var G__32675 = cljs.core.next.call(null,seq__32657__$1);
var G__32676 = null;
var G__32677 = (0);
var G__32678 = (0);
seq__32657 = G__32675;
chunk__32658 = G__32676;
count__32659 = G__32677;
i__32660 = G__32678;
continue;
}
} else {
return null;
}
}
break;
}
});
parinfer_site.core.render_index_BANG_ = (function parinfer_site$core$render_index_BANG_(){
parinfer_site.toc.init_BANG_.call(null);

parinfer_site.core.create_index_editors_BANG_.call(null);

parinfer_site.core.create_index_gears_BANG_.call(null);

parinfer_site.core.load_index_anims_BANG_.call(null);

return parinfer_site.vcr.render_controls_BANG_.call(null);
});
parinfer_site.core.render_dev_BANG_ = (function parinfer_site$core$render_dev_BANG_(){
parinfer_site.editor.create_editor_BANG_.call(null,"code-indent-mode",new cljs.core.Keyword(null,"indent-mode","indent-mode",1737814542));

parinfer_site.editor.create_editor_BANG_.call(null,"code-paren-mode",new cljs.core.Keyword(null,"paren-mode","paren-mode",-2068924645),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"parinfer-mode","parinfer-mode",-851652980),new cljs.core.Keyword(null,"paren-mode","paren-mode",-2068924645)], null));

return parinfer_site.editor.start_editor_sync_BANG_.call(null);
});
parinfer_site.core.state_viewer = (function parinfer_site$core$state_viewer(p__32679,owner){
var map__32729 = p__32679;
var map__32729__$1 = ((((!((map__32729 == null)))?((((map__32729.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32729.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32729):map__32729);
var postline_states = cljs.core.get.call(null,map__32729__$1,new cljs.core.Keyword(null,"postline-states","postline-states",1667653678));
var cursor_line = cljs.core.get.call(null,map__32729__$1,new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007));
if(typeof parinfer_site.core.t_parinfer_site$core32731 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
parinfer_site.core.t_parinfer_site$core32731 = (function (state_viewer,p__32679,owner,map__32729,postline_states,cursor_line,meta32732){
this.state_viewer = state_viewer;
this.p__32679 = p__32679;
this.owner = owner;
this.map__32729 = map__32729;
this.postline_states = postline_states;
this.cursor_line = cursor_line;
this.meta32732 = meta32732;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
parinfer_site.core.t_parinfer_site$core32731.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__32729,map__32729__$1,postline_states,cursor_line){
return (function (_32733,meta32732__$1){
var self__ = this;
var _32733__$1 = this;
return (new parinfer_site.core.t_parinfer_site$core32731(self__.state_viewer,self__.p__32679,self__.owner,self__.map__32729,self__.postline_states,self__.cursor_line,meta32732__$1));
});})(map__32729,map__32729__$1,postline_states,cursor_line))
;

parinfer_site.core.t_parinfer_site$core32731.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__32729,map__32729__$1,postline_states,cursor_line){
return (function (_32733){
var self__ = this;
var _32733__$1 = this;
return self__.meta32732;
});})(map__32729,map__32729__$1,postline_states,cursor_line))
;

parinfer_site.core.t_parinfer_site$core32731.prototype.om$core$IRender$ = true;

parinfer_site.core.t_parinfer_site$core32731.prototype.om$core$IRender$render$arity$1 = ((function (map__32729,map__32729__$1,postline_states,cursor_line){
return (function (_){
var self__ = this;
var ___$1 = this;
return React.createElement("table",{"className": "state-table"},cljs.core.into_array.call(null,(function (){var iter__17039__auto__ = ((function (___$1,map__32729,map__32729__$1,postline_states,cursor_line){
return (function parinfer_site$core$state_viewer_$_iter__32738(s__32739){
return (new cljs.core.LazySeq(null,((function (___$1,map__32729,map__32729__$1,postline_states,cursor_line){
return (function (){
var s__32739__$1 = s__32739;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__32739__$1);
if(temp__4425__auto__){
var s__32739__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__32739__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__32739__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__32741 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__32740 = (0);
while(true){
if((i__32740 < size__17038__auto__)){
var vec__32760 = cljs.core._nth.call(null,c__17037__auto__,i__32740);
var i = cljs.core.nth.call(null,vec__32760,(0),null);
var map__32761 = cljs.core.nth.call(null,vec__32760,(1),null);
var map__32761__$1 = ((((!((map__32761 == null)))?((((map__32761.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32761.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32761):map__32761);
var insert = cljs.core.get.call(null,map__32761__$1,new cljs.core.Keyword(null,"insert","insert",1286475395));
var stack = cljs.core.get.call(null,map__32761__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
cljs.core.chunk_append.call(null,b__32741,React.createElement("tr",{"className": ((cljs.core._EQ_.call(null,i,self__.cursor_line))?"active-line":null)},(function (){var attrs32734 = (i + (1));
return cljs.core.apply.call(null,React.createElement,"td",((cljs.core.map_QMARK_.call(null,attrs32734))?sablono.interpreter.attributes.call(null,sablono.util.merge_with_class.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["line-no"], null)], null),attrs32734)):{"className": "line-no"}),cljs.core.remove.call(null,cljs.core.nil_QMARK_,((cljs.core.map_QMARK_.call(null,attrs32734))?cljs.core.PersistentVector.EMPTY:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.interpreter.interpret.call(null,attrs32734)], null))));
})(),(function (){var attrs32735 = new cljs.core.Keyword(null,"line-dy","line-dy",41667486).cljs$core$IFn$_invoke$arity$1(insert);
return cljs.core.apply.call(null,React.createElement,"td",((cljs.core.map_QMARK_.call(null,attrs32735))?sablono.interpreter.attributes.call(null,sablono.util.merge_with_class.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["line-dy"], null)], null),attrs32735)):{"className": "line-dy"}),cljs.core.remove.call(null,cljs.core.nil_QMARK_,((cljs.core.map_QMARK_.call(null,attrs32735))?cljs.core.PersistentVector.EMPTY:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.interpreter.interpret.call(null,attrs32735)], null))));
})(),(function (){var attrs32736 = new cljs.core.Keyword(null,"x-pos","x-pos",-382213783).cljs$core$IFn$_invoke$arity$1(insert);
return cljs.core.apply.call(null,React.createElement,"td",((cljs.core.map_QMARK_.call(null,attrs32736))?sablono.interpreter.attributes.call(null,attrs32736):null),cljs.core.remove.call(null,cljs.core.nil_QMARK_,((cljs.core.map_QMARK_.call(null,attrs32736))?cljs.core.PersistentVector.EMPTY:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.interpreter.interpret.call(null,attrs32736)], null))));
})(),(function (){var attrs32737 = new cljs.core.Keyword(null,"string","string",-1989541586).cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.call(null,((function (i__32740,vec__32760,i,map__32761,map__32761__$1,insert,stack,c__17037__auto__,size__17038__auto__,b__32741,s__32739__$2,temp__4425__auto__,___$1,map__32729,map__32729__$1,postline_states,cursor_line){
return (function (p__32763,p__32764){
var map__32765 = p__32763;
var map__32765__$1 = ((((!((map__32765 == null)))?((((map__32765.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32765.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32765):map__32765);
var result = map__32765__$1;
var next_x = cljs.core.get.call(null,map__32765__$1,new cljs.core.Keyword(null,"next-x","next-x",-1503991420));
var map__32766 = p__32764;
var map__32766__$1 = ((((!((map__32766 == null)))?((((map__32766.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32766.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32766):map__32766);
var x_pos = cljs.core.get.call(null,map__32766__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var ch = cljs.core.get.call(null,map__32766__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
var pad = cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,(x_pos - next_x)," "));
return cljs.core.assoc.call(null,cljs.core.update.call(null,result,new cljs.core.Keyword(null,"string","string",-1989541586),cljs.core.str,pad,ch),new cljs.core.Keyword(null,"next-x","next-x",-1503991420),(x_pos + (1)));
});})(i__32740,vec__32760,i,map__32761,map__32761__$1,insert,stack,c__17037__auto__,size__17038__auto__,b__32741,s__32739__$2,temp__4425__auto__,___$1,map__32729,map__32729__$1,postline_states,cursor_line))
,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"next-x","next-x",-1503991420),(0),new cljs.core.Keyword(null,"string","string",-1989541586),""], null),stack));
return cljs.core.apply.call(null,React.createElement,"td",((cljs.core.map_QMARK_.call(null,attrs32737))?sablono.interpreter.attributes.call(null,attrs32737):null),cljs.core.remove.call(null,cljs.core.nil_QMARK_,((cljs.core.map_QMARK_.call(null,attrs32737))?cljs.core.PersistentVector.EMPTY:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.interpreter.interpret.call(null,attrs32737)], null))));
})()));

var G__32778 = (i__32740 + (1));
i__32740 = G__32778;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__32741),parinfer_site$core$state_viewer_$_iter__32738.call(null,cljs.core.chunk_rest.call(null,s__32739__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__32741),null);
}
} else {
var vec__32769 = cljs.core.first.call(null,s__32739__$2);
var i = cljs.core.nth.call(null,vec__32769,(0),null);
var map__32770 = cljs.core.nth.call(null,vec__32769,(1),null);
var map__32770__$1 = ((((!((map__32770 == null)))?((((map__32770.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32770.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32770):map__32770);
var insert = cljs.core.get.call(null,map__32770__$1,new cljs.core.Keyword(null,"insert","insert",1286475395));
var stack = cljs.core.get.call(null,map__32770__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
return cljs.core.cons.call(null,React.createElement("tr",{"className": ((cljs.core._EQ_.call(null,i,self__.cursor_line))?"active-line":null)},(function (){var attrs32734 = (i + (1));
return cljs.core.apply.call(null,React.createElement,"td",((cljs.core.map_QMARK_.call(null,attrs32734))?sablono.interpreter.attributes.call(null,sablono.util.merge_with_class.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["line-no"], null)], null),attrs32734)):{"className": "line-no"}),cljs.core.remove.call(null,cljs.core.nil_QMARK_,((cljs.core.map_QMARK_.call(null,attrs32734))?cljs.core.PersistentVector.EMPTY:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.interpreter.interpret.call(null,attrs32734)], null))));
})(),(function (){var attrs32735 = new cljs.core.Keyword(null,"line-dy","line-dy",41667486).cljs$core$IFn$_invoke$arity$1(insert);
return cljs.core.apply.call(null,React.createElement,"td",((cljs.core.map_QMARK_.call(null,attrs32735))?sablono.interpreter.attributes.call(null,sablono.util.merge_with_class.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["line-dy"], null)], null),attrs32735)):{"className": "line-dy"}),cljs.core.remove.call(null,cljs.core.nil_QMARK_,((cljs.core.map_QMARK_.call(null,attrs32735))?cljs.core.PersistentVector.EMPTY:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.interpreter.interpret.call(null,attrs32735)], null))));
})(),(function (){var attrs32736 = new cljs.core.Keyword(null,"x-pos","x-pos",-382213783).cljs$core$IFn$_invoke$arity$1(insert);
return cljs.core.apply.call(null,React.createElement,"td",((cljs.core.map_QMARK_.call(null,attrs32736))?sablono.interpreter.attributes.call(null,attrs32736):null),cljs.core.remove.call(null,cljs.core.nil_QMARK_,((cljs.core.map_QMARK_.call(null,attrs32736))?cljs.core.PersistentVector.EMPTY:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.interpreter.interpret.call(null,attrs32736)], null))));
})(),(function (){var attrs32737 = new cljs.core.Keyword(null,"string","string",-1989541586).cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.call(null,((function (vec__32769,i,map__32770,map__32770__$1,insert,stack,s__32739__$2,temp__4425__auto__,___$1,map__32729,map__32729__$1,postline_states,cursor_line){
return (function (p__32772,p__32773){
var map__32774 = p__32772;
var map__32774__$1 = ((((!((map__32774 == null)))?((((map__32774.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32774.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32774):map__32774);
var result = map__32774__$1;
var next_x = cljs.core.get.call(null,map__32774__$1,new cljs.core.Keyword(null,"next-x","next-x",-1503991420));
var map__32775 = p__32773;
var map__32775__$1 = ((((!((map__32775 == null)))?((((map__32775.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32775.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32775):map__32775);
var x_pos = cljs.core.get.call(null,map__32775__$1,new cljs.core.Keyword(null,"x-pos","x-pos",-382213783));
var ch = cljs.core.get.call(null,map__32775__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
var pad = cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,(x_pos - next_x)," "));
return cljs.core.assoc.call(null,cljs.core.update.call(null,result,new cljs.core.Keyword(null,"string","string",-1989541586),cljs.core.str,pad,ch),new cljs.core.Keyword(null,"next-x","next-x",-1503991420),(x_pos + (1)));
});})(vec__32769,i,map__32770,map__32770__$1,insert,stack,s__32739__$2,temp__4425__auto__,___$1,map__32729,map__32729__$1,postline_states,cursor_line))
,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"next-x","next-x",-1503991420),(0),new cljs.core.Keyword(null,"string","string",-1989541586),""], null),stack));
return cljs.core.apply.call(null,React.createElement,"td",((cljs.core.map_QMARK_.call(null,attrs32737))?sablono.interpreter.attributes.call(null,attrs32737):null),cljs.core.remove.call(null,cljs.core.nil_QMARK_,((cljs.core.map_QMARK_.call(null,attrs32737))?cljs.core.PersistentVector.EMPTY:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.interpreter.interpret.call(null,attrs32737)], null))));
})()),parinfer_site$core$state_viewer_$_iter__32738.call(null,cljs.core.rest.call(null,s__32739__$2)));
}
} else {
return null;
}
break;
}
});})(___$1,map__32729,map__32729__$1,postline_states,cursor_line))
,null,null));
});})(___$1,map__32729,map__32729__$1,postline_states,cursor_line))
;
return iter__17039__auto__.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,self__.postline_states));
})()));
});})(map__32729,map__32729__$1,postline_states,cursor_line))
;

parinfer_site.core.t_parinfer_site$core32731.getBasis = ((function (map__32729,map__32729__$1,postline_states,cursor_line){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"state-viewer","state-viewer",76240899,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"postline-states","postline-states",-986782091,null),new cljs.core.Symbol(null,"cursor-line","cursor-line",550920520,null)], null)], null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"p__32679","p__32679",-1675260308,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"map__32729","map__32729",-1969084288,null),new cljs.core.Symbol(null,"postline-states","postline-states",-986782091,null),new cljs.core.Symbol(null,"cursor-line","cursor-line",550920520,null),new cljs.core.Symbol(null,"meta32732","meta32732",-946698619,null)], null);
});})(map__32729,map__32729__$1,postline_states,cursor_line))
;

parinfer_site.core.t_parinfer_site$core32731.cljs$lang$type = true;

parinfer_site.core.t_parinfer_site$core32731.cljs$lang$ctorStr = "parinfer-site.core/t_parinfer_site$core32731";

parinfer_site.core.t_parinfer_site$core32731.cljs$lang$ctorPrWriter = ((function (map__32729,map__32729__$1,postline_states,cursor_line){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"parinfer-site.core/t_parinfer_site$core32731");
});})(map__32729,map__32729__$1,postline_states,cursor_line))
;

parinfer_site.core.__GT_t_parinfer_site$core32731 = ((function (map__32729,map__32729__$1,postline_states,cursor_line){
return (function parinfer_site$core$state_viewer_$___GT_t_parinfer_site$core32731(state_viewer__$1,p__32679__$1,owner__$1,map__32729__$2,postline_states__$1,cursor_line__$1,meta32732){
return (new parinfer_site.core.t_parinfer_site$core32731(state_viewer__$1,p__32679__$1,owner__$1,map__32729__$2,postline_states__$1,cursor_line__$1,meta32732));
});})(map__32729,map__32729__$1,postline_states,cursor_line))
;

}

return (new parinfer_site.core.t_parinfer_site$core32731(parinfer_site$core$state_viewer,p__32679,owner,map__32729__$1,postline_states,cursor_line,cljs.core.PersistentArrayMap.EMPTY));
});
parinfer_site.core.render_debug_state_BANG_ = (function parinfer_site$core$render_debug_state_BANG_(){
var temp__4425__auto__ = parinfer_site.editor.create_editor_BANG_.call(null,"code-editor",new cljs.core.Keyword(null,"editor","editor",-989377770),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"viewportMargin","viewportMargin",948056881),Infinity,new cljs.core.Keyword(null,"lineNumbers","lineNumbers",1374890941),true,new cljs.core.Keyword(null,"styleActiveLine","styleActiveLine",-677594147),true], null));
if(cljs.core.truth_(temp__4425__auto__)){
var cm = temp__4425__auto__;
parinfer_site.editor.start_editor_sync_BANG_.call(null);

return om.core.root.call(null,parinfer_site.core.state_viewer,parinfer_site.editor_support.get_prev_state.call(null,cm),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("debug-state")], null));
} else {
return null;
}
});
parinfer_site.core.init_BANG_ = (function parinfer_site$core$init_BANG_(){
if(cljs.core.truth_(window.parinfer_devpage)){
return parinfer_site.core.render_dev_BANG_.call(null);
} else {
if(cljs.core.truth_(window.parinfer_debug_state)){
return parinfer_site.core.render_debug_state_BANG_.call(null);
} else {
return parinfer_site.core.render_index_BANG_.call(null);

}
}
});
parinfer_site.core.init_BANG_.call(null);

//# sourceMappingURL=core.js.map?rel=1449460870986