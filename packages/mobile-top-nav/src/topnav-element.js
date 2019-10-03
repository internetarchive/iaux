import { LitElement, html, css } from 'lit-element';

import './user-menu';
import './search-menu';
import './media-menu';
import './assets/img/hamburger';
import './assets/img/search';
import './assets/img/user';

class TopnavElement extends LitElement {
  static get properties() {
    return {
      userMenuOpen: { type: Boolean },
      userMenuAnimate: { type: Boolean },
      searchMenuOpen: { type: Boolean },
      searchMenuAnimate: { type: Boolean },
      mediaMenuOpen: { type: Boolean },
      mediaMenuAnimate: { type: Boolean }
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
        this.shadowRoot.getElementById('search-field').focus();
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
    const centerClass = this.searchMenuFade ? 'center fade-in' : 'center';
    const centerStyle = this.searchMenuOpen ? 'display: none' : 'display: flex';
    const centerActivatedStyle = this.searchMenuOpen ? 'display: flex' : 'display: none';
    const userButtonClass = this.userMenuOpen ? 'user-menu-active' : '';
    const searchMenuTabIndex = this.searchMenuOpen ? '' : '-1';
    const userMenuTabIndex = this.userMenuOpen ? '' : '-1';
    const mediaMenuTabIndex = this.mediaMenuOpen ? '' : '-1';
    const hamburgerColour = this.mediaMenuOpen ? '#fff' : '#999';
    const searchGlassColour = this.searchMenuOpen ? '#222' : '#999';
    const userColour = this.userMenuOpen ? '#fff' : '#999';
    return html`
    <nav class="navbar">
      <div class="left">
        <button @click="${this.mediaMenu}"><ham-burger colour="${hamburgerColour}"></ham-burger></button>
      </div>
      <div class="${centerClass}" style="${centerStyle}">
        <button style="padding: 17px 24px;" tabindex="-1" aria-hidden="true">&nbsp;</button> <!--Fake element for alignment purposes-->
        <a href="#"><img src="assets/img/ia-logo.svg" alt="Home"></a>
        <button class="search" @click="${this.searchMenu}">
          <search-image colour="${searchGlassColour}"></search-image>
        </button>
      </div>
      <!--New div created to replace above one when search is activated-->
      <div class="center-search-activated fade-in" style="${centerActivatedStyle}">
        <div class="fake-box">
          <input type="text" id="search-field" placeholder="Search Internet Archive" required>
          <button class="search" @click="${this.searchMenu}">
            <search-image colour="${searchGlassColour}"></search-image>
          </button>
        </div>
      </div>
      <!--End of replacement div-->
      <div class="right">
        <button class="${userButtonClass}" @click="${this.userMenu}">
          <user-image colour="${userColour}"></user-image>
        </button>
      </div>
    </nav>
    <media-menu ?mediaMenuOpen="${this.mediaMenuOpen}" ?mediaMenuAnimate="${this.mediaMenuAnimate}" tabindex="${mediaMenuTabIndex}"></media-menu>
    <search-menu ?searchMenuOpen="${this.searchMenuOpen}" ?searchMenuAnimate="${this.searchMenuAnimate}" tabindex="${searchMenuTabIndex}"></search-menu>
    <user-menu ?userMenuOpen="${this.userMenuOpen}" ?userMenuAnimate="${this.userMenuAnimate}" tabindex="${userMenuTabIndex}"></user-menu>
    `;
  }

  static get styles() {
    return css`
      :host {
        --white: #fff;
        --grey20: #333;
        --black: #000;
        --theme-font-family: "Helvetica Neue";
        --link-color: #428bca;
      }
      .navbar {
        position: relative;
        display: flex;
        flex-direction: row;
        margin: 0;
        height: 52px;
        padding: 0 10px;
        background: var(--black);
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
        border-radius: 10px 10px 0 0;
        background: var(--grey20);
      }
      .center-search-activated {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        border-radius: 10px 10px 0 0;
        background: var(--grey20);
        padding: 6px 8px;
      }
      .center-search-activated .fake-box{
        background: var(--white);
        border-radius: 10px;
        display: flex;
        width: 100%;
        height: 40px;
        padding: 0px;
      }
      .center-search-activated .search{
        background: var(--white);
        height: 40px;
        border-radius: 10px;
        padding: 0 0 2px 0px;
      }
      #search-field {
        width: 100%;
        height: 38px;
        border-radius: 10px;
        border: none;
        outline: none;
        text-align: center;
        font-size: 18px;
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
