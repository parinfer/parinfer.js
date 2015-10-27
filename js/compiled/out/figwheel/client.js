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
var G__53624__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__53624 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__53625__i = 0, G__53625__a = new Array(arguments.length -  0);
while (G__53625__i < G__53625__a.length) {G__53625__a[G__53625__i] = arguments[G__53625__i + 0]; ++G__53625__i;}
  args = new cljs.core.IndexedSeq(G__53625__a,0);
} 
return G__53624__delegate.call(this,args);};
G__53624.cljs$lang$maxFixedArity = 0;
G__53624.cljs$lang$applyTo = (function (arglist__53626){
var args = cljs.core.seq(arglist__53626);
return G__53624__delegate(args);
});
G__53624.cljs$core$IFn$_invoke$arity$variadic = G__53624__delegate;
return G__53624;
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
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__53627){
var map__53630 = p__53627;
var map__53630__$1 = ((((!((map__53630 == null)))?((((map__53630.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53630.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__53630):map__53630);
var message = cljs.core.get.call(null,map__53630__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__53630__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
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
var c__19920__auto___53778 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___53778,ch){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___53778,ch){
return (function (state_53748){
var state_val_53749 = (state_53748[(1)]);
if((state_val_53749 === (7))){
var inst_53744 = (state_53748[(2)]);
var state_53748__$1 = state_53748;
var statearr_53750_53779 = state_53748__$1;
(statearr_53750_53779[(2)] = inst_53744);

(statearr_53750_53779[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53749 === (1))){
var state_53748__$1 = state_53748;
var statearr_53751_53780 = state_53748__$1;
(statearr_53751_53780[(2)] = null);

(statearr_53751_53780[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53749 === (4))){
var inst_53707 = (state_53748[(7)]);
var inst_53707__$1 = (state_53748[(2)]);
var state_53748__$1 = (function (){var statearr_53752 = state_53748;
(statearr_53752[(7)] = inst_53707__$1);

return statearr_53752;
})();
if(cljs.core.truth_(inst_53707__$1)){
var statearr_53753_53781 = state_53748__$1;
(statearr_53753_53781[(1)] = (5));

} else {
var statearr_53754_53782 = state_53748__$1;
(statearr_53754_53782[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53749 === (15))){
var inst_53714 = (state_53748[(8)]);
var inst_53729 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_53714);
var inst_53730 = cljs.core.first.call(null,inst_53729);
var inst_53731 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_53730);
var inst_53732 = console.warn("Figwheel: Not loading code with warnings - ",inst_53731);
var state_53748__$1 = state_53748;
var statearr_53755_53783 = state_53748__$1;
(statearr_53755_53783[(2)] = inst_53732);

(statearr_53755_53783[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53749 === (13))){
var inst_53737 = (state_53748[(2)]);
var state_53748__$1 = state_53748;
var statearr_53756_53784 = state_53748__$1;
(statearr_53756_53784[(2)] = inst_53737);

(statearr_53756_53784[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53749 === (6))){
var state_53748__$1 = state_53748;
var statearr_53757_53785 = state_53748__$1;
(statearr_53757_53785[(2)] = null);

(statearr_53757_53785[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53749 === (17))){
var inst_53735 = (state_53748[(2)]);
var state_53748__$1 = state_53748;
var statearr_53758_53786 = state_53748__$1;
(statearr_53758_53786[(2)] = inst_53735);

(statearr_53758_53786[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53749 === (3))){
var inst_53746 = (state_53748[(2)]);
var state_53748__$1 = state_53748;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_53748__$1,inst_53746);
} else {
if((state_val_53749 === (12))){
var inst_53713 = (state_53748[(9)]);
var inst_53727 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_53713,opts);
var state_53748__$1 = state_53748;
if(cljs.core.truth_(inst_53727)){
var statearr_53759_53787 = state_53748__$1;
(statearr_53759_53787[(1)] = (15));

} else {
var statearr_53760_53788 = state_53748__$1;
(statearr_53760_53788[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53749 === (2))){
var state_53748__$1 = state_53748;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_53748__$1,(4),ch);
} else {
if((state_val_53749 === (11))){
var inst_53714 = (state_53748[(8)]);
var inst_53719 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_53720 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_53714);
var inst_53721 = cljs.core.async.timeout.call(null,(1000));
var inst_53722 = [inst_53720,inst_53721];
var inst_53723 = (new cljs.core.PersistentVector(null,2,(5),inst_53719,inst_53722,null));
var state_53748__$1 = state_53748;
return cljs.core.async.ioc_alts_BANG_.call(null,state_53748__$1,(14),inst_53723);
} else {
if((state_val_53749 === (9))){
var state_53748__$1 = state_53748;
var statearr_53761_53789 = state_53748__$1;
(statearr_53761_53789[(2)] = null);

(statearr_53761_53789[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53749 === (5))){
var inst_53707 = (state_53748[(7)]);
var inst_53709 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_53710 = (new cljs.core.PersistentArrayMap(null,2,inst_53709,null));
var inst_53711 = (new cljs.core.PersistentHashSet(null,inst_53710,null));
var inst_53712 = figwheel.client.focus_msgs.call(null,inst_53711,inst_53707);
var inst_53713 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_53712);
var inst_53714 = cljs.core.first.call(null,inst_53712);
var inst_53715 = cljs.core.deref.call(null,figwheel.client.autoload);
var state_53748__$1 = (function (){var statearr_53762 = state_53748;
(statearr_53762[(9)] = inst_53713);

(statearr_53762[(8)] = inst_53714);

return statearr_53762;
})();
if(cljs.core.truth_(inst_53715)){
var statearr_53763_53790 = state_53748__$1;
(statearr_53763_53790[(1)] = (8));

} else {
var statearr_53764_53791 = state_53748__$1;
(statearr_53764_53791[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53749 === (14))){
var inst_53725 = (state_53748[(2)]);
var state_53748__$1 = state_53748;
var statearr_53765_53792 = state_53748__$1;
(statearr_53765_53792[(2)] = inst_53725);

(statearr_53765_53792[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53749 === (16))){
var state_53748__$1 = state_53748;
var statearr_53766_53793 = state_53748__$1;
(statearr_53766_53793[(2)] = null);

(statearr_53766_53793[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53749 === (10))){
var inst_53740 = (state_53748[(2)]);
var state_53748__$1 = (function (){var statearr_53767 = state_53748;
(statearr_53767[(10)] = inst_53740);

return statearr_53767;
})();
var statearr_53768_53794 = state_53748__$1;
(statearr_53768_53794[(2)] = null);

(statearr_53768_53794[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53749 === (8))){
var inst_53713 = (state_53748[(9)]);
var inst_53717 = figwheel.client.reload_file_state_QMARK_.call(null,inst_53713,opts);
var state_53748__$1 = state_53748;
if(cljs.core.truth_(inst_53717)){
var statearr_53769_53795 = state_53748__$1;
(statearr_53769_53795[(1)] = (11));

} else {
var statearr_53770_53796 = state_53748__$1;
(statearr_53770_53796[(1)] = (12));

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
});})(c__19920__auto___53778,ch))
;
return ((function (switch__19855__auto__,c__19920__auto___53778,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__19856__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__19856__auto____0 = (function (){
var statearr_53774 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_53774[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__19856__auto__);

(statearr_53774[(1)] = (1));

return statearr_53774;
});
var figwheel$client$file_reloader_plugin_$_state_machine__19856__auto____1 = (function (state_53748){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_53748);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e53775){if((e53775 instanceof Object)){
var ex__19859__auto__ = e53775;
var statearr_53776_53797 = state_53748;
(statearr_53776_53797[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_53748);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e53775;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__53798 = state_53748;
state_53748 = G__53798;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__19856__auto__ = function(state_53748){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__19856__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__19856__auto____1.call(this,state_53748);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__19856__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__19856__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___53778,ch))
})();
var state__19922__auto__ = (function (){var statearr_53777 = f__19921__auto__.call(null);
(statearr_53777[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___53778);

return statearr_53777;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___53778,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__53799_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__53799_SHARP_));
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
var base_path_53806 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_53806){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,opts,result_handler){
try{var _STAR_print_fn_STAR_53804 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR_53805 = cljs.core._STAR_print_newline_STAR_;
cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_fn_STAR_53804,_STAR_print_newline_STAR_53805,base_path_53806){
return (function() { 
var G__53807__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__53807 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__53808__i = 0, G__53808__a = new Array(arguments.length -  0);
while (G__53808__i < G__53808__a.length) {G__53808__a[G__53808__i] = arguments[G__53808__i + 0]; ++G__53808__i;}
  args = new cljs.core.IndexedSeq(G__53808__a,0);
} 
return G__53807__delegate.call(this,args);};
G__53807.cljs$lang$maxFixedArity = 0;
G__53807.cljs$lang$applyTo = (function (arglist__53809){
var args = cljs.core.seq(arglist__53809);
return G__53807__delegate(args);
});
G__53807.cljs$core$IFn$_invoke$arity$variadic = G__53807__delegate;
return G__53807;
})()
;})(_STAR_print_fn_STAR_53804,_STAR_print_newline_STAR_53805,base_path_53806))
;

cljs.core._STAR_print_newline_STAR_ = false;

try{return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),[cljs.core.str(figwheel.client.utils.eval_helper.call(null,code,opts))].join('')], null));
}finally {cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_53805;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_53804;
}}catch (e53803){if((e53803 instanceof Error)){
var e = e53803;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_53806], null));
} else {
var e = e53803;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}});})(base_path_53806))
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
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__53810){
var map__53817 = p__53810;
var map__53817__$1 = ((((!((map__53817 == null)))?((((map__53817.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53817.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__53817):map__53817);
var opts = map__53817__$1;
var build_id = cljs.core.get.call(null,map__53817__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__53817,map__53817__$1,opts,build_id){
return (function (p__53819){
var vec__53820 = p__53819;
var map__53821 = cljs.core.nth.call(null,vec__53820,(0),null);
var map__53821__$1 = ((((!((map__53821 == null)))?((((map__53821.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53821.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__53821):map__53821);
var msg = map__53821__$1;
var msg_name = cljs.core.get.call(null,map__53821__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__53820,(1));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),opts,((function (vec__53820,map__53821,map__53821__$1,msg,msg_name,_,map__53817,map__53817__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__53820,map__53821,map__53821__$1,msg,msg_name,_,map__53817,map__53817__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__53817,map__53817__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__53827){
var vec__53828 = p__53827;
var map__53829 = cljs.core.nth.call(null,vec__53828,(0),null);
var map__53829__$1 = ((((!((map__53829 == null)))?((((map__53829.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53829.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__53829):map__53829);
var msg = map__53829__$1;
var msg_name = cljs.core.get.call(null,map__53829__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__53828,(1));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__53831){
var map__53841 = p__53831;
var map__53841__$1 = ((((!((map__53841 == null)))?((((map__53841.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53841.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__53841):map__53841);
var on_compile_warning = cljs.core.get.call(null,map__53841__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__53841__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return ((function (map__53841,map__53841__$1,on_compile_warning,on_compile_fail){
return (function (p__53843){
var vec__53844 = p__53843;
var map__53845 = cljs.core.nth.call(null,vec__53844,(0),null);
var map__53845__$1 = ((((!((map__53845 == null)))?((((map__53845.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53845.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__53845):map__53845);
var msg = map__53845__$1;
var msg_name = cljs.core.get.call(null,map__53845__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__53844,(1));
var pred__53847 = cljs.core._EQ_;
var expr__53848 = msg_name;
if(cljs.core.truth_(pred__53847.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__53848))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__53847.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__53848))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__53841,map__53841__$1,on_compile_warning,on_compile_fail))
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__19920__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto__,msg_hist,msg_names,msg){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto__,msg_hist,msg_names,msg){
return (function (state_54064){
var state_val_54065 = (state_54064[(1)]);
if((state_val_54065 === (7))){
var inst_53988 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
if(cljs.core.truth_(inst_53988)){
var statearr_54066_54112 = state_54064__$1;
(statearr_54066_54112[(1)] = (8));

} else {
var statearr_54067_54113 = state_54064__$1;
(statearr_54067_54113[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (20))){
var inst_54058 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54068_54114 = state_54064__$1;
(statearr_54068_54114[(2)] = inst_54058);

(statearr_54068_54114[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (27))){
var inst_54054 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54069_54115 = state_54064__$1;
(statearr_54069_54115[(2)] = inst_54054);

(statearr_54069_54115[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (1))){
var inst_53981 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_54064__$1 = state_54064;
if(cljs.core.truth_(inst_53981)){
var statearr_54070_54116 = state_54064__$1;
(statearr_54070_54116[(1)] = (2));

} else {
var statearr_54071_54117 = state_54064__$1;
(statearr_54071_54117[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (24))){
var inst_54056 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54072_54118 = state_54064__$1;
(statearr_54072_54118[(2)] = inst_54056);

(statearr_54072_54118[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (4))){
var inst_54062 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_54064__$1,inst_54062);
} else {
if((state_val_54065 === (15))){
var inst_54060 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54073_54119 = state_54064__$1;
(statearr_54073_54119[(2)] = inst_54060);

(statearr_54073_54119[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (21))){
var inst_54019 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54074_54120 = state_54064__$1;
(statearr_54074_54120[(2)] = inst_54019);

(statearr_54074_54120[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (31))){
var inst_54043 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_54064__$1 = state_54064;
if(cljs.core.truth_(inst_54043)){
var statearr_54075_54121 = state_54064__$1;
(statearr_54075_54121[(1)] = (34));

} else {
var statearr_54076_54122 = state_54064__$1;
(statearr_54076_54122[(1)] = (35));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (32))){
var inst_54052 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54077_54123 = state_54064__$1;
(statearr_54077_54123[(2)] = inst_54052);

(statearr_54077_54123[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (33))){
var inst_54041 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54078_54124 = state_54064__$1;
(statearr_54078_54124[(2)] = inst_54041);

(statearr_54078_54124[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (13))){
var inst_54002 = figwheel.client.heads_up.clear.call(null);
var state_54064__$1 = state_54064;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54064__$1,(16),inst_54002);
} else {
if((state_val_54065 === (22))){
var inst_54023 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_54024 = figwheel.client.heads_up.append_message.call(null,inst_54023);
var state_54064__$1 = state_54064;
var statearr_54079_54125 = state_54064__$1;
(statearr_54079_54125[(2)] = inst_54024);

(statearr_54079_54125[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (36))){
var inst_54050 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54080_54126 = state_54064__$1;
(statearr_54080_54126[(2)] = inst_54050);

(statearr_54080_54126[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (29))){
var inst_54034 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54081_54127 = state_54064__$1;
(statearr_54081_54127[(2)] = inst_54034);

(statearr_54081_54127[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (6))){
var inst_53983 = (state_54064[(7)]);
var state_54064__$1 = state_54064;
var statearr_54082_54128 = state_54064__$1;
(statearr_54082_54128[(2)] = inst_53983);

(statearr_54082_54128[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (28))){
var inst_54030 = (state_54064[(2)]);
var inst_54031 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_54032 = figwheel.client.heads_up.display_warning.call(null,inst_54031);
var state_54064__$1 = (function (){var statearr_54083 = state_54064;
(statearr_54083[(8)] = inst_54030);

return statearr_54083;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54064__$1,(29),inst_54032);
} else {
if((state_val_54065 === (25))){
var inst_54028 = figwheel.client.heads_up.clear.call(null);
var state_54064__$1 = state_54064;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54064__$1,(28),inst_54028);
} else {
if((state_val_54065 === (34))){
var inst_54045 = figwheel.client.heads_up.flash_loaded.call(null);
var state_54064__$1 = state_54064;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54064__$1,(37),inst_54045);
} else {
if((state_val_54065 === (17))){
var inst_54010 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54084_54129 = state_54064__$1;
(statearr_54084_54129[(2)] = inst_54010);

(statearr_54084_54129[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (3))){
var inst_54000 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_54064__$1 = state_54064;
if(cljs.core.truth_(inst_54000)){
var statearr_54085_54130 = state_54064__$1;
(statearr_54085_54130[(1)] = (13));

} else {
var statearr_54086_54131 = state_54064__$1;
(statearr_54086_54131[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (12))){
var inst_53996 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54087_54132 = state_54064__$1;
(statearr_54087_54132[(2)] = inst_53996);

(statearr_54087_54132[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (2))){
var inst_53983 = (state_54064[(7)]);
var inst_53983__$1 = cljs.core.deref.call(null,figwheel.client.autoload);
var state_54064__$1 = (function (){var statearr_54088 = state_54064;
(statearr_54088[(7)] = inst_53983__$1);

return statearr_54088;
})();
if(cljs.core.truth_(inst_53983__$1)){
var statearr_54089_54133 = state_54064__$1;
(statearr_54089_54133[(1)] = (5));

} else {
var statearr_54090_54134 = state_54064__$1;
(statearr_54090_54134[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (23))){
var inst_54026 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_54064__$1 = state_54064;
if(cljs.core.truth_(inst_54026)){
var statearr_54091_54135 = state_54064__$1;
(statearr_54091_54135[(1)] = (25));

} else {
var statearr_54092_54136 = state_54064__$1;
(statearr_54092_54136[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (35))){
var state_54064__$1 = state_54064;
var statearr_54093_54137 = state_54064__$1;
(statearr_54093_54137[(2)] = null);

(statearr_54093_54137[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (19))){
var inst_54021 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_54064__$1 = state_54064;
if(cljs.core.truth_(inst_54021)){
var statearr_54094_54138 = state_54064__$1;
(statearr_54094_54138[(1)] = (22));

} else {
var statearr_54095_54139 = state_54064__$1;
(statearr_54095_54139[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (11))){
var inst_53992 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54096_54140 = state_54064__$1;
(statearr_54096_54140[(2)] = inst_53992);

(statearr_54096_54140[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (9))){
var inst_53994 = figwheel.client.heads_up.clear.call(null);
var state_54064__$1 = state_54064;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54064__$1,(12),inst_53994);
} else {
if((state_val_54065 === (5))){
var inst_53985 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_54064__$1 = state_54064;
var statearr_54097_54141 = state_54064__$1;
(statearr_54097_54141[(2)] = inst_53985);

(statearr_54097_54141[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (14))){
var inst_54012 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_54064__$1 = state_54064;
if(cljs.core.truth_(inst_54012)){
var statearr_54098_54142 = state_54064__$1;
(statearr_54098_54142[(1)] = (18));

} else {
var statearr_54099_54143 = state_54064__$1;
(statearr_54099_54143[(1)] = (19));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (26))){
var inst_54036 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_54064__$1 = state_54064;
if(cljs.core.truth_(inst_54036)){
var statearr_54100_54144 = state_54064__$1;
(statearr_54100_54144[(1)] = (30));

} else {
var statearr_54101_54145 = state_54064__$1;
(statearr_54101_54145[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (16))){
var inst_54004 = (state_54064[(2)]);
var inst_54005 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_54006 = figwheel.client.format_messages.call(null,inst_54005);
var inst_54007 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_54008 = figwheel.client.heads_up.display_error.call(null,inst_54006,inst_54007);
var state_54064__$1 = (function (){var statearr_54102 = state_54064;
(statearr_54102[(9)] = inst_54004);

return statearr_54102;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54064__$1,(17),inst_54008);
} else {
if((state_val_54065 === (30))){
var inst_54038 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_54039 = figwheel.client.heads_up.display_warning.call(null,inst_54038);
var state_54064__$1 = state_54064;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54064__$1,(33),inst_54039);
} else {
if((state_val_54065 === (10))){
var inst_53998 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54103_54146 = state_54064__$1;
(statearr_54103_54146[(2)] = inst_53998);

(statearr_54103_54146[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (18))){
var inst_54014 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_54015 = figwheel.client.format_messages.call(null,inst_54014);
var inst_54016 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_54017 = figwheel.client.heads_up.display_error.call(null,inst_54015,inst_54016);
var state_54064__$1 = state_54064;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54064__$1,(21),inst_54017);
} else {
if((state_val_54065 === (37))){
var inst_54047 = (state_54064[(2)]);
var state_54064__$1 = state_54064;
var statearr_54104_54147 = state_54064__$1;
(statearr_54104_54147[(2)] = inst_54047);

(statearr_54104_54147[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54065 === (8))){
var inst_53990 = figwheel.client.heads_up.flash_loaded.call(null);
var state_54064__$1 = state_54064;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54064__$1,(11),inst_53990);
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
});})(c__19920__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__19855__auto__,c__19920__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19856__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19856__auto____0 = (function (){
var statearr_54108 = [null,null,null,null,null,null,null,null,null,null];
(statearr_54108[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19856__auto__);

(statearr_54108[(1)] = (1));

return statearr_54108;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19856__auto____1 = (function (state_54064){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_54064);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e54109){if((e54109 instanceof Object)){
var ex__19859__auto__ = e54109;
var statearr_54110_54148 = state_54064;
(statearr_54110_54148[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_54064);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e54109;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__54149 = state_54064;
state_54064 = G__54149;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19856__auto__ = function(state_54064){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19856__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19856__auto____1.call(this,state_54064);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19856__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19856__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto__,msg_hist,msg_names,msg))
})();
var state__19922__auto__ = (function (){var statearr_54111 = f__19921__auto__.call(null);
(statearr_54111[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto__);

return statearr_54111;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto__,msg_hist,msg_names,msg))
);

return c__19920__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__19920__auto___54212 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___54212,ch){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___54212,ch){
return (function (state_54195){
var state_val_54196 = (state_54195[(1)]);
if((state_val_54196 === (1))){
var state_54195__$1 = state_54195;
var statearr_54197_54213 = state_54195__$1;
(statearr_54197_54213[(2)] = null);

(statearr_54197_54213[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54196 === (2))){
var state_54195__$1 = state_54195;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54195__$1,(4),ch);
} else {
if((state_val_54196 === (3))){
var inst_54193 = (state_54195[(2)]);
var state_54195__$1 = state_54195;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_54195__$1,inst_54193);
} else {
if((state_val_54196 === (4))){
var inst_54183 = (state_54195[(7)]);
var inst_54183__$1 = (state_54195[(2)]);
var state_54195__$1 = (function (){var statearr_54198 = state_54195;
(statearr_54198[(7)] = inst_54183__$1);

return statearr_54198;
})();
if(cljs.core.truth_(inst_54183__$1)){
var statearr_54199_54214 = state_54195__$1;
(statearr_54199_54214[(1)] = (5));

} else {
var statearr_54200_54215 = state_54195__$1;
(statearr_54200_54215[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54196 === (5))){
var inst_54183 = (state_54195[(7)]);
var inst_54185 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_54183);
var state_54195__$1 = state_54195;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54195__$1,(8),inst_54185);
} else {
if((state_val_54196 === (6))){
var state_54195__$1 = state_54195;
var statearr_54201_54216 = state_54195__$1;
(statearr_54201_54216[(2)] = null);

(statearr_54201_54216[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54196 === (7))){
var inst_54191 = (state_54195[(2)]);
var state_54195__$1 = state_54195;
var statearr_54202_54217 = state_54195__$1;
(statearr_54202_54217[(2)] = inst_54191);

(statearr_54202_54217[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54196 === (8))){
var inst_54187 = (state_54195[(2)]);
var state_54195__$1 = (function (){var statearr_54203 = state_54195;
(statearr_54203[(8)] = inst_54187);

return statearr_54203;
})();
var statearr_54204_54218 = state_54195__$1;
(statearr_54204_54218[(2)] = null);

(statearr_54204_54218[(1)] = (2));


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
});})(c__19920__auto___54212,ch))
;
return ((function (switch__19855__auto__,c__19920__auto___54212,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__19856__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__19856__auto____0 = (function (){
var statearr_54208 = [null,null,null,null,null,null,null,null,null];
(statearr_54208[(0)] = figwheel$client$heads_up_plugin_$_state_machine__19856__auto__);

(statearr_54208[(1)] = (1));

return statearr_54208;
});
var figwheel$client$heads_up_plugin_$_state_machine__19856__auto____1 = (function (state_54195){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_54195);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e54209){if((e54209 instanceof Object)){
var ex__19859__auto__ = e54209;
var statearr_54210_54219 = state_54195;
(statearr_54210_54219[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_54195);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e54209;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__54220 = state_54195;
state_54195 = G__54220;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__19856__auto__ = function(state_54195){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__19856__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__19856__auto____1.call(this,state_54195);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__19856__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__19856__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___54212,ch))
})();
var state__19922__auto__ = (function (){var statearr_54211 = f__19921__auto__.call(null);
(statearr_54211[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___54212);

return statearr_54211;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___54212,ch))
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
var c__19920__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto__){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto__){
return (function (state_54241){
var state_val_54242 = (state_54241[(1)]);
if((state_val_54242 === (1))){
var inst_54236 = cljs.core.async.timeout.call(null,(3000));
var state_54241__$1 = state_54241;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_54241__$1,(2),inst_54236);
} else {
if((state_val_54242 === (2))){
var inst_54238 = (state_54241[(2)]);
var inst_54239 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_54241__$1 = (function (){var statearr_54243 = state_54241;
(statearr_54243[(7)] = inst_54238);

return statearr_54243;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_54241__$1,inst_54239);
} else {
return null;
}
}
});})(c__19920__auto__))
;
return ((function (switch__19855__auto__,c__19920__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__19856__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__19856__auto____0 = (function (){
var statearr_54247 = [null,null,null,null,null,null,null,null];
(statearr_54247[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__19856__auto__);

(statearr_54247[(1)] = (1));

return statearr_54247;
});
var figwheel$client$enforce_project_plugin_$_state_machine__19856__auto____1 = (function (state_54241){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_54241);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e54248){if((e54248 instanceof Object)){
var ex__19859__auto__ = e54248;
var statearr_54249_54251 = state_54241;
(statearr_54249_54251[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_54241);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e54248;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__54252 = state_54241;
state_54241 = G__54252;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__19856__auto__ = function(state_54241){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__19856__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__19856__auto____1.call(this,state_54241);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__19856__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__19856__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto__))
})();
var state__19922__auto__ = (function (){var statearr_54250 = f__19921__auto__.call(null);
(statearr_54250[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto__);

return statearr_54250;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto__))
);

return c__19920__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = cljs.core.identity;
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__54253){
var map__54260 = p__54253;
var map__54260__$1 = ((((!((map__54260 == null)))?((((map__54260.cljs$lang$protocol_mask$partition0$ & (64))) || (map__54260.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__54260):map__54260);
var ed = map__54260__$1;
var formatted_exception = cljs.core.get.call(null,map__54260__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));
var exception_data = cljs.core.get.call(null,map__54260__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__54260__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: Compile Exception");

var seq__54262_54266 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));
var chunk__54263_54267 = null;
var count__54264_54268 = (0);
var i__54265_54269 = (0);
while(true){
if((i__54265_54269 < count__54264_54268)){
var msg_54270 = cljs.core._nth.call(null,chunk__54263_54267,i__54265_54269);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_54270);

var G__54271 = seq__54262_54266;
var G__54272 = chunk__54263_54267;
var G__54273 = count__54264_54268;
var G__54274 = (i__54265_54269 + (1));
seq__54262_54266 = G__54271;
chunk__54263_54267 = G__54272;
count__54264_54268 = G__54273;
i__54265_54269 = G__54274;
continue;
} else {
var temp__4425__auto___54275 = cljs.core.seq.call(null,seq__54262_54266);
if(temp__4425__auto___54275){
var seq__54262_54276__$1 = temp__4425__auto___54275;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__54262_54276__$1)){
var c__17070__auto___54277 = cljs.core.chunk_first.call(null,seq__54262_54276__$1);
var G__54278 = cljs.core.chunk_rest.call(null,seq__54262_54276__$1);
var G__54279 = c__17070__auto___54277;
var G__54280 = cljs.core.count.call(null,c__17070__auto___54277);
var G__54281 = (0);
seq__54262_54266 = G__54278;
chunk__54263_54267 = G__54279;
count__54264_54268 = G__54280;
i__54265_54269 = G__54281;
continue;
} else {
var msg_54282 = cljs.core.first.call(null,seq__54262_54276__$1);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_54282);

var G__54283 = cljs.core.next.call(null,seq__54262_54276__$1);
var G__54284 = null;
var G__54285 = (0);
var G__54286 = (0);
seq__54262_54266 = G__54283;
chunk__54263_54267 = G__54284;
count__54264_54268 = G__54285;
i__54265_54269 = G__54286;
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
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__54287){
var map__54290 = p__54287;
var map__54290__$1 = ((((!((map__54290 == null)))?((((map__54290.cljs$lang$protocol_mask$partition0$ & (64))) || (map__54290.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__54290):map__54290);
var w = map__54290__$1;
var message = cljs.core.get.call(null,map__54290__$1,new cljs.core.Keyword(null,"message","message",-406056002));
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
var seq__54298 = cljs.core.seq.call(null,plugins);
var chunk__54299 = null;
var count__54300 = (0);
var i__54301 = (0);
while(true){
if((i__54301 < count__54300)){
var vec__54302 = cljs.core._nth.call(null,chunk__54299,i__54301);
var k = cljs.core.nth.call(null,vec__54302,(0),null);
var plugin = cljs.core.nth.call(null,vec__54302,(1),null);
if(cljs.core.truth_(plugin)){
var pl_54304 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__54298,chunk__54299,count__54300,i__54301,pl_54304,vec__54302,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_54304.call(null,msg_hist);
});})(seq__54298,chunk__54299,count__54300,i__54301,pl_54304,vec__54302,k,plugin))
);
} else {
}

var G__54305 = seq__54298;
var G__54306 = chunk__54299;
var G__54307 = count__54300;
var G__54308 = (i__54301 + (1));
seq__54298 = G__54305;
chunk__54299 = G__54306;
count__54300 = G__54307;
i__54301 = G__54308;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__54298);
if(temp__4425__auto__){
var seq__54298__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__54298__$1)){
var c__17070__auto__ = cljs.core.chunk_first.call(null,seq__54298__$1);
var G__54309 = cljs.core.chunk_rest.call(null,seq__54298__$1);
var G__54310 = c__17070__auto__;
var G__54311 = cljs.core.count.call(null,c__17070__auto__);
var G__54312 = (0);
seq__54298 = G__54309;
chunk__54299 = G__54310;
count__54300 = G__54311;
i__54301 = G__54312;
continue;
} else {
var vec__54303 = cljs.core.first.call(null,seq__54298__$1);
var k = cljs.core.nth.call(null,vec__54303,(0),null);
var plugin = cljs.core.nth.call(null,vec__54303,(1),null);
if(cljs.core.truth_(plugin)){
var pl_54313 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__54298,chunk__54299,count__54300,i__54301,pl_54313,vec__54303,k,plugin,seq__54298__$1,temp__4425__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_54313.call(null,msg_hist);
});})(seq__54298,chunk__54299,count__54300,i__54301,pl_54313,vec__54303,k,plugin,seq__54298__$1,temp__4425__auto__))
);
} else {
}

var G__54314 = cljs.core.next.call(null,seq__54298__$1);
var G__54315 = null;
var G__54316 = (0);
var G__54317 = (0);
seq__54298 = G__54314;
chunk__54299 = G__54315;
count__54300 = G__54316;
i__54301 = G__54317;
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
var args54318 = [];
var len__17325__auto___54321 = arguments.length;
var i__17326__auto___54322 = (0);
while(true){
if((i__17326__auto___54322 < len__17325__auto___54321)){
args54318.push((arguments[i__17326__auto___54322]));

var G__54323 = (i__17326__auto___54322 + (1));
i__17326__auto___54322 = G__54323;
continue;
} else {
}
break;
}

var G__54320 = args54318.length;
switch (G__54320) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args54318.length)].join('')));

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
var len__17325__auto___54329 = arguments.length;
var i__17326__auto___54330 = (0);
while(true){
if((i__17326__auto___54330 < len__17325__auto___54329)){
args__17332__auto__.push((arguments[i__17326__auto___54330]));

var G__54331 = (i__17326__auto___54330 + (1));
i__17326__auto___54330 = G__54331;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((0) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((0)),(0))):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__17333__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__54326){
var map__54327 = p__54326;
var map__54327__$1 = ((((!((map__54327 == null)))?((((map__54327.cljs$lang$protocol_mask$partition0$ & (64))) || (map__54327.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__54327):map__54327);
var opts = map__54327__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq54325){
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq54325));
});

//# sourceMappingURL=client.js.map?rel=1445965108933