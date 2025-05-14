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

export interface IATopNavMediaMenu {
  heading: string;
  iconLinks: IATopNavLink[];
  featuredLinks: IATopNavLink[];
  links: IATopNavLink[];
  mobileAppsLinks: IATopNavLink[];
  browserExtensionsLinks: IATopNavLink[];
  archiveItLinks: IATopNavLink[];
}

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
