import { LitElement } from 'lit';

export interface IATopNavConfig {
  /**
   * Google Analytics event category
   */
  eventCategory: string;

  /**
   * Copy to display for number of pages archived at the top of the Wayback search form
   *
   * ie. "425 billion"
   */
  waybackPagesArchived: string;

  /**
   * Array of strings representing the values of options that should be hidden from search options
   */
  hiddenSearchOptions: [];
}

export interface IATopNavLink {
  /**
   * Link title
   */
  title: string;

  /**
   * Link url
   */
  url?: string;
}

export interface IATopNavIconLink extends IATopNavLink {
  /**
   * Icon URL
   */
  icon: string;
}

export interface IATopNavAnalyticsLink extends IATopNavLink {
  /**
   * Google analytics event name
   */
  analyticsEvent: string;
}

export interface IATopNavExternalLink extends IATopNavLink {
  /**
   * Is the link external or not
   */
  external: boolean;
}

export interface IATopNavMediaMenu {
  heading: string;
  iconLinks: IATopNavIconLink[];
  featuredLinks: IATopNavLink[];
  links: IATopNavLink[];
}

export interface IATopNavWaybackMenuConfig {
  mobileAppsLinks: IATopNavExternalLink[];
  browserExtensionsLinks: IATopNavExternalLink[];
  archiveItLinks: IATopNavExternalLink[];
}

export interface IATopNavMenuConfig {
  audio: IATopNavMediaMenu;
  images: IATopNavMediaMenu;
  more: IATopNavLink[];
  signedOut: IATopNavAnalyticsLink[];
  software: IATopNavMediaMenu;
  texts: IATopNavMediaMenu;
  user: IATopNavAnalyticsLink[];
  video: IATopNavMediaMenu;
  web: IATopNavWaybackMenuConfig;
}

export type IATopNavSecondIdentitySlotMode = 'allow' | '';

export declare class IATopNav extends LitElement {
  localLinks?: boolean;
  baseHost?: string;
  config?: IATopNavConfig;
  hideSearch?: boolean;
  mediaBaseHost?: string;
  menuSliderOpen?: boolean;
  openMenu?: string;
  screenName?: string;
  searchIn?: string;
  searchQuery?: string;
  secondIdentitySlotMode?: IATopNavSecondIdentitySlotMode;
  selectedMenuOption?: string;
  username?: string;
  userProfileImagePath?: string;
  menus: IATopNavMenuConfig;
  /**
   * Copy to display for number of pages archived at the top of the Wayback search form
   *
   * ie. "425 billion"
   */
  waybackPagesArchived?: string;
}
