import { html } from "lit";
import DropdownMenu from "./dropdown-menu";
import userMenuCSS from "./styles/user-menu";
import KeyboardNavigation from "./lib/keyboard-navigation";
import { customElement } from "lit/decorators";

@customElement("user-menu")
export default class UserMenu extends DropdownMenu {
  static get styles() {
    return [DropdownMenu.styles, userMenuCSS];
  }

  static get properties() {
    const props = {
      ...DropdownMenu.properties,
      username: { type: String },
      screenName: { type: String },
    };
    return props;
  }

  constructor() {
    super();
    this.username = "";
  }

  updated(props) {
    if (props.has("open") && this.open) {
      const container = this.shadowRoot?.querySelector(".nav-container");

      if (container) {
        const keyboardNavigation = new KeyboardNavigation(
          container,
          "usermenu",
        );
        this.addEventListener("keydown", keyboardNavigation.handleKeyDown);
        this.removeEventListener("keydown", this.previousKeydownListener);
        this.previousKeydownListener = keyboardNavigation.handleKeyDown;
      }
    }
  }

  render() {
    return html`
      <div class="nav-container">
        <nav
          class="${this.menuClass}"
          aria-hidden="${this.ariaHidden}"
          aria-expanded="${this.ariaExpanded}"
        >
          <h3>${this.screenName}</h3>
          <ul>
            ${this.dropdownItems}
          </ul>
        </nav>
      </div>
    `;
  }
}
