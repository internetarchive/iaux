import { LitElement, html, css } from 'lit-element';

import './user-menu';
import './search-menu';
import './media-menu';
import './assets/img/hamburger';
import './assets/img/search';
import './assets/img/user';

export default class TopnavElement extends LitElement {
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
    this.userMenuOpen = this.userMenuOpen ? !this.userMenuOpen : this.userMenuOpen;
    this.searchMenuOpen = this.searchMenuOpen ? !this.searchMenuOpen : this.searchMenuOpen;
    this.mediaMenuAnimate = true;
    this.mediaMenuOpen = !this.mediaMenuOpen;
  }

  searchMenu() {
    this.userMenuOpen = this.userMenuOpen ? !this.userMenuOpen : this.userMenuOpen;
    this.mediaMenuOpen = this.mediaMenuOpen ? !this.mediaMenuOpen : this.mediaMenuOpen;
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
    this.searchMenuOpen = this.searchMenuOpen ? !this.searchMenuOpen : this.searchMenuOpen;
    this.mediaMenuOpen = this.mediaMenuOpen ? !this.mediaMenuOpen : this.mediaMenuOpen;
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
    const baseColor = '#999';
    const activeColor = '#fff';
    const hamburgerColour = this.mediaMenuOpen ? activeColor : baseColor;
    const searchGlassColour = this.searchMenuOpen ? '#222' : baseColor;
    const userColour = this.userMenuOpen ? activeColor : baseColor;

    return html`
      <nav class="navbar flex align-center">
        <div class="left flex align-center">
          <button @click="${this.mediaMenu}" tabindex="1">
            <ham-burger colour="${hamburgerColour}"></ham-burger>
          </button>
        </div>
        <div class="center flex align-center ${searchFade} ${searchMenuToggleState}">
          <a class="link-home" href="#"><img src="assets/img/ia-logo.svg" alt="Home"/></a>
          <button class="search" @click="${this.searchMenu}">
            <search-image colour="${searchGlassColour}"></search-image>
          </button>
        </div>
        <!--New div created to replace above one when search is activated-->
        <div class="center search-activated align-center fade-in ${searchMenuOpen}">
          <div class="highlight">
            <input
              type="text"
              class="search-field"
              placeholder="Search Internet Archive"
              required
            />
            <button class="search" @click="${this.searchMenu}">
              <search-image colour="${searchGlassColour}"></search-image>
            </button>
          </div>
        </div>
        <!--End of replacement div-->
        <div class="right flex align-center">
          <button class="user-menu ${userMenuToggle}" @click="${this.userMenu}">
            <user-image colour="${userColour}"></user-image>
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
      ></user-menu>
    `;
  }

  static get styles() {
    return css`
      :host {
        --white: #fff;
        --grey20: #333;
        --grey999: #999;
        --black: #000;
        --link-color: #428bca;
        --primary-text-color: var(--white);
        color: var(--primary-text-color);
        --theme-font-family: 'Helvetica Neue';
        font-size: 1.25rem;
        font-family: var(--theme-font-family);
      }
      button:focus,
      a:focus,
      input:focus {
        outline-color: var(--link-color);
        outline-width: 0.1rem;
        outline-style: auto;
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
        padding: 0 1%;
        background: var(--black);
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
        min-height: 3.75rem;
        max-height: 3.75rem;
      }
      .center .search {
        padding-top: 0;
        margin-right: 1.5%;
      }
      .center .link-home {
        display: block;
        margin: auto;
      }
      .center.search-activated {
        justify-content: center;
        border-radius: 0.6rem 0.6rem 0 0;
        background: var(--grey20);
      }
      .search-activated .highlight,
      .search-activated .search {
        background: var(--white);
        border-radius: 0.6rem;
      }
      .search-activated .highlight {
        display: flex;
        width: 100%;
        margin: 0 1.5%;
      }
      .search-activated .search {
        margin-right: 0;
      }
      .search-activated .search-field {
        width: 100%;
        height: 3rem;
        border-radius: 0.6rem;
        border: none;
        text-align: center;
        font-size: 1.125rem;
      }
      .user-menu {
        padding: 18% 30%;
      }
      .user-menu.active {
        border-radius: 0.6rem 0.6rem 0 0;
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
}

customElements.define('topnav-element', TopnavElement);
