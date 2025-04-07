import { html } from 'lit';
import './wayback-search';
import TrackedElement from './tracked-element';
import './save-page-form';
import queryHandler from './lib/query-handler';
import waybackSliderCSS from './styles/wayback-slider';
import toSentenceCase from './lib/toSentenceCase';
import formatUrl from './lib/formatUrl';
import { customElement, property } from 'lit/decorators.js';
import { IATopNavConfig, IATopNavLink } from './models';
import { defaultTopNavConfig } from './data/menus';

@customElement('wayback-slider')
export class WaybackSlider extends TrackedElement {
  @property({ type: Array }) archiveItLinks: IATopNavLink[] = [];
  @property({ type: String }) baseHost = '';
  @property({ type: Array }) browserExtensionsLinks: IATopNavLink[] = [];
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: Array }) mobileAppsLinks: IATopNavLink[] = [];

  static get styles() {
    return waybackSliderCSS;
  }

  get mobileAppsItems() {
    return this.linkList(this.mobileAppsLinks, 'Wayback');
  }

  get browserExtensionsItems() {
    return this.linkList(this.browserExtensionsLinks, 'Wayback');
  }

  get archiveItItems() {
    return this.linkList(this.archiveItLinks, 'ArchiveIt');
  }

  private linkList(links: IATopNavLink[], eventPrefix: string) {
    return links.map(
      (link) =>
        html`<li>
          <a
            .href=${formatUrl(link.url, this.baseHost)}
            @click=${this.trackClick}
            data-event-click-tracking="${this.analyticsEvent(
              `${eventPrefix}${link.title}`,
            )}"
            target=${link.external ? '_blank' : ''}
            rel=${link.external ? 'noreferrer noopener' : ''}
            >${link.title}</a
          >
        </li>`,
    );
  }

  analyticsEvent(title: string) {
    return `${this.config?.eventCategory}|${toSentenceCase(title)}`;
  }

  render() {
    return html`
      <div class="grid">
        <wayback-search
          .waybackPagesArchived=${this.config.waybackPagesArchived ?? ''}
          .queryHandler=${queryHandler}
        ></wayback-search>
        <div class="link-lists">
          <div>
            <h4>Mobile Apps</h4>
            <ul class="mobile-apps">
              ${this.mobileAppsItems}
            </ul>
            <h4>Browser Extensions</h4>
            <ul class="browser-extensions">
              ${this.browserExtensionsItems}
            </ul>
          </div>
          <div>
            <h4>Archive-It Subscription</h4>
            <ul class="archive-it">
              ${this.archiveItItems}
            </ul>
          </div>
        </div>
        <save-page-form .config=${this.config}></save-page-form>
      </div>
    `;
  }
}
