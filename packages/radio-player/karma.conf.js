/* eslint-disable import/no-extraneous-dependencies */
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('webpack-merge');

module.exports = (config) => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        { pattern: 'test/**/*.mp3', watched: false, included: false, served: true },
        { pattern: 'test/**/*.ogg', watched: false, included: false, served: true },
        { pattern: config.grep ? config.grep : 'test/**/*.test.js', type: 'module' },
      ],

      customLaunchers: {
        ChromeHeadlessAutoplayAllowed: {
          base: 'ChromeHeadless',
          flags: [
            // needed to test playback via javascript since the browser
            // doesn't allow automated playback without user interaction
            '--autoplay-policy=no-user-gesture-required',
            '--no-live',
            '--disable-setuid-live'
          ],
        },
      },

      esm: {
        nodeResolve: true,
      },

      proxies: {
        '/assets/': '/base/test/assets/'
      },

      reporters: [
        // Reference: https://github.com/karma-runner/karma-coverage
        // Output code coverage files
        'coverage'
      ],

      // Configure code coverage reporter
      coverageReporter: {
        reporters: [
            // generates ./coverage/lcov.info
            { type: 'lcovonly', subdir: '.' },
            // generates ./coverage/coverage-final.json
            { type: 'json', subdir: '.' },
        ]
      },

      plugins: [
        'karma-coverage'
      ],
    }),
  );
  config.browsers = ['ChromeHeadlessAutoplayAllowed'];
  return config;
};
