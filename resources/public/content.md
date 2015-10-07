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

This can be done by treating right-parens at the end of a line as _eager to
move_.  That is, eager to extend to indented lines.  We _dim_ them in the
editor to signify this mobility.

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

The transformation performed by the editor is straightforward.  After every
text change, the full text is fed through a pure, idempotent function which: 

- removes any unmatched right-parens inside a line
- indiscriminately removes all right-parens at the end of each line
  - except those appearing on the left side of the cursor (see cursor section)
- for every resulting unmatched left-paren...
  - inserts a right-paren at the end of its line or last following non-empty indented line

These rules accomplish indentation-based structuring, but they also simplify
many other editing tasks...

## New Editing Primitives

Aside from modifying indentation, there are other consequences of this new
system which form a new set of editing primitives.  All can be performed
without special hotkeys.

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

## Freedom of the cursor

This editing system imposes some restrictions on what your cursor can do:

- cannot type unmatched right-parens (since they are immediately removed)
- cannot delete inferred right-parens (since they are immediately reinserted)

But the transformation function takes your cursor position into account,
allowing you special freedom at the end of a line:

- matched right-parens at the end of a line are not removed when behind the cursor

To help , our transformation function also takes the cursor position as
input.

That's why right-parens are temporarily locked when behind the cursor, allowing
you to preempt subsequently indented lines.  Once you move the cursor away
from this position.

In the how section, we mentioned that right-parens at the end of a line are
not removed if they are to the left of the cursor.

preempt indented lines
Indentation should only cause the repositioning of _closing_ parens grouped at
the _end_ of a line. We want stability for parentheses inside a line, and
mobility for those at the end.

<div>
<div class="caption">__Mobile Parens will dim__ to let you know the editor can move them:</div>
<textarea id="code-cue-dim">
(defn foo [a b] ret)  blocker
</textarea>
</div>

"Blockers" are tokens that prevent closing parentheses from moving.  

<div>
<div class="caption">__Blockers__ prevent your code from changing in unintuitive ways:</div>
<textarea id="code-cue-block">
(defn foo []) blocker
  |ret
</textarea>
</div>

<div>
<div class="caption">__Your cursor is treated as a blocker__ so you have more freedom to restructure:</div>
<textarea id="code-cue-cursor">
(defn foo []| type here
  ret
</textarea>
</div>

## Try It

<textarea id="code-try">
</textarea>
