import { LitElement } from 'lit-element';

class Icon extends LitElement {
  constructor() {
    super();
    this.fill = 'fff';
  }

  static get properties() {
    return {
      fill: { type: String }
    };
  }
}

export default Icon;
