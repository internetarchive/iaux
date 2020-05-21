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
        { pattern: config.grep ? config.grep : 'test/**/*.test.js', type: 'module' },
      ],

      esm: {
        nodeResolve: true,
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
  return config;
};
