import { LitElement, html, css } from 'lit-element';
import mediaSliderCss from './css/media-slider';
import menus from './data/menus';

class WaybackSearch extends LitElement {
  static get styles() {
    return css`
      form {
        padding: 0 5rem 0 2rem;
      }

      p {
        font-weight: 200;
      }

      a {
        font-weight: 500;
        text-decoration: none;
        color: var(--activeColor);
      }

      fieldset {
        max-width: 600px;
        padding: .7rem 2rem;
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
        max-width: 100%;
        vertical-align: middle;
      }

      input {
        display: block;
        width: 100%;
        height: 3rem;
        padding: .5rem 1rem .5rem 2.5rem;
        font-size: 1.2rem;
        line-height: 1.5;
        box-sizing: border-box;
        border-radius: 2rem;
        background: #eee;
      }
    `;
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

class MediaSlider extends LitElement {
  constructor() {
    super();
    this.mediaSliderOpen = false;
    this.mediaSliderAnimate = false;
    this.selectedMenuOption = 'texts';

    // Begin properties not monitored by LitElement
    this.links = menus[this.selectedMenuOption];
    this.templates = {
      web: () => html`<wayback-search></wayback-search>`
    };
  }

  static get properties() {
    return {
      mediaSliderOpen: { type: Boolean },
      mediaSliderAnimate: { type: Boolean },
      selectedMenuOption: { type: String },
    };
  }

  shouldUpdate() {
    const defaults = { iconLinks: [], featuredLinks: [], links: [] };
    this.links = menus[this.selectedMenuOption] || defaults;
    return true;
  }

  renderIconLinks() {
    return this.links.iconLinks.map((link) => (
      html`<a href="${link.url}"><img src="${link.icon}" />${link.title}</a>`
    ));
  }

  renderLinks(category) {
    return this.links[category].map((link) => html`<li><a href="${link.url}">${link.title}</a></li>`);
  }

  renderSubnav() {
    const template = this.templates[this.selectedMenuOption];

    if (template) {
      return template();
    }

    return html`
      <h3>${this.links.heading}</h3>
      <div class="icon-links">
        ${this.renderIconLinks()}
      </div>
      <h4>Featured</h4>
      <ul>
        ${this.renderLinks('featuredLinks')}
      </ul>
      <h4>Top</h4>
      <ul>
        ${this.renderLinks('links')}
      </ul>
    `;
  }

  render() {
    let sliderDetailsClass = 'menu-slider-offscreen';

    if (this.mediaSliderOpen) {
      sliderDetailsClass = 'menu-enter';
    }

    if (!this.mediaSliderOpen && this.mediaSliderAnimate) {
      sliderDetailsClass = 'menu-exit';
    }

    return html`
      <div class="information-menu ${sliderDetailsClass}">
        <div class="info-box">
          ${this.renderSubnav()}
        </div>
      </div>
    `;
  }

  static get styles() {
    return mediaSliderCss();
  }
}

customElements.define('wayback-search', WaybackSearch);
customElements.define('media-slider', MediaSlider);
