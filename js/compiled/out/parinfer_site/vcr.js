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
parinfer_site.vcr.apply_change = (function parinfer_site$vcr$apply_change(cm,p__21111){
var map__21114 = p__21111;
var map__21114__$1 = ((((!((map__21114 == null)))?((((map__21114.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21114.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21114):map__21114);
var text = cljs.core.get.call(null,map__21114__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var from = cljs.core.get.call(null,map__21114__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var to = cljs.core.get.call(null,map__21114__$1,new cljs.core.Keyword(null,"to","to",192099007));
var origin = cljs.core.get.call(null,map__21114__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
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
var map__21118 = cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_site.state.state),key_);
var map__21118__$1 = ((((!((map__21118 == null)))?((((map__21118.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21118.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21118):map__21118);
var editor = map__21118__$1;
var text = cljs.core.get.call(null,map__21118__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var cm = cljs.core.get.call(null,map__21118__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
return cljs.core.swap_BANG_.call(null,parinfer_site.vcr.vcr,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),cljs.core.assoc,new cljs.core.Keyword(null,"changes","changes",1492088),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"init-value","init-value",-374892331),text,new cljs.core.Keyword(null,"recording?","recording?",-1477514924),true,new cljs.core.Keyword(null,"last-time","last-time",-1707132740),null);
});
parinfer_site.vcr.done_recording_BANG_ = (function parinfer_site$vcr$done_recording_BANG_(key_){
return cljs.core.swap_BANG_.call(null,parinfer_site.vcr.vcr,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"recording?","recording?",-1477514924)], null),false);
});
parinfer_site.vcr.play_recording_BANG_ = (function parinfer_site$vcr$play_recording_BANG_(key_){
var temp__4425__auto___21438 = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer_site.vcr.vcr),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983)], null));
if(cljs.core.truth_(temp__4425__auto___21438)){
var stop_chan_21439 = temp__4425__auto___21438;
cljs.core.async.close_BANG_.call(null,stop_chan_21439);
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

var c__20372__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function (state_21377){
var state_val_21378 = (state_21377[(1)]);
if((state_val_21378 === (7))){
var state_21377__$1 = state_21377;
var statearr_21379_21440 = state_21377__$1;
(statearr_21379_21440[(2)] = null);

(statearr_21379_21440[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (20))){
var state_21377__$1 = state_21377;
var statearr_21380_21441 = state_21377__$1;
(statearr_21380_21441[(2)] = null);

(statearr_21380_21441[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (27))){
var inst_21341 = (state_21377[(2)]);
var state_21377__$1 = state_21377;
var statearr_21381_21442 = state_21377__$1;
(statearr_21381_21442[(2)] = inst_21341);

(statearr_21381_21442[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (1))){
var state_21377__$1 = state_21377;
var statearr_21382_21443 = state_21377__$1;
(statearr_21382_21443[(2)] = null);

(statearr_21382_21443[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (24))){
var inst_21288 = (state_21377[(7)]);
var inst_21343 = (state_21377[(2)]);
var inst_21344 = cljs.core.rest.call(null,inst_21288);
var inst_21288__$1 = inst_21344;
var state_21377__$1 = (function (){var statearr_21383 = state_21377;
(statearr_21383[(8)] = inst_21343);

(statearr_21383[(7)] = inst_21288__$1);

return statearr_21383;
})();
var statearr_21384_21444 = state_21377__$1;
(statearr_21384_21444[(2)] = null);

(statearr_21384_21444[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (4))){
var inst_21288 = (state_21377[(7)]);
var inst_21290 = cljs.core.seq.call(null,inst_21288);
var state_21377__$1 = state_21377;
if(inst_21290){
var statearr_21385_21445 = state_21377__$1;
(statearr_21385_21445[(1)] = (6));

} else {
var statearr_21386_21446 = state_21377__$1;
(statearr_21386_21446[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (15))){
var inst_21294 = (state_21377[(9)]);
var inst_21311 = cljs.core.apply.call(null,cljs.core.hash_map,inst_21294);
var state_21377__$1 = state_21377;
var statearr_21387_21447 = state_21377__$1;
(statearr_21387_21447[(2)] = inst_21311);

(statearr_21387_21447[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (21))){
var inst_21348 = (state_21377[(2)]);
var state_21377__$1 = state_21377;
var statearr_21388_21448 = state_21377__$1;
(statearr_21388_21448[(2)] = inst_21348);

(statearr_21388_21448[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (31))){
var inst_21357 = (state_21377[(10)]);
var inst_21356 = cljs.core.async.timeout.call(null,loop_delay);
var inst_21357__$1 = new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983).cljs$core$IFn$_invoke$arity$1(recording);
var inst_21358 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_21359 = [inst_21356,inst_21357__$1];
var inst_21360 = (new cljs.core.PersistentVector(null,2,(5),inst_21358,inst_21359,null));
var state_21377__$1 = (function (){var statearr_21389 = state_21377;
(statearr_21389[(10)] = inst_21357__$1);

return statearr_21389;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_21377__$1,(34),inst_21360);
} else {
if((state_val_21378 === (32))){
var state_21377__$1 = state_21377;
var statearr_21390_21449 = state_21377__$1;
(statearr_21390_21449[(2)] = null);

(statearr_21390_21449[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (33))){
var inst_21373 = (state_21377[(2)]);
var state_21377__$1 = state_21377;
var statearr_21391_21450 = state_21377__$1;
(statearr_21391_21450[(2)] = inst_21373);

(statearr_21391_21450[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (13))){
var state_21377__$1 = state_21377;
var statearr_21392_21451 = state_21377__$1;
(statearr_21392_21451[(2)] = false);

(statearr_21392_21451[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (22))){
var inst_21315 = (state_21377[(11)]);
var inst_21331 = parinfer_site.vcr.apply_change.call(null,cm,inst_21315);
var state_21377__$1 = state_21377;
var statearr_21393_21452 = state_21377__$1;
(statearr_21393_21452[(2)] = inst_21331);

(statearr_21393_21452[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (36))){
var state_21377__$1 = state_21377;
var statearr_21394_21453 = state_21377__$1;
(statearr_21394_21453[(2)] = null);

(statearr_21394_21453[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (29))){
var state_21377__$1 = state_21377;
var statearr_21395_21454 = state_21377__$1;
(statearr_21395_21454[(2)] = null);

(statearr_21395_21454[(1)] = (30));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (6))){
var inst_21288 = (state_21377[(7)]);
var inst_21294 = (state_21377[(9)]);
var inst_21294__$1 = cljs.core.first.call(null,inst_21288);
var inst_21296 = (inst_21294__$1 == null);
var inst_21297 = cljs.core.not.call(null,inst_21296);
var state_21377__$1 = (function (){var statearr_21396 = state_21377;
(statearr_21396[(9)] = inst_21294__$1);

return statearr_21396;
})();
if(inst_21297){
var statearr_21397_21455 = state_21377__$1;
(statearr_21397_21455[(1)] = (9));

} else {
var statearr_21398_21456 = state_21377__$1;
(statearr_21398_21456[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (28))){
var state_21377__$1 = state_21377;
var statearr_21399_21457 = state_21377__$1;
(statearr_21399_21457[(2)] = null);

(statearr_21399_21457[(1)] = (30));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (25))){
var inst_21316 = (state_21377[(12)]);
var inst_21334 = parinfer_site.vcr.apply_selections.call(null,cm,inst_21316);
var state_21377__$1 = state_21377;
var statearr_21400_21458 = state_21377__$1;
(statearr_21400_21458[(2)] = inst_21334);

(statearr_21400_21458[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (34))){
var inst_21357 = (state_21377[(10)]);
var inst_21362 = (state_21377[(2)]);
var inst_21363 = cljs.core.nth.call(null,inst_21362,(0),null);
var inst_21364 = cljs.core.nth.call(null,inst_21362,(1),null);
var inst_21365 = cljs.core.not_EQ_.call(null,inst_21364,inst_21357);
var state_21377__$1 = (function (){var statearr_21401 = state_21377;
(statearr_21401[(13)] = inst_21363);

return statearr_21401;
})();
if(inst_21365){
var statearr_21402_21459 = state_21377__$1;
(statearr_21402_21459[(1)] = (35));

} else {
var statearr_21403_21460 = state_21377__$1;
(statearr_21403_21460[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (17))){
var inst_21320 = (state_21377[(14)]);
var inst_21314 = (state_21377[(2)]);
var inst_21315 = cljs.core.get.call(null,inst_21314,new cljs.core.Keyword(null,"change","change",-1163046502));
var inst_21316 = cljs.core.get.call(null,inst_21314,new cljs.core.Keyword(null,"selections","selections",-1277610233));
var inst_21317 = cljs.core.get.call(null,inst_21314,new cljs.core.Keyword(null,"dt","dt",-368444759));
var inst_21318 = (inst_21317 / timescale);
var inst_21319 = cljs.core.async.timeout.call(null,inst_21318);
var inst_21320__$1 = new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983).cljs$core$IFn$_invoke$arity$1(recording);
var inst_21321 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_21322 = [inst_21319,inst_21320__$1];
var inst_21323 = (new cljs.core.PersistentVector(null,2,(5),inst_21321,inst_21322,null));
var state_21377__$1 = (function (){var statearr_21404 = state_21377;
(statearr_21404[(11)] = inst_21315);

(statearr_21404[(14)] = inst_21320__$1);

(statearr_21404[(12)] = inst_21316);

return statearr_21404;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_21377__$1,(18),inst_21323);
} else {
if((state_val_21378 === (3))){
var inst_21375 = (state_21377[(2)]);
var state_21377__$1 = state_21377;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_21377__$1,inst_21375);
} else {
if((state_val_21378 === (12))){
var state_21377__$1 = state_21377;
var statearr_21405_21461 = state_21377__$1;
(statearr_21405_21461[(2)] = true);

(statearr_21405_21461[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (2))){
var inst_21280 = parinfer_site.editor_support.get_prev_state.call(null,cm);
var inst_21281 = cljs.core.reset_BANG_.call(null,inst_21280,null);
var inst_21282 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_21283 = [key_,new cljs.core.Keyword(null,"text","text",-1790561697)];
var inst_21284 = (new cljs.core.PersistentVector(null,2,(5),inst_21282,inst_21283,null));
var inst_21285 = new cljs.core.Keyword(null,"init-value","init-value",-374892331).cljs$core$IFn$_invoke$arity$1(recording);
var inst_21286 = cljs.core.swap_BANG_.call(null,parinfer_site.state.state,cljs.core.assoc_in,inst_21284,inst_21285);
var inst_21287 = new cljs.core.Keyword(null,"changes","changes",1492088).cljs$core$IFn$_invoke$arity$1(recording);
var inst_21288 = inst_21287;
var state_21377__$1 = (function (){var statearr_21406 = state_21377;
(statearr_21406[(7)] = inst_21288);

(statearr_21406[(15)] = inst_21281);

(statearr_21406[(16)] = inst_21286);

return statearr_21406;
})();
var statearr_21407_21462 = state_21377__$1;
(statearr_21407_21462[(2)] = null);

(statearr_21407_21462[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (23))){
var inst_21316 = (state_21377[(12)]);
var state_21377__$1 = state_21377;
if(cljs.core.truth_(inst_21316)){
var statearr_21408_21463 = state_21377__$1;
(statearr_21408_21463[(1)] = (25));

} else {
var statearr_21409_21464 = state_21377__$1;
(statearr_21409_21464[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (35))){
var state_21377__$1 = state_21377;
var statearr_21410_21465 = state_21377__$1;
(statearr_21410_21465[(2)] = null);

(statearr_21410_21465[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (19))){
var inst_21315 = (state_21377[(11)]);
var state_21377__$1 = state_21377;
if(cljs.core.truth_(inst_21315)){
var statearr_21411_21466 = state_21377__$1;
(statearr_21411_21466[(1)] = (22));

} else {
var statearr_21412_21467 = state_21377__$1;
(statearr_21412_21467[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (11))){
var inst_21309 = (state_21377[(2)]);
var state_21377__$1 = state_21377;
if(cljs.core.truth_(inst_21309)){
var statearr_21413_21468 = state_21377__$1;
(statearr_21413_21468[(1)] = (15));

} else {
var statearr_21414_21469 = state_21377__$1;
(statearr_21414_21469[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (9))){
var inst_21294 = (state_21377[(9)]);
var inst_21299 = inst_21294.cljs$lang$protocol_mask$partition0$;
var inst_21300 = (inst_21299 & (64));
var inst_21301 = inst_21294.cljs$core$ISeq$;
var inst_21302 = (inst_21300) || (inst_21301);
var state_21377__$1 = state_21377;
if(cljs.core.truth_(inst_21302)){
var statearr_21415_21470 = state_21377__$1;
(statearr_21415_21470[(1)] = (12));

} else {
var statearr_21416_21471 = state_21377__$1;
(statearr_21416_21471[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (5))){
var inst_21353 = (state_21377[(2)]);
var state_21377__$1 = (function (){var statearr_21417 = state_21377;
(statearr_21417[(17)] = inst_21353);

return statearr_21417;
})();
if(cljs.core.truth_(loop_QMARK_)){
var statearr_21418_21472 = state_21377__$1;
(statearr_21418_21472[(1)] = (31));

} else {
var statearr_21419_21473 = state_21377__$1;
(statearr_21419_21473[(1)] = (32));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (14))){
var inst_21306 = (state_21377[(2)]);
var state_21377__$1 = state_21377;
var statearr_21420_21474 = state_21377__$1;
(statearr_21420_21474[(2)] = inst_21306);

(statearr_21420_21474[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (26))){
var state_21377__$1 = state_21377;
var statearr_21421_21475 = state_21377__$1;
(statearr_21421_21475[(1)] = (28));



return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (16))){
var inst_21294 = (state_21377[(9)]);
var state_21377__$1 = state_21377;
var statearr_21423_21476 = state_21377__$1;
(statearr_21423_21476[(2)] = inst_21294);

(statearr_21423_21476[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (30))){
var inst_21339 = (state_21377[(2)]);
var state_21377__$1 = state_21377;
var statearr_21424_21477 = state_21377__$1;
(statearr_21424_21477[(2)] = inst_21339);

(statearr_21424_21477[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (10))){
var state_21377__$1 = state_21377;
var statearr_21425_21478 = state_21377__$1;
(statearr_21425_21478[(2)] = false);

(statearr_21425_21478[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (18))){
var inst_21320 = (state_21377[(14)]);
var inst_21325 = (state_21377[(2)]);
var inst_21326 = cljs.core.nth.call(null,inst_21325,(0),null);
var inst_21327 = cljs.core.nth.call(null,inst_21325,(1),null);
var inst_21328 = cljs.core.not_EQ_.call(null,inst_21327,inst_21320);
var state_21377__$1 = (function (){var statearr_21426 = state_21377;
(statearr_21426[(18)] = inst_21326);

return statearr_21426;
})();
if(inst_21328){
var statearr_21427_21479 = state_21377__$1;
(statearr_21427_21479[(1)] = (19));

} else {
var statearr_21428_21480 = state_21377__$1;
(statearr_21428_21480[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (37))){
var inst_21370 = (state_21377[(2)]);
var state_21377__$1 = state_21377;
var statearr_21429_21481 = state_21377__$1;
(statearr_21429_21481[(2)] = inst_21370);

(statearr_21429_21481[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21378 === (8))){
var inst_21351 = (state_21377[(2)]);
var state_21377__$1 = state_21377;
var statearr_21430_21482 = state_21377__$1;
(statearr_21430_21482[(2)] = inst_21351);

(statearr_21430_21482[(1)] = (5));


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
});})(c__20372__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
;
return ((function (switch__20351__auto__,c__20372__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function() {
var parinfer_site$vcr$play_recording_BANG__$_state_machine__20352__auto__ = null;
var parinfer_site$vcr$play_recording_BANG__$_state_machine__20352__auto____0 = (function (){
var statearr_21434 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_21434[(0)] = parinfer_site$vcr$play_recording_BANG__$_state_machine__20352__auto__);

(statearr_21434[(1)] = (1));

return statearr_21434;
});
var parinfer_site$vcr$play_recording_BANG__$_state_machine__20352__auto____1 = (function (state_21377){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_21377);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e21435){if((e21435 instanceof Object)){
var ex__20355__auto__ = e21435;
var statearr_21436_21483 = state_21377;
(statearr_21436_21483[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_21377);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e21435;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21484 = state_21377;
state_21377 = G__21484;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
parinfer_site$vcr$play_recording_BANG__$_state_machine__20352__auto__ = function(state_21377){
switch(arguments.length){
case 0:
return parinfer_site$vcr$play_recording_BANG__$_state_machine__20352__auto____0.call(this);
case 1:
return parinfer_site$vcr$play_recording_BANG__$_state_machine__20352__auto____1.call(this,state_21377);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
parinfer_site$vcr$play_recording_BANG__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = parinfer_site$vcr$play_recording_BANG__$_state_machine__20352__auto____0;
parinfer_site$vcr$play_recording_BANG__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = parinfer_site$vcr$play_recording_BANG__$_state_machine__20352__auto____1;
return parinfer_site$vcr$play_recording_BANG__$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
})();
var state__20374__auto__ = (function (){var statearr_21437 = f__20373__auto__.call(null);
(statearr_21437[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto__);

return statearr_21437;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
);

return c__20372__auto__;
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
parinfer_site.vcr.controls_view = (function parinfer_site$vcr$controls_view(p__21485,owner){
var map__21494 = p__21485;
var map__21494__$1 = ((((!((map__21494 == null)))?((((map__21494.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21494.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21494):map__21494);
var data = map__21494__$1;
var target_key = cljs.core.get.call(null,map__21494__$1,new cljs.core.Keyword(null,"target-key","target-key",-1657436029));
var show_QMARK_ = cljs.core.get.call(null,map__21494__$1,new cljs.core.Keyword(null,"show?","show?",1543842127));
if(typeof parinfer_site.vcr.t_parinfer_site$vcr21496 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
parinfer_site.vcr.t_parinfer_site$vcr21496 = (function (controls_view,p__21485,owner,map__21494,data,target_key,show_QMARK_,meta21497){
this.controls_view = controls_view;
this.p__21485 = p__21485;
this.owner = owner;
this.map__21494 = map__21494;
this.data = data;
this.target_key = target_key;
this.show_QMARK_ = show_QMARK_;
this.meta21497 = meta21497;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
parinfer_site.vcr.t_parinfer_site$vcr21496.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__21494,map__21494__$1,data,target_key,show_QMARK_){
return (function (_21498,meta21497__$1){
var self__ = this;
var _21498__$1 = this;
return (new parinfer_site.vcr.t_parinfer_site$vcr21496(self__.controls_view,self__.p__21485,self__.owner,self__.map__21494,self__.data,self__.target_key,self__.show_QMARK_,meta21497__$1));
});})(map__21494,map__21494__$1,data,target_key,show_QMARK_))
;

parinfer_site.vcr.t_parinfer_site$vcr21496.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__21494,map__21494__$1,data,target_key,show_QMARK_){
return (function (_21498){
var self__ = this;
var _21498__$1 = this;
return self__.meta21497;
});})(map__21494,map__21494__$1,data,target_key,show_QMARK_))
;

parinfer_site.vcr.t_parinfer_site$vcr21496.prototype.om$core$IRender$ = true;

parinfer_site.vcr.t_parinfer_site$vcr21496.prototype.om$core$IRender$render$arity$1 = ((function (map__21494,map__21494__$1,data,target_key,show_QMARK_){
return (function (_){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.show_QMARK_)){
return React.createElement("div",{"id": "controls"},(function (){var attrs21499 = (cljs.core.truth_(self__.target_key)?[cljs.core.str(self__.target_key)].join(''):"(click an editor)");
return cljs.core.apply.call(null,React.createElement,"code",((cljs.core.map_QMARK_.call(null,attrs21499))?sablono.interpreter.attributes.call(null,attrs21499):null),cljs.core.remove.call(null,cljs.core.nil_QMARK_,((cljs.core.map_QMARK_.call(null,attrs21499))?cljs.core.PersistentVector.EMPTY:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.interpreter.interpret.call(null,attrs21499)], null))));
})(),React.createElement("br",null),React.createElement("button",{"onClick": ((function (___$1,map__21494,map__21494__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer_site.vcr.start_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__21494,map__21494__$1,data,target_key,show_QMARK_))
},"Start Record"),React.createElement("button",{"onClick": ((function (___$1,map__21494,map__21494__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer_site.vcr.done_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__21494,map__21494__$1,data,target_key,show_QMARK_))
},"Stop Record"),React.createElement("button",{"onClick": ((function (___$1,map__21494,map__21494__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer_site.vcr.play_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__21494,map__21494__$1,data,target_key,show_QMARK_))
},"Play"),React.createElement("button",{"onClick": ((function (___$1,map__21494,map__21494__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer_site.vcr.stop_playing_BANG_.call(null,self__.target_key);
});})(___$1,map__21494,map__21494__$1,data,target_key,show_QMARK_))
},"Stop"),React.createElement("button",{"onClick": ((function (___$1,map__21494,map__21494__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer_site.vcr.print_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__21494,map__21494__$1,data,target_key,show_QMARK_))
},"Print"));
} else {
return null;
}
});})(map__21494,map__21494__$1,data,target_key,show_QMARK_))
;

parinfer_site.vcr.t_parinfer_site$vcr21496.getBasis = ((function (map__21494,map__21494__$1,data,target_key,show_QMARK_){
return (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"controls-view","controls-view",-1937031930,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"target-key","target-key",-16904502,null),new cljs.core.Symbol(null,"show?","show?",-1110593642,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"data","data",1407862150,null)], null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"p__21485","p__21485",-1518246462,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"map__21494","map__21494",-543458277,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"target-key","target-key",-16904502,null),new cljs.core.Symbol(null,"show?","show?",-1110593642,null),new cljs.core.Symbol(null,"meta21497","meta21497",1614067463,null)], null);
});})(map__21494,map__21494__$1,data,target_key,show_QMARK_))
;

parinfer_site.vcr.t_parinfer_site$vcr21496.cljs$lang$type = true;

parinfer_site.vcr.t_parinfer_site$vcr21496.cljs$lang$ctorStr = "parinfer-site.vcr/t_parinfer_site$vcr21496";

parinfer_site.vcr.t_parinfer_site$vcr21496.cljs$lang$ctorPrWriter = ((function (map__21494,map__21494__$1,data,target_key,show_QMARK_){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"parinfer-site.vcr/t_parinfer_site$vcr21496");
});})(map__21494,map__21494__$1,data,target_key,show_QMARK_))
;

parinfer_site.vcr.__GT_t_parinfer_site$vcr21496 = ((function (map__21494,map__21494__$1,data,target_key,show_QMARK_){
return (function parinfer_site$vcr$controls_view_$___GT_t_parinfer_site$vcr21496(controls_view__$1,p__21485__$1,owner__$1,map__21494__$2,data__$1,target_key__$1,show_QMARK___$1,meta21497){
return (new parinfer_site.vcr.t_parinfer_site$vcr21496(controls_view__$1,p__21485__$1,owner__$1,map__21494__$2,data__$1,target_key__$1,show_QMARK___$1,meta21497));
});})(map__21494,map__21494__$1,data,target_key,show_QMARK_))
;

}

return (new parinfer_site.vcr.t_parinfer_site$vcr21496(parinfer_site$vcr$controls_view,p__21485,owner,map__21494__$1,data,target_key,show_QMARK_,cljs.core.PersistentArrayMap.EMPTY));
});
parinfer_site.vcr.render_controls_BANG_ = (function parinfer_site$vcr$render_controls_BANG_(){
return om.core.root.call(null,parinfer_site.vcr.controls_view,parinfer_site.vcr.controls_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("controls-container")], null));
});

//# sourceMappingURL=vcr.js.map?rel=1450835340878