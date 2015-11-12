# Text Change

We need a way for test cases to represent changes:

- replace selection
- insert at cursor
- delete at cursor (forward or backward)
- delete selection

All can be represented as _replace_ operations, that is, a selection of input
text _replaced_ with some new text.  To clarify:

| operation                   | input selection               | new text     |
|-----------------------------|-------------------------------|--------------|
| replace selection           | selection                     | text         |
| insert at cursor            | empty range at cursor         | text         |
| delete at cursor (forward)  | range of 1 in front of cursor | empty string |
| delete at cursor (backward) | range of 1 behind cursor      | empty string |
| delete selection            | selection                     | empty string |

Thus, we can generically represent any change with an input selection and new
text to replace it with.

## Specifying Input Selection

To represent an input selection, we use one or two `|` pipes inside the `in`
block.  We interpret a pipe `|` as a space character with a cursor to its left.
For example:

```in
(a|b|c)
```

is interpreted as

```in
(a b c)
```

with two cursors, one after `a` and the other after `b`.  The selection is
simply the region between them.

## Specifying New Text

To represent new text that will replace the input selection, we use a `replace`
block.  We do not consider the last line to have a newline after it.

empty string:

```replace

```

foo (no newline after):

```replace
foo
```

foo and a newline:

```replace
foo

```

## 3 blocks

Thus, we need three blocks per test case:

- `in`
- `replace`
- `out`

