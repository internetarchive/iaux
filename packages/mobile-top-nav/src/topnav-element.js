import { LitElement, html, css } from 'lit-element';

import './user-menu';
import './search-menu';
import './media-menu';
import './assets/img/hamburger';
import './assets/img/search';
import './assets/img/user';
import { user as userMenu } from './data/menus';

export default class TopnavElement extends LitElement {
  static get styles() {
    return css`
      :host {
        --white: #fff;
        --grey13: #222;
        --grey20: #333;
        --grey999: #999;
        --grey80: #ccc;
        --black: #000;
        --link-color: #428bca;
        --primary-text-color: var(--white);
        color: var(--primary-text-color);
        --theme-font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 2rem;
        font-family: var(--theme-font-family);
      }
      button:focus,
      a:focus,
      input:focus {
        outline: none;
      }
      .flex {
        display: flex;
      }
      .search-inactive {
        display: none;
      }
      .align-center {
        align-items: center;
      }
      .navbar {
        position: relative;
        flex-direction: row;
        background: var(--grey13);
        border-bottom: 1px solid var(--grey20);
      }
      .navbar button {
        background: none;
        color: inherit;
        border: none;
        font: inherit;
        cursor: pointer;
      }
      .left {
        justify-content: flex-start;
      }
      .right {
        justify-content: flex-end;
      }
      .center {
        margin: auto 3% auto 1%;
        flex: 1;
        justify-content: space-between;
        min-height: 6rem;
        max-height: 6rem;
      }
      .center .search {
        padding-top: 0;
        margin-right: 1.5%;
      }
      .link-home {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translate(-50%, -50%);
      }
      .link-home img {
        height: 32px;
      }
      .hamburger {
        margin-top: 0.6rem;
      }
      .search-trigger,
      .search-activated {
        position: relative;
        z-index: 2;
      }
      .search-trigger {
        width: 100%;
        text-align: right;
      }
      .search-activated {
        width: 100%;
        padding: 0.5rem 0.2rem;
        border-radius: 1rem 1rem 0 0;
        background: var(--grey20);
      }
      .search-trigger .search {
        margin: 0.4rem 0.1rem 0 0;
        height: 2.8rem;
      }
      .search-activated .highlight,
      .search-activated .search {
        background: var(--white);
        border-radius: 0.5rem;
      }
      .search-activated .highlight {
        display: flex;
        width: 100%;
        margin: 0 1.5%;
      }
      .search-activated .search {
        height: 2.8rem;
        padding: 0;
        margin-right: 0;
      }
      .search-activated search-image {
        position: relative;
        top: -5px;
      }
      .search-activated .search-field {
        width: 100%;
        height: 3rem;
        padding-left: 1rem;
        border-radius: 0.5rem;
        border: none;
        font-size: 1.2rem;
        text-align: center;
      }
      .search-activated .search-field:focus {
        outline: none;
      }
      .user-menu {
        padding: 0.4rem;
      }
      .user-menu.active {
        border-radius: 1rem 1rem 0 0;
        background: var(--grey20);
      }
      @keyframes fade-in {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      .fade-in {
        animation: fade-in 1s forwards;
      }
    `;
  }

  static get properties() {
    return {
      userMenuOpen: { type: Boolean },
      userMenuAnimate: { type: Boolean },
      searchMenuOpen: { type: Boolean },
      searchMenuAnimate: { type: Boolean },
      mediaMenuOpen: { type: Boolean },
      mediaMenuAnimate: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.userMenuOpen = false;
    this.userMenuAnimate = false;
    this.searchMenuOpen = false;
    this.searchMenuAnimate = false;
    this.searchMenuFade = false;
    this.mediaMenuOpen = false;
    this.mediaMenuAnimate = false;
  }

  mediaMenu() {
    this.userMenuOpen = false;
    this.searchMenuOpen = false;
    this.mediaMenuAnimate = true;
    this.mediaMenuOpen = !this.mediaMenuOpen;
  }

  searchMenu() {
    this.userMenuOpen = false;
    this.mediaMenuOpen = false;
    this.searchMenuAnimate = true;
    this.searchMenuFade = true;
    this.searchMenuOpen = !this.searchMenuOpen;
    if (this.searchMenuOpen) {
      window.setTimeout(() => {
        this.shadowRoot.querySelector('.search-field').focus();
      }, 0);
    }
  }

  userMenu() {
    this.searchMenuOpen = false;
    this.mediaMenuOpen = false;
    this.userMenuAnimate = true;
    this.userMenuOpen = !this.userMenuOpen;
  }

  render() {
    const searchFade = this.searchMenuFade ? 'fade-in' : '';
    const searchMenuToggleState = this.searchMenuOpen ? 'search-inactive' : '';
    const searchMenuOpen = this.searchMenuOpen ? 'flex' : 'search-inactive';
    const userMenuToggle = this.userMenuOpen ? 'active' : '';
    const searchMenuTabIndex = this.searchMenuOpen ? '' : '-1';
    const userMenuTabIndex = this.userMenuOpen ? '' : '-1';
    const mediaMenuTabIndex = this.mediaMenuOpen ? '' : '-1';

    return html`
      <nav class="navbar flex align-center">
        <a class="link-home" href="#"><img src="src/assets/img/ia-logo.svg" alt="Home"/></a>
        <div class="left flex align-center">
          <button class="hamburger" @click="${this.mediaMenu}" tabindex="1">
            <icon-hamburger ?active=${this.mediaMenuOpen}></icon-hamburger>
          </button>
        </div>
        <div class="search-trigger ${searchFade} ${searchMenuToggleState}">
          <button class="search" @click="${this.searchMenu}">
            <search-image ?active=${this.searchMenuOpen}></search-image>
          </button>
        </div>
        <!--New div created to replace above one when search is activated-->
        <div class="search-activated fade-in ${searchMenuOpen}">
          <div class="highlight">
            <input
              type="text"
              class="search-field"
              placeholder="Search Internet Archive"
              required
            />
            <button class="search" @click="${this.searchMenu}">
              <search-image ?active=${this.searchMenuOpen}></search-image>
            </button>
          </div>
        </div>
        <!--End of replacement div-->
        <div class="right flex align-center">
          <button class="user-menu ${userMenuToggle}" @click="${this.userMenu}">
            <user-image ?active=${this.userMenuOpen}></user-image>
          </button>
        </div>
      </nav>
      <media-menu
        ?mediaMenuOpen="${this.mediaMenuOpen}"
        ?mediaMenuAnimate="${this.mediaMenuAnimate}"
        tabindex="${mediaMenuTabIndex}"
      ></media-menu>
      <search-menu
        ?searchMenuOpen="${this.searchMenuOpen}"
        ?searchMenuAnimate="${this.searchMenuAnimate}"
        tabindex="${searchMenuTabIndex}"
      ></search-menu>
      <user-menu
        ?userMenuOpen="${this.userMenuOpen}"
        ?userMenuAnimate="${this.userMenuAnimate}"
        tabindex="${userMenuTabIndex}"
        username="shaneriley"
        .menuItems=${userMenu}
      ></user-menu>
    `;
  }
}

customElements.define('topnav-element', TopnavElement);
