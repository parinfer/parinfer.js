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
if(typeof cljs.core.async.t_cljs$core$async40120 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async40120 = (function (fn_handler,f,meta40121){
this.fn_handler = fn_handler;
this.f = f;
this.meta40121 = meta40121;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async40120.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_40122,meta40121__$1){
var self__ = this;
var _40122__$1 = this;
return (new cljs.core.async.t_cljs$core$async40120(self__.fn_handler,self__.f,meta40121__$1));
});

cljs.core.async.t_cljs$core$async40120.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_40122){
var self__ = this;
var _40122__$1 = this;
return self__.meta40121;
});

cljs.core.async.t_cljs$core$async40120.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async40120.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async40120.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async40120.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"fn-handler","fn-handler",648785851,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null)], null)))], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"meta40121","meta40121",195572647,null)], null);
});

cljs.core.async.t_cljs$core$async40120.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async40120.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async40120";

cljs.core.async.t_cljs$core$async40120.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async40120");
});

cljs.core.async.__GT_t_cljs$core$async40120 = (function cljs$core$async$fn_handler_$___GT_t_cljs$core$async40120(fn_handler__$1,f__$1,meta40121){
return (new cljs.core.async.t_cljs$core$async40120(fn_handler__$1,f__$1,meta40121));
});

}

return (new cljs.core.async.t_cljs$core$async40120(cljs$core$async$fn_handler,f,cljs.core.PersistentArrayMap.EMPTY));
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
var args40125 = [];
var len__17325__auto___40128 = arguments.length;
var i__17326__auto___40129 = (0);
while(true){
if((i__17326__auto___40129 < len__17325__auto___40128)){
args40125.push((arguments[i__17326__auto___40129]));

var G__40130 = (i__17326__auto___40129 + (1));
i__17326__auto___40129 = G__40130;
continue;
} else {
}
break;
}

var G__40127 = args40125.length;
switch (G__40127) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40125.length)].join('')));

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
var args40132 = [];
var len__17325__auto___40135 = arguments.length;
var i__17326__auto___40136 = (0);
while(true){
if((i__17326__auto___40136 < len__17325__auto___40135)){
args40132.push((arguments[i__17326__auto___40136]));

var G__40137 = (i__17326__auto___40136 + (1));
i__17326__auto___40136 = G__40137;
continue;
} else {
}
break;
}

var G__40134 = args40132.length;
switch (G__40134) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40132.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_40139 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_40139);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_40139,ret){
return (function (){
return fn1.call(null,val_40139);
});})(val_40139,ret))
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
var args40140 = [];
var len__17325__auto___40143 = arguments.length;
var i__17326__auto___40144 = (0);
while(true){
if((i__17326__auto___40144 < len__17325__auto___40143)){
args40140.push((arguments[i__17326__auto___40144]));

var G__40145 = (i__17326__auto___40144 + (1));
i__17326__auto___40144 = G__40145;
continue;
} else {
}
break;
}

var G__40142 = args40140.length;
switch (G__40142) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40140.length)].join('')));

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
var n__17170__auto___40147 = n;
var x_40148 = (0);
while(true){
if((x_40148 < n__17170__auto___40147)){
(a[x_40148] = (0));

var G__40149 = (x_40148 + (1));
x_40148 = G__40149;
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

var G__40150 = (i + (1));
i = G__40150;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async40154 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async40154 = (function (alt_flag,flag,meta40155){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta40155 = meta40155;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async40154.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_40156,meta40155__$1){
var self__ = this;
var _40156__$1 = this;
return (new cljs.core.async.t_cljs$core$async40154(self__.alt_flag,self__.flag,meta40155__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async40154.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_40156){
var self__ = this;
var _40156__$1 = this;
return self__.meta40155;
});})(flag))
;

cljs.core.async.t_cljs$core$async40154.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async40154.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async40154.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async40154.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta40155","meta40155",-28453730,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async40154.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async40154.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async40154";

cljs.core.async.t_cljs$core$async40154.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async40154");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async40154 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async40154(alt_flag__$1,flag__$1,meta40155){
return (new cljs.core.async.t_cljs$core$async40154(alt_flag__$1,flag__$1,meta40155));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async40154(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async40160 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async40160 = (function (alt_handler,flag,cb,meta40161){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta40161 = meta40161;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async40160.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_40162,meta40161__$1){
var self__ = this;
var _40162__$1 = this;
return (new cljs.core.async.t_cljs$core$async40160(self__.alt_handler,self__.flag,self__.cb,meta40161__$1));
});

cljs.core.async.t_cljs$core$async40160.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_40162){
var self__ = this;
var _40162__$1 = this;
return self__.meta40161;
});

cljs.core.async.t_cljs$core$async40160.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async40160.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async40160.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async40160.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null)], null)))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta40161","meta40161",-360125982,null)], null);
});

cljs.core.async.t_cljs$core$async40160.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async40160.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async40160";

cljs.core.async.t_cljs$core$async40160.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async40160");
});

cljs.core.async.__GT_t_cljs$core$async40160 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async40160(alt_handler__$1,flag__$1,cb__$1,meta40161){
return (new cljs.core.async.t_cljs$core$async40160(alt_handler__$1,flag__$1,cb__$1,meta40161));
});

}

return (new cljs.core.async.t_cljs$core$async40160(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
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
return (function (p1__40163_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__40163_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__40164_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__40164_SHARP_,port], null));
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
var G__40165 = (i + (1));
i = G__40165;
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
var len__17325__auto___40171 = arguments.length;
var i__17326__auto___40172 = (0);
while(true){
if((i__17326__auto___40172 < len__17325__auto___40171)){
args__17332__auto__.push((arguments[i__17326__auto___40172]));

var G__40173 = (i__17326__auto___40172 + (1));
i__17326__auto___40172 = G__40173;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__40168){
var map__40169 = p__40168;
var map__40169__$1 = ((((!((map__40169 == null)))?((((map__40169.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40169.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__40169):map__40169);
var opts = map__40169__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq40166){
var G__40167 = cljs.core.first.call(null,seq40166);
var seq40166__$1 = cljs.core.next.call(null,seq40166);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__40167,seq40166__$1);
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args40174 = [];
var len__17325__auto___40224 = arguments.length;
var i__17326__auto___40225 = (0);
while(true){
if((i__17326__auto___40225 < len__17325__auto___40224)){
args40174.push((arguments[i__17326__auto___40225]));

var G__40226 = (i__17326__auto___40225 + (1));
i__17326__auto___40225 = G__40226;
continue;
} else {
}
break;
}

var G__40176 = args40174.length;
switch (G__40176) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40174.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__19891__auto___40228 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___40228){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___40228){
return (function (state_40200){
var state_val_40201 = (state_40200[(1)]);
if((state_val_40201 === (7))){
var inst_40196 = (state_40200[(2)]);
var state_40200__$1 = state_40200;
var statearr_40202_40229 = state_40200__$1;
(statearr_40202_40229[(2)] = inst_40196);

(statearr_40202_40229[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40201 === (1))){
var state_40200__$1 = state_40200;
var statearr_40203_40230 = state_40200__$1;
(statearr_40203_40230[(2)] = null);

(statearr_40203_40230[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40201 === (4))){
var inst_40179 = (state_40200[(7)]);
var inst_40179__$1 = (state_40200[(2)]);
var inst_40180 = (inst_40179__$1 == null);
var state_40200__$1 = (function (){var statearr_40204 = state_40200;
(statearr_40204[(7)] = inst_40179__$1);

return statearr_40204;
})();
if(cljs.core.truth_(inst_40180)){
var statearr_40205_40231 = state_40200__$1;
(statearr_40205_40231[(1)] = (5));

} else {
var statearr_40206_40232 = state_40200__$1;
(statearr_40206_40232[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40201 === (13))){
var state_40200__$1 = state_40200;
var statearr_40207_40233 = state_40200__$1;
(statearr_40207_40233[(2)] = null);

(statearr_40207_40233[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40201 === (6))){
var inst_40179 = (state_40200[(7)]);
var state_40200__$1 = state_40200;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40200__$1,(11),to,inst_40179);
} else {
if((state_val_40201 === (3))){
var inst_40198 = (state_40200[(2)]);
var state_40200__$1 = state_40200;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40200__$1,inst_40198);
} else {
if((state_val_40201 === (12))){
var state_40200__$1 = state_40200;
var statearr_40208_40234 = state_40200__$1;
(statearr_40208_40234[(2)] = null);

(statearr_40208_40234[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40201 === (2))){
var state_40200__$1 = state_40200;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40200__$1,(4),from);
} else {
if((state_val_40201 === (11))){
var inst_40189 = (state_40200[(2)]);
var state_40200__$1 = state_40200;
if(cljs.core.truth_(inst_40189)){
var statearr_40209_40235 = state_40200__$1;
(statearr_40209_40235[(1)] = (12));

} else {
var statearr_40210_40236 = state_40200__$1;
(statearr_40210_40236[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40201 === (9))){
var state_40200__$1 = state_40200;
var statearr_40211_40237 = state_40200__$1;
(statearr_40211_40237[(2)] = null);

(statearr_40211_40237[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40201 === (5))){
var state_40200__$1 = state_40200;
if(cljs.core.truth_(close_QMARK_)){
var statearr_40212_40238 = state_40200__$1;
(statearr_40212_40238[(1)] = (8));

} else {
var statearr_40213_40239 = state_40200__$1;
(statearr_40213_40239[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40201 === (14))){
var inst_40194 = (state_40200[(2)]);
var state_40200__$1 = state_40200;
var statearr_40214_40240 = state_40200__$1;
(statearr_40214_40240[(2)] = inst_40194);

(statearr_40214_40240[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40201 === (10))){
var inst_40186 = (state_40200[(2)]);
var state_40200__$1 = state_40200;
var statearr_40215_40241 = state_40200__$1;
(statearr_40215_40241[(2)] = inst_40186);

(statearr_40215_40241[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40201 === (8))){
var inst_40183 = cljs.core.async.close_BANG_.call(null,to);
var state_40200__$1 = state_40200;
var statearr_40216_40242 = state_40200__$1;
(statearr_40216_40242[(2)] = inst_40183);

(statearr_40216_40242[(1)] = (10));


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
});})(c__19891__auto___40228))
;
return ((function (switch__19826__auto__,c__19891__auto___40228){
return (function() {
var cljs$core$async$state_machine__19827__auto__ = null;
var cljs$core$async$state_machine__19827__auto____0 = (function (){
var statearr_40220 = [null,null,null,null,null,null,null,null];
(statearr_40220[(0)] = cljs$core$async$state_machine__19827__auto__);

(statearr_40220[(1)] = (1));

return statearr_40220;
});
var cljs$core$async$state_machine__19827__auto____1 = (function (state_40200){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_40200);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e40221){if((e40221 instanceof Object)){
var ex__19830__auto__ = e40221;
var statearr_40222_40243 = state_40200;
(statearr_40222_40243[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40200);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40221;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40244 = state_40200;
state_40200 = G__40244;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$state_machine__19827__auto__ = function(state_40200){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19827__auto____1.call(this,state_40200);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19827__auto____0;
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19827__auto____1;
return cljs$core$async$state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___40228))
})();
var state__19893__auto__ = (function (){var statearr_40223 = f__19892__auto__.call(null);
(statearr_40223[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___40228);

return statearr_40223;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___40228))
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
return (function (p__40428){
var vec__40429 = p__40428;
var v = cljs.core.nth.call(null,vec__40429,(0),null);
var p = cljs.core.nth.call(null,vec__40429,(1),null);
var job = vec__40429;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__19891__auto___40611 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___40611,res,vec__40429,v,p,job,jobs,results){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___40611,res,vec__40429,v,p,job,jobs,results){
return (function (state_40434){
var state_val_40435 = (state_40434[(1)]);
if((state_val_40435 === (1))){
var state_40434__$1 = state_40434;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40434__$1,(2),res,v);
} else {
if((state_val_40435 === (2))){
var inst_40431 = (state_40434[(2)]);
var inst_40432 = cljs.core.async.close_BANG_.call(null,res);
var state_40434__$1 = (function (){var statearr_40436 = state_40434;
(statearr_40436[(7)] = inst_40431);

return statearr_40436;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40434__$1,inst_40432);
} else {
return null;
}
}
});})(c__19891__auto___40611,res,vec__40429,v,p,job,jobs,results))
;
return ((function (switch__19826__auto__,c__19891__auto___40611,res,vec__40429,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0 = (function (){
var statearr_40440 = [null,null,null,null,null,null,null,null];
(statearr_40440[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__);

(statearr_40440[(1)] = (1));

return statearr_40440;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1 = (function (state_40434){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_40434);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e40441){if((e40441 instanceof Object)){
var ex__19830__auto__ = e40441;
var statearr_40442_40612 = state_40434;
(statearr_40442_40612[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40434);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40441;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40613 = state_40434;
state_40434 = G__40613;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__ = function(state_40434){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1.call(this,state_40434);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___40611,res,vec__40429,v,p,job,jobs,results))
})();
var state__19893__auto__ = (function (){var statearr_40443 = f__19892__auto__.call(null);
(statearr_40443[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___40611);

return statearr_40443;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___40611,res,vec__40429,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__40444){
var vec__40445 = p__40444;
var v = cljs.core.nth.call(null,vec__40445,(0),null);
var p = cljs.core.nth.call(null,vec__40445,(1),null);
var job = vec__40445;
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
var n__17170__auto___40614 = n;
var __40615 = (0);
while(true){
if((__40615 < n__17170__auto___40614)){
var G__40446_40616 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__40446_40616) {
case "compute":
var c__19891__auto___40618 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__40615,c__19891__auto___40618,G__40446_40616,n__17170__auto___40614,jobs,results,process,async){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (__40615,c__19891__auto___40618,G__40446_40616,n__17170__auto___40614,jobs,results,process,async){
return (function (state_40459){
var state_val_40460 = (state_40459[(1)]);
if((state_val_40460 === (1))){
var state_40459__$1 = state_40459;
var statearr_40461_40619 = state_40459__$1;
(statearr_40461_40619[(2)] = null);

(statearr_40461_40619[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40460 === (2))){
var state_40459__$1 = state_40459;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40459__$1,(4),jobs);
} else {
if((state_val_40460 === (3))){
var inst_40457 = (state_40459[(2)]);
var state_40459__$1 = state_40459;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40459__$1,inst_40457);
} else {
if((state_val_40460 === (4))){
var inst_40449 = (state_40459[(2)]);
var inst_40450 = process.call(null,inst_40449);
var state_40459__$1 = state_40459;
if(cljs.core.truth_(inst_40450)){
var statearr_40462_40620 = state_40459__$1;
(statearr_40462_40620[(1)] = (5));

} else {
var statearr_40463_40621 = state_40459__$1;
(statearr_40463_40621[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40460 === (5))){
var state_40459__$1 = state_40459;
var statearr_40464_40622 = state_40459__$1;
(statearr_40464_40622[(2)] = null);

(statearr_40464_40622[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40460 === (6))){
var state_40459__$1 = state_40459;
var statearr_40465_40623 = state_40459__$1;
(statearr_40465_40623[(2)] = null);

(statearr_40465_40623[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40460 === (7))){
var inst_40455 = (state_40459[(2)]);
var state_40459__$1 = state_40459;
var statearr_40466_40624 = state_40459__$1;
(statearr_40466_40624[(2)] = inst_40455);

(statearr_40466_40624[(1)] = (3));


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
});})(__40615,c__19891__auto___40618,G__40446_40616,n__17170__auto___40614,jobs,results,process,async))
;
return ((function (__40615,switch__19826__auto__,c__19891__auto___40618,G__40446_40616,n__17170__auto___40614,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0 = (function (){
var statearr_40470 = [null,null,null,null,null,null,null];
(statearr_40470[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__);

(statearr_40470[(1)] = (1));

return statearr_40470;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1 = (function (state_40459){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_40459);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e40471){if((e40471 instanceof Object)){
var ex__19830__auto__ = e40471;
var statearr_40472_40625 = state_40459;
(statearr_40472_40625[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40459);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40471;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40626 = state_40459;
state_40459 = G__40626;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__ = function(state_40459){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1.call(this,state_40459);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__;
})()
;})(__40615,switch__19826__auto__,c__19891__auto___40618,G__40446_40616,n__17170__auto___40614,jobs,results,process,async))
})();
var state__19893__auto__ = (function (){var statearr_40473 = f__19892__auto__.call(null);
(statearr_40473[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___40618);

return statearr_40473;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(__40615,c__19891__auto___40618,G__40446_40616,n__17170__auto___40614,jobs,results,process,async))
);


break;
case "async":
var c__19891__auto___40627 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__40615,c__19891__auto___40627,G__40446_40616,n__17170__auto___40614,jobs,results,process,async){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (__40615,c__19891__auto___40627,G__40446_40616,n__17170__auto___40614,jobs,results,process,async){
return (function (state_40486){
var state_val_40487 = (state_40486[(1)]);
if((state_val_40487 === (1))){
var state_40486__$1 = state_40486;
var statearr_40488_40628 = state_40486__$1;
(statearr_40488_40628[(2)] = null);

(statearr_40488_40628[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40487 === (2))){
var state_40486__$1 = state_40486;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40486__$1,(4),jobs);
} else {
if((state_val_40487 === (3))){
var inst_40484 = (state_40486[(2)]);
var state_40486__$1 = state_40486;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40486__$1,inst_40484);
} else {
if((state_val_40487 === (4))){
var inst_40476 = (state_40486[(2)]);
var inst_40477 = async.call(null,inst_40476);
var state_40486__$1 = state_40486;
if(cljs.core.truth_(inst_40477)){
var statearr_40489_40629 = state_40486__$1;
(statearr_40489_40629[(1)] = (5));

} else {
var statearr_40490_40630 = state_40486__$1;
(statearr_40490_40630[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40487 === (5))){
var state_40486__$1 = state_40486;
var statearr_40491_40631 = state_40486__$1;
(statearr_40491_40631[(2)] = null);

(statearr_40491_40631[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40487 === (6))){
var state_40486__$1 = state_40486;
var statearr_40492_40632 = state_40486__$1;
(statearr_40492_40632[(2)] = null);

(statearr_40492_40632[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40487 === (7))){
var inst_40482 = (state_40486[(2)]);
var state_40486__$1 = state_40486;
var statearr_40493_40633 = state_40486__$1;
(statearr_40493_40633[(2)] = inst_40482);

(statearr_40493_40633[(1)] = (3));


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
});})(__40615,c__19891__auto___40627,G__40446_40616,n__17170__auto___40614,jobs,results,process,async))
;
return ((function (__40615,switch__19826__auto__,c__19891__auto___40627,G__40446_40616,n__17170__auto___40614,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0 = (function (){
var statearr_40497 = [null,null,null,null,null,null,null];
(statearr_40497[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__);

(statearr_40497[(1)] = (1));

return statearr_40497;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1 = (function (state_40486){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_40486);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e40498){if((e40498 instanceof Object)){
var ex__19830__auto__ = e40498;
var statearr_40499_40634 = state_40486;
(statearr_40499_40634[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40486);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40498;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40635 = state_40486;
state_40486 = G__40635;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__ = function(state_40486){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1.call(this,state_40486);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__;
})()
;})(__40615,switch__19826__auto__,c__19891__auto___40627,G__40446_40616,n__17170__auto___40614,jobs,results,process,async))
})();
var state__19893__auto__ = (function (){var statearr_40500 = f__19892__auto__.call(null);
(statearr_40500[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___40627);

return statearr_40500;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(__40615,c__19891__auto___40627,G__40446_40616,n__17170__auto___40614,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__40636 = (__40615 + (1));
__40615 = G__40636;
continue;
} else {
}
break;
}

var c__19891__auto___40637 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___40637,jobs,results,process,async){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___40637,jobs,results,process,async){
return (function (state_40522){
var state_val_40523 = (state_40522[(1)]);
if((state_val_40523 === (1))){
var state_40522__$1 = state_40522;
var statearr_40524_40638 = state_40522__$1;
(statearr_40524_40638[(2)] = null);

(statearr_40524_40638[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40523 === (2))){
var state_40522__$1 = state_40522;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40522__$1,(4),from);
} else {
if((state_val_40523 === (3))){
var inst_40520 = (state_40522[(2)]);
var state_40522__$1 = state_40522;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40522__$1,inst_40520);
} else {
if((state_val_40523 === (4))){
var inst_40503 = (state_40522[(7)]);
var inst_40503__$1 = (state_40522[(2)]);
var inst_40504 = (inst_40503__$1 == null);
var state_40522__$1 = (function (){var statearr_40525 = state_40522;
(statearr_40525[(7)] = inst_40503__$1);

return statearr_40525;
})();
if(cljs.core.truth_(inst_40504)){
var statearr_40526_40639 = state_40522__$1;
(statearr_40526_40639[(1)] = (5));

} else {
var statearr_40527_40640 = state_40522__$1;
(statearr_40527_40640[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40523 === (5))){
var inst_40506 = cljs.core.async.close_BANG_.call(null,jobs);
var state_40522__$1 = state_40522;
var statearr_40528_40641 = state_40522__$1;
(statearr_40528_40641[(2)] = inst_40506);

(statearr_40528_40641[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40523 === (6))){
var inst_40508 = (state_40522[(8)]);
var inst_40503 = (state_40522[(7)]);
var inst_40508__$1 = cljs.core.async.chan.call(null,(1));
var inst_40509 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_40510 = [inst_40503,inst_40508__$1];
var inst_40511 = (new cljs.core.PersistentVector(null,2,(5),inst_40509,inst_40510,null));
var state_40522__$1 = (function (){var statearr_40529 = state_40522;
(statearr_40529[(8)] = inst_40508__$1);

return statearr_40529;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40522__$1,(8),jobs,inst_40511);
} else {
if((state_val_40523 === (7))){
var inst_40518 = (state_40522[(2)]);
var state_40522__$1 = state_40522;
var statearr_40530_40642 = state_40522__$1;
(statearr_40530_40642[(2)] = inst_40518);

(statearr_40530_40642[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40523 === (8))){
var inst_40508 = (state_40522[(8)]);
var inst_40513 = (state_40522[(2)]);
var state_40522__$1 = (function (){var statearr_40531 = state_40522;
(statearr_40531[(9)] = inst_40513);

return statearr_40531;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40522__$1,(9),results,inst_40508);
} else {
if((state_val_40523 === (9))){
var inst_40515 = (state_40522[(2)]);
var state_40522__$1 = (function (){var statearr_40532 = state_40522;
(statearr_40532[(10)] = inst_40515);

return statearr_40532;
})();
var statearr_40533_40643 = state_40522__$1;
(statearr_40533_40643[(2)] = null);

(statearr_40533_40643[(1)] = (2));


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
});})(c__19891__auto___40637,jobs,results,process,async))
;
return ((function (switch__19826__auto__,c__19891__auto___40637,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0 = (function (){
var statearr_40537 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_40537[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__);

(statearr_40537[(1)] = (1));

return statearr_40537;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1 = (function (state_40522){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_40522);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e40538){if((e40538 instanceof Object)){
var ex__19830__auto__ = e40538;
var statearr_40539_40644 = state_40522;
(statearr_40539_40644[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40522);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40538;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40645 = state_40522;
state_40522 = G__40645;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__ = function(state_40522){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1.call(this,state_40522);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___40637,jobs,results,process,async))
})();
var state__19893__auto__ = (function (){var statearr_40540 = f__19892__auto__.call(null);
(statearr_40540[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___40637);

return statearr_40540;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___40637,jobs,results,process,async))
);


var c__19891__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto__,jobs,results,process,async){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto__,jobs,results,process,async){
return (function (state_40578){
var state_val_40579 = (state_40578[(1)]);
if((state_val_40579 === (7))){
var inst_40574 = (state_40578[(2)]);
var state_40578__$1 = state_40578;
var statearr_40580_40646 = state_40578__$1;
(statearr_40580_40646[(2)] = inst_40574);

(statearr_40580_40646[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (20))){
var state_40578__$1 = state_40578;
var statearr_40581_40647 = state_40578__$1;
(statearr_40581_40647[(2)] = null);

(statearr_40581_40647[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (1))){
var state_40578__$1 = state_40578;
var statearr_40582_40648 = state_40578__$1;
(statearr_40582_40648[(2)] = null);

(statearr_40582_40648[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (4))){
var inst_40543 = (state_40578[(7)]);
var inst_40543__$1 = (state_40578[(2)]);
var inst_40544 = (inst_40543__$1 == null);
var state_40578__$1 = (function (){var statearr_40583 = state_40578;
(statearr_40583[(7)] = inst_40543__$1);

return statearr_40583;
})();
if(cljs.core.truth_(inst_40544)){
var statearr_40584_40649 = state_40578__$1;
(statearr_40584_40649[(1)] = (5));

} else {
var statearr_40585_40650 = state_40578__$1;
(statearr_40585_40650[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (15))){
var inst_40556 = (state_40578[(8)]);
var state_40578__$1 = state_40578;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40578__$1,(18),to,inst_40556);
} else {
if((state_val_40579 === (21))){
var inst_40569 = (state_40578[(2)]);
var state_40578__$1 = state_40578;
var statearr_40586_40651 = state_40578__$1;
(statearr_40586_40651[(2)] = inst_40569);

(statearr_40586_40651[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (13))){
var inst_40571 = (state_40578[(2)]);
var state_40578__$1 = (function (){var statearr_40587 = state_40578;
(statearr_40587[(9)] = inst_40571);

return statearr_40587;
})();
var statearr_40588_40652 = state_40578__$1;
(statearr_40588_40652[(2)] = null);

(statearr_40588_40652[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (6))){
var inst_40543 = (state_40578[(7)]);
var state_40578__$1 = state_40578;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40578__$1,(11),inst_40543);
} else {
if((state_val_40579 === (17))){
var inst_40564 = (state_40578[(2)]);
var state_40578__$1 = state_40578;
if(cljs.core.truth_(inst_40564)){
var statearr_40589_40653 = state_40578__$1;
(statearr_40589_40653[(1)] = (19));

} else {
var statearr_40590_40654 = state_40578__$1;
(statearr_40590_40654[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (3))){
var inst_40576 = (state_40578[(2)]);
var state_40578__$1 = state_40578;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40578__$1,inst_40576);
} else {
if((state_val_40579 === (12))){
var inst_40553 = (state_40578[(10)]);
var state_40578__$1 = state_40578;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40578__$1,(14),inst_40553);
} else {
if((state_val_40579 === (2))){
var state_40578__$1 = state_40578;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40578__$1,(4),results);
} else {
if((state_val_40579 === (19))){
var state_40578__$1 = state_40578;
var statearr_40591_40655 = state_40578__$1;
(statearr_40591_40655[(2)] = null);

(statearr_40591_40655[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (11))){
var inst_40553 = (state_40578[(2)]);
var state_40578__$1 = (function (){var statearr_40592 = state_40578;
(statearr_40592[(10)] = inst_40553);

return statearr_40592;
})();
var statearr_40593_40656 = state_40578__$1;
(statearr_40593_40656[(2)] = null);

(statearr_40593_40656[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (9))){
var state_40578__$1 = state_40578;
var statearr_40594_40657 = state_40578__$1;
(statearr_40594_40657[(2)] = null);

(statearr_40594_40657[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (5))){
var state_40578__$1 = state_40578;
if(cljs.core.truth_(close_QMARK_)){
var statearr_40595_40658 = state_40578__$1;
(statearr_40595_40658[(1)] = (8));

} else {
var statearr_40596_40659 = state_40578__$1;
(statearr_40596_40659[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (14))){
var inst_40556 = (state_40578[(8)]);
var inst_40558 = (state_40578[(11)]);
var inst_40556__$1 = (state_40578[(2)]);
var inst_40557 = (inst_40556__$1 == null);
var inst_40558__$1 = cljs.core.not.call(null,inst_40557);
var state_40578__$1 = (function (){var statearr_40597 = state_40578;
(statearr_40597[(8)] = inst_40556__$1);

(statearr_40597[(11)] = inst_40558__$1);

return statearr_40597;
})();
if(inst_40558__$1){
var statearr_40598_40660 = state_40578__$1;
(statearr_40598_40660[(1)] = (15));

} else {
var statearr_40599_40661 = state_40578__$1;
(statearr_40599_40661[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (16))){
var inst_40558 = (state_40578[(11)]);
var state_40578__$1 = state_40578;
var statearr_40600_40662 = state_40578__$1;
(statearr_40600_40662[(2)] = inst_40558);

(statearr_40600_40662[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (10))){
var inst_40550 = (state_40578[(2)]);
var state_40578__$1 = state_40578;
var statearr_40601_40663 = state_40578__$1;
(statearr_40601_40663[(2)] = inst_40550);

(statearr_40601_40663[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (18))){
var inst_40561 = (state_40578[(2)]);
var state_40578__$1 = state_40578;
var statearr_40602_40664 = state_40578__$1;
(statearr_40602_40664[(2)] = inst_40561);

(statearr_40602_40664[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40579 === (8))){
var inst_40547 = cljs.core.async.close_BANG_.call(null,to);
var state_40578__$1 = state_40578;
var statearr_40603_40665 = state_40578__$1;
(statearr_40603_40665[(2)] = inst_40547);

(statearr_40603_40665[(1)] = (10));


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
});})(c__19891__auto__,jobs,results,process,async))
;
return ((function (switch__19826__auto__,c__19891__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0 = (function (){
var statearr_40607 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40607[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__);

(statearr_40607[(1)] = (1));

return statearr_40607;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1 = (function (state_40578){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_40578);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e40608){if((e40608 instanceof Object)){
var ex__19830__auto__ = e40608;
var statearr_40609_40666 = state_40578;
(statearr_40609_40666[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40578);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40608;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40667 = state_40578;
state_40578 = G__40667;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__ = function(state_40578){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1.call(this,state_40578);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19827__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto__,jobs,results,process,async))
})();
var state__19893__auto__ = (function (){var statearr_40610 = f__19892__auto__.call(null);
(statearr_40610[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto__);

return statearr_40610;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto__,jobs,results,process,async))
);

return c__19891__auto__;
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
var args40668 = [];
var len__17325__auto___40671 = arguments.length;
var i__17326__auto___40672 = (0);
while(true){
if((i__17326__auto___40672 < len__17325__auto___40671)){
args40668.push((arguments[i__17326__auto___40672]));

var G__40673 = (i__17326__auto___40672 + (1));
i__17326__auto___40672 = G__40673;
continue;
} else {
}
break;
}

var G__40670 = args40668.length;
switch (G__40670) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40668.length)].join('')));

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
var args40675 = [];
var len__17325__auto___40678 = arguments.length;
var i__17326__auto___40679 = (0);
while(true){
if((i__17326__auto___40679 < len__17325__auto___40678)){
args40675.push((arguments[i__17326__auto___40679]));

var G__40680 = (i__17326__auto___40679 + (1));
i__17326__auto___40679 = G__40680;
continue;
} else {
}
break;
}

var G__40677 = args40675.length;
switch (G__40677) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40675.length)].join('')));

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
var args40682 = [];
var len__17325__auto___40735 = arguments.length;
var i__17326__auto___40736 = (0);
while(true){
if((i__17326__auto___40736 < len__17325__auto___40735)){
args40682.push((arguments[i__17326__auto___40736]));

var G__40737 = (i__17326__auto___40736 + (1));
i__17326__auto___40736 = G__40737;
continue;
} else {
}
break;
}

var G__40684 = args40682.length;
switch (G__40684) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40682.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__19891__auto___40739 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___40739,tc,fc){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___40739,tc,fc){
return (function (state_40710){
var state_val_40711 = (state_40710[(1)]);
if((state_val_40711 === (7))){
var inst_40706 = (state_40710[(2)]);
var state_40710__$1 = state_40710;
var statearr_40712_40740 = state_40710__$1;
(statearr_40712_40740[(2)] = inst_40706);

(statearr_40712_40740[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40711 === (1))){
var state_40710__$1 = state_40710;
var statearr_40713_40741 = state_40710__$1;
(statearr_40713_40741[(2)] = null);

(statearr_40713_40741[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40711 === (4))){
var inst_40687 = (state_40710[(7)]);
var inst_40687__$1 = (state_40710[(2)]);
var inst_40688 = (inst_40687__$1 == null);
var state_40710__$1 = (function (){var statearr_40714 = state_40710;
(statearr_40714[(7)] = inst_40687__$1);

return statearr_40714;
})();
if(cljs.core.truth_(inst_40688)){
var statearr_40715_40742 = state_40710__$1;
(statearr_40715_40742[(1)] = (5));

} else {
var statearr_40716_40743 = state_40710__$1;
(statearr_40716_40743[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40711 === (13))){
var state_40710__$1 = state_40710;
var statearr_40717_40744 = state_40710__$1;
(statearr_40717_40744[(2)] = null);

(statearr_40717_40744[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40711 === (6))){
var inst_40687 = (state_40710[(7)]);
var inst_40693 = p.call(null,inst_40687);
var state_40710__$1 = state_40710;
if(cljs.core.truth_(inst_40693)){
var statearr_40718_40745 = state_40710__$1;
(statearr_40718_40745[(1)] = (9));

} else {
var statearr_40719_40746 = state_40710__$1;
(statearr_40719_40746[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40711 === (3))){
var inst_40708 = (state_40710[(2)]);
var state_40710__$1 = state_40710;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40710__$1,inst_40708);
} else {
if((state_val_40711 === (12))){
var state_40710__$1 = state_40710;
var statearr_40720_40747 = state_40710__$1;
(statearr_40720_40747[(2)] = null);

(statearr_40720_40747[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40711 === (2))){
var state_40710__$1 = state_40710;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40710__$1,(4),ch);
} else {
if((state_val_40711 === (11))){
var inst_40687 = (state_40710[(7)]);
var inst_40697 = (state_40710[(2)]);
var state_40710__$1 = state_40710;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40710__$1,(8),inst_40697,inst_40687);
} else {
if((state_val_40711 === (9))){
var state_40710__$1 = state_40710;
var statearr_40721_40748 = state_40710__$1;
(statearr_40721_40748[(2)] = tc);

(statearr_40721_40748[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40711 === (5))){
var inst_40690 = cljs.core.async.close_BANG_.call(null,tc);
var inst_40691 = cljs.core.async.close_BANG_.call(null,fc);
var state_40710__$1 = (function (){var statearr_40722 = state_40710;
(statearr_40722[(8)] = inst_40690);

return statearr_40722;
})();
var statearr_40723_40749 = state_40710__$1;
(statearr_40723_40749[(2)] = inst_40691);

(statearr_40723_40749[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40711 === (14))){
var inst_40704 = (state_40710[(2)]);
var state_40710__$1 = state_40710;
var statearr_40724_40750 = state_40710__$1;
(statearr_40724_40750[(2)] = inst_40704);

(statearr_40724_40750[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40711 === (10))){
var state_40710__$1 = state_40710;
var statearr_40725_40751 = state_40710__$1;
(statearr_40725_40751[(2)] = fc);

(statearr_40725_40751[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40711 === (8))){
var inst_40699 = (state_40710[(2)]);
var state_40710__$1 = state_40710;
if(cljs.core.truth_(inst_40699)){
var statearr_40726_40752 = state_40710__$1;
(statearr_40726_40752[(1)] = (12));

} else {
var statearr_40727_40753 = state_40710__$1;
(statearr_40727_40753[(1)] = (13));

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
});})(c__19891__auto___40739,tc,fc))
;
return ((function (switch__19826__auto__,c__19891__auto___40739,tc,fc){
return (function() {
var cljs$core$async$state_machine__19827__auto__ = null;
var cljs$core$async$state_machine__19827__auto____0 = (function (){
var statearr_40731 = [null,null,null,null,null,null,null,null,null];
(statearr_40731[(0)] = cljs$core$async$state_machine__19827__auto__);

(statearr_40731[(1)] = (1));

return statearr_40731;
});
var cljs$core$async$state_machine__19827__auto____1 = (function (state_40710){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_40710);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e40732){if((e40732 instanceof Object)){
var ex__19830__auto__ = e40732;
var statearr_40733_40754 = state_40710;
(statearr_40733_40754[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40710);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40732;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40755 = state_40710;
state_40710 = G__40755;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$state_machine__19827__auto__ = function(state_40710){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19827__auto____1.call(this,state_40710);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19827__auto____0;
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19827__auto____1;
return cljs$core$async$state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___40739,tc,fc))
})();
var state__19893__auto__ = (function (){var statearr_40734 = f__19892__auto__.call(null);
(statearr_40734[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___40739);

return statearr_40734;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___40739,tc,fc))
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
var c__19891__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto__){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto__){
return (function (state_40802){
var state_val_40803 = (state_40802[(1)]);
if((state_val_40803 === (1))){
var inst_40788 = init;
var state_40802__$1 = (function (){var statearr_40804 = state_40802;
(statearr_40804[(7)] = inst_40788);

return statearr_40804;
})();
var statearr_40805_40820 = state_40802__$1;
(statearr_40805_40820[(2)] = null);

(statearr_40805_40820[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40803 === (2))){
var state_40802__$1 = state_40802;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_40802__$1,(4),ch);
} else {
if((state_val_40803 === (3))){
var inst_40800 = (state_40802[(2)]);
var state_40802__$1 = state_40802;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40802__$1,inst_40800);
} else {
if((state_val_40803 === (4))){
var inst_40791 = (state_40802[(8)]);
var inst_40791__$1 = (state_40802[(2)]);
var inst_40792 = (inst_40791__$1 == null);
var state_40802__$1 = (function (){var statearr_40806 = state_40802;
(statearr_40806[(8)] = inst_40791__$1);

return statearr_40806;
})();
if(cljs.core.truth_(inst_40792)){
var statearr_40807_40821 = state_40802__$1;
(statearr_40807_40821[(1)] = (5));

} else {
var statearr_40808_40822 = state_40802__$1;
(statearr_40808_40822[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40803 === (5))){
var inst_40788 = (state_40802[(7)]);
var state_40802__$1 = state_40802;
var statearr_40809_40823 = state_40802__$1;
(statearr_40809_40823[(2)] = inst_40788);

(statearr_40809_40823[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40803 === (6))){
var inst_40788 = (state_40802[(7)]);
var inst_40791 = (state_40802[(8)]);
var inst_40795 = f.call(null,inst_40788,inst_40791);
var inst_40788__$1 = inst_40795;
var state_40802__$1 = (function (){var statearr_40810 = state_40802;
(statearr_40810[(7)] = inst_40788__$1);

return statearr_40810;
})();
var statearr_40811_40824 = state_40802__$1;
(statearr_40811_40824[(2)] = null);

(statearr_40811_40824[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40803 === (7))){
var inst_40798 = (state_40802[(2)]);
var state_40802__$1 = state_40802;
var statearr_40812_40825 = state_40802__$1;
(statearr_40812_40825[(2)] = inst_40798);

(statearr_40812_40825[(1)] = (3));


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
});})(c__19891__auto__))
;
return ((function (switch__19826__auto__,c__19891__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__19827__auto__ = null;
var cljs$core$async$reduce_$_state_machine__19827__auto____0 = (function (){
var statearr_40816 = [null,null,null,null,null,null,null,null,null];
(statearr_40816[(0)] = cljs$core$async$reduce_$_state_machine__19827__auto__);

(statearr_40816[(1)] = (1));

return statearr_40816;
});
var cljs$core$async$reduce_$_state_machine__19827__auto____1 = (function (state_40802){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_40802);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e40817){if((e40817 instanceof Object)){
var ex__19830__auto__ = e40817;
var statearr_40818_40826 = state_40802;
(statearr_40818_40826[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40802);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40817;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40827 = state_40802;
state_40802 = G__40827;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__19827__auto__ = function(state_40802){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__19827__auto____1.call(this,state_40802);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__19827__auto____0;
cljs$core$async$reduce_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__19827__auto____1;
return cljs$core$async$reduce_$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto__))
})();
var state__19893__auto__ = (function (){var statearr_40819 = f__19892__auto__.call(null);
(statearr_40819[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto__);

return statearr_40819;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto__))
);

return c__19891__auto__;
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
var args40828 = [];
var len__17325__auto___40880 = arguments.length;
var i__17326__auto___40881 = (0);
while(true){
if((i__17326__auto___40881 < len__17325__auto___40880)){
args40828.push((arguments[i__17326__auto___40881]));

var G__40882 = (i__17326__auto___40881 + (1));
i__17326__auto___40881 = G__40882;
continue;
} else {
}
break;
}

var G__40830 = args40828.length;
switch (G__40830) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40828.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__19891__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto__){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto__){
return (function (state_40855){
var state_val_40856 = (state_40855[(1)]);
if((state_val_40856 === (7))){
var inst_40837 = (state_40855[(2)]);
var state_40855__$1 = state_40855;
var statearr_40857_40884 = state_40855__$1;
(statearr_40857_40884[(2)] = inst_40837);

(statearr_40857_40884[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40856 === (1))){
var inst_40831 = cljs.core.seq.call(null,coll);
var inst_40832 = inst_40831;
var state_40855__$1 = (function (){var statearr_40858 = state_40855;
(statearr_40858[(7)] = inst_40832);

return statearr_40858;
})();
var statearr_40859_40885 = state_40855__$1;
(statearr_40859_40885[(2)] = null);

(statearr_40859_40885[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40856 === (4))){
var inst_40832 = (state_40855[(7)]);
var inst_40835 = cljs.core.first.call(null,inst_40832);
var state_40855__$1 = state_40855;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_40855__$1,(7),ch,inst_40835);
} else {
if((state_val_40856 === (13))){
var inst_40849 = (state_40855[(2)]);
var state_40855__$1 = state_40855;
var statearr_40860_40886 = state_40855__$1;
(statearr_40860_40886[(2)] = inst_40849);

(statearr_40860_40886[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40856 === (6))){
var inst_40840 = (state_40855[(2)]);
var state_40855__$1 = state_40855;
if(cljs.core.truth_(inst_40840)){
var statearr_40861_40887 = state_40855__$1;
(statearr_40861_40887[(1)] = (8));

} else {
var statearr_40862_40888 = state_40855__$1;
(statearr_40862_40888[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40856 === (3))){
var inst_40853 = (state_40855[(2)]);
var state_40855__$1 = state_40855;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_40855__$1,inst_40853);
} else {
if((state_val_40856 === (12))){
var state_40855__$1 = state_40855;
var statearr_40863_40889 = state_40855__$1;
(statearr_40863_40889[(2)] = null);

(statearr_40863_40889[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40856 === (2))){
var inst_40832 = (state_40855[(7)]);
var state_40855__$1 = state_40855;
if(cljs.core.truth_(inst_40832)){
var statearr_40864_40890 = state_40855__$1;
(statearr_40864_40890[(1)] = (4));

} else {
var statearr_40865_40891 = state_40855__$1;
(statearr_40865_40891[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40856 === (11))){
var inst_40846 = cljs.core.async.close_BANG_.call(null,ch);
var state_40855__$1 = state_40855;
var statearr_40866_40892 = state_40855__$1;
(statearr_40866_40892[(2)] = inst_40846);

(statearr_40866_40892[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40856 === (9))){
var state_40855__$1 = state_40855;
if(cljs.core.truth_(close_QMARK_)){
var statearr_40867_40893 = state_40855__$1;
(statearr_40867_40893[(1)] = (11));

} else {
var statearr_40868_40894 = state_40855__$1;
(statearr_40868_40894[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40856 === (5))){
var inst_40832 = (state_40855[(7)]);
var state_40855__$1 = state_40855;
var statearr_40869_40895 = state_40855__$1;
(statearr_40869_40895[(2)] = inst_40832);

(statearr_40869_40895[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40856 === (10))){
var inst_40851 = (state_40855[(2)]);
var state_40855__$1 = state_40855;
var statearr_40870_40896 = state_40855__$1;
(statearr_40870_40896[(2)] = inst_40851);

(statearr_40870_40896[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40856 === (8))){
var inst_40832 = (state_40855[(7)]);
var inst_40842 = cljs.core.next.call(null,inst_40832);
var inst_40832__$1 = inst_40842;
var state_40855__$1 = (function (){var statearr_40871 = state_40855;
(statearr_40871[(7)] = inst_40832__$1);

return statearr_40871;
})();
var statearr_40872_40897 = state_40855__$1;
(statearr_40872_40897[(2)] = null);

(statearr_40872_40897[(1)] = (2));


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
});})(c__19891__auto__))
;
return ((function (switch__19826__auto__,c__19891__auto__){
return (function() {
var cljs$core$async$state_machine__19827__auto__ = null;
var cljs$core$async$state_machine__19827__auto____0 = (function (){
var statearr_40876 = [null,null,null,null,null,null,null,null];
(statearr_40876[(0)] = cljs$core$async$state_machine__19827__auto__);

(statearr_40876[(1)] = (1));

return statearr_40876;
});
var cljs$core$async$state_machine__19827__auto____1 = (function (state_40855){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_40855);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e40877){if((e40877 instanceof Object)){
var ex__19830__auto__ = e40877;
var statearr_40878_40898 = state_40855;
(statearr_40878_40898[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_40855);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e40877;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40899 = state_40855;
state_40855 = G__40899;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$state_machine__19827__auto__ = function(state_40855){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19827__auto____1.call(this,state_40855);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19827__auto____0;
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19827__auto____1;
return cljs$core$async$state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto__))
})();
var state__19893__auto__ = (function (){var statearr_40879 = f__19892__auto__.call(null);
(statearr_40879[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto__);

return statearr_40879;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto__))
);

return c__19891__auto__;
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
if(typeof cljs.core.async.t_cljs$core$async41121 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async41121 = (function (mult,ch,cs,meta41122){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta41122 = meta41122;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async41121.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_41123,meta41122__$1){
var self__ = this;
var _41123__$1 = this;
return (new cljs.core.async.t_cljs$core$async41121(self__.mult,self__.ch,self__.cs,meta41122__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async41121.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_41123){
var self__ = this;
var _41123__$1 = this;
return self__.meta41122;
});})(cs))
;

cljs.core.async.t_cljs$core$async41121.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async41121.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async41121.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async41121.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async41121.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async41121.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async41121.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta41122","meta41122",-1600628980,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async41121.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async41121.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async41121";

cljs.core.async.t_cljs$core$async41121.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async41121");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async41121 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async41121(mult__$1,ch__$1,cs__$1,meta41122){
return (new cljs.core.async.t_cljs$core$async41121(mult__$1,ch__$1,cs__$1,meta41122));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async41121(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
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
var c__19891__auto___41342 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___41342,cs,m,dchan,dctr,done){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___41342,cs,m,dchan,dctr,done){
return (function (state_41254){
var state_val_41255 = (state_41254[(1)]);
if((state_val_41255 === (7))){
var inst_41250 = (state_41254[(2)]);
var state_41254__$1 = state_41254;
var statearr_41256_41343 = state_41254__$1;
(statearr_41256_41343[(2)] = inst_41250);

(statearr_41256_41343[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (20))){
var inst_41155 = (state_41254[(7)]);
var inst_41165 = cljs.core.first.call(null,inst_41155);
var inst_41166 = cljs.core.nth.call(null,inst_41165,(0),null);
var inst_41167 = cljs.core.nth.call(null,inst_41165,(1),null);
var state_41254__$1 = (function (){var statearr_41257 = state_41254;
(statearr_41257[(8)] = inst_41166);

return statearr_41257;
})();
if(cljs.core.truth_(inst_41167)){
var statearr_41258_41344 = state_41254__$1;
(statearr_41258_41344[(1)] = (22));

} else {
var statearr_41259_41345 = state_41254__$1;
(statearr_41259_41345[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (27))){
var inst_41195 = (state_41254[(9)]);
var inst_41197 = (state_41254[(10)]);
var inst_41202 = (state_41254[(11)]);
var inst_41126 = (state_41254[(12)]);
var inst_41202__$1 = cljs.core._nth.call(null,inst_41195,inst_41197);
var inst_41203 = cljs.core.async.put_BANG_.call(null,inst_41202__$1,inst_41126,done);
var state_41254__$1 = (function (){var statearr_41260 = state_41254;
(statearr_41260[(11)] = inst_41202__$1);

return statearr_41260;
})();
if(cljs.core.truth_(inst_41203)){
var statearr_41261_41346 = state_41254__$1;
(statearr_41261_41346[(1)] = (30));

} else {
var statearr_41262_41347 = state_41254__$1;
(statearr_41262_41347[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (1))){
var state_41254__$1 = state_41254;
var statearr_41263_41348 = state_41254__$1;
(statearr_41263_41348[(2)] = null);

(statearr_41263_41348[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (24))){
var inst_41155 = (state_41254[(7)]);
var inst_41172 = (state_41254[(2)]);
var inst_41173 = cljs.core.next.call(null,inst_41155);
var inst_41135 = inst_41173;
var inst_41136 = null;
var inst_41137 = (0);
var inst_41138 = (0);
var state_41254__$1 = (function (){var statearr_41264 = state_41254;
(statearr_41264[(13)] = inst_41136);

(statearr_41264[(14)] = inst_41138);

(statearr_41264[(15)] = inst_41137);

(statearr_41264[(16)] = inst_41135);

(statearr_41264[(17)] = inst_41172);

return statearr_41264;
})();
var statearr_41265_41349 = state_41254__$1;
(statearr_41265_41349[(2)] = null);

(statearr_41265_41349[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (39))){
var state_41254__$1 = state_41254;
var statearr_41269_41350 = state_41254__$1;
(statearr_41269_41350[(2)] = null);

(statearr_41269_41350[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (4))){
var inst_41126 = (state_41254[(12)]);
var inst_41126__$1 = (state_41254[(2)]);
var inst_41127 = (inst_41126__$1 == null);
var state_41254__$1 = (function (){var statearr_41270 = state_41254;
(statearr_41270[(12)] = inst_41126__$1);

return statearr_41270;
})();
if(cljs.core.truth_(inst_41127)){
var statearr_41271_41351 = state_41254__$1;
(statearr_41271_41351[(1)] = (5));

} else {
var statearr_41272_41352 = state_41254__$1;
(statearr_41272_41352[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (15))){
var inst_41136 = (state_41254[(13)]);
var inst_41138 = (state_41254[(14)]);
var inst_41137 = (state_41254[(15)]);
var inst_41135 = (state_41254[(16)]);
var inst_41151 = (state_41254[(2)]);
var inst_41152 = (inst_41138 + (1));
var tmp41266 = inst_41136;
var tmp41267 = inst_41137;
var tmp41268 = inst_41135;
var inst_41135__$1 = tmp41268;
var inst_41136__$1 = tmp41266;
var inst_41137__$1 = tmp41267;
var inst_41138__$1 = inst_41152;
var state_41254__$1 = (function (){var statearr_41273 = state_41254;
(statearr_41273[(13)] = inst_41136__$1);

(statearr_41273[(14)] = inst_41138__$1);

(statearr_41273[(18)] = inst_41151);

(statearr_41273[(15)] = inst_41137__$1);

(statearr_41273[(16)] = inst_41135__$1);

return statearr_41273;
})();
var statearr_41274_41353 = state_41254__$1;
(statearr_41274_41353[(2)] = null);

(statearr_41274_41353[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (21))){
var inst_41176 = (state_41254[(2)]);
var state_41254__$1 = state_41254;
var statearr_41278_41354 = state_41254__$1;
(statearr_41278_41354[(2)] = inst_41176);

(statearr_41278_41354[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (31))){
var inst_41202 = (state_41254[(11)]);
var inst_41206 = done.call(null,null);
var inst_41207 = cljs.core.async.untap_STAR_.call(null,m,inst_41202);
var state_41254__$1 = (function (){var statearr_41279 = state_41254;
(statearr_41279[(19)] = inst_41206);

return statearr_41279;
})();
var statearr_41280_41355 = state_41254__$1;
(statearr_41280_41355[(2)] = inst_41207);

(statearr_41280_41355[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (32))){
var inst_41195 = (state_41254[(9)]);
var inst_41197 = (state_41254[(10)]);
var inst_41194 = (state_41254[(20)]);
var inst_41196 = (state_41254[(21)]);
var inst_41209 = (state_41254[(2)]);
var inst_41210 = (inst_41197 + (1));
var tmp41275 = inst_41195;
var tmp41276 = inst_41194;
var tmp41277 = inst_41196;
var inst_41194__$1 = tmp41276;
var inst_41195__$1 = tmp41275;
var inst_41196__$1 = tmp41277;
var inst_41197__$1 = inst_41210;
var state_41254__$1 = (function (){var statearr_41281 = state_41254;
(statearr_41281[(9)] = inst_41195__$1);

(statearr_41281[(10)] = inst_41197__$1);

(statearr_41281[(20)] = inst_41194__$1);

(statearr_41281[(22)] = inst_41209);

(statearr_41281[(21)] = inst_41196__$1);

return statearr_41281;
})();
var statearr_41282_41356 = state_41254__$1;
(statearr_41282_41356[(2)] = null);

(statearr_41282_41356[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (40))){
var inst_41222 = (state_41254[(23)]);
var inst_41226 = done.call(null,null);
var inst_41227 = cljs.core.async.untap_STAR_.call(null,m,inst_41222);
var state_41254__$1 = (function (){var statearr_41283 = state_41254;
(statearr_41283[(24)] = inst_41226);

return statearr_41283;
})();
var statearr_41284_41357 = state_41254__$1;
(statearr_41284_41357[(2)] = inst_41227);

(statearr_41284_41357[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (33))){
var inst_41213 = (state_41254[(25)]);
var inst_41215 = cljs.core.chunked_seq_QMARK_.call(null,inst_41213);
var state_41254__$1 = state_41254;
if(inst_41215){
var statearr_41285_41358 = state_41254__$1;
(statearr_41285_41358[(1)] = (36));

} else {
var statearr_41286_41359 = state_41254__$1;
(statearr_41286_41359[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (13))){
var inst_41145 = (state_41254[(26)]);
var inst_41148 = cljs.core.async.close_BANG_.call(null,inst_41145);
var state_41254__$1 = state_41254;
var statearr_41287_41360 = state_41254__$1;
(statearr_41287_41360[(2)] = inst_41148);

(statearr_41287_41360[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (22))){
var inst_41166 = (state_41254[(8)]);
var inst_41169 = cljs.core.async.close_BANG_.call(null,inst_41166);
var state_41254__$1 = state_41254;
var statearr_41288_41361 = state_41254__$1;
(statearr_41288_41361[(2)] = inst_41169);

(statearr_41288_41361[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (36))){
var inst_41213 = (state_41254[(25)]);
var inst_41217 = cljs.core.chunk_first.call(null,inst_41213);
var inst_41218 = cljs.core.chunk_rest.call(null,inst_41213);
var inst_41219 = cljs.core.count.call(null,inst_41217);
var inst_41194 = inst_41218;
var inst_41195 = inst_41217;
var inst_41196 = inst_41219;
var inst_41197 = (0);
var state_41254__$1 = (function (){var statearr_41289 = state_41254;
(statearr_41289[(9)] = inst_41195);

(statearr_41289[(10)] = inst_41197);

(statearr_41289[(20)] = inst_41194);

(statearr_41289[(21)] = inst_41196);

return statearr_41289;
})();
var statearr_41290_41362 = state_41254__$1;
(statearr_41290_41362[(2)] = null);

(statearr_41290_41362[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (41))){
var inst_41213 = (state_41254[(25)]);
var inst_41229 = (state_41254[(2)]);
var inst_41230 = cljs.core.next.call(null,inst_41213);
var inst_41194 = inst_41230;
var inst_41195 = null;
var inst_41196 = (0);
var inst_41197 = (0);
var state_41254__$1 = (function (){var statearr_41291 = state_41254;
(statearr_41291[(9)] = inst_41195);

(statearr_41291[(10)] = inst_41197);

(statearr_41291[(20)] = inst_41194);

(statearr_41291[(21)] = inst_41196);

(statearr_41291[(27)] = inst_41229);

return statearr_41291;
})();
var statearr_41292_41363 = state_41254__$1;
(statearr_41292_41363[(2)] = null);

(statearr_41292_41363[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (43))){
var state_41254__$1 = state_41254;
var statearr_41293_41364 = state_41254__$1;
(statearr_41293_41364[(2)] = null);

(statearr_41293_41364[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (29))){
var inst_41238 = (state_41254[(2)]);
var state_41254__$1 = state_41254;
var statearr_41294_41365 = state_41254__$1;
(statearr_41294_41365[(2)] = inst_41238);

(statearr_41294_41365[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (44))){
var inst_41247 = (state_41254[(2)]);
var state_41254__$1 = (function (){var statearr_41295 = state_41254;
(statearr_41295[(28)] = inst_41247);

return statearr_41295;
})();
var statearr_41296_41366 = state_41254__$1;
(statearr_41296_41366[(2)] = null);

(statearr_41296_41366[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (6))){
var inst_41186 = (state_41254[(29)]);
var inst_41185 = cljs.core.deref.call(null,cs);
var inst_41186__$1 = cljs.core.keys.call(null,inst_41185);
var inst_41187 = cljs.core.count.call(null,inst_41186__$1);
var inst_41188 = cljs.core.reset_BANG_.call(null,dctr,inst_41187);
var inst_41193 = cljs.core.seq.call(null,inst_41186__$1);
var inst_41194 = inst_41193;
var inst_41195 = null;
var inst_41196 = (0);
var inst_41197 = (0);
var state_41254__$1 = (function (){var statearr_41297 = state_41254;
(statearr_41297[(29)] = inst_41186__$1);

(statearr_41297[(9)] = inst_41195);

(statearr_41297[(10)] = inst_41197);

(statearr_41297[(20)] = inst_41194);

(statearr_41297[(21)] = inst_41196);

(statearr_41297[(30)] = inst_41188);

return statearr_41297;
})();
var statearr_41298_41367 = state_41254__$1;
(statearr_41298_41367[(2)] = null);

(statearr_41298_41367[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (28))){
var inst_41194 = (state_41254[(20)]);
var inst_41213 = (state_41254[(25)]);
var inst_41213__$1 = cljs.core.seq.call(null,inst_41194);
var state_41254__$1 = (function (){var statearr_41299 = state_41254;
(statearr_41299[(25)] = inst_41213__$1);

return statearr_41299;
})();
if(inst_41213__$1){
var statearr_41300_41368 = state_41254__$1;
(statearr_41300_41368[(1)] = (33));

} else {
var statearr_41301_41369 = state_41254__$1;
(statearr_41301_41369[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (25))){
var inst_41197 = (state_41254[(10)]);
var inst_41196 = (state_41254[(21)]);
var inst_41199 = (inst_41197 < inst_41196);
var inst_41200 = inst_41199;
var state_41254__$1 = state_41254;
if(cljs.core.truth_(inst_41200)){
var statearr_41302_41370 = state_41254__$1;
(statearr_41302_41370[(1)] = (27));

} else {
var statearr_41303_41371 = state_41254__$1;
(statearr_41303_41371[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (34))){
var state_41254__$1 = state_41254;
var statearr_41304_41372 = state_41254__$1;
(statearr_41304_41372[(2)] = null);

(statearr_41304_41372[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (17))){
var state_41254__$1 = state_41254;
var statearr_41305_41373 = state_41254__$1;
(statearr_41305_41373[(2)] = null);

(statearr_41305_41373[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (3))){
var inst_41252 = (state_41254[(2)]);
var state_41254__$1 = state_41254;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_41254__$1,inst_41252);
} else {
if((state_val_41255 === (12))){
var inst_41181 = (state_41254[(2)]);
var state_41254__$1 = state_41254;
var statearr_41306_41374 = state_41254__$1;
(statearr_41306_41374[(2)] = inst_41181);

(statearr_41306_41374[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (2))){
var state_41254__$1 = state_41254;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_41254__$1,(4),ch);
} else {
if((state_val_41255 === (23))){
var state_41254__$1 = state_41254;
var statearr_41307_41375 = state_41254__$1;
(statearr_41307_41375[(2)] = null);

(statearr_41307_41375[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (35))){
var inst_41236 = (state_41254[(2)]);
var state_41254__$1 = state_41254;
var statearr_41308_41376 = state_41254__$1;
(statearr_41308_41376[(2)] = inst_41236);

(statearr_41308_41376[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (19))){
var inst_41155 = (state_41254[(7)]);
var inst_41159 = cljs.core.chunk_first.call(null,inst_41155);
var inst_41160 = cljs.core.chunk_rest.call(null,inst_41155);
var inst_41161 = cljs.core.count.call(null,inst_41159);
var inst_41135 = inst_41160;
var inst_41136 = inst_41159;
var inst_41137 = inst_41161;
var inst_41138 = (0);
var state_41254__$1 = (function (){var statearr_41309 = state_41254;
(statearr_41309[(13)] = inst_41136);

(statearr_41309[(14)] = inst_41138);

(statearr_41309[(15)] = inst_41137);

(statearr_41309[(16)] = inst_41135);

return statearr_41309;
})();
var statearr_41310_41377 = state_41254__$1;
(statearr_41310_41377[(2)] = null);

(statearr_41310_41377[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (11))){
var inst_41155 = (state_41254[(7)]);
var inst_41135 = (state_41254[(16)]);
var inst_41155__$1 = cljs.core.seq.call(null,inst_41135);
var state_41254__$1 = (function (){var statearr_41311 = state_41254;
(statearr_41311[(7)] = inst_41155__$1);

return statearr_41311;
})();
if(inst_41155__$1){
var statearr_41312_41378 = state_41254__$1;
(statearr_41312_41378[(1)] = (16));

} else {
var statearr_41313_41379 = state_41254__$1;
(statearr_41313_41379[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (9))){
var inst_41183 = (state_41254[(2)]);
var state_41254__$1 = state_41254;
var statearr_41314_41380 = state_41254__$1;
(statearr_41314_41380[(2)] = inst_41183);

(statearr_41314_41380[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (5))){
var inst_41133 = cljs.core.deref.call(null,cs);
var inst_41134 = cljs.core.seq.call(null,inst_41133);
var inst_41135 = inst_41134;
var inst_41136 = null;
var inst_41137 = (0);
var inst_41138 = (0);
var state_41254__$1 = (function (){var statearr_41315 = state_41254;
(statearr_41315[(13)] = inst_41136);

(statearr_41315[(14)] = inst_41138);

(statearr_41315[(15)] = inst_41137);

(statearr_41315[(16)] = inst_41135);

return statearr_41315;
})();
var statearr_41316_41381 = state_41254__$1;
(statearr_41316_41381[(2)] = null);

(statearr_41316_41381[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (14))){
var state_41254__$1 = state_41254;
var statearr_41317_41382 = state_41254__$1;
(statearr_41317_41382[(2)] = null);

(statearr_41317_41382[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (45))){
var inst_41244 = (state_41254[(2)]);
var state_41254__$1 = state_41254;
var statearr_41318_41383 = state_41254__$1;
(statearr_41318_41383[(2)] = inst_41244);

(statearr_41318_41383[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (26))){
var inst_41186 = (state_41254[(29)]);
var inst_41240 = (state_41254[(2)]);
var inst_41241 = cljs.core.seq.call(null,inst_41186);
var state_41254__$1 = (function (){var statearr_41319 = state_41254;
(statearr_41319[(31)] = inst_41240);

return statearr_41319;
})();
if(inst_41241){
var statearr_41320_41384 = state_41254__$1;
(statearr_41320_41384[(1)] = (42));

} else {
var statearr_41321_41385 = state_41254__$1;
(statearr_41321_41385[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (16))){
var inst_41155 = (state_41254[(7)]);
var inst_41157 = cljs.core.chunked_seq_QMARK_.call(null,inst_41155);
var state_41254__$1 = state_41254;
if(inst_41157){
var statearr_41322_41386 = state_41254__$1;
(statearr_41322_41386[(1)] = (19));

} else {
var statearr_41323_41387 = state_41254__$1;
(statearr_41323_41387[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (38))){
var inst_41233 = (state_41254[(2)]);
var state_41254__$1 = state_41254;
var statearr_41324_41388 = state_41254__$1;
(statearr_41324_41388[(2)] = inst_41233);

(statearr_41324_41388[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (30))){
var state_41254__$1 = state_41254;
var statearr_41325_41389 = state_41254__$1;
(statearr_41325_41389[(2)] = null);

(statearr_41325_41389[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (10))){
var inst_41136 = (state_41254[(13)]);
var inst_41138 = (state_41254[(14)]);
var inst_41144 = cljs.core._nth.call(null,inst_41136,inst_41138);
var inst_41145 = cljs.core.nth.call(null,inst_41144,(0),null);
var inst_41146 = cljs.core.nth.call(null,inst_41144,(1),null);
var state_41254__$1 = (function (){var statearr_41326 = state_41254;
(statearr_41326[(26)] = inst_41145);

return statearr_41326;
})();
if(cljs.core.truth_(inst_41146)){
var statearr_41327_41390 = state_41254__$1;
(statearr_41327_41390[(1)] = (13));

} else {
var statearr_41328_41391 = state_41254__$1;
(statearr_41328_41391[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (18))){
var inst_41179 = (state_41254[(2)]);
var state_41254__$1 = state_41254;
var statearr_41329_41392 = state_41254__$1;
(statearr_41329_41392[(2)] = inst_41179);

(statearr_41329_41392[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (42))){
var state_41254__$1 = state_41254;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_41254__$1,(45),dchan);
} else {
if((state_val_41255 === (37))){
var inst_41213 = (state_41254[(25)]);
var inst_41222 = (state_41254[(23)]);
var inst_41126 = (state_41254[(12)]);
var inst_41222__$1 = cljs.core.first.call(null,inst_41213);
var inst_41223 = cljs.core.async.put_BANG_.call(null,inst_41222__$1,inst_41126,done);
var state_41254__$1 = (function (){var statearr_41330 = state_41254;
(statearr_41330[(23)] = inst_41222__$1);

return statearr_41330;
})();
if(cljs.core.truth_(inst_41223)){
var statearr_41331_41393 = state_41254__$1;
(statearr_41331_41393[(1)] = (39));

} else {
var statearr_41332_41394 = state_41254__$1;
(statearr_41332_41394[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41255 === (8))){
var inst_41138 = (state_41254[(14)]);
var inst_41137 = (state_41254[(15)]);
var inst_41140 = (inst_41138 < inst_41137);
var inst_41141 = inst_41140;
var state_41254__$1 = state_41254;
if(cljs.core.truth_(inst_41141)){
var statearr_41333_41395 = state_41254__$1;
(statearr_41333_41395[(1)] = (10));

} else {
var statearr_41334_41396 = state_41254__$1;
(statearr_41334_41396[(1)] = (11));

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
});})(c__19891__auto___41342,cs,m,dchan,dctr,done))
;
return ((function (switch__19826__auto__,c__19891__auto___41342,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__19827__auto__ = null;
var cljs$core$async$mult_$_state_machine__19827__auto____0 = (function (){
var statearr_41338 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41338[(0)] = cljs$core$async$mult_$_state_machine__19827__auto__);

(statearr_41338[(1)] = (1));

return statearr_41338;
});
var cljs$core$async$mult_$_state_machine__19827__auto____1 = (function (state_41254){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_41254);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e41339){if((e41339 instanceof Object)){
var ex__19830__auto__ = e41339;
var statearr_41340_41397 = state_41254;
(statearr_41340_41397[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_41254);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e41339;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__41398 = state_41254;
state_41254 = G__41398;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__19827__auto__ = function(state_41254){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__19827__auto____1.call(this,state_41254);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__19827__auto____0;
cljs$core$async$mult_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__19827__auto____1;
return cljs$core$async$mult_$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___41342,cs,m,dchan,dctr,done))
})();
var state__19893__auto__ = (function (){var statearr_41341 = f__19892__auto__.call(null);
(statearr_41341[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___41342);

return statearr_41341;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___41342,cs,m,dchan,dctr,done))
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
var args41399 = [];
var len__17325__auto___41402 = arguments.length;
var i__17326__auto___41403 = (0);
while(true){
if((i__17326__auto___41403 < len__17325__auto___41402)){
args41399.push((arguments[i__17326__auto___41403]));

var G__41404 = (i__17326__auto___41403 + (1));
i__17326__auto___41403 = G__41404;
continue;
} else {
}
break;
}

var G__41401 = args41399.length;
switch (G__41401) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args41399.length)].join('')));

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
var len__17325__auto___41416 = arguments.length;
var i__17326__auto___41417 = (0);
while(true){
if((i__17326__auto___41417 < len__17325__auto___41416)){
args__17332__auto__.push((arguments[i__17326__auto___41417]));

var G__41418 = (i__17326__auto___41417 + (1));
i__17326__auto___41417 = G__41418;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((3) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__17333__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__41410){
var map__41411 = p__41410;
var map__41411__$1 = ((((!((map__41411 == null)))?((((map__41411.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41411.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__41411):map__41411);
var opts = map__41411__$1;
var statearr_41413_41419 = state;
(statearr_41413_41419[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4425__auto__ = cljs.core.async.do_alts.call(null,((function (map__41411,map__41411__$1,opts){
return (function (val){
var statearr_41414_41420 = state;
(statearr_41414_41420[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__41411,map__41411__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4425__auto__)){
var cb = temp__4425__auto__;
var statearr_41415_41421 = state;
(statearr_41415_41421[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq41406){
var G__41407 = cljs.core.first.call(null,seq41406);
var seq41406__$1 = cljs.core.next.call(null,seq41406);
var G__41408 = cljs.core.first.call(null,seq41406__$1);
var seq41406__$2 = cljs.core.next.call(null,seq41406__$1);
var G__41409 = cljs.core.first.call(null,seq41406__$2);
var seq41406__$3 = cljs.core.next.call(null,seq41406__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__41407,G__41408,G__41409,seq41406__$3);
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
if(typeof cljs.core.async.t_cljs$core$async41585 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async41585 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta41586){
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
this.meta41586 = meta41586;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async41585.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_41587,meta41586__$1){
var self__ = this;
var _41587__$1 = this;
return (new cljs.core.async.t_cljs$core$async41585(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta41586__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async41585.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_41587){
var self__ = this;
var _41587__$1 = this;
return self__.meta41586;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async41585.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async41585.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async41585.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async41585.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async41585.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async41585.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async41585.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async41585.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
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

cljs.core.async.t_cljs$core$async41585.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),cljs.core.with_meta(new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta41586","meta41586",869099455,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async41585.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async41585.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async41585";

cljs.core.async.t_cljs$core$async41585.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async41585");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async41585 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async41585(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta41586){
return (new cljs.core.async.t_cljs$core$async41585(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta41586));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async41585(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__19891__auto___41748 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___41748,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___41748,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_41685){
var state_val_41686 = (state_41685[(1)]);
if((state_val_41686 === (7))){
var inst_41603 = (state_41685[(2)]);
var state_41685__$1 = state_41685;
var statearr_41687_41749 = state_41685__$1;
(statearr_41687_41749[(2)] = inst_41603);

(statearr_41687_41749[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (20))){
var inst_41615 = (state_41685[(7)]);
var state_41685__$1 = state_41685;
var statearr_41688_41750 = state_41685__$1;
(statearr_41688_41750[(2)] = inst_41615);

(statearr_41688_41750[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (27))){
var state_41685__$1 = state_41685;
var statearr_41689_41751 = state_41685__$1;
(statearr_41689_41751[(2)] = null);

(statearr_41689_41751[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (1))){
var inst_41591 = (state_41685[(8)]);
var inst_41591__$1 = calc_state.call(null);
var inst_41593 = (inst_41591__$1 == null);
var inst_41594 = cljs.core.not.call(null,inst_41593);
var state_41685__$1 = (function (){var statearr_41690 = state_41685;
(statearr_41690[(8)] = inst_41591__$1);

return statearr_41690;
})();
if(inst_41594){
var statearr_41691_41752 = state_41685__$1;
(statearr_41691_41752[(1)] = (2));

} else {
var statearr_41692_41753 = state_41685__$1;
(statearr_41692_41753[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (24))){
var inst_41645 = (state_41685[(9)]);
var inst_41638 = (state_41685[(10)]);
var inst_41659 = (state_41685[(11)]);
var inst_41659__$1 = inst_41638.call(null,inst_41645);
var state_41685__$1 = (function (){var statearr_41693 = state_41685;
(statearr_41693[(11)] = inst_41659__$1);

return statearr_41693;
})();
if(cljs.core.truth_(inst_41659__$1)){
var statearr_41694_41754 = state_41685__$1;
(statearr_41694_41754[(1)] = (29));

} else {
var statearr_41695_41755 = state_41685__$1;
(statearr_41695_41755[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (4))){
var inst_41606 = (state_41685[(2)]);
var state_41685__$1 = state_41685;
if(cljs.core.truth_(inst_41606)){
var statearr_41696_41756 = state_41685__$1;
(statearr_41696_41756[(1)] = (8));

} else {
var statearr_41697_41757 = state_41685__$1;
(statearr_41697_41757[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (15))){
var inst_41632 = (state_41685[(2)]);
var state_41685__$1 = state_41685;
if(cljs.core.truth_(inst_41632)){
var statearr_41698_41758 = state_41685__$1;
(statearr_41698_41758[(1)] = (19));

} else {
var statearr_41699_41759 = state_41685__$1;
(statearr_41699_41759[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (21))){
var inst_41637 = (state_41685[(12)]);
var inst_41637__$1 = (state_41685[(2)]);
var inst_41638 = cljs.core.get.call(null,inst_41637__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_41639 = cljs.core.get.call(null,inst_41637__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_41640 = cljs.core.get.call(null,inst_41637__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_41685__$1 = (function (){var statearr_41700 = state_41685;
(statearr_41700[(13)] = inst_41639);

(statearr_41700[(12)] = inst_41637__$1);

(statearr_41700[(10)] = inst_41638);

return statearr_41700;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_41685__$1,(22),inst_41640);
} else {
if((state_val_41686 === (31))){
var inst_41667 = (state_41685[(2)]);
var state_41685__$1 = state_41685;
if(cljs.core.truth_(inst_41667)){
var statearr_41701_41760 = state_41685__$1;
(statearr_41701_41760[(1)] = (32));

} else {
var statearr_41702_41761 = state_41685__$1;
(statearr_41702_41761[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (32))){
var inst_41644 = (state_41685[(14)]);
var state_41685__$1 = state_41685;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_41685__$1,(35),out,inst_41644);
} else {
if((state_val_41686 === (33))){
var inst_41637 = (state_41685[(12)]);
var inst_41615 = inst_41637;
var state_41685__$1 = (function (){var statearr_41703 = state_41685;
(statearr_41703[(7)] = inst_41615);

return statearr_41703;
})();
var statearr_41704_41762 = state_41685__$1;
(statearr_41704_41762[(2)] = null);

(statearr_41704_41762[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (13))){
var inst_41615 = (state_41685[(7)]);
var inst_41622 = inst_41615.cljs$lang$protocol_mask$partition0$;
var inst_41623 = (inst_41622 & (64));
var inst_41624 = inst_41615.cljs$core$ISeq$;
var inst_41625 = (inst_41623) || (inst_41624);
var state_41685__$1 = state_41685;
if(cljs.core.truth_(inst_41625)){
var statearr_41705_41763 = state_41685__$1;
(statearr_41705_41763[(1)] = (16));

} else {
var statearr_41706_41764 = state_41685__$1;
(statearr_41706_41764[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (22))){
var inst_41645 = (state_41685[(9)]);
var inst_41644 = (state_41685[(14)]);
var inst_41643 = (state_41685[(2)]);
var inst_41644__$1 = cljs.core.nth.call(null,inst_41643,(0),null);
var inst_41645__$1 = cljs.core.nth.call(null,inst_41643,(1),null);
var inst_41646 = (inst_41644__$1 == null);
var inst_41647 = cljs.core._EQ_.call(null,inst_41645__$1,change);
var inst_41648 = (inst_41646) || (inst_41647);
var state_41685__$1 = (function (){var statearr_41707 = state_41685;
(statearr_41707[(9)] = inst_41645__$1);

(statearr_41707[(14)] = inst_41644__$1);

return statearr_41707;
})();
if(cljs.core.truth_(inst_41648)){
var statearr_41708_41765 = state_41685__$1;
(statearr_41708_41765[(1)] = (23));

} else {
var statearr_41709_41766 = state_41685__$1;
(statearr_41709_41766[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (36))){
var inst_41637 = (state_41685[(12)]);
var inst_41615 = inst_41637;
var state_41685__$1 = (function (){var statearr_41710 = state_41685;
(statearr_41710[(7)] = inst_41615);

return statearr_41710;
})();
var statearr_41711_41767 = state_41685__$1;
(statearr_41711_41767[(2)] = null);

(statearr_41711_41767[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (29))){
var inst_41659 = (state_41685[(11)]);
var state_41685__$1 = state_41685;
var statearr_41712_41768 = state_41685__$1;
(statearr_41712_41768[(2)] = inst_41659);

(statearr_41712_41768[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (6))){
var state_41685__$1 = state_41685;
var statearr_41713_41769 = state_41685__$1;
(statearr_41713_41769[(2)] = false);

(statearr_41713_41769[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (28))){
var inst_41655 = (state_41685[(2)]);
var inst_41656 = calc_state.call(null);
var inst_41615 = inst_41656;
var state_41685__$1 = (function (){var statearr_41714 = state_41685;
(statearr_41714[(7)] = inst_41615);

(statearr_41714[(15)] = inst_41655);

return statearr_41714;
})();
var statearr_41715_41770 = state_41685__$1;
(statearr_41715_41770[(2)] = null);

(statearr_41715_41770[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (25))){
var inst_41681 = (state_41685[(2)]);
var state_41685__$1 = state_41685;
var statearr_41716_41771 = state_41685__$1;
(statearr_41716_41771[(2)] = inst_41681);

(statearr_41716_41771[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (34))){
var inst_41679 = (state_41685[(2)]);
var state_41685__$1 = state_41685;
var statearr_41717_41772 = state_41685__$1;
(statearr_41717_41772[(2)] = inst_41679);

(statearr_41717_41772[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (17))){
var state_41685__$1 = state_41685;
var statearr_41718_41773 = state_41685__$1;
(statearr_41718_41773[(2)] = false);

(statearr_41718_41773[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (3))){
var state_41685__$1 = state_41685;
var statearr_41719_41774 = state_41685__$1;
(statearr_41719_41774[(2)] = false);

(statearr_41719_41774[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (12))){
var inst_41683 = (state_41685[(2)]);
var state_41685__$1 = state_41685;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_41685__$1,inst_41683);
} else {
if((state_val_41686 === (2))){
var inst_41591 = (state_41685[(8)]);
var inst_41596 = inst_41591.cljs$lang$protocol_mask$partition0$;
var inst_41597 = (inst_41596 & (64));
var inst_41598 = inst_41591.cljs$core$ISeq$;
var inst_41599 = (inst_41597) || (inst_41598);
var state_41685__$1 = state_41685;
if(cljs.core.truth_(inst_41599)){
var statearr_41720_41775 = state_41685__$1;
(statearr_41720_41775[(1)] = (5));

} else {
var statearr_41721_41776 = state_41685__$1;
(statearr_41721_41776[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (23))){
var inst_41644 = (state_41685[(14)]);
var inst_41650 = (inst_41644 == null);
var state_41685__$1 = state_41685;
if(cljs.core.truth_(inst_41650)){
var statearr_41722_41777 = state_41685__$1;
(statearr_41722_41777[(1)] = (26));

} else {
var statearr_41723_41778 = state_41685__$1;
(statearr_41723_41778[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (35))){
var inst_41670 = (state_41685[(2)]);
var state_41685__$1 = state_41685;
if(cljs.core.truth_(inst_41670)){
var statearr_41724_41779 = state_41685__$1;
(statearr_41724_41779[(1)] = (36));

} else {
var statearr_41725_41780 = state_41685__$1;
(statearr_41725_41780[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (19))){
var inst_41615 = (state_41685[(7)]);
var inst_41634 = cljs.core.apply.call(null,cljs.core.hash_map,inst_41615);
var state_41685__$1 = state_41685;
var statearr_41726_41781 = state_41685__$1;
(statearr_41726_41781[(2)] = inst_41634);

(statearr_41726_41781[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (11))){
var inst_41615 = (state_41685[(7)]);
var inst_41619 = (inst_41615 == null);
var inst_41620 = cljs.core.not.call(null,inst_41619);
var state_41685__$1 = state_41685;
if(inst_41620){
var statearr_41727_41782 = state_41685__$1;
(statearr_41727_41782[(1)] = (13));

} else {
var statearr_41728_41783 = state_41685__$1;
(statearr_41728_41783[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (9))){
var inst_41591 = (state_41685[(8)]);
var state_41685__$1 = state_41685;
var statearr_41729_41784 = state_41685__$1;
(statearr_41729_41784[(2)] = inst_41591);

(statearr_41729_41784[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (5))){
var state_41685__$1 = state_41685;
var statearr_41730_41785 = state_41685__$1;
(statearr_41730_41785[(2)] = true);

(statearr_41730_41785[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (14))){
var state_41685__$1 = state_41685;
var statearr_41731_41786 = state_41685__$1;
(statearr_41731_41786[(2)] = false);

(statearr_41731_41786[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (26))){
var inst_41645 = (state_41685[(9)]);
var inst_41652 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_41645);
var state_41685__$1 = state_41685;
var statearr_41732_41787 = state_41685__$1;
(statearr_41732_41787[(2)] = inst_41652);

(statearr_41732_41787[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (16))){
var state_41685__$1 = state_41685;
var statearr_41733_41788 = state_41685__$1;
(statearr_41733_41788[(2)] = true);

(statearr_41733_41788[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (38))){
var inst_41675 = (state_41685[(2)]);
var state_41685__$1 = state_41685;
var statearr_41734_41789 = state_41685__$1;
(statearr_41734_41789[(2)] = inst_41675);

(statearr_41734_41789[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (30))){
var inst_41645 = (state_41685[(9)]);
var inst_41639 = (state_41685[(13)]);
var inst_41638 = (state_41685[(10)]);
var inst_41662 = cljs.core.empty_QMARK_.call(null,inst_41638);
var inst_41663 = inst_41639.call(null,inst_41645);
var inst_41664 = cljs.core.not.call(null,inst_41663);
var inst_41665 = (inst_41662) && (inst_41664);
var state_41685__$1 = state_41685;
var statearr_41735_41790 = state_41685__$1;
(statearr_41735_41790[(2)] = inst_41665);

(statearr_41735_41790[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (10))){
var inst_41591 = (state_41685[(8)]);
var inst_41611 = (state_41685[(2)]);
var inst_41612 = cljs.core.get.call(null,inst_41611,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_41613 = cljs.core.get.call(null,inst_41611,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_41614 = cljs.core.get.call(null,inst_41611,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_41615 = inst_41591;
var state_41685__$1 = (function (){var statearr_41736 = state_41685;
(statearr_41736[(7)] = inst_41615);

(statearr_41736[(16)] = inst_41612);

(statearr_41736[(17)] = inst_41614);

(statearr_41736[(18)] = inst_41613);

return statearr_41736;
})();
var statearr_41737_41791 = state_41685__$1;
(statearr_41737_41791[(2)] = null);

(statearr_41737_41791[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (18))){
var inst_41629 = (state_41685[(2)]);
var state_41685__$1 = state_41685;
var statearr_41738_41792 = state_41685__$1;
(statearr_41738_41792[(2)] = inst_41629);

(statearr_41738_41792[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (37))){
var state_41685__$1 = state_41685;
var statearr_41739_41793 = state_41685__$1;
(statearr_41739_41793[(2)] = null);

(statearr_41739_41793[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41686 === (8))){
var inst_41591 = (state_41685[(8)]);
var inst_41608 = cljs.core.apply.call(null,cljs.core.hash_map,inst_41591);
var state_41685__$1 = state_41685;
var statearr_41740_41794 = state_41685__$1;
(statearr_41740_41794[(2)] = inst_41608);

(statearr_41740_41794[(1)] = (10));


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
});})(c__19891__auto___41748,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__19826__auto__,c__19891__auto___41748,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__19827__auto__ = null;
var cljs$core$async$mix_$_state_machine__19827__auto____0 = (function (){
var statearr_41744 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41744[(0)] = cljs$core$async$mix_$_state_machine__19827__auto__);

(statearr_41744[(1)] = (1));

return statearr_41744;
});
var cljs$core$async$mix_$_state_machine__19827__auto____1 = (function (state_41685){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_41685);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e41745){if((e41745 instanceof Object)){
var ex__19830__auto__ = e41745;
var statearr_41746_41795 = state_41685;
(statearr_41746_41795[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_41685);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e41745;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__41796 = state_41685;
state_41685 = G__41796;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__19827__auto__ = function(state_41685){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__19827__auto____1.call(this,state_41685);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__19827__auto____0;
cljs$core$async$mix_$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__19827__auto____1;
return cljs$core$async$mix_$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___41748,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__19893__auto__ = (function (){var statearr_41747 = f__19892__auto__.call(null);
(statearr_41747[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___41748);

return statearr_41747;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___41748,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
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
var args41797 = [];
var len__17325__auto___41800 = arguments.length;
var i__17326__auto___41801 = (0);
while(true){
if((i__17326__auto___41801 < len__17325__auto___41800)){
args41797.push((arguments[i__17326__auto___41801]));

var G__41802 = (i__17326__auto___41801 + (1));
i__17326__auto___41801 = G__41802;
continue;
} else {
}
break;
}

var G__41799 = args41797.length;
switch (G__41799) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args41797.length)].join('')));

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
var args41805 = [];
var len__17325__auto___41930 = arguments.length;
var i__17326__auto___41931 = (0);
while(true){
if((i__17326__auto___41931 < len__17325__auto___41930)){
args41805.push((arguments[i__17326__auto___41931]));

var G__41932 = (i__17326__auto___41931 + (1));
i__17326__auto___41931 = G__41932;
continue;
} else {
}
break;
}

var G__41807 = args41805.length;
switch (G__41807) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args41805.length)].join('')));

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
return (function (p1__41804_SHARP_){
if(cljs.core.truth_(p1__41804_SHARP_.call(null,topic))){
return p1__41804_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__41804_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__16267__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async41808 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async41808 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta41809){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta41809 = meta41809;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async41808.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_41810,meta41809__$1){
var self__ = this;
var _41810__$1 = this;
return (new cljs.core.async.t_cljs$core$async41808(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta41809__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async41808.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_41810){
var self__ = this;
var _41810__$1 = this;
return self__.meta41809;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async41808.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async41808.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async41808.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async41808.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async41808.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
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

cljs.core.async.t_cljs$core$async41808.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async41808.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async41808.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta41809","meta41809",-1302474721,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async41808.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async41808.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async41808";

cljs.core.async.t_cljs$core$async41808.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async41808");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async41808 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async41808(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta41809){
return (new cljs.core.async.t_cljs$core$async41808(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta41809));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async41808(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__19891__auto___41934 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___41934,mults,ensure_mult,p){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___41934,mults,ensure_mult,p){
return (function (state_41882){
var state_val_41883 = (state_41882[(1)]);
if((state_val_41883 === (7))){
var inst_41878 = (state_41882[(2)]);
var state_41882__$1 = state_41882;
var statearr_41884_41935 = state_41882__$1;
(statearr_41884_41935[(2)] = inst_41878);

(statearr_41884_41935[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (20))){
var state_41882__$1 = state_41882;
var statearr_41885_41936 = state_41882__$1;
(statearr_41885_41936[(2)] = null);

(statearr_41885_41936[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (1))){
var state_41882__$1 = state_41882;
var statearr_41886_41937 = state_41882__$1;
(statearr_41886_41937[(2)] = null);

(statearr_41886_41937[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (24))){
var inst_41861 = (state_41882[(7)]);
var inst_41870 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_41861);
var state_41882__$1 = state_41882;
var statearr_41887_41938 = state_41882__$1;
(statearr_41887_41938[(2)] = inst_41870);

(statearr_41887_41938[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (4))){
var inst_41813 = (state_41882[(8)]);
var inst_41813__$1 = (state_41882[(2)]);
var inst_41814 = (inst_41813__$1 == null);
var state_41882__$1 = (function (){var statearr_41888 = state_41882;
(statearr_41888[(8)] = inst_41813__$1);

return statearr_41888;
})();
if(cljs.core.truth_(inst_41814)){
var statearr_41889_41939 = state_41882__$1;
(statearr_41889_41939[(1)] = (5));

} else {
var statearr_41890_41940 = state_41882__$1;
(statearr_41890_41940[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (15))){
var inst_41855 = (state_41882[(2)]);
var state_41882__$1 = state_41882;
var statearr_41891_41941 = state_41882__$1;
(statearr_41891_41941[(2)] = inst_41855);

(statearr_41891_41941[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (21))){
var inst_41875 = (state_41882[(2)]);
var state_41882__$1 = (function (){var statearr_41892 = state_41882;
(statearr_41892[(9)] = inst_41875);

return statearr_41892;
})();
var statearr_41893_41942 = state_41882__$1;
(statearr_41893_41942[(2)] = null);

(statearr_41893_41942[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (13))){
var inst_41837 = (state_41882[(10)]);
var inst_41839 = cljs.core.chunked_seq_QMARK_.call(null,inst_41837);
var state_41882__$1 = state_41882;
if(inst_41839){
var statearr_41894_41943 = state_41882__$1;
(statearr_41894_41943[(1)] = (16));

} else {
var statearr_41895_41944 = state_41882__$1;
(statearr_41895_41944[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (22))){
var inst_41867 = (state_41882[(2)]);
var state_41882__$1 = state_41882;
if(cljs.core.truth_(inst_41867)){
var statearr_41896_41945 = state_41882__$1;
(statearr_41896_41945[(1)] = (23));

} else {
var statearr_41897_41946 = state_41882__$1;
(statearr_41897_41946[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (6))){
var inst_41813 = (state_41882[(8)]);
var inst_41863 = (state_41882[(11)]);
var inst_41861 = (state_41882[(7)]);
var inst_41861__$1 = topic_fn.call(null,inst_41813);
var inst_41862 = cljs.core.deref.call(null,mults);
var inst_41863__$1 = cljs.core.get.call(null,inst_41862,inst_41861__$1);
var state_41882__$1 = (function (){var statearr_41898 = state_41882;
(statearr_41898[(11)] = inst_41863__$1);

(statearr_41898[(7)] = inst_41861__$1);

return statearr_41898;
})();
if(cljs.core.truth_(inst_41863__$1)){
var statearr_41899_41947 = state_41882__$1;
(statearr_41899_41947[(1)] = (19));

} else {
var statearr_41900_41948 = state_41882__$1;
(statearr_41900_41948[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (25))){
var inst_41872 = (state_41882[(2)]);
var state_41882__$1 = state_41882;
var statearr_41901_41949 = state_41882__$1;
(statearr_41901_41949[(2)] = inst_41872);

(statearr_41901_41949[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (17))){
var inst_41837 = (state_41882[(10)]);
var inst_41846 = cljs.core.first.call(null,inst_41837);
var inst_41847 = cljs.core.async.muxch_STAR_.call(null,inst_41846);
var inst_41848 = cljs.core.async.close_BANG_.call(null,inst_41847);
var inst_41849 = cljs.core.next.call(null,inst_41837);
var inst_41823 = inst_41849;
var inst_41824 = null;
var inst_41825 = (0);
var inst_41826 = (0);
var state_41882__$1 = (function (){var statearr_41902 = state_41882;
(statearr_41902[(12)] = inst_41825);

(statearr_41902[(13)] = inst_41823);

(statearr_41902[(14)] = inst_41826);

(statearr_41902[(15)] = inst_41824);

(statearr_41902[(16)] = inst_41848);

return statearr_41902;
})();
var statearr_41903_41950 = state_41882__$1;
(statearr_41903_41950[(2)] = null);

(statearr_41903_41950[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (3))){
var inst_41880 = (state_41882[(2)]);
var state_41882__$1 = state_41882;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_41882__$1,inst_41880);
} else {
if((state_val_41883 === (12))){
var inst_41857 = (state_41882[(2)]);
var state_41882__$1 = state_41882;
var statearr_41904_41951 = state_41882__$1;
(statearr_41904_41951[(2)] = inst_41857);

(statearr_41904_41951[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (2))){
var state_41882__$1 = state_41882;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_41882__$1,(4),ch);
} else {
if((state_val_41883 === (23))){
var state_41882__$1 = state_41882;
var statearr_41905_41952 = state_41882__$1;
(statearr_41905_41952[(2)] = null);

(statearr_41905_41952[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (19))){
var inst_41813 = (state_41882[(8)]);
var inst_41863 = (state_41882[(11)]);
var inst_41865 = cljs.core.async.muxch_STAR_.call(null,inst_41863);
var state_41882__$1 = state_41882;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_41882__$1,(22),inst_41865,inst_41813);
} else {
if((state_val_41883 === (11))){
var inst_41837 = (state_41882[(10)]);
var inst_41823 = (state_41882[(13)]);
var inst_41837__$1 = cljs.core.seq.call(null,inst_41823);
var state_41882__$1 = (function (){var statearr_41906 = state_41882;
(statearr_41906[(10)] = inst_41837__$1);

return statearr_41906;
})();
if(inst_41837__$1){
var statearr_41907_41953 = state_41882__$1;
(statearr_41907_41953[(1)] = (13));

} else {
var statearr_41908_41954 = state_41882__$1;
(statearr_41908_41954[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (9))){
var inst_41859 = (state_41882[(2)]);
var state_41882__$1 = state_41882;
var statearr_41909_41955 = state_41882__$1;
(statearr_41909_41955[(2)] = inst_41859);

(statearr_41909_41955[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (5))){
var inst_41820 = cljs.core.deref.call(null,mults);
var inst_41821 = cljs.core.vals.call(null,inst_41820);
var inst_41822 = cljs.core.seq.call(null,inst_41821);
var inst_41823 = inst_41822;
var inst_41824 = null;
var inst_41825 = (0);
var inst_41826 = (0);
var state_41882__$1 = (function (){var statearr_41910 = state_41882;
(statearr_41910[(12)] = inst_41825);

(statearr_41910[(13)] = inst_41823);

(statearr_41910[(14)] = inst_41826);

(statearr_41910[(15)] = inst_41824);

return statearr_41910;
})();
var statearr_41911_41956 = state_41882__$1;
(statearr_41911_41956[(2)] = null);

(statearr_41911_41956[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (14))){
var state_41882__$1 = state_41882;
var statearr_41915_41957 = state_41882__$1;
(statearr_41915_41957[(2)] = null);

(statearr_41915_41957[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (16))){
var inst_41837 = (state_41882[(10)]);
var inst_41841 = cljs.core.chunk_first.call(null,inst_41837);
var inst_41842 = cljs.core.chunk_rest.call(null,inst_41837);
var inst_41843 = cljs.core.count.call(null,inst_41841);
var inst_41823 = inst_41842;
var inst_41824 = inst_41841;
var inst_41825 = inst_41843;
var inst_41826 = (0);
var state_41882__$1 = (function (){var statearr_41916 = state_41882;
(statearr_41916[(12)] = inst_41825);

(statearr_41916[(13)] = inst_41823);

(statearr_41916[(14)] = inst_41826);

(statearr_41916[(15)] = inst_41824);

return statearr_41916;
})();
var statearr_41917_41958 = state_41882__$1;
(statearr_41917_41958[(2)] = null);

(statearr_41917_41958[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (10))){
var inst_41825 = (state_41882[(12)]);
var inst_41823 = (state_41882[(13)]);
var inst_41826 = (state_41882[(14)]);
var inst_41824 = (state_41882[(15)]);
var inst_41831 = cljs.core._nth.call(null,inst_41824,inst_41826);
var inst_41832 = cljs.core.async.muxch_STAR_.call(null,inst_41831);
var inst_41833 = cljs.core.async.close_BANG_.call(null,inst_41832);
var inst_41834 = (inst_41826 + (1));
var tmp41912 = inst_41825;
var tmp41913 = inst_41823;
var tmp41914 = inst_41824;
var inst_41823__$1 = tmp41913;
var inst_41824__$1 = tmp41914;
var inst_41825__$1 = tmp41912;
var inst_41826__$1 = inst_41834;
var state_41882__$1 = (function (){var statearr_41918 = state_41882;
(statearr_41918[(12)] = inst_41825__$1);

(statearr_41918[(17)] = inst_41833);

(statearr_41918[(13)] = inst_41823__$1);

(statearr_41918[(14)] = inst_41826__$1);

(statearr_41918[(15)] = inst_41824__$1);

return statearr_41918;
})();
var statearr_41919_41959 = state_41882__$1;
(statearr_41919_41959[(2)] = null);

(statearr_41919_41959[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (18))){
var inst_41852 = (state_41882[(2)]);
var state_41882__$1 = state_41882;
var statearr_41920_41960 = state_41882__$1;
(statearr_41920_41960[(2)] = inst_41852);

(statearr_41920_41960[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41883 === (8))){
var inst_41825 = (state_41882[(12)]);
var inst_41826 = (state_41882[(14)]);
var inst_41828 = (inst_41826 < inst_41825);
var inst_41829 = inst_41828;
var state_41882__$1 = state_41882;
if(cljs.core.truth_(inst_41829)){
var statearr_41921_41961 = state_41882__$1;
(statearr_41921_41961[(1)] = (10));

} else {
var statearr_41922_41962 = state_41882__$1;
(statearr_41922_41962[(1)] = (11));

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
});})(c__19891__auto___41934,mults,ensure_mult,p))
;
return ((function (switch__19826__auto__,c__19891__auto___41934,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__19827__auto__ = null;
var cljs$core$async$state_machine__19827__auto____0 = (function (){
var statearr_41926 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41926[(0)] = cljs$core$async$state_machine__19827__auto__);

(statearr_41926[(1)] = (1));

return statearr_41926;
});
var cljs$core$async$state_machine__19827__auto____1 = (function (state_41882){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_41882);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e41927){if((e41927 instanceof Object)){
var ex__19830__auto__ = e41927;
var statearr_41928_41963 = state_41882;
(statearr_41928_41963[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_41882);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e41927;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__41964 = state_41882;
state_41882 = G__41964;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$state_machine__19827__auto__ = function(state_41882){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19827__auto____1.call(this,state_41882);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19827__auto____0;
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19827__auto____1;
return cljs$core$async$state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___41934,mults,ensure_mult,p))
})();
var state__19893__auto__ = (function (){var statearr_41929 = f__19892__auto__.call(null);
(statearr_41929[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___41934);

return statearr_41929;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___41934,mults,ensure_mult,p))
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
var args41965 = [];
var len__17325__auto___41968 = arguments.length;
var i__17326__auto___41969 = (0);
while(true){
if((i__17326__auto___41969 < len__17325__auto___41968)){
args41965.push((arguments[i__17326__auto___41969]));

var G__41970 = (i__17326__auto___41969 + (1));
i__17326__auto___41969 = G__41970;
continue;
} else {
}
break;
}

var G__41967 = args41965.length;
switch (G__41967) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args41965.length)].join('')));

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
var args41972 = [];
var len__17325__auto___41975 = arguments.length;
var i__17326__auto___41976 = (0);
while(true){
if((i__17326__auto___41976 < len__17325__auto___41975)){
args41972.push((arguments[i__17326__auto___41976]));

var G__41977 = (i__17326__auto___41976 + (1));
i__17326__auto___41976 = G__41977;
continue;
} else {
}
break;
}

var G__41974 = args41972.length;
switch (G__41974) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args41972.length)].join('')));

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
var args41979 = [];
var len__17325__auto___42050 = arguments.length;
var i__17326__auto___42051 = (0);
while(true){
if((i__17326__auto___42051 < len__17325__auto___42050)){
args41979.push((arguments[i__17326__auto___42051]));

var G__42052 = (i__17326__auto___42051 + (1));
i__17326__auto___42051 = G__42052;
continue;
} else {
}
break;
}

var G__41981 = args41979.length;
switch (G__41981) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args41979.length)].join('')));

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
var c__19891__auto___42054 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___42054,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___42054,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_42020){
var state_val_42021 = (state_42020[(1)]);
if((state_val_42021 === (7))){
var state_42020__$1 = state_42020;
var statearr_42022_42055 = state_42020__$1;
(statearr_42022_42055[(2)] = null);

(statearr_42022_42055[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42021 === (1))){
var state_42020__$1 = state_42020;
var statearr_42023_42056 = state_42020__$1;
(statearr_42023_42056[(2)] = null);

(statearr_42023_42056[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42021 === (4))){
var inst_41984 = (state_42020[(7)]);
var inst_41986 = (inst_41984 < cnt);
var state_42020__$1 = state_42020;
if(cljs.core.truth_(inst_41986)){
var statearr_42024_42057 = state_42020__$1;
(statearr_42024_42057[(1)] = (6));

} else {
var statearr_42025_42058 = state_42020__$1;
(statearr_42025_42058[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42021 === (15))){
var inst_42016 = (state_42020[(2)]);
var state_42020__$1 = state_42020;
var statearr_42026_42059 = state_42020__$1;
(statearr_42026_42059[(2)] = inst_42016);

(statearr_42026_42059[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42021 === (13))){
var inst_42009 = cljs.core.async.close_BANG_.call(null,out);
var state_42020__$1 = state_42020;
var statearr_42027_42060 = state_42020__$1;
(statearr_42027_42060[(2)] = inst_42009);

(statearr_42027_42060[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42021 === (6))){
var state_42020__$1 = state_42020;
var statearr_42028_42061 = state_42020__$1;
(statearr_42028_42061[(2)] = null);

(statearr_42028_42061[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42021 === (3))){
var inst_42018 = (state_42020[(2)]);
var state_42020__$1 = state_42020;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42020__$1,inst_42018);
} else {
if((state_val_42021 === (12))){
var inst_42006 = (state_42020[(8)]);
var inst_42006__$1 = (state_42020[(2)]);
var inst_42007 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_42006__$1);
var state_42020__$1 = (function (){var statearr_42029 = state_42020;
(statearr_42029[(8)] = inst_42006__$1);

return statearr_42029;
})();
if(cljs.core.truth_(inst_42007)){
var statearr_42030_42062 = state_42020__$1;
(statearr_42030_42062[(1)] = (13));

} else {
var statearr_42031_42063 = state_42020__$1;
(statearr_42031_42063[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42021 === (2))){
var inst_41983 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_41984 = (0);
var state_42020__$1 = (function (){var statearr_42032 = state_42020;
(statearr_42032[(9)] = inst_41983);

(statearr_42032[(7)] = inst_41984);

return statearr_42032;
})();
var statearr_42033_42064 = state_42020__$1;
(statearr_42033_42064[(2)] = null);

(statearr_42033_42064[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42021 === (11))){
var inst_41984 = (state_42020[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_42020,(10),Object,null,(9));
var inst_41993 = chs__$1.call(null,inst_41984);
var inst_41994 = done.call(null,inst_41984);
var inst_41995 = cljs.core.async.take_BANG_.call(null,inst_41993,inst_41994);
var state_42020__$1 = state_42020;
var statearr_42034_42065 = state_42020__$1;
(statearr_42034_42065[(2)] = inst_41995);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42020__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42021 === (9))){
var inst_41984 = (state_42020[(7)]);
var inst_41997 = (state_42020[(2)]);
var inst_41998 = (inst_41984 + (1));
var inst_41984__$1 = inst_41998;
var state_42020__$1 = (function (){var statearr_42035 = state_42020;
(statearr_42035[(10)] = inst_41997);

(statearr_42035[(7)] = inst_41984__$1);

return statearr_42035;
})();
var statearr_42036_42066 = state_42020__$1;
(statearr_42036_42066[(2)] = null);

(statearr_42036_42066[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42021 === (5))){
var inst_42004 = (state_42020[(2)]);
var state_42020__$1 = (function (){var statearr_42037 = state_42020;
(statearr_42037[(11)] = inst_42004);

return statearr_42037;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42020__$1,(12),dchan);
} else {
if((state_val_42021 === (14))){
var inst_42006 = (state_42020[(8)]);
var inst_42011 = cljs.core.apply.call(null,f,inst_42006);
var state_42020__$1 = state_42020;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42020__$1,(16),out,inst_42011);
} else {
if((state_val_42021 === (16))){
var inst_42013 = (state_42020[(2)]);
var state_42020__$1 = (function (){var statearr_42038 = state_42020;
(statearr_42038[(12)] = inst_42013);

return statearr_42038;
})();
var statearr_42039_42067 = state_42020__$1;
(statearr_42039_42067[(2)] = null);

(statearr_42039_42067[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42021 === (10))){
var inst_41988 = (state_42020[(2)]);
var inst_41989 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_42020__$1 = (function (){var statearr_42040 = state_42020;
(statearr_42040[(13)] = inst_41988);

return statearr_42040;
})();
var statearr_42041_42068 = state_42020__$1;
(statearr_42041_42068[(2)] = inst_41989);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42020__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42021 === (8))){
var inst_42002 = (state_42020[(2)]);
var state_42020__$1 = state_42020;
var statearr_42042_42069 = state_42020__$1;
(statearr_42042_42069[(2)] = inst_42002);

(statearr_42042_42069[(1)] = (5));


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
});})(c__19891__auto___42054,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__19826__auto__,c__19891__auto___42054,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__19827__auto__ = null;
var cljs$core$async$state_machine__19827__auto____0 = (function (){
var statearr_42046 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42046[(0)] = cljs$core$async$state_machine__19827__auto__);

(statearr_42046[(1)] = (1));

return statearr_42046;
});
var cljs$core$async$state_machine__19827__auto____1 = (function (state_42020){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_42020);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e42047){if((e42047 instanceof Object)){
var ex__19830__auto__ = e42047;
var statearr_42048_42070 = state_42020;
(statearr_42048_42070[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42020);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42047;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42071 = state_42020;
state_42020 = G__42071;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$state_machine__19827__auto__ = function(state_42020){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19827__auto____1.call(this,state_42020);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19827__auto____0;
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19827__auto____1;
return cljs$core$async$state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___42054,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__19893__auto__ = (function (){var statearr_42049 = f__19892__auto__.call(null);
(statearr_42049[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___42054);

return statearr_42049;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___42054,chs__$1,out,cnt,rets,dchan,dctr,done))
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
var args42073 = [];
var len__17325__auto___42129 = arguments.length;
var i__17326__auto___42130 = (0);
while(true){
if((i__17326__auto___42130 < len__17325__auto___42129)){
args42073.push((arguments[i__17326__auto___42130]));

var G__42131 = (i__17326__auto___42130 + (1));
i__17326__auto___42130 = G__42131;
continue;
} else {
}
break;
}

var G__42075 = args42073.length;
switch (G__42075) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args42073.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19891__auto___42133 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___42133,out){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___42133,out){
return (function (state_42105){
var state_val_42106 = (state_42105[(1)]);
if((state_val_42106 === (7))){
var inst_42085 = (state_42105[(7)]);
var inst_42084 = (state_42105[(8)]);
var inst_42084__$1 = (state_42105[(2)]);
var inst_42085__$1 = cljs.core.nth.call(null,inst_42084__$1,(0),null);
var inst_42086 = cljs.core.nth.call(null,inst_42084__$1,(1),null);
var inst_42087 = (inst_42085__$1 == null);
var state_42105__$1 = (function (){var statearr_42107 = state_42105;
(statearr_42107[(7)] = inst_42085__$1);

(statearr_42107[(9)] = inst_42086);

(statearr_42107[(8)] = inst_42084__$1);

return statearr_42107;
})();
if(cljs.core.truth_(inst_42087)){
var statearr_42108_42134 = state_42105__$1;
(statearr_42108_42134[(1)] = (8));

} else {
var statearr_42109_42135 = state_42105__$1;
(statearr_42109_42135[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42106 === (1))){
var inst_42076 = cljs.core.vec.call(null,chs);
var inst_42077 = inst_42076;
var state_42105__$1 = (function (){var statearr_42110 = state_42105;
(statearr_42110[(10)] = inst_42077);

return statearr_42110;
})();
var statearr_42111_42136 = state_42105__$1;
(statearr_42111_42136[(2)] = null);

(statearr_42111_42136[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42106 === (4))){
var inst_42077 = (state_42105[(10)]);
var state_42105__$1 = state_42105;
return cljs.core.async.ioc_alts_BANG_.call(null,state_42105__$1,(7),inst_42077);
} else {
if((state_val_42106 === (6))){
var inst_42101 = (state_42105[(2)]);
var state_42105__$1 = state_42105;
var statearr_42112_42137 = state_42105__$1;
(statearr_42112_42137[(2)] = inst_42101);

(statearr_42112_42137[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42106 === (3))){
var inst_42103 = (state_42105[(2)]);
var state_42105__$1 = state_42105;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42105__$1,inst_42103);
} else {
if((state_val_42106 === (2))){
var inst_42077 = (state_42105[(10)]);
var inst_42079 = cljs.core.count.call(null,inst_42077);
var inst_42080 = (inst_42079 > (0));
var state_42105__$1 = state_42105;
if(cljs.core.truth_(inst_42080)){
var statearr_42114_42138 = state_42105__$1;
(statearr_42114_42138[(1)] = (4));

} else {
var statearr_42115_42139 = state_42105__$1;
(statearr_42115_42139[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42106 === (11))){
var inst_42077 = (state_42105[(10)]);
var inst_42094 = (state_42105[(2)]);
var tmp42113 = inst_42077;
var inst_42077__$1 = tmp42113;
var state_42105__$1 = (function (){var statearr_42116 = state_42105;
(statearr_42116[(11)] = inst_42094);

(statearr_42116[(10)] = inst_42077__$1);

return statearr_42116;
})();
var statearr_42117_42140 = state_42105__$1;
(statearr_42117_42140[(2)] = null);

(statearr_42117_42140[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42106 === (9))){
var inst_42085 = (state_42105[(7)]);
var state_42105__$1 = state_42105;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42105__$1,(11),out,inst_42085);
} else {
if((state_val_42106 === (5))){
var inst_42099 = cljs.core.async.close_BANG_.call(null,out);
var state_42105__$1 = state_42105;
var statearr_42118_42141 = state_42105__$1;
(statearr_42118_42141[(2)] = inst_42099);

(statearr_42118_42141[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42106 === (10))){
var inst_42097 = (state_42105[(2)]);
var state_42105__$1 = state_42105;
var statearr_42119_42142 = state_42105__$1;
(statearr_42119_42142[(2)] = inst_42097);

(statearr_42119_42142[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42106 === (8))){
var inst_42085 = (state_42105[(7)]);
var inst_42086 = (state_42105[(9)]);
var inst_42084 = (state_42105[(8)]);
var inst_42077 = (state_42105[(10)]);
var inst_42089 = (function (){var cs = inst_42077;
var vec__42082 = inst_42084;
var v = inst_42085;
var c = inst_42086;
return ((function (cs,vec__42082,v,c,inst_42085,inst_42086,inst_42084,inst_42077,state_val_42106,c__19891__auto___42133,out){
return (function (p1__42072_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__42072_SHARP_);
});
;})(cs,vec__42082,v,c,inst_42085,inst_42086,inst_42084,inst_42077,state_val_42106,c__19891__auto___42133,out))
})();
var inst_42090 = cljs.core.filterv.call(null,inst_42089,inst_42077);
var inst_42077__$1 = inst_42090;
var state_42105__$1 = (function (){var statearr_42120 = state_42105;
(statearr_42120[(10)] = inst_42077__$1);

return statearr_42120;
})();
var statearr_42121_42143 = state_42105__$1;
(statearr_42121_42143[(2)] = null);

(statearr_42121_42143[(1)] = (2));


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
});})(c__19891__auto___42133,out))
;
return ((function (switch__19826__auto__,c__19891__auto___42133,out){
return (function() {
var cljs$core$async$state_machine__19827__auto__ = null;
var cljs$core$async$state_machine__19827__auto____0 = (function (){
var statearr_42125 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42125[(0)] = cljs$core$async$state_machine__19827__auto__);

(statearr_42125[(1)] = (1));

return statearr_42125;
});
var cljs$core$async$state_machine__19827__auto____1 = (function (state_42105){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_42105);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e42126){if((e42126 instanceof Object)){
var ex__19830__auto__ = e42126;
var statearr_42127_42144 = state_42105;
(statearr_42127_42144[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42105);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42126;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42145 = state_42105;
state_42105 = G__42145;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$state_machine__19827__auto__ = function(state_42105){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19827__auto____1.call(this,state_42105);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19827__auto____0;
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19827__auto____1;
return cljs$core$async$state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___42133,out))
})();
var state__19893__auto__ = (function (){var statearr_42128 = f__19892__auto__.call(null);
(statearr_42128[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___42133);

return statearr_42128;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___42133,out))
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
var args42146 = [];
var len__17325__auto___42195 = arguments.length;
var i__17326__auto___42196 = (0);
while(true){
if((i__17326__auto___42196 < len__17325__auto___42195)){
args42146.push((arguments[i__17326__auto___42196]));

var G__42197 = (i__17326__auto___42196 + (1));
i__17326__auto___42196 = G__42197;
continue;
} else {
}
break;
}

var G__42148 = args42146.length;
switch (G__42148) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args42146.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19891__auto___42199 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___42199,out){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___42199,out){
return (function (state_42172){
var state_val_42173 = (state_42172[(1)]);
if((state_val_42173 === (7))){
var inst_42154 = (state_42172[(7)]);
var inst_42154__$1 = (state_42172[(2)]);
var inst_42155 = (inst_42154__$1 == null);
var inst_42156 = cljs.core.not.call(null,inst_42155);
var state_42172__$1 = (function (){var statearr_42174 = state_42172;
(statearr_42174[(7)] = inst_42154__$1);

return statearr_42174;
})();
if(inst_42156){
var statearr_42175_42200 = state_42172__$1;
(statearr_42175_42200[(1)] = (8));

} else {
var statearr_42176_42201 = state_42172__$1;
(statearr_42176_42201[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42173 === (1))){
var inst_42149 = (0);
var state_42172__$1 = (function (){var statearr_42177 = state_42172;
(statearr_42177[(8)] = inst_42149);

return statearr_42177;
})();
var statearr_42178_42202 = state_42172__$1;
(statearr_42178_42202[(2)] = null);

(statearr_42178_42202[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42173 === (4))){
var state_42172__$1 = state_42172;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42172__$1,(7),ch);
} else {
if((state_val_42173 === (6))){
var inst_42167 = (state_42172[(2)]);
var state_42172__$1 = state_42172;
var statearr_42179_42203 = state_42172__$1;
(statearr_42179_42203[(2)] = inst_42167);

(statearr_42179_42203[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42173 === (3))){
var inst_42169 = (state_42172[(2)]);
var inst_42170 = cljs.core.async.close_BANG_.call(null,out);
var state_42172__$1 = (function (){var statearr_42180 = state_42172;
(statearr_42180[(9)] = inst_42169);

return statearr_42180;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42172__$1,inst_42170);
} else {
if((state_val_42173 === (2))){
var inst_42149 = (state_42172[(8)]);
var inst_42151 = (inst_42149 < n);
var state_42172__$1 = state_42172;
if(cljs.core.truth_(inst_42151)){
var statearr_42181_42204 = state_42172__$1;
(statearr_42181_42204[(1)] = (4));

} else {
var statearr_42182_42205 = state_42172__$1;
(statearr_42182_42205[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42173 === (11))){
var inst_42149 = (state_42172[(8)]);
var inst_42159 = (state_42172[(2)]);
var inst_42160 = (inst_42149 + (1));
var inst_42149__$1 = inst_42160;
var state_42172__$1 = (function (){var statearr_42183 = state_42172;
(statearr_42183[(8)] = inst_42149__$1);

(statearr_42183[(10)] = inst_42159);

return statearr_42183;
})();
var statearr_42184_42206 = state_42172__$1;
(statearr_42184_42206[(2)] = null);

(statearr_42184_42206[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42173 === (9))){
var state_42172__$1 = state_42172;
var statearr_42185_42207 = state_42172__$1;
(statearr_42185_42207[(2)] = null);

(statearr_42185_42207[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42173 === (5))){
var state_42172__$1 = state_42172;
var statearr_42186_42208 = state_42172__$1;
(statearr_42186_42208[(2)] = null);

(statearr_42186_42208[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42173 === (10))){
var inst_42164 = (state_42172[(2)]);
var state_42172__$1 = state_42172;
var statearr_42187_42209 = state_42172__$1;
(statearr_42187_42209[(2)] = inst_42164);

(statearr_42187_42209[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42173 === (8))){
var inst_42154 = (state_42172[(7)]);
var state_42172__$1 = state_42172;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42172__$1,(11),out,inst_42154);
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
});})(c__19891__auto___42199,out))
;
return ((function (switch__19826__auto__,c__19891__auto___42199,out){
return (function() {
var cljs$core$async$state_machine__19827__auto__ = null;
var cljs$core$async$state_machine__19827__auto____0 = (function (){
var statearr_42191 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_42191[(0)] = cljs$core$async$state_machine__19827__auto__);

(statearr_42191[(1)] = (1));

return statearr_42191;
});
var cljs$core$async$state_machine__19827__auto____1 = (function (state_42172){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_42172);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e42192){if((e42192 instanceof Object)){
var ex__19830__auto__ = e42192;
var statearr_42193_42210 = state_42172;
(statearr_42193_42210[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42172);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42192;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42211 = state_42172;
state_42172 = G__42211;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$state_machine__19827__auto__ = function(state_42172){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19827__auto____1.call(this,state_42172);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19827__auto____0;
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19827__auto____1;
return cljs$core$async$state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___42199,out))
})();
var state__19893__auto__ = (function (){var statearr_42194 = f__19892__auto__.call(null);
(statearr_42194[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___42199);

return statearr_42194;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___42199,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async42219 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async42219 = (function (map_LT_,f,ch,meta42220){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta42220 = meta42220;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async42219.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_42221,meta42220__$1){
var self__ = this;
var _42221__$1 = this;
return (new cljs.core.async.t_cljs$core$async42219(self__.map_LT_,self__.f,self__.ch,meta42220__$1));
});

cljs.core.async.t_cljs$core$async42219.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_42221){
var self__ = this;
var _42221__$1 = this;
return self__.meta42220;
});

cljs.core.async.t_cljs$core$async42219.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async42219.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async42219.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async42219.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async42219.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async42222 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async42222 = (function (map_LT_,f,ch,meta42220,_,fn1,meta42223){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta42220 = meta42220;
this._ = _;
this.fn1 = fn1;
this.meta42223 = meta42223;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async42222.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_42224,meta42223__$1){
var self__ = this;
var _42224__$1 = this;
return (new cljs.core.async.t_cljs$core$async42222(self__.map_LT_,self__.f,self__.ch,self__.meta42220,self__._,self__.fn1,meta42223__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async42222.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_42224){
var self__ = this;
var _42224__$1 = this;
return self__.meta42223;
});})(___$1))
;

cljs.core.async.t_cljs$core$async42222.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async42222.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async42222.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__42212_SHARP_){
return f1.call(null,(((p1__42212_SHARP_ == null))?null:self__.f.call(null,p1__42212_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async42222.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta42220","meta42220",-1715265378,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async42219","cljs.core.async/t_cljs$core$async42219",1257260992,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta42223","meta42223",626606335,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async42222.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async42222.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async42222";

cljs.core.async.t_cljs$core$async42222.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async42222");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async42222 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async42222(map_LT___$1,f__$1,ch__$1,meta42220__$1,___$2,fn1__$1,meta42223){
return (new cljs.core.async.t_cljs$core$async42222(map_LT___$1,f__$1,ch__$1,meta42220__$1,___$2,fn1__$1,meta42223));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async42222(self__.map_LT_,self__.f,self__.ch,self__.meta42220,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
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

cljs.core.async.t_cljs$core$async42219.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async42219.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async42219.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta42220","meta42220",-1715265378,null)], null);
});

cljs.core.async.t_cljs$core$async42219.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async42219.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async42219";

cljs.core.async.t_cljs$core$async42219.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async42219");
});

cljs.core.async.__GT_t_cljs$core$async42219 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async42219(map_LT___$1,f__$1,ch__$1,meta42220){
return (new cljs.core.async.t_cljs$core$async42219(map_LT___$1,f__$1,ch__$1,meta42220));
});

}

return (new cljs.core.async.t_cljs$core$async42219(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async42228 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async42228 = (function (map_GT_,f,ch,meta42229){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta42229 = meta42229;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async42228.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_42230,meta42229__$1){
var self__ = this;
var _42230__$1 = this;
return (new cljs.core.async.t_cljs$core$async42228(self__.map_GT_,self__.f,self__.ch,meta42229__$1));
});

cljs.core.async.t_cljs$core$async42228.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_42230){
var self__ = this;
var _42230__$1 = this;
return self__.meta42229;
});

cljs.core.async.t_cljs$core$async42228.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async42228.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async42228.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async42228.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async42228.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async42228.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async42228.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta42229","meta42229",-1810221590,null)], null);
});

cljs.core.async.t_cljs$core$async42228.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async42228.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async42228";

cljs.core.async.t_cljs$core$async42228.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async42228");
});

cljs.core.async.__GT_t_cljs$core$async42228 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async42228(map_GT___$1,f__$1,ch__$1,meta42229){
return (new cljs.core.async.t_cljs$core$async42228(map_GT___$1,f__$1,ch__$1,meta42229));
});

}

return (new cljs.core.async.t_cljs$core$async42228(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async42234 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async42234 = (function (filter_GT_,p,ch,meta42235){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta42235 = meta42235;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async42234.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_42236,meta42235__$1){
var self__ = this;
var _42236__$1 = this;
return (new cljs.core.async.t_cljs$core$async42234(self__.filter_GT_,self__.p,self__.ch,meta42235__$1));
});

cljs.core.async.t_cljs$core$async42234.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_42236){
var self__ = this;
var _42236__$1 = this;
return self__.meta42235;
});

cljs.core.async.t_cljs$core$async42234.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async42234.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async42234.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async42234.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async42234.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async42234.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async42234.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async42234.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta42235","meta42235",634184435,null)], null);
});

cljs.core.async.t_cljs$core$async42234.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async42234.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async42234";

cljs.core.async.t_cljs$core$async42234.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async42234");
});

cljs.core.async.__GT_t_cljs$core$async42234 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async42234(filter_GT___$1,p__$1,ch__$1,meta42235){
return (new cljs.core.async.t_cljs$core$async42234(filter_GT___$1,p__$1,ch__$1,meta42235));
});

}

return (new cljs.core.async.t_cljs$core$async42234(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
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
var args42237 = [];
var len__17325__auto___42281 = arguments.length;
var i__17326__auto___42282 = (0);
while(true){
if((i__17326__auto___42282 < len__17325__auto___42281)){
args42237.push((arguments[i__17326__auto___42282]));

var G__42283 = (i__17326__auto___42282 + (1));
i__17326__auto___42282 = G__42283;
continue;
} else {
}
break;
}

var G__42239 = args42237.length;
switch (G__42239) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args42237.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19891__auto___42285 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___42285,out){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___42285,out){
return (function (state_42260){
var state_val_42261 = (state_42260[(1)]);
if((state_val_42261 === (7))){
var inst_42256 = (state_42260[(2)]);
var state_42260__$1 = state_42260;
var statearr_42262_42286 = state_42260__$1;
(statearr_42262_42286[(2)] = inst_42256);

(statearr_42262_42286[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42261 === (1))){
var state_42260__$1 = state_42260;
var statearr_42263_42287 = state_42260__$1;
(statearr_42263_42287[(2)] = null);

(statearr_42263_42287[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42261 === (4))){
var inst_42242 = (state_42260[(7)]);
var inst_42242__$1 = (state_42260[(2)]);
var inst_42243 = (inst_42242__$1 == null);
var state_42260__$1 = (function (){var statearr_42264 = state_42260;
(statearr_42264[(7)] = inst_42242__$1);

return statearr_42264;
})();
if(cljs.core.truth_(inst_42243)){
var statearr_42265_42288 = state_42260__$1;
(statearr_42265_42288[(1)] = (5));

} else {
var statearr_42266_42289 = state_42260__$1;
(statearr_42266_42289[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42261 === (6))){
var inst_42242 = (state_42260[(7)]);
var inst_42247 = p.call(null,inst_42242);
var state_42260__$1 = state_42260;
if(cljs.core.truth_(inst_42247)){
var statearr_42267_42290 = state_42260__$1;
(statearr_42267_42290[(1)] = (8));

} else {
var statearr_42268_42291 = state_42260__$1;
(statearr_42268_42291[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42261 === (3))){
var inst_42258 = (state_42260[(2)]);
var state_42260__$1 = state_42260;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42260__$1,inst_42258);
} else {
if((state_val_42261 === (2))){
var state_42260__$1 = state_42260;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42260__$1,(4),ch);
} else {
if((state_val_42261 === (11))){
var inst_42250 = (state_42260[(2)]);
var state_42260__$1 = state_42260;
var statearr_42269_42292 = state_42260__$1;
(statearr_42269_42292[(2)] = inst_42250);

(statearr_42269_42292[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42261 === (9))){
var state_42260__$1 = state_42260;
var statearr_42270_42293 = state_42260__$1;
(statearr_42270_42293[(2)] = null);

(statearr_42270_42293[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42261 === (5))){
var inst_42245 = cljs.core.async.close_BANG_.call(null,out);
var state_42260__$1 = state_42260;
var statearr_42271_42294 = state_42260__$1;
(statearr_42271_42294[(2)] = inst_42245);

(statearr_42271_42294[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42261 === (10))){
var inst_42253 = (state_42260[(2)]);
var state_42260__$1 = (function (){var statearr_42272 = state_42260;
(statearr_42272[(8)] = inst_42253);

return statearr_42272;
})();
var statearr_42273_42295 = state_42260__$1;
(statearr_42273_42295[(2)] = null);

(statearr_42273_42295[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42261 === (8))){
var inst_42242 = (state_42260[(7)]);
var state_42260__$1 = state_42260;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42260__$1,(11),out,inst_42242);
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
});})(c__19891__auto___42285,out))
;
return ((function (switch__19826__auto__,c__19891__auto___42285,out){
return (function() {
var cljs$core$async$state_machine__19827__auto__ = null;
var cljs$core$async$state_machine__19827__auto____0 = (function (){
var statearr_42277 = [null,null,null,null,null,null,null,null,null];
(statearr_42277[(0)] = cljs$core$async$state_machine__19827__auto__);

(statearr_42277[(1)] = (1));

return statearr_42277;
});
var cljs$core$async$state_machine__19827__auto____1 = (function (state_42260){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_42260);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e42278){if((e42278 instanceof Object)){
var ex__19830__auto__ = e42278;
var statearr_42279_42296 = state_42260;
(statearr_42279_42296[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42260);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42278;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42297 = state_42260;
state_42260 = G__42297;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$state_machine__19827__auto__ = function(state_42260){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19827__auto____1.call(this,state_42260);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19827__auto____0;
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19827__auto____1;
return cljs$core$async$state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___42285,out))
})();
var state__19893__auto__ = (function (){var statearr_42280 = f__19892__auto__.call(null);
(statearr_42280[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___42285);

return statearr_42280;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___42285,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args42298 = [];
var len__17325__auto___42301 = arguments.length;
var i__17326__auto___42302 = (0);
while(true){
if((i__17326__auto___42302 < len__17325__auto___42301)){
args42298.push((arguments[i__17326__auto___42302]));

var G__42303 = (i__17326__auto___42302 + (1));
i__17326__auto___42302 = G__42303;
continue;
} else {
}
break;
}

var G__42300 = args42298.length;
switch (G__42300) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args42298.length)].join('')));

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
var c__19891__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto__){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto__){
return (function (state_42470){
var state_val_42471 = (state_42470[(1)]);
if((state_val_42471 === (7))){
var inst_42466 = (state_42470[(2)]);
var state_42470__$1 = state_42470;
var statearr_42472_42513 = state_42470__$1;
(statearr_42472_42513[(2)] = inst_42466);

(statearr_42472_42513[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (20))){
var inst_42436 = (state_42470[(7)]);
var inst_42447 = (state_42470[(2)]);
var inst_42448 = cljs.core.next.call(null,inst_42436);
var inst_42422 = inst_42448;
var inst_42423 = null;
var inst_42424 = (0);
var inst_42425 = (0);
var state_42470__$1 = (function (){var statearr_42473 = state_42470;
(statearr_42473[(8)] = inst_42422);

(statearr_42473[(9)] = inst_42424);

(statearr_42473[(10)] = inst_42447);

(statearr_42473[(11)] = inst_42423);

(statearr_42473[(12)] = inst_42425);

return statearr_42473;
})();
var statearr_42474_42514 = state_42470__$1;
(statearr_42474_42514[(2)] = null);

(statearr_42474_42514[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (1))){
var state_42470__$1 = state_42470;
var statearr_42475_42515 = state_42470__$1;
(statearr_42475_42515[(2)] = null);

(statearr_42475_42515[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (4))){
var inst_42411 = (state_42470[(13)]);
var inst_42411__$1 = (state_42470[(2)]);
var inst_42412 = (inst_42411__$1 == null);
var state_42470__$1 = (function (){var statearr_42476 = state_42470;
(statearr_42476[(13)] = inst_42411__$1);

return statearr_42476;
})();
if(cljs.core.truth_(inst_42412)){
var statearr_42477_42516 = state_42470__$1;
(statearr_42477_42516[(1)] = (5));

} else {
var statearr_42478_42517 = state_42470__$1;
(statearr_42478_42517[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (15))){
var state_42470__$1 = state_42470;
var statearr_42482_42518 = state_42470__$1;
(statearr_42482_42518[(2)] = null);

(statearr_42482_42518[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (21))){
var state_42470__$1 = state_42470;
var statearr_42483_42519 = state_42470__$1;
(statearr_42483_42519[(2)] = null);

(statearr_42483_42519[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (13))){
var inst_42422 = (state_42470[(8)]);
var inst_42424 = (state_42470[(9)]);
var inst_42423 = (state_42470[(11)]);
var inst_42425 = (state_42470[(12)]);
var inst_42432 = (state_42470[(2)]);
var inst_42433 = (inst_42425 + (1));
var tmp42479 = inst_42422;
var tmp42480 = inst_42424;
var tmp42481 = inst_42423;
var inst_42422__$1 = tmp42479;
var inst_42423__$1 = tmp42481;
var inst_42424__$1 = tmp42480;
var inst_42425__$1 = inst_42433;
var state_42470__$1 = (function (){var statearr_42484 = state_42470;
(statearr_42484[(8)] = inst_42422__$1);

(statearr_42484[(9)] = inst_42424__$1);

(statearr_42484[(14)] = inst_42432);

(statearr_42484[(11)] = inst_42423__$1);

(statearr_42484[(12)] = inst_42425__$1);

return statearr_42484;
})();
var statearr_42485_42520 = state_42470__$1;
(statearr_42485_42520[(2)] = null);

(statearr_42485_42520[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (22))){
var state_42470__$1 = state_42470;
var statearr_42486_42521 = state_42470__$1;
(statearr_42486_42521[(2)] = null);

(statearr_42486_42521[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (6))){
var inst_42411 = (state_42470[(13)]);
var inst_42420 = f.call(null,inst_42411);
var inst_42421 = cljs.core.seq.call(null,inst_42420);
var inst_42422 = inst_42421;
var inst_42423 = null;
var inst_42424 = (0);
var inst_42425 = (0);
var state_42470__$1 = (function (){var statearr_42487 = state_42470;
(statearr_42487[(8)] = inst_42422);

(statearr_42487[(9)] = inst_42424);

(statearr_42487[(11)] = inst_42423);

(statearr_42487[(12)] = inst_42425);

return statearr_42487;
})();
var statearr_42488_42522 = state_42470__$1;
(statearr_42488_42522[(2)] = null);

(statearr_42488_42522[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (17))){
var inst_42436 = (state_42470[(7)]);
var inst_42440 = cljs.core.chunk_first.call(null,inst_42436);
var inst_42441 = cljs.core.chunk_rest.call(null,inst_42436);
var inst_42442 = cljs.core.count.call(null,inst_42440);
var inst_42422 = inst_42441;
var inst_42423 = inst_42440;
var inst_42424 = inst_42442;
var inst_42425 = (0);
var state_42470__$1 = (function (){var statearr_42489 = state_42470;
(statearr_42489[(8)] = inst_42422);

(statearr_42489[(9)] = inst_42424);

(statearr_42489[(11)] = inst_42423);

(statearr_42489[(12)] = inst_42425);

return statearr_42489;
})();
var statearr_42490_42523 = state_42470__$1;
(statearr_42490_42523[(2)] = null);

(statearr_42490_42523[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (3))){
var inst_42468 = (state_42470[(2)]);
var state_42470__$1 = state_42470;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42470__$1,inst_42468);
} else {
if((state_val_42471 === (12))){
var inst_42456 = (state_42470[(2)]);
var state_42470__$1 = state_42470;
var statearr_42491_42524 = state_42470__$1;
(statearr_42491_42524[(2)] = inst_42456);

(statearr_42491_42524[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (2))){
var state_42470__$1 = state_42470;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42470__$1,(4),in$);
} else {
if((state_val_42471 === (23))){
var inst_42464 = (state_42470[(2)]);
var state_42470__$1 = state_42470;
var statearr_42492_42525 = state_42470__$1;
(statearr_42492_42525[(2)] = inst_42464);

(statearr_42492_42525[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (19))){
var inst_42451 = (state_42470[(2)]);
var state_42470__$1 = state_42470;
var statearr_42493_42526 = state_42470__$1;
(statearr_42493_42526[(2)] = inst_42451);

(statearr_42493_42526[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (11))){
var inst_42422 = (state_42470[(8)]);
var inst_42436 = (state_42470[(7)]);
var inst_42436__$1 = cljs.core.seq.call(null,inst_42422);
var state_42470__$1 = (function (){var statearr_42494 = state_42470;
(statearr_42494[(7)] = inst_42436__$1);

return statearr_42494;
})();
if(inst_42436__$1){
var statearr_42495_42527 = state_42470__$1;
(statearr_42495_42527[(1)] = (14));

} else {
var statearr_42496_42528 = state_42470__$1;
(statearr_42496_42528[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (9))){
var inst_42458 = (state_42470[(2)]);
var inst_42459 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_42470__$1 = (function (){var statearr_42497 = state_42470;
(statearr_42497[(15)] = inst_42458);

return statearr_42497;
})();
if(cljs.core.truth_(inst_42459)){
var statearr_42498_42529 = state_42470__$1;
(statearr_42498_42529[(1)] = (21));

} else {
var statearr_42499_42530 = state_42470__$1;
(statearr_42499_42530[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (5))){
var inst_42414 = cljs.core.async.close_BANG_.call(null,out);
var state_42470__$1 = state_42470;
var statearr_42500_42531 = state_42470__$1;
(statearr_42500_42531[(2)] = inst_42414);

(statearr_42500_42531[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (14))){
var inst_42436 = (state_42470[(7)]);
var inst_42438 = cljs.core.chunked_seq_QMARK_.call(null,inst_42436);
var state_42470__$1 = state_42470;
if(inst_42438){
var statearr_42501_42532 = state_42470__$1;
(statearr_42501_42532[(1)] = (17));

} else {
var statearr_42502_42533 = state_42470__$1;
(statearr_42502_42533[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (16))){
var inst_42454 = (state_42470[(2)]);
var state_42470__$1 = state_42470;
var statearr_42503_42534 = state_42470__$1;
(statearr_42503_42534[(2)] = inst_42454);

(statearr_42503_42534[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42471 === (10))){
var inst_42423 = (state_42470[(11)]);
var inst_42425 = (state_42470[(12)]);
var inst_42430 = cljs.core._nth.call(null,inst_42423,inst_42425);
var state_42470__$1 = state_42470;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42470__$1,(13),out,inst_42430);
} else {
if((state_val_42471 === (18))){
var inst_42436 = (state_42470[(7)]);
var inst_42445 = cljs.core.first.call(null,inst_42436);
var state_42470__$1 = state_42470;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42470__$1,(20),out,inst_42445);
} else {
if((state_val_42471 === (8))){
var inst_42424 = (state_42470[(9)]);
var inst_42425 = (state_42470[(12)]);
var inst_42427 = (inst_42425 < inst_42424);
var inst_42428 = inst_42427;
var state_42470__$1 = state_42470;
if(cljs.core.truth_(inst_42428)){
var statearr_42504_42535 = state_42470__$1;
(statearr_42504_42535[(1)] = (10));

} else {
var statearr_42505_42536 = state_42470__$1;
(statearr_42505_42536[(1)] = (11));

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
});})(c__19891__auto__))
;
return ((function (switch__19826__auto__,c__19891__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__19827__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__19827__auto____0 = (function (){
var statearr_42509 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42509[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__19827__auto__);

(statearr_42509[(1)] = (1));

return statearr_42509;
});
var cljs$core$async$mapcat_STAR__$_state_machine__19827__auto____1 = (function (state_42470){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_42470);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e42510){if((e42510 instanceof Object)){
var ex__19830__auto__ = e42510;
var statearr_42511_42537 = state_42470;
(statearr_42511_42537[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42470);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42510;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42538 = state_42470;
state_42470 = G__42538;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__19827__auto__ = function(state_42470){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__19827__auto____1.call(this,state_42470);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__19827__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__19827__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto__))
})();
var state__19893__auto__ = (function (){var statearr_42512 = f__19892__auto__.call(null);
(statearr_42512[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto__);

return statearr_42512;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto__))
);

return c__19891__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args42539 = [];
var len__17325__auto___42542 = arguments.length;
var i__17326__auto___42543 = (0);
while(true){
if((i__17326__auto___42543 < len__17325__auto___42542)){
args42539.push((arguments[i__17326__auto___42543]));

var G__42544 = (i__17326__auto___42543 + (1));
i__17326__auto___42543 = G__42544;
continue;
} else {
}
break;
}

var G__42541 = args42539.length;
switch (G__42541) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args42539.length)].join('')));

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
var args42546 = [];
var len__17325__auto___42549 = arguments.length;
var i__17326__auto___42550 = (0);
while(true){
if((i__17326__auto___42550 < len__17325__auto___42549)){
args42546.push((arguments[i__17326__auto___42550]));

var G__42551 = (i__17326__auto___42550 + (1));
i__17326__auto___42550 = G__42551;
continue;
} else {
}
break;
}

var G__42548 = args42546.length;
switch (G__42548) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args42546.length)].join('')));

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
var args42553 = [];
var len__17325__auto___42604 = arguments.length;
var i__17326__auto___42605 = (0);
while(true){
if((i__17326__auto___42605 < len__17325__auto___42604)){
args42553.push((arguments[i__17326__auto___42605]));

var G__42606 = (i__17326__auto___42605 + (1));
i__17326__auto___42605 = G__42606;
continue;
} else {
}
break;
}

var G__42555 = args42553.length;
switch (G__42555) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args42553.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19891__auto___42608 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___42608,out){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___42608,out){
return (function (state_42579){
var state_val_42580 = (state_42579[(1)]);
if((state_val_42580 === (7))){
var inst_42574 = (state_42579[(2)]);
var state_42579__$1 = state_42579;
var statearr_42581_42609 = state_42579__$1;
(statearr_42581_42609[(2)] = inst_42574);

(statearr_42581_42609[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42580 === (1))){
var inst_42556 = null;
var state_42579__$1 = (function (){var statearr_42582 = state_42579;
(statearr_42582[(7)] = inst_42556);

return statearr_42582;
})();
var statearr_42583_42610 = state_42579__$1;
(statearr_42583_42610[(2)] = null);

(statearr_42583_42610[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42580 === (4))){
var inst_42559 = (state_42579[(8)]);
var inst_42559__$1 = (state_42579[(2)]);
var inst_42560 = (inst_42559__$1 == null);
var inst_42561 = cljs.core.not.call(null,inst_42560);
var state_42579__$1 = (function (){var statearr_42584 = state_42579;
(statearr_42584[(8)] = inst_42559__$1);

return statearr_42584;
})();
if(inst_42561){
var statearr_42585_42611 = state_42579__$1;
(statearr_42585_42611[(1)] = (5));

} else {
var statearr_42586_42612 = state_42579__$1;
(statearr_42586_42612[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42580 === (6))){
var state_42579__$1 = state_42579;
var statearr_42587_42613 = state_42579__$1;
(statearr_42587_42613[(2)] = null);

(statearr_42587_42613[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42580 === (3))){
var inst_42576 = (state_42579[(2)]);
var inst_42577 = cljs.core.async.close_BANG_.call(null,out);
var state_42579__$1 = (function (){var statearr_42588 = state_42579;
(statearr_42588[(9)] = inst_42576);

return statearr_42588;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42579__$1,inst_42577);
} else {
if((state_val_42580 === (2))){
var state_42579__$1 = state_42579;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42579__$1,(4),ch);
} else {
if((state_val_42580 === (11))){
var inst_42559 = (state_42579[(8)]);
var inst_42568 = (state_42579[(2)]);
var inst_42556 = inst_42559;
var state_42579__$1 = (function (){var statearr_42589 = state_42579;
(statearr_42589[(10)] = inst_42568);

(statearr_42589[(7)] = inst_42556);

return statearr_42589;
})();
var statearr_42590_42614 = state_42579__$1;
(statearr_42590_42614[(2)] = null);

(statearr_42590_42614[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42580 === (9))){
var inst_42559 = (state_42579[(8)]);
var state_42579__$1 = state_42579;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42579__$1,(11),out,inst_42559);
} else {
if((state_val_42580 === (5))){
var inst_42556 = (state_42579[(7)]);
var inst_42559 = (state_42579[(8)]);
var inst_42563 = cljs.core._EQ_.call(null,inst_42559,inst_42556);
var state_42579__$1 = state_42579;
if(inst_42563){
var statearr_42592_42615 = state_42579__$1;
(statearr_42592_42615[(1)] = (8));

} else {
var statearr_42593_42616 = state_42579__$1;
(statearr_42593_42616[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42580 === (10))){
var inst_42571 = (state_42579[(2)]);
var state_42579__$1 = state_42579;
var statearr_42594_42617 = state_42579__$1;
(statearr_42594_42617[(2)] = inst_42571);

(statearr_42594_42617[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42580 === (8))){
var inst_42556 = (state_42579[(7)]);
var tmp42591 = inst_42556;
var inst_42556__$1 = tmp42591;
var state_42579__$1 = (function (){var statearr_42595 = state_42579;
(statearr_42595[(7)] = inst_42556__$1);

return statearr_42595;
})();
var statearr_42596_42618 = state_42579__$1;
(statearr_42596_42618[(2)] = null);

(statearr_42596_42618[(1)] = (2));


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
});})(c__19891__auto___42608,out))
;
return ((function (switch__19826__auto__,c__19891__auto___42608,out){
return (function() {
var cljs$core$async$state_machine__19827__auto__ = null;
var cljs$core$async$state_machine__19827__auto____0 = (function (){
var statearr_42600 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_42600[(0)] = cljs$core$async$state_machine__19827__auto__);

(statearr_42600[(1)] = (1));

return statearr_42600;
});
var cljs$core$async$state_machine__19827__auto____1 = (function (state_42579){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_42579);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e42601){if((e42601 instanceof Object)){
var ex__19830__auto__ = e42601;
var statearr_42602_42619 = state_42579;
(statearr_42602_42619[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42579);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42601;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42620 = state_42579;
state_42579 = G__42620;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$state_machine__19827__auto__ = function(state_42579){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19827__auto____1.call(this,state_42579);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19827__auto____0;
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19827__auto____1;
return cljs$core$async$state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___42608,out))
})();
var state__19893__auto__ = (function (){var statearr_42603 = f__19892__auto__.call(null);
(statearr_42603[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___42608);

return statearr_42603;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___42608,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args42621 = [];
var len__17325__auto___42691 = arguments.length;
var i__17326__auto___42692 = (0);
while(true){
if((i__17326__auto___42692 < len__17325__auto___42691)){
args42621.push((arguments[i__17326__auto___42692]));

var G__42693 = (i__17326__auto___42692 + (1));
i__17326__auto___42692 = G__42693;
continue;
} else {
}
break;
}

var G__42623 = args42621.length;
switch (G__42623) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args42621.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19891__auto___42695 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___42695,out){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___42695,out){
return (function (state_42661){
var state_val_42662 = (state_42661[(1)]);
if((state_val_42662 === (7))){
var inst_42657 = (state_42661[(2)]);
var state_42661__$1 = state_42661;
var statearr_42663_42696 = state_42661__$1;
(statearr_42663_42696[(2)] = inst_42657);

(statearr_42663_42696[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42662 === (1))){
var inst_42624 = (new Array(n));
var inst_42625 = inst_42624;
var inst_42626 = (0);
var state_42661__$1 = (function (){var statearr_42664 = state_42661;
(statearr_42664[(7)] = inst_42626);

(statearr_42664[(8)] = inst_42625);

return statearr_42664;
})();
var statearr_42665_42697 = state_42661__$1;
(statearr_42665_42697[(2)] = null);

(statearr_42665_42697[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42662 === (4))){
var inst_42629 = (state_42661[(9)]);
var inst_42629__$1 = (state_42661[(2)]);
var inst_42630 = (inst_42629__$1 == null);
var inst_42631 = cljs.core.not.call(null,inst_42630);
var state_42661__$1 = (function (){var statearr_42666 = state_42661;
(statearr_42666[(9)] = inst_42629__$1);

return statearr_42666;
})();
if(inst_42631){
var statearr_42667_42698 = state_42661__$1;
(statearr_42667_42698[(1)] = (5));

} else {
var statearr_42668_42699 = state_42661__$1;
(statearr_42668_42699[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42662 === (15))){
var inst_42651 = (state_42661[(2)]);
var state_42661__$1 = state_42661;
var statearr_42669_42700 = state_42661__$1;
(statearr_42669_42700[(2)] = inst_42651);

(statearr_42669_42700[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42662 === (13))){
var state_42661__$1 = state_42661;
var statearr_42670_42701 = state_42661__$1;
(statearr_42670_42701[(2)] = null);

(statearr_42670_42701[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42662 === (6))){
var inst_42626 = (state_42661[(7)]);
var inst_42647 = (inst_42626 > (0));
var state_42661__$1 = state_42661;
if(cljs.core.truth_(inst_42647)){
var statearr_42671_42702 = state_42661__$1;
(statearr_42671_42702[(1)] = (12));

} else {
var statearr_42672_42703 = state_42661__$1;
(statearr_42672_42703[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42662 === (3))){
var inst_42659 = (state_42661[(2)]);
var state_42661__$1 = state_42661;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42661__$1,inst_42659);
} else {
if((state_val_42662 === (12))){
var inst_42625 = (state_42661[(8)]);
var inst_42649 = cljs.core.vec.call(null,inst_42625);
var state_42661__$1 = state_42661;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42661__$1,(15),out,inst_42649);
} else {
if((state_val_42662 === (2))){
var state_42661__$1 = state_42661;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42661__$1,(4),ch);
} else {
if((state_val_42662 === (11))){
var inst_42641 = (state_42661[(2)]);
var inst_42642 = (new Array(n));
var inst_42625 = inst_42642;
var inst_42626 = (0);
var state_42661__$1 = (function (){var statearr_42673 = state_42661;
(statearr_42673[(10)] = inst_42641);

(statearr_42673[(7)] = inst_42626);

(statearr_42673[(8)] = inst_42625);

return statearr_42673;
})();
var statearr_42674_42704 = state_42661__$1;
(statearr_42674_42704[(2)] = null);

(statearr_42674_42704[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42662 === (9))){
var inst_42625 = (state_42661[(8)]);
var inst_42639 = cljs.core.vec.call(null,inst_42625);
var state_42661__$1 = state_42661;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42661__$1,(11),out,inst_42639);
} else {
if((state_val_42662 === (5))){
var inst_42626 = (state_42661[(7)]);
var inst_42634 = (state_42661[(11)]);
var inst_42625 = (state_42661[(8)]);
var inst_42629 = (state_42661[(9)]);
var inst_42633 = (inst_42625[inst_42626] = inst_42629);
var inst_42634__$1 = (inst_42626 + (1));
var inst_42635 = (inst_42634__$1 < n);
var state_42661__$1 = (function (){var statearr_42675 = state_42661;
(statearr_42675[(12)] = inst_42633);

(statearr_42675[(11)] = inst_42634__$1);

return statearr_42675;
})();
if(cljs.core.truth_(inst_42635)){
var statearr_42676_42705 = state_42661__$1;
(statearr_42676_42705[(1)] = (8));

} else {
var statearr_42677_42706 = state_42661__$1;
(statearr_42677_42706[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42662 === (14))){
var inst_42654 = (state_42661[(2)]);
var inst_42655 = cljs.core.async.close_BANG_.call(null,out);
var state_42661__$1 = (function (){var statearr_42679 = state_42661;
(statearr_42679[(13)] = inst_42654);

return statearr_42679;
})();
var statearr_42680_42707 = state_42661__$1;
(statearr_42680_42707[(2)] = inst_42655);

(statearr_42680_42707[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42662 === (10))){
var inst_42645 = (state_42661[(2)]);
var state_42661__$1 = state_42661;
var statearr_42681_42708 = state_42661__$1;
(statearr_42681_42708[(2)] = inst_42645);

(statearr_42681_42708[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42662 === (8))){
var inst_42634 = (state_42661[(11)]);
var inst_42625 = (state_42661[(8)]);
var tmp42678 = inst_42625;
var inst_42625__$1 = tmp42678;
var inst_42626 = inst_42634;
var state_42661__$1 = (function (){var statearr_42682 = state_42661;
(statearr_42682[(7)] = inst_42626);

(statearr_42682[(8)] = inst_42625__$1);

return statearr_42682;
})();
var statearr_42683_42709 = state_42661__$1;
(statearr_42683_42709[(2)] = null);

(statearr_42683_42709[(1)] = (2));


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
});})(c__19891__auto___42695,out))
;
return ((function (switch__19826__auto__,c__19891__auto___42695,out){
return (function() {
var cljs$core$async$state_machine__19827__auto__ = null;
var cljs$core$async$state_machine__19827__auto____0 = (function (){
var statearr_42687 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42687[(0)] = cljs$core$async$state_machine__19827__auto__);

(statearr_42687[(1)] = (1));

return statearr_42687;
});
var cljs$core$async$state_machine__19827__auto____1 = (function (state_42661){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_42661);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e42688){if((e42688 instanceof Object)){
var ex__19830__auto__ = e42688;
var statearr_42689_42710 = state_42661;
(statearr_42689_42710[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42661);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42688;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42711 = state_42661;
state_42661 = G__42711;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$state_machine__19827__auto__ = function(state_42661){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19827__auto____1.call(this,state_42661);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19827__auto____0;
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19827__auto____1;
return cljs$core$async$state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___42695,out))
})();
var state__19893__auto__ = (function (){var statearr_42690 = f__19892__auto__.call(null);
(statearr_42690[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___42695);

return statearr_42690;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___42695,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args42712 = [];
var len__17325__auto___42786 = arguments.length;
var i__17326__auto___42787 = (0);
while(true){
if((i__17326__auto___42787 < len__17325__auto___42786)){
args42712.push((arguments[i__17326__auto___42787]));

var G__42788 = (i__17326__auto___42787 + (1));
i__17326__auto___42787 = G__42788;
continue;
} else {
}
break;
}

var G__42714 = args42712.length;
switch (G__42714) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args42712.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19891__auto___42790 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19891__auto___42790,out){
return (function (){
var f__19892__auto__ = (function (){var switch__19826__auto__ = ((function (c__19891__auto___42790,out){
return (function (state_42756){
var state_val_42757 = (state_42756[(1)]);
if((state_val_42757 === (7))){
var inst_42752 = (state_42756[(2)]);
var state_42756__$1 = state_42756;
var statearr_42758_42791 = state_42756__$1;
(statearr_42758_42791[(2)] = inst_42752);

(statearr_42758_42791[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42757 === (1))){
var inst_42715 = [];
var inst_42716 = inst_42715;
var inst_42717 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_42756__$1 = (function (){var statearr_42759 = state_42756;
(statearr_42759[(7)] = inst_42717);

(statearr_42759[(8)] = inst_42716);

return statearr_42759;
})();
var statearr_42760_42792 = state_42756__$1;
(statearr_42760_42792[(2)] = null);

(statearr_42760_42792[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42757 === (4))){
var inst_42720 = (state_42756[(9)]);
var inst_42720__$1 = (state_42756[(2)]);
var inst_42721 = (inst_42720__$1 == null);
var inst_42722 = cljs.core.not.call(null,inst_42721);
var state_42756__$1 = (function (){var statearr_42761 = state_42756;
(statearr_42761[(9)] = inst_42720__$1);

return statearr_42761;
})();
if(inst_42722){
var statearr_42762_42793 = state_42756__$1;
(statearr_42762_42793[(1)] = (5));

} else {
var statearr_42763_42794 = state_42756__$1;
(statearr_42763_42794[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42757 === (15))){
var inst_42746 = (state_42756[(2)]);
var state_42756__$1 = state_42756;
var statearr_42764_42795 = state_42756__$1;
(statearr_42764_42795[(2)] = inst_42746);

(statearr_42764_42795[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42757 === (13))){
var state_42756__$1 = state_42756;
var statearr_42765_42796 = state_42756__$1;
(statearr_42765_42796[(2)] = null);

(statearr_42765_42796[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42757 === (6))){
var inst_42716 = (state_42756[(8)]);
var inst_42741 = inst_42716.length;
var inst_42742 = (inst_42741 > (0));
var state_42756__$1 = state_42756;
if(cljs.core.truth_(inst_42742)){
var statearr_42766_42797 = state_42756__$1;
(statearr_42766_42797[(1)] = (12));

} else {
var statearr_42767_42798 = state_42756__$1;
(statearr_42767_42798[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42757 === (3))){
var inst_42754 = (state_42756[(2)]);
var state_42756__$1 = state_42756;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_42756__$1,inst_42754);
} else {
if((state_val_42757 === (12))){
var inst_42716 = (state_42756[(8)]);
var inst_42744 = cljs.core.vec.call(null,inst_42716);
var state_42756__$1 = state_42756;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42756__$1,(15),out,inst_42744);
} else {
if((state_val_42757 === (2))){
var state_42756__$1 = state_42756;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_42756__$1,(4),ch);
} else {
if((state_val_42757 === (11))){
var inst_42720 = (state_42756[(9)]);
var inst_42724 = (state_42756[(10)]);
var inst_42734 = (state_42756[(2)]);
var inst_42735 = [];
var inst_42736 = inst_42735.push(inst_42720);
var inst_42716 = inst_42735;
var inst_42717 = inst_42724;
var state_42756__$1 = (function (){var statearr_42768 = state_42756;
(statearr_42768[(7)] = inst_42717);

(statearr_42768[(8)] = inst_42716);

(statearr_42768[(11)] = inst_42736);

(statearr_42768[(12)] = inst_42734);

return statearr_42768;
})();
var statearr_42769_42799 = state_42756__$1;
(statearr_42769_42799[(2)] = null);

(statearr_42769_42799[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42757 === (9))){
var inst_42716 = (state_42756[(8)]);
var inst_42732 = cljs.core.vec.call(null,inst_42716);
var state_42756__$1 = state_42756;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_42756__$1,(11),out,inst_42732);
} else {
if((state_val_42757 === (5))){
var inst_42717 = (state_42756[(7)]);
var inst_42720 = (state_42756[(9)]);
var inst_42724 = (state_42756[(10)]);
var inst_42724__$1 = f.call(null,inst_42720);
var inst_42725 = cljs.core._EQ_.call(null,inst_42724__$1,inst_42717);
var inst_42726 = cljs.core.keyword_identical_QMARK_.call(null,inst_42717,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_42727 = (inst_42725) || (inst_42726);
var state_42756__$1 = (function (){var statearr_42770 = state_42756;
(statearr_42770[(10)] = inst_42724__$1);

return statearr_42770;
})();
if(cljs.core.truth_(inst_42727)){
var statearr_42771_42800 = state_42756__$1;
(statearr_42771_42800[(1)] = (8));

} else {
var statearr_42772_42801 = state_42756__$1;
(statearr_42772_42801[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42757 === (14))){
var inst_42749 = (state_42756[(2)]);
var inst_42750 = cljs.core.async.close_BANG_.call(null,out);
var state_42756__$1 = (function (){var statearr_42774 = state_42756;
(statearr_42774[(13)] = inst_42749);

return statearr_42774;
})();
var statearr_42775_42802 = state_42756__$1;
(statearr_42775_42802[(2)] = inst_42750);

(statearr_42775_42802[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42757 === (10))){
var inst_42739 = (state_42756[(2)]);
var state_42756__$1 = state_42756;
var statearr_42776_42803 = state_42756__$1;
(statearr_42776_42803[(2)] = inst_42739);

(statearr_42776_42803[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42757 === (8))){
var inst_42720 = (state_42756[(9)]);
var inst_42716 = (state_42756[(8)]);
var inst_42724 = (state_42756[(10)]);
var inst_42729 = inst_42716.push(inst_42720);
var tmp42773 = inst_42716;
var inst_42716__$1 = tmp42773;
var inst_42717 = inst_42724;
var state_42756__$1 = (function (){var statearr_42777 = state_42756;
(statearr_42777[(7)] = inst_42717);

(statearr_42777[(8)] = inst_42716__$1);

(statearr_42777[(14)] = inst_42729);

return statearr_42777;
})();
var statearr_42778_42804 = state_42756__$1;
(statearr_42778_42804[(2)] = null);

(statearr_42778_42804[(1)] = (2));


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
});})(c__19891__auto___42790,out))
;
return ((function (switch__19826__auto__,c__19891__auto___42790,out){
return (function() {
var cljs$core$async$state_machine__19827__auto__ = null;
var cljs$core$async$state_machine__19827__auto____0 = (function (){
var statearr_42782 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42782[(0)] = cljs$core$async$state_machine__19827__auto__);

(statearr_42782[(1)] = (1));

return statearr_42782;
});
var cljs$core$async$state_machine__19827__auto____1 = (function (state_42756){
while(true){
var ret_value__19828__auto__ = (function (){try{while(true){
var result__19829__auto__ = switch__19826__auto__.call(null,state_42756);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19829__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19829__auto__;
}
break;
}
}catch (e42783){if((e42783 instanceof Object)){
var ex__19830__auto__ = e42783;
var statearr_42784_42805 = state_42756;
(statearr_42784_42805[(5)] = ex__19830__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_42756);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e42783;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19828__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__42806 = state_42756;
state_42756 = G__42806;
continue;
} else {
return ret_value__19828__auto__;
}
break;
}
});
cljs$core$async$state_machine__19827__auto__ = function(state_42756){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19827__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19827__auto____1.call(this,state_42756);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19827__auto____0;
cljs$core$async$state_machine__19827__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19827__auto____1;
return cljs$core$async$state_machine__19827__auto__;
})()
;})(switch__19826__auto__,c__19891__auto___42790,out))
})();
var state__19893__auto__ = (function (){var statearr_42785 = f__19892__auto__.call(null);
(statearr_42785[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19891__auto___42790);

return statearr_42785;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19893__auto__);
});})(c__19891__auto___42790,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map?rel=1445823446068