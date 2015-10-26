// Compiled by ClojureScript 1.7.122 {}
goog.provide('figwheel.client.socket');
goog.require('cljs.core');
goog.require('figwheel.client.utils');
goog.require('cljs.reader');
figwheel.client.socket.get_websocket_imp = (function figwheel$client$socket$get_websocket_imp(){
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
return (window["WebSocket"]);
} else {
if(cljs.core.truth_(figwheel.client.utils.node_env_QMARK_.call(null))){
try{return require("ws");
}catch (e45077){if((e45077 instanceof Error)){
var e = e45077;
return null;
} else {
throw e45077;

}
}} else {
return null;

}
}
});
if(typeof figwheel.client.socket.message_history_atom !== 'undefined'){
} else {
figwheel.client.socket.message_history_atom = cljs.core.atom.call(null,cljs.core.List.EMPTY);
}
if(typeof figwheel.client.socket.socket_atom !== 'undefined'){
} else {
figwheel.client.socket.socket_atom = cljs.core.atom.call(null,false);
}
/**
 * Send a end message to the server.
 */
figwheel.client.socket.send_BANG_ = (function figwheel$client$socket$send_BANG_(msg){
if(cljs.core.truth_(cljs.core.deref.call(null,figwheel.client.socket.socket_atom))){
return cljs.core.deref.call(null,figwheel.client.socket.socket_atom).send(cljs.core.pr_str.call(null,msg));
} else {
return null;
}
});
figwheel.client.socket.close_BANG_ = (function figwheel$client$socket$close_BANG_(){
cljs.core.deref.call(null,figwheel.client.socket.socket_atom).onclose = cljs.core.identity;

return cljs.core.deref.call(null,figwheel.client.socket.socket_atom).close();
});
figwheel.client.socket.open = (function figwheel$client$socket$open(p__45078){
var map__45081 = p__45078;
var map__45081__$1 = ((((!((map__45081 == null)))?((((map__45081.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45081.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45081):map__45081);
var opts = map__45081__$1;
var retry_count = cljs.core.get.call(null,map__45081__$1,new cljs.core.Keyword(null,"retry-count","retry-count",1936122875));
var retried_count = cljs.core.get.call(null,map__45081__$1,new cljs.core.Keyword(null,"retried-count","retried-count",-2127867357));
var websocket_url = cljs.core.get.call(null,map__45081__$1,new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938));
var build_id = cljs.core.get.call(null,map__45081__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
var temp__4423__auto__ = figwheel.client.socket.get_websocket_imp.call(null);
if(cljs.core.truth_(temp__4423__auto__)){
var WebSocket = temp__4423__auto__;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: trying to open cljs reload socket");

var url = [cljs.core.str(websocket_url),cljs.core.str((cljs.core.truth_(build_id)?[cljs.core.str("/"),cljs.core.str(build_id)].join(''):""))].join('');
var socket = (new WebSocket(url));
socket.onmessage = ((function (url,socket,WebSocket,temp__4423__auto__,map__45081,map__45081__$1,opts,retry_count,retried_count,websocket_url,build_id){
return (function (msg_str){
var temp__4425__auto__ = cljs.reader.read_string.call(null,msg_str.data);
if(cljs.core.truth_(temp__4425__auto__)){
var msg = temp__4425__auto__;
figwheel.client.utils.debug_prn.call(null,msg);

var and__16255__auto__ = cljs.core.map_QMARK_.call(null,msg);
if(and__16255__auto__){
var and__16255__auto____$1 = new cljs.core.Keyword(null,"msg-name","msg-name",-353709863).cljs$core$IFn$_invoke$arity$1(msg);
if(cljs.core.truth_(and__16255__auto____$1)){
var and__16255__auto____$2 = cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"ping","ping",-1670114784));
if(and__16255__auto____$2){
return cljs.core.swap_BANG_.call(null,figwheel.client.socket.message_history_atom,cljs.core.conj,msg);
} else {
return and__16255__auto____$2;
}
} else {
return and__16255__auto____$1;
}
} else {
return and__16255__auto__;
}
} else {
return null;
}
});})(url,socket,WebSocket,temp__4423__auto__,map__45081,map__45081__$1,opts,retry_count,retried_count,websocket_url,build_id))
;

socket.onopen = ((function (url,socket,WebSocket,temp__4423__auto__,map__45081,map__45081__$1,opts,retry_count,retried_count,websocket_url,build_id){
return (function (x){
cljs.core.reset_BANG_.call(null,figwheel.client.socket.socket_atom,socket);

if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
window.addEventListener("beforeunload",figwheel.client.socket.close_BANG_);
} else {
}

return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: socket connection established");
});})(url,socket,WebSocket,temp__4423__auto__,map__45081,map__45081__$1,opts,retry_count,retried_count,websocket_url,build_id))
;

socket.onclose = ((function (url,socket,WebSocket,temp__4423__auto__,map__45081,map__45081__$1,opts,retry_count,retried_count,websocket_url,build_id){
return (function (x){
var retried_count__$1 = (function (){var or__16267__auto__ = retried_count;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return (0);
}
})();
figwheel.client.utils.debug_prn.call(null,"Figwheel: socket closed or failed to open");

if((retry_count > retried_count__$1)){
return setTimeout(((function (retried_count__$1,url,socket,WebSocket,temp__4423__auto__,map__45081,map__45081__$1,opts,retry_count,retried_count,websocket_url,build_id){
return (function (){
return figwheel$client$socket$open.call(null,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"retried-count","retried-count",-2127867357),(retried_count__$1 + (1))));
});})(retried_count__$1,url,socket,WebSocket,temp__4423__auto__,map__45081,map__45081__$1,opts,retry_count,retried_count,websocket_url,build_id))
,(function (){var x__16605__auto__ = (10000);
var y__16606__auto__ = ((2000) + ((500) * retried_count__$1));
return ((x__16605__auto__ < y__16606__auto__) ? x__16605__auto__ : y__16606__auto__);
})());
} else {
return null;
}
});})(url,socket,WebSocket,temp__4423__auto__,map__45081,map__45081__$1,opts,retry_count,retried_count,websocket_url,build_id))
;

socket.onerror = ((function (url,socket,WebSocket,temp__4423__auto__,map__45081,map__45081__$1,opts,retry_count,retried_count,websocket_url,build_id){
return (function (x){
return figwheel.client.utils.debug_prn.call(null,"Figwheel: socket error ");
});})(url,socket,WebSocket,temp__4423__auto__,map__45081,map__45081__$1,opts,retry_count,retried_count,websocket_url,build_id))
;

return socket;
} else {
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),(cljs.core.truth_(figwheel.client.utils.node_env_QMARK_.call(null))?"Figwheel: Can't start Figwheel!! Please make sure ws is installed\n do -> 'npm install ws'":"Figwheel: Can't start Figwheel!! This browser doesn't support WebSockets"));
}
});

//# sourceMappingURL=socket.js.map?rel=1445823449752