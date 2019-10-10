import { LitElement, html, css } from 'lit-element';

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
          <a href="#">My favourites</a>
          <a href="#">My web archive</a>
          <a href="#">Edit settings</a>
          <a href="#">Get help</a>
          <a href="#">Log out</a>
        </div>
      </nav>
    `;
  }

  static get styles() {
    return css`
      .user-menu {
        margin: 0;
        float: right;
        background-color: var(--grey20);
      }
      .user-menu.tx-slide {
        overflow: hidden;
        transition-property: max-height;
        transition-duration: 1.5s;
        transition-timing-function: ease;
      }
      .user-menu.tx-slide.initial,
      .user-menu.tx-slide.closed {
        max-height: 0;
      }
      .user-menu.tx-slide.closed {
        transition-duration: 0.1s;
      }
      .user-menu.tx-slide.open {
        max-height: 100vh;
        max-width: 100vw;
      }
      .user-menu .menu-group {
        min-height: 50vh;
        min-width: 30vw;
        margin: 4% auto;
      }
      .user-menu .menu-group a {
        display: block;
        width: 100%;
        color: var(--primary-text-color);
        text-decoration: none;
        height: 8%;
        padding: 2.5% 5%;
      }
    `;
  }
}

customElements.define('user-menu', UserMenu);
