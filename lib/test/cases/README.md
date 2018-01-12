# Parinfer Test Cases

Parinfer's modes act as pure functions of your full file of text, returning the
new text with corrections.  Thus, a test case contains a description, input
text (with optional cursor), and expected output text. For readability, we
specify these things in markdown:

<pre>
description of the test...

```in
input line 1
input line 2
```

```out
output line 1
output line 2
```
</pre>

It is converted to the following data:

```js
{
  // INPUT: the args to indentMode or parenMode
  "text": "...",
  "options": {...}

  // OUTPUT: expected return value of indentMode or parenMode
  "result": {
    "text": "...",
    ...
  }

  // original source text (containing annotations)
  "source": {
    "in": "...",
    "out": "...",
    "lineNo": n
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

<pre>
```in
(def foo|
```

```out
(def foo|)
```
</pre>

## Expected Error

An output block can contain an error line, with a caret `^` and the name
of the error.  The caret is positioned under the offending character.

<pre>
```in
(def foo "bar
```

```out
(def foo "bar
         ^ error: unclosed-quote
```
</pre>

## Tab Stops

An output block can contain a tabStops line before the cursor line. Each caret
is positioned at the position of its associated open-paren. We also track the
position of the first arg after a `(` with the `>` annotation, since some styles
align to it.

<pre>
```in
(let [a {:foo 1}
      bar (func 1 2 3)]
  |
  bar)
```

```out
(let [a {:foo 1}
      bar (func 1 2 3)]
^    ^    ^     > tabStops
  |
  bar)
```
</pre>

## Change Diff

Smart mode requires information about the previous change in order to be smart.
Thus, an input block can have lines containing plus/minus symbols, indicating
that the characters above it have been added or removed.  `-` should come before `+`.

<pre>
```in
(defn foobar []
      ---+++
  nil)
```

```out
(defn bar []
  nil)
```
</pre>

A line can have at most one contiguous diff (for the sake of of our naive diff
parsers).  If you want to have disjoint changes on a single line, or overlapping
changes, you can specify multiple `in` blocks:

<pre>
```in
(foo
 +++
bar)
+++
```

```in
(foo
  bar)
++
```

```out
(foo
  bar)
```
</pre>


A contiguous diff _can_ spread across lines.  Notice that we can annotate a
newline char as inserted or removed, which keeps this multiline diff contiguous:

<pre>
```in
(defn foobar
         ---+
  []
+
  nil)
```

```out
(defn foo
  []
  nil)
```
</pre>

To clarify, the "after" state is created by removing the characters above "-".
Similarly, you can create the "before" state by removing the characters above "+".
For the above example:

```
(defn foobar []
  nil)
```

## Previous Cursor

Smart Mode corrects indentation after the cursor is released from a holding
area. Thus, `^ prevCursor` lets us point to the position where the cursor moved
from.

<pre>
```in
(foo {:a 1
    ^ prevCursor
      :b 2}
      bar)
```

```out
(foo {:a 1
      :b 2}
     bar) ; <-- indentation corrected
```
</pre>
