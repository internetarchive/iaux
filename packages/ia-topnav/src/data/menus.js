import { prodHost } from '../constants';

const baseHost = prodHost;

const texts = {
  heading: 'Books',
  iconLinks: [{
    title: 'Books to Borrow',
    icon: `${baseHost}/images/book-lend.png`,
    url: '/details/inlibrary',
  }, {
    title: 'Open Library',
    icon: `${baseHost}/images/widgetOL.png`,
    url: 'https://openlibrary.org/',
  }],
  featuredLinks: [{
    title: 'All Books',
    url: '/details/books',
  }, {
    title: 'All Texts',
    url: '/details/texts',
  }, {
    title: 'This Just In',
    url: '/search.php?query=mediatype:texts&sort=-publicdate',
  }, {
    title: 'Smithsonian Libraries',
    url: '/details/smithsonian',
  }, {
    title: 'FEDLINK (US)',
    url: '/details/fedlink',
  }, {
    title: 'Genealogy',
    url: '/details/genealogy',
  }, {
    title: 'Lincoln Collection',
    url: '/details/lincolncollection',
  }],
  links: [{
    title: 'American Libraries',
    url: '/details/americana',
  }, {
    title: 'Canadian Libraries',
    url: '/details/toronto',
  }, {
    title: 'Universal Library',
    url: '/details/universallibrary',
  }, {
    title: 'Community Texts',
    url: '/details/opensource',
  }, {
    title: 'Project Gutenberg',
    url: '/details/gutenberg',
  }, {
    title: 'Biodiversity Heritage Library',
    url: '/details/biodiversity',
  }, {
    title: 'Children\'s Library',
    url: '/details/iacl',
  }, {
    title: 'Books by Language',
    url: '/details/booksbylanguage',
  }, {
    title: 'Additional Collections',
    url: '/details/additional_collections',
  }],
};

const video = {
  heading: 'Video',
  iconLinks: [{
    icon: `${baseHost}/services/img/tv`,
    title: 'TV News',
    url: '/details/tv',
  }, {
    icon: `${baseHost}/services/img/911`,
    title: 'Understanding 9/11',
    url: '/details/911',
  }],
  featuredLinks: [{
    title: 'All video',
    url: '/details/movies',
  }, {
    title: 'This Just In',
    url: '/search.php?query=mediatype:movies&sort=-publicdate',
  }, {
    title: 'Prelinger Archives',
    url: '/details/prelinger',
  }, {
    title: 'Democracy Now!',
    url: '/details/democracy_now_vid',
  }, {
    title: 'Occupy Wall Street',
    url: '/details/occupywallstreet',
  }, {
    title: 'TV NSA Clip Library',
    url: '/details/nsa',
  }],
  links: [{
    title: 'Animation & Cartoons',
    url: '/details/animationandcartoons',
  }, {
    title: 'Arts & Music',
    url: '/details/artsandmusicvideos',
  }, {
    title: 'Computers & Technology',
    url: '/details/computersandtechvideos',
  }, {
    title: 'Cultural & Academic Films',
    url: '/details/culturalandacademicfilms',
  }, {
    title: 'Ephemeral Films',
    url: '/details/ephemera',
  }, {
    title: 'Movies',
    url: '/details/moviesandfilms',
  }, {
    title: 'News & Public Affairs',
    url: '/details/newsandpublicaffairs',
  }, {
    title: 'Spirituality & Religion',
    url: '/details/spiritualityandreligion',
  }, {
    title: 'Sports Videos',
    url: '/details/sports',
  }, {
    title: 'Television',
    url: '/details/television',
  }, {
    title: 'Videogame Videos',
    url: '/details/gamevideos',
  }, {
    title: 'Vlogs',
    url: '/details/vlogs',
  }, {
    title: 'Youth Media',
    url: '/details/youth_media',
  }, {
    title: 'Norton Media Center',
    url: '/details/nmcma',
  }]
};

const audio = {
  heading: 'Internet Archive Audio',
  iconLinks: [{
    icon: `${baseHost}/services/img/etree`,
    title: 'Live Music Archive',
    url: '/details/etree',
  }, {
    icon: `${baseHost}/services/img/librivoxaudio`,
    title: 'Librivox Free Audio',
    url: '/details/librivoxaudio',
  }],
  featuredLinks: [{
    title: 'All audio',
    url: '/details/audio',
  }, {
    title: 'This Just In',
    url: '/search.php?query=mediatype:audio&sort=-publicdate',
  }, {
    title: 'Grateful Dead',
    url: '/details/GratefulDead',
  }, {
    title: 'Netlabels',
    url: '/details/netlabels',
  }, {
    title: 'Old Time Radio',
    url: '/details/oldtimeradio',
  }, {
    title: '78 RPMs and Cylinder Recordings',
    url: '/details/78rpm',
  }],
  links: [{
    title: 'Audio Books & Poetry',
    url: '/details/audio_bookspoetry',
  }, {
    title: 'Community Audio',
    url: '/details/opensource_audio',
  }, {
    title: 'Computers, Technology and Science',
    url: '/details/audio_tech',
  }, {
    title: 'Music, Arts & Culture',
    url: '/details/audio_music',
  }, {
    title: 'News & Public Affairs',
    url: '/details/audio_news',
  }, {
    title: 'Non-English Audio',
    url: '/details/audio_foreign',
  }, {
    title: 'Spirituality & Religion',
    url: '/details/audio_religion',
  }, {
    title: 'Podcasts',
    url: '/details/podcasts',
  }],
};

const software = {
  heading: 'Software',
  iconLinks: [{
    icon: `${baseHost}/services/img/internetarcade`,
    title: 'Internet Arcade',
    url: '/details/internetarcade',
  }, {
    icon: `${baseHost}/services/img/consolelivingroom`,
    title: 'Console Living Room',
    url: '/details/consolelivingroom',
  }],
  featuredLinks: [{
    title: 'All software',
    url: '/details/software',
  }, {
    title: 'This Just In',
    url: '/search.php?query=mediatype:software&sort=-publicdate',
  }, {
    title: 'Old School Emulation',
    url: '/details/tosec',
  }, {
    title: 'MS-DOS Games',
    url: '/details/softwarelibrary_msdos_games',
  }, {
    title: 'Historical Software',
    url: '/details/historicalsoftware',
  }, {
    title: 'Classic PC Games',
    url: '/details/classicpcgames',
  }, {
    title: 'Software Library',
    url: '/details/softwarelibrary',
  }],
  links: [{
    title: 'Kodi Archive and Support File',
    url: '/details/kodi_archive',
  }, {
    title: 'Community Software',
    url: '/details/open_source_software',
  }, {
    title: 'Vintage Software',
    url: '/details/vintagesoftware',
  }, {
    title: 'APK',
    url: '/details/apkarchive',
  }, {
    title: 'MS-DOS',
    url: '/details/softwarelibrary_msdos',
  }, {
    title: 'CD-ROM Software',
    url: '/details/cd-roms',
  }, {
    title: 'CD-ROM Software Library',
    url: '/details/cdromsoftware',
  }, {
    title: 'Software Sites',
    url: '/details/softwaresites',
  }, {
    title: 'Tucows Software Library',
    url: '/details/tucows',
  }, {
    title: 'Shareware CD-ROMs',
    url: '/details/cdbbsarchive',
  }, {
    title: 'Software Capsules Compilation',
    url: '/details/softwarecapsules',
  }, {
    title: 'CD-ROM Images',
    url: '/details/cdromimages',
  }, {
    title: 'ZX Spectrum',
    url: '/details/softwarelibrary_zx_spectrum',
  }, {
    title: 'DOOM Level CD',
    url: '/details/doom-cds',
  }],
};

const images = {
  heading: 'Images',
  iconLinks: [{
    icon: `${baseHost}/services/img/metropolitanmuseumofart-gallery`,
    title: 'Metropolitan Museum',
    url: '/details/metropolitanmuseumofart-gallery',
  }, {
    icon: `${baseHost}/services/img/brooklynmuseum`,
    title: 'Brooklyn Museum',
    url: '/details/brooklynmuseum',
  }],
  featuredLinks: [{
    title: 'All images',
    url: '/details/image',
  }, {
    title: 'This Just In',
    url: '/search.php?query=mediatype:image&sort=-publicdate',
  }, {
    title: 'Flickr Commons',
    url: '/details/flickrcommons',
  }, {
    title: 'Occupy Wall Street Flickr',
    url: '/details/flickr-ows',
  }, {
    title: 'Cover Art',
    url: '/details/coverartarchive',
  }, {
    title: 'USGS Maps',
    url: '/details/maps_usgs',
  }],
  links: [{
    title: 'NASA Images',
    url: '/details/nasa',
  }, {
    title: 'Solar System Collection',
    url: '/details/solarsystemcollection',
  }, {
    title: 'Ames Research Center',
    url: '/details/amesresearchcenterimagelibrary',
  }]
};

const user = ({
  catUrl,
  username,
  isAdmin,
  identifier,
  uploader,
  biblio,
}) => {
  const generalLinks = [{
    url: '/create',
    title: 'Upload',
    analyticsEvent: 'UserUpload',
  }, {
    url: `/details/@${username}`,
    title: 'My library',
    analyticsEvent: 'UserLibrary',
  }, {
    url: `/details/@${username}?tab=loans`,
    title: 'My loans',
    analyticsEvent: 'UserLoans',
  }, {
    url: `/details/fav-${username}`,
    title: 'My favorites',
    analyticsEvent: 'UserFavorites',
  }, {
    url: `/details/@${username}/web-archive`,
    title: 'My web archive',
    analyticsEvent: 'UserWebArchive',
  }, {
    url: '/account/index.php?settings=1',
    title: 'Edit settings',
    analyticsEvent: 'UserSettings',
  }, {
    url: 'https://help.archive.org',
    title: 'Get help',
    analyticsEvent: 'UserHelp',
  }, {
    url: '/account/logout',
    title: 'Log out',
    analyticsEvent: 'UserLogOut',
  }];

  const adminLinks = [{
    title: 'ADMINS:'
  }, {
    title: 'item:'
  }, {
    url: `/editxml/${identifier}`,
    title: 'edit xml',
    analyticsEvent: 'AdminUserEditXML',
  }, {
    url: `/edit.php?redir=1&identifier=${identifier}`,
    title: 'edit files',
    analyticsEvent: 'AdminUserEditFiles',
  }, {
    url: `/download/${identifier}/`,
    title: 'download',
    analyticsEvent: 'AdminUserDownload',
  }, {
    url: `/metadata/${identifier}/`,
    title: 'metadata',
    analyticsEvent: 'AdminUserMetadata',
  }, {
    url: `${catUrl}/history/${identifier}`,
    title: 'history',
    analyticsEvent: 'AdminUserHistory',
  }, {
    url: `/manage/${identifier}`,
    title: 'manage',
    analyticsEvent: 'AdminUserManager',
  }, {
    url: `/manage/${identifier}#make_dark`,
    title: 'curate',
    analyticsEvent: 'AdminUserCurate',
  }, {
    url: `/manage/${identifier}#modify_xml`,
    title: 'modify xml',
    analyticsEvent: 'AdminUserModifyXML',
  }, {
    url: `/services/flags/admin.php?identifier=${identifier}`,
    title: 'manage flags',
    analyticsEvent: 'AdminUserManageFlags',
  }];

  const biblioLinks = [{
    url: `${biblio}&ignored=${identifier}`,
    title: 'biblio',
    analyticsEvent: 'AdminUserBiblio',
  }, {
    url: `/bookview.php?mode=debug&identifier=${identifier}`,
    title: 'bookview',
    analyticsEvent: 'AdminUserBookView',
  }, {
    url: `/download/${identifier}/format=Single Page Processed JP2 ZIP`,
    title: 'jp2 zip',
    analyticsEvent: 'AdminUserJP2Zip',
  }];

  const uploaderLinks = [{
    title: 'uploader:'
  }, {
    title: uploader,
  }, {
    url: `/admins/useradmin.php?searchUser=${uploader}&ignore=${identifier}`,
    title: 'user admin',
    analyticsEvent: 'AdminUserUserAdmin',
  }, {
    url: `/admins/setadmin.php?user=${uploader}&ignore=${identifier}`,
    title: 'user privs',
    analyticsEvent: 'AdminUserUserPrivs',
  }];

  const allLinks = [generalLinks];
  if (isAdmin && identifier) {
    allLinks.push(adminLinks);

    if (biblio) {
      allLinks[1] = [...allLinks[1], ...biblioLinks];
    }

    if (uploader) {
      allLinks.push(uploaderLinks);
    }
  }

  return allLinks;
};

const signedOut = [{
  url: '/account/signup',
  title: 'Sign up for free',
  analyticsEvent: 'SignUpDropdown',
}, {
  url: '/account/login',
  title: 'Log in',
  analyticsEvent: 'LogInDropdown',
}];

const more = [
  { title: 'About', url: '/about/' },
  { title: 'Blog', url: 'https://blog.archive.org/' },
  { title: 'Projects', url: '/projects/' },
  { title: 'Help', url: '/about/faqs.php' },
  { title: 'Donate', url: '/donate/' },
  { title: 'Contact', url: '/about/contact.php' },
  { title: 'Jobs', url: '/about/jobs.php' },
  { title: 'Volunteer', url: '/about/volunteerpositions.php' },
  { title: 'People', url: '/about/bios.php' },
];

const wayback = {
  mobileAppsLinks: [{
    url: 'https://apps.apple.com/us/app/wayback-machine/id1201888313',
    title: 'Wayback Machine (iOS)',
    external: true,
  }, {
    url: 'https://play.google.com/store/apps/details?id=com.archive.waybackmachine&hl=en_US',
    title: 'Wayback Machine (Android)',
    external: true,
  }],
  browserExtensionsLinks: [{
    url: 'https://chrome.google.com/webstore/detail/save-to-the-wayback-machi/eebpioaailbjojmdbmlpomfgijnlcemk?hl=en',
    title: 'Chrome',
    external: true,
  }, {
    url: 'https://addons.mozilla.org/en-US/firefox/addon/wayback-machine_new/',
    title: 'Firefox',
    external: true,
  }, {
    url: 'https://apps.apple.com/us/app/wayback-machine/id1472432422?mt=12',
    title: 'Safari',
    external: true,
  }],
  archiveItLinks: [{
    url: 'https://www.archive-it.org/explore',
    title: 'Explore the Collections',
  }, {
    url: 'https://www.archive-it.org/blog/learn-more/',
    title: 'Learn More',
  }, {
    url: 'https://www.archive-it.org/contact-us',
    title: 'Build Collections',
  }],
};

export {
  audio,
  images,
  more,
  signedOut,
  software,
  texts,
  user,
  video,
  wayback,
};
