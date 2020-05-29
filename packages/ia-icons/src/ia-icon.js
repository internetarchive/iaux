import { LitElement, html, css } from 'lit-element';
import advance from './icons/advance';
import audio from './icons/audio';
import close from './icons/close';
import donate from './icons/donate';
import ellipses from './icons/ellipses';
import iaLogo from './icons/ia-logo';
import images from './icons/images';
import search from './icons/search';
import software from './icons/software';
import texts from './icons/texts';
import upload from './icons/upload';
import user from './icons/user';
import video from './icons/video';
import web from './icons/web';

const iconTemplates = {
  advance,
  audio,
  close,
  donate,
  ellipses,
  iaLogo,
  images,
  search,
  software,
  texts,
  upload,
  user,
  video,
  web,
};

class IAIcon extends LitElement {
  static get properties() {
    return {
      icon: { type: String },
    };
  }

  static get styles() {
    return css`
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

customElements.define('ia-icon', IAIcon);

export default IAIcon;
