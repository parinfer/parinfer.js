#!/bin/bash

INPUT=parinfer.lisp
OUTPUT=parinfer.lisp.js

echo "Compiling $INPUT => $OUTPUT"

# wrap input in a function call before compiling
cat <(echo '((function ()') $INPUT <(echo '))') | $(npm bin)/lispy > $OUTPUT
