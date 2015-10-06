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

## The idea

Since we can _skim_ code with indentation, why not _sketch_ code with indentation as well?

<div>
<div class="caption">__Indent__ to influence the structure of your code:</div>
<textarea id="code-idea-nest">
(defn foo [a b])
(+ a b) ;; <-- insert space at front
</textarea>
</div>

<div>
<div class="caption">__Indent further__ to reach different thresholds:</div>
<textarea id="code-idea-wide-nest">
(let [m {:foo 1}])
   |
</textarea>
</div>

<div>
<div class="caption">__Indent multiple lines__ to see its effect:</div>
<textarea id="code-idea-deep-nest">
(defn component []
  (html)
  [:div {:style {:background "#FFF"
                 :color "#000"}]
  [:h1 "title"])
</textarea>
</div>

<div>
<div class="caption">__Insert/delete/comment a line__ without rearranging the pile of parens:</div>
<textarea id="code-idea-insert-delete">
(defn component []
  (html
   [:div.container
    [:h1 "title"]]))
    |  <-- start inserting here
    |  <-- insert another, then delete
</textarea>
</div>

## A Visual Cue for Special Cases

Parens will _dim_ if they can react to indentation (i.e. parens grouped at the end of a line.)

<div>
<div class="caption">__Watch for dimming__ of the parens at the end of a line:</div>
<textarea id="code-cue-dim">
(defn foo [a b] ret)  blocker
</textarea>
</div>

<div>
<div class="caption">__`blocker`__ prevents the indentation-based structuring that you might expect:</div>
<textarea id="code-cue-block">
(defn foo []) blocker
  |ret
</textarea>
</div>

<div>
<div class="caption">__Comments don't block__ of course:</div>
<textarea id="code-cue-comment">
(defn foo []  ; a comment will not interfere
  |ret
</textarea>
</div>

<div>
<div class="caption">__Your cursor will block__ in case you want to type a blocker:</div>
<textarea id="code-cue-cursor">
(defn foo []| type here
  ret
</textarea>
</div>

## Try It

<textarea id="code-try">
</textarea>
