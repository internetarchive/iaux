import { html, css } from 'lit-element';
import TrackedElement from './tracked-element';

class SearchMenu extends TrackedElement {
  static get styles() {
    return css`
      button:focus,
      input:focus {
        outline-color: var(--link-color);
        outline-width: 0.16rem;
        outline-style: auto;
      }
      .search-menu {
        position: absolute;
        top: -250px;
        right: 0;
        left: 0;
        z-index: -1;
        padding: 0 4.5rem;
        font-size: 1.6rem;
        background-color: var(--grey20);
      }
      .search-menu.tx-slide {
        overflow: hidden;
        transition-property: top;
        transition-duration: 0.2s;
        transition-timing-function: ease;
      }
      .search-menu.tx-slide.initial,
      .search-menu.tx-slide.closed {
        top: -250px;
      }
      .search-menu.tx-slide.closed {
        transition-duration: 0.2s;
      }
      .search-menu.tx-slide.open {
        top: 100%;
      }

      .search-menu > * {
        padding: 1rem;
        display: block;
      }

      .advanced-search {
        text-decoration: none;
        color: var(--link-color);
      }
    `;
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
          <input form="nav-search" type="radio" name="sin" value="${value}" ?checked=${isDefault} />
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
