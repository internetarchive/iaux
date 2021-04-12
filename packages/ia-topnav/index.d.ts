import { LitElement } from 'lit-element';

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
   * Full URL to upload path. Differs on Petabox if user is admin && in category page
   *
   * ie. 'https://archive.org/create'
   */
  uploadURL: string;

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
  iconLinks: IconLink[];
  featuredLinks: Link[];
  links: Link[];
}

export declare class IATopNav extends LitElement {
  baseHost?: string;
  mediaBaseHost?: string;
  username?: string;
  screenName?: string;
  searchQuery?: string;
  hideSearch?: boolean;
  config: IATopNavConfig;
  menus: {
    web: IATopNavMediaMenu;
    texts: IATopNavMediaMenu;
    video: IATopNavMediaMenu;
    audio: IATopNavMediaMenu;
    software: IATopNavMediaMenu;
    images: IATopNavMediaMenu;
    donate: IATopNavMediaMenu;
    signedOut: IATopNavAnalyticsLink[];
    user: IATopNavAnalyticsLink[];
    more: IATopNavLink[];
    wayback: {
      mobileAppsLinks: IATopNavExternalLink[];
      browserExtensionsLinks: IATopNavExternalLink[];
      archiveItLinks: IATopNavExternalLink[];
    }
  };
}
