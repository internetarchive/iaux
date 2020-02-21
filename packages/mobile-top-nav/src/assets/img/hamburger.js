import { LitElement, html, css } from 'lit-element';
import Icon from './icon';

class HamBurger extends Icon {
  static get styles() {
    return css`
      path {
        stroke: var(--baseColor);
      }
      .active path {
        stroke: var(--activeColor);
      }
    `;
  }

  render() {
    return html`
      <svg class="${this.active ? 'active' : ''}" height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-width="3"><path d="m10 12.5h20"/><path d="m10 20.5h20"/><path d="m10 28.5h20"/></g></svg>
    `;
  }
}

customElements.define('icon-hamburger', HamBurger);
