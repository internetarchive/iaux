const { createProxyMiddleware } = require('http-proxy-middleware');

const base_url = "https://archive.org";

const constructOptions = (route) => {
  const target = `${base_url}/${route}`;
  const pathRewrite = {};
  pathRewrite[`^/${route}`] = target;
  return {
    target,
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite,
  }
};

module.exports = function expressMiddleware (router) {
  ['details', 'download', 'embed', 'images', 'metadata', 'serve'].forEach((route) => {
    router.use(`/${route}`, createProxyMiddleware(constructOptions(route)))
  });

  router.use('/BookReader', createProxyMiddleware({
    target: `${base_url}/bookreader/BookReader`,
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: {
      '^/BookReader': `${base_url}/bookreader/BookReader`
    }
  }));

  router.use('/api', createProxyMiddleware({
    target: base_url,
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: {
      '^/api': base_url
    }
  }));
};
