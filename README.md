# Inferring `)]}` in Clojure

This is an experiment that tries to demonstrate a possible replacement for
[paredit] as a simpler and more natural way to write Clojure code, and perhaps
other Lisps.

__The basic premise:__ It's possible for an open delimiter (paren, bracket, or
curly) to be naturally closed based on indentation, while still allowing for
explicit closing when inlining is desired.  Skip to the [concept examples] for
details.

[concept examples]:#concept

__A proposal__: Since we cannot assume that any existing Clojure code will be
[indented correctly][clojure-validate-indent], our experimental editor operates
instead on code which __does not allow any closing delimiters at the end of a
line__. Rather, these delimiters are inferred and displayed by the editor,
based on indentation alone.  In the figure below, the left side shows code that
follows such a rule, and the right side highlights the location of the inferred
closing delimiters.

![inferred parens](http://i.imgur.com/dPigfne.png)

__Prior Art__

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
collections:

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

This token-jumping can be done in this editor because the closing delimiters at
the end of each line are treated as _virtual characters_-- they are never
represented explicitly in the source.  The editor's view recomputes the
positions of these closing delimiters on every change.

Here you can see the internal state and computed views for each of the
aformentioned examples steps side-by-side:

 <table>
<thead>
<th align=left>internal state</th>
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

Notice that there is no special code to perform the operations to the internal
state.  The view is simply a pure function which inserts the closing delimiters
where appropriate.  We still need to keep the input clean though:

- __when typing a closing delimiter:__ prevent typing one that is unmatched, while allowing one that is matched.
- __when the cursor leaves a line:__ erase closing delimiters at the end of the line

The aformentioned points allow us to type inline expression seen below:

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
      [cljs.core.async :refer [<!]])))

  (ns example.core
    (:require-macros
      [cljs.core.async.macros :refer [go]])
    (:require                                ; <-- complete the expression
      [cljs.core.async :refer [<!]])))
  ```

## Setup

Not working yet:

```
lein figwheel dev
open http://localhost:3449
```

