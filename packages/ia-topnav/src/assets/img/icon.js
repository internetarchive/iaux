import { LitElement } from 'lit';

class Icon extends LitElement {
  constructor() {
    super();
    this.fill = 'fff';
    this.active = false;
  }

  static get properties() {
    return {
      fill: { type: String },
      active: { type: Boolean },
    };
  }
}

export default Icon;
