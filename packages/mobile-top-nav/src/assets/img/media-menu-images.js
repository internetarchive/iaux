/* eslint-disable */
import { LitElement, html } from 'lit-element';
import './ia-icon';

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
    return html`<ia-icon .icon=${this.type} .fill=${this.getFill()}></ia-icon>`
  }
}

customElements.define('mediamenu-image', mediaMenuImage);
