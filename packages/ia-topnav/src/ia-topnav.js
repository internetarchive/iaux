import { LitElement, html } from 'lit-element';

import './primary-nav';
import './user-menu';
import './search-menu';
import './media-slider';
import './desktop-subnav';
import { user as userMenu } from './data/menus';
import iaTopNavCSS from './styles/ia-topnav';

export default class IATopNav extends LitElement {
  static get styles() {
    return iaTopNavCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      mediaMenuAnimate: { type: Boolean },
      mediaMenuOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean },
      mediaSliderOpen: { type: Boolean },
      searchMenuAnimate: { type: Boolean },
      searchMenuOpen: { type: Boolean },
      searchSubmitted: { type: Boolean },
      selectedMenuOption: { type: String },
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
    }
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
          .querySelector('primary-nav')
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

  closeMenus() {
    this.mediaMenuOpen = false;
    this.mediaSliderOpen = false;
    this.searchMenuOpen = false;
    this.userMenuOpen = false;
    this.selectedMenuOption = '';
  }

  navSearch(e) {
    this.searchSubmitted = true;
    const { originalEvent, formEl } = e.detail;
    const searchIn = document
      .querySelector('ia-topnav')
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
    return this.mediaMenuOpen || this.searchMenuOpen || this.userMenuOpen || this.mediaSliderOpen;
  }

  render() {
    const searchMenuTabIndex = this.searchMenuOpen ? '' : '-1';
    const userMenuTabIndex = this.userMenuOpen ? '' : '-1';
    const closeLayerVisible = this.isMenuOpen;

    return html`
      <div class='topnav'>
        <primary-nav
          .config=${this.config}
          .selectedMenuOption=${this.selectedMenuOption}
          .mediaMenuOpen="${this.mediaMenuOpen}"
          .searchMenuFade="${this.searchMenuFade}"
          .searchMenuOpen="${this.searchMenuOpen}"
          .userMenuOpen="${this.userMenuOpen}"
          @mediaMenu=${this.mediaMenu}
          @searchMenu=${this.searchMenu}
          @userMenu=${this.userMenu}
          @navSearch=${this.navSearch}
          @trackClick=${this.trackClick}
          @trackSubmit=${this.trackSubmit}
          @mediaTypeSelected=${this.mediaTypeSelected}
        ></primary-nav>
        <media-slider
          .config=${this.config}
          .selectedMenuOption=${this.selectedMenuOption}
          .mediaSliderOpen="${this.mediaSliderOpen}"
          .mediaSliderAnimate="${this.mediaSliderAnimate}"
        ></media-slider>
        <search-menu
          .config=${this.config}
          .searchMenuOpen="${this.searchMenuOpen}"
          .searchMenuAnimate="${this.searchMenuAnimate}"
          tabindex="${searchMenuTabIndex}"
          @trackClick=${this.trackClick}
          @trackSubmit=${this.trackSubmit}
        ></search-menu>
        <user-menu
          .config=${this.config}
          .userMenuOpen="${this.userMenuOpen}"
          .userMenuAnimate="${this.userMenuAnimate}"
          tabindex="${userMenuTabIndex}"
          username=${this.config.username}
          .menuItems=${userMenu(this.config.baseUrl, this.config.username)}
          @trackClick=${this.trackClick}
        ></user-menu>
      </div>
      <desktop-subnav .baseUrl=${this.config.baseUrl}></desktop-subnav>
      <div id="close-layer" class="${closeLayerVisible ? 'visible' : ''}" @click=${this.closeMenus}></div>
    `;
  }
}

customElements.define('ia-topnav', IATopNav);
