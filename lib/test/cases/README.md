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

It is converted to the following data:

```json
{
  "in": {
    "fileLineNo": 2,
    "lines": [
      "input text"
    ]
  },
  "out": {
    "fileLineNo": 6,
    "lines": [
      "expected output text"
    ]
  }
}
```

## JSON

The purpose of the JSON files is to allow Parinfer ports to consume and run the
same test cases.

Running npm test from the root lib directory will rebuild the JSON tests
everytime it runs, but you can build it directly here:

```
node build.js
```

## Cursor

A pipe character `|` represents the cursor.

> ```in
> (def foo|
> ```
>
> ```out
> (def foo|)
> ```

The pipe character is removed from the input and output text, but its information
is stored in its input or output data:

```json
"cursor": {
  "cursorX": 8,
  "cursorLine": 0
}
```

## Cursor Dx

An input block can contain a line, with `^ cursorDx` and a number.  The caret
must be positioned under a cursor `|`.

In Paren Mode, the cursorDx (i.e. delta x) represents the number of characters
deleted or added behind the cursor that resulted in the current state.

> ```in
> |(def foo
> ^ cursorDx -3
>       bar)
> ```
>
> ```out
> |(def foo
>    bar)
> ```

```json
"cursor": {
  "cursorX": 0,
  "cursorLine": 0,
  "cursorDx": -3
}
```

## Expected Error

An output block can contain an error line, with a caret `^` and the name
of the error.  The caret is positioned under the offending character.

> ```in
> (def foo "bar
> ```
>
> ```out
> (def foo "bar
>          ^ unclosed-quote
> ```

The error line is removed from the output text, but its information is stored
in the output data:

```json
"error": {
  "name": "unclosed-quote",
  "lineNo": 1,
  "x": 9
}
```
