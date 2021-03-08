import { LitElement, html } from 'lit-element';

import './primary-nav';
import './user-menu';
import './search-menu';
import './media-slider';
import './desktop-subnav';
import './dropdown-menu';
import './signed-out-dropdown';
import iaTopNavCSS from './styles/ia-topnav';

export default class IATopNav extends LitElement {
  static get styles() {
    return iaTopNavCSS;
  }

  static get properties() {
    return {
      baseHost: { type: String },
      config: {
        type: Object,
        converter(value) {
          return JSON.parse(atob(value));
        }
      },
      mediaSliderOpen: { type: Boolean },
      menus: {
        type: Object,
        converter(value) {
          return JSON.parse(atob(value));
        }
      },
      openMenu: { type: String },
      searchIn: { type: String },
      selectedMenuOption: { type: String },
    };
  }

  constructor() {
    super();
    this.baseHost = 'https://archive.org';
    this.config = {};
    this.mediaSliderOpen = false;
    this.menus = {};
    this.openMenu = '';
    this.searchIn = '';
    this.selectedMenuOption = '';
  }

  menuToggled({ detail }) {
    const currentMenu = this.openMenu;
    this.openMenu = currentMenu === detail.menuName ? '' : detail.menuName;
    // Keeps media slider open if media menu is open
    if (this.openMenu === 'media') {
      return;
    }
    this.closeMediaSlider();
  }

  openMediaSlider() {
    this.mediaSliderOpen = true;
  }

  closeMediaSlider() {
    this.mediaSliderOpen = false;
    this.selectedMenuOption = '';
  }

  closeMenus() {
    this.openMenu = '';
    this.closeMediaSlider();
  }

  searchInChanged(e) {
    this.searchIn = e.detail.searchIn;
  }

  trackClick({ detail }) {
    this.dispatchEvent(new CustomEvent('analyticsClick', {
      bubbles: true,
      composed: true,
      detail,
    }));
  }

  trackSubmit({ detail }) {
    this.dispatchEvent(new CustomEvent('analyticsSubmit', {
      bubbles: true,
      composed: true,
      detail,
    }));
  }

  mediaTypeSelected({ detail }) {
    if (this.selectedMenuOption === detail.mediatype) {
      this.closeMediaSlider();
      return;
    }
    this.selectedMenuOption = detail.mediatype;
    this.openMediaSlider();
  }

  get searchMenuOpened() {
    return this.openMenu === 'search';
  }

  get signedOutOpened() {
    return this.openMenu === 'login';
  }

  get userMenuOpened() {
    return this.openMenu === 'user';
  }

  get searchMenuTabIndex() {
    return this.searchMenuOpened ? '' : '-1';
  }

  get userMenuTabIndex() {
    return this.userMenuOpened ? '' : '-1';
  }

  get signedOutTabIndex() {
    return this.signedOutOpened ? '' : '-1';
  }

  get closeLayerClass() {
    return !!this.openMenu || this.mediaSliderOpen ? 'visible' : '';
  }

  get userMenu() {
    return html`
      <user-menu
        .baseHost=${this.baseHost}
        .config=${this.config}
        .menuItems=${this.userMenuItems}
        .open=${this.openMenu === 'user'}
        .username=${this.config.username}
        tabindex="${this.userMenuTabIndex}"
        @menuToggled=${this.menuToggled}
        @trackClick=${this.trackClick}
      ></user-menu>
    `;
  }

  get signedOutDropdown() {
    return html`
      <signed-out-dropdown
        .baseHost=${this.baseHost}
        .config=${this.config}
        .open=${this.signedOutOpened}
        tabindex="${this.signedOutTabIndex}"
        .menuItems=${this.signedOutMenuItems}
      ></signed-out-dropdown>
    `;
  }

  get signedOutMenuItems() {
    return this.menus.signedOut;
  }

  get userMenuItems() {
    return this.menus.user;
  }

  get desktopSubnavMenuItems() {
    return this.menus.more;
  }

  render() {
    return html`
      <div class='topnav'>
        <primary-nav
          .baseHost=${this.baseHost}
          .config=${this.config}
          .searchIn=${this.searchIn}
          .selectedMenuOption=${this.selectedMenuOption}
          .openMenu=${this.openMenu}
          @mediaTypeSelected=${this.mediaTypeSelected}
          @toggleSearchMenu=${this.toggleSearchMenu}
          @trackClick=${this.trackClick}
          @trackSubmit=${this.trackSubmit}
          @menuToggled=${this.menuToggled}
        ></primary-nav>
        <media-slider
          .baseHost=${this.baseHost}
          .config=${this.config}
          .selectedMenuOption=${this.selectedMenuOption}
          .mediaSliderOpen=${this.mediaSliderOpen}
          .menus=${this.menus}
        ></media-slider>
      </div>
      <desktop-subnav .baseHost=${this.baseHost} .menuItems=${this.desktopSubnavMenuItems}></desktop-subnav>
      <search-menu
        .baseHost=${this.baseHost}
        .config=${this.config}
        .openMenu=${this.openMenu}
        tabindex="${this.searchMenuTabIndex}"
        @searchInChanged=${this.searchInChanged}
        @trackClick=${this.trackClick}
        @trackSubmit=${this.trackSubmit}
      ></search-menu>
      ${this.config.username ? this.userMenu : this.signedOutDropdown}
      <div id="close-layer" class="${this.closeLayerClass}" @click=${this.closeMenus}></div>
    `;
  }
}

customElements.define('ia-topnav', IATopNav);
