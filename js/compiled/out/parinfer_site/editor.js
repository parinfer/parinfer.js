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
var args22405 = [];
var len__17325__auto___22408 = arguments.length;
var i__17326__auto___22409 = (0);
while(true){
if((i__17326__auto___22409 < len__17325__auto___22408)){
args22405.push((arguments[i__17326__auto___22409]));

var G__22410 = (i__17326__auto___22409 + (1));
i__17326__auto___22409 = G__22410;
continue;
} else {
}
break;
}

var G__22407 = args22405.length;
switch (G__22407) {
case 1:
return parinfer_site.editor.create_regular_editor_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer_site.editor.create_regular_editor_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args22405.length)].join('')));

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
var args22414 = [];
var len__17325__auto___22418 = arguments.length;
var i__17326__auto___22419 = (0);
while(true){
if((i__17326__auto___22419 < len__17325__auto___22418)){
args22414.push((arguments[i__17326__auto___22419]));

var G__22420 = (i__17326__auto___22419 + (1));
i__17326__auto___22419 = G__22420;
continue;
} else {
}
break;
}

var G__22416 = args22414.length;
switch (G__22416) {
case 2:
return parinfer_site.editor.create_editor_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return parinfer_site.editor.create_editor_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args22414.length)].join('')));

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
return (function (p1__22412_SHARP_){
return cljs.core.assoc.call(null,(function (){var or__16267__auto__ = p1__22412_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return initial_state;
}
})(),new cljs.core.Keyword(null,"cm","cm",540591536),cm,new cljs.core.Keyword(null,"watcher","watcher",2145165251),watcher);
});})(element,cm,wrapper,watcher,initial_state,prev_editor_state))
);

cljs.core.swap_BANG_.call(null,parinfer_site.vcr.vcr,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),((function (element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (p1__22413_SHARP_){
var or__16267__auto__ = p1__22413_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return parinfer_site.vcr.empty_recording;
}
});})(element,cm,wrapper,watcher,initial_state,prev_editor_state))
);

var x22417_22422 = cm;
x22417_22422.parinfer_site$editor_support$IEditor$ = true;

x22417_22422.parinfer_site$editor_support$IEditor$get_prev_state$arity$1 = ((function (x22417_22422,element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return prev_editor_state;
});})(x22417_22422,element,cm,wrapper,watcher,initial_state,prev_editor_state))
;

x22417_22422.parinfer_site$editor_support$IEditor$cm_key$arity$1 = ((function (x22417_22422,element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return key_;
});})(x22417_22422,element,cm,wrapper,watcher,initial_state,prev_editor_state))
;

x22417_22422.parinfer_site$editor_support$IEditor$frame_updated_QMARK_$arity$1 = ((function (x22417_22422,element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer_site.editor.frame_updates),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null));
});})(x22417_22422,element,cm,wrapper,watcher,initial_state,prev_editor_state))
;

x22417_22422.parinfer_site$editor_support$IEditor$set_frame_updated_BANG_$arity$2 = ((function (x22417_22422,element,cm,wrapper,watcher,initial_state,prev_editor_state){
return (function (this$,value){
var this$__$1 = this;
return cljs.core.swap_BANG_.call(null,parinfer_site.editor.frame_updates,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null),value);
});})(x22417_22422,element,cm,wrapper,watcher,initial_state,prev_editor_state))
;

x22417_22422.parinfer_site$editor_support$IEditor$record_change_BANG_$arity$2 = ((function (x22417_22422,element,cm,wrapper,watcher,initial_state,prev_editor_state){
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
});})(x22417_22422,element,cm,wrapper,watcher,initial_state,prev_editor_state))
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
var seq__22433 = cljs.core.seq.call(null,new_state);
var chunk__22434 = null;
var count__22435 = (0);
var i__22436 = (0);
while(true){
if((i__22436 < count__22435)){
var vec__22437 = cljs.core._nth.call(null,chunk__22434,i__22436);
var k = cljs.core.nth.call(null,vec__22437,(0),null);
var map__22438 = cljs.core.nth.call(null,vec__22437,(1),null);
var map__22438__$1 = ((((!((map__22438 == null)))?((((map__22438.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22438.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22438):map__22438);
var cm = cljs.core.get.call(null,map__22438__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__22438__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__22443 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__22443){
cm.setValue(text);
} else {
}

var G__22444 = seq__22433;
var G__22445 = chunk__22434;
var G__22446 = count__22435;
var G__22447 = (i__22436 + (1));
seq__22433 = G__22444;
chunk__22434 = G__22445;
count__22435 = G__22446;
i__22436 = G__22447;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__22433);
if(temp__4425__auto__){
var seq__22433__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22433__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__22433__$1);
var G__22448 = cljs.core.chunk_rest.call(null,seq__22433__$1);
var G__22449 = c__17070__auto__;
var G__22450 = cljs.core.count.call(null,c__17070__auto__);
var G__22451 = (0);
seq__22433 = G__22448;
chunk__22434 = G__22449;
count__22435 = G__22450;
i__22436 = G__22451;
continue;
} else {
var vec__22440 = cljs.core.first.call(null,seq__22433__$1);
var k = cljs.core.nth.call(null,vec__22440,(0),null);
var map__22441 = cljs.core.nth.call(null,vec__22440,(1),null);
var map__22441__$1 = ((((!((map__22441 == null)))?((((map__22441.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22441.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22441):map__22441);
var cm = cljs.core.get.call(null,map__22441__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__22441__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__22452 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__22452){
cm.setValue(text);
} else {
}

var G__22453 = cljs.core.next.call(null,seq__22433__$1);
var G__22454 = null;
var G__22455 = (0);
var G__22456 = (0);
seq__22433 = G__22453;
chunk__22434 = G__22454;
count__22435 = G__22455;
i__22436 = G__22456;
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
var seq__22467 = cljs.core.seq.call(null,cljs.core.deref.call(null,parinfer_site.state.state));
var chunk__22468 = null;
var count__22469 = (0);
var i__22470 = (0);
while(true){
if((i__22470 < count__22469)){
var vec__22471 = cljs.core._nth.call(null,chunk__22468,i__22470);
var k = cljs.core.nth.call(null,vec__22471,(0),null);
var map__22472 = cljs.core.nth.call(null,vec__22471,(1),null);
var map__22472__$1 = ((((!((map__22472 == null)))?((((map__22472.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22472.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22472):map__22472);
var cm = cljs.core.get.call(null,map__22472__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__22472__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__22477 = seq__22467;
var G__22478 = chunk__22468;
var G__22479 = count__22469;
var G__22480 = (i__22470 + (1));
seq__22467 = G__22477;
chunk__22468 = G__22478;
count__22469 = G__22479;
i__22470 = G__22480;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__22467);
if(temp__4425__auto__){
var seq__22467__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22467__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__22467__$1);
var G__22481 = cljs.core.chunk_rest.call(null,seq__22467__$1);
var G__22482 = c__17070__auto__;
var G__22483 = cljs.core.count.call(null,c__17070__auto__);
var G__22484 = (0);
seq__22467 = G__22481;
chunk__22468 = G__22482;
count__22469 = G__22483;
i__22470 = G__22484;
continue;
} else {
var vec__22474 = cljs.core.first.call(null,seq__22467__$1);
var k = cljs.core.nth.call(null,vec__22474,(0),null);
var map__22475 = cljs.core.nth.call(null,vec__22474,(1),null);
var map__22475__$1 = ((((!((map__22475 == null)))?((((map__22475.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22475.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22475):map__22475);
var cm = cljs.core.get.call(null,map__22475__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__22475__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__22485 = cljs.core.next.call(null,seq__22467__$1);
var G__22486 = null;
var G__22487 = (0);
var G__22488 = (0);
seq__22467 = G__22485;
chunk__22468 = G__22486;
count__22469 = G__22487;
i__22470 = G__22488;
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

//# sourceMappingURL=editor.js.map?rel=1450835341334