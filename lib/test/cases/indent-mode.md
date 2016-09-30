# Indent Mode

## No Closers

Most basic behavior can be described by leaving out close-parens.

```in
(defn foo
  [arg
  ret
```

```out
(defn foo
  [arg]
  ret)
```

indenting line 3:

```in
(defn foo
  [arg
   ret
```

```out
(defn foo
  [arg
   ret])
```

dedenting line 2:

```in
(defn foo
[arg
   ret
```

```out
(defn foo)
[arg
   ret]
```

dedenting line 2 and 3:

```in
(defn foo
[arg
ret
```

```out
(defn foo)
[arg]
ret
```

multiple functions:

```in
(defn foo
  [arg
  ret

(defn foo
  [arg
  ret
```

```out
(defn foo
  [arg]
  ret)

(defn foo
  [arg]
  ret)
```

## Bad Closers

close-paren at end-of-line with no open-paren:

```in
bar)
```

```out
bar
```

close-paren at end-of-line is wrong type:

```in
(def foo [a b]]
```

```out
(def foo [a b])
```

insert missing close-paren inside another when at end-of-line:

```in
(let [x {:foo 1 :bar 2]
  x)
```

```out
(let [x {:foo 1 :bar 2}]
  x)
```

close-paren _inside_ a line is unmatched:

```in
(foo [a (b] c)
```

```out
(foo [a (b] c)
          ^ unmatched-close-paren
```

## Strings

No close-parens are inserted when a string is unclosed.

```in
(def foo "as
```

```out
(def foo "as
         ^ unclosed-quote
```

even if close-parens are quoted out, do not do anything.

```in
(defn foo [a "])
```

```out
(defn foo [a "])
             ^ unclosed-quote
```

Multiline strings are supported:

```in
(defn foo
  "This is docstring.
  Line 2 here."
  ret
```

```out
(defn foo
  "This is docstring.
  Line 2 here."
  ret)
```

Indentation inside multiline strings does not trigger Parinfer's indentation rules.

```in
(let [a "Hello
World"
      b 2
  ret
```

```out
(let [a "Hello
World"
      b 2]
  ret)
```

Close-parens are ignored when inside strings.

```in
(let [a "])"
      b 2
```

```out
(let [a "])"
      b 2])
```

Escaped quotes are handled correctly.

```in
(def foo "\""
```

```out
(def foo "\"")
```

A line ending inside a string will not have a definable Paren Trail.  This
minimal test case will fail if the close-paren is treated as a Paren Trail.

```in
()"
"
```

```out
()"
"
```

## Unbalanced Quotes

__NOTE:__ The pipe `|` represents the cursor, and its character is removed from
input.  We use it here to suggest that the user has just typed the character to
the left of the cursor.

Typing a quote before another string does not corrupt it (i.e. turn it inside
out, causing Parinfer to treat its contents as code).

```in
"|"foo"
```

```out
"|"foo"
      ^ unclosed-quote
```

Another case:

```in
(def foo
  "|
  "(a b)
      c")
```

```out
(def foo
  "|
  "(a b)
      c")
       ^ unclosed-quote
```

## Unbalanced Quotes in Comments

Unbalanced quotes can be accidentally rebalanced by comments containing an odd number of quotes,
so we do not want to process if any comments meet this critera.

Notice that the following code is correctly balanced, quite accidentally, but
Parinfer does not process it because the last line contains a comment with an
odd number of quotes (one):

```in
(for [col columns]
  "|
  [:div.td {:style "max-width: 500px;"}])
```

```out
(for [col columns]
  "|
  [:div.td {:style "max-width: 500px;"}])
                                     ^ quote-danger
```

But a comment can contain an odd number of quotes if it is in a contiguous group of comments
which contain an even number of them.  This allows commenting out a multiline string without
any problems:

```in
(def foo [a b]
  ; "my multiline
  ; docstring."
ret)
```

```out
(def foo [a b])
  ; "my multiline
  ; docstring."
ret
```

Escaped strings are not counted when determining odd number of quotes in a comment.

```in
(def foo [a b]
  ; ""\"
ret)
```

```out
(def foo [a b])
  ; ""\"
ret
```

## Character syntax

Correctly handle escaped parens as literal characters.

```in
(defn foo [a b
  \[
  ret
```

```out
(defn foo [a b]
  \[
  ret)
```

```in
(defn foo [a b]
  ret\)
```

```out
(defn foo [a b]
  ret\))
```

```in
{:tag-open \[ :tag-close \]}
{:tag-open \[ :tag-close \]}
```

```out
{:tag-open \[ :tag-close \]}
{:tag-open \[ :tag-close \]}
```

Correctly handle escaped semicolons as characters instead of comments.
Otherwise, the inferred close-parens would be inserted before them.

```in
(def foo \;
```

```out
(def foo \;)
```

Inferred close-parens are inserted after escaped whitespace.

```in
(def foo \,
(def bar \ ; <-- space
```

```out
(def foo \,)
(def bar \ ); <-- space
```

Hanging backslash at end of line is invalid and causes processing to be abandoned.

```in
(foo [a b\
  c)
```

```out
(foo [a b\
         ^ eol-backslash
  c)
```

## Comments

When commenting-out an inferred close-paren, a new one should be inserted
before it.

```in
(def foo ;)
```

```out
(def foo) ;)
```

Commenting-out a line containing inferred close-parens should cause new ones to
be inserted at the previous non-empty line.

```in
(let [a 1
      b 2
      c {:foo 1
         ;; :bar 2}]
  ret)
```

```out
(let [a 1
      b 2
      c {:foo 1}]
         ;; :bar 2}]
  ret)
```

Inferred close-parens are inserted before comments.

```in
(let [a 1 ;; a comment
  ret)
```

```out
(let [a 1] ;; a comment
  ret)
```

escape character in comment untouched:

```in
; hello \n world
```

```out
; hello \n world
```

---

## Cursor Padding in Paren Trail

__NOTE__: the pipe `|` represents the cursor, but the character is removed from the input.

Inferred close-parens can only be inserted to the right of the cursor (if it is present).
This allows us to insert a space before typing a new token.

```in
(def b |)
```

```out
(def b |)
```

Once the cursor leaves the line, the space is removed.

```in
(def b )
```

```out
(def b)
```

Another example with more close-parens:

```in
(def b [[c d] |])
```

```out
(def b [[c d] |])
```

Once the cursor leaves the line, the space is removed.

```in
(def b [[c d] ])
```

```out
(def b [[c d]])
```

This realignment of inferred close-parens also happens when the
cursor is to the left of the gaps.

```in
(def |b [[c d] ])
```

```out
(def |b [[c d]])
```

## Cursor Blocking displacement of Paren Trail

Inferred close-parens before the cursor are never removed, which may
cause indented lines below to be ignored.  This is to allow inserting a token
after such a close-paren.

For example, without the cursor on the first line, this is expected:

```in
(let [a 1])
  ret)
```

```out
(let [a 1]
  ret)
```

With the cursor at the end of the first line, the indented line below does not affect it.

```in
(let [a 1])|
  ret)
```

```out
(let [a 1])|
  ret
```

If this was not allowed, we would not be able to reach this valid state from
the previous state:

```in
(let [a 1]) 2
  ret
```

```out
(let [a 1]) 2
  ret
```

But if the cursor is before such a close-paren, we are not in a position to
insert a token after it, thus indentation can affect it again:

```in
(let [a 1]|)
  ret)
```

```out
(let [a 1]|
  ret)
```

If the cursor is in a comment after such a close-paren, we can safely move it:

```in
(let [a 1]) ;|
  ret
```

```out
(let [a 1] ;|
  ret)
```

## Cursor Behind Standalone Close-Parens

It is common to press enter when the cursor is the left of a close-paren.
Since a line cannot start with a close-paren, they are moved back to where
they were.

```in
(let [a 1
      |])
```

```out
(let [a 1])
      |
```

The close-parens will move back once you start typing something:

```in
(let [a 1])
      b|
```

```out
(let [a 1
      b|])
```

Some may prefer to allow the parentheses to stay after the cursor even before
typing.  Thus, you can enable a `previewCursorScope` option that will allow you
to preview where the Paren Trail would be after inserting text at the cursor.

```in
(let [a 1
      |])
      ^ previewCursorScope
```

```out
(let [a 1
      |])
```

If you place the cursor on an empty line, `previewCursorScope` will allow you
to see where the paren trail will go, revealing the cursor's current scope.

```in
(let [a 1])
  |
  ^ previewCursorScope
```

```out
(let [a 1]
  |)
```

Moving the cursor back will adjust the scope.

```in
(let [a 1]
 | ); <-- space
 ^ previewCursorScope
```

```out
(let [a 1]
 |) ; <-- space
```

The following will not preview cursor scope, because doing so
will change the AST.

```in
(let [a 1]
|
^ previewCursorScope
  (+ a 2))
```

```out
(let [a 1]
|
  (+ a 2))
```

This also does not mean we can hold all leading close-parens
in place.  The following example represents an unsupported case:

```in
(let [a 1
      |] b)
      ^ previewCursorScope
```

```out
(let [a 1
      | b])
```

This is expected behavior, but the common path to this state (i.e. pressing
enter at `(let [a 1|] b)`) is handled using an explicit action external to
Indent Mode.

## Cursor Shifting

Commenting an inferred close-paren

```in
(foo bar ;|)
```

```out
(foo bar) ;|)
```

Commenting multiple inferred close-parens

```in
(let [x 1
      y 2;|])
```

```out
(let [x 1
      y 2]);|])
```

When typing an open-paren, a close-paren should come after the cursor:

```in
(|
```

```out
(|)
```

## Tab Stops

We can return the positions of the open-parens whose structure would be
affected by the indentation of the current cursor line.  This allows editors to
use them to create tab stops for smart indentation snapping.

```in
(def x [1 2 3])
(def y 2)
|
```

```out
(def x [1 2 3])
(def y 2)
^ tabStop
|
```

```in
(let [a {:foo 1}
      |
      bar [1 2 3]]
  bar)
```

```out
(let [a {:foo 1}
^    ^  ^           tabStops
      |
      bar [1 2 3]]
  bar)
```


```in
(let [a {:foo 1}
      bar [1 2 3]]
  |
  bar)
```

```out
(let [a {:foo 1}
^    ^                tabStops
      bar [1 2 3]]
          ^           tabStop
  |
  bar)
```
