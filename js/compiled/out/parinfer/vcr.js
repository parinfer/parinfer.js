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
parinfer.vcr.apply_change = (function parinfer$vcr$apply_change(cm,p__37646){
var map__37649 = p__37646;
var map__37649__$1 = ((((!((map__37649 == null)))?((((map__37649.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37649.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37649):map__37649);
var text = cljs.core.get.call(null,map__37649__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var from = cljs.core.get.call(null,map__37649__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var to = cljs.core.get.call(null,map__37649__$1,new cljs.core.Keyword(null,"to","to",192099007));
var origin = cljs.core.get.call(null,map__37649__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
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
var map__37653 = cljs.core.get.call(null,cljs.core.deref.call(null,parinfer.state.state),key_);
var map__37653__$1 = ((((!((map__37653 == null)))?((((map__37653.cljs$lang$protocol_mask$partition0$ & (64))) || (map__37653.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37653):map__37653);
var editor = map__37653__$1;
var text = cljs.core.get.call(null,map__37653__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var cm = cljs.core.get.call(null,map__37653__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
return cljs.core.swap_BANG_.call(null,parinfer.vcr.vcr,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),cljs.core.assoc,new cljs.core.Keyword(null,"changes","changes",1492088),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"init-value","init-value",-374892331),text,new cljs.core.Keyword(null,"recording?","recording?",-1477514924),true,new cljs.core.Keyword(null,"last-time","last-time",-1707132740),null);
});
parinfer.vcr.done_recording_BANG_ = (function parinfer$vcr$done_recording_BANG_(key_){
return cljs.core.swap_BANG_.call(null,parinfer.vcr.vcr,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"recording?","recording?",-1477514924)], null),false);
});
parinfer.vcr.play_recording_BANG_ = (function parinfer$vcr$play_recording_BANG_(key_){
var temp__4425__auto___37969 = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer.vcr.vcr),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983)], null));
if(cljs.core.truth_(temp__4425__auto___37969)){
var stop_chan_37970 = temp__4425__auto___37969;
cljs.core.async.close_BANG_.call(null,stop_chan_37970);
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

var c__19891__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function (state_37908){
var state_val_37909 = (state_37908[(1)]);
if((state_val_37909 === (7))){
var state_37908__$1 = state_37908;
var statearr_37910_37971 = state_37908__$1;
(statearr_37910_37971[(2)] = null);

(statearr_37910_37971[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (20))){
var state_37908__$1 = state_37908;
var statearr_37911_37972 = state_37908__$1;
(statearr_37911_37972[(2)] = null);

(statearr_37911_37972[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (27))){
var inst_37872 = (state_37908[(2)]);
var state_37908__$1 = state_37908;
var statearr_37912_37973 = state_37908__$1;
(statearr_37912_37973[(2)] = inst_37872);

(statearr_37912_37973[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (1))){
var state_37908__$1 = state_37908;
var statearr_37913_37974 = state_37908__$1;
(statearr_37913_37974[(2)] = null);

(statearr_37913_37974[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (24))){
var inst_37819 = (state_37908[(7)]);
var inst_37874 = (state_37908[(2)]);
var inst_37875 = cljs.core.rest.call(null,inst_37819);
var inst_37819__$1 = inst_37875;
var state_37908__$1 = (function (){var statearr_37914 = state_37908;
(statearr_37914[(8)] = inst_37874);

(statearr_37914[(7)] = inst_37819__$1);

return statearr_37914;
})();
var statearr_37915_37975 = state_37908__$1;
(statearr_37915_37975[(2)] = null);

(statearr_37915_37975[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (4))){
var inst_37819 = (state_37908[(7)]);
var inst_37821 = cljs.core.seq.call(null,inst_37819);
var state_37908__$1 = state_37908;
if(inst_37821){
var statearr_37916_37976 = state_37908__$1;
(statearr_37916_37976[(1)] = (6));

} else {
var statearr_37917_37977 = state_37908__$1;
(statearr_37917_37977[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (15))){
var inst_37825 = (state_37908[(9)]);
var inst_37842 = cljs.core.apply.call(null,cljs.core.hash_map,inst_37825);
var state_37908__$1 = state_37908;
var statearr_37918_37978 = state_37908__$1;
(statearr_37918_37978[(2)] = inst_37842);

(statearr_37918_37978[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (21))){
var inst_37879 = (state_37908[(2)]);
var state_37908__$1 = state_37908;
var statearr_37919_37979 = state_37908__$1;
(statearr_37919_37979[(2)] = inst_37879);

(statearr_37919_37979[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (31))){
var inst_37888 = (state_37908[(10)]);
var inst_37887 = cljs.core.async.timeout.call(null,loop_delay);
var inst_37888__$1 = new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983).cljs$core$IFn$_invoke$arity$1(recording);
var inst_37889 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_37890 = [inst_37887,inst_37888__$1];
var inst_37891 = (new cljs.core.PersistentVector(null,2,(5),inst_37889,inst_37890,null));
var state_37908__$1 = (function (){var statearr_37920 = state_37908;
(statearr_37920[(10)] = inst_37888__$1);

return statearr_37920;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_37908__$1,(34),inst_37891);
} else {
if((state_val_37909 === (32))){
var state_37908__$1 = state_37908;
var statearr_37921_37980 = state_37908__$1;
(statearr_37921_37980[(2)] = null);

(statearr_37921_37980[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (33))){
var inst_37904 = (state_37908[(2)]);
var state_37908__$1 = state_37908;
var statearr_37922_37981 = state_37908__$1;
(statearr_37922_37981[(2)] = inst_37904);

(statearr_37922_37981[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (13))){
var state_37908__$1 = state_37908;
var statearr_37923_37982 = state_37908__$1;
(statearr_37923_37982[(2)] = false);

(statearr_37923_37982[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (22))){
var inst_37846 = (state_37908[(11)]);
var inst_37862 = parinfer.vcr.apply_change.call(null,cm,inst_37846);
var state_37908__$1 = state_37908;
var statearr_37924_37983 = state_37908__$1;
(statearr_37924_37983[(2)] = inst_37862);

(statearr_37924_37983[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (36))){
var state_37908__$1 = state_37908;
var statearr_37925_37984 = state_37908__$1;
(statearr_37925_37984[(2)] = null);

(statearr_37925_37984[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (29))){
var state_37908__$1 = state_37908;
var statearr_37926_37985 = state_37908__$1;
(statearr_37926_37985[(2)] = null);

(statearr_37926_37985[(1)] = (30));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (6))){
var inst_37819 = (state_37908[(7)]);
var inst_37825 = (state_37908[(9)]);
var inst_37825__$1 = cljs.core.first.call(null,inst_37819);
var inst_37827 = (inst_37825__$1 == null);
var inst_37828 = cljs.core.not.call(null,inst_37827);
var state_37908__$1 = (function (){var statearr_37927 = state_37908;
(statearr_37927[(9)] = inst_37825__$1);

return statearr_37927;
})();
if(inst_37828){
var statearr_37928_37986 = state_37908__$1;
(statearr_37928_37986[(1)] = (9));

} else {
var statearr_37929_37987 = state_37908__$1;
(statearr_37929_37987[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (28))){
var state_37908__$1 = state_37908;
var statearr_37930_37988 = state_37908__$1;
(statearr_37930_37988[(2)] = null);

(statearr_37930_37988[(1)] = (30));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (25))){
var inst_37847 = (state_37908[(12)]);
var inst_37865 = parinfer.vcr.apply_selections.call(null,cm,inst_37847);
var state_37908__$1 = state_37908;
var statearr_37931_37989 = state_37908__$1;
(statearr_37931_37989[(2)] = inst_37865);

(statearr_37931_37989[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (34))){
var inst_37888 = (state_37908[(10)]);
var inst_37893 = (state_37908[(2)]);
var inst_37894 = cljs.core.nth.call(null,inst_37893,(0),null);
var inst_37895 = cljs.core.nth.call(null,inst_37893,(1),null);
var inst_37896 = cljs.core.not_EQ_.call(null,inst_37895,inst_37888);
var state_37908__$1 = (function (){var statearr_37932 = state_37908;
(statearr_37932[(13)] = inst_37894);

return statearr_37932;
})();
if(inst_37896){
var statearr_37933_37990 = state_37908__$1;
(statearr_37933_37990[(1)] = (35));

} else {
var statearr_37934_37991 = state_37908__$1;
(statearr_37934_37991[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (17))){
var inst_37851 = (state_37908[(14)]);
var inst_37845 = (state_37908[(2)]);
var inst_37846 = cljs.core.get.call(null,inst_37845,new cljs.core.Keyword(null,"change","change",-1163046502));
var inst_37847 = cljs.core.get.call(null,inst_37845,new cljs.core.Keyword(null,"selections","selections",-1277610233));
var inst_37848 = cljs.core.get.call(null,inst_37845,new cljs.core.Keyword(null,"dt","dt",-368444759));
var inst_37849 = (inst_37848 / timescale);
var inst_37850 = cljs.core.async.timeout.call(null,inst_37849);
var inst_37851__$1 = new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983).cljs$core$IFn$_invoke$arity$1(recording);
var inst_37852 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_37853 = [inst_37850,inst_37851__$1];
var inst_37854 = (new cljs.core.PersistentVector(null,2,(5),inst_37852,inst_37853,null));
var state_37908__$1 = (function (){var statearr_37935 = state_37908;
(statearr_37935[(14)] = inst_37851__$1);

(statearr_37935[(12)] = inst_37847);

(statearr_37935[(11)] = inst_37846);

return statearr_37935;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_37908__$1,(18),inst_37854);
} else {
if((state_val_37909 === (3))){
var inst_37906 = (state_37908[(2)]);
var state_37908__$1 = state_37908;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_37908__$1,inst_37906);
} else {
if((state_val_37909 === (12))){
var state_37908__$1 = state_37908;
var statearr_37936_37992 = state_37908__$1;
(statearr_37936_37992[(2)] = true);

(statearr_37936_37992[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (2))){
var inst_37813 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_37814 = [key_,new cljs.core.Keyword(null,"text","text",-1790561697)];
var inst_37815 = (new cljs.core.PersistentVector(null,2,(5),inst_37813,inst_37814,null));
var inst_37816 = new cljs.core.Keyword(null,"init-value","init-value",-374892331).cljs$core$IFn$_invoke$arity$1(recording);
var inst_37817 = cljs.core.swap_BANG_.call(null,parinfer.state.state,cljs.core.assoc_in,inst_37815,inst_37816);
var inst_37818 = new cljs.core.Keyword(null,"changes","changes",1492088).cljs$core$IFn$_invoke$arity$1(recording);
var inst_37819 = inst_37818;
var state_37908__$1 = (function (){var statearr_37937 = state_37908;
(statearr_37937[(15)] = inst_37817);

(statearr_37937[(7)] = inst_37819);

return statearr_37937;
})();
var statearr_37938_37993 = state_37908__$1;
(statearr_37938_37993[(2)] = null);

(statearr_37938_37993[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (23))){
var inst_37847 = (state_37908[(12)]);
var state_37908__$1 = state_37908;
if(cljs.core.truth_(inst_37847)){
var statearr_37939_37994 = state_37908__$1;
(statearr_37939_37994[(1)] = (25));

} else {
var statearr_37940_37995 = state_37908__$1;
(statearr_37940_37995[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (35))){
var state_37908__$1 = state_37908;
var statearr_37941_37996 = state_37908__$1;
(statearr_37941_37996[(2)] = null);

(statearr_37941_37996[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (19))){
var inst_37846 = (state_37908[(11)]);
var state_37908__$1 = state_37908;
if(cljs.core.truth_(inst_37846)){
var statearr_37942_37997 = state_37908__$1;
(statearr_37942_37997[(1)] = (22));

} else {
var statearr_37943_37998 = state_37908__$1;
(statearr_37943_37998[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (11))){
var inst_37840 = (state_37908[(2)]);
var state_37908__$1 = state_37908;
if(cljs.core.truth_(inst_37840)){
var statearr_37944_37999 = state_37908__$1;
(statearr_37944_37999[(1)] = (15));

} else {
var statearr_37945_38000 = state_37908__$1;
(statearr_37945_38000[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (9))){
var inst_37825 = (state_37908[(9)]);
var inst_37830 = inst_37825.cljs$lang$protocol_mask$partition0$;
var inst_37831 = (inst_37830 & (64));
var inst_37832 = inst_37825.cljs$core$ISeq$;
var inst_37833 = (inst_37831) || (inst_37832);
var state_37908__$1 = state_37908;
if(cljs.core.truth_(inst_37833)){
var statearr_37946_38001 = state_37908__$1;
(statearr_37946_38001[(1)] = (12));

} else {
var statearr_37947_38002 = state_37908__$1;
(statearr_37947_38002[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (5))){
var inst_37884 = (state_37908[(2)]);
var state_37908__$1 = (function (){var statearr_37948 = state_37908;
(statearr_37948[(16)] = inst_37884);

return statearr_37948;
})();
if(cljs.core.truth_(loop_QMARK_)){
var statearr_37949_38003 = state_37908__$1;
(statearr_37949_38003[(1)] = (31));

} else {
var statearr_37950_38004 = state_37908__$1;
(statearr_37950_38004[(1)] = (32));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (14))){
var inst_37837 = (state_37908[(2)]);
var state_37908__$1 = state_37908;
var statearr_37951_38005 = state_37908__$1;
(statearr_37951_38005[(2)] = inst_37837);

(statearr_37951_38005[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (26))){
var state_37908__$1 = state_37908;
var statearr_37952_38006 = state_37908__$1;
(statearr_37952_38006[(1)] = (28));



return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (16))){
var inst_37825 = (state_37908[(9)]);
var state_37908__$1 = state_37908;
var statearr_37954_38007 = state_37908__$1;
(statearr_37954_38007[(2)] = inst_37825);

(statearr_37954_38007[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (30))){
var inst_37870 = (state_37908[(2)]);
var state_37908__$1 = state_37908;
var statearr_37955_38008 = state_37908__$1;
(statearr_37955_38008[(2)] = inst_37870);

(statearr_37955_38008[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (10))){
var state_37908__$1 = state_37908;
var statearr_37956_38009 = state_37908__$1;
(statearr_37956_38009[(2)] = false);

(statearr_37956_38009[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (18))){
var inst_37851 = (state_37908[(14)]);
var inst_37856 = (state_37908[(2)]);
var inst_37857 = cljs.core.nth.call(null,inst_37856,(0),null);
var inst_37858 = cljs.core.nth.call(null,inst_37856,(1),null);
var inst_37859 = cljs.core.not_EQ_.call(null,inst_37858,inst_37851);
var state_37908__$1 = (function (){var statearr_37957 = state_37908;
(statearr_37957[(17)] = inst_37857);

return statearr_37957;
})();
if(inst_37859){
var statearr_37958_38010 = state_37908__$1;
(statearr_37958_38010[(1)] = (19));

} else {
var statearr_37959_38011 = state_37908__$1;
(statearr_37959_38011[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (37))){
var inst_37901 = (state_37908[(2)]);
var state_37908__$1 = state_37908;
var statearr_37960_38012 = state_37908__$1;
(statearr_37960_38012[(2)] = inst_37901);

(statearr_37960_38012[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37909 === (8))){
var inst_37882 = (state_37908[(2)]);
var state_37908__$1 = state_37908;
var statearr_37961_38013 = state_37908__$1;
(statearr_37961_38013[(2)] = inst_37882);

(statearr_37961_38013[(1)] = (5));


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
});})(c__19891__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
;
return ((function (switch__19826__auto__,c__19891__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function() {
var parinfer$vcr$play_recording_BANG__$_state_machine__19827__auto__ = null;
var parinfer$vcr$play_recording_BANG__$_state_machine__19827__auto____0 = (function (){
var statearr_37965 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_37965[(0)] = parinfer$vcr$play_recording_BANG__$_state_machine__19827__auto__);

(statearr_37965[(1)] = (1));

return statearr_37965;
});
var parinfer$vcr$play_recording_BANG__$_state_machine__19827__auto____1 = (function (state_37908){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_37908);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e37966){if((e37966 instanceof Object)){
var ex__19830__auto__ = e37966;
var statearr_37967_38014 = state_37908;
(statearr_37967_38014[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_37908);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e37966;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38015 = state_37908;
state_37908 = G__38015;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
parinfer$vcr$play_recording_BANG__$_state_machine__19827__auto__ = function(state_37908){
switch(arguments.length){
case 0:
return parinfer$vcr$play_recording_BANG__$_state_machine__19827__auto____0.call(this);
case 1:
return parinfer$vcr$play_recording_BANG__$_state_machine__19827__auto____1.call(this,state_37908);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
parinfer$vcr$play_recording_BANG__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = parinfer$vcr$play_recording_BANG__$_state_machine__19827__auto____0;
parinfer$vcr$play_recording_BANG__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = parinfer$vcr$play_recording_BANG__$_state_machine__19827__auto____1;
return parinfer$vcr$play_recording_BANG__$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
})();
var state__19893__auto__ = (function (){var statearr_37968 = f__19892__auto__.call(null);
(statearr_37968[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto__);

return statearr_37968;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
);

return c__19891__auto__;
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
parinfer.vcr.controls_view = (function parinfer$vcr$controls_view(p__38016,owner){
var map__38025 = p__38016;
var map__38025__$1 = ((((!((map__38025 == null)))?((((map__38025.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38025.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38025):map__38025);
var data = map__38025__$1;
var target_key = cljs.core.get.call(null,map__38025__$1,new cljs.core.Keyword(null,"target-key","target-key",-1657436029));
var show_QMARK_ = cljs.core.get.call(null,map__38025__$1,new cljs.core.Keyword(null,"show?","show?",1543842127));
if(typeof parinfer.vcr.t_parinfer$vcr38027 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
parinfer.vcr.t_parinfer$vcr38027 = (function (controls_view,p__38016,owner,map__38025,data,target_key,show_QMARK_,meta38028){
this.controls_view = controls_view;
this.p__38016 = p__38016;
this.owner = owner;
this.map__38025 = map__38025;
this.data = data;
this.target_key = target_key;
this.show_QMARK_ = show_QMARK_;
this.meta38028 = meta38028;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
parinfer.vcr.t_parinfer$vcr38027.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__38025,map__38025__$1,data,target_key,show_QMARK_){
return (function (_38029,meta38028__$1){
var self__ = this;
var _38029__$1 = this;
return (new parinfer.vcr.t_parinfer$vcr38027(self__.controls_view,self__.p__38016,self__.owner,self__.map__38025,self__.data,self__.target_key,self__.show_QMARK_,meta38028__$1));
});})(map__38025,map__38025__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.t_parinfer$vcr38027.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__38025,map__38025__$1,data,target_key,show_QMARK_){
return (function (_38029){
var self__ = this;
var _38029__$1 = this;
return self__.meta38028;
});})(map__38025,map__38025__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.t_parinfer$vcr38027.prototype.om$core$IRender$ = true;

parinfer.vcr.t_parinfer$vcr38027.prototype.om$core$IRender$render$arity$1 = ((function (map__38025,map__38025__$1,data,target_key,show_QMARK_){
return (function (_){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.show_QMARK_)){
return React.createElement("div",null,(function (){var attrs38030 = (cljs.core.truth_(self__.target_key)?[cljs.core.str(self__.target_key)].join(''):"(click an editor)");
return cljs.core.apply.call(null,React.createElement,"code",((cljs.core.map_QMARK_.call(null,attrs38030))?sablono.interpreter.attributes.call(null,attrs38030):null),cljs.core.remove.call(null,cljs.core.nil_QMARK_,((cljs.core.map_QMARK_.call(null,attrs38030))?cljs.core.PersistentVector.EMPTY:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.interpreter.interpret.call(null,attrs38030)], null))));
})(),React.createElement("br",null),React.createElement("button",{"onClick": ((function (___$1,map__38025,map__38025__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.start_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__38025,map__38025__$1,data,target_key,show_QMARK_))
},"Start Record"),React.createElement("button",{"onClick": ((function (___$1,map__38025,map__38025__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.done_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__38025,map__38025__$1,data,target_key,show_QMARK_))
},"Stop Record"),React.createElement("button",{"onClick": ((function (___$1,map__38025,map__38025__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.play_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__38025,map__38025__$1,data,target_key,show_QMARK_))
},"Play"),React.createElement("button",{"onClick": ((function (___$1,map__38025,map__38025__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.stop_playing_BANG_.call(null,self__.target_key);
});})(___$1,map__38025,map__38025__$1,data,target_key,show_QMARK_))
},"Stop"),React.createElement("button",{"onClick": ((function (___$1,map__38025,map__38025__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.print_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__38025,map__38025__$1,data,target_key,show_QMARK_))
},"Print"));
} else {
return null;
}
});})(map__38025,map__38025__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.t_parinfer$vcr38027.getBasis = ((function (map__38025,map__38025__$1,data,target_key,show_QMARK_){
return (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"controls-view","controls-view",-1937031930,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"target-key","target-key",-16904502,null),new cljs.core.Symbol(null,"show?","show?",-1110593642,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"data","data",1407862150,null)], null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"p__38016","p__38016",1592549554,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"map__38025","map__38025",-296150699,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"target-key","target-key",-16904502,null),new cljs.core.Symbol(null,"show?","show?",-1110593642,null),new cljs.core.Symbol(null,"meta38028","meta38028",-2006033665,null)], null);
});})(map__38025,map__38025__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.t_parinfer$vcr38027.cljs$lang$type = true;

parinfer.vcr.t_parinfer$vcr38027.cljs$lang$ctorStr = "parinfer.vcr/t_parinfer$vcr38027";

parinfer.vcr.t_parinfer$vcr38027.cljs$lang$ctorPrWriter = ((function (map__38025,map__38025__$1,data,target_key,show_QMARK_){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"parinfer.vcr/t_parinfer$vcr38027");
});})(map__38025,map__38025__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.__GT_t_parinfer$vcr38027 = ((function (map__38025,map__38025__$1,data,target_key,show_QMARK_){
return (function parinfer$vcr$controls_view_$___GT_t_parinfer$vcr38027(controls_view__$1,p__38016__$1,owner__$1,map__38025__$2,data__$1,target_key__$1,show_QMARK___$1,meta38028){
return (new parinfer.vcr.t_parinfer$vcr38027(controls_view__$1,p__38016__$1,owner__$1,map__38025__$2,data__$1,target_key__$1,show_QMARK___$1,meta38028));
});})(map__38025,map__38025__$1,data,target_key,show_QMARK_))
;

}

return (new parinfer.vcr.t_parinfer$vcr38027(parinfer$vcr$controls_view,p__38016,owner,map__38025__$1,data,target_key,show_QMARK_,cljs.core.PersistentArrayMap.EMPTY));
});
parinfer.vcr.render_controls_BANG_ = (function parinfer$vcr$render_controls_BANG_(){
return om.core.root.call(null,parinfer.vcr.controls_view,parinfer.vcr.controls_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("controls")], null));
});

//# sourceMappingURL=vcr.js.map?rel=1445823441326