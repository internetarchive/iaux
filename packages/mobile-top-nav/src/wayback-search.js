import { LitElement, html } from 'lit-element';
import waybackCss from './css/wayback-search';

class WaybackSearch extends LitElement {
  static get styles() {
    return waybackCss();
  }

  redirectToWayback(e) {
    e.preventDefault();
    const url = e.target.querySelector('#url').value;
    window.location = `https://web.archive.org/web/*/${url}`;
  }

  render() {
    return html`
      <form action="" method="post" @submit=${this.redirectToWayback}>
        <p>Search the history of over 411 billion <a data-event-click-tracking="TopNav|WaybackMachineStatsLink" href="https://blog.archive.org/2016/10/23/defining-web-pages-web-sites-and-web-captures/">web pages</a> on the Internet.</p>
        <fieldset>
          <a data-event-click-tracking="TopNav|WaybackMachineLogoLink" href="https://archive.org/web/"><img src="https://archive.org/images/WaybackLogoSmall.png" alt="Wayback Machine"></a>
          <label for="url">Search the Wayback Machine</label>
          <input type="text" name="url" id="url" placeholder="enter URL or keywords" />
        </fieldset>
      </form>
    `;
  }
}

customElements.define('wayback-search', WaybackSearch);
