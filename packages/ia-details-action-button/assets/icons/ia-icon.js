import { LitElement, html, css } from 'lit-element';
import email from '@internetarchive/icon-email';
import favorite from '@internetarchive/icon-favorite';
import flag from '@internetarchive/icon-flag';
import share from '@internetarchive/icon-share';

const iconTemplates = {
  email,
  favorite,
  flag,
  share
};

class IAIcon extends LitElement {
  static get properties() {
    return {
      icon: { type: String },
    };
  }

  static get styles() {
    return css`
      svg {
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

  constructor() {
    super();
    this.icon = '';
  }

  render() {
    return iconTemplates[this.icon] || html``;
  }
}

export default IAIcon;
