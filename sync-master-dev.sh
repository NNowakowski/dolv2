#!/bin/bash

# Merge and fix any conflicts from master
git merge origin/master

# Push your changes in case you mess up and want to start over from remote
git push

# Move HEAD to rebase target, leaving all your work staged
git reset --soft origin/master

# Commit staged changes as giant commit
git commit -m "sync: master-dev"

# Confirm your changes, run tests, etc. Then force push
git push -f

# https://stackoverflow.com/a/72118557
