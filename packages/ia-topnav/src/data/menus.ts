// @see https://git.archive.org/www/offshoot/-/blob/main/guides/update-top-nav.md

import { IATopNavConfig, IATopNavMenuConfig } from '../models';

export const defaultTopNavConfig: IATopNavConfig = {
  // Google Analytics event category
  eventCategory: 'TopNav',
  // Array of strings representing the values of options that should be hidden from search options
  hiddenSearchOptions: [],
  // Default value, if more accurate value is not passed in to `buildTopNavMenus()`
  waybackPagesArchived: '1 trillion',
};

/**
 * Creates archive.org top navigation configuration
 * @param { string } userid archive.org account (immutable) userid
 * @param { boolean } localLinks passing in false will ensure all links begin: https://archive.org
 * @param { string } waybackPagesArchived label readable 'how many pages in WayBack machine?'
 *                                        If you don't pass in something, you'll get the potentially
 *                                        older/less accurate version.
 * @param { string } itemIdentifier The current item being viewed, to populate admin menu items
 * @returns { object }
 */
export function buildTopNavMenus(
  userid: string = '___USERID___',
  baseHost: string = 'https://archive.org',
  waybackPagesArchived: string = '',
  itemIdentifier: string = '',
): IATopNavMenuConfig {
  if (waybackPagesArchived)
    defaultTopNavConfig.waybackPagesArchived = waybackPagesArchived; // update to more accurate val

  return {
    audio: {
      heading: 'Internet Archive Audio',
      iconLinks: [
        {
          icon: `${baseHost}/services/img/etree`,
          title: 'Live Music Archive',
          url: `${baseHost}/details/etree`,
        },
        {
          icon: `${baseHost}/services/img/librivoxaudio`,
          title: 'Librivox Free Audio',
          url: `${baseHost}/details/librivoxaudio`,
        },
      ],
      featuredLinks: [
        {
          title: 'All Audio',
          url: `${baseHost}/details/audio`,
        },
        {
          title: 'Grateful Dead',
          url: `${baseHost}/details/GratefulDead`,
        },
        {
          title: 'Netlabels',
          url: `${baseHost}/details/netlabels`,
        },
        {
          title: 'Old Time Radio',
          url: `${baseHost}/details/oldtimeradio`,
        },
        {
          title: '78 RPMs and Cylinder Recordings',
          url: `${baseHost}/details/78rpm`,
        },
      ],
      links: [
        {
          title: 'Audio Books & Poetry',
          url: `${baseHost}/details/audio_bookspoetry`,
        },
        {
          title: 'Computers, Technology and Science',
          url: `${baseHost}/details/audio_tech`,
        },
        {
          title: 'Music, Arts & Culture',
          url: `${baseHost}/details/audio_music`,
        },
        {
          title: 'News & Public Affairs',
          url: `${baseHost}/details/audio_news`,
        },
        {
          title: 'Spirituality & Religion',
          url: `${baseHost}/details/audio_religion`,
        },
        {
          title: 'Podcasts',
          url: `${baseHost}/details/podcasts`,
        },
        {
          title: 'Radio News Archive',
          url: `${baseHost}/details/radio`,
        },
      ],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    },
    images: {
      heading: 'Images',
      iconLinks: [
        {
          icon: `${baseHost}/services/img/metropolitanmuseumofart-gallery`,
          title: 'Metropolitan Museum',
          url: `${baseHost}/details/metropolitanmuseumofart-gallery`,
        },
        {
          icon: `${baseHost}/services/img/clevelandart`,
          title: 'Cleveland Museum of Art',
          url: `${baseHost}/details/clevelandart`,
        },
      ],
      featuredLinks: [
        {
          title: 'All Images',
          url: `${baseHost}/details/image`,
        },
        {
          title: 'Flickr Commons',
          url: `${baseHost}/details/flickrcommons`,
        },
        {
          title: 'Occupy Wall Street Flickr',
          url: `${baseHost}/details/flickr-ows`,
        },
        {
          title: 'Cover Art',
          url: `${baseHost}/details/coverartarchive`,
        },
        {
          title: 'USGS Maps',
          url: `${baseHost}/details/maps_usgs`,
        },
      ],
      links: [
        {
          title: 'NASA Images',
          url: `${baseHost}/details/nasa`,
        },
        {
          title: 'Solar System Collection',
          url: `${baseHost}/details/solarsystemcollection`,
        },
        {
          title: 'Ames Research Center',
          url: `${baseHost}/details/amesresearchcenterimagelibrary`,
        },
      ],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    },
    more: {
      links: [
        {
          title: 'About',
          url: `${baseHost}/about/`,
        },
        {
          title: 'Blog',
          url: 'https://blog.archive.org',
        },
        {
          title: 'Events',
          url: `${baseHost}/events`,
        },
        {
          title: 'Projects',
          url: `${baseHost}/projects/`,
        },
        {
          title: 'Help',
          url: `${baseHost}/about/faqs.php`,
        },
        {
          title: 'Donate',
          url: `${baseHost}/donate?origin=iawww-TopNavDonateButton`,
        },
        {
          title: 'Contact',
          url: `${baseHost}/about/contact`,
        },
        {
          title: 'Jobs',
          url: `${baseHost}/about/jobs`,
        },
        {
          title: 'Volunteer',
          url: `${baseHost}/about/volunteer-positions`,
        },
      ],
      heading: '',
      iconLinks: [],
      featuredLinks: [],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    },
    software: {
      heading: 'Software',
      iconLinks: [
        {
          icon: `${baseHost}/services/img/internetarcade`,
          title: 'Internet Arcade',
          url: `${baseHost}/details/internetarcade`,
        },
        {
          icon: `${baseHost}/services/img/consolelivingroom`,
          title: 'Console Living Room',
          url: `${baseHost}/details/consolelivingroom`,
        },
      ],
      featuredLinks: [
        {
          title: 'All Software',
          url: `${baseHost}/details/software`,
        },
        {
          title: 'Old School Emulation',
          url: `${baseHost}/details/tosec`,
        },
        {
          title: 'MS-DOS Games',
          url: `${baseHost}/details/softwarelibrary_msdos_games`,
        },
        {
          title: 'Historical Software',
          url: `${baseHost}/details/historicalsoftware`,
        },
        {
          title: 'Classic PC Games',
          url: `${baseHost}/details/classicpcgames`,
        },
        {
          title: 'Software Library',
          url: `${baseHost}/details/softwarelibrary`,
        },
      ],
      links: [
        {
          title: 'Kodi Archive and Support File',
          url: `${baseHost}/details/kodi_archive`,
        },
        {
          title: 'Vintage Software',
          url: `${baseHost}/details/vintagesoftware`,
        },
        {
          title: 'APK',
          url: `${baseHost}/details/apkarchive`,
        },
        {
          title: 'MS-DOS',
          url: `${baseHost}/details/softwarelibrary_msdos`,
        },
        {
          title: 'CD-ROM Software',
          url: `${baseHost}/details/cd-roms`,
        },
        {
          title: 'CD-ROM Software Library',
          url: `${baseHost}/details/cdromsoftware`,
        },
        {
          title: 'Software Sites',
          url: `${baseHost}/details/softwaresites`,
        },
        {
          title: 'Tucows Software Library',
          url: `${baseHost}/details/tucows`,
        },
        {
          title: 'Shareware CD-ROMs',
          url: `${baseHost}/details/cdbbsarchive`,
        },
        {
          title: 'Software Capsules Compilation',
          url: `${baseHost}/details/softwarecapsules`,
        },
        {
          title: 'CD-ROM Images',
          url: `${baseHost}/details/cdromimages`,
        },
        {
          title: 'ZX Spectrum',
          url: `${baseHost}/details/softwarelibrary_zx_spectrum`,
        },
        {
          title: 'DOOM Level CD',
          url: `${baseHost}/details/doom-cds`,
        },
      ],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    },
    texts: {
      heading: 'Texts',
      iconLinks: [
        {
          title: 'Open Library',
          icon: `${baseHost}/images/widgetOL.png`,
          url: 'https://openlibrary.org/',
        },
        {
          title: 'American Libraries',
          icon: `${baseHost}/services/img/americana`,
          url: `${baseHost}/details/americana`,
        },
      ],
      featuredLinks: [
        {
          title: 'All Texts',
          url: `${baseHost}/details/texts`,
        },
        {
          title: 'Smithsonian Libraries',
          url: `${baseHost}/details/smithsonian`,
        },
        {
          title: 'FEDLINK (US)',
          url: `${baseHost}/details/fedlink`,
        },
        {
          title: 'Genealogy',
          url: `${baseHost}/details/genealogy`,
        },
        {
          title: 'Lincoln Collection',
          url: `${baseHost}/details/lincolncollection`,
        },
      ],
      links: [
        {
          title: 'American Libraries',
          url: `${baseHost}/details/americana`,
        },
        {
          title: 'Canadian Libraries',
          url: `${baseHost}/details/toronto`,
        },
        {
          title: 'Universal Library',
          url: `${baseHost}/details/universallibrary`,
        },
        {
          title: 'Project Gutenberg',
          url: `${baseHost}/details/gutenberg`,
        },
        {
          title: "Children's Library",
          url: `${baseHost}/details/iacl`,
        },
        {
          title: 'Biodiversity Heritage Library',
          url: `${baseHost}/details/biodiversity`,
        },
        {
          title: 'Books by Language',
          url: `${baseHost}/details/booksbylanguage`,
        },
        {
          title: 'Additional Collections',
          url: `${baseHost}/details/additional_collections`,
        },
      ],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    },
    web: {
      mobileAppsLinks: [
        {
          url: 'https://apps.apple.com/us/app/wayback-machine/id1201888313',
          title: 'Wayback Machine (iOS)',
          external: true,
        },
        {
          url: 'https://play.google.com/store/apps/details?id=com.internetarchive.waybackmachine',
          title: 'Wayback Machine (Android)',
          external: true,
        },
      ],
      browserExtensionsLinks: [
        {
          url: 'https://chrome.google.com/webstore/detail/wayback-machine/fpnmgdkabkmnadcjpehmlllkndpkmiak',
          title: 'Chrome',
          external: true,
        },
        {
          url: 'https://addons.mozilla.org/en-US/firefox/addon/wayback-machine_new/',
          title: 'Firefox',
          external: true,
        },
        {
          url: 'https://apps.apple.com/us/app/wayback-machine/id1472432422?mt=12',
          title: 'Safari',
          external: true,
        },
        {
          url: 'https://microsoftedge.microsoft.com/addons/detail/wayback-machine/kjmickeoogghaimmomagaghnogelpcpn?hl=en-US',
          title: 'Edge',
          external: true,
        },
      ],
      archiveItLinks: [
        {
          url: 'https://www.archive-it.org/explore',
          title: 'Explore the Collections',
          external: true,
        },
        {
          url: 'https://www.archive-it.org/blog/learn-more/',
          title: 'Learn More',
          external: true,
        },
        {
          url: 'https://www.archive-it.org/contact-us',
          title: 'Build Collections',
          external: true,
        },
      ],
      heading: '',
      iconLinks: [],
      featuredLinks: [],
      links: [],
    },
    video: {
      heading: 'Video',
      iconLinks: [
        {
          icon: `${baseHost}/services/img/tv`,
          title: 'TV News',
          url: `${baseHost}/details/tv`,
        },
        {
          icon: `${baseHost}/services/img/911`,
          title: 'Understanding 9/11',
          url: `${baseHost}/details/911`,
        },
      ],
      featuredLinks: [
        {
          title: 'All Video',
          url: `${baseHost}/details/movies`,
        },
        {
          title: 'Prelinger Archives',
          url: `${baseHost}/details/prelinger`,
        },
        {
          title: 'Democracy Now!',
          url: `${baseHost}/details/democracy_now_vid`,
        },
        {
          title: 'Occupy Wall Street',
          url: `${baseHost}/details/occupywallstreet`,
        },
        {
          title: 'TV NSA Clip Library',
          url: `${baseHost}/details/nsa`,
        },
      ],
      links: [
        {
          title: 'Animation & Cartoons',
          url: `${baseHost}/details/animationandcartoons`,
        },
        {
          title: 'Arts & Music',
          url: `${baseHost}/details/artsandmusicvideos`,
        },
        {
          title: 'Computers & Technology',
          url: `${baseHost}/details/computersandtechvideos`,
        },
        {
          title: 'Cultural & Academic Films',
          url: `${baseHost}/details/culturalandacademicfilms`,
        },
        {
          title: 'Ephemeral Films',
          url: `${baseHost}/details/ephemera`,
        },
        {
          title: 'Movies',
          url: `${baseHost}/details/moviesandfilms`,
        },
        {
          title: 'News & Public Affairs',
          url: `${baseHost}/details/newsandpublicaffairs`,
        },
        {
          title: 'Spirituality & Religion',
          url: `${baseHost}/details/spiritualityandreligion`,
        },
        {
          title: 'Sports Videos',
          url: `${baseHost}/details/sports`,
        },
        {
          title: 'Television',
          url: `${baseHost}/details/television`,
        },
        {
          title: 'Videogame Videos',
          url: `${baseHost}/details/gamevideos`,
        },
        {
          title: 'Vlogs',
          url: `${baseHost}/details/vlogs`,
        },
        {
          title: 'Youth Media',
          url: `${baseHost}/details/youth_media`,
        },
      ],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    },
    user: [
      {
        url: `${baseHost}/create`,
        title: 'Upload files',
        analyticsEvent: 'UserUpload',
        class: 'mobile-upload',
      },
      {
        url: `${baseHost}/details/@${userid}`,
        title: 'My uploads',
        analyticsEvent: 'UserLibrary',
      },
      {
        url: `${baseHost}/details/@${userid}/loans`,
        title: 'My loans',
        analyticsEvent: 'UserLoans',
      },
      {
        url: `${baseHost}/details/fav-${userid}`,
        title: 'My favorites',
        analyticsEvent: 'UserFavorites',
      },
      {
        url: `${baseHost}/details/@${userid}/lists`,
        title: 'My lists',
        analyticsEvent: 'UserLists',
      },
      {
        url: `${baseHost}/details/@${userid}/collections`,
        title: 'My collections',
        analyticsEvent: 'UserCollections',
      },
      {
        url: `${baseHost}/details/@${userid}/web-archive`,
        title: 'My web archives',
        analyticsEvent: 'UserWebArchive',
      },
      {
        url: `${baseHost}/account/settings`,
        title: 'Account settings',
        analyticsEvent: 'UserSettings',
      },
      {
        url: 'https://help.archive.org',
        title: 'Get help',
        analyticsEvent: 'UserHelp',
      },
      {
        url: `${baseHost}/account/logout`,
        title: 'Log out',
        analyticsEvent: 'UserLogOut',
      },
    ],
    userAdmin: [
      {
        title: 'ADMINS:',
      },
      {
        title: 'item:',
      },
      {
        url: `${baseHost}/editxml/${itemIdentifier}`,
        title: 'edit xml',
        analyticsEvent: 'AdminUserEditXML',
      },
      {
        url: `${baseHost}/edit.php?redir=1&identifier=${itemIdentifier}`,
        title: 'edit files',
        analyticsEvent: 'AdminUserEditFiles',
      },
      {
        url: `${baseHost}/download/${itemIdentifier}/`,
        title: 'download',
        analyticsEvent: 'AdminUserDownload',
      },
      {
        url: `${baseHost}/metadata/${itemIdentifier}/`,
        title: 'metadata',
        analyticsEvent: 'AdminUserMetadata',
      },
      {
        url: `https://catalogd.archive.org/history/${itemIdentifier}`,
        title: 'history',
        analyticsEvent: 'AdminUserHistory',
      },
      {
        url: `${baseHost}/manage/${itemIdentifier}`,
        title: 'manage',
        analyticsEvent: 'AdminUserManager',
      },
      {
        url: `${baseHost}/manage/${itemIdentifier}#make_dark`,
        title: 'curate',
        analyticsEvent: 'AdminUserCurate',
      },
      {
        url: `${baseHost}/manage/${itemIdentifier}#modify_xml`,
        title: 'modify xml',
        analyticsEvent: 'AdminUserModifyXML',
      },
    ],
    userAdminFlags: [
      {
        url: `${baseHost}/services/flags/admin.php?identifier=${itemIdentifier}`,
        title: 'manage flags',
        analyticsEvent: 'AdminUserManageFlags',
      },
    ],
    signedOut: [
      {
        url: `${baseHost}/account/signup`,
        title: 'Sign up for free',
        analyticsEvent: 'AvatarMenu-Signup',
      },
      {
        url: `${baseHost}/login`,
        title: 'Log in',
        analyticsEvent: 'AvatarMenu-Login',
      },
    ],
  };
}
