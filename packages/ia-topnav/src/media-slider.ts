import { LitElement, PropertyValues, html } from "lit";
import "./media-subnav";
import mediaSliderCSS from "./styles/media-slider";
import KeyboardNavigation from "./lib/keyboard-navigation";
import { property } from "lit/decorators.js";

class MediaSlider extends LitElement {
  @property({ type: String }) baseHost = "";
  @property({ type: Object }) config = {};
  @property({ type: Boolean }) mediaSliderOpen = false;
  @property({ type: Object }) menus = {};
  @property({ type: String }) selectedMenuOption = "texts";

  private previousKeydownListener:
    | ((this: HTMLElement, ev: KeyboardEvent) => any)
    | undefined;

  static get styles() {
    return mediaSliderCSS;
  }

  updated(props: PropertyValues) {
    if (props.has("selectedMenuOption") && this.selectedMenuOption) {
      const container = this.shadowRoot?.querySelector(".has-focused"); //?.shadowRoot;

      if (container) {
        const keyboardNavigation = new KeyboardNavigation(
          container as HTMLElement,
          this.selectedMenuOption,
        );
        this.addEventListener("keydown", keyboardNavigation.handleKeyDown);
        if (this.previousKeydownListener) {
          this.removeEventListener("keydown", this.previousKeydownListener);
        }
        this.previousKeydownListener = keyboardNavigation.handleKeyDown;
      }
    }
  }

  shouldUpdate() {
    const scrollPane = this.shadowRoot
      ? this.shadowRoot.querySelector(".information-menu")
      : null;

    if (scrollPane) {
      scrollPane.scrollTop = 0;
    }
    return true;
  }

  render() {
    const sliderDetailsClass = this.mediaSliderOpen ? "open" : "closed";

    return html`
      <div class="media-slider-container">
        <div class="overflow-clip ${sliderDetailsClass}">
          <div class="information-menu ${sliderDetailsClass}">
            <div class="info-box">
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === "audio"
                  ? "has-focused"
                  : "hidden"}"
                menu="audio"
                .menuItems=${this.menus.audio}
              ></media-subnav>
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === "images"
                  ? "has-focused"
                  : "hidden"}"
                menu="images"
                .menuItems=${this.menus.images}
              ></media-subnav>
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === "software"
                  ? "has-focused"
                  : "hidden"}"
                menu="software"
                .menuItems=${this.menus.software}
              ></media-subnav>
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === "texts"
                  ? "has-focused"
                  : "hidden"}"
                menu="texts"
                .menuItems=${this.menus.texts}
              ></media-subnav>
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === "video"
                  ? "has-focused"
                  : "hidden"}"
                menu="video"
                .menuItems=${this.menus.video}
              ></media-subnav>
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === "web"
                  ? "has-focused"
                  : "hidden"}"
                menu="web"
                .menuItems=${this.menus.web}
              ></media-subnav>
              <media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === "more"
                  ? "has-focused"
                  : "hidden"}"
                menu="more"
                .menuItems=${this.menus.more}
              ></media-subnav>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("media-slider", MediaSlider);
