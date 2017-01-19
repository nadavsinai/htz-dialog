#!/bin/bash
rm -rf docs/* docs/.*
node_modules/.bin/jsdoc --verbose -c jsdoc.conf.json
