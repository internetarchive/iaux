import { css } from 'lit';
import IAIcon from './ia-icon.js';

class IconDonate extends IAIcon {
  static get styles() {
    return css`
      .fill-color {
        fill: #ff0000;
      }

      .stroke-color {
        stroke: #ff0000;
      }
    `;
  }

  constructor() {
    super();
    this.icon = 'donate';
  }
}

customElements.define('icon-donate', IconDonate);
