import { LitElement, html } from 'lit-element';

import './user-menu';
import './search-menu';
import './media-menu';
import './assets/img/hamburger';
import './assets/img/search';
import './assets/img/user';
import topnavCss from './css/topnav-element';

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
      ></user-menu>
    `;
  }

  static get styles() {
    return topnavCss();
  }
}

customElements.define('topnav-element', TopnavElement);
