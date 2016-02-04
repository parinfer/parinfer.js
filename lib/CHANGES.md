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
