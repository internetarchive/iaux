import { nothing, html } from 'https://offshoot.prod.archive.org/lit.js';

import TrackedElement from './tracked-element.js';
import navSearchCSS from './styles/nav-search.js';
import icons from './assets/img/icons.js';
import formatUrl from './lib/formatUrl.js';

class NavSearch extends TrackedElement {
  static get styles() {
    return navSearchCSS;
  }

  static get properties() {
    return {
      baseHost: { type: String },
      config: { type: Object },
      locationHandler: { type: Object },
      open: { type: Boolean },
      openMenu: { type: String },
      searchIn: { type: String },
      searchQuery: { type: String },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.locationHandler = () => {};
    this.open = false;
    this.openMenu = '';
    this.searchIn = '';
    this.inSearchBeta = false;

    this.initSearchBetaOptIn();
  }

  initSearchBetaOptIn() {
    this.inSearchBeta = !!window.localStorage?.getItem('SearchBeta-opt-in') ||
      !!window.localStorage?.getItem('SearchBeta-launched');
  }

  search(e) {
    const query = this.shadowRoot.querySelector('[name=query]').value;

    if (!query) {
      e.preventDefault();
      return false;
    }

    // TV search points to a detail page with a q param instead
    if (this.searchIn === 'TV') {
      this.locationHandler(formatUrl(`/details/tv?q=${query}`, this.baseHost));
      e.preventDefault();
      return false;
    }

    this.trackSubmit(e);
    return true;
  }

  toggleSearchMenu() {
    if (this.openMenu === 'search') {
      return;
    }
    this.dispatchEvent(new CustomEvent('menuToggled', {
      detail: {
        menuName: 'search'
      },
      composed: true,
      bubbles: true,
    }));
  }

  get searchInsideInput() {
    return this.searchIn ? html`<input type='hidden' name='sin' value='${this.searchIn}' />` : nothing;
  }

  get searchEndpoint() {
    return this.inSearchBeta ? '/search' : '/search.php';
  }

  render() {
    const searchMenuClass = this.open ? 'flex' : 'search-inactive';

    return html`
      <div class="search-activated fade-in ${searchMenuClass}">
        <form
          id="nav-search"
          class="highlight"
          action=${formatUrl(this.searchEndpoint, this.baseHost)}
          method="get"
          @submit=${this.search}
          data-event-submit-tracking="${this.config.eventCategory}|NavSearchSubmit"
        >
          <input
            type="text"
            name="query"
            class="search-field"
            placeholder="Search"
            autocomplete="off"
            value=${this.searchQuery || ''}
            @focus=${this.toggleSearchMenu}
          />
          ${this.searchInsideInput}
          <button
            type="submit"
            class="search"
            tabindex="-1"
            data-event-click-tracking="${this.config.eventCategory}|NavSearchClose"
          >
            ${icons.search}
          </button>
        </form>
      </div>
    `;
  }
}

customElements.define('nav-search', NavSearch);
