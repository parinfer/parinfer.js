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

Parinfer's modes can now be described using definitions from the previous
sections:

- __Indent Mode__
  - When we identify a _Paren Trail_, we remove it.  See [`removeParenTrail`]
  - When we identify a line's _Indentation_, we identify all open-parens on the
    _Paren Stack_ to the right of the indentation.  Then we correct the last
    _Paren Trail_ such that it closes the aforementioned open-parens.  See [`correctParenTrail`].
- __Paren Mode__
  - When we identify a line's _Indentation_, we clamp the indentation to the following boundaries.  See [`correctIndent`].
    - leftmost: inside the open-paren at the top of the _Paren Stack_
    - rightmost: the open-paren matching the last close-paren in the last _Paren Trail_

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

### Indent Mode

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

### Paren Mode

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

### When to cancel processing

_TODO: show simple cases when cancel processing_ 

- [`finalizeResult`]

### Leading Close Parens

Parinfer considers it non-normal for a line to start with a close-paren
(preceded by zero or more whitespace).  We call this a "leading close-paren":

```clj
(foo
  bar
  )   ;; <-- leading close-paren
```

For consistency, we always want to move these to the end of the previous
non-empty line, that is, the currently existing Paren Trail:

```clj
(foo
  bar) ;; <-- moved here
```

_Indent Mode_ accomplishes this simply by removing these leading close-parens,
since moving it to the Paren Trail would result in it being removed anyway.

_Paren Mode_ will move any leading close-parens to the end of the current Paren
Trail.  For example, if we have several leading close-parens on separate lines,
they are all moved to the most recent Paren Trail:

```clj
(foo
  (bar_
  )
)
```

```clj
(foo
  (bar)
      ^
  
)
```

```clj
(foo
  (bar))
      ^^
  
 
```

_See the [`onLeadingCloseParen`] function for details._

### Preserving Relative Indentation during Indentation Correction

As we have seen, Paren Mode will correct the indentation of lines one-by-one.
This can result in the loss of relative indentation.  For example, this
is an example with incorrect indentation:

```clj
     [a
      b
 (foo
   bar)]
```

We first correct the line containing `foo`:

```clj
     [a
      b
      (foo
   bar)]
```

Then we correct the line containing `bar`:

```clj
     [a
      b
      (foo
       bar)]
```

But notice that `bar` is no longer indented two spaces inside the `foo`
expression.  This is what we want instead:

```clj
     [a
      b
      (foo
        bar)]
```

Thus, we wish to preserve the relative indentation of all lines inside an
expression after its first line has shifted.

We accomplish this inside the [`correctIndent`] function by storing how much
the current line's indentation has changed at [`result.indentDelta`].  This var
is copied to the stack for every open-paren on this line by [`onOpenParen`].
Notice how the most recent unclosed open-paren's indent delta is added to a
line's initial indentation before correcting it. This achieves our goal of
preserving relative indentation whenever possible.


## For use in an editor

The description of Parinfer thus far would completely satisfy the requirements
for a standalone file processor outside of an editor.  But it requires some
additional features if it is to auto-process your code while typing.

### Relaxing rules around the Cursor in Indent Mode

Sometimes, Indent Mode has to relax its rules in order to let you finish typing
something. For example, suppose you just typed a space character below.  The
`|` is your cursor:

```clj
(def foo |)
```

Indent Mode would delete the space, preventing you from adding anything after
`foo`.

```clj
(def foo|)
```

A similar example also applies to typing a `]` below:

```clj
(foo [1 2 3]|
      4 5 6
      7 8 9])
```

It would also get deleted immediately:

```clj
(foo [1 2 3|
      4 5 6
      7 8 9])
```

To prevent both of these problems, we add a rule to clamp the Paren Trail to
the range extending past the cursor.  To clarify, here's the original Paren
Trail:

```clj
(def foo )
        ^^
```

We removed the `|` cursor representation since the cursor does not take up
character space.  Let's add a representation of the "range extending past the
cursor" using `>>>`:

```clj
(def foo )
        ^^
         >>>>>>>>>>>>>>> (to the end of the line)
```

After clamping the Paren Trail boundaries to the cursor range, we are
left with a new Paren Trail:

```clj
(def foo )
         ^
```

Thus, the space is not removed since it is not included in the Paren Trail,
which is susceptible to being replaced by Indent Mode's inferencing.

Applying this to the second example:

```clj
(foo [1 2 3]
           ^
            >>>>>>>>>>>> (to the end of the line)
      4 5 6
      7 8 9])
```

After clamping the Paren Trail boundaries to the cursor range,
The new Paren Trail is a zero-length range:

```clj
(foo [1 2 3]_
      4 5 6
      7 8 9])
```

After processing in Indent Mode, the `]` must be removed from the last line
instead of the first line:

```clj
(foo [1 2 3]_
      4 5 6
      7 8 9)
```

See [`truncateParenTrailBounds`] for the implementation.

### Relaxing rules around the Cursor in Indent Mode

_TODO: show examples_

In Paren Mode, close-parens are allowed at the start of a line if there is a
cursor before it.  This allows you to append a newline + expression to the end
of a list without having to type the expression first.  See
[`onLeadingCloseParen`].

### Preserving Relative Indentation during Text Insertion/Removal

Unfortunately, the previous method for preserving relative indentation
does not work when it is the user's insertion or deletion operations
which causes an open-paren to shift. For example:

```clj
(foo
  bar)
```

If the user inserts a space before `(foo`, we get:

```clj
 (foo
  bar)
```

Parinfer receives this text without any information about what it was before.
So, it cannot deduce any indentation delta.  This is what we want instead.

```clj
 (foo
   bar)
```

To accomplish this, we must realize that such an edit only affects open-parens
_in front_ of the current cursor.  Here are the different edit events as they
happen relative to the cursor:

- _deletion_: some text behind or in front of the cursor has been deleted
- _insertion_: some text behind the cursor has been inserted
- _replacement_: some text behind the cursor has been replaced by some text

Thus, we use a [`result.cursorDx`] parameter to indicate how far the cursor has
moved due to an edit, which must be provided by the editor through the
`cursorDx` option.  This can calculated simply by subtracting the previous
cursor X position from the current cursor X position when an edit takes place.
Notice that this works for multi-line edits as well.

Specifically, the [`handleCursorDelta`] function simply adds [`result.cursorDx`]
to [`result.indentDelta`] after the cursor to preserve relative indentation
across user edits, whenever possible.

### Quote Danger

_TODO: show examples of string corruption caused by comments_ 

In both modes, ...

- [`result.quoteDanger`]

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
