import { html } from 'lit';
import TrackedElement from './tracked-element';
import icons from './assets/img/icons';
import loginButtonCSS from './styles/login-button';
import formatUrl from './lib/format-url';
import { makeBooleanString } from './lib/make-boolean-string';
import { customElement, property, state } from 'lit/decorators.js';
import { IATopNavConfig } from './models';
import { defaultTopNavConfig } from './data/menus';

@customElement('login-button')
export class LoginButton extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: String }) openMenu = '';

  @state() private dropdownTabIndex = '';

  static get styles() {
    return loginButtonCSS;
  }

  get signupPath() {
    return formatUrl('/account/signup', this.baseHost);
  }

  get loginPath() {
    return formatUrl('/login', this.baseHost);
  }

  get analyticsEvent() {
    return `${this.config?.eventCategory}|NavLoginIcon`;
  }

  get menuOpened(): boolean {
    return this.openMenu === 'login';
  }

  get avatarClass() {
    return `dropdown-toggle${this.menuOpened ? ' active' : ''}`;
  }

  toggleDropdown(e: Event) {
    e.preventDefault();
    this.trackClick(e);
    this.dropdownTabIndex = this.menuOpened ? '' : '-1';
    this.dispatchEvent(
      new CustomEvent('menuToggled', {
        bubbles: true,
        composed: true,
        detail: {
          menuName: 'login',
        },
      }),
    );
  }

  render() {
    return html`
      <div class="logged-out-toolbar">
        <button
          class="logged-out-menu ${this.avatarClass}"
          @click=${this.toggleDropdown}
          data-event-click-tracking="${this.analyticsEvent}"
          aria-label="Toggle login menu"
          aria-expanded="${makeBooleanString(this.menuOpened)}"
        >
          ${icons.user}
        </button>
        <span>
          <a href="${this.signupPath}">Sign up</a>
          |
          <a href="${this.loginPath}">Log in</a>
        </span>
      </div>
    `;
  }
}
