#!/bin/sh

## Sync dependent files with each other:
## - parinfer.js symbols => design.md
## - package.json version => parinfer.js and parinfer.lisp

jsfile=parinfer.js
docfile=doc/design.md
lispfile=lisp/parinfer.lisp

##----------------------------------------------------------------------------
## Doc Symbol sync
##----------------------------------------------------------------------------

# ref links for each function name
fn_links=$(perl -n -e'/^function (\w+)/ && print "[`$1`]:../parinfer.js#L$.\n"' $jsfile)

# ref links for each var name
var_links=$(perl -n -e'/^var ([\w_]+) = / && print "[`$1`]:../parinfer.js#L$.\n"' $jsfile)

# ref links for each top-level result key
result_links=$(perl -n -e'm{^    (\w+):.*//} && print "[`result.$1`]:../parinfer.js#L$.\n"' $jsfile)

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
sed -i.bak "s|^  version: .*|  version: \"$version\",|" $jsfile
sed -i.bak "s|^  {version: .*|  {version: \"$version\",|" $lispfile

rm ${jsfile}.bak
rm ${lispfile}.bak

echo "Updated $jsfile and $lispfile with package.json version $version"
echo
