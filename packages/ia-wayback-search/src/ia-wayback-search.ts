import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import waybackSearchCSS from "./styles/wayback-search.js";
import searchIcon from "./icon-search.js";
import logo from "./logo.js";

@customElement("ia-wayback-search")
export default class WaybackSearch extends LitElement {
  @property({ type: Object }) queryHandler: {
    performQuery: (query: string) => void;
  } = {
    performQuery: () => {},
  };

  @property({ type: String }) waybackPagesArchived = "";

  @query("#url") urlInput!: HTMLInputElement;

  static get styles() {
    return waybackSearchCSS;
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const query = this.urlInput.value;
    this.emitWaybackSearchSubmitted(query);
    this.queryHandler.performQuery(query);
  }

  emitWaybackSearchSubmitted(query: string) {
    this.dispatchEvent(
      new CustomEvent("waybackSearchSubmitted", {
        detail: {
          query,
        },
      }),
    );
  }

  emitWaybackMachineStatsLinkClicked() {
    this.dispatchEvent(new CustomEvent("waybackMachineStatsLinkClicked"));
  }

  emitWaybackMachineLogoLinkClicked() {
    this.dispatchEvent(new CustomEvent("waybackMachineLogoLink"));
  }

  render() {
    this.waybackPagesArchived = this.getAttribute("waybackPagesArchived") ?? "";

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
            href="https://web.archive.org"
            >${logo}</a
          >
          <label for="url">Search the Wayback Machine</label>
          <div class="search-field">
            <input
              type="text"
              name="url"
              id="url"
              placeholder="enter URL or keywords"
            />
            ${searchIcon}
          </div>
        </fieldset>
      </form>
    `;
  }
}
