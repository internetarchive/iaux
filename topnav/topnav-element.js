import { LitElement, html, css } from 'lit-element'

class TopnavElement extends LitElement {

  render() {
    return html`
    <!--https://a11y-style-guide.com/style-guide/section-navigation.html give 8px padding-->
    <nav class="navbar">
      <div class="main-menu">
        <button><img src="assets/img/ia-hamburger.svg" alt="Main menu"></button>
      </div>
      <div class="logo">
        <a href="#"><img src="assets/img/ia-logo.svg" alt="Home"></a>
      </div>
      <div class="right">
        <button><img src="assets/img/ia-search.svg" alt="Search"></button>
        <button><img src="assets/img/ia-user.svg" alt="User menu"></button>
      </div>
    </nav>
   `;
  }

  static get styles() {
    return css`
      .navbar {
        display: flex;
        flex-direction: row;
        margin: 0px;
        height: 50px;
        padding: 0 10px;
        background: #000;
        padding: 0;
        list-style: none;
        align-items: center;
      }
      .navbar button {
        background: none;
        color: inherit;
        border: none;
        padding: 10px;
        font: inherit;
        cursor: pointer;
      }
      .main-menu {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        align-items: center;
      }
      .logo {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
      }
      .right {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
      }
    `;
  }
}

customElements.define('topnav-element', TopnavElement);
