import { html, LitElement } from 'lit-element';
import waybackSearchCSS from './styles/wayback-search';
import searchIcon from './icon-search';
import logo from './logo';

class WaybackSearch extends LitElement {
  static get styles() {
    return waybackSearchCSS;
  }

  static get properties() {
    return {
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
            href="https://archive.org/web/"
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
