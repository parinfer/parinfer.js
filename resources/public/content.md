# Par<em>infer</em>

 <p class="subtitle">
a theory on how to <em>simplify the way we write Lisp</em> by:
</p>

  <ul class="features">
<li> affecting structure through indentation
<li> allowing [Paredit]-like features without memorizing hotkeys
<li> naturally keeping your code properly formatted
</ul>

<div id="xkcd">
<a href="https://xkcd.com/312/"><img src="img/xkcd-frost.png"></a>
</div>

<div id="toc"></div>

## Quick Look

If you are familiar with Lisp, here's what it looks like to rapidly restructure
your code by just indenting.  Click to play around with it if you're curious.
Details ahead.

<textarea id="code-intro"> </textarea>

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

> __When I say "parens"__ (parentheses), I also mean _[square]_ or _{curly}_
> brackets.  Some Lisps (e.g. [Racket], [Clojure]) use these extra delimiters
> to help visually separate certain constructs.

[Racket]:http://racket-lang.org/
[Clojure]:http://clojure.org/

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
the close-parens at the end of a line as _eager to move_.  That is, eager to
extend to indented lines.  As a visual cue, we _dim_ these parens to signify
their inferred mobility.

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
the controls below.  If you are familiar with Paredit, these operations are
roughly equivalent to those listed.

 <table class="paredit-table">
<tr>
<th>controls</th>
<th>description</th>
<th>[Paredit] equivalent?</th>
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

We perform the following steps to rearrange parens based on indentation.<br>
<span class="side-point">We will refer to these later as rules #1, #2, and #3.
(See the [mathematical basis] for a closer look at why these rules work.)</span>

1. all unmatched close-parens are removed (for housekeeping)
2. all close-parens at the start and end of each line are removed
3. for every resulting unmatched open-paren:
  - a close-paren is inserted at the end of its line or its last non-empty indented line

<div class="interact">
<i class="fa fa-keyboard-o fa-lg"></i>
__Try it!__ Edit the code below on the left to see how parens are inferred on the right.
</div>

 <div class="two-col">
<div class="col">
<div class="caption">__Input:__ Close-parens removed from end of each line. Notice the ones inside are untouched.</div>
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
<div class="caption">__Output:__ Close-parens (highlighted) are reinserted based purely on indentation.</div>
<textarea id="code-how-output">
</textarea>
</div>
</div>

Notice that the code on the left encodes all structural information while
eliminating piles of parentheses.  This is essentially how _Parinfer_ sees your
code.  It _infers_ the rest.

There are more steps performed that you can [read about in detail][formatter-details], but
we will just explore their effects in the next section.

[formatter-details]:https://github.com/shaunlebron/parinfer/blob/master/doc/formatter-details.md

## Cause and Effect: Typing

You should be aware that the steps in the previous section have an effect on
what you type.  Interestingly, these effects translate into four of the main
[Paredit] operations.

 <table class="paredit-table light-keys">
<tr>
<th align="right">Cause</th>
<th align="center">Effect</th>
<th align="left">Description</th>
</tr>

<tr>
<td align="right">Insert <kbd>(</kbd></td>
<td align="center">Wrap</td>
<td align="left">
inserts a matching <kbd>)</kbd> as far as it can
<div class="side-point">
i.e. "wraps" all possible elements to the right of your cursor
</div>
</td>
</tr>

<tr>
<td align="right">Insert <kbd>)</kbd></td>
<td align="center">Barf</td>
<td align="left">
removes the original <kbd>)</kbd> when inserted inside a matching pair
<div class="side-point">
i.e. the current list "barfs" out all elements to the right of your cursor
</div>
</td>
</tr>

<tr>
<td align="right">Delete <kbd>(</kbd></td>
<td align="center">Splice</td>
<td align="left">
removes the matching <kbd>)</kbd>
<div class="side-point">
i.e. "splices" the current list into its parent (or simply "unwraps" it)
</div>
</td>
</tr>

<tr>
<td align="right">Delete <kbd>)</kbd></td>
<td align="center">Slurp</td>
<td align="left">
inserts another <kbd>)</kbd> as far as it can
<div class="side-point">
i.e. the current list "slurps" all elements to the right of your cursor
</div>
</td>
</tr>

</table>

<div class="interact">
<i class="fa fa-keyboard-o fa-lg"></i>
__Try it!__ Interrupt the animations below to try it for yourself. Click outside to restore it.
</div>

### Inserting Parens

<div>
<div class="caption">__Wrap__ by inserting a open-paren. It will auto-close as far as it can, due to rule #3.</div>
<textarea id="code-wrap">
</textarea>
</div>

<div>
<div class="caption">__Barf__ by inserting a close-paren before another.
Notice the original is removed, due to rule #1.</div>
<textarea id="code-barf">
</textarea>
</div>

<div class="caption">
<div class="question">
<i class="fa fa-question-circle"></i>
Why can't I insert a close-paren in certain places?
</div>
<div class="answer">Its corresponding open-paren must be there first. (see rule #1)</div>
</div>

### Deleting Parens

<div>
<div class="caption">__Splice__ by removing a open-paren. Its corresponding close-paren is removed, due to rule #1.</div>
<textarea id="code-splice">
</textarea>
</div>

<div>
<div class="caption">__Slurp__ by deleting a close-paren inside a line. It is replaced further down, due to rule #3.</div>
<textarea id="code-slurp">
</textarea>
</div>

<div class="caption">
<div class="question">
<i class="fa fa-question-circle"></i>
Why can't I delete a close-paren in certain places?
</div>
<div class="answer">You cannot delete an inferred close-paren. It is replaced as soon as you delete it. (see rule #3)</div>
</div>

### Knowing When Parens Move

As a courtesy, _Parinfer_ will not move your parens until you are done typing
in front of them.  Just move your cursor away when you're done.  A helpful
analogy might be to think of your cursor as a _paperweight_ that keeps your
parens from blowing away.

<div>
<div class="caption">__Paren displaced__ when your cursor moves to another line. (displaced due to indentation)</div>
<textarea id="code-displaced">
</textarea>
</div>

<div>
<div class="caption">__Paren not displaced__ since you were given the chance to block it. (paren not at end of line)</div>
<textarea id="code-not-displaced">
</textarea>
</div>

### Inserting Quotes

_Parinfer_ cannot infer anything about quote positions like it can with parens.
So it doesn't try to do anything special with them, other than abandon
processing if imbalanced quotes are detected.

<div>
<div class="caption">__Quote__ insertion allows temporary paren imbalances until quote is closed:</div>
<textarea id="code-string">
</textarea>
</div>

<div class="warning"> 
<div class="warning-title">
<i class="fa fa-lg fa-warning"></i>
WARNING: Always make sure quotes are balanced when inside comments!
</div>
<div class="warning-body">
If there is an unclosed quote before a comment, which itself contains
imbalanced quotes, they will balance each other out and fool _Parinfer_ into
thinking it is okay for processing.
</div>
</div>

 <div class="two-col">
<div class="col">
<div class="caption">
<i class="fa fa-lg fa-times red"></i>
__BAD:__ An unclosed string in a comment can cause corrupted strings.
</div>
<textarea id="code-warn-bad">
</textarea>
</div>

<div class="col">
<div class="caption">
<i class="fa fa-lg fa-check green"></i>
__GOOD__: Balance the quotes in the comment to prevent the problem.
</div>
<textarea id="code-warn-good">
</textarea>
</div>
</div>

### Pressing Enter

Pressing enter will result in your cursor moving to an auto-indented line, as
expected.  Just keep in mind that the inferred parens won't move until you
actually type something on the new line.

<div>
<div class="caption">
__Watch where the cursor is__ when pressing Enter. Inferred parens not displaced until typing. (rule #2)
</div>
<textarea id="code-enter">
</textarea>
</div>

## Safe Mode

The job of _Parinfer_ thus far has been to look at indentation as an _intention
to correct parens_.  We retroactively categorize all previously described
features to be under "Infer Mode."

It is sometimes useful to use a "Safe Mode" instead.  This mode safely enforces
indentation boundaries based on parens.   This is done by treating parens, rather
than indentation, as the source of truth when formatting your code.

To also make indentation changes within these boundaries reversible, we also
maintain relative indentation of child elements inside moved expressions.

<div>
<div class="caption">__Safely tune indentation__ without worrying about crossing a paren boundary:</div>
<textarea id="code-safe-tune">
</textarea>
</div>

<div>
<div class="caption">__Safely avoid fracturing__ an expression when pushing parens forward:</div>
<textarea id="code-safe-frac">
</textarea>
</div>

<div>
<div class="caption">__Safely comment__ a whole expression too:</div>
<textarea id="code-safe-comment">
</textarea>
</div>

### How it works

Safe Mode performs the following steps:

1. Move close-parens at the start of a line to the end of the previous non-empty line.
1. Clamp the indentation of a line to the following range:
  - min: x-position of the parent open-paren (if it exists)
  - max: x-position of the open-paren belonging to the previous non-empty line's last close-paren
1. Child elements of moved expressions should maintain their original relative indentation to them.
1. Cancel processing if there are any unmatched parens.

### Safely quarantine paren imbalances

If there are paren imbalances in Safe Mode, the code is not processed, and you
are prevented from switching to Infer Mode.  This safely quarantines the
imbalances that could be misinterpreted in Infer Mode.  Thus, Safe Mode gives
you an environment to fix them, after which the code is automatically formatted
and ready for Infer Mode should you choose to switch.

### Safely open existing files

We must take parens literally when opening an existing file, so we run it
through Safe Mode before trying to switch to Infer Mode.

<div class="interact">
<i class="fa fa-keyboard-o fa-lg"></i>
__Try it!__ Edit the code below on the left to see how it is formatted on the right.
</div>

 <div class="two-col">
<div class="col">
<div class="caption">__Input:__ Any existing file. Must be correctly balanced, but can be incorrectly formatted.</div>
<textarea id="code-edit-input">
(defn foo
  ([a]
    (foo a 1))
  ([a b]
    (let [sum (+ a b)
          prod (* a b)
          result { ; gather vals
            :sum sum
            :prod prod
          }]
      result)
    ; TODO: something
    ))
</textarea>
</div>

<div class="col">
<div class="caption">__Output:__ Made ready for Parinfer by correcting indentation and moving close-parens.</div>
<textarea id="code-edit-output">
</textarea>
</div>
</div>

Notice that this process is NOT an invasive pretty-printer.  It preserves as
much as it can of the original code, only moving close-parens and changing
indentation.

_Parinfer_ should remain in Safe Mode if the file cannot be processed, due
to the reasons stated in the previous section.

## Final Thoughts

Regardless of how we choose to edit our Lisp code, there seems to always be a
balancing act between maintaining the simplicity of how we interact with the
editor and accepting some editor complexity to gain automation over these
powerful but numerous parens.

I don't yet know how well _Parinfer_ will play this balancing act since it does
not currently exist in a form that I can use in my day-to-day work.  But the
interactive examples have allowed me to explore, explain, and implement these
concepts in CodeMirror. The _real test_ will come when implemented in a major
editor.

### Benefits

Inferring parentheses based on indentation seems to lead to simpler editing
mechanics for Lisp code.  It leads to a system that keeps our code formatted
well. And it allows us to use paredit-like features without hotkeys.

I think the biggest win is its potential to quell fear of managing end-of-line
parens by enforcing a direct driving relationship with indentation.

And just like _Paredit_ it maintains paren-balanced code.

### Downsides

The rules for what happens when inserting/deleting parens must be learned.
Also, the case necessitating a "Safe Mode" comes at the cost of forcing the
user to understand when and how to switch editing modes.

Also, the preprocessor step performed when opening files will cause more
formatting-related changes in your commit history when collaborating with
others not using _Parinfer_.

## Source Code

The text formatting code is implemented in portable Clojure/ClojureScript.  The
editor demos are created in CodeMirror with hooks to apply our formatters and
update cursor position.

<i class="fa fa-lg fa-code-fork"></i> <http://github.com/shaunlebron/parinfer>

## Prior Art

There are many ideas related to this concept.

- [paredit] - structural editing and auto-balancing of Lisp text
- [Haml], [Slim], and [Jade] - indented HTML templating langs (close to indented lisps)
- [Haskell's $ operator] - infers a closing paren after all expressions to the right
- [sweet-expressions], [i-expressions], and [indent-clj] - infers both left and right parens
- [Flense] and [Plastic] - structural editing concepts for Clojure text
- [clojure-validate-indent] - validates indentation of Clojure code
- [The Clojure Style Guide] - indentation conventions in Clojure

<footer>
by [@shaunlebron](http://twitter.com/shaunlebron)
</footer>

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
