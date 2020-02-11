import { LitElement, html } from 'lit-element';
import mediaSliderCss from './css/media-slider';
import menus from './data/menus';

class MediaSlider extends LitElement {
  constructor() {
    super();
    this.mediaSliderOpen = false;
    this.mediaSliderAnimate = false;
    this.selectedMenuOption = 'texts';
    this.links = menus[this.selectedMenuOption];
  }

  static get properties() {
    return {
      mediaSliderOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean },
      selectedMenuOption: { type: String },
    };
  }

  shouldUpdate() {
    const defaults = { iconLinks: [], featuredLinks: [], links: [] };
    this.links = menus[this.selectedMenuOption] || defaults;
    return true;
  }

  renderIconLinks() {
    return this.links.iconLinks.map((link) => (
      html`<a href="${link.url}"><img src="${link.icon}" />${link.title}</a>`
    ));
  }

  renderLinks(category) {
    return this.links[category].map((link) => html`<li><a href="${link.url}">${link.title}</a></li>`);
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
          <h3>${this.links.heading}</h3>
          <div class="icon-links">
            ${this.renderIconLinks()}
          </div>
          <h4>Featured</h4>
          <ul>
            ${this.renderLinks('featuredLinks')}
          </ul>
          <h4>Top</h4>
          <ul>
            ${this.renderLinks('links')}
          </ul>
        </div>
      </div>
    `;
  }

  static get styles() {
    return mediaSliderCss();
  }
}

customElements.define('media-slider', MediaSlider);
