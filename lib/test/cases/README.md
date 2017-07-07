# Parinfer Test Cases

Parinfer's modes act as pure functions of your full file of text, returning the
new text with corrections.  Thus, a test case contains a description, input
text (with optional cursor), and expected output text. For readability, we
specify these things in markdown:

> description of the test...
>
> ```in
> input line 1
> input line 2
> ```
>
> ```out
> output line 1
> output line 2
> ```

It is converted to the following data:

```json
{
  "in": {
    "fileLineNo": 2,
    "text": "input line 1\ninput line 2"
  },
  "out": {
    "fileLineNo": 7,
    "text": "output line 1\noutput line 2"
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

## Annotations

The following annotations are used to represent input options and output
metadata.

## Cursor

A pipe character `|` represents the cursor.

> ```in
> (def foo|
> ```
>
> ```out
> (def foo|)
> ```

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

## Expected Error

An output block can contain an error line, with a caret `^` and the name
of the error.  The caret is positioned under the offending character.

> ```in
> (def foo "bar
> ```
>
> ```out
> (def foo "bar
>          ^ error: unclosed-quote
> ```

## Tab Stops

An output block can contain a tabStops line before the cursor line. Each caret
is positioned at the position of its associated open-paren.

> ```in
> (let [a {:foo 1}
>       bar [1 2 3]]
>   |
>   bar)
> ```
>
> ```out
> (let [a {:foo 1}
>       bar [1 2 3]]
> ^    ^    ^ tabStops
>   |
>   bar)
> ```

## Change Diff

Smart mode requires information about the previous change in order to be smart.
Thus, an input block can have lines containing plus/minus symbols, indicating
that the characters above it have been added or removed.  `-` should come before `+`.

> ```in
> (defn foobar []
>       ---+++
>   nil)
> ```
>
> ```out
> (defn bar []
>   nil)
> ```

Diffs must be contiguous, but can spread across lines.  Notice that we can
annotate a newline char as inserted or removed, which keeps this multiline
diff contiguous:

> ```in
> (defn foobar
>          ---+
>   []
> +
>   nil)
> ```
>
> ```out
> (defn foo
>   []
>   nil)
> ```

To clarify, the "after" state is created by removing the characters above "-".
Similarly, you can create the "before" state by removing the characters above "+".
For the above example:

```
(defn foobar []
  nil)
```
