// Compiled by ClojureScript 1.7.122 {}
goog.provide('figwheel.connect');
goog.require('cljs.core');
goog.require('parinfer_site.core');
goog.require('figwheel.client');
goog.require('figwheel.client.utils');
figwheel.client.start.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"build-id","build-id",1642831089),"dev",new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),(function() { 
var G__31050__delegate = function (x){
if(cljs.core.truth_(parinfer_site.core.on_js_reload)){
return cljs.core.apply.call(null,parinfer_site.core.on_js_reload,x);
} else {
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: :on-jsload hook 'parinfer-site.core/on-js-reload' is missing");
}
};
var G__31050 = function (var_args){
var x = null;
if (arguments.length > 0) {
var G__31051__i = 0, G__31051__a = new Array(arguments.length -  0);
while (G__31051__i < G__31051__a.length) {G__31051__a[G__31051__i] = arguments[G__31051__i + 0]; ++G__31051__i;}
  x = new cljs.core.IndexedSeq(G__31051__a,0);
} 
return G__31050__delegate.call(this,x);};
G__31050.cljs$lang$maxFixedArity = 0;
G__31050.cljs$lang$applyTo = (function (arglist__31052){
var x = cljs.core.seq(arglist__31052);
return G__31050__delegate(x);
});
G__31050.cljs$core$IFn$_invoke$arity$variadic = G__31050__delegate;
return G__31050;
})()
,new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),"ws://localhost:3449/figwheel-ws"], null));

//# sourceMappingURL=connect.js.map?rel=1449460869158