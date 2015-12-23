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
if(typeof cljs.core.async.t_cljs$core$async24008 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async24008 = (function (fn_handler,f,meta24009){
this.fn_handler = fn_handler;
this.f = f;
this.meta24009 = meta24009;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async24008.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_24010,meta24009__$1){
var self__ = this;
var _24010__$1 = this;
return (new cljs.core.async.t_cljs$core$async24008(self__.fn_handler,self__.f,meta24009__$1));
});

cljs.core.async.t_cljs$core$async24008.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_24010){
var self__ = this;
var _24010__$1 = this;
return self__.meta24009;
});

cljs.core.async.t_cljs$core$async24008.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async24008.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async24008.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async24008.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"fn-handler","fn-handler",648785851,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null)], null)))], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"meta24009","meta24009",1775778160,null)], null);
});

cljs.core.async.t_cljs$core$async24008.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async24008.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async24008";

cljs.core.async.t_cljs$core$async24008.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async24008");
});

cljs.core.async.__GT_t_cljs$core$async24008 = (function cljs$core$async$fn_handler_$___GT_t_cljs$core$async24008(fn_handler__$1,f__$1,meta24009){
return (new cljs.core.async.t_cljs$core$async24008(fn_handler__$1,f__$1,meta24009));
});

}

return (new cljs.core.async.t_cljs$core$async24008(cljs$core$async$fn_handler,f,cljs.core.PersistentArrayMap.EMPTY));
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
var args24013 = [];
var len__17325__auto___24016 = arguments.length;
var i__17326__auto___24017 = (0);
while(true){
if((i__17326__auto___24017 < len__17325__auto___24016)){
args24013.push((arguments[i__17326__auto___24017]));

var G__24018 = (i__17326__auto___24017 + (1));
i__17326__auto___24017 = G__24018;
continue;
} else {
}
break;
}

var G__24015 = args24013.length;
switch (G__24015) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24013.length)].join('')));

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
var args24020 = [];
var len__17325__auto___24023 = arguments.length;
var i__17326__auto___24024 = (0);
while(true){
if((i__17326__auto___24024 < len__17325__auto___24023)){
args24020.push((arguments[i__17326__auto___24024]));

var G__24025 = (i__17326__auto___24024 + (1));
i__17326__auto___24024 = G__24025;
continue;
} else {
}
break;
}

var G__24022 = args24020.length;
switch (G__24022) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24020.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_24027 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_24027);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_24027,ret){
return (function (){
return fn1.call(null,val_24027);
});})(val_24027,ret))
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
var args24028 = [];
var len__17325__auto___24031 = arguments.length;
var i__17326__auto___24032 = (0);
while(true){
if((i__17326__auto___24032 < len__17325__auto___24031)){
args24028.push((arguments[i__17326__auto___24032]));

var G__24033 = (i__17326__auto___24032 + (1));
i__17326__auto___24032 = G__24033;
continue;
} else {
}
break;
}

var G__24030 = args24028.length;
switch (G__24030) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24028.length)].join('')));

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
var n__17170__auto___24035 = n;
var x_24036 = (0);
while(true){
if((x_24036 < n__17170__auto___24035)){
(a[x_24036] = (0));

var G__24037 = (x_24036 + (1));
x_24036 = G__24037;
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

var G__24038 = (i + (1));
i = G__24038;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async24042 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async24042 = (function (alt_flag,flag,meta24043){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta24043 = meta24043;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async24042.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_24044,meta24043__$1){
var self__ = this;
var _24044__$1 = this;
return (new cljs.core.async.t_cljs$core$async24042(self__.alt_flag,self__.flag,meta24043__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async24042.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_24044){
var self__ = this;
var _24044__$1 = this;
return self__.meta24043;
});})(flag))
;

cljs.core.async.t_cljs$core$async24042.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async24042.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async24042.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async24042.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta24043","meta24043",1539690416,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async24042.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async24042.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async24042";

cljs.core.async.t_cljs$core$async24042.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async24042");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async24042 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async24042(alt_flag__$1,flag__$1,meta24043){
return (new cljs.core.async.t_cljs$core$async24042(alt_flag__$1,flag__$1,meta24043));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async24042(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async24048 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async24048 = (function (alt_handler,flag,cb,meta24049){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta24049 = meta24049;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async24048.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_24050,meta24049__$1){
var self__ = this;
var _24050__$1 = this;
return (new cljs.core.async.t_cljs$core$async24048(self__.alt_handler,self__.flag,self__.cb,meta24049__$1));
});

cljs.core.async.t_cljs$core$async24048.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_24050){
var self__ = this;
var _24050__$1 = this;
return self__.meta24049;
});

cljs.core.async.t_cljs$core$async24048.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async24048.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async24048.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async24048.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null)], null)))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta24049","meta24049",-1374913781,null)], null);
});

cljs.core.async.t_cljs$core$async24048.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async24048.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async24048";

cljs.core.async.t_cljs$core$async24048.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async24048");
});

cljs.core.async.__GT_t_cljs$core$async24048 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async24048(alt_handler__$1,flag__$1,cb__$1,meta24049){
return (new cljs.core.async.t_cljs$core$async24048(alt_handler__$1,flag__$1,cb__$1,meta24049));
});

}

return (new cljs.core.async.t_cljs$core$async24048(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
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
return (function (p1__24051_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__24051_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__24052_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__24052_SHARP_,port], null));
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
var G__24053 = (i + (1));
i = G__24053;
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
var len__17325__auto___24059 = arguments.length;
var i__17326__auto___24060 = (0);
while(true){
if((i__17326__auto___24060 < len__17325__auto___24059)){
args__17332__auto__.push((arguments[i__17326__auto___24060]));

var G__24061 = (i__17326__auto___24060 + (1));
i__17326__auto___24060 = G__24061;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__24056){
var map__24057 = p__24056;
var map__24057__$1 = ((((!((map__24057 == null)))?((((map__24057.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24057.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24057):map__24057);
var opts = map__24057__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq24054){
var G__24055 = cljs.core.first.call(null,seq24054);
var seq24054__$1 = cljs.core.next.call(null,seq24054);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__24055,seq24054__$1);
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args24062 = [];
var len__17325__auto___24112 = arguments.length;
var i__17326__auto___24113 = (0);
while(true){
if((i__17326__auto___24113 < len__17325__auto___24112)){
args24062.push((arguments[i__17326__auto___24113]));

var G__24114 = (i__17326__auto___24113 + (1));
i__17326__auto___24113 = G__24114;
continue;
} else {
}
break;
}

var G__24064 = args24062.length;
switch (G__24064) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24062.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__20372__auto___24116 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___24116){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___24116){
return (function (state_24088){
var state_val_24089 = (state_24088[(1)]);
if((state_val_24089 === (7))){
var inst_24084 = (state_24088[(2)]);
var state_24088__$1 = state_24088;
var statearr_24090_24117 = state_24088__$1;
(statearr_24090_24117[(2)] = inst_24084);

(statearr_24090_24117[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24089 === (1))){
var state_24088__$1 = state_24088;
var statearr_24091_24118 = state_24088__$1;
(statearr_24091_24118[(2)] = null);

(statearr_24091_24118[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24089 === (4))){
var inst_24067 = (state_24088[(7)]);
var inst_24067__$1 = (state_24088[(2)]);
var inst_24068 = (inst_24067__$1 == null);
var state_24088__$1 = (function (){var statearr_24092 = state_24088;
(statearr_24092[(7)] = inst_24067__$1);

return statearr_24092;
})();
if(cljs.core.truth_(inst_24068)){
var statearr_24093_24119 = state_24088__$1;
(statearr_24093_24119[(1)] = (5));

} else {
var statearr_24094_24120 = state_24088__$1;
(statearr_24094_24120[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24089 === (13))){
var state_24088__$1 = state_24088;
var statearr_24095_24121 = state_24088__$1;
(statearr_24095_24121[(2)] = null);

(statearr_24095_24121[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24089 === (6))){
var inst_24067 = (state_24088[(7)]);
var state_24088__$1 = state_24088;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24088__$1,(11),to,inst_24067);
} else {
if((state_val_24089 === (3))){
var inst_24086 = (state_24088[(2)]);
var state_24088__$1 = state_24088;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24088__$1,inst_24086);
} else {
if((state_val_24089 === (12))){
var state_24088__$1 = state_24088;
var statearr_24096_24122 = state_24088__$1;
(statearr_24096_24122[(2)] = null);

(statearr_24096_24122[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24089 === (2))){
var state_24088__$1 = state_24088;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24088__$1,(4),from);
} else {
if((state_val_24089 === (11))){
var inst_24077 = (state_24088[(2)]);
var state_24088__$1 = state_24088;
if(cljs.core.truth_(inst_24077)){
var statearr_24097_24123 = state_24088__$1;
(statearr_24097_24123[(1)] = (12));

} else {
var statearr_24098_24124 = state_24088__$1;
(statearr_24098_24124[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24089 === (9))){
var state_24088__$1 = state_24088;
var statearr_24099_24125 = state_24088__$1;
(statearr_24099_24125[(2)] = null);

(statearr_24099_24125[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24089 === (5))){
var state_24088__$1 = state_24088;
if(cljs.core.truth_(close_QMARK_)){
var statearr_24100_24126 = state_24088__$1;
(statearr_24100_24126[(1)] = (8));

} else {
var statearr_24101_24127 = state_24088__$1;
(statearr_24101_24127[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24089 === (14))){
var inst_24082 = (state_24088[(2)]);
var state_24088__$1 = state_24088;
var statearr_24102_24128 = state_24088__$1;
(statearr_24102_24128[(2)] = inst_24082);

(statearr_24102_24128[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24089 === (10))){
var inst_24074 = (state_24088[(2)]);
var state_24088__$1 = state_24088;
var statearr_24103_24129 = state_24088__$1;
(statearr_24103_24129[(2)] = inst_24074);

(statearr_24103_24129[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24089 === (8))){
var inst_24071 = cljs.core.async.close_BANG_.call(null,to);
var state_24088__$1 = state_24088;
var statearr_24104_24130 = state_24088__$1;
(statearr_24104_24130[(2)] = inst_24071);

(statearr_24104_24130[(1)] = (10));


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
});})(c__20372__auto___24116))
;
return ((function (switch__20351__auto__,c__20372__auto___24116){
return (function() {
var cljs$core$async$state_machine__20352__auto__ = null;
var cljs$core$async$state_machine__20352__auto____0 = (function (){
var statearr_24108 = [null,null,null,null,null,null,null,null];
(statearr_24108[(0)] = cljs$core$async$state_machine__20352__auto__);

(statearr_24108[(1)] = (1));

return statearr_24108;
});
var cljs$core$async$state_machine__20352__auto____1 = (function (state_24088){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_24088);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e24109){if((e24109 instanceof Object)){
var ex__20355__auto__ = e24109;
var statearr_24110_24131 = state_24088;
(statearr_24110_24131[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24088);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24109;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24132 = state_24088;
state_24088 = G__24132;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$state_machine__20352__auto__ = function(state_24088){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20352__auto____1.call(this,state_24088);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20352__auto____0;
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20352__auto____1;
return cljs$core$async$state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___24116))
})();
var state__20374__auto__ = (function (){var statearr_24111 = f__20373__auto__.call(null);
(statearr_24111[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___24116);

return statearr_24111;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___24116))
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
return (function (p__24316){
var vec__24317 = p__24316;
var v = cljs.core.nth.call(null,vec__24317,(0),null);
var p = cljs.core.nth.call(null,vec__24317,(1),null);
var job = vec__24317;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__20372__auto___24499 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___24499,res,vec__24317,v,p,job,jobs,results){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___24499,res,vec__24317,v,p,job,jobs,results){
return (function (state_24322){
var state_val_24323 = (state_24322[(1)]);
if((state_val_24323 === (1))){
var state_24322__$1 = state_24322;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24322__$1,(2),res,v);
} else {
if((state_val_24323 === (2))){
var inst_24319 = (state_24322[(2)]);
var inst_24320 = cljs.core.async.close_BANG_.call(null,res);
var state_24322__$1 = (function (){var statearr_24324 = state_24322;
(statearr_24324[(7)] = inst_24319);

return statearr_24324;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24322__$1,inst_24320);
} else {
return null;
}
}
});})(c__20372__auto___24499,res,vec__24317,v,p,job,jobs,results))
;
return ((function (switch__20351__auto__,c__20372__auto___24499,res,vec__24317,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0 = (function (){
var statearr_24328 = [null,null,null,null,null,null,null,null];
(statearr_24328[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__);

(statearr_24328[(1)] = (1));

return statearr_24328;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1 = (function (state_24322){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_24322);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e24329){if((e24329 instanceof Object)){
var ex__20355__auto__ = e24329;
var statearr_24330_24500 = state_24322;
(statearr_24330_24500[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24322);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24329;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24501 = state_24322;
state_24322 = G__24501;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__ = function(state_24322){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1.call(this,state_24322);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___24499,res,vec__24317,v,p,job,jobs,results))
})();
var state__20374__auto__ = (function (){var statearr_24331 = f__20373__auto__.call(null);
(statearr_24331[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___24499);

return statearr_24331;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___24499,res,vec__24317,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__24332){
var vec__24333 = p__24332;
var v = cljs.core.nth.call(null,vec__24333,(0),null);
var p = cljs.core.nth.call(null,vec__24333,(1),null);
var job = vec__24333;
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
var n__17170__auto___24502 = n;
var __24503 = (0);
while(true){
if((__24503 < n__17170__auto___24502)){
var G__24334_24504 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__24334_24504) {
case "compute":
var c__20372__auto___24506 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__24503,c__20372__auto___24506,G__24334_24504,n__17170__auto___24502,jobs,results,process,async){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (__24503,c__20372__auto___24506,G__24334_24504,n__17170__auto___24502,jobs,results,process,async){
return (function (state_24347){
var state_val_24348 = (state_24347[(1)]);
if((state_val_24348 === (1))){
var state_24347__$1 = state_24347;
var statearr_24349_24507 = state_24347__$1;
(statearr_24349_24507[(2)] = null);

(statearr_24349_24507[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24348 === (2))){
var state_24347__$1 = state_24347;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24347__$1,(4),jobs);
} else {
if((state_val_24348 === (3))){
var inst_24345 = (state_24347[(2)]);
var state_24347__$1 = state_24347;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24347__$1,inst_24345);
} else {
if((state_val_24348 === (4))){
var inst_24337 = (state_24347[(2)]);
var inst_24338 = process.call(null,inst_24337);
var state_24347__$1 = state_24347;
if(cljs.core.truth_(inst_24338)){
var statearr_24350_24508 = state_24347__$1;
(statearr_24350_24508[(1)] = (5));

} else {
var statearr_24351_24509 = state_24347__$1;
(statearr_24351_24509[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24348 === (5))){
var state_24347__$1 = state_24347;
var statearr_24352_24510 = state_24347__$1;
(statearr_24352_24510[(2)] = null);

(statearr_24352_24510[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24348 === (6))){
var state_24347__$1 = state_24347;
var statearr_24353_24511 = state_24347__$1;
(statearr_24353_24511[(2)] = null);

(statearr_24353_24511[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24348 === (7))){
var inst_24343 = (state_24347[(2)]);
var state_24347__$1 = state_24347;
var statearr_24354_24512 = state_24347__$1;
(statearr_24354_24512[(2)] = inst_24343);

(statearr_24354_24512[(1)] = (3));


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
});})(__24503,c__20372__auto___24506,G__24334_24504,n__17170__auto___24502,jobs,results,process,async))
;
return ((function (__24503,switch__20351__auto__,c__20372__auto___24506,G__24334_24504,n__17170__auto___24502,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0 = (function (){
var statearr_24358 = [null,null,null,null,null,null,null];
(statearr_24358[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__);

(statearr_24358[(1)] = (1));

return statearr_24358;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1 = (function (state_24347){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_24347);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e24359){if((e24359 instanceof Object)){
var ex__20355__auto__ = e24359;
var statearr_24360_24513 = state_24347;
(statearr_24360_24513[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24347);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24359;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24514 = state_24347;
state_24347 = G__24514;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__ = function(state_24347){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1.call(this,state_24347);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__;
})()
;})(__24503,switch__20351__auto__,c__20372__auto___24506,G__24334_24504,n__17170__auto___24502,jobs,results,process,async))
})();
var state__20374__auto__ = (function (){var statearr_24361 = f__20373__auto__.call(null);
(statearr_24361[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___24506);

return statearr_24361;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(__24503,c__20372__auto___24506,G__24334_24504,n__17170__auto___24502,jobs,results,process,async))
);


break;
case "async":
var c__20372__auto___24515 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__24503,c__20372__auto___24515,G__24334_24504,n__17170__auto___24502,jobs,results,process,async){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (__24503,c__20372__auto___24515,G__24334_24504,n__17170__auto___24502,jobs,results,process,async){
return (function (state_24374){
var state_val_24375 = (state_24374[(1)]);
if((state_val_24375 === (1))){
var state_24374__$1 = state_24374;
var statearr_24376_24516 = state_24374__$1;
(statearr_24376_24516[(2)] = null);

(statearr_24376_24516[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24375 === (2))){
var state_24374__$1 = state_24374;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24374__$1,(4),jobs);
} else {
if((state_val_24375 === (3))){
var inst_24372 = (state_24374[(2)]);
var state_24374__$1 = state_24374;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24374__$1,inst_24372);
} else {
if((state_val_24375 === (4))){
var inst_24364 = (state_24374[(2)]);
var inst_24365 = async.call(null,inst_24364);
var state_24374__$1 = state_24374;
if(cljs.core.truth_(inst_24365)){
var statearr_24377_24517 = state_24374__$1;
(statearr_24377_24517[(1)] = (5));

} else {
var statearr_24378_24518 = state_24374__$1;
(statearr_24378_24518[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24375 === (5))){
var state_24374__$1 = state_24374;
var statearr_24379_24519 = state_24374__$1;
(statearr_24379_24519[(2)] = null);

(statearr_24379_24519[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24375 === (6))){
var state_24374__$1 = state_24374;
var statearr_24380_24520 = state_24374__$1;
(statearr_24380_24520[(2)] = null);

(statearr_24380_24520[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24375 === (7))){
var inst_24370 = (state_24374[(2)]);
var state_24374__$1 = state_24374;
var statearr_24381_24521 = state_24374__$1;
(statearr_24381_24521[(2)] = inst_24370);

(statearr_24381_24521[(1)] = (3));


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
});})(__24503,c__20372__auto___24515,G__24334_24504,n__17170__auto___24502,jobs,results,process,async))
;
return ((function (__24503,switch__20351__auto__,c__20372__auto___24515,G__24334_24504,n__17170__auto___24502,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0 = (function (){
var statearr_24385 = [null,null,null,null,null,null,null];
(statearr_24385[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__);

(statearr_24385[(1)] = (1));

return statearr_24385;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1 = (function (state_24374){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_24374);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e24386){if((e24386 instanceof Object)){
var ex__20355__auto__ = e24386;
var statearr_24387_24522 = state_24374;
(statearr_24387_24522[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24374);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24386;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24523 = state_24374;
state_24374 = G__24523;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__ = function(state_24374){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1.call(this,state_24374);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__;
})()
;})(__24503,switch__20351__auto__,c__20372__auto___24515,G__24334_24504,n__17170__auto___24502,jobs,results,process,async))
})();
var state__20374__auto__ = (function (){var statearr_24388 = f__20373__auto__.call(null);
(statearr_24388[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___24515);

return statearr_24388;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(__24503,c__20372__auto___24515,G__24334_24504,n__17170__auto___24502,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__24524 = (__24503 + (1));
__24503 = G__24524;
continue;
} else {
}
break;
}

var c__20372__auto___24525 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___24525,jobs,results,process,async){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___24525,jobs,results,process,async){
return (function (state_24410){
var state_val_24411 = (state_24410[(1)]);
if((state_val_24411 === (1))){
var state_24410__$1 = state_24410;
var statearr_24412_24526 = state_24410__$1;
(statearr_24412_24526[(2)] = null);

(statearr_24412_24526[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24411 === (2))){
var state_24410__$1 = state_24410;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24410__$1,(4),from);
} else {
if((state_val_24411 === (3))){
var inst_24408 = (state_24410[(2)]);
var state_24410__$1 = state_24410;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24410__$1,inst_24408);
} else {
if((state_val_24411 === (4))){
var inst_24391 = (state_24410[(7)]);
var inst_24391__$1 = (state_24410[(2)]);
var inst_24392 = (inst_24391__$1 == null);
var state_24410__$1 = (function (){var statearr_24413 = state_24410;
(statearr_24413[(7)] = inst_24391__$1);

return statearr_24413;
})();
if(cljs.core.truth_(inst_24392)){
var statearr_24414_24527 = state_24410__$1;
(statearr_24414_24527[(1)] = (5));

} else {
var statearr_24415_24528 = state_24410__$1;
(statearr_24415_24528[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24411 === (5))){
var inst_24394 = cljs.core.async.close_BANG_.call(null,jobs);
var state_24410__$1 = state_24410;
var statearr_24416_24529 = state_24410__$1;
(statearr_24416_24529[(2)] = inst_24394);

(statearr_24416_24529[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24411 === (6))){
var inst_24396 = (state_24410[(8)]);
var inst_24391 = (state_24410[(7)]);
var inst_24396__$1 = cljs.core.async.chan.call(null,(1));
var inst_24397 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_24398 = [inst_24391,inst_24396__$1];
var inst_24399 = (new cljs.core.PersistentVector(null,2,(5),inst_24397,inst_24398,null));
var state_24410__$1 = (function (){var statearr_24417 = state_24410;
(statearr_24417[(8)] = inst_24396__$1);

return statearr_24417;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24410__$1,(8),jobs,inst_24399);
} else {
if((state_val_24411 === (7))){
var inst_24406 = (state_24410[(2)]);
var state_24410__$1 = state_24410;
var statearr_24418_24530 = state_24410__$1;
(statearr_24418_24530[(2)] = inst_24406);

(statearr_24418_24530[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24411 === (8))){
var inst_24396 = (state_24410[(8)]);
var inst_24401 = (state_24410[(2)]);
var state_24410__$1 = (function (){var statearr_24419 = state_24410;
(statearr_24419[(9)] = inst_24401);

return statearr_24419;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24410__$1,(9),results,inst_24396);
} else {
if((state_val_24411 === (9))){
var inst_24403 = (state_24410[(2)]);
var state_24410__$1 = (function (){var statearr_24420 = state_24410;
(statearr_24420[(10)] = inst_24403);

return statearr_24420;
})();
var statearr_24421_24531 = state_24410__$1;
(statearr_24421_24531[(2)] = null);

(statearr_24421_24531[(1)] = (2));


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
});})(c__20372__auto___24525,jobs,results,process,async))
;
return ((function (switch__20351__auto__,c__20372__auto___24525,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0 = (function (){
var statearr_24425 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_24425[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__);

(statearr_24425[(1)] = (1));

return statearr_24425;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1 = (function (state_24410){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_24410);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e24426){if((e24426 instanceof Object)){
var ex__20355__auto__ = e24426;
var statearr_24427_24532 = state_24410;
(statearr_24427_24532[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24410);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24426;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24533 = state_24410;
state_24410 = G__24533;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__ = function(state_24410){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1.call(this,state_24410);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___24525,jobs,results,process,async))
})();
var state__20374__auto__ = (function (){var statearr_24428 = f__20373__auto__.call(null);
(statearr_24428[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___24525);

return statearr_24428;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___24525,jobs,results,process,async))
);


var c__20372__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto__,jobs,results,process,async){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto__,jobs,results,process,async){
return (function (state_24466){
var state_val_24467 = (state_24466[(1)]);
if((state_val_24467 === (7))){
var inst_24462 = (state_24466[(2)]);
var state_24466__$1 = state_24466;
var statearr_24468_24534 = state_24466__$1;
(statearr_24468_24534[(2)] = inst_24462);

(statearr_24468_24534[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (20))){
var state_24466__$1 = state_24466;
var statearr_24469_24535 = state_24466__$1;
(statearr_24469_24535[(2)] = null);

(statearr_24469_24535[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (1))){
var state_24466__$1 = state_24466;
var statearr_24470_24536 = state_24466__$1;
(statearr_24470_24536[(2)] = null);

(statearr_24470_24536[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (4))){
var inst_24431 = (state_24466[(7)]);
var inst_24431__$1 = (state_24466[(2)]);
var inst_24432 = (inst_24431__$1 == null);
var state_24466__$1 = (function (){var statearr_24471 = state_24466;
(statearr_24471[(7)] = inst_24431__$1);

return statearr_24471;
})();
if(cljs.core.truth_(inst_24432)){
var statearr_24472_24537 = state_24466__$1;
(statearr_24472_24537[(1)] = (5));

} else {
var statearr_24473_24538 = state_24466__$1;
(statearr_24473_24538[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (15))){
var inst_24444 = (state_24466[(8)]);
var state_24466__$1 = state_24466;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24466__$1,(18),to,inst_24444);
} else {
if((state_val_24467 === (21))){
var inst_24457 = (state_24466[(2)]);
var state_24466__$1 = state_24466;
var statearr_24474_24539 = state_24466__$1;
(statearr_24474_24539[(2)] = inst_24457);

(statearr_24474_24539[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (13))){
var inst_24459 = (state_24466[(2)]);
var state_24466__$1 = (function (){var statearr_24475 = state_24466;
(statearr_24475[(9)] = inst_24459);

return statearr_24475;
})();
var statearr_24476_24540 = state_24466__$1;
(statearr_24476_24540[(2)] = null);

(statearr_24476_24540[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (6))){
var inst_24431 = (state_24466[(7)]);
var state_24466__$1 = state_24466;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24466__$1,(11),inst_24431);
} else {
if((state_val_24467 === (17))){
var inst_24452 = (state_24466[(2)]);
var state_24466__$1 = state_24466;
if(cljs.core.truth_(inst_24452)){
var statearr_24477_24541 = state_24466__$1;
(statearr_24477_24541[(1)] = (19));

} else {
var statearr_24478_24542 = state_24466__$1;
(statearr_24478_24542[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (3))){
var inst_24464 = (state_24466[(2)]);
var state_24466__$1 = state_24466;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24466__$1,inst_24464);
} else {
if((state_val_24467 === (12))){
var inst_24441 = (state_24466[(10)]);
var state_24466__$1 = state_24466;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24466__$1,(14),inst_24441);
} else {
if((state_val_24467 === (2))){
var state_24466__$1 = state_24466;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24466__$1,(4),results);
} else {
if((state_val_24467 === (19))){
var state_24466__$1 = state_24466;
var statearr_24479_24543 = state_24466__$1;
(statearr_24479_24543[(2)] = null);

(statearr_24479_24543[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (11))){
var inst_24441 = (state_24466[(2)]);
var state_24466__$1 = (function (){var statearr_24480 = state_24466;
(statearr_24480[(10)] = inst_24441);

return statearr_24480;
})();
var statearr_24481_24544 = state_24466__$1;
(statearr_24481_24544[(2)] = null);

(statearr_24481_24544[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (9))){
var state_24466__$1 = state_24466;
var statearr_24482_24545 = state_24466__$1;
(statearr_24482_24545[(2)] = null);

(statearr_24482_24545[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (5))){
var state_24466__$1 = state_24466;
if(cljs.core.truth_(close_QMARK_)){
var statearr_24483_24546 = state_24466__$1;
(statearr_24483_24546[(1)] = (8));

} else {
var statearr_24484_24547 = state_24466__$1;
(statearr_24484_24547[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (14))){
var inst_24444 = (state_24466[(8)]);
var inst_24446 = (state_24466[(11)]);
var inst_24444__$1 = (state_24466[(2)]);
var inst_24445 = (inst_24444__$1 == null);
var inst_24446__$1 = cljs.core.not.call(null,inst_24445);
var state_24466__$1 = (function (){var statearr_24485 = state_24466;
(statearr_24485[(8)] = inst_24444__$1);

(statearr_24485[(11)] = inst_24446__$1);

return statearr_24485;
})();
if(inst_24446__$1){
var statearr_24486_24548 = state_24466__$1;
(statearr_24486_24548[(1)] = (15));

} else {
var statearr_24487_24549 = state_24466__$1;
(statearr_24487_24549[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (16))){
var inst_24446 = (state_24466[(11)]);
var state_24466__$1 = state_24466;
var statearr_24488_24550 = state_24466__$1;
(statearr_24488_24550[(2)] = inst_24446);

(statearr_24488_24550[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (10))){
var inst_24438 = (state_24466[(2)]);
var state_24466__$1 = state_24466;
var statearr_24489_24551 = state_24466__$1;
(statearr_24489_24551[(2)] = inst_24438);

(statearr_24489_24551[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (18))){
var inst_24449 = (state_24466[(2)]);
var state_24466__$1 = state_24466;
var statearr_24490_24552 = state_24466__$1;
(statearr_24490_24552[(2)] = inst_24449);

(statearr_24490_24552[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24467 === (8))){
var inst_24435 = cljs.core.async.close_BANG_.call(null,to);
var state_24466__$1 = state_24466;
var statearr_24491_24553 = state_24466__$1;
(statearr_24491_24553[(2)] = inst_24435);

(statearr_24491_24553[(1)] = (10));


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
});})(c__20372__auto__,jobs,results,process,async))
;
return ((function (switch__20351__auto__,c__20372__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0 = (function (){
var statearr_24495 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_24495[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__);

(statearr_24495[(1)] = (1));

return statearr_24495;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1 = (function (state_24466){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_24466);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e24496){if((e24496 instanceof Object)){
var ex__20355__auto__ = e24496;
var statearr_24497_24554 = state_24466;
(statearr_24497_24554[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24466);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24496;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24555 = state_24466;
state_24466 = G__24555;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__ = function(state_24466){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1.call(this,state_24466);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20352__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto__,jobs,results,process,async))
})();
var state__20374__auto__ = (function (){var statearr_24498 = f__20373__auto__.call(null);
(statearr_24498[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto__);

return statearr_24498;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto__,jobs,results,process,async))
);

return c__20372__auto__;
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
var args24556 = [];
var len__17325__auto___24559 = arguments.length;
var i__17326__auto___24560 = (0);
while(true){
if((i__17326__auto___24560 < len__17325__auto___24559)){
args24556.push((arguments[i__17326__auto___24560]));

var G__24561 = (i__17326__auto___24560 + (1));
i__17326__auto___24560 = G__24561;
continue;
} else {
}
break;
}

var G__24558 = args24556.length;
switch (G__24558) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24556.length)].join('')));

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
var args24563 = [];
var len__17325__auto___24566 = arguments.length;
var i__17326__auto___24567 = (0);
while(true){
if((i__17326__auto___24567 < len__17325__auto___24566)){
args24563.push((arguments[i__17326__auto___24567]));

var G__24568 = (i__17326__auto___24567 + (1));
i__17326__auto___24567 = G__24568;
continue;
} else {
}
break;
}

var G__24565 = args24563.length;
switch (G__24565) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24563.length)].join('')));

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
var args24570 = [];
var len__17325__auto___24623 = arguments.length;
var i__17326__auto___24624 = (0);
while(true){
if((i__17326__auto___24624 < len__17325__auto___24623)){
args24570.push((arguments[i__17326__auto___24624]));

var G__24625 = (i__17326__auto___24624 + (1));
i__17326__auto___24624 = G__24625;
continue;
} else {
}
break;
}

var G__24572 = args24570.length;
switch (G__24572) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24570.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__20372__auto___24627 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___24627,tc,fc){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___24627,tc,fc){
return (function (state_24598){
var state_val_24599 = (state_24598[(1)]);
if((state_val_24599 === (7))){
var inst_24594 = (state_24598[(2)]);
var state_24598__$1 = state_24598;
var statearr_24600_24628 = state_24598__$1;
(statearr_24600_24628[(2)] = inst_24594);

(statearr_24600_24628[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24599 === (1))){
var state_24598__$1 = state_24598;
var statearr_24601_24629 = state_24598__$1;
(statearr_24601_24629[(2)] = null);

(statearr_24601_24629[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24599 === (4))){
var inst_24575 = (state_24598[(7)]);
var inst_24575__$1 = (state_24598[(2)]);
var inst_24576 = (inst_24575__$1 == null);
var state_24598__$1 = (function (){var statearr_24602 = state_24598;
(statearr_24602[(7)] = inst_24575__$1);

return statearr_24602;
})();
if(cljs.core.truth_(inst_24576)){
var statearr_24603_24630 = state_24598__$1;
(statearr_24603_24630[(1)] = (5));

} else {
var statearr_24604_24631 = state_24598__$1;
(statearr_24604_24631[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24599 === (13))){
var state_24598__$1 = state_24598;
var statearr_24605_24632 = state_24598__$1;
(statearr_24605_24632[(2)] = null);

(statearr_24605_24632[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24599 === (6))){
var inst_24575 = (state_24598[(7)]);
var inst_24581 = p.call(null,inst_24575);
var state_24598__$1 = state_24598;
if(cljs.core.truth_(inst_24581)){
var statearr_24606_24633 = state_24598__$1;
(statearr_24606_24633[(1)] = (9));

} else {
var statearr_24607_24634 = state_24598__$1;
(statearr_24607_24634[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24599 === (3))){
var inst_24596 = (state_24598[(2)]);
var state_24598__$1 = state_24598;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24598__$1,inst_24596);
} else {
if((state_val_24599 === (12))){
var state_24598__$1 = state_24598;
var statearr_24608_24635 = state_24598__$1;
(statearr_24608_24635[(2)] = null);

(statearr_24608_24635[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24599 === (2))){
var state_24598__$1 = state_24598;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24598__$1,(4),ch);
} else {
if((state_val_24599 === (11))){
var inst_24575 = (state_24598[(7)]);
var inst_24585 = (state_24598[(2)]);
var state_24598__$1 = state_24598;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24598__$1,(8),inst_24585,inst_24575);
} else {
if((state_val_24599 === (9))){
var state_24598__$1 = state_24598;
var statearr_24609_24636 = state_24598__$1;
(statearr_24609_24636[(2)] = tc);

(statearr_24609_24636[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24599 === (5))){
var inst_24578 = cljs.core.async.close_BANG_.call(null,tc);
var inst_24579 = cljs.core.async.close_BANG_.call(null,fc);
var state_24598__$1 = (function (){var statearr_24610 = state_24598;
(statearr_24610[(8)] = inst_24578);

return statearr_24610;
})();
var statearr_24611_24637 = state_24598__$1;
(statearr_24611_24637[(2)] = inst_24579);

(statearr_24611_24637[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24599 === (14))){
var inst_24592 = (state_24598[(2)]);
var state_24598__$1 = state_24598;
var statearr_24612_24638 = state_24598__$1;
(statearr_24612_24638[(2)] = inst_24592);

(statearr_24612_24638[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24599 === (10))){
var state_24598__$1 = state_24598;
var statearr_24613_24639 = state_24598__$1;
(statearr_24613_24639[(2)] = fc);

(statearr_24613_24639[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24599 === (8))){
var inst_24587 = (state_24598[(2)]);
var state_24598__$1 = state_24598;
if(cljs.core.truth_(inst_24587)){
var statearr_24614_24640 = state_24598__$1;
(statearr_24614_24640[(1)] = (12));

} else {
var statearr_24615_24641 = state_24598__$1;
(statearr_24615_24641[(1)] = (13));

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
});})(c__20372__auto___24627,tc,fc))
;
return ((function (switch__20351__auto__,c__20372__auto___24627,tc,fc){
return (function() {
var cljs$core$async$state_machine__20352__auto__ = null;
var cljs$core$async$state_machine__20352__auto____0 = (function (){
var statearr_24619 = [null,null,null,null,null,null,null,null,null];
(statearr_24619[(0)] = cljs$core$async$state_machine__20352__auto__);

(statearr_24619[(1)] = (1));

return statearr_24619;
});
var cljs$core$async$state_machine__20352__auto____1 = (function (state_24598){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_24598);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e24620){if((e24620 instanceof Object)){
var ex__20355__auto__ = e24620;
var statearr_24621_24642 = state_24598;
(statearr_24621_24642[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24598);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24620;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24643 = state_24598;
state_24598 = G__24643;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$state_machine__20352__auto__ = function(state_24598){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20352__auto____1.call(this,state_24598);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20352__auto____0;
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20352__auto____1;
return cljs$core$async$state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___24627,tc,fc))
})();
var state__20374__auto__ = (function (){var statearr_24622 = f__20373__auto__.call(null);
(statearr_24622[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___24627);

return statearr_24622;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___24627,tc,fc))
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
var c__20372__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto__){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto__){
return (function (state_24690){
var state_val_24691 = (state_24690[(1)]);
if((state_val_24691 === (1))){
var inst_24676 = init;
var state_24690__$1 = (function (){var statearr_24692 = state_24690;
(statearr_24692[(7)] = inst_24676);

return statearr_24692;
})();
var statearr_24693_24708 = state_24690__$1;
(statearr_24693_24708[(2)] = null);

(statearr_24693_24708[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24691 === (2))){
var state_24690__$1 = state_24690;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24690__$1,(4),ch);
} else {
if((state_val_24691 === (3))){
var inst_24688 = (state_24690[(2)]);
var state_24690__$1 = state_24690;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24690__$1,inst_24688);
} else {
if((state_val_24691 === (4))){
var inst_24679 = (state_24690[(8)]);
var inst_24679__$1 = (state_24690[(2)]);
var inst_24680 = (inst_24679__$1 == null);
var state_24690__$1 = (function (){var statearr_24694 = state_24690;
(statearr_24694[(8)] = inst_24679__$1);

return statearr_24694;
})();
if(cljs.core.truth_(inst_24680)){
var statearr_24695_24709 = state_24690__$1;
(statearr_24695_24709[(1)] = (5));

} else {
var statearr_24696_24710 = state_24690__$1;
(statearr_24696_24710[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24691 === (5))){
var inst_24676 = (state_24690[(7)]);
var state_24690__$1 = state_24690;
var statearr_24697_24711 = state_24690__$1;
(statearr_24697_24711[(2)] = inst_24676);

(statearr_24697_24711[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24691 === (6))){
var inst_24679 = (state_24690[(8)]);
var inst_24676 = (state_24690[(7)]);
var inst_24683 = f.call(null,inst_24676,inst_24679);
var inst_24676__$1 = inst_24683;
var state_24690__$1 = (function (){var statearr_24698 = state_24690;
(statearr_24698[(7)] = inst_24676__$1);

return statearr_24698;
})();
var statearr_24699_24712 = state_24690__$1;
(statearr_24699_24712[(2)] = null);

(statearr_24699_24712[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24691 === (7))){
var inst_24686 = (state_24690[(2)]);
var state_24690__$1 = state_24690;
var statearr_24700_24713 = state_24690__$1;
(statearr_24700_24713[(2)] = inst_24686);

(statearr_24700_24713[(1)] = (3));


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
});})(c__20372__auto__))
;
return ((function (switch__20351__auto__,c__20372__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__20352__auto__ = null;
var cljs$core$async$reduce_$_state_machine__20352__auto____0 = (function (){
var statearr_24704 = [null,null,null,null,null,null,null,null,null];
(statearr_24704[(0)] = cljs$core$async$reduce_$_state_machine__20352__auto__);

(statearr_24704[(1)] = (1));

return statearr_24704;
});
var cljs$core$async$reduce_$_state_machine__20352__auto____1 = (function (state_24690){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_24690);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e24705){if((e24705 instanceof Object)){
var ex__20355__auto__ = e24705;
var statearr_24706_24714 = state_24690;
(statearr_24706_24714[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24690);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24705;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24715 = state_24690;
state_24690 = G__24715;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__20352__auto__ = function(state_24690){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__20352__auto____1.call(this,state_24690);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__20352__auto____0;
cljs$core$async$reduce_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__20352__auto____1;
return cljs$core$async$reduce_$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto__))
})();
var state__20374__auto__ = (function (){var statearr_24707 = f__20373__auto__.call(null);
(statearr_24707[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto__);

return statearr_24707;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto__))
);

return c__20372__auto__;
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
var args24716 = [];
var len__17325__auto___24768 = arguments.length;
var i__17326__auto___24769 = (0);
while(true){
if((i__17326__auto___24769 < len__17325__auto___24768)){
args24716.push((arguments[i__17326__auto___24769]));

var G__24770 = (i__17326__auto___24769 + (1));
i__17326__auto___24769 = G__24770;
continue;
} else {
}
break;
}

var G__24718 = args24716.length;
switch (G__24718) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24716.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__20372__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto__){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto__){
return (function (state_24743){
var state_val_24744 = (state_24743[(1)]);
if((state_val_24744 === (7))){
var inst_24725 = (state_24743[(2)]);
var state_24743__$1 = state_24743;
var statearr_24745_24772 = state_24743__$1;
(statearr_24745_24772[(2)] = inst_24725);

(statearr_24745_24772[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24744 === (1))){
var inst_24719 = cljs.core.seq.call(null,coll);
var inst_24720 = inst_24719;
var state_24743__$1 = (function (){var statearr_24746 = state_24743;
(statearr_24746[(7)] = inst_24720);

return statearr_24746;
})();
var statearr_24747_24773 = state_24743__$1;
(statearr_24747_24773[(2)] = null);

(statearr_24747_24773[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24744 === (4))){
var inst_24720 = (state_24743[(7)]);
var inst_24723 = cljs.core.first.call(null,inst_24720);
var state_24743__$1 = state_24743;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24743__$1,(7),ch,inst_24723);
} else {
if((state_val_24744 === (13))){
var inst_24737 = (state_24743[(2)]);
var state_24743__$1 = state_24743;
var statearr_24748_24774 = state_24743__$1;
(statearr_24748_24774[(2)] = inst_24737);

(statearr_24748_24774[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24744 === (6))){
var inst_24728 = (state_24743[(2)]);
var state_24743__$1 = state_24743;
if(cljs.core.truth_(inst_24728)){
var statearr_24749_24775 = state_24743__$1;
(statearr_24749_24775[(1)] = (8));

} else {
var statearr_24750_24776 = state_24743__$1;
(statearr_24750_24776[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24744 === (3))){
var inst_24741 = (state_24743[(2)]);
var state_24743__$1 = state_24743;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24743__$1,inst_24741);
} else {
if((state_val_24744 === (12))){
var state_24743__$1 = state_24743;
var statearr_24751_24777 = state_24743__$1;
(statearr_24751_24777[(2)] = null);

(statearr_24751_24777[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24744 === (2))){
var inst_24720 = (state_24743[(7)]);
var state_24743__$1 = state_24743;
if(cljs.core.truth_(inst_24720)){
var statearr_24752_24778 = state_24743__$1;
(statearr_24752_24778[(1)] = (4));

} else {
var statearr_24753_24779 = state_24743__$1;
(statearr_24753_24779[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24744 === (11))){
var inst_24734 = cljs.core.async.close_BANG_.call(null,ch);
var state_24743__$1 = state_24743;
var statearr_24754_24780 = state_24743__$1;
(statearr_24754_24780[(2)] = inst_24734);

(statearr_24754_24780[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24744 === (9))){
var state_24743__$1 = state_24743;
if(cljs.core.truth_(close_QMARK_)){
var statearr_24755_24781 = state_24743__$1;
(statearr_24755_24781[(1)] = (11));

} else {
var statearr_24756_24782 = state_24743__$1;
(statearr_24756_24782[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24744 === (5))){
var inst_24720 = (state_24743[(7)]);
var state_24743__$1 = state_24743;
var statearr_24757_24783 = state_24743__$1;
(statearr_24757_24783[(2)] = inst_24720);

(statearr_24757_24783[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24744 === (10))){
var inst_24739 = (state_24743[(2)]);
var state_24743__$1 = state_24743;
var statearr_24758_24784 = state_24743__$1;
(statearr_24758_24784[(2)] = inst_24739);

(statearr_24758_24784[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24744 === (8))){
var inst_24720 = (state_24743[(7)]);
var inst_24730 = cljs.core.next.call(null,inst_24720);
var inst_24720__$1 = inst_24730;
var state_24743__$1 = (function (){var statearr_24759 = state_24743;
(statearr_24759[(7)] = inst_24720__$1);

return statearr_24759;
})();
var statearr_24760_24785 = state_24743__$1;
(statearr_24760_24785[(2)] = null);

(statearr_24760_24785[(1)] = (2));


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
});})(c__20372__auto__))
;
return ((function (switch__20351__auto__,c__20372__auto__){
return (function() {
var cljs$core$async$state_machine__20352__auto__ = null;
var cljs$core$async$state_machine__20352__auto____0 = (function (){
var statearr_24764 = [null,null,null,null,null,null,null,null];
(statearr_24764[(0)] = cljs$core$async$state_machine__20352__auto__);

(statearr_24764[(1)] = (1));

return statearr_24764;
});
var cljs$core$async$state_machine__20352__auto____1 = (function (state_24743){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_24743);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e24765){if((e24765 instanceof Object)){
var ex__20355__auto__ = e24765;
var statearr_24766_24786 = state_24743;
(statearr_24766_24786[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24743);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24765;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24787 = state_24743;
state_24743 = G__24787;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$state_machine__20352__auto__ = function(state_24743){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20352__auto____1.call(this,state_24743);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20352__auto____0;
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20352__auto____1;
return cljs$core$async$state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto__))
})();
var state__20374__auto__ = (function (){var statearr_24767 = f__20373__auto__.call(null);
(statearr_24767[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto__);

return statearr_24767;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto__))
);

return c__20372__auto__;
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
if(typeof cljs.core.async.t_cljs$core$async25009 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async25009 = (function (mult,ch,cs,meta25010){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta25010 = meta25010;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async25009.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_25011,meta25010__$1){
var self__ = this;
var _25011__$1 = this;
return (new cljs.core.async.t_cljs$core$async25009(self__.mult,self__.ch,self__.cs,meta25010__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async25009.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_25011){
var self__ = this;
var _25011__$1 = this;
return self__.meta25010;
});})(cs))
;

cljs.core.async.t_cljs$core$async25009.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async25009.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async25009.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async25009.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async25009.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async25009.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async25009.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta25010","meta25010",308121165,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async25009.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async25009.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async25009";

cljs.core.async.t_cljs$core$async25009.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async25009");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async25009 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async25009(mult__$1,ch__$1,cs__$1,meta25010){
return (new cljs.core.async.t_cljs$core$async25009(mult__$1,ch__$1,cs__$1,meta25010));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async25009(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
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
var c__20372__auto___25230 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___25230,cs,m,dchan,dctr,done){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___25230,cs,m,dchan,dctr,done){
return (function (state_25142){
var state_val_25143 = (state_25142[(1)]);
if((state_val_25143 === (7))){
var inst_25138 = (state_25142[(2)]);
var state_25142__$1 = state_25142;
var statearr_25144_25231 = state_25142__$1;
(statearr_25144_25231[(2)] = inst_25138);

(statearr_25144_25231[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (20))){
var inst_25043 = (state_25142[(7)]);
var inst_25053 = cljs.core.first.call(null,inst_25043);
var inst_25054 = cljs.core.nth.call(null,inst_25053,(0),null);
var inst_25055 = cljs.core.nth.call(null,inst_25053,(1),null);
var state_25142__$1 = (function (){var statearr_25145 = state_25142;
(statearr_25145[(8)] = inst_25054);

return statearr_25145;
})();
if(cljs.core.truth_(inst_25055)){
var statearr_25146_25232 = state_25142__$1;
(statearr_25146_25232[(1)] = (22));

} else {
var statearr_25147_25233 = state_25142__$1;
(statearr_25147_25233[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (27))){
var inst_25090 = (state_25142[(9)]);
var inst_25014 = (state_25142[(10)]);
var inst_25085 = (state_25142[(11)]);
var inst_25083 = (state_25142[(12)]);
var inst_25090__$1 = cljs.core._nth.call(null,inst_25083,inst_25085);
var inst_25091 = cljs.core.async.put_BANG_.call(null,inst_25090__$1,inst_25014,done);
var state_25142__$1 = (function (){var statearr_25148 = state_25142;
(statearr_25148[(9)] = inst_25090__$1);

return statearr_25148;
})();
if(cljs.core.truth_(inst_25091)){
var statearr_25149_25234 = state_25142__$1;
(statearr_25149_25234[(1)] = (30));

} else {
var statearr_25150_25235 = state_25142__$1;
(statearr_25150_25235[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (1))){
var state_25142__$1 = state_25142;
var statearr_25151_25236 = state_25142__$1;
(statearr_25151_25236[(2)] = null);

(statearr_25151_25236[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (24))){
var inst_25043 = (state_25142[(7)]);
var inst_25060 = (state_25142[(2)]);
var inst_25061 = cljs.core.next.call(null,inst_25043);
var inst_25023 = inst_25061;
var inst_25024 = null;
var inst_25025 = (0);
var inst_25026 = (0);
var state_25142__$1 = (function (){var statearr_25152 = state_25142;
(statearr_25152[(13)] = inst_25024);

(statearr_25152[(14)] = inst_25023);

(statearr_25152[(15)] = inst_25060);

(statearr_25152[(16)] = inst_25025);

(statearr_25152[(17)] = inst_25026);

return statearr_25152;
})();
var statearr_25153_25237 = state_25142__$1;
(statearr_25153_25237[(2)] = null);

(statearr_25153_25237[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (39))){
var state_25142__$1 = state_25142;
var statearr_25157_25238 = state_25142__$1;
(statearr_25157_25238[(2)] = null);

(statearr_25157_25238[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (4))){
var inst_25014 = (state_25142[(10)]);
var inst_25014__$1 = (state_25142[(2)]);
var inst_25015 = (inst_25014__$1 == null);
var state_25142__$1 = (function (){var statearr_25158 = state_25142;
(statearr_25158[(10)] = inst_25014__$1);

return statearr_25158;
})();
if(cljs.core.truth_(inst_25015)){
var statearr_25159_25239 = state_25142__$1;
(statearr_25159_25239[(1)] = (5));

} else {
var statearr_25160_25240 = state_25142__$1;
(statearr_25160_25240[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (15))){
var inst_25024 = (state_25142[(13)]);
var inst_25023 = (state_25142[(14)]);
var inst_25025 = (state_25142[(16)]);
var inst_25026 = (state_25142[(17)]);
var inst_25039 = (state_25142[(2)]);
var inst_25040 = (inst_25026 + (1));
var tmp25154 = inst_25024;
var tmp25155 = inst_25023;
var tmp25156 = inst_25025;
var inst_25023__$1 = tmp25155;
var inst_25024__$1 = tmp25154;
var inst_25025__$1 = tmp25156;
var inst_25026__$1 = inst_25040;
var state_25142__$1 = (function (){var statearr_25161 = state_25142;
(statearr_25161[(13)] = inst_25024__$1);

(statearr_25161[(14)] = inst_25023__$1);

(statearr_25161[(16)] = inst_25025__$1);

(statearr_25161[(17)] = inst_25026__$1);

(statearr_25161[(18)] = inst_25039);

return statearr_25161;
})();
var statearr_25162_25241 = state_25142__$1;
(statearr_25162_25241[(2)] = null);

(statearr_25162_25241[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (21))){
var inst_25064 = (state_25142[(2)]);
var state_25142__$1 = state_25142;
var statearr_25166_25242 = state_25142__$1;
(statearr_25166_25242[(2)] = inst_25064);

(statearr_25166_25242[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (31))){
var inst_25090 = (state_25142[(9)]);
var inst_25094 = done.call(null,null);
var inst_25095 = cljs.core.async.untap_STAR_.call(null,m,inst_25090);
var state_25142__$1 = (function (){var statearr_25167 = state_25142;
(statearr_25167[(19)] = inst_25094);

return statearr_25167;
})();
var statearr_25168_25243 = state_25142__$1;
(statearr_25168_25243[(2)] = inst_25095);

(statearr_25168_25243[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (32))){
var inst_25084 = (state_25142[(20)]);
var inst_25085 = (state_25142[(11)]);
var inst_25083 = (state_25142[(12)]);
var inst_25082 = (state_25142[(21)]);
var inst_25097 = (state_25142[(2)]);
var inst_25098 = (inst_25085 + (1));
var tmp25163 = inst_25084;
var tmp25164 = inst_25083;
var tmp25165 = inst_25082;
var inst_25082__$1 = tmp25165;
var inst_25083__$1 = tmp25164;
var inst_25084__$1 = tmp25163;
var inst_25085__$1 = inst_25098;
var state_25142__$1 = (function (){var statearr_25169 = state_25142;
(statearr_25169[(20)] = inst_25084__$1);

(statearr_25169[(22)] = inst_25097);

(statearr_25169[(11)] = inst_25085__$1);

(statearr_25169[(12)] = inst_25083__$1);

(statearr_25169[(21)] = inst_25082__$1);

return statearr_25169;
})();
var statearr_25170_25244 = state_25142__$1;
(statearr_25170_25244[(2)] = null);

(statearr_25170_25244[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (40))){
var inst_25110 = (state_25142[(23)]);
var inst_25114 = done.call(null,null);
var inst_25115 = cljs.core.async.untap_STAR_.call(null,m,inst_25110);
var state_25142__$1 = (function (){var statearr_25171 = state_25142;
(statearr_25171[(24)] = inst_25114);

return statearr_25171;
})();
var statearr_25172_25245 = state_25142__$1;
(statearr_25172_25245[(2)] = inst_25115);

(statearr_25172_25245[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (33))){
var inst_25101 = (state_25142[(25)]);
var inst_25103 = cljs.core.chunked_seq_QMARK_.call(null,inst_25101);
var state_25142__$1 = state_25142;
if(inst_25103){
var statearr_25173_25246 = state_25142__$1;
(statearr_25173_25246[(1)] = (36));

} else {
var statearr_25174_25247 = state_25142__$1;
(statearr_25174_25247[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (13))){
var inst_25033 = (state_25142[(26)]);
var inst_25036 = cljs.core.async.close_BANG_.call(null,inst_25033);
var state_25142__$1 = state_25142;
var statearr_25175_25248 = state_25142__$1;
(statearr_25175_25248[(2)] = inst_25036);

(statearr_25175_25248[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (22))){
var inst_25054 = (state_25142[(8)]);
var inst_25057 = cljs.core.async.close_BANG_.call(null,inst_25054);
var state_25142__$1 = state_25142;
var statearr_25176_25249 = state_25142__$1;
(statearr_25176_25249[(2)] = inst_25057);

(statearr_25176_25249[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (36))){
var inst_25101 = (state_25142[(25)]);
var inst_25105 = cljs.core.chunk_first.call(null,inst_25101);
var inst_25106 = cljs.core.chunk_rest.call(null,inst_25101);
var inst_25107 = cljs.core.count.call(null,inst_25105);
var inst_25082 = inst_25106;
var inst_25083 = inst_25105;
var inst_25084 = inst_25107;
var inst_25085 = (0);
var state_25142__$1 = (function (){var statearr_25177 = state_25142;
(statearr_25177[(20)] = inst_25084);

(statearr_25177[(11)] = inst_25085);

(statearr_25177[(12)] = inst_25083);

(statearr_25177[(21)] = inst_25082);

return statearr_25177;
})();
var statearr_25178_25250 = state_25142__$1;
(statearr_25178_25250[(2)] = null);

(statearr_25178_25250[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (41))){
var inst_25101 = (state_25142[(25)]);
var inst_25117 = (state_25142[(2)]);
var inst_25118 = cljs.core.next.call(null,inst_25101);
var inst_25082 = inst_25118;
var inst_25083 = null;
var inst_25084 = (0);
var inst_25085 = (0);
var state_25142__$1 = (function (){var statearr_25179 = state_25142;
(statearr_25179[(20)] = inst_25084);

(statearr_25179[(11)] = inst_25085);

(statearr_25179[(12)] = inst_25083);

(statearr_25179[(27)] = inst_25117);

(statearr_25179[(21)] = inst_25082);

return statearr_25179;
})();
var statearr_25180_25251 = state_25142__$1;
(statearr_25180_25251[(2)] = null);

(statearr_25180_25251[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (43))){
var state_25142__$1 = state_25142;
var statearr_25181_25252 = state_25142__$1;
(statearr_25181_25252[(2)] = null);

(statearr_25181_25252[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (29))){
var inst_25126 = (state_25142[(2)]);
var state_25142__$1 = state_25142;
var statearr_25182_25253 = state_25142__$1;
(statearr_25182_25253[(2)] = inst_25126);

(statearr_25182_25253[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (44))){
var inst_25135 = (state_25142[(2)]);
var state_25142__$1 = (function (){var statearr_25183 = state_25142;
(statearr_25183[(28)] = inst_25135);

return statearr_25183;
})();
var statearr_25184_25254 = state_25142__$1;
(statearr_25184_25254[(2)] = null);

(statearr_25184_25254[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (6))){
var inst_25074 = (state_25142[(29)]);
var inst_25073 = cljs.core.deref.call(null,cs);
var inst_25074__$1 = cljs.core.keys.call(null,inst_25073);
var inst_25075 = cljs.core.count.call(null,inst_25074__$1);
var inst_25076 = cljs.core.reset_BANG_.call(null,dctr,inst_25075);
var inst_25081 = cljs.core.seq.call(null,inst_25074__$1);
var inst_25082 = inst_25081;
var inst_25083 = null;
var inst_25084 = (0);
var inst_25085 = (0);
var state_25142__$1 = (function (){var statearr_25185 = state_25142;
(statearr_25185[(20)] = inst_25084);

(statearr_25185[(29)] = inst_25074__$1);

(statearr_25185[(30)] = inst_25076);

(statearr_25185[(11)] = inst_25085);

(statearr_25185[(12)] = inst_25083);

(statearr_25185[(21)] = inst_25082);

return statearr_25185;
})();
var statearr_25186_25255 = state_25142__$1;
(statearr_25186_25255[(2)] = null);

(statearr_25186_25255[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (28))){
var inst_25101 = (state_25142[(25)]);
var inst_25082 = (state_25142[(21)]);
var inst_25101__$1 = cljs.core.seq.call(null,inst_25082);
var state_25142__$1 = (function (){var statearr_25187 = state_25142;
(statearr_25187[(25)] = inst_25101__$1);

return statearr_25187;
})();
if(inst_25101__$1){
var statearr_25188_25256 = state_25142__$1;
(statearr_25188_25256[(1)] = (33));

} else {
var statearr_25189_25257 = state_25142__$1;
(statearr_25189_25257[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (25))){
var inst_25084 = (state_25142[(20)]);
var inst_25085 = (state_25142[(11)]);
var inst_25087 = (inst_25085 < inst_25084);
var inst_25088 = inst_25087;
var state_25142__$1 = state_25142;
if(cljs.core.truth_(inst_25088)){
var statearr_25190_25258 = state_25142__$1;
(statearr_25190_25258[(1)] = (27));

} else {
var statearr_25191_25259 = state_25142__$1;
(statearr_25191_25259[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (34))){
var state_25142__$1 = state_25142;
var statearr_25192_25260 = state_25142__$1;
(statearr_25192_25260[(2)] = null);

(statearr_25192_25260[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (17))){
var state_25142__$1 = state_25142;
var statearr_25193_25261 = state_25142__$1;
(statearr_25193_25261[(2)] = null);

(statearr_25193_25261[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (3))){
var inst_25140 = (state_25142[(2)]);
var state_25142__$1 = state_25142;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25142__$1,inst_25140);
} else {
if((state_val_25143 === (12))){
var inst_25069 = (state_25142[(2)]);
var state_25142__$1 = state_25142;
var statearr_25194_25262 = state_25142__$1;
(statearr_25194_25262[(2)] = inst_25069);

(statearr_25194_25262[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (2))){
var state_25142__$1 = state_25142;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25142__$1,(4),ch);
} else {
if((state_val_25143 === (23))){
var state_25142__$1 = state_25142;
var statearr_25195_25263 = state_25142__$1;
(statearr_25195_25263[(2)] = null);

(statearr_25195_25263[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (35))){
var inst_25124 = (state_25142[(2)]);
var state_25142__$1 = state_25142;
var statearr_25196_25264 = state_25142__$1;
(statearr_25196_25264[(2)] = inst_25124);

(statearr_25196_25264[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (19))){
var inst_25043 = (state_25142[(7)]);
var inst_25047 = cljs.core.chunk_first.call(null,inst_25043);
var inst_25048 = cljs.core.chunk_rest.call(null,inst_25043);
var inst_25049 = cljs.core.count.call(null,inst_25047);
var inst_25023 = inst_25048;
var inst_25024 = inst_25047;
var inst_25025 = inst_25049;
var inst_25026 = (0);
var state_25142__$1 = (function (){var statearr_25197 = state_25142;
(statearr_25197[(13)] = inst_25024);

(statearr_25197[(14)] = inst_25023);

(statearr_25197[(16)] = inst_25025);

(statearr_25197[(17)] = inst_25026);

return statearr_25197;
})();
var statearr_25198_25265 = state_25142__$1;
(statearr_25198_25265[(2)] = null);

(statearr_25198_25265[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (11))){
var inst_25023 = (state_25142[(14)]);
var inst_25043 = (state_25142[(7)]);
var inst_25043__$1 = cljs.core.seq.call(null,inst_25023);
var state_25142__$1 = (function (){var statearr_25199 = state_25142;
(statearr_25199[(7)] = inst_25043__$1);

return statearr_25199;
})();
if(inst_25043__$1){
var statearr_25200_25266 = state_25142__$1;
(statearr_25200_25266[(1)] = (16));

} else {
var statearr_25201_25267 = state_25142__$1;
(statearr_25201_25267[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (9))){
var inst_25071 = (state_25142[(2)]);
var state_25142__$1 = state_25142;
var statearr_25202_25268 = state_25142__$1;
(statearr_25202_25268[(2)] = inst_25071);

(statearr_25202_25268[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (5))){
var inst_25021 = cljs.core.deref.call(null,cs);
var inst_25022 = cljs.core.seq.call(null,inst_25021);
var inst_25023 = inst_25022;
var inst_25024 = null;
var inst_25025 = (0);
var inst_25026 = (0);
var state_25142__$1 = (function (){var statearr_25203 = state_25142;
(statearr_25203[(13)] = inst_25024);

(statearr_25203[(14)] = inst_25023);

(statearr_25203[(16)] = inst_25025);

(statearr_25203[(17)] = inst_25026);

return statearr_25203;
})();
var statearr_25204_25269 = state_25142__$1;
(statearr_25204_25269[(2)] = null);

(statearr_25204_25269[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (14))){
var state_25142__$1 = state_25142;
var statearr_25205_25270 = state_25142__$1;
(statearr_25205_25270[(2)] = null);

(statearr_25205_25270[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (45))){
var inst_25132 = (state_25142[(2)]);
var state_25142__$1 = state_25142;
var statearr_25206_25271 = state_25142__$1;
(statearr_25206_25271[(2)] = inst_25132);

(statearr_25206_25271[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (26))){
var inst_25074 = (state_25142[(29)]);
var inst_25128 = (state_25142[(2)]);
var inst_25129 = cljs.core.seq.call(null,inst_25074);
var state_25142__$1 = (function (){var statearr_25207 = state_25142;
(statearr_25207[(31)] = inst_25128);

return statearr_25207;
})();
if(inst_25129){
var statearr_25208_25272 = state_25142__$1;
(statearr_25208_25272[(1)] = (42));

} else {
var statearr_25209_25273 = state_25142__$1;
(statearr_25209_25273[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (16))){
var inst_25043 = (state_25142[(7)]);
var inst_25045 = cljs.core.chunked_seq_QMARK_.call(null,inst_25043);
var state_25142__$1 = state_25142;
if(inst_25045){
var statearr_25210_25274 = state_25142__$1;
(statearr_25210_25274[(1)] = (19));

} else {
var statearr_25211_25275 = state_25142__$1;
(statearr_25211_25275[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (38))){
var inst_25121 = (state_25142[(2)]);
var state_25142__$1 = state_25142;
var statearr_25212_25276 = state_25142__$1;
(statearr_25212_25276[(2)] = inst_25121);

(statearr_25212_25276[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (30))){
var state_25142__$1 = state_25142;
var statearr_25213_25277 = state_25142__$1;
(statearr_25213_25277[(2)] = null);

(statearr_25213_25277[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (10))){
var inst_25024 = (state_25142[(13)]);
var inst_25026 = (state_25142[(17)]);
var inst_25032 = cljs.core._nth.call(null,inst_25024,inst_25026);
var inst_25033 = cljs.core.nth.call(null,inst_25032,(0),null);
var inst_25034 = cljs.core.nth.call(null,inst_25032,(1),null);
var state_25142__$1 = (function (){var statearr_25214 = state_25142;
(statearr_25214[(26)] = inst_25033);

return statearr_25214;
})();
if(cljs.core.truth_(inst_25034)){
var statearr_25215_25278 = state_25142__$1;
(statearr_25215_25278[(1)] = (13));

} else {
var statearr_25216_25279 = state_25142__$1;
(statearr_25216_25279[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (18))){
var inst_25067 = (state_25142[(2)]);
var state_25142__$1 = state_25142;
var statearr_25217_25280 = state_25142__$1;
(statearr_25217_25280[(2)] = inst_25067);

(statearr_25217_25280[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (42))){
var state_25142__$1 = state_25142;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25142__$1,(45),dchan);
} else {
if((state_val_25143 === (37))){
var inst_25101 = (state_25142[(25)]);
var inst_25014 = (state_25142[(10)]);
var inst_25110 = (state_25142[(23)]);
var inst_25110__$1 = cljs.core.first.call(null,inst_25101);
var inst_25111 = cljs.core.async.put_BANG_.call(null,inst_25110__$1,inst_25014,done);
var state_25142__$1 = (function (){var statearr_25218 = state_25142;
(statearr_25218[(23)] = inst_25110__$1);

return statearr_25218;
})();
if(cljs.core.truth_(inst_25111)){
var statearr_25219_25281 = state_25142__$1;
(statearr_25219_25281[(1)] = (39));

} else {
var statearr_25220_25282 = state_25142__$1;
(statearr_25220_25282[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25143 === (8))){
var inst_25025 = (state_25142[(16)]);
var inst_25026 = (state_25142[(17)]);
var inst_25028 = (inst_25026 < inst_25025);
var inst_25029 = inst_25028;
var state_25142__$1 = state_25142;
if(cljs.core.truth_(inst_25029)){
var statearr_25221_25283 = state_25142__$1;
(statearr_25221_25283[(1)] = (10));

} else {
var statearr_25222_25284 = state_25142__$1;
(statearr_25222_25284[(1)] = (11));

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
});})(c__20372__auto___25230,cs,m,dchan,dctr,done))
;
return ((function (switch__20351__auto__,c__20372__auto___25230,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__20352__auto__ = null;
var cljs$core$async$mult_$_state_machine__20352__auto____0 = (function (){
var statearr_25226 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25226[(0)] = cljs$core$async$mult_$_state_machine__20352__auto__);

(statearr_25226[(1)] = (1));

return statearr_25226;
});
var cljs$core$async$mult_$_state_machine__20352__auto____1 = (function (state_25142){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_25142);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e25227){if((e25227 instanceof Object)){
var ex__20355__auto__ = e25227;
var statearr_25228_25285 = state_25142;
(statearr_25228_25285[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25142);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25227;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25286 = state_25142;
state_25142 = G__25286;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__20352__auto__ = function(state_25142){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__20352__auto____1.call(this,state_25142);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__20352__auto____0;
cljs$core$async$mult_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__20352__auto____1;
return cljs$core$async$mult_$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___25230,cs,m,dchan,dctr,done))
})();
var state__20374__auto__ = (function (){var statearr_25229 = f__20373__auto__.call(null);
(statearr_25229[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___25230);

return statearr_25229;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___25230,cs,m,dchan,dctr,done))
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
var args25287 = [];
var len__17325__auto___25290 = arguments.length;
var i__17326__auto___25291 = (0);
while(true){
if((i__17326__auto___25291 < len__17325__auto___25290)){
args25287.push((arguments[i__17326__auto___25291]));

var G__25292 = (i__17326__auto___25291 + (1));
i__17326__auto___25291 = G__25292;
continue;
} else {
}
break;
}

var G__25289 = args25287.length;
switch (G__25289) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25287.length)].join('')));

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
var len__17325__auto___25304 = arguments.length;
var i__17326__auto___25305 = (0);
while(true){
if((i__17326__auto___25305 < len__17325__auto___25304)){
args__17332__auto__.push((arguments[i__17326__auto___25305]));

var G__25306 = (i__17326__auto___25305 + (1));
i__17326__auto___25305 = G__25306;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((3) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__17333__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__25298){
var map__25299 = p__25298;
var map__25299__$1 = ((((!((map__25299 == null)))?((((map__25299.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25299.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25299):map__25299);
var opts = map__25299__$1;
var statearr_25301_25307 = state;
(statearr_25301_25307[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4425__auto__ = cljs.core.async.do_alts.call(null,((function (map__25299,map__25299__$1,opts){
return (function (val){
var statearr_25302_25308 = state;
(statearr_25302_25308[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__25299,map__25299__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4425__auto__)){
var cb = temp__4425__auto__;
var statearr_25303_25309 = state;
(statearr_25303_25309[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq25294){
var G__25295 = cljs.core.first.call(null,seq25294);
var seq25294__$1 = cljs.core.next.call(null,seq25294);
var G__25296 = cljs.core.first.call(null,seq25294__$1);
var seq25294__$2 = cljs.core.next.call(null,seq25294__$1);
var G__25297 = cljs.core.first.call(null,seq25294__$2);
var seq25294__$3 = cljs.core.next.call(null,seq25294__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__25295,G__25296,G__25297,seq25294__$3);
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
if(typeof cljs.core.async.t_cljs$core$async25473 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async25473 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta25474){
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
this.meta25474 = meta25474;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async25473.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_25475,meta25474__$1){
var self__ = this;
var _25475__$1 = this;
return (new cljs.core.async.t_cljs$core$async25473(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta25474__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25473.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_25475){
var self__ = this;
var _25475__$1 = this;
return self__.meta25474;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25473.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async25473.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25473.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async25473.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25473.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25473.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25473.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25473.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
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

cljs.core.async.t_cljs$core$async25473.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),cljs.core.with_meta(new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta25474","meta25474",2057262221,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25473.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async25473.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async25473";

cljs.core.async.t_cljs$core$async25473.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async25473");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async25473 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async25473(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta25474){
return (new cljs.core.async.t_cljs$core$async25473(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta25474));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async25473(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__20372__auto___25636 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___25636,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___25636,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_25573){
var state_val_25574 = (state_25573[(1)]);
if((state_val_25574 === (7))){
var inst_25491 = (state_25573[(2)]);
var state_25573__$1 = state_25573;
var statearr_25575_25637 = state_25573__$1;
(statearr_25575_25637[(2)] = inst_25491);

(statearr_25575_25637[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (20))){
var inst_25503 = (state_25573[(7)]);
var state_25573__$1 = state_25573;
var statearr_25576_25638 = state_25573__$1;
(statearr_25576_25638[(2)] = inst_25503);

(statearr_25576_25638[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (27))){
var state_25573__$1 = state_25573;
var statearr_25577_25639 = state_25573__$1;
(statearr_25577_25639[(2)] = null);

(statearr_25577_25639[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (1))){
var inst_25479 = (state_25573[(8)]);
var inst_25479__$1 = calc_state.call(null);
var inst_25481 = (inst_25479__$1 == null);
var inst_25482 = cljs.core.not.call(null,inst_25481);
var state_25573__$1 = (function (){var statearr_25578 = state_25573;
(statearr_25578[(8)] = inst_25479__$1);

return statearr_25578;
})();
if(inst_25482){
var statearr_25579_25640 = state_25573__$1;
(statearr_25579_25640[(1)] = (2));

} else {
var statearr_25580_25641 = state_25573__$1;
(statearr_25580_25641[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (24))){
var inst_25533 = (state_25573[(9)]);
var inst_25526 = (state_25573[(10)]);
var inst_25547 = (state_25573[(11)]);
var inst_25547__$1 = inst_25526.call(null,inst_25533);
var state_25573__$1 = (function (){var statearr_25581 = state_25573;
(statearr_25581[(11)] = inst_25547__$1);

return statearr_25581;
})();
if(cljs.core.truth_(inst_25547__$1)){
var statearr_25582_25642 = state_25573__$1;
(statearr_25582_25642[(1)] = (29));

} else {
var statearr_25583_25643 = state_25573__$1;
(statearr_25583_25643[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (4))){
var inst_25494 = (state_25573[(2)]);
var state_25573__$1 = state_25573;
if(cljs.core.truth_(inst_25494)){
var statearr_25584_25644 = state_25573__$1;
(statearr_25584_25644[(1)] = (8));

} else {
var statearr_25585_25645 = state_25573__$1;
(statearr_25585_25645[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (15))){
var inst_25520 = (state_25573[(2)]);
var state_25573__$1 = state_25573;
if(cljs.core.truth_(inst_25520)){
var statearr_25586_25646 = state_25573__$1;
(statearr_25586_25646[(1)] = (19));

} else {
var statearr_25587_25647 = state_25573__$1;
(statearr_25587_25647[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (21))){
var inst_25525 = (state_25573[(12)]);
var inst_25525__$1 = (state_25573[(2)]);
var inst_25526 = cljs.core.get.call(null,inst_25525__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_25527 = cljs.core.get.call(null,inst_25525__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_25528 = cljs.core.get.call(null,inst_25525__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_25573__$1 = (function (){var statearr_25588 = state_25573;
(statearr_25588[(12)] = inst_25525__$1);

(statearr_25588[(10)] = inst_25526);

(statearr_25588[(13)] = inst_25527);

return statearr_25588;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_25573__$1,(22),inst_25528);
} else {
if((state_val_25574 === (31))){
var inst_25555 = (state_25573[(2)]);
var state_25573__$1 = state_25573;
if(cljs.core.truth_(inst_25555)){
var statearr_25589_25648 = state_25573__$1;
(statearr_25589_25648[(1)] = (32));

} else {
var statearr_25590_25649 = state_25573__$1;
(statearr_25590_25649[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (32))){
var inst_25532 = (state_25573[(14)]);
var state_25573__$1 = state_25573;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25573__$1,(35),out,inst_25532);
} else {
if((state_val_25574 === (33))){
var inst_25525 = (state_25573[(12)]);
var inst_25503 = inst_25525;
var state_25573__$1 = (function (){var statearr_25591 = state_25573;
(statearr_25591[(7)] = inst_25503);

return statearr_25591;
})();
var statearr_25592_25650 = state_25573__$1;
(statearr_25592_25650[(2)] = null);

(statearr_25592_25650[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (13))){
var inst_25503 = (state_25573[(7)]);
var inst_25510 = inst_25503.cljs$lang$protocol_mask$partition0$;
var inst_25511 = (inst_25510 & (64));
var inst_25512 = inst_25503.cljs$core$ISeq$;
var inst_25513 = (inst_25511) || (inst_25512);
var state_25573__$1 = state_25573;
if(cljs.core.truth_(inst_25513)){
var statearr_25593_25651 = state_25573__$1;
(statearr_25593_25651[(1)] = (16));

} else {
var statearr_25594_25652 = state_25573__$1;
(statearr_25594_25652[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (22))){
var inst_25532 = (state_25573[(14)]);
var inst_25533 = (state_25573[(9)]);
var inst_25531 = (state_25573[(2)]);
var inst_25532__$1 = cljs.core.nth.call(null,inst_25531,(0),null);
var inst_25533__$1 = cljs.core.nth.call(null,inst_25531,(1),null);
var inst_25534 = (inst_25532__$1 == null);
var inst_25535 = cljs.core._EQ_.call(null,inst_25533__$1,change);
var inst_25536 = (inst_25534) || (inst_25535);
var state_25573__$1 = (function (){var statearr_25595 = state_25573;
(statearr_25595[(14)] = inst_25532__$1);

(statearr_25595[(9)] = inst_25533__$1);

return statearr_25595;
})();
if(cljs.core.truth_(inst_25536)){
var statearr_25596_25653 = state_25573__$1;
(statearr_25596_25653[(1)] = (23));

} else {
var statearr_25597_25654 = state_25573__$1;
(statearr_25597_25654[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (36))){
var inst_25525 = (state_25573[(12)]);
var inst_25503 = inst_25525;
var state_25573__$1 = (function (){var statearr_25598 = state_25573;
(statearr_25598[(7)] = inst_25503);

return statearr_25598;
})();
var statearr_25599_25655 = state_25573__$1;
(statearr_25599_25655[(2)] = null);

(statearr_25599_25655[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (29))){
var inst_25547 = (state_25573[(11)]);
var state_25573__$1 = state_25573;
var statearr_25600_25656 = state_25573__$1;
(statearr_25600_25656[(2)] = inst_25547);

(statearr_25600_25656[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (6))){
var state_25573__$1 = state_25573;
var statearr_25601_25657 = state_25573__$1;
(statearr_25601_25657[(2)] = false);

(statearr_25601_25657[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (28))){
var inst_25543 = (state_25573[(2)]);
var inst_25544 = calc_state.call(null);
var inst_25503 = inst_25544;
var state_25573__$1 = (function (){var statearr_25602 = state_25573;
(statearr_25602[(15)] = inst_25543);

(statearr_25602[(7)] = inst_25503);

return statearr_25602;
})();
var statearr_25603_25658 = state_25573__$1;
(statearr_25603_25658[(2)] = null);

(statearr_25603_25658[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (25))){
var inst_25569 = (state_25573[(2)]);
var state_25573__$1 = state_25573;
var statearr_25604_25659 = state_25573__$1;
(statearr_25604_25659[(2)] = inst_25569);

(statearr_25604_25659[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (34))){
var inst_25567 = (state_25573[(2)]);
var state_25573__$1 = state_25573;
var statearr_25605_25660 = state_25573__$1;
(statearr_25605_25660[(2)] = inst_25567);

(statearr_25605_25660[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (17))){
var state_25573__$1 = state_25573;
var statearr_25606_25661 = state_25573__$1;
(statearr_25606_25661[(2)] = false);

(statearr_25606_25661[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (3))){
var state_25573__$1 = state_25573;
var statearr_25607_25662 = state_25573__$1;
(statearr_25607_25662[(2)] = false);

(statearr_25607_25662[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (12))){
var inst_25571 = (state_25573[(2)]);
var state_25573__$1 = state_25573;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25573__$1,inst_25571);
} else {
if((state_val_25574 === (2))){
var inst_25479 = (state_25573[(8)]);
var inst_25484 = inst_25479.cljs$lang$protocol_mask$partition0$;
var inst_25485 = (inst_25484 & (64));
var inst_25486 = inst_25479.cljs$core$ISeq$;
var inst_25487 = (inst_25485) || (inst_25486);
var state_25573__$1 = state_25573;
if(cljs.core.truth_(inst_25487)){
var statearr_25608_25663 = state_25573__$1;
(statearr_25608_25663[(1)] = (5));

} else {
var statearr_25609_25664 = state_25573__$1;
(statearr_25609_25664[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (23))){
var inst_25532 = (state_25573[(14)]);
var inst_25538 = (inst_25532 == null);
var state_25573__$1 = state_25573;
if(cljs.core.truth_(inst_25538)){
var statearr_25610_25665 = state_25573__$1;
(statearr_25610_25665[(1)] = (26));

} else {
var statearr_25611_25666 = state_25573__$1;
(statearr_25611_25666[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (35))){
var inst_25558 = (state_25573[(2)]);
var state_25573__$1 = state_25573;
if(cljs.core.truth_(inst_25558)){
var statearr_25612_25667 = state_25573__$1;
(statearr_25612_25667[(1)] = (36));

} else {
var statearr_25613_25668 = state_25573__$1;
(statearr_25613_25668[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (19))){
var inst_25503 = (state_25573[(7)]);
var inst_25522 = cljs.core.apply.call(null,cljs.core.hash_map,inst_25503);
var state_25573__$1 = state_25573;
var statearr_25614_25669 = state_25573__$1;
(statearr_25614_25669[(2)] = inst_25522);

(statearr_25614_25669[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (11))){
var inst_25503 = (state_25573[(7)]);
var inst_25507 = (inst_25503 == null);
var inst_25508 = cljs.core.not.call(null,inst_25507);
var state_25573__$1 = state_25573;
if(inst_25508){
var statearr_25615_25670 = state_25573__$1;
(statearr_25615_25670[(1)] = (13));

} else {
var statearr_25616_25671 = state_25573__$1;
(statearr_25616_25671[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (9))){
var inst_25479 = (state_25573[(8)]);
var state_25573__$1 = state_25573;
var statearr_25617_25672 = state_25573__$1;
(statearr_25617_25672[(2)] = inst_25479);

(statearr_25617_25672[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (5))){
var state_25573__$1 = state_25573;
var statearr_25618_25673 = state_25573__$1;
(statearr_25618_25673[(2)] = true);

(statearr_25618_25673[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (14))){
var state_25573__$1 = state_25573;
var statearr_25619_25674 = state_25573__$1;
(statearr_25619_25674[(2)] = false);

(statearr_25619_25674[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (26))){
var inst_25533 = (state_25573[(9)]);
var inst_25540 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_25533);
var state_25573__$1 = state_25573;
var statearr_25620_25675 = state_25573__$1;
(statearr_25620_25675[(2)] = inst_25540);

(statearr_25620_25675[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (16))){
var state_25573__$1 = state_25573;
var statearr_25621_25676 = state_25573__$1;
(statearr_25621_25676[(2)] = true);

(statearr_25621_25676[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (38))){
var inst_25563 = (state_25573[(2)]);
var state_25573__$1 = state_25573;
var statearr_25622_25677 = state_25573__$1;
(statearr_25622_25677[(2)] = inst_25563);

(statearr_25622_25677[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (30))){
var inst_25533 = (state_25573[(9)]);
var inst_25526 = (state_25573[(10)]);
var inst_25527 = (state_25573[(13)]);
var inst_25550 = cljs.core.empty_QMARK_.call(null,inst_25526);
var inst_25551 = inst_25527.call(null,inst_25533);
var inst_25552 = cljs.core.not.call(null,inst_25551);
var inst_25553 = (inst_25550) && (inst_25552);
var state_25573__$1 = state_25573;
var statearr_25623_25678 = state_25573__$1;
(statearr_25623_25678[(2)] = inst_25553);

(statearr_25623_25678[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (10))){
var inst_25479 = (state_25573[(8)]);
var inst_25499 = (state_25573[(2)]);
var inst_25500 = cljs.core.get.call(null,inst_25499,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_25501 = cljs.core.get.call(null,inst_25499,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_25502 = cljs.core.get.call(null,inst_25499,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_25503 = inst_25479;
var state_25573__$1 = (function (){var statearr_25624 = state_25573;
(statearr_25624[(16)] = inst_25502);

(statearr_25624[(7)] = inst_25503);

(statearr_25624[(17)] = inst_25500);

(statearr_25624[(18)] = inst_25501);

return statearr_25624;
})();
var statearr_25625_25679 = state_25573__$1;
(statearr_25625_25679[(2)] = null);

(statearr_25625_25679[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (18))){
var inst_25517 = (state_25573[(2)]);
var state_25573__$1 = state_25573;
var statearr_25626_25680 = state_25573__$1;
(statearr_25626_25680[(2)] = inst_25517);

(statearr_25626_25680[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (37))){
var state_25573__$1 = state_25573;
var statearr_25627_25681 = state_25573__$1;
(statearr_25627_25681[(2)] = null);

(statearr_25627_25681[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25574 === (8))){
var inst_25479 = (state_25573[(8)]);
var inst_25496 = cljs.core.apply.call(null,cljs.core.hash_map,inst_25479);
var state_25573__$1 = state_25573;
var statearr_25628_25682 = state_25573__$1;
(statearr_25628_25682[(2)] = inst_25496);

(statearr_25628_25682[(1)] = (10));


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
});})(c__20372__auto___25636,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__20351__auto__,c__20372__auto___25636,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__20352__auto__ = null;
var cljs$core$async$mix_$_state_machine__20352__auto____0 = (function (){
var statearr_25632 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25632[(0)] = cljs$core$async$mix_$_state_machine__20352__auto__);

(statearr_25632[(1)] = (1));

return statearr_25632;
});
var cljs$core$async$mix_$_state_machine__20352__auto____1 = (function (state_25573){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_25573);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e25633){if((e25633 instanceof Object)){
var ex__20355__auto__ = e25633;
var statearr_25634_25683 = state_25573;
(statearr_25634_25683[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25573);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25633;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25684 = state_25573;
state_25573 = G__25684;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__20352__auto__ = function(state_25573){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__20352__auto____1.call(this,state_25573);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__20352__auto____0;
cljs$core$async$mix_$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__20352__auto____1;
return cljs$core$async$mix_$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___25636,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__20374__auto__ = (function (){var statearr_25635 = f__20373__auto__.call(null);
(statearr_25635[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___25636);

return statearr_25635;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___25636,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
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
var args25685 = [];
var len__17325__auto___25688 = arguments.length;
var i__17326__auto___25689 = (0);
while(true){
if((i__17326__auto___25689 < len__17325__auto___25688)){
args25685.push((arguments[i__17326__auto___25689]));

var G__25690 = (i__17326__auto___25689 + (1));
i__17326__auto___25689 = G__25690;
continue;
} else {
}
break;
}

var G__25687 = args25685.length;
switch (G__25687) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25685.length)].join('')));

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
var args25693 = [];
var len__17325__auto___25818 = arguments.length;
var i__17326__auto___25819 = (0);
while(true){
if((i__17326__auto___25819 < len__17325__auto___25818)){
args25693.push((arguments[i__17326__auto___25819]));

var G__25820 = (i__17326__auto___25819 + (1));
i__17326__auto___25819 = G__25820;
continue;
} else {
}
break;
}

var G__25695 = args25693.length;
switch (G__25695) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25693.length)].join('')));

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
return (function (p1__25692_SHARP_){
if(cljs.core.truth_(p1__25692_SHARP_.call(null,topic))){
return p1__25692_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__25692_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__16267__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async25696 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async25696 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta25697){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta25697 = meta25697;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async25696.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_25698,meta25697__$1){
var self__ = this;
var _25698__$1 = this;
return (new cljs.core.async.t_cljs$core$async25696(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta25697__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async25696.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_25698){
var self__ = this;
var _25698__$1 = this;
return self__.meta25697;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async25696.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async25696.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async25696.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async25696.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async25696.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
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

cljs.core.async.t_cljs$core$async25696.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async25696.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async25696.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta25697","meta25697",-1438110499,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async25696.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async25696.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async25696";

cljs.core.async.t_cljs$core$async25696.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async25696");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async25696 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async25696(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta25697){
return (new cljs.core.async.t_cljs$core$async25696(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta25697));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async25696(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__20372__auto___25822 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___25822,mults,ensure_mult,p){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___25822,mults,ensure_mult,p){
return (function (state_25770){
var state_val_25771 = (state_25770[(1)]);
if((state_val_25771 === (7))){
var inst_25766 = (state_25770[(2)]);
var state_25770__$1 = state_25770;
var statearr_25772_25823 = state_25770__$1;
(statearr_25772_25823[(2)] = inst_25766);

(statearr_25772_25823[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (20))){
var state_25770__$1 = state_25770;
var statearr_25773_25824 = state_25770__$1;
(statearr_25773_25824[(2)] = null);

(statearr_25773_25824[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (1))){
var state_25770__$1 = state_25770;
var statearr_25774_25825 = state_25770__$1;
(statearr_25774_25825[(2)] = null);

(statearr_25774_25825[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (24))){
var inst_25749 = (state_25770[(7)]);
var inst_25758 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_25749);
var state_25770__$1 = state_25770;
var statearr_25775_25826 = state_25770__$1;
(statearr_25775_25826[(2)] = inst_25758);

(statearr_25775_25826[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (4))){
var inst_25701 = (state_25770[(8)]);
var inst_25701__$1 = (state_25770[(2)]);
var inst_25702 = (inst_25701__$1 == null);
var state_25770__$1 = (function (){var statearr_25776 = state_25770;
(statearr_25776[(8)] = inst_25701__$1);

return statearr_25776;
})();
if(cljs.core.truth_(inst_25702)){
var statearr_25777_25827 = state_25770__$1;
(statearr_25777_25827[(1)] = (5));

} else {
var statearr_25778_25828 = state_25770__$1;
(statearr_25778_25828[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (15))){
var inst_25743 = (state_25770[(2)]);
var state_25770__$1 = state_25770;
var statearr_25779_25829 = state_25770__$1;
(statearr_25779_25829[(2)] = inst_25743);

(statearr_25779_25829[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (21))){
var inst_25763 = (state_25770[(2)]);
var state_25770__$1 = (function (){var statearr_25780 = state_25770;
(statearr_25780[(9)] = inst_25763);

return statearr_25780;
})();
var statearr_25781_25830 = state_25770__$1;
(statearr_25781_25830[(2)] = null);

(statearr_25781_25830[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (13))){
var inst_25725 = (state_25770[(10)]);
var inst_25727 = cljs.core.chunked_seq_QMARK_.call(null,inst_25725);
var state_25770__$1 = state_25770;
if(inst_25727){
var statearr_25782_25831 = state_25770__$1;
(statearr_25782_25831[(1)] = (16));

} else {
var statearr_25783_25832 = state_25770__$1;
(statearr_25783_25832[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (22))){
var inst_25755 = (state_25770[(2)]);
var state_25770__$1 = state_25770;
if(cljs.core.truth_(inst_25755)){
var statearr_25784_25833 = state_25770__$1;
(statearr_25784_25833[(1)] = (23));

} else {
var statearr_25785_25834 = state_25770__$1;
(statearr_25785_25834[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (6))){
var inst_25701 = (state_25770[(8)]);
var inst_25749 = (state_25770[(7)]);
var inst_25751 = (state_25770[(11)]);
var inst_25749__$1 = topic_fn.call(null,inst_25701);
var inst_25750 = cljs.core.deref.call(null,mults);
var inst_25751__$1 = cljs.core.get.call(null,inst_25750,inst_25749__$1);
var state_25770__$1 = (function (){var statearr_25786 = state_25770;
(statearr_25786[(7)] = inst_25749__$1);

(statearr_25786[(11)] = inst_25751__$1);

return statearr_25786;
})();
if(cljs.core.truth_(inst_25751__$1)){
var statearr_25787_25835 = state_25770__$1;
(statearr_25787_25835[(1)] = (19));

} else {
var statearr_25788_25836 = state_25770__$1;
(statearr_25788_25836[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (25))){
var inst_25760 = (state_25770[(2)]);
var state_25770__$1 = state_25770;
var statearr_25789_25837 = state_25770__$1;
(statearr_25789_25837[(2)] = inst_25760);

(statearr_25789_25837[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (17))){
var inst_25725 = (state_25770[(10)]);
var inst_25734 = cljs.core.first.call(null,inst_25725);
var inst_25735 = cljs.core.async.muxch_STAR_.call(null,inst_25734);
var inst_25736 = cljs.core.async.close_BANG_.call(null,inst_25735);
var inst_25737 = cljs.core.next.call(null,inst_25725);
var inst_25711 = inst_25737;
var inst_25712 = null;
var inst_25713 = (0);
var inst_25714 = (0);
var state_25770__$1 = (function (){var statearr_25790 = state_25770;
(statearr_25790[(12)] = inst_25736);

(statearr_25790[(13)] = inst_25711);

(statearr_25790[(14)] = inst_25713);

(statearr_25790[(15)] = inst_25714);

(statearr_25790[(16)] = inst_25712);

return statearr_25790;
})();
var statearr_25791_25838 = state_25770__$1;
(statearr_25791_25838[(2)] = null);

(statearr_25791_25838[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (3))){
var inst_25768 = (state_25770[(2)]);
var state_25770__$1 = state_25770;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25770__$1,inst_25768);
} else {
if((state_val_25771 === (12))){
var inst_25745 = (state_25770[(2)]);
var state_25770__$1 = state_25770;
var statearr_25792_25839 = state_25770__$1;
(statearr_25792_25839[(2)] = inst_25745);

(statearr_25792_25839[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (2))){
var state_25770__$1 = state_25770;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25770__$1,(4),ch);
} else {
if((state_val_25771 === (23))){
var state_25770__$1 = state_25770;
var statearr_25793_25840 = state_25770__$1;
(statearr_25793_25840[(2)] = null);

(statearr_25793_25840[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (19))){
var inst_25701 = (state_25770[(8)]);
var inst_25751 = (state_25770[(11)]);
var inst_25753 = cljs.core.async.muxch_STAR_.call(null,inst_25751);
var state_25770__$1 = state_25770;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25770__$1,(22),inst_25753,inst_25701);
} else {
if((state_val_25771 === (11))){
var inst_25711 = (state_25770[(13)]);
var inst_25725 = (state_25770[(10)]);
var inst_25725__$1 = cljs.core.seq.call(null,inst_25711);
var state_25770__$1 = (function (){var statearr_25794 = state_25770;
(statearr_25794[(10)] = inst_25725__$1);

return statearr_25794;
})();
if(inst_25725__$1){
var statearr_25795_25841 = state_25770__$1;
(statearr_25795_25841[(1)] = (13));

} else {
var statearr_25796_25842 = state_25770__$1;
(statearr_25796_25842[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (9))){
var inst_25747 = (state_25770[(2)]);
var state_25770__$1 = state_25770;
var statearr_25797_25843 = state_25770__$1;
(statearr_25797_25843[(2)] = inst_25747);

(statearr_25797_25843[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (5))){
var inst_25708 = cljs.core.deref.call(null,mults);
var inst_25709 = cljs.core.vals.call(null,inst_25708);
var inst_25710 = cljs.core.seq.call(null,inst_25709);
var inst_25711 = inst_25710;
var inst_25712 = null;
var inst_25713 = (0);
var inst_25714 = (0);
var state_25770__$1 = (function (){var statearr_25798 = state_25770;
(statearr_25798[(13)] = inst_25711);

(statearr_25798[(14)] = inst_25713);

(statearr_25798[(15)] = inst_25714);

(statearr_25798[(16)] = inst_25712);

return statearr_25798;
})();
var statearr_25799_25844 = state_25770__$1;
(statearr_25799_25844[(2)] = null);

(statearr_25799_25844[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (14))){
var state_25770__$1 = state_25770;
var statearr_25803_25845 = state_25770__$1;
(statearr_25803_25845[(2)] = null);

(statearr_25803_25845[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (16))){
var inst_25725 = (state_25770[(10)]);
var inst_25729 = cljs.core.chunk_first.call(null,inst_25725);
var inst_25730 = cljs.core.chunk_rest.call(null,inst_25725);
var inst_25731 = cljs.core.count.call(null,inst_25729);
var inst_25711 = inst_25730;
var inst_25712 = inst_25729;
var inst_25713 = inst_25731;
var inst_25714 = (0);
var state_25770__$1 = (function (){var statearr_25804 = state_25770;
(statearr_25804[(13)] = inst_25711);

(statearr_25804[(14)] = inst_25713);

(statearr_25804[(15)] = inst_25714);

(statearr_25804[(16)] = inst_25712);

return statearr_25804;
})();
var statearr_25805_25846 = state_25770__$1;
(statearr_25805_25846[(2)] = null);

(statearr_25805_25846[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (10))){
var inst_25711 = (state_25770[(13)]);
var inst_25713 = (state_25770[(14)]);
var inst_25714 = (state_25770[(15)]);
var inst_25712 = (state_25770[(16)]);
var inst_25719 = cljs.core._nth.call(null,inst_25712,inst_25714);
var inst_25720 = cljs.core.async.muxch_STAR_.call(null,inst_25719);
var inst_25721 = cljs.core.async.close_BANG_.call(null,inst_25720);
var inst_25722 = (inst_25714 + (1));
var tmp25800 = inst_25711;
var tmp25801 = inst_25713;
var tmp25802 = inst_25712;
var inst_25711__$1 = tmp25800;
var inst_25712__$1 = tmp25802;
var inst_25713__$1 = tmp25801;
var inst_25714__$1 = inst_25722;
var state_25770__$1 = (function (){var statearr_25806 = state_25770;
(statearr_25806[(13)] = inst_25711__$1);

(statearr_25806[(14)] = inst_25713__$1);

(statearr_25806[(15)] = inst_25714__$1);

(statearr_25806[(16)] = inst_25712__$1);

(statearr_25806[(17)] = inst_25721);

return statearr_25806;
})();
var statearr_25807_25847 = state_25770__$1;
(statearr_25807_25847[(2)] = null);

(statearr_25807_25847[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (18))){
var inst_25740 = (state_25770[(2)]);
var state_25770__$1 = state_25770;
var statearr_25808_25848 = state_25770__$1;
(statearr_25808_25848[(2)] = inst_25740);

(statearr_25808_25848[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25771 === (8))){
var inst_25713 = (state_25770[(14)]);
var inst_25714 = (state_25770[(15)]);
var inst_25716 = (inst_25714 < inst_25713);
var inst_25717 = inst_25716;
var state_25770__$1 = state_25770;
if(cljs.core.truth_(inst_25717)){
var statearr_25809_25849 = state_25770__$1;
(statearr_25809_25849[(1)] = (10));

} else {
var statearr_25810_25850 = state_25770__$1;
(statearr_25810_25850[(1)] = (11));

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
});})(c__20372__auto___25822,mults,ensure_mult,p))
;
return ((function (switch__20351__auto__,c__20372__auto___25822,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__20352__auto__ = null;
var cljs$core$async$state_machine__20352__auto____0 = (function (){
var statearr_25814 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25814[(0)] = cljs$core$async$state_machine__20352__auto__);

(statearr_25814[(1)] = (1));

return statearr_25814;
});
var cljs$core$async$state_machine__20352__auto____1 = (function (state_25770){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_25770);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e25815){if((e25815 instanceof Object)){
var ex__20355__auto__ = e25815;
var statearr_25816_25851 = state_25770;
(statearr_25816_25851[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25770);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25815;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25852 = state_25770;
state_25770 = G__25852;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$state_machine__20352__auto__ = function(state_25770){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20352__auto____1.call(this,state_25770);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20352__auto____0;
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20352__auto____1;
return cljs$core$async$state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___25822,mults,ensure_mult,p))
})();
var state__20374__auto__ = (function (){var statearr_25817 = f__20373__auto__.call(null);
(statearr_25817[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___25822);

return statearr_25817;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___25822,mults,ensure_mult,p))
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
var args25853 = [];
var len__17325__auto___25856 = arguments.length;
var i__17326__auto___25857 = (0);
while(true){
if((i__17326__auto___25857 < len__17325__auto___25856)){
args25853.push((arguments[i__17326__auto___25857]));

var G__25858 = (i__17326__auto___25857 + (1));
i__17326__auto___25857 = G__25858;
continue;
} else {
}
break;
}

var G__25855 = args25853.length;
switch (G__25855) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25853.length)].join('')));

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
var args25860 = [];
var len__17325__auto___25863 = arguments.length;
var i__17326__auto___25864 = (0);
while(true){
if((i__17326__auto___25864 < len__17325__auto___25863)){
args25860.push((arguments[i__17326__auto___25864]));

var G__25865 = (i__17326__auto___25864 + (1));
i__17326__auto___25864 = G__25865;
continue;
} else {
}
break;
}

var G__25862 = args25860.length;
switch (G__25862) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25860.length)].join('')));

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
var args25867 = [];
var len__17325__auto___25938 = arguments.length;
var i__17326__auto___25939 = (0);
while(true){
if((i__17326__auto___25939 < len__17325__auto___25938)){
args25867.push((arguments[i__17326__auto___25939]));

var G__25940 = (i__17326__auto___25939 + (1));
i__17326__auto___25939 = G__25940;
continue;
} else {
}
break;
}

var G__25869 = args25867.length;
switch (G__25869) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25867.length)].join('')));

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
var c__20372__auto___25942 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___25942,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___25942,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_25908){
var state_val_25909 = (state_25908[(1)]);
if((state_val_25909 === (7))){
var state_25908__$1 = state_25908;
var statearr_25910_25943 = state_25908__$1;
(statearr_25910_25943[(2)] = null);

(statearr_25910_25943[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25909 === (1))){
var state_25908__$1 = state_25908;
var statearr_25911_25944 = state_25908__$1;
(statearr_25911_25944[(2)] = null);

(statearr_25911_25944[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25909 === (4))){
var inst_25872 = (state_25908[(7)]);
var inst_25874 = (inst_25872 < cnt);
var state_25908__$1 = state_25908;
if(cljs.core.truth_(inst_25874)){
var statearr_25912_25945 = state_25908__$1;
(statearr_25912_25945[(1)] = (6));

} else {
var statearr_25913_25946 = state_25908__$1;
(statearr_25913_25946[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25909 === (15))){
var inst_25904 = (state_25908[(2)]);
var state_25908__$1 = state_25908;
var statearr_25914_25947 = state_25908__$1;
(statearr_25914_25947[(2)] = inst_25904);

(statearr_25914_25947[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25909 === (13))){
var inst_25897 = cljs.core.async.close_BANG_.call(null,out);
var state_25908__$1 = state_25908;
var statearr_25915_25948 = state_25908__$1;
(statearr_25915_25948[(2)] = inst_25897);

(statearr_25915_25948[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25909 === (6))){
var state_25908__$1 = state_25908;
var statearr_25916_25949 = state_25908__$1;
(statearr_25916_25949[(2)] = null);

(statearr_25916_25949[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25909 === (3))){
var inst_25906 = (state_25908[(2)]);
var state_25908__$1 = state_25908;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25908__$1,inst_25906);
} else {
if((state_val_25909 === (12))){
var inst_25894 = (state_25908[(8)]);
var inst_25894__$1 = (state_25908[(2)]);
var inst_25895 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_25894__$1);
var state_25908__$1 = (function (){var statearr_25917 = state_25908;
(statearr_25917[(8)] = inst_25894__$1);

return statearr_25917;
})();
if(cljs.core.truth_(inst_25895)){
var statearr_25918_25950 = state_25908__$1;
(statearr_25918_25950[(1)] = (13));

} else {
var statearr_25919_25951 = state_25908__$1;
(statearr_25919_25951[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25909 === (2))){
var inst_25871 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_25872 = (0);
var state_25908__$1 = (function (){var statearr_25920 = state_25908;
(statearr_25920[(9)] = inst_25871);

(statearr_25920[(7)] = inst_25872);

return statearr_25920;
})();
var statearr_25921_25952 = state_25908__$1;
(statearr_25921_25952[(2)] = null);

(statearr_25921_25952[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25909 === (11))){
var inst_25872 = (state_25908[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_25908,(10),Object,null,(9));
var inst_25881 = chs__$1.call(null,inst_25872);
var inst_25882 = done.call(null,inst_25872);
var inst_25883 = cljs.core.async.take_BANG_.call(null,inst_25881,inst_25882);
var state_25908__$1 = state_25908;
var statearr_25922_25953 = state_25908__$1;
(statearr_25922_25953[(2)] = inst_25883);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25908__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25909 === (9))){
var inst_25872 = (state_25908[(7)]);
var inst_25885 = (state_25908[(2)]);
var inst_25886 = (inst_25872 + (1));
var inst_25872__$1 = inst_25886;
var state_25908__$1 = (function (){var statearr_25923 = state_25908;
(statearr_25923[(7)] = inst_25872__$1);

(statearr_25923[(10)] = inst_25885);

return statearr_25923;
})();
var statearr_25924_25954 = state_25908__$1;
(statearr_25924_25954[(2)] = null);

(statearr_25924_25954[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25909 === (5))){
var inst_25892 = (state_25908[(2)]);
var state_25908__$1 = (function (){var statearr_25925 = state_25908;
(statearr_25925[(11)] = inst_25892);

return statearr_25925;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25908__$1,(12),dchan);
} else {
if((state_val_25909 === (14))){
var inst_25894 = (state_25908[(8)]);
var inst_25899 = cljs.core.apply.call(null,f,inst_25894);
var state_25908__$1 = state_25908;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25908__$1,(16),out,inst_25899);
} else {
if((state_val_25909 === (16))){
var inst_25901 = (state_25908[(2)]);
var state_25908__$1 = (function (){var statearr_25926 = state_25908;
(statearr_25926[(12)] = inst_25901);

return statearr_25926;
})();
var statearr_25927_25955 = state_25908__$1;
(statearr_25927_25955[(2)] = null);

(statearr_25927_25955[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25909 === (10))){
var inst_25876 = (state_25908[(2)]);
var inst_25877 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_25908__$1 = (function (){var statearr_25928 = state_25908;
(statearr_25928[(13)] = inst_25876);

return statearr_25928;
})();
var statearr_25929_25956 = state_25908__$1;
(statearr_25929_25956[(2)] = inst_25877);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25908__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25909 === (8))){
var inst_25890 = (state_25908[(2)]);
var state_25908__$1 = state_25908;
var statearr_25930_25957 = state_25908__$1;
(statearr_25930_25957[(2)] = inst_25890);

(statearr_25930_25957[(1)] = (5));


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
});})(c__20372__auto___25942,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__20351__auto__,c__20372__auto___25942,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__20352__auto__ = null;
var cljs$core$async$state_machine__20352__auto____0 = (function (){
var statearr_25934 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25934[(0)] = cljs$core$async$state_machine__20352__auto__);

(statearr_25934[(1)] = (1));

return statearr_25934;
});
var cljs$core$async$state_machine__20352__auto____1 = (function (state_25908){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_25908);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e25935){if((e25935 instanceof Object)){
var ex__20355__auto__ = e25935;
var statearr_25936_25958 = state_25908;
(statearr_25936_25958[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25908);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25935;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25959 = state_25908;
state_25908 = G__25959;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$state_machine__20352__auto__ = function(state_25908){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20352__auto____1.call(this,state_25908);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20352__auto____0;
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20352__auto____1;
return cljs$core$async$state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___25942,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__20374__auto__ = (function (){var statearr_25937 = f__20373__auto__.call(null);
(statearr_25937[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___25942);

return statearr_25937;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___25942,chs__$1,out,cnt,rets,dchan,dctr,done))
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
var args25961 = [];
var len__17325__auto___26017 = arguments.length;
var i__17326__auto___26018 = (0);
while(true){
if((i__17326__auto___26018 < len__17325__auto___26017)){
args25961.push((arguments[i__17326__auto___26018]));

var G__26019 = (i__17326__auto___26018 + (1));
i__17326__auto___26018 = G__26019;
continue;
} else {
}
break;
}

var G__25963 = args25961.length;
switch (G__25963) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25961.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20372__auto___26021 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___26021,out){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___26021,out){
return (function (state_25993){
var state_val_25994 = (state_25993[(1)]);
if((state_val_25994 === (7))){
var inst_25972 = (state_25993[(7)]);
var inst_25973 = (state_25993[(8)]);
var inst_25972__$1 = (state_25993[(2)]);
var inst_25973__$1 = cljs.core.nth.call(null,inst_25972__$1,(0),null);
var inst_25974 = cljs.core.nth.call(null,inst_25972__$1,(1),null);
var inst_25975 = (inst_25973__$1 == null);
var state_25993__$1 = (function (){var statearr_25995 = state_25993;
(statearr_25995[(9)] = inst_25974);

(statearr_25995[(7)] = inst_25972__$1);

(statearr_25995[(8)] = inst_25973__$1);

return statearr_25995;
})();
if(cljs.core.truth_(inst_25975)){
var statearr_25996_26022 = state_25993__$1;
(statearr_25996_26022[(1)] = (8));

} else {
var statearr_25997_26023 = state_25993__$1;
(statearr_25997_26023[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25994 === (1))){
var inst_25964 = cljs.core.vec.call(null,chs);
var inst_25965 = inst_25964;
var state_25993__$1 = (function (){var statearr_25998 = state_25993;
(statearr_25998[(10)] = inst_25965);

return statearr_25998;
})();
var statearr_25999_26024 = state_25993__$1;
(statearr_25999_26024[(2)] = null);

(statearr_25999_26024[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25994 === (4))){
var inst_25965 = (state_25993[(10)]);
var state_25993__$1 = state_25993;
return cljs.core.async.ioc_alts_BANG_.call(null,state_25993__$1,(7),inst_25965);
} else {
if((state_val_25994 === (6))){
var inst_25989 = (state_25993[(2)]);
var state_25993__$1 = state_25993;
var statearr_26000_26025 = state_25993__$1;
(statearr_26000_26025[(2)] = inst_25989);

(statearr_26000_26025[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25994 === (3))){
var inst_25991 = (state_25993[(2)]);
var state_25993__$1 = state_25993;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25993__$1,inst_25991);
} else {
if((state_val_25994 === (2))){
var inst_25965 = (state_25993[(10)]);
var inst_25967 = cljs.core.count.call(null,inst_25965);
var inst_25968 = (inst_25967 > (0));
var state_25993__$1 = state_25993;
if(cljs.core.truth_(inst_25968)){
var statearr_26002_26026 = state_25993__$1;
(statearr_26002_26026[(1)] = (4));

} else {
var statearr_26003_26027 = state_25993__$1;
(statearr_26003_26027[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25994 === (11))){
var inst_25965 = (state_25993[(10)]);
var inst_25982 = (state_25993[(2)]);
var tmp26001 = inst_25965;
var inst_25965__$1 = tmp26001;
var state_25993__$1 = (function (){var statearr_26004 = state_25993;
(statearr_26004[(11)] = inst_25982);

(statearr_26004[(10)] = inst_25965__$1);

return statearr_26004;
})();
var statearr_26005_26028 = state_25993__$1;
(statearr_26005_26028[(2)] = null);

(statearr_26005_26028[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25994 === (9))){
var inst_25973 = (state_25993[(8)]);
var state_25993__$1 = state_25993;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25993__$1,(11),out,inst_25973);
} else {
if((state_val_25994 === (5))){
var inst_25987 = cljs.core.async.close_BANG_.call(null,out);
var state_25993__$1 = state_25993;
var statearr_26006_26029 = state_25993__$1;
(statearr_26006_26029[(2)] = inst_25987);

(statearr_26006_26029[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25994 === (10))){
var inst_25985 = (state_25993[(2)]);
var state_25993__$1 = state_25993;
var statearr_26007_26030 = state_25993__$1;
(statearr_26007_26030[(2)] = inst_25985);

(statearr_26007_26030[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25994 === (8))){
var inst_25974 = (state_25993[(9)]);
var inst_25972 = (state_25993[(7)]);
var inst_25973 = (state_25993[(8)]);
var inst_25965 = (state_25993[(10)]);
var inst_25977 = (function (){var cs = inst_25965;
var vec__25970 = inst_25972;
var v = inst_25973;
var c = inst_25974;
return ((function (cs,vec__25970,v,c,inst_25974,inst_25972,inst_25973,inst_25965,state_val_25994,c__20372__auto___26021,out){
return (function (p1__25960_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__25960_SHARP_);
});
;})(cs,vec__25970,v,c,inst_25974,inst_25972,inst_25973,inst_25965,state_val_25994,c__20372__auto___26021,out))
})();
var inst_25978 = cljs.core.filterv.call(null,inst_25977,inst_25965);
var inst_25965__$1 = inst_25978;
var state_25993__$1 = (function (){var statearr_26008 = state_25993;
(statearr_26008[(10)] = inst_25965__$1);

return statearr_26008;
})();
var statearr_26009_26031 = state_25993__$1;
(statearr_26009_26031[(2)] = null);

(statearr_26009_26031[(1)] = (2));


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
});})(c__20372__auto___26021,out))
;
return ((function (switch__20351__auto__,c__20372__auto___26021,out){
return (function() {
var cljs$core$async$state_machine__20352__auto__ = null;
var cljs$core$async$state_machine__20352__auto____0 = (function (){
var statearr_26013 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26013[(0)] = cljs$core$async$state_machine__20352__auto__);

(statearr_26013[(1)] = (1));

return statearr_26013;
});
var cljs$core$async$state_machine__20352__auto____1 = (function (state_25993){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_25993);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e26014){if((e26014 instanceof Object)){
var ex__20355__auto__ = e26014;
var statearr_26015_26032 = state_25993;
(statearr_26015_26032[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25993);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26014;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26033 = state_25993;
state_25993 = G__26033;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$state_machine__20352__auto__ = function(state_25993){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20352__auto____1.call(this,state_25993);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20352__auto____0;
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20352__auto____1;
return cljs$core$async$state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___26021,out))
})();
var state__20374__auto__ = (function (){var statearr_26016 = f__20373__auto__.call(null);
(statearr_26016[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___26021);

return statearr_26016;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___26021,out))
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
var args26034 = [];
var len__17325__auto___26083 = arguments.length;
var i__17326__auto___26084 = (0);
while(true){
if((i__17326__auto___26084 < len__17325__auto___26083)){
args26034.push((arguments[i__17326__auto___26084]));

var G__26085 = (i__17326__auto___26084 + (1));
i__17326__auto___26084 = G__26085;
continue;
} else {
}
break;
}

var G__26036 = args26034.length;
switch (G__26036) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26034.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20372__auto___26087 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___26087,out){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___26087,out){
return (function (state_26060){
var state_val_26061 = (state_26060[(1)]);
if((state_val_26061 === (7))){
var inst_26042 = (state_26060[(7)]);
var inst_26042__$1 = (state_26060[(2)]);
var inst_26043 = (inst_26042__$1 == null);
var inst_26044 = cljs.core.not.call(null,inst_26043);
var state_26060__$1 = (function (){var statearr_26062 = state_26060;
(statearr_26062[(7)] = inst_26042__$1);

return statearr_26062;
})();
if(inst_26044){
var statearr_26063_26088 = state_26060__$1;
(statearr_26063_26088[(1)] = (8));

} else {
var statearr_26064_26089 = state_26060__$1;
(statearr_26064_26089[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26061 === (1))){
var inst_26037 = (0);
var state_26060__$1 = (function (){var statearr_26065 = state_26060;
(statearr_26065[(8)] = inst_26037);

return statearr_26065;
})();
var statearr_26066_26090 = state_26060__$1;
(statearr_26066_26090[(2)] = null);

(statearr_26066_26090[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26061 === (4))){
var state_26060__$1 = state_26060;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26060__$1,(7),ch);
} else {
if((state_val_26061 === (6))){
var inst_26055 = (state_26060[(2)]);
var state_26060__$1 = state_26060;
var statearr_26067_26091 = state_26060__$1;
(statearr_26067_26091[(2)] = inst_26055);

(statearr_26067_26091[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26061 === (3))){
var inst_26057 = (state_26060[(2)]);
var inst_26058 = cljs.core.async.close_BANG_.call(null,out);
var state_26060__$1 = (function (){var statearr_26068 = state_26060;
(statearr_26068[(9)] = inst_26057);

return statearr_26068;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26060__$1,inst_26058);
} else {
if((state_val_26061 === (2))){
var inst_26037 = (state_26060[(8)]);
var inst_26039 = (inst_26037 < n);
var state_26060__$1 = state_26060;
if(cljs.core.truth_(inst_26039)){
var statearr_26069_26092 = state_26060__$1;
(statearr_26069_26092[(1)] = (4));

} else {
var statearr_26070_26093 = state_26060__$1;
(statearr_26070_26093[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26061 === (11))){
var inst_26037 = (state_26060[(8)]);
var inst_26047 = (state_26060[(2)]);
var inst_26048 = (inst_26037 + (1));
var inst_26037__$1 = inst_26048;
var state_26060__$1 = (function (){var statearr_26071 = state_26060;
(statearr_26071[(8)] = inst_26037__$1);

(statearr_26071[(10)] = inst_26047);

return statearr_26071;
})();
var statearr_26072_26094 = state_26060__$1;
(statearr_26072_26094[(2)] = null);

(statearr_26072_26094[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26061 === (9))){
var state_26060__$1 = state_26060;
var statearr_26073_26095 = state_26060__$1;
(statearr_26073_26095[(2)] = null);

(statearr_26073_26095[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26061 === (5))){
var state_26060__$1 = state_26060;
var statearr_26074_26096 = state_26060__$1;
(statearr_26074_26096[(2)] = null);

(statearr_26074_26096[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26061 === (10))){
var inst_26052 = (state_26060[(2)]);
var state_26060__$1 = state_26060;
var statearr_26075_26097 = state_26060__$1;
(statearr_26075_26097[(2)] = inst_26052);

(statearr_26075_26097[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26061 === (8))){
var inst_26042 = (state_26060[(7)]);
var state_26060__$1 = state_26060;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26060__$1,(11),out,inst_26042);
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
});})(c__20372__auto___26087,out))
;
return ((function (switch__20351__auto__,c__20372__auto___26087,out){
return (function() {
var cljs$core$async$state_machine__20352__auto__ = null;
var cljs$core$async$state_machine__20352__auto____0 = (function (){
var statearr_26079 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_26079[(0)] = cljs$core$async$state_machine__20352__auto__);

(statearr_26079[(1)] = (1));

return statearr_26079;
});
var cljs$core$async$state_machine__20352__auto____1 = (function (state_26060){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_26060);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e26080){if((e26080 instanceof Object)){
var ex__20355__auto__ = e26080;
var statearr_26081_26098 = state_26060;
(statearr_26081_26098[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26060);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26080;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26099 = state_26060;
state_26060 = G__26099;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$state_machine__20352__auto__ = function(state_26060){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20352__auto____1.call(this,state_26060);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20352__auto____0;
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20352__auto____1;
return cljs$core$async$state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___26087,out))
})();
var state__20374__auto__ = (function (){var statearr_26082 = f__20373__auto__.call(null);
(statearr_26082[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___26087);

return statearr_26082;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___26087,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async26107 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26107 = (function (map_LT_,f,ch,meta26108){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta26108 = meta26108;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async26107.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26109,meta26108__$1){
var self__ = this;
var _26109__$1 = this;
return (new cljs.core.async.t_cljs$core$async26107(self__.map_LT_,self__.f,self__.ch,meta26108__$1));
});

cljs.core.async.t_cljs$core$async26107.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26109){
var self__ = this;
var _26109__$1 = this;
return self__.meta26108;
});

cljs.core.async.t_cljs$core$async26107.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async26107.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26107.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26107.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async26107.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async26110 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26110 = (function (map_LT_,f,ch,meta26108,_,fn1,meta26111){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta26108 = meta26108;
this._ = _;
this.fn1 = fn1;
this.meta26111 = meta26111;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async26110.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_26112,meta26111__$1){
var self__ = this;
var _26112__$1 = this;
return (new cljs.core.async.t_cljs$core$async26110(self__.map_LT_,self__.f,self__.ch,self__.meta26108,self__._,self__.fn1,meta26111__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async26110.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_26112){
var self__ = this;
var _26112__$1 = this;
return self__.meta26111;
});})(___$1))
;

cljs.core.async.t_cljs$core$async26110.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async26110.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async26110.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__26100_SHARP_){
return f1.call(null,(((p1__26100_SHARP_ == null))?null:self__.f.call(null,p1__26100_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async26110.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta26108","meta26108",450804144,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async26107","cljs.core.async/t_cljs$core$async26107",145233301,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta26111","meta26111",-123815915,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async26110.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26110.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26110";

cljs.core.async.t_cljs$core$async26110.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async26110");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async26110 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async26110(map_LT___$1,f__$1,ch__$1,meta26108__$1,___$2,fn1__$1,meta26111){
return (new cljs.core.async.t_cljs$core$async26110(map_LT___$1,f__$1,ch__$1,meta26108__$1,___$2,fn1__$1,meta26111));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async26110(self__.map_LT_,self__.f,self__.ch,self__.meta26108,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
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

cljs.core.async.t_cljs$core$async26107.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async26107.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async26107.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta26108","meta26108",450804144,null)], null);
});

cljs.core.async.t_cljs$core$async26107.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26107.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26107";

cljs.core.async.t_cljs$core$async26107.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async26107");
});

cljs.core.async.__GT_t_cljs$core$async26107 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async26107(map_LT___$1,f__$1,ch__$1,meta26108){
return (new cljs.core.async.t_cljs$core$async26107(map_LT___$1,f__$1,ch__$1,meta26108));
});

}

return (new cljs.core.async.t_cljs$core$async26107(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async26116 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26116 = (function (map_GT_,f,ch,meta26117){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta26117 = meta26117;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async26116.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26118,meta26117__$1){
var self__ = this;
var _26118__$1 = this;
return (new cljs.core.async.t_cljs$core$async26116(self__.map_GT_,self__.f,self__.ch,meta26117__$1));
});

cljs.core.async.t_cljs$core$async26116.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26118){
var self__ = this;
var _26118__$1 = this;
return self__.meta26117;
});

cljs.core.async.t_cljs$core$async26116.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async26116.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26116.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async26116.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async26116.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async26116.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async26116.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta26117","meta26117",-1815756510,null)], null);
});

cljs.core.async.t_cljs$core$async26116.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26116.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26116";

cljs.core.async.t_cljs$core$async26116.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async26116");
});

cljs.core.async.__GT_t_cljs$core$async26116 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async26116(map_GT___$1,f__$1,ch__$1,meta26117){
return (new cljs.core.async.t_cljs$core$async26116(map_GT___$1,f__$1,ch__$1,meta26117));
});

}

return (new cljs.core.async.t_cljs$core$async26116(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async26122 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26122 = (function (filter_GT_,p,ch,meta26123){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta26123 = meta26123;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async26122.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26124,meta26123__$1){
var self__ = this;
var _26124__$1 = this;
return (new cljs.core.async.t_cljs$core$async26122(self__.filter_GT_,self__.p,self__.ch,meta26123__$1));
});

cljs.core.async.t_cljs$core$async26122.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26124){
var self__ = this;
var _26124__$1 = this;
return self__.meta26123;
});

cljs.core.async.t_cljs$core$async26122.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async26122.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26122.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26122.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async26122.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async26122.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async26122.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async26122.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta26123","meta26123",1719101944,null)], null);
});

cljs.core.async.t_cljs$core$async26122.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26122.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26122";

cljs.core.async.t_cljs$core$async26122.cljs$lang$ctorPrWriter = (function (this__16865__auto__,writer__16866__auto__,opt__16867__auto__){
return cljs.core._write.call(null,writer__16866__auto__,"cljs.core.async/t_cljs$core$async26122");
});

cljs.core.async.__GT_t_cljs$core$async26122 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async26122(filter_GT___$1,p__$1,ch__$1,meta26123){
return (new cljs.core.async.t_cljs$core$async26122(filter_GT___$1,p__$1,ch__$1,meta26123));
});

}

return (new cljs.core.async.t_cljs$core$async26122(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
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
var args26125 = [];
var len__17325__auto___26169 = arguments.length;
var i__17326__auto___26170 = (0);
while(true){
if((i__17326__auto___26170 < len__17325__auto___26169)){
args26125.push((arguments[i__17326__auto___26170]));

var G__26171 = (i__17326__auto___26170 + (1));
i__17326__auto___26170 = G__26171;
continue;
} else {
}
break;
}

var G__26127 = args26125.length;
switch (G__26127) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26125.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20372__auto___26173 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___26173,out){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___26173,out){
return (function (state_26148){
var state_val_26149 = (state_26148[(1)]);
if((state_val_26149 === (7))){
var inst_26144 = (state_26148[(2)]);
var state_26148__$1 = state_26148;
var statearr_26150_26174 = state_26148__$1;
(statearr_26150_26174[(2)] = inst_26144);

(statearr_26150_26174[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26149 === (1))){
var state_26148__$1 = state_26148;
var statearr_26151_26175 = state_26148__$1;
(statearr_26151_26175[(2)] = null);

(statearr_26151_26175[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26149 === (4))){
var inst_26130 = (state_26148[(7)]);
var inst_26130__$1 = (state_26148[(2)]);
var inst_26131 = (inst_26130__$1 == null);
var state_26148__$1 = (function (){var statearr_26152 = state_26148;
(statearr_26152[(7)] = inst_26130__$1);

return statearr_26152;
})();
if(cljs.core.truth_(inst_26131)){
var statearr_26153_26176 = state_26148__$1;
(statearr_26153_26176[(1)] = (5));

} else {
var statearr_26154_26177 = state_26148__$1;
(statearr_26154_26177[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26149 === (6))){
var inst_26130 = (state_26148[(7)]);
var inst_26135 = p.call(null,inst_26130);
var state_26148__$1 = state_26148;
if(cljs.core.truth_(inst_26135)){
var statearr_26155_26178 = state_26148__$1;
(statearr_26155_26178[(1)] = (8));

} else {
var statearr_26156_26179 = state_26148__$1;
(statearr_26156_26179[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26149 === (3))){
var inst_26146 = (state_26148[(2)]);
var state_26148__$1 = state_26148;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26148__$1,inst_26146);
} else {
if((state_val_26149 === (2))){
var state_26148__$1 = state_26148;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26148__$1,(4),ch);
} else {
if((state_val_26149 === (11))){
var inst_26138 = (state_26148[(2)]);
var state_26148__$1 = state_26148;
var statearr_26157_26180 = state_26148__$1;
(statearr_26157_26180[(2)] = inst_26138);

(statearr_26157_26180[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26149 === (9))){
var state_26148__$1 = state_26148;
var statearr_26158_26181 = state_26148__$1;
(statearr_26158_26181[(2)] = null);

(statearr_26158_26181[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26149 === (5))){
var inst_26133 = cljs.core.async.close_BANG_.call(null,out);
var state_26148__$1 = state_26148;
var statearr_26159_26182 = state_26148__$1;
(statearr_26159_26182[(2)] = inst_26133);

(statearr_26159_26182[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26149 === (10))){
var inst_26141 = (state_26148[(2)]);
var state_26148__$1 = (function (){var statearr_26160 = state_26148;
(statearr_26160[(8)] = inst_26141);

return statearr_26160;
})();
var statearr_26161_26183 = state_26148__$1;
(statearr_26161_26183[(2)] = null);

(statearr_26161_26183[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26149 === (8))){
var inst_26130 = (state_26148[(7)]);
var state_26148__$1 = state_26148;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26148__$1,(11),out,inst_26130);
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
});})(c__20372__auto___26173,out))
;
return ((function (switch__20351__auto__,c__20372__auto___26173,out){
return (function() {
var cljs$core$async$state_machine__20352__auto__ = null;
var cljs$core$async$state_machine__20352__auto____0 = (function (){
var statearr_26165 = [null,null,null,null,null,null,null,null,null];
(statearr_26165[(0)] = cljs$core$async$state_machine__20352__auto__);

(statearr_26165[(1)] = (1));

return statearr_26165;
});
var cljs$core$async$state_machine__20352__auto____1 = (function (state_26148){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_26148);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e26166){if((e26166 instanceof Object)){
var ex__20355__auto__ = e26166;
var statearr_26167_26184 = state_26148;
(statearr_26167_26184[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26148);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26166;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26185 = state_26148;
state_26148 = G__26185;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$state_machine__20352__auto__ = function(state_26148){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20352__auto____1.call(this,state_26148);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20352__auto____0;
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20352__auto____1;
return cljs$core$async$state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___26173,out))
})();
var state__20374__auto__ = (function (){var statearr_26168 = f__20373__auto__.call(null);
(statearr_26168[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___26173);

return statearr_26168;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___26173,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args26186 = [];
var len__17325__auto___26189 = arguments.length;
var i__17326__auto___26190 = (0);
while(true){
if((i__17326__auto___26190 < len__17325__auto___26189)){
args26186.push((arguments[i__17326__auto___26190]));

var G__26191 = (i__17326__auto___26190 + (1));
i__17326__auto___26190 = G__26191;
continue;
} else {
}
break;
}

var G__26188 = args26186.length;
switch (G__26188) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26186.length)].join('')));

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
var c__20372__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto__){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto__){
return (function (state_26358){
var state_val_26359 = (state_26358[(1)]);
if((state_val_26359 === (7))){
var inst_26354 = (state_26358[(2)]);
var state_26358__$1 = state_26358;
var statearr_26360_26401 = state_26358__$1;
(statearr_26360_26401[(2)] = inst_26354);

(statearr_26360_26401[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (20))){
var inst_26324 = (state_26358[(7)]);
var inst_26335 = (state_26358[(2)]);
var inst_26336 = cljs.core.next.call(null,inst_26324);
var inst_26310 = inst_26336;
var inst_26311 = null;
var inst_26312 = (0);
var inst_26313 = (0);
var state_26358__$1 = (function (){var statearr_26361 = state_26358;
(statearr_26361[(8)] = inst_26313);

(statearr_26361[(9)] = inst_26310);

(statearr_26361[(10)] = inst_26311);

(statearr_26361[(11)] = inst_26312);

(statearr_26361[(12)] = inst_26335);

return statearr_26361;
})();
var statearr_26362_26402 = state_26358__$1;
(statearr_26362_26402[(2)] = null);

(statearr_26362_26402[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (1))){
var state_26358__$1 = state_26358;
var statearr_26363_26403 = state_26358__$1;
(statearr_26363_26403[(2)] = null);

(statearr_26363_26403[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (4))){
var inst_26299 = (state_26358[(13)]);
var inst_26299__$1 = (state_26358[(2)]);
var inst_26300 = (inst_26299__$1 == null);
var state_26358__$1 = (function (){var statearr_26364 = state_26358;
(statearr_26364[(13)] = inst_26299__$1);

return statearr_26364;
})();
if(cljs.core.truth_(inst_26300)){
var statearr_26365_26404 = state_26358__$1;
(statearr_26365_26404[(1)] = (5));

} else {
var statearr_26366_26405 = state_26358__$1;
(statearr_26366_26405[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (15))){
var state_26358__$1 = state_26358;
var statearr_26370_26406 = state_26358__$1;
(statearr_26370_26406[(2)] = null);

(statearr_26370_26406[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (21))){
var state_26358__$1 = state_26358;
var statearr_26371_26407 = state_26358__$1;
(statearr_26371_26407[(2)] = null);

(statearr_26371_26407[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (13))){
var inst_26313 = (state_26358[(8)]);
var inst_26310 = (state_26358[(9)]);
var inst_26311 = (state_26358[(10)]);
var inst_26312 = (state_26358[(11)]);
var inst_26320 = (state_26358[(2)]);
var inst_26321 = (inst_26313 + (1));
var tmp26367 = inst_26310;
var tmp26368 = inst_26311;
var tmp26369 = inst_26312;
var inst_26310__$1 = tmp26367;
var inst_26311__$1 = tmp26368;
var inst_26312__$1 = tmp26369;
var inst_26313__$1 = inst_26321;
var state_26358__$1 = (function (){var statearr_26372 = state_26358;
(statearr_26372[(8)] = inst_26313__$1);

(statearr_26372[(9)] = inst_26310__$1);

(statearr_26372[(10)] = inst_26311__$1);

(statearr_26372[(11)] = inst_26312__$1);

(statearr_26372[(14)] = inst_26320);

return statearr_26372;
})();
var statearr_26373_26408 = state_26358__$1;
(statearr_26373_26408[(2)] = null);

(statearr_26373_26408[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (22))){
var state_26358__$1 = state_26358;
var statearr_26374_26409 = state_26358__$1;
(statearr_26374_26409[(2)] = null);

(statearr_26374_26409[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (6))){
var inst_26299 = (state_26358[(13)]);
var inst_26308 = f.call(null,inst_26299);
var inst_26309 = cljs.core.seq.call(null,inst_26308);
var inst_26310 = inst_26309;
var inst_26311 = null;
var inst_26312 = (0);
var inst_26313 = (0);
var state_26358__$1 = (function (){var statearr_26375 = state_26358;
(statearr_26375[(8)] = inst_26313);

(statearr_26375[(9)] = inst_26310);

(statearr_26375[(10)] = inst_26311);

(statearr_26375[(11)] = inst_26312);

return statearr_26375;
})();
var statearr_26376_26410 = state_26358__$1;
(statearr_26376_26410[(2)] = null);

(statearr_26376_26410[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (17))){
var inst_26324 = (state_26358[(7)]);
var inst_26328 = cljs.core.chunk_first.call(null,inst_26324);
var inst_26329 = cljs.core.chunk_rest.call(null,inst_26324);
var inst_26330 = cljs.core.count.call(null,inst_26328);
var inst_26310 = inst_26329;
var inst_26311 = inst_26328;
var inst_26312 = inst_26330;
var inst_26313 = (0);
var state_26358__$1 = (function (){var statearr_26377 = state_26358;
(statearr_26377[(8)] = inst_26313);

(statearr_26377[(9)] = inst_26310);

(statearr_26377[(10)] = inst_26311);

(statearr_26377[(11)] = inst_26312);

return statearr_26377;
})();
var statearr_26378_26411 = state_26358__$1;
(statearr_26378_26411[(2)] = null);

(statearr_26378_26411[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (3))){
var inst_26356 = (state_26358[(2)]);
var state_26358__$1 = state_26358;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26358__$1,inst_26356);
} else {
if((state_val_26359 === (12))){
var inst_26344 = (state_26358[(2)]);
var state_26358__$1 = state_26358;
var statearr_26379_26412 = state_26358__$1;
(statearr_26379_26412[(2)] = inst_26344);

(statearr_26379_26412[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (2))){
var state_26358__$1 = state_26358;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26358__$1,(4),in$);
} else {
if((state_val_26359 === (23))){
var inst_26352 = (state_26358[(2)]);
var state_26358__$1 = state_26358;
var statearr_26380_26413 = state_26358__$1;
(statearr_26380_26413[(2)] = inst_26352);

(statearr_26380_26413[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (19))){
var inst_26339 = (state_26358[(2)]);
var state_26358__$1 = state_26358;
var statearr_26381_26414 = state_26358__$1;
(statearr_26381_26414[(2)] = inst_26339);

(statearr_26381_26414[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (11))){
var inst_26310 = (state_26358[(9)]);
var inst_26324 = (state_26358[(7)]);
var inst_26324__$1 = cljs.core.seq.call(null,inst_26310);
var state_26358__$1 = (function (){var statearr_26382 = state_26358;
(statearr_26382[(7)] = inst_26324__$1);

return statearr_26382;
})();
if(inst_26324__$1){
var statearr_26383_26415 = state_26358__$1;
(statearr_26383_26415[(1)] = (14));

} else {
var statearr_26384_26416 = state_26358__$1;
(statearr_26384_26416[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (9))){
var inst_26346 = (state_26358[(2)]);
var inst_26347 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_26358__$1 = (function (){var statearr_26385 = state_26358;
(statearr_26385[(15)] = inst_26346);

return statearr_26385;
})();
if(cljs.core.truth_(inst_26347)){
var statearr_26386_26417 = state_26358__$1;
(statearr_26386_26417[(1)] = (21));

} else {
var statearr_26387_26418 = state_26358__$1;
(statearr_26387_26418[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (5))){
var inst_26302 = cljs.core.async.close_BANG_.call(null,out);
var state_26358__$1 = state_26358;
var statearr_26388_26419 = state_26358__$1;
(statearr_26388_26419[(2)] = inst_26302);

(statearr_26388_26419[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (14))){
var inst_26324 = (state_26358[(7)]);
var inst_26326 = cljs.core.chunked_seq_QMARK_.call(null,inst_26324);
var state_26358__$1 = state_26358;
if(inst_26326){
var statearr_26389_26420 = state_26358__$1;
(statearr_26389_26420[(1)] = (17));

} else {
var statearr_26390_26421 = state_26358__$1;
(statearr_26390_26421[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (16))){
var inst_26342 = (state_26358[(2)]);
var state_26358__$1 = state_26358;
var statearr_26391_26422 = state_26358__$1;
(statearr_26391_26422[(2)] = inst_26342);

(statearr_26391_26422[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26359 === (10))){
var inst_26313 = (state_26358[(8)]);
var inst_26311 = (state_26358[(10)]);
var inst_26318 = cljs.core._nth.call(null,inst_26311,inst_26313);
var state_26358__$1 = state_26358;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26358__$1,(13),out,inst_26318);
} else {
if((state_val_26359 === (18))){
var inst_26324 = (state_26358[(7)]);
var inst_26333 = cljs.core.first.call(null,inst_26324);
var state_26358__$1 = state_26358;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26358__$1,(20),out,inst_26333);
} else {
if((state_val_26359 === (8))){
var inst_26313 = (state_26358[(8)]);
var inst_26312 = (state_26358[(11)]);
var inst_26315 = (inst_26313 < inst_26312);
var inst_26316 = inst_26315;
var state_26358__$1 = state_26358;
if(cljs.core.truth_(inst_26316)){
var statearr_26392_26423 = state_26358__$1;
(statearr_26392_26423[(1)] = (10));

} else {
var statearr_26393_26424 = state_26358__$1;
(statearr_26393_26424[(1)] = (11));

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
});})(c__20372__auto__))
;
return ((function (switch__20351__auto__,c__20372__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__20352__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__20352__auto____0 = (function (){
var statearr_26397 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26397[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__20352__auto__);

(statearr_26397[(1)] = (1));

return statearr_26397;
});
var cljs$core$async$mapcat_STAR__$_state_machine__20352__auto____1 = (function (state_26358){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_26358);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e26398){if((e26398 instanceof Object)){
var ex__20355__auto__ = e26398;
var statearr_26399_26425 = state_26358;
(statearr_26399_26425[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26358);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26398;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26426 = state_26358;
state_26358 = G__26426;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__20352__auto__ = function(state_26358){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__20352__auto____1.call(this,state_26358);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__20352__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__20352__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto__))
})();
var state__20374__auto__ = (function (){var statearr_26400 = f__20373__auto__.call(null);
(statearr_26400[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto__);

return statearr_26400;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto__))
);

return c__20372__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args26427 = [];
var len__17325__auto___26430 = arguments.length;
var i__17326__auto___26431 = (0);
while(true){
if((i__17326__auto___26431 < len__17325__auto___26430)){
args26427.push((arguments[i__17326__auto___26431]));

var G__26432 = (i__17326__auto___26431 + (1));
i__17326__auto___26431 = G__26432;
continue;
} else {
}
break;
}

var G__26429 = args26427.length;
switch (G__26429) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26427.length)].join('')));

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
var args26434 = [];
var len__17325__auto___26437 = arguments.length;
var i__17326__auto___26438 = (0);
while(true){
if((i__17326__auto___26438 < len__17325__auto___26437)){
args26434.push((arguments[i__17326__auto___26438]));

var G__26439 = (i__17326__auto___26438 + (1));
i__17326__auto___26438 = G__26439;
continue;
} else {
}
break;
}

var G__26436 = args26434.length;
switch (G__26436) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26434.length)].join('')));

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
var args26441 = [];
var len__17325__auto___26492 = arguments.length;
var i__17326__auto___26493 = (0);
while(true){
if((i__17326__auto___26493 < len__17325__auto___26492)){
args26441.push((arguments[i__17326__auto___26493]));

var G__26494 = (i__17326__auto___26493 + (1));
i__17326__auto___26493 = G__26494;
continue;
} else {
}
break;
}

var G__26443 = args26441.length;
switch (G__26443) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26441.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20372__auto___26496 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___26496,out){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___26496,out){
return (function (state_26467){
var state_val_26468 = (state_26467[(1)]);
if((state_val_26468 === (7))){
var inst_26462 = (state_26467[(2)]);
var state_26467__$1 = state_26467;
var statearr_26469_26497 = state_26467__$1;
(statearr_26469_26497[(2)] = inst_26462);

(statearr_26469_26497[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26468 === (1))){
var inst_26444 = null;
var state_26467__$1 = (function (){var statearr_26470 = state_26467;
(statearr_26470[(7)] = inst_26444);

return statearr_26470;
})();
var statearr_26471_26498 = state_26467__$1;
(statearr_26471_26498[(2)] = null);

(statearr_26471_26498[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26468 === (4))){
var inst_26447 = (state_26467[(8)]);
var inst_26447__$1 = (state_26467[(2)]);
var inst_26448 = (inst_26447__$1 == null);
var inst_26449 = cljs.core.not.call(null,inst_26448);
var state_26467__$1 = (function (){var statearr_26472 = state_26467;
(statearr_26472[(8)] = inst_26447__$1);

return statearr_26472;
})();
if(inst_26449){
var statearr_26473_26499 = state_26467__$1;
(statearr_26473_26499[(1)] = (5));

} else {
var statearr_26474_26500 = state_26467__$1;
(statearr_26474_26500[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26468 === (6))){
var state_26467__$1 = state_26467;
var statearr_26475_26501 = state_26467__$1;
(statearr_26475_26501[(2)] = null);

(statearr_26475_26501[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26468 === (3))){
var inst_26464 = (state_26467[(2)]);
var inst_26465 = cljs.core.async.close_BANG_.call(null,out);
var state_26467__$1 = (function (){var statearr_26476 = state_26467;
(statearr_26476[(9)] = inst_26464);

return statearr_26476;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26467__$1,inst_26465);
} else {
if((state_val_26468 === (2))){
var state_26467__$1 = state_26467;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26467__$1,(4),ch);
} else {
if((state_val_26468 === (11))){
var inst_26447 = (state_26467[(8)]);
var inst_26456 = (state_26467[(2)]);
var inst_26444 = inst_26447;
var state_26467__$1 = (function (){var statearr_26477 = state_26467;
(statearr_26477[(7)] = inst_26444);

(statearr_26477[(10)] = inst_26456);

return statearr_26477;
})();
var statearr_26478_26502 = state_26467__$1;
(statearr_26478_26502[(2)] = null);

(statearr_26478_26502[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26468 === (9))){
var inst_26447 = (state_26467[(8)]);
var state_26467__$1 = state_26467;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26467__$1,(11),out,inst_26447);
} else {
if((state_val_26468 === (5))){
var inst_26447 = (state_26467[(8)]);
var inst_26444 = (state_26467[(7)]);
var inst_26451 = cljs.core._EQ_.call(null,inst_26447,inst_26444);
var state_26467__$1 = state_26467;
if(inst_26451){
var statearr_26480_26503 = state_26467__$1;
(statearr_26480_26503[(1)] = (8));

} else {
var statearr_26481_26504 = state_26467__$1;
(statearr_26481_26504[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26468 === (10))){
var inst_26459 = (state_26467[(2)]);
var state_26467__$1 = state_26467;
var statearr_26482_26505 = state_26467__$1;
(statearr_26482_26505[(2)] = inst_26459);

(statearr_26482_26505[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26468 === (8))){
var inst_26444 = (state_26467[(7)]);
var tmp26479 = inst_26444;
var inst_26444__$1 = tmp26479;
var state_26467__$1 = (function (){var statearr_26483 = state_26467;
(statearr_26483[(7)] = inst_26444__$1);

return statearr_26483;
})();
var statearr_26484_26506 = state_26467__$1;
(statearr_26484_26506[(2)] = null);

(statearr_26484_26506[(1)] = (2));


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
});})(c__20372__auto___26496,out))
;
return ((function (switch__20351__auto__,c__20372__auto___26496,out){
return (function() {
var cljs$core$async$state_machine__20352__auto__ = null;
var cljs$core$async$state_machine__20352__auto____0 = (function (){
var statearr_26488 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_26488[(0)] = cljs$core$async$state_machine__20352__auto__);

(statearr_26488[(1)] = (1));

return statearr_26488;
});
var cljs$core$async$state_machine__20352__auto____1 = (function (state_26467){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_26467);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e26489){if((e26489 instanceof Object)){
var ex__20355__auto__ = e26489;
var statearr_26490_26507 = state_26467;
(statearr_26490_26507[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26467);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26489;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26508 = state_26467;
state_26467 = G__26508;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$state_machine__20352__auto__ = function(state_26467){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20352__auto____1.call(this,state_26467);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20352__auto____0;
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20352__auto____1;
return cljs$core$async$state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___26496,out))
})();
var state__20374__auto__ = (function (){var statearr_26491 = f__20373__auto__.call(null);
(statearr_26491[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___26496);

return statearr_26491;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___26496,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args26509 = [];
var len__17325__auto___26579 = arguments.length;
var i__17326__auto___26580 = (0);
while(true){
if((i__17326__auto___26580 < len__17325__auto___26579)){
args26509.push((arguments[i__17326__auto___26580]));

var G__26581 = (i__17326__auto___26580 + (1));
i__17326__auto___26580 = G__26581;
continue;
} else {
}
break;
}

var G__26511 = args26509.length;
switch (G__26511) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26509.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20372__auto___26583 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___26583,out){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___26583,out){
return (function (state_26549){
var state_val_26550 = (state_26549[(1)]);
if((state_val_26550 === (7))){
var inst_26545 = (state_26549[(2)]);
var state_26549__$1 = state_26549;
var statearr_26551_26584 = state_26549__$1;
(statearr_26551_26584[(2)] = inst_26545);

(statearr_26551_26584[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26550 === (1))){
var inst_26512 = (new Array(n));
var inst_26513 = inst_26512;
var inst_26514 = (0);
var state_26549__$1 = (function (){var statearr_26552 = state_26549;
(statearr_26552[(7)] = inst_26514);

(statearr_26552[(8)] = inst_26513);

return statearr_26552;
})();
var statearr_26553_26585 = state_26549__$1;
(statearr_26553_26585[(2)] = null);

(statearr_26553_26585[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26550 === (4))){
var inst_26517 = (state_26549[(9)]);
var inst_26517__$1 = (state_26549[(2)]);
var inst_26518 = (inst_26517__$1 == null);
var inst_26519 = cljs.core.not.call(null,inst_26518);
var state_26549__$1 = (function (){var statearr_26554 = state_26549;
(statearr_26554[(9)] = inst_26517__$1);

return statearr_26554;
})();
if(inst_26519){
var statearr_26555_26586 = state_26549__$1;
(statearr_26555_26586[(1)] = (5));

} else {
var statearr_26556_26587 = state_26549__$1;
(statearr_26556_26587[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26550 === (15))){
var inst_26539 = (state_26549[(2)]);
var state_26549__$1 = state_26549;
var statearr_26557_26588 = state_26549__$1;
(statearr_26557_26588[(2)] = inst_26539);

(statearr_26557_26588[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26550 === (13))){
var state_26549__$1 = state_26549;
var statearr_26558_26589 = state_26549__$1;
(statearr_26558_26589[(2)] = null);

(statearr_26558_26589[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26550 === (6))){
var inst_26514 = (state_26549[(7)]);
var inst_26535 = (inst_26514 > (0));
var state_26549__$1 = state_26549;
if(cljs.core.truth_(inst_26535)){
var statearr_26559_26590 = state_26549__$1;
(statearr_26559_26590[(1)] = (12));

} else {
var statearr_26560_26591 = state_26549__$1;
(statearr_26560_26591[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26550 === (3))){
var inst_26547 = (state_26549[(2)]);
var state_26549__$1 = state_26549;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26549__$1,inst_26547);
} else {
if((state_val_26550 === (12))){
var inst_26513 = (state_26549[(8)]);
var inst_26537 = cljs.core.vec.call(null,inst_26513);
var state_26549__$1 = state_26549;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26549__$1,(15),out,inst_26537);
} else {
if((state_val_26550 === (2))){
var state_26549__$1 = state_26549;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26549__$1,(4),ch);
} else {
if((state_val_26550 === (11))){
var inst_26529 = (state_26549[(2)]);
var inst_26530 = (new Array(n));
var inst_26513 = inst_26530;
var inst_26514 = (0);
var state_26549__$1 = (function (){var statearr_26561 = state_26549;
(statearr_26561[(7)] = inst_26514);

(statearr_26561[(8)] = inst_26513);

(statearr_26561[(10)] = inst_26529);

return statearr_26561;
})();
var statearr_26562_26592 = state_26549__$1;
(statearr_26562_26592[(2)] = null);

(statearr_26562_26592[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26550 === (9))){
var inst_26513 = (state_26549[(8)]);
var inst_26527 = cljs.core.vec.call(null,inst_26513);
var state_26549__$1 = state_26549;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26549__$1,(11),out,inst_26527);
} else {
if((state_val_26550 === (5))){
var inst_26514 = (state_26549[(7)]);
var inst_26517 = (state_26549[(9)]);
var inst_26513 = (state_26549[(8)]);
var inst_26522 = (state_26549[(11)]);
var inst_26521 = (inst_26513[inst_26514] = inst_26517);
var inst_26522__$1 = (inst_26514 + (1));
var inst_26523 = (inst_26522__$1 < n);
var state_26549__$1 = (function (){var statearr_26563 = state_26549;
(statearr_26563[(12)] = inst_26521);

(statearr_26563[(11)] = inst_26522__$1);

return statearr_26563;
})();
if(cljs.core.truth_(inst_26523)){
var statearr_26564_26593 = state_26549__$1;
(statearr_26564_26593[(1)] = (8));

} else {
var statearr_26565_26594 = state_26549__$1;
(statearr_26565_26594[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26550 === (14))){
var inst_26542 = (state_26549[(2)]);
var inst_26543 = cljs.core.async.close_BANG_.call(null,out);
var state_26549__$1 = (function (){var statearr_26567 = state_26549;
(statearr_26567[(13)] = inst_26542);

return statearr_26567;
})();
var statearr_26568_26595 = state_26549__$1;
(statearr_26568_26595[(2)] = inst_26543);

(statearr_26568_26595[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26550 === (10))){
var inst_26533 = (state_26549[(2)]);
var state_26549__$1 = state_26549;
var statearr_26569_26596 = state_26549__$1;
(statearr_26569_26596[(2)] = inst_26533);

(statearr_26569_26596[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26550 === (8))){
var inst_26513 = (state_26549[(8)]);
var inst_26522 = (state_26549[(11)]);
var tmp26566 = inst_26513;
var inst_26513__$1 = tmp26566;
var inst_26514 = inst_26522;
var state_26549__$1 = (function (){var statearr_26570 = state_26549;
(statearr_26570[(7)] = inst_26514);

(statearr_26570[(8)] = inst_26513__$1);

return statearr_26570;
})();
var statearr_26571_26597 = state_26549__$1;
(statearr_26571_26597[(2)] = null);

(statearr_26571_26597[(1)] = (2));


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
});})(c__20372__auto___26583,out))
;
return ((function (switch__20351__auto__,c__20372__auto___26583,out){
return (function() {
var cljs$core$async$state_machine__20352__auto__ = null;
var cljs$core$async$state_machine__20352__auto____0 = (function (){
var statearr_26575 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26575[(0)] = cljs$core$async$state_machine__20352__auto__);

(statearr_26575[(1)] = (1));

return statearr_26575;
});
var cljs$core$async$state_machine__20352__auto____1 = (function (state_26549){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_26549);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e26576){if((e26576 instanceof Object)){
var ex__20355__auto__ = e26576;
var statearr_26577_26598 = state_26549;
(statearr_26577_26598[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26549);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26576;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26599 = state_26549;
state_26549 = G__26599;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$state_machine__20352__auto__ = function(state_26549){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20352__auto____1.call(this,state_26549);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20352__auto____0;
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20352__auto____1;
return cljs$core$async$state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___26583,out))
})();
var state__20374__auto__ = (function (){var statearr_26578 = f__20373__auto__.call(null);
(statearr_26578[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___26583);

return statearr_26578;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___26583,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args26600 = [];
var len__17325__auto___26674 = arguments.length;
var i__17326__auto___26675 = (0);
while(true){
if((i__17326__auto___26675 < len__17325__auto___26674)){
args26600.push((arguments[i__17326__auto___26675]));

var G__26676 = (i__17326__auto___26675 + (1));
i__17326__auto___26675 = G__26676;
continue;
} else {
}
break;
}

var G__26602 = args26600.length;
switch (G__26602) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26600.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20372__auto___26678 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20372__auto___26678,out){
return (function (){
var f__20373__auto__ = (function (){var switch__20351__auto__ = ((function (c__20372__auto___26678,out){
return (function (state_26644){
var state_val_26645 = (state_26644[(1)]);
if((state_val_26645 === (7))){
var inst_26640 = (state_26644[(2)]);
var state_26644__$1 = state_26644;
var statearr_26646_26679 = state_26644__$1;
(statearr_26646_26679[(2)] = inst_26640);

(statearr_26646_26679[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26645 === (1))){
var inst_26603 = [];
var inst_26604 = inst_26603;
var inst_26605 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_26644__$1 = (function (){var statearr_26647 = state_26644;
(statearr_26647[(7)] = inst_26605);

(statearr_26647[(8)] = inst_26604);

return statearr_26647;
})();
var statearr_26648_26680 = state_26644__$1;
(statearr_26648_26680[(2)] = null);

(statearr_26648_26680[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26645 === (4))){
var inst_26608 = (state_26644[(9)]);
var inst_26608__$1 = (state_26644[(2)]);
var inst_26609 = (inst_26608__$1 == null);
var inst_26610 = cljs.core.not.call(null,inst_26609);
var state_26644__$1 = (function (){var statearr_26649 = state_26644;
(statearr_26649[(9)] = inst_26608__$1);

return statearr_26649;
})();
if(inst_26610){
var statearr_26650_26681 = state_26644__$1;
(statearr_26650_26681[(1)] = (5));

} else {
var statearr_26651_26682 = state_26644__$1;
(statearr_26651_26682[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26645 === (15))){
var inst_26634 = (state_26644[(2)]);
var state_26644__$1 = state_26644;
var statearr_26652_26683 = state_26644__$1;
(statearr_26652_26683[(2)] = inst_26634);

(statearr_26652_26683[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26645 === (13))){
var state_26644__$1 = state_26644;
var statearr_26653_26684 = state_26644__$1;
(statearr_26653_26684[(2)] = null);

(statearr_26653_26684[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26645 === (6))){
var inst_26604 = (state_26644[(8)]);
var inst_26629 = inst_26604.length;
var inst_26630 = (inst_26629 > (0));
var state_26644__$1 = state_26644;
if(cljs.core.truth_(inst_26630)){
var statearr_26654_26685 = state_26644__$1;
(statearr_26654_26685[(1)] = (12));

} else {
var statearr_26655_26686 = state_26644__$1;
(statearr_26655_26686[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26645 === (3))){
var inst_26642 = (state_26644[(2)]);
var state_26644__$1 = state_26644;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26644__$1,inst_26642);
} else {
if((state_val_26645 === (12))){
var inst_26604 = (state_26644[(8)]);
var inst_26632 = cljs.core.vec.call(null,inst_26604);
var state_26644__$1 = state_26644;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26644__$1,(15),out,inst_26632);
} else {
if((state_val_26645 === (2))){
var state_26644__$1 = state_26644;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26644__$1,(4),ch);
} else {
if((state_val_26645 === (11))){
var inst_26608 = (state_26644[(9)]);
var inst_26612 = (state_26644[(10)]);
var inst_26622 = (state_26644[(2)]);
var inst_26623 = [];
var inst_26624 = inst_26623.push(inst_26608);
var inst_26604 = inst_26623;
var inst_26605 = inst_26612;
var state_26644__$1 = (function (){var statearr_26656 = state_26644;
(statearr_26656[(7)] = inst_26605);

(statearr_26656[(8)] = inst_26604);

(statearr_26656[(11)] = inst_26624);

(statearr_26656[(12)] = inst_26622);

return statearr_26656;
})();
var statearr_26657_26687 = state_26644__$1;
(statearr_26657_26687[(2)] = null);

(statearr_26657_26687[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26645 === (9))){
var inst_26604 = (state_26644[(8)]);
var inst_26620 = cljs.core.vec.call(null,inst_26604);
var state_26644__$1 = state_26644;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26644__$1,(11),out,inst_26620);
} else {
if((state_val_26645 === (5))){
var inst_26605 = (state_26644[(7)]);
var inst_26608 = (state_26644[(9)]);
var inst_26612 = (state_26644[(10)]);
var inst_26612__$1 = f.call(null,inst_26608);
var inst_26613 = cljs.core._EQ_.call(null,inst_26612__$1,inst_26605);
var inst_26614 = cljs.core.keyword_identical_QMARK_.call(null,inst_26605,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_26615 = (inst_26613) || (inst_26614);
var state_26644__$1 = (function (){var statearr_26658 = state_26644;
(statearr_26658[(10)] = inst_26612__$1);

return statearr_26658;
})();
if(cljs.core.truth_(inst_26615)){
var statearr_26659_26688 = state_26644__$1;
(statearr_26659_26688[(1)] = (8));

} else {
var statearr_26660_26689 = state_26644__$1;
(statearr_26660_26689[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26645 === (14))){
var inst_26637 = (state_26644[(2)]);
var inst_26638 = cljs.core.async.close_BANG_.call(null,out);
var state_26644__$1 = (function (){var statearr_26662 = state_26644;
(statearr_26662[(13)] = inst_26637);

return statearr_26662;
})();
var statearr_26663_26690 = state_26644__$1;
(statearr_26663_26690[(2)] = inst_26638);

(statearr_26663_26690[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26645 === (10))){
var inst_26627 = (state_26644[(2)]);
var state_26644__$1 = state_26644;
var statearr_26664_26691 = state_26644__$1;
(statearr_26664_26691[(2)] = inst_26627);

(statearr_26664_26691[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26645 === (8))){
var inst_26604 = (state_26644[(8)]);
var inst_26608 = (state_26644[(9)]);
var inst_26612 = (state_26644[(10)]);
var inst_26617 = inst_26604.push(inst_26608);
var tmp26661 = inst_26604;
var inst_26604__$1 = tmp26661;
var inst_26605 = inst_26612;
var state_26644__$1 = (function (){var statearr_26665 = state_26644;
(statearr_26665[(7)] = inst_26605);

(statearr_26665[(8)] = inst_26604__$1);

(statearr_26665[(14)] = inst_26617);

return statearr_26665;
})();
var statearr_26666_26692 = state_26644__$1;
(statearr_26666_26692[(2)] = null);

(statearr_26666_26692[(1)] = (2));


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
});})(c__20372__auto___26678,out))
;
return ((function (switch__20351__auto__,c__20372__auto___26678,out){
return (function() {
var cljs$core$async$state_machine__20352__auto__ = null;
var cljs$core$async$state_machine__20352__auto____0 = (function (){
var statearr_26670 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26670[(0)] = cljs$core$async$state_machine__20352__auto__);

(statearr_26670[(1)] = (1));

return statearr_26670;
});
var cljs$core$async$state_machine__20352__auto____1 = (function (state_26644){
while(true){
var ret_value__20353__auto__ = (function (){try{while(true){
var result__20354__auto__ = switch__20351__auto__.call(null,state_26644);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20354__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20354__auto__;
}
break;
}
}catch (e26671){if((e26671 instanceof Object)){
var ex__20355__auto__ = e26671;
var statearr_26672_26693 = state_26644;
(statearr_26672_26693[(5)] = ex__20355__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26644);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26671;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20353__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26694 = state_26644;
state_26644 = G__26694;
continue;
} else {
return ret_value__20353__auto__;
}
break;
}
});
cljs$core$async$state_machine__20352__auto__ = function(state_26644){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20352__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20352__auto____1.call(this,state_26644);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20352__auto____0;
cljs$core$async$state_machine__20352__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20352__auto____1;
return cljs$core$async$state_machine__20352__auto__;
})()
;})(switch__20351__auto__,c__20372__auto___26678,out))
})();
var state__20374__auto__ = (function (){var statearr_26673 = f__20373__auto__.call(null);
(statearr_26673[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20372__auto___26678);

return statearr_26673;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20374__auto__);
});})(c__20372__auto___26678,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map?rel=1450835344968