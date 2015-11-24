
/**
 * @constructor
 */
var CodeMirrorObj = function() {

};


/**
 * Calculates and returns a {line, ch} object for a zero-based index who's value is relative to the start 
 * of the editor's text. If the index is out of range of the text then thereturned object is clipped to 
 * start or end of the text respectively.
 */ 
CodeMirrorObj.prototype.posFromIndex = function(off){};

/**
 * The reverse of posFromIndex.
 */
CodeMirrorObj.prototype.indexFromPos = function(coords){};

/**
 * Get the current editor content.
 * @return {string}
 */
CodeMirrorObj.prototype.getValue = function(){};
/**
 * Set the editor content.
 * @param {string} value
 */
CodeMirrorObj.prototype.setValue = function(value){};
/**
 * Register an event handler.
 * @param {string} event
 * @param {function()} handler
 */
CodeMirrorObj.prototype.on = function (event, handler) {};
/**
 * Deregister an event handler.
 * @param {string} event
 * @param {function()} handler
 */
CodeMirrorObj.prototype.off = function (event, handler) {};
/**
 * Get the currently selected code.
 * @return {string}
 */
CodeMirrorObj.prototype.getSelection = function(){};
/**
 * Replace the selection with the given string.
 * @param {string} str
 */
CodeMirrorObj.prototype.replaceString = function(str){};
/**
 * Give the editor focus.
 */
CodeMirrorObj.prototype.focus = function(){};
/**
 * Change the configuration of the editor. <code>option</code> should the name of an option, and <code>value</code>
 * should be a valid value for that option.
 * @param {string} option
 * @param {*} value
 */
CodeMirrorObj.prototype.setOption = function(option, value){};
/**
 * Retrieves the current value of the given option for this editor instance.
 * @param {string} option
 */
CodeMirrorObj.prototype.getOption = function(option){};
/**
 * Returns an <code>{x, y, yBot}</code> object containing the coordinates of the cursor relative to the top-left corner
 * of the page. <code>yBot</code> is the coordinate of the bottom of the cursor. <code>start</code> is a boolean
 * indicating whether you want the start or the end of the selection.
 * @param {boolean} start
 * @return {{x:number, y:number, yBot:number}}
 */
CodeMirrorObj.prototype.cursorCoords = function(start){};
/**
 * Like <code>cursorCoords</code>, but returns the position of an arbitrary characters. pos should be a
 * <code>{line, ch}</code> object.
 * @param {{line:number, ch:number}} pos
 * @return {{x:number, y:number, yBot:number}}
 */
CodeMirrorObj.prototype.charCoords = function(pos){};
/**
 * Given an <code>{x, y}</code> object (in page coordinates), returns the <code>{line, ch}</code> position that
 * corresponds to it.
 * @param {{x:number, y:number}} obj
 * @return {{line:number, ch:number}}
 */
CodeMirrorObj.prototype.coordsChar = function(obj){};
/**
 * Undo one edit (if any undo events are stored).
 */
CodeMirrorObj.prototype.undo = function(){};
/**
 * Redo one undone edit.
 */
CodeMirrorObj.prototype.redo = function(){};
/**
 * Returns an object with <code>{undo, redo}</code> properties, both of which hold integers, indicating the amount of
 * stored undo and redo operations.
 * @return {{undo:number, redo:number}}
 */
CodeMirrorObj.prototype.historySize = function(){};
/**
 * Reset the given line's indentation to the indentation prescribed by the mode. If the second argument is given,
 * indentation will be increased (if <code>dir</code> is true) or decreased (if false) by an indent unit instead.
 * @param {number} line
 * @param {boolean} dir
 */
CodeMirrorObj.prototype.indentLine = function(line, dir){};
/**
 * Used to implement search/replace functionality. <code>query</code> can be a regular expression or a string (only
 * strings will match across lines—if they contain newlines). <code>start</code> provides the starting position of the
 * search. It can be a <code>{line, ch}</code> object, or can be left off to default to the start of the document.
 * <code>caseFold</code> is only relevant when matching a string. It will cause the search to be case-insensitive.
 * @param {(RegExp|string)} query
 * @param {number} start
 * @param {boolean} caseFold
 * @return {CodeMirrorCursor}
 */
CodeMirrorObj.prototype.getSearchCursor = function(query, start, caseFold){};
/**
 * Retrieves information about the token the current mode found at the given position (a <code>{line, ch}</code>
 * object). The returned object has the following properties:
 * <code>start</code> - The character (on the given line) at which the token starts.
 * <code>end</code> - The character at which the token ends.
 * <code>string</code> - The token's string.
 * <code>className</code> - The class the mode assigned to the token. (Can be null when no class was assigned.)
 * <code>state</code> - The mode's state at the end of this token.
 * @param {{line:number, ch:number}} pos
 * @return {{start:number, end:number, string:string, className:?string, state:string}}
 */
CodeMirrorObj.prototype.getTokenAt = function(pos){};
/**
 * Can be used to mark a range of text with a specific CSS class name. <code>from</code> and <code>to</code> should be
 * <code>{line, ch}</code> objects. The method will return a function that can be called to remove the marking.
 * @param {{line:number, ch:number}} from
 * @param {{line:number, ch:number}} to
 * @param {string} className
 * @return {function()}
 */
CodeMirrorObj.prototype.markText = function(from, to, className){};
/**
 * Add a gutter marker for the given line. Gutter markers are shown in the line-number area (instead of the number for
 * this line). Both <code>text</code> and <code>className</code> are optional. Setting <code>text</code> to a Unicode
 * character like ● tends to give a nice effect. To put a picture in the gutter, set <code>text</code> to a space and
 * <code>className</code> to something that sets a background image. If you specify <code>text</code>, the given text
 * (which may contain HTML) will, by default, replace the line number for that line. If this is not what you want, you
 * can include the string <code>%N%</code> in the text, which will be replaced by the line number.
 * @param {(number|CodeMirrorLineHandle)} line
 * @param {string=} opt_text
 * @param {string=} opt_className
 * @return {CodeMirrorLineHandle}
 */
CodeMirrorObj.prototype.setMarker = function(line, opt_text, opt_className){};
/**
 * Clears a marker created with <code>setMarker</code>. <code>line</code> can be either a number or a handle returned
 * by <code>setMarker</code> (since a number may now refer to a different line if something was added or deleted).
 * @param {(number|CodeMirrorLineHandle)} line
 */
CodeMirrorObj.prototype.clearMarker = function(line){};
/**
 * Set a CSS class name for the given line. <code>line</code> can be a number or a line handle (as returned by
 * <code>setMarker</code> or this function). Pass <code>null</code> to clear the class for a line.
 * @param {(null|number|CodeMirrorLineHandle)} line
 * @param {string} className
 * @return {CodeMirrorLineHandle}
 */
CodeMirrorObj.prototype.setLineClass = function(line, className){};
/**
 * Returns the line number, text content, and marker status of the given line, which can be either a number or a handle
 * returned by <code>setMarker</code>. The returned object has the structure
 * <code>{line, text, markerText, markerClass}</code>.
 * @param {(number|CodeMirrorLineHandle)} line
 * @return {{line:number, text:string, markerText:string, markerClass:string}}
 */
CodeMirrorObj.prototype.lineInfo = function(line){};
/**
 * Puts <code>node</code>, which should be an absolutely positioned DOM node, into the editor, positioned right below
 * the given <code>{line, ch}</code> position. When <code>scrollIntoView</code> is true, the editor will ensure that
 * the entire node is visible (if possible). To remove the widget again, simply use DOM methods (move it somewhere else,
 * or call <code>removeChild</code> on its parent).
 * @param {{line:number, ch:number}} pos
 * @param {Element} node
 * @param {boolean} scrollIntoView
 */
CodeMirrorObj.prototype.addWidget = function(pos, node, scrollIntoView){};
/**
 * Force matching-bracket-highlighting to happen.
 */
CodeMirrorObj.prototype.matchBrackets = function(){};
/**
 * Get the number of lines in the editor.
 * @return {number}
 */
CodeMirrorObj.prototype.lineCount = function(){};
/**
 * <code>start</code> is a boolean indicating whether the start or the end of the selection must be retrieved. If it is
 * not given, the current cursor pos, i.e. the side of the selection that would move if you pressed an arrow key, is
 * chosen. A <code>{line, ch}</code> object will be returned.
 * @param {boolean} start
 * @return {{line:number, ch:number}}
 */
CodeMirrorObj.prototype.getCursor = function(start){};
/**
 * Return true if any text is selected.
 * @return {boolean}
 */
CodeMirrorObj.prototype.somethingSelected = function(){};
/**
 * Set the cursor position. You can either pass a single <code>{line, ch}</code> object, or the line and the character
 * as two separate parameters.
 * @param {({line:number, ch:number}|number)} pos
 * @param {number} opt_ch
 */
CodeMirrorObj.prototype.setCursor = function(pos, opt_ch){};
/**
 * Set the selection range. <code>start</code> and <code>end</code> should be <code>{line, ch}</code> objects.
 * @param {{line:number, ch:number}} start
 * @param {{line:number, ch:number}} end
 */
CodeMirrorObj.prototype.setSelection = function(start, end){};
/**
 * Get the content of line <code>n</code>.
 * @param {number} n
 */
CodeMirrorObj.prototype.getLine = function(n){};
/**
 * Set the content of line <code>n</code>.
 * @param {number} n
 * @param {string} text
 */
CodeMirrorObj.prototype.setLine = function(n, text){};
/**
 * Remove the given line from the document.
 * @param {number} n
 */
CodeMirrorObj.prototype.removeLine = function(n){};
/**
 * Get the text between the given points in the editor, which should be <code>{line, ch}</code> objects.
 * @param {{line:number, ch:number}} from
 * @param {{line:number, ch:number}} to
 */
CodeMirrorObj.prototype.getRange = function(from, to){};
/**
 * Replace the part of the document between <code>from</code> and <code>to</code> with the given string.
 * <code>from</code> and <code>to</code> must be <code>{line, ch}</code> objects. to can be left off to simply
 * insert the string at position from.
 * @param {string} str
 * @param {{line:number, ch:number}} from
 * @param {{line:number, ch:number}} to
 */
CodeMirrorObj.prototype.replaceRange = function(str, from, to){};
/**
 * Calculates and returns a <code>{line, ch}</code> object for a zero-based <code>index</code> who's value is relative
 * to the start of the editor's text. If the <code>index</code> is out of range of the text then the returned object is
 * clipped to start or end of the text respectively.
 * @param {number} index
 * @return {{line:number, ch:number}}
 */
CodeMirrorObj.prototype.coordsFromIndex = function(index){};
/**
 * CodeMirror internally buffers changes and only updates its DOM structure after it has finished performing some
 * operation. If you need to perform a lot of operations on a CodeMirror instance, you can call this method with a
 * function argument. It will call the function, buffering up all changes, and only doing the expensive update after
 * the function returns. This can be a lot faster. The return value from this method will be the return value of your
 * function.
 * @param {function()} func
 * @return {*}
 */
CodeMirrorObj.prototype.operation = function(func){};
/**
 * If your code does something to change the size of the editor element (window resizes are already listened for), or
 * unhides it, you should probably follow up by calling this method to ensure CodeMirror is still looking as intended.
 */
CodeMirrorObj.prototype.refresh = function(){};
/**
 * Returns the hiden textarea used to read input.
 * @return {HTMLTextAreaElement}
 */
CodeMirrorObj.prototype.getInputField = function(){};
/**
 * Returns the DOM node that represents the editor. Remove this from your tree to delete an editor instance.
 * @return {Element}
 */
CodeMirrorObj.prototype.getWrapperElement = function(){};
/**
 * Returns the DOM node that is responsible for the sizing and the scrolling of the editor. You can change the
 * <code>height</code> and <code>width</code> styles of this element to <code>resize</code> an editor.
 * (You might have to call the refresh method afterwards.)
 * @return {Element}
 */
CodeMirrorObj.prototype.getScrollerElement = function(){};
/**
 * Fetches the DOM node that represents the editor gutter.
 * @return {Element}
 */
CodeMirrorObj.prototype.getGutterElement = function(){};
/**
 * Returns the mode's parser state, if any, at the end of the given line number. If no line number is given, the state
 * at the end of the document is returned. This can be useful for storing parsing errors in the state, or getting other
 * kinds of contextual information for a line.
 * @param {number=} opt_line
 * @return {string}
 */
CodeMirrorObj.prototype.getStateAfter = function(opt_line){};

/**
 * @constructor
 * @extends CodeMirrorObj
 */
var CodeMirrorFromTextAreaObj = function(){};
/**
 * Copy the content of the editor into the textarea.
 */
CodeMirrorFromTextAreaObj.prototype.save = function(){};
/**
 * Remove the editor, and restore the original textarea (with the editor's current content).
 */
CodeMirrorFromTextAreaObj.prototype.toTextArea = function(){};

/**
 * @constructor
 */
var CodeMirrorLineHandle = function(){};

/**
 * @constructor
 */
var CodeMirrorCursor = function(){};
/**
 * Search forward from the current position. The return value indicates whether a match was found. If matching a regular
 * expression, the return value will be the array returned by the <code>match</code> method, in case you want to extract
 * matched groups.
 * @return {boolean}
 */
CodeMirrorCursor.prototype.findNext = function(){};
/**
 * Search backward from the current position. The return value indicates whether a match was found. If matching a regular
 * expression, the return value will be the array returned by the <code>match</code> method, in case you want to extract
 * matched groups.
 * @return {boolean}
 */
CodeMirrorCursor.prototype.findPrevious = function(){};
/**
 * Is only valid when the last call to <code>findNext</code> or <code>findPrevious</code> did not return false. It will
 * return <code>{line, ch}</code> object pointing at the start of the match.
 * @return {{line:number, ch:number}}
 */
CodeMirrorCursor.prototype.from = function(){};
/**
 * Is only valid when the last call to <code>findNext</code> or <code>findPrevious</code> did not return false. It will
 * return <code>{line, ch}</code> object pointing at the end of the match.
 * @return {{line:number, ch:number}}
 */
CodeMirrorCursor.prototype.to = function(){};
/**
 * Replaces the currently found match with the given text and adjusts the cursor position to reflect the replacement.
 * @param {string} text
 */
CodeMirrorCursor.prototype.replace = function(text){};



/**
 * @param {(Element|function(Element))} element
 * @param {Object} opt_options
 * @return {CodeMirrorObj}
 */
var CodeMirror = function(element, opt_options) {};

/**
 * @param {HTMLTextAreaElement} textAreaElement
 * @return {CodeMirrorFromTextAreaObj}
 */
CodeMirror.fromTextArea = function(textAreaElement) {};
/**
 * @param {string} name
 * @param {*} value
 */
CodeMirror.defineExtension = function(name, value){};


CodeMirrorObj.prototype.indentSelection = function(){};
CodeMirrorObj.prototype.replaceSelection = function(){};
CodeMirrorObj.prototype.listSelections = function(){};
CodeMirrorObj.prototype.setSelections = function(){};
CodeMirrorObj.prototype.getAllMarks = function(){};
