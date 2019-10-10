import { LitElement, html, css } from 'lit-element';

class MediaSlider extends LitElement {
  static get properties() {
    return {
      mediaSliderOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean },
      links: { type: Array },
    };
  }

  constructor() {
    super();
    this.tabHeightPx = 70;
  }

  render() {
    let sliderDetailsClass = 'menu-slider-offscreen';

    if (this.mediaSliderOpen) {
      sliderDetailsClass = 'menu-enter';
    }

    if (!this.mediaSliderOpen && this.mediaSliderAnimate) {
      sliderDetailsClass = 'menu-exit';
    }

    return html`
      <div class="information-menu ${sliderDetailsClass}">
        <div class="info-box">
          <div class="info-box-1">
            <p>Internet archive audio</p>
          </div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .information-menu {
        position: relative;
        padding: 0;
        background: var(--grey20);
        width: 100%;
        z-index: 4;
        height: 100%;
        overflow: hidden;
        position: relative;
        font-size: inherit;
      }

      .menu-slider-offscreen {
        transform: translate(-100%, -100%);
      }

      /* Secondary menu */
      @keyframes menu-enter {
        0% {
          transform: translate(100%, -84%);
        }
        100% {
          transform: translate(8%, -84%);
        }
      }
      @keyframes menu-exit {
        0% {
          transform: translate(8%, -84%);
        }
        100% {
          transform: translate(100%, -84%);
        }
      }
      .menu-enter {
        animation: menu-enter 0.5s forwards;
      }
      .menu-exit {
        animation: menu-exit 0.5s forwards;
      }

      .info-box {
        padding: 1px 20px;
      }

      .info-box-1 {
        font-family: var(--theme-font-family);
        font-size: 20px;
        color: var(--white);
        font-weight: bold;
      }
    `;
  }
}

customElements.define('media-slider', MediaSlider);
