import { html } from 'lit-element';
import { more } from './data/menus';
import TrackedElement from './tracked-element';
import desktopSubnavCSS from './styles/desktop-subnav';
import icons from './assets/img/icons';

class DesktopSubnav extends TrackedElement {
  static get styles() {
    return desktopSubnavCSS;
  }

  static get properties() {
    return {
      baseHost: { type: String }
    };
  }

  get listItems() {
    return more(this.baseHost).map(link => (
      html`
        <li>
          <a class="${link.label.toLowerCase()}" href="${link.url}">${link.label}${DesktopSubnav.iconFor(link.label)}</a>
        </li>
      `
    ));
  }

  static iconFor(label) {
    const subnavIcons = {
      Donate: icons.donate
    };
    return subnavIcons[label] ? subnavIcons[label] : html``;
  }

  render() {
    return html`
      <ul>
        ${this.listItems}
      </ul>
    `;
  }
}

customElements.define('desktop-subnav', DesktopSubnav);
