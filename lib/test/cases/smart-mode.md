# Smart Mode

## Dedenting last line

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

## Shifting open-parens

```in
(foo
    {:a 1
  ++
   :b 2})
```

```out
(foo
    {:a 1
     :b 2})
```

```in
(foo
    {:a 1
  --
     :b 2})
```

```out
(foo
  {:a 1
   :b 2})
```

```in
(foo {:a 1
  --
      :b 2})
```

```out
(f {:a 1
    :b 2})
```

## Removing

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

## Inline Paren Inference

```in
(a (b[) c) (d) e)
     +
```

```out
(a (b[]) c) (d) e)
```
