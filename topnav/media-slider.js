import { LitElement, html, css } from 'lit-element';

class MediaSlider extends LitElement {

  static get properties() {
    return {
    };
  }

  render() {
    return html`
      <div class="information-menu">
      <div class="rounded-rectangle">
    `;
  }

  static get styles() {
    return css`
      .rounded-rectangle {
        position: relative;
        background: #333333;
        border-radius: 10px 0 0 10px;
        padding: 0px;
        width: 60px;
        height: 63px;
        transform: translate(-60px, 10px);
        z-index: 4;
      }

      .information-menu {
        position: relative;
        padding: 0px;
        background: #333333;
        height: 500px;
        width: 100%;
        transform: translate(60px, -500px);
        z-index: 4;
      }
     `;
  }
}

customElements.define('media-slider', MediaSlider);
