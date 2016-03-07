#!/bin/bash

# Purpose: To allow parinfer.js.md to link to symbols inside parinfer.js.
#
# For example, I should be able to link to a function name with:
#
#    [`finalizeResult`]
#
# And I should be able to link to a result key with:
#
#    [`result.parenStack`]
#
# We accomplish this by:
#
#   1. Extracting symbol locations from parinfer.js using crude regex.
#   2. Outputting markdown reflinks after a sentinel comment in parinfer.js.md.
#

srcfile=parinfer.js
docfile=parinfer.js.md

# ref links for each function name
fn_links=$(perl -n -e'/^function (\w+)/ && print "[`$1`]:parinfer.js#L$.\n"' $srcfile)

# ref links for each var name
var_links=$(perl -n -e'/^var ([\w_]+) = / && print "[`$1`]:parinfer.js#L$.\n"' $srcfile)

# ref links for each top-level result key
result_links=$(perl -n -e'm{^    (\w+):.*//} && print "[`result.$1`]:parinfer.js#L$.\n"' $srcfile)

# where to insert the ref links
lineno=$(perl -n -e'/<!-- END OF DOC/ && print $.' $docfile)

# add ref links to the docs
docs=$(head -n $lineno $docfile)
printf "$docs\n$var_links\n$fn_links\n$result_links" > $docfile
