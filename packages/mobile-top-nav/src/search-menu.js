import { LitElement, html, css } from 'lit-element';

class SearchMenu extends LitElement {
  static get styles() {
    return css`
      button:focus,
      input:focus {
        outline-color: var(--link-color);
        outline-width: 0.16rem;
        outline-style: auto;
      }
      .search-menu {
        padding: 0 4.5rem;
        font-size: 1.6rem;
        background-color: var(--grey20);
      }
      .search-menu.tx-slide {
        overflow: hidden;
        transition-property: max-height;
        transition-duration: 0.2s;
        transition-timing-function: ease;
      }
      .search-menu.tx-slide.initial,
      .search-menu.tx-slide.closed {
        max-height: 0;
      }
      .search-menu.tx-slide.closed {
        transition-duration: 0.2s;
      }
      .search-menu.tx-slide.open {
        max-height: 100vh;
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
      searchMenuOpen: { type: Boolean },
      searchMenuAnimate: { type: Boolean },
      selectedSearchType: { type: String },
    };
  }

  constructor() {
    super();
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
        option: 'metadata',
        label: 'Metadata',
        isDefault: true,
      },
      {
        option: 'text',
        label: 'text contents',
      },
      {
        option: 'tv',
        label: 'TV news captions',
      },
      {
        option: 'web',
        label: 'archived websites',
      },
    ].map(({ option, label, isDefault }) => (
      html`
        <label @click="${this.selectSearchType}">
          <input type="radio" name="search" value="${option}" ?checked=${isDefault} />
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
        <a class="advanced-search" href="#">Advanced Search</a>
      </div>
    `;
  }
}

customElements.define('search-menu', SearchMenu);
