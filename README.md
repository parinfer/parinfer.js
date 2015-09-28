# Parinfer

This is an experiment that tries to demonstrate a possible replacement for
[paredit] as a simpler and more natural way to write Clojure code, and perhaps
other Lisps.

##### The basic premise

A vast majority of closing delimiters `)]}` in Clojure can become inferred
based on indentation.  Thus, I'm building an editor demo that will move these
delimiters around for you as you adjust the indentation of your code.  Inlining
expressions will still be supported of course.

See [concept examples] for details.

[concept examples]:#concept-examples

##### Prior Art

- [paredit] - structural editing and auto-balancing of Lisp text
- [Haml], [Slim], and [Jade] - indented HTML templating langs that are really close to indented lisps
- [Haskell's $ operator] - infers a closing paren at the end of its line
- [sweet-expressions] and [indent-clj] - infers both open and close parens
- [Flense] and [Plastic] - structural editing concepts for Clojure text
- [clojure-validate-indent] - validates indentation of Clojure code
- [The Clojure Style Guide] - indentation conventions in Clojure

[Haml]:http://haml.info/
[Slim]:http://slim-lang.com/
[Jade]:http://jade-lang.com/
[Haskell's $ operator]:http://learnyouahaskell.com/higher-order-functions#function-application
[paredit]:http://danmidwood.com/content/2014/11/21/animated-paredit.html
[sweet-expressions]:http://readable.sourceforge.net/
[indent-clj]:https://github.com/boxed/indent-clj
[Flense]:https://github.com/mkremins/flense
[Plastic]:https://github.com/darwin/plastic
[clojure-validate-indent]:https://github.com/boxed/clojure-validate-indent
[The Clojure Style Guide]:https://github.com/bbatsov/clojure-style-guide#source-code-layout--organization

## Concept Examples

Changing the indentation of code will cause tokens to jump in and out of
collections, as the editor moves the closing delimiters around to obey
indentation:

```clojure
(defn foo
  [arg]
  ret)           ; <-- When inserting space before `ret`...

(defn foo
  [arg
   ret])         ; <-- ... `ret` will automatically join the vector.

(defn foo
  [arg           ; <-- When un-indenting this line...
   ret])

(defn foo)       ; <-- ... `[arg ret]` leaves the function.
[arg
   ret]

(defn foo)
[arg
   ret]          ; <-- When unindenting this line...

(defn foo)
[arg]
ret              ; <-- ... `ret` leaves the vector.
```

### Implementation

This token-jumping can be done in this editor because we treat closing
delimiters at the end of each line as mobile.  The editor's view recomputes
their positions on every change.

Here you can see internal view (what the editor is really looking for) vs the
computed view.

 <table>
<thead>
<th align=left>internal view</th>
<th align=left>computed view</th>
</thead>
<tr>
<td>
```
(defn foo        
  [arg
  ret
```

```
(defn foo        
  [arg
   ret
```

```
(defn foo        
[arg
   ret
```

```
(defn foo        
[arg
ret
```
</td>
<td>
```clojure
(defn foo        
  [arg]
  ret)
```

```clojure
(defn foo        
  [arg
   ret])
```

```clojure
(defn foo)       
[arg
   ret]
```

```clojure
(defn foo)       
[arg]
ret
```
</td>
</tr>
</table>

Notice that the internal view simply ignores the trailing delimiters. The
computed view recomputes their position based on indentation.

The tricky parts are related to user interaction, which are documented in detail
in the formatter namespace. Summary:

- __when typing a closing delimiter:__
  - prevent typing one that is unmatched
  - prevent typing one if it is the first token on a line (disregarding whitespace)
  - otherwise, allow it if it is matched
- allow special rules for the current line being edited:
  - treat the cursor position as a candidate for trailing delimiter insertion, so the user
    can insert spaces before delimiters to insert new content

The aformentioned points also allow us to type inline expression seen below:

 <table>
<thead>
<th align=left>internal state</th>
<th align=left>computed view</th>
</thead>
<tr>
<td>
```
(defn foo [arg] ret 
```

```
(defn foo           
  [arg] ret
```
</td>
<td>
```clojure
(defn foo [arg] ret)
```

```clojure
(defn foo           
  [arg] ret)
```
</td>
</tr>
</table>


## Use Cases

1. Quickly add a new `:require` directive:

  ```clojure
  (ns example.core
    (:require
      [clojure.string :as string]
      [clojure.data :refer [diff]]))   ; <-- I want to add a new require directive.

  (ns example.core
    (:require
      [clojure.string :as string]
      [clojure.data :refer [diff]]))
      |                                ; <-- So I position my cursor here.

  (ns example.core
    (:require
      [clojure.string :as string]
      [clojure.data :refer [diff]
      []))                             ; <-- I type "[", and it enters the `:require` expression.

  (ns example.core
    (:require
      [clojure.string :as string]
      [clojure.data :refer [diff]
      [clojure.walk :as walk]))        ; <-- complete the expression.
  ```

2. Modify a `let`-block to not name its returned expression:

  ```clojure
  (let [a (* 2 3)
        b (- a 4)]
    b)                  ; <-- delete this line...

  (let [a (* 2 3)
        b (- a 4)])     ; <-- ")" moved automatically to this line

  (let [a (* 2 3)
        b (- a 4)])     ; <-- delete "b"

  (let [a (* 2 3)
        (- a 4)])       ; <-- finally, de-indent this expression...

  (let [a (* 2 3)]
    (- a 4))            ; <-- it left the binding vector automatically.
  ```

3. Correct a `:require` directive:

  ```clojure
  (ns example.core
    (:require
      [cljs.core.async.macros :refer [go]]   ; <-- oops, this belongs in `:require-macros`
      [cljs.core.async :refer [<!]]))

  (ns example.core
    (:require-macros                         ; <-- changed this to `:require-macros`
      [cljs.core.async.macros :refer [go]]
    |                                        ; <-- then I position my cursor here
      [cljs.core.async :refer [<!]]))

  (ns example.core
    (:require-macros
      [cljs.core.async.macros :refer [go]])
    (                                        ; <-- I type "(", and the indented lines below enter this new expression, while closing the one above.
      [cljs.core.async :refer [<!]]))

  (ns example.core
    (:require-macros
      [cljs.core.async.macros :refer [go]])
    (:require                                ; <-- complete the expression
      [cljs.core.async :refer [<!]]))
  ```

## Setup

not quite ready yet.

```
lein figwheel dev
open http://localhost:3449
```

```
lein cljsbuild test
```
