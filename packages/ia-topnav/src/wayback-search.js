// NOTE: for fully local testing, you can toggle these two lines
import WaybackSearch from 'https://esm.archive.org/@internetarchive/ia-wayback-search';
// import WaybackSearch from '../../../packages/ia-wayback-search/index.js';

import waybackSearchCSS from './styles/wayback-search.js';

class NavWaybackSearch extends WaybackSearch {
  static get styles() {
    return [WaybackSearch.styles, waybackSearchCSS];
  }
}

customElements.define('wayback-search', NavWaybackSearch);

export default NavWaybackSearch;
