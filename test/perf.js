const fs = require('fs')
const path = require('path')
const parinfer = require('../parinfer.js')

function timeProcess (filename, text, options) {
  var numChars = text.length
  var lines = text.split('\n')
  console.log('Processing', filename, ':', lines.length, 'lines,', numChars, 'chars')

  console.time('indent')
  parinfer.indentMode(text, options)
  console.timeEnd('indent')

  console.time('paren')
  parinfer.parenMode(text, options)
  console.timeEnd('paren')

  console.time('smart')
  parinfer.smartMode(text, options)
  console.timeEnd('smart')

  console.log()
}

const perfDir = path.resolve(__dirname, 'perf')
const files = fs.readdirSync(perfDir)

for (let i = 0; i < files.length; i++) {
  const filename = files[i]
  const fullpath = path.resolve(perfDir, filename)
  const text = fs.readFileSync(fullpath, 'utf8')
  timeProcess(filename, text, {})
}
