import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import searchMenuCSS from './styles/search-menu';

class SearchMenu extends TrackedElement {
  static get styles() {
    return searchMenuCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      searchMenuOpen: { type: Boolean },
      searchMenuAnimate: { type: Boolean },
      selectedSearchType: { type: String },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.searchMenuOpen = false;
    this.searchMenuAnimate = false;
    this.selectedSearchType = '';
  }

  selectSearchType(e) {
    this.selectedSearchType = e.target.value;
  }

  searchInChanged(e) {
    this.dispatchEvent(new CustomEvent('searchInChanged', {
      detail: {
        searchIn: e.target.value
      }
    }));
  }

  get searchTypesTemplate() {
    const searchTypes = [
      {
        label: 'Metadata',
        value: '',
        isDefault: true,
      },
      {
        label: 'text contents',
        value: 'TXT',
      },
      {
        label: 'TV news captions',
        value: 'TV',
      },
      {
        label: 'archived websites',
        value: 'WEB',
      },
    ].map(({ value, label, isDefault }) => (
      html`
        <label @click="${this.selectSearchType}">
          <input form="nav-search" type="radio" name="sin" value="${value}" ?checked=${isDefault} @change=${this.searchInChanged} />
          Search ${label}
        </label>
      `
    ));

    return searchTypes;
  }

  render() {
    let searchMenuClass = 'initial';
    if (this.searchMenuOpen) {
      searchMenuClass = 'open';
    }
    if (!this.searchMenuOpen && this.searchMenuAnimate) {
      searchMenuClass = 'closed';
    }

    const searchMenuHidden = Boolean(!this.searchMenuOpen).toString();
    const searchMenuExpanded = Boolean(this.searchMenuOpen).toString();

    return html`
      <div
        class="search-menu tx-slide ${searchMenuClass}"
        aria-hidden="${searchMenuHidden}"
        aria-expanded="${searchMenuExpanded}"
      >
        ${this.searchTypesTemplate}
        <a class="advanced-search" href="https://${this.config.baseUrl}/advancedsearch.php" @click=${this.trackClick} data-event-click-tracking="${this.config.eventCategory}|NavAdvancedSearch">Advanced Search</a>
      </div>
    `;
  }
}

customElements.define('search-menu', SearchMenu);
