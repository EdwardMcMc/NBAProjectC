#!/bin/bash

# Git config
git config --global user.email "nbaprojectc@nxk.io"
git config --global user.name "NBAProjectC"

# Build
npm run build

# Add these files to the github pages repo overwriting what currently exists
# Add these to a new git commit
# Push
git clone $DESTINATION_REPO
cp -r build/* nbaprojectc.github.io/NBAProjectCQA
cd nbaprojectc.github.io/NBAProjectCQA
git add .
git commit -m 'site update'
git push origin master

