#!/usr/bin/env bash

set -e

[ -f ~/.bashrc ] && . ~/.bashrc
[ -d pattern-lab-build ] && cd pattern-lab-build

npm set progress=false
npm run backstop-test

true