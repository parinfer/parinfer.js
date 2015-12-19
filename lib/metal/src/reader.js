

// Reader:
// a basic lisp reader for tracking parens and token states

var matchingDelim = {
  "{": "}",
  "}": "{",
  "[": "]",
  "]": "[",
  "(": ")",
  ")": "("
};

function isOpenDelim(c) {
  return c === "{" || c === "(" || c == "[";
}

function isCloseDelim(c) {
  return c === "}" || c === ")" || c == "]";
}

function isWhitespace(c) {
  return /\s/.exec(c);
}

//------------------------------------------------------------------------
// Delimiter Stack states
//
//   State is tracked by checking last pushed character.
//------------------------------------------------------------------------

function peek(stack, i) {
  if (i == null) {
    i = 1;
  }
  return stack[stack.length-i];
}

function prevCh(stack, i) {
  var e = peek(stack, i);
  return e && e.ch;
}

function isEscaping(stack) {
  return prevCh(stack) === "\\";
}

function prevNonEscCh(stack) {
  var i = isEscaping(stack) ? 2 : 1;
  return prevCh(stack, i);
}

function isInStr(stack) {
  return prevNonEscCh(stack) === "\"";
}

function isInComment(stack) {
  return prevNonEscCh(stack) === ";";
}

function isInCode(stack) {
  return !isInStr(stack) && !isInComment(stack);
}

function isValidCloser(stack, ch) {
  return prevCh(stack) === matchingDelim[ch];
}

//------------------------------------------------------------------------
// Delimiter Stack operations (they MUTATE)
//
//
//   We track delimiters by using a stack of maps containing [:x-pos :ch :indent-delta].
//   State is tracked by checking last character.
//------------------------------------------------------------------------

function pushChar(obj) {
  var ch = obj.ch;
  if (isOpenDelim(ch))       { pushOpen(obj); }
  else if (isCloseDelim(ch)) { pushClose(obj); }
  else {
    switch (ch) {
      case "\t": pushTab(obj); break;
      case ";":  pushSemicolon(obj); break;
      case "\n": pushNewline(obj); break;
      case "\\": pushEscape(obj); break;
      case "\"": pushQuote(obj); break;
      default:   pushDefault(obj);
    }
  }
}

function pushOpen(obj) {
  var stack = obj.stack;
  if (isEscaping(stack)) {
    stack.pop();
  }
  else if (isInCode(stack)) {
    stack.push({
      x: obj.x,
      ch: obj.ch,
      indentDelta: obj.indentDelta
    });
  }
}

function pushClose(obj) {
  var stack = obj.stack;
  var backup = obj.backup;
  var ch = obj.ch;
  var opener;

  if (isEscaping(stack)) {
    stack.pop();
  }
  else if (isInCode(stack)) {
    if (isValidCloser(stack, ch)) {
      opener = stack.pop();
      backup.push(opener);
    }
    else {
      // erase non-matched delimiter
      obj.ch = "";
    }
  }
}

function pushTab(obj) {
  if (!isInStr(obj.stack)) {
    obj.ch = "  ";
  }
}

function pushSemicolon(obj) {
  var stack = obj.stack;
  if (isEscaping(stack)) {
    stack.pop();
  }
  else if (isInCode(stack)) {
    stack.push({
      x: obj.x,
      ch: obj.ch
    });
  }
}

function pushNewline(obj) {
  var stack = obj.stack;
  if (isEscaping(stack)) {
    stack.pop();
  }
  if (isInComment(stack)) {
    stack.pop();
  }
  obj.ch = "";
}

function pushEscape(obj) {
  var stack = obj.stack;
  if (isEscaping(stack)) {
    stack.pop();
  }
  else {
    stack.push({
      x: obj.x,
      ch: obj.ch
    });
  }
}

function pushQuote(obj) {
  var stack = obj.stack;
  if (isEscaping(stack)) {
    stack.pop();
  }
  else if (isInStr(stack)) {
    stack.pop();
  }
  else if (isInComment(stack)) {
    obj.quoteDanger = !obj.quoteDanger;
  }
  else {
    stack.push({
      x: obj.x,
      ch: obj.ch
    });
  }
}

function pushDefault(obj) {
  var stack = obj.stack;
  if (isEscaping(stack)) {
    stack.pop();
  }
}
