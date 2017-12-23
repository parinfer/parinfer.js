
Trying to fix these "multi-change" bugs here:
https://github.com/shaunlebron/parinfer/labels/multi-change%20bug

## Summary

This is what I'm calling the "multi-change bug" for Smart Mode.

In summary, throwing multiple changes at Smart Mode can sometimes produce bad
code because the way we determine how to shift expressions is currently suited
only for simpler changes.

## `getParentOpenerIndex` needs fixing

`getParentOpenerIndex` determines which open-paren (if any) on the parenStack
should be considered the direct parent of the current line (given its
indentation point). This allows Smart Mode to simulate Paren Mode's
structure-preserving behavior by adding its `opener.indentDelta` to the current
line's indentation. (care must be taken to prevent redundant indentation
correction, detailed below)

## Definitions

The function uses a definition of __"Outside"__, meaning that an opener can be
considered a PARENT of the following line. That is, the open-paren is _outside_
the indentation point. In other words, the open-paren is to the left of the
indentation point.

To illustrate, the following examples use `^opener` for open-paren, and
`^indent` for the indentation point in question.

```
NOT OUTSIDE:
 (foo
 ^opener
 bar
 ^indent

NOT OUTSIDE:
  (foo
  ^opener
 bar
 ^indent

OUTSIDE:
 (foo
 ^opener
  bar
  ^indent

OUTSIDE:
 (foo
 ^opener
   bar
   ^indent
```

## Conditions

We use a combination of these two conditions to determine when to assign
an open-paren as a "truly intended" parent of the current line.

`currOutside` = open-paren is currently outside indentation point
`prevOutside` = open-paren was previously outside indentation point before the change


## What's wrong

I think the `prevOutside` variable is combining indent and dedent cases
incorrectly.  `Math.max` is preventing this from ever registering dedentation
for this variable, but this seems to be desired for indentation cases (TODO:
explain further, still fuzzy about this myself).

I will investigate each of the following cases to see where our current
conditional logic fails, and determine how to split them up appropriately to
fix.

## Case 1 (multiple dedents from reformat)

https://github.com/shaunlebron/parinfer/issues/179

sandbox code

```
const code = `
(a (b (c (d ""
            (e)))))
`;

console.log(parinfer.smartMode(code, {
  changes: [
    {lineNo:1, x:3,  oldText: '   ', newText: ''},
    {lineNo:1, x:6,  oldText: ' ', newText: ''},
    {lineNo:2, x:0, oldText: '    ', newText: ''},
  ],
}).text);
```

actual

```
(a (b (c (d "")
            (e))))
```

expected

```
(a (b (c (d ""
            (e)))))
```

relevant state at indentation point:

```
(a (b (c (d ""
^                   opener.indentDelta 0
   ^                opener.indentDelta -3
      ^             opener.indentDelta -4
         ^          opener.indentDelta -4
            (e)))))
            ^       result.indentDelta -4
```

diagnosis:

`prevOutside` is false when it should be true, but the following line distorts
this by ignoring negative values.

```
var prevIndentX = indentX - Math.max(0, result.indentDelta);
```

fix:

```
var prevIndentX = indentX - result.indentDelta;
```

this fix breaks the following four test cases:

```
smart-mode.md:163
in~~~~~~~~~~~~~~~~~~~~~
(foo
  {:a 1
--
   :b 2})
expected~~~~~~~~~~~~~~~
(foo)
{:a 1
 :b 2}
actual~~~~~~~~~~~~~~~~~
(foo
{:a 1
 :b 2})
```

```
smart-mode.md:193
in~~~~~~~~~~~~~~~~~~~~~
(foo
  {:a 1
   :b 2})
---
expected~~~~~~~~~~~~~~~
(foo
  {:a 1})
:b 2
actual~~~~~~~~~~~~~~~~~
(foo
  {:a 1
:b 2})
```

```
smart-mode.md:208
in~~~~~~~~~~~~~~~~~~~~~
(defn foo
  [a b]
--
  bar)
expected~~~~~~~~~~~~~~~
(defn foo)
[a b
  bar]
actual~~~~~~~~~~~~~~~~~
(defn foo
[a b
  bar])
```

```
smart-mode.md:260
in~~~~~~~~~~~~~~~~~~~~~
(defn foo
  |[a b
--
   c d]
  bar
  baz)
expected~~~~~~~~~~~~~~~
(defn foo)
|[a b
 c d]
  bar
  baz
actual~~~~~~~~~~~~~~~~~
(defn foo
|[a b
 c d
  bar])
  baz
```

## Case 2 (multiple indents from wrap)

https://github.com/shaunlebron/parinfer/issues/173

sandbox code

```
const code = `
((reduce-kv (fn [m k v]
            {}
            {})))
`;

console.log(parinfer.smartMode(code, {
  changes: [
    {lineNo:1, x:0, oldText: '', newText: '('},
    {lineNo:2, x:11, oldText: '', newText: ' '},
    {lineNo:3, x:11, oldText: '', newText: ' '},
    {lineNo:3, x:16, oldText: '', newText: ')'},
  ],
}).text);
```

## Case 3 (multiple indents from wrap)

https://github.com/shaunlebron/parinfer/issues/176

sandbox code

```
const code = `
(let [a 1]
  (
    (foo)))
`;

console.log(parinfer.smartMode(code, {
  changes: [
    {lineNo:2, x:2, oldText: '', newText: '('},
    {lineNo:3, x:2, oldText: '', newText: '  '},
    {lineNo:3, x:9, oldText: '', newText: ')'},
  ],
}).text);
```

## Case 4 (overlapping changes from paste)

https://github.com/shaunlebron/parinfer/issues/177

sandbox code

```
const code = `
(let [a 1]
  (let [a 1]
    (foo))
  (foo))
`;

console.log(parinfer.smartMode(code, {
  changes: [
    {lineNo:2, x:2, oldText: '', newText: '(let [a 1]\n  (foo))'},
    {lineNo:3, x:2, oldText: '', newText: '  '},
  ],
}).text);
```
