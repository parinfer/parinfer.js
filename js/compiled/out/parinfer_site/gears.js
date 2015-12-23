// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer_site.gears');
goog.require('cljs.core');
goog.require('cljs.core.async');
parinfer_site.gears.default_options = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"radius","radius",-2073122258),(16),new cljs.core.Keyword(null,"hole-radius","hole-radius",-282926671),0.4,new cljs.core.Keyword(null,"addendum","addendum",472326827),(8),new cljs.core.Keyword(null,"dedendum","dedendum",-146545604),(3),new cljs.core.Keyword(null,"thickness","thickness",-940175454),0.7,new cljs.core.Keyword(null,"profile-slope","profile-slope",407431968),0.5], null);
parinfer_site.gears.caption_side_attrs = (function parinfer_site$gears$caption_side_attrs(gear,side){
var datum = gear.datum();
var r = (datum["outsideRadius"]);
var pad = (10);
var r__$1 = (r + pad);
var vec__21505 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"top","top",-1856271961),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(- r__$1)], null),new cljs.core.Keyword(null,"bottom","bottom",-1550509018),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),r__$1], null),new cljs.core.Keyword(null,"right","right",-452581833),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [r__$1,(0)], null),new cljs.core.Keyword(null,"left","left",-399115937),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- r__$1),(0)], null)], null).call(null,side);
var x = cljs.core.nth.call(null,vec__21505,(0),null);
var y = cljs.core.nth.call(null,vec__21505,(1),null);
var anchor = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"top","top",-1856271961),"middle",new cljs.core.Keyword(null,"bottom","bottom",-1550509018),"middle",new cljs.core.Keyword(null,"right","right",-452581833),"start",new cljs.core.Keyword(null,"left","left",-399115937),"end"], null).call(null,side);
var baseline = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"top","top",-1856271961),"alphabetical",new cljs.core.Keyword(null,"bottom","bottom",-1550509018),"hanging",new cljs.core.Keyword(null,"right","right",-452581833),"middle",new cljs.core.Keyword(null,"left","left",-399115937),"middle"], null).call(null,side);
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"x","x",2099068185),x,new cljs.core.Keyword(null,"y","y",-1757859776),y,new cljs.core.Keyword(null,"anchor","anchor",1549638489),anchor,new cljs.core.Keyword(null,"baseline","baseline",1151033280),baseline], null);
});
parinfer_site.gears.add_gear_caption_BANG_ = (function parinfer_site$gears$add_gear_caption_BANG_(gear,p__21506){
var map__21511 = p__21506;
var map__21511__$1 = ((((!((map__21511 == null)))?((((map__21511.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21511.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21511):map__21511);
var text = cljs.core.get.call(null,map__21511__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var side = cljs.core.get.call(null,map__21511__$1,new cljs.core.Keyword(null,"side","side",389652279));
var map__21513 = parinfer_site.gears.caption_side_attrs.call(null,gear,side);
var map__21513__$1 = ((((!((map__21513 == null)))?((((map__21513.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21513.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21513):map__21513);
var x = cljs.core.get.call(null,map__21513__$1,new cljs.core.Keyword(null,"x","x",2099068185));
var y = cljs.core.get.call(null,map__21513__$1,new cljs.core.Keyword(null,"y","y",-1757859776));
var anchor = cljs.core.get.call(null,map__21513__$1,new cljs.core.Keyword(null,"anchor","anchor",1549638489));
var baseline = cljs.core.get.call(null,map__21513__$1,new cljs.core.Keyword(null,"baseline","baseline",1151033280));
return gear.append("text").attr("text-anchor",anchor).attr("dominant-baseline",baseline).attr("x",x).attr("y",y).text(text);
});
parinfer_site.gears.make_gear = (function parinfer_site$gears$make_gear(svg,drag_behavior,p__21515){
var map__21522 = p__21515;
var map__21522__$1 = ((((!((map__21522 == null)))?((((map__21522.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21522.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21522):map__21522);
var opts = map__21522__$1;
var x = cljs.core.get.call(null,map__21522__$1,new cljs.core.Keyword(null,"x","x",2099068185));
var dedendum = cljs.core.get.call(null,map__21522__$1,new cljs.core.Keyword(null,"dedendum","dedendum",-146545604));
var classes = cljs.core.get.call(null,map__21522__$1,new cljs.core.Keyword(null,"classes","classes",2037804510));
var profile_slope = cljs.core.get.call(null,map__21522__$1,new cljs.core.Keyword(null,"profile-slope","profile-slope",407431968));
var y = cljs.core.get.call(null,map__21522__$1,new cljs.core.Keyword(null,"y","y",-1757859776));
var thickness = cljs.core.get.call(null,map__21522__$1,new cljs.core.Keyword(null,"thickness","thickness",-940175454));
var caption = cljs.core.get.call(null,map__21522__$1,new cljs.core.Keyword(null,"caption","caption",-855383902));
var addendum = cljs.core.get.call(null,map__21522__$1,new cljs.core.Keyword(null,"addendum","addendum",472326827));
var angle = cljs.core.get.call(null,map__21522__$1,new cljs.core.Keyword(null,"angle","angle",1622094254));
var hole_radius = cljs.core.get.call(null,map__21522__$1,new cljs.core.Keyword(null,"hole-radius","hole-radius",-282926671));
var factor = cljs.core.get.call(null,map__21522__$1,new cljs.core.Keyword(null,"factor","factor",-2103172748));
var radius = (factor / (2));
var teeth = (radius / (4));
var inner_radius = ((radius - addendum) - dedendum);
var hole_radius__$1 = (((factor > (96)))?((inner_radius * 0.5) + ((inner_radius * 0.5) * hole_radius)):(inner_radius * hole_radius));
var js_opts = {"y": y, "thickness": thickness, "addendum": addendum, "angle": angle, "radius": radius, "teeth": teeth, "holeRadius": hole_radius__$1, "x": x, "profileSlope": profile_slope, "dedendum": dedendum};
var gear = Gear.create(svg,js_opts);
var seq__21524_21528 = cljs.core.seq.call(null,classes);
var chunk__21525_21529 = null;
var count__21526_21530 = (0);
var i__21527_21531 = (0);
while(true){
if((i__21527_21531 < count__21526_21530)){
var c_21532 = cljs.core._nth.call(null,chunk__21525_21529,i__21527_21531);
gear.classed(c_21532,true);

var G__21533 = seq__21524_21528;
var G__21534 = chunk__21525_21529;
var G__21535 = count__21526_21530;
var G__21536 = (i__21527_21531 + (1));
seq__21524_21528 = G__21533;
chunk__21525_21529 = G__21534;
count__21526_21530 = G__21535;
i__21527_21531 = G__21536;
continue;
} else {
var temp__4425__auto___21537 = cljs.core.seq.call(null,seq__21524_21528);
if(temp__4425__auto___21537){
var seq__21524_21538__$1 = temp__4425__auto___21537;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21524_21538__$1)){
var c__17070__auto___21539 = cljs.core.chunk_first.call(null,seq__21524_21538__$1);
var G__21540 = cljs.core.chunk_rest.call(null,seq__21524_21538__$1);
var G__21541 = c__17070__auto___21539;
var G__21542 = cljs.core.count.call(null,c__17070__auto___21539);
var G__21543 = (0);
seq__21524_21528 = G__21540;
chunk__21525_21529 = G__21541;
count__21526_21530 = G__21542;
i__21527_21531 = G__21543;
continue;
} else {
var c_21544 = cljs.core.first.call(null,seq__21524_21538__$1);
gear.classed(c_21544,true);

var G__21545 = cljs.core.next.call(null,seq__21524_21538__$1);
var G__21546 = null;
var G__21547 = (0);
var G__21548 = (0);
seq__21524_21528 = G__21545;
chunk__21525_21529 = G__21546;
count__21526_21530 = G__21547;
i__21527_21531 = G__21548;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(caption)){
parinfer_site.gears.add_gear_caption_BANG_.call(null,gear,caption);
} else {
}

return gear;
});
parinfer_site.gears.tick_svg_BANG_ = (function parinfer_site$gears$tick_svg_BANG_(svg){
return svg.selectAll(".gear-path").attr("transform",(function (d){
d.angle = (d.angle + d.speed);

var degrees = (d.angle * ((180) / Math.PI));
return [cljs.core.str("rotate("),cljs.core.str(degrees),cljs.core.str(")")].join('');
}));
});
parinfer_site.gears.apply_gear_attrs_BANG_ = (function parinfer_site$gears$apply_gear_attrs_BANG_(gear_obj,attrs){
var seq__21569 = cljs.core.seq.call(null,attrs);
var chunk__21570 = null;
var count__21571 = (0);
var i__21572 = (0);
while(true){
if((i__21572 < count__21571)){
var vec__21573 = cljs.core._nth.call(null,chunk__21570,i__21572);
var k = cljs.core.nth.call(null,vec__21573,(0),null);
var v = cljs.core.nth.call(null,vec__21573,(1),null);
var G__21574_21589 = (((k instanceof cljs.core.Keyword))?k.fqn:null);
switch (G__21574_21589) {
case "text":
gear_obj.select("text").text(v);

break;
case "power":
Gear.setPower(gear_obj,v);

break;
case "classes":
var seq__21575_21591 = cljs.core.seq.call(null,v);
var chunk__21576_21592 = null;
var count__21577_21593 = (0);
var i__21578_21594 = (0);
while(true){
if((i__21578_21594 < count__21577_21593)){
var vec__21579_21595 = cljs.core._nth.call(null,chunk__21576_21592,i__21578_21594);
var style_class_21596 = cljs.core.nth.call(null,vec__21579_21595,(0),null);
var enabled_QMARK__21597 = cljs.core.nth.call(null,vec__21579_21595,(1),null);
gear_obj.classed(style_class_21596,enabled_QMARK__21597);

var G__21598 = seq__21575_21591;
var G__21599 = chunk__21576_21592;
var G__21600 = count__21577_21593;
var G__21601 = (i__21578_21594 + (1));
seq__21575_21591 = G__21598;
chunk__21576_21592 = G__21599;
count__21577_21593 = G__21600;
i__21578_21594 = G__21601;
continue;
} else {
var temp__4425__auto___21602 = cljs.core.seq.call(null,seq__21575_21591);
if(temp__4425__auto___21602){
var seq__21575_21603__$1 = temp__4425__auto___21602;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21575_21603__$1)){
var c__17070__auto___21604 = cljs.core.chunk_first.call(null,seq__21575_21603__$1);
var G__21605 = cljs.core.chunk_rest.call(null,seq__21575_21603__$1);
var G__21606 = c__17070__auto___21604;
var G__21607 = cljs.core.count.call(null,c__17070__auto___21604);
var G__21608 = (0);
seq__21575_21591 = G__21605;
chunk__21576_21592 = G__21606;
count__21577_21593 = G__21607;
i__21578_21594 = G__21608;
continue;
} else {
var vec__21580_21609 = cljs.core.first.call(null,seq__21575_21603__$1);
var style_class_21610 = cljs.core.nth.call(null,vec__21580_21609,(0),null);
var enabled_QMARK__21611 = cljs.core.nth.call(null,vec__21580_21609,(1),null);
gear_obj.classed(style_class_21610,enabled_QMARK__21611);

var G__21612 = cljs.core.next.call(null,seq__21575_21603__$1);
var G__21613 = null;
var G__21614 = (0);
var G__21615 = (0);
seq__21575_21591 = G__21612;
chunk__21576_21592 = G__21613;
count__21577_21593 = G__21614;
i__21578_21594 = G__21615;
continue;
}
} else {
}
}
break;
}

break;
default:
gear_obj.attr(cljs.core.name.call(null,k),v);

}

var G__21616 = seq__21569;
var G__21617 = chunk__21570;
var G__21618 = count__21571;
var G__21619 = (i__21572 + (1));
seq__21569 = G__21616;
chunk__21570 = G__21617;
count__21571 = G__21618;
i__21572 = G__21619;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__21569);
if(temp__4425__auto__){
var seq__21569__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21569__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__21569__$1);
var G__21620 = cljs.core.chunk_rest.call(null,seq__21569__$1);
var G__21621 = c__17070__auto__;
var G__21622 = cljs.core.count.call(null,c__17070__auto__);
var G__21623 = (0);
seq__21569 = G__21620;
chunk__21570 = G__21621;
count__21571 = G__21622;
i__21572 = G__21623;
continue;
} else {
var vec__21581 = cljs.core.first.call(null,seq__21569__$1);
var k = cljs.core.nth.call(null,vec__21581,(0),null);
var v = cljs.core.nth.call(null,vec__21581,(1),null);
var G__21582_21624 = (((k instanceof cljs.core.Keyword))?k.fqn:null);
switch (G__21582_21624) {
case "text":
gear_obj.select("text").text(v);

break;
case "power":
Gear.setPower(gear_obj,v);

break;
case "classes":
var seq__21583_21626 = cljs.core.seq.call(null,v);
var chunk__21584_21627 = null;
var count__21585_21628 = (0);
var i__21586_21629 = (0);
while(true){
if((i__21586_21629 < count__21585_21628)){
var vec__21587_21630 = cljs.core._nth.call(null,chunk__21584_21627,i__21586_21629);
var style_class_21631 = cljs.core.nth.call(null,vec__21587_21630,(0),null);
var enabled_QMARK__21632 = cljs.core.nth.call(null,vec__21587_21630,(1),null);
gear_obj.classed(style_class_21631,enabled_QMARK__21632);

var G__21633 = seq__21583_21626;
var G__21634 = chunk__21584_21627;
var G__21635 = count__21585_21628;
var G__21636 = (i__21586_21629 + (1));
seq__21583_21626 = G__21633;
chunk__21584_21627 = G__21634;
count__21585_21628 = G__21635;
i__21586_21629 = G__21636;
continue;
} else {
var temp__4425__auto___21637__$1 = cljs.core.seq.call(null,seq__21583_21626);
if(temp__4425__auto___21637__$1){
var seq__21583_21638__$1 = temp__4425__auto___21637__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21583_21638__$1)){
var c__17070__auto___21639 = cljs.core.chunk_first.call(null,seq__21583_21638__$1);
var G__21640 = cljs.core.chunk_rest.call(null,seq__21583_21638__$1);
var G__21641 = c__17070__auto___21639;
var G__21642 = cljs.core.count.call(null,c__17070__auto___21639);
var G__21643 = (0);
seq__21583_21626 = G__21640;
chunk__21584_21627 = G__21641;
count__21585_21628 = G__21642;
i__21586_21629 = G__21643;
continue;
} else {
var vec__21588_21644 = cljs.core.first.call(null,seq__21583_21638__$1);
var style_class_21645 = cljs.core.nth.call(null,vec__21588_21644,(0),null);
var enabled_QMARK__21646 = cljs.core.nth.call(null,vec__21588_21644,(1),null);
gear_obj.classed(style_class_21645,enabled_QMARK__21646);

var G__21647 = cljs.core.next.call(null,seq__21583_21638__$1);
var G__21648 = null;
var G__21649 = (0);
var G__21650 = (0);
seq__21583_21626 = G__21647;
chunk__21584_21627 = G__21648;
count__21585_21628 = G__21649;
i__21586_21629 = G__21650;
continue;
}
} else {
}
}
break;
}

break;
default:
gear_obj.attr(cljs.core.name.call(null,k),v);

}

var G__21651 = cljs.core.next.call(null,seq__21569__$1);
var G__21652 = null;
var G__21653 = (0);
var G__21654 = (0);
seq__21569 = G__21651;
chunk__21570 = G__21652;
count__21571 = G__21653;
i__21572 = G__21654;
continue;
}
} else {
return null;
}
}
break;
}
});
if(typeof parinfer_site.gears.reload_indexes !== 'undefined'){
} else {
parinfer_site.gears.reload_indexes = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
parinfer_site.gears.animate_gears_BANG_ = (function parinfer_site$gears$animate_gears_BANG_(svg,selector,gear_map,gear_array,anim_frames){
var update_index = (function (p1__21655_SHARP_){
return ((function (){var or__16267__auto__ = p1__21655_SHARP_;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return (0);
}
})() + (1));
});
var _ = cljs.core.swap_BANG_.call(null,parinfer_site.gears.reload_indexes,cljs.core.update,selector,update_index);
var latest_index = ((function (update_index,_){
return (function (){
return cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_site.gears.reload_indexes),selector);
});})(update_index,_))
;
var index = latest_index.call(null);
var should_continue_QMARK_ = ((function (update_index,_,latest_index,index){
return (function (){
return cljs.core._EQ_.call(null,index,latest_index.call(null));
});})(update_index,_,latest_index,index))
;
if(cljs.core.seq.call(null,anim_frames)){
var c__20372__auto___22272 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___22272,update_index,_,latest_index,index,should_continue_QMARK_){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___22272,update_index,_,latest_index,index,should_continue_QMARK_){
return (function (state_22162){
var state_val_22163 = (state_22162[(1)]);
if((state_val_22163 === (7))){
var inst_21970 = (state_22162[(7)]);
var inst_22057 = (state_22162[(8)]);
var inst_22057__$1 = cljs.core.seq.call(null,inst_21970);
var state_22162__$1 = (function (){var statearr_22167 = state_22162;
(statearr_22167[(8)] = inst_22057__$1);

return statearr_22167;
})();
if(inst_22057__$1){
var statearr_22168_22273 = state_22162__$1;
(statearr_22168_22273[(1)] = (30));

} else {
var statearr_22169_22274 = state_22162__$1;
(statearr_22169_22274[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (59))){
var inst_22158 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
var statearr_22170_22275 = state_22162__$1;
(statearr_22170_22275[(2)] = inst_22158);

(statearr_22170_22275[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (20))){
var inst_22010 = (state_22162[(9)]);
var inst_22007 = (state_22162[(10)]);
var inst_22008 = (state_22162[(11)]);
var inst_22009 = (state_22162[(12)]);
var inst_22016 = cljs.core._nth.call(null,inst_22008,inst_22010);
var inst_22017 = cljs.core.nth.call(null,inst_22016,(0),null);
var inst_22018 = cljs.core.nth.call(null,inst_22016,(1),null);
var inst_22019 = gear_map.call(null,inst_22017);
var inst_22020 = parinfer_site.gears.apply_gear_attrs_BANG_.call(null,inst_22019,inst_22018);
var inst_22021 = (inst_22010 + (1));
var tmp22164 = inst_22007;
var tmp22165 = inst_22008;
var tmp22166 = inst_22009;
var inst_22007__$1 = tmp22164;
var inst_22008__$1 = tmp22165;
var inst_22009__$1 = tmp22166;
var inst_22010__$1 = inst_22021;
var state_22162__$1 = (function (){var statearr_22171 = state_22162;
(statearr_22171[(9)] = inst_22010__$1);

(statearr_22171[(10)] = inst_22007__$1);

(statearr_22171[(11)] = inst_22008__$1);

(statearr_22171[(12)] = inst_22009__$1);

(statearr_22171[(13)] = inst_22020);

return statearr_22171;
})();
var statearr_22172_22276 = state_22162__$1;
(statearr_22172_22276[(2)] = null);

(statearr_22172_22276[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (58))){
var state_22162__$1 = state_22162;
var statearr_22173_22277 = state_22162__$1;
(statearr_22173_22277[(2)] = null);

(statearr_22173_22277[(1)] = (59));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (27))){
var inst_22024 = (state_22162[(14)]);
var inst_22034 = cljs.core.first.call(null,inst_22024);
var inst_22035 = cljs.core.nth.call(null,inst_22034,(0),null);
var inst_22036 = cljs.core.nth.call(null,inst_22034,(1),null);
var inst_22037 = gear_map.call(null,inst_22035);
var inst_22038 = parinfer_site.gears.apply_gear_attrs_BANG_.call(null,inst_22037,inst_22036);
var inst_22039 = cljs.core.next.call(null,inst_22024);
var inst_22007 = inst_22039;
var inst_22008 = null;
var inst_22009 = (0);
var inst_22010 = (0);
var state_22162__$1 = (function (){var statearr_22174 = state_22162;
(statearr_22174[(9)] = inst_22010);

(statearr_22174[(10)] = inst_22007);

(statearr_22174[(11)] = inst_22008);

(statearr_22174[(12)] = inst_22009);

(statearr_22174[(15)] = inst_22038);

return statearr_22174;
})();
var statearr_22175_22278 = state_22162__$1;
(statearr_22175_22278[(2)] = null);

(statearr_22175_22278[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (1))){
var state_22162__$1 = state_22162;
var statearr_22176_22279 = state_22162__$1;
(statearr_22176_22279[(2)] = null);

(statearr_22176_22279[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (24))){
var state_22162__$1 = state_22162;
var statearr_22177_22280 = state_22162__$1;
(statearr_22177_22280[(2)] = null);

(statearr_22177_22280[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (55))){
var inst_22130 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
var statearr_22178_22281 = state_22162__$1;
(statearr_22178_22281[(2)] = inst_22130);

(statearr_22178_22281[(1)] = (52));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (39))){
var state_22162__$1 = state_22162;
var statearr_22179_22282 = state_22162__$1;
(statearr_22179_22282[(2)] = true);

(statearr_22179_22282[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (46))){
var inst_22089 = (state_22162[(16)]);
var inst_22137 = (state_22162[(2)]);
var inst_22138 = Gear.updateGears(gear_array);
var inst_22139 = cljs.core.async.timeout.call(null,inst_22089);
var state_22162__$1 = (function (){var statearr_22180 = state_22162;
(statearr_22180[(17)] = inst_22138);

(statearr_22180[(18)] = inst_22137);

return statearr_22180;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22162__$1,(56),inst_22139);
} else {
if((state_val_22163 === (4))){
var inst_21973 = (state_22162[(19)]);
var inst_21972 = (state_22162[(20)]);
var inst_21975 = (inst_21973 < inst_21972);
var inst_21976 = inst_21975;
var state_22162__$1 = state_22162;
if(cljs.core.truth_(inst_21976)){
var statearr_22181_22283 = state_22162__$1;
(statearr_22181_22283[(1)] = (6));

} else {
var statearr_22182_22284 = state_22162__$1;
(statearr_22182_22284[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (54))){
var inst_22112 = (state_22162[(21)]);
var inst_22122 = cljs.core.first.call(null,inst_22112);
var inst_22123 = cljs.core.nth.call(null,inst_22122,(0),null);
var inst_22124 = cljs.core.nth.call(null,inst_22122,(1),null);
var inst_22125 = gear_map.call(null,inst_22123);
var inst_22126 = parinfer_site.gears.apply_gear_attrs_BANG_.call(null,inst_22125,inst_22124);
var inst_22127 = cljs.core.next.call(null,inst_22112);
var inst_22095 = inst_22127;
var inst_22096 = null;
var inst_22097 = (0);
var inst_22098 = (0);
var state_22162__$1 = (function (){var statearr_22183 = state_22162;
(statearr_22183[(22)] = inst_22095);

(statearr_22183[(23)] = inst_22096);

(statearr_22183[(24)] = inst_22097);

(statearr_22183[(25)] = inst_22098);

(statearr_22183[(26)] = inst_22126);

return statearr_22183;
})();
var statearr_22184_22285 = state_22162__$1;
(statearr_22184_22285[(2)] = null);

(statearr_22184_22285[(1)] = (45));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (15))){
var inst_21979 = (state_22162[(27)]);
var inst_21996 = cljs.core.apply.call(null,cljs.core.hash_map,inst_21979);
var state_22162__$1 = state_22162;
var statearr_22185_22286 = state_22162__$1;
(statearr_22185_22286[(2)] = inst_21996);

(statearr_22185_22286[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (48))){
var inst_22112 = (state_22162[(21)]);
var inst_22095 = (state_22162[(22)]);
var inst_22112__$1 = cljs.core.seq.call(null,inst_22095);
var state_22162__$1 = (function (){var statearr_22186 = state_22162;
(statearr_22186[(21)] = inst_22112__$1);

return statearr_22186;
})();
if(inst_22112__$1){
var statearr_22187_22287 = state_22162__$1;
(statearr_22187_22287[(1)] = (50));

} else {
var statearr_22188_22288 = state_22162__$1;
(statearr_22188_22288[(1)] = (51));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (50))){
var inst_22112 = (state_22162[(21)]);
var inst_22114 = cljs.core.chunked_seq_QMARK_.call(null,inst_22112);
var state_22162__$1 = state_22162;
if(inst_22114){
var statearr_22189_22289 = state_22162__$1;
(statearr_22189_22289[(1)] = (53));

} else {
var statearr_22190_22290 = state_22162__$1;
(statearr_22190_22290[(1)] = (54));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (21))){
var inst_22007 = (state_22162[(10)]);
var inst_22024 = (state_22162[(14)]);
var inst_22024__$1 = cljs.core.seq.call(null,inst_22007);
var state_22162__$1 = (function (){var statearr_22191 = state_22162;
(statearr_22191[(14)] = inst_22024__$1);

return statearr_22191;
})();
if(inst_22024__$1){
var statearr_22192_22291 = state_22162__$1;
(statearr_22192_22291[(1)] = (23));

} else {
var statearr_22193_22292 = state_22162__$1;
(statearr_22193_22292[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (31))){
var state_22162__$1 = state_22162;
var statearr_22194_22293 = state_22162__$1;
(statearr_22194_22293[(2)] = null);

(statearr_22194_22293[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (32))){
var inst_22148 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
var statearr_22195_22294 = state_22162__$1;
(statearr_22195_22294[(2)] = inst_22148);

(statearr_22195_22294[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (40))){
var state_22162__$1 = state_22162;
var statearr_22196_22295 = state_22162__$1;
(statearr_22196_22295[(2)] = false);

(statearr_22196_22295[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (56))){
var inst_22057 = (state_22162[(8)]);
var inst_22141 = (state_22162[(2)]);
var inst_22142 = cljs.core.next.call(null,inst_22057);
var inst_21970 = inst_22142;
var inst_21971 = null;
var inst_21972 = (0);
var inst_21973 = (0);
var state_22162__$1 = (function (){var statearr_22197 = state_22162;
(statearr_22197[(19)] = inst_21973);

(statearr_22197[(28)] = inst_21971);

(statearr_22197[(29)] = inst_22141);

(statearr_22197[(7)] = inst_21970);

(statearr_22197[(20)] = inst_21972);

return statearr_22197;
})();
var statearr_22198_22296 = state_22162__$1;
(statearr_22198_22296[(2)] = null);

(statearr_22198_22296[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (33))){
var inst_22057 = (state_22162[(8)]);
var inst_22061 = cljs.core.chunk_first.call(null,inst_22057);
var inst_22062 = cljs.core.chunk_rest.call(null,inst_22057);
var inst_22063 = cljs.core.count.call(null,inst_22061);
var inst_21970 = inst_22062;
var inst_21971 = inst_22061;
var inst_21972 = inst_22063;
var inst_21973 = (0);
var state_22162__$1 = (function (){var statearr_22199 = state_22162;
(statearr_22199[(19)] = inst_21973);

(statearr_22199[(28)] = inst_21971);

(statearr_22199[(7)] = inst_21970);

(statearr_22199[(20)] = inst_21972);

return statearr_22199;
})();
var statearr_22200_22297 = state_22162__$1;
(statearr_22200_22297[(2)] = null);

(statearr_22200_22297[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (13))){
var state_22162__$1 = state_22162;
var statearr_22201_22298 = state_22162__$1;
(statearr_22201_22298[(2)] = false);

(statearr_22201_22298[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (22))){
var inst_22047 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
var statearr_22202_22299 = state_22162__$1;
(statearr_22202_22299[(2)] = inst_22047);

(statearr_22202_22299[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (36))){
var inst_22067 = (state_22162[(30)]);
var inst_22072 = inst_22067.cljs$lang$protocol_mask$partition0$;
var inst_22073 = (inst_22072 & (64));
var inst_22074 = inst_22067.cljs$core$ISeq$;
var inst_22075 = (inst_22073) || (inst_22074);
var state_22162__$1 = state_22162;
if(cljs.core.truth_(inst_22075)){
var statearr_22203_22300 = state_22162__$1;
(statearr_22203_22300[(1)] = (39));

} else {
var statearr_22204_22301 = state_22162__$1;
(statearr_22204_22301[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (41))){
var inst_22079 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
var statearr_22208_22302 = state_22162__$1;
(statearr_22208_22302[(2)] = inst_22079);

(statearr_22208_22302[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (43))){
var inst_22067 = (state_22162[(30)]);
var state_22162__$1 = state_22162;
var statearr_22209_22303 = state_22162__$1;
(statearr_22209_22303[(2)] = inst_22067);

(statearr_22209_22303[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (29))){
var inst_21973 = (state_22162[(19)]);
var inst_21971 = (state_22162[(28)]);
var inst_21970 = (state_22162[(7)]);
var inst_21972 = (state_22162[(20)]);
var inst_22053 = (state_22162[(2)]);
var inst_22054 = (inst_21973 + (1));
var tmp22205 = inst_21971;
var tmp22206 = inst_21970;
var tmp22207 = inst_21972;
var inst_21970__$1 = tmp22206;
var inst_21971__$1 = tmp22205;
var inst_21972__$1 = tmp22207;
var inst_21973__$1 = inst_22054;
var state_22162__$1 = (function (){var statearr_22210 = state_22162;
(statearr_22210[(31)] = inst_22053);

(statearr_22210[(19)] = inst_21973__$1);

(statearr_22210[(28)] = inst_21971__$1);

(statearr_22210[(7)] = inst_21970__$1);

(statearr_22210[(20)] = inst_21972__$1);

return statearr_22210;
})();
var statearr_22211_22304 = state_22162__$1;
(statearr_22211_22304[(2)] = null);

(statearr_22211_22304[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (44))){
var inst_22087 = (state_22162[(2)]);
var inst_22088 = cljs.core.get.call(null,inst_22087,new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925));
var inst_22089 = cljs.core.get.call(null,inst_22087,new cljs.core.Keyword(null,"dt","dt",-368444759));
var inst_22094 = cljs.core.seq.call(null,inst_22088);
var inst_22095 = inst_22094;
var inst_22096 = null;
var inst_22097 = (0);
var inst_22098 = (0);
var state_22162__$1 = (function (){var statearr_22212 = state_22162;
(statearr_22212[(22)] = inst_22095);

(statearr_22212[(16)] = inst_22089);

(statearr_22212[(23)] = inst_22096);

(statearr_22212[(24)] = inst_22097);

(statearr_22212[(25)] = inst_22098);

return statearr_22212;
})();
var statearr_22213_22305 = state_22162__$1;
(statearr_22213_22305[(2)] = null);

(statearr_22213_22305[(1)] = (45));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (6))){
var inst_21979 = (state_22162[(27)]);
var inst_21973 = (state_22162[(19)]);
var inst_21971 = (state_22162[(28)]);
var inst_21979__$1 = cljs.core._nth.call(null,inst_21971,inst_21973);
var inst_21981 = (inst_21979__$1 == null);
var inst_21982 = cljs.core.not.call(null,inst_21981);
var state_22162__$1 = (function (){var statearr_22214 = state_22162;
(statearr_22214[(27)] = inst_21979__$1);

return statearr_22214;
})();
if(inst_21982){
var statearr_22215_22306 = state_22162__$1;
(statearr_22215_22306[(1)] = (9));

} else {
var statearr_22216_22307 = state_22162__$1;
(statearr_22216_22307[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (28))){
var inst_22042 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
var statearr_22217_22308 = state_22162__$1;
(statearr_22217_22308[(2)] = inst_22042);

(statearr_22217_22308[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (51))){
var state_22162__$1 = state_22162;
var statearr_22218_22309 = state_22162__$1;
(statearr_22218_22309[(2)] = null);

(statearr_22218_22309[(1)] = (52));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (25))){
var inst_22045 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
var statearr_22219_22310 = state_22162__$1;
(statearr_22219_22310[(2)] = inst_22045);

(statearr_22219_22310[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (34))){
var inst_22067 = (state_22162[(30)]);
var inst_22057 = (state_22162[(8)]);
var inst_22067__$1 = cljs.core.first.call(null,inst_22057);
var inst_22069 = (inst_22067__$1 == null);
var inst_22070 = cljs.core.not.call(null,inst_22069);
var state_22162__$1 = (function (){var statearr_22220 = state_22162;
(statearr_22220[(30)] = inst_22067__$1);

return statearr_22220;
})();
if(inst_22070){
var statearr_22221_22311 = state_22162__$1;
(statearr_22221_22311[(1)] = (36));

} else {
var statearr_22222_22312 = state_22162__$1;
(statearr_22222_22312[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (17))){
var inst_21999 = (state_22162[(2)]);
var inst_22000 = cljs.core.get.call(null,inst_21999,new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925));
var inst_22001 = cljs.core.get.call(null,inst_21999,new cljs.core.Keyword(null,"dt","dt",-368444759));
var inst_22006 = cljs.core.seq.call(null,inst_22000);
var inst_22007 = inst_22006;
var inst_22008 = null;
var inst_22009 = (0);
var inst_22010 = (0);
var state_22162__$1 = (function (){var statearr_22223 = state_22162;
(statearr_22223[(9)] = inst_22010);

(statearr_22223[(10)] = inst_22007);

(statearr_22223[(32)] = inst_22001);

(statearr_22223[(11)] = inst_22008);

(statearr_22223[(12)] = inst_22009);

return statearr_22223;
})();
var statearr_22224_22313 = state_22162__$1;
(statearr_22224_22313[(2)] = null);

(statearr_22224_22313[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (3))){
var inst_22160 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22162__$1,inst_22160);
} else {
if((state_val_22163 === (12))){
var state_22162__$1 = state_22162;
var statearr_22225_22314 = state_22162__$1;
(statearr_22225_22314[(2)] = true);

(statearr_22225_22314[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (2))){
var inst_21969 = cljs.core.seq.call(null,anim_frames);
var inst_21970 = inst_21969;
var inst_21971 = null;
var inst_21972 = (0);
var inst_21973 = (0);
var state_22162__$1 = (function (){var statearr_22229 = state_22162;
(statearr_22229[(19)] = inst_21973);

(statearr_22229[(28)] = inst_21971);

(statearr_22229[(7)] = inst_21970);

(statearr_22229[(20)] = inst_21972);

return statearr_22229;
})();
var statearr_22230_22315 = state_22162__$1;
(statearr_22230_22315[(2)] = null);

(statearr_22230_22315[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (23))){
var inst_22024 = (state_22162[(14)]);
var inst_22026 = cljs.core.chunked_seq_QMARK_.call(null,inst_22024);
var state_22162__$1 = state_22162;
if(inst_22026){
var statearr_22231_22316 = state_22162__$1;
(statearr_22231_22316[(1)] = (26));

} else {
var statearr_22232_22317 = state_22162__$1;
(statearr_22232_22317[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (47))){
var inst_22095 = (state_22162[(22)]);
var inst_22096 = (state_22162[(23)]);
var inst_22097 = (state_22162[(24)]);
var inst_22098 = (state_22162[(25)]);
var inst_22104 = cljs.core._nth.call(null,inst_22096,inst_22098);
var inst_22105 = cljs.core.nth.call(null,inst_22104,(0),null);
var inst_22106 = cljs.core.nth.call(null,inst_22104,(1),null);
var inst_22107 = gear_map.call(null,inst_22105);
var inst_22108 = parinfer_site.gears.apply_gear_attrs_BANG_.call(null,inst_22107,inst_22106);
var inst_22109 = (inst_22098 + (1));
var tmp22226 = inst_22095;
var tmp22227 = inst_22096;
var tmp22228 = inst_22097;
var inst_22095__$1 = tmp22226;
var inst_22096__$1 = tmp22227;
var inst_22097__$1 = tmp22228;
var inst_22098__$1 = inst_22109;
var state_22162__$1 = (function (){var statearr_22233 = state_22162;
(statearr_22233[(22)] = inst_22095__$1);

(statearr_22233[(33)] = inst_22108);

(statearr_22233[(23)] = inst_22096__$1);

(statearr_22233[(24)] = inst_22097__$1);

(statearr_22233[(25)] = inst_22098__$1);

return statearr_22233;
})();
var statearr_22234_22318 = state_22162__$1;
(statearr_22234_22318[(2)] = null);

(statearr_22234_22318[(1)] = (45));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (35))){
var inst_22145 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
var statearr_22235_22319 = state_22162__$1;
(statearr_22235_22319[(2)] = inst_22145);

(statearr_22235_22319[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (19))){
var inst_22001 = (state_22162[(32)]);
var inst_22049 = (state_22162[(2)]);
var inst_22050 = Gear.updateGears(gear_array);
var inst_22051 = cljs.core.async.timeout.call(null,inst_22001);
var state_22162__$1 = (function (){var statearr_22236 = state_22162;
(statearr_22236[(34)] = inst_22050);

(statearr_22236[(35)] = inst_22049);

return statearr_22236;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22162__$1,(29),inst_22051);
} else {
if((state_val_22163 === (57))){
var state_22162__$1 = state_22162;
var statearr_22237_22320 = state_22162__$1;
(statearr_22237_22320[(2)] = null);

(statearr_22237_22320[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (11))){
var inst_21994 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
if(cljs.core.truth_(inst_21994)){
var statearr_22238_22321 = state_22162__$1;
(statearr_22238_22321[(1)] = (15));

} else {
var statearr_22239_22322 = state_22162__$1;
(statearr_22239_22322[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (9))){
var inst_21979 = (state_22162[(27)]);
var inst_21984 = inst_21979.cljs$lang$protocol_mask$partition0$;
var inst_21985 = (inst_21984 & (64));
var inst_21986 = inst_21979.cljs$core$ISeq$;
var inst_21987 = (inst_21985) || (inst_21986);
var state_22162__$1 = state_22162;
if(cljs.core.truth_(inst_21987)){
var statearr_22240_22323 = state_22162__$1;
(statearr_22240_22323[(1)] = (12));

} else {
var statearr_22241_22324 = state_22162__$1;
(statearr_22241_22324[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (5))){
var inst_22152 = (state_22162[(2)]);
var inst_22153 = should_continue_QMARK_.call(null);
var state_22162__$1 = (function (){var statearr_22242 = state_22162;
(statearr_22242[(36)] = inst_22152);

return statearr_22242;
})();
if(cljs.core.truth_(inst_22153)){
var statearr_22243_22325 = state_22162__$1;
(statearr_22243_22325[(1)] = (57));

} else {
var statearr_22244_22326 = state_22162__$1;
(statearr_22244_22326[(1)] = (58));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (14))){
var inst_21991 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
var statearr_22245_22327 = state_22162__$1;
(statearr_22245_22327[(2)] = inst_21991);

(statearr_22245_22327[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (45))){
var inst_22097 = (state_22162[(24)]);
var inst_22098 = (state_22162[(25)]);
var inst_22100 = (inst_22098 < inst_22097);
var inst_22101 = inst_22100;
var state_22162__$1 = state_22162;
if(cljs.core.truth_(inst_22101)){
var statearr_22246_22328 = state_22162__$1;
(statearr_22246_22328[(1)] = (47));

} else {
var statearr_22247_22329 = state_22162__$1;
(statearr_22247_22329[(1)] = (48));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (53))){
var inst_22112 = (state_22162[(21)]);
var inst_22116 = cljs.core.chunk_first.call(null,inst_22112);
var inst_22117 = cljs.core.chunk_rest.call(null,inst_22112);
var inst_22118 = cljs.core.count.call(null,inst_22116);
var inst_22095 = inst_22117;
var inst_22096 = inst_22116;
var inst_22097 = inst_22118;
var inst_22098 = (0);
var state_22162__$1 = (function (){var statearr_22248 = state_22162;
(statearr_22248[(22)] = inst_22095);

(statearr_22248[(23)] = inst_22096);

(statearr_22248[(24)] = inst_22097);

(statearr_22248[(25)] = inst_22098);

return statearr_22248;
})();
var statearr_22249_22330 = state_22162__$1;
(statearr_22249_22330[(2)] = null);

(statearr_22249_22330[(1)] = (45));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (26))){
var inst_22024 = (state_22162[(14)]);
var inst_22028 = cljs.core.chunk_first.call(null,inst_22024);
var inst_22029 = cljs.core.chunk_rest.call(null,inst_22024);
var inst_22030 = cljs.core.count.call(null,inst_22028);
var inst_22007 = inst_22029;
var inst_22008 = inst_22028;
var inst_22009 = inst_22030;
var inst_22010 = (0);
var state_22162__$1 = (function (){var statearr_22250 = state_22162;
(statearr_22250[(9)] = inst_22010);

(statearr_22250[(10)] = inst_22007);

(statearr_22250[(11)] = inst_22008);

(statearr_22250[(12)] = inst_22009);

return statearr_22250;
})();
var statearr_22251_22331 = state_22162__$1;
(statearr_22251_22331[(2)] = null);

(statearr_22251_22331[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (16))){
var inst_21979 = (state_22162[(27)]);
var state_22162__$1 = state_22162;
var statearr_22252_22332 = state_22162__$1;
(statearr_22252_22332[(2)] = inst_21979);

(statearr_22252_22332[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (38))){
var inst_22082 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
if(cljs.core.truth_(inst_22082)){
var statearr_22253_22333 = state_22162__$1;
(statearr_22253_22333[(1)] = (42));

} else {
var statearr_22254_22334 = state_22162__$1;
(statearr_22254_22334[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (30))){
var inst_22057 = (state_22162[(8)]);
var inst_22059 = cljs.core.chunked_seq_QMARK_.call(null,inst_22057);
var state_22162__$1 = state_22162;
if(inst_22059){
var statearr_22255_22335 = state_22162__$1;
(statearr_22255_22335[(1)] = (33));

} else {
var statearr_22256_22336 = state_22162__$1;
(statearr_22256_22336[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (10))){
var state_22162__$1 = state_22162;
var statearr_22257_22337 = state_22162__$1;
(statearr_22257_22337[(2)] = false);

(statearr_22257_22337[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (18))){
var inst_22010 = (state_22162[(9)]);
var inst_22009 = (state_22162[(12)]);
var inst_22012 = (inst_22010 < inst_22009);
var inst_22013 = inst_22012;
var state_22162__$1 = state_22162;
if(cljs.core.truth_(inst_22013)){
var statearr_22258_22338 = state_22162__$1;
(statearr_22258_22338[(1)] = (20));

} else {
var statearr_22259_22339 = state_22162__$1;
(statearr_22259_22339[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (52))){
var inst_22133 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
var statearr_22260_22340 = state_22162__$1;
(statearr_22260_22340[(2)] = inst_22133);

(statearr_22260_22340[(1)] = (49));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (42))){
var inst_22067 = (state_22162[(30)]);
var inst_22084 = cljs.core.apply.call(null,cljs.core.hash_map,inst_22067);
var state_22162__$1 = state_22162;
var statearr_22261_22341 = state_22162__$1;
(statearr_22261_22341[(2)] = inst_22084);

(statearr_22261_22341[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (37))){
var state_22162__$1 = state_22162;
var statearr_22262_22342 = state_22162__$1;
(statearr_22262_22342[(2)] = false);

(statearr_22262_22342[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (8))){
var inst_22150 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
var statearr_22263_22343 = state_22162__$1;
(statearr_22263_22343[(2)] = inst_22150);

(statearr_22263_22343[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_22163 === (49))){
var inst_22135 = (state_22162[(2)]);
var state_22162__$1 = state_22162;
var statearr_22264_22344 = state_22162__$1;
(statearr_22264_22344[(2)] = inst_22135);

(statearr_22264_22344[(1)] = (46));


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
});})(c__20372__auto___22272,update_index,_,latest_index,index,should_continue_QMARK_))
;
return ((function (switch__20351__auto__,c__20372__auto___22272,update_index,_,latest_index,index,should_continue_QMARK_){
return (function() {
var parinfer_site$gears$animate_gears_BANG__$_state_machine__20352__auto__ = null;
var parinfer_site$gears$animate_gears_BANG__$_state_machine__20352__auto____0 = (function (){
var statearr_22268 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_22268[(0)] = parinfer_site$gears$animate_gears_BANG__$_state_machine__20352__auto__);

(statearr_22268[(1)] = (1));

return statearr_22268;
});
var parinfer_site$gears$animate_gears_BANG__$_state_machine__20352__auto____1 = (function (state_22162){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_22162);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e22269){if((e22269 instanceof Object)){
var ex__20355__auto__ = e22269;
var statearr_22270_22345 = state_22162;
(statearr_22270_22345[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22162);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e22269;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__22346 = state_22162;
state_22162 = G__22346;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
parinfer_site$gears$animate_gears_BANG__$_state_machine__20352__auto__ = function(state_22162){
switch(arguments.length){
case 0:
return parinfer_site$gears$animate_gears_BANG__$_state_machine__20352__auto____0.call(this);
case 1:
return parinfer_site$gears$animate_gears_BANG__$_state_machine__20352__auto____1.call(this,state_22162);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
parinfer_site$gears$animate_gears_BANG__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = parinfer_site$gears$animate_gears_BANG__$_state_machine__20352__auto____0;
parinfer_site$gears$animate_gears_BANG__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = parinfer_site$gears$animate_gears_BANG__$_state_machine__20352__auto____1;
return parinfer_site$gears$animate_gears_BANG__$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___22272,update_index,_,latest_index,index,should_continue_QMARK_))
})();
var state__20374__auto__ = (function (){var statearr_22271 = f__20373__auto__.call(null);
(statearr_22271[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___22272);

return statearr_22271;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___22272,update_index,_,latest_index,index,should_continue_QMARK_))
);


return d3.timer(((function (update_index,_,latest_index,index,should_continue_QMARK_){
return (function (){
parinfer_site.gears.tick_svg_BANG_.call(null,svg);

return cljs.core.not.call(null,should_continue_QMARK_.call(null));
});})(update_index,_,latest_index,index,should_continue_QMARK_))
);
} else {
return null;
}
});
parinfer_site.gears.create_gears_BANG_ = (function parinfer_site$gears$create_gears_BANG_(selector,p__22347,p__22348){
var map__22365 = p__22347;
var map__22365__$1 = ((((!((map__22365 == null)))?((((map__22365.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22365.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22365):map__22365);
var init_gears = cljs.core.get.call(null,map__22365__$1,new cljs.core.Keyword(null,"init-gears","init-gears",1422313814));
var mesh_gears = cljs.core.get.call(null,map__22365__$1,new cljs.core.Keyword(null,"mesh-gears","mesh-gears",695197022));
var anim_frames = cljs.core.get.call(null,map__22365__$1,new cljs.core.Keyword(null,"anim-frames","anim-frames",2117672923));
var map__22366 = p__22348;
var map__22366__$1 = ((((!((map__22366 == null)))?((((map__22366.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22366.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22366):map__22366);
var svg_opts = map__22366__$1;
var width = cljs.core.get.call(null,map__22366__$1,new cljs.core.Keyword(null,"width","width",-384071477));
var height = cljs.core.get.call(null,map__22366__$1,new cljs.core.Keyword(null,"height","height",1025178622));
var container = d3.select(selector);
var _ = container.select("svg").remove();
var svg = container.append("svg").attr("viewbox",[cljs.core.str("0 0 "),cljs.core.str(width),cljs.core.str(" "),cljs.core.str(height)].join('')).attr("width",width).attr("height",height);
var gear_array = [];
var drag_behavior = Gear.dragBehaviour(gear_array,svg);
var gear_objs = (function (){var iter__17039__auto__ = ((function (container,_,svg,gear_array,drag_behavior,map__22365,map__22365__$1,init_gears,mesh_gears,anim_frames,map__22366,map__22366__$1,svg_opts,width,height){
return (function parinfer_site$gears$create_gears_BANG__$_iter__22369(s__22370){
return (new cljs.core.LazySeq(null,((function (container,_,svg,gear_array,drag_behavior,map__22365,map__22365__$1,init_gears,mesh_gears,anim_frames,map__22366,map__22366__$1,svg_opts,width,height){
return (function (){
var s__22370__$1 = s__22370;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__22370__$1);
if(temp__4425__auto__){
var s__22370__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__22370__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__22370__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__22372 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__22371 = (0);
while(true){
if((i__22371 < size__17038__auto__)){
var vec__22375 = cljs.core._nth.call(null,c__17037__auto__,i__22371);
var name_ = cljs.core.nth.call(null,vec__22375,(0),null);
var opts = cljs.core.nth.call(null,vec__22375,(1),null);
cljs.core.chunk_append.call(null,b__22372,parinfer_site.gears.make_gear.call(null,svg,drag_behavior,cljs.core.merge.call(null,parinfer_site.gears.default_options,opts)));

var G__22381 = (i__22371 + (1));
i__22371 = G__22381;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22372),parinfer_site$gears$create_gears_BANG__$_iter__22369.call(null,cljs.core.chunk_rest.call(null,s__22370__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22372),null);
}
} else {
var vec__22376 = cljs.core.first.call(null,s__22370__$2);
var name_ = cljs.core.nth.call(null,vec__22376,(0),null);
var opts = cljs.core.nth.call(null,vec__22376,(1),null);
return cljs.core.cons.call(null,parinfer_site.gears.make_gear.call(null,svg,drag_behavior,cljs.core.merge.call(null,parinfer_site.gears.default_options,opts)),parinfer_site$gears$create_gears_BANG__$_iter__22369.call(null,cljs.core.rest.call(null,s__22370__$2)));
}
} else {
return null;
}
break;
}
});})(container,_,svg,gear_array,drag_behavior,map__22365,map__22365__$1,init_gears,mesh_gears,anim_frames,map__22366,map__22366__$1,svg_opts,width,height))
,null,null));
});})(container,_,svg,gear_array,drag_behavior,map__22365,map__22365__$1,init_gears,mesh_gears,anim_frames,map__22366,map__22366__$1,svg_opts,width,height))
;
return iter__17039__auto__.call(null,init_gears);
})();
var gear_map = cljs.core.zipmap.call(null,cljs.core.keys.call(null,init_gears),gear_objs);
var seq__22377_22382 = cljs.core.seq.call(null,gear_objs);
var chunk__22378_22383 = null;
var count__22379_22384 = (0);
var i__22380_22385 = (0);
while(true){
if((i__22380_22385 < count__22379_22384)){
var g_22386 = cljs.core._nth.call(null,chunk__22378_22383,i__22380_22385);
gear_array.push(g_22386);

var G__22387 = seq__22377_22382;
var G__22388 = chunk__22378_22383;
var G__22389 = count__22379_22384;
var G__22390 = (i__22380_22385 + (1));
seq__22377_22382 = G__22387;
chunk__22378_22383 = G__22388;
count__22379_22384 = G__22389;
i__22380_22385 = G__22390;
continue;
} else {
var temp__4425__auto___22391 = cljs.core.seq.call(null,seq__22377_22382);
if(temp__4425__auto___22391){
var seq__22377_22392__$1 = temp__4425__auto___22391;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22377_22392__$1)){
var c__17070__auto___22393 = cljs.core.chunk_first.call(null,seq__22377_22392__$1);
var G__22394 = cljs.core.chunk_rest.call(null,seq__22377_22392__$1);
var G__22395 = c__17070__auto___22393;
var G__22396 = cljs.core.count.call(null,c__17070__auto___22393);
var G__22397 = (0);
seq__22377_22382 = G__22394;
chunk__22378_22383 = G__22395;
count__22379_22384 = G__22396;
i__22380_22385 = G__22397;
continue;
} else {
var g_22398 = cljs.core.first.call(null,seq__22377_22392__$1);
gear_array.push(g_22398);

var G__22399 = cljs.core.next.call(null,seq__22377_22392__$1);
var G__22400 = null;
var G__22401 = (0);
var G__22402 = (0);
seq__22377_22382 = G__22399;
chunk__22378_22383 = G__22400;
count__22379_22384 = G__22401;
i__22380_22385 = G__22402;
continue;
}
} else {
}
}
break;
}

return parinfer_site.gears.animate_gears_BANG_.call(null,svg,selector,gear_map,gear_array,anim_frames);
});

//# sourceMappingURL=gears.js.map?rel=1450835341218