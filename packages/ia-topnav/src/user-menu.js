import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import userMenuCSS from './styles/user-menu';

class UserMenu extends TrackedElement {
  static get styles() {
    return userMenuCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      menuItems: { type: Array },
      userMenuAnimate: { type: Boolean },
      userMenuOpen: { type: Boolean },
      username: { type: String },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.menuItems = [];
    this.username = 'USERNAME';
    this.userMenuOpen = false;
    this.userMenuAnimate = false;
  }

  get dropdownItems() {
    return this.menuItems.map(link => (
      html`
        <li><a href="${link.href}" @click=${this.trackClick} data-event-click-tracking="${this.config.eventCategory}|Nav${link.analyticsEvent}">${link.title}</a></li>
      `
    ));
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
        <h3>${this.config.screenName}</h3>
        <ul>
          ${this.dropdownItems}
        </ul>
      </nav>
    `;
  }
}

customElements.define('user-menu', UserMenu);
