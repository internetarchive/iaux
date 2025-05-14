import WaybackSearch from '@internetarchive/ia-wayback-search';
import waybackSearchCSS from './styles/wayback-search';
import { customElement } from 'lit/decorators.js';

@customElement('wayback-search')
export default class NavWaybackSearch extends WaybackSearch {
  static get styles() {
    return [WaybackSearch.styles, waybackSearchCSS];
  }
}
