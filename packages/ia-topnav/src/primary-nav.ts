import { html, nothing, PropertyValues } from "lit";
import TrackedElement from "./tracked-element";
import icons from "./assets/img/icons";
import "./assets/img/hamburger";
import "./login-button";
import "./nav-search";
import "./media-menu";
import logoWordmarkStacked from "./assets/img/wordmark-stacked";
import primaryNavCSS from "./styles/primary-nav";
import locationHandler from "./lib/location-handler";
import formatUrl from "./lib/formatUrl";
import { property } from "lit/decorators.js";

class PrimaryNav extends TrackedElement {
  @property({ type: String }) mediaBaseHost = "https://archive.org";
  @property({ type: String }) baseHost = "";
  @property({ type: Boolean }) hideSearch = false;
  @property({ type: Object }) config: { eventCategory: string } | undefined;
  @property({ type: String }) openMenu = "";
  @property({ type: String }) screenName = "";
  @property({ type: String }) searchIn = "";
  @property({ type: String }) searchQuery = "";
  @property({ type: String }) secondIdentitySlotMode = "";
  @property({ type: String }) selectedMenuOption = "";
  @property({ type: Boolean }) signedOutMenuOpen = false;
  @property({ type: Boolean }) userMenuOpen = false;
  @property({ type: String }) username = "";
  @property({ type: String }) userProfileImagePath = "";
  @property({ type: Object }) currentTab:
    | { mediatype: string; moveTo: string }
    | undefined;
  signedOutMenuToggled: unknown;

  static get styles() {
    return primaryNavCSS;
  }

  toggleMediaMenu(e: Event) {
    this.trackClick(e);
    this.dispatchEvent(
      new CustomEvent("menuToggled", {
        detail: {
          menuName: "media",
        },
      }),
    );
  }

  toggleSearchMenu(e: Event) {
    this.trackClick(e);
    this.dispatchEvent(
      new CustomEvent("menuToggled", {
        detail: {
          menuName: "search",
        },
      }),
    );
  }

  toggleUserMenu(e: Event) {
    this.trackClick(e);
    this.dispatchEvent(
      new CustomEvent("menuToggled", {
        detail: {
          menuName: "user",
        },
      }),
    );
  }

  updated(props: PropertyValues) {
    if (props.has("currentTab")) {
      // early return
      if (!this.currentTab || Object.keys(this.currentTab).length === 0)
        return nothing;

      const isUserMenuTab =
        this.currentTab && this.currentTab.mediatype === "usermenu";
      if (isUserMenuTab) {
        const mediaButtons = Array.from(
          this.shadowRoot
            ?.querySelector("media-menu")
            ?.shadowRoot?.querySelectorAll("media-button") ?? [],
        );
        const lastMediaButton = mediaButtons.filter((element) => {
          return element.shadowRoot
            ?.querySelector("a")
            ?.classList.contains("images");
        });

        const focusElement =
          this.currentTab.moveTo === "next"
            ? this.shadowRoot?.querySelector("a.upload")
            : lastMediaButton[0]?.shadowRoot?.querySelector("a.menu-item");

        if (focusElement) {
          (focusElement as HTMLElement).focus();
        }
      } else if (this.currentTab.moveTo === "next") {
        if (this.shadowRoot?.querySelector(".user-menu")) {
          (this.shadowRoot?.querySelector(".user-menu") as HTMLElement).focus();
        } else {
          (
            this.shadowRoot
              ?.querySelector("login-button")
              ?.shadowRoot?.querySelectorAll("span a")[0] as HTMLElement
          )?.focus();
        }
      }
    }
  }

  get userIcon() {
    const userMenuClass = this.openMenu === "user" ? "active" : "";
    const userMenuToolTip =
      this.openMenu === "user" ? "Close user menu" : "Expand user menu";

    return html`
      <button
        class="user-menu ${userMenuClass}"
        title="${userMenuToolTip}"
        @click="${this.toggleUserMenu}"
        data-event-click-tracking="${this.config?.eventCategory}|NavUserMenu"
      >
        <img
          src="${this.mediaBaseHost}${this.userProfileImagePath}"
          alt="${this.screenName}"
        />
        <span class="screen-name" dir="auto">${this.screenName}</span>
      </button>
    `;
  }

  get loginIcon() {
    return html`
      <login-button
        .baseHost=${this.baseHost}
        .config=${this.config}
        .dropdownOpen=${this.signedOutMenuOpen}
        .openMenu=${this.openMenu}
        @signedOutMenuToggled=${this.signedOutMenuToggled}
      ></login-button>
    `;
  }

  get searchMenuOpen() {
    return this.openMenu === "search";
  }

  get allowSecondaryIcon() {
    return this.secondIdentitySlotMode === "allow";
  }

  get searchMenu() {
    if (this.hideSearch) return nothing;

    return html`
      <button
        class="search-trigger"
        @click="${this.toggleSearchMenu}"
        data-event-click-tracking="${this.config?.eventCategory}|NavSearchOpen"
      >
        ${icons.search}
      </button>
      <nav-search
        .baseHost=${this.baseHost}
        .config=${this.config}
        .locationHandler=${locationHandler}
        .open=${this.searchMenuOpen}
        .openMenu=${this.openMenu}
        .searchIn=${this.searchIn}
        .searchQuery=${this.searchQuery}
      ></nav-search>
    `;
  }

  get mobileDonateHeart() {
    return html`
      <a
        class="mobile-donate-link"
        .href=${formatUrl(
          "/donate/?origin=iawww-mbhrt" as string & Location,
          this.baseHost,
        )}
      >
        ${icons.donateUnpadded}
        <span class="sr-only">"Donate to the archive"</span>
      </a>
    `;
  }

  get uploadButtonTemplate() {
    return html` <a
      .href="${formatUrl("/create" as string & Location, this.baseHost)}"
      class="upload"
      @focus=${this.toggleMediaMenu}
    >
      ${icons.upload}
      <span>Upload</span>
    </a>`;
  }

  get userStateTemplate() {
    return html`<div class="user-info">
      ${this.username ? this.userIcon : this.loginIcon}
    </div>`;
  }

  get secondLogoSlot() {
    return this.allowSecondaryIcon
      ? html`
          <slot name="opt-sec-logo"></slot>
          <slot name="opt-sec-logo-mobile"></slot>
        `
      : nothing;
  }

  get secondLogoClass() {
    return this.allowSecondaryIcon ? "second-logo" : "";
  }

  render() {
    const mediaMenuTabIndex = this.openMenu === "media" ? "" : "-1";
    return html`
      <nav class=${this.hideSearch ? "hide-search" : ""}>
        <button
          class="hamburger"
          @click="${this.toggleMediaMenu}"
          data-event-click-tracking="${this.config?.eventCategory}|NavHamburger"
          title="Open main menu"
        >
          <icon-hamburger ?active=${this.openMenu === "media"}></icon-hamburger>
        </button>

        <div class=${`branding ${this.secondLogoClass}`}>
          <a
            .href=${formatUrl("/" as string & Location, this.baseHost)}
            @click=${this.trackClick}
            data-event-click-tracking="${this.config?.eventCategory}|NavHome"
            title="Go home"
            class="link-home"
            >${icons.iaLogo}${logoWordmarkStacked}</a
          >
          ${this.secondLogoSlot}
        </div>
        <media-menu
          .baseHost=${this.baseHost}
          .config=${this.config}
          ?mediaMenuAnimate="${this.mediaMenuAnimate}"
          .selectedMenuOption=${this.selectedMenuOption}
          .openMenu=${this.openMenu}
          .currentTab=${this.currentTab}
        ></media-menu>
        <div class="right-side-section">
          ${this.mobileDonateHeart} ${this.userStateTemplate}
          ${this.uploadButtonTemplate} ${this.searchMenu}
        </div>
      </nav>
    `;
  }
}

customElements.define("primary-nav", PrimaryNav);
