import { LitElement, html } from 'lit-element';
import './icons';

class IAIcon extends LitElement {
  constructor() {
    super();
    this.icon = '';
    this.fill = 'fff';
  }

  static get properties() {
    return {
      icon: { type: String },
      fill: { type: String },
    };
  }

  get icons() {
    return {
      audio: html`<icon-audio .fill=${this.fill}></icon>`,
      ellipses: html`<icon-ellipses .fill=${this.fill}></icon>`,
      images: html`<icon-images .fill=${this.fill}></icon>`,
      software: html`<icon-software .fill=${this.fill}></icon>`,
      texts: html`<icon-texts .fill=${this.fill}></icon>`,
      video: html`<icon-video .fill=${this.fill}></icon>`,
      web: html`<icon-web .fill=${this.fill}></icon>`,
    };
  }

  render() {
    return this.icons[this.icon];
  }
}

customElements.define('ia-icon', IAIcon);
