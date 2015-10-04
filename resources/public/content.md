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

Similar to the way that we quickly _skim_ code by using its indentation, I
believe that we should be able to quickly _sketch_ code using indentation as
well.  Here's how that might look:

<textarea id="code-idea1">
(defn foo [a b])
(+ a b) ;; <-- insert space at front
</textarea>

What you see above is the editor allowing you to influence the structure of
your code based on indentation. Here's another example with deeper nesting:

<textarea id="code-idea2">
(defn component []
  (html)
  [:div.container]
  [:h1 "title"])
</textarea>

As a side effect, this makes it easy for us to insert/delete a line without
rearranging the pile of parens:

<textarea id="code-idea3">
(defn component []
  (html
   [:div.container
    [:h1 "title"]]))
    |  <-- start inserting here, then remove it
</textarea>

I think the key here is that we are writing/editing code without explicitly
managing where our parentheses close.  As a result, our code remains
properly formatted.

## Try It

<textarea id="code-try">
</textarea>
