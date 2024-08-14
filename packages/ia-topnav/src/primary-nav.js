import { html, nothing } from 'https://offshoot.prod.archive.org/lit.js';
import TrackedElement from './tracked-element.js';
import icons from './assets/img/icons.js';
import './assets/img/hamburger.js';
import './login-button.js';
import './nav-search.js';
import './media-menu.js';
import logoWordmarkStacked from './assets/img/wordmark-stacked.js';
import primaryNavCSS from './styles/primary-nav.js';
import locationHandler from './lib/location-handler.js';
import formatUrl from './lib/formatUrl.js';

class PrimaryNav extends TrackedElement {
  static get styles() {
    return primaryNavCSS;
  }

  static get properties() {
    return {
      mediaBaseHost: { type: String },
      baseHost: { type: String },
      hideSearch: { type: Boolean },
      config: { type: Object },
      openMenu: { type: String },
      screenName: { type: String },
      searchIn: { type: String },
      searchQuery: { type: String },
      secondIdentitySlotMode: { type: String },
      selectedMenuOption: { type: String },
      signedOutMenuOpen: { type: Boolean },
      userMenuOpen: { type: Boolean },
      username: { type: String },
      userProfileImagePath: { type: String },
      currentTab: { type: Object },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.openMenu = '';
    this.searchIn = '';
    this.selectedMenuOption = '';
    this.signedOutMenuOpen = false;
    this.userMenuOpen = false;
    this.mediaBaseHost = 'https://archive.org';
    this.secondIdentitySlotMode = '';
    this.currentTab = {};
  }

  toggleMediaMenu(e) {
    this.trackClick(e);
    this.dispatchEvent(
      new CustomEvent('menuToggled', {
        detail: {
          menuName: 'media',
        },
      }),
    );
  }

  toggleSearchMenu(e) {
    this.trackClick(e);
    this.dispatchEvent(
      new CustomEvent('menuToggled', {
        detail: {
          menuName: 'search',
        },
      }),
    );
  }

  toggleUserMenu(e) {
    this.trackClick(e);
    this.dispatchEvent(
      new CustomEvent('menuToggled', {
        detail: {
          menuName: 'user',
        },
      }),
    );
  }

  updated(props) {
    const { currentTab } = this;
    console.log(currentTab)
    const isUserMenuTab = currentTab && currentTab.mediatype === 'usermenu';
    if (props.has('currentTab')) {
      if (isUserMenuTab) {
        console.log('inside-user-menu');
        const focusElement = currentTab.moveTo === 'next'
          ? this.shadowRoot.querySelector('a.upload')
          : this.shadowRoot.querySelector('.user-menu');

        if (focusElement) {
          focusElement.focus();
        }
      } else if (this.currentTab.moveTo === 'next') {
        console.log('inside-media-menu');
        this.shadowRoot.querySelector('.user-menu').focus();
      }
    }
  }

  get userIcon() {
    const userMenuClass = this.openMenu === 'user' ? 'active' : '';
    const userMenuToolTip = this.openMenu === 'user' ? 'Close user menu' : 'Expand user menu';

    return html`
      <button
        class="user-menu ${userMenuClass}"
        title="${userMenuToolTip}"
        @click="${this.toggleUserMenu}"
        data-event-click-tracking="${this.config.eventCategory}|NavUserMenu"
      >
        <img
          src="${this.mediaBaseHost}${this.userProfileImagePath}"
          alt="${this.screenName}"
        />
        <span class="screen-name" dir="auto">${this.screenName}</span>
      </button>
    `;
  }

  get loginIcon() {
    return html`
      <login-button
        .baseHost=${this.baseHost}
        .config=${this.config}
        .dropdownOpen=${this.signedOutMenuOpen}
        .openMenu=${this.openMenu}
        @signedOutMenuToggled=${this.signedOutMenuToggled}
      ></login-button>
    `;
  }

  get searchMenuOpen() {
    return this.openMenu === 'search';
  }

  get allowSecondaryIcon() {
    return this.secondIdentitySlotMode === 'allow';
  }

  get searchMenu() {
    if (this.hideSearch) return nothing;

    return html`
      <button
        class="search-trigger"
        @click="${this.toggleSearchMenu}"
        data-event-click-tracking="${this.config.eventCategory}|NavSearchOpen"
      >
        ${icons.search}
      </button>
      <nav-search
        .baseHost=${this.baseHost}
        .config=${this.config}
        .locationHandler=${locationHandler}
        .open=${this.searchMenuOpen}
        .openMenu=${this.openMenu}
        .searchIn=${this.searchIn}
        .searchQuery=${this.searchQuery}
      ></nav-search>
    `;
  }

  get mobileDonateHeart() {
    return html`
      <a class="mobile-donate-link" href=${formatUrl('/donate/?origin=iawww-mbhrt', this.baseHost)}>
        ${icons.donateUnpadded}
        <span class="sr-only">"Donate to the archive"</span>
      </a>
    `;
  }

  get uploadButtonTemplate() {
    return html`
      <a href="${formatUrl('/create', this.baseHost)}"
        class="upload"
        @focus=${this.toggleMediaMenu}
      >
      ${icons.upload}
      <span>Upload</span>
    </a>`;
  }

  get userStateTemplate() {
    return html`<div class="user-info">
      ${this.username ? this.userIcon : this.loginIcon}
    </div>`;
  }

  get secondLogoSlot() {
    return this.allowSecondaryIcon
      ? html`
          <slot name="opt-sec-logo"></slot>
          <slot name="opt-sec-logo-mobile"></slot>
        `
      : nothing;
  }

  get secondLogoClass() {
    return this.allowSecondaryIcon ? 'second-logo' : '';
  }

  render() {
    const mediaMenuTabIndex = this.openMenu === 'media' ? '' : '-1';
    return html`
      <nav class=${this.hideSearch ? 'hide-search' : nothing}>
        <button
          class="hamburger"
          @click="${this.toggleMediaMenu}"
          data-event-click-tracking="${this.config.eventCategory}|NavHamburger"
          title="Open main menu"
        >
          <icon-hamburger ?active=${this.openMenu === 'media'}></icon-hamburger>
        </button>

        <div class=${`branding ${this.secondLogoClass}`}>
          <a
            href=${formatUrl('/', this.baseHost)}
            @click=${this.trackClick}
            data-event-click-tracking="${this.config.eventCategory}|NavHome"
            title="Go home"
            class="link-home"
            tabindex="-1"
            >${icons.iaLogo}${logoWordmarkStacked}</a
          >
          ${this.secondLogoSlot}
        </div>
        <media-menu
          .baseHost=${this.baseHost}
          .config=${this.config}
          ?mediaMenuAnimate="${this.mediaMenuAnimate}"
          .selectedMenuOption=${this.selectedMenuOption}
          .openMenu=${this.openMenu}
          .currentTab=${this.currentTab}
        ></media-menu>
        <div class="right-side-section">
          ${this.mobileDonateHeart}
          ${this.userStateTemplate}
          ${this.uploadButtonTemplate}
          ${this.searchMenu}
        </div>
      </nav>
    `;
  }
}

customElements.define('primary-nav', PrimaryNav);
