# Paren Mode (change-based)

_Indentation of shifted expressions should be preserved._

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
