import { LitElement, html, css } from 'lit-element';

class SearchMenu extends LitElement {

  static get properties() {
    return {
      searchMenuOpen: { type: Boolean },
      searchMenuAnimate: { type: Boolean }
    };
  }

  render() {
    const searchMenuClass = this.searchMenuOpen ? 'search-menu open slide-in' : this.searchMenuAnimate ? 'search-menu slide-out': 'search-menu';
    const searchMenuHidden = this.searchMenuOpen ? 'false' : 'true';
    const searchMenuExpanded = this.searchMenuOpen ? 'true' : 'false';
    return html`
    <div
      class="${searchMenuClass}"
      aria-hidden="${searchMenuHidden}"
      aria-expanded="${searchMenuExpanded}"
    >
      <div class="search-options">
        <div>
          <label>
            <input type="radio" name="search" value="metadata" checked>
            Search Metadata
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="search" value="text-contents">
            Search text contents
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="search" value="tv-news-captions">
            Search TV news captions
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="search" value="archived-websites">
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
        display: flex;
        flex-direction: column;
        margin: 0px;
        width: 100%;
        height: 200px;
        font-size: 20px;
        background-color: var(--grey20);
        padding: 10px;
        transform: translate(0px, -1000px);
      }
      .open {
        transform: translate(0px, 0px);
        z-index: 3;
      }
      @keyframes slide-in {
        0% {
          transform: translate(0px, -1000px);
        }
        100% {
          transform: translate(0px, 0px);
        }
      }
      @keyframes slide-out {
        0% {
          transform: translate(0px, 0px);
        }
        100% {
          transform: translate(0px, -1000px);
        }
      }
      .slide-in {
        animation: slide-in 0.5s forwards;
      }
      .slide-out {
        animation: slide-out 0.5s forwards;
      }
      .search-options {
        align-self: center;
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
