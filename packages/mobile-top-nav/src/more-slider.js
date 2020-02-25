import { LitElement, html, css } from 'lit-element';
import { more as moreMenu } from './data/menus';

class MoreSlider extends LitElement {
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
        padding: 1rem 0;
        margin: 0;
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

  render() {
    return html`
      <ul>
        ${this.menuItems.map(item => html`<li><a href="${item.url}">${item.label}</a></li>`)}
      </ul>
    `;
  }
}

customElements.define('more-slider', MoreSlider);
