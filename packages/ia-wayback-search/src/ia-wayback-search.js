import { html, LitElement } from 'lit-element';
import { nothing } from 'lit-html';
import waybackSearchCSS from './styles/wayback-search';
import searchIcon from './icon-search';
import logo from './logo';

class WaybackSearch extends LitElement {
  static get styles() {
    return waybackSearchCSS;
  }

  static get properties() {
    return {
      baseHost: { type: String },
      queryHandler: { type: Object },
      waybackPagesArchived: { type: String },
      openSlot: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.waybackPagesArchived = '';
    this.openSlot = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    const query = e.target.querySelector('#url').value;
    this.emitWaybackSearchSubmitted(query);
    this.queryHandler.performQuery(query);
  }

  emitWaybackSearchSubmitted(query) {
    this.dispatchEvent(new CustomEvent('waybackSearchSubmitted', {
      detail: {
        query
      }
    }));
  }

  emitWaybackMachineStatsLinkClicked() {
    this.dispatchEvent(new CustomEvent('waybackMachineStatsLinkClicked'));
  }

  emitWaybackMachineLogoLinkClicked() {
    this.dispatchEvent(new CustomEvent('waybackMachineLogoLink'));
  }

  get slotBlock() {
    return html` <div class="slot"><slot name="optional-branding"></slot></div>`;
  }

  render() {
    const slotClass = this.openSlot ? 'slot-open' : '';
    return html`
      <form action="" method="POST" @submit=${this.handleSubmit}>
        <p>
          Search the history of over ${this.waybackPagesArchived}
          <a
            @click=${this.emitWaybackMachineStatsLinkClicked}
            data-event-click-tracking="TopNav|WaybackMachineStatsLink"
            href="https://blog.archive.org/2016/10/23/defining-web-pages-web-sites-and-web-captures/"
            >web pages</a
          >
          on the Internet.
        </p>
        <div class=${slotClass}>
          <fieldset>
            <a
              @click=${this.emitWaybackMachineLogoLinkClicked}
              data-event-click-tracking="TopNav|WaybackMachineLogoLink"
              href=${`${this.baseHost}/web/`}
              >${logo}</a>
            <label for="url">Search the Wayback Machine</label>
            <div class="search-field">
              <input type="text" name="url" id="url" placeholder="enter URL or keywords" />
              ${searchIcon}
            </div>
          </fieldset>
          ${this.openSlot ? this.slotBlock : nothing}
        </div>
      </form>
    `;
  }
}

customElements.define('ia-wayback-search', WaybackSearch);

export default WaybackSearch;
