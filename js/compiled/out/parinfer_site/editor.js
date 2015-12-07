// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer_site.editor');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('parinfer_site.state');
goog.require('parinfer_site.editor_support');
goog.require('parinfer_site.vcr');
parinfer_site.editor.frame_updates = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Called before any change is applied to the editor.
 */
parinfer_site.editor.before_change = (function parinfer_site$editor$before_change(cm,change){
if((cljs.core._EQ_.call(null,"setValue",change.origin)) && (cljs.core._EQ_.call(null,cm.getValue(),clojure.string.join.call(null,"\n",change.text)))){
return change.cancel();
} else {
return null;
}
});
/**
 * Called after any change is applied to the editor.
 */
parinfer_site.editor.on_change = (function parinfer_site$editor$on_change(cm,change){
if(cljs.core.not_EQ_.call(null,"setValue",change.origin)){
parinfer_site.editor_support.record_change_BANG_.call(null,cm,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"change","change",-1163046502),parinfer_site.vcr.parse_change.call(null,change)], null));

parinfer_site.editor_support.fix_text_BANG_.call(null,cm,new cljs.core.Keyword(null,"change","change",-1163046502),change);

parinfer_site.editor_support.update_cursor_BANG_.call(null,cm,change);

return parinfer_site.editor_support.set_frame_updated_BANG_.call(null,cm,true);
} else {
return null;
}
});
/**
 * Called after the cursor moves in the editor.
 */
parinfer_site.editor.on_cursor_activity = (function parinfer_site$editor$on_cursor_activity(cm){
if(cljs.core.truth_(parinfer_site.editor_support.frame_updated_QMARK_.call(null,cm))){
} else {
parinfer_site.editor_support.record_change_BANG_.call(null,cm,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selections","selections",-1277610233),parinfer_site.vcr.parse_selections.call(null,cm.listSelections())], null));

parinfer_site.editor_support.fix_text_BANG_.call(null,cm);
}

return parinfer_site.editor_support.set_frame_updated_BANG_.call(null,cm,false);
});
/**
 * Indent selection or insert two spaces when tab is pressed.
 *   from: https://github.com/codemirror/CodeMirror/issues/988#issuecomment-14921785
 */
parinfer_site.editor.on_tab = (function parinfer_site$editor$on_tab(cm){
if(cljs.core.truth_(cm.somethingSelected())){
return cm.indentSelection();
} else {
var n = cm.getOption("indentUnit");
var spaces = cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,n," "));
return cm.replaceSelection(spaces);
}
});
parinfer_site.editor.editor_opts = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"mode","mode",654403691),"clojure-parinfer",new cljs.core.Keyword(null,"theme","theme",-1247880880),"github",new cljs.core.Keyword(null,"matchBrackets","matchBrackets",1256448936),true,new cljs.core.Keyword(null,"extraKeys","extraKeys",1380834830),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"Tab","Tab",-1823302454),parinfer_site.editor.on_tab], null)], null);
(CodeMirror["keyMap"]["default"]["Shift-Tab"] = "indentLess");
/**
 * Create a non-parinfer editor.
 */
parinfer_site.editor.create_regular_editor_BANG_ = (function parinfer_site$editor$create_regular_editor_BANG_(var_args){
var args32458 = [];
var len__17325__auto___32461 = arguments.length;
var i__17326__auto___32462 = (0);
while(true){
if((i__17326__auto___32462 < len__17325__auto___32461)){
args32458.push((arguments[i__17326__auto___32462]));

var G__32463 = (i__17326__auto___32462 + (1));
i__17326__auto___32462 = G__32463;
continue;
} else {
}
break;
}

var G__32460 = args32458.length;
switch (G__32460) {
case 1:
return parinfer_site.editor.create_regular_editor_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer_site.editor.create_regular_editor_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args32458.length)].join('')));

}
});

parinfer_site.editor.create_regular_editor_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (element_id){
return parinfer_site.editor.create_regular_editor_BANG_.call(null,element_id,cljs.core.PersistentArrayMap.EMPTY);
});

parinfer_site.editor.create_regular_editor_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (element_id,opts){
var element = document.getElementById(element_id);
if(cljs.core._EQ_.call(null,"none",element.style.display)){
return null;
} else {
var cm = CodeMirror.fromTextArea(element,cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,parinfer_site.editor.editor_opts,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mode","mode",654403691),"clojure"], null),opts)));
var wrapper = cm.getWrapperElement();
wrapper.id = [cljs.core.str("cm-"),cljs.core.str(element_id)].join('');

return cm;
}
});

parinfer_site.editor.create_regular_editor_BANG_.cljs$lang$maxFixedArity = 2;
/**
 * Create a parinfer editor.
 */
parinfer_site.editor.create_editor_BANG_ = (function parinfer_site$editor$create_editor_BANG_(var_args){
var args32467 = [];
var len__17325__auto___32471 = arguments.length;
var i__17326__auto___32472 = (0);
while(true){
if((i__17326__auto___32472 < len__17325__auto___32471)){
args32467.push((arguments[i__17326__auto___32472]));

var G__32473 = (i__17326__auto___32472 + (1));
i__17326__auto___32472 = G__32473;
continue;
} else {
}
break;
}

var G__32469 = args32467.length;
switch (G__32469) {
case 2:
return parinfer_site.editor.create_editor_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return parinfer_site.editor.create_editor_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args32467.length)].join('')));

}
});

parinfer_site.editor.create_editor_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (element_id,key_){
return parinfer_site.editor.create_editor_BANG_.call(null,element_id,key_,cljs.core.PersistentArrayMap.EMPTY);
});

parinfer_site.editor.create_editor_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (element_id,key_,opts){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_site.state.state),key_))){
return null;
} else {
var element = document.getElementById(element_id);
var cm = CodeMirror.fromTextArea(element,cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,parinfer_site.editor.editor_opts,opts)));
var wrapper = cm.getWrapperElement();
var watcher = scrollMonitor.create(wrapper);
var initial_state = cljs.core.assoc.call(null,parinfer_site.state.empty_editor_state,new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"parinfer-mode","parinfer-mode",-851652980).cljs$core$IFn$_invoke$arity$1(opts));
var prev_editor_state = cljs.core.atom.call(null,null);
wrapper.id = [cljs.core.str("cm-"),cljs.core.str(element_id)].join('');

if(cljs.core.truth_(new cljs.core.Keyword(null,"readOnly","readOnly",-1749118317).cljs$core$IFn$_invoke$arity$1(opts))){
} else {
cm.on("blur",((function (element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (e){
if(cljs.core.truth_(new cljs.core.Keyword(null,"show?","show?",1543842127).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,parinfer_site.vcr.controls_state)))){
return null;
} else {
if(cljs.core.truth_(watcher.isInViewport)){
return parinfer_site.vcr.play_recording_BANG_.call(null,key_);
} else {
return null;
}
}
});})(element,cm,wrapper,watcher,initial_state,prev_editor_state))
);

cm.on("focus",((function (element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (e){
cljs.core.swap_BANG_.call(null,parinfer_site.vcr.controls_state,cljs.core.assoc,new cljs.core.Keyword(null,"target-key","target-key",-1657436029),key_);

parinfer_site.vcr.stop_playing_BANG_.call(null,key_);

return parinfer_site.editor.on_cursor_activity.call(null,cm);
});})(element,cm,wrapper,watcher,initial_state,prev_editor_state))
);
}

if(cljs.core.truth_(cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_site.state.state),key_))){
} else {
cljs.core.swap_BANG_.call(null,parinfer_site.editor.frame_updates,cljs.core.assoc,key_,cljs.core.PersistentArrayMap.EMPTY);
}

cljs.core.swap_BANG_.call(null,parinfer_site.state.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),((function (element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (p1__32465_SHARP_){
return cljs.core.assoc.call(null,(function (){var or__16267__auto__ = p1__32465_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return initial_state;
}
})(),new cljs.core.Keyword(null,"cm","cm",540591536),cm,new cljs.core.Keyword(null,"watcher","watcher",2145165251),watcher);
});})(element,cm,wrapper,watcher,initial_state,prev_editor_state))
);

cljs.core.swap_BANG_.call(null,parinfer_site.vcr.vcr,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),((function (element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (p1__32466_SHARP_){
var or__16267__auto__ = p1__32466_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return parinfer_site.vcr.empty_recording;
}
});})(element,cm,wrapper,watcher,initial_state,prev_editor_state))
);

var x32470_32475 = cm;
x32470_32475.parinfer_site$editor_support$IEditor$ = true;

x32470_32475.parinfer_site$editor_support$IEditor$get_prev_state$arity$1 = ((function (x32470_32475,element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return prev_editor_state;
});})(x32470_32475,element,cm,wrapper,watcher,initial_state,prev_editor_state))
;

x32470_32475.parinfer_site$editor_support$IEditor$cm_key$arity$1 = ((function (x32470_32475,element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return key_;
});})(x32470_32475,element,cm,wrapper,watcher,initial_state,prev_editor_state))
;

x32470_32475.parinfer_site$editor_support$IEditor$frame_updated_QMARK_$arity$1 = ((function (x32470_32475,element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer_site.editor.frame_updates),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null));
});})(x32470_32475,element,cm,wrapper,watcher,initial_state,prev_editor_state))
;

x32470_32475.parinfer_site$editor_support$IEditor$set_frame_updated_BANG_$arity$2 = ((function (x32470_32475,element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (this$,value){
var this$__$1 = this;
return cljs.core.swap_BANG_.call(null,parinfer_site.editor.frame_updates,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null),value);
});})(x32470_32475,element,cm,wrapper,watcher,initial_state,prev_editor_state))
;

x32470_32475.parinfer_site$editor_support$IEditor$record_change_BANG_$arity$2 = ((function (x32470_32475,element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (this$,new_thing){
var this$__$1 = this;
var data = cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_site.vcr.vcr),key_);
if(cljs.core.truth_(new cljs.core.Keyword(null,"recording?","recording?",-1477514924).cljs$core$IFn$_invoke$arity$1(data))){
var last_time = new cljs.core.Keyword(null,"last-time","last-time",-1707132740).cljs$core$IFn$_invoke$arity$1(data);
var now = (new Date()).getTime();
var dt = (cljs.core.truth_(last_time)?(now - last_time):(0));
var new_changes = cljs.core.conj.call(null,new cljs.core.Keyword(null,"changes","changes",1492088).cljs$core$IFn$_invoke$arity$1(data),cljs.core.assoc.call(null,new_thing,new cljs.core.Keyword(null,"dt","dt",-368444759),dt));
var new_data = cljs.core.assoc.call(null,data,new cljs.core.Keyword(null,"last-time","last-time",-1707132740),now,new cljs.core.Keyword(null,"changes","changes",1492088),new_changes);
return cljs.core.swap_BANG_.call(null,parinfer_site.vcr.vcr,cljs.core.assoc,key_,new_data);
} else {
return null;
}
});})(x32470_32475,element,cm,wrapper,watcher,initial_state,prev_editor_state))
;


cm.on("change",parinfer_site.editor.on_change);

cm.on("beforeChange",parinfer_site.editor.before_change);

cm.on("cursorActivity",parinfer_site.editor.on_cursor_activity);

return cm;
}
});

parinfer_site.editor.create_editor_BANG_.cljs$lang$maxFixedArity = 3;
/**
 * Called everytime the state changes to sync the code editor.
 */
parinfer_site.editor.on_state_change = (function parinfer_site$editor$on_state_change(_,___$1,old_state,new_state){
var seq__32486 = cljs.core.seq.call(null,new_state);
var chunk__32487 = null;
var count__32488 = (0);
var i__32489 = (0);
while(true){
if((i__32489 < count__32488)){
var vec__32490 = cljs.core._nth.call(null,chunk__32487,i__32489);
var k = cljs.core.nth.call(null,vec__32490,(0),null);
var map__32491 = cljs.core.nth.call(null,vec__32490,(1),null);
var map__32491__$1 = ((((!((map__32491 == null)))?((((map__32491.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32491.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32491):map__32491);
var cm = cljs.core.get.call(null,map__32491__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__32491__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__32496 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__32496){
cm.setValue(text);
} else {
}

var G__32497 = seq__32486;
var G__32498 = chunk__32487;
var G__32499 = count__32488;
var G__32500 = (i__32489 + (1));
seq__32486 = G__32497;
chunk__32487 = G__32498;
count__32488 = G__32499;
i__32489 = G__32500;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__32486);
if(temp__4425__auto__){
var seq__32486__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__32486__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__32486__$1);
var G__32501 = cljs.core.chunk_rest.call(null,seq__32486__$1);
var G__32502 = c__17070__auto__;
var G__32503 = cljs.core.count.call(null,c__17070__auto__);
var G__32504 = (0);
seq__32486 = G__32501;
chunk__32487 = G__32502;
count__32488 = G__32503;
i__32489 = G__32504;
continue;
} else {
var vec__32493 = cljs.core.first.call(null,seq__32486__$1);
var k = cljs.core.nth.call(null,vec__32493,(0),null);
var map__32494 = cljs.core.nth.call(null,vec__32493,(1),null);
var map__32494__$1 = ((((!((map__32494 == null)))?((((map__32494.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32494.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32494):map__32494);
var cm = cljs.core.get.call(null,map__32494__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__32494__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__32505 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__32505){
cm.setValue(text);
} else {
}

var G__32506 = cljs.core.next.call(null,seq__32486__$1);
var G__32507 = null;
var G__32508 = (0);
var G__32509 = (0);
seq__32486 = G__32506;
chunk__32487 = G__32507;
count__32488 = G__32508;
i__32489 = G__32509;
continue;
}
} else {
return null;
}
}
break;
}
});
parinfer_site.editor.force_editor_sync_BANG_ = (function parinfer_site$editor$force_editor_sync_BANG_(){
var seq__32520 = cljs.core.seq.call(null,cljs.core.deref.call(null,parinfer_site.state.state));
var chunk__32521 = null;
var count__32522 = (0);
var i__32523 = (0);
while(true){
if((i__32523 < count__32522)){
var vec__32524 = cljs.core._nth.call(null,chunk__32521,i__32523);
var k = cljs.core.nth.call(null,vec__32524,(0),null);
var map__32525 = cljs.core.nth.call(null,vec__32524,(1),null);
var map__32525__$1 = ((((!((map__32525 == null)))?((((map__32525.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32525.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32525):map__32525);
var cm = cljs.core.get.call(null,map__32525__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__32525__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__32530 = seq__32520;
var G__32531 = chunk__32521;
var G__32532 = count__32522;
var G__32533 = (i__32523 + (1));
seq__32520 = G__32530;
chunk__32521 = G__32531;
count__32522 = G__32532;
i__32523 = G__32533;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__32520);
if(temp__4425__auto__){
var seq__32520__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__32520__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__32520__$1);
var G__32534 = cljs.core.chunk_rest.call(null,seq__32520__$1);
var G__32535 = c__17070__auto__;
var G__32536 = cljs.core.count.call(null,c__17070__auto__);
var G__32537 = (0);
seq__32520 = G__32534;
chunk__32521 = G__32535;
count__32522 = G__32536;
i__32523 = G__32537;
continue;
} else {
var vec__32527 = cljs.core.first.call(null,seq__32520__$1);
var k = cljs.core.nth.call(null,vec__32527,(0),null);
var map__32528 = cljs.core.nth.call(null,vec__32527,(1),null);
var map__32528__$1 = ((((!((map__32528 == null)))?((((map__32528.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32528.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32528):map__32528);
var cm = cljs.core.get.call(null,map__32528__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__32528__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__32538 = cljs.core.next.call(null,seq__32520__$1);
var G__32539 = null;
var G__32540 = (0);
var G__32541 = (0);
seq__32520 = G__32538;
chunk__32521 = G__32539;
count__32522 = G__32540;
i__32523 = G__32541;
continue;
}
} else {
return null;
}
}
break;
}
});
parinfer_site.editor.start_editor_sync_BANG_ = (function parinfer_site$editor$start_editor_sync_BANG_(){
cljs.core.add_watch.call(null,parinfer_site.state.state,new cljs.core.Keyword(null,"editor-updater","editor-updater",-323951652),parinfer_site.editor.on_state_change);

return parinfer_site.editor.force_editor_sync_BANG_.call(null);
});

//# sourceMappingURL=editor.js.map?rel=1449460870767