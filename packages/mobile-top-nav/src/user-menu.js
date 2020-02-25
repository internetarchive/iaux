import { LitElement, html, css } from 'lit-element';

class UserMenu extends LitElement {
  static get styles() {
    return css`
      nav {
        float: right;
        font-size: 1.6rem;
        background-color: var(--grey20);
      }
      nav.tx-slide {
        overflow: hidden;
        transition-property: max-height;
        transition-duration: 0.5s;
        transition-timing-function: ease;
      }
      nav.tx-slide.initial,
      nav.tx-slide.closed {
        max-height: 0;
      }
      nav.tx-slide.closed {
        transition-duration: 0.1s;
      }
      nav.tx-slide.open {
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
    return this.menuItems.map(
      link =>
        html`
          <li><a href="${link.href}">${link.title}</a></li>
        `,
    );
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
