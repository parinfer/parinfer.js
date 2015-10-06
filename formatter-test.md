# Formatter Tests

The formatter is a pure function that formats some input text based on the
indentation rules of this project.  Test cases are created with the following
format, which will be parsed and executed by the test runner.

    ```in
    input code here
    ```

    ```out
    output code here
    ```

Certain cases are affected by cursor location, represented by the pipe `|`
character.


## No Closers

```in
(defn foo
  [arg
  ret
```

```out
(defn foo
  [arg]
  ret)
```

```in
(defn foo
  [arg
   ret
```

```out
(defn foo
  [arg
   ret])
```

```in
(defn foo
[arg
   ret
```

```out
(defn foo)
[arg
   ret]
```

```in
(defn foo
[arg
ret
```

```out
(defn foo)
[arg]
ret
```

## Bad Closers

```in
(def foo [a b]]
```

```out
(def foo [a b])
```

```in
(let [x {:foo 1 :bar 2]
  x)
```

```out
(let [x {:foo 1 :bar 2}]
  x)
```

## Strings

We allow temporary imbalances when inserting strings.

```in
(def foo "as
```

```out
(def foo "as
```

```in
(defn foo [a "])
```

```out
(defn foo [a "])
```

Multiline strings:

```in
(defn foo
  "This is docstring.
  Line 2 here."
  ret
```

```out
(defn foo
  "This is docstring.
  Line 2 here."
  ret)
```

Multiline strings do not affect indentation:

```in
(let [a "Hello
World"
      b 2
  ret
```

```out
(let [a "Hello
World"
      b 2]
  ret)
```

String with delimiters:

```in
(let [a "])"
      b 2
```

```out
(let [a "])"
      b 2])
```

Escaped quotes

```in
(def foo "\""
```

```out
(def foo "\"")
```

## Character syntax

```in
(defn foo [a b
  \[
  ret
```

```out
(defn foo [a b]
  \[
  ret)
```

```in
(def foo \;
```

```out
(def foo \;)
```

## Comments

```in
(def foo ;)
```

```out
(def foo) ;)
```

```in
(let [a 1
      b 2
      c {:foo 1
         ;; :bar 2}]
  ret)
```

```out
(let [a 1
      b 2
      c {:foo 1}]
         ;; :bar 2}]
  ret)
```

```in
(let [a 1 ;; a comment
  ret)
```

```out
(let [a 1] ;; a comment
  ret)
```

## Cursor Cases

`|` represents the cursor.  This allows us to insert spaces between EOL closing
delimiters while editing.

```in
(def b |)
```

```out
(def b )
```

Once we leave the line, spaces should be removed:

```in
(def b )
```

```out
(def b) 
```

Another example with more delimiters:

```in
(def b [[c d] |])
```

```out
(def b [[c d] ])
```

```in
(def b [[c d] ])
```

```out
(def b [[c d]])
```

Spaces between trailing delims after the cursor should be removed since we are not in a position
where we may be editing them:

```in
(def |b [[c d] ])
```

```out
(def b [[c d]])
```

Trailing closing delimiters before the cursor are never removed, which may
cause indented lines below to be ignored.  This is to allow inserting a token
after such a delimiter.

For example, without the cursor on the first line, this is expected:

```in
(let [a 1])
  ret)
```

```out
(let [a 1]
  ret)
```

With the cursor at the end of the first line, the indented line below does not affect it.

```in
(let [a 1])|
  ret)
```

```out
(let [a 1])
  ret
```

If this was not allowed, we would not be able to reach this valid state from
the previous state:

```in
(let [a 1]) 2
  ret
```

```out
(let [a 1]) 2
  ret
```

But if the cursor is before such a delimiter, we are not in a position to insert a token after it,
thus indentation can affect it again:

```in
(let [a 1]|)
  ret)
```

```out
(let [a 1]
  ret)
```

If the cursor is a comment after such a delimiter, we can safely move it:

```in
(let [a 1]) ;|
  ret
```

```out
(let [a 1] ;
  ret)
```

Cannot insert closing delimiters on their own line:

```in
(let [a 1
      ])
```

```out
(let [a 1])
      
```

