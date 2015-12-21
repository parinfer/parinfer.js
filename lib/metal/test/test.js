Parinfer.test = (function(){
  var cases = [
    {"in":
     {"fileLineNo":7,
      "lines":["(defn foo", "  [arg", "  ret"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":13,
      "lines":["(defn foo", "  [arg]", "  ret)"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":21,
      "lines":["(defn foo", "  [arg", "   ret"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":27,
      "lines":["(defn foo", "  [arg", "   ret])"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":35,
      "lines":["(defn foo", "[arg", "   ret"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":41,
      "lines":["(defn foo)", "[arg", "   ret]"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":49,
      "lines":["(defn foo", "[arg", "ret"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":55,
      "lines":["(defn foo)", "[arg]", "ret"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":63,
      "lines":
      ["(defn foo", "  [arg", "  ret", "", "(defn foo", "  [arg",
       "  ret"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":73,
      "lines":
      ["(defn foo", "  [arg]", "  ret)", "", "(defn foo", "  [arg]",
       "  ret)"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":87,
      "lines":["(def foo [a b]]"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":91,
      "lines":["(def foo [a b])"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":97,
      "lines":["(let [x {:foo 1 :bar 2]", "  x)"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":102,
      "lines":["(let [x {:foo 1 :bar 2}]", "  x)"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":111,
      "lines":["(def foo \"as"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":115,
      "lines":["(def foo \"as"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":121,
      "lines":["(defn foo [a \"])"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":125,
      "lines":["(defn foo [a \"])"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":131,
      "lines":
      ["(defn foo", "  \"This is docstring.", "  Line 2 here.\"",
       "  ret"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":138,
      "lines":
      ["(defn foo", "  \"This is docstring.", "  Line 2 here.\"",
       "  ret)"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":147,
      "lines":["(let [a \"Hello", "World\"", "      b 2", "  ret"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":154,
      "lines":["(let [a \"Hello", "World\"", "      b 2]", "  ret)"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":163,
      "lines":["(let [a \"])\"", "      b 2"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":168,
      "lines":["(let [a \"])\"", "      b 2])"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":175,
      "lines":["(def foo \"\\\"\""],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":179,
      "lines":["(def foo \"\\\"\")"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":190,
      "lines":["\"\"]\""],
      "cursor":{"cursor-x":1, "cursor-line":0},
      "diff":null},
     "out":
     {"fileLineNo":194,
      "lines":["\"\"]\""],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":200,
      "lines":["(def foo", "  \"", "  \"(a b)", "      c\")"],
      "cursor":{"cursor-x":3, "cursor-line":1},
      "diff":null},
     "out":
     {"fileLineNo":207,
      "lines":["(def foo", "  \"", "  \"(a b)", "      c\")"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":218,
      "lines":["(defn foo [a b", "  \\[", "  ret"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":224,
      "lines":["(defn foo [a b]", "  \\[", "  ret)"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":233,
      "lines":["(def foo \\;"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":237,
      "lines":["(def foo \\;)"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":243,
      "lines":["(def foo \\,", "(def bar \\ "],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":248,
      "lines":["(def foo \\,)", "(def bar \\ )"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":258,
      "lines":["(def foo ;)"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":262,
      "lines":["(def foo) ;)"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":269,
      "lines":
      ["(let [a 1", "      b 2", "      c {:foo 1",
       "         ;; :bar 2}]", "  ret)"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":277,
      "lines":
      ["(let [a 1", "      b 2", "      c {:foo 1}]",
       "         ;; :bar 2}]", "  ret)"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":287,
      "lines":["(let [a 1 ;; a comment", "  ret)"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":292,
      "lines":["(let [a 1] ;; a comment", "  ret)"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":299,
      "lines":["; hello \\n world"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":303,
      "lines":["; hello \\n world"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":316,
      "lines":["(def b )"],
      "cursor":{"cursor-x":7, "cursor-line":0},
      "diff":null},
     "out":
     {"fileLineNo":320,
      "lines":["(def b )"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":327,
      "lines":["(def b )"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":331,
      "lines":["(def b) "],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":337,
      "lines":["(def b [[c d] ])"],
      "cursor":{"cursor-x":14, "cursor-line":0},
      "diff":null},
     "out":
     {"fileLineNo":341,
      "lines":["(def b [[c d] ])"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":347,
      "lines":["(def b [[c d] ])"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":351,
      "lines":["(def b [[c d]])"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":358,
      "lines":["(def b [[c d] ])"],
      "cursor":{"cursor-x":5, "cursor-line":0},
      "diff":null},
     "out":
     {"fileLineNo":362,
      "lines":["(def b [[c d]])"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":372,
      "lines":["(let [a 1])", "  ret)"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":377,
      "lines":["(let [a 1]", "  ret)"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":384,
      "lines":["(let [a 1])", "  ret)"],
      "cursor":{"cursor-x":11, "cursor-line":0},
      "diff":null},
     "out":
     {"fileLineNo":389,
      "lines":["(let [a 1])", "  ret"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":397,
      "lines":["(let [a 1]) 2", "  ret"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":402,
      "lines":["(let [a 1]) 2", "  ret"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":410,
      "lines":["(let [a 1])", "  ret)"],
      "cursor":{"cursor-x":10, "cursor-line":0},
      "diff":null},
     "out":
     {"fileLineNo":415,
      "lines":["(let [a 1]", "  ret)"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":422,
      "lines":["(let [a 1]) ;", "  ret"],
      "cursor":{"cursor-x":13, "cursor-line":0},
      "diff":null},
     "out":
     {"fileLineNo":427,
      "lines":["(let [a 1] ;", "  ret)"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":436,
      "lines":["(let [a 1", "      ])"],
      "cursor":{"cursor-x":6, "cursor-line":1},
      "diff":null},
     "out":
     {"fileLineNo":441,
      "lines":["(let [a 1])", "      "],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":452,
      "lines":["(defn foo", "  [a b]", "  ,(+ a b))"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":458,
      "lines":["(defn foo", "  [a b]", "  ,(+ a b))"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":467,
      "lines":["(defn foo [a b]", "  (+ a b),)"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":472,
      "lines":["(defn foo [a b]", "  (+ a b))"],
      "cursor":null,
      "diff":null}},
    {"in":
     {"fileLineNo":481,
      "lines":["(defn foo [a b]", "  (+ a b) ,1)"],
      "cursor":null,
      "diff":null},
     "out":
     {"fileLineNo":486,
      "lines":["(defn foo [a b]", "  (+ a b) ,1)"],
      "cursor":null,
      "diff":null}}
  ];

  function runTestCase(testCase) {
    var textIn = testCase.in.lines.join("\n");
    var textExpected = testCase.out.lines.join("\n");
    var cursor = testCase.in.cursor;
    var options = cursor;
    var t0 = performance.now();
    var textActual = Parinfer.indentMode.formatText(textIn, options).text;
    var t1 = performance.now();
    console.info('took',t1-t0, 'ms');
    if (textExpected === textActual) {
    }
    else {
      console.error("Test case at line", testCase.in.fileLineNo, "failed");
      console.info("Expected", textExpected);
      console.info("Actual", textActual);
    }
  }

  function runAllTests() {
    for (var i=0; i<cases.length; i++) {
      runTestCase(cases[i]);
    }
  }

  return {
    runAllTests: runAllTests
  };

})();
