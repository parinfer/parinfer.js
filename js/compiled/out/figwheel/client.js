// Compiled by ClojureScript 1.7.122 {}
goog.provide('figwheel.client');
goog.require('cljs.core');
goog.require('goog.userAgent.product');
goog.require('goog.Uri');
goog.require('cljs.core.async');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.file_reloading');
goog.require('clojure.string');
goog.require('figwheel.client.utils');
goog.require('cljs.repl');
goog.require('figwheel.client.heads_up');
figwheel.client.figwheel_repl_print = (function figwheel$client$figwheel_repl_print(args){
figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),"figwheel-repl-print",new cljs.core.Keyword(null,"content","content",15833224),args], null));

return args;
});
if(typeof figwheel.client.autoload !== 'undefined'){
} else {
figwheel.client.autoload = cljs.core.atom.call(null,true);
}
figwheel.client.toggle_autoload = (function figwheel$client$toggle_autoload(){
return cljs.core.swap_BANG_.call(null,figwheel.client.autoload,cljs.core.not);
});
goog.exportSymbol('figwheel.client.toggle_autoload', figwheel.client.toggle_autoload);
figwheel.client.console_print = (function figwheel$client$console_print(args){
console.log.apply(console,cljs.core.into_array.call(null,args));

return args;
});
figwheel.client.enable_repl_print_BANG_ = (function figwheel$client$enable_repl_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

return cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__44366__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__44366 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__44367__i = 0, G__44367__a = new Array(arguments.length -  0);
while (G__44367__i < G__44367__a.length) {G__44367__a[G__44367__i] = arguments[G__44367__i + 0]; ++G__44367__i;}
  args = new cljs.core.IndexedSeq(G__44367__a,0);
} 
return G__44366__delegate.call(this,args);};
G__44366.cljs$lang$maxFixedArity = 0;
G__44366.cljs$lang$applyTo = (function (arglist__44368){
var args = cljs.core.seq(arglist__44368);
return G__44366__delegate(args);
});
G__44366.cljs$core$IFn$_invoke$arity$variadic = G__44366__delegate;
return G__44366;
})()
;
});
figwheel.client.get_essential_messages = (function figwheel$client$get_essential_messages(ed){
if(cljs.core.truth_(ed)){
return cljs.core.cons.call(null,cljs.core.select_keys.call(null,ed,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.Keyword(null,"class","class",-2030961996)], null)),figwheel$client$get_essential_messages.call(null,new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(ed)));
} else {
return null;
}
});
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__44369){
var map__44372 = p__44369;
var map__44372__$1 = ((((!((map__44372 == null)))?((((map__44372.cljs$lang$protocol_mask$partition0$ & (64))) || (map__44372.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__44372):map__44372);
var message = cljs.core.get.call(null,map__44372__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__44372__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
return [cljs.core.str(class$),cljs.core.str(" : "),cljs.core.str(message)].join('');
});
figwheel.client.format_messages = cljs.core.comp.call(null,cljs.core.partial.call(null,cljs.core.map,figwheel.client.error_msg_format),figwheel.client.get_essential_messages);
figwheel.client.focus_msgs = (function figwheel$client$focus_msgs(name_set,msg_hist){
return cljs.core.cons.call(null,cljs.core.first.call(null,msg_hist),cljs.core.filter.call(null,cljs.core.comp.call(null,name_set,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863)),cljs.core.rest.call(null,msg_hist)));
});
figwheel.client.reload_file_QMARK__STAR_ = (function figwheel$client$reload_file_QMARK__STAR_(msg_name,opts){
var or__16267__auto__ = new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return cljs.core.not_EQ_.call(null,msg_name,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356));
}
});
figwheel.client.reload_file_state_QMARK_ = (function figwheel$client$reload_file_state_QMARK_(msg_names,opts){
var and__16255__auto__ = cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563));
if(and__16255__auto__){
return figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts);
} else {
return and__16255__auto__;
}
});
figwheel.client.block_reload_file_state_QMARK_ = (function figwheel$client$block_reload_file_state_QMARK_(msg_names,opts){
return (cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))) && (cljs.core.not.call(null,figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts)));
});
figwheel.client.warning_append_state_QMARK_ = (function figwheel$client$warning_append_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.warning_state_QMARK_ = (function figwheel$client$warning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),cljs.core.first.call(null,msg_names));
});
figwheel.client.rewarning_state_QMARK_ = (function figwheel$client$rewarning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(3),msg_names));
});
figwheel.client.compile_fail_state_QMARK_ = (function figwheel$client$compile_fail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),cljs.core.first.call(null,msg_names));
});
figwheel.client.compile_refail_state_QMARK_ = (function figwheel$client$compile_refail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.css_loaded_state_QMARK_ = (function figwheel$client$css_loaded_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874),cljs.core.first.call(null,msg_names));
});
figwheel.client.file_reloader_plugin = (function figwheel$client$file_reloader_plugin(opts){
var ch = cljs.core.async.chan.call(null);
var c__19891__auto___44520 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___44520,ch){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___44520,ch){
return (function (state_44490){
var state_val_44491 = (state_44490[(1)]);
if((state_val_44491 === (7))){
var inst_44486 = (state_44490[(2)]);
var state_44490__$1 = state_44490;
var statearr_44492_44521 = state_44490__$1;
(statearr_44492_44521[(2)] = inst_44486);

(statearr_44492_44521[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44491 === (1))){
var state_44490__$1 = state_44490;
var statearr_44493_44522 = state_44490__$1;
(statearr_44493_44522[(2)] = null);

(statearr_44493_44522[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44491 === (4))){
var inst_44449 = (state_44490[(7)]);
var inst_44449__$1 = (state_44490[(2)]);
var state_44490__$1 = (function (){var statearr_44494 = state_44490;
(statearr_44494[(7)] = inst_44449__$1);

return statearr_44494;
})();
if(cljs.core.truth_(inst_44449__$1)){
var statearr_44495_44523 = state_44490__$1;
(statearr_44495_44523[(1)] = (5));

} else {
var statearr_44496_44524 = state_44490__$1;
(statearr_44496_44524[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44491 === (15))){
var inst_44456 = (state_44490[(8)]);
var inst_44471 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_44456);
var inst_44472 = cljs.core.first.call(null,inst_44471);
var inst_44473 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_44472);
var inst_44474 = console.warn("Figwheel: Not loading code with warnings - ",inst_44473);
var state_44490__$1 = state_44490;
var statearr_44497_44525 = state_44490__$1;
(statearr_44497_44525[(2)] = inst_44474);

(statearr_44497_44525[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44491 === (13))){
var inst_44479 = (state_44490[(2)]);
var state_44490__$1 = state_44490;
var statearr_44498_44526 = state_44490__$1;
(statearr_44498_44526[(2)] = inst_44479);

(statearr_44498_44526[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44491 === (6))){
var state_44490__$1 = state_44490;
var statearr_44499_44527 = state_44490__$1;
(statearr_44499_44527[(2)] = null);

(statearr_44499_44527[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44491 === (17))){
var inst_44477 = (state_44490[(2)]);
var state_44490__$1 = state_44490;
var statearr_44500_44528 = state_44490__$1;
(statearr_44500_44528[(2)] = inst_44477);

(statearr_44500_44528[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44491 === (3))){
var inst_44488 = (state_44490[(2)]);
var state_44490__$1 = state_44490;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_44490__$1,inst_44488);
} else {
if((state_val_44491 === (12))){
var inst_44455 = (state_44490[(9)]);
var inst_44469 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_44455,opts);
var state_44490__$1 = state_44490;
if(cljs.core.truth_(inst_44469)){
var statearr_44501_44529 = state_44490__$1;
(statearr_44501_44529[(1)] = (15));

} else {
var statearr_44502_44530 = state_44490__$1;
(statearr_44502_44530[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44491 === (2))){
var state_44490__$1 = state_44490;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_44490__$1,(4),ch);
} else {
if((state_val_44491 === (11))){
var inst_44456 = (state_44490[(8)]);
var inst_44461 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_44462 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_44456);
var inst_44463 = cljs.core.async.timeout.call(null,(1000));
var inst_44464 = [inst_44462,inst_44463];
var inst_44465 = (new cljs.core.PersistentVector(null,2,(5),inst_44461,inst_44464,null));
var state_44490__$1 = state_44490;
return cljs.core.async.ioc_alts_BANG_.call(null,state_44490__$1,(14),inst_44465);
} else {
if((state_val_44491 === (9))){
var state_44490__$1 = state_44490;
var statearr_44503_44531 = state_44490__$1;
(statearr_44503_44531[(2)] = null);

(statearr_44503_44531[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44491 === (5))){
var inst_44449 = (state_44490[(7)]);
var inst_44451 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_44452 = (new cljs.core.PersistentArrayMap(null,2,inst_44451,null));
var inst_44453 = (new cljs.core.PersistentHashSet(null,inst_44452,null));
var inst_44454 = figwheel.client.focus_msgs.call(null,inst_44453,inst_44449);
var inst_44455 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_44454);
var inst_44456 = cljs.core.first.call(null,inst_44454);
var inst_44457 = cljs.core.deref.call(null,figwheel.client.autoload);
var state_44490__$1 = (function (){var statearr_44504 = state_44490;
(statearr_44504[(8)] = inst_44456);

(statearr_44504[(9)] = inst_44455);

return statearr_44504;
})();
if(cljs.core.truth_(inst_44457)){
var statearr_44505_44532 = state_44490__$1;
(statearr_44505_44532[(1)] = (8));

} else {
var statearr_44506_44533 = state_44490__$1;
(statearr_44506_44533[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44491 === (14))){
var inst_44467 = (state_44490[(2)]);
var state_44490__$1 = state_44490;
var statearr_44507_44534 = state_44490__$1;
(statearr_44507_44534[(2)] = inst_44467);

(statearr_44507_44534[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44491 === (16))){
var state_44490__$1 = state_44490;
var statearr_44508_44535 = state_44490__$1;
(statearr_44508_44535[(2)] = null);

(statearr_44508_44535[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44491 === (10))){
var inst_44482 = (state_44490[(2)]);
var state_44490__$1 = (function (){var statearr_44509 = state_44490;
(statearr_44509[(10)] = inst_44482);

return statearr_44509;
})();
var statearr_44510_44536 = state_44490__$1;
(statearr_44510_44536[(2)] = null);

(statearr_44510_44536[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44491 === (8))){
var inst_44455 = (state_44490[(9)]);
var inst_44459 = figwheel.client.reload_file_state_QMARK_.call(null,inst_44455,opts);
var state_44490__$1 = state_44490;
if(cljs.core.truth_(inst_44459)){
var statearr_44511_44537 = state_44490__$1;
(statearr_44511_44537[(1)] = (11));

} else {
var statearr_44512_44538 = state_44490__$1;
(statearr_44512_44538[(1)] = (12));

}

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
});})(c__19891__auto___44520,ch))
;
return ((function (switch__19826__auto__,c__19891__auto___44520,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__19827__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__19827__auto____0 = (function (){
var statearr_44516 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_44516[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__19827__auto__);

(statearr_44516[(1)] = (1));

return statearr_44516;
});
var figwheel$client$file_reloader_plugin_$_state_machine__19827__auto____1 = (function (state_44490){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_44490);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e44517){if((e44517 instanceof Object)){
var ex__19830__auto__ = e44517;
var statearr_44518_44539 = state_44490;
(statearr_44518_44539[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_44490);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e44517;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__44540 = state_44490;
state_44490 = G__44540;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__19827__auto__ = function(state_44490){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__19827__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__19827__auto____1.call(this,state_44490);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__19827__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__19827__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___44520,ch))
})();
var state__19893__auto__ = (function (){var statearr_44519 = f__19892__auto__.call(null);
(statearr_44519[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___44520);

return statearr_44519;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___44520,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__44541_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__44541_SHARP_));
}),clojure.string.split_lines.call(null,stack_str));
});
figwheel.client.get_ua_product = (function figwheel$client$get_ua_product(){
if(cljs.core.truth_(figwheel.client.utils.node_env_QMARK_.call(null))){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.SAFARI)){
return new cljs.core.Keyword(null,"safari","safari",497115653);
} else {
if(cljs.core.truth_(goog.userAgent.product.CHROME)){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.FIREFOX)){
return new cljs.core.Keyword(null,"firefox","firefox",1283768880);
} else {
if(cljs.core.truth_(goog.userAgent.product.IE)){
return new cljs.core.Keyword(null,"ie","ie",2038473780);
} else {
return null;
}
}
}
}
}
});
var base_path_44548 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_44548){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,opts,result_handler){
try{var _STAR_print_fn_STAR_44546 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR_44547 = cljs.core._STAR_print_newline_STAR_;
cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_fn_STAR_44546,_STAR_print_newline_STAR_44547,base_path_44548){
return (function() { 
var G__44549__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__44549 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__44550__i = 0, G__44550__a = new Array(arguments.length -  0);
while (G__44550__i < G__44550__a.length) {G__44550__a[G__44550__i] = arguments[G__44550__i + 0]; ++G__44550__i;}
  args = new cljs.core.IndexedSeq(G__44550__a,0);
} 
return G__44549__delegate.call(this,args);};
G__44549.cljs$lang$maxFixedArity = 0;
G__44549.cljs$lang$applyTo = (function (arglist__44551){
var args = cljs.core.seq(arglist__44551);
return G__44549__delegate(args);
});
G__44549.cljs$core$IFn$_invoke$arity$variadic = G__44549__delegate;
return G__44549;
})()
;})(_STAR_print_fn_STAR_44546,_STAR_print_newline_STAR_44547,base_path_44548))
;

cljs.core._STAR_print_newline_STAR_ = false;

try{return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),[cljs.core.str(figwheel.client.utils.eval_helper.call(null,code,opts))].join('')], null));
}finally {cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_44547;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_44546;
}}catch (e44545){if((e44545 instanceof Error)){
var e = e44545;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_44548], null));
} else {
var e = e44545;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}});})(base_path_44548))
;
/**
 * The REPL can disconnect and reconnect lets ensure cljs.user exists at least.
 */
figwheel.client.ensure_cljs_user = (function figwheel$client$ensure_cljs_user(){
if(cljs.core.truth_(cljs.user)){
return null;
} else {
return cljs.user = {};
}
});
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__44552){
var map__44559 = p__44552;
var map__44559__$1 = ((((!((map__44559 == null)))?((((map__44559.cljs$lang$protocol_mask$partition0$ & (64))) || (map__44559.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__44559):map__44559);
var opts = map__44559__$1;
var build_id = cljs.core.get.call(null,map__44559__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__44559,map__44559__$1,opts,build_id){
return (function (p__44561){
var vec__44562 = p__44561;
var map__44563 = cljs.core.nth.call(null,vec__44562,(0),null);
var map__44563__$1 = ((((!((map__44563 == null)))?((((map__44563.cljs$lang$protocol_mask$partition0$ & (64))) || (map__44563.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__44563):map__44563);
var msg = map__44563__$1;
var msg_name = cljs.core.get.call(null,map__44563__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__44562,(1));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),opts,((function (vec__44562,map__44563,map__44563__$1,msg,msg_name,_,map__44559,map__44559__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__44562,map__44563,map__44563__$1,msg,msg_name,_,map__44559,map__44559__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__44559,map__44559__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__44569){
var vec__44570 = p__44569;
var map__44571 = cljs.core.nth.call(null,vec__44570,(0),null);
var map__44571__$1 = ((((!((map__44571 == null)))?((((map__44571.cljs$lang$protocol_mask$partition0$ & (64))) || (map__44571.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__44571):map__44571);
var msg = map__44571__$1;
var msg_name = cljs.core.get.call(null,map__44571__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__44570,(1));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__44573){
var map__44583 = p__44573;
var map__44583__$1 = ((((!((map__44583 == null)))?((((map__44583.cljs$lang$protocol_mask$partition0$ & (64))) || (map__44583.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__44583):map__44583);
var on_compile_warning = cljs.core.get.call(null,map__44583__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__44583__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return ((function (map__44583,map__44583__$1,on_compile_warning,on_compile_fail){
return (function (p__44585){
var vec__44586 = p__44585;
var map__44587 = cljs.core.nth.call(null,vec__44586,(0),null);
var map__44587__$1 = ((((!((map__44587 == null)))?((((map__44587.cljs$lang$protocol_mask$partition0$ & (64))) || (map__44587.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__44587):map__44587);
var msg = map__44587__$1;
var msg_name = cljs.core.get.call(null,map__44587__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__44586,(1));
var pred__44589 = cljs.core._EQ_;
var expr__44590 = msg_name;
if(cljs.core.truth_(pred__44589.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__44590))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__44589.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__44590))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__44583,map__44583__$1,on_compile_warning,on_compile_fail))
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__19891__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto__,msg_hist,msg_names,msg){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto__,msg_hist,msg_names,msg){
return (function (state_44806){
var state_val_44807 = (state_44806[(1)]);
if((state_val_44807 === (7))){
var inst_44730 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
if(cljs.core.truth_(inst_44730)){
var statearr_44808_44854 = state_44806__$1;
(statearr_44808_44854[(1)] = (8));

} else {
var statearr_44809_44855 = state_44806__$1;
(statearr_44809_44855[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (20))){
var inst_44800 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44810_44856 = state_44806__$1;
(statearr_44810_44856[(2)] = inst_44800);

(statearr_44810_44856[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (27))){
var inst_44796 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44811_44857 = state_44806__$1;
(statearr_44811_44857[(2)] = inst_44796);

(statearr_44811_44857[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (1))){
var inst_44723 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_44806__$1 = state_44806;
if(cljs.core.truth_(inst_44723)){
var statearr_44812_44858 = state_44806__$1;
(statearr_44812_44858[(1)] = (2));

} else {
var statearr_44813_44859 = state_44806__$1;
(statearr_44813_44859[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (24))){
var inst_44798 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44814_44860 = state_44806__$1;
(statearr_44814_44860[(2)] = inst_44798);

(statearr_44814_44860[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (4))){
var inst_44804 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_44806__$1,inst_44804);
} else {
if((state_val_44807 === (15))){
var inst_44802 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44815_44861 = state_44806__$1;
(statearr_44815_44861[(2)] = inst_44802);

(statearr_44815_44861[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (21))){
var inst_44761 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44816_44862 = state_44806__$1;
(statearr_44816_44862[(2)] = inst_44761);

(statearr_44816_44862[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (31))){
var inst_44785 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_44806__$1 = state_44806;
if(cljs.core.truth_(inst_44785)){
var statearr_44817_44863 = state_44806__$1;
(statearr_44817_44863[(1)] = (34));

} else {
var statearr_44818_44864 = state_44806__$1;
(statearr_44818_44864[(1)] = (35));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (32))){
var inst_44794 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44819_44865 = state_44806__$1;
(statearr_44819_44865[(2)] = inst_44794);

(statearr_44819_44865[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (33))){
var inst_44783 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44820_44866 = state_44806__$1;
(statearr_44820_44866[(2)] = inst_44783);

(statearr_44820_44866[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (13))){
var inst_44744 = figwheel.client.heads_up.clear.call(null);
var state_44806__$1 = state_44806;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_44806__$1,(16),inst_44744);
} else {
if((state_val_44807 === (22))){
var inst_44765 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_44766 = figwheel.client.heads_up.append_message.call(null,inst_44765);
var state_44806__$1 = state_44806;
var statearr_44821_44867 = state_44806__$1;
(statearr_44821_44867[(2)] = inst_44766);

(statearr_44821_44867[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (36))){
var inst_44792 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44822_44868 = state_44806__$1;
(statearr_44822_44868[(2)] = inst_44792);

(statearr_44822_44868[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (29))){
var inst_44776 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44823_44869 = state_44806__$1;
(statearr_44823_44869[(2)] = inst_44776);

(statearr_44823_44869[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (6))){
var inst_44725 = (state_44806[(7)]);
var state_44806__$1 = state_44806;
var statearr_44824_44870 = state_44806__$1;
(statearr_44824_44870[(2)] = inst_44725);

(statearr_44824_44870[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (28))){
var inst_44772 = (state_44806[(2)]);
var inst_44773 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_44774 = figwheel.client.heads_up.display_warning.call(null,inst_44773);
var state_44806__$1 = (function (){var statearr_44825 = state_44806;
(statearr_44825[(8)] = inst_44772);

return statearr_44825;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_44806__$1,(29),inst_44774);
} else {
if((state_val_44807 === (25))){
var inst_44770 = figwheel.client.heads_up.clear.call(null);
var state_44806__$1 = state_44806;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_44806__$1,(28),inst_44770);
} else {
if((state_val_44807 === (34))){
var inst_44787 = figwheel.client.heads_up.flash_loaded.call(null);
var state_44806__$1 = state_44806;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_44806__$1,(37),inst_44787);
} else {
if((state_val_44807 === (17))){
var inst_44752 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44826_44871 = state_44806__$1;
(statearr_44826_44871[(2)] = inst_44752);

(statearr_44826_44871[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (3))){
var inst_44742 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_44806__$1 = state_44806;
if(cljs.core.truth_(inst_44742)){
var statearr_44827_44872 = state_44806__$1;
(statearr_44827_44872[(1)] = (13));

} else {
var statearr_44828_44873 = state_44806__$1;
(statearr_44828_44873[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (12))){
var inst_44738 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44829_44874 = state_44806__$1;
(statearr_44829_44874[(2)] = inst_44738);

(statearr_44829_44874[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (2))){
var inst_44725 = (state_44806[(7)]);
var inst_44725__$1 = cljs.core.deref.call(null,figwheel.client.autoload);
var state_44806__$1 = (function (){var statearr_44830 = state_44806;
(statearr_44830[(7)] = inst_44725__$1);

return statearr_44830;
})();
if(cljs.core.truth_(inst_44725__$1)){
var statearr_44831_44875 = state_44806__$1;
(statearr_44831_44875[(1)] = (5));

} else {
var statearr_44832_44876 = state_44806__$1;
(statearr_44832_44876[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (23))){
var inst_44768 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_44806__$1 = state_44806;
if(cljs.core.truth_(inst_44768)){
var statearr_44833_44877 = state_44806__$1;
(statearr_44833_44877[(1)] = (25));

} else {
var statearr_44834_44878 = state_44806__$1;
(statearr_44834_44878[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (35))){
var state_44806__$1 = state_44806;
var statearr_44835_44879 = state_44806__$1;
(statearr_44835_44879[(2)] = null);

(statearr_44835_44879[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (19))){
var inst_44763 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_44806__$1 = state_44806;
if(cljs.core.truth_(inst_44763)){
var statearr_44836_44880 = state_44806__$1;
(statearr_44836_44880[(1)] = (22));

} else {
var statearr_44837_44881 = state_44806__$1;
(statearr_44837_44881[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (11))){
var inst_44734 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44838_44882 = state_44806__$1;
(statearr_44838_44882[(2)] = inst_44734);

(statearr_44838_44882[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (9))){
var inst_44736 = figwheel.client.heads_up.clear.call(null);
var state_44806__$1 = state_44806;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_44806__$1,(12),inst_44736);
} else {
if((state_val_44807 === (5))){
var inst_44727 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_44806__$1 = state_44806;
var statearr_44839_44883 = state_44806__$1;
(statearr_44839_44883[(2)] = inst_44727);

(statearr_44839_44883[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (14))){
var inst_44754 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_44806__$1 = state_44806;
if(cljs.core.truth_(inst_44754)){
var statearr_44840_44884 = state_44806__$1;
(statearr_44840_44884[(1)] = (18));

} else {
var statearr_44841_44885 = state_44806__$1;
(statearr_44841_44885[(1)] = (19));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (26))){
var inst_44778 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_44806__$1 = state_44806;
if(cljs.core.truth_(inst_44778)){
var statearr_44842_44886 = state_44806__$1;
(statearr_44842_44886[(1)] = (30));

} else {
var statearr_44843_44887 = state_44806__$1;
(statearr_44843_44887[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (16))){
var inst_44746 = (state_44806[(2)]);
var inst_44747 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_44748 = figwheel.client.format_messages.call(null,inst_44747);
var inst_44749 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_44750 = figwheel.client.heads_up.display_error.call(null,inst_44748,inst_44749);
var state_44806__$1 = (function (){var statearr_44844 = state_44806;
(statearr_44844[(9)] = inst_44746);

return statearr_44844;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_44806__$1,(17),inst_44750);
} else {
if((state_val_44807 === (30))){
var inst_44780 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_44781 = figwheel.client.heads_up.display_warning.call(null,inst_44780);
var state_44806__$1 = state_44806;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_44806__$1,(33),inst_44781);
} else {
if((state_val_44807 === (10))){
var inst_44740 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44845_44888 = state_44806__$1;
(statearr_44845_44888[(2)] = inst_44740);

(statearr_44845_44888[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (18))){
var inst_44756 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_44757 = figwheel.client.format_messages.call(null,inst_44756);
var inst_44758 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_44759 = figwheel.client.heads_up.display_error.call(null,inst_44757,inst_44758);
var state_44806__$1 = state_44806;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_44806__$1,(21),inst_44759);
} else {
if((state_val_44807 === (37))){
var inst_44789 = (state_44806[(2)]);
var state_44806__$1 = state_44806;
var statearr_44846_44889 = state_44806__$1;
(statearr_44846_44889[(2)] = inst_44789);

(statearr_44846_44889[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44807 === (8))){
var inst_44732 = figwheel.client.heads_up.flash_loaded.call(null);
var state_44806__$1 = state_44806;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_44806__$1,(11),inst_44732);
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
});})(c__19891__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__19826__auto__,c__19891__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19827__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19827__auto____0 = (function (){
var statearr_44850 = [null,null,null,null,null,null,null,null,null,null];
(statearr_44850[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19827__auto__);

(statearr_44850[(1)] = (1));

return statearr_44850;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19827__auto____1 = (function (state_44806){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_44806);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e44851){if((e44851 instanceof Object)){
var ex__19830__auto__ = e44851;
var statearr_44852_44890 = state_44806;
(statearr_44852_44890[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_44806);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e44851;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__44891 = state_44806;
state_44806 = G__44891;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19827__auto__ = function(state_44806){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19827__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19827__auto____1.call(this,state_44806);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19827__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19827__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto__,msg_hist,msg_names,msg))
})();
var state__19893__auto__ = (function (){var statearr_44853 = f__19892__auto__.call(null);
(statearr_44853[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto__);

return statearr_44853;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto__,msg_hist,msg_names,msg))
);

return c__19891__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__19891__auto___44954 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___44954,ch){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___44954,ch){
return (function (state_44937){
var state_val_44938 = (state_44937[(1)]);
if((state_val_44938 === (1))){
var state_44937__$1 = state_44937;
var statearr_44939_44955 = state_44937__$1;
(statearr_44939_44955[(2)] = null);

(statearr_44939_44955[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44938 === (2))){
var state_44937__$1 = state_44937;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_44937__$1,(4),ch);
} else {
if((state_val_44938 === (3))){
var inst_44935 = (state_44937[(2)]);
var state_44937__$1 = state_44937;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_44937__$1,inst_44935);
} else {
if((state_val_44938 === (4))){
var inst_44925 = (state_44937[(7)]);
var inst_44925__$1 = (state_44937[(2)]);
var state_44937__$1 = (function (){var statearr_44940 = state_44937;
(statearr_44940[(7)] = inst_44925__$1);

return statearr_44940;
})();
if(cljs.core.truth_(inst_44925__$1)){
var statearr_44941_44956 = state_44937__$1;
(statearr_44941_44956[(1)] = (5));

} else {
var statearr_44942_44957 = state_44937__$1;
(statearr_44942_44957[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44938 === (5))){
var inst_44925 = (state_44937[(7)]);
var inst_44927 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_44925);
var state_44937__$1 = state_44937;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_44937__$1,(8),inst_44927);
} else {
if((state_val_44938 === (6))){
var state_44937__$1 = state_44937;
var statearr_44943_44958 = state_44937__$1;
(statearr_44943_44958[(2)] = null);

(statearr_44943_44958[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44938 === (7))){
var inst_44933 = (state_44937[(2)]);
var state_44937__$1 = state_44937;
var statearr_44944_44959 = state_44937__$1;
(statearr_44944_44959[(2)] = inst_44933);

(statearr_44944_44959[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_44938 === (8))){
var inst_44929 = (state_44937[(2)]);
var state_44937__$1 = (function (){var statearr_44945 = state_44937;
(statearr_44945[(8)] = inst_44929);

return statearr_44945;
})();
var statearr_44946_44960 = state_44937__$1;
(statearr_44946_44960[(2)] = null);

(statearr_44946_44960[(1)] = (2));


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
});})(c__19891__auto___44954,ch))
;
return ((function (switch__19826__auto__,c__19891__auto___44954,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__19827__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__19827__auto____0 = (function (){
var statearr_44950 = [null,null,null,null,null,null,null,null,null];
(statearr_44950[(0)] = figwheel$client$heads_up_plugin_$_state_machine__19827__auto__);

(statearr_44950[(1)] = (1));

return statearr_44950;
});
var figwheel$client$heads_up_plugin_$_state_machine__19827__auto____1 = (function (state_44937){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_44937);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e44951){if((e44951 instanceof Object)){
var ex__19830__auto__ = e44951;
var statearr_44952_44961 = state_44937;
(statearr_44952_44961[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_44937);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e44951;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__44962 = state_44937;
state_44937 = G__44962;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__19827__auto__ = function(state_44937){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__19827__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__19827__auto____1.call(this,state_44937);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__19827__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__19827__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___44954,ch))
})();
var state__19893__auto__ = (function (){var statearr_44953 = f__19892__auto__.call(null);
(statearr_44953[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___44954);

return statearr_44953;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___44954,ch))
);


figwheel.client.heads_up.ensure_container.call(null);

return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.enforce_project_plugin = (function figwheel$client$enforce_project_plugin(opts){
return (function (msg_hist){
if(((1) < cljs.core.count.call(null,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"project-id","project-id",206449307),cljs.core.take.call(null,(5),msg_hist)))))){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different project. Shutting socket down.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__19891__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto__){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto__){
return (function (state_44983){
var state_val_44984 = (state_44983[(1)]);
if((state_val_44984 === (1))){
var inst_44978 = cljs.core.async.timeout.call(null,(3000));
var state_44983__$1 = state_44983;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_44983__$1,(2),inst_44978);
} else {
if((state_val_44984 === (2))){
var inst_44980 = (state_44983[(2)]);
var inst_44981 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_44983__$1 = (function (){var statearr_44985 = state_44983;
(statearr_44985[(7)] = inst_44980);

return statearr_44985;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_44983__$1,inst_44981);
} else {
return null;
}
}
});})(c__19891__auto__))
;
return ((function (switch__19826__auto__,c__19891__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__19827__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__19827__auto____0 = (function (){
var statearr_44989 = [null,null,null,null,null,null,null,null];
(statearr_44989[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__19827__auto__);

(statearr_44989[(1)] = (1));

return statearr_44989;
});
var figwheel$client$enforce_project_plugin_$_state_machine__19827__auto____1 = (function (state_44983){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_44983);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e44990){if((e44990 instanceof Object)){
var ex__19830__auto__ = e44990;
var statearr_44991_44993 = state_44983;
(statearr_44991_44993[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_44983);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e44990;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__44994 = state_44983;
state_44983 = G__44994;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__19827__auto__ = function(state_44983){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__19827__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__19827__auto____1.call(this,state_44983);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__19827__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__19827__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto__))
})();
var state__19893__auto__ = (function (){var statearr_44992 = f__19892__auto__.call(null);
(statearr_44992[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto__);

return statearr_44992;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto__))
);

return c__19891__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = cljs.core.identity;
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__44995){
var map__45002 = p__44995;
var map__45002__$1 = ((((!((map__45002 == null)))?((((map__45002.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45002.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45002):map__45002);
var ed = map__45002__$1;
var formatted_exception = cljs.core.get.call(null,map__45002__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));
var exception_data = cljs.core.get.call(null,map__45002__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__45002__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: Compile Exception");

var seq__45004_45008 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));
var chunk__45005_45009 = null;
var count__45006_45010 = (0);
var i__45007_45011 = (0);
while(true){
if((i__45007_45011 < count__45006_45010)){
var msg_45012 = cljs.core._nth.call(null,chunk__45005_45009,i__45007_45011);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_45012);

var G__45013 = seq__45004_45008;
var G__45014 = chunk__45005_45009;
var G__45015 = count__45006_45010;
var G__45016 = (i__45007_45011 + (1));
seq__45004_45008 = G__45013;
chunk__45005_45009 = G__45014;
count__45006_45010 = G__45015;
i__45007_45011 = G__45016;
continue;
} else {
var temp__4425__auto___45017 = cljs.core.seq.call(null,seq__45004_45008);
if(temp__4425__auto___45017){
var seq__45004_45018__$1 = temp__4425__auto___45017;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45004_45018__$1)){
var c__17070__auto___45019 = cljs.core.chunk_first.call(null,seq__45004_45018__$1);
var G__45020 = cljs.core.chunk_rest.call(null,seq__45004_45018__$1);
var G__45021 = c__17070__auto___45019;
var G__45022 = cljs.core.count.call(null,c__17070__auto___45019);
var G__45023 = (0);
seq__45004_45008 = G__45020;
chunk__45005_45009 = G__45021;
count__45006_45010 = G__45022;
i__45007_45011 = G__45023;
continue;
} else {
var msg_45024 = cljs.core.first.call(null,seq__45004_45018__$1);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_45024);

var G__45025 = cljs.core.next.call(null,seq__45004_45018__$1);
var G__45026 = null;
var G__45027 = (0);
var G__45028 = (0);
seq__45004_45008 = G__45025;
chunk__45005_45009 = G__45026;
count__45006_45010 = G__45027;
i__45007_45011 = G__45028;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cause)){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str("Error on file "),cljs.core.str(new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cause)),cljs.core.str(", line "),cljs.core.str(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause)),cljs.core.str(", column "),cljs.core.str(new cljs.core.Keyword(null,"column","column",2078222095).cljs$core$IFn$_invoke$arity$1(cause))].join(''));
} else {
}

return ed;
});
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__45029){
var map__45032 = p__45029;
var map__45032__$1 = ((((!((map__45032 == null)))?((((map__45032.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45032.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45032):map__45032);
var w = map__45032__$1;
var message = cljs.core.get.call(null,map__45032__$1,new cljs.core.Keyword(null,"message","message",-406056002));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),[cljs.core.str("Figwheel: Compile Warning - "),cljs.core.str(message)].join(''));

return w;
});
figwheel.client.default_before_load = (function figwheel$client$default_before_load(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: notified of file changes");

return files;
});
figwheel.client.default_on_cssload = (function figwheel$client$default_on_cssload(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded CSS files");

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),cljs.core.pr_str.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files)));

return files;
});
if(typeof figwheel.client.config_defaults !== 'undefined'){
} else {
figwheel.client.config_defaults = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947),new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430),new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036),new cljs.core.Keyword(null,"debug","debug",-1608172596),new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202),new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128),new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223),new cljs.core.Keyword(null,"eval-fn","eval-fn",-1111644294),new cljs.core.Keyword(null,"retry-count","retry-count",1936122875),new cljs.core.Keyword(null,"autoload","autoload",-354122500),new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318)],[figwheel.client.default_on_compile_warning,figwheel.client.default_on_jsload,true,figwheel.client.default_on_compile_fail,false,true,[cljs.core.str("ws://"),cljs.core.str((cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))?location.host:"localhost:3449")),cljs.core.str("/figwheel-ws")].join(''),figwheel.client.default_before_load,false,false,(100),true,figwheel.client.default_on_cssload]);
}
figwheel.client.handle_deprecated_jsload_callback = (function figwheel$client$handle_deprecated_jsload_callback(config){
if(cljs.core.truth_(new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config))){
return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,config,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config)),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369));
} else {
return config;
}
});
figwheel.client.base_plugins = (function figwheel$client$base_plugins(system_options){
var base = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"enforce-project-plugin","enforce-project-plugin",959402899),figwheel.client.enforce_project_plugin,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),figwheel.client.file_reloader_plugin,new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),figwheel.client.compile_fail_warning_plugin,new cljs.core.Keyword(null,"css-reloader-plugin","css-reloader-plugin",2002032904),figwheel.client.css_reloader_plugin,new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371),figwheel.client.repl_plugin], null);
var base__$1 = ((cljs.core.not.call(null,figwheel.client.utils.html_env_QMARK_.call(null)))?cljs.core.select_keys.call(null,base,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371)], null)):base);
var base__$2 = ((new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(system_options) === false)?cljs.core.dissoc.call(null,base__$1,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733)):base__$1);
if(cljs.core.truth_((function (){var and__16255__auto__ = new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(system_options);
if(cljs.core.truth_(and__16255__auto__)){
return figwheel.client.utils.html_env_QMARK_.call(null);
} else {
return and__16255__auto__;
}
})())){
return cljs.core.assoc.call(null,base__$2,new cljs.core.Keyword(null,"heads-up-display-plugin","heads-up-display-plugin",1745207501),figwheel.client.heads_up_plugin);
} else {
return base__$2;
}
});
figwheel.client.add_plugins = (function figwheel$client$add_plugins(plugins,system_options){
var seq__45040 = cljs.core.seq.call(null,plugins);
var chunk__45041 = null;
var count__45042 = (0);
var i__45043 = (0);
while(true){
if((i__45043 < count__45042)){
var vec__45044 = cljs.core._nth.call(null,chunk__45041,i__45043);
var k = cljs.core.nth.call(null,vec__45044,(0),null);
var plugin = cljs.core.nth.call(null,vec__45044,(1),null);
if(cljs.core.truth_(plugin)){
var pl_45046 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__45040,chunk__45041,count__45042,i__45043,pl_45046,vec__45044,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_45046.call(null,msg_hist);
});})(seq__45040,chunk__45041,count__45042,i__45043,pl_45046,vec__45044,k,plugin))
);
} else {
}

var G__45047 = seq__45040;
var G__45048 = chunk__45041;
var G__45049 = count__45042;
var G__45050 = (i__45043 + (1));
seq__45040 = G__45047;
chunk__45041 = G__45048;
count__45042 = G__45049;
i__45043 = G__45050;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__45040);
if(temp__4425__auto__){
var seq__45040__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45040__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__45040__$1);
var G__45051 = cljs.core.chunk_rest.call(null,seq__45040__$1);
var G__45052 = c__17070__auto__;
var G__45053 = cljs.core.count.call(null,c__17070__auto__);
var G__45054 = (0);
seq__45040 = G__45051;
chunk__45041 = G__45052;
count__45042 = G__45053;
i__45043 = G__45054;
continue;
} else {
var vec__45045 = cljs.core.first.call(null,seq__45040__$1);
var k = cljs.core.nth.call(null,vec__45045,(0),null);
var plugin = cljs.core.nth.call(null,vec__45045,(1),null);
if(cljs.core.truth_(plugin)){
var pl_45055 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__45040,chunk__45041,count__45042,i__45043,pl_45055,vec__45045,k,plugin,seq__45040__$1,temp__4425__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_45055.call(null,msg_hist);
});})(seq__45040,chunk__45041,count__45042,i__45043,pl_45055,vec__45045,k,plugin,seq__45040__$1,temp__4425__auto__))
);
} else {
}

var G__45056 = cljs.core.next.call(null,seq__45040__$1);
var G__45057 = null;
var G__45058 = (0);
var G__45059 = (0);
seq__45040 = G__45056;
chunk__45041 = G__45057;
count__45042 = G__45058;
i__45043 = G__45059;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.start = (function figwheel$client$start(var_args){
var args45060 = [];
var len__17325__auto___45063 = arguments.length;
var i__17326__auto___45064 = (0);
while(true){
if((i__17326__auto___45064 < len__17325__auto___45063)){
args45060.push((arguments[i__17326__auto___45064]));

var G__45065 = (i__17326__auto___45064 + (1));
i__17326__auto___45064 = G__45065;
continue;
} else {
}
break;
}

var G__45062 = args45060.length;
switch (G__45062) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args45060.length)].join('')));

}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$1 = (function (opts){
if((goog.dependencies_ == null)){
return null;
} else {
if(typeof figwheel.client.__figwheel_start_once__ !== 'undefined'){
return null;
} else {
figwheel.client.__figwheel_start_once__ = setTimeout((function (){
var plugins_SINGLEQUOTE_ = new cljs.core.Keyword(null,"plugins","plugins",1900073717).cljs$core$IFn$_invoke$arity$1(opts);
var merge_plugins = new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370).cljs$core$IFn$_invoke$arity$1(opts);
var system_options = figwheel.client.handle_deprecated_jsload_callback.call(null,cljs.core.merge.call(null,figwheel.client.config_defaults,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"plugins","plugins",1900073717),new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370))));
var plugins = (cljs.core.truth_(plugins_SINGLEQUOTE_)?plugins_SINGLEQUOTE_:cljs.core.merge.call(null,figwheel.client.base_plugins.call(null,system_options),merge_plugins));
figwheel.client.utils._STAR_print_debug_STAR_ = new cljs.core.Keyword(null,"debug","debug",-1608172596).cljs$core$IFn$_invoke$arity$1(opts);

figwheel.client.add_plugins.call(null,plugins,system_options);

figwheel.client.file_reloading.patch_goog_base.call(null);

return figwheel.client.socket.open.call(null,system_options);
}));
}
}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$0 = (function (){
return figwheel.client.start.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

figwheel.client.start.cljs$lang$maxFixedArity = 1;
figwheel.client.watch_and_reload_with_opts = figwheel.client.start;
figwheel.client.watch_and_reload = (function figwheel$client$watch_and_reload(var_args){
var args__17332__auto__ = [];
var len__17325__auto___45071 = arguments.length;
var i__17326__auto___45072 = (0);
while(true){
if((i__17326__auto___45072 < len__17325__auto___45071)){
args__17332__auto__.push((arguments[i__17326__auto___45072]));

var G__45073 = (i__17326__auto___45072 + (1));
i__17326__auto___45072 = G__45073;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((0) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((0)),(0))):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__17333__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__45068){
var map__45069 = p__45068;
var map__45069__$1 = ((((!((map__45069 == null)))?((((map__45069.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45069.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45069):map__45069);
var opts = map__45069__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq45067){
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq45067));
});

//# sourceMappingURL=client.js.map?rel=1445823449690