This is WIP documentation for [`parinfer.js`].

[`parinfer.js`]:parinfer.js

## Summary

Parinfer.js performs full file text transformation in one pass.

## Usage

```
indentMode(text[, options])
parenMode(text[, options])
```

Text transformation is performed by either of the two functions above.  Both
are expected to be debounced on keypress. Options are currently only used
for specifying cursor position and movement.

See [API](README.md#api) for full details.

## Defining "Normalized"

To start understanding Parinfer's process, it's important to know that it
always produces code adhering to a normalized form, whose definition depends on
_close-parens_ and _tabs_.  Thus, Parinfer will normalize whatever code it is
given.

These normalization rules are not based on personal preference-- rather, they
only serve to prevent ambiguity to make Parinfer's process of inference
possible.  Fortunately, these rules are inline with standard Lisp styling
conventions.

#### Close Paren Position

If a line starts with a close-paren (possibly preceded by whitespace), we
consider this non-normalized.  For example, this is a common occurrence in real
world code:

```clj
(ns example.core
  (:require
    [foo.core :as foo]
    [bar.core :as bar]
    )) ;; <-- non-normalized
```

The normalized form moves any close-parens at the start of a line to the
previous non-empty line:

```clj
(ns example.core
  (:require
    [foo.core :as foo]
    [bar.core :as bar])) ;; <-- normalized
```

Making this assumption about close-parens allows their positioning to
be unambiguous thus inferable.

#### Unmatched Close Paren

If a close-paren is found without a matching open-paren, we consider
this non-normalized.  For example:

```clj
(foo} 1 2 3)  ;; <-- the "}" is unmatched
(bar) 4 5 6)  ;; <-- the last ")" is unmatched
```

The normalized form removes the unmatched close-parens:

```clj
(foo 1 2 3)  ;; <-- the "}" was removed
(bar) 1 2 3  ;; <-- the last ")" was removed
```

#### Tab Characters

If a line is indented with a tab character, we consider this non-normalized.
Tab characters do not have a defined length, thus making indentation length
ambiguous.

The normalized form replaces tab characters inside indentation with two spaces.

## Finding Parens

Before Parinfer can do anything, it fundamentally needs to locate the parens
while ignoring those found inside strings, character literals, and comments.
Thus, we can write a partial Lisp Reader that only scans for parens outside
these forms.

```clj
"("  ; <-- ignore parens in strings
\(   ; <-- ignore parens inside characters (escaped literals)

; ( <--- ignore parens in comments
```

At any point in our file, our Lisp Reader should be able to know the locations
of its parent parentheses and whether or not it is inside a string, comment or
character.  This is accomplished by maintaining a stack of parentheses:

- _Push_ open-parens onto the stack when encountered
- _Pop_ the stack when close-parens are encountered

Boolean flags are also used to track token types. See `onChar` function to
trace the details.

## Analyzing a Line

Before we look at how transformation is performed, we must establish a
vocabulary for the important regions of a line.

- __Indentation__ is the number of whitespace of a line, shown with underscores
  below.  Indentation is ignored for lines starting inside a string, and any
  empty lines containing only whitespace or a comment. Notice that we indent
  every line with one space to allow us to show zero-length indentation with
  a single underscore.

    ```clj
    _(defn foo [x]
    ___(+ x 1))

    _(let [x 1
                       ;; Whitespace before a comment doesn't count.
    _______y 2
    _______z "hello
              there"]  ;; Whitespace inside a string doesn't count.
    ___(+ x y))
    ```

- __Paren Trail__ - the trail of close-parens at the end of a line, shown with
  carets below.  Notice that comments are allowed after these parens.  Also
  notice that any whitespace before a close-paren is considered part of the
  Paren Trail.

    ```clj
    (foo)
        ^

    (foo (+ 2 3) [(bar)] )    ;; comment
                      ^^^^

    (foo   )))
        ^^^^^^
    ```

  If a line does not have a Paren Trail, but _can_ have one inserted, we
  represent this location with an empty Paren Trail.  We show this with an
  underscore below, similar to the way we show zero-length indentation.

    ```clj
    (foo_

    (foo (+ 2 3) [(bar_       ;; comment
    ```

### Example Analysis

Putting this all together now, here is some example code:

```clj
(defmethod actor-target :inky
  ;;; Try to flank pacman from side opposite to blinky.
  [state name-]
  (let [blinky (-> state :actors :blinky)
        pacman (-> state :actors :pacman)
        nose (add-pos (:pos pacman) (:dir pacman))
        [nx ny] nose
        target (reflect-pos nose (:pos blinky))]
    {:pos target
     :viz-data {:pacman-pos (:pos pacman)
                :blinky-pos (:pos blinky)
                :nose nose}}))
```

And here it is with underscores and carets indicating how we analyze each line.

```clj
_(defmethod actor-target :inky_
   ;;; Try to flank pacman from side opposite to blinky.
___[state name-]
               ^
___(let [blinky (-> state :actors :blinky)
                                         ^
_________pacman (-> state :actors :pacman)
                                         ^
_________nose (add-pos (:pos pacman) (:dir pacman))
                                                 ^^
_________[nx ny] nose_
_________target (reflect-pos nose (:pos blinky))]
                                              ^^^
_____{:pos target_
______:viz-data {:pacman-pos (:pos pacman)
                                         ^
_________________:blinky-pos (:pos blinky)
                                         ^
_________________:nose nose}}))
                          ^^^^
```

To clarify:

- _underscores_ at the beginning of a line represent Indentation
- _underscores_ at the end of a line represent where a Paren Trail could be inserted
- _carets_ indicate existing Paren Trails

With this analysis information, we can learn how Parinfer transforms code.

## Transforming

Remember that Parinfer is single-pass-- that is, transformation happens while
scanning the line.  In particular, here are the transformations that happen for
each mode:

- __Indent Mode__:
  - _after processing a line_, erase all characters inside the Paren Trail
  - _after processing indentation_, insert appropriate close-parens inside the previous Paren Trail
- __Paren Mode__:
  - _after processing a line_, erase space characters inside the Paren Trail
  - _after processing indentation_, replace indentation with the appropriate number of spaces

Thus, transformation happens at the end of a line, and at the end of indentation.

