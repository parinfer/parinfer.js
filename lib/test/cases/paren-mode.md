# Paren Mode

## Indentation Threshold Clamping

clamp left

```in
(let [foo 1]
foo)
```

```out
(let [foo 1]
 foo)
```

clamp right

```in
(let [foo 1]
      foo)
```

```out
(let [foo 1]
     foo)
```

```in
(let [foo {:a 1}]
           foo)
```

```out
(let [foo {:a 1}]
     foo)
```

sanity check to apply rules to multiple expressions

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

## Relative Indentation

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

## Leading Close-Paren


Close-parens at start of line are moved to end of previous line.  Note that the
spaces before the close-paren are not removed.

```in
(let [foo 1
      ]; <-- spaces
  foo)
```

```out
(let [foo 1]
      ; <-- spaces
  foo)
```

```in
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

## Unclosed Parens

```in
(foo
```

```out
(foo
^ unclosed-paren
```

```in
(defn foo
  [arg
  bar)
```

```out
(defn foo
  [arg
  ^ unclosed-paren
  bar)
```

## Backslash cases

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

Hanging backslash at end of line is invalid and causes processing to be abandoned.

```in
(foo [a b]\
c)
```

```out
(foo [a b]\
          ^ eol-backslash
c)
```

## Unclosed Quotes

```in
(def foo
  "hello
  bar)
```

```out
(def foo
  "hello
  ^ unclosed-quote
  bar)
```

## Dangerous Quotes

odd number of quotes not allowed in a comment, so it remains unprocessed:

```in
(def foo [a b]
  ; "my string
ret)
```

```out
(def foo [a b]
  ; "my string
    ^ quote-danger
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

## Multiline Strings

A line ending inside a string will not have a definable Paren Trail.  This
minimal test case will fail if the close-paren is treated as a Paren Trail.

```in
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

```in
(foo |)
```

```out
(foo |)
```

```in
(foo [1 2 3 |] )
```

```out
(foo [1 2 3 |] )
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

## Cursor Behavior

Pressing enter before a close-paren.

```in
(foo [a b
|])
```

```out
(foo [a b
      |])
```

Cursor pushed forward when a form is balanced and indented.

```in
(foo [1 2 3
 4 5 6
 7 8 9])|
```

```out
(foo [1 2 3
      4 5 6
      7 8 9])|
```

## CursorDx

When backspacing, preserve the indentation of the child lines.

```in
(let |[foo 1
     ^ cursorDx -4
           bar 2
           baz 3])
```

```out
(let |[foo 1
       bar 2
       baz 3])
```

```in
|(def foo
^ cursorDx -3
      bar)
```

```out
|(def foo
   bar)
```

When typing before an open-paren, preserve the indentation of the child lines.

```in
(def foo |(bar
         ^ cursorDx 5
       4 5 6
       7 8 9))
```

```out
(def foo |(bar
            4 5 6
            7 8 9))
```
