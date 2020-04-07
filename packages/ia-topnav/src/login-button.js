import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import './assets/img/user';
import loginButtonCSS from './styles/login-button';

class LoginButton extends TrackedElement {
  static get styles() {
    return loginButtonCSS;
  }

  static get properties() {
    return {
      config: { type: Object }
    };
  }

  constructor() {
    super();
    this.config = {};
  }

  get href() {
    return `https://${this.config.baseUrl}/account/login`;
  }

  get analyticsEvent() {
    return `${this.config.eventCategory}|NavLoginIcon`;
  }

  render() {
    return html`
      <a href="${this.href}" @click=${this.trackClick} data-event-click-tracking="${this.analyticsEvent}">
        <user-image ?active=${this.userMenuOpen}></user-image>
        <span>Sign in</span>
      </a>
    `;
  }
}

customElements.define('login-button', LoginButton);
