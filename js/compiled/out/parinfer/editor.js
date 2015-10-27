// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer.editor');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('parinfer.format.infer');
goog.require('parinfer.format.prep');
goog.require('parinfer.state');
goog.require('parinfer.vcr');

/**
 * Custom data/methods for a CodeMirror editor.
 * @interface
 */
parinfer.editor.IEditor = function(){};

parinfer.editor.cm_key = (function parinfer$editor$cm_key(this$){
if((!((this$ == null))) && (!((this$.parinfer$editor$IEditor$cm_key$arity$1 == null)))){
return this$.parinfer$editor$IEditor$cm_key$arity$1(this$);
} else {
var x__16922__auto__ = (((this$ == null))?null:this$);
var m__16923__auto__ = (parinfer.editor.cm_key[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,this$);
} else {
var m__16923__auto____$1 = (parinfer.editor.cm_key["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"IEditor.cm-key",this$);
}
}
}
});

parinfer.editor.frame_updated_QMARK_ = (function parinfer$editor$frame_updated_QMARK_(this$){
if((!((this$ == null))) && (!((this$.parinfer$editor$IEditor$frame_updated_QMARK_$arity$1 == null)))){
return this$.parinfer$editor$IEditor$frame_updated_QMARK_$arity$1(this$);
} else {
var x__16922__auto__ = (((this$ == null))?null:this$);
var m__16923__auto__ = (parinfer.editor.frame_updated_QMARK_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,this$);
} else {
var m__16923__auto____$1 = (parinfer.editor.frame_updated_QMARK_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"IEditor.frame-updated?",this$);
}
}
}
});

parinfer.editor.set_frame_updated_BANG_ = (function parinfer$editor$set_frame_updated_BANG_(this$,value){
if((!((this$ == null))) && (!((this$.parinfer$editor$IEditor$set_frame_updated_BANG_$arity$2 == null)))){
return this$.parinfer$editor$IEditor$set_frame_updated_BANG_$arity$2(this$,value);
} else {
var x__16922__auto__ = (((this$ == null))?null:this$);
var m__16923__auto__ = (parinfer.editor.set_frame_updated_BANG_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,this$,value);
} else {
var m__16923__auto____$1 = (parinfer.editor.set_frame_updated_BANG_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,this$,value);
} else {
throw cljs.core.missing_protocol.call(null,"IEditor.set-frame-updated!",this$);
}
}
}
});

parinfer.editor.record_change_BANG_ = (function parinfer$editor$record_change_BANG_(this$,thing){
if((!((this$ == null))) && (!((this$.parinfer$editor$IEditor$record_change_BANG_$arity$2 == null)))){
return this$.parinfer$editor$IEditor$record_change_BANG_$arity$2(this$,thing);
} else {
var x__16922__auto__ = (((this$ == null))?null:this$);
var m__16923__auto__ = (parinfer.editor.record_change_BANG_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,this$,thing);
} else {
var m__16923__auto____$1 = (parinfer.editor.record_change_BANG_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,this$,thing);
} else {
throw cljs.core.missing_protocol.call(null,"IEditor.record-change!",this$);
}
}
}
});

parinfer.editor.compute_cursor_dx = (function parinfer$editor$compute_cursor_dx(cursor,change){
if(cljs.core.truth_(change)){
var ignore_QMARK_ = cljs.core._EQ_.call(null,"+indenthack",change.origin);
if(ignore_QMARK_){
return (0);
} else {
var start_x = change.to.ch;
var new_lines = change.text;
var len_last_line = cljs.core.count.call(null,cljs.core.last.call(null,new_lines));
var end_x = (((cljs.core.count.call(null,new_lines) > (1)))?len_last_line:(len_last_line + change.from.ch));
return (end_x - start_x);
}
} else {
return null;
}
});
/**
 * Correctly format the text from the given editor.
 */
parinfer.editor.fix_text_BANG_ = (function parinfer$editor$fix_text_BANG_(var_args){
var args47365 = [];
var len__17325__auto___47369 = arguments.length;
var i__17326__auto___47370 = (0);
while(true){
if((i__17326__auto___47370 < len__17325__auto___47369)){
args47365.push((arguments[i__17326__auto___47370]));

var G__47371 = (i__17326__auto___47370 + (1));
i__17326__auto___47370 = G__47371;
continue;
} else {
}
break;
}

var G__47367 = args47365.length;
switch (G__47367) {
case 1:
return parinfer.editor.fix_text_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.editor.fix_text_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47365.length)].join('')));

}
});

parinfer.editor.fix_text_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (cm){
return parinfer.editor.fix_text_BANG_.call(null,cm,null);
});

parinfer.editor.fix_text_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (cm,change){
var current_text = cm.getValue();
var selection_QMARK_ = cm.somethingSelected();
var selections = cm.listSelections();
var cursor = cm.getCursor();
var scroller = cm.getScrollerElement();
var scroll_x = scroller.scrollLeft;
var scroll_y = scroller.scrollTop;
var opts = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007),cursor.line,new cljs.core.Keyword(null,"cursor-x","cursor-x",475204266),cursor.ch,new cljs.core.Keyword(null,"cursor-dx","cursor-dx",133069327),parinfer.editor.compute_cursor_dx.call(null,cursor,change)], null);
var key_ = parinfer.editor.cm_key.call(null,cm);
var mode = (function (){var or__16267__auto__ = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer.state.state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"mode","mode",654403691)], null));
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return new cljs.core.Keyword(null,"infer","infer",-403321830);
}
})();
var format_fn = (function (){var G__47368 = (((mode instanceof cljs.core.Keyword))?mode.fqn:null);
switch (G__47368) {
case "infer":
return parinfer.format.infer.format_text;

break;
case "prep":
return parinfer.format.prep.format_text;

break;
default:
return null;

}
})();
var new_text = format_fn.call(null,opts,current_text);
cljs.core.swap_BANG_.call(null,parinfer.state.state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"text","text",-1790561697)], null),new_text);

if(cljs.core.truth_(selection_QMARK_)){
cm.setSelections(selections);
} else {
cm.setCursor(cursor);
}

return cm.scrollTo(scroll_x,scroll_y);
});

parinfer.editor.fix_text_BANG_.cljs$lang$maxFixedArity = 2;
/**
 * Correctly position cursor after text that was just typed.
 *   We need this since reformatting the text can shift things forward past our cursor.
 */
parinfer.editor.update_cursor_BANG_ = (function parinfer$editor$update_cursor_BANG_(cm,change){
if(cljs.core._EQ_.call(null,"+input",change.origin)){
var selection_QMARK_ = cm.somethingSelected();
var text = clojure.string.join.call(null,"\n",change.text);
var from_x = change.from.ch;
var line_no = change.from.line;
var line = cm.getLine(line_no);
var insert_x = line.indexOf(text,from_x);
var after_x = (insert_x + cljs.core.count.call(null,text));
if(cljs.core.truth_(selection_QMARK_)){
return null;
} else {
if(cljs.core._EQ_.call(null,text,"\n")){
return null;
} else {
if(cljs.core._EQ_.call(null,text,";")){
return cm.setCursor(line_no,after_x);
} else {
if((cljs.core._EQ_.call(null,(-1),insert_x)) || ((insert_x > from_x))){
return cm.setCursor(line_no,from_x);
} else {
return null;

}
}
}
}
} else {
return null;
}
});
parinfer.editor.frame_updates = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Called before any change is applied to the editor.
 */
parinfer.editor.before_change = (function parinfer$editor$before_change(cm,change){
if((cljs.core._EQ_.call(null,"setValue",change.origin)) && (cljs.core._EQ_.call(null,cm.getValue(),clojure.string.join.call(null,"\n",change.text)))){
return change.cancel();
} else {
return null;
}
});
/**
 * Called after any change is applied to the editor.
 */
parinfer.editor.on_change = (function parinfer$editor$on_change(cm,change){
if(cljs.core.not_EQ_.call(null,"setValue",change.origin)){
parinfer.editor.record_change_BANG_.call(null,cm,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"change","change",-1163046502),parinfer.vcr.parse_change.call(null,change)], null));

parinfer.editor.fix_text_BANG_.call(null,cm,change);

parinfer.editor.update_cursor_BANG_.call(null,cm,change);

return parinfer.editor.set_frame_updated_BANG_.call(null,cm,true);
} else {
return null;
}
});
/**
 * Called after the cursor moves in the editor.
 */
parinfer.editor.on_cursor_activity = (function parinfer$editor$on_cursor_activity(cm){
if(cljs.core.truth_(parinfer.editor.frame_updated_QMARK_.call(null,cm))){
} else {
parinfer.editor.record_change_BANG_.call(null,cm,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selections","selections",-1277610233),parinfer.vcr.parse_selections.call(null,cm.listSelections())], null));

parinfer.editor.fix_text_BANG_.call(null,cm);
}

return parinfer.editor.set_frame_updated_BANG_.call(null,cm,false);
});
/**
 * Indent selection or insert two spaces when tab is pressed.
 *   from: https://github.com/codemirror/CodeMirror/issues/988#issuecomment-14921785
 */
parinfer.editor.on_tab = (function parinfer$editor$on_tab(cm){
if(cljs.core.truth_(cm.somethingSelected())){
return cm.indentSelection();
} else {
var n = cm.getOption("indentUnit");
var spaces = cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,n," "));
return cm.replaceSelection(spaces);
}
});
parinfer.editor.editor_opts = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"mode","mode",654403691),"clojure-parinfer",new cljs.core.Keyword(null,"theme","theme",-1247880880),"github",new cljs.core.Keyword(null,"matchBrackets","matchBrackets",1256448936),true,new cljs.core.Keyword(null,"extraKeys","extraKeys",1380834830),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"Tab","Tab",-1823302454),parinfer.editor.on_tab], null)], null);
(CodeMirror["keyMap"]["default"]["Shift-Tab"] = "indentLess");
/**
 * Create a non-parinfer editor.
 */
parinfer.editor.create_regular_editor_BANG_ = (function parinfer$editor$create_regular_editor_BANG_(var_args){
var args47374 = [];
var len__17325__auto___47377 = arguments.length;
var i__17326__auto___47378 = (0);
while(true){
if((i__17326__auto___47378 < len__17325__auto___47377)){
args47374.push((arguments[i__17326__auto___47378]));

var G__47379 = (i__17326__auto___47378 + (1));
i__17326__auto___47378 = G__47379;
continue;
} else {
}
break;
}

var G__47376 = args47374.length;
switch (G__47376) {
case 1:
return parinfer.editor.create_regular_editor_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.editor.create_regular_editor_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47374.length)].join('')));

}
});

parinfer.editor.create_regular_editor_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (element_id){
return parinfer.editor.create_regular_editor_BANG_.call(null,element_id,cljs.core.PersistentArrayMap.EMPTY);
});

parinfer.editor.create_regular_editor_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (element_id,opts){
var element = document.getElementById(element_id);
if(cljs.core._EQ_.call(null,"none",element.style.display)){
return null;
} else {
var cm = CodeMirror.fromTextArea(element,cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,parinfer.editor.editor_opts,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mode","mode",654403691),"clojure"], null),opts)));
var wrapper = cm.getWrapperElement();
wrapper.id = [cljs.core.str("cm-"),cljs.core.str(element_id)].join('');

return cm;
}
});

parinfer.editor.create_regular_editor_BANG_.cljs$lang$maxFixedArity = 2;
/**
 * Create a parinfer editor.
 */
parinfer.editor.create_editor_BANG_ = (function parinfer$editor$create_editor_BANG_(var_args){
var args47383 = [];
var len__17325__auto___47387 = arguments.length;
var i__17326__auto___47388 = (0);
while(true){
if((i__17326__auto___47388 < len__17325__auto___47387)){
args47383.push((arguments[i__17326__auto___47388]));

var G__47389 = (i__17326__auto___47388 + (1));
i__17326__auto___47388 = G__47389;
continue;
} else {
}
break;
}

var G__47385 = args47383.length;
switch (G__47385) {
case 2:
return parinfer.editor.create_editor_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return parinfer.editor.create_editor_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47383.length)].join('')));

}
});

parinfer.editor.create_editor_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (element_id,key_){
return parinfer.editor.create_editor_BANG_.call(null,element_id,key_,cljs.core.PersistentArrayMap.EMPTY);
});

parinfer.editor.create_editor_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (element_id,key_,opts){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.core.deref.call(null,parinfer.state.state),key_))){
return null;
} else {
var element = document.getElementById(element_id);
var cm = CodeMirror.fromTextArea(element,cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,parinfer.editor.editor_opts,opts)));
var wrapper = cm.getWrapperElement();
var watcher = scrollMonitor.create(wrapper);
var initial_state = cljs.core.assoc.call(null,parinfer.state.empty_editor_state,new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"parinfer-mode","parinfer-mode",-851652980).cljs$core$IFn$_invoke$arity$1(opts));
wrapper.id = [cljs.core.str("cm-"),cljs.core.str(element_id)].join('');

if(cljs.core.truth_(new cljs.core.Keyword(null,"readOnly","readOnly",-1749118317).cljs$core$IFn$_invoke$arity$1(opts))){
} else {
cm.on("blur",((function (element,cm,wrapper,watcher,initial_state){
return (function (e){
if(cljs.core.truth_(new cljs.core.Keyword(null,"show?","show?",1543842127).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,parinfer.vcr.controls_state)))){
return null;
} else {
if(cljs.core.truth_(watcher.isInViewport)){
return parinfer.vcr.play_recording_BANG_.call(null,key_);
} else {
return null;
}
}
});})(element,cm,wrapper,watcher,initial_state))
);

cm.on("focus",((function (element,cm,wrapper,watcher,initial_state){
return (function (e){
cljs.core.swap_BANG_.call(null,parinfer.vcr.controls_state,cljs.core.assoc,new cljs.core.Keyword(null,"target-key","target-key",-1657436029),key_);

parinfer.vcr.stop_playing_BANG_.call(null,key_);

return parinfer.editor.on_cursor_activity.call(null,cm);
});})(element,cm,wrapper,watcher,initial_state))
);
}

if(cljs.core.truth_(cljs.core.get.call(null,cljs.core.deref.call(null,parinfer.state.state),key_))){
} else {
cljs.core.swap_BANG_.call(null,parinfer.editor.frame_updates,cljs.core.assoc,key_,cljs.core.PersistentArrayMap.EMPTY);
}

cljs.core.swap_BANG_.call(null,parinfer.state.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),((function (element,cm,wrapper,watcher,initial_state){
return (function (p1__47381_SHARP_){
return cljs.core.assoc.call(null,(function (){var or__16267__auto__ = p1__47381_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return initial_state;
}
})(),new cljs.core.Keyword(null,"cm","cm",540591536),cm,new cljs.core.Keyword(null,"watcher","watcher",2145165251),watcher);
});})(element,cm,wrapper,watcher,initial_state))
);

cljs.core.swap_BANG_.call(null,parinfer.vcr.vcr,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),((function (element,cm,wrapper,watcher,initial_state){
return (function (p1__47382_SHARP_){
var or__16267__auto__ = p1__47382_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return parinfer.vcr.empty_recording;
}
});})(element,cm,wrapper,watcher,initial_state))
);

var x47386_47391 = cm;
x47386_47391.parinfer$editor$IEditor$ = true;

x47386_47391.parinfer$editor$IEditor$cm_key$arity$1 = ((function (x47386_47391,element,cm,wrapper,watcher,initial_state){
return (function (this$){
var this$__$1 = this;
return key_;
});})(x47386_47391,element,cm,wrapper,watcher,initial_state))
;

x47386_47391.parinfer$editor$IEditor$frame_updated_QMARK_$arity$1 = ((function (x47386_47391,element,cm,wrapper,watcher,initial_state){
return (function (this$){
var this$__$1 = this;
return cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer.editor.frame_updates),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null));
});})(x47386_47391,element,cm,wrapper,watcher,initial_state))
;

x47386_47391.parinfer$editor$IEditor$set_frame_updated_BANG_$arity$2 = ((function (x47386_47391,element,cm,wrapper,watcher,initial_state){
return (function (this$,value){
var this$__$1 = this;
return cljs.core.swap_BANG_.call(null,parinfer.editor.frame_updates,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null),value);
});})(x47386_47391,element,cm,wrapper,watcher,initial_state))
;

x47386_47391.parinfer$editor$IEditor$record_change_BANG_$arity$2 = ((function (x47386_47391,element,cm,wrapper,watcher,initial_state){
return (function (this$,new_thing){
var this$__$1 = this;
var data = cljs.core.get.call(null,cljs.core.deref.call(null,parinfer.vcr.vcr),key_);
if(cljs.core.truth_(new cljs.core.Keyword(null,"recording?","recording?",-1477514924).cljs$core$IFn$_invoke$arity$1(data))){
var last_time = new cljs.core.Keyword(null,"last-time","last-time",-1707132740).cljs$core$IFn$_invoke$arity$1(data);
var now = (new Date()).getTime();
var dt = (cljs.core.truth_(last_time)?(now - last_time):(0));
var new_changes = cljs.core.conj.call(null,new cljs.core.Keyword(null,"changes","changes",1492088).cljs$core$IFn$_invoke$arity$1(data),cljs.core.assoc.call(null,new_thing,new cljs.core.Keyword(null,"dt","dt",-368444759),dt));
var new_data = cljs.core.assoc.call(null,data,new cljs.core.Keyword(null,"last-time","last-time",-1707132740),now,new cljs.core.Keyword(null,"changes","changes",1492088),new_changes);
return cljs.core.swap_BANG_.call(null,parinfer.vcr.vcr,cljs.core.assoc,key_,new_data);
} else {
return null;
}
});})(x47386_47391,element,cm,wrapper,watcher,initial_state))
;


cm.on("change",parinfer.editor.on_change);

cm.on("beforeChange",parinfer.editor.before_change);

cm.on("cursorActivity",parinfer.editor.on_cursor_activity);

return cm;
}
});

parinfer.editor.create_editor_BANG_.cljs$lang$maxFixedArity = 3;
/**
 * Called everytime the state changes to sync the code editor.
 */
parinfer.editor.on_state_change = (function parinfer$editor$on_state_change(_,___$1,old_state,new_state){
var seq__47402 = cljs.core.seq.call(null,new_state);
var chunk__47403 = null;
var count__47404 = (0);
var i__47405 = (0);
while(true){
if((i__47405 < count__47404)){
var vec__47406 = cljs.core._nth.call(null,chunk__47403,i__47405);
var k = cljs.core.nth.call(null,vec__47406,(0),null);
var map__47407 = cljs.core.nth.call(null,vec__47406,(1),null);
var map__47407__$1 = ((((!((map__47407 == null)))?((((map__47407.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47407.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47407):map__47407);
var cm = cljs.core.get.call(null,map__47407__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__47407__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__47412 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__47412){
cm.setValue(text);
} else {
}

var G__47413 = seq__47402;
var G__47414 = chunk__47403;
var G__47415 = count__47404;
var G__47416 = (i__47405 + (1));
seq__47402 = G__47413;
chunk__47403 = G__47414;
count__47404 = G__47415;
i__47405 = G__47416;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__47402);
if(temp__4425__auto__){
var seq__47402__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__47402__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__47402__$1);
var G__47417 = cljs.core.chunk_rest.call(null,seq__47402__$1);
var G__47418 = c__17070__auto__;
var G__47419 = cljs.core.count.call(null,c__17070__auto__);
var G__47420 = (0);
seq__47402 = G__47417;
chunk__47403 = G__47418;
count__47404 = G__47419;
i__47405 = G__47420;
continue;
} else {
var vec__47409 = cljs.core.first.call(null,seq__47402__$1);
var k = cljs.core.nth.call(null,vec__47409,(0),null);
var map__47410 = cljs.core.nth.call(null,vec__47409,(1),null);
var map__47410__$1 = ((((!((map__47410 == null)))?((((map__47410.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47410.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47410):map__47410);
var cm = cljs.core.get.call(null,map__47410__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__47410__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__47421 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__47421){
cm.setValue(text);
} else {
}

var G__47422 = cljs.core.next.call(null,seq__47402__$1);
var G__47423 = null;
var G__47424 = (0);
var G__47425 = (0);
seq__47402 = G__47422;
chunk__47403 = G__47423;
count__47404 = G__47424;
i__47405 = G__47425;
continue;
}
} else {
return null;
}
}
break;
}
});
parinfer.editor.force_editor_sync_BANG_ = (function parinfer$editor$force_editor_sync_BANG_(){
var seq__47436 = cljs.core.seq.call(null,cljs.core.deref.call(null,parinfer.state.state));
var chunk__47437 = null;
var count__47438 = (0);
var i__47439 = (0);
while(true){
if((i__47439 < count__47438)){
var vec__47440 = cljs.core._nth.call(null,chunk__47437,i__47439);
var k = cljs.core.nth.call(null,vec__47440,(0),null);
var map__47441 = cljs.core.nth.call(null,vec__47440,(1),null);
var map__47441__$1 = ((((!((map__47441 == null)))?((((map__47441.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47441.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47441):map__47441);
var cm = cljs.core.get.call(null,map__47441__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__47441__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__47446 = seq__47436;
var G__47447 = chunk__47437;
var G__47448 = count__47438;
var G__47449 = (i__47439 + (1));
seq__47436 = G__47446;
chunk__47437 = G__47447;
count__47438 = G__47448;
i__47439 = G__47449;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__47436);
if(temp__4425__auto__){
var seq__47436__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__47436__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__47436__$1);
var G__47450 = cljs.core.chunk_rest.call(null,seq__47436__$1);
var G__47451 = c__17070__auto__;
var G__47452 = cljs.core.count.call(null,c__17070__auto__);
var G__47453 = (0);
seq__47436 = G__47450;
chunk__47437 = G__47451;
count__47438 = G__47452;
i__47439 = G__47453;
continue;
} else {
var vec__47443 = cljs.core.first.call(null,seq__47436__$1);
var k = cljs.core.nth.call(null,vec__47443,(0),null);
var map__47444 = cljs.core.nth.call(null,vec__47443,(1),null);
var map__47444__$1 = ((((!((map__47444 == null)))?((((map__47444.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47444.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47444):map__47444);
var cm = cljs.core.get.call(null,map__47444__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__47444__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__47454 = cljs.core.next.call(null,seq__47436__$1);
var G__47455 = null;
var G__47456 = (0);
var G__47457 = (0);
seq__47436 = G__47454;
chunk__47437 = G__47455;
count__47438 = G__47456;
i__47439 = G__47457;
continue;
}
} else {
return null;
}
}
break;
}
});
parinfer.editor.start_editor_sync_BANG_ = (function parinfer$editor$start_editor_sync_BANG_(){
cljs.core.add_watch.call(null,parinfer.state.state,new cljs.core.Keyword(null,"editor-updater","editor-updater",-323951652),parinfer.editor.on_state_change);

return parinfer.editor.force_editor_sync_BANG_.call(null);
});

//# sourceMappingURL=editor.js.map?rel=1445965100680