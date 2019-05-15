#!/bin/bash

git clone $DESTINATION_REPO
cp -r build/* nbaprojectc.github.io/
cd nbaprojectc.github.io
git add .
git commit -m 'site update'
git push origin master

