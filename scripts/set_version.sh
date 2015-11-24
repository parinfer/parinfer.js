#!/bin/bash

# set the version number

set -ex

version=$1

cd parinfer-lib
lein set-version $version

cd npm-publish
npm --no-git-tag-version version $version
