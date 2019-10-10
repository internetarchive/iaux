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

    return html`
      <div
        class="search-menu tx-slide ${searchMenuClass}"
        aria-hidden="${searchMenuHidden}"
        aria-expanded="${searchMenuExpanded}"
      >
        <div class="search-options">
          <div>
            <label>
              <input type="radio" name="search" value="metadata" checked />
              Search Metadata
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="search" value="text-contents" />
              Search text contents
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="search" value="tv-news-captions" />
              Search TV news captions
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="search" value="archived-websites" />
              Search archived websites
            </label>
          </div>
          <div>
            <a href="#">Advanced Search</a>
          </div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .search-menu {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 20px;
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
        z-index: 3;
      }
      .search-options {
        align-self: center;
        margin: 1% auto;
      }
      .search-options div {
        padding: 8px;
        color: var(--white);
        font-family: var(--theme-font-family);
      }
      .search-options a {
        color: var(--link-color);
        text-decoration: none;
      }
    `;
  }
}

customElements.define('search-menu', SearchMenu);
