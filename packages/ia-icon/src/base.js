import { css, html, LitElement } from 'https://offshoot.prod.archive.org/lit.js';
import { unsafeHTML } from 'https://offshoot.prod.archive.org/lit/directives/unsafe-html.js';

class IAIconBase extends LitElement {
  constructor(icon) {
    super();
    this.icon = icon;
  }

  static get styles() {
    return css`
      :host {
        width: var(--iconWidth, 'auto');
        height: var(--iconHeight, 'auto');
      }

      .fill-color {
        fill: var(--iconFillColor, 'black');
      }

      .stroke-color {
        stroke: var(--iconStrokeColor, 'black');
      }
    `;
  }

  render() {
    return html`${unsafeHTML(this.icon)}`;
  }
}

export default IAIconBase;
