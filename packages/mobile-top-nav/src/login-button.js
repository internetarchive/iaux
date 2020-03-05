import { html, css } from 'lit-element';
import TrackedElement from './tracked-element';
import './assets/img/user';

class LoginButton extends TrackedElement {
  static get styles() {
    return css`
      a {
        display: block;
        font-size: 1.6rem;
        text-transform: uppercase;
        text-decoration: none;
        color: var(--grey80);
      }
    `;
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
      </a>
    `;
  }
}

customElements.define('login-button', LoginButton);
