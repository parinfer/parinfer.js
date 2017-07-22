# Smart Mode

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
