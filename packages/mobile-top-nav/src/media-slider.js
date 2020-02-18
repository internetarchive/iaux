import { LitElement, html } from 'lit-element';
import mediaSliderCss from './css/media-slider';
import menus from './data/menus';
import './wayback-search';
import './more-slider';

class MediaSlider extends LitElement {
  constructor() {
    super();
    const defaultLinks = { iconLinks: [], featuredLinks: [], links: [] };

    this.mediaSliderOpen = false;
    this.mediaSliderAnimate = false;
    this.selectedMenuOption = 'texts';

    // Begin properties not monitored by LitElement
    this.links = menus[this.selectedMenuOption] || defaultLinks;
    this.templates = {
      web: () => html`<wayback-search></wayback-search>`,
      more: () => html`<more-slider></more-slider>`,
    };
  }

  static get properties() {
    return {
      mediaSliderOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean },
      selectedMenuOption: { type: String },
    };
  }

  shouldUpdate() {
    if (menus[this.selectedMenuOption]) {
      this.links = menus[this.selectedMenuOption];
    }
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

  renderSubnav() {
    const template = this.templates[this.selectedMenuOption];

    if (template) {
      return template();
    }

    return html`
      <h3>${this.links.heading}</h3>
      <div class="icon-links">
        ${this.renderIconLinks()}
      </div>
      <ul>
        ${this.renderLinks('featuredLinks')}
      </ul>
      <h4>Top</h4>
      <ul>
        ${this.renderLinks('links')}
      </ul>
    `;
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
          ${this.renderSubnav()}
        </div>
      </div>
    `;
  }

  static get styles() {
    return mediaSliderCss();
  }
}

customElements.define('media-slider', MediaSlider);
