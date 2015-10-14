# Parinfer - Prep

This preps existing code for use with _Parinfer_'s infer formatter.  It does this by:

- gather contiguous SOL (start of line) and EOL (end of line) close-parens
  - place them at EOL of the first non-empty line before first close-paren
- minimally indent/dedent expressions so that their structure is preserved when using in _Parinfer_.

## Broken Input?

- missing open-parens or close-parens
  - from a file or pasted code
