# Parinfer

_parentheses inference for Lisp_

<img src="http://zippy.gfycat.com/WeirdOddBluefintuna.gif" width="400">

---

<em>See the __[Parinfer Home Page]__ for a complete exploration.</em>

__Parinfer__ is a proof-of-concept editor mode for Lisp programming languages.
It simplifies the way we write Lisp by auto-adjusting parens when indentation
changes and vice versa.  The hope is to make basic Lisp-editing easier for
newcomers and experts alike, while still allowing existing plugins like Paredit
to satisfy the need for more advanced operations.

[Paredit]:http://danmidwood.com/content/2014/11/21/animated-paredit.html
[Parinfer Home Page]:http://shaunlebron.github.io/parinfer/

This project is split into two parts:

- __[Parinfer Lib](lib)__ - the _editor-agnostic_ library
- __[Parinfer Site](site)__ - the code for the website

## How to Use It!

Though Parinfer is still in early development, several contributors have
started working on plugins for major editors.  Currently, most of them spin up
an instance of Node to leverage a single, canonical implementation via RPC.
This allows core bug fixes to reach all editor plugins until the core is
stabilized and ready for proper porting.

__Works in Progress__:

- [atom-parinfer] for [Atom]
- [nvim-parinfer.js] for [Neovim]
- [vim-parinfer] for [Vim]
- [vscode-parinfer] for [Visual Studio Code]
- [sublime-text-parinfer] for [Sublime Text]
- [parinfer-mode] or [elisp-parinfer] for [Emacs]
- [codemirror-parinfer] for [CodeMirror]

Parinfer will soon be available for some REPL environments as well:

- [Replete] for iOS
- [cljs-devtools] for Google Chrome

<em>__[Let me know]__ if you're working on a plugin, or check the [lib readme] for extra guidance.  Thanks!</em>

[Let me know]:https://github.com/shaunlebron/parinfer/issues/new?title=new%20plugin
[lib readme]:lib

[atom-parinfer]:https://github.com/oakmac/atom-parinfer
[Atom]:https://atom.io/
[nvim-parinfer.js]:https://github.com/snoe/nvim-parinfer.js
[Neovim]:https://neovim.io/
[vscode-parinfer]:https://github.com/Microsoft/vscode-parinfer
[Visual Studio Code]:https://code.visualstudio.com/
[sublime-text-parinfer]:https://github.com/oakmac/sublime-text-parinfer
[Sublime Text]:http://www.sublimetext.com/
[parinfer-mode]:https://github.com/edpaget/parinfer-mode
[Emacs]:https://www.gnu.org/software/emacs/
[vim-parinfer]:https://github.com/bhurlow/vim-parinfer
[Vim]:http://www.vim.org/
[elisp-parinfer]:https://github.com/dongcarl/parinfer
[codemirror-parinfer]:https://github.com/hiram-madelaine/codemirror-parinfer
[CodeMirror]:https://codemirror.net/

[Replete]:https://github.com/mfikes/replete
[cljs-devtools]:https://github.com/binaryage/cljs-devtools

---

[MIT License](LICENSE.md)
