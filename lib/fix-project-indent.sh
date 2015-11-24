#!/bin/sh

# See http://shaunlebron.github.io/parinfer/#fixing-existing-files

cd `dirname $0`

if [ "$#" -ne 1 ]; then
  echo
  echo "$0:  correct indentation of all clojure files in the given directory (recursive)"
  echo "  (originals backed up with .bak files)"
  echo
  exit 1
fi

find $1 -type f -name "*.clj" -or -name "*.clj?" | xargs lein prep
