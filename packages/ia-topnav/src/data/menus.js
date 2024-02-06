// @see https://git.archive.org/www/offshoot/-/blob/main/guides/update-top-nav.md

export const defaultTopNavConfig = {
  // Google Analytics event category
  eventCategory: 'TopNav',
  // Array of strings representing the values of options that should be hidden from search options
  hiddenSearchOptions: [],
  // Default value, if more accurate value is not passed in to `buildTopNavMenus()`
  waybackPagesArchived: '740 billion',
};


/**
 * Creates archive.org top navigation configuration
 * @param { string } userid archive.org account (immutable) userid
 * @param { boolean } localLinks passing in false will ensure all links begin: https://archive.org
 * @param { string } waybackPagesArchived label readable 'how many pages in WayBack machine?'
 *                                        If you don't pass in something, you'll get the potentially
 *                                        older/less accurate version.  Otherwise,
 *                                        @see waybackPagesArchivedFN() (below) (please cache it)
 *                                        for a live service accurate count result.
 * @param { string } itemIdentifier The current item being viewed, to populate admin menu items
 * @returns { object }
 */
export function buildTopNavMenus(userid = '___USERID___', localLinks = true, waybackPagesArchived = '', itemIdentifier = '') {
  if (waybackPagesArchived)
    defaultTopNavConfig.waybackPagesArchived = waybackPagesArchived // update to more accurate val


  const prefix = localLinks ? '' : 'https://archive.org'
  return {
    audio: {
      heading: 'Internet Archive Audio',
      iconLinks: [
        {
          icon: `${prefix}/services/img/etree`,
          title: 'Live Music Archive',
          url: `${prefix}/details/etree`,
        },
        {
          icon: `${prefix}/services/img/librivoxaudio`,
          title: 'Librivox Free Audio',
          url: `${prefix}/details/librivoxaudio`,
        },
      ],
      featuredLinks: [
        {
          title: 'All Audio',
          url: `${prefix}/details/audio`,
        },
        {
          title: 'This Just In',
          url: `${prefix}/search.php?query=mediatype:audio&sort=-publicdate`,
        },
        {
          title: 'Grateful Dead',
          url: `${prefix}/details/GratefulDead`,
        },
        {
          title: 'Netlabels',
          url: `${prefix}/details/netlabels`,
        },
        {
          title: 'Old Time Radio',
          url: `${prefix}/details/oldtimeradio`,
        },
        {
          title: '78 RPMs and Cylinder Recordings',
          url: `${prefix}/details/78rpm`,
        },
      ],
      links: [
        {
          title: 'Audio Books & Poetry',
          url: `${prefix}/details/audio_bookspoetry`,
        },
        {
          title: 'Computers, Technology and Science',
          url: `${prefix}/details/audio_tech`,
        },
        {
          title: 'Music, Arts & Culture',
          url: `${prefix}/details/audio_music`,
        },
        {
          title: 'News & Public Affairs',
          url: `${prefix}/details/audio_news`,
        },
        {
          title: 'Spirituality & Religion',
          url: `${prefix}/details/audio_religion`,
        },
        {
          title: 'Podcasts',
          url: `${prefix}/details/podcasts`,
        },
        {
          title: 'Radio News Archive',
          url: `${prefix}/details/radio`,
        },
      ],
    },
    images: {
      heading: 'Images',
      iconLinks: [
        {
          icon: `${prefix}/services/img/metropolitanmuseumofart-gallery`,
          title: 'Metropolitan Museum',
          url: `${prefix}/details/metropolitanmuseumofart-gallery`,
        },
        {
          icon: `${prefix}/services/img/clevelandart`,
          title: 'Cleveland Museum of Art',
          url: `${prefix}/details/clevelandart`,
        },
      ],
      featuredLinks: [
        {
          title: 'All Images',
          url: `${prefix}/details/image`,
        },
        {
          title: 'This Just In',
          url: `${prefix}/search.php?query=mediatype:image&sort=-publicdate`,
        },
        {
          title: 'Flickr Commons',
          url: `${prefix}/details/flickrcommons`,
        },
        {
          title: 'Occupy Wall Street Flickr',
          url: `${prefix}/details/flickr-ows`,
        },
        {
          title: 'Cover Art',
          url: `${prefix}/details/coverartarchive`,
        },
        {
          title: 'USGS Maps',
          url: `${prefix}/details/maps_usgs`,
        },
      ],
      links: [
        {
          title: 'NASA Images',
          url: `${prefix}/details/nasa`,
        },
        {
          title: 'Solar System Collection',
          url: `${prefix}/details/solarsystemcollection`,
        },
        {
          title: 'Ames Research Center',
          url: `${prefix}/details/amesresearchcenterimagelibrary`,
        },
      ],
    },
    more: [
      {
        title: 'About',
        url: `${prefix}/about/`,
      },
      {
        title: 'Blog',
        url: 'https://blog.archive.org',
      },
      {
        title: 'Projects',
        url: `${prefix}/projects/`,
      },
      {
        title: 'Help',
        url: `${prefix}/about/faqs.php`,
      },
      {
        title: 'Donate',
        url: `${prefix}/donate?origin=iawww-TopNavDonateButton`,
      },
      {
        title: 'Contact',
        url: `${prefix}/about/contact.php`,
      },
      {
        title: 'Jobs',
        url: `${prefix}/about/jobs.php`,
      },
      {
        title: 'Volunteer',
        url: `${prefix}/about/volunteerpositions.php`,
      },
      {
        title: 'People',
        url: `${prefix}/about/bios.php`,
      },
    ],
    software: {
      heading: 'Software',
      iconLinks: [
        {
          icon: `${prefix}/services/img/internetarcade`,
          title: 'Internet Arcade',
          url: `${prefix}/details/internetarcade`,
        },
        {
          icon: `${prefix}/services/img/consolelivingroom`,
          title: 'Console Living Room',
          url: `${prefix}/details/consolelivingroom`,
        },
      ],
      featuredLinks: [
        {
          title: 'All Software',
          url: `${prefix}/details/software`,
        },
        {
          title: 'This Just In',
          url: `${prefix}/search.php?query=mediatype:software&sort=-publicdate`,
        },
        {
          title: 'Old School Emulation',
          url: `${prefix}/details/tosec`,
        },
        {
          title: 'MS-DOS Games',
          url: `${prefix}/details/softwarelibrary_msdos_games`,
        },
        {
          title: 'Historical Software',
          url: `${prefix}/details/historicalsoftware`,
        },
        {
          title: 'Classic PC Games',
          url: `${prefix}/details/classicpcgames`,
        },
        {
          title: 'Software Library',
          url: `${prefix}/details/softwarelibrary`,
        },
      ],
      links: [
        {
          title: 'Kodi Archive and Support File',
          url: `${prefix}/details/kodi_archive`,
        },
        {
          title: 'Vintage Software',
          url: `${prefix}/details/vintagesoftware`,
        },
        {
          title: 'APK',
          url: `${prefix}/details/apkarchive`,
        },
        {
          title: 'MS-DOS',
          url: `${prefix}/details/softwarelibrary_msdos`,
        },
        {
          title: 'CD-ROM Software',
          url: `${prefix}/details/cd-roms`,
        },
        {
          title: 'CD-ROM Software Library',
          url: `${prefix}/details/cdromsoftware`,
        },
        {
          title: 'Software Sites',
          url: `${prefix}/details/softwaresites`,
        },
        {
          title: 'Tucows Software Library',
          url: `${prefix}/details/tucows`,
        },
        {
          title: 'Shareware CD-ROMs',
          url: `${prefix}/details/cdbbsarchive`,
        },
        {
          title: 'Software Capsules Compilation',
          url: `${prefix}/details/softwarecapsules`,
        },
        {
          title: 'CD-ROM Images',
          url: `${prefix}/details/cdromimages`,
        },
        {
          title: 'ZX Spectrum',
          url: `${prefix}/details/softwarelibrary_zx_spectrum`,
        },
        {
          title: 'DOOM Level CD',
          url: `${prefix}/details/doom-cds`,
        },
      ],
    },
    texts: {
      heading: 'Books',
      iconLinks: [
        {
          title: 'Books to Borrow',
          icon: `${prefix}/images/book-lend.png`,
          url: `${prefix}/details/inlibrary`,
        },
        {
          title: 'Open Library',
          icon: `${prefix}/images/widgetOL.png`,
          url: 'https://openlibrary.org/',
        },
      ],
      featuredLinks: [
        {
          title: 'All Books',
          url: `${prefix}/details/books`,
        },
        {
          title: 'All Texts',
          url: `${prefix}/details/texts`,
        },
        {
          title: 'This Just In',
          url: `${prefix}/search.php?query=mediatype:texts&sort=-publicdate`,
        },
        {
          title: 'Smithsonian Libraries',
          url: `${prefix}/details/smithsonian`,
        },
        {
          title: 'FEDLINK (US)',
          url: `${prefix}/details/fedlink`,
        },
        {
          title: 'Genealogy',
          url: `${prefix}/details/genealogy`,
        },
        {
          title: 'Lincoln Collection',
          url: `${prefix}/details/lincolncollection`,
        },
      ],
      links: [
        {
          title: 'American Libraries',
          url: `${prefix}/details/americana`,
        },
        {
          title: 'Canadian Libraries',
          url: `${prefix}/details/toronto`,
        },
        {
          title: 'Universal Library',
          url: `${prefix}/details/universallibrary`,
        },
        {
          title: 'Project Gutenberg',
          url: `${prefix}/details/gutenberg`,
        },
        {
          title: "Children's Library",
          url: `${prefix}/details/iacl`,
        },
        {
          title: 'Biodiversity Heritage Library',
          url: `${prefix}/details/biodiversity`,
        },
        {
          title: 'Books by Language',
          url: `${prefix}/details/booksbylanguage`,
        },
        {
          title: 'Additional Collections',
          url: `${prefix}/details/additional_collections`,
        },
      ],
    },
    web: {
      mobileAppsLinks: [
        {
          url: 'https://apps.apple.com/us/app/wayback-machine/id1201888313',
          title: 'Wayback Machine (iOS)',
          external: true,
        },
        {
          url: 'https://play.google.com/store/apps/details?id=com.archive.waybackmachine&hl=en_US',
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
    },
    video: {
      heading: 'Video',
      iconLinks: [
        {
          icon: `${prefix}/services/img/tv`,
          title: 'TV News',
          url: `${prefix}/details/tv`,
        },
        {
          icon: `${prefix}/services/img/911`,
          title: 'Understanding 9/11',
          url: `${prefix}/details/911`,
        },
      ],
      featuredLinks: [
        {
          title: 'All Video',
          url: `${prefix}/details/movies`,
        },
        {
          title: 'This Just In',
          url: `${prefix}/search.php?query=mediatype:movies&sort=-publicdate`,
        },
        {
          title: 'Prelinger Archives',
          url: `${prefix}/details/prelinger`,
        },
        {
          title: 'Democracy Now!',
          url: `${prefix}/details/democracy_now_vid`,
        },
        {
          title: 'Occupy Wall Street',
          url: `${prefix}/details/occupywallstreet`,
        },
        {
          title: 'TV NSA Clip Library',
          url: `${prefix}/details/nsa`,
        },
      ],
      links: [
        {
          title: 'Animation & Cartoons',
          url: `${prefix}/details/animationandcartoons`,
        },
        {
          title: 'Arts & Music',
          url: `${prefix}/details/artsandmusicvideos`,
        },
        {
          title: 'Computers & Technology',
          url: `${prefix}/details/computersandtechvideos`,
        },
        {
          title: 'Cultural & Academic Films',
          url: `${prefix}/details/culturalandacademicfilms`,
        },
        {
          title: 'Ephemeral Films',
          url: `${prefix}/details/ephemera`,
        },
        {
          title: 'Movies',
          url: `${prefix}/details/moviesandfilms`,
        },
        {
          title: 'News & Public Affairs',
          url: `${prefix}/details/newsandpublicaffairs`,
        },
        {
          title: 'Spirituality & Religion',
          url: `${prefix}/details/spiritualityandreligion`,
        },
        {
          title: 'Sports Videos',
          url: `${prefix}/details/sports`,
        },
        {
          title: 'Television',
          url: `${prefix}/details/television`,
        },
        {
          title: 'Videogame Videos',
          url: `${prefix}/details/gamevideos`,
        },
        {
          title: 'Vlogs',
          url: `${prefix}/details/vlogs`,
        },
        {
          title: 'Youth Media',
          url: `${prefix}/details/youth_media`,
        },
      ],
    },
    user: [
      {
        url: `${prefix}/create`,
        title: 'Upload files',
        analyticsEvent: 'UserUpload',
        class: 'mobile-upload',
      },
      {
        url: `${prefix}/details/@${userid}`,
        title: 'My uploads',
        analyticsEvent: 'UserLibrary',
      },
      {
        url: `${prefix}/details/@${userid}?tab=loans`,
        title: 'My loans',
        analyticsEvent: 'UserLoans',
      },
      {
        url: `${prefix}/details/fav-${userid}`,
        title: 'My favorites',
        analyticsEvent: 'UserFavorites',
      },
      {
        url: `${prefix}/details/@${userid}?tab=lists`,
        title: 'My lists',
        analyticsEvent: 'UserLists',
      },
      {
        url: `${prefix}/details/@${userid}?tab=collections`,
        title: 'My collections',
        analyticsEvent: 'UserCollections',
      },
      {
        url: `${prefix}/details/@${userid}/web-archive`,
        title: 'My web archives',
        analyticsEvent: 'UserWebArchive',
      },
      {
        url: `${prefix}/account/index.php?settings=1`,
        title: 'Account settings',
        analyticsEvent: 'UserSettings',
      },
      {
        url: 'https://help.archive.org',
        title: 'Get help',
        analyticsEvent: 'UserHelp',
      },
      {
        url: `${prefix}/account/logout`,
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
        url: `${prefix}/editxml/${itemIdentifier}`,
        title: 'edit xml',
        analyticsEvent: 'AdminUserEditXML',
      },
      {
        url: `${prefix}/edit.php?redir=1&identifier=${itemIdentifier}`,
        title: 'edit files',
        analyticsEvent: 'AdminUserEditFiles',
      },
      {
        url: `${prefix}/download/${itemIdentifier}/`,
        title: 'download',
        analyticsEvent: 'AdminUserDownload',
      },
      {
        url: `${prefix}/metadata/${itemIdentifier}/`,
        title: 'metadata',
        analyticsEvent: 'AdminUserMetadata',
      },
      {
        url: `https://catalogd.archive.org/history/${itemIdentifier}`,
        title: 'history',
        analyticsEvent: 'AdminUserHistory',
      },
      {
        url: `${prefix}/manage/${itemIdentifier}`,
        title: 'manage',
        analyticsEvent: 'AdminUserManager',
      },
      {
        url: `${prefix}/manage/${itemIdentifier}#make_dark`,
        title: 'curate',
        analyticsEvent: 'AdminUserCurate',
      },
      {
        url: `${prefix}/manage/${itemIdentifier}#modify_xml`,
        title: 'modify xml',
        analyticsEvent: 'AdminUserModifyXML',
      },
    ],
    userAdminFlags: [
      {
        url: `${prefix}/services/flags/admin.php?identifier=${itemIdentifier}`,
        title: 'manage flags',
        analyticsEvent: 'AdminUserManageFlags',
      },
    ],
    signedOut: [
      {
        url: `${prefix}/account/signup`,
        title: 'Sign up for free',
        analyticsEvent: 'AvatarMenu-Signup',
      },
      {
        url: `${prefix}/account/login`,
        title: 'Log in',
        analyticsEvent: 'AvatarMenu-Login',
      },
    ],
  };
};


let waybackPagesArchivedCached

/**
 * Fetches accurate count of number of pages in WayBack Machine
 * @returns { string }
 */
export async function waybackPagesArchivedFN() {
  if (waybackPagesArchivedCached)
    return waybackPagesArchivedCached;

  const counts = await (await fetch('https://archive.org/services/offshoot/home-page/mediacounts.php')).json();
  if (counts.success) {
    let label = ''
    let n = parseInt(counts.value.counts.web, 10);
    if (n > 1000) { n /= 1000; label = 'thousand'; }
    if (n > 1000) { n /= 1000; label = 'million'; }
    if (n > 1000) { n /= 1000; label = 'billion'; }
    if (n > 1000) { n /= 1000; label = 'trillion'; }
    waybackPagesArchivedCached = `${Math.round(n)} ${label}`
  } else {
    waybackPagesArchivedCached = '741 billion';
  }

  return waybackPagesArchivedCached;
}
