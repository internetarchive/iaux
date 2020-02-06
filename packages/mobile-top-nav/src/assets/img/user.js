import { LitElement, html } from 'lit-element';

class User extends LitElement {
  static get properties() {
    return {
      color: { type: String }
    };
  }

  render() {
    return html`
      <svg alt="User menu" width="40px" height="40px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Artboard" transform="translate(-45.000000, -173.000000)" fill="${this.color}">
                  <g id="Person-Icon" transform="translate(45.000000, 173.000000)">
                      <circle id="Oval-3" cx="14" cy="7.89090909" r="7.89090909"></circle>
                      <path d="M14,27.9305935 C14.1458333,27.9305935 18.9142795,28.0867581 28,27.9305935 C28,22.0644996 21.7319865,17.3090909 14,17.3090909 C6.2680135,17.3090909 2.84217094e-14,22.0644996 2.84217094e-14,27.9305935 C9.95084635,27.9305935 13.8541667,27.9305935 14,27.9305935 Z" id="Oval-3-Copy"></path>
                  </g>
              </g>
          </g>
      </svg>
    `;
  }
}

customElements.define('user-image', User);
