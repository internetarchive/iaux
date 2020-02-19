import { LitElement, html } from 'lit-element';
import menus from './data/menus';
import './wayback-search';
import './more-slider';
import subnavCss from './css/media-subnav';

class MediaSubnav extends LitElement {
  constructor() {
    super();
    const defaultLinks = { iconLinks: [], featuredLinks: [], links: [] };

    // Begin properties not monitored by LitElement
    this.links = menus[this.menu] || defaultLinks;
    this.templates = {
      web: () => html`<wayback-search></wayback-search>`,
      more: () => html`<more-slider></more-slider>`,
    };
  }

  static get properties() {
    return {
      menu: { type: String }
    };
  }

  shouldUpdate() {
    if (menus[this.menu]) {
      this.links = menus[this.menu];
    }
    return true;
  }

  get iconLinks() {
    return this.links.iconLinks.map((link) => (
      html`<a href="${link.url}"><img src="${link.icon}" />${link.title}</a>`
    ));
  }

  renderLinks(category) {
    return this.links[category].map((link) => html`<li><a href="${link.url}">${link.title}</a></li>`);
  }

  static get styles() {
    return subnavCss();
  }

  render() {
    const template = this.templates[this.menu];

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
