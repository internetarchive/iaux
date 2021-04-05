import { html } from 'lit-element';
import { nothing } from 'lit-html';
import TrackedElement from './tracked-element';
import icons from './assets/img/icons';
import './assets/img/hamburger';
import './login-button';
import './nav-search';
import './media-menu';
import logoWordmark from './assets/img/wordmark-narrow-spacing';
import primaryNavCSS from './styles/primary-nav';
import locationHandler from './lib/location-handler';
import formatUrl from './lib/formatUrl';

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
      searchIn: { type: String },
      selectedMenuOption: { type: String },
      signedOutMenuOpen: { type: Boolean },
      userMenuOpen: { type: Boolean },
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
  }

  toggleMediaMenu(e) {
    this.trackClick(e);
    this.dispatchEvent(new CustomEvent('menuToggled', {
      detail: {
        menuName: 'media'
      }
    }));
  }

  toggleSearchMenu(e) {
    this.trackClick(e);
    this.dispatchEvent(new CustomEvent('menuToggled', {
      detail: {
        menuName: 'search'
      }
    }));
  }

  toggleUserMenu(e) {
    this.trackClick(e);
    this.dispatchEvent(new CustomEvent('menuToggled', {
      detail: {
        menuName: 'user'
      }
    }));
  }

  get truncatedScreenName() {
    if (this.config.screenName.length > 10) {
      return `${this.config.screenName.substr(0, 9)}…`;
    }
    return this.config.screenName;
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
          src="${this.mediaBaseHost}/services/img/user/profile?${+new Date()}"
          alt="${this.config.username}"
        />
        <span class="username">${this.truncatedScreenName}</span>
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
      ></nav-search>
    `;
  }

  render() {
    const mediaMenuTabIndex = this.openMenu === 'media' ? '' : '-1';
    return html`
      <nav>
        <a class="link-home" href=${formatUrl('/', this.baseHost)} @click=${this.trackClick} data-event-click-tracking="${this.config.eventCategory}|NavHome">${icons.iaLogo}${logoWordmark}</a>
        ${this.searchMenu}
        <a href="${formatUrl(this.config.uploadURL, this.baseHost)}" class="upload">
          ${icons.upload}
          <span>Upload</span>
        </a>
        <div class="user-info">
          ${this.config.username ? this.userIcon : this.loginIcon}
        </div>
        <media-menu
          .baseHost=${this.baseHost}
          .config=${this.config}
          ?mediaMenuAnimate="${this.mediaMenuAnimate}"
          tabindex="${mediaMenuTabIndex}"
          .selectedMenuOption=${this.selectedMenuOption}
          .openMenu=${this.openMenu}
        ></media-menu>
        <button class="hamburger" @click="${this.toggleMediaMenu}" tabindex="1" data-event-click-tracking="${this.config.eventCategory}|NavHamburger">
          <icon-hamburger ?active=${this.openMenu === 'media'}></icon-hamburger>
        </button>
      </nav>
    `;
  }
}

customElements.define('primary-nav', PrimaryNav);
