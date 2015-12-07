// Compiled by ClojureScript 1.7.122 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(f){
if(typeof cljs.core.async.t_cljs$core$async34340 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async34340 = (function (fn_handler,f,meta34341){
this.fn_handler = fn_handler;
this.f = f;
this.meta34341 = meta34341;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async34340.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_34342,meta34341__$1){
var self__ = this;
var _34342__$1 = this;
return (new cljs.core.async.t_cljs$core$async34340(self__.fn_handler,self__.f,meta34341__$1));
});

cljs.core.async.t_cljs$core$async34340.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_34342){
var self__ = this;
var _34342__$1 = this;
return self__.meta34341;
});

cljs.core.async.t_cljs$core$async34340.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async34340.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async34340.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async34340.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"fn-handler","fn-handler",648785851,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null)], null)))], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"meta34341","meta34341",1249706960,null)], null);
});

cljs.core.async.t_cljs$core$async34340.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async34340.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34340";

cljs.core.async.t_cljs$core$async34340.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async34340");
});

cljs.core.async.__GT_t_cljs$core$async34340 = (function cljs$core$async$fn_handler_$___GT_t_cljs$core$async34340(fn_handler__$1,f__$1,meta34341){
return (new cljs.core.async.t_cljs$core$async34340(fn_handler__$1,f__$1,meta34341));
});

}

return (new cljs.core.async.t_cljs$core$async34340(cljs$core$async$fn_handler,f,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if(!((buff == null))){
if((false) || (buff.cljs$core$async$impl$protocols$UnblockingBuffer$)){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var args34345 = [];
var len__17325__auto___34348 = arguments.length;
var i__17326__auto___34349 = (0);
while(true){
if((i__17326__auto___34349 < len__17325__auto___34348)){
args34345.push((arguments[i__17326__auto___34349]));

var G__34350 = (i__17326__auto___34349 + (1));
i__17326__auto___34349 = G__34350;
continue;
} else {
}
break;
}

var G__34347 = args34345.length;
switch (G__34347) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args34345.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("buffer must be supplied when transducer is"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"buf-or-n","buf-or-n",-1646815050,null)))].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;
/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var args34352 = [];
var len__17325__auto___34355 = arguments.length;
var i__17326__auto___34356 = (0);
while(true){
if((i__17326__auto___34356 < len__17325__auto___34355)){
args34352.push((arguments[i__17326__auto___34356]));

var G__34357 = (i__17326__auto___34356 + (1));
i__17326__auto___34356 = G__34357;
continue;
} else {
}
break;
}

var G__34354 = args34352.length;
switch (G__34354) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args34352.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_34359 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_34359);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_34359,ret){
return (function (){
return fn1.call(null,val_34359);
});})(val_34359,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;
cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var args34360 = [];
var len__17325__auto___34363 = arguments.length;
var i__17326__auto___34364 = (0);
while(true){
if((i__17326__auto___34364 < len__17325__auto___34363)){
args34360.push((arguments[i__17326__auto___34364]));

var G__34365 = (i__17326__auto___34364 + (1));
i__17326__auto___34364 = G__34365;
continue;
} else {
}
break;
}

var G__34362 = args34360.length;
switch (G__34362) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args34360.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4423__auto__)){
var ret = temp__4423__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__4423__auto__)){
var retb = temp__4423__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4423__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__4423__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;
cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__17170__auto___34367 = n;
var x_34368 = (0);
while(true){
if((x_34368 < n__17170__auto___34367)){
(a[x_34368] = (0));

var G__34369 = (x_34368 + (1));
x_34368 = G__34369;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__34370 = (i + (1));
i = G__34370;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async34374 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async34374 = (function (alt_flag,flag,meta34375){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta34375 = meta34375;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async34374.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_34376,meta34375__$1){
var self__ = this;
var _34376__$1 = this;
return (new cljs.core.async.t_cljs$core$async34374(self__.alt_flag,self__.flag,meta34375__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async34374.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_34376){
var self__ = this;
var _34376__$1 = this;
return self__.meta34375;
});})(flag))
;

cljs.core.async.t_cljs$core$async34374.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async34374.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async34374.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async34374.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta34375","meta34375",-1899000693,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async34374.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async34374.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34374";

cljs.core.async.t_cljs$core$async34374.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async34374");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async34374 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async34374(alt_flag__$1,flag__$1,meta34375){
return (new cljs.core.async.t_cljs$core$async34374(alt_flag__$1,flag__$1,meta34375));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async34374(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async34380 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async34380 = (function (alt_handler,flag,cb,meta34381){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta34381 = meta34381;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async34380.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_34382,meta34381__$1){
var self__ = this;
var _34382__$1 = this;
return (new cljs.core.async.t_cljs$core$async34380(self__.alt_handler,self__.flag,self__.cb,meta34381__$1));
});

cljs.core.async.t_cljs$core$async34380.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_34382){
var self__ = this;
var _34382__$1 = this;
return self__.meta34381;
});

cljs.core.async.t_cljs$core$async34380.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async34380.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async34380.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async34380.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null)], null)))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta34381","meta34381",-366255863,null)], null);
});

cljs.core.async.t_cljs$core$async34380.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async34380.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34380";

cljs.core.async.t_cljs$core$async34380.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async34380");
});

cljs.core.async.__GT_t_cljs$core$async34380 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async34380(alt_handler__$1,flag__$1,cb__$1,meta34381){
return (new cljs.core.async.t_cljs$core$async34380(alt_handler__$1,flag__$1,cb__$1,meta34381));
});

}

return (new cljs.core.async.t_cljs$core$async34380(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__34383_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__34383_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__34384_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__34384_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__16267__auto__ = wport;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return port;
}
})()], null));
} else {
var G__34385 = (i + (1));
i = G__34385;
continue;
}
} else {
return null;
}
break;
}
})();
var or__16267__auto__ = ret;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4425__auto__ = (function (){var and__16255__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__16255__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__16255__auto__;
}
})();
if(cljs.core.truth_(temp__4425__auto__)){
var got = temp__4425__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__17332__auto__ = [];
var len__17325__auto___34391 = arguments.length;
var i__17326__auto___34392 = (0);
while(true){
if((i__17326__auto___34392 < len__17325__auto___34391)){
args__17332__auto__.push((arguments[i__17326__auto___34392]));

var G__34393 = (i__17326__auto___34392 + (1));
i__17326__auto___34392 = G__34393;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__34388){
var map__34389 = p__34388;
var map__34389__$1 = ((((!((map__34389 == null)))?((((map__34389.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34389.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34389):map__34389);
var opts = map__34389__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq34386){
var G__34387 = cljs.core.first.call(null,seq34386);
var seq34386__$1 = cljs.core.next.call(null,seq34386);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__34387,seq34386__$1);
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args34394 = [];
var len__17325__auto___34444 = arguments.length;
var i__17326__auto___34445 = (0);
while(true){
if((i__17326__auto___34445 < len__17325__auto___34444)){
args34394.push((arguments[i__17326__auto___34445]));

var G__34446 = (i__17326__auto___34445 + (1));
i__17326__auto___34445 = G__34446;
continue;
} else {
}
break;
}

var G__34396 = args34394.length;
switch (G__34396) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args34394.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__20534__auto___34448 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___34448){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___34448){
return (function (state_34420){
var state_val_34421 = (state_34420[(1)]);
if((state_val_34421 === (7))){
var inst_34416 = (state_34420[(2)]);
var state_34420__$1 = state_34420;
var statearr_34422_34449 = state_34420__$1;
(statearr_34422_34449[(2)] = inst_34416);

(statearr_34422_34449[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34421 === (1))){
var state_34420__$1 = state_34420;
var statearr_34423_34450 = state_34420__$1;
(statearr_34423_34450[(2)] = null);

(statearr_34423_34450[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34421 === (4))){
var inst_34399 = (state_34420[(7)]);
var inst_34399__$1 = (state_34420[(2)]);
var inst_34400 = (inst_34399__$1 == null);
var state_34420__$1 = (function (){var statearr_34424 = state_34420;
(statearr_34424[(7)] = inst_34399__$1);

return statearr_34424;
})();
if(cljs.core.truth_(inst_34400)){
var statearr_34425_34451 = state_34420__$1;
(statearr_34425_34451[(1)] = (5));

} else {
var statearr_34426_34452 = state_34420__$1;
(statearr_34426_34452[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34421 === (13))){
var state_34420__$1 = state_34420;
var statearr_34427_34453 = state_34420__$1;
(statearr_34427_34453[(2)] = null);

(statearr_34427_34453[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34421 === (6))){
var inst_34399 = (state_34420[(7)]);
var state_34420__$1 = state_34420;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34420__$1,(11),to,inst_34399);
} else {
if((state_val_34421 === (3))){
var inst_34418 = (state_34420[(2)]);
var state_34420__$1 = state_34420;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34420__$1,inst_34418);
} else {
if((state_val_34421 === (12))){
var state_34420__$1 = state_34420;
var statearr_34428_34454 = state_34420__$1;
(statearr_34428_34454[(2)] = null);

(statearr_34428_34454[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34421 === (2))){
var state_34420__$1 = state_34420;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34420__$1,(4),from);
} else {
if((state_val_34421 === (11))){
var inst_34409 = (state_34420[(2)]);
var state_34420__$1 = state_34420;
if(cljs.core.truth_(inst_34409)){
var statearr_34429_34455 = state_34420__$1;
(statearr_34429_34455[(1)] = (12));

} else {
var statearr_34430_34456 = state_34420__$1;
(statearr_34430_34456[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34421 === (9))){
var state_34420__$1 = state_34420;
var statearr_34431_34457 = state_34420__$1;
(statearr_34431_34457[(2)] = null);

(statearr_34431_34457[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34421 === (5))){
var state_34420__$1 = state_34420;
if(cljs.core.truth_(close_QMARK_)){
var statearr_34432_34458 = state_34420__$1;
(statearr_34432_34458[(1)] = (8));

} else {
var statearr_34433_34459 = state_34420__$1;
(statearr_34433_34459[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34421 === (14))){
var inst_34414 = (state_34420[(2)]);
var state_34420__$1 = state_34420;
var statearr_34434_34460 = state_34420__$1;
(statearr_34434_34460[(2)] = inst_34414);

(statearr_34434_34460[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34421 === (10))){
var inst_34406 = (state_34420[(2)]);
var state_34420__$1 = state_34420;
var statearr_34435_34461 = state_34420__$1;
(statearr_34435_34461[(2)] = inst_34406);

(statearr_34435_34461[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34421 === (8))){
var inst_34403 = cljs.core.async.close_BANG_.call(null,to);
var state_34420__$1 = state_34420;
var statearr_34436_34462 = state_34420__$1;
(statearr_34436_34462[(2)] = inst_34403);

(statearr_34436_34462[(1)] = (10));


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
});})(c__20534__auto___34448))
;
return ((function (switch__20513__auto__,c__20534__auto___34448){
return (function() {
var cljs$core$async$state_machine__20514__auto__ = null;
var cljs$core$async$state_machine__20514__auto____0 = (function (){
var statearr_34440 = [null,null,null,null,null,null,null,null];
(statearr_34440[(0)] = cljs$core$async$state_machine__20514__auto__);

(statearr_34440[(1)] = (1));

return statearr_34440;
});
var cljs$core$async$state_machine__20514__auto____1 = (function (state_34420){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_34420);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e34441){if((e34441 instanceof Object)){
var ex__20517__auto__ = e34441;
var statearr_34442_34463 = state_34420;
(statearr_34442_34463[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34420);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34441;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34464 = state_34420;
state_34420 = G__34464;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$state_machine__20514__auto__ = function(state_34420){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20514__auto____1.call(this,state_34420);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20514__auto____0;
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20514__auto____1;
return cljs$core$async$state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___34448))
})();
var state__20536__auto__ = (function (){var statearr_34443 = f__20535__auto__.call(null);
(statearr_34443[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___34448);

return statearr_34443;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___34448))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;
cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"pos?","pos?",-244377722,null),new cljs.core.Symbol(null,"n","n",-2092305744,null))))].join('')));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__34648){
var vec__34649 = p__34648;
var v = cljs.core.nth.call(null,vec__34649,(0),null);
var p = cljs.core.nth.call(null,vec__34649,(1),null);
var job = vec__34649;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__20534__auto___34831 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___34831,res,vec__34649,v,p,job,jobs,results){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___34831,res,vec__34649,v,p,job,jobs,results){
return (function (state_34654){
var state_val_34655 = (state_34654[(1)]);
if((state_val_34655 === (1))){
var state_34654__$1 = state_34654;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34654__$1,(2),res,v);
} else {
if((state_val_34655 === (2))){
var inst_34651 = (state_34654[(2)]);
var inst_34652 = cljs.core.async.close_BANG_.call(null,res);
var state_34654__$1 = (function (){var statearr_34656 = state_34654;
(statearr_34656[(7)] = inst_34651);

return statearr_34656;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34654__$1,inst_34652);
} else {
return null;
}
}
});})(c__20534__auto___34831,res,vec__34649,v,p,job,jobs,results))
;
return ((function (switch__20513__auto__,c__20534__auto___34831,res,vec__34649,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0 = (function (){
var statearr_34660 = [null,null,null,null,null,null,null,null];
(statearr_34660[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__);

(statearr_34660[(1)] = (1));

return statearr_34660;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1 = (function (state_34654){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_34654);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e34661){if((e34661 instanceof Object)){
var ex__20517__auto__ = e34661;
var statearr_34662_34832 = state_34654;
(statearr_34662_34832[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34654);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34661;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34833 = state_34654;
state_34654 = G__34833;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__ = function(state_34654){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1.call(this,state_34654);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___34831,res,vec__34649,v,p,job,jobs,results))
})();
var state__20536__auto__ = (function (){var statearr_34663 = f__20535__auto__.call(null);
(statearr_34663[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___34831);

return statearr_34663;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___34831,res,vec__34649,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__34664){
var vec__34665 = p__34664;
var v = cljs.core.nth.call(null,vec__34665,(0),null);
var p = cljs.core.nth.call(null,vec__34665,(1),null);
var job = vec__34665;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__17170__auto___34834 = n;
var __34835 = (0);
while(true){
if((__34835 < n__17170__auto___34834)){
var G__34666_34836 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__34666_34836) {
case "compute":
var c__20534__auto___34838 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__34835,c__20534__auto___34838,G__34666_34836,n__17170__auto___34834,jobs,results,process,async){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (__34835,c__20534__auto___34838,G__34666_34836,n__17170__auto___34834,jobs,results,process,async){
return (function (state_34679){
var state_val_34680 = (state_34679[(1)]);
if((state_val_34680 === (1))){
var state_34679__$1 = state_34679;
var statearr_34681_34839 = state_34679__$1;
(statearr_34681_34839[(2)] = null);

(statearr_34681_34839[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34680 === (2))){
var state_34679__$1 = state_34679;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34679__$1,(4),jobs);
} else {
if((state_val_34680 === (3))){
var inst_34677 = (state_34679[(2)]);
var state_34679__$1 = state_34679;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34679__$1,inst_34677);
} else {
if((state_val_34680 === (4))){
var inst_34669 = (state_34679[(2)]);
var inst_34670 = process.call(null,inst_34669);
var state_34679__$1 = state_34679;
if(cljs.core.truth_(inst_34670)){
var statearr_34682_34840 = state_34679__$1;
(statearr_34682_34840[(1)] = (5));

} else {
var statearr_34683_34841 = state_34679__$1;
(statearr_34683_34841[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34680 === (5))){
var state_34679__$1 = state_34679;
var statearr_34684_34842 = state_34679__$1;
(statearr_34684_34842[(2)] = null);

(statearr_34684_34842[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34680 === (6))){
var state_34679__$1 = state_34679;
var statearr_34685_34843 = state_34679__$1;
(statearr_34685_34843[(2)] = null);

(statearr_34685_34843[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34680 === (7))){
var inst_34675 = (state_34679[(2)]);
var state_34679__$1 = state_34679;
var statearr_34686_34844 = state_34679__$1;
(statearr_34686_34844[(2)] = inst_34675);

(statearr_34686_34844[(1)] = (3));


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
});})(__34835,c__20534__auto___34838,G__34666_34836,n__17170__auto___34834,jobs,results,process,async))
;
return ((function (__34835,switch__20513__auto__,c__20534__auto___34838,G__34666_34836,n__17170__auto___34834,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0 = (function (){
var statearr_34690 = [null,null,null,null,null,null,null];
(statearr_34690[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__);

(statearr_34690[(1)] = (1));

return statearr_34690;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1 = (function (state_34679){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_34679);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e34691){if((e34691 instanceof Object)){
var ex__20517__auto__ = e34691;
var statearr_34692_34845 = state_34679;
(statearr_34692_34845[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34679);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34691;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34846 = state_34679;
state_34679 = G__34846;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__ = function(state_34679){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1.call(this,state_34679);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__;
})()
;})(__34835,switch__20513__auto__,c__20534__auto___34838,G__34666_34836,n__17170__auto___34834,jobs,results,process,async))
})();
var state__20536__auto__ = (function (){var statearr_34693 = f__20535__auto__.call(null);
(statearr_34693[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___34838);

return statearr_34693;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(__34835,c__20534__auto___34838,G__34666_34836,n__17170__auto___34834,jobs,results,process,async))
);


break;
case "async":
var c__20534__auto___34847 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__34835,c__20534__auto___34847,G__34666_34836,n__17170__auto___34834,jobs,results,process,async){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (__34835,c__20534__auto___34847,G__34666_34836,n__17170__auto___34834,jobs,results,process,async){
return (function (state_34706){
var state_val_34707 = (state_34706[(1)]);
if((state_val_34707 === (1))){
var state_34706__$1 = state_34706;
var statearr_34708_34848 = state_34706__$1;
(statearr_34708_34848[(2)] = null);

(statearr_34708_34848[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34707 === (2))){
var state_34706__$1 = state_34706;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34706__$1,(4),jobs);
} else {
if((state_val_34707 === (3))){
var inst_34704 = (state_34706[(2)]);
var state_34706__$1 = state_34706;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34706__$1,inst_34704);
} else {
if((state_val_34707 === (4))){
var inst_34696 = (state_34706[(2)]);
var inst_34697 = async.call(null,inst_34696);
var state_34706__$1 = state_34706;
if(cljs.core.truth_(inst_34697)){
var statearr_34709_34849 = state_34706__$1;
(statearr_34709_34849[(1)] = (5));

} else {
var statearr_34710_34850 = state_34706__$1;
(statearr_34710_34850[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34707 === (5))){
var state_34706__$1 = state_34706;
var statearr_34711_34851 = state_34706__$1;
(statearr_34711_34851[(2)] = null);

(statearr_34711_34851[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34707 === (6))){
var state_34706__$1 = state_34706;
var statearr_34712_34852 = state_34706__$1;
(statearr_34712_34852[(2)] = null);

(statearr_34712_34852[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34707 === (7))){
var inst_34702 = (state_34706[(2)]);
var state_34706__$1 = state_34706;
var statearr_34713_34853 = state_34706__$1;
(statearr_34713_34853[(2)] = inst_34702);

(statearr_34713_34853[(1)] = (3));


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
});})(__34835,c__20534__auto___34847,G__34666_34836,n__17170__auto___34834,jobs,results,process,async))
;
return ((function (__34835,switch__20513__auto__,c__20534__auto___34847,G__34666_34836,n__17170__auto___34834,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0 = (function (){
var statearr_34717 = [null,null,null,null,null,null,null];
(statearr_34717[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__);

(statearr_34717[(1)] = (1));

return statearr_34717;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1 = (function (state_34706){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_34706);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e34718){if((e34718 instanceof Object)){
var ex__20517__auto__ = e34718;
var statearr_34719_34854 = state_34706;
(statearr_34719_34854[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34706);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34718;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34855 = state_34706;
state_34706 = G__34855;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__ = function(state_34706){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1.call(this,state_34706);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__;
})()
;})(__34835,switch__20513__auto__,c__20534__auto___34847,G__34666_34836,n__17170__auto___34834,jobs,results,process,async))
})();
var state__20536__auto__ = (function (){var statearr_34720 = f__20535__auto__.call(null);
(statearr_34720[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___34847);

return statearr_34720;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(__34835,c__20534__auto___34847,G__34666_34836,n__17170__auto___34834,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__34856 = (__34835 + (1));
__34835 = G__34856;
continue;
} else {
}
break;
}

var c__20534__auto___34857 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___34857,jobs,results,process,async){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___34857,jobs,results,process,async){
return (function (state_34742){
var state_val_34743 = (state_34742[(1)]);
if((state_val_34743 === (1))){
var state_34742__$1 = state_34742;
var statearr_34744_34858 = state_34742__$1;
(statearr_34744_34858[(2)] = null);

(statearr_34744_34858[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34743 === (2))){
var state_34742__$1 = state_34742;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34742__$1,(4),from);
} else {
if((state_val_34743 === (3))){
var inst_34740 = (state_34742[(2)]);
var state_34742__$1 = state_34742;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34742__$1,inst_34740);
} else {
if((state_val_34743 === (4))){
var inst_34723 = (state_34742[(7)]);
var inst_34723__$1 = (state_34742[(2)]);
var inst_34724 = (inst_34723__$1 == null);
var state_34742__$1 = (function (){var statearr_34745 = state_34742;
(statearr_34745[(7)] = inst_34723__$1);

return statearr_34745;
})();
if(cljs.core.truth_(inst_34724)){
var statearr_34746_34859 = state_34742__$1;
(statearr_34746_34859[(1)] = (5));

} else {
var statearr_34747_34860 = state_34742__$1;
(statearr_34747_34860[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34743 === (5))){
var inst_34726 = cljs.core.async.close_BANG_.call(null,jobs);
var state_34742__$1 = state_34742;
var statearr_34748_34861 = state_34742__$1;
(statearr_34748_34861[(2)] = inst_34726);

(statearr_34748_34861[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34743 === (6))){
var inst_34728 = (state_34742[(8)]);
var inst_34723 = (state_34742[(7)]);
var inst_34728__$1 = cljs.core.async.chan.call(null,(1));
var inst_34729 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_34730 = [inst_34723,inst_34728__$1];
var inst_34731 = (new cljs.core.PersistentVector(null,2,(5),inst_34729,inst_34730,null));
var state_34742__$1 = (function (){var statearr_34749 = state_34742;
(statearr_34749[(8)] = inst_34728__$1);

return statearr_34749;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34742__$1,(8),jobs,inst_34731);
} else {
if((state_val_34743 === (7))){
var inst_34738 = (state_34742[(2)]);
var state_34742__$1 = state_34742;
var statearr_34750_34862 = state_34742__$1;
(statearr_34750_34862[(2)] = inst_34738);

(statearr_34750_34862[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34743 === (8))){
var inst_34728 = (state_34742[(8)]);
var inst_34733 = (state_34742[(2)]);
var state_34742__$1 = (function (){var statearr_34751 = state_34742;
(statearr_34751[(9)] = inst_34733);

return statearr_34751;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34742__$1,(9),results,inst_34728);
} else {
if((state_val_34743 === (9))){
var inst_34735 = (state_34742[(2)]);
var state_34742__$1 = (function (){var statearr_34752 = state_34742;
(statearr_34752[(10)] = inst_34735);

return statearr_34752;
})();
var statearr_34753_34863 = state_34742__$1;
(statearr_34753_34863[(2)] = null);

(statearr_34753_34863[(1)] = (2));


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
});})(c__20534__auto___34857,jobs,results,process,async))
;
return ((function (switch__20513__auto__,c__20534__auto___34857,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0 = (function (){
var statearr_34757 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_34757[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__);

(statearr_34757[(1)] = (1));

return statearr_34757;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1 = (function (state_34742){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_34742);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e34758){if((e34758 instanceof Object)){
var ex__20517__auto__ = e34758;
var statearr_34759_34864 = state_34742;
(statearr_34759_34864[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34742);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34758;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34865 = state_34742;
state_34742 = G__34865;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__ = function(state_34742){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1.call(this,state_34742);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___34857,jobs,results,process,async))
})();
var state__20536__auto__ = (function (){var statearr_34760 = f__20535__auto__.call(null);
(statearr_34760[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___34857);

return statearr_34760;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___34857,jobs,results,process,async))
);


var c__20534__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto__,jobs,results,process,async){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto__,jobs,results,process,async){
return (function (state_34798){
var state_val_34799 = (state_34798[(1)]);
if((state_val_34799 === (7))){
var inst_34794 = (state_34798[(2)]);
var state_34798__$1 = state_34798;
var statearr_34800_34866 = state_34798__$1;
(statearr_34800_34866[(2)] = inst_34794);

(statearr_34800_34866[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (20))){
var state_34798__$1 = state_34798;
var statearr_34801_34867 = state_34798__$1;
(statearr_34801_34867[(2)] = null);

(statearr_34801_34867[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (1))){
var state_34798__$1 = state_34798;
var statearr_34802_34868 = state_34798__$1;
(statearr_34802_34868[(2)] = null);

(statearr_34802_34868[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (4))){
var inst_34763 = (state_34798[(7)]);
var inst_34763__$1 = (state_34798[(2)]);
var inst_34764 = (inst_34763__$1 == null);
var state_34798__$1 = (function (){var statearr_34803 = state_34798;
(statearr_34803[(7)] = inst_34763__$1);

return statearr_34803;
})();
if(cljs.core.truth_(inst_34764)){
var statearr_34804_34869 = state_34798__$1;
(statearr_34804_34869[(1)] = (5));

} else {
var statearr_34805_34870 = state_34798__$1;
(statearr_34805_34870[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (15))){
var inst_34776 = (state_34798[(8)]);
var state_34798__$1 = state_34798;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34798__$1,(18),to,inst_34776);
} else {
if((state_val_34799 === (21))){
var inst_34789 = (state_34798[(2)]);
var state_34798__$1 = state_34798;
var statearr_34806_34871 = state_34798__$1;
(statearr_34806_34871[(2)] = inst_34789);

(statearr_34806_34871[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (13))){
var inst_34791 = (state_34798[(2)]);
var state_34798__$1 = (function (){var statearr_34807 = state_34798;
(statearr_34807[(9)] = inst_34791);

return statearr_34807;
})();
var statearr_34808_34872 = state_34798__$1;
(statearr_34808_34872[(2)] = null);

(statearr_34808_34872[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (6))){
var inst_34763 = (state_34798[(7)]);
var state_34798__$1 = state_34798;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34798__$1,(11),inst_34763);
} else {
if((state_val_34799 === (17))){
var inst_34784 = (state_34798[(2)]);
var state_34798__$1 = state_34798;
if(cljs.core.truth_(inst_34784)){
var statearr_34809_34873 = state_34798__$1;
(statearr_34809_34873[(1)] = (19));

} else {
var statearr_34810_34874 = state_34798__$1;
(statearr_34810_34874[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (3))){
var inst_34796 = (state_34798[(2)]);
var state_34798__$1 = state_34798;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34798__$1,inst_34796);
} else {
if((state_val_34799 === (12))){
var inst_34773 = (state_34798[(10)]);
var state_34798__$1 = state_34798;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34798__$1,(14),inst_34773);
} else {
if((state_val_34799 === (2))){
var state_34798__$1 = state_34798;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34798__$1,(4),results);
} else {
if((state_val_34799 === (19))){
var state_34798__$1 = state_34798;
var statearr_34811_34875 = state_34798__$1;
(statearr_34811_34875[(2)] = null);

(statearr_34811_34875[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (11))){
var inst_34773 = (state_34798[(2)]);
var state_34798__$1 = (function (){var statearr_34812 = state_34798;
(statearr_34812[(10)] = inst_34773);

return statearr_34812;
})();
var statearr_34813_34876 = state_34798__$1;
(statearr_34813_34876[(2)] = null);

(statearr_34813_34876[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (9))){
var state_34798__$1 = state_34798;
var statearr_34814_34877 = state_34798__$1;
(statearr_34814_34877[(2)] = null);

(statearr_34814_34877[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (5))){
var state_34798__$1 = state_34798;
if(cljs.core.truth_(close_QMARK_)){
var statearr_34815_34878 = state_34798__$1;
(statearr_34815_34878[(1)] = (8));

} else {
var statearr_34816_34879 = state_34798__$1;
(statearr_34816_34879[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (14))){
var inst_34778 = (state_34798[(11)]);
var inst_34776 = (state_34798[(8)]);
var inst_34776__$1 = (state_34798[(2)]);
var inst_34777 = (inst_34776__$1 == null);
var inst_34778__$1 = cljs.core.not.call(null,inst_34777);
var state_34798__$1 = (function (){var statearr_34817 = state_34798;
(statearr_34817[(11)] = inst_34778__$1);

(statearr_34817[(8)] = inst_34776__$1);

return statearr_34817;
})();
if(inst_34778__$1){
var statearr_34818_34880 = state_34798__$1;
(statearr_34818_34880[(1)] = (15));

} else {
var statearr_34819_34881 = state_34798__$1;
(statearr_34819_34881[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (16))){
var inst_34778 = (state_34798[(11)]);
var state_34798__$1 = state_34798;
var statearr_34820_34882 = state_34798__$1;
(statearr_34820_34882[(2)] = inst_34778);

(statearr_34820_34882[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (10))){
var inst_34770 = (state_34798[(2)]);
var state_34798__$1 = state_34798;
var statearr_34821_34883 = state_34798__$1;
(statearr_34821_34883[(2)] = inst_34770);

(statearr_34821_34883[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (18))){
var inst_34781 = (state_34798[(2)]);
var state_34798__$1 = state_34798;
var statearr_34822_34884 = state_34798__$1;
(statearr_34822_34884[(2)] = inst_34781);

(statearr_34822_34884[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34799 === (8))){
var inst_34767 = cljs.core.async.close_BANG_.call(null,to);
var state_34798__$1 = state_34798;
var statearr_34823_34885 = state_34798__$1;
(statearr_34823_34885[(2)] = inst_34767);

(statearr_34823_34885[(1)] = (10));


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
}
}
}
}
});})(c__20534__auto__,jobs,results,process,async))
;
return ((function (switch__20513__auto__,c__20534__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0 = (function (){
var statearr_34827 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34827[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__);

(statearr_34827[(1)] = (1));

return statearr_34827;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1 = (function (state_34798){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_34798);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e34828){if((e34828 instanceof Object)){
var ex__20517__auto__ = e34828;
var statearr_34829_34886 = state_34798;
(statearr_34829_34886[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34798);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34828;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34887 = state_34798;
state_34798 = G__34887;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__ = function(state_34798){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1.call(this,state_34798);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20514__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto__,jobs,results,process,async))
})();
var state__20536__auto__ = (function (){var statearr_34830 = f__20535__auto__.call(null);
(statearr_34830[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto__);

return statearr_34830;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto__,jobs,results,process,async))
);

return c__20534__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var args34888 = [];
var len__17325__auto___34891 = arguments.length;
var i__17326__auto___34892 = (0);
while(true){
if((i__17326__auto___34892 < len__17325__auto___34891)){
args34888.push((arguments[i__17326__auto___34892]));

var G__34893 = (i__17326__auto___34892 + (1));
i__17326__auto___34892 = G__34893;
continue;
} else {
}
break;
}

var G__34890 = args34888.length;
switch (G__34890) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args34888.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var args34895 = [];
var len__17325__auto___34898 = arguments.length;
var i__17326__auto___34899 = (0);
while(true){
if((i__17326__auto___34899 < len__17325__auto___34898)){
args34895.push((arguments[i__17326__auto___34899]));

var G__34900 = (i__17326__auto___34899 + (1));
i__17326__auto___34899 = G__34900;
continue;
} else {
}
break;
}

var G__34897 = args34895.length;
switch (G__34897) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args34895.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;
/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var args34902 = [];
var len__17325__auto___34955 = arguments.length;
var i__17326__auto___34956 = (0);
while(true){
if((i__17326__auto___34956 < len__17325__auto___34955)){
args34902.push((arguments[i__17326__auto___34956]));

var G__34957 = (i__17326__auto___34956 + (1));
i__17326__auto___34956 = G__34957;
continue;
} else {
}
break;
}

var G__34904 = args34902.length;
switch (G__34904) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args34902.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__20534__auto___34959 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___34959,tc,fc){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___34959,tc,fc){
return (function (state_34930){
var state_val_34931 = (state_34930[(1)]);
if((state_val_34931 === (7))){
var inst_34926 = (state_34930[(2)]);
var state_34930__$1 = state_34930;
var statearr_34932_34960 = state_34930__$1;
(statearr_34932_34960[(2)] = inst_34926);

(statearr_34932_34960[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34931 === (1))){
var state_34930__$1 = state_34930;
var statearr_34933_34961 = state_34930__$1;
(statearr_34933_34961[(2)] = null);

(statearr_34933_34961[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34931 === (4))){
var inst_34907 = (state_34930[(7)]);
var inst_34907__$1 = (state_34930[(2)]);
var inst_34908 = (inst_34907__$1 == null);
var state_34930__$1 = (function (){var statearr_34934 = state_34930;
(statearr_34934[(7)] = inst_34907__$1);

return statearr_34934;
})();
if(cljs.core.truth_(inst_34908)){
var statearr_34935_34962 = state_34930__$1;
(statearr_34935_34962[(1)] = (5));

} else {
var statearr_34936_34963 = state_34930__$1;
(statearr_34936_34963[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34931 === (13))){
var state_34930__$1 = state_34930;
var statearr_34937_34964 = state_34930__$1;
(statearr_34937_34964[(2)] = null);

(statearr_34937_34964[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34931 === (6))){
var inst_34907 = (state_34930[(7)]);
var inst_34913 = p.call(null,inst_34907);
var state_34930__$1 = state_34930;
if(cljs.core.truth_(inst_34913)){
var statearr_34938_34965 = state_34930__$1;
(statearr_34938_34965[(1)] = (9));

} else {
var statearr_34939_34966 = state_34930__$1;
(statearr_34939_34966[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34931 === (3))){
var inst_34928 = (state_34930[(2)]);
var state_34930__$1 = state_34930;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34930__$1,inst_34928);
} else {
if((state_val_34931 === (12))){
var state_34930__$1 = state_34930;
var statearr_34940_34967 = state_34930__$1;
(statearr_34940_34967[(2)] = null);

(statearr_34940_34967[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34931 === (2))){
var state_34930__$1 = state_34930;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34930__$1,(4),ch);
} else {
if((state_val_34931 === (11))){
var inst_34907 = (state_34930[(7)]);
var inst_34917 = (state_34930[(2)]);
var state_34930__$1 = state_34930;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34930__$1,(8),inst_34917,inst_34907);
} else {
if((state_val_34931 === (9))){
var state_34930__$1 = state_34930;
var statearr_34941_34968 = state_34930__$1;
(statearr_34941_34968[(2)] = tc);

(statearr_34941_34968[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34931 === (5))){
var inst_34910 = cljs.core.async.close_BANG_.call(null,tc);
var inst_34911 = cljs.core.async.close_BANG_.call(null,fc);
var state_34930__$1 = (function (){var statearr_34942 = state_34930;
(statearr_34942[(8)] = inst_34910);

return statearr_34942;
})();
var statearr_34943_34969 = state_34930__$1;
(statearr_34943_34969[(2)] = inst_34911);

(statearr_34943_34969[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34931 === (14))){
var inst_34924 = (state_34930[(2)]);
var state_34930__$1 = state_34930;
var statearr_34944_34970 = state_34930__$1;
(statearr_34944_34970[(2)] = inst_34924);

(statearr_34944_34970[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34931 === (10))){
var state_34930__$1 = state_34930;
var statearr_34945_34971 = state_34930__$1;
(statearr_34945_34971[(2)] = fc);

(statearr_34945_34971[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34931 === (8))){
var inst_34919 = (state_34930[(2)]);
var state_34930__$1 = state_34930;
if(cljs.core.truth_(inst_34919)){
var statearr_34946_34972 = state_34930__$1;
(statearr_34946_34972[(1)] = (12));

} else {
var statearr_34947_34973 = state_34930__$1;
(statearr_34947_34973[(1)] = (13));

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
});})(c__20534__auto___34959,tc,fc))
;
return ((function (switch__20513__auto__,c__20534__auto___34959,tc,fc){
return (function() {
var cljs$core$async$state_machine__20514__auto__ = null;
var cljs$core$async$state_machine__20514__auto____0 = (function (){
var statearr_34951 = [null,null,null,null,null,null,null,null,null];
(statearr_34951[(0)] = cljs$core$async$state_machine__20514__auto__);

(statearr_34951[(1)] = (1));

return statearr_34951;
});
var cljs$core$async$state_machine__20514__auto____1 = (function (state_34930){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_34930);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e34952){if((e34952 instanceof Object)){
var ex__20517__auto__ = e34952;
var statearr_34953_34974 = state_34930;
(statearr_34953_34974[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34930);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34952;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34975 = state_34930;
state_34930 = G__34975;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$state_machine__20514__auto__ = function(state_34930){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20514__auto____1.call(this,state_34930);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20514__auto____0;
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20514__auto____1;
return cljs$core$async$state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___34959,tc,fc))
})();
var state__20536__auto__ = (function (){var statearr_34954 = f__20535__auto__.call(null);
(statearr_34954[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___34959);

return statearr_34954;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___34959,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;
/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__20534__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto__){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto__){
return (function (state_35022){
var state_val_35023 = (state_35022[(1)]);
if((state_val_35023 === (1))){
var inst_35008 = init;
var state_35022__$1 = (function (){var statearr_35024 = state_35022;
(statearr_35024[(7)] = inst_35008);

return statearr_35024;
})();
var statearr_35025_35040 = state_35022__$1;
(statearr_35025_35040[(2)] = null);

(statearr_35025_35040[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35023 === (2))){
var state_35022__$1 = state_35022;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35022__$1,(4),ch);
} else {
if((state_val_35023 === (3))){
var inst_35020 = (state_35022[(2)]);
var state_35022__$1 = state_35022;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_35022__$1,inst_35020);
} else {
if((state_val_35023 === (4))){
var inst_35011 = (state_35022[(8)]);
var inst_35011__$1 = (state_35022[(2)]);
var inst_35012 = (inst_35011__$1 == null);
var state_35022__$1 = (function (){var statearr_35026 = state_35022;
(statearr_35026[(8)] = inst_35011__$1);

return statearr_35026;
})();
if(cljs.core.truth_(inst_35012)){
var statearr_35027_35041 = state_35022__$1;
(statearr_35027_35041[(1)] = (5));

} else {
var statearr_35028_35042 = state_35022__$1;
(statearr_35028_35042[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35023 === (5))){
var inst_35008 = (state_35022[(7)]);
var state_35022__$1 = state_35022;
var statearr_35029_35043 = state_35022__$1;
(statearr_35029_35043[(2)] = inst_35008);

(statearr_35029_35043[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35023 === (6))){
var inst_35008 = (state_35022[(7)]);
var inst_35011 = (state_35022[(8)]);
var inst_35015 = f.call(null,inst_35008,inst_35011);
var inst_35008__$1 = inst_35015;
var state_35022__$1 = (function (){var statearr_35030 = state_35022;
(statearr_35030[(7)] = inst_35008__$1);

return statearr_35030;
})();
var statearr_35031_35044 = state_35022__$1;
(statearr_35031_35044[(2)] = null);

(statearr_35031_35044[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35023 === (7))){
var inst_35018 = (state_35022[(2)]);
var state_35022__$1 = state_35022;
var statearr_35032_35045 = state_35022__$1;
(statearr_35032_35045[(2)] = inst_35018);

(statearr_35032_35045[(1)] = (3));


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
});})(c__20534__auto__))
;
return ((function (switch__20513__auto__,c__20534__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__20514__auto__ = null;
var cljs$core$async$reduce_$_state_machine__20514__auto____0 = (function (){
var statearr_35036 = [null,null,null,null,null,null,null,null,null];
(statearr_35036[(0)] = cljs$core$async$reduce_$_state_machine__20514__auto__);

(statearr_35036[(1)] = (1));

return statearr_35036;
});
var cljs$core$async$reduce_$_state_machine__20514__auto____1 = (function (state_35022){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_35022);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e35037){if((e35037 instanceof Object)){
var ex__20517__auto__ = e35037;
var statearr_35038_35046 = state_35022;
(statearr_35038_35046[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_35022);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e35037;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35047 = state_35022;
state_35022 = G__35047;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__20514__auto__ = function(state_35022){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__20514__auto____1.call(this,state_35022);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__20514__auto____0;
cljs$core$async$reduce_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__20514__auto____1;
return cljs$core$async$reduce_$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto__))
})();
var state__20536__auto__ = (function (){var statearr_35039 = f__20535__auto__.call(null);
(statearr_35039[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto__);

return statearr_35039;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto__))
);

return c__20534__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var args35048 = [];
var len__17325__auto___35100 = arguments.length;
var i__17326__auto___35101 = (0);
while(true){
if((i__17326__auto___35101 < len__17325__auto___35100)){
args35048.push((arguments[i__17326__auto___35101]));

var G__35102 = (i__17326__auto___35101 + (1));
i__17326__auto___35101 = G__35102;
continue;
} else {
}
break;
}

var G__35050 = args35048.length;
switch (G__35050) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args35048.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__20534__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto__){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto__){
return (function (state_35075){
var state_val_35076 = (state_35075[(1)]);
if((state_val_35076 === (7))){
var inst_35057 = (state_35075[(2)]);
var state_35075__$1 = state_35075;
var statearr_35077_35104 = state_35075__$1;
(statearr_35077_35104[(2)] = inst_35057);

(statearr_35077_35104[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35076 === (1))){
var inst_35051 = cljs.core.seq.call(null,coll);
var inst_35052 = inst_35051;
var state_35075__$1 = (function (){var statearr_35078 = state_35075;
(statearr_35078[(7)] = inst_35052);

return statearr_35078;
})();
var statearr_35079_35105 = state_35075__$1;
(statearr_35079_35105[(2)] = null);

(statearr_35079_35105[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35076 === (4))){
var inst_35052 = (state_35075[(7)]);
var inst_35055 = cljs.core.first.call(null,inst_35052);
var state_35075__$1 = state_35075;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_35075__$1,(7),ch,inst_35055);
} else {
if((state_val_35076 === (13))){
var inst_35069 = (state_35075[(2)]);
var state_35075__$1 = state_35075;
var statearr_35080_35106 = state_35075__$1;
(statearr_35080_35106[(2)] = inst_35069);

(statearr_35080_35106[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35076 === (6))){
var inst_35060 = (state_35075[(2)]);
var state_35075__$1 = state_35075;
if(cljs.core.truth_(inst_35060)){
var statearr_35081_35107 = state_35075__$1;
(statearr_35081_35107[(1)] = (8));

} else {
var statearr_35082_35108 = state_35075__$1;
(statearr_35082_35108[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35076 === (3))){
var inst_35073 = (state_35075[(2)]);
var state_35075__$1 = state_35075;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_35075__$1,inst_35073);
} else {
if((state_val_35076 === (12))){
var state_35075__$1 = state_35075;
var statearr_35083_35109 = state_35075__$1;
(statearr_35083_35109[(2)] = null);

(statearr_35083_35109[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35076 === (2))){
var inst_35052 = (state_35075[(7)]);
var state_35075__$1 = state_35075;
if(cljs.core.truth_(inst_35052)){
var statearr_35084_35110 = state_35075__$1;
(statearr_35084_35110[(1)] = (4));

} else {
var statearr_35085_35111 = state_35075__$1;
(statearr_35085_35111[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35076 === (11))){
var inst_35066 = cljs.core.async.close_BANG_.call(null,ch);
var state_35075__$1 = state_35075;
var statearr_35086_35112 = state_35075__$1;
(statearr_35086_35112[(2)] = inst_35066);

(statearr_35086_35112[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35076 === (9))){
var state_35075__$1 = state_35075;
if(cljs.core.truth_(close_QMARK_)){
var statearr_35087_35113 = state_35075__$1;
(statearr_35087_35113[(1)] = (11));

} else {
var statearr_35088_35114 = state_35075__$1;
(statearr_35088_35114[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35076 === (5))){
var inst_35052 = (state_35075[(7)]);
var state_35075__$1 = state_35075;
var statearr_35089_35115 = state_35075__$1;
(statearr_35089_35115[(2)] = inst_35052);

(statearr_35089_35115[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35076 === (10))){
var inst_35071 = (state_35075[(2)]);
var state_35075__$1 = state_35075;
var statearr_35090_35116 = state_35075__$1;
(statearr_35090_35116[(2)] = inst_35071);

(statearr_35090_35116[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35076 === (8))){
var inst_35052 = (state_35075[(7)]);
var inst_35062 = cljs.core.next.call(null,inst_35052);
var inst_35052__$1 = inst_35062;
var state_35075__$1 = (function (){var statearr_35091 = state_35075;
(statearr_35091[(7)] = inst_35052__$1);

return statearr_35091;
})();
var statearr_35092_35117 = state_35075__$1;
(statearr_35092_35117[(2)] = null);

(statearr_35092_35117[(1)] = (2));


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
});})(c__20534__auto__))
;
return ((function (switch__20513__auto__,c__20534__auto__){
return (function() {
var cljs$core$async$state_machine__20514__auto__ = null;
var cljs$core$async$state_machine__20514__auto____0 = (function (){
var statearr_35096 = [null,null,null,null,null,null,null,null];
(statearr_35096[(0)] = cljs$core$async$state_machine__20514__auto__);

(statearr_35096[(1)] = (1));

return statearr_35096;
});
var cljs$core$async$state_machine__20514__auto____1 = (function (state_35075){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_35075);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e35097){if((e35097 instanceof Object)){
var ex__20517__auto__ = e35097;
var statearr_35098_35118 = state_35075;
(statearr_35098_35118[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_35075);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e35097;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35119 = state_35075;
state_35075 = G__35119;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$state_machine__20514__auto__ = function(state_35075){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20514__auto____1.call(this,state_35075);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20514__auto____0;
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20514__auto____1;
return cljs$core$async$state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto__))
})();
var state__20536__auto__ = (function (){var statearr_35099 = f__20535__auto__.call(null);
(statearr_35099[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto__);

return statearr_35099;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto__))
);

return c__20534__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((!((_ == null))) && (!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__16922__auto__ = (((_ == null))?null:_);
var m__16923__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,_);
} else {
var m__16923__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((!((m == null))) && (!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__16922__auto__ = (((m == null))?null:m);
var m__16923__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__16923__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__16922__auto__ = (((m == null))?null:m);
var m__16923__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,m,ch);
} else {
var m__16923__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__16922__auto__ = (((m == null))?null:m);
var m__16923__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,m);
} else {
var m__16923__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async35341 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async35341 = (function (mult,ch,cs,meta35342){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta35342 = meta35342;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async35341.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_35343,meta35342__$1){
var self__ = this;
var _35343__$1 = this;
return (new cljs.core.async.t_cljs$core$async35341(self__.mult,self__.ch,self__.cs,meta35342__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async35341.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_35343){
var self__ = this;
var _35343__$1 = this;
return self__.meta35342;
});})(cs))
;

cljs.core.async.t_cljs$core$async35341.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async35341.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async35341.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async35341.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async35341.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async35341.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async35341.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta35342","meta35342",1542536059,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async35341.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async35341.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async35341";

cljs.core.async.t_cljs$core$async35341.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async35341");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async35341 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async35341(mult__$1,ch__$1,cs__$1,meta35342){
return (new cljs.core.async.t_cljs$core$async35341(mult__$1,ch__$1,cs__$1,meta35342));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async35341(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__20534__auto___35562 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___35562,cs,m,dchan,dctr,done){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___35562,cs,m,dchan,dctr,done){
return (function (state_35474){
var state_val_35475 = (state_35474[(1)]);
if((state_val_35475 === (7))){
var inst_35470 = (state_35474[(2)]);
var state_35474__$1 = state_35474;
var statearr_35476_35563 = state_35474__$1;
(statearr_35476_35563[(2)] = inst_35470);

(statearr_35476_35563[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (20))){
var inst_35375 = (state_35474[(7)]);
var inst_35385 = cljs.core.first.call(null,inst_35375);
var inst_35386 = cljs.core.nth.call(null,inst_35385,(0),null);
var inst_35387 = cljs.core.nth.call(null,inst_35385,(1),null);
var state_35474__$1 = (function (){var statearr_35477 = state_35474;
(statearr_35477[(8)] = inst_35386);

return statearr_35477;
})();
if(cljs.core.truth_(inst_35387)){
var statearr_35478_35564 = state_35474__$1;
(statearr_35478_35564[(1)] = (22));

} else {
var statearr_35479_35565 = state_35474__$1;
(statearr_35479_35565[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (27))){
var inst_35346 = (state_35474[(9)]);
var inst_35422 = (state_35474[(10)]);
var inst_35415 = (state_35474[(11)]);
var inst_35417 = (state_35474[(12)]);
var inst_35422__$1 = cljs.core._nth.call(null,inst_35415,inst_35417);
var inst_35423 = cljs.core.async.put_BANG_.call(null,inst_35422__$1,inst_35346,done);
var state_35474__$1 = (function (){var statearr_35480 = state_35474;
(statearr_35480[(10)] = inst_35422__$1);

return statearr_35480;
})();
if(cljs.core.truth_(inst_35423)){
var statearr_35481_35566 = state_35474__$1;
(statearr_35481_35566[(1)] = (30));

} else {
var statearr_35482_35567 = state_35474__$1;
(statearr_35482_35567[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (1))){
var state_35474__$1 = state_35474;
var statearr_35483_35568 = state_35474__$1;
(statearr_35483_35568[(2)] = null);

(statearr_35483_35568[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (24))){
var inst_35375 = (state_35474[(7)]);
var inst_35392 = (state_35474[(2)]);
var inst_35393 = cljs.core.next.call(null,inst_35375);
var inst_35355 = inst_35393;
var inst_35356 = null;
var inst_35357 = (0);
var inst_35358 = (0);
var state_35474__$1 = (function (){var statearr_35484 = state_35474;
(statearr_35484[(13)] = inst_35355);

(statearr_35484[(14)] = inst_35356);

(statearr_35484[(15)] = inst_35357);

(statearr_35484[(16)] = inst_35392);

(statearr_35484[(17)] = inst_35358);

return statearr_35484;
})();
var statearr_35485_35569 = state_35474__$1;
(statearr_35485_35569[(2)] = null);

(statearr_35485_35569[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (39))){
var state_35474__$1 = state_35474;
var statearr_35489_35570 = state_35474__$1;
(statearr_35489_35570[(2)] = null);

(statearr_35489_35570[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (4))){
var inst_35346 = (state_35474[(9)]);
var inst_35346__$1 = (state_35474[(2)]);
var inst_35347 = (inst_35346__$1 == null);
var state_35474__$1 = (function (){var statearr_35490 = state_35474;
(statearr_35490[(9)] = inst_35346__$1);

return statearr_35490;
})();
if(cljs.core.truth_(inst_35347)){
var statearr_35491_35571 = state_35474__$1;
(statearr_35491_35571[(1)] = (5));

} else {
var statearr_35492_35572 = state_35474__$1;
(statearr_35492_35572[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (15))){
var inst_35355 = (state_35474[(13)]);
var inst_35356 = (state_35474[(14)]);
var inst_35357 = (state_35474[(15)]);
var inst_35358 = (state_35474[(17)]);
var inst_35371 = (state_35474[(2)]);
var inst_35372 = (inst_35358 + (1));
var tmp35486 = inst_35355;
var tmp35487 = inst_35356;
var tmp35488 = inst_35357;
var inst_35355__$1 = tmp35486;
var inst_35356__$1 = tmp35487;
var inst_35357__$1 = tmp35488;
var inst_35358__$1 = inst_35372;
var state_35474__$1 = (function (){var statearr_35493 = state_35474;
(statearr_35493[(13)] = inst_35355__$1);

(statearr_35493[(14)] = inst_35356__$1);

(statearr_35493[(18)] = inst_35371);

(statearr_35493[(15)] = inst_35357__$1);

(statearr_35493[(17)] = inst_35358__$1);

return statearr_35493;
})();
var statearr_35494_35573 = state_35474__$1;
(statearr_35494_35573[(2)] = null);

(statearr_35494_35573[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (21))){
var inst_35396 = (state_35474[(2)]);
var state_35474__$1 = state_35474;
var statearr_35498_35574 = state_35474__$1;
(statearr_35498_35574[(2)] = inst_35396);

(statearr_35498_35574[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (31))){
var inst_35422 = (state_35474[(10)]);
var inst_35426 = done.call(null,null);
var inst_35427 = cljs.core.async.untap_STAR_.call(null,m,inst_35422);
var state_35474__$1 = (function (){var statearr_35499 = state_35474;
(statearr_35499[(19)] = inst_35426);

return statearr_35499;
})();
var statearr_35500_35575 = state_35474__$1;
(statearr_35500_35575[(2)] = inst_35427);

(statearr_35500_35575[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (32))){
var inst_35416 = (state_35474[(20)]);
var inst_35415 = (state_35474[(11)]);
var inst_35417 = (state_35474[(12)]);
var inst_35414 = (state_35474[(21)]);
var inst_35429 = (state_35474[(2)]);
var inst_35430 = (inst_35417 + (1));
var tmp35495 = inst_35416;
var tmp35496 = inst_35415;
var tmp35497 = inst_35414;
var inst_35414__$1 = tmp35497;
var inst_35415__$1 = tmp35496;
var inst_35416__$1 = tmp35495;
var inst_35417__$1 = inst_35430;
var state_35474__$1 = (function (){var statearr_35501 = state_35474;
(statearr_35501[(20)] = inst_35416__$1);

(statearr_35501[(11)] = inst_35415__$1);

(statearr_35501[(22)] = inst_35429);

(statearr_35501[(12)] = inst_35417__$1);

(statearr_35501[(21)] = inst_35414__$1);

return statearr_35501;
})();
var statearr_35502_35576 = state_35474__$1;
(statearr_35502_35576[(2)] = null);

(statearr_35502_35576[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (40))){
var inst_35442 = (state_35474[(23)]);
var inst_35446 = done.call(null,null);
var inst_35447 = cljs.core.async.untap_STAR_.call(null,m,inst_35442);
var state_35474__$1 = (function (){var statearr_35503 = state_35474;
(statearr_35503[(24)] = inst_35446);

return statearr_35503;
})();
var statearr_35504_35577 = state_35474__$1;
(statearr_35504_35577[(2)] = inst_35447);

(statearr_35504_35577[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (33))){
var inst_35433 = (state_35474[(25)]);
var inst_35435 = cljs.core.chunked_seq_QMARK_.call(null,inst_35433);
var state_35474__$1 = state_35474;
if(inst_35435){
var statearr_35505_35578 = state_35474__$1;
(statearr_35505_35578[(1)] = (36));

} else {
var statearr_35506_35579 = state_35474__$1;
(statearr_35506_35579[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (13))){
var inst_35365 = (state_35474[(26)]);
var inst_35368 = cljs.core.async.close_BANG_.call(null,inst_35365);
var state_35474__$1 = state_35474;
var statearr_35507_35580 = state_35474__$1;
(statearr_35507_35580[(2)] = inst_35368);

(statearr_35507_35580[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (22))){
var inst_35386 = (state_35474[(8)]);
var inst_35389 = cljs.core.async.close_BANG_.call(null,inst_35386);
var state_35474__$1 = state_35474;
var statearr_35508_35581 = state_35474__$1;
(statearr_35508_35581[(2)] = inst_35389);

(statearr_35508_35581[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (36))){
var inst_35433 = (state_35474[(25)]);
var inst_35437 = cljs.core.chunk_first.call(null,inst_35433);
var inst_35438 = cljs.core.chunk_rest.call(null,inst_35433);
var inst_35439 = cljs.core.count.call(null,inst_35437);
var inst_35414 = inst_35438;
var inst_35415 = inst_35437;
var inst_35416 = inst_35439;
var inst_35417 = (0);
var state_35474__$1 = (function (){var statearr_35509 = state_35474;
(statearr_35509[(20)] = inst_35416);

(statearr_35509[(11)] = inst_35415);

(statearr_35509[(12)] = inst_35417);

(statearr_35509[(21)] = inst_35414);

return statearr_35509;
})();
var statearr_35510_35582 = state_35474__$1;
(statearr_35510_35582[(2)] = null);

(statearr_35510_35582[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (41))){
var inst_35433 = (state_35474[(25)]);
var inst_35449 = (state_35474[(2)]);
var inst_35450 = cljs.core.next.call(null,inst_35433);
var inst_35414 = inst_35450;
var inst_35415 = null;
var inst_35416 = (0);
var inst_35417 = (0);
var state_35474__$1 = (function (){var statearr_35511 = state_35474;
(statearr_35511[(20)] = inst_35416);

(statearr_35511[(11)] = inst_35415);

(statearr_35511[(12)] = inst_35417);

(statearr_35511[(27)] = inst_35449);

(statearr_35511[(21)] = inst_35414);

return statearr_35511;
})();
var statearr_35512_35583 = state_35474__$1;
(statearr_35512_35583[(2)] = null);

(statearr_35512_35583[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (43))){
var state_35474__$1 = state_35474;
var statearr_35513_35584 = state_35474__$1;
(statearr_35513_35584[(2)] = null);

(statearr_35513_35584[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (29))){
var inst_35458 = (state_35474[(2)]);
var state_35474__$1 = state_35474;
var statearr_35514_35585 = state_35474__$1;
(statearr_35514_35585[(2)] = inst_35458);

(statearr_35514_35585[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (44))){
var inst_35467 = (state_35474[(2)]);
var state_35474__$1 = (function (){var statearr_35515 = state_35474;
(statearr_35515[(28)] = inst_35467);

return statearr_35515;
})();
var statearr_35516_35586 = state_35474__$1;
(statearr_35516_35586[(2)] = null);

(statearr_35516_35586[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (6))){
var inst_35406 = (state_35474[(29)]);
var inst_35405 = cljs.core.deref.call(null,cs);
var inst_35406__$1 = cljs.core.keys.call(null,inst_35405);
var inst_35407 = cljs.core.count.call(null,inst_35406__$1);
var inst_35408 = cljs.core.reset_BANG_.call(null,dctr,inst_35407);
var inst_35413 = cljs.core.seq.call(null,inst_35406__$1);
var inst_35414 = inst_35413;
var inst_35415 = null;
var inst_35416 = (0);
var inst_35417 = (0);
var state_35474__$1 = (function (){var statearr_35517 = state_35474;
(statearr_35517[(20)] = inst_35416);

(statearr_35517[(30)] = inst_35408);

(statearr_35517[(11)] = inst_35415);

(statearr_35517[(12)] = inst_35417);

(statearr_35517[(21)] = inst_35414);

(statearr_35517[(29)] = inst_35406__$1);

return statearr_35517;
})();
var statearr_35518_35587 = state_35474__$1;
(statearr_35518_35587[(2)] = null);

(statearr_35518_35587[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (28))){
var inst_35414 = (state_35474[(21)]);
var inst_35433 = (state_35474[(25)]);
var inst_35433__$1 = cljs.core.seq.call(null,inst_35414);
var state_35474__$1 = (function (){var statearr_35519 = state_35474;
(statearr_35519[(25)] = inst_35433__$1);

return statearr_35519;
})();
if(inst_35433__$1){
var statearr_35520_35588 = state_35474__$1;
(statearr_35520_35588[(1)] = (33));

} else {
var statearr_35521_35589 = state_35474__$1;
(statearr_35521_35589[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (25))){
var inst_35416 = (state_35474[(20)]);
var inst_35417 = (state_35474[(12)]);
var inst_35419 = (inst_35417 < inst_35416);
var inst_35420 = inst_35419;
var state_35474__$1 = state_35474;
if(cljs.core.truth_(inst_35420)){
var statearr_35522_35590 = state_35474__$1;
(statearr_35522_35590[(1)] = (27));

} else {
var statearr_35523_35591 = state_35474__$1;
(statearr_35523_35591[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (34))){
var state_35474__$1 = state_35474;
var statearr_35524_35592 = state_35474__$1;
(statearr_35524_35592[(2)] = null);

(statearr_35524_35592[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (17))){
var state_35474__$1 = state_35474;
var statearr_35525_35593 = state_35474__$1;
(statearr_35525_35593[(2)] = null);

(statearr_35525_35593[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (3))){
var inst_35472 = (state_35474[(2)]);
var state_35474__$1 = state_35474;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_35474__$1,inst_35472);
} else {
if((state_val_35475 === (12))){
var inst_35401 = (state_35474[(2)]);
var state_35474__$1 = state_35474;
var statearr_35526_35594 = state_35474__$1;
(statearr_35526_35594[(2)] = inst_35401);

(statearr_35526_35594[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (2))){
var state_35474__$1 = state_35474;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35474__$1,(4),ch);
} else {
if((state_val_35475 === (23))){
var state_35474__$1 = state_35474;
var statearr_35527_35595 = state_35474__$1;
(statearr_35527_35595[(2)] = null);

(statearr_35527_35595[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (35))){
var inst_35456 = (state_35474[(2)]);
var state_35474__$1 = state_35474;
var statearr_35528_35596 = state_35474__$1;
(statearr_35528_35596[(2)] = inst_35456);

(statearr_35528_35596[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (19))){
var inst_35375 = (state_35474[(7)]);
var inst_35379 = cljs.core.chunk_first.call(null,inst_35375);
var inst_35380 = cljs.core.chunk_rest.call(null,inst_35375);
var inst_35381 = cljs.core.count.call(null,inst_35379);
var inst_35355 = inst_35380;
var inst_35356 = inst_35379;
var inst_35357 = inst_35381;
var inst_35358 = (0);
var state_35474__$1 = (function (){var statearr_35529 = state_35474;
(statearr_35529[(13)] = inst_35355);

(statearr_35529[(14)] = inst_35356);

(statearr_35529[(15)] = inst_35357);

(statearr_35529[(17)] = inst_35358);

return statearr_35529;
})();
var statearr_35530_35597 = state_35474__$1;
(statearr_35530_35597[(2)] = null);

(statearr_35530_35597[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (11))){
var inst_35375 = (state_35474[(7)]);
var inst_35355 = (state_35474[(13)]);
var inst_35375__$1 = cljs.core.seq.call(null,inst_35355);
var state_35474__$1 = (function (){var statearr_35531 = state_35474;
(statearr_35531[(7)] = inst_35375__$1);

return statearr_35531;
})();
if(inst_35375__$1){
var statearr_35532_35598 = state_35474__$1;
(statearr_35532_35598[(1)] = (16));

} else {
var statearr_35533_35599 = state_35474__$1;
(statearr_35533_35599[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (9))){
var inst_35403 = (state_35474[(2)]);
var state_35474__$1 = state_35474;
var statearr_35534_35600 = state_35474__$1;
(statearr_35534_35600[(2)] = inst_35403);

(statearr_35534_35600[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (5))){
var inst_35353 = cljs.core.deref.call(null,cs);
var inst_35354 = cljs.core.seq.call(null,inst_35353);
var inst_35355 = inst_35354;
var inst_35356 = null;
var inst_35357 = (0);
var inst_35358 = (0);
var state_35474__$1 = (function (){var statearr_35535 = state_35474;
(statearr_35535[(13)] = inst_35355);

(statearr_35535[(14)] = inst_35356);

(statearr_35535[(15)] = inst_35357);

(statearr_35535[(17)] = inst_35358);

return statearr_35535;
})();
var statearr_35536_35601 = state_35474__$1;
(statearr_35536_35601[(2)] = null);

(statearr_35536_35601[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (14))){
var state_35474__$1 = state_35474;
var statearr_35537_35602 = state_35474__$1;
(statearr_35537_35602[(2)] = null);

(statearr_35537_35602[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (45))){
var inst_35464 = (state_35474[(2)]);
var state_35474__$1 = state_35474;
var statearr_35538_35603 = state_35474__$1;
(statearr_35538_35603[(2)] = inst_35464);

(statearr_35538_35603[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (26))){
var inst_35406 = (state_35474[(29)]);
var inst_35460 = (state_35474[(2)]);
var inst_35461 = cljs.core.seq.call(null,inst_35406);
var state_35474__$1 = (function (){var statearr_35539 = state_35474;
(statearr_35539[(31)] = inst_35460);

return statearr_35539;
})();
if(inst_35461){
var statearr_35540_35604 = state_35474__$1;
(statearr_35540_35604[(1)] = (42));

} else {
var statearr_35541_35605 = state_35474__$1;
(statearr_35541_35605[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (16))){
var inst_35375 = (state_35474[(7)]);
var inst_35377 = cljs.core.chunked_seq_QMARK_.call(null,inst_35375);
var state_35474__$1 = state_35474;
if(inst_35377){
var statearr_35542_35606 = state_35474__$1;
(statearr_35542_35606[(1)] = (19));

} else {
var statearr_35543_35607 = state_35474__$1;
(statearr_35543_35607[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (38))){
var inst_35453 = (state_35474[(2)]);
var state_35474__$1 = state_35474;
var statearr_35544_35608 = state_35474__$1;
(statearr_35544_35608[(2)] = inst_35453);

(statearr_35544_35608[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (30))){
var state_35474__$1 = state_35474;
var statearr_35545_35609 = state_35474__$1;
(statearr_35545_35609[(2)] = null);

(statearr_35545_35609[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (10))){
var inst_35356 = (state_35474[(14)]);
var inst_35358 = (state_35474[(17)]);
var inst_35364 = cljs.core._nth.call(null,inst_35356,inst_35358);
var inst_35365 = cljs.core.nth.call(null,inst_35364,(0),null);
var inst_35366 = cljs.core.nth.call(null,inst_35364,(1),null);
var state_35474__$1 = (function (){var statearr_35546 = state_35474;
(statearr_35546[(26)] = inst_35365);

return statearr_35546;
})();
if(cljs.core.truth_(inst_35366)){
var statearr_35547_35610 = state_35474__$1;
(statearr_35547_35610[(1)] = (13));

} else {
var statearr_35548_35611 = state_35474__$1;
(statearr_35548_35611[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (18))){
var inst_35399 = (state_35474[(2)]);
var state_35474__$1 = state_35474;
var statearr_35549_35612 = state_35474__$1;
(statearr_35549_35612[(2)] = inst_35399);

(statearr_35549_35612[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (42))){
var state_35474__$1 = state_35474;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35474__$1,(45),dchan);
} else {
if((state_val_35475 === (37))){
var inst_35346 = (state_35474[(9)]);
var inst_35442 = (state_35474[(23)]);
var inst_35433 = (state_35474[(25)]);
var inst_35442__$1 = cljs.core.first.call(null,inst_35433);
var inst_35443 = cljs.core.async.put_BANG_.call(null,inst_35442__$1,inst_35346,done);
var state_35474__$1 = (function (){var statearr_35550 = state_35474;
(statearr_35550[(23)] = inst_35442__$1);

return statearr_35550;
})();
if(cljs.core.truth_(inst_35443)){
var statearr_35551_35613 = state_35474__$1;
(statearr_35551_35613[(1)] = (39));

} else {
var statearr_35552_35614 = state_35474__$1;
(statearr_35552_35614[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35475 === (8))){
var inst_35357 = (state_35474[(15)]);
var inst_35358 = (state_35474[(17)]);
var inst_35360 = (inst_35358 < inst_35357);
var inst_35361 = inst_35360;
var state_35474__$1 = state_35474;
if(cljs.core.truth_(inst_35361)){
var statearr_35553_35615 = state_35474__$1;
(statearr_35553_35615[(1)] = (10));

} else {
var statearr_35554_35616 = state_35474__$1;
(statearr_35554_35616[(1)] = (11));

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
});})(c__20534__auto___35562,cs,m,dchan,dctr,done))
;
return ((function (switch__20513__auto__,c__20534__auto___35562,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__20514__auto__ = null;
var cljs$core$async$mult_$_state_machine__20514__auto____0 = (function (){
var statearr_35558 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35558[(0)] = cljs$core$async$mult_$_state_machine__20514__auto__);

(statearr_35558[(1)] = (1));

return statearr_35558;
});
var cljs$core$async$mult_$_state_machine__20514__auto____1 = (function (state_35474){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_35474);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e35559){if((e35559 instanceof Object)){
var ex__20517__auto__ = e35559;
var statearr_35560_35617 = state_35474;
(statearr_35560_35617[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_35474);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e35559;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35618 = state_35474;
state_35474 = G__35618;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__20514__auto__ = function(state_35474){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__20514__auto____1.call(this,state_35474);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__20514__auto____0;
cljs$core$async$mult_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__20514__auto____1;
return cljs$core$async$mult_$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___35562,cs,m,dchan,dctr,done))
})();
var state__20536__auto__ = (function (){var statearr_35561 = f__20535__auto__.call(null);
(statearr_35561[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___35562);

return statearr_35561;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___35562,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var args35619 = [];
var len__17325__auto___35622 = arguments.length;
var i__17326__auto___35623 = (0);
while(true){
if((i__17326__auto___35623 < len__17325__auto___35622)){
args35619.push((arguments[i__17326__auto___35623]));

var G__35624 = (i__17326__auto___35623 + (1));
i__17326__auto___35623 = G__35624;
continue;
} else {
}
break;
}

var G__35621 = args35619.length;
switch (G__35621) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args35619.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;
/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__16922__auto__ = (((m == null))?null:m);
var m__16923__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,m,ch);
} else {
var m__16923__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__16922__auto__ = (((m == null))?null:m);
var m__16923__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,m,ch);
} else {
var m__16923__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__16922__auto__ = (((m == null))?null:m);
var m__16923__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,m);
} else {
var m__16923__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((!((m == null))) && (!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__16922__auto__ = (((m == null))?null:m);
var m__16923__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,m,state_map);
} else {
var m__16923__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((!((m == null))) && (!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__16922__auto__ = (((m == null))?null:m);
var m__16923__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,m,mode);
} else {
var m__16923__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__17332__auto__ = [];
var len__17325__auto___35636 = arguments.length;
var i__17326__auto___35637 = (0);
while(true){
if((i__17326__auto___35637 < len__17325__auto___35636)){
args__17332__auto__.push((arguments[i__17326__auto___35637]));

var G__35638 = (i__17326__auto___35637 + (1));
i__17326__auto___35637 = G__35638;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((3) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__17333__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__35630){
var map__35631 = p__35630;
var map__35631__$1 = ((((!((map__35631 == null)))?((((map__35631.cljs$lang$protocol_mask$partition0$ & (64))) || (map__35631.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__35631):map__35631);
var opts = map__35631__$1;
var statearr_35633_35639 = state;
(statearr_35633_35639[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4425__auto__ = cljs.core.async.do_alts.call(null,((function (map__35631,map__35631__$1,opts){
return (function (val){
var statearr_35634_35640 = state;
(statearr_35634_35640[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__35631,map__35631__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4425__auto__)){
var cb = temp__4425__auto__;
var statearr_35635_35641 = state;
(statearr_35635_35641[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq35626){
var G__35627 = cljs.core.first.call(null,seq35626);
var seq35626__$1 = cljs.core.next.call(null,seq35626);
var G__35628 = cljs.core.first.call(null,seq35626__$1);
var seq35626__$2 = cljs.core.next.call(null,seq35626__$1);
var G__35629 = cljs.core.first.call(null,seq35626__$2);
var seq35626__$3 = cljs.core.next.call(null,seq35626__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__35627,G__35628,G__35629,seq35626__$3);
});
/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async35805 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async35805 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta35806){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta35806 = meta35806;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async35805.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_35807,meta35806__$1){
var self__ = this;
var _35807__$1 = this;
return (new cljs.core.async.t_cljs$core$async35805(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta35806__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async35805.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_35807){
var self__ = this;
var _35807__$1 = this;
return self__.meta35806;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async35805.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async35805.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async35805.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async35805.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async35805.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async35805.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async35805.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async35805.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null))))].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async35805.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),cljs.core.with_meta(new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta35806","meta35806",621355554,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async35805.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async35805.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async35805";

cljs.core.async.t_cljs$core$async35805.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async35805");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async35805 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async35805(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta35806){
return (new cljs.core.async.t_cljs$core$async35805(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta35806));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async35805(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__20534__auto___35968 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___35968,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___35968,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_35905){
var state_val_35906 = (state_35905[(1)]);
if((state_val_35906 === (7))){
var inst_35823 = (state_35905[(2)]);
var state_35905__$1 = state_35905;
var statearr_35907_35969 = state_35905__$1;
(statearr_35907_35969[(2)] = inst_35823);

(statearr_35907_35969[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (20))){
var inst_35835 = (state_35905[(7)]);
var state_35905__$1 = state_35905;
var statearr_35908_35970 = state_35905__$1;
(statearr_35908_35970[(2)] = inst_35835);

(statearr_35908_35970[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (27))){
var state_35905__$1 = state_35905;
var statearr_35909_35971 = state_35905__$1;
(statearr_35909_35971[(2)] = null);

(statearr_35909_35971[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (1))){
var inst_35811 = (state_35905[(8)]);
var inst_35811__$1 = calc_state.call(null);
var inst_35813 = (inst_35811__$1 == null);
var inst_35814 = cljs.core.not.call(null,inst_35813);
var state_35905__$1 = (function (){var statearr_35910 = state_35905;
(statearr_35910[(8)] = inst_35811__$1);

return statearr_35910;
})();
if(inst_35814){
var statearr_35911_35972 = state_35905__$1;
(statearr_35911_35972[(1)] = (2));

} else {
var statearr_35912_35973 = state_35905__$1;
(statearr_35912_35973[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (24))){
var inst_35879 = (state_35905[(9)]);
var inst_35865 = (state_35905[(10)]);
var inst_35858 = (state_35905[(11)]);
var inst_35879__$1 = inst_35858.call(null,inst_35865);
var state_35905__$1 = (function (){var statearr_35913 = state_35905;
(statearr_35913[(9)] = inst_35879__$1);

return statearr_35913;
})();
if(cljs.core.truth_(inst_35879__$1)){
var statearr_35914_35974 = state_35905__$1;
(statearr_35914_35974[(1)] = (29));

} else {
var statearr_35915_35975 = state_35905__$1;
(statearr_35915_35975[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (4))){
var inst_35826 = (state_35905[(2)]);
var state_35905__$1 = state_35905;
if(cljs.core.truth_(inst_35826)){
var statearr_35916_35976 = state_35905__$1;
(statearr_35916_35976[(1)] = (8));

} else {
var statearr_35917_35977 = state_35905__$1;
(statearr_35917_35977[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (15))){
var inst_35852 = (state_35905[(2)]);
var state_35905__$1 = state_35905;
if(cljs.core.truth_(inst_35852)){
var statearr_35918_35978 = state_35905__$1;
(statearr_35918_35978[(1)] = (19));

} else {
var statearr_35919_35979 = state_35905__$1;
(statearr_35919_35979[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (21))){
var inst_35857 = (state_35905[(12)]);
var inst_35857__$1 = (state_35905[(2)]);
var inst_35858 = cljs.core.get.call(null,inst_35857__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_35859 = cljs.core.get.call(null,inst_35857__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_35860 = cljs.core.get.call(null,inst_35857__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_35905__$1 = (function (){var statearr_35920 = state_35905;
(statearr_35920[(12)] = inst_35857__$1);

(statearr_35920[(11)] = inst_35858);

(statearr_35920[(13)] = inst_35859);

return statearr_35920;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_35905__$1,(22),inst_35860);
} else {
if((state_val_35906 === (31))){
var inst_35887 = (state_35905[(2)]);
var state_35905__$1 = state_35905;
if(cljs.core.truth_(inst_35887)){
var statearr_35921_35980 = state_35905__$1;
(statearr_35921_35980[(1)] = (32));

} else {
var statearr_35922_35981 = state_35905__$1;
(statearr_35922_35981[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (32))){
var inst_35864 = (state_35905[(14)]);
var state_35905__$1 = state_35905;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_35905__$1,(35),out,inst_35864);
} else {
if((state_val_35906 === (33))){
var inst_35857 = (state_35905[(12)]);
var inst_35835 = inst_35857;
var state_35905__$1 = (function (){var statearr_35923 = state_35905;
(statearr_35923[(7)] = inst_35835);

return statearr_35923;
})();
var statearr_35924_35982 = state_35905__$1;
(statearr_35924_35982[(2)] = null);

(statearr_35924_35982[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (13))){
var inst_35835 = (state_35905[(7)]);
var inst_35842 = inst_35835.cljs$lang$protocol_mask$partition0$;
var inst_35843 = (inst_35842 & (64));
var inst_35844 = inst_35835.cljs$core$ISeq$;
var inst_35845 = (inst_35843) || (inst_35844);
var state_35905__$1 = state_35905;
if(cljs.core.truth_(inst_35845)){
var statearr_35925_35983 = state_35905__$1;
(statearr_35925_35983[(1)] = (16));

} else {
var statearr_35926_35984 = state_35905__$1;
(statearr_35926_35984[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (22))){
var inst_35865 = (state_35905[(10)]);
var inst_35864 = (state_35905[(14)]);
var inst_35863 = (state_35905[(2)]);
var inst_35864__$1 = cljs.core.nth.call(null,inst_35863,(0),null);
var inst_35865__$1 = cljs.core.nth.call(null,inst_35863,(1),null);
var inst_35866 = (inst_35864__$1 == null);
var inst_35867 = cljs.core._EQ_.call(null,inst_35865__$1,change);
var inst_35868 = (inst_35866) || (inst_35867);
var state_35905__$1 = (function (){var statearr_35927 = state_35905;
(statearr_35927[(10)] = inst_35865__$1);

(statearr_35927[(14)] = inst_35864__$1);

return statearr_35927;
})();
if(cljs.core.truth_(inst_35868)){
var statearr_35928_35985 = state_35905__$1;
(statearr_35928_35985[(1)] = (23));

} else {
var statearr_35929_35986 = state_35905__$1;
(statearr_35929_35986[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (36))){
var inst_35857 = (state_35905[(12)]);
var inst_35835 = inst_35857;
var state_35905__$1 = (function (){var statearr_35930 = state_35905;
(statearr_35930[(7)] = inst_35835);

return statearr_35930;
})();
var statearr_35931_35987 = state_35905__$1;
(statearr_35931_35987[(2)] = null);

(statearr_35931_35987[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (29))){
var inst_35879 = (state_35905[(9)]);
var state_35905__$1 = state_35905;
var statearr_35932_35988 = state_35905__$1;
(statearr_35932_35988[(2)] = inst_35879);

(statearr_35932_35988[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (6))){
var state_35905__$1 = state_35905;
var statearr_35933_35989 = state_35905__$1;
(statearr_35933_35989[(2)] = false);

(statearr_35933_35989[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (28))){
var inst_35875 = (state_35905[(2)]);
var inst_35876 = calc_state.call(null);
var inst_35835 = inst_35876;
var state_35905__$1 = (function (){var statearr_35934 = state_35905;
(statearr_35934[(15)] = inst_35875);

(statearr_35934[(7)] = inst_35835);

return statearr_35934;
})();
var statearr_35935_35990 = state_35905__$1;
(statearr_35935_35990[(2)] = null);

(statearr_35935_35990[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (25))){
var inst_35901 = (state_35905[(2)]);
var state_35905__$1 = state_35905;
var statearr_35936_35991 = state_35905__$1;
(statearr_35936_35991[(2)] = inst_35901);

(statearr_35936_35991[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (34))){
var inst_35899 = (state_35905[(2)]);
var state_35905__$1 = state_35905;
var statearr_35937_35992 = state_35905__$1;
(statearr_35937_35992[(2)] = inst_35899);

(statearr_35937_35992[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (17))){
var state_35905__$1 = state_35905;
var statearr_35938_35993 = state_35905__$1;
(statearr_35938_35993[(2)] = false);

(statearr_35938_35993[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (3))){
var state_35905__$1 = state_35905;
var statearr_35939_35994 = state_35905__$1;
(statearr_35939_35994[(2)] = false);

(statearr_35939_35994[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (12))){
var inst_35903 = (state_35905[(2)]);
var state_35905__$1 = state_35905;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_35905__$1,inst_35903);
} else {
if((state_val_35906 === (2))){
var inst_35811 = (state_35905[(8)]);
var inst_35816 = inst_35811.cljs$lang$protocol_mask$partition0$;
var inst_35817 = (inst_35816 & (64));
var inst_35818 = inst_35811.cljs$core$ISeq$;
var inst_35819 = (inst_35817) || (inst_35818);
var state_35905__$1 = state_35905;
if(cljs.core.truth_(inst_35819)){
var statearr_35940_35995 = state_35905__$1;
(statearr_35940_35995[(1)] = (5));

} else {
var statearr_35941_35996 = state_35905__$1;
(statearr_35941_35996[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (23))){
var inst_35864 = (state_35905[(14)]);
var inst_35870 = (inst_35864 == null);
var state_35905__$1 = state_35905;
if(cljs.core.truth_(inst_35870)){
var statearr_35942_35997 = state_35905__$1;
(statearr_35942_35997[(1)] = (26));

} else {
var statearr_35943_35998 = state_35905__$1;
(statearr_35943_35998[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (35))){
var inst_35890 = (state_35905[(2)]);
var state_35905__$1 = state_35905;
if(cljs.core.truth_(inst_35890)){
var statearr_35944_35999 = state_35905__$1;
(statearr_35944_35999[(1)] = (36));

} else {
var statearr_35945_36000 = state_35905__$1;
(statearr_35945_36000[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (19))){
var inst_35835 = (state_35905[(7)]);
var inst_35854 = cljs.core.apply.call(null,cljs.core.hash_map,inst_35835);
var state_35905__$1 = state_35905;
var statearr_35946_36001 = state_35905__$1;
(statearr_35946_36001[(2)] = inst_35854);

(statearr_35946_36001[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (11))){
var inst_35835 = (state_35905[(7)]);
var inst_35839 = (inst_35835 == null);
var inst_35840 = cljs.core.not.call(null,inst_35839);
var state_35905__$1 = state_35905;
if(inst_35840){
var statearr_35947_36002 = state_35905__$1;
(statearr_35947_36002[(1)] = (13));

} else {
var statearr_35948_36003 = state_35905__$1;
(statearr_35948_36003[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (9))){
var inst_35811 = (state_35905[(8)]);
var state_35905__$1 = state_35905;
var statearr_35949_36004 = state_35905__$1;
(statearr_35949_36004[(2)] = inst_35811);

(statearr_35949_36004[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (5))){
var state_35905__$1 = state_35905;
var statearr_35950_36005 = state_35905__$1;
(statearr_35950_36005[(2)] = true);

(statearr_35950_36005[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (14))){
var state_35905__$1 = state_35905;
var statearr_35951_36006 = state_35905__$1;
(statearr_35951_36006[(2)] = false);

(statearr_35951_36006[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (26))){
var inst_35865 = (state_35905[(10)]);
var inst_35872 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_35865);
var state_35905__$1 = state_35905;
var statearr_35952_36007 = state_35905__$1;
(statearr_35952_36007[(2)] = inst_35872);

(statearr_35952_36007[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (16))){
var state_35905__$1 = state_35905;
var statearr_35953_36008 = state_35905__$1;
(statearr_35953_36008[(2)] = true);

(statearr_35953_36008[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (38))){
var inst_35895 = (state_35905[(2)]);
var state_35905__$1 = state_35905;
var statearr_35954_36009 = state_35905__$1;
(statearr_35954_36009[(2)] = inst_35895);

(statearr_35954_36009[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (30))){
var inst_35865 = (state_35905[(10)]);
var inst_35858 = (state_35905[(11)]);
var inst_35859 = (state_35905[(13)]);
var inst_35882 = cljs.core.empty_QMARK_.call(null,inst_35858);
var inst_35883 = inst_35859.call(null,inst_35865);
var inst_35884 = cljs.core.not.call(null,inst_35883);
var inst_35885 = (inst_35882) && (inst_35884);
var state_35905__$1 = state_35905;
var statearr_35955_36010 = state_35905__$1;
(statearr_35955_36010[(2)] = inst_35885);

(statearr_35955_36010[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (10))){
var inst_35811 = (state_35905[(8)]);
var inst_35831 = (state_35905[(2)]);
var inst_35832 = cljs.core.get.call(null,inst_35831,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_35833 = cljs.core.get.call(null,inst_35831,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_35834 = cljs.core.get.call(null,inst_35831,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_35835 = inst_35811;
var state_35905__$1 = (function (){var statearr_35956 = state_35905;
(statearr_35956[(7)] = inst_35835);

(statearr_35956[(16)] = inst_35834);

(statearr_35956[(17)] = inst_35833);

(statearr_35956[(18)] = inst_35832);

return statearr_35956;
})();
var statearr_35957_36011 = state_35905__$1;
(statearr_35957_36011[(2)] = null);

(statearr_35957_36011[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (18))){
var inst_35849 = (state_35905[(2)]);
var state_35905__$1 = state_35905;
var statearr_35958_36012 = state_35905__$1;
(statearr_35958_36012[(2)] = inst_35849);

(statearr_35958_36012[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (37))){
var state_35905__$1 = state_35905;
var statearr_35959_36013 = state_35905__$1;
(statearr_35959_36013[(2)] = null);

(statearr_35959_36013[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35906 === (8))){
var inst_35811 = (state_35905[(8)]);
var inst_35828 = cljs.core.apply.call(null,cljs.core.hash_map,inst_35811);
var state_35905__$1 = state_35905;
var statearr_35960_36014 = state_35905__$1;
(statearr_35960_36014[(2)] = inst_35828);

(statearr_35960_36014[(1)] = (10));


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
});})(c__20534__auto___35968,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__20513__auto__,c__20534__auto___35968,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__20514__auto__ = null;
var cljs$core$async$mix_$_state_machine__20514__auto____0 = (function (){
var statearr_35964 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35964[(0)] = cljs$core$async$mix_$_state_machine__20514__auto__);

(statearr_35964[(1)] = (1));

return statearr_35964;
});
var cljs$core$async$mix_$_state_machine__20514__auto____1 = (function (state_35905){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_35905);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e35965){if((e35965 instanceof Object)){
var ex__20517__auto__ = e35965;
var statearr_35966_36015 = state_35905;
(statearr_35966_36015[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_35905);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e35965;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36016 = state_35905;
state_35905 = G__36016;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__20514__auto__ = function(state_35905){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__20514__auto____1.call(this,state_35905);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__20514__auto____0;
cljs$core$async$mix_$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__20514__auto____1;
return cljs$core$async$mix_$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___35968,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__20536__auto__ = (function (){var statearr_35967 = f__20535__auto__.call(null);
(statearr_35967[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___35968);

return statearr_35967;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___35968,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((!((p == null))) && (!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__16922__auto__ = (((p == null))?null:p);
var m__16923__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__16923__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__16922__auto__ = (((p == null))?null:p);
var m__16923__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,p,v,ch);
} else {
var m__16923__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var args36017 = [];
var len__17325__auto___36020 = arguments.length;
var i__17326__auto___36021 = (0);
while(true){
if((i__17326__auto___36021 < len__17325__auto___36020)){
args36017.push((arguments[i__17326__auto___36021]));

var G__36022 = (i__17326__auto___36021 + (1));
i__17326__auto___36021 = G__36022;
continue;
} else {
}
break;
}

var G__36019 = args36017.length;
switch (G__36019) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36017.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__16922__auto__ = (((p == null))?null:p);
var m__16923__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,p);
} else {
var m__16923__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__16922__auto__ = (((p == null))?null:p);
var m__16923__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,p,v);
} else {
var m__16923__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;

/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var args36025 = [];
var len__17325__auto___36150 = arguments.length;
var i__17326__auto___36151 = (0);
while(true){
if((i__17326__auto___36151 < len__17325__auto___36150)){
args36025.push((arguments[i__17326__auto___36151]));

var G__36152 = (i__17326__auto___36151 + (1));
i__17326__auto___36151 = G__36152;
continue;
} else {
}
break;
}

var G__36027 = args36025.length;
switch (G__36027) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36025.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__16267__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__16267__auto__,mults){
return (function (p1__36024_SHARP_){
if(cljs.core.truth_(p1__36024_SHARP_.call(null,topic))){
return p1__36024_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__36024_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__16267__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async36028 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async36028 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta36029){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta36029 = meta36029;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async36028.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_36030,meta36029__$1){
var self__ = this;
var _36030__$1 = this;
return (new cljs.core.async.t_cljs$core$async36028(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta36029__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async36028.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_36030){
var self__ = this;
var _36030__$1 = this;
return self__.meta36029;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async36028.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async36028.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async36028.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async36028.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async36028.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4425__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__4425__auto__)){
var m = temp__4425__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async36028.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async36028.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async36028.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta36029","meta36029",-1216979040,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async36028.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async36028.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async36028";

cljs.core.async.t_cljs$core$async36028.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async36028");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async36028 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async36028(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta36029){
return (new cljs.core.async.t_cljs$core$async36028(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta36029));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async36028(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__20534__auto___36154 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___36154,mults,ensure_mult,p){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___36154,mults,ensure_mult,p){
return (function (state_36102){
var state_val_36103 = (state_36102[(1)]);
if((state_val_36103 === (7))){
var inst_36098 = (state_36102[(2)]);
var state_36102__$1 = state_36102;
var statearr_36104_36155 = state_36102__$1;
(statearr_36104_36155[(2)] = inst_36098);

(statearr_36104_36155[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (20))){
var state_36102__$1 = state_36102;
var statearr_36105_36156 = state_36102__$1;
(statearr_36105_36156[(2)] = null);

(statearr_36105_36156[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (1))){
var state_36102__$1 = state_36102;
var statearr_36106_36157 = state_36102__$1;
(statearr_36106_36157[(2)] = null);

(statearr_36106_36157[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (24))){
var inst_36081 = (state_36102[(7)]);
var inst_36090 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_36081);
var state_36102__$1 = state_36102;
var statearr_36107_36158 = state_36102__$1;
(statearr_36107_36158[(2)] = inst_36090);

(statearr_36107_36158[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (4))){
var inst_36033 = (state_36102[(8)]);
var inst_36033__$1 = (state_36102[(2)]);
var inst_36034 = (inst_36033__$1 == null);
var state_36102__$1 = (function (){var statearr_36108 = state_36102;
(statearr_36108[(8)] = inst_36033__$1);

return statearr_36108;
})();
if(cljs.core.truth_(inst_36034)){
var statearr_36109_36159 = state_36102__$1;
(statearr_36109_36159[(1)] = (5));

} else {
var statearr_36110_36160 = state_36102__$1;
(statearr_36110_36160[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (15))){
var inst_36075 = (state_36102[(2)]);
var state_36102__$1 = state_36102;
var statearr_36111_36161 = state_36102__$1;
(statearr_36111_36161[(2)] = inst_36075);

(statearr_36111_36161[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (21))){
var inst_36095 = (state_36102[(2)]);
var state_36102__$1 = (function (){var statearr_36112 = state_36102;
(statearr_36112[(9)] = inst_36095);

return statearr_36112;
})();
var statearr_36113_36162 = state_36102__$1;
(statearr_36113_36162[(2)] = null);

(statearr_36113_36162[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (13))){
var inst_36057 = (state_36102[(10)]);
var inst_36059 = cljs.core.chunked_seq_QMARK_.call(null,inst_36057);
var state_36102__$1 = state_36102;
if(inst_36059){
var statearr_36114_36163 = state_36102__$1;
(statearr_36114_36163[(1)] = (16));

} else {
var statearr_36115_36164 = state_36102__$1;
(statearr_36115_36164[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (22))){
var inst_36087 = (state_36102[(2)]);
var state_36102__$1 = state_36102;
if(cljs.core.truth_(inst_36087)){
var statearr_36116_36165 = state_36102__$1;
(statearr_36116_36165[(1)] = (23));

} else {
var statearr_36117_36166 = state_36102__$1;
(statearr_36117_36166[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (6))){
var inst_36083 = (state_36102[(11)]);
var inst_36081 = (state_36102[(7)]);
var inst_36033 = (state_36102[(8)]);
var inst_36081__$1 = topic_fn.call(null,inst_36033);
var inst_36082 = cljs.core.deref.call(null,mults);
var inst_36083__$1 = cljs.core.get.call(null,inst_36082,inst_36081__$1);
var state_36102__$1 = (function (){var statearr_36118 = state_36102;
(statearr_36118[(11)] = inst_36083__$1);

(statearr_36118[(7)] = inst_36081__$1);

return statearr_36118;
})();
if(cljs.core.truth_(inst_36083__$1)){
var statearr_36119_36167 = state_36102__$1;
(statearr_36119_36167[(1)] = (19));

} else {
var statearr_36120_36168 = state_36102__$1;
(statearr_36120_36168[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (25))){
var inst_36092 = (state_36102[(2)]);
var state_36102__$1 = state_36102;
var statearr_36121_36169 = state_36102__$1;
(statearr_36121_36169[(2)] = inst_36092);

(statearr_36121_36169[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (17))){
var inst_36057 = (state_36102[(10)]);
var inst_36066 = cljs.core.first.call(null,inst_36057);
var inst_36067 = cljs.core.async.muxch_STAR_.call(null,inst_36066);
var inst_36068 = cljs.core.async.close_BANG_.call(null,inst_36067);
var inst_36069 = cljs.core.next.call(null,inst_36057);
var inst_36043 = inst_36069;
var inst_36044 = null;
var inst_36045 = (0);
var inst_36046 = (0);
var state_36102__$1 = (function (){var statearr_36122 = state_36102;
(statearr_36122[(12)] = inst_36044);

(statearr_36122[(13)] = inst_36068);

(statearr_36122[(14)] = inst_36046);

(statearr_36122[(15)] = inst_36043);

(statearr_36122[(16)] = inst_36045);

return statearr_36122;
})();
var statearr_36123_36170 = state_36102__$1;
(statearr_36123_36170[(2)] = null);

(statearr_36123_36170[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (3))){
var inst_36100 = (state_36102[(2)]);
var state_36102__$1 = state_36102;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_36102__$1,inst_36100);
} else {
if((state_val_36103 === (12))){
var inst_36077 = (state_36102[(2)]);
var state_36102__$1 = state_36102;
var statearr_36124_36171 = state_36102__$1;
(statearr_36124_36171[(2)] = inst_36077);

(statearr_36124_36171[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (2))){
var state_36102__$1 = state_36102;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_36102__$1,(4),ch);
} else {
if((state_val_36103 === (23))){
var state_36102__$1 = state_36102;
var statearr_36125_36172 = state_36102__$1;
(statearr_36125_36172[(2)] = null);

(statearr_36125_36172[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (19))){
var inst_36083 = (state_36102[(11)]);
var inst_36033 = (state_36102[(8)]);
var inst_36085 = cljs.core.async.muxch_STAR_.call(null,inst_36083);
var state_36102__$1 = state_36102;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_36102__$1,(22),inst_36085,inst_36033);
} else {
if((state_val_36103 === (11))){
var inst_36057 = (state_36102[(10)]);
var inst_36043 = (state_36102[(15)]);
var inst_36057__$1 = cljs.core.seq.call(null,inst_36043);
var state_36102__$1 = (function (){var statearr_36126 = state_36102;
(statearr_36126[(10)] = inst_36057__$1);

return statearr_36126;
})();
if(inst_36057__$1){
var statearr_36127_36173 = state_36102__$1;
(statearr_36127_36173[(1)] = (13));

} else {
var statearr_36128_36174 = state_36102__$1;
(statearr_36128_36174[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (9))){
var inst_36079 = (state_36102[(2)]);
var state_36102__$1 = state_36102;
var statearr_36129_36175 = state_36102__$1;
(statearr_36129_36175[(2)] = inst_36079);

(statearr_36129_36175[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (5))){
var inst_36040 = cljs.core.deref.call(null,mults);
var inst_36041 = cljs.core.vals.call(null,inst_36040);
var inst_36042 = cljs.core.seq.call(null,inst_36041);
var inst_36043 = inst_36042;
var inst_36044 = null;
var inst_36045 = (0);
var inst_36046 = (0);
var state_36102__$1 = (function (){var statearr_36130 = state_36102;
(statearr_36130[(12)] = inst_36044);

(statearr_36130[(14)] = inst_36046);

(statearr_36130[(15)] = inst_36043);

(statearr_36130[(16)] = inst_36045);

return statearr_36130;
})();
var statearr_36131_36176 = state_36102__$1;
(statearr_36131_36176[(2)] = null);

(statearr_36131_36176[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (14))){
var state_36102__$1 = state_36102;
var statearr_36135_36177 = state_36102__$1;
(statearr_36135_36177[(2)] = null);

(statearr_36135_36177[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (16))){
var inst_36057 = (state_36102[(10)]);
var inst_36061 = cljs.core.chunk_first.call(null,inst_36057);
var inst_36062 = cljs.core.chunk_rest.call(null,inst_36057);
var inst_36063 = cljs.core.count.call(null,inst_36061);
var inst_36043 = inst_36062;
var inst_36044 = inst_36061;
var inst_36045 = inst_36063;
var inst_36046 = (0);
var state_36102__$1 = (function (){var statearr_36136 = state_36102;
(statearr_36136[(12)] = inst_36044);

(statearr_36136[(14)] = inst_36046);

(statearr_36136[(15)] = inst_36043);

(statearr_36136[(16)] = inst_36045);

return statearr_36136;
})();
var statearr_36137_36178 = state_36102__$1;
(statearr_36137_36178[(2)] = null);

(statearr_36137_36178[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (10))){
var inst_36044 = (state_36102[(12)]);
var inst_36046 = (state_36102[(14)]);
var inst_36043 = (state_36102[(15)]);
var inst_36045 = (state_36102[(16)]);
var inst_36051 = cljs.core._nth.call(null,inst_36044,inst_36046);
var inst_36052 = cljs.core.async.muxch_STAR_.call(null,inst_36051);
var inst_36053 = cljs.core.async.close_BANG_.call(null,inst_36052);
var inst_36054 = (inst_36046 + (1));
var tmp36132 = inst_36044;
var tmp36133 = inst_36043;
var tmp36134 = inst_36045;
var inst_36043__$1 = tmp36133;
var inst_36044__$1 = tmp36132;
var inst_36045__$1 = tmp36134;
var inst_36046__$1 = inst_36054;
var state_36102__$1 = (function (){var statearr_36138 = state_36102;
(statearr_36138[(12)] = inst_36044__$1);

(statearr_36138[(14)] = inst_36046__$1);

(statearr_36138[(15)] = inst_36043__$1);

(statearr_36138[(17)] = inst_36053);

(statearr_36138[(16)] = inst_36045__$1);

return statearr_36138;
})();
var statearr_36139_36179 = state_36102__$1;
(statearr_36139_36179[(2)] = null);

(statearr_36139_36179[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (18))){
var inst_36072 = (state_36102[(2)]);
var state_36102__$1 = state_36102;
var statearr_36140_36180 = state_36102__$1;
(statearr_36140_36180[(2)] = inst_36072);

(statearr_36140_36180[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36103 === (8))){
var inst_36046 = (state_36102[(14)]);
var inst_36045 = (state_36102[(16)]);
var inst_36048 = (inst_36046 < inst_36045);
var inst_36049 = inst_36048;
var state_36102__$1 = state_36102;
if(cljs.core.truth_(inst_36049)){
var statearr_36141_36181 = state_36102__$1;
(statearr_36141_36181[(1)] = (10));

} else {
var statearr_36142_36182 = state_36102__$1;
(statearr_36142_36182[(1)] = (11));

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
}
}
}
}
}
}
}
}
});})(c__20534__auto___36154,mults,ensure_mult,p))
;
return ((function (switch__20513__auto__,c__20534__auto___36154,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__20514__auto__ = null;
var cljs$core$async$state_machine__20514__auto____0 = (function (){
var statearr_36146 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_36146[(0)] = cljs$core$async$state_machine__20514__auto__);

(statearr_36146[(1)] = (1));

return statearr_36146;
});
var cljs$core$async$state_machine__20514__auto____1 = (function (state_36102){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_36102);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e36147){if((e36147 instanceof Object)){
var ex__20517__auto__ = e36147;
var statearr_36148_36183 = state_36102;
(statearr_36148_36183[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_36102);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e36147;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36184 = state_36102;
state_36102 = G__36184;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$state_machine__20514__auto__ = function(state_36102){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20514__auto____1.call(this,state_36102);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20514__auto____0;
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20514__auto____1;
return cljs$core$async$state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___36154,mults,ensure_mult,p))
})();
var state__20536__auto__ = (function (){var statearr_36149 = f__20535__auto__.call(null);
(statearr_36149[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___36154);

return statearr_36149;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___36154,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;
/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var args36185 = [];
var len__17325__auto___36188 = arguments.length;
var i__17326__auto___36189 = (0);
while(true){
if((i__17326__auto___36189 < len__17325__auto___36188)){
args36185.push((arguments[i__17326__auto___36189]));

var G__36190 = (i__17326__auto___36189 + (1));
i__17326__auto___36189 = G__36190;
continue;
} else {
}
break;
}

var G__36187 = args36185.length;
switch (G__36187) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36185.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;
/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var args36192 = [];
var len__17325__auto___36195 = arguments.length;
var i__17326__auto___36196 = (0);
while(true){
if((i__17326__auto___36196 < len__17325__auto___36195)){
args36192.push((arguments[i__17326__auto___36196]));

var G__36197 = (i__17326__auto___36196 + (1));
i__17326__auto___36196 = G__36197;
continue;
} else {
}
break;
}

var G__36194 = args36192.length;
switch (G__36194) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36192.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;
/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var args36199 = [];
var len__17325__auto___36270 = arguments.length;
var i__17326__auto___36271 = (0);
while(true){
if((i__17326__auto___36271 < len__17325__auto___36270)){
args36199.push((arguments[i__17326__auto___36271]));

var G__36272 = (i__17326__auto___36271 + (1));
i__17326__auto___36271 = G__36272;
continue;
} else {
}
break;
}

var G__36201 = args36199.length;
switch (G__36201) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36199.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__20534__auto___36274 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___36274,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___36274,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_36240){
var state_val_36241 = (state_36240[(1)]);
if((state_val_36241 === (7))){
var state_36240__$1 = state_36240;
var statearr_36242_36275 = state_36240__$1;
(statearr_36242_36275[(2)] = null);

(statearr_36242_36275[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36241 === (1))){
var state_36240__$1 = state_36240;
var statearr_36243_36276 = state_36240__$1;
(statearr_36243_36276[(2)] = null);

(statearr_36243_36276[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36241 === (4))){
var inst_36204 = (state_36240[(7)]);
var inst_36206 = (inst_36204 < cnt);
var state_36240__$1 = state_36240;
if(cljs.core.truth_(inst_36206)){
var statearr_36244_36277 = state_36240__$1;
(statearr_36244_36277[(1)] = (6));

} else {
var statearr_36245_36278 = state_36240__$1;
(statearr_36245_36278[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36241 === (15))){
var inst_36236 = (state_36240[(2)]);
var state_36240__$1 = state_36240;
var statearr_36246_36279 = state_36240__$1;
(statearr_36246_36279[(2)] = inst_36236);

(statearr_36246_36279[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36241 === (13))){
var inst_36229 = cljs.core.async.close_BANG_.call(null,out);
var state_36240__$1 = state_36240;
var statearr_36247_36280 = state_36240__$1;
(statearr_36247_36280[(2)] = inst_36229);

(statearr_36247_36280[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36241 === (6))){
var state_36240__$1 = state_36240;
var statearr_36248_36281 = state_36240__$1;
(statearr_36248_36281[(2)] = null);

(statearr_36248_36281[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36241 === (3))){
var inst_36238 = (state_36240[(2)]);
var state_36240__$1 = state_36240;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_36240__$1,inst_36238);
} else {
if((state_val_36241 === (12))){
var inst_36226 = (state_36240[(8)]);
var inst_36226__$1 = (state_36240[(2)]);
var inst_36227 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_36226__$1);
var state_36240__$1 = (function (){var statearr_36249 = state_36240;
(statearr_36249[(8)] = inst_36226__$1);

return statearr_36249;
})();
if(cljs.core.truth_(inst_36227)){
var statearr_36250_36282 = state_36240__$1;
(statearr_36250_36282[(1)] = (13));

} else {
var statearr_36251_36283 = state_36240__$1;
(statearr_36251_36283[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36241 === (2))){
var inst_36203 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_36204 = (0);
var state_36240__$1 = (function (){var statearr_36252 = state_36240;
(statearr_36252[(9)] = inst_36203);

(statearr_36252[(7)] = inst_36204);

return statearr_36252;
})();
var statearr_36253_36284 = state_36240__$1;
(statearr_36253_36284[(2)] = null);

(statearr_36253_36284[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36241 === (11))){
var inst_36204 = (state_36240[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_36240,(10),Object,null,(9));
var inst_36213 = chs__$1.call(null,inst_36204);
var inst_36214 = done.call(null,inst_36204);
var inst_36215 = cljs.core.async.take_BANG_.call(null,inst_36213,inst_36214);
var state_36240__$1 = state_36240;
var statearr_36254_36285 = state_36240__$1;
(statearr_36254_36285[(2)] = inst_36215);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_36240__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36241 === (9))){
var inst_36204 = (state_36240[(7)]);
var inst_36217 = (state_36240[(2)]);
var inst_36218 = (inst_36204 + (1));
var inst_36204__$1 = inst_36218;
var state_36240__$1 = (function (){var statearr_36255 = state_36240;
(statearr_36255[(10)] = inst_36217);

(statearr_36255[(7)] = inst_36204__$1);

return statearr_36255;
})();
var statearr_36256_36286 = state_36240__$1;
(statearr_36256_36286[(2)] = null);

(statearr_36256_36286[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36241 === (5))){
var inst_36224 = (state_36240[(2)]);
var state_36240__$1 = (function (){var statearr_36257 = state_36240;
(statearr_36257[(11)] = inst_36224);

return statearr_36257;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_36240__$1,(12),dchan);
} else {
if((state_val_36241 === (14))){
var inst_36226 = (state_36240[(8)]);
var inst_36231 = cljs.core.apply.call(null,f,inst_36226);
var state_36240__$1 = state_36240;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_36240__$1,(16),out,inst_36231);
} else {
if((state_val_36241 === (16))){
var inst_36233 = (state_36240[(2)]);
var state_36240__$1 = (function (){var statearr_36258 = state_36240;
(statearr_36258[(12)] = inst_36233);

return statearr_36258;
})();
var statearr_36259_36287 = state_36240__$1;
(statearr_36259_36287[(2)] = null);

(statearr_36259_36287[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36241 === (10))){
var inst_36208 = (state_36240[(2)]);
var inst_36209 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_36240__$1 = (function (){var statearr_36260 = state_36240;
(statearr_36260[(13)] = inst_36208);

return statearr_36260;
})();
var statearr_36261_36288 = state_36240__$1;
(statearr_36261_36288[(2)] = inst_36209);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_36240__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36241 === (8))){
var inst_36222 = (state_36240[(2)]);
var state_36240__$1 = state_36240;
var statearr_36262_36289 = state_36240__$1;
(statearr_36262_36289[(2)] = inst_36222);

(statearr_36262_36289[(1)] = (5));


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
});})(c__20534__auto___36274,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__20513__auto__,c__20534__auto___36274,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__20514__auto__ = null;
var cljs$core$async$state_machine__20514__auto____0 = (function (){
var statearr_36266 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_36266[(0)] = cljs$core$async$state_machine__20514__auto__);

(statearr_36266[(1)] = (1));

return statearr_36266;
});
var cljs$core$async$state_machine__20514__auto____1 = (function (state_36240){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_36240);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e36267){if((e36267 instanceof Object)){
var ex__20517__auto__ = e36267;
var statearr_36268_36290 = state_36240;
(statearr_36268_36290[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_36240);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e36267;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36291 = state_36240;
state_36240 = G__36291;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$state_machine__20514__auto__ = function(state_36240){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20514__auto____1.call(this,state_36240);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20514__auto____0;
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20514__auto____1;
return cljs$core$async$state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___36274,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__20536__auto__ = (function (){var statearr_36269 = f__20535__auto__.call(null);
(statearr_36269[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___36274);

return statearr_36269;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___36274,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;
/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var args36293 = [];
var len__17325__auto___36349 = arguments.length;
var i__17326__auto___36350 = (0);
while(true){
if((i__17326__auto___36350 < len__17325__auto___36349)){
args36293.push((arguments[i__17326__auto___36350]));

var G__36351 = (i__17326__auto___36350 + (1));
i__17326__auto___36350 = G__36351;
continue;
} else {
}
break;
}

var G__36295 = args36293.length;
switch (G__36295) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36293.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20534__auto___36353 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___36353,out){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___36353,out){
return (function (state_36325){
var state_val_36326 = (state_36325[(1)]);
if((state_val_36326 === (7))){
var inst_36305 = (state_36325[(7)]);
var inst_36304 = (state_36325[(8)]);
var inst_36304__$1 = (state_36325[(2)]);
var inst_36305__$1 = cljs.core.nth.call(null,inst_36304__$1,(0),null);
var inst_36306 = cljs.core.nth.call(null,inst_36304__$1,(1),null);
var inst_36307 = (inst_36305__$1 == null);
var state_36325__$1 = (function (){var statearr_36327 = state_36325;
(statearr_36327[(7)] = inst_36305__$1);

(statearr_36327[(9)] = inst_36306);

(statearr_36327[(8)] = inst_36304__$1);

return statearr_36327;
})();
if(cljs.core.truth_(inst_36307)){
var statearr_36328_36354 = state_36325__$1;
(statearr_36328_36354[(1)] = (8));

} else {
var statearr_36329_36355 = state_36325__$1;
(statearr_36329_36355[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36326 === (1))){
var inst_36296 = cljs.core.vec.call(null,chs);
var inst_36297 = inst_36296;
var state_36325__$1 = (function (){var statearr_36330 = state_36325;
(statearr_36330[(10)] = inst_36297);

return statearr_36330;
})();
var statearr_36331_36356 = state_36325__$1;
(statearr_36331_36356[(2)] = null);

(statearr_36331_36356[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36326 === (4))){
var inst_36297 = (state_36325[(10)]);
var state_36325__$1 = state_36325;
return cljs.core.async.ioc_alts_BANG_.call(null,state_36325__$1,(7),inst_36297);
} else {
if((state_val_36326 === (6))){
var inst_36321 = (state_36325[(2)]);
var state_36325__$1 = state_36325;
var statearr_36332_36357 = state_36325__$1;
(statearr_36332_36357[(2)] = inst_36321);

(statearr_36332_36357[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36326 === (3))){
var inst_36323 = (state_36325[(2)]);
var state_36325__$1 = state_36325;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_36325__$1,inst_36323);
} else {
if((state_val_36326 === (2))){
var inst_36297 = (state_36325[(10)]);
var inst_36299 = cljs.core.count.call(null,inst_36297);
var inst_36300 = (inst_36299 > (0));
var state_36325__$1 = state_36325;
if(cljs.core.truth_(inst_36300)){
var statearr_36334_36358 = state_36325__$1;
(statearr_36334_36358[(1)] = (4));

} else {
var statearr_36335_36359 = state_36325__$1;
(statearr_36335_36359[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36326 === (11))){
var inst_36297 = (state_36325[(10)]);
var inst_36314 = (state_36325[(2)]);
var tmp36333 = inst_36297;
var inst_36297__$1 = tmp36333;
var state_36325__$1 = (function (){var statearr_36336 = state_36325;
(statearr_36336[(10)] = inst_36297__$1);

(statearr_36336[(11)] = inst_36314);

return statearr_36336;
})();
var statearr_36337_36360 = state_36325__$1;
(statearr_36337_36360[(2)] = null);

(statearr_36337_36360[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36326 === (9))){
var inst_36305 = (state_36325[(7)]);
var state_36325__$1 = state_36325;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_36325__$1,(11),out,inst_36305);
} else {
if((state_val_36326 === (5))){
var inst_36319 = cljs.core.async.close_BANG_.call(null,out);
var state_36325__$1 = state_36325;
var statearr_36338_36361 = state_36325__$1;
(statearr_36338_36361[(2)] = inst_36319);

(statearr_36338_36361[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36326 === (10))){
var inst_36317 = (state_36325[(2)]);
var state_36325__$1 = state_36325;
var statearr_36339_36362 = state_36325__$1;
(statearr_36339_36362[(2)] = inst_36317);

(statearr_36339_36362[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36326 === (8))){
var inst_36305 = (state_36325[(7)]);
var inst_36306 = (state_36325[(9)]);
var inst_36304 = (state_36325[(8)]);
var inst_36297 = (state_36325[(10)]);
var inst_36309 = (function (){var cs = inst_36297;
var vec__36302 = inst_36304;
var v = inst_36305;
var c = inst_36306;
return ((function (cs,vec__36302,v,c,inst_36305,inst_36306,inst_36304,inst_36297,state_val_36326,c__20534__auto___36353,out){
return (function (p1__36292_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__36292_SHARP_);
});
;})(cs,vec__36302,v,c,inst_36305,inst_36306,inst_36304,inst_36297,state_val_36326,c__20534__auto___36353,out))
})();
var inst_36310 = cljs.core.filterv.call(null,inst_36309,inst_36297);
var inst_36297__$1 = inst_36310;
var state_36325__$1 = (function (){var statearr_36340 = state_36325;
(statearr_36340[(10)] = inst_36297__$1);

return statearr_36340;
})();
var statearr_36341_36363 = state_36325__$1;
(statearr_36341_36363[(2)] = null);

(statearr_36341_36363[(1)] = (2));


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
});})(c__20534__auto___36353,out))
;
return ((function (switch__20513__auto__,c__20534__auto___36353,out){
return (function() {
var cljs$core$async$state_machine__20514__auto__ = null;
var cljs$core$async$state_machine__20514__auto____0 = (function (){
var statearr_36345 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_36345[(0)] = cljs$core$async$state_machine__20514__auto__);

(statearr_36345[(1)] = (1));

return statearr_36345;
});
var cljs$core$async$state_machine__20514__auto____1 = (function (state_36325){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_36325);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e36346){if((e36346 instanceof Object)){
var ex__20517__auto__ = e36346;
var statearr_36347_36364 = state_36325;
(statearr_36347_36364[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_36325);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e36346;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36365 = state_36325;
state_36325 = G__36365;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$state_machine__20514__auto__ = function(state_36325){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20514__auto____1.call(this,state_36325);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20514__auto____0;
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20514__auto____1;
return cljs$core$async$state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___36353,out))
})();
var state__20536__auto__ = (function (){var statearr_36348 = f__20535__auto__.call(null);
(statearr_36348[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___36353);

return statearr_36348;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___36353,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;
/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var args36366 = [];
var len__17325__auto___36415 = arguments.length;
var i__17326__auto___36416 = (0);
while(true){
if((i__17326__auto___36416 < len__17325__auto___36415)){
args36366.push((arguments[i__17326__auto___36416]));

var G__36417 = (i__17326__auto___36416 + (1));
i__17326__auto___36416 = G__36417;
continue;
} else {
}
break;
}

var G__36368 = args36366.length;
switch (G__36368) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36366.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20534__auto___36419 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___36419,out){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___36419,out){
return (function (state_36392){
var state_val_36393 = (state_36392[(1)]);
if((state_val_36393 === (7))){
var inst_36374 = (state_36392[(7)]);
var inst_36374__$1 = (state_36392[(2)]);
var inst_36375 = (inst_36374__$1 == null);
var inst_36376 = cljs.core.not.call(null,inst_36375);
var state_36392__$1 = (function (){var statearr_36394 = state_36392;
(statearr_36394[(7)] = inst_36374__$1);

return statearr_36394;
})();
if(inst_36376){
var statearr_36395_36420 = state_36392__$1;
(statearr_36395_36420[(1)] = (8));

} else {
var statearr_36396_36421 = state_36392__$1;
(statearr_36396_36421[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36393 === (1))){
var inst_36369 = (0);
var state_36392__$1 = (function (){var statearr_36397 = state_36392;
(statearr_36397[(8)] = inst_36369);

return statearr_36397;
})();
var statearr_36398_36422 = state_36392__$1;
(statearr_36398_36422[(2)] = null);

(statearr_36398_36422[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36393 === (4))){
var state_36392__$1 = state_36392;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_36392__$1,(7),ch);
} else {
if((state_val_36393 === (6))){
var inst_36387 = (state_36392[(2)]);
var state_36392__$1 = state_36392;
var statearr_36399_36423 = state_36392__$1;
(statearr_36399_36423[(2)] = inst_36387);

(statearr_36399_36423[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36393 === (3))){
var inst_36389 = (state_36392[(2)]);
var inst_36390 = cljs.core.async.close_BANG_.call(null,out);
var state_36392__$1 = (function (){var statearr_36400 = state_36392;
(statearr_36400[(9)] = inst_36389);

return statearr_36400;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_36392__$1,inst_36390);
} else {
if((state_val_36393 === (2))){
var inst_36369 = (state_36392[(8)]);
var inst_36371 = (inst_36369 < n);
var state_36392__$1 = state_36392;
if(cljs.core.truth_(inst_36371)){
var statearr_36401_36424 = state_36392__$1;
(statearr_36401_36424[(1)] = (4));

} else {
var statearr_36402_36425 = state_36392__$1;
(statearr_36402_36425[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36393 === (11))){
var inst_36369 = (state_36392[(8)]);
var inst_36379 = (state_36392[(2)]);
var inst_36380 = (inst_36369 + (1));
var inst_36369__$1 = inst_36380;
var state_36392__$1 = (function (){var statearr_36403 = state_36392;
(statearr_36403[(8)] = inst_36369__$1);

(statearr_36403[(10)] = inst_36379);

return statearr_36403;
})();
var statearr_36404_36426 = state_36392__$1;
(statearr_36404_36426[(2)] = null);

(statearr_36404_36426[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36393 === (9))){
var state_36392__$1 = state_36392;
var statearr_36405_36427 = state_36392__$1;
(statearr_36405_36427[(2)] = null);

(statearr_36405_36427[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36393 === (5))){
var state_36392__$1 = state_36392;
var statearr_36406_36428 = state_36392__$1;
(statearr_36406_36428[(2)] = null);

(statearr_36406_36428[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36393 === (10))){
var inst_36384 = (state_36392[(2)]);
var state_36392__$1 = state_36392;
var statearr_36407_36429 = state_36392__$1;
(statearr_36407_36429[(2)] = inst_36384);

(statearr_36407_36429[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36393 === (8))){
var inst_36374 = (state_36392[(7)]);
var state_36392__$1 = state_36392;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_36392__$1,(11),out,inst_36374);
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
});})(c__20534__auto___36419,out))
;
return ((function (switch__20513__auto__,c__20534__auto___36419,out){
return (function() {
var cljs$core$async$state_machine__20514__auto__ = null;
var cljs$core$async$state_machine__20514__auto____0 = (function (){
var statearr_36411 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_36411[(0)] = cljs$core$async$state_machine__20514__auto__);

(statearr_36411[(1)] = (1));

return statearr_36411;
});
var cljs$core$async$state_machine__20514__auto____1 = (function (state_36392){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_36392);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e36412){if((e36412 instanceof Object)){
var ex__20517__auto__ = e36412;
var statearr_36413_36430 = state_36392;
(statearr_36413_36430[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_36392);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e36412;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36431 = state_36392;
state_36392 = G__36431;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$state_machine__20514__auto__ = function(state_36392){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20514__auto____1.call(this,state_36392);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20514__auto____0;
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20514__auto____1;
return cljs$core$async$state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___36419,out))
})();
var state__20536__auto__ = (function (){var statearr_36414 = f__20535__auto__.call(null);
(statearr_36414[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___36419);

return statearr_36414;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___36419,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async36439 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async36439 = (function (map_LT_,f,ch,meta36440){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta36440 = meta36440;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async36439.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_36441,meta36440__$1){
var self__ = this;
var _36441__$1 = this;
return (new cljs.core.async.t_cljs$core$async36439(self__.map_LT_,self__.f,self__.ch,meta36440__$1));
});

cljs.core.async.t_cljs$core$async36439.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_36441){
var self__ = this;
var _36441__$1 = this;
return self__.meta36440;
});

cljs.core.async.t_cljs$core$async36439.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async36439.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async36439.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async36439.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async36439.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async36442 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async36442 = (function (map_LT_,f,ch,meta36440,_,fn1,meta36443){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta36440 = meta36440;
this._ = _;
this.fn1 = fn1;
this.meta36443 = meta36443;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async36442.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_36444,meta36443__$1){
var self__ = this;
var _36444__$1 = this;
return (new cljs.core.async.t_cljs$core$async36442(self__.map_LT_,self__.f,self__.ch,self__.meta36440,self__._,self__.fn1,meta36443__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async36442.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_36444){
var self__ = this;
var _36444__$1 = this;
return self__.meta36443;
});})(___$1))
;

cljs.core.async.t_cljs$core$async36442.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async36442.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async36442.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__36432_SHARP_){
return f1.call(null,(((p1__36432_SHARP_ == null))?null:self__.f.call(null,p1__36432_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async36442.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta36440","meta36440",931975115,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async36439","cljs.core.async/t_cljs$core$async36439",1528921798,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta36443","meta36443",1346074850,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async36442.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async36442.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async36442";

cljs.core.async.t_cljs$core$async36442.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async36442");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async36442 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async36442(map_LT___$1,f__$1,ch__$1,meta36440__$1,___$2,fn1__$1,meta36443){
return (new cljs.core.async.t_cljs$core$async36442(map_LT___$1,f__$1,ch__$1,meta36440__$1,___$2,fn1__$1,meta36443));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async36442(self__.map_LT_,self__.f,self__.ch,self__.meta36440,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__16255__auto__ = ret;
if(cljs.core.truth_(and__16255__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__16255__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async36439.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async36439.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async36439.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta36440","meta36440",931975115,null)], null);
});

cljs.core.async.t_cljs$core$async36439.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async36439.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async36439";

cljs.core.async.t_cljs$core$async36439.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async36439");
});

cljs.core.async.__GT_t_cljs$core$async36439 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async36439(map_LT___$1,f__$1,ch__$1,meta36440){
return (new cljs.core.async.t_cljs$core$async36439(map_LT___$1,f__$1,ch__$1,meta36440));
});

}

return (new cljs.core.async.t_cljs$core$async36439(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async36448 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async36448 = (function (map_GT_,f,ch,meta36449){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta36449 = meta36449;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async36448.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_36450,meta36449__$1){
var self__ = this;
var _36450__$1 = this;
return (new cljs.core.async.t_cljs$core$async36448(self__.map_GT_,self__.f,self__.ch,meta36449__$1));
});

cljs.core.async.t_cljs$core$async36448.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_36450){
var self__ = this;
var _36450__$1 = this;
return self__.meta36449;
});

cljs.core.async.t_cljs$core$async36448.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async36448.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async36448.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async36448.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async36448.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async36448.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async36448.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta36449","meta36449",-1747461729,null)], null);
});

cljs.core.async.t_cljs$core$async36448.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async36448.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async36448";

cljs.core.async.t_cljs$core$async36448.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async36448");
});

cljs.core.async.__GT_t_cljs$core$async36448 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async36448(map_GT___$1,f__$1,ch__$1,meta36449){
return (new cljs.core.async.t_cljs$core$async36448(map_GT___$1,f__$1,ch__$1,meta36449));
});

}

return (new cljs.core.async.t_cljs$core$async36448(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async36454 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async36454 = (function (filter_GT_,p,ch,meta36455){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta36455 = meta36455;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async36454.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_36456,meta36455__$1){
var self__ = this;
var _36456__$1 = this;
return (new cljs.core.async.t_cljs$core$async36454(self__.filter_GT_,self__.p,self__.ch,meta36455__$1));
});

cljs.core.async.t_cljs$core$async36454.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_36456){
var self__ = this;
var _36456__$1 = this;
return self__.meta36455;
});

cljs.core.async.t_cljs$core$async36454.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async36454.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async36454.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async36454.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async36454.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async36454.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async36454.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async36454.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta36455","meta36455",981070105,null)], null);
});

cljs.core.async.t_cljs$core$async36454.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async36454.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async36454";

cljs.core.async.t_cljs$core$async36454.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async36454");
});

cljs.core.async.__GT_t_cljs$core$async36454 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async36454(filter_GT___$1,p__$1,ch__$1,meta36455){
return (new cljs.core.async.t_cljs$core$async36454(filter_GT___$1,p__$1,ch__$1,meta36455));
});

}

return (new cljs.core.async.t_cljs$core$async36454(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var args36457 = [];
var len__17325__auto___36501 = arguments.length;
var i__17326__auto___36502 = (0);
while(true){
if((i__17326__auto___36502 < len__17325__auto___36501)){
args36457.push((arguments[i__17326__auto___36502]));

var G__36503 = (i__17326__auto___36502 + (1));
i__17326__auto___36502 = G__36503;
continue;
} else {
}
break;
}

var G__36459 = args36457.length;
switch (G__36459) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36457.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20534__auto___36505 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___36505,out){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___36505,out){
return (function (state_36480){
var state_val_36481 = (state_36480[(1)]);
if((state_val_36481 === (7))){
var inst_36476 = (state_36480[(2)]);
var state_36480__$1 = state_36480;
var statearr_36482_36506 = state_36480__$1;
(statearr_36482_36506[(2)] = inst_36476);

(statearr_36482_36506[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36481 === (1))){
var state_36480__$1 = state_36480;
var statearr_36483_36507 = state_36480__$1;
(statearr_36483_36507[(2)] = null);

(statearr_36483_36507[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36481 === (4))){
var inst_36462 = (state_36480[(7)]);
var inst_36462__$1 = (state_36480[(2)]);
var inst_36463 = (inst_36462__$1 == null);
var state_36480__$1 = (function (){var statearr_36484 = state_36480;
(statearr_36484[(7)] = inst_36462__$1);

return statearr_36484;
})();
if(cljs.core.truth_(inst_36463)){
var statearr_36485_36508 = state_36480__$1;
(statearr_36485_36508[(1)] = (5));

} else {
var statearr_36486_36509 = state_36480__$1;
(statearr_36486_36509[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36481 === (6))){
var inst_36462 = (state_36480[(7)]);
var inst_36467 = p.call(null,inst_36462);
var state_36480__$1 = state_36480;
if(cljs.core.truth_(inst_36467)){
var statearr_36487_36510 = state_36480__$1;
(statearr_36487_36510[(1)] = (8));

} else {
var statearr_36488_36511 = state_36480__$1;
(statearr_36488_36511[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36481 === (3))){
var inst_36478 = (state_36480[(2)]);
var state_36480__$1 = state_36480;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_36480__$1,inst_36478);
} else {
if((state_val_36481 === (2))){
var state_36480__$1 = state_36480;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_36480__$1,(4),ch);
} else {
if((state_val_36481 === (11))){
var inst_36470 = (state_36480[(2)]);
var state_36480__$1 = state_36480;
var statearr_36489_36512 = state_36480__$1;
(statearr_36489_36512[(2)] = inst_36470);

(statearr_36489_36512[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36481 === (9))){
var state_36480__$1 = state_36480;
var statearr_36490_36513 = state_36480__$1;
(statearr_36490_36513[(2)] = null);

(statearr_36490_36513[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36481 === (5))){
var inst_36465 = cljs.core.async.close_BANG_.call(null,out);
var state_36480__$1 = state_36480;
var statearr_36491_36514 = state_36480__$1;
(statearr_36491_36514[(2)] = inst_36465);

(statearr_36491_36514[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36481 === (10))){
var inst_36473 = (state_36480[(2)]);
var state_36480__$1 = (function (){var statearr_36492 = state_36480;
(statearr_36492[(8)] = inst_36473);

return statearr_36492;
})();
var statearr_36493_36515 = state_36480__$1;
(statearr_36493_36515[(2)] = null);

(statearr_36493_36515[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36481 === (8))){
var inst_36462 = (state_36480[(7)]);
var state_36480__$1 = state_36480;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_36480__$1,(11),out,inst_36462);
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
});})(c__20534__auto___36505,out))
;
return ((function (switch__20513__auto__,c__20534__auto___36505,out){
return (function() {
var cljs$core$async$state_machine__20514__auto__ = null;
var cljs$core$async$state_machine__20514__auto____0 = (function (){
var statearr_36497 = [null,null,null,null,null,null,null,null,null];
(statearr_36497[(0)] = cljs$core$async$state_machine__20514__auto__);

(statearr_36497[(1)] = (1));

return statearr_36497;
});
var cljs$core$async$state_machine__20514__auto____1 = (function (state_36480){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_36480);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e36498){if((e36498 instanceof Object)){
var ex__20517__auto__ = e36498;
var statearr_36499_36516 = state_36480;
(statearr_36499_36516[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_36480);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e36498;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36517 = state_36480;
state_36480 = G__36517;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$state_machine__20514__auto__ = function(state_36480){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20514__auto____1.call(this,state_36480);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20514__auto____0;
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20514__auto____1;
return cljs$core$async$state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___36505,out))
})();
var state__20536__auto__ = (function (){var statearr_36500 = f__20535__auto__.call(null);
(statearr_36500[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___36505);

return statearr_36500;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___36505,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args36518 = [];
var len__17325__auto___36521 = arguments.length;
var i__17326__auto___36522 = (0);
while(true){
if((i__17326__auto___36522 < len__17325__auto___36521)){
args36518.push((arguments[i__17326__auto___36522]));

var G__36523 = (i__17326__auto___36522 + (1));
i__17326__auto___36522 = G__36523;
continue;
} else {
}
break;
}

var G__36520 = args36518.length;
switch (G__36520) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36518.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;
cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__20534__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto__){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto__){
return (function (state_36690){
var state_val_36691 = (state_36690[(1)]);
if((state_val_36691 === (7))){
var inst_36686 = (state_36690[(2)]);
var state_36690__$1 = state_36690;
var statearr_36692_36733 = state_36690__$1;
(statearr_36692_36733[(2)] = inst_36686);

(statearr_36692_36733[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (20))){
var inst_36656 = (state_36690[(7)]);
var inst_36667 = (state_36690[(2)]);
var inst_36668 = cljs.core.next.call(null,inst_36656);
var inst_36642 = inst_36668;
var inst_36643 = null;
var inst_36644 = (0);
var inst_36645 = (0);
var state_36690__$1 = (function (){var statearr_36693 = state_36690;
(statearr_36693[(8)] = inst_36645);

(statearr_36693[(9)] = inst_36643);

(statearr_36693[(10)] = inst_36642);

(statearr_36693[(11)] = inst_36644);

(statearr_36693[(12)] = inst_36667);

return statearr_36693;
})();
var statearr_36694_36734 = state_36690__$1;
(statearr_36694_36734[(2)] = null);

(statearr_36694_36734[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (1))){
var state_36690__$1 = state_36690;
var statearr_36695_36735 = state_36690__$1;
(statearr_36695_36735[(2)] = null);

(statearr_36695_36735[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (4))){
var inst_36631 = (state_36690[(13)]);
var inst_36631__$1 = (state_36690[(2)]);
var inst_36632 = (inst_36631__$1 == null);
var state_36690__$1 = (function (){var statearr_36696 = state_36690;
(statearr_36696[(13)] = inst_36631__$1);

return statearr_36696;
})();
if(cljs.core.truth_(inst_36632)){
var statearr_36697_36736 = state_36690__$1;
(statearr_36697_36736[(1)] = (5));

} else {
var statearr_36698_36737 = state_36690__$1;
(statearr_36698_36737[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (15))){
var state_36690__$1 = state_36690;
var statearr_36702_36738 = state_36690__$1;
(statearr_36702_36738[(2)] = null);

(statearr_36702_36738[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (21))){
var state_36690__$1 = state_36690;
var statearr_36703_36739 = state_36690__$1;
(statearr_36703_36739[(2)] = null);

(statearr_36703_36739[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (13))){
var inst_36645 = (state_36690[(8)]);
var inst_36643 = (state_36690[(9)]);
var inst_36642 = (state_36690[(10)]);
var inst_36644 = (state_36690[(11)]);
var inst_36652 = (state_36690[(2)]);
var inst_36653 = (inst_36645 + (1));
var tmp36699 = inst_36643;
var tmp36700 = inst_36642;
var tmp36701 = inst_36644;
var inst_36642__$1 = tmp36700;
var inst_36643__$1 = tmp36699;
var inst_36644__$1 = tmp36701;
var inst_36645__$1 = inst_36653;
var state_36690__$1 = (function (){var statearr_36704 = state_36690;
(statearr_36704[(8)] = inst_36645__$1);

(statearr_36704[(9)] = inst_36643__$1);

(statearr_36704[(10)] = inst_36642__$1);

(statearr_36704[(11)] = inst_36644__$1);

(statearr_36704[(14)] = inst_36652);

return statearr_36704;
})();
var statearr_36705_36740 = state_36690__$1;
(statearr_36705_36740[(2)] = null);

(statearr_36705_36740[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (22))){
var state_36690__$1 = state_36690;
var statearr_36706_36741 = state_36690__$1;
(statearr_36706_36741[(2)] = null);

(statearr_36706_36741[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (6))){
var inst_36631 = (state_36690[(13)]);
var inst_36640 = f.call(null,inst_36631);
var inst_36641 = cljs.core.seq.call(null,inst_36640);
var inst_36642 = inst_36641;
var inst_36643 = null;
var inst_36644 = (0);
var inst_36645 = (0);
var state_36690__$1 = (function (){var statearr_36707 = state_36690;
(statearr_36707[(8)] = inst_36645);

(statearr_36707[(9)] = inst_36643);

(statearr_36707[(10)] = inst_36642);

(statearr_36707[(11)] = inst_36644);

return statearr_36707;
})();
var statearr_36708_36742 = state_36690__$1;
(statearr_36708_36742[(2)] = null);

(statearr_36708_36742[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (17))){
var inst_36656 = (state_36690[(7)]);
var inst_36660 = cljs.core.chunk_first.call(null,inst_36656);
var inst_36661 = cljs.core.chunk_rest.call(null,inst_36656);
var inst_36662 = cljs.core.count.call(null,inst_36660);
var inst_36642 = inst_36661;
var inst_36643 = inst_36660;
var inst_36644 = inst_36662;
var inst_36645 = (0);
var state_36690__$1 = (function (){var statearr_36709 = state_36690;
(statearr_36709[(8)] = inst_36645);

(statearr_36709[(9)] = inst_36643);

(statearr_36709[(10)] = inst_36642);

(statearr_36709[(11)] = inst_36644);

return statearr_36709;
})();
var statearr_36710_36743 = state_36690__$1;
(statearr_36710_36743[(2)] = null);

(statearr_36710_36743[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (3))){
var inst_36688 = (state_36690[(2)]);
var state_36690__$1 = state_36690;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_36690__$1,inst_36688);
} else {
if((state_val_36691 === (12))){
var inst_36676 = (state_36690[(2)]);
var state_36690__$1 = state_36690;
var statearr_36711_36744 = state_36690__$1;
(statearr_36711_36744[(2)] = inst_36676);

(statearr_36711_36744[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (2))){
var state_36690__$1 = state_36690;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_36690__$1,(4),in$);
} else {
if((state_val_36691 === (23))){
var inst_36684 = (state_36690[(2)]);
var state_36690__$1 = state_36690;
var statearr_36712_36745 = state_36690__$1;
(statearr_36712_36745[(2)] = inst_36684);

(statearr_36712_36745[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (19))){
var inst_36671 = (state_36690[(2)]);
var state_36690__$1 = state_36690;
var statearr_36713_36746 = state_36690__$1;
(statearr_36713_36746[(2)] = inst_36671);

(statearr_36713_36746[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (11))){
var inst_36656 = (state_36690[(7)]);
var inst_36642 = (state_36690[(10)]);
var inst_36656__$1 = cljs.core.seq.call(null,inst_36642);
var state_36690__$1 = (function (){var statearr_36714 = state_36690;
(statearr_36714[(7)] = inst_36656__$1);

return statearr_36714;
})();
if(inst_36656__$1){
var statearr_36715_36747 = state_36690__$1;
(statearr_36715_36747[(1)] = (14));

} else {
var statearr_36716_36748 = state_36690__$1;
(statearr_36716_36748[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (9))){
var inst_36678 = (state_36690[(2)]);
var inst_36679 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_36690__$1 = (function (){var statearr_36717 = state_36690;
(statearr_36717[(15)] = inst_36678);

return statearr_36717;
})();
if(cljs.core.truth_(inst_36679)){
var statearr_36718_36749 = state_36690__$1;
(statearr_36718_36749[(1)] = (21));

} else {
var statearr_36719_36750 = state_36690__$1;
(statearr_36719_36750[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (5))){
var inst_36634 = cljs.core.async.close_BANG_.call(null,out);
var state_36690__$1 = state_36690;
var statearr_36720_36751 = state_36690__$1;
(statearr_36720_36751[(2)] = inst_36634);

(statearr_36720_36751[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (14))){
var inst_36656 = (state_36690[(7)]);
var inst_36658 = cljs.core.chunked_seq_QMARK_.call(null,inst_36656);
var state_36690__$1 = state_36690;
if(inst_36658){
var statearr_36721_36752 = state_36690__$1;
(statearr_36721_36752[(1)] = (17));

} else {
var statearr_36722_36753 = state_36690__$1;
(statearr_36722_36753[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (16))){
var inst_36674 = (state_36690[(2)]);
var state_36690__$1 = state_36690;
var statearr_36723_36754 = state_36690__$1;
(statearr_36723_36754[(2)] = inst_36674);

(statearr_36723_36754[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36691 === (10))){
var inst_36645 = (state_36690[(8)]);
var inst_36643 = (state_36690[(9)]);
var inst_36650 = cljs.core._nth.call(null,inst_36643,inst_36645);
var state_36690__$1 = state_36690;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_36690__$1,(13),out,inst_36650);
} else {
if((state_val_36691 === (18))){
var inst_36656 = (state_36690[(7)]);
var inst_36665 = cljs.core.first.call(null,inst_36656);
var state_36690__$1 = state_36690;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_36690__$1,(20),out,inst_36665);
} else {
if((state_val_36691 === (8))){
var inst_36645 = (state_36690[(8)]);
var inst_36644 = (state_36690[(11)]);
var inst_36647 = (inst_36645 < inst_36644);
var inst_36648 = inst_36647;
var state_36690__$1 = state_36690;
if(cljs.core.truth_(inst_36648)){
var statearr_36724_36755 = state_36690__$1;
(statearr_36724_36755[(1)] = (10));

} else {
var statearr_36725_36756 = state_36690__$1;
(statearr_36725_36756[(1)] = (11));

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
}
}
}
}
}
}
});})(c__20534__auto__))
;
return ((function (switch__20513__auto__,c__20534__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__20514__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__20514__auto____0 = (function (){
var statearr_36729 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_36729[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__20514__auto__);

(statearr_36729[(1)] = (1));

return statearr_36729;
});
var cljs$core$async$mapcat_STAR__$_state_machine__20514__auto____1 = (function (state_36690){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_36690);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e36730){if((e36730 instanceof Object)){
var ex__20517__auto__ = e36730;
var statearr_36731_36757 = state_36690;
(statearr_36731_36757[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_36690);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e36730;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36758 = state_36690;
state_36690 = G__36758;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__20514__auto__ = function(state_36690){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__20514__auto____1.call(this,state_36690);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__20514__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__20514__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto__))
})();
var state__20536__auto__ = (function (){var statearr_36732 = f__20535__auto__.call(null);
(statearr_36732[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto__);

return statearr_36732;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto__))
);

return c__20534__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args36759 = [];
var len__17325__auto___36762 = arguments.length;
var i__17326__auto___36763 = (0);
while(true){
if((i__17326__auto___36763 < len__17325__auto___36762)){
args36759.push((arguments[i__17326__auto___36763]));

var G__36764 = (i__17326__auto___36763 + (1));
i__17326__auto___36763 = G__36764;
continue;
} else {
}
break;
}

var G__36761 = args36759.length;
switch (G__36761) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36759.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var args36766 = [];
var len__17325__auto___36769 = arguments.length;
var i__17326__auto___36770 = (0);
while(true){
if((i__17326__auto___36770 < len__17325__auto___36769)){
args36766.push((arguments[i__17326__auto___36770]));

var G__36771 = (i__17326__auto___36770 + (1));
i__17326__auto___36770 = G__36771;
continue;
} else {
}
break;
}

var G__36768 = args36766.length;
switch (G__36768) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36766.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var args36773 = [];
var len__17325__auto___36824 = arguments.length;
var i__17326__auto___36825 = (0);
while(true){
if((i__17326__auto___36825 < len__17325__auto___36824)){
args36773.push((arguments[i__17326__auto___36825]));

var G__36826 = (i__17326__auto___36825 + (1));
i__17326__auto___36825 = G__36826;
continue;
} else {
}
break;
}

var G__36775 = args36773.length;
switch (G__36775) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36773.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20534__auto___36828 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___36828,out){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___36828,out){
return (function (state_36799){
var state_val_36800 = (state_36799[(1)]);
if((state_val_36800 === (7))){
var inst_36794 = (state_36799[(2)]);
var state_36799__$1 = state_36799;
var statearr_36801_36829 = state_36799__$1;
(statearr_36801_36829[(2)] = inst_36794);

(statearr_36801_36829[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36800 === (1))){
var inst_36776 = null;
var state_36799__$1 = (function (){var statearr_36802 = state_36799;
(statearr_36802[(7)] = inst_36776);

return statearr_36802;
})();
var statearr_36803_36830 = state_36799__$1;
(statearr_36803_36830[(2)] = null);

(statearr_36803_36830[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36800 === (4))){
var inst_36779 = (state_36799[(8)]);
var inst_36779__$1 = (state_36799[(2)]);
var inst_36780 = (inst_36779__$1 == null);
var inst_36781 = cljs.core.not.call(null,inst_36780);
var state_36799__$1 = (function (){var statearr_36804 = state_36799;
(statearr_36804[(8)] = inst_36779__$1);

return statearr_36804;
})();
if(inst_36781){
var statearr_36805_36831 = state_36799__$1;
(statearr_36805_36831[(1)] = (5));

} else {
var statearr_36806_36832 = state_36799__$1;
(statearr_36806_36832[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36800 === (6))){
var state_36799__$1 = state_36799;
var statearr_36807_36833 = state_36799__$1;
(statearr_36807_36833[(2)] = null);

(statearr_36807_36833[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36800 === (3))){
var inst_36796 = (state_36799[(2)]);
var inst_36797 = cljs.core.async.close_BANG_.call(null,out);
var state_36799__$1 = (function (){var statearr_36808 = state_36799;
(statearr_36808[(9)] = inst_36796);

return statearr_36808;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_36799__$1,inst_36797);
} else {
if((state_val_36800 === (2))){
var state_36799__$1 = state_36799;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_36799__$1,(4),ch);
} else {
if((state_val_36800 === (11))){
var inst_36779 = (state_36799[(8)]);
var inst_36788 = (state_36799[(2)]);
var inst_36776 = inst_36779;
var state_36799__$1 = (function (){var statearr_36809 = state_36799;
(statearr_36809[(10)] = inst_36788);

(statearr_36809[(7)] = inst_36776);

return statearr_36809;
})();
var statearr_36810_36834 = state_36799__$1;
(statearr_36810_36834[(2)] = null);

(statearr_36810_36834[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36800 === (9))){
var inst_36779 = (state_36799[(8)]);
var state_36799__$1 = state_36799;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_36799__$1,(11),out,inst_36779);
} else {
if((state_val_36800 === (5))){
var inst_36779 = (state_36799[(8)]);
var inst_36776 = (state_36799[(7)]);
var inst_36783 = cljs.core._EQ_.call(null,inst_36779,inst_36776);
var state_36799__$1 = state_36799;
if(inst_36783){
var statearr_36812_36835 = state_36799__$1;
(statearr_36812_36835[(1)] = (8));

} else {
var statearr_36813_36836 = state_36799__$1;
(statearr_36813_36836[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36800 === (10))){
var inst_36791 = (state_36799[(2)]);
var state_36799__$1 = state_36799;
var statearr_36814_36837 = state_36799__$1;
(statearr_36814_36837[(2)] = inst_36791);

(statearr_36814_36837[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36800 === (8))){
var inst_36776 = (state_36799[(7)]);
var tmp36811 = inst_36776;
var inst_36776__$1 = tmp36811;
var state_36799__$1 = (function (){var statearr_36815 = state_36799;
(statearr_36815[(7)] = inst_36776__$1);

return statearr_36815;
})();
var statearr_36816_36838 = state_36799__$1;
(statearr_36816_36838[(2)] = null);

(statearr_36816_36838[(1)] = (2));


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
});})(c__20534__auto___36828,out))
;
return ((function (switch__20513__auto__,c__20534__auto___36828,out){
return (function() {
var cljs$core$async$state_machine__20514__auto__ = null;
var cljs$core$async$state_machine__20514__auto____0 = (function (){
var statearr_36820 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_36820[(0)] = cljs$core$async$state_machine__20514__auto__);

(statearr_36820[(1)] = (1));

return statearr_36820;
});
var cljs$core$async$state_machine__20514__auto____1 = (function (state_36799){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_36799);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e36821){if((e36821 instanceof Object)){
var ex__20517__auto__ = e36821;
var statearr_36822_36839 = state_36799;
(statearr_36822_36839[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_36799);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e36821;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36840 = state_36799;
state_36799 = G__36840;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$state_machine__20514__auto__ = function(state_36799){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20514__auto____1.call(this,state_36799);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20514__auto____0;
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20514__auto____1;
return cljs$core$async$state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___36828,out))
})();
var state__20536__auto__ = (function (){var statearr_36823 = f__20535__auto__.call(null);
(statearr_36823[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___36828);

return statearr_36823;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___36828,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args36841 = [];
var len__17325__auto___36911 = arguments.length;
var i__17326__auto___36912 = (0);
while(true){
if((i__17326__auto___36912 < len__17325__auto___36911)){
args36841.push((arguments[i__17326__auto___36912]));

var G__36913 = (i__17326__auto___36912 + (1));
i__17326__auto___36912 = G__36913;
continue;
} else {
}
break;
}

var G__36843 = args36841.length;
switch (G__36843) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36841.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20534__auto___36915 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___36915,out){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___36915,out){
return (function (state_36881){
var state_val_36882 = (state_36881[(1)]);
if((state_val_36882 === (7))){
var inst_36877 = (state_36881[(2)]);
var state_36881__$1 = state_36881;
var statearr_36883_36916 = state_36881__$1;
(statearr_36883_36916[(2)] = inst_36877);

(statearr_36883_36916[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36882 === (1))){
var inst_36844 = (new Array(n));
var inst_36845 = inst_36844;
var inst_36846 = (0);
var state_36881__$1 = (function (){var statearr_36884 = state_36881;
(statearr_36884[(7)] = inst_36845);

(statearr_36884[(8)] = inst_36846);

return statearr_36884;
})();
var statearr_36885_36917 = state_36881__$1;
(statearr_36885_36917[(2)] = null);

(statearr_36885_36917[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36882 === (4))){
var inst_36849 = (state_36881[(9)]);
var inst_36849__$1 = (state_36881[(2)]);
var inst_36850 = (inst_36849__$1 == null);
var inst_36851 = cljs.core.not.call(null,inst_36850);
var state_36881__$1 = (function (){var statearr_36886 = state_36881;
(statearr_36886[(9)] = inst_36849__$1);

return statearr_36886;
})();
if(inst_36851){
var statearr_36887_36918 = state_36881__$1;
(statearr_36887_36918[(1)] = (5));

} else {
var statearr_36888_36919 = state_36881__$1;
(statearr_36888_36919[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36882 === (15))){
var inst_36871 = (state_36881[(2)]);
var state_36881__$1 = state_36881;
var statearr_36889_36920 = state_36881__$1;
(statearr_36889_36920[(2)] = inst_36871);

(statearr_36889_36920[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36882 === (13))){
var state_36881__$1 = state_36881;
var statearr_36890_36921 = state_36881__$1;
(statearr_36890_36921[(2)] = null);

(statearr_36890_36921[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36882 === (6))){
var inst_36846 = (state_36881[(8)]);
var inst_36867 = (inst_36846 > (0));
var state_36881__$1 = state_36881;
if(cljs.core.truth_(inst_36867)){
var statearr_36891_36922 = state_36881__$1;
(statearr_36891_36922[(1)] = (12));

} else {
var statearr_36892_36923 = state_36881__$1;
(statearr_36892_36923[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36882 === (3))){
var inst_36879 = (state_36881[(2)]);
var state_36881__$1 = state_36881;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_36881__$1,inst_36879);
} else {
if((state_val_36882 === (12))){
var inst_36845 = (state_36881[(7)]);
var inst_36869 = cljs.core.vec.call(null,inst_36845);
var state_36881__$1 = state_36881;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_36881__$1,(15),out,inst_36869);
} else {
if((state_val_36882 === (2))){
var state_36881__$1 = state_36881;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_36881__$1,(4),ch);
} else {
if((state_val_36882 === (11))){
var inst_36861 = (state_36881[(2)]);
var inst_36862 = (new Array(n));
var inst_36845 = inst_36862;
var inst_36846 = (0);
var state_36881__$1 = (function (){var statearr_36893 = state_36881;
(statearr_36893[(10)] = inst_36861);

(statearr_36893[(7)] = inst_36845);

(statearr_36893[(8)] = inst_36846);

return statearr_36893;
})();
var statearr_36894_36924 = state_36881__$1;
(statearr_36894_36924[(2)] = null);

(statearr_36894_36924[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36882 === (9))){
var inst_36845 = (state_36881[(7)]);
var inst_36859 = cljs.core.vec.call(null,inst_36845);
var state_36881__$1 = state_36881;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_36881__$1,(11),out,inst_36859);
} else {
if((state_val_36882 === (5))){
var inst_36849 = (state_36881[(9)]);
var inst_36845 = (state_36881[(7)]);
var inst_36846 = (state_36881[(8)]);
var inst_36854 = (state_36881[(11)]);
var inst_36853 = (inst_36845[inst_36846] = inst_36849);
var inst_36854__$1 = (inst_36846 + (1));
var inst_36855 = (inst_36854__$1 < n);
var state_36881__$1 = (function (){var statearr_36895 = state_36881;
(statearr_36895[(12)] = inst_36853);

(statearr_36895[(11)] = inst_36854__$1);

return statearr_36895;
})();
if(cljs.core.truth_(inst_36855)){
var statearr_36896_36925 = state_36881__$1;
(statearr_36896_36925[(1)] = (8));

} else {
var statearr_36897_36926 = state_36881__$1;
(statearr_36897_36926[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36882 === (14))){
var inst_36874 = (state_36881[(2)]);
var inst_36875 = cljs.core.async.close_BANG_.call(null,out);
var state_36881__$1 = (function (){var statearr_36899 = state_36881;
(statearr_36899[(13)] = inst_36874);

return statearr_36899;
})();
var statearr_36900_36927 = state_36881__$1;
(statearr_36900_36927[(2)] = inst_36875);

(statearr_36900_36927[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36882 === (10))){
var inst_36865 = (state_36881[(2)]);
var state_36881__$1 = state_36881;
var statearr_36901_36928 = state_36881__$1;
(statearr_36901_36928[(2)] = inst_36865);

(statearr_36901_36928[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36882 === (8))){
var inst_36845 = (state_36881[(7)]);
var inst_36854 = (state_36881[(11)]);
var tmp36898 = inst_36845;
var inst_36845__$1 = tmp36898;
var inst_36846 = inst_36854;
var state_36881__$1 = (function (){var statearr_36902 = state_36881;
(statearr_36902[(7)] = inst_36845__$1);

(statearr_36902[(8)] = inst_36846);

return statearr_36902;
})();
var statearr_36903_36929 = state_36881__$1;
(statearr_36903_36929[(2)] = null);

(statearr_36903_36929[(1)] = (2));


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
});})(c__20534__auto___36915,out))
;
return ((function (switch__20513__auto__,c__20534__auto___36915,out){
return (function() {
var cljs$core$async$state_machine__20514__auto__ = null;
var cljs$core$async$state_machine__20514__auto____0 = (function (){
var statearr_36907 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_36907[(0)] = cljs$core$async$state_machine__20514__auto__);

(statearr_36907[(1)] = (1));

return statearr_36907;
});
var cljs$core$async$state_machine__20514__auto____1 = (function (state_36881){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_36881);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e36908){if((e36908 instanceof Object)){
var ex__20517__auto__ = e36908;
var statearr_36909_36930 = state_36881;
(statearr_36909_36930[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_36881);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e36908;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36931 = state_36881;
state_36881 = G__36931;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$state_machine__20514__auto__ = function(state_36881){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20514__auto____1.call(this,state_36881);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20514__auto____0;
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20514__auto____1;
return cljs$core$async$state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___36915,out))
})();
var state__20536__auto__ = (function (){var statearr_36910 = f__20535__auto__.call(null);
(statearr_36910[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___36915);

return statearr_36910;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___36915,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args36932 = [];
var len__17325__auto___37006 = arguments.length;
var i__17326__auto___37007 = (0);
while(true){
if((i__17326__auto___37007 < len__17325__auto___37006)){
args36932.push((arguments[i__17326__auto___37007]));

var G__37008 = (i__17326__auto___37007 + (1));
i__17326__auto___37007 = G__37008;
continue;
} else {
}
break;
}

var G__36934 = args36932.length;
switch (G__36934) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36932.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20534__auto___37010 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20534__auto___37010,out){
return (function (){
var f__20535__auto__ = (function (){var switch__20513__auto__ = ((function (c__20534__auto___37010,out){
return (function (state_36976){
var state_val_36977 = (state_36976[(1)]);
if((state_val_36977 === (7))){
var inst_36972 = (state_36976[(2)]);
var state_36976__$1 = state_36976;
var statearr_36978_37011 = state_36976__$1;
(statearr_36978_37011[(2)] = inst_36972);

(statearr_36978_37011[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36977 === (1))){
var inst_36935 = [];
var inst_36936 = inst_36935;
var inst_36937 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_36976__$1 = (function (){var statearr_36979 = state_36976;
(statearr_36979[(7)] = inst_36937);

(statearr_36979[(8)] = inst_36936);

return statearr_36979;
})();
var statearr_36980_37012 = state_36976__$1;
(statearr_36980_37012[(2)] = null);

(statearr_36980_37012[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36977 === (4))){
var inst_36940 = (state_36976[(9)]);
var inst_36940__$1 = (state_36976[(2)]);
var inst_36941 = (inst_36940__$1 == null);
var inst_36942 = cljs.core.not.call(null,inst_36941);
var state_36976__$1 = (function (){var statearr_36981 = state_36976;
(statearr_36981[(9)] = inst_36940__$1);

return statearr_36981;
})();
if(inst_36942){
var statearr_36982_37013 = state_36976__$1;
(statearr_36982_37013[(1)] = (5));

} else {
var statearr_36983_37014 = state_36976__$1;
(statearr_36983_37014[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36977 === (15))){
var inst_36966 = (state_36976[(2)]);
var state_36976__$1 = state_36976;
var statearr_36984_37015 = state_36976__$1;
(statearr_36984_37015[(2)] = inst_36966);

(statearr_36984_37015[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36977 === (13))){
var state_36976__$1 = state_36976;
var statearr_36985_37016 = state_36976__$1;
(statearr_36985_37016[(2)] = null);

(statearr_36985_37016[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36977 === (6))){
var inst_36936 = (state_36976[(8)]);
var inst_36961 = inst_36936.length;
var inst_36962 = (inst_36961 > (0));
var state_36976__$1 = state_36976;
if(cljs.core.truth_(inst_36962)){
var statearr_36986_37017 = state_36976__$1;
(statearr_36986_37017[(1)] = (12));

} else {
var statearr_36987_37018 = state_36976__$1;
(statearr_36987_37018[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36977 === (3))){
var inst_36974 = (state_36976[(2)]);
var state_36976__$1 = state_36976;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_36976__$1,inst_36974);
} else {
if((state_val_36977 === (12))){
var inst_36936 = (state_36976[(8)]);
var inst_36964 = cljs.core.vec.call(null,inst_36936);
var state_36976__$1 = state_36976;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_36976__$1,(15),out,inst_36964);
} else {
if((state_val_36977 === (2))){
var state_36976__$1 = state_36976;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_36976__$1,(4),ch);
} else {
if((state_val_36977 === (11))){
var inst_36940 = (state_36976[(9)]);
var inst_36944 = (state_36976[(10)]);
var inst_36954 = (state_36976[(2)]);
var inst_36955 = [];
var inst_36956 = inst_36955.push(inst_36940);
var inst_36936 = inst_36955;
var inst_36937 = inst_36944;
var state_36976__$1 = (function (){var statearr_36988 = state_36976;
(statearr_36988[(11)] = inst_36954);

(statearr_36988[(7)] = inst_36937);

(statearr_36988[(8)] = inst_36936);

(statearr_36988[(12)] = inst_36956);

return statearr_36988;
})();
var statearr_36989_37019 = state_36976__$1;
(statearr_36989_37019[(2)] = null);

(statearr_36989_37019[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36977 === (9))){
var inst_36936 = (state_36976[(8)]);
var inst_36952 = cljs.core.vec.call(null,inst_36936);
var state_36976__$1 = state_36976;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_36976__$1,(11),out,inst_36952);
} else {
if((state_val_36977 === (5))){
var inst_36937 = (state_36976[(7)]);
var inst_36940 = (state_36976[(9)]);
var inst_36944 = (state_36976[(10)]);
var inst_36944__$1 = f.call(null,inst_36940);
var inst_36945 = cljs.core._EQ_.call(null,inst_36944__$1,inst_36937);
var inst_36946 = cljs.core.keyword_identical_QMARK_.call(null,inst_36937,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_36947 = (inst_36945) || (inst_36946);
var state_36976__$1 = (function (){var statearr_36990 = state_36976;
(statearr_36990[(10)] = inst_36944__$1);

return statearr_36990;
})();
if(cljs.core.truth_(inst_36947)){
var statearr_36991_37020 = state_36976__$1;
(statearr_36991_37020[(1)] = (8));

} else {
var statearr_36992_37021 = state_36976__$1;
(statearr_36992_37021[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36977 === (14))){
var inst_36969 = (state_36976[(2)]);
var inst_36970 = cljs.core.async.close_BANG_.call(null,out);
var state_36976__$1 = (function (){var statearr_36994 = state_36976;
(statearr_36994[(13)] = inst_36969);

return statearr_36994;
})();
var statearr_36995_37022 = state_36976__$1;
(statearr_36995_37022[(2)] = inst_36970);

(statearr_36995_37022[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36977 === (10))){
var inst_36959 = (state_36976[(2)]);
var state_36976__$1 = state_36976;
var statearr_36996_37023 = state_36976__$1;
(statearr_36996_37023[(2)] = inst_36959);

(statearr_36996_37023[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_36977 === (8))){
var inst_36936 = (state_36976[(8)]);
var inst_36940 = (state_36976[(9)]);
var inst_36944 = (state_36976[(10)]);
var inst_36949 = inst_36936.push(inst_36940);
var tmp36993 = inst_36936;
var inst_36936__$1 = tmp36993;
var inst_36937 = inst_36944;
var state_36976__$1 = (function (){var statearr_36997 = state_36976;
(statearr_36997[(7)] = inst_36937);

(statearr_36997[(8)] = inst_36936__$1);

(statearr_36997[(14)] = inst_36949);

return statearr_36997;
})();
var statearr_36998_37024 = state_36976__$1;
(statearr_36998_37024[(2)] = null);

(statearr_36998_37024[(1)] = (2));


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
});})(c__20534__auto___37010,out))
;
return ((function (switch__20513__auto__,c__20534__auto___37010,out){
return (function() {
var cljs$core$async$state_machine__20514__auto__ = null;
var cljs$core$async$state_machine__20514__auto____0 = (function (){
var statearr_37002 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_37002[(0)] = cljs$core$async$state_machine__20514__auto__);

(statearr_37002[(1)] = (1));

return statearr_37002;
});
var cljs$core$async$state_machine__20514__auto____1 = (function (state_36976){
while(true){
var ret_value__20515__auto__ = (function (){try{while(true){
var result__20516__auto__ = switch__20513__auto__.call(null,state_36976);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20516__auto__;
}
break;
}
}catch (e37003){if((e37003 instanceof Object)){
var ex__20517__auto__ = e37003;
var statearr_37004_37025 = state_36976;
(statearr_37004_37025[(5)] = ex__20517__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_36976);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e37003;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37026 = state_36976;
state_36976 = G__37026;
continue;
} else {
return ret_value__20515__auto__;
}
break;
}
});
cljs$core$async$state_machine__20514__auto__ = function(state_36976){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20514__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20514__auto____1.call(this,state_36976);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20514__auto____0;
cljs$core$async$state_machine__20514__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20514__auto____1;
return cljs$core$async$state_machine__20514__auto__;
})()
;})(switch__20513__auto__,c__20534__auto___37010,out))
})();
var state__20536__auto__ = (function (){var statearr_37005 = f__20535__auto__.call(null);
(statearr_37005[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20534__auto___37010);

return statearr_37005;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20536__auto__);
});})(c__20534__auto___37010,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map?rel=1449460874802