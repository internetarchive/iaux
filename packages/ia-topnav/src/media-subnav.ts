import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import TrackedElement from './tracked-element';
import './wayback-slider';
import './more-slider';
import mediaSubnavCSS from './styles/media-subnav';
import toSentenceCase from './lib/toSentenceCase';
import formatUrl from './lib/formatUrl';
import { customElement, property } from 'lit/decorators.js';
import { IATopNavConfig, IATopNavLink, IATopNavMediaMenu } from './models';
import { defaultTopNavConfig } from './data/menus';

@customElement('media-subnav')
export class MediaSubnav extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: String }) menu:
    | ''
    | 'web'
    | 'more'
    | 'audio'
    | 'images'
    | 'software'
    | 'texts'
    | 'video' = '';
  @property({ type: Object }) menuItems: IATopNavMediaMenu =
    MediaSubnav.defaultLinks;

  private links: IATopNavMediaMenu = MediaSubnav.defaultLinks;

  static get styles() {
    return mediaSubnavCSS;
  }

  shouldUpdate() {
    if (this.menuItems) {
      this.links = this.menuItems;
    }
    return true;
  }

  static get defaultLinks(): IATopNavMediaMenu {
    return {
      heading: '',
      iconLinks: [],
      featuredLinks: [],
      links: [],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    };
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
          ><img src="${ifDefined(link.icon)}" loading="lazy" />${link.title}</a
        >
      `,
    );
  }

  renderLinks(links: IATopNavLink[]) {
    return links.map(
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

    if (this.menu === 'web') {
      return html` <wayback-slider
        .baseHost=${this.baseHost}
        .config=${this.config}
        .archiveItLinks=${this.menuItems.archiveItLinks}
        .browserExtensionsLinks=${this.menuItems.browserExtensionsLinks}
        .mobileAppsLinks=${this.menuItems.mobileAppsLinks}
      ></wayback-slider>`;
    }

    if (this.menu === 'more') {
      return html` <more-slider
        .baseHost=${this.baseHost}
        .config=${this.config}
        .menuItems=${this.menuItems.links}
      >
      </more-slider>`;
    }

    return html`
      <h3>${this.links.heading}</h3>
      <div class="icon-links">${this.iconLinks}</div>
      <div class="links featured">
        <h4>Featured</h4>
        <ul>
          ${this.renderLinks(this.links.featuredLinks)}
        </ul>
      </div>
      <div class="links top">
        <h4>Top</h4>
        <ul>
          ${this.renderLinks(this.links.links)}
        </ul>
      </div>
    `;
  }
}
