const { execSync } = require('child_process');

execSync('mkdir -p public');
execSync('cp -r node_modules/@internetarchive/bookreader/BookReader public/');
