import { LitElement, html } from 'lit-element';
import moreCss from './css/more-slider';

class MoreSlider extends LitElement {
  static get styles() {
    return moreCss();
  }

  get menuItems() {
    return [
      { label: 'Donate', url: '/donate/' },
      { label: 'About', url: '/about/' },
    ];
  }

  render() {
    return html`
      <ul>
        ${this.menuItems.map((item) => html`<li><a href="${item.url}">${item.label}</a></li>`)}
      </ul>
    `;
  }
}

customElements.define('more-slider', MoreSlider);
