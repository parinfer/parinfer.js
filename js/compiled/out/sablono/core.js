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
var G__26841__delegate = function (args){
if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,args))){
var vec__26840 = cljs.core.apply.call(null,func,cljs.core.rest.call(null,args));
var tag = cljs.core.nth.call(null,vec__26840,(0),null);
var body = cljs.core.nthnext.call(null,vec__26840,(1));
if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,body))){
return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.merge.call(null,cljs.core.first.call(null,body),cljs.core.first.call(null,args)),cljs.core.rest.call(null,body));
} else {
return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.first.call(null,args),body);
}
} else {
return cljs.core.apply.call(null,func,args);
}
};
var G__26841 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__26842__i = 0, G__26842__a = new Array(arguments.length -  0);
while (G__26842__i < G__26842__a.length) {G__26842__a[G__26842__i] = arguments[G__26842__i + 0]; ++G__26842__i;}
  args = new cljs.core.IndexedSeq(G__26842__a,0);
} 
return G__26841__delegate.call(this,args);};
G__26841.cljs$lang$maxFixedArity = 0;
G__26841.cljs$lang$applyTo = (function (arglist__26843){
var args = cljs.core.seq(arglist__26843);
return G__26841__delegate(args);
});
G__26841.cljs$core$IFn$_invoke$arity$variadic = G__26841__delegate;
return G__26841;
})()
;
});
sablono.core.update_arglists = (function sablono$core$update_arglists(arglists){
var iter__17039__auto__ = (function sablono$core$update_arglists_$_iter__26848(s__26849){
return (new cljs.core.LazySeq(null,(function (){
var s__26849__$1 = s__26849;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__26849__$1);
if(temp__4425__auto__){
var s__26849__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__26849__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__26849__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__26851 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__26850 = (0);
while(true){
if((i__26850 < size__17038__auto__)){
var args = cljs.core._nth.call(null,c__17037__auto__,i__26850);
cljs.core.chunk_append.call(null,b__26851,cljs.core.vec.call(null,cljs.core.cons.call(null,new cljs.core.Symbol(null,"attr-map?","attr-map?",116307443,null),args)));

var G__26852 = (i__26850 + (1));
i__26850 = G__26852;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26851),sablono$core$update_arglists_$_iter__26848.call(null,cljs.core.chunk_rest.call(null,s__26849__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26851),null);
}
} else {
var args = cljs.core.first.call(null,s__26849__$2);
return cljs.core.cons.call(null,cljs.core.vec.call(null,cljs.core.cons.call(null,new cljs.core.Symbol(null,"attr-map?","attr-map?",116307443,null),args)),sablono$core$update_arglists_$_iter__26848.call(null,cljs.core.rest.call(null,s__26849__$2)));
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
var len__17325__auto___26858 = arguments.length;
var i__17326__auto___26859 = (0);
while(true){
if((i__17326__auto___26859 < len__17325__auto___26858)){
args__17332__auto__.push((arguments[i__17326__auto___26859]));

var G__26860 = (i__17326__auto___26859 + (1));
i__17326__auto___26859 = G__26860;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((0) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((0)),(0))):null);
return sablono.core.include_css.cljs$core$IFn$_invoke$arity$variadic(argseq__17333__auto__);
});

sablono.core.include_css.cljs$core$IFn$_invoke$arity$variadic = (function (styles){
var iter__17039__auto__ = (function sablono$core$iter__26854(s__26855){
return (new cljs.core.LazySeq(null,(function (){
var s__26855__$1 = s__26855;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__26855__$1);
if(temp__4425__auto__){
var s__26855__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__26855__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__26855__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__26857 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__26856 = (0);
while(true){
if((i__26856 < size__17038__auto__)){
var style = cljs.core._nth.call(null,c__17037__auto__,i__26856);
cljs.core.chunk_append.call(null,b__26857,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",-1769163468),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text/css",new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,style),new cljs.core.Keyword(null,"rel","rel",1378823488),"stylesheet"], null)], null));

var G__26861 = (i__26856 + (1));
i__26856 = G__26861;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26857),sablono$core$iter__26854.call(null,cljs.core.chunk_rest.call(null,s__26855__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26857),null);
}
} else {
var style = cljs.core.first.call(null,s__26855__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",-1769163468),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text/css",new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,style),new cljs.core.Keyword(null,"rel","rel",1378823488),"stylesheet"], null)], null),sablono$core$iter__26854.call(null,cljs.core.rest.call(null,s__26855__$2)));
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

sablono.core.include_css.cljs$lang$applyTo = (function (seq26853){
return sablono.core.include_css.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq26853));
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
sablono.core.link_to26862 = (function sablono$core$link_to26862(var_args){
var args__17332__auto__ = [];
var len__17325__auto___26865 = arguments.length;
var i__17326__auto___26866 = (0);
while(true){
if((i__17326__auto___26866 < len__17325__auto___26865)){
args__17332__auto__.push((arguments[i__17326__auto___26866]));

var G__26867 = (i__17326__auto___26866 + (1));
i__17326__auto___26866 = G__26867;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return sablono.core.link_to26862.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

sablono.core.link_to26862.cljs$core$IFn$_invoke$arity$variadic = (function (url,content){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,url)], null),content], null);
});

sablono.core.link_to26862.cljs$lang$maxFixedArity = (1);

sablono.core.link_to26862.cljs$lang$applyTo = (function (seq26863){
var G__26864 = cljs.core.first.call(null,seq26863);
var seq26863__$1 = cljs.core.next.call(null,seq26863);
return sablono.core.link_to26862.cljs$core$IFn$_invoke$arity$variadic(G__26864,seq26863__$1);
});

sablono.core.link_to = sablono.core.wrap_attrs.call(null,sablono.core.link_to26862);
/**
 * Wraps some content in a HTML hyperlink with the supplied e-mail
 *   address. If no content provided use the e-mail address as content.
 */
sablono.core.mail_to26868 = (function sablono$core$mail_to26868(var_args){
var args__17332__auto__ = [];
var len__17325__auto___26873 = arguments.length;
var i__17326__auto___26874 = (0);
while(true){
if((i__17326__auto___26874 < len__17325__auto___26873)){
args__17332__auto__.push((arguments[i__17326__auto___26874]));

var G__26875 = (i__17326__auto___26874 + (1));
i__17326__auto___26874 = G__26875;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return sablono.core.mail_to26868.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

sablono.core.mail_to26868.cljs$core$IFn$_invoke$arity$variadic = (function (e_mail,p__26871){
var vec__26872 = p__26871;
var content = cljs.core.nth.call(null,vec__26872,(0),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),[cljs.core.str("mailto:"),cljs.core.str(e_mail)].join('')], null),(function (){var or__16267__auto__ = content;
if(cljs.core.truth_(or__16267__auto__)){
return or__16267__auto__;
} else {
return e_mail;
}
})()], null);
});

sablono.core.mail_to26868.cljs$lang$maxFixedArity = (1);

sablono.core.mail_to26868.cljs$lang$applyTo = (function (seq26869){
var G__26870 = cljs.core.first.call(null,seq26869);
var seq26869__$1 = cljs.core.next.call(null,seq26869);
return sablono.core.mail_to26868.cljs$core$IFn$_invoke$arity$variadic(G__26870,seq26869__$1);
});

sablono.core.mail_to = sablono.core.wrap_attrs.call(null,sablono.core.mail_to26868);
/**
 * Wrap a collection in an unordered list.
 */
sablono.core.unordered_list26876 = (function sablono$core$unordered_list26876(coll){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__17039__auto__ = (function sablono$core$unordered_list26876_$_iter__26881(s__26882){
return (new cljs.core.LazySeq(null,(function (){
var s__26882__$1 = s__26882;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__26882__$1);
if(temp__4425__auto__){
var s__26882__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__26882__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__26882__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__26884 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__26883 = (0);
while(true){
if((i__26883 < size__17038__auto__)){
var x = cljs.core._nth.call(null,c__17037__auto__,i__26883);
cljs.core.chunk_append.call(null,b__26884,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null));

var G__26885 = (i__26883 + (1));
i__26883 = G__26885;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26884),sablono$core$unordered_list26876_$_iter__26881.call(null,cljs.core.chunk_rest.call(null,s__26882__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26884),null);
}
} else {
var x = cljs.core.first.call(null,s__26882__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null),sablono$core$unordered_list26876_$_iter__26881.call(null,cljs.core.rest.call(null,s__26882__$2)));
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

sablono.core.unordered_list = sablono.core.wrap_attrs.call(null,sablono.core.unordered_list26876);
/**
 * Wrap a collection in an ordered list.
 */
sablono.core.ordered_list26886 = (function sablono$core$ordered_list26886(coll){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ol","ol",932524051),(function (){var iter__17039__auto__ = (function sablono$core$ordered_list26886_$_iter__26891(s__26892){
return (new cljs.core.LazySeq(null,(function (){
var s__26892__$1 = s__26892;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__26892__$1);
if(temp__4425__auto__){
var s__26892__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__26892__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__26892__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__26894 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__26893 = (0);
while(true){
if((i__26893 < size__17038__auto__)){
var x = cljs.core._nth.call(null,c__17037__auto__,i__26893);
cljs.core.chunk_append.call(null,b__26894,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null));

var G__26895 = (i__26893 + (1));
i__26893 = G__26895;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26894),sablono$core$ordered_list26886_$_iter__26891.call(null,cljs.core.chunk_rest.call(null,s__26892__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__26894),null);
}
} else {
var x = cljs.core.first.call(null,s__26892__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null),sablono$core$ordered_list26886_$_iter__26891.call(null,cljs.core.rest.call(null,s__26892__$2)));
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

sablono.core.ordered_list = sablono.core.wrap_attrs.call(null,sablono.core.ordered_list26886);
/**
 * Create an image element.
 */
sablono.core.image26896 = (function sablono$core$image26896(var_args){
var args26897 = [];
var len__17325__auto___26900 = arguments.length;
var i__17326__auto___26901 = (0);
while(true){
if((i__17326__auto___26901 < len__17325__auto___26900)){
args26897.push((arguments[i__17326__auto___26901]));

var G__26902 = (i__17326__auto___26901 + (1));
i__17326__auto___26901 = G__26902;
continue;
} else {
}
break;
}

var G__26899 = args26897.length;
switch (G__26899) {
case 1:
return sablono.core.image26896.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.image26896.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26897.length)].join('')));

}
});

sablono.core.image26896.cljs$core$IFn$_invoke$arity$1 = (function (src){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),sablono.util.as_str.call(null,src)], null)], null);
});

sablono.core.image26896.cljs$core$IFn$_invoke$arity$2 = (function (src,alt){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),sablono.util.as_str.call(null,src),new cljs.core.Keyword(null,"alt","alt",-3214426),alt], null)], null);
});

sablono.core.image26896.cljs$lang$maxFixedArity = 2;

sablono.core.image = sablono.core.wrap_attrs.call(null,sablono.core.image26896);
sablono.core._STAR_group_STAR_ = cljs.core.PersistentVector.EMPTY;
/**
 * Create a field name from the supplied argument the current field group.
 */
sablono.core.make_name = (function sablono$core$make_name(name){
return cljs.core.reduce.call(null,(function (p1__26904_SHARP_,p2__26905_SHARP_){
return [cljs.core.str(p1__26904_SHARP_),cljs.core.str("["),cljs.core.str(p2__26905_SHARP_),cljs.core.str("]")].join('');
}),cljs.core.conj.call(null,sablono.core._STAR_group_STAR_,sablono.util.as_str.call(null,name)));
});
/**
 * Create a field id from the supplied argument and current field group.
 */
sablono.core.make_id = (function sablono$core$make_id(name){
return cljs.core.reduce.call(null,(function (p1__26906_SHARP_,p2__26907_SHARP_){
return [cljs.core.str(p1__26906_SHARP_),cljs.core.str("-"),cljs.core.str(p2__26907_SHARP_)].join('');
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
sablono.core.color_field26908 = (function sablono$core$color_field26908(var_args){
var args26909 = [];
var len__17325__auto___26976 = arguments.length;
var i__17326__auto___26977 = (0);
while(true){
if((i__17326__auto___26977 < len__17325__auto___26976)){
args26909.push((arguments[i__17326__auto___26977]));

var G__26978 = (i__17326__auto___26977 + (1));
i__17326__auto___26977 = G__26978;
continue;
} else {
}
break;
}

var G__26911 = args26909.length;
switch (G__26911) {
case 1:
return sablono.core.color_field26908.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.color_field26908.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26909.length)].join('')));

}
});

sablono.core.color_field26908.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.color_field26908.call(null,name__18795__auto__,null);
});

sablono.core.color_field26908.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"color","color",-1642760596,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.color_field26908.cljs$lang$maxFixedArity = 2;

sablono.core.color_field = sablono.core.wrap_attrs.call(null,sablono.core.color_field26908);

/**
 * Creates a date input field.
 */
sablono.core.date_field26912 = (function sablono$core$date_field26912(var_args){
var args26913 = [];
var len__17325__auto___26980 = arguments.length;
var i__17326__auto___26981 = (0);
while(true){
if((i__17326__auto___26981 < len__17325__auto___26980)){
args26913.push((arguments[i__17326__auto___26981]));

var G__26982 = (i__17326__auto___26981 + (1));
i__17326__auto___26981 = G__26982;
continue;
} else {
}
break;
}

var G__26915 = args26913.length;
switch (G__26915) {
case 1:
return sablono.core.date_field26912.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.date_field26912.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26913.length)].join('')));

}
});

sablono.core.date_field26912.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.date_field26912.call(null,name__18795__auto__,null);
});

sablono.core.date_field26912.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"date","date",177097065,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.date_field26912.cljs$lang$maxFixedArity = 2;

sablono.core.date_field = sablono.core.wrap_attrs.call(null,sablono.core.date_field26912);

/**
 * Creates a datetime input field.
 */
sablono.core.datetime_field26916 = (function sablono$core$datetime_field26916(var_args){
var args26917 = [];
var len__17325__auto___26984 = arguments.length;
var i__17326__auto___26985 = (0);
while(true){
if((i__17326__auto___26985 < len__17325__auto___26984)){
args26917.push((arguments[i__17326__auto___26985]));

var G__26986 = (i__17326__auto___26985 + (1));
i__17326__auto___26985 = G__26986;
continue;
} else {
}
break;
}

var G__26919 = args26917.length;
switch (G__26919) {
case 1:
return sablono.core.datetime_field26916.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.datetime_field26916.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26917.length)].join('')));

}
});

sablono.core.datetime_field26916.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.datetime_field26916.call(null,name__18795__auto__,null);
});

sablono.core.datetime_field26916.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"datetime","datetime",2135207229,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.datetime_field26916.cljs$lang$maxFixedArity = 2;

sablono.core.datetime_field = sablono.core.wrap_attrs.call(null,sablono.core.datetime_field26916);

/**
 * Creates a datetime-local input field.
 */
sablono.core.datetime_local_field26920 = (function sablono$core$datetime_local_field26920(var_args){
var args26921 = [];
var len__17325__auto___26988 = arguments.length;
var i__17326__auto___26989 = (0);
while(true){
if((i__17326__auto___26989 < len__17325__auto___26988)){
args26921.push((arguments[i__17326__auto___26989]));

var G__26990 = (i__17326__auto___26989 + (1));
i__17326__auto___26989 = G__26990;
continue;
} else {
}
break;
}

var G__26923 = args26921.length;
switch (G__26923) {
case 1:
return sablono.core.datetime_local_field26920.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.datetime_local_field26920.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26921.length)].join('')));

}
});

sablono.core.datetime_local_field26920.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.datetime_local_field26920.call(null,name__18795__auto__,null);
});

sablono.core.datetime_local_field26920.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"datetime-local","datetime-local",-507312697,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.datetime_local_field26920.cljs$lang$maxFixedArity = 2;

sablono.core.datetime_local_field = sablono.core.wrap_attrs.call(null,sablono.core.datetime_local_field26920);

/**
 * Creates a email input field.
 */
sablono.core.email_field26924 = (function sablono$core$email_field26924(var_args){
var args26925 = [];
var len__17325__auto___26992 = arguments.length;
var i__17326__auto___26993 = (0);
while(true){
if((i__17326__auto___26993 < len__17325__auto___26992)){
args26925.push((arguments[i__17326__auto___26993]));

var G__26994 = (i__17326__auto___26993 + (1));
i__17326__auto___26993 = G__26994;
continue;
} else {
}
break;
}

var G__26927 = args26925.length;
switch (G__26927) {
case 1:
return sablono.core.email_field26924.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.email_field26924.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26925.length)].join('')));

}
});

sablono.core.email_field26924.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.email_field26924.call(null,name__18795__auto__,null);
});

sablono.core.email_field26924.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"email","email",-1238619063,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.email_field26924.cljs$lang$maxFixedArity = 2;

sablono.core.email_field = sablono.core.wrap_attrs.call(null,sablono.core.email_field26924);

/**
 * Creates a file input field.
 */
sablono.core.file_field26928 = (function sablono$core$file_field26928(var_args){
var args26929 = [];
var len__17325__auto___26996 = arguments.length;
var i__17326__auto___26997 = (0);
while(true){
if((i__17326__auto___26997 < len__17325__auto___26996)){
args26929.push((arguments[i__17326__auto___26997]));

var G__26998 = (i__17326__auto___26997 + (1));
i__17326__auto___26997 = G__26998;
continue;
} else {
}
break;
}

var G__26931 = args26929.length;
switch (G__26931) {
case 1:
return sablono.core.file_field26928.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.file_field26928.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26929.length)].join('')));

}
});

sablono.core.file_field26928.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.file_field26928.call(null,name__18795__auto__,null);
});

sablono.core.file_field26928.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"file","file",370885649,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.file_field26928.cljs$lang$maxFixedArity = 2;

sablono.core.file_field = sablono.core.wrap_attrs.call(null,sablono.core.file_field26928);

/**
 * Creates a hidden input field.
 */
sablono.core.hidden_field26932 = (function sablono$core$hidden_field26932(var_args){
var args26933 = [];
var len__17325__auto___27000 = arguments.length;
var i__17326__auto___27001 = (0);
while(true){
if((i__17326__auto___27001 < len__17325__auto___27000)){
args26933.push((arguments[i__17326__auto___27001]));

var G__27002 = (i__17326__auto___27001 + (1));
i__17326__auto___27001 = G__27002;
continue;
} else {
}
break;
}

var G__26935 = args26933.length;
switch (G__26935) {
case 1:
return sablono.core.hidden_field26932.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.hidden_field26932.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26933.length)].join('')));

}
});

sablono.core.hidden_field26932.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.hidden_field26932.call(null,name__18795__auto__,null);
});

sablono.core.hidden_field26932.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"hidden","hidden",1328025435,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.hidden_field26932.cljs$lang$maxFixedArity = 2;

sablono.core.hidden_field = sablono.core.wrap_attrs.call(null,sablono.core.hidden_field26932);

/**
 * Creates a month input field.
 */
sablono.core.month_field26936 = (function sablono$core$month_field26936(var_args){
var args26937 = [];
var len__17325__auto___27004 = arguments.length;
var i__17326__auto___27005 = (0);
while(true){
if((i__17326__auto___27005 < len__17325__auto___27004)){
args26937.push((arguments[i__17326__auto___27005]));

var G__27006 = (i__17326__auto___27005 + (1));
i__17326__auto___27005 = G__27006;
continue;
} else {
}
break;
}

var G__26939 = args26937.length;
switch (G__26939) {
case 1:
return sablono.core.month_field26936.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.month_field26936.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26937.length)].join('')));

}
});

sablono.core.month_field26936.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.month_field26936.call(null,name__18795__auto__,null);
});

sablono.core.month_field26936.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"month","month",-319717006,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.month_field26936.cljs$lang$maxFixedArity = 2;

sablono.core.month_field = sablono.core.wrap_attrs.call(null,sablono.core.month_field26936);

/**
 * Creates a number input field.
 */
sablono.core.number_field26940 = (function sablono$core$number_field26940(var_args){
var args26941 = [];
var len__17325__auto___27008 = arguments.length;
var i__17326__auto___27009 = (0);
while(true){
if((i__17326__auto___27009 < len__17325__auto___27008)){
args26941.push((arguments[i__17326__auto___27009]));

var G__27010 = (i__17326__auto___27009 + (1));
i__17326__auto___27009 = G__27010;
continue;
} else {
}
break;
}

var G__26943 = args26941.length;
switch (G__26943) {
case 1:
return sablono.core.number_field26940.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.number_field26940.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26941.length)].join('')));

}
});

sablono.core.number_field26940.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.number_field26940.call(null,name__18795__auto__,null);
});

sablono.core.number_field26940.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"number","number",-1084057331,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.number_field26940.cljs$lang$maxFixedArity = 2;

sablono.core.number_field = sablono.core.wrap_attrs.call(null,sablono.core.number_field26940);

/**
 * Creates a password input field.
 */
sablono.core.password_field26944 = (function sablono$core$password_field26944(var_args){
var args26945 = [];
var len__17325__auto___27012 = arguments.length;
var i__17326__auto___27013 = (0);
while(true){
if((i__17326__auto___27013 < len__17325__auto___27012)){
args26945.push((arguments[i__17326__auto___27013]));

var G__27014 = (i__17326__auto___27013 + (1));
i__17326__auto___27013 = G__27014;
continue;
} else {
}
break;
}

var G__26947 = args26945.length;
switch (G__26947) {
case 1:
return sablono.core.password_field26944.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.password_field26944.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26945.length)].join('')));

}
});

sablono.core.password_field26944.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.password_field26944.call(null,name__18795__auto__,null);
});

sablono.core.password_field26944.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"password","password",2057553998,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.password_field26944.cljs$lang$maxFixedArity = 2;

sablono.core.password_field = sablono.core.wrap_attrs.call(null,sablono.core.password_field26944);

/**
 * Creates a range input field.
 */
sablono.core.range_field26948 = (function sablono$core$range_field26948(var_args){
var args26949 = [];
var len__17325__auto___27016 = arguments.length;
var i__17326__auto___27017 = (0);
while(true){
if((i__17326__auto___27017 < len__17325__auto___27016)){
args26949.push((arguments[i__17326__auto___27017]));

var G__27018 = (i__17326__auto___27017 + (1));
i__17326__auto___27017 = G__27018;
continue;
} else {
}
break;
}

var G__26951 = args26949.length;
switch (G__26951) {
case 1:
return sablono.core.range_field26948.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.range_field26948.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26949.length)].join('')));

}
});

sablono.core.range_field26948.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.range_field26948.call(null,name__18795__auto__,null);
});

sablono.core.range_field26948.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"range","range",-1014743483,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.range_field26948.cljs$lang$maxFixedArity = 2;

sablono.core.range_field = sablono.core.wrap_attrs.call(null,sablono.core.range_field26948);

/**
 * Creates a search input field.
 */
sablono.core.search_field26952 = (function sablono$core$search_field26952(var_args){
var args26953 = [];
var len__17325__auto___27020 = arguments.length;
var i__17326__auto___27021 = (0);
while(true){
if((i__17326__auto___27021 < len__17325__auto___27020)){
args26953.push((arguments[i__17326__auto___27021]));

var G__27022 = (i__17326__auto___27021 + (1));
i__17326__auto___27021 = G__27022;
continue;
} else {
}
break;
}

var G__26955 = args26953.length;
switch (G__26955) {
case 1:
return sablono.core.search_field26952.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.search_field26952.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26953.length)].join('')));

}
});

sablono.core.search_field26952.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.search_field26952.call(null,name__18795__auto__,null);
});

sablono.core.search_field26952.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"search","search",-1089495947,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.search_field26952.cljs$lang$maxFixedArity = 2;

sablono.core.search_field = sablono.core.wrap_attrs.call(null,sablono.core.search_field26952);

/**
 * Creates a tel input field.
 */
sablono.core.tel_field26956 = (function sablono$core$tel_field26956(var_args){
var args26957 = [];
var len__17325__auto___27024 = arguments.length;
var i__17326__auto___27025 = (0);
while(true){
if((i__17326__auto___27025 < len__17325__auto___27024)){
args26957.push((arguments[i__17326__auto___27025]));

var G__27026 = (i__17326__auto___27025 + (1));
i__17326__auto___27025 = G__27026;
continue;
} else {
}
break;
}

var G__26959 = args26957.length;
switch (G__26959) {
case 1:
return sablono.core.tel_field26956.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.tel_field26956.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26957.length)].join('')));

}
});

sablono.core.tel_field26956.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.tel_field26956.call(null,name__18795__auto__,null);
});

sablono.core.tel_field26956.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"tel","tel",1864669686,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.tel_field26956.cljs$lang$maxFixedArity = 2;

sablono.core.tel_field = sablono.core.wrap_attrs.call(null,sablono.core.tel_field26956);

/**
 * Creates a text input field.
 */
sablono.core.text_field26960 = (function sablono$core$text_field26960(var_args){
var args26961 = [];
var len__17325__auto___27028 = arguments.length;
var i__17326__auto___27029 = (0);
while(true){
if((i__17326__auto___27029 < len__17325__auto___27028)){
args26961.push((arguments[i__17326__auto___27029]));

var G__27030 = (i__17326__auto___27029 + (1));
i__17326__auto___27029 = G__27030;
continue;
} else {
}
break;
}

var G__26963 = args26961.length;
switch (G__26963) {
case 1:
return sablono.core.text_field26960.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.text_field26960.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26961.length)].join('')));

}
});

sablono.core.text_field26960.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.text_field26960.call(null,name__18795__auto__,null);
});

sablono.core.text_field26960.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"text","text",-150030170,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.text_field26960.cljs$lang$maxFixedArity = 2;

sablono.core.text_field = sablono.core.wrap_attrs.call(null,sablono.core.text_field26960);

/**
 * Creates a time input field.
 */
sablono.core.time_field26964 = (function sablono$core$time_field26964(var_args){
var args26965 = [];
var len__17325__auto___27032 = arguments.length;
var i__17326__auto___27033 = (0);
while(true){
if((i__17326__auto___27033 < len__17325__auto___27032)){
args26965.push((arguments[i__17326__auto___27033]));

var G__27034 = (i__17326__auto___27033 + (1));
i__17326__auto___27033 = G__27034;
continue;
} else {
}
break;
}

var G__26967 = args26965.length;
switch (G__26967) {
case 1:
return sablono.core.time_field26964.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.time_field26964.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26965.length)].join('')));

}
});

sablono.core.time_field26964.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.time_field26964.call(null,name__18795__auto__,null);
});

sablono.core.time_field26964.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"time","time",-1268547887,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.time_field26964.cljs$lang$maxFixedArity = 2;

sablono.core.time_field = sablono.core.wrap_attrs.call(null,sablono.core.time_field26964);

/**
 * Creates a url input field.
 */
sablono.core.url_field26968 = (function sablono$core$url_field26968(var_args){
var args26969 = [];
var len__17325__auto___27036 = arguments.length;
var i__17326__auto___27037 = (0);
while(true){
if((i__17326__auto___27037 < len__17325__auto___27036)){
args26969.push((arguments[i__17326__auto___27037]));

var G__27038 = (i__17326__auto___27037 + (1));
i__17326__auto___27037 = G__27038;
continue;
} else {
}
break;
}

var G__26971 = args26969.length;
switch (G__26971) {
case 1:
return sablono.core.url_field26968.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.url_field26968.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26969.length)].join('')));

}
});

sablono.core.url_field26968.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.url_field26968.call(null,name__18795__auto__,null);
});

sablono.core.url_field26968.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"url","url",1916828573,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.url_field26968.cljs$lang$maxFixedArity = 2;

sablono.core.url_field = sablono.core.wrap_attrs.call(null,sablono.core.url_field26968);

/**
 * Creates a week input field.
 */
sablono.core.week_field26972 = (function sablono$core$week_field26972(var_args){
var args26973 = [];
var len__17325__auto___27040 = arguments.length;
var i__17326__auto___27041 = (0);
while(true){
if((i__17326__auto___27041 < len__17325__auto___27040)){
args26973.push((arguments[i__17326__auto___27041]));

var G__27042 = (i__17326__auto___27041 + (1));
i__17326__auto___27041 = G__27042;
continue;
} else {
}
break;
}

var G__26975 = args26973.length;
switch (G__26975) {
case 1:
return sablono.core.week_field26972.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.week_field26972.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26973.length)].join('')));

}
});

sablono.core.week_field26972.cljs$core$IFn$_invoke$arity$1 = (function (name__18795__auto__){
return sablono.core.week_field26972.call(null,name__18795__auto__,null);
});

sablono.core.week_field26972.cljs$core$IFn$_invoke$arity$2 = (function (name__18795__auto__,value__18796__auto__){
return sablono.core.input_field_STAR_.call(null,[cljs.core.str(new cljs.core.Symbol(null,"week","week",314058249,null))].join(''),name__18795__auto__,value__18796__auto__);
});

sablono.core.week_field26972.cljs$lang$maxFixedArity = 2;

sablono.core.week_field = sablono.core.wrap_attrs.call(null,sablono.core.week_field26972);
sablono.core.file_upload = sablono.core.file_field;
/**
 * Creates a check box.
 */
sablono.core.check_box27044 = (function sablono$core$check_box27044(var_args){
var args27045 = [];
var len__17325__auto___27048 = arguments.length;
var i__17326__auto___27049 = (0);
while(true){
if((i__17326__auto___27049 < len__17325__auto___27048)){
args27045.push((arguments[i__17326__auto___27049]));

var G__27050 = (i__17326__auto___27049 + (1));
i__17326__auto___27049 = G__27050;
continue;
} else {
}
break;
}

var G__27047 = args27045.length;
switch (G__27047) {
case 1:
return sablono.core.check_box27044.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.check_box27044.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return sablono.core.check_box27044.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27045.length)].join('')));

}
});

sablono.core.check_box27044.cljs$core$IFn$_invoke$arity$1 = (function (name){
return sablono.core.check_box27044.call(null,name,null);
});

sablono.core.check_box27044.cljs$core$IFn$_invoke$arity$2 = (function (name,checked_QMARK_){
return sablono.core.check_box27044.call(null,name,checked_QMARK_,"true");
});

sablono.core.check_box27044.cljs$core$IFn$_invoke$arity$3 = (function (name,checked_QMARK_,value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"checkbox",new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"checked","checked",-50955819),checked_QMARK_], null)], null);
});

sablono.core.check_box27044.cljs$lang$maxFixedArity = 3;

sablono.core.check_box = sablono.core.wrap_attrs.call(null,sablono.core.check_box27044);
/**
 * Creates a radio button.
 */
sablono.core.radio_button27052 = (function sablono$core$radio_button27052(var_args){
var args27053 = [];
var len__17325__auto___27056 = arguments.length;
var i__17326__auto___27057 = (0);
while(true){
if((i__17326__auto___27057 < len__17325__auto___27056)){
args27053.push((arguments[i__17326__auto___27057]));

var G__27058 = (i__17326__auto___27057 + (1));
i__17326__auto___27057 = G__27058;
continue;
} else {
}
break;
}

var G__27055 = args27053.length;
switch (G__27055) {
case 1:
return sablono.core.radio_button27052.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.radio_button27052.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return sablono.core.radio_button27052.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27053.length)].join('')));

}
});

sablono.core.radio_button27052.cljs$core$IFn$_invoke$arity$1 = (function (group){
return sablono.core.radio_button27052.call(null,group,null);
});

sablono.core.radio_button27052.cljs$core$IFn$_invoke$arity$2 = (function (group,checked_QMARK_){
return sablono.core.radio_button27052.call(null,group,checked_QMARK_,"true");
});

sablono.core.radio_button27052.cljs$core$IFn$_invoke$arity$3 = (function (group,checked_QMARK_,value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"radio",new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,group),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,[cljs.core.str(sablono.util.as_str.call(null,group)),cljs.core.str("-"),cljs.core.str(sablono.util.as_str.call(null,value))].join('')),new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"checked","checked",-50955819),checked_QMARK_], null)], null);
});

sablono.core.radio_button27052.cljs$lang$maxFixedArity = 3;

sablono.core.radio_button = sablono.core.wrap_attrs.call(null,sablono.core.radio_button27052);
sablono.core.hash_key = (function sablono$core$hash_key(x){
return goog.string.hashCode(cljs.core.pr_str.call(null,x));
});
/**
 * Creates a seq of option tags from a collection.
 */
sablono.core.select_options27060 = (function sablono$core$select_options27060(coll){
var iter__17039__auto__ = (function sablono$core$select_options27060_$_iter__27069(s__27070){
return (new cljs.core.LazySeq(null,(function (){
var s__27070__$1 = s__27070;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__27070__$1);
if(temp__4425__auto__){
var s__27070__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__27070__$2)){
var c__17037__auto__ = cljs.core.chunk_first.call(null,s__27070__$2);
var size__17038__auto__ = cljs.core.count.call(null,c__17037__auto__);
var b__27072 = cljs.core.chunk_buffer.call(null,size__17038__auto__);
if((function (){var i__27071 = (0);
while(true){
if((i__27071 < size__17038__auto__)){
var x = cljs.core._nth.call(null,c__17037__auto__,i__27071);
cljs.core.chunk_append.call(null,b__27072,((cljs.core.sequential_QMARK_.call(null,x))?(function (){var vec__27075 = x;
var text = cljs.core.nth.call(null,vec__27075,(0),null);
var val = cljs.core.nth.call(null,vec__27075,(1),null);
var disabled_QMARK_ = cljs.core.nth.call(null,vec__27075,(2),null);
var disabled_QMARK___$1 = cljs.core.boolean$.call(null,disabled_QMARK_);
if(cljs.core.sequential_QMARK_.call(null,val)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",1738282218),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,text),new cljs.core.Keyword(null,"label","label",1718410804),text], null),sablono$core$select_options27060.call(null,val)], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),disabled_QMARK___$1,new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,val),new cljs.core.Keyword(null,"value","value",305978217),val], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,x),new cljs.core.Keyword(null,"value","value",305978217),x], null),x], null)));

var G__27077 = (i__27071 + (1));
i__27071 = G__27077;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__27072),sablono$core$select_options27060_$_iter__27069.call(null,cljs.core.chunk_rest.call(null,s__27070__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__27072),null);
}
} else {
var x = cljs.core.first.call(null,s__27070__$2);
return cljs.core.cons.call(null,((cljs.core.sequential_QMARK_.call(null,x))?(function (){var vec__27076 = x;
var text = cljs.core.nth.call(null,vec__27076,(0),null);
var val = cljs.core.nth.call(null,vec__27076,(1),null);
var disabled_QMARK_ = cljs.core.nth.call(null,vec__27076,(2),null);
var disabled_QMARK___$1 = cljs.core.boolean$.call(null,disabled_QMARK_);
if(cljs.core.sequential_QMARK_.call(null,val)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",1738282218),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,text),new cljs.core.Keyword(null,"label","label",1718410804),text], null),sablono$core$select_options27060.call(null,val)], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),disabled_QMARK___$1,new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,val),new cljs.core.Keyword(null,"value","value",305978217),val], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),sablono.core.hash_key.call(null,x),new cljs.core.Keyword(null,"value","value",305978217),x], null),x], null)),sablono$core$select_options27060_$_iter__27069.call(null,cljs.core.rest.call(null,s__27070__$2)));
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

sablono.core.select_options = sablono.core.wrap_attrs.call(null,sablono.core.select_options27060);
/**
 * Creates a drop-down box using the <select> tag.
 */
sablono.core.drop_down27078 = (function sablono$core$drop_down27078(var_args){
var args27079 = [];
var len__17325__auto___27082 = arguments.length;
var i__17326__auto___27083 = (0);
while(true){
if((i__17326__auto___27083 < len__17325__auto___27082)){
args27079.push((arguments[i__17326__auto___27083]));

var G__27084 = (i__17326__auto___27083 + (1));
i__17326__auto___27083 = G__27084;
continue;
} else {
}
break;
}

var G__27081 = args27079.length;
switch (G__27081) {
case 2:
return sablono.core.drop_down27078.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return sablono.core.drop_down27078.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27079.length)].join('')));

}
});

sablono.core.drop_down27078.cljs$core$IFn$_invoke$arity$2 = (function (name,options){
return sablono.core.drop_down27078.call(null,name,options,null);
});

sablono.core.drop_down27078.cljs$core$IFn$_invoke$arity$3 = (function (name,options,selected){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name)], null),sablono.core.select_options.call(null,options,selected)], null);
});

sablono.core.drop_down27078.cljs$lang$maxFixedArity = 3;

sablono.core.drop_down = sablono.core.wrap_attrs.call(null,sablono.core.drop_down27078);
/**
 * Creates a text area element.
 */
sablono.core.text_area27086 = (function sablono$core$text_area27086(var_args){
var args27087 = [];
var len__17325__auto___27090 = arguments.length;
var i__17326__auto___27091 = (0);
while(true){
if((i__17326__auto___27091 < len__17325__auto___27090)){
args27087.push((arguments[i__17326__auto___27091]));

var G__27092 = (i__17326__auto___27091 + (1));
i__17326__auto___27091 = G__27092;
continue;
} else {
}
break;
}

var G__27089 = args27087.length;
switch (G__27089) {
case 1:
return sablono.core.text_area27086.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sablono.core.text_area27086.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27087.length)].join('')));

}
});

sablono.core.text_area27086.cljs$core$IFn$_invoke$arity$1 = (function (name){
return sablono.core.text_area27086.call(null,name,null);
});

sablono.core.text_area27086.cljs$core$IFn$_invoke$arity$2 = (function (name,value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea","textarea",-650375824),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",305978217),value], null)], null);
});

sablono.core.text_area27086.cljs$lang$maxFixedArity = 2;

sablono.core.text_area = sablono.core.wrap_attrs.call(null,sablono.core.text_area27086);
/**
 * Creates a label for an input field with the supplied name.
 */
sablono.core.label27094 = (function sablono$core$label27094(name,text){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"htmlFor","htmlFor",-1050291720),sablono.core.make_id.call(null,name)], null),text], null);
});

sablono.core.label = sablono.core.wrap_attrs.call(null,sablono.core.label27094);
/**
 * Creates a submit button.
 */
sablono.core.submit_button27095 = (function sablono$core$submit_button27095(text){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"submit",new cljs.core.Keyword(null,"value","value",305978217),text], null)], null);
});

sablono.core.submit_button = sablono.core.wrap_attrs.call(null,sablono.core.submit_button27095);
/**
 * Creates a form reset button.
 */
sablono.core.reset_button27096 = (function sablono$core$reset_button27096(text){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"reset",new cljs.core.Keyword(null,"value","value",305978217),text], null)], null);
});

sablono.core.reset_button = sablono.core.wrap_attrs.call(null,sablono.core.reset_button27096);
/**
 * Create a form that points to a particular method and route.
 *   e.g. (form-to [:put "/post"]
 *       ...)
 */
sablono.core.form_to27097 = (function sablono$core$form_to27097(var_args){
var args__17332__auto__ = [];
var len__17325__auto___27102 = arguments.length;
var i__17326__auto___27103 = (0);
while(true){
if((i__17326__auto___27103 < len__17325__auto___27102)){
args__17332__auto__.push((arguments[i__17326__auto___27103]));

var G__27104 = (i__17326__auto___27103 + (1));
i__17326__auto___27103 = G__27104;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((1) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((1)),(0))):null);
return sablono.core.form_to27097.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17333__auto__);
});

sablono.core.form_to27097.cljs$core$IFn$_invoke$arity$variadic = (function (p__27100,body){
var vec__27101 = p__27100;
var method = cljs.core.nth.call(null,vec__27101,(0),null);
var action = cljs.core.nth.call(null,vec__27101,(1),null);
var method_str = clojure.string.upper_case.call(null,cljs.core.name.call(null,method));
var action_uri = sablono.util.to_uri.call(null,action);
return cljs.core.vec.call(null,cljs.core.concat.call(null,((cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"get","get",1683182755),null,new cljs.core.Keyword(null,"post","post",269697687),null], null), null),method))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),method_str,new cljs.core.Keyword(null,"action","action",-811238024),action_uri], null)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),"POST",new cljs.core.Keyword(null,"action","action",-811238024),action_uri], null),sablono.core.hidden_field.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(3735928559)], null),"_method",method_str)], null)),body));
});

sablono.core.form_to27097.cljs$lang$maxFixedArity = (1);

sablono.core.form_to27097.cljs$lang$applyTo = (function (seq27098){
var G__27099 = cljs.core.first.call(null,seq27098);
var seq27098__$1 = cljs.core.next.call(null,seq27098);
return sablono.core.form_to27097.cljs$core$IFn$_invoke$arity$variadic(G__27099,seq27098__$1);
});

sablono.core.form_to = sablono.core.wrap_attrs.call(null,sablono.core.form_to27097);

//# sourceMappingURL=core.js.map?rel=1450835345862