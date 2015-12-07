// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer_site.vcr');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('om.core');
goog.require('sablono.core');
goog.require('parinfer_site.state');
goog.require('parinfer_site.editor_support');
goog.require('cljs.pprint');
goog.require('goog.dom');
if(typeof parinfer_site.vcr.vcr !== 'undefined'){
} else {
parinfer_site.vcr.vcr = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
parinfer_site.vcr.empty_recording = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"changes","changes",1492088),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"init-value","init-value",-374892331),null,new cljs.core.Keyword(null,"last-time","last-time",-1707132740),null,new cljs.core.Keyword(null,"recording?","recording?",-1477514924),false], null);
parinfer_site.vcr.parse_pos = (function parinfer_site$vcr$parse_pos(pos){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",212345235),pos.line,new cljs.core.Keyword(null,"ch","ch",-554717905),pos.ch], null);
});
parinfer_site.vcr.parse_change = (function parinfer_site$vcr$parse_change(change){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"from","from",1815293044),parinfer_site.vcr.parse_pos.call(null,change.from),new cljs.core.Keyword(null,"to","to",192099007),parinfer_site.vcr.parse_pos.call(null,change.to),new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.seq.call(null,change.text),new cljs.core.Keyword(null,"origin","origin",1037372088),change.origin], null);
});
parinfer_site.vcr.apply_change = (function parinfer_site$vcr$apply_change(cm,p__31164){
var map__31167 = p__31164;
var map__31167__$1 = ((((!((map__31167 == null)))?((((map__31167.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31167.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31167):map__31167);
var text = cljs.core.get.call(null,map__31167__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var from = cljs.core.get.call(null,map__31167__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var to = cljs.core.get.call(null,map__31167__$1,new cljs.core.Keyword(null,"to","to",192099007));
var origin = cljs.core.get.call(null,map__31167__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
return cm.replaceRange(cljs.core.clj__GT_js.call(null,text),cljs.core.clj__GT_js.call(null,from),cljs.core.clj__GT_js.call(null,to),origin);
});
parinfer_site.vcr.parse_selection = (function parinfer_site$vcr$parse_selection(selection){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"anchor","anchor",1549638489),parinfer_site.vcr.parse_pos.call(null,selection.anchor),new cljs.core.Keyword(null,"head","head",-771383919),parinfer_site.vcr.parse_pos.call(null,selection.head)], null);
});
parinfer_site.vcr.parse_selections = (function parinfer_site$vcr$parse_selections(selections){
return cljs.core.map.call(null,parinfer_site.vcr.parse_selection,selections);
});
parinfer_site.vcr.apply_selections = (function parinfer_site$vcr$apply_selections(cm,selections){
return cm.setSelections(cljs.core.clj__GT_js.call(null,selections));
});
parinfer_site.vcr.start_recording_BANG_ = (function parinfer_site$vcr$start_recording_BANG_(key_){
var map__31171 = cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_site.state.state),key_);
var map__31171__$1 = ((((!((map__31171 == null)))?((((map__31171.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31171.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31171):map__31171);
var editor = map__31171__$1;
var text = cljs.core.get.call(null,map__31171__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var cm = cljs.core.get.call(null,map__31171__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
return cljs.core.swap_BANG_.call(null,parinfer_site.vcr.vcr,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),cljs.core.assoc,new cljs.core.Keyword(null,"changes","changes",1492088),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"init-value","init-value",-374892331),text,new cljs.core.Keyword(null,"recording?","recording?",-1477514924),true,new cljs.core.Keyword(null,"last-time","last-time",-1707132740),null);
});
parinfer_site.vcr.done_recording_BANG_ = (function parinfer_site$vcr$done_recording_BANG_(key_){
return cljs.core.swap_BANG_.call(null,parinfer_site.vcr.vcr,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"recording?","recording?",-1477514924)], null),false);
});
parinfer_site.vcr.play_recording_BANG_ = (function parinfer_site$vcr$play_recording_BANG_(key_){
var temp__4425__auto___31491 = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer_site.vcr.vcr),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983)], null));
if(cljs.core.truth_(temp__4425__auto___31491)){
var stop_chan_31492 = temp__4425__auto___31491;
cljs.core.async.close_BANG_.call(null,stop_chan_31492);
} else {
}

if(cljs.core.seq.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer_site.vcr.vcr),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"changes","changes",1492088)], null)))){
cljs.core.swap_BANG_.call(null,parinfer_site.vcr.vcr,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983)], null),cljs.core.async.chan.call(null));

var cm = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer_site.state.state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"cm","cm",540591536)], null));
var recording = cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_site.vcr.vcr),key_);
var timescale = cljs.core.get.call(null,recording,new cljs.core.Keyword(null,"timescale","timescale",-904011507),(1));
var loop_QMARK_ = cljs.core.get.call(null,recording,new cljs.core.Keyword(null,"loop?","loop?",457687798),true);
var loop_delay = cljs.core.get.call(null,recording,new cljs.core.Keyword(null,"loop-delay","loop-delay",72874403),(2000));
var element = cm.getWrapperElement();
var cursor = goog.dom.getElementByClass("CodeMirror-cursors",element);
cursor.style.visibility = "visible";

var c__20534__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function (state_31430){
var state_val_31431 = (state_31430[(1)]);
if((state_val_31431 === (7))){
var state_31430__$1 = state_31430;
var statearr_31432_31493 = state_31430__$1;
(statearr_31432_31493[(2)] = null);

(statearr_31432_31493[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (20))){
var state_31430__$1 = state_31430;
var statearr_31433_31494 = state_31430__$1;
(statearr_31433_31494[(2)] = null);

(statearr_31433_31494[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (27))){
var inst_31394 = (state_31430[(2)]);
var state_31430__$1 = state_31430;
var statearr_31434_31495 = state_31430__$1;
(statearr_31434_31495[(2)] = inst_31394);

(statearr_31434_31495[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (1))){
var state_31430__$1 = state_31430;
var statearr_31435_31496 = state_31430__$1;
(statearr_31435_31496[(2)] = null);

(statearr_31435_31496[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (24))){
var inst_31341 = (state_31430[(7)]);
var inst_31396 = (state_31430[(2)]);
var inst_31397 = cljs.core.rest.call(null,inst_31341);
var inst_31341__$1 = inst_31397;
var state_31430__$1 = (function (){var statearr_31436 = state_31430;
(statearr_31436[(8)] = inst_31396);

(statearr_31436[(7)] = inst_31341__$1);

return statearr_31436;
})();
var statearr_31437_31497 = state_31430__$1;
(statearr_31437_31497[(2)] = null);

(statearr_31437_31497[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (4))){
var inst_31341 = (state_31430[(7)]);
var inst_31343 = cljs.core.seq.call(null,inst_31341);
var state_31430__$1 = state_31430;
if(inst_31343){
var statearr_31438_31498 = state_31430__$1;
(statearr_31438_31498[(1)] = (6));

} else {
var statearr_31439_31499 = state_31430__$1;
(statearr_31439_31499[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (15))){
var inst_31347 = (state_31430[(9)]);
var inst_31364 = cljs.core.apply.call(null,cljs.core.hash_map,inst_31347);
var state_31430__$1 = state_31430;
var statearr_31440_31500 = state_31430__$1;
(statearr_31440_31500[(2)] = inst_31364);

(statearr_31440_31500[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (21))){
var inst_31401 = (state_31430[(2)]);
var state_31430__$1 = state_31430;
var statearr_31441_31501 = state_31430__$1;
(statearr_31441_31501[(2)] = inst_31401);

(statearr_31441_31501[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (31))){
var inst_31410 = (state_31430[(10)]);
var inst_31409 = cljs.core.async.timeout.call(null,loop_delay);
var inst_31410__$1 = new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983).cljs$core$IFn$_invoke$arity$1(recording);
var inst_31411 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_31412 = [inst_31409,inst_31410__$1];
var inst_31413 = (new cljs.core.PersistentVector(null,2,(5),inst_31411,inst_31412,null));
var state_31430__$1 = (function (){var statearr_31442 = state_31430;
(statearr_31442[(10)] = inst_31410__$1);

return statearr_31442;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_31430__$1,(34),inst_31413);
} else {
if((state_val_31431 === (32))){
var state_31430__$1 = state_31430;
var statearr_31443_31502 = state_31430__$1;
(statearr_31443_31502[(2)] = null);

(statearr_31443_31502[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (33))){
var inst_31426 = (state_31430[(2)]);
var state_31430__$1 = state_31430;
var statearr_31444_31503 = state_31430__$1;
(statearr_31444_31503[(2)] = inst_31426);

(statearr_31444_31503[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (13))){
var state_31430__$1 = state_31430;
var statearr_31445_31504 = state_31430__$1;
(statearr_31445_31504[(2)] = false);

(statearr_31445_31504[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (22))){
var inst_31368 = (state_31430[(11)]);
var inst_31384 = parinfer_site.vcr.apply_change.call(null,cm,inst_31368);
var state_31430__$1 = state_31430;
var statearr_31446_31505 = state_31430__$1;
(statearr_31446_31505[(2)] = inst_31384);

(statearr_31446_31505[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (36))){
var state_31430__$1 = state_31430;
var statearr_31447_31506 = state_31430__$1;
(statearr_31447_31506[(2)] = null);

(statearr_31447_31506[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (29))){
var state_31430__$1 = state_31430;
var statearr_31448_31507 = state_31430__$1;
(statearr_31448_31507[(2)] = null);

(statearr_31448_31507[(1)] = (30));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (6))){
var inst_31347 = (state_31430[(9)]);
var inst_31341 = (state_31430[(7)]);
var inst_31347__$1 = cljs.core.first.call(null,inst_31341);
var inst_31349 = (inst_31347__$1 == null);
var inst_31350 = cljs.core.not.call(null,inst_31349);
var state_31430__$1 = (function (){var statearr_31449 = state_31430;
(statearr_31449[(9)] = inst_31347__$1);

return statearr_31449;
})();
if(inst_31350){
var statearr_31450_31508 = state_31430__$1;
(statearr_31450_31508[(1)] = (9));

} else {
var statearr_31451_31509 = state_31430__$1;
(statearr_31451_31509[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (28))){
var state_31430__$1 = state_31430;
var statearr_31452_31510 = state_31430__$1;
(statearr_31452_31510[(2)] = null);

(statearr_31452_31510[(1)] = (30));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (25))){
var inst_31369 = (state_31430[(12)]);
var inst_31387 = parinfer_site.vcr.apply_selections.call(null,cm,inst_31369);
var state_31430__$1 = state_31430;
var statearr_31453_31511 = state_31430__$1;
(statearr_31453_31511[(2)] = inst_31387);

(statearr_31453_31511[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (34))){
var inst_31410 = (state_31430[(10)]);
var inst_31415 = (state_31430[(2)]);
var inst_31416 = cljs.core.nth.call(null,inst_31415,(0),null);
var inst_31417 = cljs.core.nth.call(null,inst_31415,(1),null);
var inst_31418 = cljs.core.not_EQ_.call(null,inst_31417,inst_31410);
var state_31430__$1 = (function (){var statearr_31454 = state_31430;
(statearr_31454[(13)] = inst_31416);

return statearr_31454;
})();
if(inst_31418){
var statearr_31455_31512 = state_31430__$1;
(statearr_31455_31512[(1)] = (35));

} else {
var statearr_31456_31513 = state_31430__$1;
(statearr_31456_31513[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (17))){
var inst_31373 = (state_31430[(14)]);
var inst_31367 = (state_31430[(2)]);
var inst_31368 = cljs.core.get.call(null,inst_31367,new cljs.core.Keyword(null,"change","change",-1163046502));
var inst_31369 = cljs.core.get.call(null,inst_31367,new cljs.core.Keyword(null,"selections","selections",-1277610233));
var inst_31370 = cljs.core.get.call(null,inst_31367,new cljs.core.Keyword(null,"dt","dt",-368444759));
var inst_31371 = (inst_31370 / timescale);
var inst_31372 = cljs.core.async.timeout.call(null,inst_31371);
var inst_31373__$1 = new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983).cljs$core$IFn$_invoke$arity$1(recording);
var inst_31374 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_31375 = [inst_31372,inst_31373__$1];
var inst_31376 = (new cljs.core.PersistentVector(null,2,(5),inst_31374,inst_31375,null));
var state_31430__$1 = (function (){var statearr_31457 = state_31430;
(statearr_31457[(14)] = inst_31373__$1);

(statearr_31457[(12)] = inst_31369);

(statearr_31457[(11)] = inst_31368);

return statearr_31457;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_31430__$1,(18),inst_31376);
} else {
if((state_val_31431 === (3))){
var inst_31428 = (state_31430[(2)]);
var state_31430__$1 = state_31430;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31430__$1,inst_31428);
} else {
if((state_val_31431 === (12))){
var state_31430__$1 = state_31430;
var statearr_31458_31514 = state_31430__$1;
(statearr_31458_31514[(2)] = true);

(statearr_31458_31514[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (2))){
var inst_31333 = parinfer_site.editor_support.get_prev_state.call(null,cm);
var inst_31334 = cljs.core.reset_BANG_.call(null,inst_31333,null);
var inst_31335 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_31336 = [key_,new cljs.core.Keyword(null,"text","text",-1790561697)];
var inst_31337 = (new cljs.core.PersistentVector(null,2,(5),inst_31335,inst_31336,null));
var inst_31338 = new cljs.core.Keyword(null,"init-value","init-value",-374892331).cljs$core$IFn$_invoke$arity$1(recording);
var inst_31339 = cljs.core.swap_BANG_.call(null,parinfer_site.state.state,cljs.core.assoc_in,inst_31337,inst_31338);
var inst_31340 = new cljs.core.Keyword(null,"changes","changes",1492088).cljs$core$IFn$_invoke$arity$1(recording);
var inst_31341 = inst_31340;
var state_31430__$1 = (function (){var statearr_31459 = state_31430;
(statearr_31459[(15)] = inst_31339);

(statearr_31459[(16)] = inst_31334);

(statearr_31459[(7)] = inst_31341);

return statearr_31459;
})();
var statearr_31460_31515 = state_31430__$1;
(statearr_31460_31515[(2)] = null);

(statearr_31460_31515[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (23))){
var inst_31369 = (state_31430[(12)]);
var state_31430__$1 = state_31430;
if(cljs.core.truth_(inst_31369)){
var statearr_31461_31516 = state_31430__$1;
(statearr_31461_31516[(1)] = (25));

} else {
var statearr_31462_31517 = state_31430__$1;
(statearr_31462_31517[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (35))){
var state_31430__$1 = state_31430;
var statearr_31463_31518 = state_31430__$1;
(statearr_31463_31518[(2)] = null);

(statearr_31463_31518[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (19))){
var inst_31368 = (state_31430[(11)]);
var state_31430__$1 = state_31430;
if(cljs.core.truth_(inst_31368)){
var statearr_31464_31519 = state_31430__$1;
(statearr_31464_31519[(1)] = (22));

} else {
var statearr_31465_31520 = state_31430__$1;
(statearr_31465_31520[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (11))){
var inst_31362 = (state_31430[(2)]);
var state_31430__$1 = state_31430;
if(cljs.core.truth_(inst_31362)){
var statearr_31466_31521 = state_31430__$1;
(statearr_31466_31521[(1)] = (15));

} else {
var statearr_31467_31522 = state_31430__$1;
(statearr_31467_31522[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (9))){
var inst_31347 = (state_31430[(9)]);
var inst_31352 = inst_31347.cljs$lang$protocol_mask$partition0$;
var inst_31353 = (inst_31352 & (64));
var inst_31354 = inst_31347.cljs$core$ISeq$;
var inst_31355 = (inst_31353) || (inst_31354);
var state_31430__$1 = state_31430;
if(cljs.core.truth_(inst_31355)){
var statearr_31468_31523 = state_31430__$1;
(statearr_31468_31523[(1)] = (12));

} else {
var statearr_31469_31524 = state_31430__$1;
(statearr_31469_31524[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (5))){
var inst_31406 = (state_31430[(2)]);
var state_31430__$1 = (function (){var statearr_31470 = state_31430;
(statearr_31470[(17)] = inst_31406);

return statearr_31470;
})();
if(cljs.core.truth_(loop_QMARK_)){
var statearr_31471_31525 = state_31430__$1;
(statearr_31471_31525[(1)] = (31));

} else {
var statearr_31472_31526 = state_31430__$1;
(statearr_31472_31526[(1)] = (32));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (14))){
var inst_31359 = (state_31430[(2)]);
var state_31430__$1 = state_31430;
var statearr_31473_31527 = state_31430__$1;
(statearr_31473_31527[(2)] = inst_31359);

(statearr_31473_31527[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (26))){
var state_31430__$1 = state_31430;
var statearr_31474_31528 = state_31430__$1;
(statearr_31474_31528[(1)] = (28));



return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (16))){
var inst_31347 = (state_31430[(9)]);
var state_31430__$1 = state_31430;
var statearr_31476_31529 = state_31430__$1;
(statearr_31476_31529[(2)] = inst_31347);

(statearr_31476_31529[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (30))){
var inst_31392 = (state_31430[(2)]);
var state_31430__$1 = state_31430;
var statearr_31477_31530 = state_31430__$1;
(statearr_31477_31530[(2)] = inst_31392);

(statearr_31477_31530[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (10))){
var state_31430__$1 = state_31430;
var statearr_31478_31531 = state_31430__$1;
(statearr_31478_31531[(2)] = false);

(statearr_31478_31531[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (18))){
var inst_31373 = (state_31430[(14)]);
var inst_31378 = (state_31430[(2)]);
var inst_31379 = cljs.core.nth.call(null,inst_31378,(0),null);
var inst_31380 = cljs.core.nth.call(null,inst_31378,(1),null);
var inst_31381 = cljs.core.not_EQ_.call(null,inst_31380,inst_31373);
var state_31430__$1 = (function (){var statearr_31479 = state_31430;
(statearr_31479[(18)] = inst_31379);

return statearr_31479;
})();
if(inst_31381){
var statearr_31480_31532 = state_31430__$1;
(statearr_31480_31532[(1)] = (19));

} else {
var statearr_31481_31533 = state_31430__$1;
(statearr_31481_31533[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (37))){
var inst_31423 = (state_31430[(2)]);
var state_31430__$1 = state_31430;
var statearr_31482_31534 = state_31430__$1;
(statearr_31482_31534[(2)] = inst_31423);

(statearr_31482_31534[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31431 === (8))){
var inst_31404 = (state_31430[(2)]);
var state_31430__$1 = state_31430;
var statearr_31483_31535 = state_31430__$1;
(statearr_31483_31535[(2)] = inst_31404);

(statearr_31483_31535[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20534__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
;
return ((function (switch__20513__auto__,c__20534__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function() {
var parinfer_site$vcr$play_recording_BANG__$_state_machine__20514__auto__ = null;
var parinfer_site$vcr$play_recording_BANG__$_state_machine__20514__auto____0 = (function (){
var statearr_31487 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_31487[(0)] = parinfer_site$vcr$play_recording_BANG__$_state_machine__20514__auto__);

(statearr_31487[(1)] = (1));

return statearr_31487;
});
var parinfer_site$vcr$play_recording_BANG__$_state_machine__20514__auto____1 = (function (state_31430){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_31430);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e31488){if((e31488 instanceof Object)){
var ex__20517__auto__ = e31488;
var statearr_31489_31536 = state_31430;
(statearr_31489_31536[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31430);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31488;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31537 = state_31430;
state_31430 = G__31537;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
parinfer_site$vcr$play_recording_BANG__$_state_machine__20514__auto__ = function(state_31430){
switch(arguments.length){
case 0:
return parinfer_site$vcr$play_recording_BANG__$_state_machine__20514__auto____0.call(this);
case 1:
return parinfer_site$vcr$play_recording_BANG__$_state_machine__20514__auto____1.call(this,state_31430);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
parinfer_site$vcr$play_recording_BANG__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = parinfer_site$vcr$play_recording_BANG__$_state_machine__20514__auto____0;
parinfer_site$vcr$play_recording_BANG__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = parinfer_site$vcr$play_recording_BANG__$_state_machine__20514__auto____1;
return parinfer_site$vcr$play_recording_BANG__$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
})();
var state__20536__auto__ = (function (){var statearr_31490 = f__20535__auto__.call(null);
(statearr_31490[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto__);

return statearr_31490;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
);

return c__20534__auto__;
} else {
return null;
}
});
parinfer_site.vcr.stop_playing_BANG_ = (function parinfer_site$vcr$stop_playing_BANG_(key_){
var temp__4425__auto__ = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer_site.vcr.vcr),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983)], null));
if(cljs.core.truth_(temp__4425__auto__)){
var stop_chan = temp__4425__auto__;
return cljs.core.async.close_BANG_.call(null,stop_chan);
} else {
return null;
}
});
/**
 * Pretty print the data to the console, so we can paste it into vcr_data.cljs
 */
parinfer_site.vcr.print_recording_BANG_ = (function parinfer_site$vcr$print_recording_BANG_(key_){
var cm = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer_site.state.state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"cm","cm",540591536)], null));
var recording = cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_site.vcr.vcr),key_);
return cljs.pprint.pprint.call(null,cljs.core.dissoc.call(null,recording,new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983)));
});
parinfer_site.vcr.SHOW_CONTROLS = false;
if(typeof parinfer_site.vcr.controls_state !== 'undefined'){
} else {
parinfer_site.vcr.controls_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"show?","show?",1543842127),parinfer_site.vcr.SHOW_CONTROLS,new cljs.core.Keyword(null,"target-key","target-key",-1657436029),null], null));
}
parinfer_site.vcr.controls_view = (function parinfer_site$vcr$controls_view(p__31538,owner){
var map__31547 = p__31538;
var map__31547__$1 = ((((!((map__31547 == null)))?((((map__31547.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31547.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31547):map__31547);
var data = map__31547__$1;
var target_key = cljs.core.get.call(null,map__31547__$1,new cljs.core.Keyword(null,"target-key","target-key",-1657436029));
var show_QMARK_ = cljs.core.get.call(null,map__31547__$1,new cljs.core.Keyword(null,"show?","show?",1543842127));
if(typeof parinfer_site.vcr.t_parinfer_site$vcr31549 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
parinfer_site.vcr.t_parinfer_site$vcr31549 = (function (controls_view,p__31538,owner,map__31547,data,target_key,show_QMARK_,meta31550){
this.controls_view = controls_view;
this.p__31538 = p__31538;
this.owner = owner;
this.map__31547 = map__31547;
this.data = data;
this.target_key = target_key;
this.show_QMARK_ = show_QMARK_;
this.meta31550 = meta31550;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
parinfer_site.vcr.t_parinfer_site$vcr31549.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__31547,map__31547__$1,data,target_key,show_QMARK_){
return (function (_31551,meta31550__$1){
var self__ = this;
var _31551__$1 = this;
return (new parinfer_site.vcr.t_parinfer_site$vcr31549(self__.controls_view,self__.p__31538,self__.owner,self__.map__31547,self__.data,self__.target_key,self__.show_QMARK_,meta31550__$1));
});})(map__31547,map__31547__$1,data,target_key,show_QMARK_))
;

parinfer_site.vcr.t_parinfer_site$vcr31549.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__31547,map__31547__$1,data,target_key,show_QMARK_){
return (function (_31551){
var self__ = this;
var _31551__$1 = this;
return self__.meta31550;
});})(map__31547,map__31547__$1,data,target_key,show_QMARK_))
;

parinfer_site.vcr.t_parinfer_site$vcr31549.prototype.om$core$IRender$ = true;

parinfer_site.vcr.t_parinfer_site$vcr31549.prototype.om$core$IRender$render$arity$1 = ((function (map__31547,map__31547__$1,data,target_key,show_QMARK_){
return (function (_){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.show_QMARK_)){
return React.createElement("div",{"id": "controls"},(function (){var attrs31552 = (cljs.core.truth_(self__.target_key)?[cljs.core.str(self__.target_key)].join(''):"(click an editor)");
return cljs.core.apply.call(null,React.createElement,"code",((cljs.core.map_QMARK_.call(null,attrs31552))?sablono.interpreter.attributes.call(null,attrs31552):null),cljs.core.remove.call(null,cljs.core.nil_QMARK_,((cljs.core.map_QMARK_.call(null,attrs31552))?cljs.core.PersistentVector.EMPTY:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.interpreter.interpret.call(null,attrs31552)], null))));
})(),React.createElement("br",null),React.createElement("button",{"onClick": ((function (___$1,map__31547,map__31547__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer_site.vcr.start_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__31547,map__31547__$1,data,target_key,show_QMARK_))
},"Start Record"),React.createElement("button",{"onClick": ((function (___$1,map__31547,map__31547__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer_site.vcr.done_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__31547,map__31547__$1,data,target_key,show_QMARK_))
},"Stop Record"),React.createElement("button",{"onClick": ((function (___$1,map__31547,map__31547__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer_site.vcr.play_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__31547,map__31547__$1,data,target_key,show_QMARK_))
},"Play"),React.createElement("button",{"onClick": ((function (___$1,map__31547,map__31547__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer_site.vcr.stop_playing_BANG_.call(null,self__.target_key);
});})(___$1,map__31547,map__31547__$1,data,target_key,show_QMARK_))
},"Stop"),React.createElement("button",{"onClick": ((function (___$1,map__31547,map__31547__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer_site.vcr.print_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__31547,map__31547__$1,data,target_key,show_QMARK_))
},"Print"));
} else {
return null;
}
});})(map__31547,map__31547__$1,data,target_key,show_QMARK_))
;

parinfer_site.vcr.t_parinfer_site$vcr31549.getBasis = ((function (map__31547,map__31547__$1,data,target_key,show_QMARK_){
return (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"controls-view","controls-view",-1937031930,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"target-key","target-key",-16904502,null),new cljs.core.Symbol(null,"show?","show?",-1110593642,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"data","data",1407862150,null)], null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"p__31538","p__31538",-1731069654,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"map__31547","map__31547",1270782089,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"target-key","target-key",-16904502,null),new cljs.core.Symbol(null,"show?","show?",-1110593642,null),new cljs.core.Symbol(null,"meta31550","meta31550",-1102192491,null)], null);
});})(map__31547,map__31547__$1,data,target_key,show_QMARK_))
;

parinfer_site.vcr.t_parinfer_site$vcr31549.cljs$lang$type = true;

parinfer_site.vcr.t_parinfer_site$vcr31549.cljs$lang$ctorStr = "parinfer-site.vcr/t_parinfer_site$vcr31549";

parinfer_site.vcr.t_parinfer_site$vcr31549.cljs$lang$ctorPrWriter = ((function (map__31547,map__31547__$1,data,target_key,show_QMARK_){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"parinfer-site.vcr/t_parinfer_site$vcr31549");
});})(map__31547,map__31547__$1,data,target_key,show_QMARK_))
;

parinfer_site.vcr.__GT_t_parinfer_site$vcr31549 = ((function (map__31547,map__31547__$1,data,target_key,show_QMARK_){
return (function parinfer_site$vcr$controls_view_$___GT_t_parinfer_site$vcr31549(controls_view__$1,p__31538__$1,owner__$1,map__31547__$2,data__$1,target_key__$1,show_QMARK___$1,meta31550){
return (new parinfer_site.vcr.t_parinfer_site$vcr31549(controls_view__$1,p__31538__$1,owner__$1,map__31547__$2,data__$1,target_key__$1,show_QMARK___$1,meta31550));
});})(map__31547,map__31547__$1,data,target_key,show_QMARK_))
;

}

return (new parinfer_site.vcr.t_parinfer_site$vcr31549(parinfer_site$vcr$controls_view,p__31538,owner,map__31547__$1,data,target_key,show_QMARK_,cljs.core.PersistentArrayMap.EMPTY));
});
parinfer_site.vcr.render_controls_BANG_ = (function parinfer_site$vcr$render_controls_BANG_(){
return om.core.root.call(null,parinfer_site.vcr.controls_view,parinfer_site.vcr.controls_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("controls-container")], null));
});

//# sourceMappingURL=vcr.js.map?rel=1449460870311