import { html } from "lit";
import TrackedElement from "./tracked-element";
import toSentenceCase from "./lib/toSentenceCase";
import moreSliderCSS from "./styles/more-slider";
import formatUrl from "./lib/formatUrl";

class MoreSlider extends TrackedElement {
  static get properties() {
    return {
      baseHost: { type: String },
      config: { type: Object },
      menuItems: { type: Array },
    };
  }

  static get styles() {
    return moreSliderCSS;
  }

  analyticsEvent(title) {
    return `${this.config.eventCategory}|NavMore${toSentenceCase(title)}`;
  }

  render() {
    return html`
      <ul>
        ${this.menuItems.map(
          (item) =>
            html`<li>
              <a
                @click=${this.trackClick}
                href=${formatUrl(item.url, this.baseHost)}
                data-event-click-tracking="${this.analyticsEvent(item.title)}"
                >${item.title}</a
              >
            </li>`,
        )}
      </ul>
    `;
  }
}

customElements.define("more-slider", MoreSlider);
