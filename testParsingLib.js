//
// Parinfer Test 3.13.1
//
// Copyright 2015-2017 © Shaun Lebron
// MIT License
//

const parinfer = require('./parinfer.js')

const LINE_ENDING_REGEX = /\r?\n/

const INLINE_OPTS_REGEX = /^options\s*=\s*(.*)\n\n/

function isOpenParen (c) {
  return c === '{' || c === '(' || c === '['
}

function isCloseParen (c) {
  return c === '}' || c === ')' || c === ']'
}

// ------------------------------------------------------------------------------
// String Operations
// ------------------------------------------------------------------------------

function replaceWithinString (orig, start, end, replace) {
  return (
    orig.substring(0, start) +
    replace +
    orig.substring(end)
  )
}

function repeatString (text, n) {
  let i
  let result = ''
  for (i = 0; i < n; i++) {
    result += text
  }
  return result
}

// ------------------------------------------------------------------------------
// Input Parser
// ------------------------------------------------------------------------------

function error (lineNo, msg) {
  return new Error('test parse error at line ' + lineNo + ': ' + msg)
}

function parsePrevCursorLine (options, inputLineNo, outputLineNo, input) {
  const match = input.match(/^\s*\^\s*prevCursor\s*$/)
  if (!match) {
    return false
  }
  let x = input.indexOf('^')
  if (options.cursorX < x && options.cursorLine === outputLineNo) {
    x++
  }
  options.prevCursorX = x
  options.prevCursorLine = outputLineNo
  return true
}

function parseCursorFromLine (options, inputLineNo, outputLineNo, input) {
  const cursorX = input.indexOf('|')
  if (cursorX !== -1) {
    if (options.cursorX) {
      throw error(inputLineNo, `found cursor at ${inputLineNo}:${cursorX}, but cursor was already found at ${options.cursorLine}:${options.cursorX}`)
    }
    const clean = input.split('|').join('')
    if (clean.length < input.length - 1) {
      throw error(inputLineNo, 'only one cursor allowed')
    }
    input = clean
    options.cursorX = cursorX
    options.cursorLine = outputLineNo
  }
  return input
}

function initialDiffState () {
  const diff = {
    code: null, // the code that the diff line is annotating
    codeLineNo: null,
    prevCode: null, // the code that the previous diff line annotated
    prevCodeLineNo: null,
    prevNewlineChar: '', // the previous diff line's newline annotation ('', '-', or '+')
    merge: null, // the code should be merged with the next code line?
    mergeOffset: 0 // code growth after merge
  }
  return diff
}

function parseDiffLine (options, inputLineNo, input, diff) {
  // lines with only -/+ chars are considered diff lines.
  const looseMatch = input.match(/^\s*[-+]+[-+\s]*$/)
  if (!looseMatch) {
    return
  }
  const match = input.match(/^((\s*)(-*)(\+*))\s*$/)
  if (!match) {
    throw error(inputLineNo, " diff chars must be adjacent with '-'s before '+'s.")
  }
  let x = match[2].length
  if (!diff.code) {
    throw error(inputLineNo, ' diff lines must be directly below a code line')
  }

  // "open" means current and previous diffs can be connected
  const prevDiffOpen = (
    diff.prevCode &&
    diff.prevNewlineChar !== '' &&
    (diff.prevCodeLineNo === diff.codeLineNo ||
     diff.prevCodeLineNo + 1 === diff.codeLineNo)
  )
  const currDiffOpen = x === 0

  if (prevDiffOpen && currDiffOpen) {
    if (diff.prevNewlineChar === '+' && input[0] === '-') {
      throw error(inputLineNo, "diff line starts with '-', which cannot come after '+' which previous diff line ends with")
    }
  } else {
    // create a new change since diffs are not connected
    options.changes = options.changes || []
    options.changes.push({
      lineNo: diff.codeLineNo,
      x: x + diff.mergeOffset,
      oldText: '',
      newText: ''
    })
  }

  // get the current active change
  const change = options.changes[options.changes.length - 1]

  if (match[1].length > diff.code.length + 1) {
    throw error(inputLineNo, "diff line can only extend one character past the previous line length (to annotate the 'newline' char)")
  }

  x += diff.mergeOffset
  const oldLen = match[3].length
  const newLen = match[4].length
  let oldX = x
  let newX = x + oldLen
  const len = oldLen + newLen
  const xEnd = x + len - 1

  if (options.cursorLine === diff.codeLineNo) {
    if (x <= options.cursorX && options.cursorX < x + len) {
      throw error(inputLineNo, 'cursor cannot be over a diff annotation')
    } else if (options.cursorX < x) {
      x--; oldX--; newX--
    } else {
      options.cursorX -= oldLen
    }
  }

  const newlineChar = (diff.code.length === xEnd ? input.charAt(xEnd) : '')
  const oldText = diff.code.substring(oldX, oldX + oldLen) + (newlineChar === '-' ? '\n' : '')
  const newText = diff.code.substring(newX, newX + newLen) + (newlineChar === '+' ? '\n' : '')
  change.oldText += oldText
  change.newText += newText

  // update diff state
  diff.prevCode = diff.code
  diff.prevCodeLineNo = diff.codeLineNo
  diff.merge = newlineChar === '-'
  diff.prevNewlineChar = newlineChar

  return replaceWithinString(diff.code, oldX, oldX + oldLen, '')
}

function handlePostDiffLine (options, inputLineNo, outputLineNo, outputLines, output, diff) {
  const j = outputLineNo
  if (diff.merge) {
    diff.mergeOffset = outputLines[j - 1].length
    if (options.cursorLine === j) {
      options.cursorLine = j - 1
      options.cursorX += diff.mergeOffset
    }
    outputLines[j - 1] += output
  } else {
    diff.mergeOffset = 0
    outputLines.push(output)
  }
  diff.merge = false
  diff.codeLineNo = outputLines.length - 1
  diff.code = outputLines[diff.codeLineNo]
}

function transferInlineOpts (src, dst) {
  if (Array.isArray(src)) {
    src = src[src.length - 1]
  }
  const m = src.match(INLINE_OPTS_REGEX)
  return m ? m[0] + dst : dst
}

function parseJSON (text) {
  return JSON.parse(
    text
      .replace(/([a-zA-Z]+)\s*:/g, '"$1":') // wrap keys in quotes
      .replace(/'/g, '"') // replace ' with "
  )
}

function _parseInput (text, extras) {
  extras = extras || {}
  const options = {}
  if (extras.printParensOnly) { options.returnParens = true }

  // parse inline options
  const m = text.match(INLINE_OPTS_REGEX)
  if (m) {
    text = text.slice(m[0].length) // remove inline options from text
    const inlineOpts = parseJSON(m[1]) // parse options line
    Object.assign(options, inlineOpts) // add options
  }

  const inputLines = text.split(LINE_ENDING_REGEX)
  const outputLines = []

  const diff = initialDiffState()

  for (let i = 0; i < inputLines.length; i++) { // input line number
    const input = inputLines[i]
    const j = outputLines.length // output line number

    if (parsePrevCursorLine(options, i, j - 1, input)) {
      continue
    }

    let output = parseDiffLine(options, i, input, diff)
    if (output != null) {
      outputLines[j - 1] = output
      delete diff.code
      continue
    }

    output = parseCursorFromLine(options, i, j, input)
    handlePostDiffLine(options, i, j, outputLines, output, diff)
  }

  return {
    text: outputLines.join('\n'),
    options: options
  }
}

function parseInput (texts, extras) {
  if (!Array.isArray(texts)) {
    return _parseInput(texts, extras)
  }

  const changes = []
  let resultText
  let resultOptions
  for (let i = 0; i < texts.length; i++) {
    const result = _parseInput(texts[i], extras)
    resultText = result.text
    resultOptions = result.options
    const newChanges = result.options.changes
    if (newChanges) {
      for (let j = 0; j < newChanges.length; j++) {
        changes.push(newChanges[j])
      }
    }
  }

  if (changes.length > 0) {
    resultOptions.changes = changes
  }

  return {
    text: resultText,
    options: resultOptions
  }
}

// ------------------------------------------------------------------------------
// Output Parser
// ------------------------------------------------------------------------------

function parseErrorLine (result, inputLineNo, outputLineNo, input) {
  const match = input.match(/^\s*\^\s*error: ([a-z-]+)\s*$/)
  if (!match) {
    return false
  }
  if (result.error) {
    throw error(inputLineNo, 'only one error can be specified')
  }
  let x = input.indexOf('^')
  if (result.cursorLine === outputLineNo && result.cursorX < x) {
    x--
  }
  result.error = {
    name: match[1],
    lineNo: outputLineNo,
    x: x
  }
  return true
}

function parseTabStopsLine (result, inputLineNo, outputLineNo, input) {
  const match = input.match(/^([\^>\s]+)tabStops?\s*$/)
  if (!match) {
    return false
  }
  if (result.tabStops) {
    throw error(inputLineNo, 'only one tabStop line can be specified')
  }
  result.tabStops = []
  let ch, tabStop
  for (let x = 0; x < input.length; x++) {
    const sym = input[x]
    if (sym === '^') {
      tabStop = { x: x }
      for (let i = outputLineNo; i >= 0; i--) {
        ch = result.lines[i][x]
        if (isOpenParen(ch)) {
          tabStop.ch = ch
          tabStop.lineNo = i
          break
        }
      }
      if (!tabStop.ch) {
        throw error(inputLineNo, 'tabStop at ' + x + ' does not point to open paren')
      }
      result.tabStops.push(tabStop)
    } else if (sym === '>') {
      tabStop = result.tabStops[result.tabStops.length - 1]
      if (!tabStop) {
        throw error(inputLineNo, 'tabStop at ' + x + ' ">" is a dependent on a preceding "^"')
      }
      if (tabStop.argX != null) {
        throw error(inputLineNo, 'tabStop at ' + x + ' ">" cannot come after another ">"')
      }
      tabStop.argX = x
    }
  }
  return true
}

function parseParenTrailLine (result, inputLineNo, outputLineNo, input) {
  const match = input.match(/^\s*(\^*)\s*parenTrail\s*$/)
  if (!match) {
    return false
  }
  if (result.cursorLine != null) {
    throw error(inputLineNo, 'parenTrail cannot currently be printed when a cursor is present')
  }
  const trail = match[1]
  const startX = input.indexOf('^')
  const endX = startX + trail.length

  for (let x = startX; x < endX; x++) {
    const ch = result.lines[outputLineNo][x]
    if (!isCloseParen(ch)) {
      throw error(inputLineNo, '^ parenTrail must point to close-parens only')
    }
  }

  if (!result.parenTrails) {
    result.parenTrails = []
  }
  result.parenTrails.push({
    lineNo: outputLineNo,
    startX: startX,
    endX: endX
  })
  return true
}

function parseOutput (text) {
  const lines = text.split(LINE_ENDING_REGEX)
  const result = {
    lines: []
  }

  for (let i = 0; i < lines.length; i++) { // input line number
    const input = lines[i]
    const j = result.lines.length // output line number

    if (parseErrorLine(result, i, j - 1, input) ||
        parseTabStopsLine(result, i, j - 1, input) ||
        parseParenTrailLine(result, i, j - 1, input)) {
      continue
    }

    const output = parseCursorFromLine(result, i, j, input)
    result.lines.push(output)
  }
  result.text = result.lines.join('\n')
  result.success = result.error == null
  delete result.lines
  return result
}

// ------------------------------------------------------------------------------
// Output Printer
// ------------------------------------------------------------------------------

function printErrorLine (result) {
  // shift x position back if previous line has cursor before our error caret
  let x = result.error.x
  if (result.cursorLine === result.error.lineNo &&
      result.cursorX <= x) {
    x++
  }
  return repeatString(' ', x) + '^ error: ' + result.error.name
}

function printTabStopLine (tabStops) {
  let lastX = -1
  let line = ''
  let count = 0
  for (let i = 0; i < tabStops.length; i++) {
    let x = tabStops[i].x
    line += repeatString(' ', x - lastX - 1) + '^'
    lastX = x
    count++

    x = tabStops[i].argX
    if (x != null) {
      line += repeatString(' ', x - lastX - 1) + '>'
      lastX = x
      count++
    }
  }
  line += ' tabStop' + (count > 1 ? 's' : '')
  return line
}

function printParenTrailLine (parenTrail) {
  return (
    repeatString(' ', parenTrail.startX) +
    repeatString('^', parenTrail.endX - parenTrail.startX) +
    ' parenTrail'
  )
}

function printPadding (lineNo, x, nextLineNo, nextX) {
  const newlines = nextLineNo - lineNo
  const spaces = (nextLineNo > lineNo) ? nextX : nextX - x - 1
  return repeatString('\n', newlines) + repeatString(' ', spaces)
}

function printParen (lineNo, x, opener) {
  let s = printPadding(lineNo, x, opener.lineNo, opener.x)
  s += opener.ch
  lineNo = opener.lineNo
  x = opener.x

  s += printParens(lineNo, x, opener.children)
  const lastChild = opener.children[opener.children.length - 1]
  if (lastChild) {
    lineNo = lastChild.closer.lineNo
    x = lastChild.closer.x
  }

  s += printPadding(lineNo, x, opener.closer.lineNo, opener.closer.x)
  s += opener.closer.ch
  if (opener.closer.trail) {
    s += '*'
  }
  return s
}

function printParens (lineNo, x, parens) {
  let s = ''
  for (let i = 0; i < parens.length; i++) {
    const opener = parens[i]
    s += printParen(lineNo, x, opener)
    lineNo = opener.closer.lineNo
    x = opener.closer.x
  }
  return s
}

function printOutput (result, extras) {
  extras = extras || {}
  const lines = result.text.split(LINE_ENDING_REGEX)
  const hasCursor = (
    result.cursorX != null &&
    result.cursorLine != null &&

    // could be false if `partialResult` is true and parinfer failed before reaching cursor line
    result.cursorLine < lines.length
  )
  if (hasCursor) {
    const line = lines[result.cursorLine]
    lines[result.cursorLine] = replaceWithinString(line, result.cursorX, result.cursorX, '|')
  }
  if (result.error) {
    lines.splice(result.error.lineNo + 1, 0, printErrorLine(result))
  } else if (extras.printParensOnly) {
    return printParens(0, 0, result.parens)
  } else if (extras.printParenTrails && result.parenTrails) {
    for (let i = result.parenTrails.length - 1; i >= 0; i--) {
      const parenTrail = result.parenTrails[i]
      lines.splice(parenTrail.lineNo + 1, 0, printParenTrailLine(parenTrail))
    }
  } else if (hasCursor && extras.printTabStops && result.tabStops.length > 0) {
    lines.splice(result.cursorLine, 0, printTabStopLine(result.tabStops))
  }
  return lines.join('\n')
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

function indentMode (text, extras) {
  const parsed = parseInput(text, extras)
  const result = parinfer.indentMode(parsed.text, parsed.options)
  return printOutput(result, extras)
}

function parenMode (text, extras) {
  const parsed = parseInput(text, extras)
  const result = parinfer.parenMode(parsed.text, parsed.options)
  return printOutput(result, extras)
}

function smartMode (text, extras) {
  const parsed = parseInput(text, extras)
  const result = parinfer.smartMode(parsed.text, parsed.options)
  return printOutput(result, extras)
}

module.exports = {
  indentMode: indentMode,
  parenMode: parenMode,
  smartMode: smartMode,

  parseInput: parseInput,
  parseOutput: parseOutput,
  printOutput: printOutput,

  transferInlineOpts: transferInlineOpts
}
