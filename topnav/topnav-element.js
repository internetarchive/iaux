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
      <div class="left">
        <button><img src="assets/img/ia-hamburger.svg" alt="Main menu"></button>
      </div>
      <div class="center" style="display: none">
        <button style="padding: 17px 24px;" tabindex="-1" aria-hidden="true">&nbsp;</button> <!--Fake element for alignment purposes-->
        <a href="#"><img src="assets/img/ia-logo-99.svg" alt="Home"></a>
        <button class="search" @click="${this.searchMenu}">
          <img src="assets/img/ia-search.svg" alt="Search">
        </button>
      </div>
      <!--New div created to replace above one when search is activated-->
      <div class="center-search-activated">
        <div class="fake-box">
          <input type="text" id="search-field" placeholder="Search Internet Archive" required>
          <button class="search" @click="${this.searchMenu}">
            <img src="assets/img/ia-search-222.svg" alt="Search">
          </button>
        </div>
      </div>
      <!--End of replacement div-->
      <div class="right">
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
      .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .center {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
      }
      .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .center img {
        /*padding: 6px;*/
      }
      button.user-menu-active {
        border-radius: 10px 10px 0px 0px;
        background: #333;
      }
      .center-search-activated {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        border-radius: 10px 10px 0px 0px;
        background: #333;
        padding: 8px;
      }
      .center-search-activated .fake-box{
        background: #fff;
        border-radius: 10px;
        display: flex;
        width: 100%;
      }
      .center-search-activated .search{
        background: #fff;
        height: 36px;
        border-radius: 10px;
      }
      #search-field {
        width: 95%;
        height: 34px;
        border-radius: 10px;
        border: none;
        outline: none;
        font: "Helvetica-Neue";
        text-align: center;
        font-size: 18px;
      }
    `;
  }
}

customElements.define('topnav-element', TopnavElement);
