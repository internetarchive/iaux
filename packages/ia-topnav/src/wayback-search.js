import WaybackSearch from '@internetarchive/ia-wayback-search';
import waybackSearchCSS from './styles/wayback-search';

class NavWaybackSearch extends WaybackSearch {
  static get styles() {
    return [WaybackSearch.styles, waybackSearchCSS];
  }
}

customElements.define('wayback-search', NavWaybackSearch);

export default NavWaybackSearch;
