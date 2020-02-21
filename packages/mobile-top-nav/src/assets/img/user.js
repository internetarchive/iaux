import { LitElement, html, css } from 'lit-element';
import Icon from './icon';

class User extends Icon {
  static get styles() {
    return css`
      g {
        fill: var(--baseColor);
      }
      .active {
        fill: var(--activeColor);
      }
    `;
  }

  render() {
    return html`
      <svg height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="m13.7130435 13.0434783c-3.5658385 0-6.45652176-2.9198821-6.45652176-6.52173917 0-3.60185706 2.89068326-6.52173913 6.45652176-6.52173913s6.4565217 2.91988207 6.4565217 6.52173913c0 3.60185707-2.8906832 6.52173917-6.4565217 6.52173917zm-12.9130435 16.9565217c0-7.9240855 5.78136649-14.3478261 12.9130435-14.3478261 7.131677 0 12.9130435 6.4237406 12.9130435 14.3478261z"/><mask id="b" fill="#fff"><use fill="#fff" fill-rule="evenodd" xlink:href="#a"/></mask></defs><g class="${this.active ? 'active' : ''}" fill-rule="evenodd" transform="translate(7 5)"><use xlink:href="#a"/><g mask="url(#b)"><path d="m0 0h30v30h-30z" transform="translate(-1)"/></g></g></svg>
    `;
  }
}

customElements.define('user-image', User);
