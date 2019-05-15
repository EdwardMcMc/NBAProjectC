#!/bin/bash

# Build
npm run build

# Add these files to the github pages repo overwriting what currently exists
# Add these to a new git commit
# Push
git clone $DESTINATION_REPO
cp -r build/* nbaprojectc.github.io/
cd nbaprojectc.github.io
git add .
git commit -m 'site update'
git push origin master

