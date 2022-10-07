import { LitElement, html, nothing } from 'https://offshoot.ux.archive.org/lit.js';

import './primary-nav.js';
import './user-menu.js';
import './search-menu.js';
import './media-slider.js';
import './desktop-subnav.js';
import './dropdown-menu.js';
import './signed-out-dropdown.js';
import iaTopNavCSS from './styles/ia-topnav.js';
import { buildTopNavMenus, defaultTopNavConfig } from './data/menus.js';

export default class IATopNav extends LitElement {
  static get styles() {
    return iaTopNavCSS;
  }

  // NOTE:
  // When adding properties, also add them to index.d.ts in the root `ia-topnav` directory
  // so Typescript can find them
  static get properties() {
    return {
      // we default to fully-qualified `https://archive.org` urls in nav, set to false for relatives
      localLinks: Boolean,
      // @see `data/menus.js` for a description:
      waybackPagesArchived: String,
      // the base host is for navigation, so may be empty for relative links
      baseHost: { type: String },
      // the media base host is the base host for images, such as the profile picture
      // which may not be hosted locally
      mediaBaseHost: { type: String },
      config: {
        type: Object,
        converter(value) {
          return JSON.parse(atob(value));
        },
      },
      hideSearch: { type: Boolean },
      mediaSliderOpen: { type: Boolean },
      menus: {
        type: Object,
        converter(value) {
          return JSON.parse(atob(value));
        },
      },
      openMenu: { type: String },
      screenName: { type: String },
      searchIn: { type: String },
      searchQuery: {
        type: String,
        converter(value) {
          return atob(value);
        },
      },
      selectedMenuOption: { type: String },
      username: { type: String },
      userProfileImagePath: { type: String },
      userProfileLastModified: { type: String },
      secondIdentitySlotMode: { type: String },
    };
  }

  constructor() {
    super();
    this.menuSetup();
    this.mediaBaseHost = 'https://archive.org';
    this.userProfileImagePath = '/services/img/user/profile';
    this.userProfileLastModified = '';
    this.config = defaultTopNavConfig;
    this.hideSearch = false;
    this.mediaSliderOpen = false;
    this.openMenu = '';
    this.searchIn = '';
    this.selectedMenuOption = '';
    this.secondIdentitySlotMode = '';
  }

  updated(props) {
    if (props.has('username') || props.has('localLinks') || props.has('baseHost') ||
        props.has('waybackPagesArchived')) {
      this.menuSetup();
    }
  }

  menuSetup() {
    this.localLinks = this.getAttribute('localLinks') !== 'false' && this.getAttribute('localLinks') !== false;
    this.username = this.getAttribute('username')
    this.waybackPagesArchived = this.getAttribute('waybackPagesArchived') ?? ''

    // ensure we update other components that use `baseHost`
    this.baseHost = this.localLinks ? '' : 'https://archive.org';

    // re/build the nav
    this.menus = buildTopNavMenus(this.username, this.localLinks, this.waybackPagesArchived);
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
        ?open=${this.openMenu === 'user'}
        .username=${this.username}
        ?hideSearch=${this.hideSearch}
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
        ?hideSearch=${this.hideSearch}
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

  get allowSecondaryIcon() {
    return this.secondIdentitySlotMode === 'allow';
  }

  get secondLogoSlot() {
    return this.allowSecondaryIcon
      ? html`
          <slot name="opt-sec-logo" slot="opt-sec-logo"></slot>
          <slot name="opt-sec-logo-mobile" slot="opt-sec-logo-mobile"></slot>
        `
      : nothing;
  }

  render() {
    return html`
      <div class="topnav">
        <primary-nav
          .baseHost=${this.baseHost}
          .mediaBaseHost=${this.mediaBaseHost}
          .config=${this.config}
          .openMenu=${this.openMenu}
          .screenName=${this.screenName}
          .searchIn=${this.searchIn}
          .searchQuery=${this.searchQuery}
          .secondIdentitySlotMode=${this.secondIdentitySlotMode}
          .selectedMenuOption=${this.selectedMenuOption}
          .username=${this.username}
          .userProfileImagePath=${this.userProfileImagePath}
          .userProfileLastModified=${this.userProfileLastModified}
          ?hideSearch=${this.hideSearch}
          @mediaTypeSelected=${this.mediaTypeSelected}
          @toggleSearchMenu=${this.toggleSearchMenu}
          @trackClick=${this.trackClick}
          @trackSubmit=${this.trackSubmit}
          @menuToggled=${this.menuToggled}
        >
          ${this.secondLogoSlot}
        </primary-nav>
        <media-slider
          .baseHost=${this.baseHost}
          .config=${this.config}
          .selectedMenuOption=${this.selectedMenuOption}
          .mediaSliderOpen=${this.mediaSliderOpen}
          .menus=${this.menus}
        ></media-slider>
      </div>
      ${this.username ? this.userMenu : this.signedOutDropdown}
      <search-menu
        .baseHost=${this.baseHost}
        .config=${this.config}
        .openMenu=${this.openMenu}
        tabindex="${this.searchMenuTabIndex}"
        ?hideSearch=${this.hideSearch}
        @searchInChanged=${this.searchInChanged}
        @trackClick=${this.trackClick}
        @trackSubmit=${this.trackSubmit}
      ></search-menu>
      <desktop-subnav
        .baseHost=${this.baseHost}
        .menuItems=${this.desktopSubnavMenuItems}
      ></desktop-subnav>
      <div id="close-layer" class="${this.closeLayerClass}" @click=${this.closeMenus}></div>
    `;
  }
}

customElements.define('ia-topnav', IATopNav);
