This is WIP documentation for [`parinfer.js`].

[`parinfer.js`]:parinfer.js

## Summary

Parinfer.js performs a _well-defined_, full file text transformation in one
pass, correcting either indentation or close-parens.  Close-parens may move
between lines and some whitespace may be added or removed, but the number of
lines will always remain unchanged.

- [`indentMode`]`(text[, options])`
- [`parenMode`]`(text[, options])`

Text transformation is performed by either of the two functions above.  Both
are expected to be debounced on keypress for performance. Options are currently
only used for specifying cursor position and movement.  See
[API](README.md#api) for full details.

## Processing the Text

Parinfer starts its processing with the following functions, each iteratively
calling the one below it:

- [`processText`]
- [`processLine`]
- [`processChar`]

We explicitly track the state of our system in a `result` object, initialized
by [`getInitialResult`].  This object is passed as the first argument to most
functions in this file.  That way, it should be obvious whenever some part of
the result is being read or updated anywhere in the file.

The processing functions above behave differently depending on the mode set
at [`result.mode`].

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

- [`result.isInComment`]
- [`result.isInStr`]
- [`result.isEscaping`]
- [`result.isInCode`]

Once we have this, we can keep a stack of parentheses, [`result.parenStack`],
as we scan a file:

- _Push_ open-parens onto the stack when encountered
- _Peek_ the stack to verify that the parent open-paren matches the next close-paren
- _Pop_ the stack when matching close-parens are encountered

The [`onChar`] function determines what to do for each character that is
encountered.  That is, it dispatches to operations which modify our boolean
flags and paren stack.  It is also a convenient place to do some of the
transformations we will discuss next.

## Housekeeping

Parinfer performs some housekeeping on the code as a necessary step toward the
main transformations.

#### Tab Characters

A line indented with a tab character results in an ambiguous indentation
length.  Thus, we replace such tab characters with a standard count of two
spaces.

_This operation happens at [`onTab`], committed by [`commitChar`]._

#### Leading Close Parens

Lines sometimes start with a close-paren (possibly preceded by whitespace).
For example, this is a common occurrence in real world code:

```clj
(ns example.core
  (:require
    [foo.core :as foo]
    [bar.core :as bar]
    )) ;; <-- leading close-paren
```

To be consistent about close-paren positioning, we move leading close-parens
to the end of the previous non-empty line.

```clj
(ns example.core
  (:require
    [foo.core :as foo]
    [bar.core :as bar])) ;; <-- trailing close-paren
```

_This operation happens at [`onLeadingCloseParen`]._

#### Unmatched Close Paren

Any unmatched close-parens are removed.  This makes the next transformations
simpler, and has the added benefit of making a paredit-like "barf" operation
without hotkeys (more on this later).  But since newcomers may become confused
about why they can't type close-parens sometimes, we are exploring how to make
this a configurable option in [issue 79].

```clj
(foo} 1 2 3)  ;; <-- before: the "}" is unmatched
(foo 1 2 3)   ;; <-- after:  the "}" is removed
```

```clj
(bar) 4 5 6)  ;; <-- before: the last ")" is unmatched
(bar) 4 5 6   ;; <-- after:  the last ")" is removed
```

_The operation happens at [`onUnmatchedCloseParen`], committed by [`commitChar`]._

## Analyzing a Line

Parinfer needs to analyze each line in order to locate two main areas of interest:

#### Indentation

Indentation is the number of space characters at the start of a line, shown
with underscores below.  Indentation is ignored for lines starting inside a
string and any empty lines (i.e. truly empty or only whitespace+comment).
Notice that we indent every line with one space below just to show
_zero-length_ indentation with a single underscore.

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

_Indentation length is the value at [`result.x`] when [`onIndent`] is called._

#### Paren Trail

The Paren Trail is the trail of close-parens at the end of a line, shown with
carets below.  Notice that comments are allowed after these parens.  Also
notice that any whitespace before a close-paren is considered part of the Paren
Trail.

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

_The Paren Trail is stored in [`result.parenTrail`], updated by
[`updateParenTrailBounds`] and [`onMatchedCloseParen`]._

## The Modes

Parinfer's modes can be summed up using definitions from the previous section:

- __Indent Mode__ - when we finish identifying a line's _Indentation_, we use
  it to correct the last _Paren Trail_.
- __Paren Mode__ - when we finish identifying a line's _Indentation_, we correct
  it using the last _Paren Trail_.

For example, let's assume we are processing the following code:

```clj
(foo [a b
  (+ a b)])
```

Let's use our underscore and caret annotations to see the Indentation and Paren
Trail regions:

```clj
_(foo [a b_
___(+ a b)])
         ^^^
```

After encountering the indentation on line 1, we don't do anything because
there is no previous Paren Trail to base a correction on.  But after the
indentation on line 2, we do have the Paren Trail from line 1 to deal with.
Let's emphasize this by only annotating these two regions:

```clj
 (foo [a b_
___(+ a b)])
```

In Indent Mode, we correct the Paren Trail to be the following:

```clj
 (foo [a b]
          ^
___(+ a b)])
```

In Paren Mode, we instead correct the Indentation to the following:

```clj
 (foo [a b_
_______(+ a b)])
```

The main idea here is that we are only looking at two things a time: the
indentation that we just processed, and the previous paren trail.  The rest of
the file is corrected by continuing this process line-by-line.

Now let's look at exactly how these corrections are performed.

### Correcting Paren Trails

In Indent Mode, we correct the Paren Trail by first deleting it.  Then, to
construct a new Paren Trail, we _close all unclosed open-parens to the right of
the indentation point_.  For example, given the following code:

```clj
(foo [a b]
  (+ a b)])
```

We identify the paren trail on line 1:

```clj
(foo [a b]
         ^
  (+ a b)])
```

Then we remove it, with [`removeParenTrail`].

```clj
(foo [a b_
  (+ a b)])
```

Next, we process the indentation on line 2:

```clj
(foo [a b_
__(+ a b)])
```

We find all unclosed open-parens to the right of the indentation point:

```clj
(foo [a b_
     ^
__(+ a b)])
```

Then we close the open-parens by inserting matching close-parens in the Paren Trail.
This happens at [`correctParenTrail`]:

```clj
(foo [a b]
         ^
__(+ a b)])
```

The process is repeated for the next line.  We always use a final indentation
point of zero to correct the last Paren Trail.

### Correcting Indentation

In Paren Mode, we correct the indentation by clamping it to a valid range.  The
leftmost point is to the right of the most recent _unclosed_ open-paren, and the
rightmost point is at the most recently _closed_ open-paren.

For example, given the following code:

```clj
(foo [a b
  (+ a b)])
```

We identify the indentation on line 2:

```clj
(foo [a b
__(+ a b)])
```

Then, we identify the most recent _unclosed_ open-paren:

```clj
(foo [a b
     ^
__(+ a b)])
```

There is no most recently _closed_ open-paren, so we ignore that bound.  Clamping
to the leftmost boundary gives us a new indentation length:

```clj
(foo [a b
     ^
______(+ a b)])
```

This correction happens at [`correctIndent`].

## Respecting the Cursor

In Indent Mode, ...

- [`truncateParenTrailBounds`]

## Respecting Relative Indentation

In Paren Mode, ...

- [`result.indentDelta`]


<!-- END OF DOC: All content below is overwritten by `update-doc-reflinks.sh` -->
[`isOpenParen`]:parinfer.js#L54
[`isCloseParen`]:parinfer.js#L58
[`getInitialResult`]:parinfer.js#L70
[`mergeOption`]:parinfer.js#L138
[`cacheErrorPos`]:parinfer.js#L161
[`error`]:parinfer.js#L165
[`insertWithinString`]:parinfer.js#L180
[`replaceWithinString`]:parinfer.js#L188
[`removeWithinString`]:parinfer.js#L196
[`multiplyString`]:parinfer.js#L203
[`getLineEnding`]:parinfer.js#L212
[`insertWithinLine`]:parinfer.js#L226
[`replaceWithinLine`]:parinfer.js#L231
[`removeWithinLine`]:parinfer.js#L236
[`initLine`]:parinfer.js#L241
[`commitChar`]:parinfer.js#L252
[`clamp`]:parinfer.js#L264
[`peek`]:parinfer.js#L274
[`isValidCloseParen`]:parinfer.js#L285
[`onOpenParen`]:parinfer.js#L292
[`onMatchedCloseParen`]:parinfer.js#L303
[`onUnmatchedCloseParen`]:parinfer.js#L311
[`onCloseParen`]:parinfer.js#L315
[`onTab`]:parinfer.js#L326
[`onSemicolon`]:parinfer.js#L332
[`onNewline`]:parinfer.js#L339
[`onQuote`]:parinfer.js#L344
[`onBackslash`]:parinfer.js#L360
[`afterBackslash`]:parinfer.js#L364
[`onChar`]:parinfer.js#L375
[`isCursorOnLeft`]:parinfer.js#L393
[`isCursorOnRight`]:parinfer.js#L401
[`isCursorInComment`]:parinfer.js#L410
[`handleCursorDelta`]:parinfer.js#L414
[`updateParenTrailBounds`]:parinfer.js#L432
[`truncateParenTrailBounds`]:parinfer.js#L455
[`removeParenTrail`]:parinfer.js#L484
[`correctParenTrail`]:parinfer.js#L501
[`cleanParenTrail`]:parinfer.js#L519
[`appendParenTrail`]:parinfer.js#L548
[`finishNewParenTrail`]:parinfer.js#L557
[`correctIndent`]:parinfer.js#L571
[`onProperIndent`]:parinfer.js#L593
[`onLeadingCloseParen`]:parinfer.js#L608
[`onIndent`]:parinfer.js#L625
[`processChar`]:parinfer.js#L642
[`processLine`]:parinfer.js#L667
[`finalizeResult`]:parinfer.js#L691
[`processError`]:parinfer.js#L707
[`processText`]:parinfer.js#L719
[`getChangedLines`]:parinfer.js#L740
[`publicResult`]:parinfer.js#L754
[`indentMode`]:parinfer.js#L771
[`parenMode`]:parinfer.js#L776
[`result.mode`]:parinfer.js#L74
[`result.origText`]:parinfer.js#L76
[`result.origLines`]:parinfer.js#L77
[`result.lines`]:parinfer.js#L80
[`result.lineNo`]:parinfer.js#L81
[`result.ch`]:parinfer.js#L82
[`result.x`]:parinfer.js#L83
[`result.parenStack`]:parinfer.js#L85
[`result.parenTrail`]:parinfer.js#L89
[`result.cursorX`]:parinfer.js#L96
[`result.cursorLine`]:parinfer.js#L97
[`result.cursorDx`]:parinfer.js#L98
[`result.isInCode`]:parinfer.js#L100
[`result.isEscaping`]:parinfer.js#L101
[`result.isInStr`]:parinfer.js#L102
[`result.isInComment`]:parinfer.js#L103
[`result.commentX`]:parinfer.js#L104
[`result.quoteDanger`]:parinfer.js#L106
[`result.trackingIndent`]:parinfer.js#L107
[`result.skipChar`]:parinfer.js#L108
[`result.success`]:parinfer.js#L109
[`result.maxIndent`]:parinfer.js#L111
[`result.indentDelta`]:parinfer.js#L112
[`result.error`]:parinfer.js#L115
[`result.errorPosCache`]:parinfer.js#L121
