# Parinfer Test Cases

Parinfer's modes act as pure functions of your full file of text, returning the
new text with corrections.  Thus, a test case contains a description, input
text (with optional cursor), and expected output text. For readability, we
specify these things in markdown:

> description of the test...
> 
> ```in
> input text
> ```
> 
> ```out
> expected output text
> ```

To specify the cursor in the input text, use a pipe `|`.  The character
is removed from the input.

The input text is passed to the mode's function (`indentMode` or `parenMode`).
The expected output is compared to the actual result of this function call.

## Building JSON

The purpose of the JSON files is to allow potential ports to consume
the test cases.

Running `npm test` from the root lib directory will rebuild the JSON tests
everytime it runs, but you can build it directly here:

```
node build.js
```
