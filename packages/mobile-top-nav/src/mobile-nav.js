import { LitElement, html, css } from 'lit-element';
import icons from './assets/img/icons';
import './assets/img/hamburger';
import './assets/img/search';
import './login-button';
import './nav-search';

class MobileNav extends LitElement {
  static get styles() {
    return css`
      button:focus,
      a:focus,
      input:focus {
        outline: none;
      }
      nav {
        position: relative;
        display: grid;
        height: 4rem;
        grid-template-areas: "hamburger empty search user";
        grid-template-columns: 4rem auto 4.3rem 5rem;
        background: var(--grey13);
        border-bottom: 1px solid var(--grey20);
      }
      button {
        background: none;
        color: inherit;
        border: none;
        font: inherit;
        cursor: pointer;
      }
      .link-home {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        transform: translate(-50%, -50%);
      }
      .link-home svg {
        display: block;
      }
      .hamburger {
        grid-area: hamburger;
        padding: 0;
      }
      .search-trigger {
        grid-area: search;
        position: relative;
        padding: 0;
        z-index: 1;
        align-items: center;
      }
      .search-activated {
        position: relative;
        z-index: 3;
      }
      .search-trigger {
        width: 100%;
        text-align: right;
      }
      .user-info {
        grid-area: user;
        align-self: stretch;
        justify-self: end;
      }
      .user-menu {
        height: 100%;
        padding: .5rem 1rem;
      }
      .user-menu.active {
        border-radius: 1rem 1rem 0 0;
        background: var(--grey20);
      }
      .user-menu img {
        display: block;
        width: 30px;
        height: 30px;
      }
    `;
  }

  static get properties() {
    return {
      config: { type: Object },
      mediaMenuOpen: { type: Boolean },
      searchMenuOpen: { type: Boolean },
      userMenuOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.userMenuOpen = false;
    this.searchMenuOpen = false;
    this.mediaMenuOpen = false;
  }

  mediaMenu() {
    this.dispatchEvent(new CustomEvent('mediaMenu', {
      bubbles: true,
      composed: true,
    }));
  }

  searchMenu() {
    this.dispatchEvent(new CustomEvent('searchMenu', {
      bubbles: true,
      composed: true,
    }));
  }

  userMenu() {
    this.dispatchEvent(new CustomEvent('userMenu', {
      bubbles: true,
      composed: true,
    }));
  }

  get userIcon() {
    const userMenuClass = this.userMenuOpen ? 'active' : '';

    return html`<button class="user-menu ${userMenuClass}" @click="${this.userMenu}" data-event-click-tracking="${this.config.eventCategory}|NavUserMenu">
      <img src="https://archive.org/services/img/user/profile?${+(new Date())}" alt="${this.config.username}" />
    </button>`;
  }

  get loginIcon() {
    return html`<login-button .config=${this.config}></login-button>`;
  }

  render() {
    return html`
      <nav>
        <a class="link-home" href="https://${this.config.baseUrl}" data-event-click-tracking="${this.config.eventCategory}|NavHome">${icons.iaLogo}</a>
        <button class="hamburger" @click="${this.mediaMenu}" tabindex="1" data-event-click-tracking="${this.config.eventCategory}|NavHamburger">
          <icon-hamburger ?active=${this.mediaMenuOpen}></icon-hamburger>
        </button>
        <button class="search-trigger" @click="${this.searchMenu}" data-event-click-tracking="${this.config.eventCategory}|NavSearchOpen">
          <search-image ?active=${this.searchMenuOpen}></search-image>
        </button>
        <nav-search .config=${this.config} .open=${this.searchMenuOpen}></nav-search>
        <div class="user-info">
          ${this.config.username ? this.userIcon : this.loginIcon}
        </div>
      </nav>
    `;
  }
}

customElements.define('mobile-nav', MobileNav);
