## Parinfer

A proof-of-concept for a simple editor feature
to simplify the way we write Lisp.

### TLDR

- perhaps an intuitive alternative to paredit
- adjust indentation to affect nesting (without hiding parens)
- a natural way to keep your code pretty

### The problem

The piles of parentheses are jarring to everyone who first gazes at Lisp.  The
unfamiliarity is an attack on all fronts-- how would I think/write/read/manage
it? And how do I justify time to learn it when it's not that popular?

Here, we are only focusing on a subset of this approachability problem. We want
to lower the barrier to _writing_ Lisp through a simple editor feature concept.
This kind of thing may come in handy soon since we are seeing a growth in
Clojure adoption and the advent of Racket in VR, both of which use Lisp syntax.

### The idea

Open parentheses are important because they denote the start of a collection.
These are very clear and easy to read.  But it is the closing parentheses which
tend to bunch together at the end of a line.

These "piles" of parens are the defining feature that shocks us when we first
look at Lisp.  It is not just for its effect on legibility, but for the
additional work required to balance these parens while inserting and editing
expressions.

This project proposes that these defining "piles" of parens are still a
necessary formality which prevents ambiguity about the structure of our code,
but that the burden of managing them should be on your editor.  In fact, we
will show how an editor can intuitively manage them for you without magic, by
virtue of indentation conventions that we already employ.

### The Two Rules

_We will use Clojure's dialect of Lisp from this point forward, but same concepts
apply to others of course._

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

### Animated Examples

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
