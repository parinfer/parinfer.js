# Parinfer Design & Implementation

Since [Parinfer's home page] must gloss over details for the sake of
presentation, this document is written to provide supplemental context for
developers who want to explore and understand its implementation.

In its simplest form, Parinfer is a file formatter.  In this way, it can format
a file under the assumption that the file has been saved and is ready for
processing. It is just a thing that takes a document, and returns a new
document.

But of course, Parinfer was first and foremost designed to work in a
Live-Editing environment.  That is, Parinfer is meant to auto-process while you
type.  This requires some extra rules, so it helps to cover the rules of its
simpler form first.

Thus, we cover the design and implementation of Parinfer in two parts:

[Parinfer's home page]:http://shaunlebron.github.io/parinfer/
[`parinfer.js`]:../parinfer.js

--

[<strong>Part 1</strong>](#part-1---parinfer-for-a-static-file) - _Parinfer for a Static File_

- [Processing the Text](#processing-the-text)
- [Finding Parens](#finding-parens)
- [Cleaning](#cleaning)
  - [Tab Characters](#tab-characters)
  - [Unmatched Close Parens](#unmatched-close-parens)
- [Analyzing a Line](#analyzing-a-line)
  - [Indentation](#indentation)
  - [Paren Trail](#paren-trail)
- [Transformations](#transformations)
  - [Indent Mode](#indent-mode)
  - [Paren Mode](#paren-mode)
- [Subtleties](#subtleties)
  - [Absorbing Paren Trails](#absorbing-paren-trails)
  - [Preserving Relative Indentation](#preserving-relative-indentation)

--

[<strong>Part 2</strong>](#part-2---parinfer-for-live-editing) - _Parinfer for Live-Editing_

- [The Cursor in Indent Mode](#the-cursor-in-indent-mode)
- [The Cursor in Paren Mode](#the-cursor-in-paren-mode)
- [Seeing Cursor Scope in Indent Mode](#seeing-cursor-scope-in-indent-mode)
- [Correcting the Cursor Position](#correcting-the-cursor-position)
- [Preserving Relative Indentation while typing](#preserving-relative-indentation-while-typing)
- [Dangerous Quotes](#dangerous-quotes)
  - [String Corruption](#string-corruption)
  - [Comment Corruption](#comment-corruption)
  - [Risk Management](#risk-management)
- [Incremental Processing](#incremental-processing)
  - [Speed](#speed)
  - [Slower Languages](#slower-languages)

--

 <table>
<tr>
<td>
NOTE
</td>
<td>
While discussing design here, we include frequent references to the relevant
code inside [`parinfer.js`] so that you may jump back and forth between
implementation and narrative.
</td>
</tr>
</table>


--

# Part 1 - Parinfer for a Static File

As we said earlier, Parinfer was built for Live-Editing, but it helps to first
remove the parameters required by human interaction and intent.  Thus, we say
"Static File" to mean some Lisp file that has been committed, shared, and ready
for processing.

Parinfer performs a well-defined, full file text transformation in one pass.
Depending on the transformation mode, Parinfer will correct either indentation
or close-parens, according to standard Lisp formatting conventions.  The
following functions are available.  (See [API](README.md#api) for full details.)

- [`indentMode`] - uses indentation to correct parens
- [`parenMode`] - uses parens to correct indentation

## Processing the Text

Parinfer starts its processing with the following functions, each iteratively
calling the one below it:

- [`processText`]
- [`processLine`]
- [`processChar`]

We explicitly track the state of our system in a `result` object, initialized
by [`getInitialResult`].  Though it can be considered a global variable, we just
pass it as the first argument to any function that will read or update it.
That way, it is clear which functions are doing so from their signature.

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

Unmatched close-parens used to be removed indiscriminately.  This was a mistake
that caused _undesirable_ and _irreversible_ code transformations in some cases.
For example:

```clj
(let [{:keys } some-map])   ;; 1. Everything is balanced currently

(let [{:keys [} some-map])  ;; 2. When we type a `[` before `}`
              ^             ;; <-- then `}` becomes unmatched

(let [{:keys [ some-map]}]) ;; 3. If we remove the unmatched `}` in Indent Mode
                        ^   ;; <-- it will end up reinserted here.

(let [{:keys  some-map}])   ;; 4. Removing the initial `[` does not return the
                            ;;    code to its original form.
```

Thus, we do not indiscriminately remove unmatched close-parens as of `2.0.0`.
Instead, we halt Parinfer until these unmatched close parens are resolved, which
we mark by returning an [`ERROR_UNMATCHED_CLOSE_PAREN`] with the location of the
offending character.

_This detection happens at [`onUnmatchedCloseParen`]._

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

## Transformations

The type of transformation performed is determined by the Mode.  These modes
can be described using definitions from the previous sections:

- __Indent Mode__
  - When we identify a _Paren Trail_, we pop it from the stack.  See [`popParenTrail`].
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

Then we remove it with [`popParenTrail`].

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

## Subtleties

Here we explore extra subtle transformations that are added to the modes that
we require.

### Absorbing Paren Trails

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
  ) z)
  ^

;; AFTER
(foo
  (bar)
   z) ^
```

_Indent Mode_ accomplishes this simply by removing these leading close-parens,
since moving it to the end of the previous line would result in it being
removed anyway by [`popParenTrail`].

_Paren Mode_ will move any leading close-parens to the end of the previous Paren
Trail.

_See the [`onLeadingCloseParen`] function for details._

### Correcting the Cursor Position

When Parinfer adds, removes, or replaces parts of a line, the user will expect
the cursor to shift appropriately.  For example, suppose we just pressed enter
below (where `|` is the cursor):

```clj
(let [x 1
|])
```

Paren Mode will correct the text, but the cursor will be left behind:

```clj
(let [x 1
|     ])
```

As another example, suppose we type an unmatched `}`:

```clj
(foo}|)
```

Parinfer will delete the `}`, but if the cursor isn't corrected, it'll look
like it jumped over the next character:

```clj
(foo)|
```

To fix this, we must monitor when Parinfer edits a line because these changes
are the source of motion for the cursor.  [`replaceWithinLine`] is called
anytime such a change occurs, so it in turn calls [`shiftCursorOnEdit`] to perform
the necessary cursor changes.

Generally, a line edit replaces of a region with new text.  An insertion and
removal can be described as special case replacements:

- an _insertion_ replaces a zero-width region with text
- a _removal_ replaces a region with nothing

Given this, we assume a simplified heuristic that if a region of a line shrinks
or grows, the cursor will keep the same relative distance to the right side of
the region.  But we only apply this if the cursor is to the right of the
region.  We do not consider the case of the cursor being inside the region
since it doesn't seem to come up in practice.

Unfortunately, this gets tricky when _inserting_ text directly at the cursor
because we have conflicting expectations for different cases.

For example, if indentation is inserted at the cursor, we want the cursor to be
pushed forward:

```clj
|foo      ;; BEFORE
  |foo    ;; AFTER
```

For another example, typing an open-paren in Indent Mode may result in a
close-paren being inserted at the cursor.  In this case, we want the cursor
to stay put instead of being pushed forward:

```clj
(|        ;; BEFORE
(|)       ;; AFTER
```

As a hack, we distinguish between these two cases by only pushing the cursor
forward if the cursor is at the front of the line. This works because
close-paren insertions will never happen at the front of a line.  See
[`isCursorAffected`].

### Preserving Relative Indentation

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

## Part 2 - Parinfer for Live-Editing

For the most part, using the rules we've described for a Static File will work
for Live-Editing (i.e. auto-processing the content of an editor window or
REPL).  But Parinfer's behavior can sometimes be in conflict with a user's
expectations for normal editing behavior.  Thus, we add additional rules to try
to bridge the two worlds together.

When used for Live-Editing, the mode functions are expected to be debounced on
keypress for performance.  The `options` parameter is used for specifying
cursor position and movement.

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

### Seeing Cursor Scope in Indent Mode

In Indent Mode, when a user has their cursor on an empty line, it may be useful
for them to always see the "scope" of the cursor.  For example, if we had
the cursor here:

```clj
(let [foo 1
      bar 2])
  |
```

It may be more beneficial for the user to see this, so that it's clear where
text will be inserted before ever typing it:

```clj
(let [foo 1
      bar 2]
  |)
```

For another example:

```clj
(let [foo 1
      bar 2|])
```

If the user presses Enter, and if the editor auto-indents correctly, they will
see this:

```clj
(let [foo 1
      bar 2
      |])
```

And if we move the cursor back a bit...

```clj
(let [foo 1
      bar 2
  |    ])
```

...the text will be transformed to accomodate the new cursor position:

```clj
(let [foo 1
      bar 2]
  |)
```

When moving the cursor to another line, normal formatting rules apply:

```clj
(let [foo 1
      bar 2])
```

Intuitively, we only want to show cursor scope if it is appending close-parens
to the cursor.  For example, how would you show the cursor scope here?

```clj
(let [foo 1
      bar 2]
|
  (+ foo bar))
```

You cannot show cursor scope by appending close-parens to the cursor here, so we
do not bother.  More precisely, trying to do something clever like showing the
effect on all Paren Trails if you were to insert text would show:

```clj
(let [foo 1
      bar 2])
|
  (+ foo bar)
```

But this is not what the user expects to see when moving the cursor around.  It
also has the unfortunate side effect of modifying the AST, allowing the user to
accidentally corrupt the code when saving the file.

All in all, it's not technically necessary to allow the user to see the cursor
scope since typing would reveal the same close-parens anyway. Nonetheless, it
is both a useful UX option and one that can be implemented in a manner
consistent to Parinfer's system.

_See [`result.previewCursorScope`] to enable._

--

__Implementation-wise__, we define this as a special rule which only applies to
_lines containing whitespace, close-parens, or comments_.  This is determined
by [`initPreviewCursorScope`], called by [`initIndent`] at the start of every
line.  If a cursor is found on such a line and the cursor is not inside a
comment, then it will set [`result.canPreviewCursorScope`] to `true` to
proceed.

Whenever the next indentation point is encountered, [`onIndent`] will call
[`tryPreviewCursorScope`], because it is at this moment that we can verify if
the cursor is in a safe place to show scope.  The cursor must be to the right
of this indentation point.  And if it is, we retroactively apply a new
indentation point and Paren Trail at the cursor.  This will naturally append
appropriate close-parens to the cursor.

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

### Dangerous Quotes

Inserting a quote can sometimes cause a problem that is hard to track down.
This is caused by syntax comments interfering with the detection of unbalanced
strings.

#### String Corruption

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

The problem happens as soon as I type the first quote, before I can finish
the rest of the string:

```clj
(foo "|
  "bar;")
```

Take a moment to look at the expression again.  Even though we haven't closed
our current string yet, there are no unclosed quotes.  This is because the
semicolon is now commenting out the last quote, which we did not intend
to create a temporarily balanced set of quotes.

Thus, Indent Mode will result in the following:

```clj
(foo "
  "bar);")
```

Thus, through this seemingly innocuous string insertion, we have managed to
corrupt the string `"bar;"` to `"bar);"`:

```diff
 (foo "pez"
-  "bar;")
+  "bar);")
```

#### Comment Corruption

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
(foo "|
  ; " and ( and [])
  bar)
```

What was previously a comment is now being treated as code, and thus parens
have been added/altered.  Thus, after completing another seemingly innocuous
string insertion, we have corrupted a comment:

```diff
 (foo "pez"
-  ; " and ( and [
+  ; " and ( and [])
   bar)
```

#### Risk Management

--

##### The Root Cause

The astute observer may have also realized that the problems occurred either
before or after _an unbalanced quote was found inside a comment_.  This is in
fact what interferes with how Parinfer detects unclosed quotes, and thus
prevents Parinfer from canceling its processing.  Thus, we look for these kinds
of dangerous quotes inside comments.

```clj
(foo "|
  "bar);")          ;; <-- dangerous quote from String Corruption example
        ^
```

```clj
(foo
  ; " and ( and [   ;; <-- dangerous quote from Comment Corruption example
    ^
  bar)
```

> Interestingly, none of this would be a problem if programmers used
> directional quotes `“` `”` in their code.  Instead, the non-directional quote
> `"` must infer its direction from the number of quotes behind it. (Imagine
> the difficulty of working with non-directional parens!)  Thus, the root cause
> of this problem is enabled by a perfect storm of unbalanced, non-directional
> quotes and their ability to be temporarily balanced when accidentally thrust
> into or out of comments.

--

##### Prevention

It turns out that canceling the processing when "dangerous quotes" are detected
either prevents the problems or can provide a warning to the user early enough
to fix it.

As long as no dangerous quotes were detected beforehand, it seems that no
corruption can happen while typing out a comment or a string.  Rather,
corruption seems to only happen when starting a new string before a comment
housing a dangerous quote, so it stands to reason that we can provide a warning
before the catalyst quote is inserted.

The warning will not prevent the catalyst quote from being inserted and causing
a problem.  It will simply suspend processing until the code contains no
dangerous quotes.  Parinfer cannot deduce what the user intends or doesn't
intend to constitute balanced quotes.  Thus, the user must react to these
emitted warnings with care.

It should be noted that contiguous comments are considered part of the same comment
when deducing unbalanced strings.  This allows multiline strings
to be commented without triggering a warning:

```clj
(defn foo
  ; "multiline   ;; <-- dangerous unbalanced quote!
  ; string"      ;; <-- but this contiguous comment rebalances it.
  bar)
```

Detection of dangerous quotes inside comments is done simply by toggling
[`result.quoteDanger`] everytime an unescaped quote is encountered inside a
comment.  This happens in [`onQuote`], and we check if an error should be
reported at [`onIndent`] since that moment signifies that no contiguous
comments follow.

--

### Incremental Processing

You may be wondering why we have to process the whole file again after only a
small portion of the file has changed.  The short answer is that I haven't
figured out the best way to do this yet.  But the implementation seems fast
enough for full-file processing every time.

#### Speed

The current JS and JVM implementations can process a ~2800 line file at 60-100
times a second, which is close to the smallest visual delay we can perceive.

Fast typists can type around 8 characters per second (~120wpm), so Parinfer can
process a file 8-10 times in between these fast keystrokes.

#### Slower Languages

If Parinfer must be ported to a slower language, we may not be able to process
the full file everytime.  Rather, we can just process the top-level expressions
affected by the edit.

There is a pending feature here: [#91](https://github.com/shaunlebron/parinfer/issues/91)

## Questions?

I appreciate feedback! If I left something out, got something wrong, or you
just have questions or feedback, you can [email me] or use our [gitter
chatroom].  I'll answer questions as soon as I can.

[email me]:shaunewilliams@gmail.com
[gitter chatroom]:https://gitter.im/shaunlebron/parinfer

<!-- END OF DOC: All content below is overwritten by `sync.sh` -->
[`SENTINEL_NULL`]:../parinfer.js#L39
[`INDENT_MODE`]:../parinfer.js#L41
[`BACKSLASH`]:../parinfer.js#L44
[`LINE_ENDING_REGEX`]:../parinfer.js#L52
[`STANDALONE_PAREN_TRAIL`]:../parinfer.js#L55
[`PARENS`]:../parinfer.js#L57
[`ERROR_QUOTE_DANGER`]:../parinfer.js#L177
[`ERROR_EOL_BACKSLASH`]:../parinfer.js#L178
[`ERROR_UNCLOSED_QUOTE`]:../parinfer.js#L179
[`ERROR_UNCLOSED_PAREN`]:../parinfer.js#L180
[`ERROR_UNMATCHED_CLOSE_PAREN`]:../parinfer.js#L181
[`ERROR_UNHANDLED`]:../parinfer.js#L182
[`errorMessages`]:../parinfer.js#L184
[`API`]:../parinfer.js#L902
[`isBoolean`]:../parinfer.js#L66
[`isInteger`]:../parinfer.js#L70
[`isOpenParen`]:../parinfer.js#L76
[`isCloseParen`]:../parinfer.js#L80
[`getInitialResult`]:../parinfer.js#L92
[`cacheErrorPos`]:../parinfer.js#L192
[`error`]:../parinfer.js#L196
[`replaceWithinString`]:../parinfer.js#L217
[`repeatString`]:../parinfer.js#L225
[`getLineEnding`]:../parinfer.js#L234
[`isCursorAffected`]:../parinfer.js#L248
[`shiftCursorOnEdit`]:../parinfer.js#L256
[`replaceWithinLine`]:../parinfer.js#L269
[`insertWithinLine`]:../parinfer.js#L277
[`initLine`]:../parinfer.js#L281
[`commitChar`]:../parinfer.js#L293
[`clamp`]:../parinfer.js#L305
[`peek`]:../parinfer.js#L315
[`isValidCloseParen`]:../parinfer.js#L326
[`onOpenParen`]:../parinfer.js#L333
[`onMatchedCloseParen`]:../parinfer.js#L344
[`onUnmatchedCloseParen`]:../parinfer.js#L352
[`onCloseParen`]:../parinfer.js#L359
[`onTab`]:../parinfer.js#L370
[`onSemicolon`]:../parinfer.js#L376
[`onNewline`]:../parinfer.js#L383
[`onQuote`]:../parinfer.js#L388
[`onBackslash`]:../parinfer.js#L404
[`afterBackslash`]:../parinfer.js#L408
[`onChar`]:../parinfer.js#L419
[`isCursorOnLeft`]:../parinfer.js#L437
[`isCursorOnRight`]:../parinfer.js#L445
[`isCursorInComment`]:../parinfer.js#L454
[`handleCursorDelta`]:../parinfer.js#L458
[`resetParenTrail`]:../parinfer.js#L474
[`updateParenTrailBounds`]:../parinfer.js#L484
[`clampParenTrailToCursor`]:../parinfer.js#L504
[`popParenTrail`]:../parinfer.js#L533
[`correctParenTrail`]:../parinfer.js#L548
[`cleanParenTrail`]:../parinfer.js#L566
[`appendParenTrail`]:../parinfer.js#L595
[`invalidateParenTrail`]:../parinfer.js#L604
[`finishNewParenTrail`]:../parinfer.js#L613
[`correctIndent`]:../parinfer.js#L632
[`tryPreviewCursorScope`]:../parinfer.js#L654
[`onIndent`]:../parinfer.js#L668
[`onLeadingCloseParen`]:../parinfer.js#L684
[`checkIndent`]:../parinfer.js#L700
[`initPreviewCursorScope`]:../parinfer.js#L715
[`initIndent`]:../parinfer.js#L726
[`setTabStops`]:../parinfer.js#L740
[`processChar`]:../parinfer.js#L761
[`processLine`]:../parinfer.js#L786
[`finalizeResult`]:../parinfer.js#L808
[`processError`]:../parinfer.js#L825
[`processText`]:../parinfer.js#L837
[`getChangedLines`]:../parinfer.js#L858
[`publicResult`]:../parinfer.js#L872
[`indentMode`]:../parinfer.js#L892
[`parenMode`]:../parinfer.js#L897
[`result.mode`]:../parinfer.js#L96
[`result.origText`]:../parinfer.js#L98
[`result.origLines`]:../parinfer.js#L100
[`result.lines`]:../parinfer.js#L103
[`result.lineNo`]:../parinfer.js#L104
[`result.ch`]:../parinfer.js#L105
[`result.x`]:../parinfer.js#L106
[`result.parenStack`]:../parinfer.js#L108
[`result.tabStops`]:../parinfer.js#L112
[`result.parenTrail`]:../parinfer.js#L116
[`result.cursorX`]:../parinfer.js#L123
[`result.cursorLine`]:../parinfer.js#L124
[`result.cursorDx`]:../parinfer.js#L125
[`result.previewCursorScope`]:../parinfer.js#L126
[`result.canPreviewCursorScope`]:../parinfer.js#L127
[`result.isInCode`]:../parinfer.js#L129
[`result.isEscaping`]:../parinfer.js#L130
[`result.isInStr`]:../parinfer.js#L131
[`result.isInComment`]:../parinfer.js#L132
[`result.commentX`]:../parinfer.js#L133
[`result.firstUnmatchedCloseParenX`]:../parinfer.js#L135
[`result.quoteDanger`]:../parinfer.js#L137
[`result.trackingIndent`]:../parinfer.js#L138
[`result.skipChar`]:../parinfer.js#L139
[`result.success`]:../parinfer.js#L140
[`result.maxIndent`]:../parinfer.js#L142
[`result.indentDelta`]:../parinfer.js#L143
[`result.error`]:../parinfer.js#L146
[`result.errorPosCache`]:../parinfer.js#L152
