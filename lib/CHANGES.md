## 3.12.0

- make Smart Mode work better when inputting multiple changes. See [#181]

[#181]:https://github.com/shaunlebron/parinfer/pull/181

## 3.11.0

- fix: `parenTrails` now include those which may appear at the beginning of a line
- fix: `parens` now correctly assigns relocated leading close-parens to their paren trail
- enhancement: smart mode with `forceBalance` off will remove unmatched close-parens in a leading paren trail ( see [#163])

[#163]:https://github.com/shaunlebron/parinfer/issues/163

## 3.10.0

- add: return `parens` (full paren tree) if `returnParens` is enabled
- change: move leading-close paren fix from Indent Mode to Smart Mode
- change: throw leading close-paren error in Indent Mode if and it cannot be removed safely and `forceBalance` is off
- revert: do not fix indentation in Smart Mode after cursor leaves end of Paren Trail (from [#147])
  - this was causing bad pasting behavior since a line with extra parens would dedent subsequent lines
- change: smart mode will allow selected lines to be indented in isolation (by running Indent Mode when `selectionStartLine` is passed in)
  - this helps with correcting pastes without influence indentation around it
  - thanks to [@SevereOverfl0w](https://github.com/SevereOverfl0w)!

[#147]:https://github.com/shaunlebron/parinfer/issues/147

## 3.9.0

- add: return `tabStops` in Paren Mode (see [#156](https://github.com/shaunlebron/parinfer/issues/156))
- add: return `argX` for Tab Stops (see [#157](https://github.com/shaunlebron/parinfer/issues/157))
- add: new option `selectionStartLine` so Tab Stops can use the top of the selection instead of the cursor line

## 3.8.0

- fix: don't accumulate extra indentation when `changes` indents multiple lines (see [#154](https://github.com/shaunlebron/parinfer/issues/154))

## 3.7.0

- add: return non-empty `parenTrails` so editors can dim/mark them (see [Paren Trails](https://github.com/shaunlebron/parinfer/blob/master/lib/doc/code.md#paren-trail))

## 3.6.0

- add: fix indentation in Smart Mode after cursor leaves the end of a Paren Trail (see [#147](https://github.com/shaunlebron/parinfer/issues/147))

## 3.5.0

- add: fix indentation in Smart Mode after cursor leaves a holding area, preventing
unintended line adoption (see [#143](https://github.com/shaunlebron/parinfer/issues/143))

## 3.4.1

- refactor: remove `discardStack` since `parenTrail.openers` is same thing

## 3.4.0

- experiment: [extend indentation constraints] in Paren Mode to promote more
stability in Indent Mode and Smart Mode

[extend indentation constraints]:test/cases/paren-mode.md#extending-indentation-constraints

## 3.3.0

- add: create `smartMode` to hold new smart features and to preserve original `indentMode`
- add: prevent sibling adoption when dedenting expressions, until cursor
  is moved to different line or to the right of the open-paren.
  (see [#143](https://github.com/shaunlebron/parinfer/issues/143))

## 3.2.0

- change: remove `cursorX`, `cursorLine`, and `tabStops` from result if null or empty
- add: new `parseOutput` function in test API

## 3.1.1

- fix botched 3.1.0

## 3.1.0

- enhancement: publish separate test API

## 3.0.1

- fix: make deleted unbalanced parens influence shifted expressions (when `forceBalance` is true)

## 3.0.0

- enhancement: replace `cursorDx` with `changes` option (republishing 2.6.0 as major version bump)

## 2.6.1

- republishing 2.5.2 since 2.6.0 was a breaking change that should be published as 3.0.0

## 2.6.0

- enhancement: replace `cursorDx` with `changes` option

## 2.5.2

- fix: comment lines are shifted when indented inside shifted collections (see end of [this section](doc/code.md#preserving-relative-indentation-while-typing))

## 2.5.1

- fix: dedenting an open-paren with `cursorDx` in Indent Mode will properly adopt new child lines

## 2.5.0

- experiment: allow `forceBalance` option in Indent Mode to restore v1's aggressive balancing

## 2.4.0

- experiment: allow `cursorDx` option in Indent Mode to prevent switching to Paren Mode for most cases (see [#84](https://github.com/shaunlebron/parinfer/issues/86))
  - thanks to [@rgdelato](https://github.com/rgdelato)!

## 2.3.1

- fix: prevent `testParenMode` and `testIndentMode` from failing when `partialResult` is enabled and cursor line never reached

## 2.3.0

- enhancement: `partialResult` option allows partially processed text/cursor to be returned on error [#124](https://github.com/shaunlebron/parinfer/issues/124)

## 2.2.1

- fix: don't allow unmatched close-parens to be held by the cursor in the paren trail

## 2.2.0

- enhancement: when `unmatched-close-paren` error, return `error.extra` for open-paren location

## 2.1.0

- fix: error locations reported in input coords, not output coords
- fix: throw error when unmatched close-paren found in Paren Mode
- fix: don't let Indent Mode crash when processing text without code
- fix: when leading close-parens found in Indent Mode, exit to Paren Mode to prevent strange behavior [#126]
- change: remove `previewCursorScope` option since it interfered with [#126]
- enhancement: allow test-case annotations in input/output using `testIndentMode`/`testParenMode`

[#126]:https://github.com/shaunlebron/parinfer/issues/126

## 2.0.0

- do not remove unmatched close parens indiscriminately (see [relevant docs](doc/code.md#unmatched-close-parens))

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
