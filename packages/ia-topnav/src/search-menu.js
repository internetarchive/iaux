import { html } from 'https://offshoot.prod.archive.org/lit.js';
import TrackedElement from './tracked-element.js';
import searchMenuCSS from './styles/search-menu.js';
import formatUrl from './lib/formatUrl.js';

class SearchMenu extends TrackedElement {
  static get styles() {
    return searchMenuCSS;
  }

  static get properties() {
    return {
      baseHost: { type: String },
      config: { type: Object },
      hideSearch: { type: Boolean },
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

  firstUpdated() {
    this.shadowRoot.addEventListener('keyup', (e) => {
      const searchTypes = this.shadowRoot.querySelectorAll('.search-menu-inner label input[type=radio]');
      const length = searchTypes.length - 1;

      // early return if searchTypes not found
      if (!length) return;

      const searchTypeHandler = (index) => {
        const searchType = searchTypes[index];
        searchType.checked = true;
        searchType.dispatchEvent(new Event('change'));
        searchType.focus();
      };

      if (e.key === 'Home') {
        searchTypeHandler(0);
      } else if (e.key === 'End') {
        searchTypeHandler(length);
      }
    });
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
        label: 'metadata',
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
        label: 'archived web sites',
        value: 'WEB',
      },
    ].map(({ value, label, isDefault }) => {
      if (this.config.hiddenSearchOptions && this.config.hiddenSearchOptions.includes(value)) {
        return html``;
      }
      return html`
        <label @click="${this.selectSearchType}">
          <input tabindex="3" form="nav-search" type="radio" name="sin" value="${value}" ?checked=${isDefault} @change=${this.searchInChanged} />
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

    if (this.hideSearch) {
      return html``;
    }

    return html`
      <div class="menu-wrapper">
        <div
          class="search-menu-inner tx-slide ${this.menuClass}"
          aria-hidden="${searchMenuHidden}"
          aria-expanded="${searchMenuExpanded}"
        >
          ${this.searchTypesTemplate}
          <a
            class="advanced-search"
            href="${formatUrl('/advancedsearch.php', this.baseHost)}"
            @click=${this.trackClick}
            data-event-click-tracking="${this.config.eventCategory}|NavAdvancedSearch"
            tabindex="4"
            >Advanced Search</a
          >
        </div>
      </div>
    `;
  }
}

customElements.define('search-menu', SearchMenu);
