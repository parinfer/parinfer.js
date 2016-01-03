This is documentation for [`parinfer.js`].

[`parinfer.js`]:parinfer.js

## Summary

Parinfer.js performs full file text transformation in one pass.

## Usage

```
indentMode(text[, options])
parenMode(text[, options])
```

Text transformation is performed by either of the two functions above.  Both
are expected to be debounced on keypress.  Though no API is provided for
performing incremental changes, a debounced full text transformer will perform
well enough while preventing complications of a stateful API.

## Finding Parens

Parinfer fundamentally needs to know where the parens are, but it must ignore
those found inside strings, character literals, and comments.  Thus, we can
write a partial Lisp Reader that only scans for parens outside these forms.

```clj
"("  ; <-- ignore parens in strings
\(   ; <-- ignore parens inside characters (escaped literals)

; ( <--- ignore parens in comments
```

At any point in our file, our Lisp Reader should be able to know the locations
of its parent parentheses and whether or not it is inside a string, comment or
character.  This is accomplished by maintaining a stack of parentheses:

- _Push_ open-parens onto the stack when encountered
- _Pop_ the stack when close-parens are encountered

Boolean flags are also used to track token types. See `pushChar` function to
trace the details.

## Special Regions

There are two regions of a line that we must identify, labeled in the
following examples with carets `^`.

- __Indentation__ - the starting whitespace of a line, if any.  Indentation is
  ignored for lines starting inside a string, and any empty lines containing
  only whitespace or a comment.

    ```clj
    (defn foo [x]
      (+ x 1))
    ^^

    (defn foo [x]
      "my multiline
       docstring."

             ;; indented comments don't count

      (+ x 1))
    ^^
    ```

- __Paren Trail__ - the trail of close-parens at the end of a line, if any.
  Notice that comments are allowed after these parens.  Also notice that any
  whitespace before a close-paren is considered part of the Paren Trail

    ```clj
    (foo (+ 2 3) [(bar)] )    ;; comment
                      ^^^^

    (foo   )))
        ^^^^^^
    ```

## Transforming

Transformation happens one line at a time.


