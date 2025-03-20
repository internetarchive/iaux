import { html } from "lit";
import TrackedElement from "./tracked-element";
import icons from "./assets/img/icons";
import loginButtonCSS from "./styles/login-button";
import formatUrl from "./lib/formatUrl";
import { customElement, property, state } from "lit/decorators.js";

@customElement("login-button")
class LoginButton extends TrackedElement {
  @property({ type: String }) baseHost = "";
  @property({ type: Object }) config:
    | {
        eventCategory: string;
      }
    | undefined;
  @property({ type: String }) openMenu = "";

  @state() private dropdownTabIndex = "";

  static get styles() {
    return loginButtonCSS;
  }

  get signupPath() {
    return formatUrl("/account/signup", this.baseHost);
  }

  get loginPath() {
    return formatUrl("/account/login", this.baseHost);
  }

  get analyticsEvent() {
    return `${this.config?.eventCategory}|NavLoginIcon`;
  }

  get menuOpened() {
    return this.openMenu === "login";
  }

  get avatarClass() {
    return `dropdown-toggle${this.menuOpened ? " active" : ""}`;
  }

  toggleDropdown(e: Event) {
    e.preventDefault();
    this.trackClick(e);
    this.dropdownTabIndex = this.menuOpened ? "" : "-1";
    this.dispatchEvent(
      new CustomEvent("menuToggled", {
        bubbles: true,
        composed: true,
        detail: {
          menuName: "login",
        },
      }),
    );
  }

  render() {
    return html`
      <div class="logged-out-toolbar">
        <a
          class="${this.avatarClass}"
          @click=${this.toggleDropdown}
          data-event-click-tracking="${this.analyticsEvent}"
        >
          ${icons.user}
        </a>
        <span>
          <a href="${this.signupPath}">Sign up</a>
          |
          <a href="${this.loginPath}">Log in</a>
        </span>
      </div>
    `;
  }
}
