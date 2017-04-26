#!/usr/bin/env bash

set -e

[ -f ~/.bashrc ] && . ~/.bashrc

git clone pattern-lab pattern-lab-build

cd pattern-lab-build

npm set progress=false
npm install --progress=false
npm run build

true