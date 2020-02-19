import { html, LitElement } from 'lit-element';
import Icon from './icon';

class IconEllipses extends Icon {
  render() {
    return html`
      <svg width="24px" height="6px" viewBox="0 0 24 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>ellipses</title>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-10.000000, -323.000000)" fill="${this.fill}">
            <g transform="translate(10.000000, 323.000000)">
              <circle cx="2.76923077" cy="2.76923077" r="2.76923077"></circle>
              <circle cx="12" cy="2.76923077" r="2.76923077"></circle>
              <circle cx="21.2307692" cy="2.76923077" r="2.76923077"></circle>
            </g>
          </g>
        </g>
      </svg>
    `;
  }
}

customElements.define('icon-ellipses', IconEllipses);
