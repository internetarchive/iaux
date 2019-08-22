import { LitElement, html, css } from 'lit-element'

class SearchMenu extends LitElement {

  static get properties() {
    return {
      searchMenuOpen: { type: Boolean },
      searchMenuAnimate: { type: Boolean }
    };
  }

  render() {
    return html`
    <nav
      class="${this.searchMenuOpen ? 'search-menu open slide-in' : this.searchMenuAnimate ? 'search-menu slide-out': 'search-menu'}"
      aria-hidden="${this.searchMenuOpen ? 'false' : 'true'}"
      aria-expanded="${this.searchMenuOpen ? 'true' : 'false'}"
    >
      <div class="search-options">
        <div>
          <input type="radio" id="metadata" name="search" value="metadata" checked>
          <label for="metadata">Search Metadata</label>
        </div>
        <div>
          <input type="radio" id="text-contents" name="search" value="text-contents">
          <label for="text-contents">Search text contents</label>
        </div>
        <div>
          <input type="radio" id="tv-news-captions" name="search" value="tv-news-captions">
          <label for="tv-news-captions">Search TV news captions</label>
        </div>
        <div>
          <input type="radio" id="archived-websites" name="search" value="archived-websites">
          <label for="archived-websites">Search archived websites</label>
        </div>
        <div>
          <a href="#">Advanced Search</a>
        </div>
      </div>
    </nav>
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
        background-color: #333;
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
        animation: slide-in 0.2s forwards;
      }
      .slide-out {
        animation: slide-out 0.2s forwards;
      }
      .search-options {
        align-self: center;
      }
      .search-options div {
        padding: 8px;
        color: #fff;
        font-family: "Helvetica Neue";
      }
      .search-options a {
        color: #428bca;
        text-decoration: none;
      }
     `;
  }
}

customElements.define('search-menu', SearchMenu);
