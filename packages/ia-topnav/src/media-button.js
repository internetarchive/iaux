import { html, css } from 'lit-element';
import TrackedElement from './tracked-element';
import icons from './assets/img/icons';
import toSnakeCase from './lib/toSnakeCase';
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
      selected: { type: Boolean },
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
    this.selected = false;
  }

  onClick(e) {
    this.trackClick(e);
    this.dispatchEvent(new CustomEvent('selected', {
      detail: {
        mediatype: this.mediatype
      }
    }));
  }

  get buttonClass() {
    return this.selected ? 'selected' : '';
  }

  get iconClass() {
    return this.selected ? 'active' : '';
  }

  get analyticsEvent() {
    return `${this.config.eventCategory}|NavMenu${toSnakeCase(this.mediatype)}`;
  }

  get menuItem() {
    return html`
      <span class="icon ${this.iconClass}">
        ${MediaButton.icons[this.icon]}
      </span>
      <span class="label">${this.label}</span>
    `;
  }

  get anchor() {
    return html`
      <a
        class="menu-item ${this.mediatype} ${this.buttonClass}"
        href="https://${this.config.baseUrl}${this.href}"
        @click=${this.trackClick}
        data-event-click-tracking="${this.analyticsEvent}"
      >
        ${this.menuItem}
      </a>
    `;
  }

  get button() {
    return html`
      <button
        class="menu-item ${this.mediatype} ${this.buttonClass}"
        @click="${this.onClick}"
        data-event-click-tracking="${this.analyticsEvent}"
      >
        ${this.menuItem}
      </button>
    `;
  }

  render() {
    return this.href ? this.anchor : this.button;
  }
}

customElements.define('media-button', MediaButton);
