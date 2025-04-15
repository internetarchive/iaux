export default {
  files: 'dist/**/test/**/*.test.js',
  nodeResolve: true,
  coverageConfig: {
    exclude: ['./dist/test/**/*', './node_modules/**/*'],
  },
};