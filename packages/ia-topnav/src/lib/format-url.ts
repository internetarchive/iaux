export default (url: string = '', baseHost: string): string =>
  /^https?:/.test(url) ? url : (`${baseHost}${url}` as string & Location);
