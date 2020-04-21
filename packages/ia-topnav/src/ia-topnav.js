import { LitElement, html } from 'lit-element';

import './primary-nav';
import './user-menu';
import './search-menu';
import './media-slider';
import './desktop-subnav';
import './dropdown-menu';
import { user as userMenu } from './data/menus';
import iaTopNavCSS from './styles/ia-topnav';

export default class IATopNav extends LitElement {
  static get styles() {
    return iaTopNavCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      mediaMenuOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean },
      mediaSliderOpen: { type: Boolean },
      searchIn: { type: String },
      searchMenuAnimate: { type: Boolean },
      searchMenuOpen: { type: Boolean },
      selectedMenuOption: { type: String },
      signedOutMenuOpen: { type: Boolean },
      userMenuAnimate: { type: Boolean },
      userMenuOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.mediaMenuOpen = false;
    this.searchIn = '';
    this.searchMenuAnimate = false;
    this.searchMenuOpen = false;
    this.signedOutMenuOpen = false;
    this.userMenuAnimate = false;
    this.userMenuOpen = false;
    this.mediaSliderOpen = false;
    this.mediaSliderAnimate = false;
    this.selectedMenuOption = '';
  }

  updated(changedProperties) {
    const { mediaMenuOpen, mediaSliderOpen } = this;
    const menuClosed = changedProperties.has('mediaMenuOpen')
      && changedProperties.get('mediaMenuOpen')
      && !mediaMenuOpen;

    if (menuClosed && mediaSliderOpen) {
      this.mediaSliderOpen = false;
      this.mediaSliderAnimate = false;
      this.selectedMenuOption = '';
    }
  }

  closeMediaSlider() {
    this.mediaSliderAnimate = true;
    this.mediaSliderOpen = false;
    this.selectedMenuOption = '';
  }

  toggleMediaSlider() {
    if (!this.mediaSliderOpen) {
      this.mediaSliderAnimate = true;
      this.mediaSliderOpen = !this.mediaSliderOpen;
      this.mediaMenuOpen = true;
    }
  }

  mediaMenu() {
    this.userMenuOpen = false;
    this.searchMenuOpen = false;
    this.signedOutMenuOpen = false;
    this.mediaMenuOpen = !this.mediaMenuOpen;
  }

  signedOutMenu() {
    this.userMenuOpen = false;
    this.searchMenuOpen = false;
    this.mediaMenuOpen = false;
    this.signedOutMenuOpen = !this.signedOutMenuOpen;
  }

  searchMenu() {
    this.userMenuOpen = false;
    this.mediaMenuOpen = false;
    this.signedOutMenuOpen = false;
    this.searchMenuAnimate = true;
    this.searchMenuOpen = !this.searchMenuOpen;
  }

  userMenu() {
    this.searchMenuOpen = false;
    this.mediaMenuOpen = false;
    this.signedOutMenuOpen = false;
    this.userMenuAnimate = true;
    this.userMenuOpen = !this.userMenuOpen;
  }

  closeMenus() {
    this.mediaMenuOpen = false;
    this.mediaSliderOpen = false;
    this.searchMenuOpen = false;
    this.signedOutMenuOpen = false;
    this.userMenuOpen = false;
    this.selectedMenuOption = '';
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
    this.toggleMediaSlider();
  }

  get isMenuOpen() {
    return this.mediaMenuOpen
      || this.searchMenuOpen
      || this.userMenuOpen
      || this.mediaSliderOpen
      || this.signedOutMenuOpen;
  }

  render() {
    const searchMenuTabIndex = this.searchMenuOpen ? '' : '-1';
    const userMenuTabIndex = this.userMenuOpen ? '' : '-1';
    const closeLayerVisible = this.isMenuOpen;

    return html`
      <div class='topnav'>
        <primary-nav
          .config=${this.config}
          .mediaMenuOpen=${this.mediaMenuOpen}
          .searchIn=${this.searchIn}
          .searchMenuOpen=${this.searchMenuOpen}
          .selectedMenuOption=${this.selectedMenuOption}
          .signedOutMenuOpen=${this.signedOutMenuOpen}
          .userMenuOpen=${this.userMenuOpen}
          @mediaMenu=${this.mediaMenu}
          @mediaTypeSelected=${this.mediaTypeSelected}
          @searchMenu=${this.searchMenu}
          @signedOutMenu=${this.signedOutMenu}
          @trackClick=${this.trackClick}
          @trackSubmit=${this.trackSubmit}
          @userMenu=${this.userMenu}
        ></primary-nav>
        <media-slider
          .config=${this.config}
          .selectedMenuOption=${this.selectedMenuOption}
          .mediaSliderOpen=${this.mediaSliderOpen}
          .mediaSliderAnimate=${this.mediaSliderAnimate}
        ></media-slider>
        <search-menu
          .config=${this.config}
          .searchMenuOpen=${this.searchMenuOpen}
          .searchMenuAnimate=${this.searchMenuAnimate}
          tabindex="${searchMenuTabIndex}"
          @searchInChanged=${this.searchInChanged}
          @trackClick=${this.trackClick}
          @trackSubmit=${this.trackSubmit}
        ></search-menu>
      </div>
      <desktop-subnav .baseUrl=${this.config.baseUrl}></desktop-subnav>
      <user-menu
        .config=${this.config}
        .open=${this.userMenuOpen}
        .animate=${this.userMenuAnimate}
        tabindex="${userMenuTabIndex}"
        username=${this.config.username}
        .menuItems=${userMenu(this.config.baseUrl, this.config.username)}
        @trackClick=${this.trackClick}
      ></user-menu>
      <div id="close-layer" class="${closeLayerVisible ? 'visible' : ''}" @click=${this.closeMenus}></div>
    `;
  }
}

customElements.define('ia-topnav', IATopNav);
