import { html } from 'lit-element';
import TrackedElement from './tracked-element';
import './assets/img/search';
import waybackSearchCSS from './styles/wayback-search';

class WaybackSearch extends TrackedElement {
  static get styles() {
    return waybackSearchCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      locationHandler: { type: Function },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.locationHandler = () => {};
  }

  handleSubmit(e) {
    e.preventDefault();
    const query = e.target.querySelector('#url').value;
    this.locationHandler(`https://${this.config.waybackUrl}/web/*/${query}`);
  }

  render() {
    return html`
      <form action="" method="post" @submit=${this.handleSubmit}>
        <p>
          Search the history of over ${this.config.waybackPagesArchived}
          <a
            @click=${this.trackClick}
            data-event-click-tracking="TopNav|WaybackMachineStatsLink"
            href="https://blog.archive.org/2016/10/23/defining-web-pages-web-sites-and-web-captures/"
            >web pages</a
          >
          on the Internet.
        </p>
        <fieldset>
          <a
            @click=${this.trackClick}
            data-event-click-tracking="TopNav|WaybackMachineLogoLink"
            href="https://archive.org/web/"
            ><img src="https://archive.org/images/WaybackLogoSmall.png" alt="Wayback Machine"
          /></a>
          <label for="url">Search the Wayback Machine</label>
          <div class="search-field">
            <input type="text" name="url" id="url" placeholder="enter URL or keywords" />
            <search-image width="24" height="24"></search-image>
          </div>
        </fieldset>
      </form>
    `;
  }
}

customElements.define('wayback-search', WaybackSearch);
