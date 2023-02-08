import { html } from 'https://offshoot.prod.archive.org/lit.js';
import TrackedElement from './tracked-element.js';
import './wayback-slider.js';
import './more-slider.js';
import mediaSubnavCSS from './styles/media-subnav.js';
import toSentenceCase from './lib/toSentenceCase.js';
import formatUrl from './lib/formatUrl.js';

class MediaSubnav extends TrackedElement {
  static get styles() {
    return mediaSubnavCSS;
  }

  static get properties() {
    return {
      baseHost: { type: String },
      config: { type: Object },
      menu: { type: String },
      menuItems: { type: Object },
    };
  }

  constructor() {
    super();

    this.config = {};
    this.menu = '';
    this.menuItems = {};

    // Begin properties not monitored by LitElement
    this.links = MediaSubnav.defaultLinks;
  }

  shouldUpdate() {
    if (this.menuItems) {
      this.links = this.menuItems;
    }
    return true;
  }

  static get defaultLinks() {
    return { iconLinks: [], featuredLinks: [], links: [] };
  }

  analyticsEvent(title) {
    return `${this.config.eventCategory}|${toSentenceCase(title)}${toSentenceCase(this.menu)}`;
  }

  get iconLinks() {
    return this.links.iconLinks.map(link => (
      html`
        <a href="${formatUrl(link.url, this.baseHost)}" @click=${this.trackClick} data-event-click-tracking="${this.analyticsEvent(link.title)}"><img src="${link.icon}" loading="lazy" />${link.title}</a>
      `
    ));
  }

  renderLinks(category) {
    return this.links[category].map(link => (
      html`
        <li><a href="${formatUrl(link.url, this.baseHost)}" @click=${this.trackClick} data-event-click-tracking="${this.analyticsEvent(link.title)}">${link.title}</a></li>
      `
    ));
  }

  render() {
    if (!this.menu) {
      return html``;
    }

    if (this.menuItems) {
      this.links = this.menuItems;
    }

    if (this.menu === 'web') {
      return html`
        <wayback-slider
          .baseHost=${this.baseHost}
          .config=${this.config}
          .archiveItLinks=${this.menuItems.archiveItLinks}
          .browserExtensionsLinks=${this.menuItems.browserExtensionsLinks}
          .mobileAppsLinks=${this.menuItems.mobileAppsLinks}
        ></wayback-slider>`;
    }

    if (this.menu === 'more') {
      return html`
        <more-slider .baseHost=${this.baseHost} .config=${this.config} .menuItems=${this.menuItems}>
        </more-slider>`;
    }

    return html`
      <h3>${this.links.heading}</h3>
      <div class="icon-links">
        ${this.iconLinks}
      </div>
      <div class="links featured">
        <h4>Featured</h4>
        <ul>
          ${this.renderLinks('featuredLinks')}
        </ul>
      </div>
      <div class="links top">
        <h4>Top</h4>
        <ul>
          ${this.renderLinks('links')}
        </ul>
      </div>
    `;
  }
}

customElements.define('media-subnav', MediaSubnav);
