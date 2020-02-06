import { LitElement, html } from 'lit-element';
import userMenuCss from './css/user-menu';

class UserMenu extends LitElement {
  static get properties() {
    return {
      userMenuOpen: { type: Boolean },
      userMenuAnimate: { type: Boolean },
    };
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
        <div class="menu-group">
          <a href="#"><b>USERNAME</b></a>
          <a href="#">Upload</a>
          <a href="#">My library</a>
          <a href="#">My loans</a>
          <a href="#">My favorites</a>
          <a href="#">My web archive</a>
          <a href="#">Edit settings</a>
          <a href="#">Get help</a>
          <a href="#">Log out</a>
        </div>
      </nav>
    `;
  }

  static get styles() {
    return userMenuCss();
  }
}

customElements.define('user-menu', UserMenu);
