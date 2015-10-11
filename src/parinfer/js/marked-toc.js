// Create a Table of Contents for a Markdown file.
// from: https://github.com/chjj/marked/issues/545#issuecomment-74505539
//
// Usage:
//
//    marked.setOptions({
//        renderer: marked-toc-renderer
//    });
//

var make_marked_toc_renderer = function(){
  var renderer = new marked.Renderer();
  renderer.toc = [];

  renderer.heading = function(text, level, raw) {
      var anchor = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
      renderer.toc.push({
          anchor: anchor,
          level: level,
          text: text
      });
      return '<h'
          + level
          + ' id="'
          + anchor
          + '">'
          + text
          + '</h'
          + level
          + '>\n';
  };

  return renderer;
};
