# Parinfer Test Cases

Parinfer's modes act as pure functions of your full file of text, returning the
new text with corrections.  Thus, a test case contains a description, input
text (with optional cursor), and expected output text. For readability, we
specify these things in markdown:

---

> description of the test...
> 
> ```in
> input text
> ```
> 
> ```out
> expected output text
> ```

---

To specify the cursor in the input text, use a pipe `|`.  The character
is removed from the input.

The input text is passed to the `format-text` function of the appropriate mode
(Indent or Paren).  The expected output is compared to the actual result of
this function call.

## Testing a change

Processing the full text is good for testing the _theory_ of Parinfer. But for
obvious performance reasons, we only want to process the text which has changed
on subsequent runs.  Thus we have special test cases to determine if
we can produce the full correct output by only processing what
has changed.

Full input text should be given just as before, but the changed lines should be
prefixed with `+` or `-` to denote a subsequent addition or removal by the
user.  The full expected output text should be given.

> __NOTE__: The prefixed lines must be contiguous and prefix characters are
> replaced with spaces.

```in
  a normal line
- a removed line
- another removed line
+ added line
+ another added line
```

Indent Mode is able to generalize character-based changes to these larger
line-based changes without losing important information, but this is not so for
Paren Mode.  Thus, we are currently exploring a more generic diff strategy
which you can read about in [text-change.md](text-change.md).
