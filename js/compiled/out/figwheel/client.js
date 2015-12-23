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
var G__28254__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__28254 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__28255__i = 0, G__28255__a = new Array(arguments.length -  0);
while (G__28255__i < G__28255__a.length) {G__28255__a[G__28255__i] = arguments[G__28255__i + 0]; ++G__28255__i;}
  args = new cljs.core.IndexedSeq(G__28255__a,0);
} 
return G__28254__delegate.call(this,args);};
G__28254.cljs$lang$maxFixedArity = 0;
G__28254.cljs$lang$applyTo = (function (arglist__28256){
var args = cljs.core.seq(arglist__28256);
return G__28254__delegate(args);
});
G__28254.cljs$core$IFn$_invoke$arity$variadic = G__28254__delegate;
return G__28254;
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
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__28257){
var map__28260 = p__28257;
var map__28260__$1 = ((((!((map__28260 == null)))?((((map__28260.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28260.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28260):map__28260);
var message = cljs.core.get.call(null,map__28260__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__28260__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
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
var c__20372__auto___28408 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___28408,ch){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___28408,ch){
return (function (state_28378){
var state_val_28379 = (state_28378[(1)]);
if((state_val_28379 === (7))){
var inst_28374 = (state_28378[(2)]);
var state_28378__$1 = state_28378;
var statearr_28380_28409 = state_28378__$1;
(statearr_28380_28409[(2)] = inst_28374);

(statearr_28380_28409[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28379 === (1))){
var state_28378__$1 = state_28378;
var statearr_28381_28410 = state_28378__$1;
(statearr_28381_28410[(2)] = null);

(statearr_28381_28410[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28379 === (4))){
var inst_28337 = (state_28378[(7)]);
var inst_28337__$1 = (state_28378[(2)]);
var state_28378__$1 = (function (){var statearr_28382 = state_28378;
(statearr_28382[(7)] = inst_28337__$1);

return statearr_28382;
})();
if(cljs.core.truth_(inst_28337__$1)){
var statearr_28383_28411 = state_28378__$1;
(statearr_28383_28411[(1)] = (5));

} else {
var statearr_28384_28412 = state_28378__$1;
(statearr_28384_28412[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28379 === (15))){
var inst_28344 = (state_28378[(8)]);
var inst_28359 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_28344);
var inst_28360 = cljs.core.first.call(null,inst_28359);
var inst_28361 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_28360);
var inst_28362 = console.warn("Figwheel: Not loading code with warnings - ",inst_28361);
var state_28378__$1 = state_28378;
var statearr_28385_28413 = state_28378__$1;
(statearr_28385_28413[(2)] = inst_28362);

(statearr_28385_28413[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28379 === (13))){
var inst_28367 = (state_28378[(2)]);
var state_28378__$1 = state_28378;
var statearr_28386_28414 = state_28378__$1;
(statearr_28386_28414[(2)] = inst_28367);

(statearr_28386_28414[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28379 === (6))){
var state_28378__$1 = state_28378;
var statearr_28387_28415 = state_28378__$1;
(statearr_28387_28415[(2)] = null);

(statearr_28387_28415[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28379 === (17))){
var inst_28365 = (state_28378[(2)]);
var state_28378__$1 = state_28378;
var statearr_28388_28416 = state_28378__$1;
(statearr_28388_28416[(2)] = inst_28365);

(statearr_28388_28416[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28379 === (3))){
var inst_28376 = (state_28378[(2)]);
var state_28378__$1 = state_28378;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28378__$1,inst_28376);
} else {
if((state_val_28379 === (12))){
var inst_28343 = (state_28378[(9)]);
var inst_28357 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_28343,opts);
var state_28378__$1 = state_28378;
if(cljs.core.truth_(inst_28357)){
var statearr_28389_28417 = state_28378__$1;
(statearr_28389_28417[(1)] = (15));

} else {
var statearr_28390_28418 = state_28378__$1;
(statearr_28390_28418[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28379 === (2))){
var state_28378__$1 = state_28378;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28378__$1,(4),ch);
} else {
if((state_val_28379 === (11))){
var inst_28344 = (state_28378[(8)]);
var inst_28349 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_28350 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_28344);
var inst_28351 = cljs.core.async.timeout.call(null,(1000));
var inst_28352 = [inst_28350,inst_28351];
var inst_28353 = (new cljs.core.PersistentVector(null,2,(5),inst_28349,inst_28352,null));
var state_28378__$1 = state_28378;
return cljs.core.async.ioc_alts_BANG_.call(null,state_28378__$1,(14),inst_28353);
} else {
if((state_val_28379 === (9))){
var state_28378__$1 = state_28378;
var statearr_28391_28419 = state_28378__$1;
(statearr_28391_28419[(2)] = null);

(statearr_28391_28419[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28379 === (5))){
var inst_28337 = (state_28378[(7)]);
var inst_28339 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_28340 = (new cljs.core.PersistentArrayMap(null,2,inst_28339,null));
var inst_28341 = (new cljs.core.PersistentHashSet(null,inst_28340,null));
var inst_28342 = figwheel.client.focus_msgs.call(null,inst_28341,inst_28337);
var inst_28343 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_28342);
var inst_28344 = cljs.core.first.call(null,inst_28342);
var inst_28345 = cljs.core.deref.call(null,figwheel.client.autoload);
var state_28378__$1 = (function (){var statearr_28392 = state_28378;
(statearr_28392[(8)] = inst_28344);

(statearr_28392[(9)] = inst_28343);

return statearr_28392;
})();
if(cljs.core.truth_(inst_28345)){
var statearr_28393_28420 = state_28378__$1;
(statearr_28393_28420[(1)] = (8));

} else {
var statearr_28394_28421 = state_28378__$1;
(statearr_28394_28421[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28379 === (14))){
var inst_28355 = (state_28378[(2)]);
var state_28378__$1 = state_28378;
var statearr_28395_28422 = state_28378__$1;
(statearr_28395_28422[(2)] = inst_28355);

(statearr_28395_28422[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28379 === (16))){
var state_28378__$1 = state_28378;
var statearr_28396_28423 = state_28378__$1;
(statearr_28396_28423[(2)] = null);

(statearr_28396_28423[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28379 === (10))){
var inst_28370 = (state_28378[(2)]);
var state_28378__$1 = (function (){var statearr_28397 = state_28378;
(statearr_28397[(10)] = inst_28370);

return statearr_28397;
})();
var statearr_28398_28424 = state_28378__$1;
(statearr_28398_28424[(2)] = null);

(statearr_28398_28424[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28379 === (8))){
var inst_28343 = (state_28378[(9)]);
var inst_28347 = figwheel.client.reload_file_state_QMARK_.call(null,inst_28343,opts);
var state_28378__$1 = state_28378;
if(cljs.core.truth_(inst_28347)){
var statearr_28399_28425 = state_28378__$1;
(statearr_28399_28425[(1)] = (11));

} else {
var statearr_28400_28426 = state_28378__$1;
(statearr_28400_28426[(1)] = (12));

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
});})(c__20372__auto___28408,ch))
;
return ((function (switch__20351__auto__,c__20372__auto___28408,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__20352__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__20352__auto____0 = (function (){
var statearr_28404 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_28404[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__20352__auto__);

(statearr_28404[(1)] = (1));

return statearr_28404;
});
var figwheel$client$file_reloader_plugin_$_state_machine__20352__auto____1 = (function (state_28378){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_28378);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e28405){if((e28405 instanceof Object)){
var ex__20355__auto__ = e28405;
var statearr_28406_28427 = state_28378;
(statearr_28406_28427[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28378);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28405;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28428 = state_28378;
state_28378 = G__28428;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__20352__auto__ = function(state_28378){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__20352__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__20352__auto____1.call(this,state_28378);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__20352__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__20352__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___28408,ch))
})();
var state__20374__auto__ = (function (){var statearr_28407 = f__20373__auto__.call(null);
(statearr_28407[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___28408);

return statearr_28407;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___28408,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__28429_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__28429_SHARP_));
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
var base_path_28436 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_28436){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,opts,result_handler){
try{var _STAR_print_fn_STAR_28434 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR_28435 = cljs.core._STAR_print_newline_STAR_;
cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_fn_STAR_28434,_STAR_print_newline_STAR_28435,base_path_28436){
return (function() { 
var G__28437__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__28437 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__28438__i = 0, G__28438__a = new Array(arguments.length -  0);
while (G__28438__i < G__28438__a.length) {G__28438__a[G__28438__i] = arguments[G__28438__i + 0]; ++G__28438__i;}
  args = new cljs.core.IndexedSeq(G__28438__a,0);
} 
return G__28437__delegate.call(this,args);};
G__28437.cljs$lang$maxFixedArity = 0;
G__28437.cljs$lang$applyTo = (function (arglist__28439){
var args = cljs.core.seq(arglist__28439);
return G__28437__delegate(args);
});
G__28437.cljs$core$IFn$_invoke$arity$variadic = G__28437__delegate;
return G__28437;
})()
;})(_STAR_print_fn_STAR_28434,_STAR_print_newline_STAR_28435,base_path_28436))
;

cljs.core._STAR_print_newline_STAR_ = false;

try{return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),[cljs.core.str(figwheel.client.utils.eval_helper.call(null,code,opts))].join('')], null));
}finally {cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_28435;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_28434;
}}catch (e28433){if((e28433 instanceof Error)){
var e = e28433;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_28436], null));
} else {
var e = e28433;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}});})(base_path_28436))
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
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__28440){
var map__28447 = p__28440;
var map__28447__$1 = ((((!((map__28447 == null)))?((((map__28447.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28447.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28447):map__28447);
var opts = map__28447__$1;
var build_id = cljs.core.get.call(null,map__28447__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__28447,map__28447__$1,opts,build_id){
return (function (p__28449){
var vec__28450 = p__28449;
var map__28451 = cljs.core.nth.call(null,vec__28450,(0),null);
var map__28451__$1 = ((((!((map__28451 == null)))?((((map__28451.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28451.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28451):map__28451);
var msg = map__28451__$1;
var msg_name = cljs.core.get.call(null,map__28451__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__28450,(1));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),opts,((function (vec__28450,map__28451,map__28451__$1,msg,msg_name,_,map__28447,map__28447__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__28450,map__28451,map__28451__$1,msg,msg_name,_,map__28447,map__28447__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__28447,map__28447__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__28457){
var vec__28458 = p__28457;
var map__28459 = cljs.core.nth.call(null,vec__28458,(0),null);
var map__28459__$1 = ((((!((map__28459 == null)))?((((map__28459.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28459.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28459):map__28459);
var msg = map__28459__$1;
var msg_name = cljs.core.get.call(null,map__28459__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__28458,(1));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__28461){
var map__28471 = p__28461;
var map__28471__$1 = ((((!((map__28471 == null)))?((((map__28471.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28471.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28471):map__28471);
var on_compile_warning = cljs.core.get.call(null,map__28471__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__28471__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return ((function (map__28471,map__28471__$1,on_compile_warning,on_compile_fail){
return (function (p__28473){
var vec__28474 = p__28473;
var map__28475 = cljs.core.nth.call(null,vec__28474,(0),null);
var map__28475__$1 = ((((!((map__28475 == null)))?((((map__28475.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28475.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28475):map__28475);
var msg = map__28475__$1;
var msg_name = cljs.core.get.call(null,map__28475__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__28474,(1));
var pred__28477 = cljs.core._EQ_;
var expr__28478 = msg_name;
if(cljs.core.truth_(pred__28477.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__28478))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__28477.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__28478))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__28471,map__28471__$1,on_compile_warning,on_compile_fail))
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__20372__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto__,msg_hist,msg_names,msg){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto__,msg_hist,msg_names,msg){
return (function (state_28694){
var state_val_28695 = (state_28694[(1)]);
if((state_val_28695 === (7))){
var inst_28618 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
if(cljs.core.truth_(inst_28618)){
var statearr_28696_28742 = state_28694__$1;
(statearr_28696_28742[(1)] = (8));

} else {
var statearr_28697_28743 = state_28694__$1;
(statearr_28697_28743[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (20))){
var inst_28688 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28698_28744 = state_28694__$1;
(statearr_28698_28744[(2)] = inst_28688);

(statearr_28698_28744[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (27))){
var inst_28684 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28699_28745 = state_28694__$1;
(statearr_28699_28745[(2)] = inst_28684);

(statearr_28699_28745[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (1))){
var inst_28611 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_28694__$1 = state_28694;
if(cljs.core.truth_(inst_28611)){
var statearr_28700_28746 = state_28694__$1;
(statearr_28700_28746[(1)] = (2));

} else {
var statearr_28701_28747 = state_28694__$1;
(statearr_28701_28747[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (24))){
var inst_28686 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28702_28748 = state_28694__$1;
(statearr_28702_28748[(2)] = inst_28686);

(statearr_28702_28748[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (4))){
var inst_28692 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28694__$1,inst_28692);
} else {
if((state_val_28695 === (15))){
var inst_28690 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28703_28749 = state_28694__$1;
(statearr_28703_28749[(2)] = inst_28690);

(statearr_28703_28749[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (21))){
var inst_28649 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28704_28750 = state_28694__$1;
(statearr_28704_28750[(2)] = inst_28649);

(statearr_28704_28750[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (31))){
var inst_28673 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_28694__$1 = state_28694;
if(cljs.core.truth_(inst_28673)){
var statearr_28705_28751 = state_28694__$1;
(statearr_28705_28751[(1)] = (34));

} else {
var statearr_28706_28752 = state_28694__$1;
(statearr_28706_28752[(1)] = (35));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (32))){
var inst_28682 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28707_28753 = state_28694__$1;
(statearr_28707_28753[(2)] = inst_28682);

(statearr_28707_28753[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (33))){
var inst_28671 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28708_28754 = state_28694__$1;
(statearr_28708_28754[(2)] = inst_28671);

(statearr_28708_28754[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (13))){
var inst_28632 = figwheel.client.heads_up.clear.call(null);
var state_28694__$1 = state_28694;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28694__$1,(16),inst_28632);
} else {
if((state_val_28695 === (22))){
var inst_28653 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_28654 = figwheel.client.heads_up.append_message.call(null,inst_28653);
var state_28694__$1 = state_28694;
var statearr_28709_28755 = state_28694__$1;
(statearr_28709_28755[(2)] = inst_28654);

(statearr_28709_28755[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (36))){
var inst_28680 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28710_28756 = state_28694__$1;
(statearr_28710_28756[(2)] = inst_28680);

(statearr_28710_28756[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (29))){
var inst_28664 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28711_28757 = state_28694__$1;
(statearr_28711_28757[(2)] = inst_28664);

(statearr_28711_28757[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (6))){
var inst_28613 = (state_28694[(7)]);
var state_28694__$1 = state_28694;
var statearr_28712_28758 = state_28694__$1;
(statearr_28712_28758[(2)] = inst_28613);

(statearr_28712_28758[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (28))){
var inst_28660 = (state_28694[(2)]);
var inst_28661 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_28662 = figwheel.client.heads_up.display_warning.call(null,inst_28661);
var state_28694__$1 = (function (){var statearr_28713 = state_28694;
(statearr_28713[(8)] = inst_28660);

return statearr_28713;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28694__$1,(29),inst_28662);
} else {
if((state_val_28695 === (25))){
var inst_28658 = figwheel.client.heads_up.clear.call(null);
var state_28694__$1 = state_28694;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28694__$1,(28),inst_28658);
} else {
if((state_val_28695 === (34))){
var inst_28675 = figwheel.client.heads_up.flash_loaded.call(null);
var state_28694__$1 = state_28694;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28694__$1,(37),inst_28675);
} else {
if((state_val_28695 === (17))){
var inst_28640 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28714_28759 = state_28694__$1;
(statearr_28714_28759[(2)] = inst_28640);

(statearr_28714_28759[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (3))){
var inst_28630 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_28694__$1 = state_28694;
if(cljs.core.truth_(inst_28630)){
var statearr_28715_28760 = state_28694__$1;
(statearr_28715_28760[(1)] = (13));

} else {
var statearr_28716_28761 = state_28694__$1;
(statearr_28716_28761[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (12))){
var inst_28626 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28717_28762 = state_28694__$1;
(statearr_28717_28762[(2)] = inst_28626);

(statearr_28717_28762[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (2))){
var inst_28613 = (state_28694[(7)]);
var inst_28613__$1 = cljs.core.deref.call(null,figwheel.client.autoload);
var state_28694__$1 = (function (){var statearr_28718 = state_28694;
(statearr_28718[(7)] = inst_28613__$1);

return statearr_28718;
})();
if(cljs.core.truth_(inst_28613__$1)){
var statearr_28719_28763 = state_28694__$1;
(statearr_28719_28763[(1)] = (5));

} else {
var statearr_28720_28764 = state_28694__$1;
(statearr_28720_28764[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (23))){
var inst_28656 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_28694__$1 = state_28694;
if(cljs.core.truth_(inst_28656)){
var statearr_28721_28765 = state_28694__$1;
(statearr_28721_28765[(1)] = (25));

} else {
var statearr_28722_28766 = state_28694__$1;
(statearr_28722_28766[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (35))){
var state_28694__$1 = state_28694;
var statearr_28723_28767 = state_28694__$1;
(statearr_28723_28767[(2)] = null);

(statearr_28723_28767[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (19))){
var inst_28651 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_28694__$1 = state_28694;
if(cljs.core.truth_(inst_28651)){
var statearr_28724_28768 = state_28694__$1;
(statearr_28724_28768[(1)] = (22));

} else {
var statearr_28725_28769 = state_28694__$1;
(statearr_28725_28769[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (11))){
var inst_28622 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28726_28770 = state_28694__$1;
(statearr_28726_28770[(2)] = inst_28622);

(statearr_28726_28770[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (9))){
var inst_28624 = figwheel.client.heads_up.clear.call(null);
var state_28694__$1 = state_28694;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28694__$1,(12),inst_28624);
} else {
if((state_val_28695 === (5))){
var inst_28615 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_28694__$1 = state_28694;
var statearr_28727_28771 = state_28694__$1;
(statearr_28727_28771[(2)] = inst_28615);

(statearr_28727_28771[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (14))){
var inst_28642 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_28694__$1 = state_28694;
if(cljs.core.truth_(inst_28642)){
var statearr_28728_28772 = state_28694__$1;
(statearr_28728_28772[(1)] = (18));

} else {
var statearr_28729_28773 = state_28694__$1;
(statearr_28729_28773[(1)] = (19));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (26))){
var inst_28666 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_28694__$1 = state_28694;
if(cljs.core.truth_(inst_28666)){
var statearr_28730_28774 = state_28694__$1;
(statearr_28730_28774[(1)] = (30));

} else {
var statearr_28731_28775 = state_28694__$1;
(statearr_28731_28775[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (16))){
var inst_28634 = (state_28694[(2)]);
var inst_28635 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_28636 = figwheel.client.format_messages.call(null,inst_28635);
var inst_28637 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_28638 = figwheel.client.heads_up.display_error.call(null,inst_28636,inst_28637);
var state_28694__$1 = (function (){var statearr_28732 = state_28694;
(statearr_28732[(9)] = inst_28634);

return statearr_28732;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28694__$1,(17),inst_28638);
} else {
if((state_val_28695 === (30))){
var inst_28668 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_28669 = figwheel.client.heads_up.display_warning.call(null,inst_28668);
var state_28694__$1 = state_28694;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28694__$1,(33),inst_28669);
} else {
if((state_val_28695 === (10))){
var inst_28628 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28733_28776 = state_28694__$1;
(statearr_28733_28776[(2)] = inst_28628);

(statearr_28733_28776[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (18))){
var inst_28644 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_28645 = figwheel.client.format_messages.call(null,inst_28644);
var inst_28646 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_28647 = figwheel.client.heads_up.display_error.call(null,inst_28645,inst_28646);
var state_28694__$1 = state_28694;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28694__$1,(21),inst_28647);
} else {
if((state_val_28695 === (37))){
var inst_28677 = (state_28694[(2)]);
var state_28694__$1 = state_28694;
var statearr_28734_28777 = state_28694__$1;
(statearr_28734_28777[(2)] = inst_28677);

(statearr_28734_28777[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28695 === (8))){
var inst_28620 = figwheel.client.heads_up.flash_loaded.call(null);
var state_28694__$1 = state_28694;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28694__$1,(11),inst_28620);
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
});})(c__20372__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__20351__auto__,c__20372__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20352__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20352__auto____0 = (function (){
var statearr_28738 = [null,null,null,null,null,null,null,null,null,null];
(statearr_28738[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20352__auto__);

(statearr_28738[(1)] = (1));

return statearr_28738;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20352__auto____1 = (function (state_28694){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_28694);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e28739){if((e28739 instanceof Object)){
var ex__20355__auto__ = e28739;
var statearr_28740_28778 = state_28694;
(statearr_28740_28778[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28694);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28739;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28779 = state_28694;
state_28694 = G__28779;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20352__auto__ = function(state_28694){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20352__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20352__auto____1.call(this,state_28694);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20352__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20352__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto__,msg_hist,msg_names,msg))
})();
var state__20374__auto__ = (function (){var statearr_28741 = f__20373__auto__.call(null);
(statearr_28741[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto__);

return statearr_28741;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto__,msg_hist,msg_names,msg))
);

return c__20372__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__20372__auto___28842 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___28842,ch){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___28842,ch){
return (function (state_28825){
var state_val_28826 = (state_28825[(1)]);
if((state_val_28826 === (1))){
var state_28825__$1 = state_28825;
var statearr_28827_28843 = state_28825__$1;
(statearr_28827_28843[(2)] = null);

(statearr_28827_28843[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28826 === (2))){
var state_28825__$1 = state_28825;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28825__$1,(4),ch);
} else {
if((state_val_28826 === (3))){
var inst_28823 = (state_28825[(2)]);
var state_28825__$1 = state_28825;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28825__$1,inst_28823);
} else {
if((state_val_28826 === (4))){
var inst_28813 = (state_28825[(7)]);
var inst_28813__$1 = (state_28825[(2)]);
var state_28825__$1 = (function (){var statearr_28828 = state_28825;
(statearr_28828[(7)] = inst_28813__$1);

return statearr_28828;
})();
if(cljs.core.truth_(inst_28813__$1)){
var statearr_28829_28844 = state_28825__$1;
(statearr_28829_28844[(1)] = (5));

} else {
var statearr_28830_28845 = state_28825__$1;
(statearr_28830_28845[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28826 === (5))){
var inst_28813 = (state_28825[(7)]);
var inst_28815 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_28813);
var state_28825__$1 = state_28825;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28825__$1,(8),inst_28815);
} else {
if((state_val_28826 === (6))){
var state_28825__$1 = state_28825;
var statearr_28831_28846 = state_28825__$1;
(statearr_28831_28846[(2)] = null);

(statearr_28831_28846[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28826 === (7))){
var inst_28821 = (state_28825[(2)]);
var state_28825__$1 = state_28825;
var statearr_28832_28847 = state_28825__$1;
(statearr_28832_28847[(2)] = inst_28821);

(statearr_28832_28847[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28826 === (8))){
var inst_28817 = (state_28825[(2)]);
var state_28825__$1 = (function (){var statearr_28833 = state_28825;
(statearr_28833[(8)] = inst_28817);

return statearr_28833;
})();
var statearr_28834_28848 = state_28825__$1;
(statearr_28834_28848[(2)] = null);

(statearr_28834_28848[(1)] = (2));


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
});})(c__20372__auto___28842,ch))
;
return ((function (switch__20351__auto__,c__20372__auto___28842,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__20352__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__20352__auto____0 = (function (){
var statearr_28838 = [null,null,null,null,null,null,null,null,null];
(statearr_28838[(0)] = figwheel$client$heads_up_plugin_$_state_machine__20352__auto__);

(statearr_28838[(1)] = (1));

return statearr_28838;
});
var figwheel$client$heads_up_plugin_$_state_machine__20352__auto____1 = (function (state_28825){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_28825);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e28839){if((e28839 instanceof Object)){
var ex__20355__auto__ = e28839;
var statearr_28840_28849 = state_28825;
(statearr_28840_28849[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28825);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28839;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28850 = state_28825;
state_28825 = G__28850;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__20352__auto__ = function(state_28825){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__20352__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__20352__auto____1.call(this,state_28825);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__20352__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__20352__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___28842,ch))
})();
var state__20374__auto__ = (function (){var statearr_28841 = f__20373__auto__.call(null);
(statearr_28841[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___28842);

return statearr_28841;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___28842,ch))
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
var c__20372__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto__){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto__){
return (function (state_28871){
var state_val_28872 = (state_28871[(1)]);
if((state_val_28872 === (1))){
var inst_28866 = cljs.core.async.timeout.call(null,(3000));
var state_28871__$1 = state_28871;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28871__$1,(2),inst_28866);
} else {
if((state_val_28872 === (2))){
var inst_28868 = (state_28871[(2)]);
var inst_28869 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_28871__$1 = (function (){var statearr_28873 = state_28871;
(statearr_28873[(7)] = inst_28868);

return statearr_28873;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28871__$1,inst_28869);
} else {
return null;
}
}
});})(c__20372__auto__))
;
return ((function (switch__20351__auto__,c__20372__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__20352__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__20352__auto____0 = (function (){
var statearr_28877 = [null,null,null,null,null,null,null,null];
(statearr_28877[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__20352__auto__);

(statearr_28877[(1)] = (1));

return statearr_28877;
});
var figwheel$client$enforce_project_plugin_$_state_machine__20352__auto____1 = (function (state_28871){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_28871);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e28878){if((e28878 instanceof Object)){
var ex__20355__auto__ = e28878;
var statearr_28879_28881 = state_28871;
(statearr_28879_28881[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28871);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28878;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28882 = state_28871;
state_28871 = G__28882;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__20352__auto__ = function(state_28871){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__20352__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__20352__auto____1.call(this,state_28871);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__20352__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__20352__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto__))
})();
var state__20374__auto__ = (function (){var statearr_28880 = f__20373__auto__.call(null);
(statearr_28880[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto__);

return statearr_28880;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto__))
);

return c__20372__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = cljs.core.identity;
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__28883){
var map__28890 = p__28883;
var map__28890__$1 = ((((!((map__28890 == null)))?((((map__28890.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28890.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28890):map__28890);
var ed = map__28890__$1;
var formatted_exception = cljs.core.get.call(null,map__28890__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));
var exception_data = cljs.core.get.call(null,map__28890__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__28890__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: Compile Exception");

var seq__28892_28896 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));
var chunk__28893_28897 = null;
var count__28894_28898 = (0);
var i__28895_28899 = (0);
while(true){
if((i__28895_28899 < count__28894_28898)){
var msg_28900 = cljs.core._nth.call(null,chunk__28893_28897,i__28895_28899);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_28900);

var G__28901 = seq__28892_28896;
var G__28902 = chunk__28893_28897;
var G__28903 = count__28894_28898;
var G__28904 = (i__28895_28899 + (1));
seq__28892_28896 = G__28901;
chunk__28893_28897 = G__28902;
count__28894_28898 = G__28903;
i__28895_28899 = G__28904;
continue;
} else {
var temp__4425__auto___28905 = cljs.core.seq.call(null,seq__28892_28896);
if(temp__4425__auto___28905){
var seq__28892_28906__$1 = temp__4425__auto___28905;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__28892_28906__$1)){
var c__17070__auto___28907 = cljs.core.chunk_first.call(null,seq__28892_28906__$1);
var G__28908 = cljs.core.chunk_rest.call(null,seq__28892_28906__$1);
var G__28909 = c__17070__auto___28907;
var G__28910 = cljs.core.count.call(null,c__17070__auto___28907);
var G__28911 = (0);
seq__28892_28896 = G__28908;
chunk__28893_28897 = G__28909;
count__28894_28898 = G__28910;
i__28895_28899 = G__28911;
continue;
} else {
var msg_28912 = cljs.core.first.call(null,seq__28892_28906__$1);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_28912);

var G__28913 = cljs.core.next.call(null,seq__28892_28906__$1);
var G__28914 = null;
var G__28915 = (0);
var G__28916 = (0);
seq__28892_28896 = G__28913;
chunk__28893_28897 = G__28914;
count__28894_28898 = G__28915;
i__28895_28899 = G__28916;
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
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__28917){
var map__28920 = p__28917;
var map__28920__$1 = ((((!((map__28920 == null)))?((((map__28920.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28920.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28920):map__28920);
var w = map__28920__$1;
var message = cljs.core.get.call(null,map__28920__$1,new cljs.core.Keyword(null,"message","message",-406056002));
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
var seq__28928 = cljs.core.seq.call(null,plugins);
var chunk__28929 = null;
var count__28930 = (0);
var i__28931 = (0);
while(true){
if((i__28931 < count__28930)){
var vec__28932 = cljs.core._nth.call(null,chunk__28929,i__28931);
var k = cljs.core.nth.call(null,vec__28932,(0),null);
var plugin = cljs.core.nth.call(null,vec__28932,(1),null);
if(cljs.core.truth_(plugin)){
var pl_28934 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__28928,chunk__28929,count__28930,i__28931,pl_28934,vec__28932,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_28934.call(null,msg_hist);
});})(seq__28928,chunk__28929,count__28930,i__28931,pl_28934,vec__28932,k,plugin))
);
} else {
}

var G__28935 = seq__28928;
var G__28936 = chunk__28929;
var G__28937 = count__28930;
var G__28938 = (i__28931 + (1));
seq__28928 = G__28935;
chunk__28929 = G__28936;
count__28930 = G__28937;
i__28931 = G__28938;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__28928);
if(temp__4425__auto__){
var seq__28928__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__28928__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__28928__$1);
var G__28939 = cljs.core.chunk_rest.call(null,seq__28928__$1);
var G__28940 = c__17070__auto__;
var G__28941 = cljs.core.count.call(null,c__17070__auto__);
var G__28942 = (0);
seq__28928 = G__28939;
chunk__28929 = G__28940;
count__28930 = G__28941;
i__28931 = G__28942;
continue;
} else {
var vec__28933 = cljs.core.first.call(null,seq__28928__$1);
var k = cljs.core.nth.call(null,vec__28933,(0),null);
var plugin = cljs.core.nth.call(null,vec__28933,(1),null);
if(cljs.core.truth_(plugin)){
var pl_28943 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__28928,chunk__28929,count__28930,i__28931,pl_28943,vec__28933,k,plugin,seq__28928__$1,temp__4425__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_28943.call(null,msg_hist);
});})(seq__28928,chunk__28929,count__28930,i__28931,pl_28943,vec__28933,k,plugin,seq__28928__$1,temp__4425__auto__))
);
} else {
}

var G__28944 = cljs.core.next.call(null,seq__28928__$1);
var G__28945 = null;
var G__28946 = (0);
var G__28947 = (0);
seq__28928 = G__28944;
chunk__28929 = G__28945;
count__28930 = G__28946;
i__28931 = G__28947;
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
var args28948 = [];
var len__17325__auto___28951 = arguments.length;
var i__17326__auto___28952 = (0);
while(true){
if((i__17326__auto___28952 < len__17325__auto___28951)){
args28948.push((arguments[i__17326__auto___28952]));

var G__28953 = (i__17326__auto___28952 + (1));
i__17326__auto___28952 = G__28953;
continue;
} else {
}
break;
}

var G__28950 = args28948.length;
switch (G__28950) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args28948.length)].join('')));

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
var len__17325__auto___28959 = arguments.length;
var i__17326__auto___28960 = (0);
while(true){
if((i__17326__auto___28960 < len__17325__auto___28959)){
args__17332__auto__.push((arguments[i__17326__auto___28960]));

var G__28961 = (i__17326__auto___28960 + (1));
i__17326__auto___28960 = G__28961;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((0) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((0)),(0))):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__17333__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__28956){
var map__28957 = p__28956;
var map__28957__$1 = ((((!((map__28957 == null)))?((((map__28957.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28957.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__28957):map__28957);
var opts = map__28957__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq28955){
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq28955));
});

//# sourceMappingURL=client.js.map?rel=1450835348571