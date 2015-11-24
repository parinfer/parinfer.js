#!/bin/bash

# set the version number

set -ex

cd `dirname $0`
version=$1

lein set-version $version

cd publish
npm --no-git-tag-version version $version
