# Paren Mode

## Indentation Threshold Clamping

clamp left

```in:2000
(let [foo 1]
foo)
```

```out
(let [foo 1]
 foo)
```

clamp right

```in:2005
(let [foo 1]
      foo)
```

```out
(let [foo 1]
     foo)
```

```in:2010
(let [foo {:a 1}]
           foo)
```

```out
(let [foo {:a 1}]
     foo)
```

sanity check to apply rules to multiple expressions

```in:2015
(let [foo 1]
      foo)

(let [foo 1]
foo)
```

```out
(let [foo 1]
     foo)

(let [foo 1]
 foo)
```

## Relative Indentation

keep relative indentation of child expressions:

```in:2020
(let [foo [1 2 3]]
      (-> foo
          (map inc)))
```

```out
(let [foo [1 2 3]]
     (-> foo
         (map inc)))
```

## Leading Close-Paren


Close-parens at start of line are moved to end of previous line.  Note that the
spaces before the close-paren are not removed.

```in:2025
(let [foo 1
      ]; <-- spaces
  foo)
```

```out
(let [foo 1]
      ; <-- spaces
  foo)
```

```in:2030
(let [foo 1
      bar 2

     ] (+ foo bar
  ); <-- spaces
)
```

```out
(let [foo 1
      bar 2]

     (+ foo bar))
  ; <-- spaces

```

## Inside the Indentation Treshold

extra indent is fine (won't cause parinfer to restructure it)

```in:2035
(def x [1 2 3 4
         5 6 7 8])
```

```out
(def x [1 2 3 4
         5 6 7 8])
```

doesn't try to align siblings.

```in:2040
  (assoc x
:foo 1
     :bar 2)
```

```out
  (assoc x
   :foo 1
     :bar 2)
```

## Unclosed Parens

```in:2045
(foo
```

```out
(foo
^ error: unclosed-paren
```

```in:2050
(defn foo
[arg arg2
bar
```

```out
(defn foo
[arg arg2
^ error: unclosed-paren
bar
```

## Unmatched close-parens

```in:2055
(foo})
```

```out
(foo})
    ^ error: unmatched-close-paren
```

```in:2060
(foo
  })
```

```out
(foo
  })
  ^ error: unmatched-close-paren
```

```in:2065
(defn foo
  [arg
  bar)
```

```out
(defn foo
  [arg
  bar)
     ^ error: unmatched-close-paren
```

## Backslash cases

escape character in comment untouched:

```in:2070
; hello \n world
```

```out
; hello \n world
```

escaped whitespace

```in:2075
(def foo \,)
(def bar \ )
```

```out
(def foo \,)
(def bar \ )
```

Hanging backslash at end of line is invalid and causes processing to be abandoned.

```in:2080
(foo [a b]\
c)
```

```out
(foo [a b]\
          ^ error: eol-backslash
c)
```

## Unclosed Quotes

```in:2085
(def foo
  "hello
  bar)
```

```out
(def foo
  "hello
  ^ error: unclosed-quote
  bar)
```

## Dangerous Quotes

odd number of quotes not allowed in a comment, so it remains unprocessed:

```in:2090
(def foo [a b]
  ; "my string
ret)
```

```out
(def foo [a b]
  ; "my string
    ^ error: quote-danger
ret)
```

balanced quotes allowed across contiguous comments:

```in:2095
(def foo [a b]
  ; "my multiline
  ; docstring."
ret)
```

```out
(def foo [a b]
  ; "my multiline
  ; docstring."
 ret)
```

## Multiline Strings

A line ending inside a string will not have a definable Paren Trail.  This
minimal test case will fail if the close-paren is treated as a Paren Trail.

```in:2100
( )"
"
```

```out
( )"
"
```

## Spaces in Paren Trail

Preserve spaces in paren trail for the cursor line.  This allows the user
to insert things between close-parens more easily.

```in:2105
(foo |)
```

```out
(foo |)
```

```in:2110
(foo [1 2 3 |] )
```

```out
(foo [1 2 3 |] )
```

But get rid of spaces in paren trail if no cursor is present on the line:

```in:2115
(foo )
```

```out
(foo)
```

```in:2120
(foo [1 2 3 ] )
```

```out
(foo [1 2 3])
```

## Cursor Behavior

Pressing enter before a close-paren.

```in:2125
(foo [a b
|])
```

```out
(foo [a b
      |])
```

Cursor pushed forward when a form is balanced and indented.

```in:2130
(foo [1 2 3
 4 5 6
 7 8 9])|
```

```out
(foo [1 2 3
      4 5 6
      7 8 9])|
```

## Changes

When backspacing, preserve the indentation of the child lines.

```in:2135
(let     [foo 1
     ----
           ; comment 1
           bar 2
           baz 3])
           ; comment 2
```

```out
(let [foo 1
       ; comment 1
       bar 2
       baz 3])
       ; comment 2
```

```in:2140
   (def foo
---
      ; comment 1
      bar)
      ; comment 2
```

```out
(def foo
   ; comment 1
   bar)
   ; comment 2
```

When typing before an open-paren, preserve the indentation of the child lines.

```in:2145
(def foo (bar
    ++++
       4 5 6
       ; comment 1
       7 8 9))
       ; comment 2
```

```out
(def foo (bar
           4 5 6
           ; comment 1
           7 8 9))
           ; comment 2
```

__Multiple changes__:

```in:2150
(my-fnfoo (if some-condition
 -----+++
         println) my-funfoo {:foo 1
                  ------+++
                          :bar 2})
```

```out
(foo (if some-condition
       println) foo {:foo 1
                     :bar 2})
```

## Extending indentation constraints

Child lines should never fall to the right of a sibling list somewhere above it.
This promotes more structural stability in Indent Mode—allowing child lines
to be deleted without affecting structure of subsequent lines.

In the example below, the original Paren Mode would dedent `1 2 3`, but would
leave `4 5 6` unchanged.  Subsequently, if the user deletes `1 2 3` in Indent
Mode, `4 5 6` would immediately be adopted into the `[bar baz]` collection,
which is likely an unintended side effect.

This places a harder constraint on indentation in Paren Mode than Indent Mode,
making the invariant no longer equivalent between them.

```in:2155
(foo [bar baz]
       1 2 3
       4 5 6)
```

```out
(foo [bar baz]
     1 2 3
     4 5 6)
```

```in:2160
(foo [bar baz
         ]; <-- spaces
       1 2 3
       4 5 6)
```

```out
(foo [bar baz]
         ; <-- spaces
     1 2 3
     4 5 6)
```

## Paren Trails

We return non-empty Paren Trails so plugins can dim them with markers:


```in:2165
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

## Indenting Selected Lines

Indent only the first line:

```in:2170
  (foo
++
  (bar
    baz))
```

```out
  (foo
    (bar
      baz))
```

Indent first two lines:

```in:2175
  (foo
++
    (bar
++
    baz))
```

```out
  (foo
    (bar
      baz))
```

Indent last two lines:

```in:2180
  (foo
      (bar
++
        baz))
++
```

```out
  (foo
      (bar
        baz))
```


Indent only the first line:

```in:2185
  (foo
++
  bar
  baz)
```

```out
  (foo
    bar
    baz)
```

Indent first two lines:

```in:2190
  (foo
++
    bar
++
  baz)
```

```out
  (foo
    bar
    baz)
```

Indent last two lines:

```in:2195
(foo
    bar
++
    baz)
++
```

```out
(foo
    bar
    baz)
```

## Tab Stops

> __NOTE__: should be copied from same section in Indent Mode

We can return the positions of the open-parens whose structure would be
affected by the indentation of the current cursor line.  This allows editors to
use them to create tab stops for smart indentation snapping.

```in:2200
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

```in:2205
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

```in:2210
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

```in:2215
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
