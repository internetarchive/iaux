import { LitElement, html, css } from 'lit-element'

class UserMenu extends LitElement {

  static get properties() {
    return {
      userMenuOpen: { type: Boolean },
      userMenuAnimate: { type: Boolean }
    };
  }

  render() {
    return html`
    <nav
      class="${this.userMenuOpen ? 'user-menu open slide-in' : this.userMenuAnimate ? 'user-menu slide-out' : 'user-menu'}"
      aria-hidden="${this.userMenuOpen ? 'false' : 'true'}"
      aria-expanded="${this.userMenuOpen ? 'true' : 'false'}"
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
      /**Now, activate animation class on click and send to this componenent. When it is on the add classes for aniation slide-in and slide-out*/
      .user-menu {
        margin: 0px;
        float: right;
        width: 150px;
        background-color: #333;
        padding: 5px 10px;
        transform: translate(0px, -500px);
      }
      .open {
        transform: translate(0px, 0px);
        z-index: 1;
      }
      @keyframes slide-in {
        0% {
          transform: translate(0px, -500px);
        }
        100% {
          transform: translate(0px, 0px);
        }
      }
      @keyframes slide-out {
        0% {
          transform: translate(0px, 0px);
        }
        100% {
          transform: translate(0px, -500px);
        }
      }
      .slide-in {
        animation: slide-in 0.6s forwards;
      }
      .slide-out {
        animation: slide-out 0.6s forwards;
      }
      .user-menu div {
        padding: 10px;
      }
      a {
        font-family: "Helvetica Neue";
        color: #fff;
        text-decoration: none;
      }
     `;
  }
}

customElements.define('user-menu', UserMenu);
