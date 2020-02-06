import { LitElement, html, css } from 'lit-element';
import searchMenuCss from './css/search-menu';

class SearchMenu extends LitElement {
  static get properties() {
    return {
      searchMenuOpen: { type: Boolean },
      searchMenuAnimate: { type: Boolean },
      selectedSearchType: { type: String },
    };
  }

  constructor() {
    super();
    this.selectedSearchType = '';
  }

  selectedSearchType() {
    const { selectedSearchType } = this;
    // placeholder for click handler
    return selectedSearchType;
  }

  get searchTypesTemplate() {
    const searchTypes = [
      { option: 'metadata', label: 'Metadata' },
      { option: 'text', label: 'text contents' },
      { option: 'tv', label: 'TV news captions' },
      { option: 'web', label: 'archived websites' },
    ].map(({ option, label }) => {
      const checked = option === 'metadata' ? 'checked' : '';

      return html`
        <label class="search-type" @click="${this.selectedSearchType}">
          <input type="radio" name="search" value="${option}" checked="${checked}" />
          <span>Search ${label}</span>
        </label>
      `;
    });

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
        <div class="search-options">
          ${this.searchTypesTemplate}
          <a class="advanced-search" href="#">Advanced Search</a>
        </div>
      </div>
    `;
  }

  static get styles() {
    return searchMenuCss();
  }
}

customElements.define('search-menu', SearchMenu);
