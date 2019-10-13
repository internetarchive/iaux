#!/usr/bin/env node
var readline = require('readline');
const fs = require('fs');
const sourceFileName = "google/_.txt"

const waterfall = require('async/waterfall');
const each = require('async/each');
const source = [];
const sourceMetadata = [];

/**
 * @param name filename to read
 * @param cb()
 */
function readOne(name, source, cb) {
  const rlsource = readline.createInterface({
    input: fs.createReadStream(name),
    output: process.stdout,
    terminal: false
  });
  rlsource.on('line', function (line) {
    source.push(line);
  });
  rlsource.on('close', () => {
    cb();
  })
}
function readSource(cb) {
  waterfall([
    cb1 => readOne('google/_.txt', source, cb1),
    cb1 => readOne('google/_metadata.txt', sourceMetadata, cb1),
    ], cb);
}
function writeOne(inputFileName, writable, source, cb) {
  const rl = readline.createInterface({
    input: fs.createReadStream(inputFileName),
    output: process.stdout,
    terminal: false
  });
  let i = 0;
  rl.on('line', function(line){
    writable.write(`"${source[i++]}": "${line.trim()}",\n`);
  });
  rl.on('close', () => {
    if (i !== source.length) {
      writable.write(`//TODO doesnt look like it matches source length=${source.length} ${inputFileName} length =${i}\n`);
      console.log(`Doesnt look like it matches source length=${source.length} ${inputFileName} length =${i}\n`);
    }
    cb();
  })
}
function writeOutput(name, cb) {
  const outputFileName = `js/${name}.js`;
  const writable = fs.createWriteStream(outputFileName);
  writable.write(`const ${name} = {\n`);
  waterfall([
    cb1 => writeOne(`google/${name}.txt`, writable, source, cb1),
    cb1 => writeOne(`google/${name}_metadata.txt`, writable, sourceMetadata, cb1),
  ], () => {
    writable.write("};\n")
    writable.write(`export { ${name} };\n`);
    writable.close();
    cb();
  });
}
//SEE-OTHER-ADDLANGUAGE - note cant import this from languages as may include ones here before built
fulllanguages = ["myanmar", "english", "french", "german", "hindi", "indonesian", "japanese", "marathi", "spanish", "portugese"];
thisbuild = fulllanguages;
//thisbuild = ["english"]; //Uncomment this to only rebuild english while testing before translating
waterfall([
    cb => readSource(cb),
    cb2 => each(thisbuild,
      (l, cb1) => writeOutput(l, cb1),
      (err) => cb2),
  ], (err, res) => {console.log("DONE")}
);
