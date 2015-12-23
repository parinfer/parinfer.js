// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer_site.parinfer');
goog.require('cljs.core');
parinfer_site.parinfer.convert_result = (function parinfer_site$parinfer$convert_result(result){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"text","text",-1790561697),(result["text"]),new cljs.core.Keyword(null,"valid?","valid?",-212412379),(result["isValid"]),new cljs.core.Keyword(null,"state","state",-1988618099),(result["state"])], null);
});
parinfer_site.parinfer.convert_options = (function parinfer_site$parinfer$convert_options(options){
return {"cursorX": new cljs.core.Keyword(null,"cursor-x","cursor-x",475204266).cljs$core$IFn$_invoke$arity$1(options), "cursorLine": new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007).cljs$core$IFn$_invoke$arity$1(options), "cursorDx": new cljs.core.Keyword(null,"cursor-dx","cursor-dx",133069327).cljs$core$IFn$_invoke$arity$1(options)};
});
parinfer_site.parinfer.indent_mode_STAR_ = (window["parinfer"]["indentMode"]);
parinfer_site.parinfer.paren_mode_STAR_ = (window["parinfer"]["parenMode"]);
parinfer_site.parinfer.indent_mode = (function parinfer_site$parinfer$indent_mode(var_args){
var args20988 = [];
var len__17325__auto___20991 = arguments.length;
var i__17326__auto___20992 = (0);
while(true){
if((i__17326__auto___20992 < len__17325__auto___20991)){
args20988.push((arguments[i__17326__auto___20992]));

var G__20993 = (i__17326__auto___20992 + (1));
i__17326__auto___20992 = G__20993;
continue;
} else {
}
break;
}

var G__20990 = args20988.length;
switch (G__20990) {
case 1:
return parinfer_site.parinfer.indent_mode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer_site.parinfer.indent_mode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args20988.length)].join('')));

}
});

parinfer_site.parinfer.indent_mode.cljs$core$IFn$_invoke$arity$1 = (function (text){
return parinfer_site.parinfer.convert_result.call(null,parinfer_site.parinfer.indent_mode_STAR_.call(null,text));
});

parinfer_site.parinfer.indent_mode.cljs$core$IFn$_invoke$arity$2 = (function (text,options){
return parinfer_site.parinfer.convert_result.call(null,parinfer_site.parinfer.indent_mode_STAR_.call(null,text,parinfer_site.parinfer.convert_options.call(null,options)));
});

parinfer_site.parinfer.indent_mode.cljs$lang$maxFixedArity = 2;
parinfer_site.parinfer.paren_mode = (function parinfer_site$parinfer$paren_mode(var_args){
var args20995 = [];
var len__17325__auto___20998 = arguments.length;
var i__17326__auto___20999 = (0);
while(true){
if((i__17326__auto___20999 < len__17325__auto___20998)){
args20995.push((arguments[i__17326__auto___20999]));

var G__21000 = (i__17326__auto___20999 + (1));
i__17326__auto___20999 = G__21000;
continue;
} else {
}
break;
}

var G__20997 = args20995.length;
switch (G__20997) {
case 1:
return parinfer_site.parinfer.paren_mode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return parinfer_site.parinfer.paren_mode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args20995.length)].join('')));

}
});

parinfer_site.parinfer.paren_mode.cljs$core$IFn$_invoke$arity$1 = (function (text){
return parinfer_site.parinfer.convert_result.call(null,parinfer_site.parinfer.paren_mode_STAR_.call(null,text));
});

parinfer_site.parinfer.paren_mode.cljs$core$IFn$_invoke$arity$2 = (function (text,options){
return parinfer_site.parinfer.convert_result.call(null,parinfer_site.parinfer.paren_mode_STAR_.call(null,text,parinfer_site.parinfer.convert_options.call(null,options)));
});

parinfer_site.parinfer.paren_mode.cljs$lang$maxFixedArity = 2;

//# sourceMappingURL=parinfer.js.map?rel=1450835340482