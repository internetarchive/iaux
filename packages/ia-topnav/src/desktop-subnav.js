import { html, nothing } from 'lit';
import TrackedElement from './tracked-element';
import desktopSubnavCSS from './styles/desktop-subnav';
import icons from './assets/img/icons';
import formatUrl from './lib/formatUrl';

class DesktopSubnav extends TrackedElement {
  static get styles() {
    return desktopSubnavCSS;
  }

  static get properties() {
    return {
      baseHost: { type: String },
      menuItems: { type: Array },
    };
  }

  get listItems() {
    return this.menuItems ? this.menuItems.map(link => (
      html`
        <li>
          <a class="${link.title.toLowerCase()}" href="${formatUrl(link.url, this.baseHost)}">${link.title}${DesktopSubnav.iconFor(link.title)}</a>
        </li>
      `
    )) : nothing;
  }

  static iconFor(title) {
    const subnavIcons = {
      Donate: icons.donate
    };
    return subnavIcons[title] ? subnavIcons[title] : html``;
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
