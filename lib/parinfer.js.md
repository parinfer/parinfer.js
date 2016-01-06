This is documentation for [`parinfer.js`].

[`parinfer.js`]:parinfer.js

## Summary

Parinfer.js performs full file text transformation in one pass.

## Usage

```
indentMode(text[, options])
parenMode(text[, options])
```

Text transformation is performed by either of the two functions above.  Both
are expected to be debounced on keypress.

## Finding Parens

Parinfer fundamentally needs to know where the parens are, but it must ignore
those found inside strings, character literals, and comments.  Thus, we can
write a partial Lisp Reader that only scans for parens outside these forms.

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

Before we look at how transformation is performed, we establish a vocabulary
for the important regions of a line.

- __Indentation__ - the starting whitespace of a line, shown with underscores
  below.  Indentation is ignored for lines starting inside a string, and any
  empty lines containing only whitespace or a comment.

    ```clj
    (defn foo [x]
    __(+ x 1))

    (let [x 1
                      ;; Whitespace before a comment doesn't count.
    ______y 2
    ______z "hello
             there"]  ;; Whitespace inside a string doesn't count.
    __(+ x y))
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

- __Empty Paren Trail__ - if a line does not have a Paren Trail, but _can_ have
  one inserted, we represent this location with an empty Paren Trail.  For
  example, we can represent this by replacing the paren trails from the
  previous example with an underscore.

    ```clj
    (foo_

    (foo (+ 2 3) [(bar_       ;; comment

    (foo_
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
(defmethod actor-target :inky_
  ;;; Try to flank pacman from side opposite to blinky.
__[state name-]
              ^
__(let [blinky (-> state :actors :blinky)
                                        ^
________pacman (-> state :actors :pacman)
                                        ^
________nose (add-pos (:pos pacman) (:dir pacman))
                                                ^^
________[nx ny] nose_
________target (reflect-pos nose (:pos blinky))]
                                             ^^^
____{:pos target_
_____:viz-data {:pacman-pos (:pos pacman)
                                        ^
________________:blinky-pos (:pos blinky)
                                        ^
________________:nose nose}}))
                          ^^^^
```

To clarify:

- _underscores_ at the beginning of a line represent Indentation
- _underscores_ at the end of a line represent where a Paren Trail could be inserted
- _carets_ indicate existing Paren Trails

## Transforming

Transformation happens one line at a time.


