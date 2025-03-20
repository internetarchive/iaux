import { html, nothing } from "lit";
import TrackedElement from "./tracked-element";
import dropdownMenuCSS from "./styles/dropdown-menu";
import formatUrl from "./lib/formatUrl";
import icons from "./assets/img/icons";
import { property } from "lit/decorators";

export default class DropdownMenu extends TrackedElement {
  @property({ type: String }) baseHost = "";
  @property({ type: Object }) config = {};
  @property({ type: Boolean }) hideSearch = false;
  @property({ type: Array }) menuItems = [];
  @property({ type: Boolean }) animate = false;
  @property({ type: Boolean }) open = false;

  static get styles() {
    return dropdownMenuCSS;
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
    return submenu.map(
      (item) => html`
        <li>
          ${item.url
            ? this.dropdownLink(item)
            : DropdownMenu.dropdownText(item)}
        </li>
      `,
    );
  }

  dropdownLink(link) {
    const calloutText = this.config.callouts?.[link.title];
    return html`<a
      href="${formatUrl(link.url, this.baseHost)}"
      class="${link.class}"
      tabindex="${this.open ? "" : "-1"}"
      @click=${this.trackClick}
      data-event-click-tracking="${this.config
        .eventCategory}|Nav${link.analyticsEvent}"
      aria-label=${calloutText ? `New feature: ${link.title}` : nothing}
    >
      ${link.class === "mobile-upload" ? icons.uploadUnpadded : nothing}
      ${link.title}
      ${calloutText
        ? html`<span class="callout" aria-hidden="true">${calloutText}</span>`
        : nothing}
    </a>`;
  }

  static dropdownText(item) {
    return html`<span class="info-item">${item.title}</span>`;
  }

  get menuClass() {
    const hiddenClass = this.hideSearch ? " search-hidden" : "";
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
