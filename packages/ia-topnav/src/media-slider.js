import { LitElement, html } from 'https://offshoot.prod.archive.org/lit.js';
import './media-subnav.js';
import mediaSliderCSS from './styles/media-slider.js';

class MediaSlider extends LitElement {
  static get styles() {
    return mediaSliderCSS;
  }

  static get properties() {
    return {
      baseHost: { type: String },
      config: { type: Object },
      mediaSliderOpen: { type: Boolean },
      menus: { type: Object },
      selectedMenuOption: { type: String },
    };
  }

  constructor() {
    super();

    this.config = {};
    this.mediaSliderOpen = false;
    this.menus = {};
    this.selectedMenuOption = 'texts';
  }

  shouldUpdate() {
    const scrollPane = this.shadowRoot ? this.shadowRoot.querySelector('.information-menu') : null;

    if (scrollPane) {
      scrollPane.scrollTop = 0;
    }
    return true;
  }


  render() {
    const sliderDetailsClass = this.mediaSliderOpen ? 'open' : 'closed';

    return html`
      <div class="media-slider-container">
        <div class="overflow-clip ${sliderDetailsClass}">
          <div class="information-menu ${sliderDetailsClass}">
            <div class="info-box">
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'audio' ? '' : 'hidden'}"
                menu="audio"
                .menuItems=${this.menus.audio}
              ></media-subnav>
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'images' ? '' : 'hidden'}"
                menu="images"
                .menuItems=${this.menus.images}
              ></media-subnav>
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'software' ? '' : 'hidden'}"
                menu="software"
                .menuItems=${this.menus.software}
              ></media-subnav>
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'texts' ? '' : 'hidden'}"
                menu="texts"
                .menuItems=${this.menus.texts}
              ></media-subnav>
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'video' ? '' : 'hidden'}"
                menu="video"
                .menuItems=${this.menus.video}
              ></media-subnav>
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'web' ? '' : 'hidden'}"
                menu="web"
                .menuItems=${this.menus.web}
              ></media-subnav>
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'more' ? '' : 'hidden'}"
                menu="more"
                .menuItems=${this.menus.more}
              ></media-subnav>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('media-slider', MediaSlider);
