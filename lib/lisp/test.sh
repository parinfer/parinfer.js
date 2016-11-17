#!/bin/sh

cd `dirname $0`

./build.sh

JS=../parinfer.js
LISP=parinfer.lisp.js

cp $JS ${JS}.bak
cp $LISP $JS

npm test

cp ${JS}.bak $JS
rm ${JS}.bak
