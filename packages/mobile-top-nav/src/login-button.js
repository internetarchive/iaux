import { LitElement, html, css } from 'lit-element';
import './assets/img/user';

class LoginButton extends LitElement {
  static get styles() {
    return css`
      a {
        display: block;
        min-width: 11rem;
        padding: .4rem;
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

  render() {
    return html`
      <a href="${this.href}" data-event-click-tracking="TopNav|LoginIcon">
        <user-image ?active=${this.userMenuOpen}></user-image>
        Sign in
      </a>
    `;
  }
}

customElements.define('login-button', LoginButton);
