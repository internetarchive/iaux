const proxy = require('http-proxy-middleware');

module.exports = function expressMiddleware (router) {

  router.use('/download', proxy({
    target: 'https://archive.org/download',
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: {
      '^/download': 'https://archive.org/download'
    }
  }));
  router.use('/images', proxy({
    target: 'https://archive.org/images',
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: {
      '^/images': 'https://archive.org/images'
    }
  }));
  router.use('/serve', proxy({
    target: 'https://archive.org/serve',
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: {
      '^/serve': 'https://archive.org/serve'
    }
  }));
  router.use('/api', proxy({
    target: 'https://archive.org',
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: {
      '^/api': 'https://archive.org'
    }
  }));
};
