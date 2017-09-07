#!/usr/bin/env bash

set -e

[ -f ~/.bashrc ] && . ~/.bashrc
[ -d pattern-lab-build ] && cd pattern-lab-build

# uninstalling js to use built in fs module as suggested in:
# https://stackoverflow.com/questions/39641513/cant-find-module-fs-when-running-casperjs-on-js-file
npm uninstall fs
npm set progress=false
npm run backstop-reference
npm run backstop-test

true