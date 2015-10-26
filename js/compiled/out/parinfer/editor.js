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
var args38107 = [];
var len__17325__auto___38111 = arguments.length;
var i__17326__auto___38112 = (0);
while(true){
if((i__17326__auto___38112 < len__17325__auto___38111)){
args38107.push((arguments[i__17326__auto___38112]));

var G__38113 = (i__17326__auto___38112 + (1));
i__17326__auto___38112 = G__38113;
continue;
} else {
}
break;
}

var G__38109 = args38107.length;
switch (G__38109) {
case 1:
return parinfer.editor.fix_text_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.editor.fix_text_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args38107.length)].join('')));

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
var format_fn = (function (){var G__38110 = (((mode instanceof cljs.core.Keyword))?mode.fqn:null);
switch (G__38110) {
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
var args38116 = [];
var len__17325__auto___38119 = arguments.length;
var i__17326__auto___38120 = (0);
while(true){
if((i__17326__auto___38120 < len__17325__auto___38119)){
args38116.push((arguments[i__17326__auto___38120]));

var G__38121 = (i__17326__auto___38120 + (1));
i__17326__auto___38120 = G__38121;
continue;
} else {
}
break;
}

var G__38118 = args38116.length;
switch (G__38118) {
case 1:
return parinfer.editor.create_regular_editor_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer.editor.create_regular_editor_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args38116.length)].join('')));

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
var args38125 = [];
var len__17325__auto___38129 = arguments.length;
var i__17326__auto___38130 = (0);
while(true){
if((i__17326__auto___38130 < len__17325__auto___38129)){
args38125.push((arguments[i__17326__auto___38130]));

var G__38131 = (i__17326__auto___38130 + (1));
i__17326__auto___38130 = G__38131;
continue;
} else {
}
break;
}

var G__38127 = args38125.length;
switch (G__38127) {
case 2:
return parinfer.editor.create_editor_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return parinfer.editor.create_editor_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args38125.length)].join('')));

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
return (function (p1__38123_SHARP_){
return cljs.core.assoc.call(null,(function (){var or__16267__auto__ = p1__38123_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return initial_state;
}
})(),new cljs.core.Keyword(null,"cm","cm",540591536),cm,new cljs.core.Keyword(null,"watcher","watcher",2145165251),watcher);
});})(element,cm,wrapper,watcher,initial_state))
);

cljs.core.swap_BANG_.call(null,parinfer.vcr.vcr,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),((function (element,cm,wrapper,watcher,initial_state){
return (function (p1__38124_SHARP_){
var or__16267__auto__ = p1__38124_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return parinfer.vcr.empty_recording;
}
});})(element,cm,wrapper,watcher,initial_state))
);

var x38128_38133 = cm;
x38128_38133.parinfer$editor$IEditor$ = true;

x38128_38133.parinfer$editor$IEditor$cm_key$arity$1 = ((function (x38128_38133,element,cm,wrapper,watcher,initial_state){
return (function (this$){
var this$__$1 = this;
return key_;
});})(x38128_38133,element,cm,wrapper,watcher,initial_state))
;

x38128_38133.parinfer$editor$IEditor$frame_updated_QMARK_$arity$1 = ((function (x38128_38133,element,cm,wrapper,watcher,initial_state){
return (function (this$){
var this$__$1 = this;
return cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer.editor.frame_updates),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null));
});})(x38128_38133,element,cm,wrapper,watcher,initial_state))
;

x38128_38133.parinfer$editor$IEditor$set_frame_updated_BANG_$arity$2 = ((function (x38128_38133,element,cm,wrapper,watcher,initial_state){
return (function (this$,value){
var this$__$1 = this;
return cljs.core.swap_BANG_.call(null,parinfer.editor.frame_updates,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null),value);
});})(x38128_38133,element,cm,wrapper,watcher,initial_state))
;

x38128_38133.parinfer$editor$IEditor$record_change_BANG_$arity$2 = ((function (x38128_38133,element,cm,wrapper,watcher,initial_state){
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
});})(x38128_38133,element,cm,wrapper,watcher,initial_state))
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
var seq__38144 = cljs.core.seq.call(null,new_state);
var chunk__38145 = null;
var count__38146 = (0);
var i__38147 = (0);
while(true){
if((i__38147 < count__38146)){
var vec__38148 = cljs.core._nth.call(null,chunk__38145,i__38147);
var k = cljs.core.nth.call(null,vec__38148,(0),null);
var map__38149 = cljs.core.nth.call(null,vec__38148,(1),null);
var map__38149__$1 = ((((!((map__38149 == null)))?((((map__38149.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38149.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38149):map__38149);
var cm = cljs.core.get.call(null,map__38149__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__38149__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__38154 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__38154){
cm.setValue(text);
} else {
}

var G__38155 = seq__38144;
var G__38156 = chunk__38145;
var G__38157 = count__38146;
var G__38158 = (i__38147 + (1));
seq__38144 = G__38155;
chunk__38145 = G__38156;
count__38146 = G__38157;
i__38147 = G__38158;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__38144);
if(temp__4425__auto__){
var seq__38144__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__38144__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__38144__$1);
var G__38159 = cljs.core.chunk_rest.call(null,seq__38144__$1);
var G__38160 = c__17070__auto__;
var G__38161 = cljs.core.count.call(null,c__17070__auto__);
var G__38162 = (0);
seq__38144 = G__38159;
chunk__38145 = G__38160;
count__38146 = G__38161;
i__38147 = G__38162;
continue;
} else {
var vec__38151 = cljs.core.first.call(null,seq__38144__$1);
var k = cljs.core.nth.call(null,vec__38151,(0),null);
var map__38152 = cljs.core.nth.call(null,vec__38151,(1),null);
var map__38152__$1 = ((((!((map__38152 == null)))?((((map__38152.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38152.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38152):map__38152);
var cm = cljs.core.get.call(null,map__38152__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__38152__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__38163 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__38163){
cm.setValue(text);
} else {
}

var G__38164 = cljs.core.next.call(null,seq__38144__$1);
var G__38165 = null;
var G__38166 = (0);
var G__38167 = (0);
seq__38144 = G__38164;
chunk__38145 = G__38165;
count__38146 = G__38166;
i__38147 = G__38167;
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
var seq__38178 = cljs.core.seq.call(null,cljs.core.deref.call(null,parinfer.state.state));
var chunk__38179 = null;
var count__38180 = (0);
var i__38181 = (0);
while(true){
if((i__38181 < count__38180)){
var vec__38182 = cljs.core._nth.call(null,chunk__38179,i__38181);
var k = cljs.core.nth.call(null,vec__38182,(0),null);
var map__38183 = cljs.core.nth.call(null,vec__38182,(1),null);
var map__38183__$1 = ((((!((map__38183 == null)))?((((map__38183.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38183.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38183):map__38183);
var cm = cljs.core.get.call(null,map__38183__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__38183__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__38188 = seq__38178;
var G__38189 = chunk__38179;
var G__38190 = count__38180;
var G__38191 = (i__38181 + (1));
seq__38178 = G__38188;
chunk__38179 = G__38189;
count__38180 = G__38190;
i__38181 = G__38191;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__38178);
if(temp__4425__auto__){
var seq__38178__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__38178__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__38178__$1);
var G__38192 = cljs.core.chunk_rest.call(null,seq__38178__$1);
var G__38193 = c__17070__auto__;
var G__38194 = cljs.core.count.call(null,c__17070__auto__);
var G__38195 = (0);
seq__38178 = G__38192;
chunk__38179 = G__38193;
count__38180 = G__38194;
i__38181 = G__38195;
continue;
} else {
var vec__38185 = cljs.core.first.call(null,seq__38178__$1);
var k = cljs.core.nth.call(null,vec__38185,(0),null);
var map__38186 = cljs.core.nth.call(null,vec__38185,(1),null);
var map__38186__$1 = ((((!((map__38186 == null)))?((((map__38186.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38186.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38186):map__38186);
var cm = cljs.core.get.call(null,map__38186__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__38186__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__38196 = cljs.core.next.call(null,seq__38178__$1);
var G__38197 = null;
var G__38198 = (0);
var G__38199 = (0);
seq__38178 = G__38196;
chunk__38179 = G__38197;
count__38180 = G__38198;
i__38181 = G__38199;
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

//# sourceMappingURL=editor.js.map?rel=1445823441571