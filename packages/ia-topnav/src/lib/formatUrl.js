export default (url, baseHost) => (/^https?:/.test(url) ? url : `${baseHost}${url}`);
