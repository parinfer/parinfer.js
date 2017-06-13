## Adding Parinfer to an Editor

> See [Parinfer for Atom][atom-parinfer] to see an example of these steps implemented.

[atom-parinfer]:https://github.com/oakmac/atom-parinfer

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
1. __When the editor opens a file__ you must first pass their content to
  `parenMode` and replace its contents with the result.  This ensures
  indentation of a file is correct before using with Indent Mode.
1. __Use Tab Stops__ to allow the user to quickly indent/dedent lines to
   important points in Indent Mode.  When the user presses <kbd>Tab</kbd> or
   <kbd>Shift</kbd>+<kbd>Tab</kbd>, do the following:
   1. Prevent <kbd>Tab</kbd> from doing its normal space insertion, or just
      remove them prior to the next step.
   1. Run Indent Mode on the text, passing the cursor in as normal. BUT, if you
      have multiple lines selected, you must instead pass in the
      _starting position of the selection_ as the cursor.
   1. The result returned by the previous step should include a `tabStops`
      property.  These returned tab stops only represent open-paren positions,
      so you need to insert extra tab stops depending on your desired
      indentation conventions.  For example, you can add a tab stop to
      represent a one-space indentation after every `[`, a two-space indentation
      after every `(`, or even get fancy by reading the text that comes after `(`
      to determine context-specific indentation, as is common in Lisp.
   1. Insert the correct number of spaces (then re-run indent mode after the change as normal):
     - If you pressed <kbd>Tab</kbd>, indent the current line (or first line of
       the selection) to the next tab stop.
     - If you pressed <kbd>Shift</kbd>+<kbd>Tab</kbd>, dedent the current line
       (or first line of the selection) to the previous tab stop.
     - If there is more than one selected line that you are indenting, shift the
       subsequent lines by the same delta applied to the first.
     - If no tab stop is available in the direction you're indenting, just use
       two spaces as normal.

1. __Allow mode toggling__ by using some hotkeys.  For example:
  - <kbd>Ctrl</kbd>+<kbd>(</kbd> to toggle between Indent Mode and Paren Mode
  - <kbd>Ctrl</kbd>+<kbd>)</kbd> to turn Parinfer off
1. __Supply extra info to Paren Mode__ to allow it to preserve relative indentaiton
   as you type.  If your editor can notify you of the _type_ of change the user
   just performed, such as the portion of text that was inserted, deleted, or removed,
   then you can calculate a `cursorDx` value from it, allowing Paren Mode
   to keep expressions well-formatted. (TODO, explain how to compute this)
1. __For better performance__ on larger files, you can limit the call frequency
  of `indentMode` and `parenMode` by waiting for the user to stop typing after
  some interval, or by [debouncing] the function.

[debouncing]:https://davidwalsh.name/javascript-debounce-function

## Add Parinfer to a REPL

> See this [gif][replete-gif] for an example of [Replete] for iOS using Parinfer in its REPL.

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
