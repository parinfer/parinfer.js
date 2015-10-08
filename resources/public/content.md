# par<em>infer</em>

 <p class="subtitle">
an experiment to <em>simplify how we write Lisp</em> by:
</p>

  <ul class="features">
<li> affecting structure through indentation
<li> allowing [paredit]-like features without memorizing hotkeys
<li> naturally keeping your code properly formatted
</ul>

 <div>
<div class="caption">__Quick Look__ at the current implementation in [CodeMirror]:</div>
<textarea id="code-intro">
</textarea>
</div>

## Background

In Lisp, parentheses tend to bunch together at the end of a line. This
[convention] can be jarring at first if you are used to curly braces in other
languages being on their own lines:

[convention]:https://en.wikipedia.org/wiki/Indent_style#Lisp_style

 <div class="two-col">
<div class="col">
<div class="caption">__Lisp Style__ indentation:</div>
<textarea id="code-lisp-style" rows="5">
(defn foo [a b]
  (let [x (+ a b)]
    (println "The sum is" x)))
</textarea>
</div>

<div class="col">
<div class="caption">__C Style__ indentation:</div>
<textarea id="code-c-style">
(defn foo [a b]
  (let [
     x (+ a b)
    ]
    (println "The sum is" x)
  )
)
</textarea>
</div>
</div>

But the convention in Lisp favors high information density, while still
employing an indentation style not unlike Python for readability.  Indentation
allows you to _skim_ while the parens allow you to _inspect_.  It's natural in
this way to choose the resolution at which to view your code:

 <div class="two-col">
<div class="col">
<div class="caption">__Skim__ by focusing on indentation</div>
<textarea id="code-skim">
(defn foo [a b]
  (let [x (+ a b)]
    (println "The sum is" x)))
</textarea>
</div>

<div class="col">
<div class="caption">__Inspect__ parens with your cursor when needed</div>
<textarea id="code-inspect">
(defn foo [a b]
  (let [x (+ a b)]
    (println "The sum is" x)))
</textarea>
</div>
</div>

It is the balance of these two views that gives us readability without causing
structural ambiguity.

## Indentation: the Holy Grail

Since we can _skim_ code with indentation, is it possible to _sketch_ code with
indentation as well?
[Many][sweet-expressions]
[have][i-expressions]
[tried][indent-clj]
by creating alternative syntaxes, removing parens to varying degrees.

But perhaps we can __keep the parens__ and just allow our editor to move them
around appropriately when we adjust indentation in our code.

_Parinfer_ is a proof-of-concept that we use to explore this idea.  It treats
the right-parens at the end of a line as _eager to move_.  That is, eager to
extend to indented lines.  As a visual cue, we _dim_ these parens to signify
their inferred mobility.

As you might already be thinking, there are some other ramifications that we
will discuss later.  For now, here are some working examples:

<div class="interact">
<i class="fa fa-keyboard-o fa-lg"></i>
__Try it!__ Interrupt the animations below to try it for yourself. Click outside to restore it.
</div>

<div>
<div class="caption">__Indent__ to influence the structure of your code:</div>
<textarea id="code-indent">
</textarea>
</div>

<div>
<div class="caption">__Indent further__ to reach different thresholds:</div>
<textarea id="code-indent-far">
</textarea>
</div>

<div>
<div class="caption">__Indent multiple lines__ to see its effect:</div>
<textarea id="code-indent-multi">
</textarea>
</div>

You can select multiple lines and adjust their indentation the standard way using
the controls below.  If you are familiar with paredit, these operations are
roughly equivalent to those listed.

 <table class="paredit-table">
<tr>
<th>controls</th>
<th>description</th>
<th>[paredit] equivalent?</th>
</tr>
<tr>
<td><kbd class="light">Tab</kbd></td>
<td>indent line(s)</td>
<td>slurp line(s) down</td>
</tr>
<tr>
<td><kbd class="light">Shift</kbd> + <kbd class="light">Tab</kbd></td>
<td>dedent line(s)</td>
<td>barf line(s) down</td>
</tr>
</table>

### Some Interesting Consequences

<div>
<div class="caption">__Insert or delete a line__ without rearranging parens:</div>
<textarea id="code-line">
</textarea>
</div>

<div>
<div class="caption">__Comment a line__ without rearranging parens:</div>
<textarea id="code-comment">
</textarea>
</div>

## How it works

Everytime the user types something in the editor, we perform the following steps:

1. remove all right-parens at the end of each line
  - except those appearing behind the cursor (details later)
2. for every resulting unmatched left-paren:
  - insert a right-paren at the end of its line or its last non-empty indented line

<div class="interact">
<i class="fa fa-keyboard-o fa-lg"></i>
__Try it!__ Edit the code below on the left to see how parens are inferred on the right.
</div>

 <div class="two-col">
<div class="col">
<div class="caption">__Input:__ Right-parens removed from end of each line. Notice the ones inside are untouched.</div>
<textarea id="code-how-input">
(defn on-click [
  (swap! s update-in [:x] inc

(defn component
  "a hiccup style component.
  second line of docstring."
  [image-source
  [:div
   (if image-source
     [:img {:src image-source
            :on-click on-click
     [:span "no image"
   (for [[i msg] (indexed messages
     [:div {:style {:color (color i
      msg
</textarea>
</div>

<div class="col">
<div class="caption">__Output:__ Right-parens (highlighted) are reinserted based purely on indentation.</div>
<textarea id="code-how-output">
</textarea>
</div>
</div>

> __As an aside__, I first considered whether it would be practical to just
> write code in the syntax on the left since it encodes all the structural
> information while eliminating piles of parentheses.  But we are trying to
> create a tool for the original syntax.  And perhaps...
> 
> <a class="img-link" href="https://xkcd.com/859/"><img src="https://imgs.xkcd.com/comics/(.png"></img></a>

In addition to the indentation features previously illustrated, this system has
additional implications on how we interact with our Lisp code.  We will explore
them Socratically.

### Question #1: Couldn't this break existing code?

Yes, by definition of this process, code will be restructured if it is not
indented correctly.

There may be a way to use a preprocessor to correct indentation when opening an
existing file.  A full-fledged pretty-printer would technically work, but I
think correcting indentation line-by-line may be sufficient and less
destructive of the author's inlining choices.

### Question #2: What happens when inserting parens?

<div>
<div class="caption">__Wrap__ by inserting a left-paren. It will enclose as far as indentation allows:</div>
<textarea id="code-wrap">
</textarea>
</div>

<div>
<div class="caption">__Shorten__ by inserting a right-paren before another:</div>
<textarea id="code-barf">
</textarea>
</div>

### Question #3: What happens when deleting parens?

<div>
<div class="caption">__Splice__ by removing a left-paren, since unmatched right-parens are removed:</div>
<textarea id="code-splice">
</textarea>
</div>

<div>
<div class="caption">__Extend__ by deleting a right-paren inside a line.</div>
<textarea id="code-slurp">
</textarea>
</div>

### Question #4: Why are right-parens behind the cursor not processed?

_Parinfer_ does this to give your cursor some leeway.  It waits to displace the
parens behind your cursor until it is sure you are not trying to type anything
in front of them. Just move your cursor away (to another line or behind the
parens) when you're done.

<div>
<div class="caption">__Paren displaced__ when your cursor moves to another line, due to indentation.</div>
<textarea id="code-displaced">
</textarea>
</div>

<div>
<div class="caption">__Paren not displaced__ since you were given the chance to block it. (paren not at end of line)</div>
<textarea id="code-not-displaced">
</textarea>
</div>

### Question #5: What happens when I type a quote?

<div>
<div class="caption">__Quote__ insertion allows temporary paren imbalances until quote is closed:</div>
<textarea id="code-string">
</textarea>
</div>

## Try it

<textarea id="code-try">
</textarea>

## Prior Art

There are many ideas related to this concept.

- [paredit] - structural editing and auto-balancing of Lisp text
- [Haml], [Slim], and [Jade] - indented HTML templating langs that are really close to indented lisps
- [Haskell's $ operator] - infers a closing paren at the end of its line
- [sweet-expressions], [i-expressions], and [indent-clj] - infers both left and right parens
- [Flense] and [Plastic] - structural editing concepts for Clojure text
- [clojure-validate-indent] - validates indentation of Clojure code
- [The Clojure Style Guide] - indentation conventions in Clojure

## Source Code

This presentation and proof-of-concept is implemented using ClojureScript and
the [CodeMirror] editor.  Code is available on Github:

<http://github.com/shaunlebron/parinfer>


[Haml]:http://haml.info/
[Slim]:http://slim-lang.com/
[Jade]:http://jade-lang.com/
[Haskell's $ operator]:http://learnyouahaskell.com/higher-order-functions#function-application
[paredit]:http://danmidwood.com/content/2014/11/21/animated-paredit.html
[sweet-expressions]:http://readable.sourceforge.net/
[i-expressions]:http://srfi.schemers.org/srfi-49/srfi-49.html
[indent-clj]:https://github.com/boxed/indent-clj
[Flense]:https://github.com/mkremins/flense
[Plastic]:https://github.com/darwin/plastic
[clojure-validate-indent]:https://github.com/boxed/clojure-validate-indent
[The Clojure Style Guide]:https://github.com/bbatsov/clojure-style-guide#source-code-layout--organization
[CodeMirror]:https://codemirror.net/
