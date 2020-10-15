export default (url, baseHost) => (
  /^https?:/.test(url) ? url : `https://${baseHost}${url}`
);
