import { LitElement, html, css } from 'lit-element';

class MediaMenu extends LitElement {

  static get properties() {
    return {
    };
  }

  render() {
    return html`
      <nav
        class="media-menu"
      >
        <div><a href="#">Wayback Machine</a></div>
        <div><a href="#">Texts</a></div>
        <div><a href="#">Video</a></div>
        <div><a href="#">Audio</a></div>
        <div><a href="#">Software</a></div>
        <div><a href="#">Images</a></div>
        <div><a href="#">More</a></div>
      </nav>
    `;
  }

  static get styles() {
    return css`
      .media-menu {
        width: 100%;
        height: 500px;
        background-color: var(--black);
      }
     `;
  }
}

customElements.define('media-menu', MediaMenu);
