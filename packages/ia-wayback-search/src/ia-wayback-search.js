import { html, LitElement } from 'lit-element';
import waybackSearchCSS from './styles/wayback-search';
import searchIcon from './icon-search';

class WaybackSearch extends LitElement {
  static get styles() {
    return waybackSearchCSS;
  }

  static get properties() {
    return {
      locationHandler: { type: Object },
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
    this.locationHandler.submitCallback(query);
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
            ><img src="https://archive.org/images/WaybackLogoSmall.png" alt="Wayback Machine"
          /></a>
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
