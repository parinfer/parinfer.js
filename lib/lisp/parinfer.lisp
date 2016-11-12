
;; (syntax helpers for imperative loops)
(include "macros.lisp")

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
(var DOUBLE_SPACE "  ")
(var DOUBLE_QUOTE "\"")
(var NEWLINE "\n")
(var SEMICOLON ";")
(var TAB "\t")

(var LINE_ENDING_REGEX (new RegExp "\\r?\\n"))

(var STANDALONE_PAREN_TRAIL (new RegExp "^[\\s\\]\\)\\}]*(;.*)?$"))

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

;;------------------------------------------------------------------------------
;; Possible Errors
;;------------------------------------------------------------------------------

;; `result.error.name` is set to any of these
(var ERROR_QUOTE_DANGER "quote-danger")
(var ERROR_EOL_BACKSLASH "eol-backslash")
(var ERROR_UNCLOSED_QUOTE "unclosed-quote")
(var ERROR_UNCLOSED_PAREN "unclosed-paren")
(var ERROR_UNMATCHED_CLOSE_PAREN "unmatched-close-paren")
(var ERROR_UNHANDLED "unhandled")

(var errorMessages {})
(set errorMessages[ERROR_QUOTE_DANGER] "Quotes must balanced inside comment blocks.")
(set errorMessages[ERROR_EOL_BACKSLASH] "Line cannot end in a hanging backslash.")
(set errorMessages[ERROR_UNCLOSED_QUOTE] "String is missing a closing quote.")
(set errorMessages[ERROR_UNCLOSED_PAREN] "Unmatched open-paren.")
(set errorMessages[ERROR_UNMATCHED_CLOSE_PAREN] "Unmatched close-paren.")
(set errorMessages[ERROR_UNHANDLED] "Unhandled error.")

(function cacheErrorPos (result errorName lineNo x)
  (set result.errorPosCache[errorName]
    {lineNo: lineNo, x: x}))

(function error (result errorName lineNo x)
  (when (= lineNo SENTINEL_NULL)
    (set lineNo result.errorPosCache[errorName].lineNo))
  (when (= x SENTINEL_NULL)
    (set x result.errorPosCache[errorName].x))
  {parinferError: true,
   name: errorName,
   message: errorMessages[errorName],
   lineNo: lineNo,
   x: x})

;;------------------------------------------------------------------------------
;; String Operations
;;------------------------------------------------------------------------------

(function replaceWithinString (orig start end replace)
  (str
    (orig.substring 0 start)
    replace
    (orig.substring end)))

(function repeatString (text n)
  (var result "")
  (forindex i 0 n
    result+=text)
  result)

(function getLineEnding (text)
  ;; NOTE: We assume that if the CR char "\r" is used anywhere,
  ;;       then we should use CRLF line-endings after every line.
  (var i (text.search "\r"))
  (if (!= i -1) "\r\n" "\n"))

;;------------------------------------------------------------------------------
;; Line operations
;;------------------------------------------------------------------------------

(function isCursorAffected (result start end)
  (var x result.cursorX)
  (if (= x start end)
    (= x 0)
    (>= x end)))

(function shiftCursorOnEdit (result lineNo start end replace)
  (var oldLength (- end start))
  (var newLength replace.length)
  (var dx (- newLength oldLength))
  (if (&& (!= dx 0)
          (= result.cursorLine lineNo)
          (!= result.cursorX SENTINEL_NULL)
          (isCursorAffected result start end))
    result.cursorX+=dx))

(function replaceWithinLine (result lineNo start end replace)
  (var line result.lines[lineNo])
  (var newLine (replaceWithinString line start end replace))
  (set result.lines[lineNo] newLine)
  (shiftCursorOnEdit result lineNo start end replace))

(function insertWithinLine (result lineNo idx insert)
  (replaceWithinLine result lineNo idx idx insert))

(function initLine (result line)
  (set result.x 0)
  result.lineNo++
  (result.lines.push line)

  ;; reset line-specific state
  (set result.commentX SENTINEL_NULL)
  (set result.indentDelta 0)
  (set result.firstUnmatchedCloseParenX SENTINEL_NULL))

;; if the current character has changed, commit its change to the current line
(function commitChar (result origCh)
  (var ch result.ch)
  (if (!= origCh ch)
    (replaceWithinLine result result.lineNo result.x (+ result.x origCh.length) ch))
  result.x+=ch.length)

;;------------------------------------------------------------------------------
;; Misc Utils
;;------------------------------------------------------------------------------

(function clamp (val minN maxN)
  (when (!= minN SENTINEL_NULL)
    (set val (Math.max minN val)))
  (when (!= maxN SENTINEL_NULL)
    (set val (Math.min maxN val)))
  val)

(function peek (array)
  (if (= array.length 0)
    SENTINEL_NULL
    array[array.length - 1]))

;;------------------------------------------------------------------------------
;; Character functions
;;------------------------------------------------------------------------------

(function isValidCloseParen (parenStack ch)
  (var lastParen (peek parenStack))
  (if (= lastParen SENTINEL_NULL)
    false
    (= lastParen.ch PARENS[ch])))

(function onOpenParen (result)
  (when result.isInCode
    (result.parenStack.push
      {lineNo: result.lineNo,
       x: result.x,
       ch: result.ch,
       indentDelta: result.indentDelta})))

(function onMatchedCloseParen (result)
  (var opener (peek result.parenStack))
  (set result.parenTrail.endX (+ result.x 1))
  (set result.maxIndent opener.x)
  (result.parenTrail.openers.push opener)
  (result.parenStack.pop))

(function onUnmatchedCloseParen (result)
  (when (= result.firstUnmatchedCloseParenX SENTINEL_NULL)
    (set result.firstUnmatchedCloseParenX result.x)
    (set result.parenTrail.endX (+ result.x 1))))

(function onCloseParen (result)
  (when result.isInCode
    (if (isValidCloseParen result.parenStack result.ch)
      (onMatchedCloseParen result)
      (onUnmatchedCloseParen result))))

(function onTab (result)
  (when result.isInCode
    (set result.ch DOUBLE_SPACE)))

(function onSemicolon (result)
  (when result.isInCode
    (set result.isInComment true)
    (set result.commentX result.x)))

(function onNewline (result)
  (set result.isInComment false)
  (set result.ch ""))

(function onQuote (result)
  (cond
    result.isInStr
    (set result.isInStr false)

    result.isInComment
    (do
      (set result.quoteDanger !result.quoteDanger)
      (when result.quoteDanger
        (cacheErrorPos result ERROR_QUOTE_DANGER result.lineNo result.x)))

    true
    (do
      (set result.isInStr true)
      (cacheErrorPos result ERROR_UNCLOSED_QUOTE result.lineNo result.x))))

(function onBackslash (result)
  (set result.isEscaping true))

(function afterBackslash (result)
  (set result.isEscaping false)
  (when (= result.ch NEWLINE)
    (when result.isInCode
      (throw (error result ERROR_EOL_BACKSLASH result.lineNo (- result.x 1))))
    (onNewline result)))

(function onChar (result)
  (var ch result.ch)
  (cond
    result.isEscaping   (afterBackslash result)
    (isOpenParen ch)    (onOpenParen result)
    (isCloseParen ch)   (onCloseParen result)
    (= ch DOUBLE_QUOTE) (onQuote result)
    (= ch SEMICOLON)    (onSemicolon result)
    (= ch BACKSLASH)    (onBackslash result)
    (= ch TAB)          (onTab result)
    (= ch NEWLINE)      (onNewline result))
  (set result.isInCode (&& !result.isInComment !result.isInStr)))

;;------------------------------------------------------------------------------
;; Cursor functions
;;------------------------------------------------------------------------------

(function isCursorOnLeft (result)
  (&& (= result.lineNo result.cursorLine)
      (!= result.cursorX SENTINEL_NULL)
      (<= result.cursorX result.x)))

(function isCursorOnRight (result x)
  (&& (= result.lineNo result.cursorLine)
      (!= result.cursorX SENTINEL_NULL)
      (!= x SENTINEL_NULL)
      (> result.cursorX x)))

(function isCursorInComment (result)
  (isCursorOnRight result result.commentX))

(function handleCursorDelta (result)
  (var hasCursorDelta
    (&& (!= result.cursorDx SENTINEL_NULL)
        (= result.cursorLine result.lineNo)
        (= result.cursorX result.x)))
  (when hasCursorDelta
    result.indentDelta+=result.cursorDx))

;;------------------------------------------------------------------------------
;; Paren Trail functions
;;------------------------------------------------------------------------------

(function resetParenTrail (result lineNo x)
  (set result.parenTrail.lineNo lineNo)
  (set result.parenTrail.startX x)
  (set result.parenTrail.endX x)
  (set result.parenTrail.openers [])
  (set result.maxIndent SENTINEL_NULL))

;; update the head of the paren trail as we scan each character.
;; NOTE: `onMatchedCloseParen` modifies the endX
(function updateParenTrailBounds (result)
  (var line result.lines[result.lineNo])
  (var prevCh (if (> result.x 0) line[result.x-1] SENTINEL_NULL))
  (var ch result.ch)
  (var shouldReset                                    ;; In order to reset, the current character...
    (&& result.isInCode                               ;; - cannot be inside a string or comment
        (|| (!isCloseParen ch) (= prevCh BACKSLASH))  ;; - cannot be a close-paren, unless escaped
        (!= ch "")                                    ;; - cannot be an erased character
        (|| (!= ch BLANK_SPACE) (= prevCh BACKSLASH)) ;; - cannot be a space, unless escaped
        (!= ch DOUBLE_SPACE)))                        ;; - cannot be a double-space (converted tab)
  (when shouldReset
    (resetParenTrail result result.lineNo result.x+1)))

;; INDENT MODE: allow the cursor to clamp the paren trail
(function clampParenTrailToCursor (result)
  (var startX result.parenTrail.startX)
  (var endX result.parenTrail.endX)
  (var isCursorClamping
    (&& (isCursorOnRight result startX)
        (!isCursorInComment result)))
  (when isCursorClamping
    (var newStartX (Math.max startX result.cursorX))
    (var newEndX (Math.max endX result.cursorX))

    (var line result.lines[result.lineNo])
    (var removeCount 0)
    (forindex i startX newStartX
      (when (isCloseParen line[i])
        removeCount++))

    (result.parenTrail.openers.splice 0 removeCount)
    (set result.parenTrail.startX newStartX)
    (set result.parenTrail.endX newEndX)))

;; INDENT MODE: pops the paren trail from the stack
(function popParenTrail (result)
  (var startX result.parenTrail.startX)
  (var endX result.parenTrail.endX)
  (var openers result.parenTrail.openers)
  (when (!= startX endX)
    (while (!= openers.length 0)
      (result.parenStack.push (openers.pop)))))

;; INDENT MODE: correct paren trail from indentation
(function correctParenTrail (result indentX)
  (var parens "")
  (var opener (peek result.parenStack))
  (while (&& (!= opener SENTINEL_NULL)
             (>= opener.x indentX))
    (result.parenStack.pop)
    parens+=PARENS[opener.ch]
    (set opener (peek result.parenStack)))
  (replaceWithinLine result result.parenTrail.lineNo result.parenTrail.startX result.parenTrail.endX parens))

;; PAREN MODE: remove spaces from the paren trail
(function cleanParenTrail (result)
  (var startX result.parenTrail.startX)
  (var endX result.parenTrail.endX)

  (when (&& (!= startX endX)
            (= result.lineNo result.parenTrail.lineNo))

    (var line result.lines[result.lineNo])
    (var newTrail "")
    (var spaceCount 0)
    (forindex i startX endX
      (if (isCloseParen line[i])
        newTrail+=line[i]
        spaceCount++))

    (when (> spaceCount 0)
      (replaceWithinLine result result.lineNo startX endX newTrail);
      result.parenTrail.endX-=spaceCount)))

(function appendParenTrail (result)
  (var opener (result.parenStack.pop))
  (var closeCh PARENS[opener.ch])
  (set result.maxIndent opener.x)
  (insertWithinLine result result.parenTrail.lineNo result.parenTrail.endX closeCh)
  result.parenTrail.endX++)

(function invalidateParenTrail (result)
  (set result.parenTrail
    {lineNo: SENTINEL_NULL,
     startX: SENTINEL_NULL,
     endX: SENTINEL_NULL,
     openers: []}))

(function finishNewParenTrail (result)
  (cond
    result.isInStr
    (invalidateParenTrail result)

    (= result.mode INDENT_MODE)
    (do
      (clampParenTrailToCursor result)
      (popParenTrail result))

    (= result.mode PAREN_MODE)
    (when (!= result.lineNo result.cursorLine)
      (cleanParenTrail result))))

;;------------------------------------------------------------------------------
;; Indentation functions
;;------------------------------------------------------------------------------

(function correctIndent (result)
  (var origIndent result.x)
  (var newIndent origIndent)
  (var minIndent 0)
  (var maxIndent result.maxIndent)

  (var opener (peek result.parenStack))
  (when (!= opener SENTINEL_NULL)
    (set minIndent (+ opener.x 1))
    newIndent+=opener.indentDelta)

  (set newIndent (clamp newIndent minIndent maxIndent))

  (when (!= newIndent origIndent)
    (var indentStr (repeatString BLANK_SPACE newIndent))
    (replaceWithinLine result result.lineNo 0 origIndent indentStr)
    (set result.x newIndent)
    (var dx (- newIndent origIndent))
    result.indentDelta+=dx))

(function tryPreviewCursorScope (result)
  (when result.canPreviewCursorScope
    ;; If the cursor is to the right of current indentation point we can show
    ;; scope by adding close-parens to the cursor.
    ;; (i.e. close-parens may be safely moved from the previous Paren Trail to
    ;;  a new Paren Trail at the cursor since there are no tokens between them.)
    (when (> result.cursorX result.x)
      (correctParenTrail result result.cursorX)
      (resetParenTrail result result.cursorLine result.cursorX))
    (set result.canPreviewCursorScope false)))

(function onIndent (result)
  (set result.trackingIndent false)

  (when result.quoteDanger
    (throw (error result ERROR_QUOTE_DANGER SENTINEL_NULL SENTINEL_NULL)))

  (cond
    (= result.mode INDENT_MODE)
    (do
      (tryPreviewCursorScope result)
      (correctParenTrail result result.x))

    (= result.mode PAREN_MODE)
    (correctIndent result)))

(function onLeadingCloseParen (result)
  (set result.skipChar true)
  (when (= result.mode PAREN_MODE)
    (when (isValidCloseParen result.parenStack result.ch)
      (if (isCursorOnLeft result)
        (do
          (set result.skipChar false)
          (onIndent result))
        (appendParenTrail result)))))

(function checkIndent (result)
  (cond
    (isCloseParen result.ch)
    (onLeadingCloseParen result)

    (= result.ch SEMICOLON)
    ;; comments don't count as indentation points
    (set result.trackingIndent false)

    (&& (!= result.ch NEWLINE)
        (!= result.ch BLANK_SPACE)
        (!= result.ch TAB))
    (onIndent result)))

(function initPreviewCursorScope (result)
  (when (&& result.previewCursorScope
            (= result.cursorLine result.lineNo))
    (var line result.lines[result.lineNo])
    (var semicolonX (line.indexOf ";"))
    (set result.canPreviewCursorScope
      (&& result.trackingIndent
          (STANDALONE_PAREN_TRAIL.test line)
          (|| (= semicolonX -1)
              (<= result.cursorX semicolonX))))))

(function initIndent (result)
  (cond
    (= result.mode INDENT_MODE)
    (do
      (set result.trackingIndent
        (&& (!= result.parenStack.length 0)
            !result.isInStr))
      (initPreviewCursorScope result))

    (= result.mode PAREN_MODE)
    (set result.trackingIndent !result.isInStr)))

(function setTabStops (result)
  (when (&& (= result.cursorLine result.lineNo)
            (= result.mode INDENT_MODE))
    (foreach e result.parenStack
      (result.tabStops.push
        {ch: e.ch,
         x: e.x,
         lineNo: e.lineNo}))))

;;------------------------------------------------------------------------------
;; High-level processing functions
;;------------------------------------------------------------------------------

(function processChar (result ch)
  (var origCh ch)

  (set result.ch ch)
  (set result.skipChar false)

  (when (= result.mode PAREN_MODE)
    (handleCursorDelta result))

  (when result.trackingIndent
    (checkIndent result))

  (if result.skipChar
    (set result.ch "")
    (do
      (onChar result)
      (updateParenTrailBounds result)))

  (commitChar result origCh))

(function processLine (result line)
  (initLine result line)
  (initIndent result)

  (setTabStops result)

  (var chars (str line NEWLINE))
  (forindex i 0 chars.length
    (processChar result chars[i]))

  (var unmatchedX result.firstUnmatchedCloseParenX)
  (when (&& (!= unmatchedX SENTINEL_NULL)
            (< unmatchedX result.parenTrail.startX))
    (throw (error result ERROR_UNMATCHED_CLOSE_PAREN result.lineNo unmatchedX)))

  (when (= result.lineNo result.parenTrail.lineNo)
    (finishNewParenTrail result)))

(function finalizeResult (result)
  (when result.quoteDanger
    (throw (error result ERROR_QUOTE_DANGER SENTINEL_NULL SENTINEL_NULL)))
  (when result.isInStr
    (throw (error result ERROR_UNCLOSED_QUOTE SENTINEL_NULL SENTINEL_NULL)))

  (when (&& (!= result.parenStack.length 0)
            (= result.mode PAREN_MODE))
    (var opener (peek result.parenStack))
    (throw (error result ERROR_UNCLOSED_PAREN opener.lineNo opener.x)))

  (when (= result.mode INDENT_MODE)
    (set result.x 0)
    (onIndent result))

  (set result.success true))

(function processError (result e)
  (set result.success false)
  (if e.parinferError
    (do
      (delete e.parinferError)
      (set result.error e))
    (do
      (set result.error.name ERROR_UNHANDLED)
      (set result.error.message e.stack))))

(function processText (text options mode)
  (var result (getInitialResult text options mode))
  (try
    (foreach line result.origLines
      (processLine result line))
    (finalizeResult result)
    (function (e)
      (processError result e)))
  result)

;;------------------------------------------------------------------------------
;; Public API
;;------------------------------------------------------------------------------

(function getChangedLines (result)
  (var changedLines [])
  (forindex i 0 result.lines.length
    (when (!= result.lines[i] result.origLines[i])
      (changedLines.push
        {lineNo: i,
         line: result.lines[i]})))
  changedLines)

(function publicResult (result)
  (if !result.success
    {text: result.origText,
     cursorX: result.origCursorX,
     success: false,
     error: result.error}
    (do
      (var lineEnding (getLineEnding result.origText))
      (var text (result.lines.join lineEnding))
      (var changedLines (getChangedLines result))
      {text: text,
       cursorX: result.cursorX,
       success: true,
       changedLines: changedLines,
       tabStops: result.tabStops})))

(function indentMode (text options)
  (var result (processText text options INDENT_MODE))
  (publicResult result))

(function parenMode (text options)
  (var result (processText text options PAREN_MODE))
  (publicResult result))

(var API
  {version: "2.0.0",
   indentMode: indentMode,
   parenMode: parenMode})

;;------------------------------------------------------------------------------
;; JS Module Boilerplate
;;------------------------------------------------------------------------------

(cond
  (&& (= (typeof define) "function")
      define.amd)
  (define [] (function () API))

  (&& (= (typeof module) "object")
      module.exports)
  (set module.exports API)

  true
  (set this.parinfer API))
