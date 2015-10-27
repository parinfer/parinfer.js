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
parinfer.vcr.apply_change = (function parinfer$vcr$apply_change(cm,p__46904){
var map__46907 = p__46904;
var map__46907__$1 = ((((!((map__46907 == null)))?((((map__46907.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46907.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46907):map__46907);
var text = cljs.core.get.call(null,map__46907__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var from = cljs.core.get.call(null,map__46907__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var to = cljs.core.get.call(null,map__46907__$1,new cljs.core.Keyword(null,"to","to",192099007));
var origin = cljs.core.get.call(null,map__46907__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
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
var map__46911 = cljs.core.get.call(null,cljs.core.deref.call(null,parinfer.state.state),key_);
var map__46911__$1 = ((((!((map__46911 == null)))?((((map__46911.cljs$lang$protocol_mask$partition0$ & (64))) || (map__46911.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__46911):map__46911);
var editor = map__46911__$1;
var text = cljs.core.get.call(null,map__46911__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var cm = cljs.core.get.call(null,map__46911__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
return cljs.core.swap_BANG_.call(null,parinfer.vcr.vcr,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),cljs.core.assoc,new cljs.core.Keyword(null,"changes","changes",1492088),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"init-value","init-value",-374892331),text,new cljs.core.Keyword(null,"recording?","recording?",-1477514924),true,new cljs.core.Keyword(null,"last-time","last-time",-1707132740),null);
});
parinfer.vcr.done_recording_BANG_ = (function parinfer$vcr$done_recording_BANG_(key_){
return cljs.core.swap_BANG_.call(null,parinfer.vcr.vcr,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"recording?","recording?",-1477514924)], null),false);
});
parinfer.vcr.play_recording_BANG_ = (function parinfer$vcr$play_recording_BANG_(key_){
var temp__4425__auto___47227 = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer.vcr.vcr),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983)], null));
if(cljs.core.truth_(temp__4425__auto___47227)){
var stop_chan_47228 = temp__4425__auto___47227;
cljs.core.async.close_BANG_.call(null,stop_chan_47228);
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

var c__19920__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function (state_47166){
var state_val_47167 = (state_47166[(1)]);
if((state_val_47167 === (7))){
var state_47166__$1 = state_47166;
var statearr_47168_47229 = state_47166__$1;
(statearr_47168_47229[(2)] = null);

(statearr_47168_47229[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (20))){
var state_47166__$1 = state_47166;
var statearr_47169_47230 = state_47166__$1;
(statearr_47169_47230[(2)] = null);

(statearr_47169_47230[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (27))){
var inst_47130 = (state_47166[(2)]);
var state_47166__$1 = state_47166;
var statearr_47170_47231 = state_47166__$1;
(statearr_47170_47231[(2)] = inst_47130);

(statearr_47170_47231[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (1))){
var state_47166__$1 = state_47166;
var statearr_47171_47232 = state_47166__$1;
(statearr_47171_47232[(2)] = null);

(statearr_47171_47232[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (24))){
var inst_47077 = (state_47166[(7)]);
var inst_47132 = (state_47166[(2)]);
var inst_47133 = cljs.core.rest.call(null,inst_47077);
var inst_47077__$1 = inst_47133;
var state_47166__$1 = (function (){var statearr_47172 = state_47166;
(statearr_47172[(8)] = inst_47132);

(statearr_47172[(7)] = inst_47077__$1);

return statearr_47172;
})();
var statearr_47173_47233 = state_47166__$1;
(statearr_47173_47233[(2)] = null);

(statearr_47173_47233[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (4))){
var inst_47077 = (state_47166[(7)]);
var inst_47079 = cljs.core.seq.call(null,inst_47077);
var state_47166__$1 = state_47166;
if(inst_47079){
var statearr_47174_47234 = state_47166__$1;
(statearr_47174_47234[(1)] = (6));

} else {
var statearr_47175_47235 = state_47166__$1;
(statearr_47175_47235[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (15))){
var inst_47083 = (state_47166[(9)]);
var inst_47100 = cljs.core.apply.call(null,cljs.core.hash_map,inst_47083);
var state_47166__$1 = state_47166;
var statearr_47176_47236 = state_47166__$1;
(statearr_47176_47236[(2)] = inst_47100);

(statearr_47176_47236[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (21))){
var inst_47137 = (state_47166[(2)]);
var state_47166__$1 = state_47166;
var statearr_47177_47237 = state_47166__$1;
(statearr_47177_47237[(2)] = inst_47137);

(statearr_47177_47237[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (31))){
var inst_47146 = (state_47166[(10)]);
var inst_47145 = cljs.core.async.timeout.call(null,loop_delay);
var inst_47146__$1 = new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983).cljs$core$IFn$_invoke$arity$1(recording);
var inst_47147 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_47148 = [inst_47145,inst_47146__$1];
var inst_47149 = (new cljs.core.PersistentVector(null,2,(5),inst_47147,inst_47148,null));
var state_47166__$1 = (function (){var statearr_47178 = state_47166;
(statearr_47178[(10)] = inst_47146__$1);

return statearr_47178;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_47166__$1,(34),inst_47149);
} else {
if((state_val_47167 === (32))){
var state_47166__$1 = state_47166;
var statearr_47179_47238 = state_47166__$1;
(statearr_47179_47238[(2)] = null);

(statearr_47179_47238[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (33))){
var inst_47162 = (state_47166[(2)]);
var state_47166__$1 = state_47166;
var statearr_47180_47239 = state_47166__$1;
(statearr_47180_47239[(2)] = inst_47162);

(statearr_47180_47239[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (13))){
var state_47166__$1 = state_47166;
var statearr_47181_47240 = state_47166__$1;
(statearr_47181_47240[(2)] = false);

(statearr_47181_47240[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (22))){
var inst_47104 = (state_47166[(11)]);
var inst_47120 = parinfer.vcr.apply_change.call(null,cm,inst_47104);
var state_47166__$1 = state_47166;
var statearr_47182_47241 = state_47166__$1;
(statearr_47182_47241[(2)] = inst_47120);

(statearr_47182_47241[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (36))){
var state_47166__$1 = state_47166;
var statearr_47183_47242 = state_47166__$1;
(statearr_47183_47242[(2)] = null);

(statearr_47183_47242[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (29))){
var state_47166__$1 = state_47166;
var statearr_47184_47243 = state_47166__$1;
(statearr_47184_47243[(2)] = null);

(statearr_47184_47243[(1)] = (30));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (6))){
var inst_47083 = (state_47166[(9)]);
var inst_47077 = (state_47166[(7)]);
var inst_47083__$1 = cljs.core.first.call(null,inst_47077);
var inst_47085 = (inst_47083__$1 == null);
var inst_47086 = cljs.core.not.call(null,inst_47085);
var state_47166__$1 = (function (){var statearr_47185 = state_47166;
(statearr_47185[(9)] = inst_47083__$1);

return statearr_47185;
})();
if(inst_47086){
var statearr_47186_47244 = state_47166__$1;
(statearr_47186_47244[(1)] = (9));

} else {
var statearr_47187_47245 = state_47166__$1;
(statearr_47187_47245[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (28))){
var state_47166__$1 = state_47166;
var statearr_47188_47246 = state_47166__$1;
(statearr_47188_47246[(2)] = null);

(statearr_47188_47246[(1)] = (30));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (25))){
var inst_47105 = (state_47166[(12)]);
var inst_47123 = parinfer.vcr.apply_selections.call(null,cm,inst_47105);
var state_47166__$1 = state_47166;
var statearr_47189_47247 = state_47166__$1;
(statearr_47189_47247[(2)] = inst_47123);

(statearr_47189_47247[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (34))){
var inst_47146 = (state_47166[(10)]);
var inst_47151 = (state_47166[(2)]);
var inst_47152 = cljs.core.nth.call(null,inst_47151,(0),null);
var inst_47153 = cljs.core.nth.call(null,inst_47151,(1),null);
var inst_47154 = cljs.core.not_EQ_.call(null,inst_47153,inst_47146);
var state_47166__$1 = (function (){var statearr_47190 = state_47166;
(statearr_47190[(13)] = inst_47152);

return statearr_47190;
})();
if(inst_47154){
var statearr_47191_47248 = state_47166__$1;
(statearr_47191_47248[(1)] = (35));

} else {
var statearr_47192_47249 = state_47166__$1;
(statearr_47192_47249[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (17))){
var inst_47109 = (state_47166[(14)]);
var inst_47103 = (state_47166[(2)]);
var inst_47104 = cljs.core.get.call(null,inst_47103,new cljs.core.Keyword(null,"change","change",-1163046502));
var inst_47105 = cljs.core.get.call(null,inst_47103,new cljs.core.Keyword(null,"selections","selections",-1277610233));
var inst_47106 = cljs.core.get.call(null,inst_47103,new cljs.core.Keyword(null,"dt","dt",-368444759));
var inst_47107 = (inst_47106 / timescale);
var inst_47108 = cljs.core.async.timeout.call(null,inst_47107);
var inst_47109__$1 = new cljs.core.Keyword(null,"stop-chan","stop-chan",1828581983).cljs$core$IFn$_invoke$arity$1(recording);
var inst_47110 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_47111 = [inst_47108,inst_47109__$1];
var inst_47112 = (new cljs.core.PersistentVector(null,2,(5),inst_47110,inst_47111,null));
var state_47166__$1 = (function (){var statearr_47193 = state_47166;
(statearr_47193[(14)] = inst_47109__$1);

(statearr_47193[(11)] = inst_47104);

(statearr_47193[(12)] = inst_47105);

return statearr_47193;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_47166__$1,(18),inst_47112);
} else {
if((state_val_47167 === (3))){
var inst_47164 = (state_47166[(2)]);
var state_47166__$1 = state_47166;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_47166__$1,inst_47164);
} else {
if((state_val_47167 === (12))){
var state_47166__$1 = state_47166;
var statearr_47194_47250 = state_47166__$1;
(statearr_47194_47250[(2)] = true);

(statearr_47194_47250[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (2))){
var inst_47071 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_47072 = [key_,new cljs.core.Keyword(null,"text","text",-1790561697)];
var inst_47073 = (new cljs.core.PersistentVector(null,2,(5),inst_47071,inst_47072,null));
var inst_47074 = new cljs.core.Keyword(null,"init-value","init-value",-374892331).cljs$core$IFn$_invoke$arity$1(recording);
var inst_47075 = cljs.core.swap_BANG_.call(null,parinfer.state.state,cljs.core.assoc_in,inst_47073,inst_47074);
var inst_47076 = new cljs.core.Keyword(null,"changes","changes",1492088).cljs$core$IFn$_invoke$arity$1(recording);
var inst_47077 = inst_47076;
var state_47166__$1 = (function (){var statearr_47195 = state_47166;
(statearr_47195[(7)] = inst_47077);

(statearr_47195[(15)] = inst_47075);

return statearr_47195;
})();
var statearr_47196_47251 = state_47166__$1;
(statearr_47196_47251[(2)] = null);

(statearr_47196_47251[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (23))){
var inst_47105 = (state_47166[(12)]);
var state_47166__$1 = state_47166;
if(cljs.core.truth_(inst_47105)){
var statearr_47197_47252 = state_47166__$1;
(statearr_47197_47252[(1)] = (25));

} else {
var statearr_47198_47253 = state_47166__$1;
(statearr_47198_47253[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (35))){
var state_47166__$1 = state_47166;
var statearr_47199_47254 = state_47166__$1;
(statearr_47199_47254[(2)] = null);

(statearr_47199_47254[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (19))){
var inst_47104 = (state_47166[(11)]);
var state_47166__$1 = state_47166;
if(cljs.core.truth_(inst_47104)){
var statearr_47200_47255 = state_47166__$1;
(statearr_47200_47255[(1)] = (22));

} else {
var statearr_47201_47256 = state_47166__$1;
(statearr_47201_47256[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (11))){
var inst_47098 = (state_47166[(2)]);
var state_47166__$1 = state_47166;
if(cljs.core.truth_(inst_47098)){
var statearr_47202_47257 = state_47166__$1;
(statearr_47202_47257[(1)] = (15));

} else {
var statearr_47203_47258 = state_47166__$1;
(statearr_47203_47258[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (9))){
var inst_47083 = (state_47166[(9)]);
var inst_47088 = inst_47083.cljs$lang$protocol_mask$partition0$;
var inst_47089 = (inst_47088 & (64));
var inst_47090 = inst_47083.cljs$core$ISeq$;
var inst_47091 = (inst_47089) || (inst_47090);
var state_47166__$1 = state_47166;
if(cljs.core.truth_(inst_47091)){
var statearr_47204_47259 = state_47166__$1;
(statearr_47204_47259[(1)] = (12));

} else {
var statearr_47205_47260 = state_47166__$1;
(statearr_47205_47260[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (5))){
var inst_47142 = (state_47166[(2)]);
var state_47166__$1 = (function (){var statearr_47206 = state_47166;
(statearr_47206[(16)] = inst_47142);

return statearr_47206;
})();
if(cljs.core.truth_(loop_QMARK_)){
var statearr_47207_47261 = state_47166__$1;
(statearr_47207_47261[(1)] = (31));

} else {
var statearr_47208_47262 = state_47166__$1;
(statearr_47208_47262[(1)] = (32));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (14))){
var inst_47095 = (state_47166[(2)]);
var state_47166__$1 = state_47166;
var statearr_47209_47263 = state_47166__$1;
(statearr_47209_47263[(2)] = inst_47095);

(statearr_47209_47263[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (26))){
var state_47166__$1 = state_47166;
var statearr_47210_47264 = state_47166__$1;
(statearr_47210_47264[(1)] = (28));



return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (16))){
var inst_47083 = (state_47166[(9)]);
var state_47166__$1 = state_47166;
var statearr_47212_47265 = state_47166__$1;
(statearr_47212_47265[(2)] = inst_47083);

(statearr_47212_47265[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (30))){
var inst_47128 = (state_47166[(2)]);
var state_47166__$1 = state_47166;
var statearr_47213_47266 = state_47166__$1;
(statearr_47213_47266[(2)] = inst_47128);

(statearr_47213_47266[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (10))){
var state_47166__$1 = state_47166;
var statearr_47214_47267 = state_47166__$1;
(statearr_47214_47267[(2)] = false);

(statearr_47214_47267[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (18))){
var inst_47109 = (state_47166[(14)]);
var inst_47114 = (state_47166[(2)]);
var inst_47115 = cljs.core.nth.call(null,inst_47114,(0),null);
var inst_47116 = cljs.core.nth.call(null,inst_47114,(1),null);
var inst_47117 = cljs.core.not_EQ_.call(null,inst_47116,inst_47109);
var state_47166__$1 = (function (){var statearr_47215 = state_47166;
(statearr_47215[(17)] = inst_47115);

return statearr_47215;
})();
if(inst_47117){
var statearr_47216_47268 = state_47166__$1;
(statearr_47216_47268[(1)] = (19));

} else {
var statearr_47217_47269 = state_47166__$1;
(statearr_47217_47269[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (37))){
var inst_47159 = (state_47166[(2)]);
var state_47166__$1 = state_47166;
var statearr_47218_47270 = state_47166__$1;
(statearr_47218_47270[(2)] = inst_47159);

(statearr_47218_47270[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_47167 === (8))){
var inst_47140 = (state_47166[(2)]);
var state_47166__$1 = state_47166;
var statearr_47219_47271 = state_47166__$1;
(statearr_47219_47271[(2)] = inst_47140);

(statearr_47219_47271[(1)] = (5));


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
});})(c__19920__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
;
return ((function (switch__19855__auto__,c__19920__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor){
return (function() {
var parinfer$vcr$play_recording_BANG__$_state_machine__19856__auto__ = null;
var parinfer$vcr$play_recording_BANG__$_state_machine__19856__auto____0 = (function (){
var statearr_47223 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_47223[(0)] = parinfer$vcr$play_recording_BANG__$_state_machine__19856__auto__);

(statearr_47223[(1)] = (1));

return statearr_47223;
});
var parinfer$vcr$play_recording_BANG__$_state_machine__19856__auto____1 = (function (state_47166){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_47166);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e47224){if((e47224 instanceof Object)){
var ex__19859__auto__ = e47224;
var statearr_47225_47272 = state_47166;
(statearr_47225_47272[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_47166);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e47224;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__47273 = state_47166;
state_47166 = G__47273;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
parinfer$vcr$play_recording_BANG__$_state_machine__19856__auto__ = function(state_47166){
switch(arguments.length){
case 0:
return parinfer$vcr$play_recording_BANG__$_state_machine__19856__auto____0.call(this);
case 1:
return parinfer$vcr$play_recording_BANG__$_state_machine__19856__auto____1.call(this,state_47166);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
parinfer$vcr$play_recording_BANG__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = parinfer$vcr$play_recording_BANG__$_state_machine__19856__auto____0;
parinfer$vcr$play_recording_BANG__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = parinfer$vcr$play_recording_BANG__$_state_machine__19856__auto____1;
return parinfer$vcr$play_recording_BANG__$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
})();
var state__19922__auto__ = (function (){var statearr_47226 = f__19921__auto__.call(null);
(statearr_47226[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto__);

return statearr_47226;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto__,cm,recording,timescale,loop_QMARK_,loop_delay,element,cursor))
);

return c__19920__auto__;
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
parinfer.vcr.controls_view = (function parinfer$vcr$controls_view(p__47274,owner){
var map__47283 = p__47274;
var map__47283__$1 = ((((!((map__47283 == null)))?((((map__47283.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47283.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__47283):map__47283);
var data = map__47283__$1;
var target_key = cljs.core.get.call(null,map__47283__$1,new cljs.core.Keyword(null,"target-key","target-key",-1657436029));
var show_QMARK_ = cljs.core.get.call(null,map__47283__$1,new cljs.core.Keyword(null,"show?","show?",1543842127));
if(typeof parinfer.vcr.t_parinfer$vcr47285 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {om.core.IRender}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
parinfer.vcr.t_parinfer$vcr47285 = (function (controls_view,p__47274,owner,map__47283,data,target_key,show_QMARK_,meta47286){
this.controls_view = controls_view;
this.p__47274 = p__47274;
this.owner = owner;
this.map__47283 = map__47283;
this.data = data;
this.target_key = target_key;
this.show_QMARK_ = show_QMARK_;
this.meta47286 = meta47286;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
parinfer.vcr.t_parinfer$vcr47285.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__47283,map__47283__$1,data,target_key,show_QMARK_){
return (function (_47287,meta47286__$1){
var self__ = this;
var _47287__$1 = this;
return (new parinfer.vcr.t_parinfer$vcr47285(self__.controls_view,self__.p__47274,self__.owner,self__.map__47283,self__.data,self__.target_key,self__.show_QMARK_,meta47286__$1));
});})(map__47283,map__47283__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.t_parinfer$vcr47285.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__47283,map__47283__$1,data,target_key,show_QMARK_){
return (function (_47287){
var self__ = this;
var _47287__$1 = this;
return self__.meta47286;
});})(map__47283,map__47283__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.t_parinfer$vcr47285.prototype.om$core$IRender$ = true;

parinfer.vcr.t_parinfer$vcr47285.prototype.om$core$IRender$render$arity$1 = ((function (map__47283,map__47283__$1,data,target_key,show_QMARK_){
return (function (_){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.show_QMARK_)){
return React.createElement("div",null,(function (){var attrs47288 = (cljs.core.truth_(self__.target_key)?[cljs.core.str(self__.target_key)].join(''):"(click an editor)");
return cljs.core.apply.call(null,React.createElement,"code",((cljs.core.map_QMARK_.call(null,attrs47288))?sablono.interpreter.attributes.call(null,attrs47288):null),cljs.core.remove.call(null,cljs.core.nil_QMARK_,((cljs.core.map_QMARK_.call(null,attrs47288))?cljs.core.PersistentVector.EMPTY:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sablono.interpreter.interpret.call(null,attrs47288)], null))));
})(),React.createElement("br",null),React.createElement("button",{"onClick": ((function (___$1,map__47283,map__47283__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.start_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__47283,map__47283__$1,data,target_key,show_QMARK_))
},"Start Record"),React.createElement("button",{"onClick": ((function (___$1,map__47283,map__47283__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.done_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__47283,map__47283__$1,data,target_key,show_QMARK_))
},"Stop Record"),React.createElement("button",{"onClick": ((function (___$1,map__47283,map__47283__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.play_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__47283,map__47283__$1,data,target_key,show_QMARK_))
},"Play"),React.createElement("button",{"onClick": ((function (___$1,map__47283,map__47283__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.stop_playing_BANG_.call(null,self__.target_key);
});})(___$1,map__47283,map__47283__$1,data,target_key,show_QMARK_))
},"Stop"),React.createElement("button",{"onClick": ((function (___$1,map__47283,map__47283__$1,data,target_key,show_QMARK_){
return (function (){
return parinfer.vcr.print_recording_BANG_.call(null,self__.target_key);
});})(___$1,map__47283,map__47283__$1,data,target_key,show_QMARK_))
},"Print"));
} else {
return null;
}
});})(map__47283,map__47283__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.t_parinfer$vcr47285.getBasis = ((function (map__47283,map__47283__$1,data,target_key,show_QMARK_){
return (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"controls-view","controls-view",-1937031930,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"target-key","target-key",-16904502,null),new cljs.core.Symbol(null,"show?","show?",-1110593642,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"data","data",1407862150,null)], null),new cljs.core.Symbol(null,"owner","owner",1247919588,null)], null)))], null)),new cljs.core.Symbol(null,"p__47274","p__47274",-768463282,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"map__47283","map__47283",1620833651,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"target-key","target-key",-16904502,null),new cljs.core.Symbol(null,"show?","show?",-1110593642,null),new cljs.core.Symbol(null,"meta47286","meta47286",-1209510358,null)], null);
});})(map__47283,map__47283__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.t_parinfer$vcr47285.cljs$lang$type = true;

parinfer.vcr.t_parinfer$vcr47285.cljs$lang$ctorStr = "parinfer.vcr/t_parinfer$vcr47285";

parinfer.vcr.t_parinfer$vcr47285.cljs$lang$ctorPrWriter = ((function (map__47283,map__47283__$1,data,target_key,show_QMARK_){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"parinfer.vcr/t_parinfer$vcr47285");
});})(map__47283,map__47283__$1,data,target_key,show_QMARK_))
;

parinfer.vcr.__GT_t_parinfer$vcr47285 = ((function (map__47283,map__47283__$1,data,target_key,show_QMARK_){
return (function parinfer$vcr$controls_view_$___GT_t_parinfer$vcr47285(controls_view__$1,p__47274__$1,owner__$1,map__47283__$2,data__$1,target_key__$1,show_QMARK___$1,meta47286){
return (new parinfer.vcr.t_parinfer$vcr47285(controls_view__$1,p__47274__$1,owner__$1,map__47283__$2,data__$1,target_key__$1,show_QMARK___$1,meta47286));
});})(map__47283,map__47283__$1,data,target_key,show_QMARK_))
;

}

return (new parinfer.vcr.t_parinfer$vcr47285(parinfer$vcr$controls_view,p__47274,owner,map__47283__$1,data,target_key,show_QMARK_,cljs.core.PersistentArrayMap.EMPTY));
});
parinfer.vcr.render_controls_BANG_ = (function parinfer$vcr$render_controls_BANG_(){
return om.core.root.call(null,parinfer.vcr.controls_view,parinfer.vcr.controls_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("controls")], null));
});

//# sourceMappingURL=vcr.js.map?rel=1445965100430