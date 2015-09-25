## Ideas

_older ideas:_

##### A new format

To make this possible, our experimental editor has to operate on code which
__does not allow any closing delimiters at the end of a line__. Rather, these
delimiters are inferred and displayed by the editor, based on indentation
alone.  In the figure below, the left side shows code that follows such a rule,
and the right side highlights the location of the inferred closing delimiters.

![inferred parens](http://i.imgur.com/dPigfne.png)

##### Using with existing code

It may be possible for the editor to load and
[validate][clojure-validate-indent] an existing Clojure source file, say
`foo.clj`, then convert it to a working copy at `foo.iclj` to follow the
aforementioned format.  Edits to `foo.iclj` will result in straightforward
translations to the `foo.clj` file.

