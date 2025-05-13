#!/bin/bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
for dir in $SCRIPT_DIR/../packages/*; do (echo "Installing dependencies for package: $dir" && cd "$dir" && npm install); done
