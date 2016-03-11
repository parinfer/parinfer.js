# Newline (Mode)

It's just a thing you have to run when pressing Enter in Indent Mode.

Minimally indenting a new line:

```in
(foo
|)
```

```out
(foo
 |)
```

## Alignment with sibling indentation

Copy previous line indentation if sibling:

```in
(foo
  bar
|)
```

```out
(foo
  bar
  |)
```

Copy following line indentation if previous line is not sibling:

```in
(foo
|
  bar)
```

```out
(foo
  |
  bar)
```

## Stablizing the AST

> 1. pressing enter should not alter the AST
> 2. pressing enter should not alter the position of the cursor in the AST

```in
(foo [a b
|] bar)
```

```out
(foo [a b
      |]
 bar)
```

> 3. pressing enter and moving the cursor to another line should not alter the AST

```in
(foo [a b
      ]
 bar)
```

```out
(foo [a b]
      
 bar)
```

## Combining Implications

Sibling alignment:

```in
(foo [a b
|] bar
  baz)
```

```out
(foo [a b
      |]
  bar
  baz)
```

Implied `cursorDx` value can preserve relative indentation:

```in
(foo [a b
|] (bar
             123)
  baz)
```

```out
(foo [a b
      |]
  (bar
    123)
  baz)
```
