import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import searchIcon from "./icon-search";
import logo from "./logo";

@customElement("ia-wayback-search")
export class WaybackSearch extends LitElement {
  @property({ type: Object }) queryHandler: {
    performQuery: (query: string) => void;
  } = {
    performQuery: (query: string) =>
      (window.location.href = `https://web.archive.org/web/*/${query}`),
  };

  @property({ type: String }) waybackPagesArchived = "916 billion";

  @query("#url") private urlInput!: HTMLInputElement;

  render() {
    return html`
      <form method="post" @submit=${this.handleSubmit}>
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

  static styles = css`
    :host {
      font: normal 1.2rem/1.5 var(--themeFontFamily);
    }

    form {
      max-width: 600px;
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
      padding: 0.7rem 2rem;
      margin: 1.5rem 0;
      box-sizing: border-box;
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
      width: 100%;
      max-width: 215px;
      max-height: 60px;
      margin-bottom: 1.3rem;
      vertical-align: middle;
    }

    input {
      display: block;
      width: 100%;
      height: 3rem;
      padding: 0.5rem 1rem 0.5rem 2.5rem;
      font: normal 1.2rem/1.5 var(--themeFontFamily);
      color: #858585;
      box-sizing: border-box;
      border: 1px solid var(--grey80);
      border-radius: 2rem;
      background: #eee;
    }

    input:focus {
      border-color: #66afe9;
      outline: none;
    }

    .search-field {
      position: relative;
      overflow: hidden;
    }

    .search-field svg {
      position: absolute;
      top: 2px;
      left: 3px;
      width: 2.4rem;
      height: 2.4rem;
    }

    .search-field .fill-color {
      fill: var(--iconFill);
    }

    input:focus + svg {
      display: none;
    }

    @media (min-width: 890px) {
      form {
        margin: 0 auto;
      }

      p {
        margin-bottom: 3rem;
        font-size: 1.6rem;
        text-align: center;
      }

      img {
        margin: 0;
      }

      fieldset {
        margin: 0 auto;
      }

      fieldset a,
      .search-field {
        display: inline-block;
        width: 49%;
        vertical-align: middle;
      }

      fieldset a {
        text-align: center;
      }

      .search-field svg {
        width: 2.8rem;
        height: 2.8rem;
      }

      .search-field .fill-color {
        fill: var(--desktopSearchIconFill);
      }
    }
  `;
}
