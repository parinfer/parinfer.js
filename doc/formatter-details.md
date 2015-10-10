# Parinfer Formatter

We perform the following steps to rearrange parens based on indentation:

1. remove all right-parens at the end of each line
2. for every resulting unmatched left-paren:
  - insert a right-paren at the end of its line or its last non-empty indented line

This two-step process is simple and works well for static, well-formatted text.
But there are some other factors that require us to add more steps or to think
about when we should apply them.

### Automatic vs. Manual Formatting

The animated examples we have seen so far trigger the formatting process after
every text change, __automatically__.

If we don't want the process to restrict what we're typing, we could instead
__manually__ trigger it with a hotkey or button.  We haven't explored this
option yet.

### Preprocessing Existing Code

When opening an existing file with incorrect indentation, _Parinfer_ will
unwittingly restructure the code and change its behavior.  A hypothetical
preprocessor could correct indentation to prevent this from happening, but such
a thing is not currently implemented.

A fully fledged pretty-printer (which preserves comments) would technically
work, but I think correcting indentation line-by-line may be sufficient and
less destructive of the author's inlining choices.

### Dealing with Misplaced Parens

We can add some steps for processing misplaced parens:

<ol start="3">
<li> remove right-parens at the start of each line
  <div class="side-point">(since we consider them equivalent to right-parens at the end of a line)</div>
<li> remove unmatched right-parens
  <div class="side-point">(seems to be an easy way to keep order, but not sure if this can be relaxed)</div>
</ol>

### The cursor as a "paperweight" for parens

Just as paperweights keep our papers from blowing away, we similarly treat the
user's cursor as a "parenweight" to keep parens from blowing away to indented
lines. That is, if we are using the automatic formatter, we add the step:

<ol start="5">
<li> do not displace right-parens that are behind the cursor
  <div class="side-point">(allows user to finish typing a line without an intermediate paren jumping to an indented line)</div>
</ol>

### Quotes are not like parens

Quotes are sort of like parens, but there are important differences that
prevent _Parinfer_ from treating them as such.

- multi-line strings do not follow indentation rules because whitespace is significant.
- since strings don't follow indentation rules, we can't infer where they are intended to be closed.
- a quote's identity as a left-quote or right-quote is dependent on what has come before it.

### Imbalanced Quotes might erase parens in Auto-mode!

In auto-mode, a quote typed before another string will turn that string
__inside-out__, irreversibly subjecting any parens inside the prior contents of
the string to _Parinfer_'s formatter.

We try disabling the formatter for these imbalanced cases, but some cases seem
difficult to detect.  For example, an end-of-line comment containing a single
quote (or an odd number of them) can temporarily break the fall of an
imbalanced quote, fooling _Parinfer_ into thinking it is okay for processing,
like a broken "Buddy system".

These are some steps that may detect most imbalances:

<ol start="6">
<li> do not process text if the text ends with an unclosed string
  <div class="side-point">(this is a best guess for detecting imbalances)</div>
<li> auto-escape any quotes in a comment
  <div class="side-point">(this might prevent a comment from catching an unbalanced quote)</div>
</ol>

