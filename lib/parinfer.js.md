# Parinfer Design & Implementation

Since [Parinfer's home page] necessarily glosses over a lot of implementation
details for the sake of presentation, this document is written as supplemental
context for developers who want to explore the code.  While discussing design
here, we include frequent references to the relevant code inside
[`parinfer.js`] so that you may jump back and forth between implementation and
narrative.

[Parinfer's home page]:http://shaunlebron.github.io/parinfer/
[`parinfer.js`]:parinfer.js

- [Summary](#summary)
- [Processing the Text](#processing-the-text)
- [Finding Parens](#finding-parens)
- [Cleaning](#cleaning)
  - [Tab Characters](#tab-characters)
  - [Unmatched Close Parens](#unmatched-close-parens)
- [Analyzing a Line](#analyzing-a-line)
  - [Indentation](#indentation)
  - [Paren Trail](#paren-trail)
- [The Modes](#the-modes)
  - [Indent Mode](#indent-mode)
  - [Paren Mode](#paren-mode)
- [Absorbing Paren Trails](#absorbing-paren-trails)
- [Preserving Relative Indentation](#preserving-relative-indentation)
- [Using in an Editor](#using-in-an-editor)
  - [The Cursor in Indent Mode](#the-cursor-in-indent-mode)
  - [The Cursor in Paren Mode](#the-cursor-in-paren-mode)
  - [Preserving Relative Indentation while typing](#preserving-relative-indentation-while-typing)
  - ["Quote Danger": A Conundrum](#quote-danger-a-conundrum)
- [Questions?](#questions)

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

## Cleaning

Parinfer will remove or replace some characters as a necessary step toward the
main transformations.

#### Tab Characters

We replace tabs outside strings with two spaces, removing the possibility of
ambiguous character alignment.

_This operation happens at [`onTab`], committed by [`commitChar`]._

#### Unmatched Close Parens

Any unmatched close-parens are removed. This makes the next transformations
simpler and more predictable.

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

If a line starts with a close-paren, it does NOT constitute a Paren Trail.
Rather, these "leading close-parens" are absorbed into their previous Paren
Trail.  We will cover this in a later section.

```clj
;; BEFORE
(foo
  (bar_
  )      ;; <--- leading close-paren is not a paren-trail
  ^
)        ;; <--- leading close-paren is not a paren-trail
^

;; AFTER
(foo
  (bar)) ;; <--- absorbed the leading close-parens
      ^^
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

__The main idea__ here is that we are only looking at _two_ things a time: the
indentation that we just processed, and the previous paren trail.

Thus, in our example, we skip the first indentation since there is no previous
paren trail.  Let's highlight the next pair then:

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

The processing continues by making corrections for each subsequent pair of
indentation and paren trail regions.  The final paren trail is processed by
pairing it with a virtual indentation length of zero.

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

Processing is canceled if there is an unclosed quote.  See [`finalizeResult`].

### Paren Mode

In Paren Mode, we correct the indentation by clamping it to a valid range.  The
leftmost point is to the right of the most recent _unclosed_ open-paren, and the
rightmost point is to the left of the most recently _closed_ open-paren.

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

There is no most recently _closed_ open-paren, so we ignore that bound.
Clamping to the leftmost boundary gives us a new indentation length:

```clj
(foo [a b
     ^
______(+ a b)])
```

This indentation correction process happens at [`correctIndent`].

Also, in order to have consistent formatting of Paren Trails between modes, we
remove any spaces inside a Paren Trail with [`cleanParenTrail`]:

```clj
(foo (bar [1 2 3 ] ) )  ;; BEFORE
                ^^^^^^
(foo (bar [1 2 3]))     ;; AFTER
                ^^^
```

And finally, processing is canceled if there is an unclosed quote or
open-paren.  See [`finalizeResult`].

## Absorbing Paren Trails

As stated earlier, if a line starts with a close-paren, it is simply absorbed
into the previous Paren Trail.  Some examples:

```clj
;; BEFORE
(foo
  (bar)
  )
  ^

;; AFTER
(foo
  (bar))
       ^
```

```clj
;; BEFORE
(foo
  (bar
  ) pez)
  ^

;; AFTER
(foo
  (bar)
      ^
   pez)
```

_Indent Mode_ accomplishes this simply by removing these leading close-parens,
since moving it to the end of the previous line would result in it being
removed anyway by [`removeParenTrail`].

_Paren Mode_ will move any leading close-parens to the end of the previous Paren
Trail. 

_See the [`onLeadingCloseParen`] function for details._

## Preserving Relative Indentation

As we have seen, Paren Mode will correct the indentation of lines one-by-one.
This can result in the loss of relative indentation.  Let's walk through an
example:

```clj
     [a
      b
 (foo
   bar)]
```

Paren Mode first corrects the line containing `foo`:

```clj
     [a
      b
______(foo
   bar)]
```

Then it continues by correcting the line containing `bar`:

```clj
     [a
      b
      (foo
_______bar)]
```

Even though this is "correct" according to our previous rules, we wish to
preserve `bar`'s original two space indentation inside `foo`. Thus, we add an
extra space:

```clj
     [a
      b
      (foo
       _bar)]
```

Paren Mode acts further to preserve your custom indentation whenever possible.
It does this by trying to respect relative indentations of nested expressions.
In other words, when shifting a line containing an open-paren, we equally shift
all lines until the matching close-paren is met.

We accomplish this by tracking how much a line's indentation has changed and
store the value at [`result.indentDelta`].  Any subsequent line captured by an
open-paren on this line simply adds this value to its indentation length before
correction.  To allow for this to work for deeper expressions,
[`result.indentDelta`] is accumulated and copied to the [`result.parenStack`].
That way, a line must only check the `indentDelta` on top of the paren stack.

_These operations happen at [`correctIndent`] and [`onOpenParen`]._

---

## Using in an Editor

The description of Parinfer thus far would completely satisfy the requirements
for a standalone file processor outside of an editor.  But in order for it to
work as an interactive and user-friendly editor mode (i.e. auto-processing your
code while you type), we must add additional features.

Thus, these final sections describe when and how Parinfer sometimes lets you
break some of its aforementioned rules so they don't get in your way.  The next
section describes an extra indentation convenience feature.  And the last
section describes how Parinfer attempts to bail you out of trouble during a
conundrum for which a pure solution has yet to be found.

### The Cursor in Indent Mode

Sometimes, Indent Mode has to relax its rules at the cursor so that it doesn't
get in the way of typing.

For example, suppose you just typed a space character below.  The
`|` is your cursor:

```clj
(def foo |)
```

Indent Mode would immediately delete the space, preventing you from adding some
space-separated element after `foo`:

```clj
(def foo|)
```

A similar example also applies to typing a `]` below:

```clj
(foo [1 2 3]|
      4 5 6
      7 8 9])
```

It would also get deleted immediately, preventing you from adding some element
after it:

```clj
(foo [1 2 3|
      4 5 6
      7 8 9])
```

To prevent both of these problems, we add a rule to clamp the Paren Trail's
left boundary to the cursor.  Let's revisit the first example to illustrate:

```clj
(def foo |)
```

Let's remove the cursor character and show the Paren Trail:

```clj
(def foo )
        ^^
```

When we clamp this Paren Trail's left boundary to the cursor, we have:

```clj
(def foo )
         ^
```

Thus, the space is not removed since it is no longer included in the Paren
Trail for removal.

Let's show the same thing for the second example:

```clj
(foo [1 2 3]|
      4 5 6
      7 8 9])
```

Again, we remove the cursor character and show the Paren Trail:

```clj
(foo [1 2 3]
           ^
      4 5 6
      7 8 9])
```

When we clamp this Paren Trail's left boundary to the cursor, we are left with
a zero-length Paren Trail:

```clj
(foo [1 2 3]_
      4 5 6
      7 8 9])
```

Thus, the `]` is not removed since it is no longer included in the Paren
Trail for removal.  After processing the rest, we are left with:

```clj
(foo [1 2 3]
      4 5 6
      7 8 9)
```

It's important to note that simply moving the cursor to another line will
reformat the line that was "suspended" by this cursor rule, restoring the full
rules of Indent Mode.

_This operation happens at [`clampParenTrailToCursor`]._

### The Cursor in Paren Mode

Paren Mode must also relax its rules so that it doesn't get in the way of
typing.

For some of the same reasons mentioned in the previous section, Paren Mode
allows you to insert spaces inside the Paren Trail if the cursor is on that
line:

```clj
(foo (bar [1 2 3]) |)
```

Paren Mode does this by not calling [`cleanParenTrail`] on the cursor's line.

Also, suppose you press enter when your cursor is at `|` below:

```clj
(foo
  bar|)
```

After pressing enter, a new line will be inserted (with some indentation if
your editor has auto-indent).

```clj
(foo
  bar
 |)
```

But according to Paren Mode's rules, the close-paren will be moved back to the
previous line:

```clj
(foo
  bar)
 |
```

This does not matter in Indent Mode because the close-paren will be moved to
the current line after we type something, but in Paren Mode, we must add a new
rule to allow close-parens at the start of a line if there is a cursor before
it.

```clj
(foo
  bar
 |)
```

This allows us to type something into this new line without the close-paren
being immediately displaced.  See [`onLeadingCloseParen`] for details.

And again, it's important to note that simply moving the cursor to another line
will reformat the line that was "suspended" by this cursor rule, restoring the
full rules of Paren Mode.

### Preserving Relative Indentation while typing

Unfortunately, Paren Mode needs extra help to preserve relative indentation
when the user inserts or deletes text behind an open-paren.  For example:

```clj
|(foo
   bar)
```

If the user inserts a space before `(foo`, we get:

```
_|(foo
   bar)
```


We expect the following line to be indented to preserve the relative indentation:

```
 |(foo
   _bar)
```

But as discussed previously, Paren Mode uses [`result.indentDelta`] to preserve
relative indentation.  So unless we influence this value at the cursor
whenever the user inserts or removes text, the relative indentation will not be
preserved.

Thus, we require the user's editor to send a `cursorDx` option as API input.
This is simply calculated by subtracting the previous cursor X position from
the current cursor X position, _but only when an edit takes place_.  Some
examples:

_Inserting_ a character results in a `cursorDx` of 1:

```diff
- |(foo
+  |(foo
```

_Pasting_ multiple lines of text below results in a `cursorDx` of 5:

```diff
- |(foo
+  pasted
+  text|(foo
```

_Pressing enter_ below results in a `cursorDx` of -4:

```diff
- (bar |(foo
+ (bar
+  |(foo
```

To make use of this information, the [`handleCursorDelta`] function adds
[`result.cursorDx`] to [`result.indentDelta`] when it reaches the cursor, thereby
preserving relative indentation of subsequent lines as expected.

### "Quote Danger": A conundrum

Inserting a quote can cause a hard-to-track problem, caused by syntax comments
interfering with the detection of unbalanced strings.

Suppose we have the following:

```clj
(foo
  "bar;")
```

Now suppose I want to insert the string `"pez"` after `foo`, like so:

```clj
(foo "pez"
  "bar;")
```

Let's follow what happens after I type the first quote:

```clj
(foo "
  "bar;")
```

Assume that we are working in an editor that does not auto-insert a matching
quote.  Or assume that we deleted the auto-matched quote thereafter.  Either
way, the syntax contains no unclosed quotes, because the semicolon has been
converted to a comment after its string was turned inside out.

Indent Mode will result in the following:

```clj
(foo "
  "bar);")
```

And after you finish typing `"pez"`, you end up with:

```clj
(foo "pez"
  "bar);")
```

Thus, this seemingly innocuous string insertion, we have corrupted the string
`"bar;"` to be `"bar);"`

The same problem can be seen from a different perspective in the following
example.  Suppose we have a comment that lists some special characters:

```clj
(foo
  ; " and ( and [
  bar)
```

This time, inserting a quote before the comment results in the contents of the _comment_
to be corrupted like so:

```clj
(foo "
  ; " and ( and [])
  bar)
```

The comment has been treated as code, and thus parens have been added/altered.
This is a process that will not be reversed after closing our initial string:

```clj
(foo "pez"
  ; " and ( and [])
  bar)
```

Both of these cases have been traced to the problem of unbalanced quotes inside comments.
They prevent Parinfer from detecting unclosed quotes.  Thus, we look for these kinds
of dangerous quotes inside comments, and we cancel processing if they are found.

This solution prevents problems of the first case, but can only warn of
impending problems of the second case. Fully preventing problems of the second
case may prove unwiedly since it would require a "trapdoor" shutoff.  That is,
it may involve displaying a warning to the user, turning off Parinfer
altogether, and forcing them to manually re-enable after they have determined
the problem to be fixed, since Parinfer cannot deduce that itself.

It should be noted that contiguous comments are considered part of the same comment
when deducing unbalanced strings.  This allows multiline strings
to be commented without triggering a "quote danger" warning:

```clj
(defn foo
  ; "multiline
  ; string"
  bar)
```

See [`result.quoteDanger`], which is updated by [`onQuote`].

## Questions?

I appreciate feedback! If I left something out, got something wrong, or you
just have questions or feedback, you can [email me] or use our [gitter
chatroom].  I'll answer questions as soon as I can.

[email me]:shaunewilliams@gmail.com
[gitter chatroom]:https://gitter.im/shaunlebron/parinfer

<!-- END OF DOC: All content below is overwritten by `update-doc-reflinks.sh` -->
[`isInteger`]:parinfer.js#L56
[`isOpenParen`]:parinfer.js#L62
[`isCloseParen`]:parinfer.js#L66
[`getInitialResult`]:parinfer.js#L78
[`cacheErrorPos`]:parinfer.js#L164
[`error`]:parinfer.js#L168
[`insertWithinString`]:parinfer.js#L189
[`replaceWithinString`]:parinfer.js#L197
[`removeWithinString`]:parinfer.js#L205
[`repeatString`]:parinfer.js#L212
[`getLineEnding`]:parinfer.js#L221
[`insertWithinLine`]:parinfer.js#L235
[`replaceWithinLine`]:parinfer.js#L240
[`removeWithinLine`]:parinfer.js#L245
[`initLine`]:parinfer.js#L250
[`commitChar`]:parinfer.js#L261
[`clamp`]:parinfer.js#L273
[`peek`]:parinfer.js#L283
[`isValidCloseParen`]:parinfer.js#L294
[`onOpenParen`]:parinfer.js#L301
[`onMatchedCloseParen`]:parinfer.js#L312
[`onUnmatchedCloseParen`]:parinfer.js#L320
[`onCloseParen`]:parinfer.js#L324
[`onTab`]:parinfer.js#L335
[`onSemicolon`]:parinfer.js#L341
[`onNewline`]:parinfer.js#L348
[`onQuote`]:parinfer.js#L353
[`onBackslash`]:parinfer.js#L369
[`afterBackslash`]:parinfer.js#L373
[`onChar`]:parinfer.js#L384
[`isCursorOnLeft`]:parinfer.js#L402
[`isCursorOnRight`]:parinfer.js#L410
[`isCursorInComment`]:parinfer.js#L419
[`handleCursorDelta`]:parinfer.js#L423
[`updateParenTrailBounds`]:parinfer.js#L441
[`clampParenTrailToCursor`]:parinfer.js#L465
[`removeParenTrail`]:parinfer.js#L494
[`correctParenTrail`]:parinfer.js#L511
[`cleanParenTrail`]:parinfer.js#L529
[`appendParenTrail`]:parinfer.js#L558
[`finishNewParenTrail`]:parinfer.js#L567
[`correctIndent`]:parinfer.js#L583
[`onProperIndent`]:parinfer.js#L605
[`onLeadingCloseParen`]:parinfer.js#L620
[`onIndent`]:parinfer.js#L637
[`processChar`]:parinfer.js#L654
[`processLine`]:parinfer.js#L679
[`finalizeResult`]:parinfer.js#L703
[`processError`]:parinfer.js#L719
[`processText`]:parinfer.js#L731
[`getChangedLines`]:parinfer.js#L752
[`publicResult`]:parinfer.js#L766
[`indentMode`]:parinfer.js#L783
[`parenMode`]:parinfer.js#L788
[`result.mode`]:parinfer.js#L82
[`result.origText`]:parinfer.js#L84
[`result.origLines`]:parinfer.js#L85
[`result.lines`]:parinfer.js#L88
[`result.lineNo`]:parinfer.js#L89
[`result.ch`]:parinfer.js#L90
[`result.x`]:parinfer.js#L91
[`result.parenStack`]:parinfer.js#L93
[`result.parenTrail`]:parinfer.js#L97
[`result.cursorX`]:parinfer.js#L104
[`result.cursorLine`]:parinfer.js#L105
[`result.cursorDx`]:parinfer.js#L106
[`result.isInCode`]:parinfer.js#L108
[`result.isEscaping`]:parinfer.js#L109
[`result.isInStr`]:parinfer.js#L110
[`result.isInComment`]:parinfer.js#L111
[`result.commentX`]:parinfer.js#L112
[`result.quoteDanger`]:parinfer.js#L114
[`result.trackingIndent`]:parinfer.js#L115
[`result.skipChar`]:parinfer.js#L116
[`result.success`]:parinfer.js#L117
[`result.maxIndent`]:parinfer.js#L119
[`result.indentDelta`]:parinfer.js#L120
[`result.error`]:parinfer.js#L123
[`result.errorPosCache`]:parinfer.js#L129
