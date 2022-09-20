## Adding Parinfer to an Editor

> See Parinfer for [Atom] or [CodeMirror] to see examples of these steps implemented.

[Atom]:https://github.com/oakmac/atom-parinfer
[CodeMirror]:https://github.com/shaunlebron/parinfer-codemirror

If you want to integrate this Parinfer library into an editor, here are some
small steps you can take to get something quickly working.  Each step produces
something that you can try:

1. __First run__: After every keystroke, pass the contents of the editor to
   `indentMode` and replace the contents with its result.  You now have Indent Mode.
1. __Locate the cursor__: Since Parinfer relaxes its rules around the cursor,
   make sure the aforementioned function receives the location of the cursor.
1. __Update the cursor__: Parinfer may have to shift your cursor around since
   some parts of a line may be added/removed/replaced.  Move your cursor to
   the position at `cursorX`.
1. __Highlight any errors__: Parinfer cannot infer how to fix all parens, so
   get the returned `error` object and use it to highlight any offending characters,
   so the user can resolve them to resume inference.
1. __When the editor opens a file__ you must first pass their content to
  `parenMode` and replace its contents with the result.  This ensures
  indentation of a file is correct before using with Indent Mode.
1. __For smarter behavior__, used `smartMode` instead. Pass a batched list of
  `changes` responsible for the most recent edit (see [example](https://github.com/shaunlebron/parinfer-codemirror/blob/37b36/parinfer-codemirror.js#L93-L102))
  and also pass the previous cursor position `prevCursorX` and `prevCursorLine`.

## When to process text?

Process the text after a change OR a cursor movement.  If a change AND a cursor movement both occur, make sure they are handled together.
You can see an example of this being handled [here](https://github.com/shaunlebron/parinfer-codemirror/blob/37b36/parinfer-codemirror.js#L331-L344)
to prevent double-processing.

## Partial File Processing

> __TODO__: write about parent-expression hack used by
> [atom-parinfer](https://github.com/oakmac/atom-parinfer)
> to quickly identify and process top-level expressions.
> Some subtleties are required, like processing previous
> top-level expression even when cursor left its area.
>
> Also include [#148](https://github.com/shaunlebron/parinfer/issues/148)

## Tab stops

 __Use Tab Stops__ to allow the user to quickly indent/dedent lines to
 important points:

  1. Set the `selectionStartLine` option to the first line number of your selected text (if any).
  1. Save the most recent `tabStops` for use below.

When <kbd>Tab</kbd> or <kbd>Shift</kbd>+<kbd>Tab</kbd> is pressed:

  1. prevent it from doing its normal operation if necessary
  1. expand the `tabStops` depending on what style you want to support (see [example](https://github.com/shaunlebron/parinfer-codemirror/blob/37b36/parinfer-codemirror.js#L160-L178))
  1. search for next available tabStop before or after the current line's
     indentation. (see [example](https://github.com/shaunlebron/parinfer-codemirror/blob/37b36/parinfer-codemirror.js#L180-L192))
  1. indent the line(s) to the target tabStop
     - __for cursor__ - only do this if the cursor is at the indentation point (i.e. `x = indent`)
     - __for selection__ - the top line of the selection is the one used for deciding indentation
  1. if no tabStop can be used, indent by some default amount instead

## Add Parinfer to a REPL

> See this [gif][replete-gif] for an example of [Replete] for iOS using Parinfer in its REPL.

> __TODO__: auto-indent can be done easier using the `partialResult` option of Paren Mode

[replete-gif]:https://twitter.com/mfikes/status/668435676438900737
[replete]:https://github.com/mfikes/replete

REPLs can benefit from Parinfer as well, and they are simpler to setup since
we can assume a default subset of the features for quick input:

1. __First run__: After every keystroke, pass the contents of the editor to
   `indentMode` and replace the contents with its result.  You now have Indent
   Mode.
1. __Locate the cursor__: Since Parinfer relaxes its rules around the cursor,
   make sure the aforementioned function receives the location of the cursor.
1. __Update the cursor__: Parinfer may have to shift your cursor around since
   some parts of a line may be added/removed/replaced.  Move your cursor to
   the position at `cursorX`.
1. __For auto-indent__, run `parenMode` instead of `indentMode` when pressing enter.
