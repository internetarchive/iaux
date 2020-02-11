import { LitElement, html, css } from 'lit-element';
import Icon from './icon';

class Search extends Icon {
  static get styles() {
    return css`
      path {
        fill: var(--baseColor);
      }
      .active {
        fill: var(--activeSearchColor);
      }
    `;
  }

  render() {
    return html`
      <svg alt="Search" width="40px" height="40px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path class="${this.active ? 'active' : ''}" d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"/></svg>
    `;
  }
}

customElements.define('search-image', Search);
