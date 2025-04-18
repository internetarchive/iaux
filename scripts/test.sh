#!/bin/bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
for dir in $SCRIPT_DIR/../packages/*; do (cd "$dir" && yarn run test); done
