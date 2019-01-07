const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'public');
const jsSrcPath = path.join(srcPath, 'scripts');
const lessSrcPath = path.join(srcPath, 'styles');
const jsBuildPath = path.join(buildPath, 'scripts');
const cssBuildPath = path.join(buildPath, 'styles');

module.exports = {
  mode: 'development',
  entry: [
    path.join(jsSrcPath, 'index.js'),
    path.join(lessSrcPath, 'index.less'),
  ],

  // Define where we output the built files
  output: {
    filename: 'index.js',
    path: jsBuildPath,
  },

  plugins: [
    // Clean out the public/ directory on each build. This ensures that
    // you don't leave extraneous files from old builds in the directory.
    new CleanWebpackPlugin([jsBuildPath, cssBuildPath]),
    new ExtractTextPlugin('../styles/index.css'),
  ],

  module: {
    rules: [
      // Use Babel on all src/ JS
      {
        test: /\.js$/,
        include: jsSrcPath,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['es2015'],
          },
        },
      },

      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'less-loader']),
      },
    ],
  },

  // Turn on dev source maps by default
  devtool: 'inline-source-map',
};
