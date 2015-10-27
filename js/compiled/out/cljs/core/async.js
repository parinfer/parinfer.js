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
if(typeof cljs.core.async.t_cljs$core$async49378 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async49378 = (function (fn_handler,f,meta49379){
this.fn_handler = fn_handler;
this.f = f;
this.meta49379 = meta49379;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async49378.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_49380,meta49379__$1){
var self__ = this;
var _49380__$1 = this;
return (new cljs.core.async.t_cljs$core$async49378(self__.fn_handler,self__.f,meta49379__$1));
});

cljs.core.async.t_cljs$core$async49378.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_49380){
var self__ = this;
var _49380__$1 = this;
return self__.meta49379;
});

cljs.core.async.t_cljs$core$async49378.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async49378.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async49378.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async49378.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"fn-handler","fn-handler",648785851,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null)], null)))], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"meta49379","meta49379",385542732,null)], null);
});

cljs.core.async.t_cljs$core$async49378.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async49378.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async49378";

cljs.core.async.t_cljs$core$async49378.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async49378");
});

cljs.core.async.__GT_t_cljs$core$async49378 = (function cljs$core$async$fn_handler_$___GT_t_cljs$core$async49378(fn_handler__$1,f__$1,meta49379){
return (new cljs.core.async.t_cljs$core$async49378(fn_handler__$1,f__$1,meta49379));
});

}

return (new cljs.core.async.t_cljs$core$async49378(cljs$core$async$fn_handler,f,cljs.core.PersistentArrayMap.EMPTY));
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
var args49383 = [];
var len__17325__auto___49386 = arguments.length;
var i__17326__auto___49387 = (0);
while(true){
if((i__17326__auto___49387 < len__17325__auto___49386)){
args49383.push((arguments[i__17326__auto___49387]));

var G__49388 = (i__17326__auto___49387 + (1));
i__17326__auto___49387 = G__49388;
continue;
} else {
}
break;
}

var G__49385 = args49383.length;
switch (G__49385) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args49383.length)].join('')));

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
var args49390 = [];
var len__17325__auto___49393 = arguments.length;
var i__17326__auto___49394 = (0);
while(true){
if((i__17326__auto___49394 < len__17325__auto___49393)){
args49390.push((arguments[i__17326__auto___49394]));

var G__49395 = (i__17326__auto___49394 + (1));
i__17326__auto___49394 = G__49395;
continue;
} else {
}
break;
}

var G__49392 = args49390.length;
switch (G__49392) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args49390.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_49397 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_49397);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_49397,ret){
return (function (){
return fn1.call(null,val_49397);
});})(val_49397,ret))
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
var args49398 = [];
var len__17325__auto___49401 = arguments.length;
var i__17326__auto___49402 = (0);
while(true){
if((i__17326__auto___49402 < len__17325__auto___49401)){
args49398.push((arguments[i__17326__auto___49402]));

var G__49403 = (i__17326__auto___49402 + (1));
i__17326__auto___49402 = G__49403;
continue;
} else {
}
break;
}

var G__49400 = args49398.length;
switch (G__49400) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args49398.length)].join('')));

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
var n__17170__auto___49405 = n;
var x_49406 = (0);
while(true){
if((x_49406 < n__17170__auto___49405)){
(a[x_49406] = (0));

var G__49407 = (x_49406 + (1));
x_49406 = G__49407;
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

var G__49408 = (i + (1));
i = G__49408;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async49412 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async49412 = (function (alt_flag,flag,meta49413){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta49413 = meta49413;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async49412.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_49414,meta49413__$1){
var self__ = this;
var _49414__$1 = this;
return (new cljs.core.async.t_cljs$core$async49412(self__.alt_flag,self__.flag,meta49413__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async49412.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_49414){
var self__ = this;
var _49414__$1 = this;
return self__.meta49413;
});})(flag))
;

cljs.core.async.t_cljs$core$async49412.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async49412.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async49412.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async49412.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta49413","meta49413",1709650906,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async49412.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async49412.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async49412";

cljs.core.async.t_cljs$core$async49412.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async49412");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async49412 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async49412(alt_flag__$1,flag__$1,meta49413){
return (new cljs.core.async.t_cljs$core$async49412(alt_flag__$1,flag__$1,meta49413));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async49412(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async49418 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async49418 = (function (alt_handler,flag,cb,meta49419){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta49419 = meta49419;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async49418.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_49420,meta49419__$1){
var self__ = this;
var _49420__$1 = this;
return (new cljs.core.async.t_cljs$core$async49418(self__.alt_handler,self__.flag,self__.cb,meta49419__$1));
});

cljs.core.async.t_cljs$core$async49418.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_49420){
var self__ = this;
var _49420__$1 = this;
return self__.meta49419;
});

cljs.core.async.t_cljs$core$async49418.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async49418.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async49418.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async49418.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null)], null)))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta49419","meta49419",-455103457,null)], null);
});

cljs.core.async.t_cljs$core$async49418.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async49418.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async49418";

cljs.core.async.t_cljs$core$async49418.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async49418");
});

cljs.core.async.__GT_t_cljs$core$async49418 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async49418(alt_handler__$1,flag__$1,cb__$1,meta49419){
return (new cljs.core.async.t_cljs$core$async49418(alt_handler__$1,flag__$1,cb__$1,meta49419));
});

}

return (new cljs.core.async.t_cljs$core$async49418(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
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
return (function (p1__49421_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__49421_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__49422_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__49422_SHARP_,port], null));
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
var G__49423 = (i + (1));
i = G__49423;
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
var len__17325__auto___49429 = arguments.length;
var i__17326__auto___49430 = (0);
while(true){
if((i__17326__auto___49430 < len__17325__auto___49429)){
args__17332__auto__.push((arguments[i__17326__auto___49430]));

var G__49431 = (i__17326__auto___49430 + (1));
i__17326__auto___49430 = G__49431;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__49426){
var map__49427 = p__49426;
var map__49427__$1 = ((((!((map__49427 == null)))?((((map__49427.cljs$lang$protocol_mask$partition0$ & (64))) || (map__49427.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__49427):map__49427);
var opts = map__49427__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq49424){
var G__49425 = cljs.core.first.call(null,seq49424);
var seq49424__$1 = cljs.core.next.call(null,seq49424);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__49425,seq49424__$1);
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args49432 = [];
var len__17325__auto___49482 = arguments.length;
var i__17326__auto___49483 = (0);
while(true){
if((i__17326__auto___49483 < len__17325__auto___49482)){
args49432.push((arguments[i__17326__auto___49483]));

var G__49484 = (i__17326__auto___49483 + (1));
i__17326__auto___49483 = G__49484;
continue;
} else {
}
break;
}

var G__49434 = args49432.length;
switch (G__49434) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args49432.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__19920__auto___49486 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___49486){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___49486){
return (function (state_49458){
var state_val_49459 = (state_49458[(1)]);
if((state_val_49459 === (7))){
var inst_49454 = (state_49458[(2)]);
var state_49458__$1 = state_49458;
var statearr_49460_49487 = state_49458__$1;
(statearr_49460_49487[(2)] = inst_49454);

(statearr_49460_49487[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49459 === (1))){
var state_49458__$1 = state_49458;
var statearr_49461_49488 = state_49458__$1;
(statearr_49461_49488[(2)] = null);

(statearr_49461_49488[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49459 === (4))){
var inst_49437 = (state_49458[(7)]);
var inst_49437__$1 = (state_49458[(2)]);
var inst_49438 = (inst_49437__$1 == null);
var state_49458__$1 = (function (){var statearr_49462 = state_49458;
(statearr_49462[(7)] = inst_49437__$1);

return statearr_49462;
})();
if(cljs.core.truth_(inst_49438)){
var statearr_49463_49489 = state_49458__$1;
(statearr_49463_49489[(1)] = (5));

} else {
var statearr_49464_49490 = state_49458__$1;
(statearr_49464_49490[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49459 === (13))){
var state_49458__$1 = state_49458;
var statearr_49465_49491 = state_49458__$1;
(statearr_49465_49491[(2)] = null);

(statearr_49465_49491[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49459 === (6))){
var inst_49437 = (state_49458[(7)]);
var state_49458__$1 = state_49458;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_49458__$1,(11),to,inst_49437);
} else {
if((state_val_49459 === (3))){
var inst_49456 = (state_49458[(2)]);
var state_49458__$1 = state_49458;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_49458__$1,inst_49456);
} else {
if((state_val_49459 === (12))){
var state_49458__$1 = state_49458;
var statearr_49466_49492 = state_49458__$1;
(statearr_49466_49492[(2)] = null);

(statearr_49466_49492[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49459 === (2))){
var state_49458__$1 = state_49458;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_49458__$1,(4),from);
} else {
if((state_val_49459 === (11))){
var inst_49447 = (state_49458[(2)]);
var state_49458__$1 = state_49458;
if(cljs.core.truth_(inst_49447)){
var statearr_49467_49493 = state_49458__$1;
(statearr_49467_49493[(1)] = (12));

} else {
var statearr_49468_49494 = state_49458__$1;
(statearr_49468_49494[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49459 === (9))){
var state_49458__$1 = state_49458;
var statearr_49469_49495 = state_49458__$1;
(statearr_49469_49495[(2)] = null);

(statearr_49469_49495[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49459 === (5))){
var state_49458__$1 = state_49458;
if(cljs.core.truth_(close_QMARK_)){
var statearr_49470_49496 = state_49458__$1;
(statearr_49470_49496[(1)] = (8));

} else {
var statearr_49471_49497 = state_49458__$1;
(statearr_49471_49497[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49459 === (14))){
var inst_49452 = (state_49458[(2)]);
var state_49458__$1 = state_49458;
var statearr_49472_49498 = state_49458__$1;
(statearr_49472_49498[(2)] = inst_49452);

(statearr_49472_49498[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49459 === (10))){
var inst_49444 = (state_49458[(2)]);
var state_49458__$1 = state_49458;
var statearr_49473_49499 = state_49458__$1;
(statearr_49473_49499[(2)] = inst_49444);

(statearr_49473_49499[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49459 === (8))){
var inst_49441 = cljs.core.async.close_BANG_.call(null,to);
var state_49458__$1 = state_49458;
var statearr_49474_49500 = state_49458__$1;
(statearr_49474_49500[(2)] = inst_49441);

(statearr_49474_49500[(1)] = (10));


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
});})(c__19920__auto___49486))
;
return ((function (switch__19855__auto__,c__19920__auto___49486){
return (function() {
var cljs$core$async$state_machine__19856__auto__ = null;
var cljs$core$async$state_machine__19856__auto____0 = (function (){
var statearr_49478 = [null,null,null,null,null,null,null,null];
(statearr_49478[(0)] = cljs$core$async$state_machine__19856__auto__);

(statearr_49478[(1)] = (1));

return statearr_49478;
});
var cljs$core$async$state_machine__19856__auto____1 = (function (state_49458){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_49458);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e49479){if((e49479 instanceof Object)){
var ex__19859__auto__ = e49479;
var statearr_49480_49501 = state_49458;
(statearr_49480_49501[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_49458);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e49479;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__49502 = state_49458;
state_49458 = G__49502;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$state_machine__19856__auto__ = function(state_49458){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19856__auto____1.call(this,state_49458);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19856__auto____0;
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19856__auto____1;
return cljs$core$async$state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___49486))
})();
var state__19922__auto__ = (function (){var statearr_49481 = f__19921__auto__.call(null);
(statearr_49481[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___49486);

return statearr_49481;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___49486))
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
return (function (p__49686){
var vec__49687 = p__49686;
var v = cljs.core.nth.call(null,vec__49687,(0),null);
var p = cljs.core.nth.call(null,vec__49687,(1),null);
var job = vec__49687;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__19920__auto___49869 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___49869,res,vec__49687,v,p,job,jobs,results){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___49869,res,vec__49687,v,p,job,jobs,results){
return (function (state_49692){
var state_val_49693 = (state_49692[(1)]);
if((state_val_49693 === (1))){
var state_49692__$1 = state_49692;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_49692__$1,(2),res,v);
} else {
if((state_val_49693 === (2))){
var inst_49689 = (state_49692[(2)]);
var inst_49690 = cljs.core.async.close_BANG_.call(null,res);
var state_49692__$1 = (function (){var statearr_49694 = state_49692;
(statearr_49694[(7)] = inst_49689);

return statearr_49694;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_49692__$1,inst_49690);
} else {
return null;
}
}
});})(c__19920__auto___49869,res,vec__49687,v,p,job,jobs,results))
;
return ((function (switch__19855__auto__,c__19920__auto___49869,res,vec__49687,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0 = (function (){
var statearr_49698 = [null,null,null,null,null,null,null,null];
(statearr_49698[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__);

(statearr_49698[(1)] = (1));

return statearr_49698;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1 = (function (state_49692){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_49692);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e49699){if((e49699 instanceof Object)){
var ex__19859__auto__ = e49699;
var statearr_49700_49870 = state_49692;
(statearr_49700_49870[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_49692);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e49699;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__49871 = state_49692;
state_49692 = G__49871;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__ = function(state_49692){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1.call(this,state_49692);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___49869,res,vec__49687,v,p,job,jobs,results))
})();
var state__19922__auto__ = (function (){var statearr_49701 = f__19921__auto__.call(null);
(statearr_49701[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___49869);

return statearr_49701;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___49869,res,vec__49687,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__49702){
var vec__49703 = p__49702;
var v = cljs.core.nth.call(null,vec__49703,(0),null);
var p = cljs.core.nth.call(null,vec__49703,(1),null);
var job = vec__49703;
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
var n__17170__auto___49872 = n;
var __49873 = (0);
while(true){
if((__49873 < n__17170__auto___49872)){
var G__49704_49874 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__49704_49874) {
case "compute":
var c__19920__auto___49876 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__49873,c__19920__auto___49876,G__49704_49874,n__17170__auto___49872,jobs,results,process,async){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (__49873,c__19920__auto___49876,G__49704_49874,n__17170__auto___49872,jobs,results,process,async){
return (function (state_49717){
var state_val_49718 = (state_49717[(1)]);
if((state_val_49718 === (1))){
var state_49717__$1 = state_49717;
var statearr_49719_49877 = state_49717__$1;
(statearr_49719_49877[(2)] = null);

(statearr_49719_49877[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49718 === (2))){
var state_49717__$1 = state_49717;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_49717__$1,(4),jobs);
} else {
if((state_val_49718 === (3))){
var inst_49715 = (state_49717[(2)]);
var state_49717__$1 = state_49717;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_49717__$1,inst_49715);
} else {
if((state_val_49718 === (4))){
var inst_49707 = (state_49717[(2)]);
var inst_49708 = process.call(null,inst_49707);
var state_49717__$1 = state_49717;
if(cljs.core.truth_(inst_49708)){
var statearr_49720_49878 = state_49717__$1;
(statearr_49720_49878[(1)] = (5));

} else {
var statearr_49721_49879 = state_49717__$1;
(statearr_49721_49879[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49718 === (5))){
var state_49717__$1 = state_49717;
var statearr_49722_49880 = state_49717__$1;
(statearr_49722_49880[(2)] = null);

(statearr_49722_49880[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49718 === (6))){
var state_49717__$1 = state_49717;
var statearr_49723_49881 = state_49717__$1;
(statearr_49723_49881[(2)] = null);

(statearr_49723_49881[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49718 === (7))){
var inst_49713 = (state_49717[(2)]);
var state_49717__$1 = state_49717;
var statearr_49724_49882 = state_49717__$1;
(statearr_49724_49882[(2)] = inst_49713);

(statearr_49724_49882[(1)] = (3));


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
});})(__49873,c__19920__auto___49876,G__49704_49874,n__17170__auto___49872,jobs,results,process,async))
;
return ((function (__49873,switch__19855__auto__,c__19920__auto___49876,G__49704_49874,n__17170__auto___49872,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0 = (function (){
var statearr_49728 = [null,null,null,null,null,null,null];
(statearr_49728[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__);

(statearr_49728[(1)] = (1));

return statearr_49728;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1 = (function (state_49717){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_49717);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e49729){if((e49729 instanceof Object)){
var ex__19859__auto__ = e49729;
var statearr_49730_49883 = state_49717;
(statearr_49730_49883[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_49717);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e49729;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__49884 = state_49717;
state_49717 = G__49884;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__ = function(state_49717){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1.call(this,state_49717);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__;
})()
;})(__49873,switch__19855__auto__,c__19920__auto___49876,G__49704_49874,n__17170__auto___49872,jobs,results,process,async))
})();
var state__19922__auto__ = (function (){var statearr_49731 = f__19921__auto__.call(null);
(statearr_49731[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___49876);

return statearr_49731;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(__49873,c__19920__auto___49876,G__49704_49874,n__17170__auto___49872,jobs,results,process,async))
);


break;
case "async":
var c__19920__auto___49885 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__49873,c__19920__auto___49885,G__49704_49874,n__17170__auto___49872,jobs,results,process,async){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (__49873,c__19920__auto___49885,G__49704_49874,n__17170__auto___49872,jobs,results,process,async){
return (function (state_49744){
var state_val_49745 = (state_49744[(1)]);
if((state_val_49745 === (1))){
var state_49744__$1 = state_49744;
var statearr_49746_49886 = state_49744__$1;
(statearr_49746_49886[(2)] = null);

(statearr_49746_49886[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49745 === (2))){
var state_49744__$1 = state_49744;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_49744__$1,(4),jobs);
} else {
if((state_val_49745 === (3))){
var inst_49742 = (state_49744[(2)]);
var state_49744__$1 = state_49744;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_49744__$1,inst_49742);
} else {
if((state_val_49745 === (4))){
var inst_49734 = (state_49744[(2)]);
var inst_49735 = async.call(null,inst_49734);
var state_49744__$1 = state_49744;
if(cljs.core.truth_(inst_49735)){
var statearr_49747_49887 = state_49744__$1;
(statearr_49747_49887[(1)] = (5));

} else {
var statearr_49748_49888 = state_49744__$1;
(statearr_49748_49888[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49745 === (5))){
var state_49744__$1 = state_49744;
var statearr_49749_49889 = state_49744__$1;
(statearr_49749_49889[(2)] = null);

(statearr_49749_49889[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49745 === (6))){
var state_49744__$1 = state_49744;
var statearr_49750_49890 = state_49744__$1;
(statearr_49750_49890[(2)] = null);

(statearr_49750_49890[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49745 === (7))){
var inst_49740 = (state_49744[(2)]);
var state_49744__$1 = state_49744;
var statearr_49751_49891 = state_49744__$1;
(statearr_49751_49891[(2)] = inst_49740);

(statearr_49751_49891[(1)] = (3));


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
});})(__49873,c__19920__auto___49885,G__49704_49874,n__17170__auto___49872,jobs,results,process,async))
;
return ((function (__49873,switch__19855__auto__,c__19920__auto___49885,G__49704_49874,n__17170__auto___49872,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0 = (function (){
var statearr_49755 = [null,null,null,null,null,null,null];
(statearr_49755[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__);

(statearr_49755[(1)] = (1));

return statearr_49755;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1 = (function (state_49744){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_49744);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e49756){if((e49756 instanceof Object)){
var ex__19859__auto__ = e49756;
var statearr_49757_49892 = state_49744;
(statearr_49757_49892[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_49744);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e49756;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__49893 = state_49744;
state_49744 = G__49893;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__ = function(state_49744){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1.call(this,state_49744);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__;
})()
;})(__49873,switch__19855__auto__,c__19920__auto___49885,G__49704_49874,n__17170__auto___49872,jobs,results,process,async))
})();
var state__19922__auto__ = (function (){var statearr_49758 = f__19921__auto__.call(null);
(statearr_49758[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___49885);

return statearr_49758;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(__49873,c__19920__auto___49885,G__49704_49874,n__17170__auto___49872,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__49894 = (__49873 + (1));
__49873 = G__49894;
continue;
} else {
}
break;
}

var c__19920__auto___49895 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___49895,jobs,results,process,async){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___49895,jobs,results,process,async){
return (function (state_49780){
var state_val_49781 = (state_49780[(1)]);
if((state_val_49781 === (1))){
var state_49780__$1 = state_49780;
var statearr_49782_49896 = state_49780__$1;
(statearr_49782_49896[(2)] = null);

(statearr_49782_49896[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49781 === (2))){
var state_49780__$1 = state_49780;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_49780__$1,(4),from);
} else {
if((state_val_49781 === (3))){
var inst_49778 = (state_49780[(2)]);
var state_49780__$1 = state_49780;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_49780__$1,inst_49778);
} else {
if((state_val_49781 === (4))){
var inst_49761 = (state_49780[(7)]);
var inst_49761__$1 = (state_49780[(2)]);
var inst_49762 = (inst_49761__$1 == null);
var state_49780__$1 = (function (){var statearr_49783 = state_49780;
(statearr_49783[(7)] = inst_49761__$1);

return statearr_49783;
})();
if(cljs.core.truth_(inst_49762)){
var statearr_49784_49897 = state_49780__$1;
(statearr_49784_49897[(1)] = (5));

} else {
var statearr_49785_49898 = state_49780__$1;
(statearr_49785_49898[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49781 === (5))){
var inst_49764 = cljs.core.async.close_BANG_.call(null,jobs);
var state_49780__$1 = state_49780;
var statearr_49786_49899 = state_49780__$1;
(statearr_49786_49899[(2)] = inst_49764);

(statearr_49786_49899[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49781 === (6))){
var inst_49766 = (state_49780[(8)]);
var inst_49761 = (state_49780[(7)]);
var inst_49766__$1 = cljs.core.async.chan.call(null,(1));
var inst_49767 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_49768 = [inst_49761,inst_49766__$1];
var inst_49769 = (new cljs.core.PersistentVector(null,2,(5),inst_49767,inst_49768,null));
var state_49780__$1 = (function (){var statearr_49787 = state_49780;
(statearr_49787[(8)] = inst_49766__$1);

return statearr_49787;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_49780__$1,(8),jobs,inst_49769);
} else {
if((state_val_49781 === (7))){
var inst_49776 = (state_49780[(2)]);
var state_49780__$1 = state_49780;
var statearr_49788_49900 = state_49780__$1;
(statearr_49788_49900[(2)] = inst_49776);

(statearr_49788_49900[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49781 === (8))){
var inst_49766 = (state_49780[(8)]);
var inst_49771 = (state_49780[(2)]);
var state_49780__$1 = (function (){var statearr_49789 = state_49780;
(statearr_49789[(9)] = inst_49771);

return statearr_49789;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_49780__$1,(9),results,inst_49766);
} else {
if((state_val_49781 === (9))){
var inst_49773 = (state_49780[(2)]);
var state_49780__$1 = (function (){var statearr_49790 = state_49780;
(statearr_49790[(10)] = inst_49773);

return statearr_49790;
})();
var statearr_49791_49901 = state_49780__$1;
(statearr_49791_49901[(2)] = null);

(statearr_49791_49901[(1)] = (2));


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
});})(c__19920__auto___49895,jobs,results,process,async))
;
return ((function (switch__19855__auto__,c__19920__auto___49895,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0 = (function (){
var statearr_49795 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_49795[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__);

(statearr_49795[(1)] = (1));

return statearr_49795;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1 = (function (state_49780){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_49780);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e49796){if((e49796 instanceof Object)){
var ex__19859__auto__ = e49796;
var statearr_49797_49902 = state_49780;
(statearr_49797_49902[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_49780);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e49796;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__49903 = state_49780;
state_49780 = G__49903;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__ = function(state_49780){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1.call(this,state_49780);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___49895,jobs,results,process,async))
})();
var state__19922__auto__ = (function (){var statearr_49798 = f__19921__auto__.call(null);
(statearr_49798[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___49895);

return statearr_49798;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___49895,jobs,results,process,async))
);


var c__19920__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto__,jobs,results,process,async){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto__,jobs,results,process,async){
return (function (state_49836){
var state_val_49837 = (state_49836[(1)]);
if((state_val_49837 === (7))){
var inst_49832 = (state_49836[(2)]);
var state_49836__$1 = state_49836;
var statearr_49838_49904 = state_49836__$1;
(statearr_49838_49904[(2)] = inst_49832);

(statearr_49838_49904[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (20))){
var state_49836__$1 = state_49836;
var statearr_49839_49905 = state_49836__$1;
(statearr_49839_49905[(2)] = null);

(statearr_49839_49905[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (1))){
var state_49836__$1 = state_49836;
var statearr_49840_49906 = state_49836__$1;
(statearr_49840_49906[(2)] = null);

(statearr_49840_49906[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (4))){
var inst_49801 = (state_49836[(7)]);
var inst_49801__$1 = (state_49836[(2)]);
var inst_49802 = (inst_49801__$1 == null);
var state_49836__$1 = (function (){var statearr_49841 = state_49836;
(statearr_49841[(7)] = inst_49801__$1);

return statearr_49841;
})();
if(cljs.core.truth_(inst_49802)){
var statearr_49842_49907 = state_49836__$1;
(statearr_49842_49907[(1)] = (5));

} else {
var statearr_49843_49908 = state_49836__$1;
(statearr_49843_49908[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (15))){
var inst_49814 = (state_49836[(8)]);
var state_49836__$1 = state_49836;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_49836__$1,(18),to,inst_49814);
} else {
if((state_val_49837 === (21))){
var inst_49827 = (state_49836[(2)]);
var state_49836__$1 = state_49836;
var statearr_49844_49909 = state_49836__$1;
(statearr_49844_49909[(2)] = inst_49827);

(statearr_49844_49909[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (13))){
var inst_49829 = (state_49836[(2)]);
var state_49836__$1 = (function (){var statearr_49845 = state_49836;
(statearr_49845[(9)] = inst_49829);

return statearr_49845;
})();
var statearr_49846_49910 = state_49836__$1;
(statearr_49846_49910[(2)] = null);

(statearr_49846_49910[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (6))){
var inst_49801 = (state_49836[(7)]);
var state_49836__$1 = state_49836;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_49836__$1,(11),inst_49801);
} else {
if((state_val_49837 === (17))){
var inst_49822 = (state_49836[(2)]);
var state_49836__$1 = state_49836;
if(cljs.core.truth_(inst_49822)){
var statearr_49847_49911 = state_49836__$1;
(statearr_49847_49911[(1)] = (19));

} else {
var statearr_49848_49912 = state_49836__$1;
(statearr_49848_49912[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (3))){
var inst_49834 = (state_49836[(2)]);
var state_49836__$1 = state_49836;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_49836__$1,inst_49834);
} else {
if((state_val_49837 === (12))){
var inst_49811 = (state_49836[(10)]);
var state_49836__$1 = state_49836;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_49836__$1,(14),inst_49811);
} else {
if((state_val_49837 === (2))){
var state_49836__$1 = state_49836;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_49836__$1,(4),results);
} else {
if((state_val_49837 === (19))){
var state_49836__$1 = state_49836;
var statearr_49849_49913 = state_49836__$1;
(statearr_49849_49913[(2)] = null);

(statearr_49849_49913[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (11))){
var inst_49811 = (state_49836[(2)]);
var state_49836__$1 = (function (){var statearr_49850 = state_49836;
(statearr_49850[(10)] = inst_49811);

return statearr_49850;
})();
var statearr_49851_49914 = state_49836__$1;
(statearr_49851_49914[(2)] = null);

(statearr_49851_49914[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (9))){
var state_49836__$1 = state_49836;
var statearr_49852_49915 = state_49836__$1;
(statearr_49852_49915[(2)] = null);

(statearr_49852_49915[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (5))){
var state_49836__$1 = state_49836;
if(cljs.core.truth_(close_QMARK_)){
var statearr_49853_49916 = state_49836__$1;
(statearr_49853_49916[(1)] = (8));

} else {
var statearr_49854_49917 = state_49836__$1;
(statearr_49854_49917[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (14))){
var inst_49814 = (state_49836[(8)]);
var inst_49816 = (state_49836[(11)]);
var inst_49814__$1 = (state_49836[(2)]);
var inst_49815 = (inst_49814__$1 == null);
var inst_49816__$1 = cljs.core.not.call(null,inst_49815);
var state_49836__$1 = (function (){var statearr_49855 = state_49836;
(statearr_49855[(8)] = inst_49814__$1);

(statearr_49855[(11)] = inst_49816__$1);

return statearr_49855;
})();
if(inst_49816__$1){
var statearr_49856_49918 = state_49836__$1;
(statearr_49856_49918[(1)] = (15));

} else {
var statearr_49857_49919 = state_49836__$1;
(statearr_49857_49919[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (16))){
var inst_49816 = (state_49836[(11)]);
var state_49836__$1 = state_49836;
var statearr_49858_49920 = state_49836__$1;
(statearr_49858_49920[(2)] = inst_49816);

(statearr_49858_49920[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (10))){
var inst_49808 = (state_49836[(2)]);
var state_49836__$1 = state_49836;
var statearr_49859_49921 = state_49836__$1;
(statearr_49859_49921[(2)] = inst_49808);

(statearr_49859_49921[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (18))){
var inst_49819 = (state_49836[(2)]);
var state_49836__$1 = state_49836;
var statearr_49860_49922 = state_49836__$1;
(statearr_49860_49922[(2)] = inst_49819);

(statearr_49860_49922[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49837 === (8))){
var inst_49805 = cljs.core.async.close_BANG_.call(null,to);
var state_49836__$1 = state_49836;
var statearr_49861_49923 = state_49836__$1;
(statearr_49861_49923[(2)] = inst_49805);

(statearr_49861_49923[(1)] = (10));


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
});})(c__19920__auto__,jobs,results,process,async))
;
return ((function (switch__19855__auto__,c__19920__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0 = (function (){
var statearr_49865 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_49865[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__);

(statearr_49865[(1)] = (1));

return statearr_49865;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1 = (function (state_49836){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_49836);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e49866){if((e49866 instanceof Object)){
var ex__19859__auto__ = e49866;
var statearr_49867_49924 = state_49836;
(statearr_49867_49924[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_49836);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e49866;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__49925 = state_49836;
state_49836 = G__49925;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__ = function(state_49836){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1.call(this,state_49836);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19856__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto__,jobs,results,process,async))
})();
var state__19922__auto__ = (function (){var statearr_49868 = f__19921__auto__.call(null);
(statearr_49868[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto__);

return statearr_49868;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto__,jobs,results,process,async))
);

return c__19920__auto__;
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
var args49926 = [];
var len__17325__auto___49929 = arguments.length;
var i__17326__auto___49930 = (0);
while(true){
if((i__17326__auto___49930 < len__17325__auto___49929)){
args49926.push((arguments[i__17326__auto___49930]));

var G__49931 = (i__17326__auto___49930 + (1));
i__17326__auto___49930 = G__49931;
continue;
} else {
}
break;
}

var G__49928 = args49926.length;
switch (G__49928) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args49926.length)].join('')));

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
var args49933 = [];
var len__17325__auto___49936 = arguments.length;
var i__17326__auto___49937 = (0);
while(true){
if((i__17326__auto___49937 < len__17325__auto___49936)){
args49933.push((arguments[i__17326__auto___49937]));

var G__49938 = (i__17326__auto___49937 + (1));
i__17326__auto___49937 = G__49938;
continue;
} else {
}
break;
}

var G__49935 = args49933.length;
switch (G__49935) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args49933.length)].join('')));

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
var args49940 = [];
var len__17325__auto___49993 = arguments.length;
var i__17326__auto___49994 = (0);
while(true){
if((i__17326__auto___49994 < len__17325__auto___49993)){
args49940.push((arguments[i__17326__auto___49994]));

var G__49995 = (i__17326__auto___49994 + (1));
i__17326__auto___49994 = G__49995;
continue;
} else {
}
break;
}

var G__49942 = args49940.length;
switch (G__49942) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args49940.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__19920__auto___49997 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___49997,tc,fc){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___49997,tc,fc){
return (function (state_49968){
var state_val_49969 = (state_49968[(1)]);
if((state_val_49969 === (7))){
var inst_49964 = (state_49968[(2)]);
var state_49968__$1 = state_49968;
var statearr_49970_49998 = state_49968__$1;
(statearr_49970_49998[(2)] = inst_49964);

(statearr_49970_49998[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49969 === (1))){
var state_49968__$1 = state_49968;
var statearr_49971_49999 = state_49968__$1;
(statearr_49971_49999[(2)] = null);

(statearr_49971_49999[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49969 === (4))){
var inst_49945 = (state_49968[(7)]);
var inst_49945__$1 = (state_49968[(2)]);
var inst_49946 = (inst_49945__$1 == null);
var state_49968__$1 = (function (){var statearr_49972 = state_49968;
(statearr_49972[(7)] = inst_49945__$1);

return statearr_49972;
})();
if(cljs.core.truth_(inst_49946)){
var statearr_49973_50000 = state_49968__$1;
(statearr_49973_50000[(1)] = (5));

} else {
var statearr_49974_50001 = state_49968__$1;
(statearr_49974_50001[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49969 === (13))){
var state_49968__$1 = state_49968;
var statearr_49975_50002 = state_49968__$1;
(statearr_49975_50002[(2)] = null);

(statearr_49975_50002[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49969 === (6))){
var inst_49945 = (state_49968[(7)]);
var inst_49951 = p.call(null,inst_49945);
var state_49968__$1 = state_49968;
if(cljs.core.truth_(inst_49951)){
var statearr_49976_50003 = state_49968__$1;
(statearr_49976_50003[(1)] = (9));

} else {
var statearr_49977_50004 = state_49968__$1;
(statearr_49977_50004[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49969 === (3))){
var inst_49966 = (state_49968[(2)]);
var state_49968__$1 = state_49968;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_49968__$1,inst_49966);
} else {
if((state_val_49969 === (12))){
var state_49968__$1 = state_49968;
var statearr_49978_50005 = state_49968__$1;
(statearr_49978_50005[(2)] = null);

(statearr_49978_50005[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49969 === (2))){
var state_49968__$1 = state_49968;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_49968__$1,(4),ch);
} else {
if((state_val_49969 === (11))){
var inst_49945 = (state_49968[(7)]);
var inst_49955 = (state_49968[(2)]);
var state_49968__$1 = state_49968;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_49968__$1,(8),inst_49955,inst_49945);
} else {
if((state_val_49969 === (9))){
var state_49968__$1 = state_49968;
var statearr_49979_50006 = state_49968__$1;
(statearr_49979_50006[(2)] = tc);

(statearr_49979_50006[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49969 === (5))){
var inst_49948 = cljs.core.async.close_BANG_.call(null,tc);
var inst_49949 = cljs.core.async.close_BANG_.call(null,fc);
var state_49968__$1 = (function (){var statearr_49980 = state_49968;
(statearr_49980[(8)] = inst_49948);

return statearr_49980;
})();
var statearr_49981_50007 = state_49968__$1;
(statearr_49981_50007[(2)] = inst_49949);

(statearr_49981_50007[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49969 === (14))){
var inst_49962 = (state_49968[(2)]);
var state_49968__$1 = state_49968;
var statearr_49982_50008 = state_49968__$1;
(statearr_49982_50008[(2)] = inst_49962);

(statearr_49982_50008[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49969 === (10))){
var state_49968__$1 = state_49968;
var statearr_49983_50009 = state_49968__$1;
(statearr_49983_50009[(2)] = fc);

(statearr_49983_50009[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_49969 === (8))){
var inst_49957 = (state_49968[(2)]);
var state_49968__$1 = state_49968;
if(cljs.core.truth_(inst_49957)){
var statearr_49984_50010 = state_49968__$1;
(statearr_49984_50010[(1)] = (12));

} else {
var statearr_49985_50011 = state_49968__$1;
(statearr_49985_50011[(1)] = (13));

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
});})(c__19920__auto___49997,tc,fc))
;
return ((function (switch__19855__auto__,c__19920__auto___49997,tc,fc){
return (function() {
var cljs$core$async$state_machine__19856__auto__ = null;
var cljs$core$async$state_machine__19856__auto____0 = (function (){
var statearr_49989 = [null,null,null,null,null,null,null,null,null];
(statearr_49989[(0)] = cljs$core$async$state_machine__19856__auto__);

(statearr_49989[(1)] = (1));

return statearr_49989;
});
var cljs$core$async$state_machine__19856__auto____1 = (function (state_49968){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_49968);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e49990){if((e49990 instanceof Object)){
var ex__19859__auto__ = e49990;
var statearr_49991_50012 = state_49968;
(statearr_49991_50012[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_49968);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e49990;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__50013 = state_49968;
state_49968 = G__50013;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$state_machine__19856__auto__ = function(state_49968){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19856__auto____1.call(this,state_49968);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19856__auto____0;
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19856__auto____1;
return cljs$core$async$state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___49997,tc,fc))
})();
var state__19922__auto__ = (function (){var statearr_49992 = f__19921__auto__.call(null);
(statearr_49992[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___49997);

return statearr_49992;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___49997,tc,fc))
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
var c__19920__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto__){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto__){
return (function (state_50060){
var state_val_50061 = (state_50060[(1)]);
if((state_val_50061 === (1))){
var inst_50046 = init;
var state_50060__$1 = (function (){var statearr_50062 = state_50060;
(statearr_50062[(7)] = inst_50046);

return statearr_50062;
})();
var statearr_50063_50078 = state_50060__$1;
(statearr_50063_50078[(2)] = null);

(statearr_50063_50078[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50061 === (2))){
var state_50060__$1 = state_50060;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_50060__$1,(4),ch);
} else {
if((state_val_50061 === (3))){
var inst_50058 = (state_50060[(2)]);
var state_50060__$1 = state_50060;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_50060__$1,inst_50058);
} else {
if((state_val_50061 === (4))){
var inst_50049 = (state_50060[(8)]);
var inst_50049__$1 = (state_50060[(2)]);
var inst_50050 = (inst_50049__$1 == null);
var state_50060__$1 = (function (){var statearr_50064 = state_50060;
(statearr_50064[(8)] = inst_50049__$1);

return statearr_50064;
})();
if(cljs.core.truth_(inst_50050)){
var statearr_50065_50079 = state_50060__$1;
(statearr_50065_50079[(1)] = (5));

} else {
var statearr_50066_50080 = state_50060__$1;
(statearr_50066_50080[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50061 === (5))){
var inst_50046 = (state_50060[(7)]);
var state_50060__$1 = state_50060;
var statearr_50067_50081 = state_50060__$1;
(statearr_50067_50081[(2)] = inst_50046);

(statearr_50067_50081[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50061 === (6))){
var inst_50046 = (state_50060[(7)]);
var inst_50049 = (state_50060[(8)]);
var inst_50053 = f.call(null,inst_50046,inst_50049);
var inst_50046__$1 = inst_50053;
var state_50060__$1 = (function (){var statearr_50068 = state_50060;
(statearr_50068[(7)] = inst_50046__$1);

return statearr_50068;
})();
var statearr_50069_50082 = state_50060__$1;
(statearr_50069_50082[(2)] = null);

(statearr_50069_50082[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50061 === (7))){
var inst_50056 = (state_50060[(2)]);
var state_50060__$1 = state_50060;
var statearr_50070_50083 = state_50060__$1;
(statearr_50070_50083[(2)] = inst_50056);

(statearr_50070_50083[(1)] = (3));


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
});})(c__19920__auto__))
;
return ((function (switch__19855__auto__,c__19920__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__19856__auto__ = null;
var cljs$core$async$reduce_$_state_machine__19856__auto____0 = (function (){
var statearr_50074 = [null,null,null,null,null,null,null,null,null];
(statearr_50074[(0)] = cljs$core$async$reduce_$_state_machine__19856__auto__);

(statearr_50074[(1)] = (1));

return statearr_50074;
});
var cljs$core$async$reduce_$_state_machine__19856__auto____1 = (function (state_50060){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_50060);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e50075){if((e50075 instanceof Object)){
var ex__19859__auto__ = e50075;
var statearr_50076_50084 = state_50060;
(statearr_50076_50084[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_50060);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e50075;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__50085 = state_50060;
state_50060 = G__50085;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__19856__auto__ = function(state_50060){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__19856__auto____1.call(this,state_50060);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__19856__auto____0;
cljs$core$async$reduce_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__19856__auto____1;
return cljs$core$async$reduce_$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto__))
})();
var state__19922__auto__ = (function (){var statearr_50077 = f__19921__auto__.call(null);
(statearr_50077[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto__);

return statearr_50077;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto__))
);

return c__19920__auto__;
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
var args50086 = [];
var len__17325__auto___50138 = arguments.length;
var i__17326__auto___50139 = (0);
while(true){
if((i__17326__auto___50139 < len__17325__auto___50138)){
args50086.push((arguments[i__17326__auto___50139]));

var G__50140 = (i__17326__auto___50139 + (1));
i__17326__auto___50139 = G__50140;
continue;
} else {
}
break;
}

var G__50088 = args50086.length;
switch (G__50088) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args50086.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__19920__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto__){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto__){
return (function (state_50113){
var state_val_50114 = (state_50113[(1)]);
if((state_val_50114 === (7))){
var inst_50095 = (state_50113[(2)]);
var state_50113__$1 = state_50113;
var statearr_50115_50142 = state_50113__$1;
(statearr_50115_50142[(2)] = inst_50095);

(statearr_50115_50142[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50114 === (1))){
var inst_50089 = cljs.core.seq.call(null,coll);
var inst_50090 = inst_50089;
var state_50113__$1 = (function (){var statearr_50116 = state_50113;
(statearr_50116[(7)] = inst_50090);

return statearr_50116;
})();
var statearr_50117_50143 = state_50113__$1;
(statearr_50117_50143[(2)] = null);

(statearr_50117_50143[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50114 === (4))){
var inst_50090 = (state_50113[(7)]);
var inst_50093 = cljs.core.first.call(null,inst_50090);
var state_50113__$1 = state_50113;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_50113__$1,(7),ch,inst_50093);
} else {
if((state_val_50114 === (13))){
var inst_50107 = (state_50113[(2)]);
var state_50113__$1 = state_50113;
var statearr_50118_50144 = state_50113__$1;
(statearr_50118_50144[(2)] = inst_50107);

(statearr_50118_50144[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50114 === (6))){
var inst_50098 = (state_50113[(2)]);
var state_50113__$1 = state_50113;
if(cljs.core.truth_(inst_50098)){
var statearr_50119_50145 = state_50113__$1;
(statearr_50119_50145[(1)] = (8));

} else {
var statearr_50120_50146 = state_50113__$1;
(statearr_50120_50146[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50114 === (3))){
var inst_50111 = (state_50113[(2)]);
var state_50113__$1 = state_50113;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_50113__$1,inst_50111);
} else {
if((state_val_50114 === (12))){
var state_50113__$1 = state_50113;
var statearr_50121_50147 = state_50113__$1;
(statearr_50121_50147[(2)] = null);

(statearr_50121_50147[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50114 === (2))){
var inst_50090 = (state_50113[(7)]);
var state_50113__$1 = state_50113;
if(cljs.core.truth_(inst_50090)){
var statearr_50122_50148 = state_50113__$1;
(statearr_50122_50148[(1)] = (4));

} else {
var statearr_50123_50149 = state_50113__$1;
(statearr_50123_50149[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50114 === (11))){
var inst_50104 = cljs.core.async.close_BANG_.call(null,ch);
var state_50113__$1 = state_50113;
var statearr_50124_50150 = state_50113__$1;
(statearr_50124_50150[(2)] = inst_50104);

(statearr_50124_50150[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50114 === (9))){
var state_50113__$1 = state_50113;
if(cljs.core.truth_(close_QMARK_)){
var statearr_50125_50151 = state_50113__$1;
(statearr_50125_50151[(1)] = (11));

} else {
var statearr_50126_50152 = state_50113__$1;
(statearr_50126_50152[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50114 === (5))){
var inst_50090 = (state_50113[(7)]);
var state_50113__$1 = state_50113;
var statearr_50127_50153 = state_50113__$1;
(statearr_50127_50153[(2)] = inst_50090);

(statearr_50127_50153[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50114 === (10))){
var inst_50109 = (state_50113[(2)]);
var state_50113__$1 = state_50113;
var statearr_50128_50154 = state_50113__$1;
(statearr_50128_50154[(2)] = inst_50109);

(statearr_50128_50154[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50114 === (8))){
var inst_50090 = (state_50113[(7)]);
var inst_50100 = cljs.core.next.call(null,inst_50090);
var inst_50090__$1 = inst_50100;
var state_50113__$1 = (function (){var statearr_50129 = state_50113;
(statearr_50129[(7)] = inst_50090__$1);

return statearr_50129;
})();
var statearr_50130_50155 = state_50113__$1;
(statearr_50130_50155[(2)] = null);

(statearr_50130_50155[(1)] = (2));


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
});})(c__19920__auto__))
;
return ((function (switch__19855__auto__,c__19920__auto__){
return (function() {
var cljs$core$async$state_machine__19856__auto__ = null;
var cljs$core$async$state_machine__19856__auto____0 = (function (){
var statearr_50134 = [null,null,null,null,null,null,null,null];
(statearr_50134[(0)] = cljs$core$async$state_machine__19856__auto__);

(statearr_50134[(1)] = (1));

return statearr_50134;
});
var cljs$core$async$state_machine__19856__auto____1 = (function (state_50113){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_50113);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e50135){if((e50135 instanceof Object)){
var ex__19859__auto__ = e50135;
var statearr_50136_50156 = state_50113;
(statearr_50136_50156[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_50113);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e50135;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__50157 = state_50113;
state_50113 = G__50157;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$state_machine__19856__auto__ = function(state_50113){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19856__auto____1.call(this,state_50113);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19856__auto____0;
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19856__auto____1;
return cljs$core$async$state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto__))
})();
var state__19922__auto__ = (function (){var statearr_50137 = f__19921__auto__.call(null);
(statearr_50137[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto__);

return statearr_50137;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto__))
);

return c__19920__auto__;
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
if(typeof cljs.core.async.t_cljs$core$async50379 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async50379 = (function (mult,ch,cs,meta50380){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta50380 = meta50380;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async50379.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_50381,meta50380__$1){
var self__ = this;
var _50381__$1 = this;
return (new cljs.core.async.t_cljs$core$async50379(self__.mult,self__.ch,self__.cs,meta50380__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async50379.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_50381){
var self__ = this;
var _50381__$1 = this;
return self__.meta50380;
});})(cs))
;

cljs.core.async.t_cljs$core$async50379.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async50379.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async50379.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async50379.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async50379.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async50379.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async50379.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta50380","meta50380",86420761,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async50379.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async50379.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async50379";

cljs.core.async.t_cljs$core$async50379.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async50379");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async50379 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async50379(mult__$1,ch__$1,cs__$1,meta50380){
return (new cljs.core.async.t_cljs$core$async50379(mult__$1,ch__$1,cs__$1,meta50380));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async50379(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
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
var c__19920__auto___50600 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___50600,cs,m,dchan,dctr,done){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___50600,cs,m,dchan,dctr,done){
return (function (state_50512){
var state_val_50513 = (state_50512[(1)]);
if((state_val_50513 === (7))){
var inst_50508 = (state_50512[(2)]);
var state_50512__$1 = state_50512;
var statearr_50514_50601 = state_50512__$1;
(statearr_50514_50601[(2)] = inst_50508);

(statearr_50514_50601[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (20))){
var inst_50413 = (state_50512[(7)]);
var inst_50423 = cljs.core.first.call(null,inst_50413);
var inst_50424 = cljs.core.nth.call(null,inst_50423,(0),null);
var inst_50425 = cljs.core.nth.call(null,inst_50423,(1),null);
var state_50512__$1 = (function (){var statearr_50515 = state_50512;
(statearr_50515[(8)] = inst_50424);

return statearr_50515;
})();
if(cljs.core.truth_(inst_50425)){
var statearr_50516_50602 = state_50512__$1;
(statearr_50516_50602[(1)] = (22));

} else {
var statearr_50517_50603 = state_50512__$1;
(statearr_50517_50603[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (27))){
var inst_50384 = (state_50512[(9)]);
var inst_50460 = (state_50512[(10)]);
var inst_50455 = (state_50512[(11)]);
var inst_50453 = (state_50512[(12)]);
var inst_50460__$1 = cljs.core._nth.call(null,inst_50453,inst_50455);
var inst_50461 = cljs.core.async.put_BANG_.call(null,inst_50460__$1,inst_50384,done);
var state_50512__$1 = (function (){var statearr_50518 = state_50512;
(statearr_50518[(10)] = inst_50460__$1);

return statearr_50518;
})();
if(cljs.core.truth_(inst_50461)){
var statearr_50519_50604 = state_50512__$1;
(statearr_50519_50604[(1)] = (30));

} else {
var statearr_50520_50605 = state_50512__$1;
(statearr_50520_50605[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (1))){
var state_50512__$1 = state_50512;
var statearr_50521_50606 = state_50512__$1;
(statearr_50521_50606[(2)] = null);

(statearr_50521_50606[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (24))){
var inst_50413 = (state_50512[(7)]);
var inst_50430 = (state_50512[(2)]);
var inst_50431 = cljs.core.next.call(null,inst_50413);
var inst_50393 = inst_50431;
var inst_50394 = null;
var inst_50395 = (0);
var inst_50396 = (0);
var state_50512__$1 = (function (){var statearr_50522 = state_50512;
(statearr_50522[(13)] = inst_50395);

(statearr_50522[(14)] = inst_50430);

(statearr_50522[(15)] = inst_50396);

(statearr_50522[(16)] = inst_50394);

(statearr_50522[(17)] = inst_50393);

return statearr_50522;
})();
var statearr_50523_50607 = state_50512__$1;
(statearr_50523_50607[(2)] = null);

(statearr_50523_50607[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (39))){
var state_50512__$1 = state_50512;
var statearr_50527_50608 = state_50512__$1;
(statearr_50527_50608[(2)] = null);

(statearr_50527_50608[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (4))){
var inst_50384 = (state_50512[(9)]);
var inst_50384__$1 = (state_50512[(2)]);
var inst_50385 = (inst_50384__$1 == null);
var state_50512__$1 = (function (){var statearr_50528 = state_50512;
(statearr_50528[(9)] = inst_50384__$1);

return statearr_50528;
})();
if(cljs.core.truth_(inst_50385)){
var statearr_50529_50609 = state_50512__$1;
(statearr_50529_50609[(1)] = (5));

} else {
var statearr_50530_50610 = state_50512__$1;
(statearr_50530_50610[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (15))){
var inst_50395 = (state_50512[(13)]);
var inst_50396 = (state_50512[(15)]);
var inst_50394 = (state_50512[(16)]);
var inst_50393 = (state_50512[(17)]);
var inst_50409 = (state_50512[(2)]);
var inst_50410 = (inst_50396 + (1));
var tmp50524 = inst_50395;
var tmp50525 = inst_50394;
var tmp50526 = inst_50393;
var inst_50393__$1 = tmp50526;
var inst_50394__$1 = tmp50525;
var inst_50395__$1 = tmp50524;
var inst_50396__$1 = inst_50410;
var state_50512__$1 = (function (){var statearr_50531 = state_50512;
(statearr_50531[(13)] = inst_50395__$1);

(statearr_50531[(15)] = inst_50396__$1);

(statearr_50531[(16)] = inst_50394__$1);

(statearr_50531[(18)] = inst_50409);

(statearr_50531[(17)] = inst_50393__$1);

return statearr_50531;
})();
var statearr_50532_50611 = state_50512__$1;
(statearr_50532_50611[(2)] = null);

(statearr_50532_50611[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (21))){
var inst_50434 = (state_50512[(2)]);
var state_50512__$1 = state_50512;
var statearr_50536_50612 = state_50512__$1;
(statearr_50536_50612[(2)] = inst_50434);

(statearr_50536_50612[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (31))){
var inst_50460 = (state_50512[(10)]);
var inst_50464 = done.call(null,null);
var inst_50465 = cljs.core.async.untap_STAR_.call(null,m,inst_50460);
var state_50512__$1 = (function (){var statearr_50537 = state_50512;
(statearr_50537[(19)] = inst_50464);

return statearr_50537;
})();
var statearr_50538_50613 = state_50512__$1;
(statearr_50538_50613[(2)] = inst_50465);

(statearr_50538_50613[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (32))){
var inst_50452 = (state_50512[(20)]);
var inst_50454 = (state_50512[(21)]);
var inst_50455 = (state_50512[(11)]);
var inst_50453 = (state_50512[(12)]);
var inst_50467 = (state_50512[(2)]);
var inst_50468 = (inst_50455 + (1));
var tmp50533 = inst_50452;
var tmp50534 = inst_50454;
var tmp50535 = inst_50453;
var inst_50452__$1 = tmp50533;
var inst_50453__$1 = tmp50535;
var inst_50454__$1 = tmp50534;
var inst_50455__$1 = inst_50468;
var state_50512__$1 = (function (){var statearr_50539 = state_50512;
(statearr_50539[(22)] = inst_50467);

(statearr_50539[(20)] = inst_50452__$1);

(statearr_50539[(21)] = inst_50454__$1);

(statearr_50539[(11)] = inst_50455__$1);

(statearr_50539[(12)] = inst_50453__$1);

return statearr_50539;
})();
var statearr_50540_50614 = state_50512__$1;
(statearr_50540_50614[(2)] = null);

(statearr_50540_50614[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (40))){
var inst_50480 = (state_50512[(23)]);
var inst_50484 = done.call(null,null);
var inst_50485 = cljs.core.async.untap_STAR_.call(null,m,inst_50480);
var state_50512__$1 = (function (){var statearr_50541 = state_50512;
(statearr_50541[(24)] = inst_50484);

return statearr_50541;
})();
var statearr_50542_50615 = state_50512__$1;
(statearr_50542_50615[(2)] = inst_50485);

(statearr_50542_50615[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (33))){
var inst_50471 = (state_50512[(25)]);
var inst_50473 = cljs.core.chunked_seq_QMARK_.call(null,inst_50471);
var state_50512__$1 = state_50512;
if(inst_50473){
var statearr_50543_50616 = state_50512__$1;
(statearr_50543_50616[(1)] = (36));

} else {
var statearr_50544_50617 = state_50512__$1;
(statearr_50544_50617[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (13))){
var inst_50403 = (state_50512[(26)]);
var inst_50406 = cljs.core.async.close_BANG_.call(null,inst_50403);
var state_50512__$1 = state_50512;
var statearr_50545_50618 = state_50512__$1;
(statearr_50545_50618[(2)] = inst_50406);

(statearr_50545_50618[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (22))){
var inst_50424 = (state_50512[(8)]);
var inst_50427 = cljs.core.async.close_BANG_.call(null,inst_50424);
var state_50512__$1 = state_50512;
var statearr_50546_50619 = state_50512__$1;
(statearr_50546_50619[(2)] = inst_50427);

(statearr_50546_50619[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (36))){
var inst_50471 = (state_50512[(25)]);
var inst_50475 = cljs.core.chunk_first.call(null,inst_50471);
var inst_50476 = cljs.core.chunk_rest.call(null,inst_50471);
var inst_50477 = cljs.core.count.call(null,inst_50475);
var inst_50452 = inst_50476;
var inst_50453 = inst_50475;
var inst_50454 = inst_50477;
var inst_50455 = (0);
var state_50512__$1 = (function (){var statearr_50547 = state_50512;
(statearr_50547[(20)] = inst_50452);

(statearr_50547[(21)] = inst_50454);

(statearr_50547[(11)] = inst_50455);

(statearr_50547[(12)] = inst_50453);

return statearr_50547;
})();
var statearr_50548_50620 = state_50512__$1;
(statearr_50548_50620[(2)] = null);

(statearr_50548_50620[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (41))){
var inst_50471 = (state_50512[(25)]);
var inst_50487 = (state_50512[(2)]);
var inst_50488 = cljs.core.next.call(null,inst_50471);
var inst_50452 = inst_50488;
var inst_50453 = null;
var inst_50454 = (0);
var inst_50455 = (0);
var state_50512__$1 = (function (){var statearr_50549 = state_50512;
(statearr_50549[(20)] = inst_50452);

(statearr_50549[(21)] = inst_50454);

(statearr_50549[(27)] = inst_50487);

(statearr_50549[(11)] = inst_50455);

(statearr_50549[(12)] = inst_50453);

return statearr_50549;
})();
var statearr_50550_50621 = state_50512__$1;
(statearr_50550_50621[(2)] = null);

(statearr_50550_50621[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (43))){
var state_50512__$1 = state_50512;
var statearr_50551_50622 = state_50512__$1;
(statearr_50551_50622[(2)] = null);

(statearr_50551_50622[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (29))){
var inst_50496 = (state_50512[(2)]);
var state_50512__$1 = state_50512;
var statearr_50552_50623 = state_50512__$1;
(statearr_50552_50623[(2)] = inst_50496);

(statearr_50552_50623[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (44))){
var inst_50505 = (state_50512[(2)]);
var state_50512__$1 = (function (){var statearr_50553 = state_50512;
(statearr_50553[(28)] = inst_50505);

return statearr_50553;
})();
var statearr_50554_50624 = state_50512__$1;
(statearr_50554_50624[(2)] = null);

(statearr_50554_50624[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (6))){
var inst_50444 = (state_50512[(29)]);
var inst_50443 = cljs.core.deref.call(null,cs);
var inst_50444__$1 = cljs.core.keys.call(null,inst_50443);
var inst_50445 = cljs.core.count.call(null,inst_50444__$1);
var inst_50446 = cljs.core.reset_BANG_.call(null,dctr,inst_50445);
var inst_50451 = cljs.core.seq.call(null,inst_50444__$1);
var inst_50452 = inst_50451;
var inst_50453 = null;
var inst_50454 = (0);
var inst_50455 = (0);
var state_50512__$1 = (function (){var statearr_50555 = state_50512;
(statearr_50555[(20)] = inst_50452);

(statearr_50555[(30)] = inst_50446);

(statearr_50555[(21)] = inst_50454);

(statearr_50555[(11)] = inst_50455);

(statearr_50555[(12)] = inst_50453);

(statearr_50555[(29)] = inst_50444__$1);

return statearr_50555;
})();
var statearr_50556_50625 = state_50512__$1;
(statearr_50556_50625[(2)] = null);

(statearr_50556_50625[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (28))){
var inst_50452 = (state_50512[(20)]);
var inst_50471 = (state_50512[(25)]);
var inst_50471__$1 = cljs.core.seq.call(null,inst_50452);
var state_50512__$1 = (function (){var statearr_50557 = state_50512;
(statearr_50557[(25)] = inst_50471__$1);

return statearr_50557;
})();
if(inst_50471__$1){
var statearr_50558_50626 = state_50512__$1;
(statearr_50558_50626[(1)] = (33));

} else {
var statearr_50559_50627 = state_50512__$1;
(statearr_50559_50627[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (25))){
var inst_50454 = (state_50512[(21)]);
var inst_50455 = (state_50512[(11)]);
var inst_50457 = (inst_50455 < inst_50454);
var inst_50458 = inst_50457;
var state_50512__$1 = state_50512;
if(cljs.core.truth_(inst_50458)){
var statearr_50560_50628 = state_50512__$1;
(statearr_50560_50628[(1)] = (27));

} else {
var statearr_50561_50629 = state_50512__$1;
(statearr_50561_50629[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (34))){
var state_50512__$1 = state_50512;
var statearr_50562_50630 = state_50512__$1;
(statearr_50562_50630[(2)] = null);

(statearr_50562_50630[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (17))){
var state_50512__$1 = state_50512;
var statearr_50563_50631 = state_50512__$1;
(statearr_50563_50631[(2)] = null);

(statearr_50563_50631[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (3))){
var inst_50510 = (state_50512[(2)]);
var state_50512__$1 = state_50512;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_50512__$1,inst_50510);
} else {
if((state_val_50513 === (12))){
var inst_50439 = (state_50512[(2)]);
var state_50512__$1 = state_50512;
var statearr_50564_50632 = state_50512__$1;
(statearr_50564_50632[(2)] = inst_50439);

(statearr_50564_50632[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (2))){
var state_50512__$1 = state_50512;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_50512__$1,(4),ch);
} else {
if((state_val_50513 === (23))){
var state_50512__$1 = state_50512;
var statearr_50565_50633 = state_50512__$1;
(statearr_50565_50633[(2)] = null);

(statearr_50565_50633[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (35))){
var inst_50494 = (state_50512[(2)]);
var state_50512__$1 = state_50512;
var statearr_50566_50634 = state_50512__$1;
(statearr_50566_50634[(2)] = inst_50494);

(statearr_50566_50634[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (19))){
var inst_50413 = (state_50512[(7)]);
var inst_50417 = cljs.core.chunk_first.call(null,inst_50413);
var inst_50418 = cljs.core.chunk_rest.call(null,inst_50413);
var inst_50419 = cljs.core.count.call(null,inst_50417);
var inst_50393 = inst_50418;
var inst_50394 = inst_50417;
var inst_50395 = inst_50419;
var inst_50396 = (0);
var state_50512__$1 = (function (){var statearr_50567 = state_50512;
(statearr_50567[(13)] = inst_50395);

(statearr_50567[(15)] = inst_50396);

(statearr_50567[(16)] = inst_50394);

(statearr_50567[(17)] = inst_50393);

return statearr_50567;
})();
var statearr_50568_50635 = state_50512__$1;
(statearr_50568_50635[(2)] = null);

(statearr_50568_50635[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (11))){
var inst_50413 = (state_50512[(7)]);
var inst_50393 = (state_50512[(17)]);
var inst_50413__$1 = cljs.core.seq.call(null,inst_50393);
var state_50512__$1 = (function (){var statearr_50569 = state_50512;
(statearr_50569[(7)] = inst_50413__$1);

return statearr_50569;
})();
if(inst_50413__$1){
var statearr_50570_50636 = state_50512__$1;
(statearr_50570_50636[(1)] = (16));

} else {
var statearr_50571_50637 = state_50512__$1;
(statearr_50571_50637[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (9))){
var inst_50441 = (state_50512[(2)]);
var state_50512__$1 = state_50512;
var statearr_50572_50638 = state_50512__$1;
(statearr_50572_50638[(2)] = inst_50441);

(statearr_50572_50638[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (5))){
var inst_50391 = cljs.core.deref.call(null,cs);
var inst_50392 = cljs.core.seq.call(null,inst_50391);
var inst_50393 = inst_50392;
var inst_50394 = null;
var inst_50395 = (0);
var inst_50396 = (0);
var state_50512__$1 = (function (){var statearr_50573 = state_50512;
(statearr_50573[(13)] = inst_50395);

(statearr_50573[(15)] = inst_50396);

(statearr_50573[(16)] = inst_50394);

(statearr_50573[(17)] = inst_50393);

return statearr_50573;
})();
var statearr_50574_50639 = state_50512__$1;
(statearr_50574_50639[(2)] = null);

(statearr_50574_50639[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (14))){
var state_50512__$1 = state_50512;
var statearr_50575_50640 = state_50512__$1;
(statearr_50575_50640[(2)] = null);

(statearr_50575_50640[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (45))){
var inst_50502 = (state_50512[(2)]);
var state_50512__$1 = state_50512;
var statearr_50576_50641 = state_50512__$1;
(statearr_50576_50641[(2)] = inst_50502);

(statearr_50576_50641[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (26))){
var inst_50444 = (state_50512[(29)]);
var inst_50498 = (state_50512[(2)]);
var inst_50499 = cljs.core.seq.call(null,inst_50444);
var state_50512__$1 = (function (){var statearr_50577 = state_50512;
(statearr_50577[(31)] = inst_50498);

return statearr_50577;
})();
if(inst_50499){
var statearr_50578_50642 = state_50512__$1;
(statearr_50578_50642[(1)] = (42));

} else {
var statearr_50579_50643 = state_50512__$1;
(statearr_50579_50643[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (16))){
var inst_50413 = (state_50512[(7)]);
var inst_50415 = cljs.core.chunked_seq_QMARK_.call(null,inst_50413);
var state_50512__$1 = state_50512;
if(inst_50415){
var statearr_50580_50644 = state_50512__$1;
(statearr_50580_50644[(1)] = (19));

} else {
var statearr_50581_50645 = state_50512__$1;
(statearr_50581_50645[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (38))){
var inst_50491 = (state_50512[(2)]);
var state_50512__$1 = state_50512;
var statearr_50582_50646 = state_50512__$1;
(statearr_50582_50646[(2)] = inst_50491);

(statearr_50582_50646[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (30))){
var state_50512__$1 = state_50512;
var statearr_50583_50647 = state_50512__$1;
(statearr_50583_50647[(2)] = null);

(statearr_50583_50647[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (10))){
var inst_50396 = (state_50512[(15)]);
var inst_50394 = (state_50512[(16)]);
var inst_50402 = cljs.core._nth.call(null,inst_50394,inst_50396);
var inst_50403 = cljs.core.nth.call(null,inst_50402,(0),null);
var inst_50404 = cljs.core.nth.call(null,inst_50402,(1),null);
var state_50512__$1 = (function (){var statearr_50584 = state_50512;
(statearr_50584[(26)] = inst_50403);

return statearr_50584;
})();
if(cljs.core.truth_(inst_50404)){
var statearr_50585_50648 = state_50512__$1;
(statearr_50585_50648[(1)] = (13));

} else {
var statearr_50586_50649 = state_50512__$1;
(statearr_50586_50649[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (18))){
var inst_50437 = (state_50512[(2)]);
var state_50512__$1 = state_50512;
var statearr_50587_50650 = state_50512__$1;
(statearr_50587_50650[(2)] = inst_50437);

(statearr_50587_50650[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (42))){
var state_50512__$1 = state_50512;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_50512__$1,(45),dchan);
} else {
if((state_val_50513 === (37))){
var inst_50480 = (state_50512[(23)]);
var inst_50384 = (state_50512[(9)]);
var inst_50471 = (state_50512[(25)]);
var inst_50480__$1 = cljs.core.first.call(null,inst_50471);
var inst_50481 = cljs.core.async.put_BANG_.call(null,inst_50480__$1,inst_50384,done);
var state_50512__$1 = (function (){var statearr_50588 = state_50512;
(statearr_50588[(23)] = inst_50480__$1);

return statearr_50588;
})();
if(cljs.core.truth_(inst_50481)){
var statearr_50589_50651 = state_50512__$1;
(statearr_50589_50651[(1)] = (39));

} else {
var statearr_50590_50652 = state_50512__$1;
(statearr_50590_50652[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50513 === (8))){
var inst_50395 = (state_50512[(13)]);
var inst_50396 = (state_50512[(15)]);
var inst_50398 = (inst_50396 < inst_50395);
var inst_50399 = inst_50398;
var state_50512__$1 = state_50512;
if(cljs.core.truth_(inst_50399)){
var statearr_50591_50653 = state_50512__$1;
(statearr_50591_50653[(1)] = (10));

} else {
var statearr_50592_50654 = state_50512__$1;
(statearr_50592_50654[(1)] = (11));

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
});})(c__19920__auto___50600,cs,m,dchan,dctr,done))
;
return ((function (switch__19855__auto__,c__19920__auto___50600,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__19856__auto__ = null;
var cljs$core$async$mult_$_state_machine__19856__auto____0 = (function (){
var statearr_50596 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_50596[(0)] = cljs$core$async$mult_$_state_machine__19856__auto__);

(statearr_50596[(1)] = (1));

return statearr_50596;
});
var cljs$core$async$mult_$_state_machine__19856__auto____1 = (function (state_50512){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_50512);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e50597){if((e50597 instanceof Object)){
var ex__19859__auto__ = e50597;
var statearr_50598_50655 = state_50512;
(statearr_50598_50655[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_50512);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e50597;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__50656 = state_50512;
state_50512 = G__50656;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__19856__auto__ = function(state_50512){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__19856__auto____1.call(this,state_50512);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__19856__auto____0;
cljs$core$async$mult_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__19856__auto____1;
return cljs$core$async$mult_$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___50600,cs,m,dchan,dctr,done))
})();
var state__19922__auto__ = (function (){var statearr_50599 = f__19921__auto__.call(null);
(statearr_50599[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___50600);

return statearr_50599;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___50600,cs,m,dchan,dctr,done))
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
var args50657 = [];
var len__17325__auto___50660 = arguments.length;
var i__17326__auto___50661 = (0);
while(true){
if((i__17326__auto___50661 < len__17325__auto___50660)){
args50657.push((arguments[i__17326__auto___50661]));

var G__50662 = (i__17326__auto___50661 + (1));
i__17326__auto___50661 = G__50662;
continue;
} else {
}
break;
}

var G__50659 = args50657.length;
switch (G__50659) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args50657.length)].join('')));

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
var len__17325__auto___50674 = arguments.length;
var i__17326__auto___50675 = (0);
while(true){
if((i__17326__auto___50675 < len__17325__auto___50674)){
args__17332__auto__.push((arguments[i__17326__auto___50675]));

var G__50676 = (i__17326__auto___50675 + (1));
i__17326__auto___50675 = G__50676;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((3) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__17333__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__50668){
var map__50669 = p__50668;
var map__50669__$1 = ((((!((map__50669 == null)))?((((map__50669.cljs$lang$protocol_mask$partition0$ & (64))) || (map__50669.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__50669):map__50669);
var opts = map__50669__$1;
var statearr_50671_50677 = state;
(statearr_50671_50677[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4425__auto__ = cljs.core.async.do_alts.call(null,((function (map__50669,map__50669__$1,opts){
return (function (val){
var statearr_50672_50678 = state;
(statearr_50672_50678[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__50669,map__50669__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4425__auto__)){
var cb = temp__4425__auto__;
var statearr_50673_50679 = state;
(statearr_50673_50679[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq50664){
var G__50665 = cljs.core.first.call(null,seq50664);
var seq50664__$1 = cljs.core.next.call(null,seq50664);
var G__50666 = cljs.core.first.call(null,seq50664__$1);
var seq50664__$2 = cljs.core.next.call(null,seq50664__$1);
var G__50667 = cljs.core.first.call(null,seq50664__$2);
var seq50664__$3 = cljs.core.next.call(null,seq50664__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__50665,G__50666,G__50667,seq50664__$3);
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
if(typeof cljs.core.async.t_cljs$core$async50843 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async50843 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta50844){
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
this.meta50844 = meta50844;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async50843.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_50845,meta50844__$1){
var self__ = this;
var _50845__$1 = this;
return (new cljs.core.async.t_cljs$core$async50843(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta50844__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async50843.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_50845){
var self__ = this;
var _50845__$1 = this;
return self__.meta50844;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async50843.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async50843.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async50843.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async50843.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async50843.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async50843.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async50843.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async50843.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
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

cljs.core.async.t_cljs$core$async50843.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),cljs.core.with_meta(new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta50844","meta50844",1308395056,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async50843.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async50843.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async50843";

cljs.core.async.t_cljs$core$async50843.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async50843");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async50843 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async50843(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta50844){
return (new cljs.core.async.t_cljs$core$async50843(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta50844));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async50843(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__19920__auto___51006 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___51006,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___51006,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_50943){
var state_val_50944 = (state_50943[(1)]);
if((state_val_50944 === (7))){
var inst_50861 = (state_50943[(2)]);
var state_50943__$1 = state_50943;
var statearr_50945_51007 = state_50943__$1;
(statearr_50945_51007[(2)] = inst_50861);

(statearr_50945_51007[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (20))){
var inst_50873 = (state_50943[(7)]);
var state_50943__$1 = state_50943;
var statearr_50946_51008 = state_50943__$1;
(statearr_50946_51008[(2)] = inst_50873);

(statearr_50946_51008[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (27))){
var state_50943__$1 = state_50943;
var statearr_50947_51009 = state_50943__$1;
(statearr_50947_51009[(2)] = null);

(statearr_50947_51009[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (1))){
var inst_50849 = (state_50943[(8)]);
var inst_50849__$1 = calc_state.call(null);
var inst_50851 = (inst_50849__$1 == null);
var inst_50852 = cljs.core.not.call(null,inst_50851);
var state_50943__$1 = (function (){var statearr_50948 = state_50943;
(statearr_50948[(8)] = inst_50849__$1);

return statearr_50948;
})();
if(inst_50852){
var statearr_50949_51010 = state_50943__$1;
(statearr_50949_51010[(1)] = (2));

} else {
var statearr_50950_51011 = state_50943__$1;
(statearr_50950_51011[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (24))){
var inst_50903 = (state_50943[(9)]);
var inst_50917 = (state_50943[(10)]);
var inst_50896 = (state_50943[(11)]);
var inst_50917__$1 = inst_50896.call(null,inst_50903);
var state_50943__$1 = (function (){var statearr_50951 = state_50943;
(statearr_50951[(10)] = inst_50917__$1);

return statearr_50951;
})();
if(cljs.core.truth_(inst_50917__$1)){
var statearr_50952_51012 = state_50943__$1;
(statearr_50952_51012[(1)] = (29));

} else {
var statearr_50953_51013 = state_50943__$1;
(statearr_50953_51013[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (4))){
var inst_50864 = (state_50943[(2)]);
var state_50943__$1 = state_50943;
if(cljs.core.truth_(inst_50864)){
var statearr_50954_51014 = state_50943__$1;
(statearr_50954_51014[(1)] = (8));

} else {
var statearr_50955_51015 = state_50943__$1;
(statearr_50955_51015[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (15))){
var inst_50890 = (state_50943[(2)]);
var state_50943__$1 = state_50943;
if(cljs.core.truth_(inst_50890)){
var statearr_50956_51016 = state_50943__$1;
(statearr_50956_51016[(1)] = (19));

} else {
var statearr_50957_51017 = state_50943__$1;
(statearr_50957_51017[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (21))){
var inst_50895 = (state_50943[(12)]);
var inst_50895__$1 = (state_50943[(2)]);
var inst_50896 = cljs.core.get.call(null,inst_50895__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_50897 = cljs.core.get.call(null,inst_50895__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_50898 = cljs.core.get.call(null,inst_50895__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_50943__$1 = (function (){var statearr_50958 = state_50943;
(statearr_50958[(13)] = inst_50897);

(statearr_50958[(11)] = inst_50896);

(statearr_50958[(12)] = inst_50895__$1);

return statearr_50958;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_50943__$1,(22),inst_50898);
} else {
if((state_val_50944 === (31))){
var inst_50925 = (state_50943[(2)]);
var state_50943__$1 = state_50943;
if(cljs.core.truth_(inst_50925)){
var statearr_50959_51018 = state_50943__$1;
(statearr_50959_51018[(1)] = (32));

} else {
var statearr_50960_51019 = state_50943__$1;
(statearr_50960_51019[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (32))){
var inst_50902 = (state_50943[(14)]);
var state_50943__$1 = state_50943;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_50943__$1,(35),out,inst_50902);
} else {
if((state_val_50944 === (33))){
var inst_50895 = (state_50943[(12)]);
var inst_50873 = inst_50895;
var state_50943__$1 = (function (){var statearr_50961 = state_50943;
(statearr_50961[(7)] = inst_50873);

return statearr_50961;
})();
var statearr_50962_51020 = state_50943__$1;
(statearr_50962_51020[(2)] = null);

(statearr_50962_51020[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (13))){
var inst_50873 = (state_50943[(7)]);
var inst_50880 = inst_50873.cljs$lang$protocol_mask$partition0$;
var inst_50881 = (inst_50880 & (64));
var inst_50882 = inst_50873.cljs$core$ISeq$;
var inst_50883 = (inst_50881) || (inst_50882);
var state_50943__$1 = state_50943;
if(cljs.core.truth_(inst_50883)){
var statearr_50963_51021 = state_50943__$1;
(statearr_50963_51021[(1)] = (16));

} else {
var statearr_50964_51022 = state_50943__$1;
(statearr_50964_51022[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (22))){
var inst_50902 = (state_50943[(14)]);
var inst_50903 = (state_50943[(9)]);
var inst_50901 = (state_50943[(2)]);
var inst_50902__$1 = cljs.core.nth.call(null,inst_50901,(0),null);
var inst_50903__$1 = cljs.core.nth.call(null,inst_50901,(1),null);
var inst_50904 = (inst_50902__$1 == null);
var inst_50905 = cljs.core._EQ_.call(null,inst_50903__$1,change);
var inst_50906 = (inst_50904) || (inst_50905);
var state_50943__$1 = (function (){var statearr_50965 = state_50943;
(statearr_50965[(14)] = inst_50902__$1);

(statearr_50965[(9)] = inst_50903__$1);

return statearr_50965;
})();
if(cljs.core.truth_(inst_50906)){
var statearr_50966_51023 = state_50943__$1;
(statearr_50966_51023[(1)] = (23));

} else {
var statearr_50967_51024 = state_50943__$1;
(statearr_50967_51024[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (36))){
var inst_50895 = (state_50943[(12)]);
var inst_50873 = inst_50895;
var state_50943__$1 = (function (){var statearr_50968 = state_50943;
(statearr_50968[(7)] = inst_50873);

return statearr_50968;
})();
var statearr_50969_51025 = state_50943__$1;
(statearr_50969_51025[(2)] = null);

(statearr_50969_51025[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (29))){
var inst_50917 = (state_50943[(10)]);
var state_50943__$1 = state_50943;
var statearr_50970_51026 = state_50943__$1;
(statearr_50970_51026[(2)] = inst_50917);

(statearr_50970_51026[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (6))){
var state_50943__$1 = state_50943;
var statearr_50971_51027 = state_50943__$1;
(statearr_50971_51027[(2)] = false);

(statearr_50971_51027[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (28))){
var inst_50913 = (state_50943[(2)]);
var inst_50914 = calc_state.call(null);
var inst_50873 = inst_50914;
var state_50943__$1 = (function (){var statearr_50972 = state_50943;
(statearr_50972[(15)] = inst_50913);

(statearr_50972[(7)] = inst_50873);

return statearr_50972;
})();
var statearr_50973_51028 = state_50943__$1;
(statearr_50973_51028[(2)] = null);

(statearr_50973_51028[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (25))){
var inst_50939 = (state_50943[(2)]);
var state_50943__$1 = state_50943;
var statearr_50974_51029 = state_50943__$1;
(statearr_50974_51029[(2)] = inst_50939);

(statearr_50974_51029[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (34))){
var inst_50937 = (state_50943[(2)]);
var state_50943__$1 = state_50943;
var statearr_50975_51030 = state_50943__$1;
(statearr_50975_51030[(2)] = inst_50937);

(statearr_50975_51030[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (17))){
var state_50943__$1 = state_50943;
var statearr_50976_51031 = state_50943__$1;
(statearr_50976_51031[(2)] = false);

(statearr_50976_51031[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (3))){
var state_50943__$1 = state_50943;
var statearr_50977_51032 = state_50943__$1;
(statearr_50977_51032[(2)] = false);

(statearr_50977_51032[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (12))){
var inst_50941 = (state_50943[(2)]);
var state_50943__$1 = state_50943;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_50943__$1,inst_50941);
} else {
if((state_val_50944 === (2))){
var inst_50849 = (state_50943[(8)]);
var inst_50854 = inst_50849.cljs$lang$protocol_mask$partition0$;
var inst_50855 = (inst_50854 & (64));
var inst_50856 = inst_50849.cljs$core$ISeq$;
var inst_50857 = (inst_50855) || (inst_50856);
var state_50943__$1 = state_50943;
if(cljs.core.truth_(inst_50857)){
var statearr_50978_51033 = state_50943__$1;
(statearr_50978_51033[(1)] = (5));

} else {
var statearr_50979_51034 = state_50943__$1;
(statearr_50979_51034[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (23))){
var inst_50902 = (state_50943[(14)]);
var inst_50908 = (inst_50902 == null);
var state_50943__$1 = state_50943;
if(cljs.core.truth_(inst_50908)){
var statearr_50980_51035 = state_50943__$1;
(statearr_50980_51035[(1)] = (26));

} else {
var statearr_50981_51036 = state_50943__$1;
(statearr_50981_51036[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (35))){
var inst_50928 = (state_50943[(2)]);
var state_50943__$1 = state_50943;
if(cljs.core.truth_(inst_50928)){
var statearr_50982_51037 = state_50943__$1;
(statearr_50982_51037[(1)] = (36));

} else {
var statearr_50983_51038 = state_50943__$1;
(statearr_50983_51038[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (19))){
var inst_50873 = (state_50943[(7)]);
var inst_50892 = cljs.core.apply.call(null,cljs.core.hash_map,inst_50873);
var state_50943__$1 = state_50943;
var statearr_50984_51039 = state_50943__$1;
(statearr_50984_51039[(2)] = inst_50892);

(statearr_50984_51039[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (11))){
var inst_50873 = (state_50943[(7)]);
var inst_50877 = (inst_50873 == null);
var inst_50878 = cljs.core.not.call(null,inst_50877);
var state_50943__$1 = state_50943;
if(inst_50878){
var statearr_50985_51040 = state_50943__$1;
(statearr_50985_51040[(1)] = (13));

} else {
var statearr_50986_51041 = state_50943__$1;
(statearr_50986_51041[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (9))){
var inst_50849 = (state_50943[(8)]);
var state_50943__$1 = state_50943;
var statearr_50987_51042 = state_50943__$1;
(statearr_50987_51042[(2)] = inst_50849);

(statearr_50987_51042[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (5))){
var state_50943__$1 = state_50943;
var statearr_50988_51043 = state_50943__$1;
(statearr_50988_51043[(2)] = true);

(statearr_50988_51043[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (14))){
var state_50943__$1 = state_50943;
var statearr_50989_51044 = state_50943__$1;
(statearr_50989_51044[(2)] = false);

(statearr_50989_51044[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (26))){
var inst_50903 = (state_50943[(9)]);
var inst_50910 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_50903);
var state_50943__$1 = state_50943;
var statearr_50990_51045 = state_50943__$1;
(statearr_50990_51045[(2)] = inst_50910);

(statearr_50990_51045[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (16))){
var state_50943__$1 = state_50943;
var statearr_50991_51046 = state_50943__$1;
(statearr_50991_51046[(2)] = true);

(statearr_50991_51046[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (38))){
var inst_50933 = (state_50943[(2)]);
var state_50943__$1 = state_50943;
var statearr_50992_51047 = state_50943__$1;
(statearr_50992_51047[(2)] = inst_50933);

(statearr_50992_51047[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (30))){
var inst_50903 = (state_50943[(9)]);
var inst_50897 = (state_50943[(13)]);
var inst_50896 = (state_50943[(11)]);
var inst_50920 = cljs.core.empty_QMARK_.call(null,inst_50896);
var inst_50921 = inst_50897.call(null,inst_50903);
var inst_50922 = cljs.core.not.call(null,inst_50921);
var inst_50923 = (inst_50920) && (inst_50922);
var state_50943__$1 = state_50943;
var statearr_50993_51048 = state_50943__$1;
(statearr_50993_51048[(2)] = inst_50923);

(statearr_50993_51048[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (10))){
var inst_50849 = (state_50943[(8)]);
var inst_50869 = (state_50943[(2)]);
var inst_50870 = cljs.core.get.call(null,inst_50869,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_50871 = cljs.core.get.call(null,inst_50869,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_50872 = cljs.core.get.call(null,inst_50869,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_50873 = inst_50849;
var state_50943__$1 = (function (){var statearr_50994 = state_50943;
(statearr_50994[(16)] = inst_50872);

(statearr_50994[(17)] = inst_50870);

(statearr_50994[(7)] = inst_50873);

(statearr_50994[(18)] = inst_50871);

return statearr_50994;
})();
var statearr_50995_51049 = state_50943__$1;
(statearr_50995_51049[(2)] = null);

(statearr_50995_51049[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (18))){
var inst_50887 = (state_50943[(2)]);
var state_50943__$1 = state_50943;
var statearr_50996_51050 = state_50943__$1;
(statearr_50996_51050[(2)] = inst_50887);

(statearr_50996_51050[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (37))){
var state_50943__$1 = state_50943;
var statearr_50997_51051 = state_50943__$1;
(statearr_50997_51051[(2)] = null);

(statearr_50997_51051[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_50944 === (8))){
var inst_50849 = (state_50943[(8)]);
var inst_50866 = cljs.core.apply.call(null,cljs.core.hash_map,inst_50849);
var state_50943__$1 = state_50943;
var statearr_50998_51052 = state_50943__$1;
(statearr_50998_51052[(2)] = inst_50866);

(statearr_50998_51052[(1)] = (10));


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
});})(c__19920__auto___51006,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__19855__auto__,c__19920__auto___51006,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__19856__auto__ = null;
var cljs$core$async$mix_$_state_machine__19856__auto____0 = (function (){
var statearr_51002 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_51002[(0)] = cljs$core$async$mix_$_state_machine__19856__auto__);

(statearr_51002[(1)] = (1));

return statearr_51002;
});
var cljs$core$async$mix_$_state_machine__19856__auto____1 = (function (state_50943){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_50943);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e51003){if((e51003 instanceof Object)){
var ex__19859__auto__ = e51003;
var statearr_51004_51053 = state_50943;
(statearr_51004_51053[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_50943);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e51003;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__51054 = state_50943;
state_50943 = G__51054;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__19856__auto__ = function(state_50943){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__19856__auto____1.call(this,state_50943);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__19856__auto____0;
cljs$core$async$mix_$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__19856__auto____1;
return cljs$core$async$mix_$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___51006,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__19922__auto__ = (function (){var statearr_51005 = f__19921__auto__.call(null);
(statearr_51005[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___51006);

return statearr_51005;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___51006,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
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
var args51055 = [];
var len__17325__auto___51058 = arguments.length;
var i__17326__auto___51059 = (0);
while(true){
if((i__17326__auto___51059 < len__17325__auto___51058)){
args51055.push((arguments[i__17326__auto___51059]));

var G__51060 = (i__17326__auto___51059 + (1));
i__17326__auto___51059 = G__51060;
continue;
} else {
}
break;
}

var G__51057 = args51055.length;
switch (G__51057) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51055.length)].join('')));

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
var args51063 = [];
var len__17325__auto___51188 = arguments.length;
var i__17326__auto___51189 = (0);
while(true){
if((i__17326__auto___51189 < len__17325__auto___51188)){
args51063.push((arguments[i__17326__auto___51189]));

var G__51190 = (i__17326__auto___51189 + (1));
i__17326__auto___51189 = G__51190;
continue;
} else {
}
break;
}

var G__51065 = args51063.length;
switch (G__51065) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51063.length)].join('')));

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
return (function (p1__51062_SHARP_){
if(cljs.core.truth_(p1__51062_SHARP_.call(null,topic))){
return p1__51062_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__51062_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__16267__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async51066 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async51066 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta51067){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta51067 = meta51067;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async51066.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_51068,meta51067__$1){
var self__ = this;
var _51068__$1 = this;
return (new cljs.core.async.t_cljs$core$async51066(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta51067__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async51066.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_51068){
var self__ = this;
var _51068__$1 = this;
return self__.meta51067;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async51066.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async51066.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async51066.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async51066.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async51066.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
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

cljs.core.async.t_cljs$core$async51066.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async51066.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async51066.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta51067","meta51067",-801938227,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async51066.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async51066.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async51066";

cljs.core.async.t_cljs$core$async51066.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async51066");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async51066 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async51066(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta51067){
return (new cljs.core.async.t_cljs$core$async51066(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta51067));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async51066(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__19920__auto___51192 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___51192,mults,ensure_mult,p){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___51192,mults,ensure_mult,p){
return (function (state_51140){
var state_val_51141 = (state_51140[(1)]);
if((state_val_51141 === (7))){
var inst_51136 = (state_51140[(2)]);
var state_51140__$1 = state_51140;
var statearr_51142_51193 = state_51140__$1;
(statearr_51142_51193[(2)] = inst_51136);

(statearr_51142_51193[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (20))){
var state_51140__$1 = state_51140;
var statearr_51143_51194 = state_51140__$1;
(statearr_51143_51194[(2)] = null);

(statearr_51143_51194[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (1))){
var state_51140__$1 = state_51140;
var statearr_51144_51195 = state_51140__$1;
(statearr_51144_51195[(2)] = null);

(statearr_51144_51195[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (24))){
var inst_51119 = (state_51140[(7)]);
var inst_51128 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_51119);
var state_51140__$1 = state_51140;
var statearr_51145_51196 = state_51140__$1;
(statearr_51145_51196[(2)] = inst_51128);

(statearr_51145_51196[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (4))){
var inst_51071 = (state_51140[(8)]);
var inst_51071__$1 = (state_51140[(2)]);
var inst_51072 = (inst_51071__$1 == null);
var state_51140__$1 = (function (){var statearr_51146 = state_51140;
(statearr_51146[(8)] = inst_51071__$1);

return statearr_51146;
})();
if(cljs.core.truth_(inst_51072)){
var statearr_51147_51197 = state_51140__$1;
(statearr_51147_51197[(1)] = (5));

} else {
var statearr_51148_51198 = state_51140__$1;
(statearr_51148_51198[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (15))){
var inst_51113 = (state_51140[(2)]);
var state_51140__$1 = state_51140;
var statearr_51149_51199 = state_51140__$1;
(statearr_51149_51199[(2)] = inst_51113);

(statearr_51149_51199[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (21))){
var inst_51133 = (state_51140[(2)]);
var state_51140__$1 = (function (){var statearr_51150 = state_51140;
(statearr_51150[(9)] = inst_51133);

return statearr_51150;
})();
var statearr_51151_51200 = state_51140__$1;
(statearr_51151_51200[(2)] = null);

(statearr_51151_51200[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (13))){
var inst_51095 = (state_51140[(10)]);
var inst_51097 = cljs.core.chunked_seq_QMARK_.call(null,inst_51095);
var state_51140__$1 = state_51140;
if(inst_51097){
var statearr_51152_51201 = state_51140__$1;
(statearr_51152_51201[(1)] = (16));

} else {
var statearr_51153_51202 = state_51140__$1;
(statearr_51153_51202[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (22))){
var inst_51125 = (state_51140[(2)]);
var state_51140__$1 = state_51140;
if(cljs.core.truth_(inst_51125)){
var statearr_51154_51203 = state_51140__$1;
(statearr_51154_51203[(1)] = (23));

} else {
var statearr_51155_51204 = state_51140__$1;
(statearr_51155_51204[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (6))){
var inst_51121 = (state_51140[(11)]);
var inst_51071 = (state_51140[(8)]);
var inst_51119 = (state_51140[(7)]);
var inst_51119__$1 = topic_fn.call(null,inst_51071);
var inst_51120 = cljs.core.deref.call(null,mults);
var inst_51121__$1 = cljs.core.get.call(null,inst_51120,inst_51119__$1);
var state_51140__$1 = (function (){var statearr_51156 = state_51140;
(statearr_51156[(11)] = inst_51121__$1);

(statearr_51156[(7)] = inst_51119__$1);

return statearr_51156;
})();
if(cljs.core.truth_(inst_51121__$1)){
var statearr_51157_51205 = state_51140__$1;
(statearr_51157_51205[(1)] = (19));

} else {
var statearr_51158_51206 = state_51140__$1;
(statearr_51158_51206[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (25))){
var inst_51130 = (state_51140[(2)]);
var state_51140__$1 = state_51140;
var statearr_51159_51207 = state_51140__$1;
(statearr_51159_51207[(2)] = inst_51130);

(statearr_51159_51207[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (17))){
var inst_51095 = (state_51140[(10)]);
var inst_51104 = cljs.core.first.call(null,inst_51095);
var inst_51105 = cljs.core.async.muxch_STAR_.call(null,inst_51104);
var inst_51106 = cljs.core.async.close_BANG_.call(null,inst_51105);
var inst_51107 = cljs.core.next.call(null,inst_51095);
var inst_51081 = inst_51107;
var inst_51082 = null;
var inst_51083 = (0);
var inst_51084 = (0);
var state_51140__$1 = (function (){var statearr_51160 = state_51140;
(statearr_51160[(12)] = inst_51084);

(statearr_51160[(13)] = inst_51081);

(statearr_51160[(14)] = inst_51083);

(statearr_51160[(15)] = inst_51106);

(statearr_51160[(16)] = inst_51082);

return statearr_51160;
})();
var statearr_51161_51208 = state_51140__$1;
(statearr_51161_51208[(2)] = null);

(statearr_51161_51208[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (3))){
var inst_51138 = (state_51140[(2)]);
var state_51140__$1 = state_51140;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_51140__$1,inst_51138);
} else {
if((state_val_51141 === (12))){
var inst_51115 = (state_51140[(2)]);
var state_51140__$1 = state_51140;
var statearr_51162_51209 = state_51140__$1;
(statearr_51162_51209[(2)] = inst_51115);

(statearr_51162_51209[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (2))){
var state_51140__$1 = state_51140;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_51140__$1,(4),ch);
} else {
if((state_val_51141 === (23))){
var state_51140__$1 = state_51140;
var statearr_51163_51210 = state_51140__$1;
(statearr_51163_51210[(2)] = null);

(statearr_51163_51210[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (19))){
var inst_51121 = (state_51140[(11)]);
var inst_51071 = (state_51140[(8)]);
var inst_51123 = cljs.core.async.muxch_STAR_.call(null,inst_51121);
var state_51140__$1 = state_51140;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_51140__$1,(22),inst_51123,inst_51071);
} else {
if((state_val_51141 === (11))){
var inst_51081 = (state_51140[(13)]);
var inst_51095 = (state_51140[(10)]);
var inst_51095__$1 = cljs.core.seq.call(null,inst_51081);
var state_51140__$1 = (function (){var statearr_51164 = state_51140;
(statearr_51164[(10)] = inst_51095__$1);

return statearr_51164;
})();
if(inst_51095__$1){
var statearr_51165_51211 = state_51140__$1;
(statearr_51165_51211[(1)] = (13));

} else {
var statearr_51166_51212 = state_51140__$1;
(statearr_51166_51212[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (9))){
var inst_51117 = (state_51140[(2)]);
var state_51140__$1 = state_51140;
var statearr_51167_51213 = state_51140__$1;
(statearr_51167_51213[(2)] = inst_51117);

(statearr_51167_51213[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (5))){
var inst_51078 = cljs.core.deref.call(null,mults);
var inst_51079 = cljs.core.vals.call(null,inst_51078);
var inst_51080 = cljs.core.seq.call(null,inst_51079);
var inst_51081 = inst_51080;
var inst_51082 = null;
var inst_51083 = (0);
var inst_51084 = (0);
var state_51140__$1 = (function (){var statearr_51168 = state_51140;
(statearr_51168[(12)] = inst_51084);

(statearr_51168[(13)] = inst_51081);

(statearr_51168[(14)] = inst_51083);

(statearr_51168[(16)] = inst_51082);

return statearr_51168;
})();
var statearr_51169_51214 = state_51140__$1;
(statearr_51169_51214[(2)] = null);

(statearr_51169_51214[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (14))){
var state_51140__$1 = state_51140;
var statearr_51173_51215 = state_51140__$1;
(statearr_51173_51215[(2)] = null);

(statearr_51173_51215[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (16))){
var inst_51095 = (state_51140[(10)]);
var inst_51099 = cljs.core.chunk_first.call(null,inst_51095);
var inst_51100 = cljs.core.chunk_rest.call(null,inst_51095);
var inst_51101 = cljs.core.count.call(null,inst_51099);
var inst_51081 = inst_51100;
var inst_51082 = inst_51099;
var inst_51083 = inst_51101;
var inst_51084 = (0);
var state_51140__$1 = (function (){var statearr_51174 = state_51140;
(statearr_51174[(12)] = inst_51084);

(statearr_51174[(13)] = inst_51081);

(statearr_51174[(14)] = inst_51083);

(statearr_51174[(16)] = inst_51082);

return statearr_51174;
})();
var statearr_51175_51216 = state_51140__$1;
(statearr_51175_51216[(2)] = null);

(statearr_51175_51216[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (10))){
var inst_51084 = (state_51140[(12)]);
var inst_51081 = (state_51140[(13)]);
var inst_51083 = (state_51140[(14)]);
var inst_51082 = (state_51140[(16)]);
var inst_51089 = cljs.core._nth.call(null,inst_51082,inst_51084);
var inst_51090 = cljs.core.async.muxch_STAR_.call(null,inst_51089);
var inst_51091 = cljs.core.async.close_BANG_.call(null,inst_51090);
var inst_51092 = (inst_51084 + (1));
var tmp51170 = inst_51081;
var tmp51171 = inst_51083;
var tmp51172 = inst_51082;
var inst_51081__$1 = tmp51170;
var inst_51082__$1 = tmp51172;
var inst_51083__$1 = tmp51171;
var inst_51084__$1 = inst_51092;
var state_51140__$1 = (function (){var statearr_51176 = state_51140;
(statearr_51176[(12)] = inst_51084__$1);

(statearr_51176[(13)] = inst_51081__$1);

(statearr_51176[(17)] = inst_51091);

(statearr_51176[(14)] = inst_51083__$1);

(statearr_51176[(16)] = inst_51082__$1);

return statearr_51176;
})();
var statearr_51177_51217 = state_51140__$1;
(statearr_51177_51217[(2)] = null);

(statearr_51177_51217[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (18))){
var inst_51110 = (state_51140[(2)]);
var state_51140__$1 = state_51140;
var statearr_51178_51218 = state_51140__$1;
(statearr_51178_51218[(2)] = inst_51110);

(statearr_51178_51218[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51141 === (8))){
var inst_51084 = (state_51140[(12)]);
var inst_51083 = (state_51140[(14)]);
var inst_51086 = (inst_51084 < inst_51083);
var inst_51087 = inst_51086;
var state_51140__$1 = state_51140;
if(cljs.core.truth_(inst_51087)){
var statearr_51179_51219 = state_51140__$1;
(statearr_51179_51219[(1)] = (10));

} else {
var statearr_51180_51220 = state_51140__$1;
(statearr_51180_51220[(1)] = (11));

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
});})(c__19920__auto___51192,mults,ensure_mult,p))
;
return ((function (switch__19855__auto__,c__19920__auto___51192,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__19856__auto__ = null;
var cljs$core$async$state_machine__19856__auto____0 = (function (){
var statearr_51184 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_51184[(0)] = cljs$core$async$state_machine__19856__auto__);

(statearr_51184[(1)] = (1));

return statearr_51184;
});
var cljs$core$async$state_machine__19856__auto____1 = (function (state_51140){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_51140);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e51185){if((e51185 instanceof Object)){
var ex__19859__auto__ = e51185;
var statearr_51186_51221 = state_51140;
(statearr_51186_51221[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_51140);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e51185;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__51222 = state_51140;
state_51140 = G__51222;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$state_machine__19856__auto__ = function(state_51140){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19856__auto____1.call(this,state_51140);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19856__auto____0;
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19856__auto____1;
return cljs$core$async$state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___51192,mults,ensure_mult,p))
})();
var state__19922__auto__ = (function (){var statearr_51187 = f__19921__auto__.call(null);
(statearr_51187[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___51192);

return statearr_51187;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___51192,mults,ensure_mult,p))
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
var args51223 = [];
var len__17325__auto___51226 = arguments.length;
var i__17326__auto___51227 = (0);
while(true){
if((i__17326__auto___51227 < len__17325__auto___51226)){
args51223.push((arguments[i__17326__auto___51227]));

var G__51228 = (i__17326__auto___51227 + (1));
i__17326__auto___51227 = G__51228;
continue;
} else {
}
break;
}

var G__51225 = args51223.length;
switch (G__51225) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51223.length)].join('')));

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
var args51230 = [];
var len__17325__auto___51233 = arguments.length;
var i__17326__auto___51234 = (0);
while(true){
if((i__17326__auto___51234 < len__17325__auto___51233)){
args51230.push((arguments[i__17326__auto___51234]));

var G__51235 = (i__17326__auto___51234 + (1));
i__17326__auto___51234 = G__51235;
continue;
} else {
}
break;
}

var G__51232 = args51230.length;
switch (G__51232) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51230.length)].join('')));

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
var args51237 = [];
var len__17325__auto___51308 = arguments.length;
var i__17326__auto___51309 = (0);
while(true){
if((i__17326__auto___51309 < len__17325__auto___51308)){
args51237.push((arguments[i__17326__auto___51309]));

var G__51310 = (i__17326__auto___51309 + (1));
i__17326__auto___51309 = G__51310;
continue;
} else {
}
break;
}

var G__51239 = args51237.length;
switch (G__51239) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51237.length)].join('')));

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
var c__19920__auto___51312 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___51312,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___51312,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_51278){
var state_val_51279 = (state_51278[(1)]);
if((state_val_51279 === (7))){
var state_51278__$1 = state_51278;
var statearr_51280_51313 = state_51278__$1;
(statearr_51280_51313[(2)] = null);

(statearr_51280_51313[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51279 === (1))){
var state_51278__$1 = state_51278;
var statearr_51281_51314 = state_51278__$1;
(statearr_51281_51314[(2)] = null);

(statearr_51281_51314[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51279 === (4))){
var inst_51242 = (state_51278[(7)]);
var inst_51244 = (inst_51242 < cnt);
var state_51278__$1 = state_51278;
if(cljs.core.truth_(inst_51244)){
var statearr_51282_51315 = state_51278__$1;
(statearr_51282_51315[(1)] = (6));

} else {
var statearr_51283_51316 = state_51278__$1;
(statearr_51283_51316[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51279 === (15))){
var inst_51274 = (state_51278[(2)]);
var state_51278__$1 = state_51278;
var statearr_51284_51317 = state_51278__$1;
(statearr_51284_51317[(2)] = inst_51274);

(statearr_51284_51317[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51279 === (13))){
var inst_51267 = cljs.core.async.close_BANG_.call(null,out);
var state_51278__$1 = state_51278;
var statearr_51285_51318 = state_51278__$1;
(statearr_51285_51318[(2)] = inst_51267);

(statearr_51285_51318[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51279 === (6))){
var state_51278__$1 = state_51278;
var statearr_51286_51319 = state_51278__$1;
(statearr_51286_51319[(2)] = null);

(statearr_51286_51319[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51279 === (3))){
var inst_51276 = (state_51278[(2)]);
var state_51278__$1 = state_51278;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_51278__$1,inst_51276);
} else {
if((state_val_51279 === (12))){
var inst_51264 = (state_51278[(8)]);
var inst_51264__$1 = (state_51278[(2)]);
var inst_51265 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_51264__$1);
var state_51278__$1 = (function (){var statearr_51287 = state_51278;
(statearr_51287[(8)] = inst_51264__$1);

return statearr_51287;
})();
if(cljs.core.truth_(inst_51265)){
var statearr_51288_51320 = state_51278__$1;
(statearr_51288_51320[(1)] = (13));

} else {
var statearr_51289_51321 = state_51278__$1;
(statearr_51289_51321[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51279 === (2))){
var inst_51241 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_51242 = (0);
var state_51278__$1 = (function (){var statearr_51290 = state_51278;
(statearr_51290[(7)] = inst_51242);

(statearr_51290[(9)] = inst_51241);

return statearr_51290;
})();
var statearr_51291_51322 = state_51278__$1;
(statearr_51291_51322[(2)] = null);

(statearr_51291_51322[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51279 === (11))){
var inst_51242 = (state_51278[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_51278,(10),Object,null,(9));
var inst_51251 = chs__$1.call(null,inst_51242);
var inst_51252 = done.call(null,inst_51242);
var inst_51253 = cljs.core.async.take_BANG_.call(null,inst_51251,inst_51252);
var state_51278__$1 = state_51278;
var statearr_51292_51323 = state_51278__$1;
(statearr_51292_51323[(2)] = inst_51253);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_51278__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51279 === (9))){
var inst_51242 = (state_51278[(7)]);
var inst_51255 = (state_51278[(2)]);
var inst_51256 = (inst_51242 + (1));
var inst_51242__$1 = inst_51256;
var state_51278__$1 = (function (){var statearr_51293 = state_51278;
(statearr_51293[(7)] = inst_51242__$1);

(statearr_51293[(10)] = inst_51255);

return statearr_51293;
})();
var statearr_51294_51324 = state_51278__$1;
(statearr_51294_51324[(2)] = null);

(statearr_51294_51324[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51279 === (5))){
var inst_51262 = (state_51278[(2)]);
var state_51278__$1 = (function (){var statearr_51295 = state_51278;
(statearr_51295[(11)] = inst_51262);

return statearr_51295;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_51278__$1,(12),dchan);
} else {
if((state_val_51279 === (14))){
var inst_51264 = (state_51278[(8)]);
var inst_51269 = cljs.core.apply.call(null,f,inst_51264);
var state_51278__$1 = state_51278;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_51278__$1,(16),out,inst_51269);
} else {
if((state_val_51279 === (16))){
var inst_51271 = (state_51278[(2)]);
var state_51278__$1 = (function (){var statearr_51296 = state_51278;
(statearr_51296[(12)] = inst_51271);

return statearr_51296;
})();
var statearr_51297_51325 = state_51278__$1;
(statearr_51297_51325[(2)] = null);

(statearr_51297_51325[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51279 === (10))){
var inst_51246 = (state_51278[(2)]);
var inst_51247 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_51278__$1 = (function (){var statearr_51298 = state_51278;
(statearr_51298[(13)] = inst_51246);

return statearr_51298;
})();
var statearr_51299_51326 = state_51278__$1;
(statearr_51299_51326[(2)] = inst_51247);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_51278__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51279 === (8))){
var inst_51260 = (state_51278[(2)]);
var state_51278__$1 = state_51278;
var statearr_51300_51327 = state_51278__$1;
(statearr_51300_51327[(2)] = inst_51260);

(statearr_51300_51327[(1)] = (5));


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
});})(c__19920__auto___51312,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__19855__auto__,c__19920__auto___51312,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__19856__auto__ = null;
var cljs$core$async$state_machine__19856__auto____0 = (function (){
var statearr_51304 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_51304[(0)] = cljs$core$async$state_machine__19856__auto__);

(statearr_51304[(1)] = (1));

return statearr_51304;
});
var cljs$core$async$state_machine__19856__auto____1 = (function (state_51278){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_51278);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e51305){if((e51305 instanceof Object)){
var ex__19859__auto__ = e51305;
var statearr_51306_51328 = state_51278;
(statearr_51306_51328[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_51278);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e51305;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__51329 = state_51278;
state_51278 = G__51329;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$state_machine__19856__auto__ = function(state_51278){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19856__auto____1.call(this,state_51278);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19856__auto____0;
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19856__auto____1;
return cljs$core$async$state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___51312,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__19922__auto__ = (function (){var statearr_51307 = f__19921__auto__.call(null);
(statearr_51307[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___51312);

return statearr_51307;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___51312,chs__$1,out,cnt,rets,dchan,dctr,done))
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
var args51331 = [];
var len__17325__auto___51387 = arguments.length;
var i__17326__auto___51388 = (0);
while(true){
if((i__17326__auto___51388 < len__17325__auto___51387)){
args51331.push((arguments[i__17326__auto___51388]));

var G__51389 = (i__17326__auto___51388 + (1));
i__17326__auto___51388 = G__51389;
continue;
} else {
}
break;
}

var G__51333 = args51331.length;
switch (G__51333) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51331.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19920__auto___51391 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___51391,out){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___51391,out){
return (function (state_51363){
var state_val_51364 = (state_51363[(1)]);
if((state_val_51364 === (7))){
var inst_51342 = (state_51363[(7)]);
var inst_51343 = (state_51363[(8)]);
var inst_51342__$1 = (state_51363[(2)]);
var inst_51343__$1 = cljs.core.nth.call(null,inst_51342__$1,(0),null);
var inst_51344 = cljs.core.nth.call(null,inst_51342__$1,(1),null);
var inst_51345 = (inst_51343__$1 == null);
var state_51363__$1 = (function (){var statearr_51365 = state_51363;
(statearr_51365[(9)] = inst_51344);

(statearr_51365[(7)] = inst_51342__$1);

(statearr_51365[(8)] = inst_51343__$1);

return statearr_51365;
})();
if(cljs.core.truth_(inst_51345)){
var statearr_51366_51392 = state_51363__$1;
(statearr_51366_51392[(1)] = (8));

} else {
var statearr_51367_51393 = state_51363__$1;
(statearr_51367_51393[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51364 === (1))){
var inst_51334 = cljs.core.vec.call(null,chs);
var inst_51335 = inst_51334;
var state_51363__$1 = (function (){var statearr_51368 = state_51363;
(statearr_51368[(10)] = inst_51335);

return statearr_51368;
})();
var statearr_51369_51394 = state_51363__$1;
(statearr_51369_51394[(2)] = null);

(statearr_51369_51394[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51364 === (4))){
var inst_51335 = (state_51363[(10)]);
var state_51363__$1 = state_51363;
return cljs.core.async.ioc_alts_BANG_.call(null,state_51363__$1,(7),inst_51335);
} else {
if((state_val_51364 === (6))){
var inst_51359 = (state_51363[(2)]);
var state_51363__$1 = state_51363;
var statearr_51370_51395 = state_51363__$1;
(statearr_51370_51395[(2)] = inst_51359);

(statearr_51370_51395[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51364 === (3))){
var inst_51361 = (state_51363[(2)]);
var state_51363__$1 = state_51363;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_51363__$1,inst_51361);
} else {
if((state_val_51364 === (2))){
var inst_51335 = (state_51363[(10)]);
var inst_51337 = cljs.core.count.call(null,inst_51335);
var inst_51338 = (inst_51337 > (0));
var state_51363__$1 = state_51363;
if(cljs.core.truth_(inst_51338)){
var statearr_51372_51396 = state_51363__$1;
(statearr_51372_51396[(1)] = (4));

} else {
var statearr_51373_51397 = state_51363__$1;
(statearr_51373_51397[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51364 === (11))){
var inst_51335 = (state_51363[(10)]);
var inst_51352 = (state_51363[(2)]);
var tmp51371 = inst_51335;
var inst_51335__$1 = tmp51371;
var state_51363__$1 = (function (){var statearr_51374 = state_51363;
(statearr_51374[(11)] = inst_51352);

(statearr_51374[(10)] = inst_51335__$1);

return statearr_51374;
})();
var statearr_51375_51398 = state_51363__$1;
(statearr_51375_51398[(2)] = null);

(statearr_51375_51398[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51364 === (9))){
var inst_51343 = (state_51363[(8)]);
var state_51363__$1 = state_51363;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_51363__$1,(11),out,inst_51343);
} else {
if((state_val_51364 === (5))){
var inst_51357 = cljs.core.async.close_BANG_.call(null,out);
var state_51363__$1 = state_51363;
var statearr_51376_51399 = state_51363__$1;
(statearr_51376_51399[(2)] = inst_51357);

(statearr_51376_51399[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51364 === (10))){
var inst_51355 = (state_51363[(2)]);
var state_51363__$1 = state_51363;
var statearr_51377_51400 = state_51363__$1;
(statearr_51377_51400[(2)] = inst_51355);

(statearr_51377_51400[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51364 === (8))){
var inst_51344 = (state_51363[(9)]);
var inst_51342 = (state_51363[(7)]);
var inst_51343 = (state_51363[(8)]);
var inst_51335 = (state_51363[(10)]);
var inst_51347 = (function (){var cs = inst_51335;
var vec__51340 = inst_51342;
var v = inst_51343;
var c = inst_51344;
return ((function (cs,vec__51340,v,c,inst_51344,inst_51342,inst_51343,inst_51335,state_val_51364,c__19920__auto___51391,out){
return (function (p1__51330_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__51330_SHARP_);
});
;})(cs,vec__51340,v,c,inst_51344,inst_51342,inst_51343,inst_51335,state_val_51364,c__19920__auto___51391,out))
})();
var inst_51348 = cljs.core.filterv.call(null,inst_51347,inst_51335);
var inst_51335__$1 = inst_51348;
var state_51363__$1 = (function (){var statearr_51378 = state_51363;
(statearr_51378[(10)] = inst_51335__$1);

return statearr_51378;
})();
var statearr_51379_51401 = state_51363__$1;
(statearr_51379_51401[(2)] = null);

(statearr_51379_51401[(1)] = (2));


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
});})(c__19920__auto___51391,out))
;
return ((function (switch__19855__auto__,c__19920__auto___51391,out){
return (function() {
var cljs$core$async$state_machine__19856__auto__ = null;
var cljs$core$async$state_machine__19856__auto____0 = (function (){
var statearr_51383 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_51383[(0)] = cljs$core$async$state_machine__19856__auto__);

(statearr_51383[(1)] = (1));

return statearr_51383;
});
var cljs$core$async$state_machine__19856__auto____1 = (function (state_51363){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_51363);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e51384){if((e51384 instanceof Object)){
var ex__19859__auto__ = e51384;
var statearr_51385_51402 = state_51363;
(statearr_51385_51402[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_51363);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e51384;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__51403 = state_51363;
state_51363 = G__51403;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$state_machine__19856__auto__ = function(state_51363){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19856__auto____1.call(this,state_51363);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19856__auto____0;
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19856__auto____1;
return cljs$core$async$state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___51391,out))
})();
var state__19922__auto__ = (function (){var statearr_51386 = f__19921__auto__.call(null);
(statearr_51386[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___51391);

return statearr_51386;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___51391,out))
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
var args51404 = [];
var len__17325__auto___51453 = arguments.length;
var i__17326__auto___51454 = (0);
while(true){
if((i__17326__auto___51454 < len__17325__auto___51453)){
args51404.push((arguments[i__17326__auto___51454]));

var G__51455 = (i__17326__auto___51454 + (1));
i__17326__auto___51454 = G__51455;
continue;
} else {
}
break;
}

var G__51406 = args51404.length;
switch (G__51406) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51404.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19920__auto___51457 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___51457,out){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___51457,out){
return (function (state_51430){
var state_val_51431 = (state_51430[(1)]);
if((state_val_51431 === (7))){
var inst_51412 = (state_51430[(7)]);
var inst_51412__$1 = (state_51430[(2)]);
var inst_51413 = (inst_51412__$1 == null);
var inst_51414 = cljs.core.not.call(null,inst_51413);
var state_51430__$1 = (function (){var statearr_51432 = state_51430;
(statearr_51432[(7)] = inst_51412__$1);

return statearr_51432;
})();
if(inst_51414){
var statearr_51433_51458 = state_51430__$1;
(statearr_51433_51458[(1)] = (8));

} else {
var statearr_51434_51459 = state_51430__$1;
(statearr_51434_51459[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51431 === (1))){
var inst_51407 = (0);
var state_51430__$1 = (function (){var statearr_51435 = state_51430;
(statearr_51435[(8)] = inst_51407);

return statearr_51435;
})();
var statearr_51436_51460 = state_51430__$1;
(statearr_51436_51460[(2)] = null);

(statearr_51436_51460[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51431 === (4))){
var state_51430__$1 = state_51430;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_51430__$1,(7),ch);
} else {
if((state_val_51431 === (6))){
var inst_51425 = (state_51430[(2)]);
var state_51430__$1 = state_51430;
var statearr_51437_51461 = state_51430__$1;
(statearr_51437_51461[(2)] = inst_51425);

(statearr_51437_51461[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51431 === (3))){
var inst_51427 = (state_51430[(2)]);
var inst_51428 = cljs.core.async.close_BANG_.call(null,out);
var state_51430__$1 = (function (){var statearr_51438 = state_51430;
(statearr_51438[(9)] = inst_51427);

return statearr_51438;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_51430__$1,inst_51428);
} else {
if((state_val_51431 === (2))){
var inst_51407 = (state_51430[(8)]);
var inst_51409 = (inst_51407 < n);
var state_51430__$1 = state_51430;
if(cljs.core.truth_(inst_51409)){
var statearr_51439_51462 = state_51430__$1;
(statearr_51439_51462[(1)] = (4));

} else {
var statearr_51440_51463 = state_51430__$1;
(statearr_51440_51463[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51431 === (11))){
var inst_51407 = (state_51430[(8)]);
var inst_51417 = (state_51430[(2)]);
var inst_51418 = (inst_51407 + (1));
var inst_51407__$1 = inst_51418;
var state_51430__$1 = (function (){var statearr_51441 = state_51430;
(statearr_51441[(10)] = inst_51417);

(statearr_51441[(8)] = inst_51407__$1);

return statearr_51441;
})();
var statearr_51442_51464 = state_51430__$1;
(statearr_51442_51464[(2)] = null);

(statearr_51442_51464[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51431 === (9))){
var state_51430__$1 = state_51430;
var statearr_51443_51465 = state_51430__$1;
(statearr_51443_51465[(2)] = null);

(statearr_51443_51465[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51431 === (5))){
var state_51430__$1 = state_51430;
var statearr_51444_51466 = state_51430__$1;
(statearr_51444_51466[(2)] = null);

(statearr_51444_51466[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51431 === (10))){
var inst_51422 = (state_51430[(2)]);
var state_51430__$1 = state_51430;
var statearr_51445_51467 = state_51430__$1;
(statearr_51445_51467[(2)] = inst_51422);

(statearr_51445_51467[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51431 === (8))){
var inst_51412 = (state_51430[(7)]);
var state_51430__$1 = state_51430;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_51430__$1,(11),out,inst_51412);
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
});})(c__19920__auto___51457,out))
;
return ((function (switch__19855__auto__,c__19920__auto___51457,out){
return (function() {
var cljs$core$async$state_machine__19856__auto__ = null;
var cljs$core$async$state_machine__19856__auto____0 = (function (){
var statearr_51449 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_51449[(0)] = cljs$core$async$state_machine__19856__auto__);

(statearr_51449[(1)] = (1));

return statearr_51449;
});
var cljs$core$async$state_machine__19856__auto____1 = (function (state_51430){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_51430);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e51450){if((e51450 instanceof Object)){
var ex__19859__auto__ = e51450;
var statearr_51451_51468 = state_51430;
(statearr_51451_51468[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_51430);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e51450;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__51469 = state_51430;
state_51430 = G__51469;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$state_machine__19856__auto__ = function(state_51430){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19856__auto____1.call(this,state_51430);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19856__auto____0;
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19856__auto____1;
return cljs$core$async$state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___51457,out))
})();
var state__19922__auto__ = (function (){var statearr_51452 = f__19921__auto__.call(null);
(statearr_51452[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___51457);

return statearr_51452;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___51457,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async51477 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async51477 = (function (map_LT_,f,ch,meta51478){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta51478 = meta51478;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async51477.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_51479,meta51478__$1){
var self__ = this;
var _51479__$1 = this;
return (new cljs.core.async.t_cljs$core$async51477(self__.map_LT_,self__.f,self__.ch,meta51478__$1));
});

cljs.core.async.t_cljs$core$async51477.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_51479){
var self__ = this;
var _51479__$1 = this;
return self__.meta51478;
});

cljs.core.async.t_cljs$core$async51477.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async51477.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async51477.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async51477.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async51477.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async51480 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async51480 = (function (map_LT_,f,ch,meta51478,_,fn1,meta51481){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta51478 = meta51478;
this._ = _;
this.fn1 = fn1;
this.meta51481 = meta51481;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async51480.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_51482,meta51481__$1){
var self__ = this;
var _51482__$1 = this;
return (new cljs.core.async.t_cljs$core$async51480(self__.map_LT_,self__.f,self__.ch,self__.meta51478,self__._,self__.fn1,meta51481__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async51480.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_51482){
var self__ = this;
var _51482__$1 = this;
return self__.meta51481;
});})(___$1))
;

cljs.core.async.t_cljs$core$async51480.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async51480.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async51480.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__51470_SHARP_){
return f1.call(null,(((p1__51470_SHARP_ == null))?null:self__.f.call(null,p1__51470_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async51480.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta51478","meta51478",1509234011,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async51477","cljs.core.async/t_cljs$core$async51477",1763283022,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta51481","meta51481",901966851,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async51480.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async51480.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async51480";

cljs.core.async.t_cljs$core$async51480.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async51480");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async51480 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async51480(map_LT___$1,f__$1,ch__$1,meta51478__$1,___$2,fn1__$1,meta51481){
return (new cljs.core.async.t_cljs$core$async51480(map_LT___$1,f__$1,ch__$1,meta51478__$1,___$2,fn1__$1,meta51481));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async51480(self__.map_LT_,self__.f,self__.ch,self__.meta51478,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
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

cljs.core.async.t_cljs$core$async51477.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async51477.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async51477.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta51478","meta51478",1509234011,null)], null);
});

cljs.core.async.t_cljs$core$async51477.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async51477.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async51477";

cljs.core.async.t_cljs$core$async51477.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async51477");
});

cljs.core.async.__GT_t_cljs$core$async51477 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async51477(map_LT___$1,f__$1,ch__$1,meta51478){
return (new cljs.core.async.t_cljs$core$async51477(map_LT___$1,f__$1,ch__$1,meta51478));
});

}

return (new cljs.core.async.t_cljs$core$async51477(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async51486 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async51486 = (function (map_GT_,f,ch,meta51487){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta51487 = meta51487;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async51486.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_51488,meta51487__$1){
var self__ = this;
var _51488__$1 = this;
return (new cljs.core.async.t_cljs$core$async51486(self__.map_GT_,self__.f,self__.ch,meta51487__$1));
});

cljs.core.async.t_cljs$core$async51486.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_51488){
var self__ = this;
var _51488__$1 = this;
return self__.meta51487;
});

cljs.core.async.t_cljs$core$async51486.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async51486.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async51486.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async51486.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async51486.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async51486.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async51486.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta51487","meta51487",1828048948,null)], null);
});

cljs.core.async.t_cljs$core$async51486.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async51486.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async51486";

cljs.core.async.t_cljs$core$async51486.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async51486");
});

cljs.core.async.__GT_t_cljs$core$async51486 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async51486(map_GT___$1,f__$1,ch__$1,meta51487){
return (new cljs.core.async.t_cljs$core$async51486(map_GT___$1,f__$1,ch__$1,meta51487));
});

}

return (new cljs.core.async.t_cljs$core$async51486(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async51492 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async51492 = (function (filter_GT_,p,ch,meta51493){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta51493 = meta51493;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async51492.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_51494,meta51493__$1){
var self__ = this;
var _51494__$1 = this;
return (new cljs.core.async.t_cljs$core$async51492(self__.filter_GT_,self__.p,self__.ch,meta51493__$1));
});

cljs.core.async.t_cljs$core$async51492.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_51494){
var self__ = this;
var _51494__$1 = this;
return self__.meta51493;
});

cljs.core.async.t_cljs$core$async51492.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async51492.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async51492.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async51492.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async51492.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async51492.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async51492.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async51492.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta51493","meta51493",-1255446504,null)], null);
});

cljs.core.async.t_cljs$core$async51492.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async51492.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async51492";

cljs.core.async.t_cljs$core$async51492.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async51492");
});

cljs.core.async.__GT_t_cljs$core$async51492 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async51492(filter_GT___$1,p__$1,ch__$1,meta51493){
return (new cljs.core.async.t_cljs$core$async51492(filter_GT___$1,p__$1,ch__$1,meta51493));
});

}

return (new cljs.core.async.t_cljs$core$async51492(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
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
var args51495 = [];
var len__17325__auto___51539 = arguments.length;
var i__17326__auto___51540 = (0);
while(true){
if((i__17326__auto___51540 < len__17325__auto___51539)){
args51495.push((arguments[i__17326__auto___51540]));

var G__51541 = (i__17326__auto___51540 + (1));
i__17326__auto___51540 = G__51541;
continue;
} else {
}
break;
}

var G__51497 = args51495.length;
switch (G__51497) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51495.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19920__auto___51543 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___51543,out){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___51543,out){
return (function (state_51518){
var state_val_51519 = (state_51518[(1)]);
if((state_val_51519 === (7))){
var inst_51514 = (state_51518[(2)]);
var state_51518__$1 = state_51518;
var statearr_51520_51544 = state_51518__$1;
(statearr_51520_51544[(2)] = inst_51514);

(statearr_51520_51544[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51519 === (1))){
var state_51518__$1 = state_51518;
var statearr_51521_51545 = state_51518__$1;
(statearr_51521_51545[(2)] = null);

(statearr_51521_51545[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51519 === (4))){
var inst_51500 = (state_51518[(7)]);
var inst_51500__$1 = (state_51518[(2)]);
var inst_51501 = (inst_51500__$1 == null);
var state_51518__$1 = (function (){var statearr_51522 = state_51518;
(statearr_51522[(7)] = inst_51500__$1);

return statearr_51522;
})();
if(cljs.core.truth_(inst_51501)){
var statearr_51523_51546 = state_51518__$1;
(statearr_51523_51546[(1)] = (5));

} else {
var statearr_51524_51547 = state_51518__$1;
(statearr_51524_51547[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51519 === (6))){
var inst_51500 = (state_51518[(7)]);
var inst_51505 = p.call(null,inst_51500);
var state_51518__$1 = state_51518;
if(cljs.core.truth_(inst_51505)){
var statearr_51525_51548 = state_51518__$1;
(statearr_51525_51548[(1)] = (8));

} else {
var statearr_51526_51549 = state_51518__$1;
(statearr_51526_51549[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51519 === (3))){
var inst_51516 = (state_51518[(2)]);
var state_51518__$1 = state_51518;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_51518__$1,inst_51516);
} else {
if((state_val_51519 === (2))){
var state_51518__$1 = state_51518;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_51518__$1,(4),ch);
} else {
if((state_val_51519 === (11))){
var inst_51508 = (state_51518[(2)]);
var state_51518__$1 = state_51518;
var statearr_51527_51550 = state_51518__$1;
(statearr_51527_51550[(2)] = inst_51508);

(statearr_51527_51550[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51519 === (9))){
var state_51518__$1 = state_51518;
var statearr_51528_51551 = state_51518__$1;
(statearr_51528_51551[(2)] = null);

(statearr_51528_51551[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51519 === (5))){
var inst_51503 = cljs.core.async.close_BANG_.call(null,out);
var state_51518__$1 = state_51518;
var statearr_51529_51552 = state_51518__$1;
(statearr_51529_51552[(2)] = inst_51503);

(statearr_51529_51552[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51519 === (10))){
var inst_51511 = (state_51518[(2)]);
var state_51518__$1 = (function (){var statearr_51530 = state_51518;
(statearr_51530[(8)] = inst_51511);

return statearr_51530;
})();
var statearr_51531_51553 = state_51518__$1;
(statearr_51531_51553[(2)] = null);

(statearr_51531_51553[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51519 === (8))){
var inst_51500 = (state_51518[(7)]);
var state_51518__$1 = state_51518;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_51518__$1,(11),out,inst_51500);
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
});})(c__19920__auto___51543,out))
;
return ((function (switch__19855__auto__,c__19920__auto___51543,out){
return (function() {
var cljs$core$async$state_machine__19856__auto__ = null;
var cljs$core$async$state_machine__19856__auto____0 = (function (){
var statearr_51535 = [null,null,null,null,null,null,null,null,null];
(statearr_51535[(0)] = cljs$core$async$state_machine__19856__auto__);

(statearr_51535[(1)] = (1));

return statearr_51535;
});
var cljs$core$async$state_machine__19856__auto____1 = (function (state_51518){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_51518);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e51536){if((e51536 instanceof Object)){
var ex__19859__auto__ = e51536;
var statearr_51537_51554 = state_51518;
(statearr_51537_51554[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_51518);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e51536;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__51555 = state_51518;
state_51518 = G__51555;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$state_machine__19856__auto__ = function(state_51518){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19856__auto____1.call(this,state_51518);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19856__auto____0;
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19856__auto____1;
return cljs$core$async$state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___51543,out))
})();
var state__19922__auto__ = (function (){var statearr_51538 = f__19921__auto__.call(null);
(statearr_51538[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___51543);

return statearr_51538;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___51543,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args51556 = [];
var len__17325__auto___51559 = arguments.length;
var i__17326__auto___51560 = (0);
while(true){
if((i__17326__auto___51560 < len__17325__auto___51559)){
args51556.push((arguments[i__17326__auto___51560]));

var G__51561 = (i__17326__auto___51560 + (1));
i__17326__auto___51560 = G__51561;
continue;
} else {
}
break;
}

var G__51558 = args51556.length;
switch (G__51558) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51556.length)].join('')));

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
var c__19920__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto__){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto__){
return (function (state_51728){
var state_val_51729 = (state_51728[(1)]);
if((state_val_51729 === (7))){
var inst_51724 = (state_51728[(2)]);
var state_51728__$1 = state_51728;
var statearr_51730_51771 = state_51728__$1;
(statearr_51730_51771[(2)] = inst_51724);

(statearr_51730_51771[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (20))){
var inst_51694 = (state_51728[(7)]);
var inst_51705 = (state_51728[(2)]);
var inst_51706 = cljs.core.next.call(null,inst_51694);
var inst_51680 = inst_51706;
var inst_51681 = null;
var inst_51682 = (0);
var inst_51683 = (0);
var state_51728__$1 = (function (){var statearr_51731 = state_51728;
(statearr_51731[(8)] = inst_51681);

(statearr_51731[(9)] = inst_51683);

(statearr_51731[(10)] = inst_51705);

(statearr_51731[(11)] = inst_51682);

(statearr_51731[(12)] = inst_51680);

return statearr_51731;
})();
var statearr_51732_51772 = state_51728__$1;
(statearr_51732_51772[(2)] = null);

(statearr_51732_51772[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (1))){
var state_51728__$1 = state_51728;
var statearr_51733_51773 = state_51728__$1;
(statearr_51733_51773[(2)] = null);

(statearr_51733_51773[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (4))){
var inst_51669 = (state_51728[(13)]);
var inst_51669__$1 = (state_51728[(2)]);
var inst_51670 = (inst_51669__$1 == null);
var state_51728__$1 = (function (){var statearr_51734 = state_51728;
(statearr_51734[(13)] = inst_51669__$1);

return statearr_51734;
})();
if(cljs.core.truth_(inst_51670)){
var statearr_51735_51774 = state_51728__$1;
(statearr_51735_51774[(1)] = (5));

} else {
var statearr_51736_51775 = state_51728__$1;
(statearr_51736_51775[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (15))){
var state_51728__$1 = state_51728;
var statearr_51740_51776 = state_51728__$1;
(statearr_51740_51776[(2)] = null);

(statearr_51740_51776[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (21))){
var state_51728__$1 = state_51728;
var statearr_51741_51777 = state_51728__$1;
(statearr_51741_51777[(2)] = null);

(statearr_51741_51777[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (13))){
var inst_51681 = (state_51728[(8)]);
var inst_51683 = (state_51728[(9)]);
var inst_51682 = (state_51728[(11)]);
var inst_51680 = (state_51728[(12)]);
var inst_51690 = (state_51728[(2)]);
var inst_51691 = (inst_51683 + (1));
var tmp51737 = inst_51681;
var tmp51738 = inst_51682;
var tmp51739 = inst_51680;
var inst_51680__$1 = tmp51739;
var inst_51681__$1 = tmp51737;
var inst_51682__$1 = tmp51738;
var inst_51683__$1 = inst_51691;
var state_51728__$1 = (function (){var statearr_51742 = state_51728;
(statearr_51742[(8)] = inst_51681__$1);

(statearr_51742[(9)] = inst_51683__$1);

(statearr_51742[(11)] = inst_51682__$1);

(statearr_51742[(14)] = inst_51690);

(statearr_51742[(12)] = inst_51680__$1);

return statearr_51742;
})();
var statearr_51743_51778 = state_51728__$1;
(statearr_51743_51778[(2)] = null);

(statearr_51743_51778[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (22))){
var state_51728__$1 = state_51728;
var statearr_51744_51779 = state_51728__$1;
(statearr_51744_51779[(2)] = null);

(statearr_51744_51779[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (6))){
var inst_51669 = (state_51728[(13)]);
var inst_51678 = f.call(null,inst_51669);
var inst_51679 = cljs.core.seq.call(null,inst_51678);
var inst_51680 = inst_51679;
var inst_51681 = null;
var inst_51682 = (0);
var inst_51683 = (0);
var state_51728__$1 = (function (){var statearr_51745 = state_51728;
(statearr_51745[(8)] = inst_51681);

(statearr_51745[(9)] = inst_51683);

(statearr_51745[(11)] = inst_51682);

(statearr_51745[(12)] = inst_51680);

return statearr_51745;
})();
var statearr_51746_51780 = state_51728__$1;
(statearr_51746_51780[(2)] = null);

(statearr_51746_51780[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (17))){
var inst_51694 = (state_51728[(7)]);
var inst_51698 = cljs.core.chunk_first.call(null,inst_51694);
var inst_51699 = cljs.core.chunk_rest.call(null,inst_51694);
var inst_51700 = cljs.core.count.call(null,inst_51698);
var inst_51680 = inst_51699;
var inst_51681 = inst_51698;
var inst_51682 = inst_51700;
var inst_51683 = (0);
var state_51728__$1 = (function (){var statearr_51747 = state_51728;
(statearr_51747[(8)] = inst_51681);

(statearr_51747[(9)] = inst_51683);

(statearr_51747[(11)] = inst_51682);

(statearr_51747[(12)] = inst_51680);

return statearr_51747;
})();
var statearr_51748_51781 = state_51728__$1;
(statearr_51748_51781[(2)] = null);

(statearr_51748_51781[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (3))){
var inst_51726 = (state_51728[(2)]);
var state_51728__$1 = state_51728;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_51728__$1,inst_51726);
} else {
if((state_val_51729 === (12))){
var inst_51714 = (state_51728[(2)]);
var state_51728__$1 = state_51728;
var statearr_51749_51782 = state_51728__$1;
(statearr_51749_51782[(2)] = inst_51714);

(statearr_51749_51782[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (2))){
var state_51728__$1 = state_51728;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_51728__$1,(4),in$);
} else {
if((state_val_51729 === (23))){
var inst_51722 = (state_51728[(2)]);
var state_51728__$1 = state_51728;
var statearr_51750_51783 = state_51728__$1;
(statearr_51750_51783[(2)] = inst_51722);

(statearr_51750_51783[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (19))){
var inst_51709 = (state_51728[(2)]);
var state_51728__$1 = state_51728;
var statearr_51751_51784 = state_51728__$1;
(statearr_51751_51784[(2)] = inst_51709);

(statearr_51751_51784[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (11))){
var inst_51694 = (state_51728[(7)]);
var inst_51680 = (state_51728[(12)]);
var inst_51694__$1 = cljs.core.seq.call(null,inst_51680);
var state_51728__$1 = (function (){var statearr_51752 = state_51728;
(statearr_51752[(7)] = inst_51694__$1);

return statearr_51752;
})();
if(inst_51694__$1){
var statearr_51753_51785 = state_51728__$1;
(statearr_51753_51785[(1)] = (14));

} else {
var statearr_51754_51786 = state_51728__$1;
(statearr_51754_51786[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (9))){
var inst_51716 = (state_51728[(2)]);
var inst_51717 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_51728__$1 = (function (){var statearr_51755 = state_51728;
(statearr_51755[(15)] = inst_51716);

return statearr_51755;
})();
if(cljs.core.truth_(inst_51717)){
var statearr_51756_51787 = state_51728__$1;
(statearr_51756_51787[(1)] = (21));

} else {
var statearr_51757_51788 = state_51728__$1;
(statearr_51757_51788[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (5))){
var inst_51672 = cljs.core.async.close_BANG_.call(null,out);
var state_51728__$1 = state_51728;
var statearr_51758_51789 = state_51728__$1;
(statearr_51758_51789[(2)] = inst_51672);

(statearr_51758_51789[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (14))){
var inst_51694 = (state_51728[(7)]);
var inst_51696 = cljs.core.chunked_seq_QMARK_.call(null,inst_51694);
var state_51728__$1 = state_51728;
if(inst_51696){
var statearr_51759_51790 = state_51728__$1;
(statearr_51759_51790[(1)] = (17));

} else {
var statearr_51760_51791 = state_51728__$1;
(statearr_51760_51791[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (16))){
var inst_51712 = (state_51728[(2)]);
var state_51728__$1 = state_51728;
var statearr_51761_51792 = state_51728__$1;
(statearr_51761_51792[(2)] = inst_51712);

(statearr_51761_51792[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51729 === (10))){
var inst_51681 = (state_51728[(8)]);
var inst_51683 = (state_51728[(9)]);
var inst_51688 = cljs.core._nth.call(null,inst_51681,inst_51683);
var state_51728__$1 = state_51728;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_51728__$1,(13),out,inst_51688);
} else {
if((state_val_51729 === (18))){
var inst_51694 = (state_51728[(7)]);
var inst_51703 = cljs.core.first.call(null,inst_51694);
var state_51728__$1 = state_51728;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_51728__$1,(20),out,inst_51703);
} else {
if((state_val_51729 === (8))){
var inst_51683 = (state_51728[(9)]);
var inst_51682 = (state_51728[(11)]);
var inst_51685 = (inst_51683 < inst_51682);
var inst_51686 = inst_51685;
var state_51728__$1 = state_51728;
if(cljs.core.truth_(inst_51686)){
var statearr_51762_51793 = state_51728__$1;
(statearr_51762_51793[(1)] = (10));

} else {
var statearr_51763_51794 = state_51728__$1;
(statearr_51763_51794[(1)] = (11));

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
});})(c__19920__auto__))
;
return ((function (switch__19855__auto__,c__19920__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__19856__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__19856__auto____0 = (function (){
var statearr_51767 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_51767[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__19856__auto__);

(statearr_51767[(1)] = (1));

return statearr_51767;
});
var cljs$core$async$mapcat_STAR__$_state_machine__19856__auto____1 = (function (state_51728){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_51728);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e51768){if((e51768 instanceof Object)){
var ex__19859__auto__ = e51768;
var statearr_51769_51795 = state_51728;
(statearr_51769_51795[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_51728);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e51768;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__51796 = state_51728;
state_51728 = G__51796;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__19856__auto__ = function(state_51728){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__19856__auto____1.call(this,state_51728);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__19856__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__19856__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto__))
})();
var state__19922__auto__ = (function (){var statearr_51770 = f__19921__auto__.call(null);
(statearr_51770[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto__);

return statearr_51770;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto__))
);

return c__19920__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args51797 = [];
var len__17325__auto___51800 = arguments.length;
var i__17326__auto___51801 = (0);
while(true){
if((i__17326__auto___51801 < len__17325__auto___51800)){
args51797.push((arguments[i__17326__auto___51801]));

var G__51802 = (i__17326__auto___51801 + (1));
i__17326__auto___51801 = G__51802;
continue;
} else {
}
break;
}

var G__51799 = args51797.length;
switch (G__51799) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51797.length)].join('')));

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
var args51804 = [];
var len__17325__auto___51807 = arguments.length;
var i__17326__auto___51808 = (0);
while(true){
if((i__17326__auto___51808 < len__17325__auto___51807)){
args51804.push((arguments[i__17326__auto___51808]));

var G__51809 = (i__17326__auto___51808 + (1));
i__17326__auto___51808 = G__51809;
continue;
} else {
}
break;
}

var G__51806 = args51804.length;
switch (G__51806) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51804.length)].join('')));

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
var args51811 = [];
var len__17325__auto___51862 = arguments.length;
var i__17326__auto___51863 = (0);
while(true){
if((i__17326__auto___51863 < len__17325__auto___51862)){
args51811.push((arguments[i__17326__auto___51863]));

var G__51864 = (i__17326__auto___51863 + (1));
i__17326__auto___51863 = G__51864;
continue;
} else {
}
break;
}

var G__51813 = args51811.length;
switch (G__51813) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51811.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19920__auto___51866 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___51866,out){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___51866,out){
return (function (state_51837){
var state_val_51838 = (state_51837[(1)]);
if((state_val_51838 === (7))){
var inst_51832 = (state_51837[(2)]);
var state_51837__$1 = state_51837;
var statearr_51839_51867 = state_51837__$1;
(statearr_51839_51867[(2)] = inst_51832);

(statearr_51839_51867[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51838 === (1))){
var inst_51814 = null;
var state_51837__$1 = (function (){var statearr_51840 = state_51837;
(statearr_51840[(7)] = inst_51814);

return statearr_51840;
})();
var statearr_51841_51868 = state_51837__$1;
(statearr_51841_51868[(2)] = null);

(statearr_51841_51868[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51838 === (4))){
var inst_51817 = (state_51837[(8)]);
var inst_51817__$1 = (state_51837[(2)]);
var inst_51818 = (inst_51817__$1 == null);
var inst_51819 = cljs.core.not.call(null,inst_51818);
var state_51837__$1 = (function (){var statearr_51842 = state_51837;
(statearr_51842[(8)] = inst_51817__$1);

return statearr_51842;
})();
if(inst_51819){
var statearr_51843_51869 = state_51837__$1;
(statearr_51843_51869[(1)] = (5));

} else {
var statearr_51844_51870 = state_51837__$1;
(statearr_51844_51870[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51838 === (6))){
var state_51837__$1 = state_51837;
var statearr_51845_51871 = state_51837__$1;
(statearr_51845_51871[(2)] = null);

(statearr_51845_51871[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51838 === (3))){
var inst_51834 = (state_51837[(2)]);
var inst_51835 = cljs.core.async.close_BANG_.call(null,out);
var state_51837__$1 = (function (){var statearr_51846 = state_51837;
(statearr_51846[(9)] = inst_51834);

return statearr_51846;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_51837__$1,inst_51835);
} else {
if((state_val_51838 === (2))){
var state_51837__$1 = state_51837;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_51837__$1,(4),ch);
} else {
if((state_val_51838 === (11))){
var inst_51817 = (state_51837[(8)]);
var inst_51826 = (state_51837[(2)]);
var inst_51814 = inst_51817;
var state_51837__$1 = (function (){var statearr_51847 = state_51837;
(statearr_51847[(10)] = inst_51826);

(statearr_51847[(7)] = inst_51814);

return statearr_51847;
})();
var statearr_51848_51872 = state_51837__$1;
(statearr_51848_51872[(2)] = null);

(statearr_51848_51872[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51838 === (9))){
var inst_51817 = (state_51837[(8)]);
var state_51837__$1 = state_51837;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_51837__$1,(11),out,inst_51817);
} else {
if((state_val_51838 === (5))){
var inst_51817 = (state_51837[(8)]);
var inst_51814 = (state_51837[(7)]);
var inst_51821 = cljs.core._EQ_.call(null,inst_51817,inst_51814);
var state_51837__$1 = state_51837;
if(inst_51821){
var statearr_51850_51873 = state_51837__$1;
(statearr_51850_51873[(1)] = (8));

} else {
var statearr_51851_51874 = state_51837__$1;
(statearr_51851_51874[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51838 === (10))){
var inst_51829 = (state_51837[(2)]);
var state_51837__$1 = state_51837;
var statearr_51852_51875 = state_51837__$1;
(statearr_51852_51875[(2)] = inst_51829);

(statearr_51852_51875[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51838 === (8))){
var inst_51814 = (state_51837[(7)]);
var tmp51849 = inst_51814;
var inst_51814__$1 = tmp51849;
var state_51837__$1 = (function (){var statearr_51853 = state_51837;
(statearr_51853[(7)] = inst_51814__$1);

return statearr_51853;
})();
var statearr_51854_51876 = state_51837__$1;
(statearr_51854_51876[(2)] = null);

(statearr_51854_51876[(1)] = (2));


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
});})(c__19920__auto___51866,out))
;
return ((function (switch__19855__auto__,c__19920__auto___51866,out){
return (function() {
var cljs$core$async$state_machine__19856__auto__ = null;
var cljs$core$async$state_machine__19856__auto____0 = (function (){
var statearr_51858 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_51858[(0)] = cljs$core$async$state_machine__19856__auto__);

(statearr_51858[(1)] = (1));

return statearr_51858;
});
var cljs$core$async$state_machine__19856__auto____1 = (function (state_51837){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_51837);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e51859){if((e51859 instanceof Object)){
var ex__19859__auto__ = e51859;
var statearr_51860_51877 = state_51837;
(statearr_51860_51877[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_51837);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e51859;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__51878 = state_51837;
state_51837 = G__51878;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$state_machine__19856__auto__ = function(state_51837){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19856__auto____1.call(this,state_51837);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19856__auto____0;
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19856__auto____1;
return cljs$core$async$state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___51866,out))
})();
var state__19922__auto__ = (function (){var statearr_51861 = f__19921__auto__.call(null);
(statearr_51861[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___51866);

return statearr_51861;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___51866,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args51879 = [];
var len__17325__auto___51949 = arguments.length;
var i__17326__auto___51950 = (0);
while(true){
if((i__17326__auto___51950 < len__17325__auto___51949)){
args51879.push((arguments[i__17326__auto___51950]));

var G__51951 = (i__17326__auto___51950 + (1));
i__17326__auto___51950 = G__51951;
continue;
} else {
}
break;
}

var G__51881 = args51879.length;
switch (G__51881) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51879.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19920__auto___51953 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___51953,out){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___51953,out){
return (function (state_51919){
var state_val_51920 = (state_51919[(1)]);
if((state_val_51920 === (7))){
var inst_51915 = (state_51919[(2)]);
var state_51919__$1 = state_51919;
var statearr_51921_51954 = state_51919__$1;
(statearr_51921_51954[(2)] = inst_51915);

(statearr_51921_51954[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51920 === (1))){
var inst_51882 = (new Array(n));
var inst_51883 = inst_51882;
var inst_51884 = (0);
var state_51919__$1 = (function (){var statearr_51922 = state_51919;
(statearr_51922[(7)] = inst_51883);

(statearr_51922[(8)] = inst_51884);

return statearr_51922;
})();
var statearr_51923_51955 = state_51919__$1;
(statearr_51923_51955[(2)] = null);

(statearr_51923_51955[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51920 === (4))){
var inst_51887 = (state_51919[(9)]);
var inst_51887__$1 = (state_51919[(2)]);
var inst_51888 = (inst_51887__$1 == null);
var inst_51889 = cljs.core.not.call(null,inst_51888);
var state_51919__$1 = (function (){var statearr_51924 = state_51919;
(statearr_51924[(9)] = inst_51887__$1);

return statearr_51924;
})();
if(inst_51889){
var statearr_51925_51956 = state_51919__$1;
(statearr_51925_51956[(1)] = (5));

} else {
var statearr_51926_51957 = state_51919__$1;
(statearr_51926_51957[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51920 === (15))){
var inst_51909 = (state_51919[(2)]);
var state_51919__$1 = state_51919;
var statearr_51927_51958 = state_51919__$1;
(statearr_51927_51958[(2)] = inst_51909);

(statearr_51927_51958[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51920 === (13))){
var state_51919__$1 = state_51919;
var statearr_51928_51959 = state_51919__$1;
(statearr_51928_51959[(2)] = null);

(statearr_51928_51959[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51920 === (6))){
var inst_51884 = (state_51919[(8)]);
var inst_51905 = (inst_51884 > (0));
var state_51919__$1 = state_51919;
if(cljs.core.truth_(inst_51905)){
var statearr_51929_51960 = state_51919__$1;
(statearr_51929_51960[(1)] = (12));

} else {
var statearr_51930_51961 = state_51919__$1;
(statearr_51930_51961[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51920 === (3))){
var inst_51917 = (state_51919[(2)]);
var state_51919__$1 = state_51919;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_51919__$1,inst_51917);
} else {
if((state_val_51920 === (12))){
var inst_51883 = (state_51919[(7)]);
var inst_51907 = cljs.core.vec.call(null,inst_51883);
var state_51919__$1 = state_51919;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_51919__$1,(15),out,inst_51907);
} else {
if((state_val_51920 === (2))){
var state_51919__$1 = state_51919;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_51919__$1,(4),ch);
} else {
if((state_val_51920 === (11))){
var inst_51899 = (state_51919[(2)]);
var inst_51900 = (new Array(n));
var inst_51883 = inst_51900;
var inst_51884 = (0);
var state_51919__$1 = (function (){var statearr_51931 = state_51919;
(statearr_51931[(7)] = inst_51883);

(statearr_51931[(8)] = inst_51884);

(statearr_51931[(10)] = inst_51899);

return statearr_51931;
})();
var statearr_51932_51962 = state_51919__$1;
(statearr_51932_51962[(2)] = null);

(statearr_51932_51962[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51920 === (9))){
var inst_51883 = (state_51919[(7)]);
var inst_51897 = cljs.core.vec.call(null,inst_51883);
var state_51919__$1 = state_51919;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_51919__$1,(11),out,inst_51897);
} else {
if((state_val_51920 === (5))){
var inst_51887 = (state_51919[(9)]);
var inst_51883 = (state_51919[(7)]);
var inst_51884 = (state_51919[(8)]);
var inst_51892 = (state_51919[(11)]);
var inst_51891 = (inst_51883[inst_51884] = inst_51887);
var inst_51892__$1 = (inst_51884 + (1));
var inst_51893 = (inst_51892__$1 < n);
var state_51919__$1 = (function (){var statearr_51933 = state_51919;
(statearr_51933[(11)] = inst_51892__$1);

(statearr_51933[(12)] = inst_51891);

return statearr_51933;
})();
if(cljs.core.truth_(inst_51893)){
var statearr_51934_51963 = state_51919__$1;
(statearr_51934_51963[(1)] = (8));

} else {
var statearr_51935_51964 = state_51919__$1;
(statearr_51935_51964[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51920 === (14))){
var inst_51912 = (state_51919[(2)]);
var inst_51913 = cljs.core.async.close_BANG_.call(null,out);
var state_51919__$1 = (function (){var statearr_51937 = state_51919;
(statearr_51937[(13)] = inst_51912);

return statearr_51937;
})();
var statearr_51938_51965 = state_51919__$1;
(statearr_51938_51965[(2)] = inst_51913);

(statearr_51938_51965[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51920 === (10))){
var inst_51903 = (state_51919[(2)]);
var state_51919__$1 = state_51919;
var statearr_51939_51966 = state_51919__$1;
(statearr_51939_51966[(2)] = inst_51903);

(statearr_51939_51966[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_51920 === (8))){
var inst_51883 = (state_51919[(7)]);
var inst_51892 = (state_51919[(11)]);
var tmp51936 = inst_51883;
var inst_51883__$1 = tmp51936;
var inst_51884 = inst_51892;
var state_51919__$1 = (function (){var statearr_51940 = state_51919;
(statearr_51940[(7)] = inst_51883__$1);

(statearr_51940[(8)] = inst_51884);

return statearr_51940;
})();
var statearr_51941_51967 = state_51919__$1;
(statearr_51941_51967[(2)] = null);

(statearr_51941_51967[(1)] = (2));


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
});})(c__19920__auto___51953,out))
;
return ((function (switch__19855__auto__,c__19920__auto___51953,out){
return (function() {
var cljs$core$async$state_machine__19856__auto__ = null;
var cljs$core$async$state_machine__19856__auto____0 = (function (){
var statearr_51945 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_51945[(0)] = cljs$core$async$state_machine__19856__auto__);

(statearr_51945[(1)] = (1));

return statearr_51945;
});
var cljs$core$async$state_machine__19856__auto____1 = (function (state_51919){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_51919);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e51946){if((e51946 instanceof Object)){
var ex__19859__auto__ = e51946;
var statearr_51947_51968 = state_51919;
(statearr_51947_51968[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_51919);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e51946;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__51969 = state_51919;
state_51919 = G__51969;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$state_machine__19856__auto__ = function(state_51919){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19856__auto____1.call(this,state_51919);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19856__auto____0;
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19856__auto____1;
return cljs$core$async$state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___51953,out))
})();
var state__19922__auto__ = (function (){var statearr_51948 = f__19921__auto__.call(null);
(statearr_51948[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___51953);

return statearr_51948;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___51953,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args51970 = [];
var len__17325__auto___52044 = arguments.length;
var i__17326__auto___52045 = (0);
while(true){
if((i__17326__auto___52045 < len__17325__auto___52044)){
args51970.push((arguments[i__17326__auto___52045]));

var G__52046 = (i__17326__auto___52045 + (1));
i__17326__auto___52045 = G__52046;
continue;
} else {
}
break;
}

var G__51972 = args51970.length;
switch (G__51972) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args51970.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19920__auto___52048 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19920__auto___52048,out){
return (function (){
var f__19921__auto__ = (function (){var switch__19855__auto__ = ((function (c__19920__auto___52048,out){
return (function (state_52014){
var state_val_52015 = (state_52014[(1)]);
if((state_val_52015 === (7))){
var inst_52010 = (state_52014[(2)]);
var state_52014__$1 = state_52014;
var statearr_52016_52049 = state_52014__$1;
(statearr_52016_52049[(2)] = inst_52010);

(statearr_52016_52049[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_52015 === (1))){
var inst_51973 = [];
var inst_51974 = inst_51973;
var inst_51975 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_52014__$1 = (function (){var statearr_52017 = state_52014;
(statearr_52017[(7)] = inst_51974);

(statearr_52017[(8)] = inst_51975);

return statearr_52017;
})();
var statearr_52018_52050 = state_52014__$1;
(statearr_52018_52050[(2)] = null);

(statearr_52018_52050[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_52015 === (4))){
var inst_51978 = (state_52014[(9)]);
var inst_51978__$1 = (state_52014[(2)]);
var inst_51979 = (inst_51978__$1 == null);
var inst_51980 = cljs.core.not.call(null,inst_51979);
var state_52014__$1 = (function (){var statearr_52019 = state_52014;
(statearr_52019[(9)] = inst_51978__$1);

return statearr_52019;
})();
if(inst_51980){
var statearr_52020_52051 = state_52014__$1;
(statearr_52020_52051[(1)] = (5));

} else {
var statearr_52021_52052 = state_52014__$1;
(statearr_52021_52052[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_52015 === (15))){
var inst_52004 = (state_52014[(2)]);
var state_52014__$1 = state_52014;
var statearr_52022_52053 = state_52014__$1;
(statearr_52022_52053[(2)] = inst_52004);

(statearr_52022_52053[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_52015 === (13))){
var state_52014__$1 = state_52014;
var statearr_52023_52054 = state_52014__$1;
(statearr_52023_52054[(2)] = null);

(statearr_52023_52054[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_52015 === (6))){
var inst_51974 = (state_52014[(7)]);
var inst_51999 = inst_51974.length;
var inst_52000 = (inst_51999 > (0));
var state_52014__$1 = state_52014;
if(cljs.core.truth_(inst_52000)){
var statearr_52024_52055 = state_52014__$1;
(statearr_52024_52055[(1)] = (12));

} else {
var statearr_52025_52056 = state_52014__$1;
(statearr_52025_52056[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_52015 === (3))){
var inst_52012 = (state_52014[(2)]);
var state_52014__$1 = state_52014;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_52014__$1,inst_52012);
} else {
if((state_val_52015 === (12))){
var inst_51974 = (state_52014[(7)]);
var inst_52002 = cljs.core.vec.call(null,inst_51974);
var state_52014__$1 = state_52014;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_52014__$1,(15),out,inst_52002);
} else {
if((state_val_52015 === (2))){
var state_52014__$1 = state_52014;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_52014__$1,(4),ch);
} else {
if((state_val_52015 === (11))){
var inst_51982 = (state_52014[(10)]);
var inst_51978 = (state_52014[(9)]);
var inst_51992 = (state_52014[(2)]);
var inst_51993 = [];
var inst_51994 = inst_51993.push(inst_51978);
var inst_51974 = inst_51993;
var inst_51975 = inst_51982;
var state_52014__$1 = (function (){var statearr_52026 = state_52014;
(statearr_52026[(7)] = inst_51974);

(statearr_52026[(11)] = inst_51994);

(statearr_52026[(8)] = inst_51975);

(statearr_52026[(12)] = inst_51992);

return statearr_52026;
})();
var statearr_52027_52057 = state_52014__$1;
(statearr_52027_52057[(2)] = null);

(statearr_52027_52057[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_52015 === (9))){
var inst_51974 = (state_52014[(7)]);
var inst_51990 = cljs.core.vec.call(null,inst_51974);
var state_52014__$1 = state_52014;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_52014__$1,(11),out,inst_51990);
} else {
if((state_val_52015 === (5))){
var inst_51982 = (state_52014[(10)]);
var inst_51978 = (state_52014[(9)]);
var inst_51975 = (state_52014[(8)]);
var inst_51982__$1 = f.call(null,inst_51978);
var inst_51983 = cljs.core._EQ_.call(null,inst_51982__$1,inst_51975);
var inst_51984 = cljs.core.keyword_identical_QMARK_.call(null,inst_51975,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_51985 = (inst_51983) || (inst_51984);
var state_52014__$1 = (function (){var statearr_52028 = state_52014;
(statearr_52028[(10)] = inst_51982__$1);

return statearr_52028;
})();
if(cljs.core.truth_(inst_51985)){
var statearr_52029_52058 = state_52014__$1;
(statearr_52029_52058[(1)] = (8));

} else {
var statearr_52030_52059 = state_52014__$1;
(statearr_52030_52059[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_52015 === (14))){
var inst_52007 = (state_52014[(2)]);
var inst_52008 = cljs.core.async.close_BANG_.call(null,out);
var state_52014__$1 = (function (){var statearr_52032 = state_52014;
(statearr_52032[(13)] = inst_52007);

return statearr_52032;
})();
var statearr_52033_52060 = state_52014__$1;
(statearr_52033_52060[(2)] = inst_52008);

(statearr_52033_52060[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_52015 === (10))){
var inst_51997 = (state_52014[(2)]);
var state_52014__$1 = state_52014;
var statearr_52034_52061 = state_52014__$1;
(statearr_52034_52061[(2)] = inst_51997);

(statearr_52034_52061[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_52015 === (8))){
var inst_51974 = (state_52014[(7)]);
var inst_51982 = (state_52014[(10)]);
var inst_51978 = (state_52014[(9)]);
var inst_51987 = inst_51974.push(inst_51978);
var tmp52031 = inst_51974;
var inst_51974__$1 = tmp52031;
var inst_51975 = inst_51982;
var state_52014__$1 = (function (){var statearr_52035 = state_52014;
(statearr_52035[(14)] = inst_51987);

(statearr_52035[(7)] = inst_51974__$1);

(statearr_52035[(8)] = inst_51975);

return statearr_52035;
})();
var statearr_52036_52062 = state_52014__$1;
(statearr_52036_52062[(2)] = null);

(statearr_52036_52062[(1)] = (2));


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
});})(c__19920__auto___52048,out))
;
return ((function (switch__19855__auto__,c__19920__auto___52048,out){
return (function() {
var cljs$core$async$state_machine__19856__auto__ = null;
var cljs$core$async$state_machine__19856__auto____0 = (function (){
var statearr_52040 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_52040[(0)] = cljs$core$async$state_machine__19856__auto__);

(statearr_52040[(1)] = (1));

return statearr_52040;
});
var cljs$core$async$state_machine__19856__auto____1 = (function (state_52014){
while(true){
var ret_value__19857__auto__ = (function (){try{while(true){
var result__19858__auto__ = switch__19855__auto__.call(null,state_52014);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19858__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19858__auto__;
}
break;
}
}catch (e52041){if((e52041 instanceof Object)){
var ex__19859__auto__ = e52041;
var statearr_52042_52063 = state_52014;
(statearr_52042_52063[(5)] = ex__19859__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_52014);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e52041;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19857__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__52064 = state_52014;
state_52014 = G__52064;
continue;
} else {
return ret_value__19857__auto__;
}
break;
}
});
cljs$core$async$state_machine__19856__auto__ = function(state_52014){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19856__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19856__auto____1.call(this,state_52014);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19856__auto____0;
cljs$core$async$state_machine__19856__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19856__auto____1;
return cljs$core$async$state_machine__19856__auto__;
})()
;})(switch__19855__auto__,c__19920__auto___52048,out))
})();
var state__19922__auto__ = (function (){var statearr_52043 = f__19921__auto__.call(null);
(statearr_52043[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19920__auto___52048);

return statearr_52043;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19922__auto__);
});})(c__19920__auto___52048,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map?rel=1445965105270