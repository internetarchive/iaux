import { html, TemplateResult } from 'lit';
import TrackedElement from './tracked-element';
import icons from './assets/img/icons';
import toSentenceCase from './lib/t-sentence-case';
import mediaButtonCSS from './styles/media-button';
import { customElement, property } from 'lit/decorators.js';
import { IATopNavConfig } from './models';
import { defaultTopNavConfig } from './data/menus';

@customElement('media-button')
export class MediaButton extends TrackedElement {
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: String }) icon = '';
  @property({ type: String }) href = '';
  @property({ type: String }) label = '';
  @property({ type: String }) mediatype = '';
  @property({ type: String }) openMenu = '';
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) followable = false;

  static get styles() {
    return mediaButtonCSS;
  }

  static get icons(): Record<string, TemplateResult> {
    return icons;
  }

  onClick(e: Event) {
    this.trackClick(e);
    e.preventDefault();
    // On desktop viewport widths, the media subnav is always visible. To
    // ensure the media subnav is open on mobile if the viewport is
    // resized, the openMenu needs to be set to 'media'.
    if (this.openMenu !== 'media') {
      this.dispatchMenuToggledEvent();
    }
    this.dispatchMediaTypeSelectedEvent();
  }

  dispatchMenuToggledEvent() {
    this.dispatchEvent(
      new CustomEvent('menuToggled', {
        bubbles: true,
        composed: true,
        detail: {
          menuName: 'media',
        },
      }),
    );
  }

  dispatchMediaTypeSelectedEvent() {
    this.dispatchEvent(
      new CustomEvent('mediaTypeSelected', {
        bubbles: true,
        composed: true,
        detail: {
          mediatype: this.mediatype,
        },
      }),
    );
  }

  get buttonClass() {
    return this.selected ? 'selected' : '';
  }

  get tooltipPrefix() {
    return this.selected ? 'Collapse' : 'Expand';
  }

  get iconClass() {
    return this.selected ? 'active' : '';
  }

  get analyticsEvent() {
    return `${this.config.eventCategory}|NavMenu${toSentenceCase(this.mediatype)}`;
  }

  get menuItem() {
    return html`
      <span class="icon ${this.iconClass}">
        ${MediaButton.icons[this.icon]}
      </span>
      <span class="label">${this.label}</span>
    `;
  }

  render() {
    return html`
      <a
        href="${this.href}"
        class="menu-item ${this.mediatype} ${this.buttonClass}"
        @click=${this.followable ? this.trackClick : this.onClick}
        data-event-click-tracking="${this.analyticsEvent}"
        title="${this.tooltipPrefix} ${this.mediatype} menu"
      >
        ${this.menuItem}
      </a>
    `;
  }
}
