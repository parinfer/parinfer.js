/* global describe, it */

const parinfer = require('../parinfer.js')
const assert = require('assert')

function isInteger (x) {
  return typeof x === 'number' &&
       isFinite(x) &&
       Math.floor(x) === x
}

function isValidTestId (id) {
  return typeof id === 'number' && id >= 1000 && id < 10000
}

function isTestIdArg (s) {
  if (typeof s !== 'string') return false
  const split = s.split(':')
  if (split.length !== 2) return false
  const testId = parseInt(split[1], 10)
  return split[0] === '--id' && isValidTestId(testId)
}

assert(isTestIdArg('--id:1400'))
assert(!isTestIdArg('--id'))
assert(!isTestIdArg('--id:78'))

function extractJustId (s) {
  const a = s.split(':')
  return parseInt(a[1], 10)
}

assert(extractJustId('--id:1400') === 1400)

// -----------------------------------------------------------------------------
// Compile tests from Markdown to JSON

require('./cases/build.js').buildAll()
const indentCases = require('./cases/indent-mode.json')
const parenCases = require('./cases/paren-mode.json')
const smartCases = require('./cases/smart-mode.json')

// NOTE:
// Add some additional tests that do not participate in the "test cases in markdown" system
// This is a hack in order to ensure that adding configurable comment characters
// did not break anything.
// Long-term: I want to refactor the "test cases in markdown" approach
// -- C. Oakman, 06 Sep 2020

const indentModeCommentTest1400 = {
  id: 1400,
  text: '(def foo \\,\n(def bar \\ # <-- space',
  options: {
    commentChars: ['#']
  },
  result: {
    text: '(def foo \\,)\n(def bar \\ )# <-- space',
    success: true
  },
  source: {
    lineNo: 9000,
    in: [
      '(def foo \\,\n(def bar \\ # <-- space'
    ],
    out: '(def foo \\,)\n(def bar \\ )# <-- space'
  }
}

const indentModeCommentTest1405 = {
  id: 1405,
  text: '(def foo q)',
  options: { commentChars: 'q' },
  result: {
    text: '(def foo) q)',
    success: true
  },
  source: {
    lineNo: 9050,
    in: [
      '(def foo q)'
    ],
    out: '(def foo) q)'
  }
}

const indentModeCommentTest1410 = {
  id: 1410,
  text: '(def foo [a b]\n  # "my multiline\n  # docstring."\nret)',
  options: { commentChars: ['#'] },
  result: {
    text: '(def foo [a b])\n  # "my multiline\n  # docstring."\nret',
    success: true
  },
  source: {
    lineNo: 9100,
    in: [
      '(def foo [a b]\n  # "my multiline\n  # docstring."\nret)'
    ],
    out: '(def foo [a b])\n  # "my multiline\n  # docstring."\nret'
  }
}

const indentModeCommentTest1415 = {
  id: 1415,
  text: '(let [a 1\n      b 2\n      c {:foo 1\n         ## :bar 2}]\n  ret)',
  options: { commentChars: '#' },
  result: {
    text: '(let [a 1\n      b 2\n      c {:foo 1}]\n         ## :bar 2}]\n  ret)',
    success: true
  },
  source: {
    lineNo: 9150,
    in: [
      '(let [a 1\n      b 2\n      c {:foo 1\n         ## :bar 2}]\n  ret)'
    ],
    out: '(let [a 1\n      b 2\n      c {:foo 1}]\n         ## :bar 2}]\n  ret)'
  }
}

const indentModeParenCharTest1420 = {
  id: 1420,
  text: '(let ((}{ 2)\n      (]]] 5))\n  (- }{ ]]]))',
  options: { openParenChars: '(', closeParenChars: ')' },
  result: {
    text: '(let ((}{ 2)\n      (]]] 5))\n  (- }{ ]]]))',
    success: true
  },
  source: {
    lineNo: 9200,
    in: [
      '(let ((}{ 2)\n      (]]] 5))\n  (- }{ ]]]))'
    ],
    out: '(let ((}{ 2)\n      (]]] 5))\n  (- }{ ]]]))'
  }
}

indentCases.push(indentModeCommentTest1400)
indentCases.push(indentModeCommentTest1405)
indentCases.push(indentModeCommentTest1410)
indentCases.push(indentModeCommentTest1415)
indentCases.push(indentModeParenCharTest1420)

const parenModeCommentTest2300 = {
  id: 2300,
  text: '(let [foo 1\n      ]# <-- spaces\n  foo)',
  options: { commentChars: '#' },
  result: {
    text: '(let [foo 1]\n      # <-- spaces\n  foo)',
    success: true
  },
  source: {
    lineNo: 8000,
    in: [
      '(let [foo 1\n      ]# <-- spaces\n  foo)'
    ],
    out: '(let [foo 1]\n      # <-- spaces\n  foo)'
  }
}

const parenModeCommentTest2305 = {
  id: 2305,
  text: '(let [foo 1\n      bar 2\n\n     ] (+ foo bar\n  )% <-- spaces\n)',
  options: { commentChars: [';', '%'] },
  result: {
    text: '(let [foo 1\n      bar 2]\n\n     (+ foo bar))\n  % <-- spaces\n',
    success: true
  },
  source: {
    lineNo: 8100,
    in: [
      '(let [foo 1\n      bar 2\n\n     ] (+ foo bar\n  )% <-- spaces\n)'
    ],
    out: '(let [foo 1\n      bar 2]\n\n     (+ foo bar))\n  % <-- spaces\n'
  }
}

const parenModeCommentTest2310 = {
  id: 2310,
  text: '(def foo [a b]\n  # "my string\nret)',
  options: { commentChars: ['#'] },
  result: {
    error: {
      name: 'quote-danger',
      lineNo: 1,
      x: 4
    },
    text: '(def foo [a b]\n  # "my string\nret)',
    success: false
  },
  source: {
    lineNo: 8200,
    in: [
      '(def foo [a b]\n  # "my string\nret)'
    ],
    out: '(def foo [a b]\n  # "my string\n    ^ error: quote-danger\nret)'
  }
}

const parenModeParenCharTest2315 = {
  id: 2315,
  text: '(let ((}{ 2)\n      (]]] 5))\n  (- }{ ]]]))',
  options: { openParenChars: '(', closeParenChars: ')' },
  result: {
    text: '(let ((}{ 2)\n      (]]] 5))\n  (- }{ ]]]))',
    success: true
  },
  source: {
    lineNo: 9200,
    in: [
      '(let ((}{ 2)\n      (]]] 5))\n  (- }{ ]]]))'
    ],
    out: '(let ((}{ 2)\n      (]]] 5))\n  (- }{ ]]]))'
  }
}

parenCases.push(parenModeCommentTest2300)
parenCases.push(parenModeCommentTest2305)
parenCases.push(parenModeCommentTest2310)
parenCases.push(parenModeParenCharTest2315)

const smartModeCommentTest3200 = {
  id: 3200,
  text: '(let [a 1\n      ])$ <-- spaces',
  options: {
    commentChars: [';', '$']
  },
  result: {
    text: '(let [a 1])\n      $ <-- spaces',
    success: true
  },
  source: {
    lineNo: 4100,
    in: [
      '(let [a 1\n      ])$ <-- spaces'
    ],
    out: '(let [a 1])\n      $ <-- spaces'
  }
}

const smartModeCommentTest3205 = {
  id: 3205,
  text: '(defn foo\n    [a b]\n    # comment 1\n    bar)\n    # comment 2',
  options: {
    commentChars: ['#'],
    changes: [
      {
        lineNo: 0,
        x: 0,
        oldText: '  ',
        newText: ''
      }
    ]
  },
  result: {
    text: '(defn foo\n  [a b]\n  # comment 1\n  bar)\n  # comment 2',
    success: true
  },
  source: {
    lineNo: 4200,
    in: [
      '  (defn foo\n--\n    [a b]\n    # comment 1\n    bar)\n    # comment 2'
    ],
    out: '(defn foo\n  [a b]\n  # comment 1\n  bar)\n  # comment 2'
  }
}

const smartModeParenCharTest3210 = {
  id: 3210,
  text: '(let ((}{ 2)\n      (]]] 5))\n  (- }{ ]]]))',
  options: { openParenChars: '(', closeParenChars: ')' },
  result: {
    text: '(let ((}{ 2)\n      (]]] 5))\n  (- }{ ]]]))',
    success: true
  },
  source: {
    lineNo: 9200,
    in: [
      '(let ((}{ 2)\n      (]]] 5))\n  (- }{ ]]]))'
    ],
    out: '(let ((}{ 2)\n      (]]] 5))\n  (- }{ ]]]))'
  }
}

smartCases.push(smartModeCommentTest3200)
smartCases.push(smartModeCommentTest3205)
smartCases.push(smartModeParenCharTest3210)

// -----------------------------------------------------------------------------
// STRUCTURE TEST
// Diff the relevant result properties.

function assertStructure (actual, expected) {
  assert.strictEqual(actual.text, expected.text)
  assert.strictEqual(actual.success, expected.success)
  assert.strictEqual(actual.cursorX, expected.cursorX)
  assert.strictEqual(actual.cursorLine, expected.cursorLine)

  assert.strictEqual(actual.error == null, expected.error == null)
  if (actual.error) {
    // NOTE: we currently do not test 'message' and 'extra'
    assert.strictEqual(actual.error.name, expected.error.name)
    assert.strictEqual(actual.error.lineNo, expected.error.lineNo)
    assert.strictEqual(actual.error.x, expected.error.x)
  }

  if (expected.tabStops) {
    assert.strictEqual(actual.tabStops == null, false)

    const expectedTSLen = expected.tabStops.length
    const actualTSLen = actual.tabStops.length
    assert.strictEqual(expectedTSLen, actualTSLen)

    let i = 0
    while (i < expectedTSLen) {
      const actualTS = actual.tabStops[i]
      const expectedTS = expected.tabStops[i]

      assert.strictEqual(actualTS.lineNo, expectedTS.lineNo)
      assert.strictEqual(actualTS.x, expectedTS.x)
      assert.strictEqual(actualTS.ch, expectedTS.ch)
      assert.strictEqual(actualTS.argX, expectedTS.argX)

      i = i + 1
    }
  }

  if (expected.parenTrails) {
    assert.deepStrictEqual(actual.parenTrails, expected.parenTrails)
  }
}

function testStructure (testCase, mode) {
  const expected = testCase.result
  const text = testCase.text
  const options = testCase.options
  let result1, result2, result3

  // We are not yet verifying that the returned paren tree is correct.
  // We are simply setting it to ensure it is constructed in a way that doesn't
  // throw an exception.
  options.returnParens = true

  it('should generate the correct result structure', function () {
    result1 = null
    if (mode === 'indent') {
      result1 = parinfer.indentMode(text, options)
    } else if (mode === 'paren') {
      result1 = parinfer.parenMode(text, options)
    } else if (mode === 'smart') {
      result1 = parinfer.smartMode(text, options)
    }
    assert(result1 !== null)

    assertStructure(result1, expected)

    // FIXME: not checking paren trails after this main check
    // (causing problems, and not a priority at time of writing)
    if (result1.parenTrails) {
      delete result1.parenTrails
    }
  })

  if (expected.error ||
      expected.tabStops ||
      expected.parenTrails ||
      testCase.options.changes) {
    return
  }

  it('should generate the same result structure on idempotence check', function () {
    const options2 = {
      cursorX: result1.cursorX,
      cursorLine: result1.cursorLine
    }
    if (testCase.options && testCase.options.commentChars) {
      options2.commentChars = testCase.options.commentChars
    }
    if (testCase?.options?.openParenChars) {
      options2.openParenChars = testCase.options.openParenChars
    }
    if (testCase?.options?.closeParenChars) {
      options2.closeParenChars = testCase.options.closeParenChars
    }

    result2 = null
    if (mode === 'indent') {
      result2 = parinfer.indentMode(result1.text, options2)
    } else if (mode === 'paren') {
      result2 = parinfer.parenMode(result1.text, options2)
    } else if (mode === 'smart') {
      result2 = parinfer.smartMode(result1.text, options2)
    }
    assert(result2 !== null)

    assertStructure(result2, result1)
  })

  it('should generate the same result structure on cross-mode check', function () {
    const hasCursor = isInteger(expected.cursorX)
    const options3 = {}
    if (testCase.options && testCase.options.commentChars) {
      options3.commentChars = testCase.options.commentChars
    }
    if (testCase?.options?.openParenChars) {
      options3.openParenChars = testCase.options.openParenChars
    }
    if (testCase?.options?.closeParenChars) {
      options3.closeParenChars = testCase.options.closeParenChars
    }

    if (!hasCursor) {
      result3 = null
      if (mode === 'indent') {
        result3 = parinfer.indentMode(result1.text, options3)
      } else if (mode === 'paren') {
        result3 = parinfer.parenMode(result1.text, options3)
      } else if (mode === 'smart') {
        result3 = parinfer.smartMode(result1.text, options3)
      }
      assert(result3 !== null)

      assertStructure(result3, result1)
    }
  })
}

// -----------------------------------------------------------------------------
// STRING TESTS
// Diff the annotated text instead of the data for easy reading.
// (requires extra parser/printer code that we may not want to port)

const parinferTest = require('../testParsingLib.js')

function testString (testCase, mode) {
  var expected = testCase.result
  var source = testCase.source

  const prettyOptions = {
    printTabStops: expected.tabStops,
    printParenTrails: expected.parenTrails
  }
  if (testCase.options && testCase.options.commentChars) {
    prettyOptions.commentChars = testCase.options.commentChars
  }
  if (testCase?.options?.openParenChars) {
    prettyOptions.openParenChars = testCase.options.openParenChars
  }
  if (testCase?.options?.closeParenChars) {
    prettyOptions.closeParenChars = testCase.options.closeParenChars
  }

  var pretty, pretty2, pretty3

  it('should generate the correct annotated output', function () {
    switch (mode) {
      case 'indent': pretty = parinferTest.indentMode(source.in, prettyOptions); break
      case 'paren': pretty = parinferTest.parenMode(source.in, prettyOptions); break
      case 'smart': pretty = parinferTest.smartMode(source.in, prettyOptions); break
    }
    assert.strictEqual(pretty, source.out, '\n\nINPUT:\n' + source.in + '\n')
  })

  if (expected.error ||
      expected.tabStops ||
      expected.parenTrails ||
      testCase.options.changes) {
    return
  }

  it('should generate the same annotated output on idempotence check', function () {
    switch (mode) {
      case 'indent': pretty2 = parinferTest.indentMode(pretty, prettyOptions); break
      case 'paren': pretty2 = parinferTest.parenMode(pretty, prettyOptions); break
      case 'smart': pretty2 = parinferTest.smartMode(pretty, prettyOptions); break
    }
    assert.strictEqual(pretty2, pretty)
  })

  it('should generate the same annotated output on cross-mode check', function () {
    const hasCursor = expected.cursorX != null
    if (!hasCursor) {
      switch (mode) {
        case 'indent': pretty3 = parinferTest.parenMode(pretty, prettyOptions); break
        case 'paren': pretty3 = parinferTest.indentMode(pretty, prettyOptions); break
        case 'smart': pretty3 = parinferTest.parenMode(pretty, prettyOptions); break
      }
      assert.strictEqual(pretty3, pretty)
    }
  })
}

function runTest (testCase, mode) {
  describe('Test Case #' + testCase.id, function () {
    testString(testCase, mode)
    testStructure(testCase, mode)
  })
}

// -----------------------------------------------------------------------------
// Test execution order

const allTestCases = indentCases.concat(parenCases, smartCases)
const allTestCasesIds = allTestCases.reduce((acc, itm) => {
  return acc.add(itm.id)
}, new Set())

const cliIdArgs = process.argv.filter(isTestIdArg).map(extractJustId)
const onlyTestTheseIds = cliIdArgs.length === 0 ? allTestCasesIds : new Set(cliIdArgs)

describe('test case ids are unique', function () {
  assert.strictEqual(allTestCases.length, allTestCasesIds.size, 'all test case ids should be unique')
})

describe('Indent Mode', function () {
  for (let i = 0; i < indentCases.length; i++) {
    const testCase = indentCases[i]
    if (onlyTestTheseIds.has(testCase.id)) {
      runTest(testCase, 'indent')
    }
  }
})

describe('Paren Mode', function () {
  for (let i = 0; i < parenCases.length; i++) {
    const testCase = parenCases[i]
    if (onlyTestTheseIds.has(testCase.id)) {
      runTest(testCase, 'paren')
    }
  }
})

describe('Smart Mode', function () {
  for (let i = 0; i < smartCases.length; i++) {
    const testCase = smartCases[i]
    if (onlyTestTheseIds.has(testCase.id)) {
      runTest(testCase, 'smart')
    }
  }
})
