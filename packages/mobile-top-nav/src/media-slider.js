import { LitElement, html } from 'lit-element';
import mediaSliderCss from './css/media-slider';

class MediaSlider extends LitElement {
  static get properties() {
    return {
      mediaSliderOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean },
      links: { type: Array },
    };
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
    return mediaSliderCss();
  }
}

customElements.define('media-slider', MediaSlider);
