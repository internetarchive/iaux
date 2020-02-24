import { LitElement, html } from 'lit-element';
import waybackCss from './css/wayback-search';
import './assets/img/search';

class WaybackSearch extends LitElement {
  constructor() {
    super();
    this.locationHandler = () => {};
  }

  static get properties() {
    return {
      locationHandler: { type: Function }
    }
  }

  static get styles() {
    return waybackCss();
  }

  handleSubmit(e) {
    e.preventDefault();
    const query = e.target.querySelector('#url').value;
    this.locationHandler(`https://web.archive.org/web/*/${query}`);
  }

  render() {
    return html`
      <form action="" method="post" @submit=${this.handleSubmit}>
        <p>Search the history of over 411 billion <a data-event-click-tracking="TopNav|WaybackMachineStatsLink" href="https://blog.archive.org/2016/10/23/defining-web-pages-web-sites-and-web-captures/">web pages</a> on the Internet.</p>
        <fieldset>
          <a data-event-click-tracking="TopNav|WaybackMachineLogoLink" href="https://archive.org/web/"><img src="https://archive.org/images/WaybackLogoSmall.png" alt="Wayback Machine"></a>
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
