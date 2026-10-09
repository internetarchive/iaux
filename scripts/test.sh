#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

failed=()
for dir in $SCRIPT_DIR/../packages/*; do
  name=$(basename "$dir")
  echo "Running tests for package: $name"
  if ! (cd "$dir" && npm run test); then
    failed+=("$name")
  fi
done

if [ ${#failed[@]} -ne 0 ]; then
  echo
  echo "Failed packages: ${failed[*]}"
  exit 1
fi
