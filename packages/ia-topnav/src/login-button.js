import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import icons from './assets/img/icons';
import loginButtonCSS from './styles/login-button';
import './signed-out-dropdown';
import { signedOut as menuItems } from './data/menus';

class LoginButton extends TrackedElement {
  static get styles() {
    return loginButtonCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      dropdownOpen: { type: Boolean },
      dropdownAnimate: { type: Boolean },
      dropdownTabIndex: { type: String },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.dropdownOpen = false;
    this.dropdownAnimate = false;
    this.dropdownTabIndex = '-1';
  }

  get signupPath() {
    return `https://${this.config.baseUrl}/account/signup`;
  }

  get loginPath() {
    return `https://${this.config.baseUrl}/account/login`;
  }

  get analyticsEvent() {
    return `${this.config.eventCategory}|NavLoginIcon`;
  }

  get avatarClass() {
    return `dropdown-toggle${this.dropdownOpen ? ' active' : ''}`;
  }

  toggleDropdown(e) {
    e.preventDefault();
    this.trackClick(e);
    this.dropdownTabIndex = this.dropdownOpen ? '' : '-1';
    this.dispatchEvent(new CustomEvent('signedOutMenu', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <div class="logged-out-toolbar">
        <a
          class="${this.avatarClass}"
          @click=${this.toggleDropdown}
          data-event-click-tracking="${this.analyticsEvent}"
        >
          ${icons.user}
        </a>
        <span>
          <a href="${this.signupPath}">Sign up</a>
          /
          <a href="${this.loginPath}">Log in</a>
        </span>
        <signed-out-dropdown
          .config=${this.config}
          .open=${this.dropdownOpen}
          .animate=${this.dropdownAnimate}
          tabindex="${this.dropdownTabIndex}"
          .menuItems=${menuItems(this.config.baseUrl)}
        ></signed-out-dropdown>
      </div>
    `;
  }
}

customElements.define('login-button', LoginButton);
