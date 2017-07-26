//
// Parinfer for CodeMirror 1.3.0
//
// Copyright 2017 © Shaun Lebron
// MIT License
//

//------------------------------------------------------------------------------
// JS Module Boilerplate
//------------------------------------------------------------------------------

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  }
  else {
    root.parinferCodeMirror = factory();
  }
}(this, function() { // start module anonymous scope
"use strict";

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

// We attach our Parinfer state to this property on the CodeMirror instance.
var STATE_PROP = '__parinfer__';

var PAREN_MODE = 'paren';
var INDENT_MODE = 'indent';
var SMART_MODE = 'smart';

var MODES = [PAREN_MODE, INDENT_MODE, SMART_MODE];

var CLASSNAME_ERROR = 'parinfer-error';
var CLASSNAME_PARENTRAIL = 'parinfer-paren-trail';

//------------------------------------------------------------------------------
// State
// (`state` represents the parinfer state attached to a single CodeMirror editor)
//------------------------------------------------------------------------------

function initialState(cm, mode, options) {
  return {
    cm: cm,
    mode: mode,
    options: options,
    enabled: false,
    cursorTimeout: null,
    monitorCursor: true,
    prevCursorX: null,
    prevCursorLine: null,
    callbackCursor: null,
    callbackChanges: null,
  };
}

//------------------------------------------------------------------------------
// Errors
//------------------------------------------------------------------------------

function error(msg) {
  return 'parinferCodeMirror: ' + msg;
}

function ensureMode(mode) {
  if (MODES.indexOf(mode) === -1) {
    throw error(
      'Mode "' + mode + '" is invalid. ' +
      'Must be one of: ' + MODES.join(',')
    );
  }
}

function ensureState(cm) {
  var state = cm[STATE_PROP];
  if (!state) {
    throw error(
      'You must call parinferCodeMirror.init(cm) on a CodeMirror instance ' +
      'before you can use the rest of the API.'
    );
  }
  return state;
}

//------------------------------------------------------------------------------
// Data conversion
//------------------------------------------------------------------------------

function convertChanges(changes) {
  return changes.map(function(change) {
    return {
      x: change.from.ch,
      lineNo: change.from.line,
      oldText: change.removed.join('\n'),
      newText: change.text.join('\n')
    };
  });
}

//------------------------------------------------------------------------------
// Markers
//------------------------------------------------------------------------------

function clearMarks(cm, className) {
  var i;
  var marks = cm.getAllMarks();
  for (i=0; i<marks.length; i++) {
    if (marks[i].className === className) {
      marks[i].clear();
    }
  }
}

function clearAllMarks(cm) {
  clearMarks(cm, CLASSNAME_ERROR);
  clearMarks(cm, CLASSNAME_PARENTRAIL);
}

function addMark(cm, lineNo, x0, x1, className) {
  var from = {line: lineNo, ch: x0};
  var to = {line: lineNo, ch: x1};
  cm.markText(from, to, {className: className});
}

function updateErrorMarks(cm, error) {
  clearMarks(cm, CLASSNAME_ERROR);
  if (error) {
    addMark(cm, error.lineNo, error.x, error.x+1, CLASSNAME_ERROR);
    if (error.extra) {
      addMark(cm, error.extra.lineNo, error.extra.x, error.extra.x+1, CLASSNAME_ERROR);
    }
  }
}

function updateParenTrailMarks(cm, parenTrails) {
  clearMarks(cm, CLASSNAME_PARENTRAIL);
  if (parenTrails) {
    var i, trail;
    for (i=0; i<parenTrails.length; i++) {
      trail = parenTrails[i];
      addMark(cm, trail.lineNo, trail.startX, trail.endX, CLASSNAME_PARENTRAIL);
    }
  }
}

//------------------------------------------------------------------------------
// Tab Stops
//------------------------------------------------------------------------------

function getSelectionStartLine(cm) {
  var selection = cm.listSelections()[0];
  // head and anchor are reversed sometimes
  return Math.min(selection.head.line, selection.anchor.line);
}

function expandTabStops(tabStops) {
  if (!tabStops) {
    return null;
  }
  var xs = [];
  var i, stop, prevX=-1;
  for (i=0; i<tabStops.length; i++) {
    stop = tabStops[i];
    if (prevX >= stop.x) {
      xs.pop();
    }
    xs.push(stop.x);
    xs.push(stop.x + (stop.ch === '(' ? 2 : 1));
    if (stop.argX != null) {
      xs.push(stop.argX);
    }
  }
  return xs;
}

function nextStop(stops, x, dx) {
  if (!stops) {
    return null;
  }
  var i, stop, right, left;
  for (i=0; i<stops.length; i++) {
    stop = stops[i];
    if (x < stop) { right = stop; break; }
    if (x > stop) { left = stop; }
  }
  if (dx === -1) { return left; }
  if (dx === 1) { return right; }
}

function getIndent(cm, lineNo) {
  var line = cm.getLine(lineNo);
  var i;
  for (i=0; i<line.length; i++) {
    if (line[i] !== ' ') {
      return i;
    }
  }
  return null;
}

function onTab(cm, dx) {
  var hasSelection = cm.somethingSelected();
  var state = ensureState(cm);
  var stops = expandTabStops(state.tabStops);

  var x, nextX, lineNo;

  if (hasSelection) {
    // Indent whole Selection
    lineNo = getSelectionStartLine(cm);
    x = getIndent(cm, lineNo);
    nextX = nextStop(stops, x, dx);
    if (nextX == null) {
      nextX = Math.max(0, x + dx*2);
    }
    cm.indentSelection(nextX-x);
  }
  else {
    // Indent single line at cursor
    var cursor = cm.getCursor();
    lineNo = cursor.line;
    x = cursor.ch;
    if (x === getIndent(cm, cursor.line)) {
      nextX = nextStop(stops, x, dx);
    }
    if (nextX == null) {
      nextX = Math.max(0, x + dx*2);
    }
    cm.indentLine(lineNo, nextX-x);
  }
}

//------------------------------------------------------------------------------
// Text Correction
//------------------------------------------------------------------------------

// If `changes` is missing, then only the cursor position has changed.
function fixText(state, changes) {
  // Get editor data
  var cm = state.cm;
  var text = cm.getValue();
  var hasSelection = cm.somethingSelected();
  var selections = cm.listSelections();
  var cursor = cm.getCursor();
  var scroller = cm.getScrollerElement();

  // Create options
  var options = {
    cursorLine: cursor.line,
    cursorX: cursor.ch,
    prevCursorLine: state.prevCursorLine,
    prevCursorX: state.prevCursorX
  };
  if (hasSelection) {
    options.selectionStartLine = getSelectionStartLine(cm);
  }
  if (state.options) {
    var p;
    for (p in state.options) {
      if (state.options.hasOwnProperty(p)) {
        options[p] = state.options[p];
      }
    }
  }
  if (changes) {
    options.changes = convertChanges(changes);
  }

  // Run Parinfer
  var result;
  var mode = state.fixMode ? PAREN_MODE : state.mode;
  switch (mode) {
    case INDENT_MODE: result = parinfer.indentMode(text, options); break;
    case PAREN_MODE:  result = parinfer.parenMode(text, options); break;
    case SMART_MODE:  result = parinfer.smartMode(text, options); break;
    default: ensureMode(mode);
  }

  // Remember tab stops for smart tabbing.
  state.tabStops = result.tabStops;

  if (text !== result.text) {
    // Backup history
    var hist = cm.getHistory();

    // Update text
    cm.setValue(result.text);

    // Update cursor and selection
    state.monitorCursor = false;
    if (hasSelection) {
      cm.setSelections(selections);
    } else {
      cm.setCursor(result.cursorLine, result.cursorX);
    }

    // Restore history to avoid pushing our edits to the history stack.
    cm.setHistory(hist);

    setTimeout(function(){ state.monitorCursor = true; }, 0);

    // Update scroll position
    cm.scrollTo(scroller.scrollLeft, scroller.scrollTop);
  }

  // Clear or add new marks
  updateErrorMarks(cm, result.error);
  updateParenTrailMarks(cm, result.parenTrails);

  // Remember the cursor position for next time
  state.prevCursorLine = result.cursorLine;
  state.prevCursorX = result.cursorX;

  // Re-run with original mode if code was finally fixed in Paren Mode.
  if (state.fixMode && result.success) {
    state.fixMode = false;
    return fixText(state, changes);
  }

  return result.success;
}

//------------------------------------------------------------------------------
// CodeMirror Integration
//------------------------------------------------------------------------------

function onCursorChange(state) {
  clearTimeout(state.cursorTimeout);
  if (state.monitorCursor) {
    state.cursorTimeout = setTimeout(function () { fixText(state); }, 0);
  }
}

function onTextChanges(state, changes) {
  clearTimeout(state.cursorTimeout);
  var origin = changes[0].origin;
  if (origin !== 'setValue') {
    fixText(state, changes);
  }
}

function on(state) {
  if (state.enabled) {
    return;
  }
  state.callbackCursor = function(cm) {
    onCursorChange(state);
  };
  state.callbackChanges = function(cm, changes) {
    onTextChanges(state, changes);
  };
  var cm = state.cm;
  cm.on('cursorActivity', state.callbackCursor);
  cm.on('changes', state.callbackChanges);
  state.origExtraKeys = cm.getOption('extraKeys');
  cm.setOption('extraKeys', {
    Tab: function(cm) { onTab(cm, 1); },
    'Shift-Tab': function(cm) { onTab(cm, -1); }
  });
  state.enabled = true;
}

function off(state) {
  if (!state.enabled) {
    return;
  }
  var cm = state.cm;
  clearAllMarks(cm);
  cm.off('cursorActivity', state.callbackCursor);
  cm.off('changes', state.callbackChanges);
  cm.setOption('extraKeys', state.origExtraKeys);
  state.enabled = false;
}

//------------------------------------------------------------------------------
// Public API
//------------------------------------------------------------------------------

function init(cm, mode, options) {
  var state = cm[STATE_PROP];
  if (state) {
    throw error('init has already been called on this CodeMirror instance');
  }

  mode = mode || SMART_MODE;
  ensureMode(mode);

  state = initialState(cm, mode, options);
  cm[STATE_PROP] = state;
  return enable(cm);
}

function enable(cm) {
  var state = ensureState(cm);

  // preprocess text to keep Parinfer from changing code structure
  if (state.mode !== PAREN_MODE) {
    state.fixMode = true;
  }

  on(state);
  return fixText(state);
}

function disable(cm) {
  var state = ensureState(cm);
  off(state);
}

function setMode(cm, mode) {
  var state = ensureState(cm);
  ensureMode(mode);
  state.mode = mode;
  return fixText(state);
}

function setOptions(cm, options) {
  var state = ensureState(cm);
  state.options = options;
  return fixText(state);
}

var API = {
  version: "1.3.0",
  init: init,
  enable: enable,
  disable: disable,
  setMode: setMode,
  setOptions: setOptions
};

return API;

})); // end module anonymous scope
