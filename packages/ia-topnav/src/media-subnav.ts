import { html } from "lit";
import TrackedElement from "./tracked-element";
import "./wayback-slider";
import "./more-slider";
import mediaSubnavCSS from "./styles/media-subnav";
import toSentenceCase from "./lib/toSentenceCase";
import formatUrl from "./lib/formatUrl";
import { property } from "lit/decorators.js";

type Link = {
  title: string;
  url: string & Location;
  icon: string;
};

type MenuItems = {
  iconLinks: Link[];
  featuredLinks: Link[];
  links: Link[];
};

class MediaSubnav extends TrackedElement {
  @property({ type: String }) baseHost = "";
  @property({ type: Object }) config: { eventCategory: string } | undefined;
  @property({ type: String }) menu = "";
  @property({ type: Object }) menuItems: MenuItems | undefined;

  links = MediaSubnav.defaultLinks;

  static get styles() {
    return mediaSubnavCSS;
  }

  shouldUpdate() {
    if (this.menuItems) {
      this.links = this.menuItems;
    }
    return true;
  }

  static get defaultLinks(): MenuItems {
    return { iconLinks: [], featuredLinks: [], links: [] };
  }

  analyticsEvent(title: string) {
    return `${this.config?.eventCategory}|${toSentenceCase(title)}${toSentenceCase(this.menu)}`;
  }

  get iconLinks() {
    return this.links.iconLinks.map(
      (link) => html`
        <a
          .href="${formatUrl(link.url, this.baseHost)}"
          @click=${this.trackClick}
          data-event-click-tracking="${this.analyticsEvent(link.title)}"
          ><img src="${link.icon}" loading="lazy" />${link.title}</a
        >
      `,
    );
  }

  renderLinks(category: string) {
    return this.links[category].map(
      (link) => html`
        <li>
          <a
            .href="${formatUrl(link.url, this.baseHost)}"
            @click=${this.trackClick}
            data-event-click-tracking="${this.analyticsEvent(link.title)}"
            >${link.title}</a
          >
        </li>
      `,
    );
  }

  render() {
    if (!this.menu) {
      return html``;
    }

    if (this.menuItems) {
      this.links = this.menuItems;
    }

    if (this.menu === "web") {
      return html` <wayback-slider
        .baseHost=${this.baseHost}
        .config=${this.config}
        .archiveItLinks=${this.menuItems.archiveItLinks}
        .browserExtensionsLinks=${this.menuItems.browserExtensionsLinks}
        .mobileAppsLinks=${this.menuItems.mobileAppsLinks}
      ></wayback-slider>`;
    }

    if (this.menu === "more") {
      return html` <more-slider
        .baseHost=${this.baseHost}
        .config=${this.config}
        .menuItems=${this.menuItems}
      >
      </more-slider>`;
    }

    return html`
      <h3>${this.links.heading}</h3>
      <div class="icon-links">${this.iconLinks}</div>
      <div class="links featured">
        <h4>Featured</h4>
        <ul>
          ${this.renderLinks("featuredLinks")}
        </ul>
      </div>
      <div class="links top">
        <h4>Top</h4>
        <ul>
          ${this.renderLinks("links")}
        </ul>
      </div>
    `;
  }
}

customElements.define("media-subnav", MediaSubnav);
