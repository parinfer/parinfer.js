// Compiled by ClojureScript 1.7.122 {}
goog.provide('sablono.interpreter');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('sablono.util');
goog.require('goog.object');
goog.require('cljsjs.react');

/**
 * @interface
 */
sablono.interpreter.IInterpreter = function(){};

/**
 * Interpret a Clojure data structure as a React fn call.
 */
sablono.interpreter.interpret = (function sablono$interpreter$interpret(this$){
if((!((this$ == null))) && (!((this$.sablono$interpreter$IInterpreter$interpret$arity$1 == null)))){
return this$.sablono$interpreter$IInterpreter$interpret$arity$1(this$);
} else {
var x__16922__auto__ = (((this$ == null))?null:this$);
var m__16923__auto__ = (sablono.interpreter.interpret[goog.typeOf(x__16922__auto__)]);
if(!((m__16923__auto__ == null))){
return m__16923__auto__.call(null,this$);
} else {
var m__16923__auto____$1 = (sablono.interpreter.interpret["_"]);
if(!((m__16923__auto____$1 == null))){
return m__16923__auto____$1.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"IInterpreter.interpret",this$);
}
}
}
});

sablono.interpreter.wrap_form_element = (function sablono$interpreter$wrap_form_element(ctor,display_name){
return React.createFactory(React.createClass(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"getDisplayName","getDisplayName",1324429466),(function (){
return cljs.core.name.call(null,display_name);
}),new cljs.core.Keyword(null,"getInitialState","getInitialState",1541760916),(function (){
var this$ = this;
return cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),(this$.props["value"])], null));
}),new cljs.core.Keyword(null,"onChange","onChange",-312891301),(function (e){
var this$ = this;
var handler = (this$.props["onChange"]);
if((handler == null)){
return null;
} else {
handler.call(null,e);

return this$.setState(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),e.target.value], null)));
}
}),new cljs.core.Keyword(null,"componentWillReceiveProps","componentWillReceiveProps",559988974),(function (new_props){
var this$ = this;
return this$.setState(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),(new_props["value"])], null)));
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function (){
var this$ = this;
var props = cljs.core.clj__GT_js.call(null,cljs.core.PersistentArrayMap.EMPTY);
goog.object.extend(props,this$.props,cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),(this$.state["value"]),new cljs.core.Keyword(null,"onChange","onChange",-312891301),(this$["onChange"]),new cljs.core.Keyword(null,"children","children",-940561982),(this$.props["children"])], null)));

return ctor.call(null,props);
})], null))));
});
sablono.interpreter.input = sablono.interpreter.wrap_form_element.call(null,React.DOM.input,"input");
sablono.interpreter.option = sablono.interpreter.wrap_form_element.call(null,React.DOM.option,"option");
sablono.interpreter.textarea = sablono.interpreter.wrap_form_element.call(null,React.DOM.textarea,"textarea");
sablono.interpreter.create_element = (function sablono$interpreter$create_element(var_args){
var args__17332__auto__ = [];
var len__17325__auto___27110 = arguments.length;
var i__17326__auto___27111 = (0);
while(true){
if((i__17326__auto___27111 < len__17325__auto___27110)){
args__17332__auto__.push((arguments[i__17326__auto___27111]));

var G__27112 = (i__17326__auto___27111 + (1));
i__17326__auto___27111 = G__27112;
continue;
} else {
}
break;
}

var argseq__17333__auto__ = ((((2) < args__17332__auto__.length))?(new cljs.core.IndexedSeq(args__17332__auto__.slice((2)),(0))):null);
return sablono.interpreter.create_element.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__17333__auto__);
});

sablono.interpreter.create_element.cljs$core$IFn$_invoke$arity$variadic = (function (type,props,children){
return (cljs.core.truth_(sablono.util.wrapped_type_QMARK_.call(null,type))?cljs.core.get.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"input","input",556931961),sablono.interpreter.input,new cljs.core.Keyword(null,"option","option",65132272),sablono.interpreter.option,new cljs.core.Keyword(null,"textarea","textarea",-650375824),sablono.interpreter.textarea], null),cljs.core.keyword.call(null,type)):cljs.core.partial.call(null,React.createElement,cljs.core.name.call(null,type))).call(null,props,(((cljs.core.sequential_QMARK_.call(null,children)) && (cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,children))))?cljs.core.first.call(null,children):children));
});

sablono.interpreter.create_element.cljs$lang$maxFixedArity = (2);

sablono.interpreter.create_element.cljs$lang$applyTo = (function (seq27107){
var G__27108 = cljs.core.first.call(null,seq27107);
var seq27107__$1 = cljs.core.next.call(null,seq27107);
var G__27109 = cljs.core.first.call(null,seq27107__$1);
var seq27107__$2 = cljs.core.next.call(null,seq27107__$1);
return sablono.interpreter.create_element.cljs$core$IFn$_invoke$arity$variadic(G__27108,G__27109,seq27107__$2);
});
sablono.interpreter.attributes = (function sablono$interpreter$attributes(attrs){
var attrs__$1 = cljs.core.clj__GT_js.call(null,sablono.util.html_to_dom_attrs.call(null,attrs));
var class$ = attrs__$1.className;
var class$__$1 = ((cljs.core.array_QMARK_.call(null,class$))?clojure.string.join.call(null," ",class$):class$);
if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,class$__$1))){
delete attrs__$1["className"];
} else {
attrs__$1.className = class$__$1;
}

return attrs__$1;
});
/**
 * Render an element vector as a HTML element.
 */
sablono.interpreter.element = (function sablono$interpreter$element(element__$1){
var vec__27114 = sablono.util.normalize_element.call(null,element__$1);
var type = cljs.core.nth.call(null,vec__27114,(0),null);
var attrs = cljs.core.nth.call(null,vec__27114,(1),null);
var content = cljs.core.nth.call(null,vec__27114,(2),null);
var js_attrs = sablono.interpreter.attributes.call(null,attrs);
if((cljs.core.sequential_QMARK_.call(null,content)) && (cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,content)))){
return sablono.interpreter.create_element.call(null,type,js_attrs,sablono.interpreter.interpret.call(null,cljs.core.first.call(null,content)));
} else {
if(cljs.core.truth_(content)){
return sablono.interpreter.create_element.call(null,type,js_attrs,sablono.interpreter.interpret.call(null,content));
} else {
return sablono.interpreter.create_element.call(null,type,js_attrs,null);

}
}
});
sablono.interpreter.interpret_seq = (function sablono$interpreter$interpret_seq(s){
return cljs.core.into_array.call(null,cljs.core.map.call(null,sablono.interpreter.interpret,s));
});
cljs.core.Cons.prototype.sablono$interpreter$IInterpreter$ = true;

cljs.core.Cons.prototype.sablono$interpreter$IInterpreter$interpret$arity$1 = (function (this$){
var this$__$1 = this;
return sablono.interpreter.interpret_seq.call(null,this$__$1);
});

cljs.core.ChunkedSeq.prototype.sablono$interpreter$IInterpreter$ = true;

cljs.core.ChunkedSeq.prototype.sablono$interpreter$IInterpreter$interpret$arity$1 = (function (this$){
var this$__$1 = this;
return sablono.interpreter.interpret_seq.call(null,this$__$1);
});

cljs.core.LazySeq.prototype.sablono$interpreter$IInterpreter$ = true;

cljs.core.LazySeq.prototype.sablono$interpreter$IInterpreter$interpret$arity$1 = (function (this$){
var this$__$1 = this;
return sablono.interpreter.interpret_seq.call(null,this$__$1);
});

cljs.core.List.prototype.sablono$interpreter$IInterpreter$ = true;

cljs.core.List.prototype.sablono$interpreter$IInterpreter$interpret$arity$1 = (function (this$){
var this$__$1 = this;
return sablono.interpreter.interpret_seq.call(null,this$__$1);
});

cljs.core.IndexedSeq.prototype.sablono$interpreter$IInterpreter$ = true;

cljs.core.IndexedSeq.prototype.sablono$interpreter$IInterpreter$interpret$arity$1 = (function (this$){
var this$__$1 = this;
return sablono.interpreter.interpret_seq.call(null,this$__$1);
});

cljs.core.Subvec.prototype.sablono$interpreter$IInterpreter$ = true;

cljs.core.Subvec.prototype.sablono$interpreter$IInterpreter$interpret$arity$1 = (function (this$){
var this$__$1 = this;
return sablono.interpreter.element.call(null,this$__$1);
});

cljs.core.PersistentVector.prototype.sablono$interpreter$IInterpreter$ = true;

cljs.core.PersistentVector.prototype.sablono$interpreter$IInterpreter$interpret$arity$1 = (function (this$){
var this$__$1 = this;
return sablono.interpreter.element.call(null,this$__$1);
});

(sablono.interpreter.IInterpreter["_"] = true);

(sablono.interpreter.interpret["_"] = (function (this$){
return this$;
}));

(sablono.interpreter.IInterpreter["null"] = true);

(sablono.interpreter.interpret["null"] = (function (this$){
return null;
}));

//# sourceMappingURL=interpreter.js.map?rel=1450835345940