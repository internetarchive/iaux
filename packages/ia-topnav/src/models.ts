export interface IATopNavConfig {
  /**
   * Google Analytics event category
   */
  eventCategory?: string;

  /**
   * Copy to display for number of pages archived at the top of the Wayback search form
   *
   * ie. "425 billion"
   */
  waybackPagesArchived?: string;

  /**
   * Array of strings representing the values of options that should be hidden from search options
   */
  hiddenSearchOptions?: string[];

  /**
   * Map from dropdown item ids to any callout text that should be applied beside them
   */
  callouts?: Record<string, string>;
}

export interface IATopNavLink {
  title: string;

  url?: string;

  class?: string;

  icon?: string;

  analyticsEvent?: string;

  external?: boolean;
}

// export interface IATopNavIconLink extends IATopNavLink {
//   /**
//    * Icon URL
//    */
//   icon: string;
// }

// export interface IATopNavAnalyticsLink extends IATopNavLink {
//   /**
//    * Google analytics event name
//    */
//   analyticsEvent?: string;
// }

// export interface IATopNavExternalLink extends IATopNavLink {
//   /**
//    * Is the link external or not
//    */
//   external: boolean;
// }

export interface IATopNavMediaMenu {
  heading: string;
  iconLinks: IATopNavLink[];
  featuredLinks: IATopNavLink[];
  links: IATopNavLink[];
  mobileAppsLinks: IATopNavLink[];
  browserExtensionsLinks: IATopNavLink[];
  archiveItLinks: IATopNavLink[];
}

// export interface IATopNavWaybackMenuConfig {
//   mobileAppsLinks: IATopNavLink[];
//   browserExtensionsLinks: IATopNavLink[];
//   archiveItLinks: IATopNavLink[];
// }

export interface IATopNavMenuConfig {
  audio: IATopNavMediaMenu;
  images: IATopNavMediaMenu;
  more: IATopNavMediaMenu;
  signedOut: IATopNavLink[];
  software: IATopNavMediaMenu;
  texts: IATopNavMediaMenu;
  user: IATopNavLink[];
  userAdmin: IATopNavLink[];
  userAdminFlags: IATopNavLink[];
  video: IATopNavMediaMenu;
  web: IATopNavMediaMenu;
}

export type IATopNavSecondIdentitySlotMode = 'allow' | '';

// export declare class IATopNav extends LitElement {
//   localLinks?: boolean;
//   baseHost?: string;
//   config?: IATopNavConfig;
//   hideSearch?: boolean;
//   mediaBaseHost?: string;
//   menuSliderOpen?: boolean;
//   openMenu?: string;
//   screenName?: string;
//   searchIn?: string;
//   searchQuery?: string;
//   secondIdentitySlotMode?: IATopNavSecondIdentitySlotMode;
//   selectedMenuOption?: string;
//   username?: string;
//   userProfileImagePath?: string;
//   menus: IATopNavMenuConfig;
//   /**
//    * Copy to display for number of pages archived at the top of the Wayback search form
//    *
//    * ie. "425 billion"
//    */
//   waybackPagesArchived?: string;
// }
