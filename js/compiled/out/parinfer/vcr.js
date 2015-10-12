// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer.vcr');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('om.core');
goog.require('sablono.core');
goog.require('parinfer.state');
goog.require('cljs.pprint');
goog.require('goog.dom');
if(typeof parinfer.vcr.vcr !== 'undefined'){
} else {
parinfer.vcr.vcr = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
parinfer.vcr.empty_recording = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"changes","changes",1492088),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"init-value","init-value",-374892331),null,new cljs.core.Keyword(null,"last-time","last-time",-1707132740),null,new cljs.core.Keyword(null,"recording?","recording?",-1477514924),false], null);
parinfer.vcr.parse_pos = (function parinfer$vcr$parse_pos(pos){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",212345235),pos.line,new cljs.core.Keyword(null,"ch","ch",-554717905),pos.ch], null);
});
parinfer.vcr.parse_change = (function parinfer$vcr$parse_change(change){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"from","from",1815293044),parinfer.vcr.parse_pos.call(null,change.from),new cljs.core.Keyword(null,"to","to",192099007),parinfer.vcr.parse_pos.call(null,change.to),new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.seq.call(null,change.text),new cljs.core.Keyword(null,"origin","origin",1037372088),change.origin], null);
});
parinfer.vcr.apply_change = (function parinfer$vcr$apply_change(cm,p__25463){
var map__25466 = p__25463;
var map__25466__$1 = ((((!((map__25466 == null)))?((((map__25466.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25466.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25466):map__25466);
var text = cljs.core.get.call(null,map__25466__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var from = cljs.core.get.call(null,map__25466__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var to = cljs.core.get.call(null,map__25466__$1,new cljs.core.Keyword(null,"to","to",192099007));
var origin = cljs.core.get.call(null,map__25466__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
return cm.replaceRange(cljs.core.clj__GT_js.call(null,text),cljs.core.clj__GT_js.call(null,from),cljs.core.clj__GT_js.call(null,to),origin);
});
parinfer.vcr.parse_selection = (function parinfer$vcr$parse_selection(selection){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"anchor","anchor",1549638489),parinfer.vcr.parse_pos.call(null,selection.anchor),new cljs.core.Keyword(null,"head","head",-771383919),parinfer.vcr.parse_pos.call(null,selection.head)], null);
});
parinfer.vcr.parse_selections = (function parinfer$vcr$parse_selections(selections){
return cljs.core.map.call(null,parinfer.vcr.parse_selection,selections);
});
parinfer.vcr.apply_selections = (function parinfer$vcr$apply_selections(cm,selections){
return cm.setSelections(cljs.core.clj__GT_js.call(null,selections));
});
parinfer.vcr.start_recording_BANG_ = (function parinfer$vcr$start_recording_BANG_(key_){
var map__25470 = cljs.core.get.call(null,cljs.core.deref.call(null,parinfer.state.state),key_);
var map__25470__$1 = ((((!((map__25470 == null)))?((((map__25470.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25470.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25470):map__25470);
var editor = map__25470__$1;
var text = cljs.core.get.call(null,map__25470__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var cm = cljs.core.get.call(null,map__25470__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
return cljs.core.swap_BANG_.call(null,parinfer.vcr.vcr,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),cljs.core.assoc,new cljs.core.Keyword(null,"changes","changes",1492088),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"init-value","init-value",-374892331),text,new cljs.core.Keyword(null,"recording?","recording?",-1477514924),true,new cljs.core.Keyword(null,"last-time","last-time",-1707132740),null);
});
parinfer.vcr.done_recording_BANG_ = (function parinfer$vcr$done_recording_BANG_(key_){
return cljs.core.swap_BANG_.call(null,parinfer.vcr.vcr,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"recording?","recording?",-1477514924)], null),false);
});
parinfer.vcr.play_recording_BANG_ = (function parinfer$vcr$play_recording_BANG_(key_){
var temp__4425__auto___25786 = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer.vcr.vcr),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983)], null));
if(cljs.core.truth_(temp__4425__auto___25786)){
var stop_chan_25787 = temp__4425__auto___25786;
cljs.core.async.close_BANG_.call(null,stop_chan_25787);
} else {
}

cljs.core.swap_BANG_.call(null,parinfer.vcr.vcr,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983)], null),cljs.core.async.chan.call(null));

var cm = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer.state.state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"cm","cm",540591536)], null));
var recording = cljs.core.get.call(null,cljs.core.deref.call(null,parinfer.vcr.vcr),key_);
var timescale = cljs.core.get.call(null,recording,new cljs.core.Keyword(null,"timescale","timescale",-904011507),(1));
var loop_QMARK_ = cljs.core.get.call(null,recording,new cljs.core.Keyword(null,"loop?","loop?",457687798),true);
var loop_delay = cljs.core.get.call(null,recording,new cljs.core.Keyword(null,"loop-delay","loop-delay",72874403),(2000));
var element = cm.getWrapperElement();
var cursor = goog.dom.getElementByClass("CodeMirror-cursors",element);
cursor.style.visibility = "visible";

var c__19434__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19434__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function (){
var f__19435__auto__ = (function (){var switch__19413__auto__ = ((function (c__19434__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function (state_25725){
var state_val_25726 = (state_25725[(1)]);
if((state_val_25726 === (7))){
var state_25725__$1 = state_25725;
var statearr_25727_25788 = state_25725__$1;
(statearr_25727_25788[(2)] = null);

(statearr_25727_25788[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (20))){
var state_25725__$1 = state_25725;
var statearr_25728_25789 = state_25725__$1;
(statearr_25728_25789[(2)] = null);

(statearr_25728_25789[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (27))){
var inst_25689 = (state_25725[(2)]);
var state_25725__$1 = state_25725;
var statearr_25729_25790 = state_25725__$1;
(statearr_25729_25790[(2)] = inst_25689);

(statearr_25729_25790[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (1))){
var state_25725__$1 = state_25725;
var statearr_25730_25791 = state_25725__$1;
(statearr_25730_25791[(2)] = null);

(statearr_25730_25791[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (24))){
var inst_25636 = (state_25725[(7)]);
var inst_25691 = (state_25725[(2)]);
var inst_25692 = cljs.core.rest.call(null,inst_25636);
var inst_25636__$1 = inst_25692;
var state_25725__$1 = (function (){var statearr_25731 = state_25725;
(statearr_25731[(8)] = inst_25691);

(statearr_25731[(7)] = inst_25636__$1);

return statearr_25731;
})();
var statearr_25732_25792 = state_25725__$1;
(statearr_25732_25792[(2)] = null);

(statearr_25732_25792[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (4))){
var inst_25636 = (state_25725[(7)]);
var inst_25638 = cljs.core.seq.call(null,inst_25636);
var state_25725__$1 = state_25725;
if(inst_25638){
var statearr_25733_25793 = state_25725__$1;
(statearr_25733_25793[(1)] = (6));

} else {
var statearr_25734_25794 = state_25725__$1;
(statearr_25734_25794[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (15))){
var inst_25642 = (state_25725[(9)]);
var inst_25659 = cljs.core.apply.call(null,cljs.core.hash_map,inst_25642);
var state_25725__$1 = state_25725;
var statearr_25735_25795 = state_25725__$1;
(statearr_25735_25795[(2)] = inst_25659);

(statearr_25735_25795[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (21))){
var inst_25696 = (state_25725[(2)]);
var state_25725__$1 = state_25725;
var statearr_25736_25796 = state_25725__$1;
(statearr_25736_25796[(2)] = inst_25696);

(statearr_25736_25796[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (31))){
var inst_25705 = (state_25725[(10)]);
var inst_25704 = cljs.core.async.timeout.call(null,loop_delay);
var inst_25705__$1 = new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983).cljs$core$IFn$_invoke$arity$1(recording);
var inst_25706 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_25707 = [inst_25704,inst_25705__$1];
var inst_25708 = (new cljs.core.PersistentVector(null,2,(5),inst_25706,inst_25707,null));
var state_25725__$1 = (function (){var statearr_25737 = state_25725;
(statearr_25737[(10)] = inst_25705__$1);

return statearr_25737;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_25725__$1,(34),inst_25708);
} else {
if((state_val_25726 === (32))){
var state_25725__$1 = state_25725;
var statearr_25738_25797 = state_25725__$1;
(statearr_25738_25797[(2)] = null);

(statearr_25738_25797[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (33))){
var inst_25721 = (state_25725[(2)]);
var state_25725__$1 = state_25725;
var statearr_25739_25798 = state_25725__$1;
(statearr_25739_25798[(2)] = inst_25721);

(statearr_25739_25798[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (13))){
var state_25725__$1 = state_25725;
var statearr_25740_25799 = state_25725__$1;
(statearr_25740_25799[(2)] = false);

(statearr_25740_25799[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (22))){
var inst_25663 = (state_25725[(11)]);
var inst_25679 = parinfer.vcr.apply_change.call(null,cm,inst_25663);
var state_25725__$1 = state_25725;
var statearr_25741_25800 = state_25725__$1;
(statearr_25741_25800[(2)] = inst_25679);

(statearr_25741_25800[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (36))){
var state_25725__$1 = state_25725;
var statearr_25742_25801 = state_25725__$1;
(statearr_25742_25801[(2)] = null);

(statearr_25742_25801[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (29))){
var state_25725__$1 = state_25725;
var statearr_25743_25802 = state_25725__$1;
(statearr_25743_25802[(2)] = null);

(statearr_25743_25802[(1)] = (30));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (6))){
var inst_25642 = (state_25725[(9)]);
var inst_25636 = (state_25725[(7)]);
var inst_25642__$1 = cljs.core.first.call(null,inst_25636);
var inst_25644 = (inst_25642__$1 == null);
var inst_25645 = cljs.core.not.call(null,inst_25644);
var state_25725__$1 = (function (){var statearr_25744 = state_25725;
(statearr_25744[(9)] = inst_25642__$1);

return statearr_25744;
})();
if(inst_25645){
var statearr_25745_25803 = state_25725__$1;
(statearr_25745_25803[(1)] = (9));

} else {
var statearr_25746_25804 = state_25725__$1;
(statearr_25746_25804[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (28))){
var state_25725__$1 = state_25725;
var statearr_25747_25805 = state_25725__$1;
(statearr_25747_25805[(2)] = null);

(statearr_25747_25805[(1)] = (30));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (25))){
var inst_25664 = (state_25725[(12)]);
var inst_25682 = parinfer.vcr.apply_selections.call(null,cm,inst_25664);
var state_25725__$1 = state_25725;
var statearr_25748_25806 = state_25725__$1;
(statearr_25748_25806[(2)] = inst_25682);

(statearr_25748_25806[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (34))){
var inst_25705 = (state_25725[(10)]);
var inst_25710 = (state_25725[(2)]);
var inst_25711 = cljs.core.nth.call(null,inst_25710,(0),null);
var inst_25712 = cljs.core.nth.call(null,inst_25710,(1),null);
var inst_25713 = cljs.core.not_EQ_.call(null,inst_25712,inst_25705);
var state_25725__$1 = (function (){var statearr_25749 = state_25725;
(statearr_25749[(13)] = inst_25711);

return statearr_25749;
})();
if(inst_25713){
var statearr_25750_25807 = state_25725__$1;
(statearr_25750_25807[(1)] = (35));

} else {
var statearr_25751_25808 = state_25725__$1;
(statearr_25751_25808[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (17))){
var inst_25668 = (state_25725[(14)]);
var inst_25662 = (state_25725[(2)]);
var inst_25663 = cljs.core.get.call(null,inst_25662,new cljs.core.Keyword(null,"change","change",-1163046502));
var inst_25664 = cljs.core.get.call(null,inst_25662,new cljs.core.Keyword(null,"selections","selections",-1277610233));
var inst_25665 = cljs.core.get.call(null,inst_25662,new cljs.core.Keyword(null,"dt","dt",-368444759));
var inst_25666 = (inst_25665 / timescale);
var inst_25667 = cljs.core.async.timeout.call(null,inst_25666);
var inst_25668__$1 = new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983).cljs$core$IFn$_invoke$arity$1(recording);
var inst_25669 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_25670 = [inst_25667,inst_25668__$1];
var inst_25671 = (new cljs.core.PersistentVector(null,2,(5),inst_25669,inst_25670,null));
var state_25725__$1 = (function (){var statearr_25752 = state_25725;
(statearr_25752[(11)] = inst_25663);

(statearr_25752[(14)] = inst_25668__$1);

(statearr_25752[(12)] = inst_25664);

return statearr_25752;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_25725__$1,(18),inst_25671);
} else {
if((state_val_25726 === (3))){
var inst_25723 = (state_25725[(2)]);
var state_25725__$1 = state_25725;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25725__$1,inst_25723);
} else {
if((state_val_25726 === (12))){
var state_25725__$1 = state_25725;
var statearr_25753_25809 = state_25725__$1;
(statearr_25753_25809[(2)] = true);

(statearr_25753_25809[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (2))){
var inst_25630 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_25631 = [key_,new cljs.core.Keyword(null,"text","text",-1790561697)];
var inst_25632 = (new cljs.core.PersistentVector(null,2,(5),inst_25630,inst_25631,null));
var inst_25633 = new cljs.core.Keyword(null,"init-value","init-value",-374892331).cljs$core$IFn$_invoke$arity$1(recording);
var inst_25634 = cljs.core.swap_BANG_.call(null,parinfer.state.state,cljs.core.assoc_in,inst_25632,inst_25633);
var inst_25635 = new cljs.core.Keyword(null,"changes","changes",1492088).cljs$core$IFn$_invoke$arity$1(recording);
var inst_25636 = inst_25635;
var state_25725__$1 = (function (){var statearr_25754 = state_25725;
(statearr_25754[(15)] = inst_25634);

(statearr_25754[(7)] = inst_25636);

return statearr_25754;
})();
var statearr_25755_25810 = state_25725__$1;
(statearr_25755_25810[(2)] = null);

(statearr_25755_25810[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (23))){
var inst_25664 = (state_25725[(12)]);
var state_25725__$1 = state_25725;
if(cljs.core.truth_(inst_25664)){
var statearr_25756_25811 = state_25725__$1;
(statearr_25756_25811[(1)] = (25));

} else {
var statearr_25757_25812 = state_25725__$1;
(statearr_25757_25812[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (35))){
var state_25725__$1 = state_25725;
var statearr_25758_25813 = state_25725__$1;
(statearr_25758_25813[(2)] = null);

(statearr_25758_25813[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (19))){
var inst_25663 = (state_25725[(11)]);
var state_25725__$1 = state_25725;
if(cljs.core.truth_(inst_25663)){
var statearr_25759_25814 = state_25725__$1;
(statearr_25759_25814[(1)] = (22));

} else {
var statearr_25760_25815 = state_25725__$1;
(statearr_25760_25815[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (11))){
var inst_25657 = (state_25725[(2)]);
var state_25725__$1 = state_25725;
if(cljs.core.truth_(inst_25657)){
var statearr_25761_25816 = state_25725__$1;
(statearr_25761_25816[(1)] = (15));

} else {
var statearr_25762_25817 = state_25725__$1;
(statearr_25762_25817[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (9))){
var inst_25642 = (state_25725[(9)]);
var inst_25647 = inst_25642.cljs$lang$protocol_mask$partition0$;
var inst_25648 = (inst_25647 & (64));
var inst_25649 = inst_25642.cljs$core$ISeq$;
var inst_25650 = (inst_25648) || (inst_25649);
var state_25725__$1 = state_25725;
if(cljs.core.truth_(inst_25650)){
var statearr_25763_25818 = state_25725__$1;
(statearr_25763_25818[(1)] = (12));

} else {
var statearr_25764_25819 = state_25725__$1;
(statearr_25764_25819[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (5))){
var inst_25701 = (state_25725[(2)]);
var state_25725__$1 = (function (){var statearr_25765 = state_25725;
(statearr_25765[(16)] = inst_25701);

return statearr_25765;
})();
if(cljs.core.truth_(loop_QMARK_)){
var statearr_25766_25820 = state_25725__$1;
(statearr_25766_25820[(1)] = (31));

} else {
var statearr_25767_25821 = state_25725__$1;
(statearr_25767_25821[(1)] = (32));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (14))){
var inst_25654 = (state_25725[(2)]);
var state_25725__$1 = state_25725;
var statearr_25768_25822 = state_25725__$1;
(statearr_25768_25822[(2)] = inst_25654);

(statearr_25768_25822[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (26))){
var state_25725__$1 = state_25725;
var statearr_25769_25823 = state_25725__$1;
(statearr_25769_25823[(1)] = (28));



return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (16))){
var inst_25642 = (state_25725[(9)]);
var state_25725__$1 = state_25725;
var statearr_25771_25824 = state_25725__$1;
(statearr_25771_25824[(2)] = inst_25642);

(statearr_25771_25824[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (30))){
var inst_25687 = (state_25725[(2)]);
var state_25725__$1 = state_25725;
var statearr_25772_25825 = state_25725__$1;
(statearr_25772_25825[(2)] = inst_25687);

(statearr_25772_25825[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (10))){
var state_25725__$1 = state_25725;
var statearr_25773_25826 = state_25725__$1;
(statearr_25773_25826[(2)] = false);

(statearr_25773_25826[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (18))){
var inst_25668 = (state_25725[(14)]);
var inst_25673 = (state_25725[(2)]);
var inst_25674 = cljs.core.nth.call(null,inst_25673,(0),null);
var inst_25675 = cljs.core.nth.call(null,inst_25673,(1),null);
var inst_25676 = cljs.core.not_EQ_.call(null,inst_25675,inst_25668);
var state_25725__$1 = (function (){var statearr_25774 = state_25725;
(statearr_25774[(17)] = inst_25674);

return statearr_25774;
})();
if(inst_25676){
var statearr_25775_25827 = state_25725__$1;
(statearr_25775_25827[(1)] = (19));

} else {
var statearr_25776_25828 = state_25725__$1;
(statearr_25776_25828[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (37))){
var inst_25718 = (state_25725[(2)]);
var state_25725__$1 = state_25725;
var statearr_25777_25829 = state_25725__$1;
(statearr_25777_25829[(2)] = inst_25718);

(statearr_25777_25829[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25726 === (8))){
var inst_25699 = (state_25725[(2)]);
var state_25725__$1 = state_25725;
var statearr_25778_25830 = state_25725__$1;
(statearr_25778_25830[(2)] = inst_25699);

(statearr_25778_25830[(1)] = (5));


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
});})(c__19434__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
;
return ((function (switch__19413__auto__,c__19434__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function() {
var parinfer$vcr$play_recording_BANG__$_state_machine__19414__auto__ = null;
var parinfer$vcr$play_recording_BANG__$_state_machine__19414__auto____0 = (function (){
var statearr_25782 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25782[(0)] = parinfer$vcr$play_recording_BANG__$_state_machine__19414__auto__);

(statearr_25782[(1)] = (1));

return statearr_25782;
});
var parinfer$vcr$play_recording_BANG__$_state_machine__19414__auto____1 = (function (state_25725){
while(true){
var ret_value__19415__auto__ = (function (){try{while(true){
var result__19416__auto__ = switch__19413__auto__.call(null,state_25725);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19416__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19416__auto__;
}
break;
}
}catch (e25783){if((e25783 instanceof Object)){
var ex__19417__auto__ = e25783;
var statearr_25784_25831 = state_25725;
(statearr_25784_25831[(5)] = ex__19417__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25725);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25783;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19415__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25832 = state_25725;
state_25725 = G__25832;
continue;
} else {
return ret_value__19415__auto__;
}
break;
}
});
parinfer$vcr$play_recording_BANG__$_state_machine__19414__auto__ = function(state_25725){
switch(arguments.length){
case 0:
return parinfer$vcr$play_recording_BANG__$_state_machine__19414__auto____0.call(this);
case 1:
return parinfer$vcr$play_recording_BANG__$_state_machine__19414__auto____1.call(this,state_25725);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
parinfer$vcr$play_recording_BANG__$_state_machine__19414__auto__.cljs$core$IFn$_invoke$arity$0 = parinfer$vcr$play_recording_BANG__$_state_machine__19414__auto____0;
parinfer$vcr$play_recording_BANG__$_state_machine__19414__auto__.cljs$core$IFn$_invoke$arity$1 = parinfer$vcr$play_recording_BANG__$_state_machine__19414__auto____1;
return parinfer$vcr$play_recording_BANG__$_state_machine__19414__auto__;
})()
;})(switch__19413__auto__,c__19434__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
})();
var state__19436__auto__ = (function (){var statearr_25785 = f__19435__auto__.call(null);
(statearr_25785[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19434__auto__);

return statearr_25785;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19436__auto__);
});})(c__19434__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
);

return c__19434__auto__;
});
parinfer.vcr.stop_playing_BANG_ = (function parinfer$vcr$stop_playing_BANG_(key_){
var temp__4425__auto__ = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer.vcr.vcr),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983)], null));
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
parinfer.vcr.print_recording_BANG_ = (function parinfer$vcr$print_recording_BANG_(key_){
var cm = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer.state.state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"cm","cm",540591536)], null));
var recording = cljs.core.get.call(null,cljs.core.deref.call(null,parinfer.vcr.vcr),key_);
return cljs.pprint.pprint.call(null,cljs.core.dissoc.call(null,recording,new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983)));
});
parinfer.vcr.SHOW_CONTROLS = false;
if(typeof parinfer.vcr.controls_state !== 'undefined'){
} else {
parinfer.vcr.controls_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"show?","show?",1543842127),parinfer.vcr.SHOW_CONTROLS,new cljs.core.Keyword(null,"target-key","target-key",-1657436029),null], null));
}
parinfer.vcr.controls_view = (function parinfer$vcr$controls_view(p__25833,owner){
var map__25842 = p__25833;
var map__25842__$1 = ((((!((map__25842 == null)))?((((map__25842.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25842.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25842):map__25842);
var data = map__25842__$1;
var target_key = cljs.core.get.call(null,map__25842__$1,new cljs.core.Keyword(null,"target-key","target-key",-1657436029));
var show_QMARK_ = cljs.core.get.call(null,map__25842__$1,new cljs.core.Keyword(null,"show?","show?",1543842127));
if(typeof parinfer.vcr.t_parinfer$vcr25844 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
parinfer.vcr.t_parinfer$vcr25844 = (function (controls_view,p__25833,owner,map__25842,data,target_key,show_QMARK_,meta25845){
this.controls_view = controls_view;
this.p__25833 = p__25833;
this.owner = owner;
this.map__25842 = map__25842;
this.data = data;
this.target_key = target_key;
this.show_QMARK_ = show_QMARK_;
this.meta25845 = meta25845;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
parinfer.vcr.t_parinfer$vcr25844.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__25842,map__25842__$1,data,target_key,show_QMARK_){
return (function (_25846,meta25845__$1){
var self__ = this;
var _25846__$1 = this;
return (new parinfer.vcr.t_parinfer$vcr25844(self__.controls_view,self__.p__25833,self__.owner,self__.map__25842,self__.data,self__.target_key,self__.show_QMARK_,meta25845__$1));
});})(map__25842,map__25842__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.t_parinfer$vcr25844.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__25842,map__25842__$1,data,target_key,show_QMARK_){
return (function (_25846){
var self__ = this;
var _25846__$1 = this;
return self__.meta25845;
});})(map__25842,map__25842__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.t_parinfer$vcr25844.prototype.om$core$IRender$ = true;

parinfer.vcr.t_parinfer$vcr25844.prototype.om$core$IRender$render$arity$1 = ((function (map__25842,map__25842__$1,data,target_key,show_QMARK_){
return (function (_){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.show_QMARK_)){
return React.createElement("div",null,(function (){var attrs25847 = (cljs.core.truth_(self__.target_key)?[cljs.core.str(self__.target_key)].join(''):"(click an editor)");
return cljs.core.apply.call(null,React.createElement,"code",((cljs.core.map_QMARK_.call(null,attrs25847))?sablono.interpreter.attributes.call(null,attrs25847):null),cljs.core.remove.call(null,cljs.core.nil_QMARK_,((cljs.core.map_QMARK_.call(null,attrs25847))?cljs.core.PersistentVector.EMPTY:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.interpreter.interpret.call(null,attrs25847)], null))));
})(),React.createElement("br",null),React.createElement("button",{"onClick": ((function (___$1,map__25842,map__25842__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.start_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__25842,map__25842__$1,data,target_key,show_QMARK_))
},"Start Record"),React.createElement("button",{"onClick": ((function (___$1,map__25842,map__25842__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.done_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__25842,map__25842__$1,data,target_key,show_QMARK_))
},"Stop Record"),React.createElement("button",{"onClick": ((function (___$1,map__25842,map__25842__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.play_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__25842,map__25842__$1,data,target_key,show_QMARK_))
},"Play"),React.createElement("button",{"onClick": ((function (___$1,map__25842,map__25842__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.stop_playing_BANG_.call(null,self__.target_key);
});})(___$1,map__25842,map__25842__$1,data,target_key,show_QMARK_))
},"Stop"),React.createElement("button",{"onClick": ((function (___$1,map__25842,map__25842__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.print_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__25842,map__25842__$1,data,target_key,show_QMARK_))
},"Print"));
} else {
return null;
}
});})(map__25842,map__25842__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.t_parinfer$vcr25844.getBasis = ((function (map__25842,map__25842__$1,data,target_key,show_QMARK_){
return (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"controls-view","controls-view",-1937031930,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"target-key","target-key",-16904502,null),new cljs.core.Symbol(null,"show?","show?",-1110593642,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"data","data",1407862150,null)], null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"p__25833","p__25833",-1148996192,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"map__25842","map__25842",1463074722,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"target-key","target-key",-16904502,null),new cljs.core.Symbol(null,"show?","show?",-1110593642,null),new cljs.core.Symbol(null,"meta25845","meta25845",2138868310,null)], null);
});})(map__25842,map__25842__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.t_parinfer$vcr25844.cljs$lang$type = true;

parinfer.vcr.t_parinfer$vcr25844.cljs$lang$ctorStr = "parinfer.vcr/t_parinfer$vcr25844";

parinfer.vcr.t_parinfer$vcr25844.cljs$lang$ctorPrWriter = ((function (map__25842,map__25842__$1,data,target_key,show_QMARK_){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"parinfer.vcr/t_parinfer$vcr25844");
});})(map__25842,map__25842__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.__GT_t_parinfer$vcr25844 = ((function (map__25842,map__25842__$1,data,target_key,show_QMARK_){
return (function parinfer$vcr$controls_view_$___GT_t_parinfer$vcr25844(controls_view__$1,p__25833__$1,owner__$1,map__25842__$2,data__$1,target_key__$1,show_QMARK___$1,meta25845){
return (new parinfer.vcr.t_parinfer$vcr25844(controls_view__$1,p__25833__$1,owner__$1,map__25842__$2,data__$1,target_key__$1,show_QMARK___$1,meta25845));
});})(map__25842,map__25842__$1,data,target_key,show_QMARK_))
;

}

return (new parinfer.vcr.t_parinfer$vcr25844(parinfer$vcr$controls_view,p__25833,owner,map__25842__$1,data,target_key,show_QMARK_,cljs.core.PersistentArrayMap.EMPTY));
});
parinfer.vcr.render_controls_BANG_ = (function parinfer$vcr$render_controls_BANG_(){
return om.core.root.call(null,parinfer.vcr.controls_view,parinfer.vcr.controls_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("controls")], null));
});

//# sourceMappingURL=vcr.js.map?rel=1444613302181