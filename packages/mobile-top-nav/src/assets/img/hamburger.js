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
        <g class="${this.active ? 'active' : ''}" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
          <g transform="translate(-9.000000, -11.000000)" stroke="#999999" stroke-width="3">
              <g transform="translate(11.000000, 12.000000)">
                <line x1="0" y1="0.5" x2="20" y2="0.5"></line>
                <line x1="0" y1="8.5" x2="20" y2="8.5"></line>
                <line x1="0" y1="16.5" x2="20" y2="16.5"></line>
              </g>
          </g>
        </g>
      </svg>
    `;
  }
}

customElements.define('ham-burger', HamBurger);
