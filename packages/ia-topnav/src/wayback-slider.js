import { html } from 'lit-element';
import '@internetarchive/ia-wayback-search';
import TrackedElement from './tracked-element';
import queryHandler from './lib/query-handler';
import waybackSliderCSS from './styles/wayback-slider';
import './save-page-form';

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
    return this.linkList('toolsLinks');
  }

  get archiveItItems() {
    return this.linkList('archiveItLinks');
  }

  linkList(linkType) {
    return this[linkType].map(link => html`<li>
      <a href=${link.href}>${link.text}</a>
    </li>`);
  }

  render() {
    return html`
      <div class="grid">
        <ia-wayback-search waybackPagesArchived=${this.config.waybackPagesArchived} .queryHandler=${queryHandler}></ia-wayback-search>
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
        <save-page-form></save-page-form>
      </div>
    `;
  }
}

customElements.define('wayback-slider', WaybackSlider);

export default WaybackSlider;
