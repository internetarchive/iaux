import { LitElement, html } from 'lit-element';
import userMenuCss from './css/user-menu';

class UserMenu extends LitElement {
  static get properties() {
    return {
      userMenuOpen: { type: Boolean },
      userMenuAnimate: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.userMenuOpen = false;
    this.userMenuAnimate = false;
  }

  render() {
    let userMenuClass = 'initial';
    if (this.userMenuOpen) {
      userMenuClass = 'open';
    }
    if (!this.userMenuOpen && this.userMenuAnimate) {
      userMenuClass = 'closed';
    }

    const userMenuHidden = Boolean(!this.userMenuOpen).toString();
    const userMenuExpanded = Boolean(this.userMenuOpen).toString();

    return html`
      <nav
        class="user-menu tx-slide ${userMenuClass}"
        aria-hidden="${userMenuHidden}"
        aria-expanded="${userMenuExpanded}"
      >
        <h3>USERNAME</h3>
        <ul>
          <li><a href="#">Upload</a></li>
          <li><a href="#">My library</a></li>
          <li><a href="#">My loans</a></li>
          <li><a href="#">My favorites</a></li>
          <li><a href="#">My web archive</a></li>
          <li><a href="#">Edit settings</a></li>
          <li><a href="#">Get help</a></li>
          <li><a href="#">Log out</a></li>
        </ul>
      </nav>
    `;
  }

  static get styles() {
    return userMenuCss();
  }
}

customElements.define('user-menu', UserMenu);
