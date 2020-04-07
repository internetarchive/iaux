import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import icons from './assets/img/icons';
import './assets/img/hamburger';
import './assets/img/search';
import './login-button';
import './nav-search';
import './media-menu';
import logoWordmark from './assets/img/wordmark-narrow-spacing';
import primaryNavCSS from './styles/primary-nav';

class PrimaryNav extends TrackedElement {
  static get styles() {
    return primaryNavCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      mediaMenuOpen: { type: Boolean },
      searchMenuOpen: { type: Boolean },
      selectedMenuOption: { type: String },
      userMenuOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.userMenuOpen = false;
    this.searchMenuOpen = false;
    this.selectedMenuOption = '';
    this.mediaMenuOpen = false;
  }

  mediaMenu(e) {
    this.trackClick(e);
    this.dispatchEvent(new CustomEvent('mediaMenu', {
      bubbles: true,
      composed: true,
    }));
  }

  searchMenu(e) {
    this.trackClick(e);
    this.dispatchEvent(new CustomEvent('searchMenu', {
      bubbles: true,
      composed: true,
    }));
  }

  userMenu(e) {
    this.trackClick(e);
    this.dispatchEvent(new CustomEvent('userMenu', {
      bubbles: true,
      composed: true,
    }));
  }

  get userIcon() {
    const userMenuClass = this.userMenuOpen ? 'active' : '';

    return html`<button class="user-menu ${userMenuClass}" @click="${this.userMenu}" data-event-click-tracking="${this.config.eventCategory}|NavUserMenu">
      <img src="https://archive.org/services/img/user/profile?${+(new Date())}" alt="${this.config.username}" />
      <span class="username">${this.config.username}</span>
    </button>`;
  }

  get loginIcon() {
    return html`<login-button .config=${this.config}></login-button>`;
  }

  render() {
    const mediaMenuTabIndex = this.mediaMenuOpen ? '' : '-1';
    return html`
      <nav>
        <a class="link-home" href="https://${this.config.baseUrl}" @click=${this.trackClick} data-event-click-tracking="${this.config.eventCategory}|NavHome">${icons.iaLogo}${logoWordmark}</a>
        <button class="hamburger" @click="${this.mediaMenu}" tabindex="1" data-event-click-tracking="${this.config.eventCategory}|NavHamburger">
          <icon-hamburger ?active=${this.mediaMenuOpen}></icon-hamburger>
        </button>
        <button class="search-trigger" @click="${this.searchMenu}" data-event-click-tracking="${this.config.eventCategory}|NavSearchOpen">
          <search-image ?active=${this.searchMenuOpen}></search-image>
        </button>
        <nav-search .config=${this.config} .open=${this.searchMenuOpen}></nav-search>
        <a href="https://${this.config.baseUrl}/upload/" class="upload">${icons.upload}Upload</a>
        <div class="user-info">
          ${this.config.username ? this.userIcon : this.loginIcon}
        </div>
        <media-menu
          .config=${this.config}
          ?mediaMenuOpen="${this.mediaMenuOpen}"
          ?mediaMenuAnimate="${this.mediaMenuAnimate}"
          tabindex="${mediaMenuTabIndex}"
          .selectedMenuOption=${this.selectedMenuOption}
        ></media-menu>
      </nav>
    `;
  }
}

customElements.define('primary-nav', PrimaryNav);
