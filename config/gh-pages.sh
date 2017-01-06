#!/bin/bash
package_version=$(sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json)

if [ "`git branch --list --remote origin/gh-pages`" ]
then
  git push origin --delete gh-pages
fi

git subtree push --prefix docs/demo-module/$package_version origin gh-pages
