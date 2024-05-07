import icon from './index.js';
import { css, LitElement } from 'lit';

class IAIconCollapseSidebar extends LitElement {
  static get styles() {
    return css`
      :host {
        width: var(--iconWidth, 'auto');
        height: var(--iconHeight, 'auto');
      }

      .fill-color {
        fill: var(--iconFillColor);
      }

      .stroke-color {
        stroke: var(--iconStrokeColor);
      }
    `;
  }

  render() {
    return icon;
  }
}

customElements.define('ia-icon-collapse-sidebar', IAIconCollapseSidebar);

export default IAIconCollapseSidebar;
