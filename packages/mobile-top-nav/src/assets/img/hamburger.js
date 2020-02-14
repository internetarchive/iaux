import { LitElement, html, css } from 'lit-element';
import Icon from './icon';

class HamBurger extends Icon {
  static get styles() {
    return css`
      line {
        stroke: var(--baseColor);
      }
      .active line {
        stroke: var(--activeColor);
      }
    `;
  }

  render() {
    return html`
      <svg alt="Main menu" width="24px" height="19px" viewBox="0 0 24 19" xmlns="http://www.w3.org/2000/svg">
        <g stroke-width="3" class="${this.active ? 'active' : ''}">
          <line x1="0" y1="1.5" x2="20" y2="1.5"></line>
          <line x1="0" y1="9.5" x2="20" y2="9.5"></line>
          <line x1="0" y1="17.5" x2="20" y2="17.5"></line>
        </g>
      </svg>
    `;
  }
}

customElements.define('ham-burger', HamBurger);
