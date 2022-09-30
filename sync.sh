#!/bin/bash

## Sync dependent files with each other:
## - parinfer.js symbols => code.md
## - package.json version => parinfer.js

jsfile=parinfer.js
testjsfile=testParsingLib.js
docfile=doc/code.md

##----------------------------------------------------------------------------
## Doc Symbol sync
##----------------------------------------------------------------------------

# ref links for each top-level function name
fn_links=$(perl -n -e'/^  function (\w+)/ && print "[`$1`]:../parinfer.js#L$.\n"' $jsfile)

# ref links for each top-level var name
var_links=$(perl -n -e'/^  (var|const|let) ([\w_]+) = / && print "[`$2`]:../parinfer.js#L$.\n"' $jsfile)

# ref links for each top-level result key
result_links=$(perl -n -e'/^\s+(\w+):.*\/\/\s*\@doc / && print "[`result.$1`]:../parinfer.js#L$.\n"' $jsfile)

# where to insert the ref links
lineno=$(perl -n -e'/<!-- END OF DOC/ && print $.' $docfile)

# add ref links to the docs
docs=$(head -n $lineno $docfile)
printf "$docs\n$var_links\n$fn_links\n$result_links\n" > $docfile

echo "Updated $docfile with $jsfile symbol locations."

##----------------------------------------------------------------------------
## Version sync
##----------------------------------------------------------------------------

# Get package.json version.
version=$(perl -n -e'/"version": "(.+)"/ && print "$1"' package.json)

# Sync version to code files.
sed -i.bak "s|^// Parinfer .*|// Parinfer $version|" $jsfile
sed -i.bak "s|^// Parinfer Test .*|// Parinfer Test $version|" $testjsfile
sed -i.bak "s|^  version: .*|  version: \"$version\",|" $jsfile

rm ${jsfile}.bak
rm ${testjsfile}.bak

echo "Updated $jsfile with package.json version $version"
echo "Updated $testjsfile with package.json version $version"
echo
