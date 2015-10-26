// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer.core');
goog.require('cljs.core');
goog.require('parinfer.format.infer');
goog.require('ajax.core');
goog.require('parinfer.vcr_data');
goog.require('parinfer.toc');
goog.require('parinfer.editor');
goog.require('parinfer.vcr');
goog.require('clojure.string');
goog.require('parinfer.format.prep');
goog.require('parinfer.state');
cljs.core.enable_console_print_BANG_.call(null);
parinfer.core.create_index_editors_BANG_ = (function parinfer$core$create_index_editors_BANG_(){
parinfer.editor.create_editor_BANG_.call(null,"code-indent",new cljs.core.Keyword(null,"indent","indent",-148200125));

parinfer.editor.create_editor_BANG_.call(null,"code-indent-far",new cljs.core.Keyword(null,"indent-far","indent-far",-1792364104));

parinfer.editor.create_editor_BANG_.call(null,"code-indent-multi",new cljs.core.Keyword(null,"indent-multi","indent-multi",92834895));

parinfer.editor.create_editor_BANG_.call(null,"code-line",new cljs.core.Keyword(null,"line","line",212345235));

parinfer.editor.create_editor_BANG_.call(null,"code-comment",new cljs.core.Keyword(null,"comment","comment",532206069));

parinfer.editor.create_editor_BANG_.call(null,"code-wrap",new cljs.core.Keyword(null,"wrap","wrap",851669987));

parinfer.editor.create_editor_BANG_.call(null,"code-splice",new cljs.core.Keyword(null,"splice","splice",449588165));

parinfer.editor.create_editor_BANG_.call(null,"code-barf",new cljs.core.Keyword(null,"barf","barf",1329753296));

parinfer.editor.create_editor_BANG_.call(null,"code-slurp",new cljs.core.Keyword(null,"slurp","slurp",1288450555));

parinfer.editor.create_editor_BANG_.call(null,"code-string",new cljs.core.Keyword(null,"string","string",-1989541586));

parinfer.editor.create_editor_BANG_.call(null,"code-enter",new cljs.core.Keyword(null,"enter","enter",1792452624));

var opts_38283 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"readOnly","readOnly",-1749118317),true], null);
var cm_good_38284 = parinfer.editor.create_editor_BANG_.call(null,"code-warn-good",new cljs.core.Keyword(null,"warn-good","warn-good",-1077746036),opts_38283);
var cm_bad_38285 = parinfer.editor.create_editor_BANG_.call(null,"code-warn-bad",new cljs.core.Keyword(null,"warn-bad","warn-bad",-2133697481),opts_38283);
if(cljs.core.truth_(cm_good_38284)){
cm_good_38284.refresh();
} else {
}

if(cljs.core.truth_(cm_bad_38285)){
cm_bad_38285.refresh();
} else {
}

parinfer.editor.create_editor_BANG_.call(null,"code-displaced",new cljs.core.Keyword(null,"displaced","displaced",-136492349));

parinfer.editor.create_editor_BANG_.call(null,"code-not-displaced",new cljs.core.Keyword(null,"not-displaced","not-displaced",-1750218077));

var opts_38286 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"parinfer-mode","parinfer-mode",-851652980),new cljs.core.Keyword(null,"prep","prep",2123042288)], null);
parinfer.editor.create_editor_BANG_.call(null,"code-paren-tune",new cljs.core.Keyword(null,"paren-tune","paren-tune",-218999215),opts_38286);

parinfer.editor.create_editor_BANG_.call(null,"code-paren-frac",new cljs.core.Keyword(null,"paren-frac","paren-frac",858872585),opts_38286);

parinfer.editor.create_editor_BANG_.call(null,"code-paren-comment",new cljs.core.Keyword(null,"paren-comment","paren-comment",263180335),opts_38286);

parinfer.editor.create_editor_BANG_.call(null,"code-paren-wrap",new cljs.core.Keyword(null,"paren-wrap","paren-wrap",1218947070),opts_38286);

parinfer.editor.start_editor_sync_BANG_.call(null);

parinfer.editor.create_regular_editor_BANG_.call(null,"code-lisp-style");

parinfer.editor.create_regular_editor_BANG_.call(null,"code-c-style");

parinfer.editor.create_regular_editor_BANG_.call(null,"code-skim");

parinfer.editor.create_regular_editor_BANG_.call(null,"code-inspect",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"matchBrackets","matchBrackets",1256448936),true], null));

var cm_input_38287 = parinfer.editor.create_regular_editor_BANG_.call(null,"code-how-input");
var cm_output_38288 = parinfer.editor.create_regular_editor_BANG_.call(null,"code-how-output",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"readOnly","readOnly",-1749118317),true,new cljs.core.Keyword(null,"mode","mode",654403691),"clojure-parinfer"], null));
var sync_BANG__38289 = ((function (cm_input_38287,cm_output_38288){
return (function (){
return cm_output_38288.setValue(parinfer.format.infer.format_text.call(null,cm_input_38287.getValue()));
});})(cm_input_38287,cm_output_38288))
;
if(cljs.core.truth_(cm_input_38287)){
cm_input_38287.on("change",sync_BANG__38289);

sync_BANG__38289.call(null);
} else {
}

if(cljs.core.truth_(cm_input_38287)){
cm_input_38287.refresh();
} else {
}

if(cljs.core.truth_(cm_output_38288)){
cm_output_38288.refresh();
} else {
}

var cm_input = parinfer.editor.create_regular_editor_BANG_.call(null,"code-edit-input");
var cm_output = parinfer.editor.create_regular_editor_BANG_.call(null,"code-edit-output",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"readOnly","readOnly",-1749118317),true,new cljs.core.Keyword(null,"mode","mode",654403691),"clojure-parinfer"], null));
var sync_BANG_ = ((function (cm_input,cm_output){
return (function (){
return cm_output.setValue((function (){var or__16267__auto__ = parinfer.format.prep.format_text.call(null,cm_input.getValue());
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return "; ERROR: input must be balanced!";
}
})());
});})(cm_input,cm_output))
;
if(cljs.core.truth_(cm_input)){
cm_input.on("change",sync_BANG_);

sync_BANG_.call(null);
} else {
}

if(cljs.core.truth_(cm_input)){
cm_input.refresh();
} else {
}

if(cljs.core.truth_(cm_output)){
return cm_output.refresh();
} else {
return null;
}
});
parinfer.core.animate_when_visible_BANG_ = (function parinfer$core$animate_when_visible_BANG_(key_){
var G__38291 = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer.state.state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"watcher","watcher",2145165251)], null));
G__38291.enterViewport(((function (G__38291){
return (function (){
return parinfer.vcr.play_recording_BANG_.call(null,key_);
});})(G__38291))
);

G__38291.exitViewport(((function (G__38291){
return (function (){
return parinfer.vcr.stop_playing_BANG_.call(null,key_);
});})(G__38291))
);

return G__38291;
});
parinfer.core.index_anims = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"indent","indent",-148200125),new cljs.core.Keyword(null,"not-displaced","not-displaced",-1750218077),new cljs.core.Keyword(null,"displaced","displaced",-136492349),new cljs.core.Keyword(null,"wrap","wrap",851669987),new cljs.core.Keyword(null,"splice","splice",449588165),new cljs.core.Keyword(null,"paren-frac","paren-frac",858872585),new cljs.core.Keyword(null,"warn-good","warn-good",-1077746036),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.Keyword(null,"paren-comment","paren-comment",263180335),new cljs.core.Keyword(null,"indent-multi","indent-multi",92834895),new cljs.core.Keyword(null,"enter","enter",1792452624),new cljs.core.Keyword(null,"barf","barf",1329753296),new cljs.core.Keyword(null,"paren-tune","paren-tune",-218999215),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"comment","comment",532206069),new cljs.core.Keyword(null,"warn-bad","warn-bad",-2133697481),new cljs.core.Keyword(null,"indent-far","indent-far",-1792364104),new cljs.core.Keyword(null,"slurp","slurp",1288450555),new cljs.core.Keyword(null,"paren-wrap","paren-wrap",1218947070)],[parinfer.vcr_data.indent,parinfer.vcr_data.not_displaced,parinfer.vcr_data.displaced,parinfer.vcr_data.wrap,parinfer.vcr_data.splice,parinfer.vcr_data.paren_frac,parinfer.vcr_data.warn_good,parinfer.vcr_data.string,parinfer.vcr_data.paren_comment,parinfer.vcr_data.indent_multi,parinfer.vcr_data.enter,parinfer.vcr_data.barf,parinfer.vcr_data.paren_tune,parinfer.vcr_data.line,parinfer.vcr_data.comment_,parinfer.vcr_data.warn_bad,parinfer.vcr_data.indent_far,parinfer.vcr_data.slurp_,parinfer.vcr_data.paren_wrap]);
parinfer.core.load_index_anims_BANG_ = (function parinfer$core$load_index_anims_BANG_(){
cljs.core.swap_BANG_.call(null,parinfer.vcr.vcr,(function (data){
return cljs.core.reduce.call(null,(function (result,p__38300){
var vec__38301 = p__38300;
var key_ = cljs.core.nth.call(null,vec__38301,(0),null);
var state = cljs.core.nth.call(null,vec__38301,(1),null);
return cljs.core.update.call(null,result,key_,cljs.core.merge,state);
}),data,parinfer.core.index_anims);
}));

var seq__38302 = cljs.core.seq.call(null,parinfer.core.index_anims);
var chunk__38303 = null;
var count__38304 = (0);
var i__38305 = (0);
while(true){
if((i__38305 < count__38304)){
var vec__38306 = cljs.core._nth.call(null,chunk__38303,i__38305);
var key_ = cljs.core.nth.call(null,vec__38306,(0),null);
var _ = cljs.core.nth.call(null,vec__38306,(1),null);
parinfer.core.animate_when_visible_BANG_.call(null,key_);

var G__38308 = seq__38302;
var G__38309 = chunk__38303;
var G__38310 = count__38304;
var G__38311 = (i__38305 + (1));
seq__38302 = G__38308;
chunk__38303 = G__38309;
count__38304 = G__38310;
i__38305 = G__38311;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__38302);
if(temp__4425__auto__){
var seq__38302__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__38302__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__38302__$1);
var G__38312 = cljs.core.chunk_rest.call(null,seq__38302__$1);
var G__38313 = c__17070__auto__;
var G__38314 = cljs.core.count.call(null,c__17070__auto__);
var G__38315 = (0);
seq__38302 = G__38312;
chunk__38303 = G__38313;
count__38304 = G__38314;
i__38305 = G__38315;
continue;
} else {
var vec__38307 = cljs.core.first.call(null,seq__38302__$1);
var key_ = cljs.core.nth.call(null,vec__38307,(0),null);
var _ = cljs.core.nth.call(null,vec__38307,(1),null);
parinfer.core.animate_when_visible_BANG_.call(null,key_);

var G__38316 = cljs.core.next.call(null,seq__38302__$1);
var G__38317 = null;
var G__38318 = (0);
var G__38319 = (0);
seq__38302 = G__38316;
chunk__38303 = G__38317;
count__38304 = G__38318;
i__38305 = G__38319;
continue;
}
} else {
return null;
}
}
break;
}
});
parinfer.core.render_index_BANG_ = (function parinfer$core$render_index_BANG_(){
parinfer.toc.init_BANG_.call(null);

parinfer.core.create_index_editors_BANG_.call(null);

parinfer.core.load_index_anims_BANG_.call(null);

return parinfer.vcr.render_controls_BANG_.call(null);
});
parinfer.core.render_dev_BANG_ = (function parinfer$core$render_dev_BANG_(){
parinfer.editor.create_editor_BANG_.call(null,"code-indent-mode",new cljs.core.Keyword(null,"indent-mode","indent-mode",1737814542));

parinfer.editor.create_editor_BANG_.call(null,"code-paren-mode",new cljs.core.Keyword(null,"paren-mode","paren-mode",-2068924645),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"parinfer-mode","parinfer-mode",-851652980),new cljs.core.Keyword(null,"prep","prep",2123042288)], null));

return parinfer.editor.start_editor_sync_BANG_.call(null);
});
parinfer.core.init_BANG_ = (function parinfer$core$init_BANG_(){
if(cljs.core.truth_(window.parinfer_devpage)){
return parinfer.core.render_dev_BANG_.call(null);
} else {
return parinfer.core.render_index_BANG_.call(null);
}
});
parinfer.core.init_BANG_.call(null);

//# sourceMappingURL=core.js.map?rel=1445823441713