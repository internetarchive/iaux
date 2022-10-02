import { html } from 'https://offshoot.ux.archive.org/lit.js';
import './wayback-search.js';
import TrackedElement from './tracked-element.js';
import './save-page-form.js';
import queryHandler from './lib/query-handler.js';
import waybackSliderCSS from './styles/wayback-slider.js';
import toSentenceCase from './lib/toSentenceCase.js';
import formatUrl from './lib/formatUrl.js';

class WaybackSlider extends TrackedElement {
  static get styles() {
    return waybackSliderCSS;
  }

  static get properties() {
    return {
      archiveItLinks: { type: Array },
      baseHost: { type: String },
      browserExtensionsLinks: { type: Array },
      config: { type: Object },
      mobileAppsLinks: { type: Array },
    };
  }

  constructor() {
    super();

    this.archiveItLinks = [];
    this.browserExtensionsLinks = [];
    this.mobileAppsLinks = [];
  }

  get mobileAppsItems() {
    return this.linkList('mobileAppsLinks', 'Wayback');
  }

  get browserExtensionsItems() {
    return this.linkList('browserExtensionsLinks', 'Wayback');
  }

  get archiveItItems() {
    return this.linkList('archiveItLinks', 'ArchiveIt');
  }

  linkList(linkType, eventPrefix) {
    return this[linkType].map(link => html`<li>
      <a href=${formatUrl(link.url, this.baseHost)} @click=${this.trackClick} data-event-click-tracking="${this.analyticsEvent(`${eventPrefix}${link.title}`)}" target=${link.external ? '_blank' : ''} rel=${link.external ? 'noreferrer noopener' : ''}>${link.title}</a>
    </li>`);
  }

  analyticsEvent(title) {
    return `${this.config.eventCategory}|${toSentenceCase(title)}`;
  }

  render() {
    return html`
      <div class="grid">
        <wayback-search
          .baseHost=${this.baseHost}
          waybackPagesArchived=${this.config.waybackPagesArchived}
          .queryHandler=${queryHandler}></wayback-search>
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

customElements.define('wayback-slider', WaybackSlider);

export default WaybackSlider;
