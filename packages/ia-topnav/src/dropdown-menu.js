import { html, nothing } from 'https://offshoot.prod.archive.org/lit.js';
import TrackedElement from './tracked-element.js';
import dropdownMenuCSS from './styles/dropdown-menu.js';
import formatUrl from './lib/formatUrl.js';

class DropdownMenu extends TrackedElement {
  static get styles() {
    return dropdownMenuCSS;
  }

  static get properties() {
    return {
      baseHost: { type: String },
      config: { type: Object },
      hideSearch: { type: Boolean },
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
    if (!this.menuItems) return nothing;

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
        <li>${item.url ? this.dropdownLink(item) : DropdownMenu.dropdownText(item)}</li>
      `
    ));
  }

  dropdownLink(link) {
    const calloutText = this.config.callouts?.[link.title];
    return html`<a
      href="${formatUrl(link.url, this.baseHost)}"
      @click=${this.trackClick}
      data-event-click-tracking="${this.config.eventCategory}|Nav${link.analyticsEvent}"
      aria-label=${`New feature: ${link.title}`}>
        ${link.title}
        ${calloutText ? html`<span class="callout" aria-hidden="true">${calloutText}</span>` : nothing}
    </a>`;
  }

  static dropdownText(item) {
    return html`<span class="info-item">${item.title}</span>`;
  }

  get menuClass() {
    const hiddenClass = this.hideSearch ? ' search-hidden' : '';
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
      <div class="nav-container">
        <nav
          class="${this.menuClass}"
          aria-hidden="${this.ariaHidden}"
          aria-expanded="${this.ariaExpanded}"
        >
          <ul>
            ${this.dropdownItems}
          </ul>
        </nav>
      </div>
    `;
  }
}

export default DropdownMenu;
