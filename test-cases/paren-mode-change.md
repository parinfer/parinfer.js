# Paren Mode (change-based)

> __NOTE__: These test cases have an extra "replace" block between the input and output
blocks, and special cursor range syntax.  See [text-change.md](text-change.md) for details.

_Indentation of shifted expressions should be preserved._

---

insert text

```in
|(foo
    bar)
```

```replace
xx
```

```out
xx (foo
      bar)
```

insert multiple lines

```in
xx |(foo
       bar)
```

```replace

yy
```

```out
xx 
yy (foo
      bar)
```

delete multiple lines

```in
xx |
  |(foo
      bar)
```

```replace

```

```out
xx  (foo
       bar)
```

replace multiple lines with multiple lines

```in
xx |
yy|(foo
      bar)
```

```replace
aa
bb
cccc
```

```out
xx aa
bb
cccc (foo
        bar)
```
