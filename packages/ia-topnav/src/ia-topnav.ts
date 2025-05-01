import { LitElement, PropertyValues, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { buildTopNavMenus, defaultTopNavConfig } from './data/menus';
import './desktop-subnav';
import './dropdown-menu';
import './media-slider';
import {
  IATopNavConfig,
  IATopNavMenuConfig,
  IATopNavSecondIdentitySlotMode,
} from './models';
import './primary-nav';
import './search-menu';
import './signed-out-dropdown';
import iaTopNavCSS from './styles/ia-topnav';
import './user-menu';

@customElement('ia-topnav')
export default class IATopNav extends LitElement {
  @property({ type: Boolean }) localLinks = false;

  @property({ type: String }) waybackPagesArchived = '';

  @property({ type: String }) baseHost = 'https://archive.org';

  @property({ type: String }) mediaBaseHost = 'https://archive.org';

  @property({ type: Boolean }) admin = false;

  @property({ type: Boolean }) canManageFlags = false;

  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;

  @property({ type: Boolean }) hideSearch = false;

  @property({ type: String }) itemIdentifier = '';

  @property({ type: Boolean }) mediaSliderOpen = false;

  @property({ type: String }) openMenu = '';

  @property({ type: String }) screenName: string = '';

  @property({ type: String }) searchIn = '';

  @property({ type: String }) searchQuery = '';

  @property({ type: String }) selectedMenuOption = '';

  @property({ type: String }) username: string = '';

  @property({ type: String }) userProfileImagePath =
    '/services/img/user/profile';

  @property({ type: String })
  secondIdentitySlotMode: IATopNavSecondIdentitySlotMode = '';

  @property({ type: Object }) currentTab?: {
    mediatype: string;
    moveTo: string;
  };

  @state() private menus: IATopNavMenuConfig = buildTopNavMenus();

  private get normalizedBaseHost() {
    return !this.localLinks ? this.baseHost : '';
  }

  static get styles() {
    return iaTopNavCSS;
  }

  updated(props: PropertyValues) {
    if (
      props.has('username') ||
      props.has('waybackPagesArchived') ||
      props.has('itemIdentifier') ||
      props.has('localLinks') ||
      props.has('baseHost')
    ) {
      this.menuSetup();
    }
  }

  firstUpdated() {
    // close open menu on `esc` click
    document.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Escape') {
          this.openMenu = '';
          this.mediaSliderOpen = false;
        }
      },
      false,
    );
  }

  menuSetup() {
    // re/build the nav
    this.menus = buildTopNavMenus(
      this.username,
      this.normalizedBaseHost,
      this.waybackPagesArchived,
      this.itemIdentifier,
    );
  }

  menuToggled(e: CustomEvent) {
    const currentMenu = this.openMenu;
    this.openMenu = currentMenu === e.detail.menuName ? '' : e.detail.menuName;
    // Keeps media slider open if media menu is open
    if (this.openMenu === 'media') {
      return;
    }
    this.closeMediaSlider();
  }

  openMediaSlider() {
    this.mediaSliderOpen = true;
  }

  closeMediaSlider() {
    this.mediaSliderOpen = false;
    this.selectedMenuOption = '';
  }

  closeMenus() {
    this.openMenu = '';
    this.closeMediaSlider();
  }

  searchInChanged(e: CustomEvent) {
    this.searchIn = e.detail.searchIn;
  }

  trackClick(e: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('analyticsClick', {
        bubbles: true,
        composed: true,
        detail: e.detail,
      }),
    );
  }

  trackSubmit(e: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('analyticsSubmit', {
        bubbles: true,
        composed: true,
        detail: e.detail,
      }),
    );
  }

  mediaTypeSelected(e: CustomEvent) {
    if (this.selectedMenuOption === e.detail.mediatype) {
      this.closeMediaSlider();
      return;
    }
    this.selectedMenuOption = e.detail.mediatype;
    this.openMediaSlider();
  }

  get searchMenuOpened() {
    return this.openMenu === 'search';
  }

  get signedOutOpened() {
    return this.openMenu === 'login';
  }

  get userMenuOpened() {
    return this.openMenu === 'user';
  }

  get searchMenuTabIndex() {
    return this.searchMenuOpened ? '' : '-1';
  }

  get userMenuTabIndex() {
    return this.userMenuOpened ? '' : '-1';
  }

  get signedOutTabIndex() {
    return this.signedOutOpened ? '' : '-1';
  }

  get closeLayerClass() {
    return !!this.openMenu || this.mediaSliderOpen ? 'visible' : '';
  }

  get userMenu() {
    return html`
      <user-menu
        .baseHost=${this.normalizedBaseHost}
        .config=${this.config}
        .menuItems=${this.userMenuItems}
        ?open=${this.openMenu === 'user'}
        .username=${this.username}
        ?hideSearch=${this.hideSearch}
        tabindex="${this.userMenuTabIndex}"
        @menuToggled=${this.menuToggled}
        @trackClick=${this.trackClick}
        @focusToOtherMenuItem=${(e: CustomEvent) =>
          (this.currentTab = e.detail)}
      ></user-menu>
    `;
  }

  get signedOutDropdown() {
    return html`
      <signed-out-dropdown
        .baseHost=${this.normalizedBaseHost}
        .config=${this.config}
        .open=${this.signedOutOpened}
        ?hideSearch=${this.hideSearch}
        tabindex="${this.signedOutTabIndex}"
        .menuItems=${this.signedOutMenuItems}
      ></signed-out-dropdown>
    `;
  }

  get signedOutMenuItems() {
    return this.menus.signedOut;
  }

  /**
   * Most users just get the basic menu items.
   * For users with `/items` priv, additional admin menu items are included too.
   * Having the `/flags` priv adds a further admin item for managing flags.
   */
  get userMenuItems() {
    const basicItems = this.menus.user;

    let adminItems = this.menus.userAdmin;
    if (this.canManageFlags) {
      adminItems = adminItems.concat(this.menus.userAdminFlags);
    }

    return this.itemIdentifier && this.admin
      ? [basicItems, adminItems]
      : [basicItems];
  }

  get allowSecondaryIcon() {
    return this.secondIdentitySlotMode === 'allow';
  }

  get secondLogoSlot() {
    return this.allowSecondaryIcon
      ? html`
          <slot name="opt-sec-logo" slot="opt-sec-logo"></slot>
          <slot name="opt-sec-logo-mobile" slot="opt-sec-logo-mobile"></slot>
        `
      : nothing;
  }

  get separatorTemplate() {
    return html`<li class="divider" role="presentation"></li>`;
  }

  render() {
    return html`
      <div class="topnav">
        <primary-nav
          .baseHost=${this.normalizedBaseHost}
          .mediaBaseHost=${this.mediaBaseHost}
          .config=${this.config}
          .openMenu=${this.openMenu}
          .screenName=${this.screenName}
          .searchIn=${this.searchIn}
          .searchQuery=${this.searchQuery}
          .secondIdentitySlotMode=${this.secondIdentitySlotMode}
          .selectedMenuOption=${this.selectedMenuOption}
          .username=${this.username}
          .userProfileImagePath=${this.userProfileImagePath}
          .currentTab=${this.currentTab}
          ?hideSearch=${this.hideSearch}
          @mediaTypeSelected=${this.mediaTypeSelected}
          @trackClick=${this.trackClick}
          @trackSubmit=${this.trackSubmit}
          @menuToggled=${this.menuToggled}
        >
          ${this.secondLogoSlot}
        </primary-nav>
        <desktop-subnav
          .baseHost=${this.normalizedBaseHost}
          .menuItems=${this.menus.more.links}
          @focus=${this.closeMenus}
        ></desktop-subnav>
        <media-slider
          .baseHost=${this.normalizedBaseHost}
          .config=${this.config}
          .selectedMenuOption=${this.selectedMenuOption}
          .mediaSliderOpen=${this.mediaSliderOpen}
          .menus=${this.menus}
          tabindex="${this.mediaSliderOpen ? '1' : '-1'}"
          @focusToOtherMenuItem=${(e: CustomEvent) =>
            (this.currentTab = e.detail)}
        ></media-slider>
      </div>
      ${this.username ? this.userMenu : this.signedOutDropdown}
      <search-menu
        .baseHost=${this.normalizedBaseHost}
        .config=${this.config}
        .openMenu=${this.openMenu}
        tabindex="${this.searchMenuTabIndex}"
        ?hideSearch=${this.hideSearch}
        @searchInChanged=${this.searchInChanged}
        @trackClick=${this.trackClick}
        @trackSubmit=${this.trackSubmit}
      ></search-menu>
      <div
        id="close-layer"
        class="${this.closeLayerClass}"
        @click=${this.closeMenus}
      ></div>
    `;
  }
}
