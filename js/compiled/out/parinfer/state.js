// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer.state');
goog.require('cljs.core');
if(typeof parinfer.state.state !== 'undefined'){
} else {
parinfer.state.state = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
parinfer.state.empty_editor_state = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"text","text",-1790561697),"",new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"infer","infer",-403321830),new cljs.core.Keyword(null,"cm","cm",540591536),null,new cljs.core.Keyword(null,"watcher","watcher",2145165251),null], null);

//# sourceMappingURL=state.js.map?rel=1445823441156