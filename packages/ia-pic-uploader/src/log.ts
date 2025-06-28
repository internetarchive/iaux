/**
 * log() utility -- production ignores 'log()' JS calls; dev invokes 'log()'
 */
const log =
  location.hostname === 'localhost' ||
  location.hostname === 'local.archive.org' ||
  location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/) ||
  location.host.match(/\.code\.archive\.org$/) ||
  location.host.match(/\.dev\.archive\.org$/) ||
  location.host.match(/^ia-petabox-/)
    ? console.log.bind(console) // convenient, no?  Stateless function
    : () => {};

export default log;
