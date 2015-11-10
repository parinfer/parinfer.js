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
