## Parinfer

Illustrating a simple editor feature
that may simplify how we write Lisp.

### TLDR

- perhaps an intuitive alternative to [paredit]
- adjust indentation to affect nesting (without hiding parens)
- a natural way to keep your code properly formatted

```
some animation up here (type out a full example)
```

[paredit]:http://danmidwood.com/content/2014/11/21/animated-paredit.html

### Background

In Lisp, parentheses tend to bunch together at the end of a line. This
[convention] can be jarring at first if you are used to curly braces in other
languages being on their own lines:

[convention]:https://en.wikipedia.org/wiki/Indent_style#Lisp_style

```
(defn foo [a b]
  (let [x (+ a b)]
    (println "The sum is" x)))
```

```
(defn foo [a b]
  (let [
     x (+ a b)
    ]
    (println "The sum is" x)
  )
)
```

But the convention in Lisp favors high information density, while still
employing an indentation style not unlike Python for readability.  Indentation
allows you to _skim_ while the parens allow you to _inspect_:

- __on skimming__: indentation creates a natural nested hierarchy (siblings aligned, children indented)
- __on inspecting__: highlight matching parens with your cursor in any editor to verify structure

It's natural to switch between these modes when reading, allowing you to choose
the resolution at which to view it.

```skimming: dim the parens
(defn foo [a b]
  (let [x (+ a b)]
    (println "The sum is" x)))
```

```inspecting: highlight the parens
(defn foo [a b]
  (let [x (+ a b)]
    (println "The sum is" x)))
```

### The idea

Similar to the way that we quickly _skim_ code by using its indentation, I
believe that we should be able to quickly _sketch_ code using indentation as
well.  Here's how that might look:

```
(defn foo [a b])
(+ a b) ;; <-- insert space at front
```

What you see above is the editor allowing you to influence the structure of
your code based on indentation. Here's another example with deeper nesting:

```
(defn component []
  (html)
  [:div.container]
  [:h1 "title"])
```

You can skip ahead to the [examples section] if you wish to see more.

[examples section]:#usage-examples

### How it works

1. open parens and indentation are the single source of truth (you control this)
  - highlight open parens and indentation in an example
2. closing parens at EOL are a function of truth (they will move as you change 1)
  - highlight closing parens in an example
  - contrast with non-trailing closers
3. closing parens that do not fall at EOL will never be moved.

1. You control these.
  - use CodeMirror's markers to mark open parens and spaces
2. We infer those.
  - use CodeMirror's markers to mark trailing delims

### How is it different?

- standard editor features?  wait to hear feedback about sublime
  - newline auto-indent
  - auto-align existing lines
- paredit operations
  - slurp/barf
  - wrap
  - join/split
  - electric return
- sweet-expressions, indent-clj
- Haskell's $ operator

### Why is it different?

- simple, predictable
- character based rather than structural
- uses indentation to deduce content, but does not hide parens
- Haskell's operator essentially, but with indentation

### Usage Examples

- one-line to show paren closing

  ```
  (defn foo [a b] {:a a, :b b
  ```

- let-block to show indentation

  ```
  (let [a 1
        b 2
        c 3
    (+ a b c
  ```

- paste let-block into a function

  ```
  (defn foo [x]
    ret)

  (let [a 1
        b 2
        c 3
    (+ a b c
  ```

- wrapping a for loop around some hiccups

  ```
  [:div#messages
   [:h1 "My Messages"
   (for [m messages
     [:div#message
       message
  ```

- appending a require

  ```
  (ns example.core
    (:require
      [clojure.string :refer [join
      [clojure.data :refer [diff
  ```

- typing quotes follows the principle of least astonishment, allowing temporary imbalances for simpler editing.

  ```
  (let [my-arg {:foo 123    ;; <--- change keyword to string
    (my-func my-arg
  ```

- commenting out the last line of a map or let-block

  ```
  (let [my-str "hello"
        my-num 123
        my-map {:foo 1
                ;;:boo 2}]
    ...)
  ```

- Closing parens that do not fall at the end of a line cannot be repositioned
  to subsequent indented lines.

### Some Cons

- Notice the numbers share the same indentation, but the last three are not in
  the vector.  This is because `bar`'s peculiar position is preventing it; we
  can only safely reposition the group of delimiters that fall at the end of a
  line.

  ```
  (foo [1 2 3
        4 5 6] bar        ;; <-- type this in animation
        7 8 9)
  ```

- Pushing an open delimiter forward may cause some indented lines leave its
  collection.  You must reindent them to keep the original structure.

  ```
  (foo [1 2 3             ;; <-- change foo to foobar
        4 5 6             ;; <-- fix indentation
  ```

- Time will tell if the benefits will outweigh these cons.

### Try It
- with vim, emacs, or sublime keybindings
- load examples (dropdown)

This is a proof-of-concept implemented in ClojureScript for the CodeMirror
editor on the right.  Try it with your favorite editor's keybindings.

Help by contributing bugs or ideas to our GitHub issues.  If you like the
concept, consider contributing a plugin for different editors!

### Something else to think about

- explain how haskell's `$` operator might be extended
- no closing parens might mean better readability (in exchange for possible ambiguity)

or maybe not:
[unmatchedcomic](https://xkcd.com/859/)


tweet: Parinfer: my animated essay and proof-of-concept on a better Lisp-editing experience.
