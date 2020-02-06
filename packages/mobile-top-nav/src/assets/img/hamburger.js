import { LitElement, html } from 'lit-element';

class HamBurger extends LitElement {
  static get properties() {
    return {
      color: { type: String }
    };
  }

  render() {
    return html`
      <svg alt="Main menu" height="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="${this.color}" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/>
      </svg>
    `;
  }
}

customElements.define('ham-burger', HamBurger);
