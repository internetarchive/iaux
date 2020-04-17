import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import dropdownMenuCSS from './styles/dropdown-menu';

class DropdownMenu extends TrackedElement {
  static get styles() {
    return dropdownMenuCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      menuItems: { type: Array },
      animate: { type: Boolean },
      open: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.menuItems = [];
    this.open = false;
    this.animate = false;
  }

  get dropdownItems() {
    return this.menuItems.map(link => (
      html`
        <li><a href="${link.href}" @click=${this.trackClick} data-event-click-tracking="${this.config.eventCategory}|Nav${link.analyticsEvent}">${link.title}</a></li>
      `
    ));
  }

  get menuClass() {
    if (this.open) {
      return 'open';
    }
    if (this.animate) {
      return 'closed';
    }
    return 'initial';
  }

  get ariaHidden() {
    return Boolean(!this.open).toString();
  }

  get ariaExpanded() {
    return Boolean(this.open).toString();
  }

  render() {
    return html`
      <nav
        class="${this.menuClass}"
        aria-hidden="${this.ariaHidden}"
        aria-expanded="${this.ariaExpanded}"
      >
        <ul>
          ${this.dropdownItems}
        </ul>
      </nav>
    `;
  }
}

export default DropdownMenu;
