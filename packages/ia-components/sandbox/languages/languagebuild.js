#!/usr/bin/env node
/* eslint-disable arrow-parens, no-console, max-len, no-param-reassign, no-regex-spaces, no-plusplus, no-return-assign, quote-props */
const readline = require('readline');
const fs = require('fs');
const canonicaljson = require('@stratumn/canonicaljson');
/* Note there aren't defined as dependencies as resistance to adding deps and this doesnt get run often */
/* eslint-disable import/no-extraneous-dependencies */
const waterfall = require('async/waterfall');
const each = require('async/each');

const sourceFileName = 'google/_.txt';
const sourceMetaName = 'google/_metadata.txt';
const source = [];
const sourceMetadata = [];

/**
 * @param name filename to read
 * @param sourceArr
 * @param cb()
 */
function readOne(name, sourceArr, cb) {
  const rlsource = readline.createInterface({
    input: fs.createReadStream(name),
    output: process.stdout,
    terminal: false
  });
  rlsource.on('line', line => sourceArr.push(line));
  rlsource.on('close', () => cb());
}
function readSource(cb) {
  waterfall([
    cb1 => readOne(sourceFileName, source, cb1),
    cb1 => readOne(sourceMetaName, sourceMetadata, cb1),
  ], cb);
}

function readJson(filename, cb) {
  /*
  Read JSON from filename and return via cb(err, res),
  or return error if unable to read or parse.
  */
  const silentReadFailure = false;
  fs.readFile(filename, 'utf8', (err, jsonstr) => {
    if (err) {
      if (!silentReadFailure) {
        console.error('Unable to read', filename, err.message);
      }
      cb(err, {});
    } else {
      try {
        const o = canonicaljson.parse(jsonstr);
        try { cb(null, o); } catch (err1) { console.error('ERROR: Uncaught err in readJson cb', err1); }
      } catch (err2) {
        console.error('Unable to parse json:', err2.message);
        cb(err2, {});
      }
    }
  });
}
function writeOne(inputFileName, writable, sourceArr, manual, cb) {
  const rl = readline.createInterface({
    input: fs.createReadStream(inputFileName),
    output: process.stdout,
    terminal: false
  });
  let i = 0;
  rl.on('line', (line) => {
    const tag = sourceArr[i++];
    const translated = manual[tag] || line.trim(); // Use manual version if possible
    writable.write(`"${tag}": "${translated}",\n`);
  });
  rl.on('close', () => {
    if (i !== sourceArr.length) {
      // writable.write(`//TODO doesnt look like it matches source length=${source.length} ${inputFileName} length =${i}\n`);
      console.log(`Doesnt look like it matches source length=${sourceArr.length} ${inputFileName} length =${i}\n`);
    }
    cb();
  });
}
function writeOutput(name, cb) {
  const outputFileName = `json/${name}.json`;
  const writable = fs.createWriteStream(outputFileName);
  //  writable.write(`const ${name} = {\n`); //JS
  writable.write('{\n'); // JSON
  let manual;
  waterfall([
    cb1 => readJson(`manual/${name}.json`, (err, m) => { manual = m; cb1(err); }),
    cb1 => writeOne(`google/${name}.txt`, writable, source, manual, cb1),
    cb1 => writeOne(`google/${name}_metadata.txt`, writable, sourceMetadata, manual, cb1),
  ], () => {
    // writable.write('};\n'); // JS
    // writable.write(`export { ${name} };\n`); // JSs
    writable.write('"":"" }\n'); // JSON
    writable.close();
    cb();
  });
}

const tagSpecialCases = {
  ccnum: 'CC Number',
};

const tagAbbrv = { // THese are parts of tags to expand and make words
  abbrv: 'abbreviation',
  ark: 'ARK',
  avg: 'average',
  bib: 'BIB',
  btih: 'BTIH',
  center: 'center',
  cnt: 'count',
  count: 'count',
  city: 'city',
  country: 'country',
  copyright: 'copyright',
  curate: 'curate',
  digital: 'digital',
  doc: 'document',
  drg: 'DRG',
  date: 'date',
  file: 'file',
  first: 'first',
  fmt: 'format',
  group: 'group',
  id: 'ID',
  inventor: 'inventor',
  isbn: 'ISBN',
  issn: 'ISSN',
  last: 'last',
  leaf: 'leaf',
  jpg: 'JPG',
  job: 'job',
  lcam: 'LCAM',
  lccn: 'LCCN',
  len: 'length',
  marc: 'MARC',
  md5s: 'MD5S',
  mpeg: 'MPEG',
  nal: 'NAL',
  name: 'name',
  nin: 'NIN',
  num: 'number',
  oclc: 'OCLC',
  ocr: 'OCR',
  page: 'page',
  partof: 'part of',
  pdf: 'PDF',
  posted: 'posted',
  ppi: 'PPI',
  range: 'range',
  rcam: 'RCAM',
  release: 'release',
  repub: 'republish',
  review: 'review',
  scan: 'scan',
  serial: 'serial',
  size: 'size',
  'sk-': 'SK ', // Catch only sk- at start, not 'sk' in middle of word
  state: 'state',
  time: 'time',
  title: 'title',
  tracking: 'tracking',
  trk: 'track',
  type: 'type',
  unit: 'unit',
  uri: 'URI',
  url: 'URL',
  utm: 'UTM',
  utc: 'UTC',
  warcs: 'WARCs',
  wma: 'WMA',
  wcd: 'WCD',
  xml: 'XML',
  xscale: 'X scale',
  yscale: 'Y scale',
};
// Undoes splits unintended by tagAbbrv
// Note this intentionally does NOT get double split e.g. 'filedate' -> 'file  date' (two spaces) so not put back together
const tagUnWordSplit = { // Ordered by the word split out above
  'ac count': 'account',
  'count ry': 'country',
  'up date': 'update',
  'up date date': 'update  date', // Double up as dont know order processed, double space to stop being recombined
  'up datedate': 'update  date', // Double up as dont know order processed, double space to stop being recombined
  'update date': 'update  date', // Double up as dont know order processed, double space to stop being recombined
  'updatedate': 'update  date', // Double up as dont know order processed, double space to stop being recombined
  'update d': 'updated',
  'update r': 'updater',
  'document ket': 'docket',
  'document ument': 'document ', // Intentional trailing space
  'file d': 'filed',
  'file s': 'files',
  'ev ID ence': 'evidence',
  'ID entifier': 'identifier',
  'h ID den': 'hidden',
  'w ID th': 'width',
  'v ID eo': 'video',
  'JPG s': 'JPGs',
  'landm ARK': 'landmark',
  'shelfm ARK': 'shelfmark',
  'number ber': 'number',
  'exter NAL': 'external',
  'jour NAL': 'journal',
  'origi NAL': 'original',
  'name d': 'named',
  'captio NIN g': 'captioning',
  'easte NIN g': 'eastening',
  'northen NIN g': 'northening',
  'scan  NIN g': 'scanning', // Note catches double space as both 'scan' and 'NIN' are words
  'war NIN g': 'warning',
  'page s': 'pages',
  'webpage': 'webpage',
  'shi PPI ng': 'shipping',
  'republish lisher': 'republisher',
  'review er': 'reviewer',
  'review s': 'reviews',
  'scan ner': 'scanner',
  'scan ning': 'scanning',
  'state ment': 'statement',
  'time zone': 'timezone',
  'favo URI tes': 'favourites',
  'j URI sdiction': 'jurisdiction',
  'foldo UTC ount': 'foldoutcount', // Needed if 'utc' processed before 'count'
};

function writeEnglishMetadata(cb) {
  const verbose = true;
  const outputFileName = 'google/english_metadata.txt';
  const writable = fs.createWriteStream(outputFileName);
  sourceMetadata.forEach(tag => {
    let lowertag = tagSpecialCases[tag];
    if (!lowertag) {
      let oldtag = `${tag}`;
      Object.entries(tagAbbrv).forEach(kv => tag = tag.replace(kv[0], ` ${kv[1]} `)); // break out partial abbreviated words like 'num'
      if (verbose && oldtag !== tag) console.log('Replaced-word', oldtag, 'with', tag);
      oldtag = `${tag}`;
      Object.entries(tagUnWordSplit).forEach(kv => tag = tag.replace(kv[0], `${kv[1]}`)); // break out partial abbreviated words like 'num'
      if (verbose && oldtag !== tag) console.log('Replaced-unword', oldtag, 'with', tag);
      oldtag = `${tag}`;
      lowertag = (tag
        .replace(/[_.-]/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Break up camel case
        // Replace extra spaces
        .replace(/^ /g, '')
        .replace(/ $/g, '')
        .replace(/ {2}/g, ' ')
        .replace(/ {2}/g, ' ') // Do twice to catch triple spaces
      );
      if (verbose && oldtag !== lowertag) console.log('Replaced-regexps', oldtag, 'with', lowertag);
    }
    const newtag = lowertag.charAt(0).toUpperCase() + lowertag.slice(1);
    writable.write(`${newtag}\n`);
  });
  writable.close();
  cb();
}
if (process.argv[2] === 'metadata') {
  // Take a file of metadata tags, and split it into a file that can be translated, by splitting camel case words etc
  // There is lots of exception handling in writeEnglishMetadata
  waterfall([
    cb => readOne('google/_metadata.txt', sourceMetadata, cb),
    cb => writeEnglishMetadata(cb),
  ], (unusedErr, unusedRes) => {
    console.log('Metadata done');
  });
} else {
  // SEE-OTHER-ADDLANGUAGE - note cant import this from languages as may include ones here before built
  // noinspection UnnecessaryLocalVariableJS
  const fulllanguages = ['myanmar', 'english', 'french', 'german', 'hindi', 'indonesian', 'italian', 'japanese', 'marathi', 'spanish', 'portugese'];
  let thisbuild = fulllanguages;
  thisbuild = ['english']; // Uncomment this to only rebuild english while testing before translating
  waterfall([
    cb => readSource(cb),
    cb2 => each(thisbuild,
      (l, cb1) => writeOutput(l, cb1),
      (unusedErr) => cb2),
  ], (unusedErr, unusedRes) => {
    console.log('DONE');
  });
}
// Code Inspection Mitra 2020-01-01
