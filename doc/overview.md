# Parinfer Formatting Overview

_Parinfer_ is enabled by a simple corollary following from a formal definition
of Lisp's indentation style.

## Lisp's Indentation Style

Given a file of Lisp text (with parens correctly balanced), the following
conditions are necessary for it to be considered what we are defining as the
Lisp indentation style.

For every newline character that is not inside a string:

1. Contiguous close-parens adjacent to it (disregarding whitespace and comment
   padding) should be gathered at the end of the line before that newline
   character.
2. Indentation satisfies `min <= x <= max`, such that:
  - `x` is the number of spaces after the newline
  - `min` is the position of the newline's parent open-paren (zero if none exists)
  - `max` is the position the open-paren of the last close-paren before the
    newline (infinity if none exists)

Notice that a single line program is fine.  The rules make no requirement for
where line breaks should be.  Rather, they establish an invariant that must be
true everytime one appears.

Also notice that _sufficient_ conditions would certainly establish stricter
indentation thresholds (aligning w/ requirements of Python and Haskell), but we
posit that the two aforementioned conditions are the only ones necessary for
establishing _Parinfer_.

### Corollary: Indentation and Close-Parens are functions of one another

TODO: prove that there is a one-to-one mapping between values of 1 (the number
of contiguous parens) and 2 (indentation ranges).
Then show how we can calculate one from the other.

### Misc Notes

(SOL/EOL/MOL = start, end, middle of line)

We have two functions for formatting code:

- __[prep]__: prepare existing code for Parinfer
  - gather SOL/EOL close-parens
  - minimally adjust indentation based on _infer_'s rules (described next)
- __[infer]__: infer close-parens based on indentation
  - SOL/EOL close-parens removed
  - EOL close-parens inserted before this position:
    - first dedented line after an unbalanced open-paren

[prep]:prep-details.md
[infer]:infer-details.md

Both functions create a normalized text by correcting either indentation or
close-paren position:

- ignoring indentation rules for MOL close-parens
- contiguous groups of SOL and EOL across lines are joined at the end of
  previous token

Both functions deal with indentation thresholds rather than strict indentation.

Some properties that must be true of `prep` and `infer` (`read` returns the
actual data structure of the code, whereas `prep` and `infer` return strings):

```
let y = prep(x)
=> read(x) = read(y)
=> infer(y) = y
=> prep(y) = y

let z = infer(x)
=/> read(x) = read(z)
=> infer(z) = z
```

