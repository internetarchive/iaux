import { LitElement, html, css } from 'lit-element';

class UserMenu extends LitElement {
  static get styles() {
    return css`
      :host {
        --topOffset: -70vh;
      }
      nav {
        position: absolute;
        top: var(--topOffset);
        right: 0;
        z-index: -1;
        font-size: 1.6rem;
        background-color: var(--grey20);
      }
      nav.tx-slide {
        overflow: hidden;
        transition-property: top;
        transition-duration: 0.5s;
        transition-timing-function: ease;
      }
      nav.tx-slide.initial,
      nav.tx-slide.closed {
        top: var(--topOffset);
      }
      nav.tx-slide.closed {
        transition-duration: 0.1s;
      }
      nav.tx-slide.open {
        top: 100%;
        max-height: 100vh;
        max-width: 100vw;
      }
      h3 {
        padding: 0.6rem 2rem;
        margin: 0;
        font-size: inherit;
      }
      ul {
        padding: 0.4rem 0 0.7rem 0;
        margin: 0;
      }
      a {
        display: block;
        color: var(--primary-text-color);
        text-decoration: none;
        padding: 1rem 2rem;
      }
    `;
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
        <li><a href="${link.href}" data-event-click-tracking="${this.config.eventCategory}|Nav${link.analyticsEvent}">${link.title}</a></li>
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
        <h3>${this.username}</h3>
        <ul>
          ${this.dropdownItems}
        </ul>
      </nav>
    `;
  }
}

customElements.define('user-menu', UserMenu);
