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
var G__42953__delegate = function (args){
if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,args))){
var vec__42952 = cljs.core.apply.call(null,func,cljs.core.rest.call(null,args));
var tag = cljs.core.nth.call(null,vec__42952,(0),null);
var body = cljs.core.nthnext.call(null,vec__42952,(1));
if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,body))){
return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.merge.call(null,cljs.core.first.call(null,body),cljs.core.first.call(null,args)),cljs.core.rest.call(null,body));
} else {
return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.first.call(null,args),body);
}
} else {
return cljs.core.apply.call(null,func,args);
}
};
var G__42953 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__42954__i = 0, G__42954__a = new Array(arguments.length -  0);
while (G__42954__i < G__42954__a.length) {G__42954__a[G__42954__i] = arguments[G__42954__i + 0]; ++G__42954__i;}
  args = new cljs.core.IndexedSeq(G__42954__a,0);
} 
return G__42953__delegate.call(this,args);};
G__42953.cljs$lang$maxFixedArity = 0;
G__42953.cljs$lang$applyTo = (function (arglist__42955){
var args = cljs.core.seq(arglist__42955);
return G__42953__delegate(args);
});
G__42953.cljs$core$IFn$_invoke$arity$variadic = G__42953__delegate;
return G__42953;
})()
;
});
sablono.core.update_arglists = (function sablono$core$update_arglists(arglists){
var iter__17039__auto__ = (function sablono$core$update_arglists_$_iter__42960(s__42961){
return (new cljs.core.LazySeq(null,(function (){
var s__42961__$1 = s__42961;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__42961__$1);
if(temp__4425__auto__){
var s__42961__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__42961__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__42961__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__42963 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__42962 = (0);
while(true){
if((i__42962 < size__17038__auto__)){
var args = cljs.core._nth.call(null,c__17037__auto__,i__42962);
cljs.core.chunk_append.call(null,b__42963,cljs.core.vec.call(null,cljs.core.cons.call(null,new cljs.core.Symbol(null,"attr-map?","attr-map?",116307443,null),args)));

var G__42964 = (i__42962 + (1));
i__42962 = G__42964;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__42963),sablono$core$update_arglists_$_iter__42960.call(null,cljs.core.chunk_rest.call(null,s__42961__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__42963),null);
}
} else {
var args = cljs.core.first.call(null,s__42961__$2);
return cljs.core.cons.call(null,cljs.core.vec.call(null,cljs.core.cons.call(null,new cljs.core.Symbol(null,"attr-map?","attr-map?",116307443,null),args)),sablono$core$update_arglists_$_iter__42960.call(null,cljs.core.rest.call(null,s__42961__$2)));
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
var len__17325__auto___42970 = arguments.length;
var i__17326__auto___42971 = (0);
while(true){
if((i__17326__auto___42971 < len__17325__auto___42970)){
args__17332__auto__.push((arguments[i__17326__auto___42971]));

var G__42972 = (i__17326__auto___42971 + (1));
i__17326__auto___42971 = G__42972;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((0) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((0)),(0))):null);
return sablono.core.include_css.cljs$core$IFn$_invoke$arity$variadic(argseq__17333__auto__);
});

sablono.core.include_css.cljs$core$IFn$_invoke$arity$variadic = (function (styles){
var iter__17039__auto__ = (function sablono$core$iter__42966(s__42967){
return (new cljs.core.LazySeq(null,(function (){
var s__42967__$1 = s__42967;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__42967__$1);
if(temp__4425__auto__){
var s__42967__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__42967__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__42967__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__42969 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__42968 = (0);
while(true){
if((i__42968 < size__17038__auto__)){
var style = cljs.core._nth.call(null,c__17037__auto__,i__42968);
cljs.core.chunk_append.call(null,b__42969,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",-1769163468),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text/css",new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,style),new cljs.core.Keyword(null,"rel","rel",1378823488),"stylesheet"], null)], null));

var G__42973 = (i__42968 + (1));
i__42968 = G__42973;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__42969),sablono$core$iter__42966.call(null,cljs.core.chunk_rest.call(null,s__42967__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__42969),null);
}
} else {
var style = cljs.core.first.call(null,s__42967__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",-1769163468),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text/css",new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,style),new cljs.core.Keyword(null,"rel","rel",1378823488),"stylesheet"], null)], null),sablono$core$iter__42966.call(null,cljs.core.rest.call(null,s__42967__$2)));
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

sablono.core.include_css.cljs$lang$applyTo = (function (seq42965){
return sablono.core.include_css.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq42965));
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
sablono.core.link_to42974 = (function sablono$core$link_to42974(var_args){
var args__17332__auto__ = [];
var len__17325__auto___42977 = arguments.length;
var i__17326__auto___42978 = (0);
while(true){
if((i__17326__auto___42978 < len__17325__auto___42977)){
args__17332__auto__.push((arguments[i__17326__auto___42978]));

var G__42979 = (i__17326__auto___42978 + (1));
i__17326__auto___42978 = G__42979;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return sablono.core.link_to42974.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

sablono.core.link_to42974.cljs$core$IFn$_invoke$arity$variadic = (function (url,content){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,url)], null),content], null);
});

sablono.core.link_to42974.cljs$lang$maxFixedArity = (1);

sablono.core.link_to42974.cljs$lang$applyTo = (function (seq42975){
var G__42976 = cljs.core.first.call(null,seq42975);
var seq42975__$1 = cljs.core.next.call(null,seq42975);
return sablono.core.link_to42974.cljs$core$IFn$_invoke$arity$variadic(G__42976,seq42975__$1);
});

sablono.core.link_to = sablono.core.wrap_attrs.call(null,sablono.core.link_to42974);
/**
 * Wraps some content in a HTML hyperlink with the supplied e-mail
 *   address. If no content provided use the e-mail address as content.
 */
sablono.core.mail_to42980 = (function sablono$core$mail_to42980(var_args){
var args__17332__auto__ = [];
var len__17325__auto___42985 = arguments.length;
var i__17326__auto___42986 = (0);
while(true){
if((i__17326__auto___42986 < len__17325__auto___42985)){
args__17332__auto__.push((arguments[i__17326__auto___42986]));

var G__42987 = (i__17326__auto___42986 + (1));
i__17326__auto___42986 = G__42987;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return sablono.core.mail_to42980.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

sablono.core.mail_to42980.cljs$core$IFn$_invoke$arity$variadic = (function (e_mail,p__42983){
var vec__42984 = p__42983;
var content = cljs.core.nth.call(null,vec__42984,(0),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),[cljs.core.str("mailto:"),cljs.core.str(e_mail)].join('')], null),(function (){var or__16267__auto__ = content;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return e_mail;
}
})()], null);
});

sablono.core.mail_to42980.cljs$lang$maxFixedArity = (1);

sablono.core.mail_to42980.cljs$lang$applyTo = (function (seq42981){
var G__42982 = cljs.core.first.call(null,seq42981);
var seq42981__$1 = cljs.core.next.call(null,seq42981);
return sablono.core.mail_to42980.cljs$core$IFn$_invoke$arity$variadic(G__42982,seq42981__$1);
});

sablono.core.mail_to = sablono.core.wrap_attrs.call(null,sablono.core.mail_to42980);
/**
 * Wrap a collection in an unordered list.
 */
sablono.core.unordered_list42988 = (function sablono$core$unordered_list42988(coll){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__17039__auto__ = (function sablono$core$unordered_list42988_$_iter__42993(s__42994){
return (new cljs.core.LazySeq(null,(function (){
var s__42994__$1 = s__42994;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__42994__$1);
if(temp__4425__auto__){
var s__42994__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__42994__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__42994__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__42996 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__42995 = (0);
while(true){
if((i__42995 < size__17038__auto__)){
var x = cljs.core._nth.call(null,c__17037__auto__,i__42995);
cljs.core.chunk_append.call(null,b__42996,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null));

var G__42997 = (i__42995 + (1));
i__42995 = G__42997;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__42996),sablono$core$unordered_list42988_$_iter__42993.call(null,cljs.core.chunk_rest.call(null,s__42994__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__42996),null);
}
} else {
var x = cljs.core.first.call(null,s__42994__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null),sablono$core$unordered_list42988_$_iter__42993.call(null,cljs.core.rest.call(null,s__42994__$2)));
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

sablono.core.unordered_list = sablono.core.wrap_attrs.call(null,sablono.core.unordered_list42988);
/**
 * Wrap a collection in an ordered list.
 */
sablono.core.ordered_list42998 = (function sablono$core$ordered_list42998(coll){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ol","ol",932524051),(function (){var iter__17039__auto__ = (function sablono$core$ordered_list42998_$_iter__43003(s__43004){
return (new cljs.core.LazySeq(null,(function (){
var s__43004__$1 = s__43004;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__43004__$1);
if(temp__4425__auto__){
var s__43004__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__43004__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__43004__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__43006 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__43005 = (0);
while(true){
if((i__43005 < size__17038__auto__)){
var x = cljs.core._nth.call(null,c__17037__auto__,i__43005);
cljs.core.chunk_append.call(null,b__43006,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null));

var G__43007 = (i__43005 + (1));
i__43005 = G__43007;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__43006),sablono$core$ordered_list42998_$_iter__43003.call(null,cljs.core.chunk_rest.call(null,s__43004__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__43006),null);
}
} else {
var x = cljs.core.first.call(null,s__43004__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null),sablono$core$ordered_list42998_$_iter__43003.call(null,cljs.core.rest.call(null,s__43004__$2)));
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

sablono.core.ordered_list = sablono.core.wrap_attrs.call(null,sablono.core.ordered_list42998);
/**
 * Create an image element.
 */
sablono.core.image43008 = (function sablono$core$image43008(var_args){
var args43009 = [];
var len__17325__auto___43012 = arguments.length;
var i__17326__auto___43013 = (0);
while(true){
if((i__17326__auto___43013 < len__17325__auto___43012)){
args43009.push((arguments[i__17326__auto___43013]));

var G__43014 = (i__17326__auto___43013 + (1));
i__17326__auto___43013 = G__43014;
continue;
} else {
}
break;
}

var G__43011 = args43009.length;
switch (G__43011) {
case 1:
return sablono.core.image43008.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.image43008.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43009.length)].join('')));

}
});

sablono.core.image43008.cljs$core$IFn$_invoke$arity$1 = (function (src){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),sablono.util.as_str.call(null,src)], null)], null);
});

sablono.core.image43008.cljs$core$IFn$_invoke$arity$2 = (function (src,alt){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),sablono.util.as_str.call(null,src),new cljs.core.Keyword(null,"alt","alt",-3214426),alt], null)], null);
});

sablono.core.image43008.cljs$lang$maxFixedArity = 2;

sablono.core.image = sablono.core.wrap_attrs.call(null,sablono.core.image43008);
sablono.core._STAR_group_STAR_ = cljs.core.PersistentVector.EMPTY;
/**
 * Create a field name from the supplied argument the current field group.
 */
sablono.core.make_name = (function sablono$core$make_name(name){
return cljs.core.reduce.call(null,(function (p1__43016_SHARP_,p2__43017_SHARP_){
return [cljs.core.str(p1__43016_SHARP_),cljs.core.str("["),cljs.core.str(p2__43017_SHARP_),cljs.core.str("]")].join('');
}),cljs.core.conj.call(null,sablono.core._STAR_group_STAR_,sablono.util.as_str.call(null,name)));
});
/**
 * Create a field id from the supplied argument and current field group.
 */
sablono.core.make_id = (function sablono$core$make_id(name){
return cljs.core.reduce.call(null,(function (p1__43018_SHARP_,p2__43019_SHARP_){
return [cljs.core.str(p1__43018_SHARP_),cljs.core.str("-"),cljs.core.str(p2__43019_SHARP_)].join('');
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
sablono.core.color_field43020 = (function sablono$core$color_field43020(var_args){
var args43021 = [];
var len__17325__auto___43088 = arguments.length;
var i__17326__auto___43089 = (0);
while(true){
if((i__17326__auto___43089 < len__17325__auto___43088)){
args43021.push((arguments[i__17326__auto___43089]));

var G__43090 = (i__17326__auto___43089 + (1));
i__17326__auto___43089 = G__43090;
continue;
} else {
}
break;
}

var G__43023 = args43021.length;
switch (G__43023) {
case 1:
return sablono.core.color_field43020.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.color_field43020.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43021.length)].join('')));

}
});

sablono.core.color_field43020.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.color_field43020.call(null,name__22620__auto__,null);
});

sablono.core.color_field43020.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"color","color",-1642760596,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.color_field43020.cljs$lang$maxFixedArity = 2;

sablono.core.color_field = sablono.core.wrap_attrs.call(null,sablono.core.color_field43020);

/**
 * Creates a date input field.
 */
sablono.core.date_field43024 = (function sablono$core$date_field43024(var_args){
var args43025 = [];
var len__17325__auto___43092 = arguments.length;
var i__17326__auto___43093 = (0);
while(true){
if((i__17326__auto___43093 < len__17325__auto___43092)){
args43025.push((arguments[i__17326__auto___43093]));

var G__43094 = (i__17326__auto___43093 + (1));
i__17326__auto___43093 = G__43094;
continue;
} else {
}
break;
}

var G__43027 = args43025.length;
switch (G__43027) {
case 1:
return sablono.core.date_field43024.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.date_field43024.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43025.length)].join('')));

}
});

sablono.core.date_field43024.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.date_field43024.call(null,name__22620__auto__,null);
});

sablono.core.date_field43024.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"date","date",177097065,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.date_field43024.cljs$lang$maxFixedArity = 2;

sablono.core.date_field = sablono.core.wrap_attrs.call(null,sablono.core.date_field43024);

/**
 * Creates a datetime input field.
 */
sablono.core.datetime_field43028 = (function sablono$core$datetime_field43028(var_args){
var args43029 = [];
var len__17325__auto___43096 = arguments.length;
var i__17326__auto___43097 = (0);
while(true){
if((i__17326__auto___43097 < len__17325__auto___43096)){
args43029.push((arguments[i__17326__auto___43097]));

var G__43098 = (i__17326__auto___43097 + (1));
i__17326__auto___43097 = G__43098;
continue;
} else {
}
break;
}

var G__43031 = args43029.length;
switch (G__43031) {
case 1:
return sablono.core.datetime_field43028.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.datetime_field43028.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43029.length)].join('')));

}
});

sablono.core.datetime_field43028.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.datetime_field43028.call(null,name__22620__auto__,null);
});

sablono.core.datetime_field43028.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"datetime","datetime",2135207229,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.datetime_field43028.cljs$lang$maxFixedArity = 2;

sablono.core.datetime_field = sablono.core.wrap_attrs.call(null,sablono.core.datetime_field43028);

/**
 * Creates a datetime-local input field.
 */
sablono.core.datetime_local_field43032 = (function sablono$core$datetime_local_field43032(var_args){
var args43033 = [];
var len__17325__auto___43100 = arguments.length;
var i__17326__auto___43101 = (0);
while(true){
if((i__17326__auto___43101 < len__17325__auto___43100)){
args43033.push((arguments[i__17326__auto___43101]));

var G__43102 = (i__17326__auto___43101 + (1));
i__17326__auto___43101 = G__43102;
continue;
} else {
}
break;
}

var G__43035 = args43033.length;
switch (G__43035) {
case 1:
return sablono.core.datetime_local_field43032.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.datetime_local_field43032.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43033.length)].join('')));

}
});

sablono.core.datetime_local_field43032.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.datetime_local_field43032.call(null,name__22620__auto__,null);
});

sablono.core.datetime_local_field43032.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"datetime-local","datetime-local",-507312697,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.datetime_local_field43032.cljs$lang$maxFixedArity = 2;

sablono.core.datetime_local_field = sablono.core.wrap_attrs.call(null,sablono.core.datetime_local_field43032);

/**
 * Creates a email input field.
 */
sablono.core.email_field43036 = (function sablono$core$email_field43036(var_args){
var args43037 = [];
var len__17325__auto___43104 = arguments.length;
var i__17326__auto___43105 = (0);
while(true){
if((i__17326__auto___43105 < len__17325__auto___43104)){
args43037.push((arguments[i__17326__auto___43105]));

var G__43106 = (i__17326__auto___43105 + (1));
i__17326__auto___43105 = G__43106;
continue;
} else {
}
break;
}

var G__43039 = args43037.length;
switch (G__43039) {
case 1:
return sablono.core.email_field43036.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.email_field43036.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43037.length)].join('')));

}
});

sablono.core.email_field43036.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.email_field43036.call(null,name__22620__auto__,null);
});

sablono.core.email_field43036.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"email","email",-1238619063,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.email_field43036.cljs$lang$maxFixedArity = 2;

sablono.core.email_field = sablono.core.wrap_attrs.call(null,sablono.core.email_field43036);

/**
 * Creates a file input field.
 */
sablono.core.file_field43040 = (function sablono$core$file_field43040(var_args){
var args43041 = [];
var len__17325__auto___43108 = arguments.length;
var i__17326__auto___43109 = (0);
while(true){
if((i__17326__auto___43109 < len__17325__auto___43108)){
args43041.push((arguments[i__17326__auto___43109]));

var G__43110 = (i__17326__auto___43109 + (1));
i__17326__auto___43109 = G__43110;
continue;
} else {
}
break;
}

var G__43043 = args43041.length;
switch (G__43043) {
case 1:
return sablono.core.file_field43040.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.file_field43040.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43041.length)].join('')));

}
});

sablono.core.file_field43040.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.file_field43040.call(null,name__22620__auto__,null);
});

sablono.core.file_field43040.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"file","file",370885649,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.file_field43040.cljs$lang$maxFixedArity = 2;

sablono.core.file_field = sablono.core.wrap_attrs.call(null,sablono.core.file_field43040);

/**
 * Creates a hidden input field.
 */
sablono.core.hidden_field43044 = (function sablono$core$hidden_field43044(var_args){
var args43045 = [];
var len__17325__auto___43112 = arguments.length;
var i__17326__auto___43113 = (0);
while(true){
if((i__17326__auto___43113 < len__17325__auto___43112)){
args43045.push((arguments[i__17326__auto___43113]));

var G__43114 = (i__17326__auto___43113 + (1));
i__17326__auto___43113 = G__43114;
continue;
} else {
}
break;
}

var G__43047 = args43045.length;
switch (G__43047) {
case 1:
return sablono.core.hidden_field43044.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.hidden_field43044.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43045.length)].join('')));

}
});

sablono.core.hidden_field43044.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.hidden_field43044.call(null,name__22620__auto__,null);
});

sablono.core.hidden_field43044.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"hidden","hidden",1328025435,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.hidden_field43044.cljs$lang$maxFixedArity = 2;

sablono.core.hidden_field = sablono.core.wrap_attrs.call(null,sablono.core.hidden_field43044);

/**
 * Creates a month input field.
 */
sablono.core.month_field43048 = (function sablono$core$month_field43048(var_args){
var args43049 = [];
var len__17325__auto___43116 = arguments.length;
var i__17326__auto___43117 = (0);
while(true){
if((i__17326__auto___43117 < len__17325__auto___43116)){
args43049.push((arguments[i__17326__auto___43117]));

var G__43118 = (i__17326__auto___43117 + (1));
i__17326__auto___43117 = G__43118;
continue;
} else {
}
break;
}

var G__43051 = args43049.length;
switch (G__43051) {
case 1:
return sablono.core.month_field43048.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.month_field43048.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43049.length)].join('')));

}
});

sablono.core.month_field43048.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.month_field43048.call(null,name__22620__auto__,null);
});

sablono.core.month_field43048.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"month","month",-319717006,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.month_field43048.cljs$lang$maxFixedArity = 2;

sablono.core.month_field = sablono.core.wrap_attrs.call(null,sablono.core.month_field43048);

/**
 * Creates a number input field.
 */
sablono.core.number_field43052 = (function sablono$core$number_field43052(var_args){
var args43053 = [];
var len__17325__auto___43120 = arguments.length;
var i__17326__auto___43121 = (0);
while(true){
if((i__17326__auto___43121 < len__17325__auto___43120)){
args43053.push((arguments[i__17326__auto___43121]));

var G__43122 = (i__17326__auto___43121 + (1));
i__17326__auto___43121 = G__43122;
continue;
} else {
}
break;
}

var G__43055 = args43053.length;
switch (G__43055) {
case 1:
return sablono.core.number_field43052.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.number_field43052.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43053.length)].join('')));

}
});

sablono.core.number_field43052.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.number_field43052.call(null,name__22620__auto__,null);
});

sablono.core.number_field43052.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"number","number",-1084057331,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.number_field43052.cljs$lang$maxFixedArity = 2;

sablono.core.number_field = sablono.core.wrap_attrs.call(null,sablono.core.number_field43052);

/**
 * Creates a password input field.
 */
sablono.core.password_field43056 = (function sablono$core$password_field43056(var_args){
var args43057 = [];
var len__17325__auto___43124 = arguments.length;
var i__17326__auto___43125 = (0);
while(true){
if((i__17326__auto___43125 < len__17325__auto___43124)){
args43057.push((arguments[i__17326__auto___43125]));

var G__43126 = (i__17326__auto___43125 + (1));
i__17326__auto___43125 = G__43126;
continue;
} else {
}
break;
}

var G__43059 = args43057.length;
switch (G__43059) {
case 1:
return sablono.core.password_field43056.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.password_field43056.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43057.length)].join('')));

}
});

sablono.core.password_field43056.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.password_field43056.call(null,name__22620__auto__,null);
});

sablono.core.password_field43056.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"password","password",2057553998,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.password_field43056.cljs$lang$maxFixedArity = 2;

sablono.core.password_field = sablono.core.wrap_attrs.call(null,sablono.core.password_field43056);

/**
 * Creates a range input field.
 */
sablono.core.range_field43060 = (function sablono$core$range_field43060(var_args){
var args43061 = [];
var len__17325__auto___43128 = arguments.length;
var i__17326__auto___43129 = (0);
while(true){
if((i__17326__auto___43129 < len__17325__auto___43128)){
args43061.push((arguments[i__17326__auto___43129]));

var G__43130 = (i__17326__auto___43129 + (1));
i__17326__auto___43129 = G__43130;
continue;
} else {
}
break;
}

var G__43063 = args43061.length;
switch (G__43063) {
case 1:
return sablono.core.range_field43060.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.range_field43060.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43061.length)].join('')));

}
});

sablono.core.range_field43060.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.range_field43060.call(null,name__22620__auto__,null);
});

sablono.core.range_field43060.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"range","range",-1014743483,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.range_field43060.cljs$lang$maxFixedArity = 2;

sablono.core.range_field = sablono.core.wrap_attrs.call(null,sablono.core.range_field43060);

/**
 * Creates a search input field.
 */
sablono.core.search_field43064 = (function sablono$core$search_field43064(var_args){
var args43065 = [];
var len__17325__auto___43132 = arguments.length;
var i__17326__auto___43133 = (0);
while(true){
if((i__17326__auto___43133 < len__17325__auto___43132)){
args43065.push((arguments[i__17326__auto___43133]));

var G__43134 = (i__17326__auto___43133 + (1));
i__17326__auto___43133 = G__43134;
continue;
} else {
}
break;
}

var G__43067 = args43065.length;
switch (G__43067) {
case 1:
return sablono.core.search_field43064.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.search_field43064.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43065.length)].join('')));

}
});

sablono.core.search_field43064.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.search_field43064.call(null,name__22620__auto__,null);
});

sablono.core.search_field43064.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"search","search",-1089495947,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.search_field43064.cljs$lang$maxFixedArity = 2;

sablono.core.search_field = sablono.core.wrap_attrs.call(null,sablono.core.search_field43064);

/**
 * Creates a tel input field.
 */
sablono.core.tel_field43068 = (function sablono$core$tel_field43068(var_args){
var args43069 = [];
var len__17325__auto___43136 = arguments.length;
var i__17326__auto___43137 = (0);
while(true){
if((i__17326__auto___43137 < len__17325__auto___43136)){
args43069.push((arguments[i__17326__auto___43137]));

var G__43138 = (i__17326__auto___43137 + (1));
i__17326__auto___43137 = G__43138;
continue;
} else {
}
break;
}

var G__43071 = args43069.length;
switch (G__43071) {
case 1:
return sablono.core.tel_field43068.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.tel_field43068.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43069.length)].join('')));

}
});

sablono.core.tel_field43068.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.tel_field43068.call(null,name__22620__auto__,null);
});

sablono.core.tel_field43068.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"tel","tel",1864669686,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.tel_field43068.cljs$lang$maxFixedArity = 2;

sablono.core.tel_field = sablono.core.wrap_attrs.call(null,sablono.core.tel_field43068);

/**
 * Creates a text input field.
 */
sablono.core.text_field43072 = (function sablono$core$text_field43072(var_args){
var args43073 = [];
var len__17325__auto___43140 = arguments.length;
var i__17326__auto___43141 = (0);
while(true){
if((i__17326__auto___43141 < len__17325__auto___43140)){
args43073.push((arguments[i__17326__auto___43141]));

var G__43142 = (i__17326__auto___43141 + (1));
i__17326__auto___43141 = G__43142;
continue;
} else {
}
break;
}

var G__43075 = args43073.length;
switch (G__43075) {
case 1:
return sablono.core.text_field43072.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.text_field43072.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43073.length)].join('')));

}
});

sablono.core.text_field43072.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.text_field43072.call(null,name__22620__auto__,null);
});

sablono.core.text_field43072.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"text","text",-150030170,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.text_field43072.cljs$lang$maxFixedArity = 2;

sablono.core.text_field = sablono.core.wrap_attrs.call(null,sablono.core.text_field43072);

/**
 * Creates a time input field.
 */
sablono.core.time_field43076 = (function sablono$core$time_field43076(var_args){
var args43077 = [];
var len__17325__auto___43144 = arguments.length;
var i__17326__auto___43145 = (0);
while(true){
if((i__17326__auto___43145 < len__17325__auto___43144)){
args43077.push((arguments[i__17326__auto___43145]));

var G__43146 = (i__17326__auto___43145 + (1));
i__17326__auto___43145 = G__43146;
continue;
} else {
}
break;
}

var G__43079 = args43077.length;
switch (G__43079) {
case 1:
return sablono.core.time_field43076.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.time_field43076.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43077.length)].join('')));

}
});

sablono.core.time_field43076.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.time_field43076.call(null,name__22620__auto__,null);
});

sablono.core.time_field43076.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"time","time",-1268547887,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.time_field43076.cljs$lang$maxFixedArity = 2;

sablono.core.time_field = sablono.core.wrap_attrs.call(null,sablono.core.time_field43076);

/**
 * Creates a url input field.
 */
sablono.core.url_field43080 = (function sablono$core$url_field43080(var_args){
var args43081 = [];
var len__17325__auto___43148 = arguments.length;
var i__17326__auto___43149 = (0);
while(true){
if((i__17326__auto___43149 < len__17325__auto___43148)){
args43081.push((arguments[i__17326__auto___43149]));

var G__43150 = (i__17326__auto___43149 + (1));
i__17326__auto___43149 = G__43150;
continue;
} else {
}
break;
}

var G__43083 = args43081.length;
switch (G__43083) {
case 1:
return sablono.core.url_field43080.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.url_field43080.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43081.length)].join('')));

}
});

sablono.core.url_field43080.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.url_field43080.call(null,name__22620__auto__,null);
});

sablono.core.url_field43080.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"url","url",1916828573,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.url_field43080.cljs$lang$maxFixedArity = 2;

sablono.core.url_field = sablono.core.wrap_attrs.call(null,sablono.core.url_field43080);

/**
 * Creates a week input field.
 */
sablono.core.week_field43084 = (function sablono$core$week_field43084(var_args){
var args43085 = [];
var len__17325__auto___43152 = arguments.length;
var i__17326__auto___43153 = (0);
while(true){
if((i__17326__auto___43153 < len__17325__auto___43152)){
args43085.push((arguments[i__17326__auto___43153]));

var G__43154 = (i__17326__auto___43153 + (1));
i__17326__auto___43153 = G__43154;
continue;
} else {
}
break;
}

var G__43087 = args43085.length;
switch (G__43087) {
case 1:
return sablono.core.week_field43084.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.week_field43084.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43085.length)].join('')));

}
});

sablono.core.week_field43084.cljs$core$IFn$_invoke$arity$1 = (function (name__22620__auto__){
return sablono.core.week_field43084.call(null,name__22620__auto__,null);
});

sablono.core.week_field43084.cljs$core$IFn$_invoke$arity$2 = (function (name__22620__auto__,value__22621__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"week","week",314058249,null))].join(''),name__22620__auto__,value__22621__auto__);
});

sablono.core.week_field43084.cljs$lang$maxFixedArity = 2;

sablono.core.week_field = sablono.core.wrap_attrs.call(null,sablono.core.week_field43084);
sablono.core.file_upload = sablono.core.file_field;
/**
 * Creates a check box.
 */
sablono.core.check_box43156 = (function sablono$core$check_box43156(var_args){
var args43157 = [];
var len__17325__auto___43160 = arguments.length;
var i__17326__auto___43161 = (0);
while(true){
if((i__17326__auto___43161 < len__17325__auto___43160)){
args43157.push((arguments[i__17326__auto___43161]));

var G__43162 = (i__17326__auto___43161 + (1));
i__17326__auto___43161 = G__43162;
continue;
} else {
}
break;
}

var G__43159 = args43157.length;
switch (G__43159) {
case 1:
return sablono.core.check_box43156.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.check_box43156.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return sablono.core.check_box43156.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43157.length)].join('')));

}
});

sablono.core.check_box43156.cljs$core$IFn$_invoke$arity$1 = (function (name){
return sablono.core.check_box43156.call(null,name,null);
});

sablono.core.check_box43156.cljs$core$IFn$_invoke$arity$2 = (function (name,checked_QMARK_){
return sablono.core.check_box43156.call(null,name,checked_QMARK_,"true");
});

sablono.core.check_box43156.cljs$core$IFn$_invoke$arity$3 = (function (name,checked_QMARK_,value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"checkbox",new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"checked","checked",-50955819),checked_QMARK_], null)], null);
});

sablono.core.check_box43156.cljs$lang$maxFixedArity = 3;

sablono.core.check_box = sablono.core.wrap_attrs.call(null,sablono.core.check_box43156);
/**
 * Creates a radio button.
 */
sablono.core.radio_button43164 = (function sablono$core$radio_button43164(var_args){
var args43165 = [];
var len__17325__auto___43168 = arguments.length;
var i__17326__auto___43169 = (0);
while(true){
if((i__17326__auto___43169 < len__17325__auto___43168)){
args43165.push((arguments[i__17326__auto___43169]));

var G__43170 = (i__17326__auto___43169 + (1));
i__17326__auto___43169 = G__43170;
continue;
} else {
}
break;
}

var G__43167 = args43165.length;
switch (G__43167) {
case 1:
return sablono.core.radio_button43164.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.radio_button43164.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return sablono.core.radio_button43164.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43165.length)].join('')));

}
});

sablono.core.radio_button43164.cljs$core$IFn$_invoke$arity$1 = (function (group){
return sablono.core.radio_button43164.call(null,group,null);
});

sablono.core.radio_button43164.cljs$core$IFn$_invoke$arity$2 = (function (group,checked_QMARK_){
return sablono.core.radio_button43164.call(null,group,checked_QMARK_,"true");
});

sablono.core.radio_button43164.cljs$core$IFn$_invoke$arity$3 = (function (group,checked_QMARK_,value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"radio",new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,group),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,[cljs.core.str(sablono.util.as_str.call(null,group)),cljs.core.str("-"),cljs.core.str(sablono.util.as_str.call(null,value))].join('')),new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"checked","checked",-50955819),checked_QMARK_], null)], null);
});

sablono.core.radio_button43164.cljs$lang$maxFixedArity = 3;

sablono.core.radio_button = sablono.core.wrap_attrs.call(null,sablono.core.radio_button43164);
sablono.core.hash_key = (function sablono$core$hash_key(x){
return goog.string.hashCode(cljs.core.pr_str.call(null,x));
});
/**
 * Creates a seq of option tags from a collection.
 */
sablono.core.select_options43172 = (function sablono$core$select_options43172(coll){
var iter__17039__auto__ = (function sablono$core$select_options43172_$_iter__43181(s__43182){
return (new cljs.core.LazySeq(null,(function (){
var s__43182__$1 = s__43182;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__43182__$1);
if(temp__4425__auto__){
var s__43182__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__43182__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__43182__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__43184 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__43183 = (0);
while(true){
if((i__43183 < size__17038__auto__)){
var x = cljs.core._nth.call(null,c__17037__auto__,i__43183);
cljs.core.chunk_append.call(null,b__43184,((cljs.core.sequential_QMARK_.call(null,x))?(function (){var vec__43187 = x;
var text = cljs.core.nth.call(null,vec__43187,(0),null);
var val = cljs.core.nth.call(null,vec__43187,(1),null);
var disabled_QMARK_ = cljs.core.nth.call(null,vec__43187,(2),null);
var disabled_QMARK___$1 = cljs.core.boolean$.call(null,disabled_QMARK_);
if(cljs.core.sequential_QMARK_.call(null,val)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",1738282218),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,text),new cljs.core.Keyword(null,"label","label",1718410804),text], null),sablono$core$select_options43172.call(null,val)], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),disabled_QMARK___$1,new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,val),new cljs.core.Keyword(null,"value","value",305978217),val], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,x),new cljs.core.Keyword(null,"value","value",305978217),x], null),x], null)));

var G__43189 = (i__43183 + (1));
i__43183 = G__43189;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__43184),sablono$core$select_options43172_$_iter__43181.call(null,cljs.core.chunk_rest.call(null,s__43182__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__43184),null);
}
} else {
var x = cljs.core.first.call(null,s__43182__$2);
return cljs.core.cons.call(null,((cljs.core.sequential_QMARK_.call(null,x))?(function (){var vec__43188 = x;
var text = cljs.core.nth.call(null,vec__43188,(0),null);
var val = cljs.core.nth.call(null,vec__43188,(1),null);
var disabled_QMARK_ = cljs.core.nth.call(null,vec__43188,(2),null);
var disabled_QMARK___$1 = cljs.core.boolean$.call(null,disabled_QMARK_);
if(cljs.core.sequential_QMARK_.call(null,val)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",1738282218),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,text),new cljs.core.Keyword(null,"label","label",1718410804),text], null),sablono$core$select_options43172.call(null,val)], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),disabled_QMARK___$1,new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,val),new cljs.core.Keyword(null,"value","value",305978217),val], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,x),new cljs.core.Keyword(null,"value","value",305978217),x], null),x], null)),sablono$core$select_options43172_$_iter__43181.call(null,cljs.core.rest.call(null,s__43182__$2)));
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

sablono.core.select_options = sablono.core.wrap_attrs.call(null,sablono.core.select_options43172);
/**
 * Creates a drop-down box using the <select> tag.
 */
sablono.core.drop_down43190 = (function sablono$core$drop_down43190(var_args){
var args43191 = [];
var len__17325__auto___43194 = arguments.length;
var i__17326__auto___43195 = (0);
while(true){
if((i__17326__auto___43195 < len__17325__auto___43194)){
args43191.push((arguments[i__17326__auto___43195]));

var G__43196 = (i__17326__auto___43195 + (1));
i__17326__auto___43195 = G__43196;
continue;
} else {
}
break;
}

var G__43193 = args43191.length;
switch (G__43193) {
case 2:
return sablono.core.drop_down43190.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return sablono.core.drop_down43190.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43191.length)].join('')));

}
});

sablono.core.drop_down43190.cljs$core$IFn$_invoke$arity$2 = (function (name,options){
return sablono.core.drop_down43190.call(null,name,options,null);
});

sablono.core.drop_down43190.cljs$core$IFn$_invoke$arity$3 = (function (name,options,selected){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name)], null),sablono.core.select_options.call(null,options,selected)], null);
});

sablono.core.drop_down43190.cljs$lang$maxFixedArity = 3;

sablono.core.drop_down = sablono.core.wrap_attrs.call(null,sablono.core.drop_down43190);
/**
 * Creates a text area element.
 */
sablono.core.text_area43198 = (function sablono$core$text_area43198(var_args){
var args43199 = [];
var len__17325__auto___43202 = arguments.length;
var i__17326__auto___43203 = (0);
while(true){
if((i__17326__auto___43203 < len__17325__auto___43202)){
args43199.push((arguments[i__17326__auto___43203]));

var G__43204 = (i__17326__auto___43203 + (1));
i__17326__auto___43203 = G__43204;
continue;
} else {
}
break;
}

var G__43201 = args43199.length;
switch (G__43201) {
case 1:
return sablono.core.text_area43198.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.text_area43198.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args43199.length)].join('')));

}
});

sablono.core.text_area43198.cljs$core$IFn$_invoke$arity$1 = (function (name){
return sablono.core.text_area43198.call(null,name,null);
});

sablono.core.text_area43198.cljs$core$IFn$_invoke$arity$2 = (function (name,value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea","textarea",-650375824),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",305978217),value], null)], null);
});

sablono.core.text_area43198.cljs$lang$maxFixedArity = 2;

sablono.core.text_area = sablono.core.wrap_attrs.call(null,sablono.core.text_area43198);
/**
 * Creates a label for an input field with the supplied name.
 */
sablono.core.label43206 = (function sablono$core$label43206(name,text){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"htmlFor","htmlFor",-1050291720),sablono.core.make_id.call(null,name)], null),text], null);
});

sablono.core.label = sablono.core.wrap_attrs.call(null,sablono.core.label43206);
/**
 * Creates a submit button.
 */
sablono.core.submit_button43207 = (function sablono$core$submit_button43207(text){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"submit",new cljs.core.Keyword(null,"value","value",305978217),text], null)], null);
});

sablono.core.submit_button = sablono.core.wrap_attrs.call(null,sablono.core.submit_button43207);
/**
 * Creates a form reset button.
 */
sablono.core.reset_button43208 = (function sablono$core$reset_button43208(text){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"reset",new cljs.core.Keyword(null,"value","value",305978217),text], null)], null);
});

sablono.core.reset_button = sablono.core.wrap_attrs.call(null,sablono.core.reset_button43208);
/**
 * Create a form that points to a particular method and route.
 *   e.g. (form-to [:put "/post"]
 *       ...)
 */
sablono.core.form_to43209 = (function sablono$core$form_to43209(var_args){
var args__17332__auto__ = [];
var len__17325__auto___43214 = arguments.length;
var i__17326__auto___43215 = (0);
while(true){
if((i__17326__auto___43215 < len__17325__auto___43214)){
args__17332__auto__.push((arguments[i__17326__auto___43215]));

var G__43216 = (i__17326__auto___43215 + (1));
i__17326__auto___43215 = G__43216;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return sablono.core.form_to43209.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

sablono.core.form_to43209.cljs$core$IFn$_invoke$arity$variadic = (function (p__43212,body){
var vec__43213 = p__43212;
var method = cljs.core.nth.call(null,vec__43213,(0),null);
var action = cljs.core.nth.call(null,vec__43213,(1),null);
var method_str = clojure.string.upper_case.call(null,cljs.core.name.call(null,method));
var action_uri = sablono.util.to_uri.call(null,action);
return cljs.core.vec.call(null,cljs.core.concat.call(null,((cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"get","get",1683182755),null,new cljs.core.Keyword(null,"post","post",269697687),null], null), null),method))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),method_str,new cljs.core.Keyword(null,"action","action",-811238024),action_uri], null)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),"POST",new cljs.core.Keyword(null,"action","action",-811238024),action_uri], null),sablono.core.hidden_field.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(3735928559)], null),"_method",method_str)], null)),body));
});

sablono.core.form_to43209.cljs$lang$maxFixedArity = (1);

sablono.core.form_to43209.cljs$lang$applyTo = (function (seq43210){
var G__43211 = cljs.core.first.call(null,seq43210);
var seq43210__$1 = cljs.core.next.call(null,seq43210);
return sablono.core.form_to43209.cljs$core$IFn$_invoke$arity$variadic(G__43211,seq43210__$1);
});

sablono.core.form_to = sablono.core.wrap_attrs.call(null,sablono.core.form_to43209);

//# sourceMappingURL=core.js.map?rel=1445823446972