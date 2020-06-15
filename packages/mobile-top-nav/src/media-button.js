import { html, css } from 'lit-element';
import TrackedElement from './tracked-element';
import icons from './assets/img/icons';
import toSnakeCase from './lib/toSnakeCase';

class MediaButton extends TrackedElement {
  static get styles() {
    return css`
      a {
        display: inline-block;
        text-decoration: none;
      }
      button:focus {
        outline-color: var(--link-color);
        outline-width: 0.16rem;
        outline-style: auto;
      }
      .menu-item {
        width: 100%;
        background: transparent;
        font-size: 1.6rem;
        cursor: pointer;
        border: none;
        text-align: left;
        padding: 0;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
      }
      .menu-item:focus {
        outline: none;
      }
      .menu-item > .label {
        display: inline-block;
        color: var(--white);
        text-align: left;
        vertical-align: middle;
      }
      .menu-item > .icon {
        display: inline-flex;
        width: 42px;
        height: 42px;
        vertical-align: middle;
        align-items: center;
        justify-content: center;
      }
      .menu-item.selected .icon {
        background-color: var(--grey20);
        border-radius: 1rem 0 0 1rem;
      }
      .icon .fill-color {
        fill: #999;
      }
      .icon.active .fill-color {
        fill: #fff;
      }
      .donate .fill-color {
        fill: #f00;
      }
    `;
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
