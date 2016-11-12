#!/bin/sh

# Get package.json version.
version=$(perl -n -e'/"version": "(.+)"/ && print "$1"' package.json)

jsfile=parinfer.js
lispfile=lispy-port/parinfer.lisp

# Sync version to code files.
sed -i.bak "s|^// Parinfer .*|// Parinfer $version|" $jsfile
sed -i.bak "s|^  version: .*|  version: \"$version\",|" $jsfile
sed -i.bak "s|^  {version: .*|  {version: \"$version\",|" $lispfile

rm ${jsfile}.bak
rm ${lispfile}.bak
