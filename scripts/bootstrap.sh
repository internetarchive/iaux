#!/bin/bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
for dir in $SCRIPT_DIR/../packages/*; do (echo "Installing dependencies for package: $dir" && cd "$dir" && npm install); done

# Playwright browsers install into a shared machine-level cache (~/.cache/ms-playwright), so
# one install covers every package that needs them. Skipped under CI, where the workflow
# installs just the headless shell: unpacking the full Chrome build hangs on the runner.
if [ -z "$CI" ]; then
  for pw in $SCRIPT_DIR/../packages/*/node_modules/.bin/playwright; do
    [ -x "$pw" ] || continue
    echo "Installing Playwright browsers for package: ${pw%/node_modules/.bin/playwright}"
    "$pw" install chromium || echo "warning: Playwright browser install failed; rerun '$pw install chromium' if you need browser tests" >&2
  done
fi
