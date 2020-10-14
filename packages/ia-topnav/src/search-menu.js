import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import searchMenuCSS from './styles/search-menu';
import formatUrl from './lib/formatUrl';

class SearchMenu extends TrackedElement {
  static get styles() {
    return searchMenuCSS;
  }

  static get properties() {
    return {
      baseHost: { type: String },
      config: { type: Object },
      openMenu: { type: String },
      searchMenuOpen: { type: Boolean },
      searchMenuAnimate: { type: Boolean },
      selectedSearchType: { type: String },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.openMenu = '';
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
        label: 'radio transcripts',
        value: 'RADIO'
      },
      {
        label: 'archived websites',
        value: 'WEB',
      },
    ].map(({ value, label, isDefault }) => {
      if (this.config.hiddenSearchOptions && this.config.hiddenSearchOptions.includes(value)) {
        return html``;
      }
      return html`
        <label @click="${this.selectSearchType}">
          <input form="nav-search" type="radio" name="sin" value="${value}" ?checked=${isDefault} @change=${this.searchInChanged} />
          Search ${label}
        </label>
      `;
    });

    return searchTypes;
  }

  get menuClass() {
    return this.openMenu === 'search' ? 'open' : 'closed';
  }

  render() {
    const searchMenuHidden = Boolean(!this.searchMenuOpen).toString();
    const searchMenuExpanded = Boolean(this.searchMenuOpen).toString();

    if (this.config.hideSearch) {
      return html``;
    }

    return html`
      <div
        class="search-menu tx-slide ${this.menuClass}"
        aria-hidden="${searchMenuHidden}"
        aria-expanded="${searchMenuExpanded}"
      >
        ${this.searchTypesTemplate}
        <a class="advanced-search" href="${formatUrl('/advancedsearch.php', this.baseHost)}" @click=${this.trackClick} data-event-click-tracking="${this.config.eventCategory}|NavAdvancedSearch">Advanced Search</a>
      </div>
    `;
  }
}

customElements.define('search-menu', SearchMenu);
