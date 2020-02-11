import { LitElement } from 'lit-element';

class Icon extends LitElement {
  constructor() {
    super();
    this.active = false;
  }

  static get properties() {
    return {
      active: { type: Boolean }
    };
  }
}

export default Icon;
