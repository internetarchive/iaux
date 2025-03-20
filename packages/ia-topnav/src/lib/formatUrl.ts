export default (url: string & Location, baseHost: string): string & Location =>
  /^https?:/.test(url) ? url : (`${baseHost}${url}` as string & Location);
