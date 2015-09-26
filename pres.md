## Parinfer
- Lisp-editing made simple
- intuitive alternative to paredit
- adjust indentation to affect nesting (inlining respected)
- a natural way to keep your code pretty

### Principles in 30 seconds
1. open parens and indentation are the single source of truth (you control this)
  - highlight open parens and indentation in an example
2. closing parens at EOL are a function of truth (they will move as you change 1)
  - highlight closing parens in an example
  - contrast with non-trailing closers
3. that's it

### Animated Examples
- one-line to show paren closing
- let-block to show indentation
- paste let-block into a function
- wrapping a for loop around some hiccups
- appending
- typing quotes follows the path of least astonishment, allowing temporary imbalances for simpler editing.

### Try It
- with vim, emacs, or sublime keybindings
- load examples (dropdown)

This is a proof-of-concept implemented in ClojureScript for the CodeMirror
editor on the right.  Try it with your favorite editor's keybindings.

Help by contributing bugs or ideas to our GitHub issues.  If you like the
concept, consider contributing a plugin for different editors (e.g. vim, emacs,
sublime, atom).

### Something to think about

- explain how haskell's `$` operator might be extended
- no closing parens might mean better readability (in exchange for possible ambiguity)

