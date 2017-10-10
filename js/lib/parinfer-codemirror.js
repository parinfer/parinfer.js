//
// Parinfer for CodeMirror 1.4.1
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
var CLASSNAME_LOCUS_PAREN = 'parinfer-locus-paren';

var CLASSNAME_LOCUS_LAYER = 'parinfer-locus';

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

function indentSelection(cm, dx, stops) {
  // Indent whole Selection
  var lineNo = getSelectionStartLine(cm);
  var x = getIndent(cm, lineNo);
  var nextX = nextStop(stops, x, dx);
  if (nextX == null) {
    nextX = Math.max(0, x + dx*2);
  }
  cm.indentSelection(nextX-x);
}

function indentLine(cm, lineNo, delta) {
  var text = cm.getDoc().getLine(lineNo);

  // cm.indentLine does not indent empty lines
  if (text.trim() !== '') {
    cm.indentLine(lineNo, delta);
    return;
  }

  if (delta > 0) {
    var spaces = Array(delta + 1).join(" ");
    cm.replaceSelection(spaces);
  }
  else {
    var x = cm.getCursor().ch;
    cm.replaceRange("", {line: lineNo, ch: x+delta}, {line: lineNo, ch: x}, "+indent");
  }
}

function indentAtCursor(cm, dx, stops) {
  // Indent single line at cursor
  var cursor = cm.getCursor();
  var lineNo = cursor.line;
  var x = cursor.ch;
  var indent = getIndent(cm, cursor.line);

  var stop = nextStop(stops, x, dx);
  var useStops = (indent == null || x === indent);
  var nextX = (stop != null && useStops) ? stop : Math.max(0, x+dx*2);

  if (indent != null && indent < x && x < nextX) {
    var spaces = Array(nextX-x + 1).join(" ");
    cm.replaceSelection(spaces);
  }
  else {
    indentLine(cm, lineNo, nextX-x);
  }
}

function onTab(cm, dx) {
  var hasSelection = cm.somethingSelected();
  var state = ensureState(cm);
  var stops = expandTabStops(state.tabStops);

  if (hasSelection) {
    indentSelection(cm, dx, stops);
  }
  else {
    indentAtCursor(cm, dx, stops);
  }
}

//------------------------------------------------------------------------------
// Locus/Guides layer
//------------------------------------------------------------------------------

function getLayerContainer(cm) {
  var wrapper = cm.getWrapperElement();
  var lines = wrapper.querySelector('.CodeMirror-lines');
  var container = lines.parentNode;
  return container;
}

function parenSelected(paren, sel) {
  return sel.contains({line: paren.lineNo, ch: paren.x}) !== -1;
}

function pointRevealsParenTrail(trail, pos) {
  return (
    pos.line === trail.lineNo &&
    trail.startX <= pos.ch /* && cursor.ch <= trail.endX */
  );
}

function hideParen(cm, paren) {
  var sel = cm.getDoc().sel;
  var sel0 = sel.ranges[0];
  var shouldShowCloser = (
    paren.lineNo === paren.closer.lineNo ||
    !paren.closer.trail ||
    pointRevealsParenTrail(paren.closer.trail, sel0.anchor) ||
    pointRevealsParenTrail(paren.closer.trail, sel0.head) ||
    parenSelected(paren.closer, sel)
  );

  if (!shouldShowCloser) {
    addMark(cm, paren.closer.lineNo, paren.closer.x, paren.closer.x+1, CLASSNAME_LOCUS_PAREN);
  }
  hideParens(cm, paren.children);
}

function hideParens(cm, parens) {
  var i;
  for (i=0; i<parens.length; i++) {
    hideParen(cm, parens[i]);
  }
}

function charPos(cm, paren) {
  var p = cm.charCoords({line: paren.lineNo, ch: paren.x}, "local");
  var w = p.right - p.left;
  return {
    midx: p.left + w/2,
    right: p.right,
    left: p.left,
    top: p.top,
    bottom: p.bottom,
  };
}

function getRightBound(cm, startLine, endLine) {
  var doc = cm.getDoc();
  var maxWidth=0;
  var maxLineNo=0;
  var i;
  for (i=startLine; i<=endLine; i++) {
    var line = doc.getLine(i);
    if (line.length > maxWidth) {
      maxWidth = line.length;
      maxLineNo = i;
    }
  }
  var wall = charPos(cm, {lineNo: maxLineNo, x: maxWidth});
  return wall.right;
}

function addBox(cm, paren) {
  var layer = cm[STATE_PROP].layer;
  var paper = layer.paper;
  var charW = layer.charW;
  var charH = layer.charH;

  var open = charPos(cm, paren);
  var close = charPos(cm, paren.closer);

  var r = 4;

  if (paren.closer.trail && paren.lineNo !== paren.closer.lineNo) {
    switch (layer.type) {
      case 'guides':
        paper.path([
          'M', open.midx, open.bottom,
          'V', close.bottom
        ].join(' '));
        break;
      case 'locus':
        var right = getRightBound(cm, paren.lineNo, paren.closer.lineNo);
        paper.path([
          'M', open.midx, open.top+r,
          'A', r, r, 0, 0, 1, open.midx+r, open.top,
          'H', right-r,
          'A', r, r, 0, 0, 1, right, open.top+r,
          'V', close.bottom,
          'H', open.midx,
          'V', open.bottom
        ].join(' '));
        break;
    }
  }

  addBoxes(cm, paren.children);
}

function addBoxes(cm, parens) {
  var i;
  for (i=0; i<parens.length; i++) {
    addBox(cm, parens[i]);
  }
}

function addLayer(cm, type) {
  var layer = cm[STATE_PROP].layer;
  layer.type = type;

  var el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.left = '0';
  el.style.top = '0';
  el.style['z-index'] = 100;
  el.className = CLASSNAME_LOCUS_LAYER;

  layer.el = el;
  layer.container.appendChild(el);

  var pixelW = layer.container.clientWidth;
  var pixelH = layer.container.clientHeight;

  layer.paper = Raphael(el, pixelW, pixelH);
}

function clearLayer(cm) {
  var layer = cm[STATE_PROP].layer;
  if (layer && layer.el) {
    layer.container.removeChild(layer.el);
  }
}

function updateLocusLayer(cm, parens) {
  clearMarks(cm, CLASSNAME_LOCUS_PAREN);
  if (parens) {
    hideParens(cm, parens);
    clearLayer(cm);
    // addLayer(cm, 'locus'); // don't draw boxes, just draw guides
    addLayer(cm, 'guides');
    addBoxes(cm, parens);
  }
}

function updateGuidesLayer(cm, parens) {
  if (parens) {
    clearLayer(cm);
    addLayer(cm, 'guides');
    addBoxes(cm, parens);
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

  var locus = state.options && state.options.locus;
  var guides = state.options && state.options.guides;

  if (locus || guides) {
    delete options.locus;
    delete options.guides;
    options.returnParens = true;
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

  // Remember the paren tree.
  state.parens = result.parens;

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

  if (locus) {
    updateLocusLayer(cm, result.parens);
  } else if (guides) {
    updateGuidesLayer(cm, result.parens);
  }

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
  state.parinferKeys = {
    'Tab': function(cm) { onTab(cm, 1); },
    'Shift-Tab': function(cm) { onTab(cm, -1); }
  };
  cm.addKeyMap(state.parinferKeys);
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
  cm.removeKeyMap(state.parinferKeys);
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

  state.layer = {
    container: getLayerContainer(cm)
  };
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
  version: "1.4.1",
  init: init,
  enable: enable,
  disable: disable,
  setMode: setMode,
  setOptions: setOptions
};

return API;

})); // end module anonymous scope
