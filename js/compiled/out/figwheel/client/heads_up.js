// Compiled by ClojureScript 1.7.122 {}
goog.provide('figwheel.client.heads_up');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('figwheel.client.socket');
goog.require('cljs.core.async');
goog.require('goog.string');
figwheel.client.heads_up.clear;

figwheel.client.heads_up.cljs_logo_svg;
figwheel.client.heads_up.node = (function figwheel$client$heads_up$node(var_args){
var args__17332__auto__ = [];
var len__17325__auto___39431 = arguments.length;
var i__17326__auto___39432 = (0);
while(true){
if((i__17326__auto___39432 < len__17325__auto___39431)){
args__17332__auto__.push((arguments[i__17326__auto___39432]));

var G__39433 = (i__17326__auto___39432 + (1));
i__17326__auto___39432 = G__39433;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((2) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((2)),(0))):null);
return figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__17333__auto__);
});

figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic = (function (t,attrs,children){
var e = document.createElement(cljs.core.name.call(null,t));
var seq__39423_39434 = cljs.core.seq.call(null,cljs.core.keys.call(null,attrs));
var chunk__39424_39435 = null;
var count__39425_39436 = (0);
var i__39426_39437 = (0);
while(true){
if((i__39426_39437 < count__39425_39436)){
var k_39438 = cljs.core._nth.call(null,chunk__39424_39435,i__39426_39437);
e.setAttribute(cljs.core.name.call(null,k_39438),cljs.core.get.call(null,attrs,k_39438));

var G__39439 = seq__39423_39434;
var G__39440 = chunk__39424_39435;
var G__39441 = count__39425_39436;
var G__39442 = (i__39426_39437 + (1));
seq__39423_39434 = G__39439;
chunk__39424_39435 = G__39440;
count__39425_39436 = G__39441;
i__39426_39437 = G__39442;
continue;
} else {
var temp__4425__auto___39443 = cljs.core.seq.call(null,seq__39423_39434);
if(temp__4425__auto___39443){
var seq__39423_39444__$1 = temp__4425__auto___39443;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39423_39444__$1)){
var c__17070__auto___39445 = cljs.core.chunk_first.call(null,seq__39423_39444__$1);
var G__39446 = cljs.core.chunk_rest.call(null,seq__39423_39444__$1);
var G__39447 = c__17070__auto___39445;
var G__39448 = cljs.core.count.call(null,c__17070__auto___39445);
var G__39449 = (0);
seq__39423_39434 = G__39446;
chunk__39424_39435 = G__39447;
count__39425_39436 = G__39448;
i__39426_39437 = G__39449;
continue;
} else {
var k_39450 = cljs.core.first.call(null,seq__39423_39444__$1);
e.setAttribute(cljs.core.name.call(null,k_39450),cljs.core.get.call(null,attrs,k_39450));

var G__39451 = cljs.core.next.call(null,seq__39423_39444__$1);
var G__39452 = null;
var G__39453 = (0);
var G__39454 = (0);
seq__39423_39434 = G__39451;
chunk__39424_39435 = G__39452;
count__39425_39436 = G__39453;
i__39426_39437 = G__39454;
continue;
}
} else {
}
}
break;
}

var seq__39427_39455 = cljs.core.seq.call(null,children);
var chunk__39428_39456 = null;
var count__39429_39457 = (0);
var i__39430_39458 = (0);
while(true){
if((i__39430_39458 < count__39429_39457)){
var ch_39459 = cljs.core._nth.call(null,chunk__39428_39456,i__39430_39458);
e.appendChild(ch_39459);

var G__39460 = seq__39427_39455;
var G__39461 = chunk__39428_39456;
var G__39462 = count__39429_39457;
var G__39463 = (i__39430_39458 + (1));
seq__39427_39455 = G__39460;
chunk__39428_39456 = G__39461;
count__39429_39457 = G__39462;
i__39430_39458 = G__39463;
continue;
} else {
var temp__4425__auto___39464 = cljs.core.seq.call(null,seq__39427_39455);
if(temp__4425__auto___39464){
var seq__39427_39465__$1 = temp__4425__auto___39464;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39427_39465__$1)){
var c__17070__auto___39466 = cljs.core.chunk_first.call(null,seq__39427_39465__$1);
var G__39467 = cljs.core.chunk_rest.call(null,seq__39427_39465__$1);
var G__39468 = c__17070__auto___39466;
var G__39469 = cljs.core.count.call(null,c__17070__auto___39466);
var G__39470 = (0);
seq__39427_39455 = G__39467;
chunk__39428_39456 = G__39468;
count__39429_39457 = G__39469;
i__39430_39458 = G__39470;
continue;
} else {
var ch_39471 = cljs.core.first.call(null,seq__39427_39465__$1);
e.appendChild(ch_39471);

var G__39472 = cljs.core.next.call(null,seq__39427_39465__$1);
var G__39473 = null;
var G__39474 = (0);
var G__39475 = (0);
seq__39427_39455 = G__39472;
chunk__39428_39456 = G__39473;
count__39429_39457 = G__39474;
i__39430_39458 = G__39475;
continue;
}
} else {
}
}
break;
}

return e;
});

figwheel.client.heads_up.node.cljs$lang$maxFixedArity = (2);

figwheel.client.heads_up.node.cljs$lang$applyTo = (function (seq39420){
var G__39421 = cljs.core.first.call(null,seq39420);
var seq39420__$1 = cljs.core.next.call(null,seq39420);
var G__39422 = cljs.core.first.call(null,seq39420__$1);
var seq39420__$2 = cljs.core.next.call(null,seq39420__$1);
return figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic(G__39421,G__39422,seq39420__$2);
});
if(typeof figwheel.client.heads_up.heads_up_event_dispatch !== 'undefined'){
} else {
figwheel.client.heads_up.heads_up_event_dispatch = (function (){var method_table__17180__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__17181__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__17182__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__17183__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__17184__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"figwheel.client.heads-up","heads-up-event-dispatch"),((function (method_table__17180__auto__,prefer_table__17181__auto__,method_cache__17182__auto__,cached_hierarchy__17183__auto__,hierarchy__17184__auto__){
return (function (dataset){
return dataset.figwheelEvent;
});})(method_table__17180__auto__,prefer_table__17181__auto__,method_cache__17182__auto__,cached_hierarchy__17183__auto__,hierarchy__17184__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__17184__auto__,method_table__17180__auto__,prefer_table__17181__auto__,method_cache__17182__auto__,cached_hierarchy__17183__auto__));
})();
}
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,new cljs.core.Keyword(null,"default","default",-1987822328),(function (_){
return cljs.core.PersistentArrayMap.EMPTY;
}));
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,"file-selected",(function (dataset){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"file-selected",new cljs.core.Keyword(null,"file-name","file-name",-1654217259),dataset.fileName,new cljs.core.Keyword(null,"file-line","file-line",-1228823138),dataset.fileLine], null));
}));
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,"close-heads-up",(function (dataset){
return figwheel.client.heads_up.clear.call(null);
}));
figwheel.client.heads_up.ancestor_nodes = (function figwheel$client$heads_up$ancestor_nodes(el){
return cljs.core.iterate.call(null,(function (e){
return e.parentNode;
}),el);
});
figwheel.client.heads_up.get_dataset = (function figwheel$client$heads_up$get_dataset(el){
return cljs.core.first.call(null,cljs.core.keep.call(null,(function (x){
if(cljs.core.truth_(x.dataset.figwheelEvent)){
return x.dataset;
} else {
return null;
}
}),cljs.core.take.call(null,(4),figwheel.client.heads_up.ancestor_nodes.call(null,el))));
});
figwheel.client.heads_up.heads_up_onclick_handler = (function figwheel$client$heads_up$heads_up_onclick_handler(event){
var dataset = figwheel.client.heads_up.get_dataset.call(null,event.target);
event.preventDefault();

if(cljs.core.truth_(dataset)){
return figwheel.client.heads_up.heads_up_event_dispatch.call(null,dataset);
} else {
return null;
}
});
figwheel.client.heads_up.ensure_container = (function figwheel$client$heads_up$ensure_container(){
var cont_id = "figwheel-heads-up-container";
var content_id = "figwheel-heads-up-content-area";
if(cljs.core.not.call(null,document.querySelector([cljs.core.str("#"),cljs.core.str(cont_id)].join('')))){
var el_39476 = figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),cont_id,new cljs.core.Keyword(null,"style","style",-496642736),[cljs.core.str("-webkit-transition: all 0.2s ease-in-out;"),cljs.core.str("-moz-transition: all 0.2s ease-in-out;"),cljs.core.str("-o-transition: all 0.2s ease-in-out;"),cljs.core.str("transition: all 0.2s ease-in-out;"),cljs.core.str("font-size: 13px;"),cljs.core.str("border-top: 1px solid #f5f5f5;"),cljs.core.str("box-shadow: 0px 0px 1px #aaaaaa;"),cljs.core.str("line-height: 18px;"),cljs.core.str("color: #333;"),cljs.core.str("font-family: monospace;"),cljs.core.str("padding: 0px 10px 0px 70px;"),cljs.core.str("position: fixed;"),cljs.core.str("bottom: 0px;"),cljs.core.str("left: 0px;"),cljs.core.str("height: 0px;"),cljs.core.str("opacity: 0.0;"),cljs.core.str("box-sizing: border-box;"),cljs.core.str("z-index: 10000;")].join('')], null));
el_39476.onclick = figwheel.client.heads_up.heads_up_onclick_handler;

el_39476.innerHTML = figwheel.client.heads_up.cljs_logo_svg;

el_39476.appendChild(figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),content_id], null)));

document.body.appendChild(el_39476);
} else {
}

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"container-el","container-el",109664205),document.getElementById(cont_id),new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187),document.getElementById(content_id)], null);
});
figwheel.client.heads_up.set_style_BANG_ = (function figwheel$client$heads_up$set_style_BANG_(p__39477,st_map){
var map__39482 = p__39477;
var map__39482__$1 = ((((!((map__39482 == null)))?((((map__39482.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39482.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39482):map__39482);
var container_el = cljs.core.get.call(null,map__39482__$1,new cljs.core.Keyword(null,"container-el","container-el",109664205));
return cljs.core.mapv.call(null,((function (map__39482,map__39482__$1,container_el){
return (function (p__39484){
var vec__39485 = p__39484;
var k = cljs.core.nth.call(null,vec__39485,(0),null);
var v = cljs.core.nth.call(null,vec__39485,(1),null);
return (container_el.style[cljs.core.name.call(null,k)] = v);
});})(map__39482,map__39482__$1,container_el))
,st_map);
});
figwheel.client.heads_up.set_content_BANG_ = (function figwheel$client$heads_up$set_content_BANG_(p__39486,dom_str){
var map__39489 = p__39486;
var map__39489__$1 = ((((!((map__39489 == null)))?((((map__39489.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39489.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39489):map__39489);
var c = map__39489__$1;
var content_area_el = cljs.core.get.call(null,map__39489__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
return content_area_el.innerHTML = dom_str;
});
figwheel.client.heads_up.get_content = (function figwheel$client$heads_up$get_content(p__39491){
var map__39494 = p__39491;
var map__39494__$1 = ((((!((map__39494 == null)))?((((map__39494.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39494.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39494):map__39494);
var content_area_el = cljs.core.get.call(null,map__39494__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
return content_area_el.innerHTML;
});
figwheel.client.heads_up.close_link = (function figwheel$client$heads_up$close_link(){
return [cljs.core.str("<a style=\""),cljs.core.str("float: right;"),cljs.core.str("font-size: 18px;"),cljs.core.str("text-decoration: none;"),cljs.core.str("text-align: right;"),cljs.core.str("width: 30px;"),cljs.core.str("height: 30px;"),cljs.core.str("color: rgba(84,84,84, 0.5);"),cljs.core.str("\" href=\"#\"  data-figwheel-event=\"close-heads-up\">"),cljs.core.str("x"),cljs.core.str("</a>")].join('');
});
figwheel.client.heads_up.display_heads_up = (function figwheel$client$heads_up$display_heads_up(style,msg){
var c__20534__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto__){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto__){
return (function (state_39537){
var state_val_39538 = (state_39537[(1)]);
if((state_val_39538 === (1))){
var inst_39522 = (state_39537[(7)]);
var inst_39522__$1 = figwheel.client.heads_up.ensure_container.call(null);
var inst_39523 = [new cljs.core.Keyword(null,"paddingTop","paddingTop",-1088692345),new cljs.core.Keyword(null,"paddingBottom","paddingBottom",-916694489),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"opacity","opacity",397153780)];
var inst_39524 = ["10px","10px","100%","68px","1.0"];
var inst_39525 = cljs.core.PersistentHashMap.fromArrays(inst_39523,inst_39524);
var inst_39526 = cljs.core.merge.call(null,inst_39525,style);
var inst_39527 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_39522__$1,inst_39526);
var inst_39528 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_39522__$1,msg);
var inst_39529 = cljs.core.async.timeout.call(null,(300));
var state_39537__$1 = (function (){var statearr_39539 = state_39537;
(statearr_39539[(7)] = inst_39522__$1);

(statearr_39539[(8)] = inst_39527);

(statearr_39539[(9)] = inst_39528);

return statearr_39539;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39537__$1,(2),inst_39529);
} else {
if((state_val_39538 === (2))){
var inst_39522 = (state_39537[(7)]);
var inst_39531 = (state_39537[(2)]);
var inst_39532 = [new cljs.core.Keyword(null,"height","height",1025178622)];
var inst_39533 = ["auto"];
var inst_39534 = cljs.core.PersistentHashMap.fromArrays(inst_39532,inst_39533);
var inst_39535 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_39522,inst_39534);
var state_39537__$1 = (function (){var statearr_39540 = state_39537;
(statearr_39540[(10)] = inst_39531);

return statearr_39540;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_39537__$1,inst_39535);
} else {
return null;
}
}
});})(c__20534__auto__))
;
return ((function (switch__20513__auto__,c__20534__auto__){
return (function() {
var figwheel$client$heads_up$display_heads_up_$_state_machine__20514__auto__ = null;
var figwheel$client$heads_up$display_heads_up_$_state_machine__20514__auto____0 = (function (){
var statearr_39544 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_39544[(0)] = figwheel$client$heads_up$display_heads_up_$_state_machine__20514__auto__);

(statearr_39544[(1)] = (1));

return statearr_39544;
});
var figwheel$client$heads_up$display_heads_up_$_state_machine__20514__auto____1 = (function (state_39537){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_39537);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e39545){if((e39545 instanceof Object)){
var ex__20517__auto__ = e39545;
var statearr_39546_39548 = state_39537;
(statearr_39546_39548[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_39537);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e39545;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39549 = state_39537;
state_39537 = G__39549;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
figwheel$client$heads_up$display_heads_up_$_state_machine__20514__auto__ = function(state_39537){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$display_heads_up_$_state_machine__20514__auto____0.call(this);
case 1:
return figwheel$client$heads_up$display_heads_up_$_state_machine__20514__auto____1.call(this,state_39537);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$display_heads_up_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$display_heads_up_$_state_machine__20514__auto____0;
figwheel$client$heads_up$display_heads_up_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$display_heads_up_$_state_machine__20514__auto____1;
return figwheel$client$heads_up$display_heads_up_$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto__))
})();
var state__20536__auto__ = (function (){var statearr_39547 = f__20535__auto__.call(null);
(statearr_39547[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto__);

return statearr_39547;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto__))
);

return c__20534__auto__;
});
figwheel.client.heads_up.heading = (function figwheel$client$heads_up$heading(s){
return [cljs.core.str("<div style=\""),cljs.core.str("font-size: 26px;"),cljs.core.str("line-height: 26px;"),cljs.core.str("margin-bottom: 2px;"),cljs.core.str("padding-top: 1px;"),cljs.core.str("\">"),cljs.core.str(s),cljs.core.str("</div>")].join('');
});
figwheel.client.heads_up.file_and_line_number = (function figwheel$client$heads_up$file_and_line_number(msg){
if(cljs.core.truth_(cljs.core.re_matches.call(null,/.*at\sline.*/,msg))){
return cljs.core.take.call(null,(2),cljs.core.reverse.call(null,clojure.string.split.call(null,msg," ")));
} else {
return null;
}
});
figwheel.client.heads_up.file_selector_div = (function figwheel$client$heads_up$file_selector_div(file_name,line_number,msg){
return [cljs.core.str("<div data-figwheel-event=\"file-selected\" data-file-name=\""),cljs.core.str(file_name),cljs.core.str("\" data-file-line=\""),cljs.core.str(line_number),cljs.core.str("\">"),cljs.core.str(msg),cljs.core.str("</div>")].join('');
});
figwheel.client.heads_up.format_line = (function figwheel$client$heads_up$format_line(msg){
var msg__$1 = goog.string.htmlEscape(msg);
var temp__4423__auto__ = figwheel.client.heads_up.file_and_line_number.call(null,msg__$1);
if(cljs.core.truth_(temp__4423__auto__)){
var vec__39551 = temp__4423__auto__;
var f = cljs.core.nth.call(null,vec__39551,(0),null);
var ln = cljs.core.nth.call(null,vec__39551,(1),null);
return figwheel.client.heads_up.file_selector_div.call(null,f,ln,msg__$1);
} else {
return [cljs.core.str("<div>"),cljs.core.str(msg__$1),cljs.core.str("</div>")].join('');
}
});
figwheel.client.heads_up.display_error = (function figwheel$client$heads_up$display_error(formatted_messages,cause){
var vec__39554 = (cljs.core.truth_(cause)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cause),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause),new cljs.core.Keyword(null,"column","column",2078222095).cljs$core$IFn$_invoke$arity$1(cause)], null):cljs.core.first.call(null,cljs.core.keep.call(null,figwheel.client.heads_up.file_and_line_number,formatted_messages)));
var file_name = cljs.core.nth.call(null,vec__39554,(0),null);
var file_line = cljs.core.nth.call(null,vec__39554,(1),null);
var file_column = cljs.core.nth.call(null,vec__39554,(2),null);
var msg = cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,((function (vec__39554,file_name,file_line,file_column){
return (function (p1__39552_SHARP_){
return [cljs.core.str("<div>"),cljs.core.str(goog.string.htmlEscape(p1__39552_SHARP_)),cljs.core.str("</div>")].join('');
});})(vec__39554,file_name,file_line,file_column))
,formatted_messages));
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(255, 161, 161, 0.95)"], null),[cljs.core.str(figwheel.client.heads_up.close_link.call(null)),cljs.core.str(figwheel.client.heads_up.heading.call(null,"Compile Error")),cljs.core.str(figwheel.client.heads_up.file_selector_div.call(null,file_name,(function (){var or__16267__auto__ = file_line;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
var and__16255__auto__ = cause;
if(cljs.core.truth_(and__16255__auto__)){
return new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause);
} else {
return and__16255__auto__;
}
}
})(),[cljs.core.str(msg),cljs.core.str((cljs.core.truth_(cause)?[cljs.core.str("Error on file "),cljs.core.str(goog.string.htmlEscape(new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cause))),cljs.core.str(", line "),cljs.core.str(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause)),cljs.core.str(", column "),cljs.core.str(new cljs.core.Keyword(null,"column","column",2078222095).cljs$core$IFn$_invoke$arity$1(cause))].join(''):""))].join('')))].join(''));
});
figwheel.client.heads_up.display_system_warning = (function figwheel$client$heads_up$display_system_warning(header,msg){
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(255, 220, 110, 0.95)"], null),[cljs.core.str(figwheel.client.heads_up.close_link.call(null)),cljs.core.str(figwheel.client.heads_up.heading.call(null,header)),cljs.core.str(figwheel.client.heads_up.format_line.call(null,msg))].join(''));
});
figwheel.client.heads_up.display_warning = (function figwheel$client$heads_up$display_warning(msg){
return figwheel.client.heads_up.display_system_warning.call(null,"Compile Warning",msg);
});
figwheel.client.heads_up.append_message = (function figwheel$client$heads_up$append_message(message){
var map__39557 = figwheel.client.heads_up.ensure_container.call(null);
var map__39557__$1 = ((((!((map__39557 == null)))?((((map__39557.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39557.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39557):map__39557);
var content_area_el = cljs.core.get.call(null,map__39557__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
var el = document.createElement("div");
el.innerHTML = figwheel.client.heads_up.format_line.call(null,message);

return content_area_el.appendChild(el);
});
figwheel.client.heads_up.clear = (function figwheel$client$heads_up$clear(){
var c__20534__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto__){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto__){
return (function (state_39605){
var state_val_39606 = (state_39605[(1)]);
if((state_val_39606 === (1))){
var inst_39588 = (state_39605[(7)]);
var inst_39588__$1 = figwheel.client.heads_up.ensure_container.call(null);
var inst_39589 = [new cljs.core.Keyword(null,"opacity","opacity",397153780)];
var inst_39590 = ["0.0"];
var inst_39591 = cljs.core.PersistentHashMap.fromArrays(inst_39589,inst_39590);
var inst_39592 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_39588__$1,inst_39591);
var inst_39593 = cljs.core.async.timeout.call(null,(300));
var state_39605__$1 = (function (){var statearr_39607 = state_39605;
(statearr_39607[(8)] = inst_39592);

(statearr_39607[(7)] = inst_39588__$1);

return statearr_39607;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39605__$1,(2),inst_39593);
} else {
if((state_val_39606 === (2))){
var inst_39588 = (state_39605[(7)]);
var inst_39595 = (state_39605[(2)]);
var inst_39596 = [new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491)];
var inst_39597 = ["auto","0px","0px","0px 10px 0px 70px","0px","transparent"];
var inst_39598 = cljs.core.PersistentHashMap.fromArrays(inst_39596,inst_39597);
var inst_39599 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_39588,inst_39598);
var inst_39600 = cljs.core.async.timeout.call(null,(200));
var state_39605__$1 = (function (){var statearr_39608 = state_39605;
(statearr_39608[(9)] = inst_39599);

(statearr_39608[(10)] = inst_39595);

return statearr_39608;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39605__$1,(3),inst_39600);
} else {
if((state_val_39606 === (3))){
var inst_39588 = (state_39605[(7)]);
var inst_39602 = (state_39605[(2)]);
var inst_39603 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_39588,"");
var state_39605__$1 = (function (){var statearr_39609 = state_39605;
(statearr_39609[(11)] = inst_39602);

return statearr_39609;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_39605__$1,inst_39603);
} else {
return null;
}
}
}
});})(c__20534__auto__))
;
return ((function (switch__20513__auto__,c__20534__auto__){
return (function() {
var figwheel$client$heads_up$clear_$_state_machine__20514__auto__ = null;
var figwheel$client$heads_up$clear_$_state_machine__20514__auto____0 = (function (){
var statearr_39613 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_39613[(0)] = figwheel$client$heads_up$clear_$_state_machine__20514__auto__);

(statearr_39613[(1)] = (1));

return statearr_39613;
});
var figwheel$client$heads_up$clear_$_state_machine__20514__auto____1 = (function (state_39605){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_39605);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e39614){if((e39614 instanceof Object)){
var ex__20517__auto__ = e39614;
var statearr_39615_39617 = state_39605;
(statearr_39615_39617[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_39605);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e39614;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39618 = state_39605;
state_39605 = G__39618;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
figwheel$client$heads_up$clear_$_state_machine__20514__auto__ = function(state_39605){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$clear_$_state_machine__20514__auto____0.call(this);
case 1:
return figwheel$client$heads_up$clear_$_state_machine__20514__auto____1.call(this,state_39605);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$clear_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$clear_$_state_machine__20514__auto____0;
figwheel$client$heads_up$clear_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$clear_$_state_machine__20514__auto____1;
return figwheel$client$heads_up$clear_$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto__))
})();
var state__20536__auto__ = (function (){var statearr_39616 = f__20535__auto__.call(null);
(statearr_39616[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto__);

return statearr_39616;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto__))
);

return c__20534__auto__;
});
figwheel.client.heads_up.display_loaded_start = (function figwheel$client$heads_up$display_loaded_start(){
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(211,234,172,1.0)",new cljs.core.Keyword(null,"width","width",-384071477),"68px",new cljs.core.Keyword(null,"height","height",1025178622),"68px",new cljs.core.Keyword(null,"paddingLeft","paddingLeft",262720813),"0px",new cljs.core.Keyword(null,"paddingRight","paddingRight",-1642313463),"0px",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"35px"], null),"");
});
figwheel.client.heads_up.flash_loaded = (function figwheel$client$heads_up$flash_loaded(){
var c__20534__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto__){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto__){
return (function (state_39650){
var state_val_39651 = (state_39650[(1)]);
if((state_val_39651 === (1))){
var inst_39640 = figwheel.client.heads_up.display_loaded_start.call(null);
var state_39650__$1 = state_39650;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39650__$1,(2),inst_39640);
} else {
if((state_val_39651 === (2))){
var inst_39642 = (state_39650[(2)]);
var inst_39643 = cljs.core.async.timeout.call(null,(400));
var state_39650__$1 = (function (){var statearr_39652 = state_39650;
(statearr_39652[(7)] = inst_39642);

return statearr_39652;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39650__$1,(3),inst_39643);
} else {
if((state_val_39651 === (3))){
var inst_39645 = (state_39650[(2)]);
var inst_39646 = figwheel.client.heads_up.clear.call(null);
var state_39650__$1 = (function (){var statearr_39653 = state_39650;
(statearr_39653[(8)] = inst_39645);

return statearr_39653;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39650__$1,(4),inst_39646);
} else {
if((state_val_39651 === (4))){
var inst_39648 = (state_39650[(2)]);
var state_39650__$1 = state_39650;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_39650__$1,inst_39648);
} else {
return null;
}
}
}
}
});})(c__20534__auto__))
;
return ((function (switch__20513__auto__,c__20534__auto__){
return (function() {
var figwheel$client$heads_up$flash_loaded_$_state_machine__20514__auto__ = null;
var figwheel$client$heads_up$flash_loaded_$_state_machine__20514__auto____0 = (function (){
var statearr_39657 = [null,null,null,null,null,null,null,null,null];
(statearr_39657[(0)] = figwheel$client$heads_up$flash_loaded_$_state_machine__20514__auto__);

(statearr_39657[(1)] = (1));

return statearr_39657;
});
var figwheel$client$heads_up$flash_loaded_$_state_machine__20514__auto____1 = (function (state_39650){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_39650);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e39658){if((e39658 instanceof Object)){
var ex__20517__auto__ = e39658;
var statearr_39659_39661 = state_39650;
(statearr_39659_39661[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_39650);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e39658;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39662 = state_39650;
state_39650 = G__39662;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
figwheel$client$heads_up$flash_loaded_$_state_machine__20514__auto__ = function(state_39650){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$flash_loaded_$_state_machine__20514__auto____0.call(this);
case 1:
return figwheel$client$heads_up$flash_loaded_$_state_machine__20514__auto____1.call(this,state_39650);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$flash_loaded_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$flash_loaded_$_state_machine__20514__auto____0;
figwheel$client$heads_up$flash_loaded_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$flash_loaded_$_state_machine__20514__auto____1;
return figwheel$client$heads_up$flash_loaded_$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto__))
})();
var state__20536__auto__ = (function (){var statearr_39660 = f__20535__auto__.call(null);
(statearr_39660[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto__);

return statearr_39660;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto__))
);

return c__20534__auto__;
});
figwheel.client.heads_up.cljs_logo_svg = "<?xml version='1.0' encoding='utf-8'?>\n<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>\n<svg width='49px' height='49px' style='position:absolute; top:9px; left: 10px;' version='1.1'\n  xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'\n  viewBox='0 0 428 428' enable-background='new 0 0 428 428' xml:space='preserve'>\n<circle fill='#fff' cx='213' cy='214' r='213' />\n<g>\n<path fill='#96CA4B' d='M122,266.6c-12.7,0-22.3-3.7-28.9-11.1c-6.6-7.4-9.9-18-9.9-31.8c0-14.1,3.4-24.9,10.3-32.5\n  s16.8-11.4,29.9-11.4c8.8,0,16.8,1.6,23.8,4.9l-5.4,14.3c-7.5-2.9-13.7-4.4-18.6-4.4c-14.5,0-21.7,9.6-21.7,28.8\n  c0,9.4,1.8,16.4,5.4,21.2c3.6,4.7,8.9,7.1,15.9,7.1c7.9,0,15.4-2,22.5-5.9v15.5c-3.2,1.9-6.6,3.2-10.2,4\n  C131.5,266.2,127.1,266.6,122,266.6z'/>\n<path fill='#96CA4B' d='M194.4,265.1h-17.8V147.3h17.8V265.1z'/>\n<path fill='#5F7FBF' d='M222.9,302.3c-5.3,0-9.8-0.6-13.3-1.9v-14.1c3.4,0.9,6.9,1.4,10.5,1.4c7.6,0,11.4-4.3,11.4-12.9v-93.5h17.8\n  v94.7c0,8.6-2.3,15.2-6.8,19.6C237.9,300.1,231.4,302.3,222.9,302.3z M230.4,159.2c0-3.2,0.9-5.6,2.6-7.3c1.7-1.7,4.2-2.6,7.5-2.6\n  c3.1,0,5.6,0.9,7.3,2.6c1.7,1.7,2.6,4.2,2.6,7.3c0,3-0.9,5.4-2.6,7.2c-1.7,1.7-4.2,2.6-7.3,2.6c-3.2,0-5.7-0.9-7.5-2.6\n  C231.2,164.6,230.4,162.2,230.4,159.2z'/>\n<path fill='#5F7FBF' d='M342.5,241.3c0,8.2-3,14.4-8.9,18.8c-6,4.4-14.5,6.5-25.6,6.5c-11.2,0-20.1-1.7-26.9-5.1v-15.4\n  c9.8,4.5,19,6.8,27.5,6.8c10.9,0,16.4-3.3,16.4-9.9c0-2.1-0.6-3.9-1.8-5.3c-1.2-1.4-3.2-2.9-6-4.4c-2.8-1.5-6.6-3.2-11.6-5.1\n  c-9.6-3.7-16.2-7.5-19.6-11.2c-3.4-3.7-5.1-8.6-5.1-14.5c0-7.2,2.9-12.7,8.7-16.7c5.8-4,13.6-5.9,23.6-5.9c9.8,0,19.1,2,27.9,6\n  l-5.8,13.4c-9-3.7-16.6-5.6-22.8-5.6c-9.4,0-14.1,2.7-14.1,8c0,2.6,1.2,4.8,3.7,6.7c2.4,1.8,7.8,4.3,16,7.5\n  c6.9,2.7,11.9,5.1,15.1,7.3c3.1,2.2,5.4,4.8,7,7.7C341.7,233.7,342.5,237.2,342.5,241.3z'/>\n</g>\n<path fill='#96CA4B' stroke='#96CA4B' stroke-width='6' stroke-miterlimit='10' d='M197,392.7c-91.2-8.1-163-85-163-178.3\n  S105.8,44.3,197,36.2V16.1c-102.3,8.2-183,94-183,198.4s80.7,190.2,183,198.4V392.7z'/>\n<path fill='#5F7FBF' stroke='#5F7FBF' stroke-width='6' stroke-miterlimit='10' d='M229,16.1v20.1c91.2,8.1,163,85,163,178.3\n  s-71.8,170.2-163,178.3v20.1c102.3-8.2,183-94,183-198.4S331.3,24.3,229,16.1z'/>\n</svg>";

//# sourceMappingURL=heads_up.js.map?rel=1449460878868