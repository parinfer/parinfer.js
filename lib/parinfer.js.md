# Parinfer.js

At a high level, `parinfer.js` scans your text twice:

1. First pass (_read_): Verify that the text's structure is okay to work with (very fast).
1. Second pass (_transform_): Change the text according to Indent Mode or Paren Mode rules.

## The Reader

Parinfer fundamentally needs to know where the parens are, while ignoring
those found inside any of the following:

```clj
"("  ; <-- ignore parens in strings
\(   ; <-- ignore parens inside characters (escaped literals)

; ( <--- ignore parens in comments
```

Thus, we can write a small, partial Lisp Reader that ignores everything else.
This should work for all Lisp dialects since they don't differ on these things.

Our Lisp Reader starts with an empty stack and performs the following
operations as we scan each character.

- _Push_ "opening" characters onto the stack (when appropriate).
- _Pop_ the stack when "closing" characters are encountered (and appropriate).
- _Peek_ the stack to determine what we're inside of (for appropriation)

Specifically, follow the `pushChar` function to see how the stack is affected
by each character.

After processing the whole file, the state of the stack can tell us the
following things:

- _Unclosed quote error_ - if we are still inside a string
- _Unclosed paren error_ - if we are still inside a list

## The Transfomers

We consider _Indent Mode_ and _Paren Mode_ to be transformers here, since they
both transform a given text according to special rules.

The transformers use the aformentioned Reader, but they identify extra
parts of significance too.  We illustrate these parts in the examples below
with carets `^`.

- __Paren trail__ - section of a line that ends in close-parens, if any. (disregarding _comments_)

    ```clj
    (foo (+ 2 3) [(bar)] )    ;; comment
                      ^^^^
    ```

- __Insertion point__ - the first point on a line where an inserted close-paren would be considered part of the _Paren Trail_

    ```clj
    (defn foo [a b] ret)
                      ^
    (def bar [a b])
                ^
    foo
      ^
    ```

- __Indentation point__ - the first non-whitespace character of a line.  The line
  must not start inside a string, and must contain more than whitespace or
  comments.

    ```clj
    (def foo
    ^
       bar)
       ^
    ```


