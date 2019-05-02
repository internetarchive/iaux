const proxy = require('http-proxy-middleware');

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
    router.use(`/${route}`, proxy(constructOptions(route)))
  });

  router.use('/api', proxy({
    target: base_url,
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: {
      '^/api': base_url
    }
  }));
};
