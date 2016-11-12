#!/bin/bash

INPUT=parinfer.lisp
OUTPUT=${INPUT}.js

# wrap input in a function call before compiling
cat <(echo '((function ()') $INPUT <(echo '))') | $(npm bin)/lispy > $OUTPUT
