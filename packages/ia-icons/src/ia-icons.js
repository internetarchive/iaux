import { LitElement, html } from 'lit-element';
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
      fill: { type: String },
      stroke: { type: String },
    };
  }

  constructor() {
    super();
    this.icon = '';
    this.fill = '';
    this.stroke = '';
  }

  updated() {
    if (this.fill) {
      this.shadowRoot.querySelectorAll('.fill-color')
        .forEach(el => el.setAttribute('fill', this.fill));
    }
    if (this.stroke) {
      this.shadowRoot.querySelectorAll('.stroke-color')
        .forEach(el => el.setAttribute('stroke', this.stroke));
    }
  }

  render() {
    return iconTemplates[this.icon] || html``;
  }
}

customElements.define('ia-icon', IAIcon);

export default IAIcon;
