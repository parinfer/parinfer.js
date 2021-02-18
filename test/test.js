/* global describe, it */

const parinfer = require('../parinfer.js')
const assert = require('assert')

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

indentCases.push(indentModeCommentTest1400)
indentCases.push(indentModeCommentTest1405)
indentCases.push(indentModeCommentTest1410)
indentCases.push(indentModeCommentTest1415)

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

parenCases.push(parenModeCommentTest2300)
parenCases.push(parenModeCommentTest2305)
parenCases.push(parenModeCommentTest2310)

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

smartCases.push(smartModeCommentTest3200)
smartCases.push(smartModeCommentTest3205)

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
    var i
    for (i = 0; i < actual.tabStops.length; i++) {
      assert.strictEqual(actual.tabStops[i].lineNo, expected.tabStops[i].lineNo)
      assert.strictEqual(actual.tabStops[i].x, expected.tabStops[i].x)
      assert.strictEqual(actual.tabStops[i].ch, expected.tabStops[i].ch)
      assert.strictEqual(actual.tabStops[i].argX, expected.tabStops[i].argX)
    }
  }

  if (expected.parenTrails) {
    assert.deepStrictEqual(actual.parenTrails, expected.parenTrails)
  }
}

function testStructure (testCase, mode) {
  var expected = testCase.result
  var text = testCase.text
  var options = testCase.options
  var actual, actual2, actual3

  // We are not yet verifying that the returned paren tree is correct.
  // We are simply setting it to ensure it is constructed in a way that doesn't
  // throw an exception.
  options.returnParens = true

  it('should generate the correct result structure', function () {
    switch (mode) {
      case 'indent': actual = parinfer.indentMode(text, options); break
      case 'paren': actual = parinfer.parenMode(text, options); break
      case 'smart': actual = parinfer.smartMode(text, options); break
    }
    assertStructure(actual, expected)

    // FIXME: not checking paren trails after this main check
    // (causing problems, and not a priority at time of writing)
    if (actual.parenTrails) {
      delete actual.parenTrails
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
      cursorX: actual.cursorX,
      cursorLine: actual.cursorLine
    }
    if (testCase.options && testCase.options.commentChars) {
      options2.commentChars = testCase.options.commentChars
    }
    switch (mode) {
      case 'indent': actual2 = parinfer.indentMode(actual.text, options2); break
      case 'paren': actual2 = parinfer.parenMode(actual.text, options2); break
      case 'smart': actual2 = parinfer.smartMode(actual.text, options2); break
    }
    assertStructure(actual2, actual)
  })

  it('should generate the same result structure on cross-mode check', function () {
    var hasCursor = expected.cursorX != null
    const options3 = {}
    if (testCase.options && testCase.options.commentChars) {
      options3.commentChars = testCase.options.commentChars
    }
    if (!hasCursor) {
      switch (mode) {
        case 'indent': actual3 = parinfer.parenMode(actual.text, options3); break
        case 'paren': actual3 = parinfer.indentMode(actual.text, options3); break
        case 'smart': actual3 = parinfer.parenMode(actual.text, options3); break
      }
      assertStructure(actual3, actual)
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
