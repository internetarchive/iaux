/* istanbul ignore file */

export default {
  performQuery(query: string) {
    window.location.href = `https://web.archive.org/web/*/${query}`;
  },
};
