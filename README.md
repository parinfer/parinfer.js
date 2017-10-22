<table><tr>
<td>
<a href="https://www.patreon.com/shaunlebron">
<img height="32" src="https://c5.patreon.com/external/logo/downloads_logomark_color_on_coral@2x.png" valign="middle">
</a>
</td>
<td>
<a href="https://www.patreon.com/shaunlebron">
Support Parinfer on Patreon
</a>
</td>
<td>
Help me make Lisp mainstream!
</td>
</tr></table>

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

This project is split into two parts:

- __[Parinfer Lib](https://github.com/shaunlebron/parinfer/tree/master/lib)__ - the _editor-agnostic_ library
- __[Parinfer Site](https://github.com/shaunlebron/parinfer/tree/master/site)__ - the code for the website

## How to Use It!

<em>See the __[Parinfer Demo Editor]__ to try the latest version online.</em>

[Parinfer Demo Editor]:http://shaunlebron.github.io/parinfer/demo

Parinfer is still in early development.  Several people have started
integrating it into code editors at various stages of development.

- [atom-parinfer] for [Atom]
- [nvim-parinfer.js] for [Neovim]
- [vim-parinfer] for [Vim]
- [vscode-parinfer] for [Visual Studio Code]
- [sublime-text-parinfer] for [Sublime Text]
- [parinfer-mode] for [Emacs]
- [Parinfer layer] for [Spacemacs] - _in progress_
- [parinfer-codemirror] for [CodeMirror] - _used on Parinfer's homepage_
- [lt_parinfer] for [Light Table]
- native support in [Nightcode]

Parinfer will soon be available for some REPL environments as well:

- [Replete] for iOS
- [Dirac DevTools] for Google Chrome
- [Reepl] for the browser

<em>__[Let me know]__ if you're working on a plugin, or check the [lib readme] for extra guidance.  Thanks!</em>

[Let me know]:https://github.com/shaunlebron/parinfer/issues/new?title=new%20plugin
[lib readme]:lib

[atom-parinfer]:https://github.com/oakmac/atom-parinfer
[Atom]:https://atom.io/
[nvim-parinfer.js]:https://github.com/snoe/nvim-parinfer.js
[Neovim]:https://neovim.io/
[vscode-parinfer]:https://github.com/narma/vscode-parinfer
[Visual Studio Code]:https://code.visualstudio.com/
[sublime-text-parinfer]:https://github.com/oakmac/sublime-text-parinfer
[Sublime Text]:http://www.sublimetext.com/
[parinfer-mode]:https://github.com/DogLooksGood/parinfer-mode
[Emacs]:https://www.gnu.org/software/emacs/
[vim-parinfer]:https://github.com/bhurlow/vim-parinfer
[Vim]:http://www.vim.org/
[parinfer-codemirror]:https://github.com/shaunlebron/parinfer-codemirror
[CodeMirror]:https://codemirror.net/
[lt_parinfer]:https://github.com/mauricioszabo/lt_parinfer
[Light Table]:http://lighttable.com/
[Nightcode]:https://github.com/oakes/Nightcode
[Parinfer layer]:https://github.com/syl20bnr/spacemacs/issues/5574
[Spacemacs]:http://spacemacs.org/

[Replete]:https://github.com/mfikes/replete
[Dirac DevTools]:https://github.com/binaryage/dirac
[Reepl]:http://jaredforsyth.com/reepl/

[Paredit]:http://danmidwood.com/content/2014/11/21/animated-paredit.html
[Parinfer Home Page]:http://shaunlebron.github.io/parinfer/

---

[MIT License](LICENSE.md)
