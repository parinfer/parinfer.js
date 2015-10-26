// Compiled by ClojureScript 1.7.122 {}
goog.provide('figwheel.connect');
goog.require('cljs.core');
goog.require('parinfer.core');
goog.require('figwheel.client');
goog.require('figwheel.client.utils');
figwheel.client.start.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"build-id","build-id",1642831089),"dev",new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),(function() { 
var G__37493__delegate = function (x){
if(cljs.core.truth_(parinfer.core.on_js_reload)){
return cljs.core.apply.call(null,parinfer.core.on_js_reload,x);
} else {
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: :on-jsload hook 'parinfer.core/on-js-reload' is missing");
}
};
var G__37493 = function (var_args){
var x = null;
if (arguments.length > 0) {
var G__37494__i = 0, G__37494__a = new Array(arguments.length -  0);
while (G__37494__i < G__37494__a.length) {G__37494__a[G__37494__i] = arguments[G__37494__i + 0]; ++G__37494__i;}
  x = new cljs.core.IndexedSeq(G__37494__a,0);
} 
return G__37493__delegate.call(this,x);};
G__37493.cljs$lang$maxFixedArity = 0;
G__37493.cljs$lang$applyTo = (function (arglist__37495){
var x = cljs.core.seq(arglist__37495);
return G__37493__delegate(x);
});
G__37493.cljs$core$IFn$_invoke$arity$variadic = G__37493__delegate;
return G__37493;
})()
,new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),"ws://localhost:3449/figwheel-ws"], null));

//# sourceMappingURL=connect.js.map?rel=1445823440302