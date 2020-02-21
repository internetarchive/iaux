import { html, LitElement } from 'lit-element';
import Icon from './icon';

class IconEllipses extends Icon {
  render() {
    return html`
      <svg height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg"><g fill="${this.fill}" fill-rule="evenodd"><circle cx="10.769231" cy="19.769231" r="2.769231"/><circle cx="20" cy="19.769231" r="2.769231"/><circle cx="29.230769" cy="19.769231" r="2.769231"/></g></svg>
    `;
  }
}

customElements.define('icon-ellipses', IconEllipses);
