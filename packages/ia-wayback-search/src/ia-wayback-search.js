import { html, LitElement } from 'https://offshoot.prod.archive.org/lit.js';
import waybackSearchCSS from './styles/wayback-search.js';
import searchIcon from './icon-search.js';
import logo from './logo.js';

class WaybackSearch extends LitElement {
  static get styles() {
    return waybackSearchCSS;
  }

  static get properties() {
    return {
      baseHost: { type: String },
      queryHandler: { type: Object },
      waybackPagesArchived: { type: String },
    };
  }

  constructor() {
    super();
    this.waybackPagesArchived = '';
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

  render() {
    this.waybackPagesArchived = this.getAttribute('waybackPagesArchived') ?? ''

    return html`
      <form action="" method="post" @submit=${this.handleSubmit}>
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
      </form>
    `;
  }
}

customElements.define('ia-wayback-search', WaybackSearch);

export default WaybackSearch;
