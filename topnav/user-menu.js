import { LitElement, html, css } from 'lit-element'

class UserMenu extends LitElement {

  static get properties() {
    return {
      userMenuOpen: { type: Boolean }
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
    <ul
      class="${this.userMenuOpen ? 'user-menu open' : 'user-menu'}"
      aria-hidden="${this.userMenuOpen ? 'false' : 'true'}"
      aria-expanded="${this.userMenuOpen ? 'true' : 'false'}"
    >
      <li><a href="#"><b>USERNAME</b></a></li>
      <li><a href="#">Upload</a></li>
      <li><a href="#">My library</a></li>
      <li><a href="#">My loans</a></li>
      <li><a href="#">My favourites</a></li>
      <li><a href="#">My web archive</a></li>
      <li><a href="#">Edit settings</a></li>
      <li><a href="#">Get help</a></li>
      <li><a href="#">Log out</a></li>
    </ul>
    `;
  }

  static get styles() {
    return css`
      button {
        background: none;
        color: inherit;
        border: none;
        padding: 10px;
        font: inherit;
        cursor: pointer;
      }
      .user-menu {
        margin: 0px;
        float: right;
        width: 150px;
        background-color: #333;
        flex-direction: column;
        padding: 5px 10px;
        animation: slide-out 0.5s backwards;
        transform: translate(0px, -500px) !important;
      }
      .open {
        display: flex;
        animation: slide-in 0.6s forwards;
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
      ul.user-menu {
        list-style: none;
      }
      .user-menu li {
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
