; Parinfer

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
