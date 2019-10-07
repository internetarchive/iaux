import { LitElement, html, css } from 'lit-element';

class MediaSlider extends LitElement {
  static get properties() {
    return {
      mediaSliderOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean },
      links: { type: Array },
      tabHeightMultiplier: { type: Number },
    };
  }

  constructor() {
    super();
    this.tabHeightPx = 70;
  }

  render() {
    let sliderDetailsClass = 'offscreen';
    let tabClass = 'offscreen';

    if (this.mediaSliderOpen) {
      sliderDetailsClass = 'im-slide-in';
      tabClass = 'rr-slide-in';
    }

    if (!this.mediaSliderOpen && this.mediaSliderAnimate) {
      sliderDetailsClass = 'im-slide-out';
      tabClass = 'rr-slide-out';
    }

    const tabTopStyle = `${Math.round(this.tabHeightPx * this.tabHeightMultiplier)}px`;
    return html`
      <div class="information-menu ${sliderDetailsClass}">
        <div class="info-box">
          <div class="info-box-1">
            <p>Internet archive audio</p>
          </div>
        </div>
      </div>
      <div class="rounded-rectangle ${tabClass}" style="top:${tabTopStyle}"></div>
    `;
  }

  static get styles() {
    return css`
      .rounded-rectangle {
        position: relative;
        background: var(--grey20);
        border-radius: 10px 0 0 10px;
        padding: 0;
        width: 60px;
        height: 63px;
        translate(0, -990px); /* 0, 63, 126, 189, 252, 315, 378 */
        z-index: 4;
      }

      .information-menu {
        position: relative;
        padding: 0;
        background: var(--grey20);
        height: 500px;
        width: 100%;
        transform: translate(60px, -500px);
        z-index: 4;
      }

      .offscreen {
        transform: translate(2000px, -500px);
      }

      /* Information box */

      @keyframes im-slide-in {
        0% {
          transform: translate(2000px, -500px);
        }
        100% {
          transform: translate(60px, -500px);
        }
      }
      @keyframes im-slide-out {
        0% {
          transform: translate(60px, -500px);
        }
        100% {
          transform: translate(2000px, -500px);
        }
      }
      .im-slide-in {
        animation: im-slide-in 0.5s forwards;
      }
      .im-slide-out {
        animation: im-slide-out 0.5s forwards;
      }

      /* Rounded rectangle */

      @keyframes rr-slide-in {
        0% {
          transform: translate(2000px, -990px);
        }
        100% {
          transform: translate(0, -990px);
        }
      }
      @keyframes rr-slide-out {
        0% {
          transform: translate(0, -990px);
        }
        100% {
          transform: translate(2000px, -990px);
        }
      }
      .rr-slide-in {
        animation: rr-slide-in 0.5s forwards;
      }
      .rr-slide-out {
        animation: rr-slide-out 0.5s forwards;
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
