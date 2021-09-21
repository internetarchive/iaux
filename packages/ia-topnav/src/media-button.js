import { html } from 'lit';
import TrackedElement from './tracked-element';
import icons from './assets/img/icons';
import toSentenceCase from './lib/toSentenceCase';
import mediaButtonCSS from './styles/media-button';

class MediaButton extends TrackedElement {
  static get styles() {
    return mediaButtonCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      icon: { type: String },
      href: { type: String },
      label: { type: String },
      mediatype: { type: String },
      openMenu: { type: String },
      selected: { type: Boolean },
      followable: { type: Boolean },
    };
  }

  static get icons() {
    return icons;
  }

  constructor() {
    super();
    this.config = {};
    this.icon = '';
    this.href = '';
    this.label = '';
    this.mediatype = '';
    this.openMenu = '';
    this.selected = false;
    this.followable = false;
  }

  onClick(e) {
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

customElements.define('media-button', MediaButton);
