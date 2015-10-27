// Compiled by ClojureScript 1.7.122 {}
goog.provide('sablono.core');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('goog.string');
goog.require('sablono.util');
goog.require('sablono.interpreter');
goog.require('goog.dom');
goog.require('cljsjs.react');
/**
 * Add an optional attribute argument to a function that returns a element vector.
 */
sablono.core.wrap_attrs = (function sablono$core$wrap_attrs(func){
return (function() { 
var G__52211__delegate = function (args){
if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,args))){
var vec__52210 = cljs.core.apply.call(null,func,cljs.core.rest.call(null,args));
var tag = cljs.core.nth.call(null,vec__52210,(0),null);
var body = cljs.core.nthnext.call(null,vec__52210,(1));
if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,body))){
return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.merge.call(null,cljs.core.first.call(null,body),cljs.core.first.call(null,args)),cljs.core.rest.call(null,body));
} else {
return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.first.call(null,args),body);
}
} else {
return cljs.core.apply.call(null,func,args);
}
};
var G__52211 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__52212__i = 0, G__52212__a = new Array(arguments.length -  0);
while (G__52212__i < G__52212__a.length) {G__52212__a[G__52212__i] = arguments[G__52212__i + 0]; ++G__52212__i;}
  args = new cljs.core.IndexedSeq(G__52212__a,0);
} 
return G__52211__delegate.call(this,args);};
G__52211.cljs$lang$maxFixedArity = 0;
G__52211.cljs$lang$applyTo = (function (arglist__52213){
var args = cljs.core.seq(arglist__52213);
return G__52211__delegate(args);
});
G__52211.cljs$core$IFn$_invoke$arity$variadic = G__52211__delegate;
return G__52211;
})()
;
});
sablono.core.update_arglists = (function sablono$core$update_arglists(arglists){
var iter__17039__auto__ = (function sablono$core$update_arglists_$_iter__52218(s__52219){
return (new cljs.core.LazySeq(null,(function (){
var s__52219__$1 = s__52219;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__52219__$1);
if(temp__4425__auto__){
var s__52219__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__52219__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__52219__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__52221 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__52220 = (0);
while(true){
if((i__52220 < size__17038__auto__)){
var args = cljs.core._nth.call(null,c__17037__auto__,i__52220);
cljs.core.chunk_append.call(null,b__52221,cljs.core.vec.call(null,cljs.core.cons.call(null,new cljs.core.Symbol(null,"attr-map?","attr-map?",116307443,null),args)));

var G__52222 = (i__52220 + (1));
i__52220 = G__52222;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__52221),sablono$core$update_arglists_$_iter__52218.call(null,cljs.core.chunk_rest.call(null,s__52219__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__52221),null);
}
} else {
var args = cljs.core.first.call(null,s__52219__$2);
return cljs.core.cons.call(null,cljs.core.vec.call(null,cljs.core.cons.call(null,new cljs.core.Symbol(null,"attr-map?","attr-map?",116307443,null),args)),sablono$core$update_arglists_$_iter__52218.call(null,cljs.core.rest.call(null,s__52219__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__17039__auto__.call(null,arglists);
});
/**
 * Render `element` as HTML string.
 */
sablono.core.render = (function sablono$core$render(element){
if(cljs.core.truth_(element)){
return React.renderToString(element);
} else {
return null;
}
});
/**
 * Render `element` as HTML string, without React internal attributes.
 */
sablono.core.render_static = (function sablono$core$render_static(element){
if(cljs.core.truth_(element)){
return React.renderToStaticMarkup(element);
} else {
return null;
}
});
/**
 * Include a list of external stylesheet files.
 */
sablono.core.include_css = (function sablono$core$include_css(var_args){
var args__17332__auto__ = [];
var len__17325__auto___52228 = arguments.length;
var i__17326__auto___52229 = (0);
while(true){
if((i__17326__auto___52229 < len__17325__auto___52228)){
args__17332__auto__.push((arguments[i__17326__auto___52229]));

var G__52230 = (i__17326__auto___52229 + (1));
i__17326__auto___52229 = G__52230;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((0) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((0)),(0))):null);
return sablono.core.include_css.cljs$core$IFn$_invoke$arity$variadic(argseq__17333__auto__);
});

sablono.core.include_css.cljs$core$IFn$_invoke$arity$variadic = (function (styles){
var iter__17039__auto__ = (function sablono$core$iter__52224(s__52225){
return (new cljs.core.LazySeq(null,(function (){
var s__52225__$1 = s__52225;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__52225__$1);
if(temp__4425__auto__){
var s__52225__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__52225__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__52225__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__52227 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__52226 = (0);
while(true){
if((i__52226 < size__17038__auto__)){
var style = cljs.core._nth.call(null,c__17037__auto__,i__52226);
cljs.core.chunk_append.call(null,b__52227,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",-1769163468),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text/css",new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,style),new cljs.core.Keyword(null,"rel","rel",1378823488),"stylesheet"], null)], null));

var G__52231 = (i__52226 + (1));
i__52226 = G__52231;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__52227),sablono$core$iter__52224.call(null,cljs.core.chunk_rest.call(null,s__52225__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__52227),null);
}
} else {
var style = cljs.core.first.call(null,s__52225__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",-1769163468),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text/css",new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,style),new cljs.core.Keyword(null,"rel","rel",1378823488),"stylesheet"], null)], null),sablono$core$iter__52224.call(null,cljs.core.rest.call(null,s__52225__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__17039__auto__.call(null,styles);
});

sablono.core.include_css.cljs$lang$maxFixedArity = (0);

sablono.core.include_css.cljs$lang$applyTo = (function (seq52223){
return sablono.core.include_css.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq52223));
});
/**
 * Include the JavaScript library at `src`.
 */
sablono.core.include_js = (function sablono$core$include_js(src){
return goog.dom.appendChild(goog.dom.getDocument().body,goog.dom.createDom("script",{"src": src}));
});
/**
 * Include Facebook's React JavaScript library.
 */
sablono.core.include_react = (function sablono$core$include_react(){
return sablono.core.include_js.call(null,"http://fb.me/react-0.12.2.js");
});
/**
 * Wraps some content in a HTML hyperlink with the supplied URL.
 */
sablono.core.link_to52232 = (function sablono$core$link_to52232(var_args){
var args__17332__auto__ = [];
var len__17325__auto___52235 = arguments.length;
var i__17326__auto___52236 = (0);
while(true){
if((i__17326__auto___52236 < len__17325__auto___52235)){
args__17332__auto__.push((arguments[i__17326__auto___52236]));

var G__52237 = (i__17326__auto___52236 + (1));
i__17326__auto___52236 = G__52237;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return sablono.core.link_to52232.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

sablono.core.link_to52232.cljs$core$IFn$_invoke$arity$variadic = (function (url,content){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,url)], null),content], null);
});

sablono.core.link_to52232.cljs$lang$maxFixedArity = (1);

sablono.core.link_to52232.cljs$lang$applyTo = (function (seq52233){
var G__52234 = cljs.core.first.call(null,seq52233);
var seq52233__$1 = cljs.core.next.call(null,seq52233);
return sablono.core.link_to52232.cljs$core$IFn$_invoke$arity$variadic(G__52234,seq52233__$1);
});

sablono.core.link_to = sablono.core.wrap_attrs.call(null,sablono.core.link_to52232);
/**
 * Wraps some content in a HTML hyperlink with the supplied e-mail
 *   address. If no content provided use the e-mail address as content.
 */
sablono.core.mail_to52238 = (function sablono$core$mail_to52238(var_args){
var args__17332__auto__ = [];
var len__17325__auto___52243 = arguments.length;
var i__17326__auto___52244 = (0);
while(true){
if((i__17326__auto___52244 < len__17325__auto___52243)){
args__17332__auto__.push((arguments[i__17326__auto___52244]));

var G__52245 = (i__17326__auto___52244 + (1));
i__17326__auto___52244 = G__52245;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return sablono.core.mail_to52238.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

sablono.core.mail_to52238.cljs$core$IFn$_invoke$arity$variadic = (function (e_mail,p__52241){
var vec__52242 = p__52241;
var content = cljs.core.nth.call(null,vec__52242,(0),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),[cljs.core.str("mailto:"),cljs.core.str(e_mail)].join('')], null),(function (){var or__16267__auto__ = content;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return e_mail;
}
})()], null);
});

sablono.core.mail_to52238.cljs$lang$maxFixedArity = (1);

sablono.core.mail_to52238.cljs$lang$applyTo = (function (seq52239){
var G__52240 = cljs.core.first.call(null,seq52239);
var seq52239__$1 = cljs.core.next.call(null,seq52239);
return sablono.core.mail_to52238.cljs$core$IFn$_invoke$arity$variadic(G__52240,seq52239__$1);
});

sablono.core.mail_to = sablono.core.wrap_attrs.call(null,sablono.core.mail_to52238);
/**
 * Wrap a collection in an unordered list.
 */
sablono.core.unordered_list52246 = (function sablono$core$unordered_list52246(coll){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__17039__auto__ = (function sablono$core$unordered_list52246_$_iter__52251(s__52252){
return (new cljs.core.LazySeq(null,(function (){
var s__52252__$1 = s__52252;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__52252__$1);
if(temp__4425__auto__){
var s__52252__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__52252__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__52252__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__52254 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__52253 = (0);
while(true){
if((i__52253 < size__17038__auto__)){
var x = cljs.core._nth.call(null,c__17037__auto__,i__52253);
cljs.core.chunk_append.call(null,b__52254,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null));

var G__52255 = (i__52253 + (1));
i__52253 = G__52255;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__52254),sablono$core$unordered_list52246_$_iter__52251.call(null,cljs.core.chunk_rest.call(null,s__52252__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__52254),null);
}
} else {
var x = cljs.core.first.call(null,s__52252__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null),sablono$core$unordered_list52246_$_iter__52251.call(null,cljs.core.rest.call(null,s__52252__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__17039__auto__.call(null,coll);
})()], null);
});

sablono.core.unordered_list = sablono.core.wrap_attrs.call(null,sablono.core.unordered_list52246);
/**
 * Wrap a collection in an ordered list.
 */
sablono.core.ordered_list52256 = (function sablono$core$ordered_list52256(coll){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ol","ol",932524051),(function (){var iter__17039__auto__ = (function sablono$core$ordered_list52256_$_iter__52261(s__52262){
return (new cljs.core.LazySeq(null,(function (){
var s__52262__$1 = s__52262;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__52262__$1);
if(temp__4425__auto__){
var s__52262__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__52262__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__52262__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__52264 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__52263 = (0);
while(true){
if((i__52263 < size__17038__auto__)){
var x = cljs.core._nth.call(null,c__17037__auto__,i__52263);
cljs.core.chunk_append.call(null,b__52264,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null));

var G__52265 = (i__52263 + (1));
i__52263 = G__52265;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__52264),sablono$core$ordered_list52256_$_iter__52261.call(null,cljs.core.chunk_rest.call(null,s__52262__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__52264),null);
}
} else {
var x = cljs.core.first.call(null,s__52262__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null),sablono$core$ordered_list52256_$_iter__52261.call(null,cljs.core.rest.call(null,s__52262__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__17039__auto__.call(null,coll);
})()], null);
});

sablono.core.ordered_list = sablono.core.wrap_attrs.call(null,sablono.core.ordered_list52256);
/**
 * Create an image element.
 */
sablono.core.image52266 = (function sablono$core$image52266(var_args){
var args52267 = [];
var len__17325__auto___52270 = arguments.length;
var i__17326__auto___52271 = (0);
while(true){
if((i__17326__auto___52271 < len__17325__auto___52270)){
args52267.push((arguments[i__17326__auto___52271]));

var G__52272 = (i__17326__auto___52271 + (1));
i__17326__auto___52271 = G__52272;
continue;
} else {
}
break;
}

var G__52269 = args52267.length;
switch (G__52269) {
case 1:
return sablono.core.image52266.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.image52266.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52267.length)].join('')));

}
});

sablono.core.image52266.cljs$core$IFn$_invoke$arity$1 = (function (src){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),sablono.util.as_str.call(null,src)], null)], null);
});

sablono.core.image52266.cljs$core$IFn$_invoke$arity$2 = (function (src,alt){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),sablono.util.as_str.call(null,src),new cljs.core.Keyword(null,"alt","alt",-3214426),alt], null)], null);
});

sablono.core.image52266.cljs$lang$maxFixedArity = 2;

sablono.core.image = sablono.core.wrap_attrs.call(null,sablono.core.image52266);
sablono.core._STAR_group_STAR_ = cljs.core.PersistentVector.EMPTY;
/**
 * Create a field name from the supplied argument the current field group.
 */
sablono.core.make_name = (function sablono$core$make_name(name){
return cljs.core.reduce.call(null,(function (p1__52274_SHARP_,p2__52275_SHARP_){
return [cljs.core.str(p1__52274_SHARP_),cljs.core.str("["),cljs.core.str(p2__52275_SHARP_),cljs.core.str("]")].join('');
}),cljs.core.conj.call(null,sablono.core._STAR_group_STAR_,sablono.util.as_str.call(null,name)));
});
/**
 * Create a field id from the supplied argument and current field group.
 */
sablono.core.make_id = (function sablono$core$make_id(name){
return cljs.core.reduce.call(null,(function (p1__52276_SHARP_,p2__52277_SHARP_){
return [cljs.core.str(p1__52276_SHARP_),cljs.core.str("-"),cljs.core.str(p2__52277_SHARP_)].join('');
}),cljs.core.conj.call(null,sablono.core._STAR_group_STAR_,sablono.util.as_str.call(null,name)));
});
/**
 * Creates a new <input> element.
 */
sablono.core.input_field_STAR_ = (function sablono$core$input_field_STAR_(type,name,value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),type,new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",305978217),value], null)], null);
});
/**
 * Creates a color input field.
 */
sablono.core.color_field52278 = (function sablono$core$color_field52278(var_args){
var args52279 = [];
var len__17325__auto___52346 = arguments.length;
var i__17326__auto___52347 = (0);
while(true){
if((i__17326__auto___52347 < len__17325__auto___52346)){
args52279.push((arguments[i__17326__auto___52347]));

var G__52348 = (i__17326__auto___52347 + (1));
i__17326__auto___52347 = G__52348;
continue;
} else {
}
break;
}

var G__52281 = args52279.length;
switch (G__52281) {
case 1:
return sablono.core.color_field52278.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.color_field52278.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52279.length)].join('')));

}
});

sablono.core.color_field52278.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.color_field52278.call(null,name__22649__auto__,null);
});

sablono.core.color_field52278.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"color","color",-1642760596,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.color_field52278.cljs$lang$maxFixedArity = 2;

sablono.core.color_field = sablono.core.wrap_attrs.call(null,sablono.core.color_field52278);

/**
 * Creates a date input field.
 */
sablono.core.date_field52282 = (function sablono$core$date_field52282(var_args){
var args52283 = [];
var len__17325__auto___52350 = arguments.length;
var i__17326__auto___52351 = (0);
while(true){
if((i__17326__auto___52351 < len__17325__auto___52350)){
args52283.push((arguments[i__17326__auto___52351]));

var G__52352 = (i__17326__auto___52351 + (1));
i__17326__auto___52351 = G__52352;
continue;
} else {
}
break;
}

var G__52285 = args52283.length;
switch (G__52285) {
case 1:
return sablono.core.date_field52282.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.date_field52282.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52283.length)].join('')));

}
});

sablono.core.date_field52282.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.date_field52282.call(null,name__22649__auto__,null);
});

sablono.core.date_field52282.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"date","date",177097065,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.date_field52282.cljs$lang$maxFixedArity = 2;

sablono.core.date_field = sablono.core.wrap_attrs.call(null,sablono.core.date_field52282);

/**
 * Creates a datetime input field.
 */
sablono.core.datetime_field52286 = (function sablono$core$datetime_field52286(var_args){
var args52287 = [];
var len__17325__auto___52354 = arguments.length;
var i__17326__auto___52355 = (0);
while(true){
if((i__17326__auto___52355 < len__17325__auto___52354)){
args52287.push((arguments[i__17326__auto___52355]));

var G__52356 = (i__17326__auto___52355 + (1));
i__17326__auto___52355 = G__52356;
continue;
} else {
}
break;
}

var G__52289 = args52287.length;
switch (G__52289) {
case 1:
return sablono.core.datetime_field52286.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.datetime_field52286.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52287.length)].join('')));

}
});

sablono.core.datetime_field52286.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.datetime_field52286.call(null,name__22649__auto__,null);
});

sablono.core.datetime_field52286.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"datetime","datetime",2135207229,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.datetime_field52286.cljs$lang$maxFixedArity = 2;

sablono.core.datetime_field = sablono.core.wrap_attrs.call(null,sablono.core.datetime_field52286);

/**
 * Creates a datetime-local input field.
 */
sablono.core.datetime_local_field52290 = (function sablono$core$datetime_local_field52290(var_args){
var args52291 = [];
var len__17325__auto___52358 = arguments.length;
var i__17326__auto___52359 = (0);
while(true){
if((i__17326__auto___52359 < len__17325__auto___52358)){
args52291.push((arguments[i__17326__auto___52359]));

var G__52360 = (i__17326__auto___52359 + (1));
i__17326__auto___52359 = G__52360;
continue;
} else {
}
break;
}

var G__52293 = args52291.length;
switch (G__52293) {
case 1:
return sablono.core.datetime_local_field52290.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.datetime_local_field52290.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52291.length)].join('')));

}
});

sablono.core.datetime_local_field52290.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.datetime_local_field52290.call(null,name__22649__auto__,null);
});

sablono.core.datetime_local_field52290.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"datetime-local","datetime-local",-507312697,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.datetime_local_field52290.cljs$lang$maxFixedArity = 2;

sablono.core.datetime_local_field = sablono.core.wrap_attrs.call(null,sablono.core.datetime_local_field52290);

/**
 * Creates a email input field.
 */
sablono.core.email_field52294 = (function sablono$core$email_field52294(var_args){
var args52295 = [];
var len__17325__auto___52362 = arguments.length;
var i__17326__auto___52363 = (0);
while(true){
if((i__17326__auto___52363 < len__17325__auto___52362)){
args52295.push((arguments[i__17326__auto___52363]));

var G__52364 = (i__17326__auto___52363 + (1));
i__17326__auto___52363 = G__52364;
continue;
} else {
}
break;
}

var G__52297 = args52295.length;
switch (G__52297) {
case 1:
return sablono.core.email_field52294.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.email_field52294.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52295.length)].join('')));

}
});

sablono.core.email_field52294.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.email_field52294.call(null,name__22649__auto__,null);
});

sablono.core.email_field52294.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"email","email",-1238619063,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.email_field52294.cljs$lang$maxFixedArity = 2;

sablono.core.email_field = sablono.core.wrap_attrs.call(null,sablono.core.email_field52294);

/**
 * Creates a file input field.
 */
sablono.core.file_field52298 = (function sablono$core$file_field52298(var_args){
var args52299 = [];
var len__17325__auto___52366 = arguments.length;
var i__17326__auto___52367 = (0);
while(true){
if((i__17326__auto___52367 < len__17325__auto___52366)){
args52299.push((arguments[i__17326__auto___52367]));

var G__52368 = (i__17326__auto___52367 + (1));
i__17326__auto___52367 = G__52368;
continue;
} else {
}
break;
}

var G__52301 = args52299.length;
switch (G__52301) {
case 1:
return sablono.core.file_field52298.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.file_field52298.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52299.length)].join('')));

}
});

sablono.core.file_field52298.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.file_field52298.call(null,name__22649__auto__,null);
});

sablono.core.file_field52298.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"file","file",370885649,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.file_field52298.cljs$lang$maxFixedArity = 2;

sablono.core.file_field = sablono.core.wrap_attrs.call(null,sablono.core.file_field52298);

/**
 * Creates a hidden input field.
 */
sablono.core.hidden_field52302 = (function sablono$core$hidden_field52302(var_args){
var args52303 = [];
var len__17325__auto___52370 = arguments.length;
var i__17326__auto___52371 = (0);
while(true){
if((i__17326__auto___52371 < len__17325__auto___52370)){
args52303.push((arguments[i__17326__auto___52371]));

var G__52372 = (i__17326__auto___52371 + (1));
i__17326__auto___52371 = G__52372;
continue;
} else {
}
break;
}

var G__52305 = args52303.length;
switch (G__52305) {
case 1:
return sablono.core.hidden_field52302.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.hidden_field52302.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52303.length)].join('')));

}
});

sablono.core.hidden_field52302.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.hidden_field52302.call(null,name__22649__auto__,null);
});

sablono.core.hidden_field52302.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"hidden","hidden",1328025435,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.hidden_field52302.cljs$lang$maxFixedArity = 2;

sablono.core.hidden_field = sablono.core.wrap_attrs.call(null,sablono.core.hidden_field52302);

/**
 * Creates a month input field.
 */
sablono.core.month_field52306 = (function sablono$core$month_field52306(var_args){
var args52307 = [];
var len__17325__auto___52374 = arguments.length;
var i__17326__auto___52375 = (0);
while(true){
if((i__17326__auto___52375 < len__17325__auto___52374)){
args52307.push((arguments[i__17326__auto___52375]));

var G__52376 = (i__17326__auto___52375 + (1));
i__17326__auto___52375 = G__52376;
continue;
} else {
}
break;
}

var G__52309 = args52307.length;
switch (G__52309) {
case 1:
return sablono.core.month_field52306.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.month_field52306.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52307.length)].join('')));

}
});

sablono.core.month_field52306.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.month_field52306.call(null,name__22649__auto__,null);
});

sablono.core.month_field52306.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"month","month",-319717006,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.month_field52306.cljs$lang$maxFixedArity = 2;

sablono.core.month_field = sablono.core.wrap_attrs.call(null,sablono.core.month_field52306);

/**
 * Creates a number input field.
 */
sablono.core.number_field52310 = (function sablono$core$number_field52310(var_args){
var args52311 = [];
var len__17325__auto___52378 = arguments.length;
var i__17326__auto___52379 = (0);
while(true){
if((i__17326__auto___52379 < len__17325__auto___52378)){
args52311.push((arguments[i__17326__auto___52379]));

var G__52380 = (i__17326__auto___52379 + (1));
i__17326__auto___52379 = G__52380;
continue;
} else {
}
break;
}

var G__52313 = args52311.length;
switch (G__52313) {
case 1:
return sablono.core.number_field52310.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.number_field52310.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52311.length)].join('')));

}
});

sablono.core.number_field52310.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.number_field52310.call(null,name__22649__auto__,null);
});

sablono.core.number_field52310.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"number","number",-1084057331,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.number_field52310.cljs$lang$maxFixedArity = 2;

sablono.core.number_field = sablono.core.wrap_attrs.call(null,sablono.core.number_field52310);

/**
 * Creates a password input field.
 */
sablono.core.password_field52314 = (function sablono$core$password_field52314(var_args){
var args52315 = [];
var len__17325__auto___52382 = arguments.length;
var i__17326__auto___52383 = (0);
while(true){
if((i__17326__auto___52383 < len__17325__auto___52382)){
args52315.push((arguments[i__17326__auto___52383]));

var G__52384 = (i__17326__auto___52383 + (1));
i__17326__auto___52383 = G__52384;
continue;
} else {
}
break;
}

var G__52317 = args52315.length;
switch (G__52317) {
case 1:
return sablono.core.password_field52314.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.password_field52314.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52315.length)].join('')));

}
});

sablono.core.password_field52314.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.password_field52314.call(null,name__22649__auto__,null);
});

sablono.core.password_field52314.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"password","password",2057553998,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.password_field52314.cljs$lang$maxFixedArity = 2;

sablono.core.password_field = sablono.core.wrap_attrs.call(null,sablono.core.password_field52314);

/**
 * Creates a range input field.
 */
sablono.core.range_field52318 = (function sablono$core$range_field52318(var_args){
var args52319 = [];
var len__17325__auto___52386 = arguments.length;
var i__17326__auto___52387 = (0);
while(true){
if((i__17326__auto___52387 < len__17325__auto___52386)){
args52319.push((arguments[i__17326__auto___52387]));

var G__52388 = (i__17326__auto___52387 + (1));
i__17326__auto___52387 = G__52388;
continue;
} else {
}
break;
}

var G__52321 = args52319.length;
switch (G__52321) {
case 1:
return sablono.core.range_field52318.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.range_field52318.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52319.length)].join('')));

}
});

sablono.core.range_field52318.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.range_field52318.call(null,name__22649__auto__,null);
});

sablono.core.range_field52318.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"range","range",-1014743483,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.range_field52318.cljs$lang$maxFixedArity = 2;

sablono.core.range_field = sablono.core.wrap_attrs.call(null,sablono.core.range_field52318);

/**
 * Creates a search input field.
 */
sablono.core.search_field52322 = (function sablono$core$search_field52322(var_args){
var args52323 = [];
var len__17325__auto___52390 = arguments.length;
var i__17326__auto___52391 = (0);
while(true){
if((i__17326__auto___52391 < len__17325__auto___52390)){
args52323.push((arguments[i__17326__auto___52391]));

var G__52392 = (i__17326__auto___52391 + (1));
i__17326__auto___52391 = G__52392;
continue;
} else {
}
break;
}

var G__52325 = args52323.length;
switch (G__52325) {
case 1:
return sablono.core.search_field52322.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.search_field52322.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52323.length)].join('')));

}
});

sablono.core.search_field52322.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.search_field52322.call(null,name__22649__auto__,null);
});

sablono.core.search_field52322.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"search","search",-1089495947,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.search_field52322.cljs$lang$maxFixedArity = 2;

sablono.core.search_field = sablono.core.wrap_attrs.call(null,sablono.core.search_field52322);

/**
 * Creates a tel input field.
 */
sablono.core.tel_field52326 = (function sablono$core$tel_field52326(var_args){
var args52327 = [];
var len__17325__auto___52394 = arguments.length;
var i__17326__auto___52395 = (0);
while(true){
if((i__17326__auto___52395 < len__17325__auto___52394)){
args52327.push((arguments[i__17326__auto___52395]));

var G__52396 = (i__17326__auto___52395 + (1));
i__17326__auto___52395 = G__52396;
continue;
} else {
}
break;
}

var G__52329 = args52327.length;
switch (G__52329) {
case 1:
return sablono.core.tel_field52326.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.tel_field52326.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52327.length)].join('')));

}
});

sablono.core.tel_field52326.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.tel_field52326.call(null,name__22649__auto__,null);
});

sablono.core.tel_field52326.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"tel","tel",1864669686,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.tel_field52326.cljs$lang$maxFixedArity = 2;

sablono.core.tel_field = sablono.core.wrap_attrs.call(null,sablono.core.tel_field52326);

/**
 * Creates a text input field.
 */
sablono.core.text_field52330 = (function sablono$core$text_field52330(var_args){
var args52331 = [];
var len__17325__auto___52398 = arguments.length;
var i__17326__auto___52399 = (0);
while(true){
if((i__17326__auto___52399 < len__17325__auto___52398)){
args52331.push((arguments[i__17326__auto___52399]));

var G__52400 = (i__17326__auto___52399 + (1));
i__17326__auto___52399 = G__52400;
continue;
} else {
}
break;
}

var G__52333 = args52331.length;
switch (G__52333) {
case 1:
return sablono.core.text_field52330.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.text_field52330.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52331.length)].join('')));

}
});

sablono.core.text_field52330.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.text_field52330.call(null,name__22649__auto__,null);
});

sablono.core.text_field52330.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"text","text",-150030170,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.text_field52330.cljs$lang$maxFixedArity = 2;

sablono.core.text_field = sablono.core.wrap_attrs.call(null,sablono.core.text_field52330);

/**
 * Creates a time input field.
 */
sablono.core.time_field52334 = (function sablono$core$time_field52334(var_args){
var args52335 = [];
var len__17325__auto___52402 = arguments.length;
var i__17326__auto___52403 = (0);
while(true){
if((i__17326__auto___52403 < len__17325__auto___52402)){
args52335.push((arguments[i__17326__auto___52403]));

var G__52404 = (i__17326__auto___52403 + (1));
i__17326__auto___52403 = G__52404;
continue;
} else {
}
break;
}

var G__52337 = args52335.length;
switch (G__52337) {
case 1:
return sablono.core.time_field52334.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.time_field52334.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52335.length)].join('')));

}
});

sablono.core.time_field52334.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.time_field52334.call(null,name__22649__auto__,null);
});

sablono.core.time_field52334.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"time","time",-1268547887,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.time_field52334.cljs$lang$maxFixedArity = 2;

sablono.core.time_field = sablono.core.wrap_attrs.call(null,sablono.core.time_field52334);

/**
 * Creates a url input field.
 */
sablono.core.url_field52338 = (function sablono$core$url_field52338(var_args){
var args52339 = [];
var len__17325__auto___52406 = arguments.length;
var i__17326__auto___52407 = (0);
while(true){
if((i__17326__auto___52407 < len__17325__auto___52406)){
args52339.push((arguments[i__17326__auto___52407]));

var G__52408 = (i__17326__auto___52407 + (1));
i__17326__auto___52407 = G__52408;
continue;
} else {
}
break;
}

var G__52341 = args52339.length;
switch (G__52341) {
case 1:
return sablono.core.url_field52338.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.url_field52338.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52339.length)].join('')));

}
});

sablono.core.url_field52338.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.url_field52338.call(null,name__22649__auto__,null);
});

sablono.core.url_field52338.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"url","url",1916828573,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.url_field52338.cljs$lang$maxFixedArity = 2;

sablono.core.url_field = sablono.core.wrap_attrs.call(null,sablono.core.url_field52338);

/**
 * Creates a week input field.
 */
sablono.core.week_field52342 = (function sablono$core$week_field52342(var_args){
var args52343 = [];
var len__17325__auto___52410 = arguments.length;
var i__17326__auto___52411 = (0);
while(true){
if((i__17326__auto___52411 < len__17325__auto___52410)){
args52343.push((arguments[i__17326__auto___52411]));

var G__52412 = (i__17326__auto___52411 + (1));
i__17326__auto___52411 = G__52412;
continue;
} else {
}
break;
}

var G__52345 = args52343.length;
switch (G__52345) {
case 1:
return sablono.core.week_field52342.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.week_field52342.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52343.length)].join('')));

}
});

sablono.core.week_field52342.cljs$core$IFn$_invoke$arity$1 = (function (name__22649__auto__){
return sablono.core.week_field52342.call(null,name__22649__auto__,null);
});

sablono.core.week_field52342.cljs$core$IFn$_invoke$arity$2 = (function (name__22649__auto__,value__22650__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"week","week",314058249,null))].join(''),name__22649__auto__,value__22650__auto__);
});

sablono.core.week_field52342.cljs$lang$maxFixedArity = 2;

sablono.core.week_field = sablono.core.wrap_attrs.call(null,sablono.core.week_field52342);
sablono.core.file_upload = sablono.core.file_field;
/**
 * Creates a check box.
 */
sablono.core.check_box52414 = (function sablono$core$check_box52414(var_args){
var args52415 = [];
var len__17325__auto___52418 = arguments.length;
var i__17326__auto___52419 = (0);
while(true){
if((i__17326__auto___52419 < len__17325__auto___52418)){
args52415.push((arguments[i__17326__auto___52419]));

var G__52420 = (i__17326__auto___52419 + (1));
i__17326__auto___52419 = G__52420;
continue;
} else {
}
break;
}

var G__52417 = args52415.length;
switch (G__52417) {
case 1:
return sablono.core.check_box52414.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.check_box52414.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return sablono.core.check_box52414.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52415.length)].join('')));

}
});

sablono.core.check_box52414.cljs$core$IFn$_invoke$arity$1 = (function (name){
return sablono.core.check_box52414.call(null,name,null);
});

sablono.core.check_box52414.cljs$core$IFn$_invoke$arity$2 = (function (name,checked_QMARK_){
return sablono.core.check_box52414.call(null,name,checked_QMARK_,"true");
});

sablono.core.check_box52414.cljs$core$IFn$_invoke$arity$3 = (function (name,checked_QMARK_,value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"checkbox",new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"checked","checked",-50955819),checked_QMARK_], null)], null);
});

sablono.core.check_box52414.cljs$lang$maxFixedArity = 3;

sablono.core.check_box = sablono.core.wrap_attrs.call(null,sablono.core.check_box52414);
/**
 * Creates a radio button.
 */
sablono.core.radio_button52422 = (function sablono$core$radio_button52422(var_args){
var args52423 = [];
var len__17325__auto___52426 = arguments.length;
var i__17326__auto___52427 = (0);
while(true){
if((i__17326__auto___52427 < len__17325__auto___52426)){
args52423.push((arguments[i__17326__auto___52427]));

var G__52428 = (i__17326__auto___52427 + (1));
i__17326__auto___52427 = G__52428;
continue;
} else {
}
break;
}

var G__52425 = args52423.length;
switch (G__52425) {
case 1:
return sablono.core.radio_button52422.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.radio_button52422.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return sablono.core.radio_button52422.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52423.length)].join('')));

}
});

sablono.core.radio_button52422.cljs$core$IFn$_invoke$arity$1 = (function (group){
return sablono.core.radio_button52422.call(null,group,null);
});

sablono.core.radio_button52422.cljs$core$IFn$_invoke$arity$2 = (function (group,checked_QMARK_){
return sablono.core.radio_button52422.call(null,group,checked_QMARK_,"true");
});

sablono.core.radio_button52422.cljs$core$IFn$_invoke$arity$3 = (function (group,checked_QMARK_,value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"radio",new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,group),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,[cljs.core.str(sablono.util.as_str.call(null,group)),cljs.core.str("-"),cljs.core.str(sablono.util.as_str.call(null,value))].join('')),new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"checked","checked",-50955819),checked_QMARK_], null)], null);
});

sablono.core.radio_button52422.cljs$lang$maxFixedArity = 3;

sablono.core.radio_button = sablono.core.wrap_attrs.call(null,sablono.core.radio_button52422);
sablono.core.hash_key = (function sablono$core$hash_key(x){
return goog.string.hashCode(cljs.core.pr_str.call(null,x));
});
/**
 * Creates a seq of option tags from a collection.
 */
sablono.core.select_options52430 = (function sablono$core$select_options52430(coll){
var iter__17039__auto__ = (function sablono$core$select_options52430_$_iter__52439(s__52440){
return (new cljs.core.LazySeq(null,(function (){
var s__52440__$1 = s__52440;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__52440__$1);
if(temp__4425__auto__){
var s__52440__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__52440__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__52440__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__52442 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__52441 = (0);
while(true){
if((i__52441 < size__17038__auto__)){
var x = cljs.core._nth.call(null,c__17037__auto__,i__52441);
cljs.core.chunk_append.call(null,b__52442,((cljs.core.sequential_QMARK_.call(null,x))?(function (){var vec__52445 = x;
var text = cljs.core.nth.call(null,vec__52445,(0),null);
var val = cljs.core.nth.call(null,vec__52445,(1),null);
var disabled_QMARK_ = cljs.core.nth.call(null,vec__52445,(2),null);
var disabled_QMARK___$1 = cljs.core.boolean$.call(null,disabled_QMARK_);
if(cljs.core.sequential_QMARK_.call(null,val)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",1738282218),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,text),new cljs.core.Keyword(null,"label","label",1718410804),text], null),sablono$core$select_options52430.call(null,val)], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),disabled_QMARK___$1,new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,val),new cljs.core.Keyword(null,"value","value",305978217),val], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,x),new cljs.core.Keyword(null,"value","value",305978217),x], null),x], null)));

var G__52447 = (i__52441 + (1));
i__52441 = G__52447;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__52442),sablono$core$select_options52430_$_iter__52439.call(null,cljs.core.chunk_rest.call(null,s__52440__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__52442),null);
}
} else {
var x = cljs.core.first.call(null,s__52440__$2);
return cljs.core.cons.call(null,((cljs.core.sequential_QMARK_.call(null,x))?(function (){var vec__52446 = x;
var text = cljs.core.nth.call(null,vec__52446,(0),null);
var val = cljs.core.nth.call(null,vec__52446,(1),null);
var disabled_QMARK_ = cljs.core.nth.call(null,vec__52446,(2),null);
var disabled_QMARK___$1 = cljs.core.boolean$.call(null,disabled_QMARK_);
if(cljs.core.sequential_QMARK_.call(null,val)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",1738282218),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,text),new cljs.core.Keyword(null,"label","label",1718410804),text], null),sablono$core$select_options52430.call(null,val)], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),disabled_QMARK___$1,new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,val),new cljs.core.Keyword(null,"value","value",305978217),val], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,x),new cljs.core.Keyword(null,"value","value",305978217),x], null),x], null)),sablono$core$select_options52430_$_iter__52439.call(null,cljs.core.rest.call(null,s__52440__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__17039__auto__.call(null,coll);
});

sablono.core.select_options = sablono.core.wrap_attrs.call(null,sablono.core.select_options52430);
/**
 * Creates a drop-down box using the <select> tag.
 */
sablono.core.drop_down52448 = (function sablono$core$drop_down52448(var_args){
var args52449 = [];
var len__17325__auto___52452 = arguments.length;
var i__17326__auto___52453 = (0);
while(true){
if((i__17326__auto___52453 < len__17325__auto___52452)){
args52449.push((arguments[i__17326__auto___52453]));

var G__52454 = (i__17326__auto___52453 + (1));
i__17326__auto___52453 = G__52454;
continue;
} else {
}
break;
}

var G__52451 = args52449.length;
switch (G__52451) {
case 2:
return sablono.core.drop_down52448.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return sablono.core.drop_down52448.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52449.length)].join('')));

}
});

sablono.core.drop_down52448.cljs$core$IFn$_invoke$arity$2 = (function (name,options){
return sablono.core.drop_down52448.call(null,name,options,null);
});

sablono.core.drop_down52448.cljs$core$IFn$_invoke$arity$3 = (function (name,options,selected){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name)], null),sablono.core.select_options.call(null,options,selected)], null);
});

sablono.core.drop_down52448.cljs$lang$maxFixedArity = 3;

sablono.core.drop_down = sablono.core.wrap_attrs.call(null,sablono.core.drop_down52448);
/**
 * Creates a text area element.
 */
sablono.core.text_area52456 = (function sablono$core$text_area52456(var_args){
var args52457 = [];
var len__17325__auto___52460 = arguments.length;
var i__17326__auto___52461 = (0);
while(true){
if((i__17326__auto___52461 < len__17325__auto___52460)){
args52457.push((arguments[i__17326__auto___52461]));

var G__52462 = (i__17326__auto___52461 + (1));
i__17326__auto___52461 = G__52462;
continue;
} else {
}
break;
}

var G__52459 = args52457.length;
switch (G__52459) {
case 1:
return sablono.core.text_area52456.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.text_area52456.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args52457.length)].join('')));

}
});

sablono.core.text_area52456.cljs$core$IFn$_invoke$arity$1 = (function (name){
return sablono.core.text_area52456.call(null,name,null);
});

sablono.core.text_area52456.cljs$core$IFn$_invoke$arity$2 = (function (name,value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea","textarea",-650375824),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",305978217),value], null)], null);
});

sablono.core.text_area52456.cljs$lang$maxFixedArity = 2;

sablono.core.text_area = sablono.core.wrap_attrs.call(null,sablono.core.text_area52456);
/**
 * Creates a label for an input field with the supplied name.
 */
sablono.core.label52464 = (function sablono$core$label52464(name,text){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"htmlFor","htmlFor",-1050291720),sablono.core.make_id.call(null,name)], null),text], null);
});

sablono.core.label = sablono.core.wrap_attrs.call(null,sablono.core.label52464);
/**
 * Creates a submit button.
 */
sablono.core.submit_button52465 = (function sablono$core$submit_button52465(text){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"submit",new cljs.core.Keyword(null,"value","value",305978217),text], null)], null);
});

sablono.core.submit_button = sablono.core.wrap_attrs.call(null,sablono.core.submit_button52465);
/**
 * Creates a form reset button.
 */
sablono.core.reset_button52466 = (function sablono$core$reset_button52466(text){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"reset",new cljs.core.Keyword(null,"value","value",305978217),text], null)], null);
});

sablono.core.reset_button = sablono.core.wrap_attrs.call(null,sablono.core.reset_button52466);
/**
 * Create a form that points to a particular method and route.
 *   e.g. (form-to [:put "/post"]
 *       ...)
 */
sablono.core.form_to52467 = (function sablono$core$form_to52467(var_args){
var args__17332__auto__ = [];
var len__17325__auto___52472 = arguments.length;
var i__17326__auto___52473 = (0);
while(true){
if((i__17326__auto___52473 < len__17325__auto___52472)){
args__17332__auto__.push((arguments[i__17326__auto___52473]));

var G__52474 = (i__17326__auto___52473 + (1));
i__17326__auto___52473 = G__52474;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return sablono.core.form_to52467.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

sablono.core.form_to52467.cljs$core$IFn$_invoke$arity$variadic = (function (p__52470,body){
var vec__52471 = p__52470;
var method = cljs.core.nth.call(null,vec__52471,(0),null);
var action = cljs.core.nth.call(null,vec__52471,(1),null);
var method_str = clojure.string.upper_case.call(null,cljs.core.name.call(null,method));
var action_uri = sablono.util.to_uri.call(null,action);
return cljs.core.vec.call(null,cljs.core.concat.call(null,((cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"get","get",1683182755),null,new cljs.core.Keyword(null,"post","post",269697687),null], null), null),method))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),method_str,new cljs.core.Keyword(null,"action","action",-811238024),action_uri], null)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),"POST",new cljs.core.Keyword(null,"action","action",-811238024),action_uri], null),sablono.core.hidden_field.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(3735928559)], null),"_method",method_str)], null)),body));
});

sablono.core.form_to52467.cljs$lang$maxFixedArity = (1);

sablono.core.form_to52467.cljs$lang$applyTo = (function (seq52468){
var G__52469 = cljs.core.first.call(null,seq52468);
var seq52468__$1 = cljs.core.next.call(null,seq52468);
return sablono.core.form_to52467.cljs$core$IFn$_invoke$arity$variadic(G__52469,seq52468__$1);
});

sablono.core.form_to = sablono.core.wrap_attrs.call(null,sablono.core.form_to52467);

//# sourceMappingURL=core.js.map?rel=1445965106177