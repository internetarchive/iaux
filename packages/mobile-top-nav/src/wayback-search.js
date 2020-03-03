import { LitElement, html, css } from 'lit-element';
import './assets/img/search';

class WaybackSearch extends LitElement {
  static get styles() {
    return css`
      form {
        padding: 0 5rem 0 2rem;
      }

      p {
        margin-top: 0;
        font-weight: 200;
      }

      a {
        font-weight: 500;
        text-decoration: none;
        color: var(--activeColor);
      }

      fieldset {
        max-width: 600px;
        padding: 0.7rem 2rem;
        margin: 1.5rem auto;
        text-align: center;
        border: none;
        border-radius: 7px;
        background-color: #fcf5e6;
        box-shadow: 3px 3px 0 0 #c3ad97;
      }

      label {
        display: none;
      }

      img {
        width: 215px;
        height: 60px;
        margin-bottom: 1.3rem;
        max-width: 100%;
        vertical-align: middle;
      }

      input {
        display: block;
        width: 100%;
        height: 3rem;
        padding: 0.5rem 1rem 0.5rem 2.5rem;
        font: normal 1.2rem/1.5 var(--theme-font-family);
        color: #858585;
        box-sizing: border-box;
        border: 1px solid var(--grey80);
        border-radius: 2rem;
        background: #eee;
      }

      input:focus {
        border-color: #66afe9;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
        outline: none;
      }

      .search-field {
        position: relative;
      }

      .search-field search-image {
        position: absolute;
        top: 2px;
        left: 3px;
      }

      input:focus + search-image {
        display: none;
      }
    `;
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
          Search the history of over 411 billion
          <a
            data-event-click-tracking="TopNav|WaybackMachineStatsLink"
            href="https://blog.archive.org/2016/10/23/defining-web-pages-web-sites-and-web-captures/"
            >web pages</a
          >
          on the Internet.
        </p>
        <fieldset>
          <a
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
