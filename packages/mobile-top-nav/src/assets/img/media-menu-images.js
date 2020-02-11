/* eslint-disable */
import { LitElement, html } from 'lit-element';
import * as icons from './icons.js';

class mediaMenuImage extends LitElement {
  static get properties() {
    return {
      type: { type: String },
      fill: { type: String },
    };
  }

  constructor() {
    super();
    this.defaultFill = '#999';
    this.fill = this.defaultFill;
  }

  getFill() {
    const { fill } = this;
    const fillMap = {
      white: '#fff',
    };
    return fillMap[fill] || this.defaultFill;
  }

  render() {
    const fillColor = this.getFill(this.fill);
    return icons[this.type] ? icons[this.type](fillColor) : '';
  }
}

customElements.define('mediamenu-image', mediaMenuImage);
