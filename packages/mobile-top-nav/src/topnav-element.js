import { LitElement, html, css } from 'lit-element';

import './mobile-nav';
import './user-menu';
import './search-menu';
import './media-menu';
import './assets/img/hamburger';
import './assets/img/search';
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
      .topnav {
        position: relative;
        z-index: 1;
      }
    `;
  }

  static get properties() {
    return {
      config: { type: Object },
      mediaMenuAnimate: { type: Boolean },
      mediaMenuOpen: { type: Boolean },
      searchMenuAnimate: { type: Boolean },
      searchMenuOpen: { type: Boolean },
      searchSubmitted: { type: Boolean },
      userMenuAnimate: { type: Boolean },
      userMenuOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.mediaMenuAnimate = false;
    this.mediaMenuOpen = false;
    this.searchMenuAnimate = false;
    this.searchMenuFade = false;
    this.searchMenuOpen = false;
    this.searchSubmitted = false;
    this.userMenuAnimate = false;
    this.userMenuOpen = false;
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
        this
          .shadowRoot
          .querySelector('mobile-nav')
          .shadowRoot
          .querySelector('nav-search')
          .shadowRoot
          .querySelector('.search-field').focus();
      }, 0);
    }
  }

  userMenu() {
    this.searchMenuOpen = false;
    this.mediaMenuOpen = false;
    this.userMenuAnimate = true;
    this.userMenuOpen = !this.userMenuOpen;
  }

  navSearch(e) {
    this.searchSubmitted = true;
    const { originalEvent, formEl } = e.detail;
    const searchIn = document
      .querySelector('topnav-element')
      .shadowRoot
      .querySelector('search-menu')
      .shadowRoot
      .querySelector('[name=sin]:checked')
      .value;
    const query = formEl.querySelector('[name=query]').value;
    if (!query) {
      originalEvent.preventDefault();
      this.searchSubmitted = false;
      return false;
    }
    formEl.querySelector('[name=sin]').value = searchIn;
    return true;
  }

  render() {
    const searchMenuTabIndex = this.searchMenuOpen ? '' : '-1';
    const userMenuTabIndex = this.userMenuOpen ? '' : '-1';
    const mediaMenuTabIndex = this.mediaMenuOpen ? '' : '-1';

    return html`
      <div class='topnav'>
        <mobile-nav
          .config=${this.config}
          ?mediaMenuOpen="${this.mediaMenuOpen}"
          ?searchMenuFade="${this.searchMenuFade}"
          ?searchMenuOpen="${this.searchMenuOpen}"
          ?userMenuOpen="${this.userMenuOpen}"
          @mediaMenu=${this.mediaMenu}
          @searchMenu=${this.searchMenu}
          @userMenu=${this.userMenu}
          @navSearch=${this.navSearch}
        ></mobile-nav>
        <media-menu
          .config=${this.config}
          ?mediaMenuOpen="${this.mediaMenuOpen}"
          ?mediaMenuAnimate="${this.mediaMenuAnimate}"
          tabindex="${mediaMenuTabIndex}"
        ></media-menu>
        <search-menu
          .config=${this.config}
          ?searchMenuOpen="${this.searchMenuOpen}"
          ?searchMenuAnimate="${this.searchMenuAnimate}"
          tabindex="${searchMenuTabIndex}"
        ></search-menu>
        <user-menu
          ?userMenuOpen="${this.userMenuOpen}"
          ?userMenuAnimate="${this.userMenuAnimate}"
          tabindex="${userMenuTabIndex}"
          username=${this.config.username}
          .menuItems=${userMenu(this.config.baseUrl, this.config.username)}
        ></user-menu>
      </div>
    `;
  }
}

customElements.define('topnav-element', TopnavElement);
