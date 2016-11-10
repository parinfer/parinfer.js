#!/bin/bash
cat \
  <(echo '(function(){') \
  <(cat parinfer.ls | $(npm bin)/lispy) \
  <(echo '})();') \
  > parinfer.ls.js
