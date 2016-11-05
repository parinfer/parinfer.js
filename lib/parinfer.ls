;;
;; Parinfer 1.9.0-beta
;;
;; Copyright 2015-2016 © Shaun LeBron
;; MIT License
;;
;; Home Page: http://shaunlebron.github.io/parinfer/
;; GitHub: https://github.com/shaunlebron/parinfer
;;
;; For DOCUMENTATION on this file, please see `parinfer.js.md`
;;

;;------------------------------------------------------------------------------
;; Constants / Predicates
;;------------------------------------------------------------------------------

;; NOTE: this is a performance hack
;; The main result object uses a lot of "Integer or null" values.
;; Using a sentinel integer is faster than actual null because it cuts down on
;; type coercion overhead.
;; https://en.wikipedia.org/wiki/Sentinel_value
(var SENTINEL_NULL -999)

(var INDENT_MODE "INDENT_MODE")
(var PAREN_MODE "PAREN_MODE")

(var BACKSLASH "\\")
(var BLANK_SPACE " ")
(var DOUBLE_QUOTE "\"")
(var NEWLINE "\n")
(var SEMICOLON ";")
(var TAB "\t")

(var LINE_ENDING_REGEX (new RegExp "\r?\n"))

(var STANDALONE_PAREN_TRAIL (new RegExp "^[\s\]\)\}]*(;.*)?$"))

(var PARENS {"{": "}",
             "}": "{",
             "[": "]",
             "]": "[",
             "(": ")",
             ")": "("})

(function isBoolean (x)
  (= (typeof x) "boolean"))

(function isInteger (x)
  (&& (= (typeof x) "number")
      (isFinite x)
      (= x (Math.floor x))))

(function isOpenParen (c)
  (|| (= c "{") (= c "(") (= c "[")))

(function isCloseParen (c)
  (|| (= c "}") (= c ")") (= c "]")))

;;------------------------------------------------------------------------------
;; Result Structure
;;------------------------------------------------------------------------------

;; This represents the running result. As we scan through each character
;; of a given text, we mutate this structure to update the state of our
;; system.

(function getInitialResult (text options mode)
  (var result
    (object
      mode mode                ;; [enum] - current processing mode (INDENT_MODE or PAREN_MODE)

      origText text            ;; [string] - original text
      origCursorX SENTINEL_NULL
      origLines                ;; [string array] - original lines
      (text.split LINE_ENDING_REGEX)

      lines []                 ;; [string array] - resulting lines (with corrected parens or indentation)
      lineNo -1                ;; [integer] - line number we are processing
      ch ""                    ;; [string] - character we are processing (can be changed to indicate a replacement)
      x 0                      ;; [integer] - x position of the current character (ch)

      parenStack []            ;; We track where we are in the Lisp tree by keeping a stack (array) of open-parens.
                               ;; Stack elements are objects containing keys {ch, x, lineNo, indentDelta}
                               ;; whose values are the same as those described here in this result structure.

      tabStops []              ;; In Indent Mode, it is useful for editors to snap a line's indentation
                               ;; to certain critical points.  Thus, we have a `tabStops` array of objects containing
                               ;; keys {ch, x, lineNo}, which is just the state of the `parenStack` at the cursor line.

      parenTrail               ;; the range of parens at the end of a line}
      (object
        lineNo SENTINEL_NULL   ;; [integer] - line number of the last parsed paren trail
        startX SENTINEL_NULL   ;; [integer] - x position of first paren in this range
        endX SENTINEL_NULL     ;; [integer] - x position after the last paren in this range
        openers [])              ;; [array of stack elements] - corresponding open-paren for each close-paren in this range

      cursorX SENTINEL_NULL       ;; [integer] - x position of the cursor
      cursorLine SENTINEL_NULL    ;; [integer] - line number of the cursor
      cursorDx SENTINEL_NULL      ;; [integer] - amount that the cursor moved horizontally if something was inserted or deleted
      previewCursorScope false    ;; [boolean] - preview the cursor's scope on an empty line by inserting close-parens after it.
      canPreviewCursorScope false ;; [boolean] - determines if the cursor is in a valid position to allow previewing scope

      isInCode true            ;; [boolean] - indicates if we are currently in "code space" (not string or comment)
      isEscaping false         ;; [boolean] - indicates if the next character will be escaped (e.g. `\c`).  This may be inside string, comment, or code.
      isInStr false            ;; [boolean] - indicates if we are currently inside a string
      isInComment false        ;; [boolean] - indicates if we are currently inside a comment
      commentX SENTINEL_NULL   ;; [integer] - x position of the start of comment on current line (if any)

      firstUnmatchedCloseParenX SENTINEL_NULL ;; [integer] - x position of the first unmatched close paren of a line (if any)

      quoteDanger false        ;; [boolean] - indicates if quotes are imbalanced inside of a comment (dangerous)
      trackingIndent false     ;; [boolean] - are we looking for the indentation point of the current line?
      skipChar false           ;; [boolean] - should we skip the processing of the current character?
      success false            ;; [boolean] - was the input properly formatted enough to create a valid result?

      maxIndent SENTINEL_NULL  ;; [integer] - maximum allowed indentation of subsequent lines in Paren Mode
      indentDelta 0            ;; [integer] - how far indentation was shifted by Paren Mode
                               ;;  (preserves relative indentation of nested expressions)

      error                    ;; if 'success' is false, return this error to the user
      (object
        name SENTINEL_NULL     ;; [string] - Parinfer's unique name for this error
        message SENTINEL_NULL  ;; [string] - error message to display
        lineNo SENTINEL_NULL   ;; [integer] - line number of error
        x SENTINEL_NULL)       ;; [integer] - start x position of error}

      errorPosCache {}))       ;; [object] - maps error name to a potential error position}))

  ;; Make sure no new properties are added to the result, for type safety.
  ;; (uncomment only when debugging, since it incurs a perf penalty)
  ;; (Object.preventExtensions result)
  ;; (Object.preventExtensions result.parenTrail)

  ;; merge options if they are valid
  (when options
    (when (isInteger options.cursorX)
      (set result.cursorX options.cursorX)
      (set result.origCursorX options.cursorX))
    (when (isInteger options.cursorLine)
      (set result.cursorLine options.cursorLine))
    (when (isInteger options.cursorDx)
      (set result.cursorDx options.cursorDx))
    (when (isBoolean options.previewCursorScope)
      (set result.previewCursorScope options.previewCursorScope)))

  result)
