import { LitElement, html } from 'lit';
import './media-subnav';
import mediaSliderCSS from './styles/media-slider';

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

  get selectedMenuItems() {
    return this.menus[this.selectedMenuOption];
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
                .menu=${this.selectedMenuOption}
                .menuItems=${this.selectedMenuItems}
              ></media-subnav>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('media-slider', MediaSlider);
