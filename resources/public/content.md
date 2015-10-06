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
<div class="caption">__Quick Look__ at indentation-driven editing:</div>
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

## Indentation

Since we can _skim_ code with indentation, why not _sketch_ code with
indentation as well?

This can be done by treating right-parens at the end of a line as _eager to
move_.  That is, eager to extend to indented lines.  We _dim_ them in the
editor to signify this mobility.

<div>
<div class="caption">__Indent__ to influence the structure of your code:</div>
<textarea id="code-idea-nest">
</textarea>
</div>

<div>
<div class="caption">__Indent further__ to reach different thresholds:</div>
<textarea id="code-idea-wide-nest">
</textarea>
</div>

<div>
<div class="caption">__Indent multiple lines__ to see its effect:</div>
<textarea id="code-idea-deep-nest">
</textarea>
</div>

## How it works

The transformation performed by the editor is _very straightforward_.  It is an
idempotent function of the input text which:

- removes all right-parens at the end of a line (except those behind the cursor, more on that later)
- inserts new right-parens based purely on left-parens and indentation
- also removes any unmatched, dangling right-parens.

These simple rules lead to some really interesting consequences not wholly
related to indentation. It somehow simplifies other editing tasks...

## General Editing

<div>
<div class="caption">__Insert/delete/comment a line__ without rearranging the pile of parens:</div>
<textarea id="code-idea-insert-delete">
</textarea>
</div>

<div>
<div class="caption">__Left-parens extend to end of line__ by default allowing simple paredit wrapping/splicing:</div>
<textarea id="code-idea-paredit">
</textarea>
</div>

<div>
<div class="caption">__Remove/insert right-parens inside a line__ for simple paredit slurping/barfing:</div>
<textarea id="code-idea-paredit">
</textarea>
</div>

<div>
<div class="caption">__Inserting quotes__ is made simple by design. Just close them and your parens are rebalanced:</div>
<textarea id="code-idea-string">
</textarea>
</div>

## Significance of the cursor

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
