# par<em>infer</em>

 <p class="subtitle">
an editor feature concept to <em>simplify how we write Lisp</em>
</p>

  <ul class="features">
<li> Affect structure through indentation.
<li> Results in [paredit]-like features without memorizing hotkeys.
<li> Naturally keep your code properly formatted.
</ul>

[paredit]:http://danmidwood.com/content/2014/11/21/animated-paredit.html

 <div>
<div class="caption">__Quick Look__ at a new way to write/edit Lisp:</div>
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

## Editing with Indentation

Since we can _skim_ code with indentation, why not _sketch_ code with
indentation as well?

_Parinfer_ allows you to do this by treating right-parens at the end of a line
as _eager to move_.  That is, eager to extend to indented lines.  We _dim_ them
in the editor to signify their inferred mobility.

<div class="interact">
<img src="img/brain.png">
__Try it!__ Interrupt the animations below to try it for yourself.<br>
Click outside to restore the animated example.
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

If you are familiar with [paredit], these indent/dedent operations can
be considered line-based slurp/barf operations, respectively.

## How it works

The transformation performed by _Parinfer_ is straightforward.  After every
text change, the full text is fed through a pure, idempotent function which:

- removes any unmatched right-parens inside a line
- indiscriminately removes all right-parens at the end of each line
  - except those appearing on the left side of the cursor (see cursor section)
- for every resulting unmatched left-paren...
  - inserts a right-paren at the end of its line or its last non-empty indented line

This enables some noteworthy editing features that we will discuss next.

## New Editing Primitives

Aside from enabling indentation-based editing, there are other consequences of
this editing system which form a new set of editing primitives.  All can be
performed without special hotkeys.

<div>
<div class="caption">__Insert or delete a line__ without rearranging parens:</div>
<textarea id="code-insert-delete">
</textarea>
</div>

<div>
<div class="caption">__Comment a line__ without rearranging parens:</div>
<textarea id="code-comment">
</textarea>
</div>

<div>
<div class="caption">__Wrap__ by inserting a left-paren. It will enclose as far as indentation allows:</div>
<textarea id="code-wrap">
</textarea>
</div>

<div>
<div class="caption">__Splice__ by removing a left-paren, since unmatched right-parens are removed:</div>
<textarea id="code-splice">
</textarea>
</div>

<div>
<div class="caption">__Inline "Barf-right"__ by inserting a right-paren before another:</div>
<textarea id="code-barf">
</textarea>
</div>

<div>
<div class="caption">__Inline "Slurp-right"__ by deleting a right-paren inside a line.</div>
<textarea id="code-slurp">
</textarea>
</div>

<div>
<div class="caption">__Quote__ insertion allows temporary paren imbalances until quote is closed:</div>
<textarea id="code-string">
</textarea>
</div>

If you are interested in other [paredit] operations, I think they can either be
accomplished as some composition of these aforementioned primitives, or
just implemented through special hotkeys.

## What the Cursor can and cannot do

_Parinfer_ gives your cursor some leeway.  It waits to diplace the parens
behind your cursor until it is sure you are not trying to type anything in
front of them. Just move your cursor away (to another line or behind the
parens) when you're done.

<div>
<div class="caption"></div>
<textarea id="code-cursor-insert">
</textarea>
</div>

<div>
<div class="caption"></div>
<textarea id="code-cursor-rebalance">
</textarea>
</div>

Also, in any of the previous examples, you will notice that _Parinfer_ imposes
some restrictions on what you can type:

- cannot type unmatched right-parens (since they are immediately removed)
- cannot delete inferred right-parens (since they are immediately reinserted)

## Try It

<textarea id="code-try">
</textarea>
