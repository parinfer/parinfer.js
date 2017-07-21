```
; BEFORE
(foo |(((1
        2
        3)))
  4)
```

[X] Add test cases

Add extra option for `previousCursor`

1. [X] add syntax `^ previousCursor` to test.js
2. add option to parinfer.js
  - `previousCursorX`    paralleling `cursorX`
  - `previousCursorLine` paralleling `cursorLine`
3. Detect if cursor left a precarious holding area.
4. On detection, exit Indent Mode and execute Paren Mode.
5. Shrink the holding area to left of parent open-paren

    ```
    (foo [1 2 3] |(...
     ^^^^^^^^^^^^ HOLDING AREA
     (from precarious paren to its parent open paren)

    (foo
      [1 2 3] |(...
      ^^^^^^^^ HOLDING AREA
     (from precarious paren to beginning of line since parent open paren on another line?)
    ```
