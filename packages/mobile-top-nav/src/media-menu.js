import { LitElement, html, css } from 'lit-element';

import './media-slider';
import './assets/img/media-menu-images';

class MediaMenu extends LitElement {
  static get properties() {
    return {
      mediaMenuOpen: { type: Boolean },
      mediaMenuAnimate: { type: Boolean },
      mediaSliderOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.mediaSliderOpen = false;
    this.mediaSliderAnimate = false;
  }

  mediaSlider() {
    // Only keep side menu open until menu closed
    // Shift menu downwards as per button clicked
    this.mediaSliderAnimate = true;
    this.mediaSliderOpen = !this.mediaSliderOpen;
  }

  render() {
    const mediaMenuClass = this.mediaMenuOpen ? 'media-menu open slide-in' : this.mediaMenuAnimate ? 'media-menu slide-out' : 'media-menu';
    const mediaMenuHidden = this.mediaMenuOpen ? 'false' : 'true';
    const mediaMenuExpanded = this.mediaMenuOpen ? 'true' : 'false';
    return html`
    <nav
      class="${mediaMenuClass}"
      aria-hidden="${mediaMenuHidden}"
      aria-expanded="${mediaMenuExpanded}"
    >
      <!-- Include icon and name inline in a button-->
      <div class="grid">
        <button tabindex="-1" @click="${this.mediaSlider}"><div><mediamenu-image type="waybackMachine"></mediamenu-image></div></button>
        <button><div>Wayback Machine</div></button>
        <button tabindex="-1" @click="${this.mediaSlider}"><div><mediamenu-image type="texts"></mediamenu-image></button>
        <button><div>Texts</div></button>
        <button tabindex="-1" @click="${this.mediaSlider}"><div><mediamenu-image type="video"></mediamenu-image></div></button>
        <button><div>Video</div></button>
        <button tabindex="-1" @click="${this.mediaSlider}"><div><mediamenu-image type="audio"></mediamenu-image></div></button>
        <button><div>Audio</div></button>
        <button tabindex="-1" @click="${this.mediaSlider}"><div><mediamenu-image type="software"></mediamenu-image></div></button>
        <button><div>Software</div></button>
        <button tabindex="-1" @click="${this.mediaSlider}"><div><mediamenu-image type="images"></mediamenu-image></div></button>
        <button><div>Images</div></button>
        <button tabindex="-1" @click="${this.mediaSlider}"><div><mediamenu-image type="more"></mediamenu-image></div></button>
        <button><div>More</div></button>
      </div>
    </nav>
    <media-slider ?mediaSliderOpen="${this.mediaSliderOpen}" ?mediaSliderAnimate="${this.mediaSliderAnimate}"></media-slider>
    `;
  }

  static get styles() {
    return css`
      .media-menu {
        width: 100%;
        height: 500px;
        background-color: var(--black);
        color: var(--white);
        margin: 0;
        font-size: 20px;
        font-family: "Helvetica Neue";
        transform: translate(0, -1000px);
      }
      .media-menu button {
        position: relative;
        background: none;
        color: inherit;
        border: none;
        font: inherit;
        cursor: pointer;
        text-align: left;
        z-index: 5;
      }
      .open {
        transform: translate(0, 0);
        z-index: 1;
      }
      @keyframes slide-in {
        0% {
          transform: translate(0, -1000px);
        }
        100% {
          transform: translate(0, 0);
        }
      }
      @keyframes slide-out {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(0, -1000px);
        }
      }
      .slide-in {
        animation: slide-in 0.5s forwards;
      }
      .slide-out {
        animation: slide-out 0.5s forwards;
      }
      .grid {
        padding: 10px;
        display: grid;
        grid-template-columns: 50px 300px;
      }
      .grid div {
        height: 40px;
        padding: 10px;
      }
      a {
        display: inline;
        color: var(--white);
        text-decoration: none;
      }
     `;
  }
}

customElements.define('media-menu', MediaMenu);
