import { LitElement, html, css } from 'lit-element';

class UserMenu extends LitElement {

  static get properties() {
    return {
      userMenuOpen: { type: Boolean },
      userMenuAnimate: { type: Boolean }
    };
  }

  render() {
    const userMenuClass = this.userMenuOpen ? 'user-menu open slide-in' : this.userMenuAnimate ? 'user-menu slide-out' : 'user-menu';
    const userMenuHidden = this.userMenuOpen ? 'false' : 'true';
    const userMenuExpanded = this.userMenuOpen ? 'true' : 'false';
    return html`
    <nav
      class="${userMenuClass}"
      aria-hidden="${userMenuHidden}"
      aria-expanded="${userMenuExpanded}"
    >
      <div><a href="#"><b>USERNAME</b></a></div>
      <div><a href="#">Upload</a></div>
      <div><a href="#">My library</a></div>
      <div><a href="#">My loans</a></div>
      <div><a href="#">My favourites</a></div>
      <div><a href="#">My web archive</a></div>
      <div><a href="#">Edit settings</a></div>
      <div><a href="#">Get help</a></div>
      <div><a href="#">Log out</a></div>
    </nav>
    `;
  }

  static get styles() {
    return css`
      .user-menu {
        margin: 0;
        float: right;
        width: 150px;
        background-color: var(--grey20);
        padding: 5px 10px;
        transform: translate(0, -2000px);
      }
      .open {
        transform: translate(0, -1285px);
        z-index: 1;
      }
      @keyframes slide-in {
        0% {
          transform: translate(0, -2000px);
        }
        100% {
          transform: translate(0, -1285px);
        }
      }
      @keyframes slide-out {
        0% {
          transform: translate(0, -1285px);
        }
        100% {
          transform: translate(0, -2000px);
        }
      }
      .slide-in {
        animation: slide-in 0.5s forwards;
      }
      .slide-out {
        animation: slide-out 0.5s forwards;
      }
      .user-menu div {
        padding: 10px;
      }
      a {
        font-family: "Helvetica Neue";
        color: var(--white);
        text-decoration: none;
      }
     `;
  }
}

customElements.define('user-menu', UserMenu);
