import { LitElement, html, css } from 'lit-element';

class MediaSlider extends LitElement {

  static get properties() {
    return {
      mediaSliderOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean }
    };
  }

  render() {
    const mediaSliderInfoClass = this.mediaSliderOpen ? 'information-menu slide-in' : this.mediaSliderAnimate ? 'information-menu slide-out' : 'information-menu offscreen';
    const mediaSliderRectClass = this.mediaSliderOpen ? 'rounded-rectangle' : 'rounded-rectangle offscreen';
    return html`
      <div class="${mediaSliderInfoClass}">
      <div class="${mediaSliderRectClass}">
    `;
  }

  static get styles() {
    return css`
      .rounded-rectangle {
        position: relative;
        background: var(--grey20);
        border-radius: 10px 0 0 10px;
        padding: 0px;
        width: 60px;
        height: 63px;
        transform: translate(-60px, 199px); /* 10, 73, 136, 199, 262, 325, 388 */
        z-index: 4;
      }

      .information-menu {
        position: relative;
        padding: 0px;
        background: var(--grey20);
        height: 500px;
        width: 100%;
        transform: translate(60px, -500px);
        z-index: 4;
      }

      .offscreen {
        transform: translate(2000px, -500px);
      }

      @keyframes slide-in {
        0% {
          transform: translate(2000px, -500px);
        }
        100% {
          transform: translate(60px, -500px);
        }
      }
      @keyframes slide-out {
        0% {
          transform: translate(60px, -500px);
        }
        100% {
          transform: translate(2000px, -500px);
        }
      }
      .slide-in {
        animation: slide-in 0.5s forwards;
      }
      .slide-out {
        animation: slide-out 0.5s forwards;
      }
     `;
  }
}

customElements.define('media-slider', MediaSlider);
