import { LitElement, html } from 'lit-element';
import mediaSliderCss from './css/media-slider';
import './media-subnav';

class MediaSlider extends LitElement {
  constructor() {
    super();

    this.mediaSliderOpen = false;
    this.mediaSliderAnimate = false;
    this.selectedMenuOption = 'texts';
  }

  static get properties() {
    return {
      mediaSliderOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean },
      selectedMenuOption: { type: String },
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
          <media-subnav .menu=${this.selectedMenuOption}></media-subnav>
        </div>
      </div>
    `;
  }

  static get styles() {
    return mediaSliderCss();
  }
}

customElements.define('media-slider', MediaSlider);
