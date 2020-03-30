const fs = require('fs');
const { execSync } = require('child_process');
const { version: NEW_VERSION } = require('../package.json');
const writeFence = '<!-- Write here... -->';

async function main() {
  // Update the changelog
  const oldChangelog = fs.readFileSync('CHANGELOG.md').toString();
  const newChangelog = `# ${NEW_VERSION}\n${writeFence}\n\n` + oldChangelog;
  fs.writeFileSync('CHANGELOG.md', newChangelog);
  while (fs.readFileSync('CHANGELOG.md').toString().includes(writeFence)) {
    console.log('Changelog contains dummy text. Update the changelog, and press ENTER continue.');
    await new Promise(res => process.stdin.once('data', res));
  }
  execSync('git add CHANGELOG.md');
}

main().then(() => process.exit());
