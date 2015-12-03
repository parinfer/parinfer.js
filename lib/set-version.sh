#!/bin/bash

# set the version number

set -ex

cd `dirname $0`
version=$1

lein set-version $version

cd npm-publish
npm --no-git-tag-version version $version

lein clean
lein run -m build/release

# add preamble to the release
cat preamble.js parinfer.js > temp
mv temp parinfer.js

