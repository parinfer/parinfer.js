// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer.api_js');
goog.require('cljs.core');
goog.require('parinfer.indent_mode');
goog.require('parinfer.paren_mode');
parinfer.api_js.opt__GT_cljs = new cljs.core.PersistentArrayMap(null, 4, ["cursorLine",new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007),"cursorX",new cljs.core.Keyword(null,"cursor-x","cursor-x",475204266),"lineNo",new cljs.core.Keyword(null,"line-no","line-no",-666819466),"newLine",new cljs.core.Keyword(null,"new-line","new-line",1060819447)], null);
/**
 * Convert the JS options object to a clojure map
 */
parinfer.api_js.convert_opts = (function parinfer$api_js$convert_opts(js_opts){
return cljs.core.reduce.call(null,(function (clj_opts,p__33051){
var vec__33052 = p__33051;
var js_key = cljs.core.nth.call(null,vec__33052,(0),null);
var value = cljs.core.nth.call(null,vec__33052,(1),null);
var key_ = (function (){var or__16267__auto__ = parinfer.api_js.opt__GT_cljs.call(null,js_key);
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return cljs.core.keyword.call(null,js_key);
}
})();
return cljs.core.assoc.call(null,clj_opts,key_,value);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.js__GT_clj.call(null,js_opts));
});
/**
 * Convert the result to a JS object
 */
parinfer.api_js.js_result = (function parinfer$api_js$js_result(p__33053){
var map__33056 = p__33053;
var map__33056__$1 = ((((!((map__33056 == null)))?((((map__33056.cljs$lang$protocol_mask$partition0$ & (64))) || (map__33056.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__33056):map__33056);
var text = cljs.core.get.call(null,map__33056__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var valid_QMARK_ = cljs.core.get.call(null,map__33056__$1,new cljs.core.Keyword(null,"valid?","valid?",-212412379));
var state = cljs.core.get.call(null,map__33056__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
return {"text": text, "isValid": valid_QMARK_, "state": state};
});
/**
 * JavaScript wrapper around parinfer.indent-mode/format-text
 */
parinfer.api_js.js_indent_mode = (function parinfer$api_js$js_indent_mode(txt,js_opts){
return parinfer.api_js.js_result.call(null,parinfer.indent_mode.format_text.call(null,txt,parinfer.api_js.convert_opts.call(null,js_opts)));
});
goog.exportSymbol('parinfer.api_js.js_indent_mode', parinfer.api_js.js_indent_mode);
/**
 * JavaScript wrapper around parinfer.indent-mode/format-text-change
 */
parinfer.api_js.js_indent_mode_change = (function parinfer$api_js$js_indent_mode_change(txt,prev_state,js_change,js_opts){
return parinfer.api_js.js_result.call(null,parinfer.indent_mode.format_text_change.call(null,prev_state,parinfer.api_js.convert_opts.call(null,js_change),parinfer.api_js.convert_opts.call(null,js_opts)));
});
goog.exportSymbol('parinfer.api_js.js_indent_mode_change', parinfer.api_js.js_indent_mode_change);
/**
 * JavaScript wrapper around parinfer.paren-mode/format-text
 */
parinfer.api_js.js_paren_mode = (function parinfer$api_js$js_paren_mode(txt,js_opts){
return parinfer.api_js.js_result.call(null,parinfer.paren_mode.format_text.call(null,txt,parinfer.api_js.convert_opts.call(null,js_opts)));
});
goog.exportSymbol('parinfer.api_js.js_paren_mode', parinfer.api_js.js_paren_mode);

//# sourceMappingURL=api_js.js.map?rel=1449460871440