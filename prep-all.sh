#!/bin/sh

find $1 -type f -name "*.clj" -or -name "*.clj?" | xargs lein prep
