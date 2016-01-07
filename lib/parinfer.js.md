This is WIP documentation for [`parinfer.js`].

[`parinfer.js`]:parinfer.js

## Summary

Parinfer.js performs a _well-defined_, full file text transformation in one pass,
correcting either indentation or close-parens.  You should be aware that
Parinfer is not a pretty-printer-- that is, it never adds or removes lines from
your file.

## Usage

```
indentMode(text[, options])
parenMode(text[, options])
```

Text transformation is performed by either of the two functions above.  Both
are expected to be debounced on keypress. Options are currently only used
for specifying cursor position and movement.

See [API](README.md#api) for full details.

## Scanning the Text

- `processText`
- `processLine`
- `processChar`
- `onChar`

...

## Finding Parens

Parinfer needs to know where the parens are, but it must ignore those found
inside certain forms:

```clj
"("  ; <-- ignore parens in strings
\(   ; <-- ignore parens inside characters (escaped literals)

; ( <--- ignore parens in comments
```

To make sure we ignore these parens, we toggle certain boolean flags when
crossing the boundaries of these token types:

- `isInComment`
- `isInStr`
- `isEscaping`
- `isInCode` 

Once we have this, we can keep a stack of parentheses (called `parenStack`) as
we scan a file:

- _Push_ open-parens onto the stack when encountered
- _Peek_ the stack to verify that the parent open-paren matches the next close-paren
- _Pop_ the stack when matching close-parens are encountered

The [`onChar`] function determines what to do for each character that is
encountered.  That is, it dispatches to operations which modify our boolean
flags and paren stack.

`onChar` is also a convenient place to do some of the transformations we will
discuss next.

## Transformation #1: Housekeeping

To understand Parinfer's inference process, it's important to first know that
it performs some housekeeping on the code.  This helps prevent ambiguity that
would otherwise make Parinfer's process difficult.

- __Tab Characters__: A line indented with a tab character results in an
  ambiguous indentation length.  Thus, we replace such tab characters with a
  standard count of two spaces.  This mapping happens at [`onTab`], and is
  committed by [`commitChar`].

- __Leading Close Parens__: Lines sometimes start with a close-paren (possibly
  preceded by whitespace).  For example, this is a common occurrence in real
  world code:

  ```clj
  (ns example.core
    (:require
      [foo.core :as foo]
      [bar.core :as bar]
      )) ;; <-- leading close-paren
  ```

  To be consistent about close-paren positioning, we move leading close-parens
  to the end of the previous non-empty line.  This happens at
  [`onLeadingCloseParen`].

  ```clj
  (ns example.core
    (:require
      [foo.core :as foo]
      [bar.core :as bar])) ;; <-- trailing close-paren
  ```

- __Unmatched Close Paren__: Any unmatched close-parens are removed.  This
  makes the next transformations simpler, and has the added benefit of making a
  paredit-like "barf" operation without hotkeys (more on this later).  Since
  newcomers may become confused about why they can't type close-parens
  sometimes, we are exploring how to make this configurable option in [issue
  79].

  ```clj
  (foo} 1 2 3)  ;; <-- the "}" is unmatched
  (bar) 4 5 6)  ;; <-- the last ")" is unmatched
  ```

  The removal happens at [`onCloseParen`].

  ```clj
  (foo 1 2 3)  ;; <-- the "}" was removed
  (bar) 1 2 3  ;; <-- the last ")" was removed
  ```

## Analyzing a Line

Before we look at how the next transformation is performed, we must define the
two key regions of a line:

- __Indentation__ is the number of space characters at the start of a line,
  shown with underscores below.  Indentation is ignored for lines starting
  inside a string and any empty lines (i.e. truly empty or only
  whitespace+comment).  Notice that we indent every line with one space below
  just to show _zero-length_ indentation with a single underscore.

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

With this analysis information, we can learn how Parinfer transforms code.

## Transformation #2: Inference

- __Indent Mode__:
  - _after processing a line_, erase all characters inside the Paren Trail
  - _after processing indentation_, insert appropriate close-parens inside the previous Paren Trail
- __Paren Mode__:
  - _after processing a line_, erase space characters inside the Paren Trail
  - _after processing indentation_, replace indentation with the appropriate number of spaces

...

--

## Appendix

### Example Analysis

Given the following example code:

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

Here it is annotated with underscores and carets indicating how we analyze each line.

- _underscores_ at the beginning of a line represent Indentation
- _underscores_ at the end of a line represent where a Paren Trail could be inserted
- _carets_ indicate existing Paren Trails


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

[issue 79]:https://github.com/shaunlebron/parinfer/issues/79
