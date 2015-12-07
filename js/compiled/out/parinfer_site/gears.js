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
var vec__31558 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"top","top",-1856271961),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(- r__$1)], null),new cljs.core.Keyword(null,"bottom","bottom",-1550509018),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),r__$1], null),new cljs.core.Keyword(null,"right","right",-452581833),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [r__$1,(0)], null),new cljs.core.Keyword(null,"left","left",-399115937),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- r__$1),(0)], null)], null).call(null,side);
var x = cljs.core.nth.call(null,vec__31558,(0),null);
var y = cljs.core.nth.call(null,vec__31558,(1),null);
var anchor = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"top","top",-1856271961),"middle",new cljs.core.Keyword(null,"bottom","bottom",-1550509018),"middle",new cljs.core.Keyword(null,"right","right",-452581833),"start",new cljs.core.Keyword(null,"left","left",-399115937),"end"], null).call(null,side);
var baseline = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"top","top",-1856271961),"alphabetical",new cljs.core.Keyword(null,"bottom","bottom",-1550509018),"hanging",new cljs.core.Keyword(null,"right","right",-452581833),"middle",new cljs.core.Keyword(null,"left","left",-399115937),"middle"], null).call(null,side);
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"x","x",2099068185),x,new cljs.core.Keyword(null,"y","y",-1757859776),y,new cljs.core.Keyword(null,"anchor","anchor",1549638489),anchor,new cljs.core.Keyword(null,"baseline","baseline",1151033280),baseline], null);
});
parinfer_site.gears.add_gear_caption_BANG_ = (function parinfer_site$gears$add_gear_caption_BANG_(gear,p__31559){
var map__31564 = p__31559;
var map__31564__$1 = ((((!((map__31564 == null)))?((((map__31564.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31564.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31564):map__31564);
var text = cljs.core.get.call(null,map__31564__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var side = cljs.core.get.call(null,map__31564__$1,new cljs.core.Keyword(null,"side","side",389652279));
var map__31566 = parinfer_site.gears.caption_side_attrs.call(null,gear,side);
var map__31566__$1 = ((((!((map__31566 == null)))?((((map__31566.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31566.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31566):map__31566);
var x = cljs.core.get.call(null,map__31566__$1,new cljs.core.Keyword(null,"x","x",2099068185));
var y = cljs.core.get.call(null,map__31566__$1,new cljs.core.Keyword(null,"y","y",-1757859776));
var anchor = cljs.core.get.call(null,map__31566__$1,new cljs.core.Keyword(null,"anchor","anchor",1549638489));
var baseline = cljs.core.get.call(null,map__31566__$1,new cljs.core.Keyword(null,"baseline","baseline",1151033280));
return gear.append("text").attr("text-anchor",anchor).attr("dominant-baseline",baseline).attr("x",x).attr("y",y).text(text);
});
parinfer_site.gears.make_gear = (function parinfer_site$gears$make_gear(svg,drag_behavior,p__31568){
var map__31575 = p__31568;
var map__31575__$1 = ((((!((map__31575 == null)))?((((map__31575.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31575.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31575):map__31575);
var opts = map__31575__$1;
var x = cljs.core.get.call(null,map__31575__$1,new cljs.core.Keyword(null,"x","x",2099068185));
var dedendum = cljs.core.get.call(null,map__31575__$1,new cljs.core.Keyword(null,"dedendum","dedendum",-146545604));
var classes = cljs.core.get.call(null,map__31575__$1,new cljs.core.Keyword(null,"classes","classes",2037804510));
var profile_slope = cljs.core.get.call(null,map__31575__$1,new cljs.core.Keyword(null,"profile-slope","profile-slope",407431968));
var y = cljs.core.get.call(null,map__31575__$1,new cljs.core.Keyword(null,"y","y",-1757859776));
var thickness = cljs.core.get.call(null,map__31575__$1,new cljs.core.Keyword(null,"thickness","thickness",-940175454));
var caption = cljs.core.get.call(null,map__31575__$1,new cljs.core.Keyword(null,"caption","caption",-855383902));
var addendum = cljs.core.get.call(null,map__31575__$1,new cljs.core.Keyword(null,"addendum","addendum",472326827));
var angle = cljs.core.get.call(null,map__31575__$1,new cljs.core.Keyword(null,"angle","angle",1622094254));
var hole_radius = cljs.core.get.call(null,map__31575__$1,new cljs.core.Keyword(null,"hole-radius","hole-radius",-282926671));
var factor = cljs.core.get.call(null,map__31575__$1,new cljs.core.Keyword(null,"factor","factor",-2103172748));
var radius = (factor / (2));
var teeth = (radius / (4));
var inner_radius = ((radius - addendum) - dedendum);
var hole_radius__$1 = (((factor > (96)))?((inner_radius * 0.5) + ((inner_radius * 0.5) * hole_radius)):(inner_radius * hole_radius));
var js_opts = {"y": y, "thickness": thickness, "addendum": addendum, "angle": angle, "radius": radius, "teeth": teeth, "holeRadius": hole_radius__$1, "x": x, "profileSlope": profile_slope, "dedendum": dedendum};
var gear = Gear.create(svg,js_opts);
var seq__31577_31581 = cljs.core.seq.call(null,classes);
var chunk__31578_31582 = null;
var count__31579_31583 = (0);
var i__31580_31584 = (0);
while(true){
if((i__31580_31584 < count__31579_31583)){
var c_31585 = cljs.core._nth.call(null,chunk__31578_31582,i__31580_31584);
gear.classed(c_31585,true);

var G__31586 = seq__31577_31581;
var G__31587 = chunk__31578_31582;
var G__31588 = count__31579_31583;
var G__31589 = (i__31580_31584 + (1));
seq__31577_31581 = G__31586;
chunk__31578_31582 = G__31587;
count__31579_31583 = G__31588;
i__31580_31584 = G__31589;
continue;
} else {
var temp__4425__auto___31590 = cljs.core.seq.call(null,seq__31577_31581);
if(temp__4425__auto___31590){
var seq__31577_31591__$1 = temp__4425__auto___31590;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__31577_31591__$1)){
var c__17070__auto___31592 = cljs.core.chunk_first.call(null,seq__31577_31591__$1);
var G__31593 = cljs.core.chunk_rest.call(null,seq__31577_31591__$1);
var G__31594 = c__17070__auto___31592;
var G__31595 = cljs.core.count.call(null,c__17070__auto___31592);
var G__31596 = (0);
seq__31577_31581 = G__31593;
chunk__31578_31582 = G__31594;
count__31579_31583 = G__31595;
i__31580_31584 = G__31596;
continue;
} else {
var c_31597 = cljs.core.first.call(null,seq__31577_31591__$1);
gear.classed(c_31597,true);

var G__31598 = cljs.core.next.call(null,seq__31577_31591__$1);
var G__31599 = null;
var G__31600 = (0);
var G__31601 = (0);
seq__31577_31581 = G__31598;
chunk__31578_31582 = G__31599;
count__31579_31583 = G__31600;
i__31580_31584 = G__31601;
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
var seq__31622 = cljs.core.seq.call(null,attrs);
var chunk__31623 = null;
var count__31624 = (0);
var i__31625 = (0);
while(true){
if((i__31625 < count__31624)){
var vec__31626 = cljs.core._nth.call(null,chunk__31623,i__31625);
var k = cljs.core.nth.call(null,vec__31626,(0),null);
var v = cljs.core.nth.call(null,vec__31626,(1),null);
var G__31627_31642 = (((k instanceof cljs.core.Keyword))?k.fqn:null);
switch (G__31627_31642) {
case "text":
gear_obj.select("text").text(v);

break;
case "power":
Gear.setPower(gear_obj,v);

break;
case "classes":
var seq__31628_31644 = cljs.core.seq.call(null,v);
var chunk__31629_31645 = null;
var count__31630_31646 = (0);
var i__31631_31647 = (0);
while(true){
if((i__31631_31647 < count__31630_31646)){
var vec__31632_31648 = cljs.core._nth.call(null,chunk__31629_31645,i__31631_31647);
var style_class_31649 = cljs.core.nth.call(null,vec__31632_31648,(0),null);
var enabled_QMARK__31650 = cljs.core.nth.call(null,vec__31632_31648,(1),null);
gear_obj.classed(style_class_31649,enabled_QMARK__31650);

var G__31651 = seq__31628_31644;
var G__31652 = chunk__31629_31645;
var G__31653 = count__31630_31646;
var G__31654 = (i__31631_31647 + (1));
seq__31628_31644 = G__31651;
chunk__31629_31645 = G__31652;
count__31630_31646 = G__31653;
i__31631_31647 = G__31654;
continue;
} else {
var temp__4425__auto___31655 = cljs.core.seq.call(null,seq__31628_31644);
if(temp__4425__auto___31655){
var seq__31628_31656__$1 = temp__4425__auto___31655;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__31628_31656__$1)){
var c__17070__auto___31657 = cljs.core.chunk_first.call(null,seq__31628_31656__$1);
var G__31658 = cljs.core.chunk_rest.call(null,seq__31628_31656__$1);
var G__31659 = c__17070__auto___31657;
var G__31660 = cljs.core.count.call(null,c__17070__auto___31657);
var G__31661 = (0);
seq__31628_31644 = G__31658;
chunk__31629_31645 = G__31659;
count__31630_31646 = G__31660;
i__31631_31647 = G__31661;
continue;
} else {
var vec__31633_31662 = cljs.core.first.call(null,seq__31628_31656__$1);
var style_class_31663 = cljs.core.nth.call(null,vec__31633_31662,(0),null);
var enabled_QMARK__31664 = cljs.core.nth.call(null,vec__31633_31662,(1),null);
gear_obj.classed(style_class_31663,enabled_QMARK__31664);

var G__31665 = cljs.core.next.call(null,seq__31628_31656__$1);
var G__31666 = null;
var G__31667 = (0);
var G__31668 = (0);
seq__31628_31644 = G__31665;
chunk__31629_31645 = G__31666;
count__31630_31646 = G__31667;
i__31631_31647 = G__31668;
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

var G__31669 = seq__31622;
var G__31670 = chunk__31623;
var G__31671 = count__31624;
var G__31672 = (i__31625 + (1));
seq__31622 = G__31669;
chunk__31623 = G__31670;
count__31624 = G__31671;
i__31625 = G__31672;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__31622);
if(temp__4425__auto__){
var seq__31622__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__31622__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__31622__$1);
var G__31673 = cljs.core.chunk_rest.call(null,seq__31622__$1);
var G__31674 = c__17070__auto__;
var G__31675 = cljs.core.count.call(null,c__17070__auto__);
var G__31676 = (0);
seq__31622 = G__31673;
chunk__31623 = G__31674;
count__31624 = G__31675;
i__31625 = G__31676;
continue;
} else {
var vec__31634 = cljs.core.first.call(null,seq__31622__$1);
var k = cljs.core.nth.call(null,vec__31634,(0),null);
var v = cljs.core.nth.call(null,vec__31634,(1),null);
var G__31635_31677 = (((k instanceof cljs.core.Keyword))?k.fqn:null);
switch (G__31635_31677) {
case "text":
gear_obj.select("text").text(v);

break;
case "power":
Gear.setPower(gear_obj,v);

break;
case "classes":
var seq__31636_31679 = cljs.core.seq.call(null,v);
var chunk__31637_31680 = null;
var count__31638_31681 = (0);
var i__31639_31682 = (0);
while(true){
if((i__31639_31682 < count__31638_31681)){
var vec__31640_31683 = cljs.core._nth.call(null,chunk__31637_31680,i__31639_31682);
var style_class_31684 = cljs.core.nth.call(null,vec__31640_31683,(0),null);
var enabled_QMARK__31685 = cljs.core.nth.call(null,vec__31640_31683,(1),null);
gear_obj.classed(style_class_31684,enabled_QMARK__31685);

var G__31686 = seq__31636_31679;
var G__31687 = chunk__31637_31680;
var G__31688 = count__31638_31681;
var G__31689 = (i__31639_31682 + (1));
seq__31636_31679 = G__31686;
chunk__31637_31680 = G__31687;
count__31638_31681 = G__31688;
i__31639_31682 = G__31689;
continue;
} else {
var temp__4425__auto___31690__$1 = cljs.core.seq.call(null,seq__31636_31679);
if(temp__4425__auto___31690__$1){
var seq__31636_31691__$1 = temp__4425__auto___31690__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__31636_31691__$1)){
var c__17070__auto___31692 = cljs.core.chunk_first.call(null,seq__31636_31691__$1);
var G__31693 = cljs.core.chunk_rest.call(null,seq__31636_31691__$1);
var G__31694 = c__17070__auto___31692;
var G__31695 = cljs.core.count.call(null,c__17070__auto___31692);
var G__31696 = (0);
seq__31636_31679 = G__31693;
chunk__31637_31680 = G__31694;
count__31638_31681 = G__31695;
i__31639_31682 = G__31696;
continue;
} else {
var vec__31641_31697 = cljs.core.first.call(null,seq__31636_31691__$1);
var style_class_31698 = cljs.core.nth.call(null,vec__31641_31697,(0),null);
var enabled_QMARK__31699 = cljs.core.nth.call(null,vec__31641_31697,(1),null);
gear_obj.classed(style_class_31698,enabled_QMARK__31699);

var G__31700 = cljs.core.next.call(null,seq__31636_31691__$1);
var G__31701 = null;
var G__31702 = (0);
var G__31703 = (0);
seq__31636_31679 = G__31700;
chunk__31637_31680 = G__31701;
count__31638_31681 = G__31702;
i__31639_31682 = G__31703;
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

var G__31704 = cljs.core.next.call(null,seq__31622__$1);
var G__31705 = null;
var G__31706 = (0);
var G__31707 = (0);
seq__31622 = G__31704;
chunk__31623 = G__31705;
count__31624 = G__31706;
i__31625 = G__31707;
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
var update_index = (function (p1__31708_SHARP_){
return ((function (){var or__16267__auto__ = p1__31708_SHARP_;
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
var c__20534__auto___32325 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___32325,update_index,_,latest_index,index,should_continue_QMARK_){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___32325,update_index,_,latest_index,index,should_continue_QMARK_){
return (function (state_32215){
var state_val_32216 = (state_32215[(1)]);
if((state_val_32216 === (7))){
var inst_32023 = (state_32215[(7)]);
var inst_32110 = (state_32215[(8)]);
var inst_32110__$1 = cljs.core.seq.call(null,inst_32023);
var state_32215__$1 = (function (){var statearr_32220 = state_32215;
(statearr_32220[(8)] = inst_32110__$1);

return statearr_32220;
})();
if(inst_32110__$1){
var statearr_32221_32326 = state_32215__$1;
(statearr_32221_32326[(1)] = (30));

} else {
var statearr_32222_32327 = state_32215__$1;
(statearr_32222_32327[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (59))){
var inst_32211 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
var statearr_32223_32328 = state_32215__$1;
(statearr_32223_32328[(2)] = inst_32211);

(statearr_32223_32328[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (20))){
var inst_32061 = (state_32215[(9)]);
var inst_32062 = (state_32215[(10)]);
var inst_32060 = (state_32215[(11)]);
var inst_32063 = (state_32215[(12)]);
var inst_32069 = cljs.core._nth.call(null,inst_32061,inst_32063);
var inst_32070 = cljs.core.nth.call(null,inst_32069,(0),null);
var inst_32071 = cljs.core.nth.call(null,inst_32069,(1),null);
var inst_32072 = gear_map.call(null,inst_32070);
var inst_32073 = parinfer_site.gears.apply_gear_attrs_BANG_.call(null,inst_32072,inst_32071);
var inst_32074 = (inst_32063 + (1));
var tmp32217 = inst_32061;
var tmp32218 = inst_32062;
var tmp32219 = inst_32060;
var inst_32060__$1 = tmp32219;
var inst_32061__$1 = tmp32217;
var inst_32062__$1 = tmp32218;
var inst_32063__$1 = inst_32074;
var state_32215__$1 = (function (){var statearr_32224 = state_32215;
(statearr_32224[(9)] = inst_32061__$1);

(statearr_32224[(13)] = inst_32073);

(statearr_32224[(10)] = inst_32062__$1);

(statearr_32224[(11)] = inst_32060__$1);

(statearr_32224[(12)] = inst_32063__$1);

return statearr_32224;
})();
var statearr_32225_32329 = state_32215__$1;
(statearr_32225_32329[(2)] = null);

(statearr_32225_32329[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (58))){
var state_32215__$1 = state_32215;
var statearr_32226_32330 = state_32215__$1;
(statearr_32226_32330[(2)] = null);

(statearr_32226_32330[(1)] = (59));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (27))){
var inst_32077 = (state_32215[(14)]);
var inst_32087 = cljs.core.first.call(null,inst_32077);
var inst_32088 = cljs.core.nth.call(null,inst_32087,(0),null);
var inst_32089 = cljs.core.nth.call(null,inst_32087,(1),null);
var inst_32090 = gear_map.call(null,inst_32088);
var inst_32091 = parinfer_site.gears.apply_gear_attrs_BANG_.call(null,inst_32090,inst_32089);
var inst_32092 = cljs.core.next.call(null,inst_32077);
var inst_32060 = inst_32092;
var inst_32061 = null;
var inst_32062 = (0);
var inst_32063 = (0);
var state_32215__$1 = (function (){var statearr_32227 = state_32215;
(statearr_32227[(15)] = inst_32091);

(statearr_32227[(9)] = inst_32061);

(statearr_32227[(10)] = inst_32062);

(statearr_32227[(11)] = inst_32060);

(statearr_32227[(12)] = inst_32063);

return statearr_32227;
})();
var statearr_32228_32331 = state_32215__$1;
(statearr_32228_32331[(2)] = null);

(statearr_32228_32331[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (1))){
var state_32215__$1 = state_32215;
var statearr_32229_32332 = state_32215__$1;
(statearr_32229_32332[(2)] = null);

(statearr_32229_32332[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (24))){
var state_32215__$1 = state_32215;
var statearr_32230_32333 = state_32215__$1;
(statearr_32230_32333[(2)] = null);

(statearr_32230_32333[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (55))){
var inst_32183 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
var statearr_32231_32334 = state_32215__$1;
(statearr_32231_32334[(2)] = inst_32183);

(statearr_32231_32334[(1)] = (52));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (39))){
var state_32215__$1 = state_32215;
var statearr_32232_32335 = state_32215__$1;
(statearr_32232_32335[(2)] = true);

(statearr_32232_32335[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (46))){
var inst_32142 = (state_32215[(16)]);
var inst_32190 = (state_32215[(2)]);
var inst_32191 = Gear.updateGears(gear_array);
var inst_32192 = cljs.core.async.timeout.call(null,inst_32142);
var state_32215__$1 = (function (){var statearr_32233 = state_32215;
(statearr_32233[(17)] = inst_32191);

(statearr_32233[(18)] = inst_32190);

return statearr_32233;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32215__$1,(56),inst_32192);
} else {
if((state_val_32216 === (4))){
var inst_32025 = (state_32215[(19)]);
var inst_32026 = (state_32215[(20)]);
var inst_32028 = (inst_32026 < inst_32025);
var inst_32029 = inst_32028;
var state_32215__$1 = state_32215;
if(cljs.core.truth_(inst_32029)){
var statearr_32234_32336 = state_32215__$1;
(statearr_32234_32336[(1)] = (6));

} else {
var statearr_32235_32337 = state_32215__$1;
(statearr_32235_32337[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (54))){
var inst_32165 = (state_32215[(21)]);
var inst_32175 = cljs.core.first.call(null,inst_32165);
var inst_32176 = cljs.core.nth.call(null,inst_32175,(0),null);
var inst_32177 = cljs.core.nth.call(null,inst_32175,(1),null);
var inst_32178 = gear_map.call(null,inst_32176);
var inst_32179 = parinfer_site.gears.apply_gear_attrs_BANG_.call(null,inst_32178,inst_32177);
var inst_32180 = cljs.core.next.call(null,inst_32165);
var inst_32148 = inst_32180;
var inst_32149 = null;
var inst_32150 = (0);
var inst_32151 = (0);
var state_32215__$1 = (function (){var statearr_32236 = state_32215;
(statearr_32236[(22)] = inst_32149);

(statearr_32236[(23)] = inst_32179);

(statearr_32236[(24)] = inst_32151);

(statearr_32236[(25)] = inst_32148);

(statearr_32236[(26)] = inst_32150);

return statearr_32236;
})();
var statearr_32237_32338 = state_32215__$1;
(statearr_32237_32338[(2)] = null);

(statearr_32237_32338[(1)] = (45));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (15))){
var inst_32032 = (state_32215[(27)]);
var inst_32049 = cljs.core.apply.call(null,cljs.core.hash_map,inst_32032);
var state_32215__$1 = state_32215;
var statearr_32238_32339 = state_32215__$1;
(statearr_32238_32339[(2)] = inst_32049);

(statearr_32238_32339[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (48))){
var inst_32148 = (state_32215[(25)]);
var inst_32165 = (state_32215[(21)]);
var inst_32165__$1 = cljs.core.seq.call(null,inst_32148);
var state_32215__$1 = (function (){var statearr_32239 = state_32215;
(statearr_32239[(21)] = inst_32165__$1);

return statearr_32239;
})();
if(inst_32165__$1){
var statearr_32240_32340 = state_32215__$1;
(statearr_32240_32340[(1)] = (50));

} else {
var statearr_32241_32341 = state_32215__$1;
(statearr_32241_32341[(1)] = (51));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (50))){
var inst_32165 = (state_32215[(21)]);
var inst_32167 = cljs.core.chunked_seq_QMARK_.call(null,inst_32165);
var state_32215__$1 = state_32215;
if(inst_32167){
var statearr_32242_32342 = state_32215__$1;
(statearr_32242_32342[(1)] = (53));

} else {
var statearr_32243_32343 = state_32215__$1;
(statearr_32243_32343[(1)] = (54));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (21))){
var inst_32060 = (state_32215[(11)]);
var inst_32077 = (state_32215[(14)]);
var inst_32077__$1 = cljs.core.seq.call(null,inst_32060);
var state_32215__$1 = (function (){var statearr_32244 = state_32215;
(statearr_32244[(14)] = inst_32077__$1);

return statearr_32244;
})();
if(inst_32077__$1){
var statearr_32245_32344 = state_32215__$1;
(statearr_32245_32344[(1)] = (23));

} else {
var statearr_32246_32345 = state_32215__$1;
(statearr_32246_32345[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (31))){
var state_32215__$1 = state_32215;
var statearr_32247_32346 = state_32215__$1;
(statearr_32247_32346[(2)] = null);

(statearr_32247_32346[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (32))){
var inst_32201 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
var statearr_32248_32347 = state_32215__$1;
(statearr_32248_32347[(2)] = inst_32201);

(statearr_32248_32347[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (40))){
var state_32215__$1 = state_32215;
var statearr_32249_32348 = state_32215__$1;
(statearr_32249_32348[(2)] = false);

(statearr_32249_32348[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (56))){
var inst_32110 = (state_32215[(8)]);
var inst_32194 = (state_32215[(2)]);
var inst_32195 = cljs.core.next.call(null,inst_32110);
var inst_32023 = inst_32195;
var inst_32024 = null;
var inst_32025 = (0);
var inst_32026 = (0);
var state_32215__$1 = (function (){var statearr_32250 = state_32215;
(statearr_32250[(28)] = inst_32024);

(statearr_32250[(19)] = inst_32025);

(statearr_32250[(29)] = inst_32194);

(statearr_32250[(20)] = inst_32026);

(statearr_32250[(7)] = inst_32023);

return statearr_32250;
})();
var statearr_32251_32349 = state_32215__$1;
(statearr_32251_32349[(2)] = null);

(statearr_32251_32349[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (33))){
var inst_32110 = (state_32215[(8)]);
var inst_32114 = cljs.core.chunk_first.call(null,inst_32110);
var inst_32115 = cljs.core.chunk_rest.call(null,inst_32110);
var inst_32116 = cljs.core.count.call(null,inst_32114);
var inst_32023 = inst_32115;
var inst_32024 = inst_32114;
var inst_32025 = inst_32116;
var inst_32026 = (0);
var state_32215__$1 = (function (){var statearr_32252 = state_32215;
(statearr_32252[(28)] = inst_32024);

(statearr_32252[(19)] = inst_32025);

(statearr_32252[(20)] = inst_32026);

(statearr_32252[(7)] = inst_32023);

return statearr_32252;
})();
var statearr_32253_32350 = state_32215__$1;
(statearr_32253_32350[(2)] = null);

(statearr_32253_32350[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (13))){
var state_32215__$1 = state_32215;
var statearr_32254_32351 = state_32215__$1;
(statearr_32254_32351[(2)] = false);

(statearr_32254_32351[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (22))){
var inst_32100 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
var statearr_32255_32352 = state_32215__$1;
(statearr_32255_32352[(2)] = inst_32100);

(statearr_32255_32352[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (36))){
var inst_32120 = (state_32215[(30)]);
var inst_32125 = inst_32120.cljs$lang$protocol_mask$partition0$;
var inst_32126 = (inst_32125 & (64));
var inst_32127 = inst_32120.cljs$core$ISeq$;
var inst_32128 = (inst_32126) || (inst_32127);
var state_32215__$1 = state_32215;
if(cljs.core.truth_(inst_32128)){
var statearr_32256_32353 = state_32215__$1;
(statearr_32256_32353[(1)] = (39));

} else {
var statearr_32257_32354 = state_32215__$1;
(statearr_32257_32354[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (41))){
var inst_32132 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
var statearr_32261_32355 = state_32215__$1;
(statearr_32261_32355[(2)] = inst_32132);

(statearr_32261_32355[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (43))){
var inst_32120 = (state_32215[(30)]);
var state_32215__$1 = state_32215;
var statearr_32262_32356 = state_32215__$1;
(statearr_32262_32356[(2)] = inst_32120);

(statearr_32262_32356[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (29))){
var inst_32024 = (state_32215[(28)]);
var inst_32025 = (state_32215[(19)]);
var inst_32026 = (state_32215[(20)]);
var inst_32023 = (state_32215[(7)]);
var inst_32106 = (state_32215[(2)]);
var inst_32107 = (inst_32026 + (1));
var tmp32258 = inst_32024;
var tmp32259 = inst_32025;
var tmp32260 = inst_32023;
var inst_32023__$1 = tmp32260;
var inst_32024__$1 = tmp32258;
var inst_32025__$1 = tmp32259;
var inst_32026__$1 = inst_32107;
var state_32215__$1 = (function (){var statearr_32263 = state_32215;
(statearr_32263[(28)] = inst_32024__$1);

(statearr_32263[(31)] = inst_32106);

(statearr_32263[(19)] = inst_32025__$1);

(statearr_32263[(20)] = inst_32026__$1);

(statearr_32263[(7)] = inst_32023__$1);

return statearr_32263;
})();
var statearr_32264_32357 = state_32215__$1;
(statearr_32264_32357[(2)] = null);

(statearr_32264_32357[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (44))){
var inst_32140 = (state_32215[(2)]);
var inst_32141 = cljs.core.get.call(null,inst_32140,new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925));
var inst_32142 = cljs.core.get.call(null,inst_32140,new cljs.core.Keyword(null,"dt","dt",-368444759));
var inst_32147 = cljs.core.seq.call(null,inst_32141);
var inst_32148 = inst_32147;
var inst_32149 = null;
var inst_32150 = (0);
var inst_32151 = (0);
var state_32215__$1 = (function (){var statearr_32265 = state_32215;
(statearr_32265[(16)] = inst_32142);

(statearr_32265[(22)] = inst_32149);

(statearr_32265[(24)] = inst_32151);

(statearr_32265[(25)] = inst_32148);

(statearr_32265[(26)] = inst_32150);

return statearr_32265;
})();
var statearr_32266_32358 = state_32215__$1;
(statearr_32266_32358[(2)] = null);

(statearr_32266_32358[(1)] = (45));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (6))){
var inst_32024 = (state_32215[(28)]);
var inst_32032 = (state_32215[(27)]);
var inst_32026 = (state_32215[(20)]);
var inst_32032__$1 = cljs.core._nth.call(null,inst_32024,inst_32026);
var inst_32034 = (inst_32032__$1 == null);
var inst_32035 = cljs.core.not.call(null,inst_32034);
var state_32215__$1 = (function (){var statearr_32267 = state_32215;
(statearr_32267[(27)] = inst_32032__$1);

return statearr_32267;
})();
if(inst_32035){
var statearr_32268_32359 = state_32215__$1;
(statearr_32268_32359[(1)] = (9));

} else {
var statearr_32269_32360 = state_32215__$1;
(statearr_32269_32360[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (28))){
var inst_32095 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
var statearr_32270_32361 = state_32215__$1;
(statearr_32270_32361[(2)] = inst_32095);

(statearr_32270_32361[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (51))){
var state_32215__$1 = state_32215;
var statearr_32271_32362 = state_32215__$1;
(statearr_32271_32362[(2)] = null);

(statearr_32271_32362[(1)] = (52));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (25))){
var inst_32098 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
var statearr_32272_32363 = state_32215__$1;
(statearr_32272_32363[(2)] = inst_32098);

(statearr_32272_32363[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (34))){
var inst_32110 = (state_32215[(8)]);
var inst_32120 = (state_32215[(30)]);
var inst_32120__$1 = cljs.core.first.call(null,inst_32110);
var inst_32122 = (inst_32120__$1 == null);
var inst_32123 = cljs.core.not.call(null,inst_32122);
var state_32215__$1 = (function (){var statearr_32273 = state_32215;
(statearr_32273[(30)] = inst_32120__$1);

return statearr_32273;
})();
if(inst_32123){
var statearr_32274_32364 = state_32215__$1;
(statearr_32274_32364[(1)] = (36));

} else {
var statearr_32275_32365 = state_32215__$1;
(statearr_32275_32365[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (17))){
var inst_32052 = (state_32215[(2)]);
var inst_32053 = cljs.core.get.call(null,inst_32052,new cljs.core.Keyword(null,"gear-attrs","gear-attrs",525658925));
var inst_32054 = cljs.core.get.call(null,inst_32052,new cljs.core.Keyword(null,"dt","dt",-368444759));
var inst_32059 = cljs.core.seq.call(null,inst_32053);
var inst_32060 = inst_32059;
var inst_32061 = null;
var inst_32062 = (0);
var inst_32063 = (0);
var state_32215__$1 = (function (){var statearr_32276 = state_32215;
(statearr_32276[(32)] = inst_32054);

(statearr_32276[(9)] = inst_32061);

(statearr_32276[(10)] = inst_32062);

(statearr_32276[(11)] = inst_32060);

(statearr_32276[(12)] = inst_32063);

return statearr_32276;
})();
var statearr_32277_32366 = state_32215__$1;
(statearr_32277_32366[(2)] = null);

(statearr_32277_32366[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (3))){
var inst_32213 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_32215__$1,inst_32213);
} else {
if((state_val_32216 === (12))){
var state_32215__$1 = state_32215;
var statearr_32278_32367 = state_32215__$1;
(statearr_32278_32367[(2)] = true);

(statearr_32278_32367[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (2))){
var inst_32022 = cljs.core.seq.call(null,anim_frames);
var inst_32023 = inst_32022;
var inst_32024 = null;
var inst_32025 = (0);
var inst_32026 = (0);
var state_32215__$1 = (function (){var statearr_32282 = state_32215;
(statearr_32282[(28)] = inst_32024);

(statearr_32282[(19)] = inst_32025);

(statearr_32282[(20)] = inst_32026);

(statearr_32282[(7)] = inst_32023);

return statearr_32282;
})();
var statearr_32283_32368 = state_32215__$1;
(statearr_32283_32368[(2)] = null);

(statearr_32283_32368[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (23))){
var inst_32077 = (state_32215[(14)]);
var inst_32079 = cljs.core.chunked_seq_QMARK_.call(null,inst_32077);
var state_32215__$1 = state_32215;
if(inst_32079){
var statearr_32284_32369 = state_32215__$1;
(statearr_32284_32369[(1)] = (26));

} else {
var statearr_32285_32370 = state_32215__$1;
(statearr_32285_32370[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (47))){
var inst_32149 = (state_32215[(22)]);
var inst_32151 = (state_32215[(24)]);
var inst_32148 = (state_32215[(25)]);
var inst_32150 = (state_32215[(26)]);
var inst_32157 = cljs.core._nth.call(null,inst_32149,inst_32151);
var inst_32158 = cljs.core.nth.call(null,inst_32157,(0),null);
var inst_32159 = cljs.core.nth.call(null,inst_32157,(1),null);
var inst_32160 = gear_map.call(null,inst_32158);
var inst_32161 = parinfer_site.gears.apply_gear_attrs_BANG_.call(null,inst_32160,inst_32159);
var inst_32162 = (inst_32151 + (1));
var tmp32279 = inst_32149;
var tmp32280 = inst_32148;
var tmp32281 = inst_32150;
var inst_32148__$1 = tmp32280;
var inst_32149__$1 = tmp32279;
var inst_32150__$1 = tmp32281;
var inst_32151__$1 = inst_32162;
var state_32215__$1 = (function (){var statearr_32286 = state_32215;
(statearr_32286[(22)] = inst_32149__$1);

(statearr_32286[(33)] = inst_32161);

(statearr_32286[(24)] = inst_32151__$1);

(statearr_32286[(25)] = inst_32148__$1);

(statearr_32286[(26)] = inst_32150__$1);

return statearr_32286;
})();
var statearr_32287_32371 = state_32215__$1;
(statearr_32287_32371[(2)] = null);

(statearr_32287_32371[(1)] = (45));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (35))){
var inst_32198 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
var statearr_32288_32372 = state_32215__$1;
(statearr_32288_32372[(2)] = inst_32198);

(statearr_32288_32372[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (19))){
var inst_32054 = (state_32215[(32)]);
var inst_32102 = (state_32215[(2)]);
var inst_32103 = Gear.updateGears(gear_array);
var inst_32104 = cljs.core.async.timeout.call(null,inst_32054);
var state_32215__$1 = (function (){var statearr_32289 = state_32215;
(statearr_32289[(34)] = inst_32103);

(statearr_32289[(35)] = inst_32102);

return statearr_32289;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32215__$1,(29),inst_32104);
} else {
if((state_val_32216 === (57))){
var state_32215__$1 = state_32215;
var statearr_32290_32373 = state_32215__$1;
(statearr_32290_32373[(2)] = null);

(statearr_32290_32373[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (11))){
var inst_32047 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
if(cljs.core.truth_(inst_32047)){
var statearr_32291_32374 = state_32215__$1;
(statearr_32291_32374[(1)] = (15));

} else {
var statearr_32292_32375 = state_32215__$1;
(statearr_32292_32375[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (9))){
var inst_32032 = (state_32215[(27)]);
var inst_32037 = inst_32032.cljs$lang$protocol_mask$partition0$;
var inst_32038 = (inst_32037 & (64));
var inst_32039 = inst_32032.cljs$core$ISeq$;
var inst_32040 = (inst_32038) || (inst_32039);
var state_32215__$1 = state_32215;
if(cljs.core.truth_(inst_32040)){
var statearr_32293_32376 = state_32215__$1;
(statearr_32293_32376[(1)] = (12));

} else {
var statearr_32294_32377 = state_32215__$1;
(statearr_32294_32377[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (5))){
var inst_32205 = (state_32215[(2)]);
var inst_32206 = should_continue_QMARK_.call(null);
var state_32215__$1 = (function (){var statearr_32295 = state_32215;
(statearr_32295[(36)] = inst_32205);

return statearr_32295;
})();
if(cljs.core.truth_(inst_32206)){
var statearr_32296_32378 = state_32215__$1;
(statearr_32296_32378[(1)] = (57));

} else {
var statearr_32297_32379 = state_32215__$1;
(statearr_32297_32379[(1)] = (58));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (14))){
var inst_32044 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
var statearr_32298_32380 = state_32215__$1;
(statearr_32298_32380[(2)] = inst_32044);

(statearr_32298_32380[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (45))){
var inst_32151 = (state_32215[(24)]);
var inst_32150 = (state_32215[(26)]);
var inst_32153 = (inst_32151 < inst_32150);
var inst_32154 = inst_32153;
var state_32215__$1 = state_32215;
if(cljs.core.truth_(inst_32154)){
var statearr_32299_32381 = state_32215__$1;
(statearr_32299_32381[(1)] = (47));

} else {
var statearr_32300_32382 = state_32215__$1;
(statearr_32300_32382[(1)] = (48));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (53))){
var inst_32165 = (state_32215[(21)]);
var inst_32169 = cljs.core.chunk_first.call(null,inst_32165);
var inst_32170 = cljs.core.chunk_rest.call(null,inst_32165);
var inst_32171 = cljs.core.count.call(null,inst_32169);
var inst_32148 = inst_32170;
var inst_32149 = inst_32169;
var inst_32150 = inst_32171;
var inst_32151 = (0);
var state_32215__$1 = (function (){var statearr_32301 = state_32215;
(statearr_32301[(22)] = inst_32149);

(statearr_32301[(24)] = inst_32151);

(statearr_32301[(25)] = inst_32148);

(statearr_32301[(26)] = inst_32150);

return statearr_32301;
})();
var statearr_32302_32383 = state_32215__$1;
(statearr_32302_32383[(2)] = null);

(statearr_32302_32383[(1)] = (45));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (26))){
var inst_32077 = (state_32215[(14)]);
var inst_32081 = cljs.core.chunk_first.call(null,inst_32077);
var inst_32082 = cljs.core.chunk_rest.call(null,inst_32077);
var inst_32083 = cljs.core.count.call(null,inst_32081);
var inst_32060 = inst_32082;
var inst_32061 = inst_32081;
var inst_32062 = inst_32083;
var inst_32063 = (0);
var state_32215__$1 = (function (){var statearr_32303 = state_32215;
(statearr_32303[(9)] = inst_32061);

(statearr_32303[(10)] = inst_32062);

(statearr_32303[(11)] = inst_32060);

(statearr_32303[(12)] = inst_32063);

return statearr_32303;
})();
var statearr_32304_32384 = state_32215__$1;
(statearr_32304_32384[(2)] = null);

(statearr_32304_32384[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (16))){
var inst_32032 = (state_32215[(27)]);
var state_32215__$1 = state_32215;
var statearr_32305_32385 = state_32215__$1;
(statearr_32305_32385[(2)] = inst_32032);

(statearr_32305_32385[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (38))){
var inst_32135 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
if(cljs.core.truth_(inst_32135)){
var statearr_32306_32386 = state_32215__$1;
(statearr_32306_32386[(1)] = (42));

} else {
var statearr_32307_32387 = state_32215__$1;
(statearr_32307_32387[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (30))){
var inst_32110 = (state_32215[(8)]);
var inst_32112 = cljs.core.chunked_seq_QMARK_.call(null,inst_32110);
var state_32215__$1 = state_32215;
if(inst_32112){
var statearr_32308_32388 = state_32215__$1;
(statearr_32308_32388[(1)] = (33));

} else {
var statearr_32309_32389 = state_32215__$1;
(statearr_32309_32389[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (10))){
var state_32215__$1 = state_32215;
var statearr_32310_32390 = state_32215__$1;
(statearr_32310_32390[(2)] = false);

(statearr_32310_32390[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (18))){
var inst_32062 = (state_32215[(10)]);
var inst_32063 = (state_32215[(12)]);
var inst_32065 = (inst_32063 < inst_32062);
var inst_32066 = inst_32065;
var state_32215__$1 = state_32215;
if(cljs.core.truth_(inst_32066)){
var statearr_32311_32391 = state_32215__$1;
(statearr_32311_32391[(1)] = (20));

} else {
var statearr_32312_32392 = state_32215__$1;
(statearr_32312_32392[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (52))){
var inst_32186 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
var statearr_32313_32393 = state_32215__$1;
(statearr_32313_32393[(2)] = inst_32186);

(statearr_32313_32393[(1)] = (49));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (42))){
var inst_32120 = (state_32215[(30)]);
var inst_32137 = cljs.core.apply.call(null,cljs.core.hash_map,inst_32120);
var state_32215__$1 = state_32215;
var statearr_32314_32394 = state_32215__$1;
(statearr_32314_32394[(2)] = inst_32137);

(statearr_32314_32394[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (37))){
var state_32215__$1 = state_32215;
var statearr_32315_32395 = state_32215__$1;
(statearr_32315_32395[(2)] = false);

(statearr_32315_32395[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (8))){
var inst_32203 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
var statearr_32316_32396 = state_32215__$1;
(statearr_32316_32396[(2)] = inst_32203);

(statearr_32316_32396[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32216 === (49))){
var inst_32188 = (state_32215[(2)]);
var state_32215__$1 = state_32215;
var statearr_32317_32397 = state_32215__$1;
(statearr_32317_32397[(2)] = inst_32188);

(statearr_32317_32397[(1)] = (46));


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
});})(c__20534__auto___32325,update_index,_,latest_index,index,should_continue_QMARK_))
;
return ((function (switch__20513__auto__,c__20534__auto___32325,update_index,_,latest_index,index,should_continue_QMARK_){
return (function() {
var parinfer_site$gears$animate_gears_BANG__$_state_machine__20514__auto__ = null;
var parinfer_site$gears$animate_gears_BANG__$_state_machine__20514__auto____0 = (function (){
var statearr_32321 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_32321[(0)] = parinfer_site$gears$animate_gears_BANG__$_state_machine__20514__auto__);

(statearr_32321[(1)] = (1));

return statearr_32321;
});
var parinfer_site$gears$animate_gears_BANG__$_state_machine__20514__auto____1 = (function (state_32215){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_32215);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e32322){if((e32322 instanceof Object)){
var ex__20517__auto__ = e32322;
var statearr_32323_32398 = state_32215;
(statearr_32323_32398[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_32215);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e32322;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__32399 = state_32215;
state_32215 = G__32399;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
parinfer_site$gears$animate_gears_BANG__$_state_machine__20514__auto__ = function(state_32215){
switch(arguments.length){
case 0:
return parinfer_site$gears$animate_gears_BANG__$_state_machine__20514__auto____0.call(this);
case 1:
return parinfer_site$gears$animate_gears_BANG__$_state_machine__20514__auto____1.call(this,state_32215);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
parinfer_site$gears$animate_gears_BANG__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = parinfer_site$gears$animate_gears_BANG__$_state_machine__20514__auto____0;
parinfer_site$gears$animate_gears_BANG__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = parinfer_site$gears$animate_gears_BANG__$_state_machine__20514__auto____1;
return parinfer_site$gears$animate_gears_BANG__$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___32325,update_index,_,latest_index,index,should_continue_QMARK_))
})();
var state__20536__auto__ = (function (){var statearr_32324 = f__20535__auto__.call(null);
(statearr_32324[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___32325);

return statearr_32324;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___32325,update_index,_,latest_index,index,should_continue_QMARK_))
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
parinfer_site.gears.create_gears_BANG_ = (function parinfer_site$gears$create_gears_BANG_(selector,p__32400,p__32401){
var map__32418 = p__32400;
var map__32418__$1 = ((((!((map__32418 == null)))?((((map__32418.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32418.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32418):map__32418);
var init_gears = cljs.core.get.call(null,map__32418__$1,new cljs.core.Keyword(null,"init-gears","init-gears",1422313814));
var mesh_gears = cljs.core.get.call(null,map__32418__$1,new cljs.core.Keyword(null,"mesh-gears","mesh-gears",695197022));
var anim_frames = cljs.core.get.call(null,map__32418__$1,new cljs.core.Keyword(null,"anim-frames","anim-frames",2117672923));
var map__32419 = p__32401;
var map__32419__$1 = ((((!((map__32419 == null)))?((((map__32419.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32419.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32419):map__32419);
var svg_opts = map__32419__$1;
var width = cljs.core.get.call(null,map__32419__$1,new cljs.core.Keyword(null,"width","width",-384071477));
var height = cljs.core.get.call(null,map__32419__$1,new cljs.core.Keyword(null,"height","height",1025178622));
var container = d3.select(selector);
var _ = container.select("svg").remove();
var svg = container.append("svg").attr("viewbox",[cljs.core.str("0 0 "),cljs.core.str(width),cljs.core.str(" "),cljs.core.str(height)].join('')).attr("width",width).attr("height",height);
var gear_array = [];
var drag_behavior = Gear.dragBehaviour(gear_array,svg);
var gear_objs = (function (){var iter__17039__auto__ = ((function (container,_,svg,gear_array,drag_behavior,map__32418,map__32418__$1,init_gears,mesh_gears,anim_frames,map__32419,map__32419__$1,svg_opts,width,height){
return (function parinfer_site$gears$create_gears_BANG__$_iter__32422(s__32423){
return (new cljs.core.LazySeq(null,((function (container,_,svg,gear_array,drag_behavior,map__32418,map__32418__$1,init_gears,mesh_gears,anim_frames,map__32419,map__32419__$1,svg_opts,width,height){
return (function (){
var s__32423__$1 = s__32423;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__32423__$1);
if(temp__4425__auto__){
var s__32423__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__32423__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__32423__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__32425 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__32424 = (0);
while(true){
if((i__32424 < size__17038__auto__)){
var vec__32428 = cljs.core._nth.call(null,c__17037__auto__,i__32424);
var name_ = cljs.core.nth.call(null,vec__32428,(0),null);
var opts = cljs.core.nth.call(null,vec__32428,(1),null);
cljs.core.chunk_append.call(null,b__32425,parinfer_site.gears.make_gear.call(null,svg,drag_behavior,cljs.core.merge.call(null,parinfer_site.gears.default_options,opts)));

var G__32434 = (i__32424 + (1));
i__32424 = G__32434;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__32425),parinfer_site$gears$create_gears_BANG__$_iter__32422.call(null,cljs.core.chunk_rest.call(null,s__32423__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__32425),null);
}
} else {
var vec__32429 = cljs.core.first.call(null,s__32423__$2);
var name_ = cljs.core.nth.call(null,vec__32429,(0),null);
var opts = cljs.core.nth.call(null,vec__32429,(1),null);
return cljs.core.cons.call(null,parinfer_site.gears.make_gear.call(null,svg,drag_behavior,cljs.core.merge.call(null,parinfer_site.gears.default_options,opts)),parinfer_site$gears$create_gears_BANG__$_iter__32422.call(null,cljs.core.rest.call(null,s__32423__$2)));
}
} else {
return null;
}
break;
}
});})(container,_,svg,gear_array,drag_behavior,map__32418,map__32418__$1,init_gears,mesh_gears,anim_frames,map__32419,map__32419__$1,svg_opts,width,height))
,null,null));
});})(container,_,svg,gear_array,drag_behavior,map__32418,map__32418__$1,init_gears,mesh_gears,anim_frames,map__32419,map__32419__$1,svg_opts,width,height))
;
return iter__17039__auto__.call(null,init_gears);
})();
var gear_map = cljs.core.zipmap.call(null,cljs.core.keys.call(null,init_gears),gear_objs);
var seq__32430_32435 = cljs.core.seq.call(null,gear_objs);
var chunk__32431_32436 = null;
var count__32432_32437 = (0);
var i__32433_32438 = (0);
while(true){
if((i__32433_32438 < count__32432_32437)){
var g_32439 = cljs.core._nth.call(null,chunk__32431_32436,i__32433_32438);
gear_array.push(g_32439);

var G__32440 = seq__32430_32435;
var G__32441 = chunk__32431_32436;
var G__32442 = count__32432_32437;
var G__32443 = (i__32433_32438 + (1));
seq__32430_32435 = G__32440;
chunk__32431_32436 = G__32441;
count__32432_32437 = G__32442;
i__32433_32438 = G__32443;
continue;
} else {
var temp__4425__auto___32444 = cljs.core.seq.call(null,seq__32430_32435);
if(temp__4425__auto___32444){
var seq__32430_32445__$1 = temp__4425__auto___32444;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__32430_32445__$1)){
var c__17070__auto___32446 = cljs.core.chunk_first.call(null,seq__32430_32445__$1);
var G__32447 = cljs.core.chunk_rest.call(null,seq__32430_32445__$1);
var G__32448 = c__17070__auto___32446;
var G__32449 = cljs.core.count.call(null,c__17070__auto___32446);
var G__32450 = (0);
seq__32430_32435 = G__32447;
chunk__32431_32436 = G__32448;
count__32432_32437 = G__32449;
i__32433_32438 = G__32450;
continue;
} else {
var g_32451 = cljs.core.first.call(null,seq__32430_32445__$1);
gear_array.push(g_32451);

var G__32452 = cljs.core.next.call(null,seq__32430_32445__$1);
var G__32453 = null;
var G__32454 = (0);
var G__32455 = (0);
seq__32430_32435 = G__32452;
chunk__32431_32436 = G__32453;
count__32432_32437 = G__32454;
i__32433_32438 = G__32455;
continue;
}
} else {
}
}
break;
}

return parinfer_site.gears.animate_gears_BANG_.call(null,svg,selector,gear_map,gear_array,anim_frames);
});

//# sourceMappingURL=gears.js.map?rel=1449460870655