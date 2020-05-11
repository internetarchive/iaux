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
    if (!Array.isArray(this.menuItems[0])) {
      return this.dropdownSection(this.menuItems);
    }
    return this.menuItems.map((submenu, i) => {
      const joiner = i ? DropdownMenu.dropdownDivider : html``;
      return [joiner, ...this.dropdownSection(submenu)];
    });
  }

  static get dropdownDivider() {
    return html`<li role="presentation" class="divider"></li>`;
  }

  dropdownSection(submenu) {
    return submenu.map(item => (
      html`
        <li>${item.href ? this.dropdownLink(item) : DropdownMenu.dropdownText(item)}</li>
      `
    ));
  }

  dropdownLink(link) {
    return html`<a href="${link.href}" @click=${this.trackClick} data-event-click-tracking="${this.config.eventCategory}|Nav${link.analyticsEvent}">${link.title}</a>`;
  }

  static dropdownText(item) {
    return html`<span class="info-item">${item.title}</span>`;
  }

  get menuClass() {
    const hiddenClass = this.config.hideSearch ? ' search-hidden' : '';
    if (this.open) {
      return `open${hiddenClass}`;
    }
    if (this.animate) {
      return `closed${hiddenClass}`;
    }
    return `initial${hiddenClass}`;
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
