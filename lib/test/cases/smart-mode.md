# Smart Mode

## Leading Close-Parens

Leading close-parens can cause many problems that can be fixed by paren mode,
so we exit to paren mode when they are detected.

For example, it is convenient to keep trailing parens in front of the cursor
after pressing enter or after deleting everything behind them:

```in
(let [a 1
      |])
```

```out
(let [a 1
      |])
```

Moving the cursor away:

```in
(let [a 1
      ]); <-- spaces
```

```out
(let [a 1])
      ; <-- spaces
```

But we also need safety from inadvertent AST breakage.  For example,
Indent Mode should allow this intermediate state:

```in
(let [a 1
      |] (+ a 2))
```

```out
(let [a 1
      |] (+ a 2))
```

Moving the cursor away will cause Indent Mode to still detect the leading
close-paren, exit to Paren Mode, then fix the spacing to prevent inadvertent
breakage.

```in
(let [a 1
      ] (+ a 2))
```

```out
(let [a 1]
     (+ a 2))
```

To prevent weird things, indentation needs to be locked to respect
the leading close-paren.  Exiting to Paren Mode allows this and prevents further
AST breakage.

```in
(let [a 1
  |] (+ a 2))
```

```out
(let [a 1
      |] (+ a 2))
```

Moving cursor to the right progressively moves leading close-parens behind it
to their normal positions:

```in
(let [a 1
      ]|)
```

```out
(let [a 1]
     |)
```

When in Paren Mode we must abide by its rules to stay balanced.

```in
(foo
  }|)
```

```out
(foo
  }|)
  ^ error: unmatched-close-paren
```

Likewise:

```in
(foo
  ) foo} bar|
```

```out
(foo
  ) foo} bar|
       ^ error: unmatched-close-paren
```

```in
(foo
  ) (bar|
```

```out
(foo
  ) (bar|
    ^ error: unclosed-paren
```


## Changes

Dedent multi-line expression to leave its parent:

```in
(foo
  {:a 1
--
   :b 2})
```

```out
(foo)
{:a 1
 :b 2}
```

Indent multi-line expression to enter new parent:

```in
(foo)
  {:a 1
++
 :b 2}
```

```out
(foo
  {:a 1
   :b 2})
```

Dedenting an inner line makes it leave parent:

```in
(foo
  {:a 1
   :b 2})
---
```

```out
(foo
  {:a 1})
:b 2
```

Dedenting a collection will adopt a former sibling line below it:

```in
(defn foo
  [a b]
--
  bar)
```

```out
(defn foo)
[a b
  bar]
```

But dedenting a top-level form should not cause a child to adopt a sibling:

```in
  (defn foo
--
    [a b]
    bar)
```

```out
(defn foo
  [a b]
  bar)
```

Indented comments move with expressions:

```in
  (defn foo
--
    [a b]
    ; comment 1
    bar)
    ; comment 2
```

```out
(defn foo
  [a b]
  ; comment 1
  bar)
  ; comment 2
```

## Cursor temporarily preventing sibling adoption

To prevent undesirable sibling adoption when dedenting, we temporarily keep
a close-paren from moving when the cursor is to the left of its open-paren.

```in
(defn foo
  |[a b
--
   c d]
  bar
  baz)
```

```out
(defn foo)
|[a b
 c d]
  bar
  baz
```

## Multiple Changes

```in
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

## Precarious Paren Resolution

Suppose we deleted `foo` in the example below.  We expect `4` to not be adopted
by any collection inside `(((1 2 3)))`.

```in
(foo |(((1
 ----
        2
        3)))
    4)
```

```out
(|(((1
    2
    3)))
    4)
```

When cursor is removed, the precarious parens are resolved by preserving structure
and correcting indentation.

```in
((((1
 ^ prevCursor
    2
    3)))
    4)
```

```out
((((1
    2
    3)))
 4)
```

```in
((|((1
 ^ prevCursor
    2
    3)))
    4)
```

```out
((|((1
    2
    3)))
 4)
```

Also, suppose we _added_ a precarious paren `]` in the example below.  It is
precarious because the cursor is holding the paren in place despite the
indentation of the following lines.

```in
(foo [1 2 3]|
           +
      4 5 6
      7 8 9])
```

```out
(foo [1 2 3]|
      4 5 6
      7 8 9)
```

If we move the cursor away from this holding area, the indentation should
be corrected to respect the structure given.

```in
(foo [1 2 3]
            ^ prevCursor
      4 5 6
      7 8 9)
```

```out
(foo [1 2 3]
     4 5 6
     7 8 9)
```

```in
(foo [1 2 3|]
             ^ prevCursor
      4 5 6
      7 8 9)
```

```out
(foo [1 2 3|]
     4 5 6
     7 8 9)
```

## Indenting Selected Lines

Indent only the first line:

```in
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

```in
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

```in
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

```in
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

```in
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

```in
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
