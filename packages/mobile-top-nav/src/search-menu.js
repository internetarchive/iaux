import { LitElement, html, css } from 'lit-element';

class SearchMenu extends LitElement {
  static get properties() {
    return {
      searchMenuOpen: { type: Boolean },
      searchMenuAnimate: { type: Boolean },
    };
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

    const searchTypes = [
      { option: 'metadata', label: 'Metadata' },
      { option: 'text', label: 'text contents' },
      { option: 'tv', label: 'TV news captions' },
      { option: 'web', label: 'archived websites' },
    ].map(({ option, label }) => {
      const checked = option === 'metadata' ? 'checked' : '';

      return html`
        <label class="search-type">
          <input type="radio" name="search" value="${option}" checked="${checked}" />
          <span>Search ${label}</span>
        </label>
      `;
    });
    return html`
      <div
        class="search-menu tx-slide ${searchMenuClass}"
        aria-hidden="${searchMenuHidden}"
        aria-expanded="${searchMenuExpanded}"
      >
        <div class="search-options">
          ${searchTypes}
          <a class="advanced-search" href="#">Advanced Search</a>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      button:focus,
      input:focus {
        outline-color: var(--link-color);
        outline-width: 0.1rem;
        outline-style: auto;
      }
      .search-menu {
        position: relative;
        margin: 0;
        width: 100%;
        background-color: var(--grey20);
        display: flex;
        flex-direction: column;
      }
      .search-menu.tx-slide {
        overflow: hidden;
        transition-property: max-height;
        transition-duration: 1.5s;
        transition-timing-function: ease;
      }
      .search-menu.tx-slide.initial,
      .search-menu.tx-slide.closed {
        max-height: 0;
      }
      .search-menu.tx-slide.closed {
        transition-duration: 0.1s;
      }
      .search-menu.tx-slide.open {
        max-height: 100vh;
      }
      .search-options {
        align-self: center;
        min-width: 38%;
        margin-bottom: 1%;
      }

      .search-options > * {
        padding: 3%;
        display: block;
      }

      .search-options .advanced-search {
        text-decoration: none;
        color: var(--link-color);
      }
    `;
  }
}

customElements.define('search-menu', SearchMenu);
