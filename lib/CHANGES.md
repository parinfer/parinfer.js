## 2.0.0

- do not remove unmatched close parens indiscriminately (see [relevant docs](doc/design.md#unmatched-close-parens))

## 1.8.2

- fix missing semicolons to prevent closure minification errors (see [#120](https://github.com/shaunlebron/parinfer/issues/120))

## 1.8.1

- correctly handle lines ending in unclosed string (see [#112](https://github.com/shaunlebron/parinfer/issues/112))

## 1.8.0

- return new `tabStops` property (see [#110](https://github.com/shaunlebron/parinfer/pull/110))

## 1.7.1

- allow escaped close-parens

## 1.7.0

- Indent Mode has new `previewCursorScope` option

## 1.6.1

- fix cursor position bug (see [comment](https://github.com/shaunlebron/parinfer/issues/47#issuecomment-186063654))

## 1.6.0

- return cursor position (see [#96](https://github.com/shaunlebron/parinfer/pull/96))

## 1.5.3

- performance improvements (thanks @oakmac)

## 1.5.2

- performance improvements (thanks @oakmac)

## 1.5.1

- fudged the 1.5.0 npm release (this fixes it)

## 1.5.0

- allow insertion of spaces in the cursor line's paren trail in Paren Mode

## 1.4.0

- modes return new key `changedLines`
- modes return new key `error`
- performance improvements

## 1.3.0

- add compatibility for CRLF line endings

## 1.2.0

- performance improvements (thanks [@oakmac](https://github.com/oakmac))

## 1.1.0

- remove `result` key from returned result (internal only)

## 1.0.0

- port to native JS implementation (~20x faster, ~25 lines/ms)
- remove `indentModeChange`

## 0.2.3

- fudged the 0.2.2 npm release (this fixes it)

## 0.2.2

- do not treat commas as indentation whitespace (see [#61](https://github.com/shaunlebron/parinfer/issues/61))

## 0.2.1

- publish JavaScript API to npm

## 0.2.0

- add cursor courtesy to Paren Mode (see [new website section](http://shaunlebron.github.io/parinfer/#knowing-when-parens-move-in-paren-mode))
  - can be used for auto-indent in REPL (see [replete #73](https://github.com/mfikes/replete/issues/73#issuecomment-158712053))

## 0.1.0

initial version
