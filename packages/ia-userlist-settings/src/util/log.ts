/* eslint-disable */
/**
 * console.log() utility -- production ignores 'log()' JS calls; dev invokes 'console.log()'
 */
const log =
  location.hostname === 'localhost' ||
  location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/) ||
  location.host.match(/\.code\.archive\.org$/) ||
  location.host.match(/\.dev\.archive\.org$/) ||
  location.host.match(/^ia-petabox-/) ||
  location.host.match(/^local.archive.org/)
    ? // eslint-disable-next-line no-console
      console.log.bind(console) // convenient, no?  Stateless function
    : () => {};

export { log as default };
