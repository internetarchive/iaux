import { LitElement, html } from 'lit-element';
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

  selectSearchType(e) {
    this.selectedSearchType = e.target.value;
  }

  get searchTypesTemplate() {
    const searchTypes = [
      { option: 'metadata', label: 'Metadata', isDefault: true },
      { option: 'text', label: 'text contents' },
      { option: 'tv', label: 'TV news captions' },
      { option: 'web', label: 'archived websites' },
    ].map(({ option, label, isDefault }) => {
      const checked = isDefault ? 'checked' : '';

      return html`
        <label @click="${this.selectSearchType}">
          <input type="radio" name="search" value="${option}" ?checked=${isDefault} />
          Search ${label}
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
