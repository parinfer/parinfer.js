_add following banner on original page and create new page with content after
the fold_

> This is the 2015 version of the page.  See the new 2017 addendum describing
> new behavior and tooling.

---

## New ways to simplify writing Lisp

__[Parinfer] was released two years ago__ after two months of research and
prototyping.  It was first available for Atom, and is probably still the
most widely used version.  It has since been ported and integrated into many
different editors seen below:

> (show editor icons here with links to plugins)

__There has been lots of feedback__ highlighting areas that didn't quite feel
right.  Many people enjoyed the core of its behavior, but the main problems that
emerged were 1) edge cases causing unintended structure changes, 2) confusion
over switching modes, and 3) noisy diffs on projects where Parinfer was not
used by everyone.

__We now have a new version__ that represents our current attempt to fix these
major issues. Not all are fully resolved, but it represents the next milestone
toward designing a better experience for newcomers writing Lisp.

---

_still brainstorming below_

## Animated Examples

Main Improvements

- no more switching modes
- structural tab stops
- collaboration with parlinter (gif?)

Main Compromises (for reducing surprise in edge cases)

- forceBalance
  - mismatched inline close-paren
    - (not the "paredit without hotkeys" as we said originally.  looking at ways to improve this in #141)
  - pressing enter (paren mode on leading close-paren)
- dedenting in smart mode
  - show also the cursor-holding example
  - correction only done after editing to prevent aggressive

philosophy of traveling through invalid states
- dedent example
- and imbalance example
  - paren
  - string


copy-paste examples?

## Problems remaining

- edit-based results (rather than full string)
- multiple cursors

## Contributing

talk about improved test experience and readability if it helps people who want
to help.

## Thanks

- plugin authors
- people who gave feedback
- slack folks for discussions and ideas
