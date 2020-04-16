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
      open: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.open = false;
  }

  search(e) {
    this.trackSubmit(e);
    this.dispatchEvent(new CustomEvent('navSearch', {
      detail: {
        originalEvent: e,
        formEl: this.shadowRoot.querySelector('form'),
      },
      bubbles: true,
      composed: true,
    }));
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
        <input type='hidden' name='sin' value='' />
        <button type="submit" class="search" data-event-click-tracking="${this.config.eventCategory}|NavSearchClose">
          ${icons.search}
        </button>
      </form>
    </div>`;
  }
}

customElements.define('nav-search', NavSearch);
