// Compiled by ClojureScript 1.7.122 {}
goog.provide('figwheel.connect');
goog.require('cljs.core');
goog.require('parinfer.core');
goog.require('figwheel.client');
goog.require('figwheel.client.utils');
figwheel.client.start.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"build-id","build-id",1642831089),"dev",new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),(function() { 
var G__46722__delegate = function (x){
if(cljs.core.truth_(parinfer.core.on_js_reload)){
return cljs.core.apply.call(null,parinfer.core.on_js_reload,x);
} else {
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: :on-jsload hook 'parinfer.core/on-js-reload' is missing");
}
};
var G__46722 = function (var_args){
var x = null;
if (arguments.length > 0) {
var G__46723__i = 0, G__46723__a = new Array(arguments.length -  0);
while (G__46723__i < G__46723__a.length) {G__46723__a[G__46723__i] = arguments[G__46723__i + 0]; ++G__46723__i;}
  x = new cljs.core.IndexedSeq(G__46723__a,0);
} 
return G__46722__delegate.call(this,x);};
G__46722.cljs$lang$maxFixedArity = 0;
G__46722.cljs$lang$applyTo = (function (arglist__46724){
var x = cljs.core.seq(arglist__46724);
return G__46722__delegate(x);
});
G__46722.cljs$core$IFn$_invoke$arity$variadic = G__46722__delegate;
return G__46722;
})()
,new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),"ws://localhost:3449/figwheel-ws"], null));

//# sourceMappingURL=connect.js.map?rel=1445965099322