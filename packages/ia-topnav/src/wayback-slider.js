import { html } from 'lit-element';
import './wayback-search';
import TrackedElement from './tracked-element';
import './save-page-form';
import queryHandler from './lib/query-handler';
import waybackSliderCSS from './styles/wayback-slider';
import toSentenceCase from './lib/toSentenceCase';

class WaybackSlider extends TrackedElement {
  static get styles() {
    return waybackSliderCSS;
  }

  static get properties() {
    return {
      archiveItLinks: { type: Array },
      config: { type: Object },
      toolsLinks: { type: Array },
    };
  }

  constructor() {
    super();

    this.archiveItLinks = [];
    this.toolsLinks = [];
  }

  get toolsItems() {
    return this.linkList('toolsLinks', 'Wayback');
  }

  get archiveItItems() {
    return this.linkList('archiveItLinks', 'ArchiveIt');
  }

  linkList(linkType, eventPrefix) {
    return this[linkType].map(link => html`<li>
      <a href=${link.url} @click=${this.trackClick} data-event-click-tracking="${this.analyticsEvent(`${eventPrefix}${link.title}`)}">${link.title}</a>
    </li>`);
  }

  analyticsEvent(title) {
    return `${this.config.eventCategory}|${toSentenceCase(title)}`;
  }

  render() {
    return html`
      <div class="grid">
        <wayback-search waybackPagesArchived=${this.config.waybackPagesArchived} .queryHandler=${queryHandler}></wayback-search>
        <div class="link-lists">
          <div>
            <h4>Tools</h4>
            <ul class="tools">
              ${this.toolsItems}
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
