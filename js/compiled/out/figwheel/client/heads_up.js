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
var len__17325__auto___29099 = arguments.length;
var i__17326__auto___29100 = (0);
while(true){
if((i__17326__auto___29100 < len__17325__auto___29099)){
args__17332__auto__.push((arguments[i__17326__auto___29100]));

var G__29101 = (i__17326__auto___29100 + (1));
i__17326__auto___29100 = G__29101;
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
var seq__29091_29102 = cljs.core.seq.call(null,cljs.core.keys.call(null,attrs));
var chunk__29092_29103 = null;
var count__29093_29104 = (0);
var i__29094_29105 = (0);
while(true){
if((i__29094_29105 < count__29093_29104)){
var k_29106 = cljs.core._nth.call(null,chunk__29092_29103,i__29094_29105);
e.setAttribute(cljs.core.name.call(null,k_29106),cljs.core.get.call(null,attrs,k_29106));

var G__29107 = seq__29091_29102;
var G__29108 = chunk__29092_29103;
var G__29109 = count__29093_29104;
var G__29110 = (i__29094_29105 + (1));
seq__29091_29102 = G__29107;
chunk__29092_29103 = G__29108;
count__29093_29104 = G__29109;
i__29094_29105 = G__29110;
continue;
} else {
var temp__4425__auto___29111 = cljs.core.seq.call(null,seq__29091_29102);
if(temp__4425__auto___29111){
var seq__29091_29112__$1 = temp__4425__auto___29111;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29091_29112__$1)){
var c__17070__auto___29113 = cljs.core.chunk_first.call(null,seq__29091_29112__$1);
var G__29114 = cljs.core.chunk_rest.call(null,seq__29091_29112__$1);
var G__29115 = c__17070__auto___29113;
var G__29116 = cljs.core.count.call(null,c__17070__auto___29113);
var G__29117 = (0);
seq__29091_29102 = G__29114;
chunk__29092_29103 = G__29115;
count__29093_29104 = G__29116;
i__29094_29105 = G__29117;
continue;
} else {
var k_29118 = cljs.core.first.call(null,seq__29091_29112__$1);
e.setAttribute(cljs.core.name.call(null,k_29118),cljs.core.get.call(null,attrs,k_29118));

var G__29119 = cljs.core.next.call(null,seq__29091_29112__$1);
var G__29120 = null;
var G__29121 = (0);
var G__29122 = (0);
seq__29091_29102 = G__29119;
chunk__29092_29103 = G__29120;
count__29093_29104 = G__29121;
i__29094_29105 = G__29122;
continue;
}
} else {
}
}
break;
}

var seq__29095_29123 = cljs.core.seq.call(null,children);
var chunk__29096_29124 = null;
var count__29097_29125 = (0);
var i__29098_29126 = (0);
while(true){
if((i__29098_29126 < count__29097_29125)){
var ch_29127 = cljs.core._nth.call(null,chunk__29096_29124,i__29098_29126);
e.appendChild(ch_29127);

var G__29128 = seq__29095_29123;
var G__29129 = chunk__29096_29124;
var G__29130 = count__29097_29125;
var G__29131 = (i__29098_29126 + (1));
seq__29095_29123 = G__29128;
chunk__29096_29124 = G__29129;
count__29097_29125 = G__29130;
i__29098_29126 = G__29131;
continue;
} else {
var temp__4425__auto___29132 = cljs.core.seq.call(null,seq__29095_29123);
if(temp__4425__auto___29132){
var seq__29095_29133__$1 = temp__4425__auto___29132;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__29095_29133__$1)){
var c__17070__auto___29134 = cljs.core.chunk_first.call(null,seq__29095_29133__$1);
var G__29135 = cljs.core.chunk_rest.call(null,seq__29095_29133__$1);
var G__29136 = c__17070__auto___29134;
var G__29137 = cljs.core.count.call(null,c__17070__auto___29134);
var G__29138 = (0);
seq__29095_29123 = G__29135;
chunk__29096_29124 = G__29136;
count__29097_29125 = G__29137;
i__29098_29126 = G__29138;
continue;
} else {
var ch_29139 = cljs.core.first.call(null,seq__29095_29133__$1);
e.appendChild(ch_29139);

var G__29140 = cljs.core.next.call(null,seq__29095_29133__$1);
var G__29141 = null;
var G__29142 = (0);
var G__29143 = (0);
seq__29095_29123 = G__29140;
chunk__29096_29124 = G__29141;
count__29097_29125 = G__29142;
i__29098_29126 = G__29143;
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

figwheel.client.heads_up.node.cljs$lang$applyTo = (function (seq29088){
var G__29089 = cljs.core.first.call(null,seq29088);
var seq29088__$1 = cljs.core.next.call(null,seq29088);
var G__29090 = cljs.core.first.call(null,seq29088__$1);
var seq29088__$2 = cljs.core.next.call(null,seq29088__$1);
return figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic(G__29089,G__29090,seq29088__$2);
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
var el_29144 = figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),cont_id,new cljs.core.Keyword(null,"style","style",-496642736),[cljs.core.str("-webkit-transition: all 0.2s ease-in-out;"),cljs.core.str("-moz-transition: all 0.2s ease-in-out;"),cljs.core.str("-o-transition: all 0.2s ease-in-out;"),cljs.core.str("transition: all 0.2s ease-in-out;"),cljs.core.str("font-size: 13px;"),cljs.core.str("border-top: 1px solid #f5f5f5;"),cljs.core.str("box-shadow: 0px 0px 1px #aaaaaa;"),cljs.core.str("line-height: 18px;"),cljs.core.str("color: #333;"),cljs.core.str("font-family: monospace;"),cljs.core.str("padding: 0px 10px 0px 70px;"),cljs.core.str("position: fixed;"),cljs.core.str("bottom: 0px;"),cljs.core.str("left: 0px;"),cljs.core.str("height: 0px;"),cljs.core.str("opacity: 0.0;"),cljs.core.str("box-sizing: border-box;"),cljs.core.str("z-index: 10000;")].join('')], null));
el_29144.onclick = figwheel.client.heads_up.heads_up_onclick_handler;

el_29144.innerHTML = figwheel.client.heads_up.cljs_logo_svg;

el_29144.appendChild(figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),content_id], null)));

document.body.appendChild(el_29144);
} else {
}

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"container-el","container-el",109664205),document.getElementById(cont_id),new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187),document.getElementById(content_id)], null);
});
figwheel.client.heads_up.set_style_BANG_ = (function figwheel$client$heads_up$set_style_BANG_(p__29145,st_map){
var map__29150 = p__29145;
var map__29150__$1 = ((((!((map__29150 == null)))?((((map__29150.cljs$lang$protocol_mask$partition0$ & (64))) || (map__29150.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29150):map__29150);
var container_el = cljs.core.get.call(null,map__29150__$1,new cljs.core.Keyword(null,"container-el","container-el",109664205));
return cljs.core.mapv.call(null,((function (map__29150,map__29150__$1,container_el){
return (function (p__29152){
var vec__29153 = p__29152;
var k = cljs.core.nth.call(null,vec__29153,(0),null);
var v = cljs.core.nth.call(null,vec__29153,(1),null);
return (container_el.style[cljs.core.name.call(null,k)] = v);
});})(map__29150,map__29150__$1,container_el))
,st_map);
});
figwheel.client.heads_up.set_content_BANG_ = (function figwheel$client$heads_up$set_content_BANG_(p__29154,dom_str){
var map__29157 = p__29154;
var map__29157__$1 = ((((!((map__29157 == null)))?((((map__29157.cljs$lang$protocol_mask$partition0$ & (64))) || (map__29157.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29157):map__29157);
var c = map__29157__$1;
var content_area_el = cljs.core.get.call(null,map__29157__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
return content_area_el.innerHTML = dom_str;
});
figwheel.client.heads_up.get_content = (function figwheel$client$heads_up$get_content(p__29159){
var map__29162 = p__29159;
var map__29162__$1 = ((((!((map__29162 == null)))?((((map__29162.cljs$lang$protocol_mask$partition0$ & (64))) || (map__29162.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29162):map__29162);
var content_area_el = cljs.core.get.call(null,map__29162__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
return content_area_el.innerHTML;
});
figwheel.client.heads_up.close_link = (function figwheel$client$heads_up$close_link(){
return [cljs.core.str("<a style=\""),cljs.core.str("float: right;"),cljs.core.str("font-size: 18px;"),cljs.core.str("text-decoration: none;"),cljs.core.str("text-align: right;"),cljs.core.str("width: 30px;"),cljs.core.str("height: 30px;"),cljs.core.str("color: rgba(84,84,84, 0.5);"),cljs.core.str("\" href=\"#\"  data-figwheel-event=\"close-heads-up\">"),cljs.core.str("x"),cljs.core.str("</a>")].join('');
});
figwheel.client.heads_up.display_heads_up = (function figwheel$client$heads_up$display_heads_up(style,msg){
var c__20372__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto__){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto__){
return (function (state_29205){
var state_val_29206 = (state_29205[(1)]);
if((state_val_29206 === (1))){
var inst_29190 = (state_29205[(7)]);
var inst_29190__$1 = figwheel.client.heads_up.ensure_container.call(null);
var inst_29191 = [new cljs.core.Keyword(null,"paddingTop","paddingTop",-1088692345),new cljs.core.Keyword(null,"paddingBottom","paddingBottom",-916694489),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"opacity","opacity",397153780)];
var inst_29192 = ["10px","10px","100%","68px","1.0"];
var inst_29193 = cljs.core.PersistentHashMap.fromArrays(inst_29191,inst_29192);
var inst_29194 = cljs.core.merge.call(null,inst_29193,style);
var inst_29195 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_29190__$1,inst_29194);
var inst_29196 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_29190__$1,msg);
var inst_29197 = cljs.core.async.timeout.call(null,(300));
var state_29205__$1 = (function (){var statearr_29207 = state_29205;
(statearr_29207[(8)] = inst_29195);

(statearr_29207[(7)] = inst_29190__$1);

(statearr_29207[(9)] = inst_29196);

return statearr_29207;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29205__$1,(2),inst_29197);
} else {
if((state_val_29206 === (2))){
var inst_29190 = (state_29205[(7)]);
var inst_29199 = (state_29205[(2)]);
var inst_29200 = [new cljs.core.Keyword(null,"height","height",1025178622)];
var inst_29201 = ["auto"];
var inst_29202 = cljs.core.PersistentHashMap.fromArrays(inst_29200,inst_29201);
var inst_29203 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_29190,inst_29202);
var state_29205__$1 = (function (){var statearr_29208 = state_29205;
(statearr_29208[(10)] = inst_29199);

return statearr_29208;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_29205__$1,inst_29203);
} else {
return null;
}
}
});})(c__20372__auto__))
;
return ((function (switch__20351__auto__,c__20372__auto__){
return (function() {
var figwheel$client$heads_up$display_heads_up_$_state_machine__20352__auto__ = null;
var figwheel$client$heads_up$display_heads_up_$_state_machine__20352__auto____0 = (function (){
var statearr_29212 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_29212[(0)] = figwheel$client$heads_up$display_heads_up_$_state_machine__20352__auto__);

(statearr_29212[(1)] = (1));

return statearr_29212;
});
var figwheel$client$heads_up$display_heads_up_$_state_machine__20352__auto____1 = (function (state_29205){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_29205);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e29213){if((e29213 instanceof Object)){
var ex__20355__auto__ = e29213;
var statearr_29214_29216 = state_29205;
(statearr_29214_29216[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_29205);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e29213;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29217 = state_29205;
state_29205 = G__29217;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
figwheel$client$heads_up$display_heads_up_$_state_machine__20352__auto__ = function(state_29205){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$display_heads_up_$_state_machine__20352__auto____0.call(this);
case 1:
return figwheel$client$heads_up$display_heads_up_$_state_machine__20352__auto____1.call(this,state_29205);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$display_heads_up_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$display_heads_up_$_state_machine__20352__auto____0;
figwheel$client$heads_up$display_heads_up_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$display_heads_up_$_state_machine__20352__auto____1;
return figwheel$client$heads_up$display_heads_up_$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto__))
})();
var state__20374__auto__ = (function (){var statearr_29215 = f__20373__auto__.call(null);
(statearr_29215[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto__);

return statearr_29215;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto__))
);

return c__20372__auto__;
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
var vec__29219 = temp__4423__auto__;
var f = cljs.core.nth.call(null,vec__29219,(0),null);
var ln = cljs.core.nth.call(null,vec__29219,(1),null);
return figwheel.client.heads_up.file_selector_div.call(null,f,ln,msg__$1);
} else {
return [cljs.core.str("<div>"),cljs.core.str(msg__$1),cljs.core.str("</div>")].join('');
}
});
figwheel.client.heads_up.display_error = (function figwheel$client$heads_up$display_error(formatted_messages,cause){
var vec__29222 = (cljs.core.truth_(cause)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cause),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause),new cljs.core.Keyword(null,"column","column",2078222095).cljs$core$IFn$_invoke$arity$1(cause)], null):cljs.core.first.call(null,cljs.core.keep.call(null,figwheel.client.heads_up.file_and_line_number,formatted_messages)));
var file_name = cljs.core.nth.call(null,vec__29222,(0),null);
var file_line = cljs.core.nth.call(null,vec__29222,(1),null);
var file_column = cljs.core.nth.call(null,vec__29222,(2),null);
var msg = cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,((function (vec__29222,file_name,file_line,file_column){
return (function (p1__29220_SHARP_){
return [cljs.core.str("<div>"),cljs.core.str(goog.string.htmlEscape(p1__29220_SHARP_)),cljs.core.str("</div>")].join('');
});})(vec__29222,file_name,file_line,file_column))
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
var map__29225 = figwheel.client.heads_up.ensure_container.call(null);
var map__29225__$1 = ((((!((map__29225 == null)))?((((map__29225.cljs$lang$protocol_mask$partition0$ & (64))) || (map__29225.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29225):map__29225);
var content_area_el = cljs.core.get.call(null,map__29225__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
var el = document.createElement("div");
el.innerHTML = figwheel.client.heads_up.format_line.call(null,message);

return content_area_el.appendChild(el);
});
figwheel.client.heads_up.clear = (function figwheel$client$heads_up$clear(){
var c__20372__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto__){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto__){
return (function (state_29273){
var state_val_29274 = (state_29273[(1)]);
if((state_val_29274 === (1))){
var inst_29256 = (state_29273[(7)]);
var inst_29256__$1 = figwheel.client.heads_up.ensure_container.call(null);
var inst_29257 = [new cljs.core.Keyword(null,"opacity","opacity",397153780)];
var inst_29258 = ["0.0"];
var inst_29259 = cljs.core.PersistentHashMap.fromArrays(inst_29257,inst_29258);
var inst_29260 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_29256__$1,inst_29259);
var inst_29261 = cljs.core.async.timeout.call(null,(300));
var state_29273__$1 = (function (){var statearr_29275 = state_29273;
(statearr_29275[(8)] = inst_29260);

(statearr_29275[(7)] = inst_29256__$1);

return statearr_29275;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29273__$1,(2),inst_29261);
} else {
if((state_val_29274 === (2))){
var inst_29256 = (state_29273[(7)]);
var inst_29263 = (state_29273[(2)]);
var inst_29264 = [new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491)];
var inst_29265 = ["auto","0px","0px","0px 10px 0px 70px","0px","transparent"];
var inst_29266 = cljs.core.PersistentHashMap.fromArrays(inst_29264,inst_29265);
var inst_29267 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_29256,inst_29266);
var inst_29268 = cljs.core.async.timeout.call(null,(200));
var state_29273__$1 = (function (){var statearr_29276 = state_29273;
(statearr_29276[(9)] = inst_29267);

(statearr_29276[(10)] = inst_29263);

return statearr_29276;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29273__$1,(3),inst_29268);
} else {
if((state_val_29274 === (3))){
var inst_29256 = (state_29273[(7)]);
var inst_29270 = (state_29273[(2)]);
var inst_29271 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_29256,"");
var state_29273__$1 = (function (){var statearr_29277 = state_29273;
(statearr_29277[(11)] = inst_29270);

return statearr_29277;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_29273__$1,inst_29271);
} else {
return null;
}
}
}
});})(c__20372__auto__))
;
return ((function (switch__20351__auto__,c__20372__auto__){
return (function() {
var figwheel$client$heads_up$clear_$_state_machine__20352__auto__ = null;
var figwheel$client$heads_up$clear_$_state_machine__20352__auto____0 = (function (){
var statearr_29281 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_29281[(0)] = figwheel$client$heads_up$clear_$_state_machine__20352__auto__);

(statearr_29281[(1)] = (1));

return statearr_29281;
});
var figwheel$client$heads_up$clear_$_state_machine__20352__auto____1 = (function (state_29273){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_29273);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e29282){if((e29282 instanceof Object)){
var ex__20355__auto__ = e29282;
var statearr_29283_29285 = state_29273;
(statearr_29283_29285[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_29273);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e29282;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29286 = state_29273;
state_29273 = G__29286;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
figwheel$client$heads_up$clear_$_state_machine__20352__auto__ = function(state_29273){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$clear_$_state_machine__20352__auto____0.call(this);
case 1:
return figwheel$client$heads_up$clear_$_state_machine__20352__auto____1.call(this,state_29273);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$clear_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$clear_$_state_machine__20352__auto____0;
figwheel$client$heads_up$clear_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$clear_$_state_machine__20352__auto____1;
return figwheel$client$heads_up$clear_$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto__))
})();
var state__20374__auto__ = (function (){var statearr_29284 = f__20373__auto__.call(null);
(statearr_29284[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto__);

return statearr_29284;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto__))
);

return c__20372__auto__;
});
figwheel.client.heads_up.display_loaded_start = (function figwheel$client$heads_up$display_loaded_start(){
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(211,234,172,1.0)",new cljs.core.Keyword(null,"width","width",-384071477),"68px",new cljs.core.Keyword(null,"height","height",1025178622),"68px",new cljs.core.Keyword(null,"paddingLeft","paddingLeft",262720813),"0px",new cljs.core.Keyword(null,"paddingRight","paddingRight",-1642313463),"0px",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"35px"], null),"");
});
figwheel.client.heads_up.flash_loaded = (function figwheel$client$heads_up$flash_loaded(){
var c__20372__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto__){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto__){
return (function (state_29318){
var state_val_29319 = (state_29318[(1)]);
if((state_val_29319 === (1))){
var inst_29308 = figwheel.client.heads_up.display_loaded_start.call(null);
var state_29318__$1 = state_29318;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29318__$1,(2),inst_29308);
} else {
if((state_val_29319 === (2))){
var inst_29310 = (state_29318[(2)]);
var inst_29311 = cljs.core.async.timeout.call(null,(400));
var state_29318__$1 = (function (){var statearr_29320 = state_29318;
(statearr_29320[(7)] = inst_29310);

return statearr_29320;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29318__$1,(3),inst_29311);
} else {
if((state_val_29319 === (3))){
var inst_29313 = (state_29318[(2)]);
var inst_29314 = figwheel.client.heads_up.clear.call(null);
var state_29318__$1 = (function (){var statearr_29321 = state_29318;
(statearr_29321[(8)] = inst_29313);

return statearr_29321;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_29318__$1,(4),inst_29314);
} else {
if((state_val_29319 === (4))){
var inst_29316 = (state_29318[(2)]);
var state_29318__$1 = state_29318;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_29318__$1,inst_29316);
} else {
return null;
}
}
}
}
});})(c__20372__auto__))
;
return ((function (switch__20351__auto__,c__20372__auto__){
return (function() {
var figwheel$client$heads_up$flash_loaded_$_state_machine__20352__auto__ = null;
var figwheel$client$heads_up$flash_loaded_$_state_machine__20352__auto____0 = (function (){
var statearr_29325 = [null,null,null,null,null,null,null,null,null];
(statearr_29325[(0)] = figwheel$client$heads_up$flash_loaded_$_state_machine__20352__auto__);

(statearr_29325[(1)] = (1));

return statearr_29325;
});
var figwheel$client$heads_up$flash_loaded_$_state_machine__20352__auto____1 = (function (state_29318){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_29318);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e29326){if((e29326 instanceof Object)){
var ex__20355__auto__ = e29326;
var statearr_29327_29329 = state_29318;
(statearr_29327_29329[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_29318);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e29326;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__29330 = state_29318;
state_29318 = G__29330;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
figwheel$client$heads_up$flash_loaded_$_state_machine__20352__auto__ = function(state_29318){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$flash_loaded_$_state_machine__20352__auto____0.call(this);
case 1:
return figwheel$client$heads_up$flash_loaded_$_state_machine__20352__auto____1.call(this,state_29318);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$flash_loaded_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$flash_loaded_$_state_machine__20352__auto____0;
figwheel$client$heads_up$flash_loaded_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$flash_loaded_$_state_machine__20352__auto____1;
return figwheel$client$heads_up$flash_loaded_$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto__))
})();
var state__20374__auto__ = (function (){var statearr_29328 = f__20373__auto__.call(null);
(statearr_29328[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto__);

return statearr_29328;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto__))
);

return c__20372__auto__;
});
figwheel.client.heads_up.cljs_logo_svg = "<?xml version='1.0' encoding='utf-8'?>\n<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>\n<svg width='49px' height='49px' style='position:absolute; top:9px; left: 10px;' version='1.1'\n  xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'\n  viewBox='0 0 428 428' enable-background='new 0 0 428 428' xml:space='preserve'>\n<circle fill='#fff' cx='213' cy='214' r='213' />\n<g>\n<path fill='#96CA4B' d='M122,266.6c-12.7,0-22.3-3.7-28.9-11.1c-6.6-7.4-9.9-18-9.9-31.8c0-14.1,3.4-24.9,10.3-32.5\n  s16.8-11.4,29.9-11.4c8.8,0,16.8,1.6,23.8,4.9l-5.4,14.3c-7.5-2.9-13.7-4.4-18.6-4.4c-14.5,0-21.7,9.6-21.7,28.8\n  c0,9.4,1.8,16.4,5.4,21.2c3.6,4.7,8.9,7.1,15.9,7.1c7.9,0,15.4-2,22.5-5.9v15.5c-3.2,1.9-6.6,3.2-10.2,4\n  C131.5,266.2,127.1,266.6,122,266.6z'/>\n<path fill='#96CA4B' d='M194.4,265.1h-17.8V147.3h17.8V265.1z'/>\n<path fill='#5F7FBF' d='M222.9,302.3c-5.3,0-9.8-0.6-13.3-1.9v-14.1c3.4,0.9,6.9,1.4,10.5,1.4c7.6,0,11.4-4.3,11.4-12.9v-93.5h17.8\n  v94.7c0,8.6-2.3,15.2-6.8,19.6C237.9,300.1,231.4,302.3,222.9,302.3z M230.4,159.2c0-3.2,0.9-5.6,2.6-7.3c1.7-1.7,4.2-2.6,7.5-2.6\n  c3.1,0,5.6,0.9,7.3,2.6c1.7,1.7,2.6,4.2,2.6,7.3c0,3-0.9,5.4-2.6,7.2c-1.7,1.7-4.2,2.6-7.3,2.6c-3.2,0-5.7-0.9-7.5-2.6\n  C231.2,164.6,230.4,162.2,230.4,159.2z'/>\n<path fill='#5F7FBF' d='M342.5,241.3c0,8.2-3,14.4-8.9,18.8c-6,4.4-14.5,6.5-25.6,6.5c-11.2,0-20.1-1.7-26.9-5.1v-15.4\n  c9.8,4.5,19,6.8,27.5,6.8c10.9,0,16.4-3.3,16.4-9.9c0-2.1-0.6-3.9-1.8-5.3c-1.2-1.4-3.2-2.9-6-4.4c-2.8-1.5-6.6-3.2-11.6-5.1\n  c-9.6-3.7-16.2-7.5-19.6-11.2c-3.4-3.7-5.1-8.6-5.1-14.5c0-7.2,2.9-12.7,8.7-16.7c5.8-4,13.6-5.9,23.6-5.9c9.8,0,19.1,2,27.9,6\n  l-5.8,13.4c-9-3.7-16.6-5.6-22.8-5.6c-9.4,0-14.1,2.7-14.1,8c0,2.6,1.2,4.8,3.7,6.7c2.4,1.8,7.8,4.3,16,7.5\n  c6.9,2.7,11.9,5.1,15.1,7.3c3.1,2.2,5.4,4.8,7,7.7C341.7,233.7,342.5,237.2,342.5,241.3z'/>\n</g>\n<path fill='#96CA4B' stroke='#96CA4B' stroke-width='6' stroke-miterlimit='10' d='M197,392.7c-91.2-8.1-163-85-163-178.3\n  S105.8,44.3,197,36.2V16.1c-102.3,8.2-183,94-183,198.4s80.7,190.2,183,198.4V392.7z'/>\n<path fill='#5F7FBF' stroke='#5F7FBF' stroke-width='6' stroke-miterlimit='10' d='M229,16.1v20.1c91.2,8.1,163,85,163,178.3\n  s-71.8,170.2-163,178.3v20.1c102.3-8.2,183-94,183-198.4S331.3,24.3,229,16.1z'/>\n</svg>";

//# sourceMappingURL=heads_up.js.map?rel=1450835349049