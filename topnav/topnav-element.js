import { LitElement, html, css } from 'lit-element'

import './user-menu';
import './search-menu';

class TopnavElement extends LitElement {

  static get properties() {
    return {
      userMenuOpen: { type: Boolean },
      userMenuAnimate: { type: Boolean },
      searchMenuOpen: { type: Boolean },
      searchMenuAnimate: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.userMenuOpen = false;
    this.userMenuAnimate = false;
    this.searchMenuOpen = false;
    this.searchMenuAnimate = false;
  }

  userMenu() {
    this.searchMenuOpen = this.searchMenuOpen ? !this.searchMenuOpen : this.searchMenuOpen;
    this.userMenuAnimate = true;
    this.userMenuOpen = !this.userMenuOpen;
  }

  searchMenu() {
    this.userMenuOpen = this.userMenuOpen ? !this.userMenuOpen : this.userMenuOpen;
    this.searchMenuAnimate = true;
    this.searchMenuOpen = !this.searchMenuOpen;
  }

  render() {
    return html`
    <nav class="navbar">
      <div class="main-menu">
        <button><img src="assets/img/ia-hamburger.svg" alt="Main menu"></button>
      </div>
      <div class="logo">
        <a href="#"><img src="assets/img/ia-logo.svg" alt="Home"></a>
      </div>
      <div class="right">
        <button @click="${this.searchMenu}">
          <img src="assets/img/ia-search.svg" alt="Search">
        </button>
        <button class="${this.userMenuOpen ? 'user-menu-active' : ''}" @click="${this.userMenu}">
          <img src="${this.userMenuOpen ? 'assets/img/ia-user-fff.svg' : 'assets/img/ia-user-999.svg'}" alt="User menu">
        </button>
      </div>
    </nav>
    <search-menu ?searchMenuOpen="${this.searchMenuOpen}" ?searchMenuAnimate="${this.searchMenuAnimate}" tabindex="${this.searchMenuOpen ? '' : '-1'}"></search-menu>
    <user-menu ?userMenuOpen="${this.userMenuOpen}" ?userMenuAnimate="${this.userMenuAnimate}" tabindex="${this.userMenuOpen ? '' : '-1'}"></user-menu>
    `;
  }

  static get styles() {
    return css`
      .navbar {
        position: relative;
        display: flex;
        flex-direction: row;
        margin: 0px;
        height: 52px;
        padding: 0 10px;
        background: #000;
        padding: 0;
        list-style: none;
        align-items: center;
        z-index: 2;
      }
      .navbar button {
        background: none;
        color: inherit;
        border: none;
        padding: 4px 8px;
        font: inherit;
        cursor: pointer;
      }
      .main-menu {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        align-items: center;
      }
      .logo {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
      }
      .right {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
      }
      .logo img {
        padding: 6px;
      }
      button.user-menu-active {
        border-radius: 10px 10px 0px 0px;
        background: #333;
      }
      button.user-menu-active g {
          fill: #fff;
      }
    `;
  }
}

customElements.define('topnav-element', TopnavElement);
