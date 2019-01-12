const path = require("path");

/**
 * Custom storybook webpack config
 * We are extending to load our `.less` files
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.less|css$/,
        loaders: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {url: false, sourceMap: true}
        }, {
          loader: 'less-loader',
          options: {relativeUrls: false, sourceMap: true}
        }],
        include: path.resolve(__dirname, "../../../")
      }
    ]
  }
};
