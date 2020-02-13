import { LitElement, html, css } from 'lit-element';
import Icon from './icon';

class User extends Icon {
  static get styles() {
    return css`
      path {
        fill: var(--baseColor);
      }
      .active {
        fill: var(--activeColor);
      }
    `;
  }

  render() {
    return html`
      <svg alt="User" width="27px" height="30px" viewBox="0 0 27 30" xmlns="http://www.w3.org/2000/svg"><path class="${this.active ? 'active' : ''}" d="M14.7130435,13.0434783 C11.147205,13.0434783 8.25652174,10.1235962 8.25652174,6.52173913 C8.25652174,2.91988207 11.147205,0 14.7130435,0 C18.278882,0 21.1695652,2.91988207 21.1695652,6.52173913 C21.1695652,10.1235962 18.278882,13.0434783 14.7130435,13.0434783 Z M1.8,30 C1.8,22.0759145 7.58136649,15.6521739 14.7130435,15.6521739 C21.8447205,15.6521739 27.626087,22.0759145 27.626087,30 L1.8,30 Z"></path></svg>
    `;
  }
}

customElements.define('user-image', User);
