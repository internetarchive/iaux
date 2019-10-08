import { LitElement, html, css } from 'lit-element';

import './media-slider';
import './assets/img/media-menu-images';

class MediaMenu extends LitElement {
  static get properties() {
    return {
      mediaMenuOpen: { type: Boolean },
      mediaMenuAnimate: { type: Boolean },
      mediaSliderOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean },
      tabHeightMultiplier: { type: Number },
    };
  }

  constructor() {
    super();
    this.mediaSliderOpen = false;
    this.mediaSliderAnimate = false;
    this.tabHeightMultiplier = 0;
  }

  updated(changedProperties) {
    const { mediaMenuOpen, mediaSliderOpen } = this;
    const menuClosed =
      changedProperties.has('mediaMenuOpen') &&
      changedProperties.get('mediaMenuOpen') &&
      !mediaMenuOpen;

    if (menuClosed && mediaSliderOpen) {
      this.mediaSliderOpen = false;
      this.mediaSliderAnimate = false;
    }
  }

  mediaSlider(tabMultiplier) {
    // Only keep side menu open until menu closed
    // Shift menu downwards as per button clicked
    if (!this.mediaSliderOpen) {
      this.mediaSliderAnimate = true;
      this.mediaSliderOpen = !this.mediaSliderOpen;
    }
    this.tabHeightMultiplier = tabMultiplier;
  }

  render() {
    let mediaMenuClass = '';
    if (this.mediaMenuOpen) {
      mediaMenuClass = 'open slide-in';
    }
    if (!this.mediaMenuOpen && this.mediaMenuAnimate) {
      mediaMenuClass = 'slide-out';
    }
    const mediaMenuHidden = this.mediaMenuOpen ? 'false' : 'true';
    const mediaMenuExpanded = this.mediaMenuOpen ? 'true' : 'false';
    return html`
      <nav
        class="media-menu ${mediaMenuClass}"
        aria-hidden="${mediaMenuHidden}"
        aria-expanded="${mediaMenuExpanded}"
      >
        <!-- Include icon and name inline in a button-->
        <div class="main-menu">
          <button tabindex="-1" @click="${this.mediaSlider.bind(this, 0)}">
            <span><mediamenu-image type="waybackMachine"></mediamenu-image></span
            ><span>Wayback Machine</span>
          </button>
          <button tabindex="-1" @click="${this.mediaSlider.bind(this, 1)}">
            <span><mediamenu-image type="texts"></mediamenu-image></span><span>Texts</span>
          </button>
          <button tabindex="-1" @click="${this.mediaSlider.bind(this, 2)}">
            <span><mediamenu-image type="video"></mediamenu-image></span><span>Video</span>
          </button>
          <button tabindex="-1" @click="${this.mediaSlider.bind(this, 3)}">
            <span><mediamenu-image type="audio"></mediamenu-image></span><span>Audio</span>
          </button>
          <button tabindex="-1" @click="${this.mediaSlider.bind(this, 4)}">
            <span><mediamenu-image type="software"></mediamenu-image></span><span>Software</span>
          </button>
          <button tabindex="-1" @click="${this.mediaSlider.bind(this, 5)}">
            <span><mediamenu-image type="images"></mediamenu-image></span><span>Images</span>
          </button>
          <button tabindex="-1" @click="${this.mediaSlider.bind(this, 6)}">
            <span><mediamenu-image type="more"></mediamenu-image></span><span>More</span>
          </button>
        </div>
      </nav>
      <media-slider
        ?mediaSliderOpen="${this.mediaSliderOpen}"
        ?mediaSliderAnimate="${this.mediaSliderAnimate}"
        .tabHeightMultiplier="${this.tabHeightMultiplier}"
      ></media-slider>
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
        font-family: 'Helvetica Neue';
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
      .main-menu {
        padding: 10px;
      }
      .main-menu button {
        width: 100%;
        display: block;
        height: 70px;
        padding: 10px;
        outline: none;
      }
      .main-menu button > span {
        padding: 0 10px;
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
