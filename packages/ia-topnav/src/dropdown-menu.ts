import { CSSResult, html, nothing, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import icons from './assets/img/icons';
import { defaultTopNavConfig } from './data/menus';
import formatUrl from './lib/format-url';
import { makeBooleanString } from './lib/make-boolean-string';
import { IATopNavConfig, IATopNavLink } from './models';
import dropdownMenuCSS from './styles/dropdown-menu';
import TrackedElement from './tracked-element';
import { ifDefined } from 'lit/directives/if-defined.js';
import KeyboardNavigation from './lib/keyboard-navigation';

export default class DropdownMenu extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: Boolean }) hideSearch = false;
  @property({ type: Array }) menuItems: IATopNavLink[] | IATopNavLink[][] = [];
  @property({ type: Boolean }) animated = false;
  @property({ type: Boolean }) open = false;

  private previousKeydownListener?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (this: HTMLElement, ev: KeyboardEvent) => any;

  static get styles(): CSSResult[] {
    return [dropdownMenuCSS];
  }

  updated(props: PropertyValues) {
    if (props.has('open') && this.open) {
      const container = this.shadowRoot?.querySelector(
        '.nav-container',
      ) as HTMLElement;

      if (container) {
        const keyboardNavigation = new KeyboardNavigation(
          container,
          'usermenu',
        );
        this.addEventListener('keydown', keyboardNavigation.handleKeyDown);
        if (this.previousKeydownListener) {
          this.removeEventListener('keydown', this.previousKeydownListener);
        }
        this.previousKeydownListener = keyboardNavigation.handleKeyDown;
      }
    }
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
    return html`<li class="divider"></li>`;
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
    const isMobileUpload = link.class === 'mobile-upload';
    const isTabbable = this.open && !isMobileUpload;

    return html`<a
      href="${formatUrl(link.url, this.baseHost)}"
      class=${ifDefined(link.class)}
      tabindex="${isTabbable ? '' : '-1'}"
      @click=${this.trackClick}
      data-event-click-tracking="${this.config
        ?.eventCategory}|Nav${link.analyticsEvent}"
      aria-label=${calloutText ? `New feature: ${link.title}` : nothing}
    >
      ${isMobileUpload ? icons.uploadUnpadded : nothing} ${link.title}
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
