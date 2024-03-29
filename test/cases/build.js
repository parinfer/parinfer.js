const fs = require('fs')
const parinferTest = require('../../testParsingLib.js')

// -----------------------------------------------------------------------------
// Result Data

function getInitialResult () {
  const result = {
    cases: [],
    currLabel: null, // "in" or "out"
    currCase: getInitialCase()
  }
  Object.preventExtensions(result)
  return result
}

function getInitialCase () {
  const testCase = {
    id: null,
    in: [],
    out: []
  }
  Object.preventExtensions(testCase)
  return testCase
}

function getInitialCaseBlock (fileLineNo) {
  // for testCase.in or testCase.out
  return {
    fileLineNo: fileLineNo,
    fileText: ''
  }
}

function finalizeCase (testCase) {
  let text, options, result

  const inBlocks = testCase.in
  const outBlock = testCase.out[testCase.out.length - 1]

  try {
    const input = parinferTest.parseInput(inBlocks.map(b => b.fileText))
    text = input.text
    options = input.options
  } catch (e) {
    const block = inBlocks[0]
    console.log()
    console.log('error at input block, line ' + block.fileLineNo + ':')
    console.log()
    console.log(block.fileText)
    console.log()
    throw e
  }

  try {
    result = parinferTest.parseOutput(outBlock.fileText)
  } catch (e) {
    console.log()
    console.log('error at output block, line ' + outBlock.fileLineNo + ':')
    console.log()
    console.log(outBlock.fileText)
    console.log()
    throw e
  }

  const output = {
    // test input
    text: text,
    options: options,

    // test output
    result: result,

    // original test source
    source: {
      lineNo: inBlocks[0].fileLineNo,
      in: inBlocks.map(b => b.fileText),
      out: outBlock.fileText
    }
  }

  if (testCase.id) {
    output.id = testCase.id
  }

  return output
}

// -----------------------------------------------------------------------------
// Error Handling

function error (fileLineNo, msg) {
  console.error('error at test-case line #' + (fileLineNo + 1) + ': ' + msg)
  process.exit(1)
}

// -----------------------------------------------------------------------------
// Test case parsing

function parseLineEndBlock (result, fileLineNo, line) {
  if (result.currLabel === null) {
    error(fileLineNo, "opening block must have a name: 'in' or 'out'.")
  }

  const isTestCaseDone = (result.currCase.out.length !== 0)

  if (isTestCaseDone) {
    result.cases.push(finalizeCase(result.currCase))
    result.currLabel = null
    result.currCase = getInitialCase()
  } else {
    result.currLabel = null
  }
}

function parseLineStartBlock (result, fileLineNo, line) {
  if (result.currLabel !== null) {
    error(fileLineNo, "must close previous block '" + result.currLabel + "' before starting new one.")
  }

  const label = line.substring('```'.length).replace(/:.+/, '')
  const isInLine = line.startsWith('```in')

  if (!isInLine && label !== 'out') {
    error(fileLineNo, "block name '" + label + "' must be either 'in' or 'out'.")
  }
  if (isInLine && result.currCase.out.length > 0) {
    error(fileLineNo, "'in' blocks must come before the 'out' block.")
  }
  if (label === 'out' && result.currCase.in.length === 0) {
    error(fileLineNo, "must include an 'in' block before an 'out' block.")
  }
  if (label === 'out' && result.currCase.out.length > 0) {
    error(fileLineNo, "only one 'out' block allowed.")
  }

  result.currLabel = label

  const blocks = result.currCase[label]
  const newBlock = getInitialCaseBlock(fileLineNo)

  if (isInLine) {
    const lineArr = line.split(':')
    if (lineArr.length === 2) {
      const possibleId = parseInt(lineArr[1], 10)
      if (typeof possibleId === 'number' && possibleId > 999 && possibleId < 10000) {
        result.currCase.id = possibleId
      }
    }
  }

  blocks.push(newBlock)
}

function parseLineInsideBlock (result, fileLineNo, line) {
  const blocks = result.currCase[result.currLabel]
  const block = blocks[blocks.length - 1]
  if (block.fileText) {
    block.fileText += '\n'
  }
  block.fileText += line
}

function parseLineDefault (result, fileLineNo, line) {
  return result
}

function parseLine (result, fileLineNo, line) {
  let f
  if (line === '```') f = parseLineEndBlock
  else if (line.startsWith('```')) f = parseLineStartBlock
  else if (result.currLabel !== null) f = parseLineInsideBlock
  else f = parseLineDefault

  return f(result, fileLineNo, line)
}

function parseText (text) {
  const lines = text.split('\n')
  const result = getInitialResult()
  for (let i = 0; i < lines.length; i++) {
    parseLine(result, i, lines[i])
  }

  if (result.currLabel !== null) {
    error('EOF', 'code block not closed')
  }
  if (result.currCase.in.length > 0 ||
      result.currCase.out.length > 0) {
    error('EOF', "test case 'out' block not completed")
  }

  return result.cases
}

// -----------------------------------------------------------------------------
// JSON builder

const casesPath = __dirname

function buildJSON (name) {
  // JSON.stringify(data, null, "  ");
  const inFile = casesPath + '/' + name + '.md'
  const outFile = casesPath + '/' + name + '.json'
  const inText = fs.readFileSync(inFile, 'utf8')

  console.log(
    '  compiling ' +
    name + '.md' +
    '  -->  ' +
    name + '.json'
  )

  const cases = parseText(inText)
  const outText = JSON.stringify(cases, null, '  ')
  fs.writeFileSync(outFile, outText)
}

function buildAll () {
  console.log('\nReading test cases described in Markdown and compiling to JSON...')
  buildJSON('indent-mode')
  buildJSON('paren-mode')
  buildJSON('smart-mode')
  console.log()
}

// -----------------------------------------------------------------------------
// Exports and Entry

// export api
exports.buildAll = buildAll

// allow running this file directly with Node
if (require.main === module) {
  buildAll()
}
