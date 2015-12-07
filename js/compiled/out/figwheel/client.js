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
var G__38586__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__38586 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__38587__i = 0, G__38587__a = new Array(arguments.length -  0);
while (G__38587__i < G__38587__a.length) {G__38587__a[G__38587__i] = arguments[G__38587__i + 0]; ++G__38587__i;}
  args = new cljs.core.IndexedSeq(G__38587__a,0);
} 
return G__38586__delegate.call(this,args);};
G__38586.cljs$lang$maxFixedArity = 0;
G__38586.cljs$lang$applyTo = (function (arglist__38588){
var args = cljs.core.seq(arglist__38588);
return G__38586__delegate(args);
});
G__38586.cljs$core$IFn$_invoke$arity$variadic = G__38586__delegate;
return G__38586;
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
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__38589){
var map__38592 = p__38589;
var map__38592__$1 = ((((!((map__38592 == null)))?((((map__38592.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38592.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38592):map__38592);
var message = cljs.core.get.call(null,map__38592__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__38592__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
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
var c__20534__auto___38740 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___38740,ch){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___38740,ch){
return (function (state_38710){
var state_val_38711 = (state_38710[(1)]);
if((state_val_38711 === (7))){
var inst_38706 = (state_38710[(2)]);
var state_38710__$1 = state_38710;
var statearr_38712_38741 = state_38710__$1;
(statearr_38712_38741[(2)] = inst_38706);

(statearr_38712_38741[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38711 === (1))){
var state_38710__$1 = state_38710;
var statearr_38713_38742 = state_38710__$1;
(statearr_38713_38742[(2)] = null);

(statearr_38713_38742[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38711 === (4))){
var inst_38669 = (state_38710[(7)]);
var inst_38669__$1 = (state_38710[(2)]);
var state_38710__$1 = (function (){var statearr_38714 = state_38710;
(statearr_38714[(7)] = inst_38669__$1);

return statearr_38714;
})();
if(cljs.core.truth_(inst_38669__$1)){
var statearr_38715_38743 = state_38710__$1;
(statearr_38715_38743[(1)] = (5));

} else {
var statearr_38716_38744 = state_38710__$1;
(statearr_38716_38744[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38711 === (15))){
var inst_38676 = (state_38710[(8)]);
var inst_38691 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_38676);
var inst_38692 = cljs.core.first.call(null,inst_38691);
var inst_38693 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_38692);
var inst_38694 = console.warn("Figwheel: Not loading code with warnings - ",inst_38693);
var state_38710__$1 = state_38710;
var statearr_38717_38745 = state_38710__$1;
(statearr_38717_38745[(2)] = inst_38694);

(statearr_38717_38745[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38711 === (13))){
var inst_38699 = (state_38710[(2)]);
var state_38710__$1 = state_38710;
var statearr_38718_38746 = state_38710__$1;
(statearr_38718_38746[(2)] = inst_38699);

(statearr_38718_38746[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38711 === (6))){
var state_38710__$1 = state_38710;
var statearr_38719_38747 = state_38710__$1;
(statearr_38719_38747[(2)] = null);

(statearr_38719_38747[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38711 === (17))){
var inst_38697 = (state_38710[(2)]);
var state_38710__$1 = state_38710;
var statearr_38720_38748 = state_38710__$1;
(statearr_38720_38748[(2)] = inst_38697);

(statearr_38720_38748[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38711 === (3))){
var inst_38708 = (state_38710[(2)]);
var state_38710__$1 = state_38710;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38710__$1,inst_38708);
} else {
if((state_val_38711 === (12))){
var inst_38675 = (state_38710[(9)]);
var inst_38689 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_38675,opts);
var state_38710__$1 = state_38710;
if(cljs.core.truth_(inst_38689)){
var statearr_38721_38749 = state_38710__$1;
(statearr_38721_38749[(1)] = (15));

} else {
var statearr_38722_38750 = state_38710__$1;
(statearr_38722_38750[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38711 === (2))){
var state_38710__$1 = state_38710;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38710__$1,(4),ch);
} else {
if((state_val_38711 === (11))){
var inst_38676 = (state_38710[(8)]);
var inst_38681 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_38682 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_38676);
var inst_38683 = cljs.core.async.timeout.call(null,(1000));
var inst_38684 = [inst_38682,inst_38683];
var inst_38685 = (new cljs.core.PersistentVector(null,2,(5),inst_38681,inst_38684,null));
var state_38710__$1 = state_38710;
return cljs.core.async.ioc_alts_BANG_.call(null,state_38710__$1,(14),inst_38685);
} else {
if((state_val_38711 === (9))){
var state_38710__$1 = state_38710;
var statearr_38723_38751 = state_38710__$1;
(statearr_38723_38751[(2)] = null);

(statearr_38723_38751[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38711 === (5))){
var inst_38669 = (state_38710[(7)]);
var inst_38671 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_38672 = (new cljs.core.PersistentArrayMap(null,2,inst_38671,null));
var inst_38673 = (new cljs.core.PersistentHashSet(null,inst_38672,null));
var inst_38674 = figwheel.client.focus_msgs.call(null,inst_38673,inst_38669);
var inst_38675 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_38674);
var inst_38676 = cljs.core.first.call(null,inst_38674);
var inst_38677 = cljs.core.deref.call(null,figwheel.client.autoload);
var state_38710__$1 = (function (){var statearr_38724 = state_38710;
(statearr_38724[(8)] = inst_38676);

(statearr_38724[(9)] = inst_38675);

return statearr_38724;
})();
if(cljs.core.truth_(inst_38677)){
var statearr_38725_38752 = state_38710__$1;
(statearr_38725_38752[(1)] = (8));

} else {
var statearr_38726_38753 = state_38710__$1;
(statearr_38726_38753[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38711 === (14))){
var inst_38687 = (state_38710[(2)]);
var state_38710__$1 = state_38710;
var statearr_38727_38754 = state_38710__$1;
(statearr_38727_38754[(2)] = inst_38687);

(statearr_38727_38754[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38711 === (16))){
var state_38710__$1 = state_38710;
var statearr_38728_38755 = state_38710__$1;
(statearr_38728_38755[(2)] = null);

(statearr_38728_38755[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38711 === (10))){
var inst_38702 = (state_38710[(2)]);
var state_38710__$1 = (function (){var statearr_38729 = state_38710;
(statearr_38729[(10)] = inst_38702);

return statearr_38729;
})();
var statearr_38730_38756 = state_38710__$1;
(statearr_38730_38756[(2)] = null);

(statearr_38730_38756[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38711 === (8))){
var inst_38675 = (state_38710[(9)]);
var inst_38679 = figwheel.client.reload_file_state_QMARK_.call(null,inst_38675,opts);
var state_38710__$1 = state_38710;
if(cljs.core.truth_(inst_38679)){
var statearr_38731_38757 = state_38710__$1;
(statearr_38731_38757[(1)] = (11));

} else {
var statearr_38732_38758 = state_38710__$1;
(statearr_38732_38758[(1)] = (12));

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
});})(c__20534__auto___38740,ch))
;
return ((function (switch__20513__auto__,c__20534__auto___38740,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__20514__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__20514__auto____0 = (function (){
var statearr_38736 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_38736[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__20514__auto__);

(statearr_38736[(1)] = (1));

return statearr_38736;
});
var figwheel$client$file_reloader_plugin_$_state_machine__20514__auto____1 = (function (state_38710){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_38710);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e38737){if((e38737 instanceof Object)){
var ex__20517__auto__ = e38737;
var statearr_38738_38759 = state_38710;
(statearr_38738_38759[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38710);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38737;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38760 = state_38710;
state_38710 = G__38760;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__20514__auto__ = function(state_38710){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__20514__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__20514__auto____1.call(this,state_38710);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__20514__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__20514__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___38740,ch))
})();
var state__20536__auto__ = (function (){var statearr_38739 = f__20535__auto__.call(null);
(statearr_38739[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___38740);

return statearr_38739;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___38740,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__38761_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__38761_SHARP_));
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
var base_path_38768 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_38768){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,opts,result_handler){
try{var _STAR_print_fn_STAR_38766 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR_38767 = cljs.core._STAR_print_newline_STAR_;
cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_fn_STAR_38766,_STAR_print_newline_STAR_38767,base_path_38768){
return (function() { 
var G__38769__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__38769 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__38770__i = 0, G__38770__a = new Array(arguments.length -  0);
while (G__38770__i < G__38770__a.length) {G__38770__a[G__38770__i] = arguments[G__38770__i + 0]; ++G__38770__i;}
  args = new cljs.core.IndexedSeq(G__38770__a,0);
} 
return G__38769__delegate.call(this,args);};
G__38769.cljs$lang$maxFixedArity = 0;
G__38769.cljs$lang$applyTo = (function (arglist__38771){
var args = cljs.core.seq(arglist__38771);
return G__38769__delegate(args);
});
G__38769.cljs$core$IFn$_invoke$arity$variadic = G__38769__delegate;
return G__38769;
})()
;})(_STAR_print_fn_STAR_38766,_STAR_print_newline_STAR_38767,base_path_38768))
;

cljs.core._STAR_print_newline_STAR_ = false;

try{return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),[cljs.core.str(figwheel.client.utils.eval_helper.call(null,code,opts))].join('')], null));
}finally {cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_38767;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_38766;
}}catch (e38765){if((e38765 instanceof Error)){
var e = e38765;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_38768], null));
} else {
var e = e38765;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}});})(base_path_38768))
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
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__38772){
var map__38779 = p__38772;
var map__38779__$1 = ((((!((map__38779 == null)))?((((map__38779.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38779.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38779):map__38779);
var opts = map__38779__$1;
var build_id = cljs.core.get.call(null,map__38779__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__38779,map__38779__$1,opts,build_id){
return (function (p__38781){
var vec__38782 = p__38781;
var map__38783 = cljs.core.nth.call(null,vec__38782,(0),null);
var map__38783__$1 = ((((!((map__38783 == null)))?((((map__38783.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38783.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38783):map__38783);
var msg = map__38783__$1;
var msg_name = cljs.core.get.call(null,map__38783__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__38782,(1));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),opts,((function (vec__38782,map__38783,map__38783__$1,msg,msg_name,_,map__38779,map__38779__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__38782,map__38783,map__38783__$1,msg,msg_name,_,map__38779,map__38779__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__38779,map__38779__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__38789){
var vec__38790 = p__38789;
var map__38791 = cljs.core.nth.call(null,vec__38790,(0),null);
var map__38791__$1 = ((((!((map__38791 == null)))?((((map__38791.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38791.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38791):map__38791);
var msg = map__38791__$1;
var msg_name = cljs.core.get.call(null,map__38791__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__38790,(1));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__38793){
var map__38803 = p__38793;
var map__38803__$1 = ((((!((map__38803 == null)))?((((map__38803.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38803.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38803):map__38803);
var on_compile_warning = cljs.core.get.call(null,map__38803__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__38803__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return ((function (map__38803,map__38803__$1,on_compile_warning,on_compile_fail){
return (function (p__38805){
var vec__38806 = p__38805;
var map__38807 = cljs.core.nth.call(null,vec__38806,(0),null);
var map__38807__$1 = ((((!((map__38807 == null)))?((((map__38807.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38807.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38807):map__38807);
var msg = map__38807__$1;
var msg_name = cljs.core.get.call(null,map__38807__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__38806,(1));
var pred__38809 = cljs.core._EQ_;
var expr__38810 = msg_name;
if(cljs.core.truth_(pred__38809.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__38810))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__38809.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__38810))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__38803,map__38803__$1,on_compile_warning,on_compile_fail))
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__20534__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto__,msg_hist,msg_names,msg){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto__,msg_hist,msg_names,msg){
return (function (state_39026){
var state_val_39027 = (state_39026[(1)]);
if((state_val_39027 === (7))){
var inst_38950 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
if(cljs.core.truth_(inst_38950)){
var statearr_39028_39074 = state_39026__$1;
(statearr_39028_39074[(1)] = (8));

} else {
var statearr_39029_39075 = state_39026__$1;
(statearr_39029_39075[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (20))){
var inst_39020 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39030_39076 = state_39026__$1;
(statearr_39030_39076[(2)] = inst_39020);

(statearr_39030_39076[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (27))){
var inst_39016 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39031_39077 = state_39026__$1;
(statearr_39031_39077[(2)] = inst_39016);

(statearr_39031_39077[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (1))){
var inst_38943 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_39026__$1 = state_39026;
if(cljs.core.truth_(inst_38943)){
var statearr_39032_39078 = state_39026__$1;
(statearr_39032_39078[(1)] = (2));

} else {
var statearr_39033_39079 = state_39026__$1;
(statearr_39033_39079[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (24))){
var inst_39018 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39034_39080 = state_39026__$1;
(statearr_39034_39080[(2)] = inst_39018);

(statearr_39034_39080[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (4))){
var inst_39024 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_39026__$1,inst_39024);
} else {
if((state_val_39027 === (15))){
var inst_39022 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39035_39081 = state_39026__$1;
(statearr_39035_39081[(2)] = inst_39022);

(statearr_39035_39081[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (21))){
var inst_38981 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39036_39082 = state_39026__$1;
(statearr_39036_39082[(2)] = inst_38981);

(statearr_39036_39082[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (31))){
var inst_39005 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_39026__$1 = state_39026;
if(cljs.core.truth_(inst_39005)){
var statearr_39037_39083 = state_39026__$1;
(statearr_39037_39083[(1)] = (34));

} else {
var statearr_39038_39084 = state_39026__$1;
(statearr_39038_39084[(1)] = (35));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (32))){
var inst_39014 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39039_39085 = state_39026__$1;
(statearr_39039_39085[(2)] = inst_39014);

(statearr_39039_39085[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (33))){
var inst_39003 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39040_39086 = state_39026__$1;
(statearr_39040_39086[(2)] = inst_39003);

(statearr_39040_39086[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (13))){
var inst_38964 = figwheel.client.heads_up.clear.call(null);
var state_39026__$1 = state_39026;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39026__$1,(16),inst_38964);
} else {
if((state_val_39027 === (22))){
var inst_38985 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38986 = figwheel.client.heads_up.append_message.call(null,inst_38985);
var state_39026__$1 = state_39026;
var statearr_39041_39087 = state_39026__$1;
(statearr_39041_39087[(2)] = inst_38986);

(statearr_39041_39087[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (36))){
var inst_39012 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39042_39088 = state_39026__$1;
(statearr_39042_39088[(2)] = inst_39012);

(statearr_39042_39088[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (29))){
var inst_38996 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39043_39089 = state_39026__$1;
(statearr_39043_39089[(2)] = inst_38996);

(statearr_39043_39089[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (6))){
var inst_38945 = (state_39026[(7)]);
var state_39026__$1 = state_39026;
var statearr_39044_39090 = state_39026__$1;
(statearr_39044_39090[(2)] = inst_38945);

(statearr_39044_39090[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (28))){
var inst_38992 = (state_39026[(2)]);
var inst_38993 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38994 = figwheel.client.heads_up.display_warning.call(null,inst_38993);
var state_39026__$1 = (function (){var statearr_39045 = state_39026;
(statearr_39045[(8)] = inst_38992);

return statearr_39045;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39026__$1,(29),inst_38994);
} else {
if((state_val_39027 === (25))){
var inst_38990 = figwheel.client.heads_up.clear.call(null);
var state_39026__$1 = state_39026;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39026__$1,(28),inst_38990);
} else {
if((state_val_39027 === (34))){
var inst_39007 = figwheel.client.heads_up.flash_loaded.call(null);
var state_39026__$1 = state_39026;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39026__$1,(37),inst_39007);
} else {
if((state_val_39027 === (17))){
var inst_38972 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39046_39091 = state_39026__$1;
(statearr_39046_39091[(2)] = inst_38972);

(statearr_39046_39091[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (3))){
var inst_38962 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_39026__$1 = state_39026;
if(cljs.core.truth_(inst_38962)){
var statearr_39047_39092 = state_39026__$1;
(statearr_39047_39092[(1)] = (13));

} else {
var statearr_39048_39093 = state_39026__$1;
(statearr_39048_39093[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (12))){
var inst_38958 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39049_39094 = state_39026__$1;
(statearr_39049_39094[(2)] = inst_38958);

(statearr_39049_39094[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (2))){
var inst_38945 = (state_39026[(7)]);
var inst_38945__$1 = cljs.core.deref.call(null,figwheel.client.autoload);
var state_39026__$1 = (function (){var statearr_39050 = state_39026;
(statearr_39050[(7)] = inst_38945__$1);

return statearr_39050;
})();
if(cljs.core.truth_(inst_38945__$1)){
var statearr_39051_39095 = state_39026__$1;
(statearr_39051_39095[(1)] = (5));

} else {
var statearr_39052_39096 = state_39026__$1;
(statearr_39052_39096[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (23))){
var inst_38988 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_39026__$1 = state_39026;
if(cljs.core.truth_(inst_38988)){
var statearr_39053_39097 = state_39026__$1;
(statearr_39053_39097[(1)] = (25));

} else {
var statearr_39054_39098 = state_39026__$1;
(statearr_39054_39098[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (35))){
var state_39026__$1 = state_39026;
var statearr_39055_39099 = state_39026__$1;
(statearr_39055_39099[(2)] = null);

(statearr_39055_39099[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (19))){
var inst_38983 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_39026__$1 = state_39026;
if(cljs.core.truth_(inst_38983)){
var statearr_39056_39100 = state_39026__$1;
(statearr_39056_39100[(1)] = (22));

} else {
var statearr_39057_39101 = state_39026__$1;
(statearr_39057_39101[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (11))){
var inst_38954 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39058_39102 = state_39026__$1;
(statearr_39058_39102[(2)] = inst_38954);

(statearr_39058_39102[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (9))){
var inst_38956 = figwheel.client.heads_up.clear.call(null);
var state_39026__$1 = state_39026;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39026__$1,(12),inst_38956);
} else {
if((state_val_39027 === (5))){
var inst_38947 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_39026__$1 = state_39026;
var statearr_39059_39103 = state_39026__$1;
(statearr_39059_39103[(2)] = inst_38947);

(statearr_39059_39103[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (14))){
var inst_38974 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_39026__$1 = state_39026;
if(cljs.core.truth_(inst_38974)){
var statearr_39060_39104 = state_39026__$1;
(statearr_39060_39104[(1)] = (18));

} else {
var statearr_39061_39105 = state_39026__$1;
(statearr_39061_39105[(1)] = (19));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (26))){
var inst_38998 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_39026__$1 = state_39026;
if(cljs.core.truth_(inst_38998)){
var statearr_39062_39106 = state_39026__$1;
(statearr_39062_39106[(1)] = (30));

} else {
var statearr_39063_39107 = state_39026__$1;
(statearr_39063_39107[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (16))){
var inst_38966 = (state_39026[(2)]);
var inst_38967 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38968 = figwheel.client.format_messages.call(null,inst_38967);
var inst_38969 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38970 = figwheel.client.heads_up.display_error.call(null,inst_38968,inst_38969);
var state_39026__$1 = (function (){var statearr_39064 = state_39026;
(statearr_39064[(9)] = inst_38966);

return statearr_39064;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39026__$1,(17),inst_38970);
} else {
if((state_val_39027 === (30))){
var inst_39000 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_39001 = figwheel.client.heads_up.display_warning.call(null,inst_39000);
var state_39026__$1 = state_39026;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39026__$1,(33),inst_39001);
} else {
if((state_val_39027 === (10))){
var inst_38960 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39065_39108 = state_39026__$1;
(statearr_39065_39108[(2)] = inst_38960);

(statearr_39065_39108[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (18))){
var inst_38976 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38977 = figwheel.client.format_messages.call(null,inst_38976);
var inst_38978 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38979 = figwheel.client.heads_up.display_error.call(null,inst_38977,inst_38978);
var state_39026__$1 = state_39026;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39026__$1,(21),inst_38979);
} else {
if((state_val_39027 === (37))){
var inst_39009 = (state_39026[(2)]);
var state_39026__$1 = state_39026;
var statearr_39066_39109 = state_39026__$1;
(statearr_39066_39109[(2)] = inst_39009);

(statearr_39066_39109[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39027 === (8))){
var inst_38952 = figwheel.client.heads_up.flash_loaded.call(null);
var state_39026__$1 = state_39026;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39026__$1,(11),inst_38952);
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
});})(c__20534__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__20513__auto__,c__20534__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20514__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20514__auto____0 = (function (){
var statearr_39070 = [null,null,null,null,null,null,null,null,null,null];
(statearr_39070[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20514__auto__);

(statearr_39070[(1)] = (1));

return statearr_39070;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20514__auto____1 = (function (state_39026){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_39026);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e39071){if((e39071 instanceof Object)){
var ex__20517__auto__ = e39071;
var statearr_39072_39110 = state_39026;
(statearr_39072_39110[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_39026);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e39071;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39111 = state_39026;
state_39026 = G__39111;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20514__auto__ = function(state_39026){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20514__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20514__auto____1.call(this,state_39026);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20514__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20514__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto__,msg_hist,msg_names,msg))
})();
var state__20536__auto__ = (function (){var statearr_39073 = f__20535__auto__.call(null);
(statearr_39073[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto__);

return statearr_39073;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto__,msg_hist,msg_names,msg))
);

return c__20534__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__20534__auto___39174 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___39174,ch){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___39174,ch){
return (function (state_39157){
var state_val_39158 = (state_39157[(1)]);
if((state_val_39158 === (1))){
var state_39157__$1 = state_39157;
var statearr_39159_39175 = state_39157__$1;
(statearr_39159_39175[(2)] = null);

(statearr_39159_39175[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39158 === (2))){
var state_39157__$1 = state_39157;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39157__$1,(4),ch);
} else {
if((state_val_39158 === (3))){
var inst_39155 = (state_39157[(2)]);
var state_39157__$1 = state_39157;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_39157__$1,inst_39155);
} else {
if((state_val_39158 === (4))){
var inst_39145 = (state_39157[(7)]);
var inst_39145__$1 = (state_39157[(2)]);
var state_39157__$1 = (function (){var statearr_39160 = state_39157;
(statearr_39160[(7)] = inst_39145__$1);

return statearr_39160;
})();
if(cljs.core.truth_(inst_39145__$1)){
var statearr_39161_39176 = state_39157__$1;
(statearr_39161_39176[(1)] = (5));

} else {
var statearr_39162_39177 = state_39157__$1;
(statearr_39162_39177[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39158 === (5))){
var inst_39145 = (state_39157[(7)]);
var inst_39147 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_39145);
var state_39157__$1 = state_39157;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39157__$1,(8),inst_39147);
} else {
if((state_val_39158 === (6))){
var state_39157__$1 = state_39157;
var statearr_39163_39178 = state_39157__$1;
(statearr_39163_39178[(2)] = null);

(statearr_39163_39178[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39158 === (7))){
var inst_39153 = (state_39157[(2)]);
var state_39157__$1 = state_39157;
var statearr_39164_39179 = state_39157__$1;
(statearr_39164_39179[(2)] = inst_39153);

(statearr_39164_39179[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39158 === (8))){
var inst_39149 = (state_39157[(2)]);
var state_39157__$1 = (function (){var statearr_39165 = state_39157;
(statearr_39165[(8)] = inst_39149);

return statearr_39165;
})();
var statearr_39166_39180 = state_39157__$1;
(statearr_39166_39180[(2)] = null);

(statearr_39166_39180[(1)] = (2));


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
});})(c__20534__auto___39174,ch))
;
return ((function (switch__20513__auto__,c__20534__auto___39174,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__20514__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__20514__auto____0 = (function (){
var statearr_39170 = [null,null,null,null,null,null,null,null,null];
(statearr_39170[(0)] = figwheel$client$heads_up_plugin_$_state_machine__20514__auto__);

(statearr_39170[(1)] = (1));

return statearr_39170;
});
var figwheel$client$heads_up_plugin_$_state_machine__20514__auto____1 = (function (state_39157){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_39157);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e39171){if((e39171 instanceof Object)){
var ex__20517__auto__ = e39171;
var statearr_39172_39181 = state_39157;
(statearr_39172_39181[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_39157);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e39171;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39182 = state_39157;
state_39157 = G__39182;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__20514__auto__ = function(state_39157){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__20514__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__20514__auto____1.call(this,state_39157);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__20514__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__20514__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___39174,ch))
})();
var state__20536__auto__ = (function (){var statearr_39173 = f__20535__auto__.call(null);
(statearr_39173[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___39174);

return statearr_39173;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___39174,ch))
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
var c__20534__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto__){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto__){
return (function (state_39203){
var state_val_39204 = (state_39203[(1)]);
if((state_val_39204 === (1))){
var inst_39198 = cljs.core.async.timeout.call(null,(3000));
var state_39203__$1 = state_39203;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_39203__$1,(2),inst_39198);
} else {
if((state_val_39204 === (2))){
var inst_39200 = (state_39203[(2)]);
var inst_39201 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_39203__$1 = (function (){var statearr_39205 = state_39203;
(statearr_39205[(7)] = inst_39200);

return statearr_39205;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_39203__$1,inst_39201);
} else {
return null;
}
}
});})(c__20534__auto__))
;
return ((function (switch__20513__auto__,c__20534__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__20514__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__20514__auto____0 = (function (){
var statearr_39209 = [null,null,null,null,null,null,null,null];
(statearr_39209[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__20514__auto__);

(statearr_39209[(1)] = (1));

return statearr_39209;
});
var figwheel$client$enforce_project_plugin_$_state_machine__20514__auto____1 = (function (state_39203){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_39203);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e39210){if((e39210 instanceof Object)){
var ex__20517__auto__ = e39210;
var statearr_39211_39213 = state_39203;
(statearr_39211_39213[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_39203);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e39210;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39214 = state_39203;
state_39203 = G__39214;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__20514__auto__ = function(state_39203){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__20514__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__20514__auto____1.call(this,state_39203);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__20514__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__20514__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto__))
})();
var state__20536__auto__ = (function (){var statearr_39212 = f__20535__auto__.call(null);
(statearr_39212[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto__);

return statearr_39212;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto__))
);

return c__20534__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = cljs.core.identity;
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__39215){
var map__39222 = p__39215;
var map__39222__$1 = ((((!((map__39222 == null)))?((((map__39222.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39222.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39222):map__39222);
var ed = map__39222__$1;
var formatted_exception = cljs.core.get.call(null,map__39222__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));
var exception_data = cljs.core.get.call(null,map__39222__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__39222__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: Compile Exception");

var seq__39224_39228 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));
var chunk__39225_39229 = null;
var count__39226_39230 = (0);
var i__39227_39231 = (0);
while(true){
if((i__39227_39231 < count__39226_39230)){
var msg_39232 = cljs.core._nth.call(null,chunk__39225_39229,i__39227_39231);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_39232);

var G__39233 = seq__39224_39228;
var G__39234 = chunk__39225_39229;
var G__39235 = count__39226_39230;
var G__39236 = (i__39227_39231 + (1));
seq__39224_39228 = G__39233;
chunk__39225_39229 = G__39234;
count__39226_39230 = G__39235;
i__39227_39231 = G__39236;
continue;
} else {
var temp__4425__auto___39237 = cljs.core.seq.call(null,seq__39224_39228);
if(temp__4425__auto___39237){
var seq__39224_39238__$1 = temp__4425__auto___39237;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39224_39238__$1)){
var c__17070__auto___39239 = cljs.core.chunk_first.call(null,seq__39224_39238__$1);
var G__39240 = cljs.core.chunk_rest.call(null,seq__39224_39238__$1);
var G__39241 = c__17070__auto___39239;
var G__39242 = cljs.core.count.call(null,c__17070__auto___39239);
var G__39243 = (0);
seq__39224_39228 = G__39240;
chunk__39225_39229 = G__39241;
count__39226_39230 = G__39242;
i__39227_39231 = G__39243;
continue;
} else {
var msg_39244 = cljs.core.first.call(null,seq__39224_39238__$1);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_39244);

var G__39245 = cljs.core.next.call(null,seq__39224_39238__$1);
var G__39246 = null;
var G__39247 = (0);
var G__39248 = (0);
seq__39224_39228 = G__39245;
chunk__39225_39229 = G__39246;
count__39226_39230 = G__39247;
i__39227_39231 = G__39248;
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
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__39249){
var map__39252 = p__39249;
var map__39252__$1 = ((((!((map__39252 == null)))?((((map__39252.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39252.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39252):map__39252);
var w = map__39252__$1;
var message = cljs.core.get.call(null,map__39252__$1,new cljs.core.Keyword(null,"message","message",-406056002));
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
var seq__39260 = cljs.core.seq.call(null,plugins);
var chunk__39261 = null;
var count__39262 = (0);
var i__39263 = (0);
while(true){
if((i__39263 < count__39262)){
var vec__39264 = cljs.core._nth.call(null,chunk__39261,i__39263);
var k = cljs.core.nth.call(null,vec__39264,(0),null);
var plugin = cljs.core.nth.call(null,vec__39264,(1),null);
if(cljs.core.truth_(plugin)){
var pl_39266 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__39260,chunk__39261,count__39262,i__39263,pl_39266,vec__39264,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_39266.call(null,msg_hist);
});})(seq__39260,chunk__39261,count__39262,i__39263,pl_39266,vec__39264,k,plugin))
);
} else {
}

var G__39267 = seq__39260;
var G__39268 = chunk__39261;
var G__39269 = count__39262;
var G__39270 = (i__39263 + (1));
seq__39260 = G__39267;
chunk__39261 = G__39268;
count__39262 = G__39269;
i__39263 = G__39270;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__39260);
if(temp__4425__auto__){
var seq__39260__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39260__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__39260__$1);
var G__39271 = cljs.core.chunk_rest.call(null,seq__39260__$1);
var G__39272 = c__17070__auto__;
var G__39273 = cljs.core.count.call(null,c__17070__auto__);
var G__39274 = (0);
seq__39260 = G__39271;
chunk__39261 = G__39272;
count__39262 = G__39273;
i__39263 = G__39274;
continue;
} else {
var vec__39265 = cljs.core.first.call(null,seq__39260__$1);
var k = cljs.core.nth.call(null,vec__39265,(0),null);
var plugin = cljs.core.nth.call(null,vec__39265,(1),null);
if(cljs.core.truth_(plugin)){
var pl_39275 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__39260,chunk__39261,count__39262,i__39263,pl_39275,vec__39265,k,plugin,seq__39260__$1,temp__4425__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_39275.call(null,msg_hist);
});})(seq__39260,chunk__39261,count__39262,i__39263,pl_39275,vec__39265,k,plugin,seq__39260__$1,temp__4425__auto__))
);
} else {
}

var G__39276 = cljs.core.next.call(null,seq__39260__$1);
var G__39277 = null;
var G__39278 = (0);
var G__39279 = (0);
seq__39260 = G__39276;
chunk__39261 = G__39277;
count__39262 = G__39278;
i__39263 = G__39279;
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
var args39280 = [];
var len__17325__auto___39283 = arguments.length;
var i__17326__auto___39284 = (0);
while(true){
if((i__17326__auto___39284 < len__17325__auto___39283)){
args39280.push((arguments[i__17326__auto___39284]));

var G__39285 = (i__17326__auto___39284 + (1));
i__17326__auto___39284 = G__39285;
continue;
} else {
}
break;
}

var G__39282 = args39280.length;
switch (G__39282) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args39280.length)].join('')));

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
var len__17325__auto___39291 = arguments.length;
var i__17326__auto___39292 = (0);
while(true){
if((i__17326__auto___39292 < len__17325__auto___39291)){
args__17332__auto__.push((arguments[i__17326__auto___39292]));

var G__39293 = (i__17326__auto___39292 + (1));
i__17326__auto___39292 = G__39293;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((0) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((0)),(0))):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__17333__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__39288){
var map__39289 = p__39288;
var map__39289__$1 = ((((!((map__39289 == null)))?((((map__39289.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39289.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39289):map__39289);
var opts = map__39289__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq39287){
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq39287));
});

//# sourceMappingURL=client.js.map?rel=1449460878397