This is documentation for [`parinfer.js`].

[`parinfer.js`]:parinfer.js

## Summary

Parinfer.js performs full file text transformation in two passes:

1. First pass (_read_): Verify that the text's structure is okay to work with (very fast).
1. Second pass (_transform_): Change the text according to Indent Mode or Paren Mode rules.

## Usage

```
indentMode(text[, options])
parenMode(text[, options])
```

Text transformation is performed by either of the two functions above.  Both
are expected to be debounced on keypress.  Though no API is provided for
performing incremental changes, a debounced full text transformer will perform
well enough while preventing complications of a stateful API.

## The Reader

Parinfer fundamentally needs to know where the parens are, but it must ignore
those found inside strings, character literals, and comments.  Thus, we can
write a partial Lisp Reader that only scans for parens outside these forms.

```clj
"("  ; <-- ignore parens in strings
\(   ; <-- ignore parens inside characters (escaped literals)

; ( <--- ignore parens in comments
```

To implement our Lisp Reader, we start with an empty stack and perform the
following operations as we scan each character.  See the `pushChar` function
to trace the details.

- _Push_ "opening" characters onto the stack (when appropriate).
- _Pop_ the stack when "closing" characters are encountered (and appropriate).
- _Peek_ the stack to determine what we're inside of (for appropriation)

After processing the whole file, the state of the stack can tell us the
following things:

- _Unclosed quote error_ - if we are still inside a string
- _Unclosed paren error_ - if we are still inside a list

## The Transfomers

_Indent Mode_ and _Paren Mode_ transform text according to special rules.

### Definitions

Before transforming, we must use information from the Reader in order to
identify extra parts of significance:

- __Paren trail__ - the trail of close-parens at the end of a line, if any.
  Notice that we disregard trailing whitespace and comments, and we
  allow whitespace between parens.

    ```clj
    (foo (+ 2 3) [(bar)] )    ;; comment
                      ^^^^
    ```

- __Insertion point__ - the point after which a _Paren Trail_ could be
  inserted. If a Paren Trail already exists, the insertion point is simply the
  point before it.

    ```clj
    (defn foo [a b] ret)
                      ^
    (def bar [a b])
                ^
    (foo [bar] a
               ^
    ```

- __Indentation point__ - the first non-whitespace character of a line.  The
  line must not start inside a string, and must contain more than whitespace or
  comments.

    ```clj
    (def foo
    ^
       bar)
       ^
    ```

### Transforming

Transformation happens one line at a time.


