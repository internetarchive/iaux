import { LitElement, html, css } from 'lit-element';

export default class HelloComponent extends LitElement {
  static get styles() {
    return css`
      button {
        -webkit-appearance: none;
        appearance: none;
        padding: .5rem 2rem;
        border: none;
        border-radius: 0;
        color: var(--buttonText);
        background: var(--defaultBG);
      }

      .active {
        background: var(--activeBG);
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      toggled: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.name = 'World';
    this.toggled = false;
  }

  get buttonClass() {
    return this.toggled ? 'active' : '';
  }

  toggleColor() {
    this.toggled = !this.toggled;
  }

  render() {
    return html`
      <h1>Hello ${this.name}!</h1>
      <button @click=${this.toggleColor} class="${this.buttonClass}">Toggle my color</button>
    `;
  }
}

customElements.define('hello-component', HelloComponent);
