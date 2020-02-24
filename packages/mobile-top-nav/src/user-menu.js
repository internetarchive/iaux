import { LitElement, html } from 'lit-element';
import userMenuCss from './css/user-menu';

class UserMenu extends LitElement {
  static get properties() {
    return {
      menuItems: { type: Array },
      username: { type: String },
      userMenuOpen: { type: Boolean },
      userMenuAnimate: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.menuItems = [];
    this.username = 'USERNAME';
    this.userMenuOpen = false;
    this.userMenuAnimate = false;
  }

  get dropdownItems() {
    return this.menuItems.map(link => html`<li><a href="${link.href}">${link.title}</a></li>`);
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
        <h3>${this.username}</h3>
        <ul>
          ${this.dropdownItems}
        </ul>
      </nav>
    `;
  }

  static get styles() {
    return userMenuCss();
  }
}

customElements.define('user-menu', UserMenu);
