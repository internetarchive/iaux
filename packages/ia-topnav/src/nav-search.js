import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import navSearchCSS from './styles/nav-search';
import icons from './assets/img/icons';

class NavSearch extends TrackedElement {
  static get styles() {
    return navSearchCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      focusSearchInput: { type: Boolean },
      open: { type: Boolean },
      searchIn: { type: String },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.focusSearchInput = false;
    this.open = false;
    this.searchIn = '';
  }

  updated() {
    if (this.open) {
      this.shadowRoot.querySelector('[name=query]').focus();
    }
    return true;
  }

  search(e) {
    const query = this.shadowRoot.querySelector('[name=query]').value;

    if (!query) {
      e.preventDefault();
      return false;
    }

    this.trackSubmit(e);
    return true;
  }

  render() {
    const searchMenuClass = this.open ? 'flex' : 'search-inactive';

    return html`<div class="search-activated fade-in ${searchMenuClass}">
      <form id="nav-search" class="highlight" action="https://${this.config.baseUrl}/search.php" method="get" @submit=${this.search} data-event-submit-tracking="${this.config.eventCategory}|NavSearchSubmit">
        <input
          type="text"
          name="query"
          class="search-field"
          placeholder="Search"
        />
        <input type='hidden' name='sin' value='${this.searchIn}' />
        <button type="submit" class="search" data-event-click-tracking="${this.config.eventCategory}|NavSearchClose">
          ${icons.search}
        </button>
      </form>
    </div>`;
  }
}

customElements.define('nav-search', NavSearch);
