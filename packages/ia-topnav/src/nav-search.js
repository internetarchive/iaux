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
      locationHandler: { type: Function },
      open: { type: Boolean },
      openMenu: { type: String },
      searchIn: { type: String },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.locationHandler = () => {};
    this.open = false;
    this.openMenu = '';
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

    // TV search points to a detail page with a q param instead
    if (this.searchIn === 'TV') {
      this.locationHandler(`https://${this.config.baseHost}/details/tv?q=${query}`);
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

  render() {
    const searchMenuClass = this.open ? 'flex' : 'search-inactive';

    return html`<div class="search-activated fade-in ${searchMenuClass}">
      <form id="nav-search" class="highlight" action="https://${this.config.baseHost}/search.php" method="get" @submit=${this.search} data-event-submit-tracking="${this.config.eventCategory}|NavSearchSubmit">
        <input
          type="text"
          name="query"
          class="search-field"
          placeholder="Search"
          autocomplete="off"
          @focus=${this.toggleSearchMenu}
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
