import { CSSResult, html, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import icons from './assets/img/icons';
import { defaultTopNavConfig } from './data/menus';
import formatUrl from './lib/formatUrl';
import { makeBooleanString } from './lib/makeBooleanString';
import { IATopNavConfig, IATopNavLink } from './models';
import dropdownMenuCSS from './styles/dropdown-menu';
import TrackedElement from './tracked-element';
import { ifDefined } from 'lit/directives/if-defined.js';

export default class DropdownMenu extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: Boolean }) hideSearch = false;
  @property({ type: Array }) menuItems: IATopNavLink[] | IATopNavLink[][] = [];
  @property({ type: Boolean }) animated = false;
  @property({ type: Boolean }) open = false;

  static get styles(): CSSResult[] {
    return [dropdownMenuCSS];
  }

  get dropdownItems() {
    if (!this.menuItems) return nothing;

    if (!Array.isArray(this.menuItems[0])) {
      const submenu = this.menuItems as IATopNavLink[];
      return this.dropdownSection(submenu);
    }
    return this.menuItems.map((submenu, i) => {
      const joiner = i ? DropdownMenu.dropdownDivider : html``;
      if (!Array.isArray(submenu)) {
        return;
      }
      return [joiner, ...this.dropdownSection(submenu)];
    });
  }

  static get dropdownDivider() {
    return html`<li role="presentation" class="divider"></li>`;
  }

  private dropdownSection(submenu: IATopNavLink[]): TemplateResult[] {
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

  dropdownLink(link: IATopNavLink): TemplateResult {
    const calloutText = this.config?.callouts?.[link.title];
    return html`<a
      href="${formatUrl(link.url, this.baseHost)}"
      class=${ifDefined(link.class)}
      tabindex="${this.open ? '' : '-1'}"
      @click=${this.trackClick}
      data-event-click-tracking="${this.config
        ?.eventCategory}|Nav${link.analyticsEvent}"
      aria-label=${calloutText ? `New feature: ${link.title}` : nothing}
    >
      ${link.class === 'mobile-upload' ? icons.uploadUnpadded : nothing}
      ${link.title}
      ${calloutText
        ? html`<span class="callout" aria-hidden="true">${calloutText}</span>`
        : nothing}
    </a>`;
  }

  static dropdownText(item: IATopNavLink) {
    return html`<span class="info-item">${item.title}</span>`;
  }

  get menuClass() {
    const hiddenClass = this.hideSearch ? ' search-hidden' : '';
    if (this.open) {
      return `open${hiddenClass}`;
    }
    if (this.animated) {
      return `closed${hiddenClass}`;
    }
    return `initial${hiddenClass}`;
  }

  render() {
    return html`
      <div class="nav-container">
        <nav
          class="${this.menuClass}"
          aria-hidden="${makeBooleanString(!this.open)}"
          aria-expanded="${makeBooleanString(this.open)}"
        >
          <ul>
            ${this.dropdownItems}
          </ul>
        </nav>
      </div>
    `;
  }
}
