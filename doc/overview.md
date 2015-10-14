# Parinfer Formatting Overview

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

