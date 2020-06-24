import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import toSentenceCase from './lib/toSentenceCase';
import moreSliderCSS from './styles/more-slider';

class MoreSlider extends TrackedElement {
  static get properties() {
    return {
      config: { type: Object },
      menuItems: { type: Array },
    };
  }

  static get styles() {
    return moreSliderCSS;
  }

  get baseUrl() {
    return `https://${this.config.baseHost}`;
  }

  analyticsEvent(label) {
    return `${this.config.eventCategory}|NavMore${toSentenceCase(label)}`;
  }

  render() {
    return html`
      <ul>
        ${this.menuItems.map(item => html`<li><a @click=${this.trackClick} href="${item.url}" data-event-click-tracking="${this.analyticsEvent(item.label)}">${item.label}</a></li>`)}
      </ul>
    `;
  }
}

customElements.define('more-slider', MoreSlider);
