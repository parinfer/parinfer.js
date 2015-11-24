#!/bin/bash

# set the version number

set -ex

version=$1

cd lib
lein set-version $version

cd publish
npm --no-git-tag-version version $version
