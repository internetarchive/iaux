#!/bin/bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$SCRIPT_DIR/../common" && yarn install
for dir in $SCRIPT_DIR/../packages/*; do (cd "$dir" && yarn install); done
