import { html, css } from 'lit-element';
import TrackedElement from './tracked-element';
import * as menus from './data/menus';
import locationHandler from './lib/location-handler';
import './wayback-search';
import './more-slider';
import toSnakeCase from './lib/toSnakeCase';

class MediaSubnav extends TrackedElement {
  static get styles() {
    return css`
      a {
        text-decoration: none;
        color: var(--activeColor);
      }

      img {
        display: block;
        width: 90px;
        height: 90px;
        margin: 0 auto 1rem auto;
        border-radius: 45px;
      }

      h3 {
        margin-top: 0;
        font-size: 1.8rem;
      }

      h4 {
        font-size: 1.6rem;
      }

      ul {
        padding: 0;
        margin: 0;
        list-style: none;
      }

      li + li {
        padding-top: 1.5rem;
      }

      .icon-links {
        display: flex;
        justify-content: space-evenly;
        text-align: center;
      }

      .icon-links a {
        display: inline-block;
        width: 120px;
        margin-bottom: 1.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        text-overflow: ellipsis;
      }
      .icon-links a + a {
        margin-left: 2rem;
      }
    `;
  }

  static get properties() {
    return {
      config: { type: Object },
      menu: { type: String },
    };
  }

  constructor() {
    super();

    this.menu = '';
    this.config = {};

    // Begin properties not monitored by LitElement
    this.links = MediaSubnav.defaultLinks;
    this.templates = {
      web: () => (
        html`<wayback-search .config=${this.config} .locationHandler=${locationHandler}></wayback-search>`
      ),
      more: () => html`<more-slider .config=${this.config}></more-slider>`,
    };
  }

  shouldUpdate() {
    if (menus[this.menu]) {
      this.links = menus[this.menu](this.config.baseUrl);
    }
    return true;
  }

  static get defaultLinks() {
    return { iconLinks: [], featuredLinks: [], links: [] };
  }

  analyticsEvent(title) {
    return `${this.config.eventCategory}|${toSnakeCase(title)}`;
  }

  get iconLinks() {
    return this.links.iconLinks.map(link => (
      html`
        <a href="${link.url}" @click=${this.trackClick} data-event-click-tracking="${this.analyticsEvent(link.title)}"><img src="${link.icon}" />${link.title}</a>
      `
    ));
  }

  renderLinks(category) {
    return this.links[category].map(link => (
      html`
        <li><a href="${link.url}" @click=${this.trackClick} data-event-click-tracking="${this.analyticsEvent(link.title)}">${link.title}</a></li>
      `
    ));
  }

  render() {
    const template = this.templates[this.menu];

    if (!this.menu) {
      return undefined;
    }

    if (template) {
      return template();
    }

    return html`
      <h3>${this.links.heading}</h3>
      <div class="icon-links">
        ${this.iconLinks}
      </div>
      <ul>
        ${this.renderLinks('featuredLinks')}
      </ul>
      <h4>Top</h4>
      <ul>
        ${this.renderLinks('links')}
      </ul>
    `;
  }
}

customElements.define('media-subnav', MediaSubnav);
