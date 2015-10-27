// Compiled by ClojureScript 1.7.122 {}
goog.provide('parinfer.format.string');
goog.require('cljs.core');
goog.require('clojure.string');
parinfer.format.string.insert_string = (function parinfer$format$string$insert_string(orig,idx,insert){
return [cljs.core.str(cljs.core.subs.call(null,orig,(0),idx)),cljs.core.str(insert),cljs.core.str(cljs.core.subs.call(null,orig,idx))].join('');
});
parinfer.format.string.remove_str_range = (function parinfer$format$string$remove_str_range(orig,start,end){
return [cljs.core.str(cljs.core.subs.call(null,orig,(0),start)),cljs.core.str(cljs.core.subs.call(null,orig,end))].join('');
});
/**
 * fix split-lines by including the last empty line.
 */
parinfer.format.string.get_lines = (function parinfer$format$string$get_lines(text){
var last_char = [cljs.core.str(cljs.core.last.call(null,text))].join('');
var G__46730 = cljs.core.vec.call(null,clojure.string.split_lines.call(null,text));
var G__46730__$1 = ((cljs.core._EQ_.call(null,"\n",last_char))?cljs.core.conj.call(null,G__46730,""):G__46730);
return G__46730__$1;
});

//# sourceMappingURL=string.js.map?rel=1445965099969