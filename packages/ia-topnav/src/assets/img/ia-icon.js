import { LitElement, html } from 'https://offshoot.prod.archive.org/lit.js';
import './icons.js';

class IAIcon extends LitElement {
  constructor() {
    super();
    this.icon = '';
  }

  static get properties() {
    return {
      icon: { type: String },
    };
  }

  static get icons() {
    return {
      audio: html`<icon-audio></icon-audio>`,
      ellipses: html`<icon-ellipses></icon-ellipses>`,
      images: html`<icon-images></icon-images>`,
      software: html`<icon-software></icon-software>`,
      texts: html`<icon-texts></icon-texts>`,
      video: html`<icon-video></icon-video>`,
      web: html`<icon-web></icon-web>`,
    };
  }

  render() {
    return IAIcon.icons[this.icon];
  }
}

customElements.define('ia-icon', IAIcon);
