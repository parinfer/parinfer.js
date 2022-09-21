# Indent Mode

## No Closers

Most basic behavior can be described by leaving out close-parens.

```in:1000
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

```in:1005
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

```in:1010
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

```in:1015
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

```in:1020
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

```in:1025
bar)
```

```out
bar
```

close-paren at end-of-line is wrong type:

```in:1030
(def foo [a b]]
```

```out
(def foo [a b])
```

insert missing close-paren inside another when at end-of-line:

```in:1035
(let [x {:foo 1 :bar 2]
  x)
```

```out
(let [x {:foo 1 :bar 2}]
  x)
```

unmatched close-parens _inside_ a line are removed:

```in:1040
(foo [a (|b] c)
```

```out
(foo [a (|b] c)
           ^ error: unmatched-close-paren
```

## Strings

No close-parens are inserted when a string is unclosed.

```in:1045
(def foo "as
```

```out
(def foo "as
         ^ error: unclosed-quote
```

even if close-parens are quoted out, do not do anything.

```in:1050
(defn foo [a "])
```

```out
(defn foo [a "])
             ^ error: unclosed-quote
```

Multiline strings are supported:

```in:1055
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

```in:1060
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

```in:1065
(let [a "])"
      b 2
```

```out
(let [a "])"
      b 2])
```

Escaped quotes are handled correctly.

```in:1070
(def foo "\""
```

```out
(def foo "\"")
```

A line ending inside a string will not have a definable Paren Trail.  This
minimal test case will fail if the close-paren is treated as a Paren Trail.

```in:1075
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

```in:1080
"|"foo"
```

```out
"|"foo"
      ^ error: unclosed-quote
```

Another case:

```in:1085
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
       ^ error: unclosed-quote
```

## Unbalanced Quotes in Comments

Unbalanced quotes can be accidentally rebalanced by comments containing an odd number of quotes,
so we do not want to process if any comments meet this critera.

Notice that the following code is correctly balanced, quite accidentally, but
Parinfer does not process it because the last line contains a comment with an
odd number of quotes (one):

```in:1090
(for [col columns]
  "|
  [:div.td {:style "max-width: 500px;"}])
```

```out
(for [col columns]
  "|
  [:div.td {:style "max-width: 500px;"}])
                                     ^ error: quote-danger
```

But a comment can contain an odd number of quotes if it is in a contiguous group of comments
which contain an even number of them.  This allows commenting out a multiline string without
any problems:

```in:1095
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

```in:1100
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

```in:1105
(defn foo [a b
  \[
  ret
```

```out
(defn foo [a b]
  \[
  ret)
```

```in:1110
(defn foo [a b]
  ret\)
```

```out
(defn foo [a b]
  ret\))
```

```in:1115
{:tag-open \[ :tag-close \]}
{:tag-open \[ :tag-close \]}
```

```out
{:tag-open \[ :tag-close \]}
{:tag-open \[ :tag-close \]}
```

Correctly handle escaped semicolons as characters instead of comments.
Otherwise, the inferred close-parens would be inserted before them.

```in:1120
(def foo \;
```

```out
(def foo \;)
```

Inferred close-parens are inserted after escaped whitespace.

```in:1125
(def foo \,
(def bar \ ; <-- space
```

```out
(def foo \,)
(def bar \ ); <-- space
```

Hanging backslash at end of line is invalid and causes processing to be abandoned.

```in:1130
(foo [a b\
  c)
```

```out
(foo [a b\
         ^ error: eol-backslash
  c)
```

## Comments

When commenting-out an inferred close-paren, a new one should be inserted
before it.

```in:1135
(def foo ;)
```

```out
(def foo) ;)
```

Commenting-out a line containing inferred close-parens should cause new ones to
be inserted at the previous non-empty line.

```in:1140
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

```in:1145
(let [a 1 ;; a comment
  ret)
```

```out
(let [a 1] ;; a comment
  ret)
```

escape character in comment untouched:

```in:1150
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

```in:1155
(def b |)
```

```out
(def b |)
```

Once the cursor leaves the line, the space is removed.

```in:1160
(def b )
```

```out
(def b)
```

Another example with more close-parens:

```in:1165
(def b [[c d] |])
```

```out
(def b [[c d] |])
```

Once the cursor leaves the line, the space is removed.

```in:1170
(def b [[c d] ])
```

```out
(def b [[c d]])
```

## Cursor Blocking displacement of Paren Trail

Inferred close-parens before the cursor are never removed, which may
cause indented lines below to be ignored.  This is to allow inserting a token
after such a close-paren.

For example, without the cursor on the first line, this is expected:

```in:1175
(let [a 1])
  ret)
```

```out
(let [a 1]
  ret)
```

With the cursor at the end of the first line, the indented line below does not affect it.

```in:1180
(let [a 1])|
  ret)
```

```out
(let [a 1])|
  ret
```

If this was not allowed, we would not be able to reach this valid state from
the previous state:

```in:1185
(let [a 1]) 2
  ret
```

```out
(let [a 1]) 2
  ret
```

But if the cursor is before such a close-paren, we are not in a position to
insert a token after it, thus indentation can affect it again:

```in:1190
(let [a 1]|)
  ret)
```

```out
(let [a 1]|
  ret)
```

If the cursor is in a comment after such a close-paren, we can safely move it:

```in:1195
(let [a 1]) ;|
  ret
```

```out
(let [a 1] ;|
  ret)
```

The cursor should not keep unmatched close-parens in the trail:

```in:1200
(foo)}}}}|
```

```out
(foo)|
```

```in:1205
(foo}}}}|)
```

```out
(foo|)
```

## Leading close-parens

Leading close-parens can cause many problems that we can ignore by simply removing
them, which is what we do when `forceBalance` is enabled. (currently can't enable
these in tests).

If `forceBalance` is not on, we suspend Indent Mode.

```in:1210
(foo
  ) bar
```

```out
(foo
  ) bar
  ^ error: leading-close-paren
```

It is allowed if the leading parens are also in paren trail:

```in:1215
(foo
  ); comment
```

```out
(foo)
  ; comment
```

If there's more than one, point to the first one.

```in:1220
[(foo
  )] bar
```

```out
[(foo
  )] bar
  ^ error: leading-close-paren
```

## Unmatched close-parens

I've tried some inference algorithms to resolve unmatched close-parens (see
[#131]), but they didn't work out due to reasons stated in the issue.  The
following cases demonstrate many edge cases that would have to be resolved if
ever approached again.

[#131]:https://github.com/shaunlebron/parinfer/issues/131

Inserting a `(` inside a nested vector:

```in:1225
(foo [bar (|...] baz)
```

```out
(foo [bar (|...] baz)
               ^ error: unmatched-close-paren
```

Inserting a `]` inside a nested list:

```in:1230
(foo [bar (]| baz)])
```

```out
(foo [bar (]| baz)])
           ^ error: unmatched-close-paren
```

Inserting a `]` ahead of another inside a list (maybe to "barf" the end of the
vector).

```in:1235
[... (foo [bar ]| baz]  ...)]
```

```out
[... (foo [bar ]| baz]  ...)]
                     ^ error: unmatched-close-paren
```

Suppose you just backspaced a `[` below:

```in:1240
(let [{:keys |foo bar]} my-map])
```

```out
(let [{:keys |foo bar]} my-map])
                     ^ error: unmatched-close-paren
```

Inserting a matched `)` inside nested expressions sometimes works out:

```in:1245
(a (b (c))| d) e)
```

```out
(a (b (c))| d) e
```

Inserting a matched `(` inside nested expressions sometimes works out too:

```in:1250
(a (b (c(|) d) e)
```

```out
(a (b (c(|) d) e))
```

But all it takes is one different kind of a paren to keep it from working:

```in:1255
(f [x (a (b c(|) d) y] g)
```

```out
(f [x (a (b c(|) d) y] g)
                     ^ error: unmatched-close-paren
```

Unmatched close-parens on indented lines present similar issues.
For example, inserting a `)` below:

```in:1260
(foo
  bar)| baz) qux
```

```out
(foo
  bar)| baz) qux
           ^ error: unmatched-close-paren
```

```in:1265
(foo
  [bar
   bar)| baz
   bar])
```

```out
(foo
  [bar
   bar)| baz
      ^ error: unmatched-close-paren
   bar])
```

Or when dedenting a line makes an inner close-paren unmatched:

```in:1270
(foo
  [bar]
|bar) baz
```

```out
(foo
  [bar]
|bar) baz
    ^ error: unmatched-close-paren
```

In the same example, a different similar problem emerges when indenting a line
makes the same inner close-paren unmatched:

```in:1275
(foo
 [bar]
  |bar) baz
```

```out
(foo
 [bar]
  |bar) baz
      ^ error: unmatched-close-paren
```

The same problem demonstrated for another dedenting example:

```in:1280
(foo
 [bar
 bar]) baz
```

```out
(foo
 [bar
 bar]) baz
    ^ error: unmatched-close-paren
```

## Cursor Shifting

Commenting an inferred close-paren

```in:1285
(foo bar ;|)
```

```out
(foo bar) ;|)
```

Commenting multiple inferred close-parens

```in:1290
(let [x 1
      y 2;|])
```

```out
(let [x 1
      y 2]);|])
```

When typing an open-paren, a close-paren should come after the cursor:

```in:1295
(|
```

```out
(|)
```

## Tab Stops

We can return the positions of the open-parens whose structure would be
affected by the indentation of the current cursor line.  This allows editors to
use them to create tab stops for smart indentation snapping.

```in:1300
(def x [1 2 3])
(def y 2)
|
```

```out
(def x [1 2 3])
(def y 2)
^    > tabStops
|
```

The `>` means the position of the first arg after an open-paren, because some styles
use it for alignment.

```in:1305
(foo bar
  (baz boo))
|
```

```out
(foo bar
  (baz boo))
^ ^    > tabStops
|
```

```in:1310
(let [a {:foo 1}
      |
      bar [1 2 3]]
  bar)
```

```out
(let [a {:foo 1}
^    ^  ^     > tabStops
      |
      bar [1 2 3]]
  bar)
```


```in:1315
(let [a {:foo 1}
      bar (func 1 2 3)]
  |
  bar)
```

```out
(let [a {:foo 1}
      bar (func 1 2 3)]
^    ^    ^     > tabStops
  |
  bar)
```

## Paren Trails

We return non-empty Paren Trails so plugins can dim them with markers:

```in:1320
(defn foo
  "hello, this is a docstring"
  [a b]
  (let [sum (+ a b)
        prod (* a b)]
     {:sum sum
      :prod prod}))
```

```out
(defn foo
  "hello, this is a docstring"
  [a b]
      ^ parenTrail
  (let [sum (+ a b)
                  ^ parenTrail
        prod (* a b)]
                   ^^ parenTrail
     {:sum sum
      :prod prod}))
                ^^^ parenTrail
```
