import { html, css } from 'lit-element';
import TrackedElement from './tracked-element';
import { more as moreMenu } from './data/menus';
import toSnakeCase from './lib/toSnakeCase';

class MoreSlider extends TrackedElement {
  static get properties() {
    return {
      config: { type: Object }
    };
  }

  get menuItems() {
    return moreMenu(this.config.baseUrl);
  }

  static get styles() {
    return css`
      ul {
        padding: 0;
        margin: -1rem 0 0 0;
        list-style: none;
      }
      a {
        display: block;
        padding: 1rem 0;
        text-decoration: none;
        color: var(--activeColor);
      }
    `;
  }

  get baseUrl() {
    return `https://${this.config.baseUrl}`;
  }

  analyticsEvent(label) {
    return `${this.config.eventCategory}|NavMore${toSnakeCase(label)}`;
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
