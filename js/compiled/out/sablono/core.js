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
var G__37173__delegate = function (args){
if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,args))){
var vec__37172 = cljs.core.apply.call(null,func,cljs.core.rest.call(null,args));
var tag = cljs.core.nth.call(null,vec__37172,(0),null);
var body = cljs.core.nthnext.call(null,vec__37172,(1));
if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,body))){
return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.merge.call(null,cljs.core.first.call(null,body),cljs.core.first.call(null,args)),cljs.core.rest.call(null,body));
} else {
return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.first.call(null,args),body);
}
} else {
return cljs.core.apply.call(null,func,args);
}
};
var G__37173 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__37174__i = 0, G__37174__a = new Array(arguments.length -  0);
while (G__37174__i < G__37174__a.length) {G__37174__a[G__37174__i] = arguments[G__37174__i + 0]; ++G__37174__i;}
  args = new cljs.core.IndexedSeq(G__37174__a,0);
} 
return G__37173__delegate.call(this,args);};
G__37173.cljs$lang$maxFixedArity = 0;
G__37173.cljs$lang$applyTo = (function (arglist__37175){
var args = cljs.core.seq(arglist__37175);
return G__37173__delegate(args);
});
G__37173.cljs$core$IFn$_invoke$arity$variadic = G__37173__delegate;
return G__37173;
})()
;
});
sablono.core.update_arglists = (function sablono$core$update_arglists(arglists){
var iter__17039__auto__ = (function sablono$core$update_arglists_$_iter__37180(s__37181){
return (new cljs.core.LazySeq(null,(function (){
var s__37181__$1 = s__37181;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__37181__$1);
if(temp__4425__auto__){
var s__37181__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__37181__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__37181__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__37183 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__37182 = (0);
while(true){
if((i__37182 < size__17038__auto__)){
var args = cljs.core._nth.call(null,c__17037__auto__,i__37182);
cljs.core.chunk_append.call(null,b__37183,cljs.core.vec.call(null,cljs.core.cons.call(null,new cljs.core.Symbol(null,"attr-map?","attr-map?",116307443,null),args)));

var G__37184 = (i__37182 + (1));
i__37182 = G__37184;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37183),sablono$core$update_arglists_$_iter__37180.call(null,cljs.core.chunk_rest.call(null,s__37181__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37183),null);
}
} else {
var args = cljs.core.first.call(null,s__37181__$2);
return cljs.core.cons.call(null,cljs.core.vec.call(null,cljs.core.cons.call(null,new cljs.core.Symbol(null,"attr-map?","attr-map?",116307443,null),args)),sablono$core$update_arglists_$_iter__37180.call(null,cljs.core.rest.call(null,s__37181__$2)));
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
var len__17325__auto___37190 = arguments.length;
var i__17326__auto___37191 = (0);
while(true){
if((i__17326__auto___37191 < len__17325__auto___37190)){
args__17332__auto__.push((arguments[i__17326__auto___37191]));

var G__37192 = (i__17326__auto___37191 + (1));
i__17326__auto___37191 = G__37192;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((0) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((0)),(0))):null);
return sablono.core.include_css.cljs$core$IFn$_invoke$arity$variadic(argseq__17333__auto__);
});

sablono.core.include_css.cljs$core$IFn$_invoke$arity$variadic = (function (styles){
var iter__17039__auto__ = (function sablono$core$iter__37186(s__37187){
return (new cljs.core.LazySeq(null,(function (){
var s__37187__$1 = s__37187;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__37187__$1);
if(temp__4425__auto__){
var s__37187__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__37187__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__37187__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__37189 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__37188 = (0);
while(true){
if((i__37188 < size__17038__auto__)){
var style = cljs.core._nth.call(null,c__17037__auto__,i__37188);
cljs.core.chunk_append.call(null,b__37189,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",-1769163468),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text/css",new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,style),new cljs.core.Keyword(null,"rel","rel",1378823488),"stylesheet"], null)], null));

var G__37193 = (i__37188 + (1));
i__37188 = G__37193;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37189),sablono$core$iter__37186.call(null,cljs.core.chunk_rest.call(null,s__37187__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37189),null);
}
} else {
var style = cljs.core.first.call(null,s__37187__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",-1769163468),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text/css",new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,style),new cljs.core.Keyword(null,"rel","rel",1378823488),"stylesheet"], null)], null),sablono$core$iter__37186.call(null,cljs.core.rest.call(null,s__37187__$2)));
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

sablono.core.include_css.cljs$lang$applyTo = (function (seq37185){
return sablono.core.include_css.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37185));
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
sablono.core.link_to37194 = (function sablono$core$link_to37194(var_args){
var args__17332__auto__ = [];
var len__17325__auto___37197 = arguments.length;
var i__17326__auto___37198 = (0);
while(true){
if((i__17326__auto___37198 < len__17325__auto___37197)){
args__17332__auto__.push((arguments[i__17326__auto___37198]));

var G__37199 = (i__17326__auto___37198 + (1));
i__17326__auto___37198 = G__37199;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return sablono.core.link_to37194.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

sablono.core.link_to37194.cljs$core$IFn$_invoke$arity$variadic = (function (url,content){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,url)], null),content], null);
});

sablono.core.link_to37194.cljs$lang$maxFixedArity = (1);

sablono.core.link_to37194.cljs$lang$applyTo = (function (seq37195){
var G__37196 = cljs.core.first.call(null,seq37195);
var seq37195__$1 = cljs.core.next.call(null,seq37195);
return sablono.core.link_to37194.cljs$core$IFn$_invoke$arity$variadic(G__37196,seq37195__$1);
});

sablono.core.link_to = sablono.core.wrap_attrs.call(null,sablono.core.link_to37194);
/**
 * Wraps some content in a HTML hyperlink with the supplied e-mail
 *   address. If no content provided use the e-mail address as content.
 */
sablono.core.mail_to37200 = (function sablono$core$mail_to37200(var_args){
var args__17332__auto__ = [];
var len__17325__auto___37205 = arguments.length;
var i__17326__auto___37206 = (0);
while(true){
if((i__17326__auto___37206 < len__17325__auto___37205)){
args__17332__auto__.push((arguments[i__17326__auto___37206]));

var G__37207 = (i__17326__auto___37206 + (1));
i__17326__auto___37206 = G__37207;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return sablono.core.mail_to37200.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

sablono.core.mail_to37200.cljs$core$IFn$_invoke$arity$variadic = (function (e_mail,p__37203){
var vec__37204 = p__37203;
var content = cljs.core.nth.call(null,vec__37204,(0),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),[cljs.core.str("mailto:"),cljs.core.str(e_mail)].join('')], null),(function (){var or__16267__auto__ = content;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return e_mail;
}
})()], null);
});

sablono.core.mail_to37200.cljs$lang$maxFixedArity = (1);

sablono.core.mail_to37200.cljs$lang$applyTo = (function (seq37201){
var G__37202 = cljs.core.first.call(null,seq37201);
var seq37201__$1 = cljs.core.next.call(null,seq37201);
return sablono.core.mail_to37200.cljs$core$IFn$_invoke$arity$variadic(G__37202,seq37201__$1);
});

sablono.core.mail_to = sablono.core.wrap_attrs.call(null,sablono.core.mail_to37200);
/**
 * Wrap a collection in an unordered list.
 */
sablono.core.unordered_list37208 = (function sablono$core$unordered_list37208(coll){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__17039__auto__ = (function sablono$core$unordered_list37208_$_iter__37213(s__37214){
return (new cljs.core.LazySeq(null,(function (){
var s__37214__$1 = s__37214;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__37214__$1);
if(temp__4425__auto__){
var s__37214__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__37214__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__37214__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__37216 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__37215 = (0);
while(true){
if((i__37215 < size__17038__auto__)){
var x = cljs.core._nth.call(null,c__17037__auto__,i__37215);
cljs.core.chunk_append.call(null,b__37216,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null));

var G__37217 = (i__37215 + (1));
i__37215 = G__37217;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37216),sablono$core$unordered_list37208_$_iter__37213.call(null,cljs.core.chunk_rest.call(null,s__37214__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37216),null);
}
} else {
var x = cljs.core.first.call(null,s__37214__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null),sablono$core$unordered_list37208_$_iter__37213.call(null,cljs.core.rest.call(null,s__37214__$2)));
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

sablono.core.unordered_list = sablono.core.wrap_attrs.call(null,sablono.core.unordered_list37208);
/**
 * Wrap a collection in an ordered list.
 */
sablono.core.ordered_list37218 = (function sablono$core$ordered_list37218(coll){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ol","ol",932524051),(function (){var iter__17039__auto__ = (function sablono$core$ordered_list37218_$_iter__37223(s__37224){
return (new cljs.core.LazySeq(null,(function (){
var s__37224__$1 = s__37224;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__37224__$1);
if(temp__4425__auto__){
var s__37224__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__37224__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__37224__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__37226 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__37225 = (0);
while(true){
if((i__37225 < size__17038__auto__)){
var x = cljs.core._nth.call(null,c__17037__auto__,i__37225);
cljs.core.chunk_append.call(null,b__37226,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null));

var G__37227 = (i__37225 + (1));
i__37225 = G__37227;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37226),sablono$core$ordered_list37218_$_iter__37223.call(null,cljs.core.chunk_rest.call(null,s__37224__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37226),null);
}
} else {
var x = cljs.core.first.call(null,s__37224__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null),sablono$core$ordered_list37218_$_iter__37223.call(null,cljs.core.rest.call(null,s__37224__$2)));
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

sablono.core.ordered_list = sablono.core.wrap_attrs.call(null,sablono.core.ordered_list37218);
/**
 * Create an image element.
 */
sablono.core.image37228 = (function sablono$core$image37228(var_args){
var args37229 = [];
var len__17325__auto___37232 = arguments.length;
var i__17326__auto___37233 = (0);
while(true){
if((i__17326__auto___37233 < len__17325__auto___37232)){
args37229.push((arguments[i__17326__auto___37233]));

var G__37234 = (i__17326__auto___37233 + (1));
i__17326__auto___37233 = G__37234;
continue;
} else {
}
break;
}

var G__37231 = args37229.length;
switch (G__37231) {
case 1:
return sablono.core.image37228.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.image37228.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37229.length)].join('')));

}
});

sablono.core.image37228.cljs$core$IFn$_invoke$arity$1 = (function (src){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),sablono.util.as_str.call(null,src)], null)], null);
});

sablono.core.image37228.cljs$core$IFn$_invoke$arity$2 = (function (src,alt){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),sablono.util.as_str.call(null,src),new cljs.core.Keyword(null,"alt","alt",-3214426),alt], null)], null);
});

sablono.core.image37228.cljs$lang$maxFixedArity = 2;

sablono.core.image = sablono.core.wrap_attrs.call(null,sablono.core.image37228);
sablono.core._STAR_group_STAR_ = cljs.core.PersistentVector.EMPTY;
/**
 * Create a field name from the supplied argument the current field group.
 */
sablono.core.make_name = (function sablono$core$make_name(name){
return cljs.core.reduce.call(null,(function (p1__37236_SHARP_,p2__37237_SHARP_){
return [cljs.core.str(p1__37236_SHARP_),cljs.core.str("["),cljs.core.str(p2__37237_SHARP_),cljs.core.str("]")].join('');
}),cljs.core.conj.call(null,sablono.core._STAR_group_STAR_,sablono.util.as_str.call(null,name)));
});
/**
 * Create a field id from the supplied argument and current field group.
 */
sablono.core.make_id = (function sablono$core$make_id(name){
return cljs.core.reduce.call(null,(function (p1__37238_SHARP_,p2__37239_SHARP_){
return [cljs.core.str(p1__37238_SHARP_),cljs.core.str("-"),cljs.core.str(p2__37239_SHARP_)].join('');
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
sablono.core.color_field37240 = (function sablono$core$color_field37240(var_args){
var args37241 = [];
var len__17325__auto___37308 = arguments.length;
var i__17326__auto___37309 = (0);
while(true){
if((i__17326__auto___37309 < len__17325__auto___37308)){
args37241.push((arguments[i__17326__auto___37309]));

var G__37310 = (i__17326__auto___37309 + (1));
i__17326__auto___37309 = G__37310;
continue;
} else {
}
break;
}

var G__37243 = args37241.length;
switch (G__37243) {
case 1:
return sablono.core.color_field37240.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.color_field37240.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37241.length)].join('')));

}
});

sablono.core.color_field37240.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.color_field37240.call(null,name__18957__auto__,null);
});

sablono.core.color_field37240.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"color","color",-1642760596,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.color_field37240.cljs$lang$maxFixedArity = 2;

sablono.core.color_field = sablono.core.wrap_attrs.call(null,sablono.core.color_field37240);

/**
 * Creates a date input field.
 */
sablono.core.date_field37244 = (function sablono$core$date_field37244(var_args){
var args37245 = [];
var len__17325__auto___37312 = arguments.length;
var i__17326__auto___37313 = (0);
while(true){
if((i__17326__auto___37313 < len__17325__auto___37312)){
args37245.push((arguments[i__17326__auto___37313]));

var G__37314 = (i__17326__auto___37313 + (1));
i__17326__auto___37313 = G__37314;
continue;
} else {
}
break;
}

var G__37247 = args37245.length;
switch (G__37247) {
case 1:
return sablono.core.date_field37244.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.date_field37244.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37245.length)].join('')));

}
});

sablono.core.date_field37244.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.date_field37244.call(null,name__18957__auto__,null);
});

sablono.core.date_field37244.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"date","date",177097065,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.date_field37244.cljs$lang$maxFixedArity = 2;

sablono.core.date_field = sablono.core.wrap_attrs.call(null,sablono.core.date_field37244);

/**
 * Creates a datetime input field.
 */
sablono.core.datetime_field37248 = (function sablono$core$datetime_field37248(var_args){
var args37249 = [];
var len__17325__auto___37316 = arguments.length;
var i__17326__auto___37317 = (0);
while(true){
if((i__17326__auto___37317 < len__17325__auto___37316)){
args37249.push((arguments[i__17326__auto___37317]));

var G__37318 = (i__17326__auto___37317 + (1));
i__17326__auto___37317 = G__37318;
continue;
} else {
}
break;
}

var G__37251 = args37249.length;
switch (G__37251) {
case 1:
return sablono.core.datetime_field37248.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.datetime_field37248.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37249.length)].join('')));

}
});

sablono.core.datetime_field37248.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.datetime_field37248.call(null,name__18957__auto__,null);
});

sablono.core.datetime_field37248.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"datetime","datetime",2135207229,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.datetime_field37248.cljs$lang$maxFixedArity = 2;

sablono.core.datetime_field = sablono.core.wrap_attrs.call(null,sablono.core.datetime_field37248);

/**
 * Creates a datetime-local input field.
 */
sablono.core.datetime_local_field37252 = (function sablono$core$datetime_local_field37252(var_args){
var args37253 = [];
var len__17325__auto___37320 = arguments.length;
var i__17326__auto___37321 = (0);
while(true){
if((i__17326__auto___37321 < len__17325__auto___37320)){
args37253.push((arguments[i__17326__auto___37321]));

var G__37322 = (i__17326__auto___37321 + (1));
i__17326__auto___37321 = G__37322;
continue;
} else {
}
break;
}

var G__37255 = args37253.length;
switch (G__37255) {
case 1:
return sablono.core.datetime_local_field37252.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.datetime_local_field37252.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37253.length)].join('')));

}
});

sablono.core.datetime_local_field37252.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.datetime_local_field37252.call(null,name__18957__auto__,null);
});

sablono.core.datetime_local_field37252.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"datetime-local","datetime-local",-507312697,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.datetime_local_field37252.cljs$lang$maxFixedArity = 2;

sablono.core.datetime_local_field = sablono.core.wrap_attrs.call(null,sablono.core.datetime_local_field37252);

/**
 * Creates a email input field.
 */
sablono.core.email_field37256 = (function sablono$core$email_field37256(var_args){
var args37257 = [];
var len__17325__auto___37324 = arguments.length;
var i__17326__auto___37325 = (0);
while(true){
if((i__17326__auto___37325 < len__17325__auto___37324)){
args37257.push((arguments[i__17326__auto___37325]));

var G__37326 = (i__17326__auto___37325 + (1));
i__17326__auto___37325 = G__37326;
continue;
} else {
}
break;
}

var G__37259 = args37257.length;
switch (G__37259) {
case 1:
return sablono.core.email_field37256.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.email_field37256.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37257.length)].join('')));

}
});

sablono.core.email_field37256.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.email_field37256.call(null,name__18957__auto__,null);
});

sablono.core.email_field37256.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"email","email",-1238619063,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.email_field37256.cljs$lang$maxFixedArity = 2;

sablono.core.email_field = sablono.core.wrap_attrs.call(null,sablono.core.email_field37256);

/**
 * Creates a file input field.
 */
sablono.core.file_field37260 = (function sablono$core$file_field37260(var_args){
var args37261 = [];
var len__17325__auto___37328 = arguments.length;
var i__17326__auto___37329 = (0);
while(true){
if((i__17326__auto___37329 < len__17325__auto___37328)){
args37261.push((arguments[i__17326__auto___37329]));

var G__37330 = (i__17326__auto___37329 + (1));
i__17326__auto___37329 = G__37330;
continue;
} else {
}
break;
}

var G__37263 = args37261.length;
switch (G__37263) {
case 1:
return sablono.core.file_field37260.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.file_field37260.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37261.length)].join('')));

}
});

sablono.core.file_field37260.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.file_field37260.call(null,name__18957__auto__,null);
});

sablono.core.file_field37260.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"file","file",370885649,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.file_field37260.cljs$lang$maxFixedArity = 2;

sablono.core.file_field = sablono.core.wrap_attrs.call(null,sablono.core.file_field37260);

/**
 * Creates a hidden input field.
 */
sablono.core.hidden_field37264 = (function sablono$core$hidden_field37264(var_args){
var args37265 = [];
var len__17325__auto___37332 = arguments.length;
var i__17326__auto___37333 = (0);
while(true){
if((i__17326__auto___37333 < len__17325__auto___37332)){
args37265.push((arguments[i__17326__auto___37333]));

var G__37334 = (i__17326__auto___37333 + (1));
i__17326__auto___37333 = G__37334;
continue;
} else {
}
break;
}

var G__37267 = args37265.length;
switch (G__37267) {
case 1:
return sablono.core.hidden_field37264.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.hidden_field37264.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37265.length)].join('')));

}
});

sablono.core.hidden_field37264.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.hidden_field37264.call(null,name__18957__auto__,null);
});

sablono.core.hidden_field37264.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"hidden","hidden",1328025435,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.hidden_field37264.cljs$lang$maxFixedArity = 2;

sablono.core.hidden_field = sablono.core.wrap_attrs.call(null,sablono.core.hidden_field37264);

/**
 * Creates a month input field.
 */
sablono.core.month_field37268 = (function sablono$core$month_field37268(var_args){
var args37269 = [];
var len__17325__auto___37336 = arguments.length;
var i__17326__auto___37337 = (0);
while(true){
if((i__17326__auto___37337 < len__17325__auto___37336)){
args37269.push((arguments[i__17326__auto___37337]));

var G__37338 = (i__17326__auto___37337 + (1));
i__17326__auto___37337 = G__37338;
continue;
} else {
}
break;
}

var G__37271 = args37269.length;
switch (G__37271) {
case 1:
return sablono.core.month_field37268.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.month_field37268.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37269.length)].join('')));

}
});

sablono.core.month_field37268.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.month_field37268.call(null,name__18957__auto__,null);
});

sablono.core.month_field37268.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"month","month",-319717006,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.month_field37268.cljs$lang$maxFixedArity = 2;

sablono.core.month_field = sablono.core.wrap_attrs.call(null,sablono.core.month_field37268);

/**
 * Creates a number input field.
 */
sablono.core.number_field37272 = (function sablono$core$number_field37272(var_args){
var args37273 = [];
var len__17325__auto___37340 = arguments.length;
var i__17326__auto___37341 = (0);
while(true){
if((i__17326__auto___37341 < len__17325__auto___37340)){
args37273.push((arguments[i__17326__auto___37341]));

var G__37342 = (i__17326__auto___37341 + (1));
i__17326__auto___37341 = G__37342;
continue;
} else {
}
break;
}

var G__37275 = args37273.length;
switch (G__37275) {
case 1:
return sablono.core.number_field37272.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.number_field37272.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37273.length)].join('')));

}
});

sablono.core.number_field37272.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.number_field37272.call(null,name__18957__auto__,null);
});

sablono.core.number_field37272.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"number","number",-1084057331,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.number_field37272.cljs$lang$maxFixedArity = 2;

sablono.core.number_field = sablono.core.wrap_attrs.call(null,sablono.core.number_field37272);

/**
 * Creates a password input field.
 */
sablono.core.password_field37276 = (function sablono$core$password_field37276(var_args){
var args37277 = [];
var len__17325__auto___37344 = arguments.length;
var i__17326__auto___37345 = (0);
while(true){
if((i__17326__auto___37345 < len__17325__auto___37344)){
args37277.push((arguments[i__17326__auto___37345]));

var G__37346 = (i__17326__auto___37345 + (1));
i__17326__auto___37345 = G__37346;
continue;
} else {
}
break;
}

var G__37279 = args37277.length;
switch (G__37279) {
case 1:
return sablono.core.password_field37276.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.password_field37276.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37277.length)].join('')));

}
});

sablono.core.password_field37276.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.password_field37276.call(null,name__18957__auto__,null);
});

sablono.core.password_field37276.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"password","password",2057553998,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.password_field37276.cljs$lang$maxFixedArity = 2;

sablono.core.password_field = sablono.core.wrap_attrs.call(null,sablono.core.password_field37276);

/**
 * Creates a range input field.
 */
sablono.core.range_field37280 = (function sablono$core$range_field37280(var_args){
var args37281 = [];
var len__17325__auto___37348 = arguments.length;
var i__17326__auto___37349 = (0);
while(true){
if((i__17326__auto___37349 < len__17325__auto___37348)){
args37281.push((arguments[i__17326__auto___37349]));

var G__37350 = (i__17326__auto___37349 + (1));
i__17326__auto___37349 = G__37350;
continue;
} else {
}
break;
}

var G__37283 = args37281.length;
switch (G__37283) {
case 1:
return sablono.core.range_field37280.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.range_field37280.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37281.length)].join('')));

}
});

sablono.core.range_field37280.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.range_field37280.call(null,name__18957__auto__,null);
});

sablono.core.range_field37280.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"range","range",-1014743483,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.range_field37280.cljs$lang$maxFixedArity = 2;

sablono.core.range_field = sablono.core.wrap_attrs.call(null,sablono.core.range_field37280);

/**
 * Creates a search input field.
 */
sablono.core.search_field37284 = (function sablono$core$search_field37284(var_args){
var args37285 = [];
var len__17325__auto___37352 = arguments.length;
var i__17326__auto___37353 = (0);
while(true){
if((i__17326__auto___37353 < len__17325__auto___37352)){
args37285.push((arguments[i__17326__auto___37353]));

var G__37354 = (i__17326__auto___37353 + (1));
i__17326__auto___37353 = G__37354;
continue;
} else {
}
break;
}

var G__37287 = args37285.length;
switch (G__37287) {
case 1:
return sablono.core.search_field37284.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.search_field37284.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37285.length)].join('')));

}
});

sablono.core.search_field37284.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.search_field37284.call(null,name__18957__auto__,null);
});

sablono.core.search_field37284.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"search","search",-1089495947,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.search_field37284.cljs$lang$maxFixedArity = 2;

sablono.core.search_field = sablono.core.wrap_attrs.call(null,sablono.core.search_field37284);

/**
 * Creates a tel input field.
 */
sablono.core.tel_field37288 = (function sablono$core$tel_field37288(var_args){
var args37289 = [];
var len__17325__auto___37356 = arguments.length;
var i__17326__auto___37357 = (0);
while(true){
if((i__17326__auto___37357 < len__17325__auto___37356)){
args37289.push((arguments[i__17326__auto___37357]));

var G__37358 = (i__17326__auto___37357 + (1));
i__17326__auto___37357 = G__37358;
continue;
} else {
}
break;
}

var G__37291 = args37289.length;
switch (G__37291) {
case 1:
return sablono.core.tel_field37288.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.tel_field37288.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37289.length)].join('')));

}
});

sablono.core.tel_field37288.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.tel_field37288.call(null,name__18957__auto__,null);
});

sablono.core.tel_field37288.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"tel","tel",1864669686,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.tel_field37288.cljs$lang$maxFixedArity = 2;

sablono.core.tel_field = sablono.core.wrap_attrs.call(null,sablono.core.tel_field37288);

/**
 * Creates a text input field.
 */
sablono.core.text_field37292 = (function sablono$core$text_field37292(var_args){
var args37293 = [];
var len__17325__auto___37360 = arguments.length;
var i__17326__auto___37361 = (0);
while(true){
if((i__17326__auto___37361 < len__17325__auto___37360)){
args37293.push((arguments[i__17326__auto___37361]));

var G__37362 = (i__17326__auto___37361 + (1));
i__17326__auto___37361 = G__37362;
continue;
} else {
}
break;
}

var G__37295 = args37293.length;
switch (G__37295) {
case 1:
return sablono.core.text_field37292.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.text_field37292.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37293.length)].join('')));

}
});

sablono.core.text_field37292.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.text_field37292.call(null,name__18957__auto__,null);
});

sablono.core.text_field37292.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"text","text",-150030170,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.text_field37292.cljs$lang$maxFixedArity = 2;

sablono.core.text_field = sablono.core.wrap_attrs.call(null,sablono.core.text_field37292);

/**
 * Creates a time input field.
 */
sablono.core.time_field37296 = (function sablono$core$time_field37296(var_args){
var args37297 = [];
var len__17325__auto___37364 = arguments.length;
var i__17326__auto___37365 = (0);
while(true){
if((i__17326__auto___37365 < len__17325__auto___37364)){
args37297.push((arguments[i__17326__auto___37365]));

var G__37366 = (i__17326__auto___37365 + (1));
i__17326__auto___37365 = G__37366;
continue;
} else {
}
break;
}

var G__37299 = args37297.length;
switch (G__37299) {
case 1:
return sablono.core.time_field37296.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.time_field37296.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37297.length)].join('')));

}
});

sablono.core.time_field37296.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.time_field37296.call(null,name__18957__auto__,null);
});

sablono.core.time_field37296.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"time","time",-1268547887,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.time_field37296.cljs$lang$maxFixedArity = 2;

sablono.core.time_field = sablono.core.wrap_attrs.call(null,sablono.core.time_field37296);

/**
 * Creates a url input field.
 */
sablono.core.url_field37300 = (function sablono$core$url_field37300(var_args){
var args37301 = [];
var len__17325__auto___37368 = arguments.length;
var i__17326__auto___37369 = (0);
while(true){
if((i__17326__auto___37369 < len__17325__auto___37368)){
args37301.push((arguments[i__17326__auto___37369]));

var G__37370 = (i__17326__auto___37369 + (1));
i__17326__auto___37369 = G__37370;
continue;
} else {
}
break;
}

var G__37303 = args37301.length;
switch (G__37303) {
case 1:
return sablono.core.url_field37300.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.url_field37300.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37301.length)].join('')));

}
});

sablono.core.url_field37300.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.url_field37300.call(null,name__18957__auto__,null);
});

sablono.core.url_field37300.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"url","url",1916828573,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.url_field37300.cljs$lang$maxFixedArity = 2;

sablono.core.url_field = sablono.core.wrap_attrs.call(null,sablono.core.url_field37300);

/**
 * Creates a week input field.
 */
sablono.core.week_field37304 = (function sablono$core$week_field37304(var_args){
var args37305 = [];
var len__17325__auto___37372 = arguments.length;
var i__17326__auto___37373 = (0);
while(true){
if((i__17326__auto___37373 < len__17325__auto___37372)){
args37305.push((arguments[i__17326__auto___37373]));

var G__37374 = (i__17326__auto___37373 + (1));
i__17326__auto___37373 = G__37374;
continue;
} else {
}
break;
}

var G__37307 = args37305.length;
switch (G__37307) {
case 1:
return sablono.core.week_field37304.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.week_field37304.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37305.length)].join('')));

}
});

sablono.core.week_field37304.cljs$core$IFn$_invoke$arity$1 = (function (name__18957__auto__){
return sablono.core.week_field37304.call(null,name__18957__auto__,null);
});

sablono.core.week_field37304.cljs$core$IFn$_invoke$arity$2 = (function (name__18957__auto__,value__18958__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"week","week",314058249,null))].join(''),name__18957__auto__,value__18958__auto__);
});

sablono.core.week_field37304.cljs$lang$maxFixedArity = 2;

sablono.core.week_field = sablono.core.wrap_attrs.call(null,sablono.core.week_field37304);
sablono.core.file_upload = sablono.core.file_field;
/**
 * Creates a check box.
 */
sablono.core.check_box37376 = (function sablono$core$check_box37376(var_args){
var args37377 = [];
var len__17325__auto___37380 = arguments.length;
var i__17326__auto___37381 = (0);
while(true){
if((i__17326__auto___37381 < len__17325__auto___37380)){
args37377.push((arguments[i__17326__auto___37381]));

var G__37382 = (i__17326__auto___37381 + (1));
i__17326__auto___37381 = G__37382;
continue;
} else {
}
break;
}

var G__37379 = args37377.length;
switch (G__37379) {
case 1:
return sablono.core.check_box37376.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.check_box37376.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return sablono.core.check_box37376.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37377.length)].join('')));

}
});

sablono.core.check_box37376.cljs$core$IFn$_invoke$arity$1 = (function (name){
return sablono.core.check_box37376.call(null,name,null);
});

sablono.core.check_box37376.cljs$core$IFn$_invoke$arity$2 = (function (name,checked_QMARK_){
return sablono.core.check_box37376.call(null,name,checked_QMARK_,"true");
});

sablono.core.check_box37376.cljs$core$IFn$_invoke$arity$3 = (function (name,checked_QMARK_,value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"checkbox",new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"checked","checked",-50955819),checked_QMARK_], null)], null);
});

sablono.core.check_box37376.cljs$lang$maxFixedArity = 3;

sablono.core.check_box = sablono.core.wrap_attrs.call(null,sablono.core.check_box37376);
/**
 * Creates a radio button.
 */
sablono.core.radio_button37384 = (function sablono$core$radio_button37384(var_args){
var args37385 = [];
var len__17325__auto___37388 = arguments.length;
var i__17326__auto___37389 = (0);
while(true){
if((i__17326__auto___37389 < len__17325__auto___37388)){
args37385.push((arguments[i__17326__auto___37389]));

var G__37390 = (i__17326__auto___37389 + (1));
i__17326__auto___37389 = G__37390;
continue;
} else {
}
break;
}

var G__37387 = args37385.length;
switch (G__37387) {
case 1:
return sablono.core.radio_button37384.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.radio_button37384.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return sablono.core.radio_button37384.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37385.length)].join('')));

}
});

sablono.core.radio_button37384.cljs$core$IFn$_invoke$arity$1 = (function (group){
return sablono.core.radio_button37384.call(null,group,null);
});

sablono.core.radio_button37384.cljs$core$IFn$_invoke$arity$2 = (function (group,checked_QMARK_){
return sablono.core.radio_button37384.call(null,group,checked_QMARK_,"true");
});

sablono.core.radio_button37384.cljs$core$IFn$_invoke$arity$3 = (function (group,checked_QMARK_,value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"radio",new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,group),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,[cljs.core.str(sablono.util.as_str.call(null,group)),cljs.core.str("-"),cljs.core.str(sablono.util.as_str.call(null,value))].join('')),new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"checked","checked",-50955819),checked_QMARK_], null)], null);
});

sablono.core.radio_button37384.cljs$lang$maxFixedArity = 3;

sablono.core.radio_button = sablono.core.wrap_attrs.call(null,sablono.core.radio_button37384);
sablono.core.hash_key = (function sablono$core$hash_key(x){
return goog.string.hashCode(cljs.core.pr_str.call(null,x));
});
/**
 * Creates a seq of option tags from a collection.
 */
sablono.core.select_options37392 = (function sablono$core$select_options37392(coll){
var iter__17039__auto__ = (function sablono$core$select_options37392_$_iter__37401(s__37402){
return (new cljs.core.LazySeq(null,(function (){
var s__37402__$1 = s__37402;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__37402__$1);
if(temp__4425__auto__){
var s__37402__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__37402__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__37402__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__37404 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__37403 = (0);
while(true){
if((i__37403 < size__17038__auto__)){
var x = cljs.core._nth.call(null,c__17037__auto__,i__37403);
cljs.core.chunk_append.call(null,b__37404,((cljs.core.sequential_QMARK_.call(null,x))?(function (){var vec__37407 = x;
var text = cljs.core.nth.call(null,vec__37407,(0),null);
var val = cljs.core.nth.call(null,vec__37407,(1),null);
var disabled_QMARK_ = cljs.core.nth.call(null,vec__37407,(2),null);
var disabled_QMARK___$1 = cljs.core.boolean$.call(null,disabled_QMARK_);
if(cljs.core.sequential_QMARK_.call(null,val)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",1738282218),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,text),new cljs.core.Keyword(null,"label","label",1718410804),text], null),sablono$core$select_options37392.call(null,val)], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),disabled_QMARK___$1,new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,val),new cljs.core.Keyword(null,"value","value",305978217),val], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,x),new cljs.core.Keyword(null,"value","value",305978217),x], null),x], null)));

var G__37409 = (i__37403 + (1));
i__37403 = G__37409;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37404),sablono$core$select_options37392_$_iter__37401.call(null,cljs.core.chunk_rest.call(null,s__37402__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__37404),null);
}
} else {
var x = cljs.core.first.call(null,s__37402__$2);
return cljs.core.cons.call(null,((cljs.core.sequential_QMARK_.call(null,x))?(function (){var vec__37408 = x;
var text = cljs.core.nth.call(null,vec__37408,(0),null);
var val = cljs.core.nth.call(null,vec__37408,(1),null);
var disabled_QMARK_ = cljs.core.nth.call(null,vec__37408,(2),null);
var disabled_QMARK___$1 = cljs.core.boolean$.call(null,disabled_QMARK_);
if(cljs.core.sequential_QMARK_.call(null,val)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",1738282218),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,text),new cljs.core.Keyword(null,"label","label",1718410804),text], null),sablono$core$select_options37392.call(null,val)], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),disabled_QMARK___$1,new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,val),new cljs.core.Keyword(null,"value","value",305978217),val], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,x),new cljs.core.Keyword(null,"value","value",305978217),x], null),x], null)),sablono$core$select_options37392_$_iter__37401.call(null,cljs.core.rest.call(null,s__37402__$2)));
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

sablono.core.select_options = sablono.core.wrap_attrs.call(null,sablono.core.select_options37392);
/**
 * Creates a drop-down box using the <select> tag.
 */
sablono.core.drop_down37410 = (function sablono$core$drop_down37410(var_args){
var args37411 = [];
var len__17325__auto___37414 = arguments.length;
var i__17326__auto___37415 = (0);
while(true){
if((i__17326__auto___37415 < len__17325__auto___37414)){
args37411.push((arguments[i__17326__auto___37415]));

var G__37416 = (i__17326__auto___37415 + (1));
i__17326__auto___37415 = G__37416;
continue;
} else {
}
break;
}

var G__37413 = args37411.length;
switch (G__37413) {
case 2:
return sablono.core.drop_down37410.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return sablono.core.drop_down37410.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37411.length)].join('')));

}
});

sablono.core.drop_down37410.cljs$core$IFn$_invoke$arity$2 = (function (name,options){
return sablono.core.drop_down37410.call(null,name,options,null);
});

sablono.core.drop_down37410.cljs$core$IFn$_invoke$arity$3 = (function (name,options,selected){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name)], null),sablono.core.select_options.call(null,options,selected)], null);
});

sablono.core.drop_down37410.cljs$lang$maxFixedArity = 3;

sablono.core.drop_down = sablono.core.wrap_attrs.call(null,sablono.core.drop_down37410);
/**
 * Creates a text area element.
 */
sablono.core.text_area37418 = (function sablono$core$text_area37418(var_args){
var args37419 = [];
var len__17325__auto___37422 = arguments.length;
var i__17326__auto___37423 = (0);
while(true){
if((i__17326__auto___37423 < len__17325__auto___37422)){
args37419.push((arguments[i__17326__auto___37423]));

var G__37424 = (i__17326__auto___37423 + (1));
i__17326__auto___37423 = G__37424;
continue;
} else {
}
break;
}

var G__37421 = args37419.length;
switch (G__37421) {
case 1:
return sablono.core.text_area37418.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.text_area37418.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args37419.length)].join('')));

}
});

sablono.core.text_area37418.cljs$core$IFn$_invoke$arity$1 = (function (name){
return sablono.core.text_area37418.call(null,name,null);
});

sablono.core.text_area37418.cljs$core$IFn$_invoke$arity$2 = (function (name,value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea","textarea",-650375824),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",305978217),value], null)], null);
});

sablono.core.text_area37418.cljs$lang$maxFixedArity = 2;

sablono.core.text_area = sablono.core.wrap_attrs.call(null,sablono.core.text_area37418);
/**
 * Creates a label for an input field with the supplied name.
 */
sablono.core.label37426 = (function sablono$core$label37426(name,text){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"htmlFor","htmlFor",-1050291720),sablono.core.make_id.call(null,name)], null),text], null);
});

sablono.core.label = sablono.core.wrap_attrs.call(null,sablono.core.label37426);
/**
 * Creates a submit button.
 */
sablono.core.submit_button37427 = (function sablono$core$submit_button37427(text){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"submit",new cljs.core.Keyword(null,"value","value",305978217),text], null)], null);
});

sablono.core.submit_button = sablono.core.wrap_attrs.call(null,sablono.core.submit_button37427);
/**
 * Creates a form reset button.
 */
sablono.core.reset_button37428 = (function sablono$core$reset_button37428(text){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"reset",new cljs.core.Keyword(null,"value","value",305978217),text], null)], null);
});

sablono.core.reset_button = sablono.core.wrap_attrs.call(null,sablono.core.reset_button37428);
/**
 * Create a form that points to a particular method and route.
 *   e.g. (form-to [:put "/post"]
 *       ...)
 */
sablono.core.form_to37429 = (function sablono$core$form_to37429(var_args){
var args__17332__auto__ = [];
var len__17325__auto___37434 = arguments.length;
var i__17326__auto___37435 = (0);
while(true){
if((i__17326__auto___37435 < len__17325__auto___37434)){
args__17332__auto__.push((arguments[i__17326__auto___37435]));

var G__37436 = (i__17326__auto___37435 + (1));
i__17326__auto___37435 = G__37436;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return sablono.core.form_to37429.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

sablono.core.form_to37429.cljs$core$IFn$_invoke$arity$variadic = (function (p__37432,body){
var vec__37433 = p__37432;
var method = cljs.core.nth.call(null,vec__37433,(0),null);
var action = cljs.core.nth.call(null,vec__37433,(1),null);
var method_str = clojure.string.upper_case.call(null,cljs.core.name.call(null,method));
var action_uri = sablono.util.to_uri.call(null,action);
return cljs.core.vec.call(null,cljs.core.concat.call(null,((cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"get","get",1683182755),null,new cljs.core.Keyword(null,"post","post",269697687),null], null), null),method))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),method_str,new cljs.core.Keyword(null,"action","action",-811238024),action_uri], null)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),"POST",new cljs.core.Keyword(null,"action","action",-811238024),action_uri], null),sablono.core.hidden_field.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(3735928559)], null),"_method",method_str)], null)),body));
});

sablono.core.form_to37429.cljs$lang$maxFixedArity = (1);

sablono.core.form_to37429.cljs$lang$applyTo = (function (seq37430){
var G__37431 = cljs.core.first.call(null,seq37430);
var seq37430__$1 = cljs.core.next.call(null,seq37430);
return sablono.core.form_to37429.cljs$core$IFn$_invoke$arity$variadic(G__37431,seq37430__$1);
});

sablono.core.form_to = sablono.core.wrap_attrs.call(null,sablono.core.form_to37429);

//# sourceMappingURL=core.js.map?rel=1449460875693