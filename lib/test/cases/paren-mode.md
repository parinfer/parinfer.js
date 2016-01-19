# Paren Mode

minimal indent.

```in
(let [foo 1]
foo)
```

```out
(let [foo 1]
 foo)
```

minimal dedent.

```in
(let [foo 1]
      foo)
```

```out
(let [foo 1]
     foo)
```

minimal dedent across multiple.

```in
(let [foo {:a 1}]
           foo)
```

```out
(let [foo {:a 1}]
     foo)
```

keep relative indentation of child expressions:

```in
(let [foo [1 2 3]]
      (-> foo
          (map inc)))
```

```out
(let [foo [1 2 3]]
     (-> foo
         (map inc)))
```

close-parens at SOL are moved to EOL.
empty lines not deleted.
spaces kept before and after SOL close-parens stay.

```in
(let [foo 1
      bar 2

      ] (+ foo bar
  )
)
```

```out
(let [foo 1
      bar 2]

     (+ foo bar))
  

```

extra indent is fine (won't cause parinfer to restructure it)

```in
(def x [1 2 3 4
         5 6 7 8])
```

```out
(def x [1 2 3 4
         5 6 7 8])
```

doesn't try to align siblings.

```in
  (assoc x
:foo 1
     :bar 2)
```

```out
  (assoc x
   :foo 1
     :bar 2)
```

multiple expressions

```in
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

escape character in comment untouched:

```in
; hello \n world
```

```out
; hello \n world
```

escaped whitespace

```in
(def foo \,)
(def bar \ )
```

```out
(def foo \,)
(def bar \ )
```

cursor before a close-paren allows it to be at the start of a line.

```in
(foo [a b
|])
```

```out
(foo [a b
      ])
```

Commas are considered whitespace in Clojure, but are unquote sugar in Racket.
Since commas are never used as indentation whitespace in Clojure, we don't
treat it as such:

```in
(def foo
,bar)
```

```out
(def foo
 ,bar)
```

odd number of quotes not allowed in a comment, so it remains unprocessed:

```in
(def foo [a b]
  ; "my string
ret)
```

```out
(def foo [a b]
  ; "my string
ret)
```

balanced quotes allowed across contiguous comments:

```in
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


Hanging backslash at end of line is invalid and causes processing to be abandoned.

```in
(foo [a b]\
c)
```

```out
(foo [a b]\
c)
```

Preserve spaces in paren trail for the cursor line.  This allows the user
to insert things between close-parens more easily.

```in
(foo |)
```

```out
(foo )
```

```in
(foo [1 2 3 |] )
```

```out
(foo [1 2 3 ] )
```

But get rid of spaces in paren trail if no cursor is present on the line:

```in
(foo )
```

```out
(foo)
```

```in
(foo [1 2 3 ] )
```

```out
(foo [1 2 3])
```
