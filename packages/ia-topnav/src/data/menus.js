import { prodHost } from '../constants';

const texts = (baseHost = prodHost) => ({
  heading: 'Books',
  iconLinks: [{
    title: 'Books to Borrow',
    icon: `https://${baseHost}/images/book-lend.png`,
    url: `https://${baseHost}/details/inlibrary`,
  }, {
    title: 'Open Library',
    icon: `https://${baseHost}/images/widgetOL.png`,
    url: 'https://openlibrary.org/',
  }],
  featuredLinks: [{
    title: 'All Books',
    url: `https://${baseHost}/details/books`,
  }, {
    title: 'All Texts',
    url: `https://${baseHost}/details/texts`,
  }, {
    title: 'This Just In',
    url: `https://${baseHost}/search.php?query=mediatype:texts&sort=-publicdate`,
  }, {
    title: 'Smithsonian Libraries',
    url: `https://${baseHost}/details/smithsonian`,
  }, {
    title: 'FEDLINK (US)',
    url: `https://${baseHost}/details/fedlink`,
  }, {
    title: 'Genealogy',
    url: `https://${baseHost}/details/genealogy`,
  }, {
    title: 'Lincoln Collection',
    url: `https://${baseHost}/details/lincolncollection`,
  }],
  links: [{
    title: 'American Libraries',
    url: `https://${baseHost}/details/americana`,
  }, {
    title: 'Canadian Libraries',
    url: `https://${baseHost}/details/toronto`,
  }, {
    title: 'Universal Library',
    url: `https://${baseHost}/details/universallibrary`,
  }, {
    title: 'Community Texts',
    url: `https://${baseHost}/details/opensource`,
  }, {
    title: 'Project Gutenberg',
    url: `https://${baseHost}/details/gutenberg`,
  }, {
    title: 'Biodiversity Heritage Library',
    url: `https://${baseHost}/details/biodiversity`,
  }, {
    title: 'Children\'s Library',
    url: `https://${baseHost}/details/iacl`,
  }, {
    title: 'Books by Language',
    url: `https://${baseHost}/details/booksbylanguage`,
  }, {
    title: 'Additional Collections',
    url: `https://${baseHost}/details/additional_collections`,
  }],
});

const video = (baseHost = prodHost) => ({
  heading: 'Video',
  iconLinks: [{
    icon: `https://${baseHost}/services/img/tv`,
    title: 'TV News',
    url: `https://${baseHost}/details/tv`,
  }, {
    icon: `https://${baseHost}/services/img/911`,
    title: 'Understanding 9/11',
    url: `https://${baseHost}/details/911`,
  }],
  featuredLinks: [{
    title: 'All video',
    url: `https://${baseHost}/details/movies`,
  }, {
    title: 'This Just In',
    url: `https://${baseHost}/search.php?query=mediatype:movies&sort=-publicdate`,
  }, {
    title: 'Prelinger Archives',
    url: `https://${baseHost}/details/prelinger`,
  }, {
    title: 'Democracy Now!',
    url: `https://${baseHost}/details/democracy_now_vid`,
  }, {
    title: 'Occupy Wall Street',
    url: `https://${baseHost}/details/occupywallstreet`,
  }, {
    title: 'TV NSA Clip Library',
    url: `https://${baseHost}/details/nsa`,
  }],
  links: [{
    title: 'Animation & Cartoons',
    url: `https://${baseHost}/details/animationandcartoons`,
  }, {
    title: 'Arts & Music',
    url: `https://${baseHost}/details/artsandmusicvideos`,
  }, {
    title: 'Computers & Technology',
    url: `https://${baseHost}/details/computersandtechvideos`,
  }, {
    title: 'Cultural & Academic Films',
    url: `https://${baseHost}/details/culturalandacademicfilms`,
  }, {
    title: 'Ephemeral Films',
    url: `https://${baseHost}/details/ephemera`,
  }, {
    title: 'Movies',
    url: `https://${baseHost}/details/moviesandfilms`,
  }, {
    title: 'News & Public Affairs',
    url: `https://${baseHost}/details/newsandpublicaffairs`,
  }, {
    title: 'Spirituality & Religion',
    url: `https://${baseHost}/details/spiritualityandreligion`,
  }, {
    title: 'Sports Videos',
    url: `https://${baseHost}/details/sports`,
  }, {
    title: 'Television',
    url: `https://${baseHost}/details/television`,
  }, {
    title: 'Videogame Videos',
    url: `https://${baseHost}/details/gamevideos`,
  }, {
    title: 'Vlogs',
    url: `https://${baseHost}/details/vlogs`,
  }, {
    title: 'Youth Media',
    url: `https://${baseHost}/details/youth_media`,
  }, {
    title: 'Norton Media Center',
    url: `https://${baseHost}/details/nmcma`,
  }]
});

const audio = (baseHost = prodHost) => ({
  heading: 'Internet Archive Audio',
  iconLinks: [{
    icon: `https://${baseHost}/services/img/etree`,
    title: 'Live Music Archive',
    url: `https://${baseHost}/details/etree`,
  }, {
    icon: `https://${baseHost}/services/img/librivoxaudio`,
    title: 'Librivox Free Audio',
    url: `https://${baseHost}/details/librivoxaudio`,
  }],
  featuredLinks: [{
    title: 'All audio',
    url: `https://${baseHost}/details/audio`,
  }, {
    title: 'This Just In',
    url: `https://${baseHost}/search.php?query=mediatype:audio&sort=-publicdate`,
  }, {
    title: 'Grateful Dead',
    url: `https://${baseHost}/details/GratefulDead`,
  }, {
    title: 'Netlabels',
    url: `https://${baseHost}/details/netlabels`,
  }, {
    title: 'Old Time Radio',
    url: `https://${baseHost}/details/oldtimeradio`,
  }, {
    title: '78 RPMs and Cylinder Recordings',
    url: `https://${baseHost}/details/78rpm`,
  }],
  links: [{
    title: 'Audio Books & Poetry',
    url: `https://${baseHost}/details/audio_bookspoetry`,
  }, {
    title: 'Community Audio',
    url: `https://${baseHost}/details/opensource_audio`,
  }, {
    title: 'Computers, Technology and Science',
    url: `https://${baseHost}/details/audio_tech`,
  }, {
    title: 'Music, Arts & Culture',
    url: `https://${baseHost}/details/audio_music`,
  }, {
    title: 'News & Public Affairs',
    url: `https://${baseHost}/details/audio_news`,
  }, {
    title: 'Non-English Audio',
    url: `https://${baseHost}/details/audio_foreign`,
  }, {
    title: 'Spirituality & Religion',
    url: `https://${baseHost}/details/audio_religion`,
  }, {
    title: 'Podcasts',
    url: `https://${baseHost}/details/podcasts`,
  }],
});

const software = (baseHost = prodHost) => ({
  heading: 'Software',
  iconLinks: [{
    icon: `https://${baseHost}/services/img/internetarcade`,
    title: 'Internet Arcade',
    url: `https://${baseHost}/details/internetarcade`,
  }, {
    icon: `https://${baseHost}/services/img/consolelivingroom`,
    title: 'Console Living Room',
    url: `https://${baseHost}/details/consolelivingroom`,
  }],
  featuredLinks: [{
    title: 'All software',
    url: `https://${baseHost}/details/software`,
  }, {
    title: 'This Just In',
    url: `https://${baseHost}/search.php?query=mediatype:software&sort=-publicdate`,
  }, {
    title: 'Old School Emulation',
    url: `https://${baseHost}/details/tosec`,
  }, {
    title: 'MS-DOS Games',
    url: `https://${baseHost}/details/softwarelibrary_msdos_games`,
  }, {
    title: 'Historical Software',
    url: `https://${baseHost}/details/historicalsoftware`,
  }, {
    title: 'Classic PC Games',
    url: `https://${baseHost}/details/classicpcgames`,
  }, {
    title: 'Software Library',
    url: `https://${baseHost}/details/softwarelibrary`,
  }],
  links: [{
    title: 'Kodi Archive and Support File',
    url: `https://${baseHost}/details/kodi_archive`,
  }, {
    title: 'Community Software',
    url: `https://${baseHost}/details/open_source_software`,
  }, {
    title: 'Vintage Software',
    url: `https://${baseHost}/details/vintagesoftware`,
  }, {
    title: 'APK',
    url: `https://${baseHost}/details/apkarchive`,
  }, {
    title: 'MS-DOS',
    url: `https://${baseHost}/details/softwarelibrary_msdos`,
  }, {
    title: 'CD-ROM Software',
    url: `https://${baseHost}/details/cd-roms`,
  }, {
    title: 'CD-ROM Software Library',
    url: `https://${baseHost}/details/cdromsoftware`,
  }, {
    title: 'Software Sites',
    url: `https://${baseHost}/details/softwaresites`,
  }, {
    title: 'Tucows Software Library',
    url: `https://${baseHost}/details/tucows`,
  }, {
    title: 'Shareware CD-ROMs',
    url: `https://${baseHost}/details/cdbbsarchive`,
  }, {
    title: 'Software Capsules Compilation',
    url: `https://${baseHost}/details/softwarecapsules`,
  }, {
    title: 'CD-ROM Images',
    url: `https://${baseHost}/details/cdromimages`,
  }, {
    title: 'ZX Spectrum',
    url: `https://${baseHost}/details/softwarelibrary_zx_spectrum`,
  }, {
    title: 'DOOM Level CD',
    url: `https://${baseHost}/details/doom-cds`,
  }],
});

const images = (baseHost = prodHost) => ({
  heading: 'Images',
  iconLinks: [{
    icon: `https://${baseHost}/services/img/metropolitanmuseumofart-gallery`,
    title: 'Metropolitan Museum',
    url: `https://${baseHost}/details/metropolitanmuseumofart-gallery`,
  }, {
    icon: `https://${baseHost}/services/img/brooklynmuseum`,
    title: 'Brooklyn Museum',
    url: `https://${baseHost}/details/brooklynmuseum`,
  }],
  featuredLinks: [{
    title: 'All images',
    url: `https://${baseHost}/details/image`,
  }, {
    title: 'This Just In',
    url: `https://${baseHost}/search.php?query=mediatype:image&sort=-publicdate`,
  }, {
    title: 'Flickr Commons',
    url: `https://${baseHost}/details/flickrcommons`,
  }, {
    title: 'Occupy Wall Street Flickr',
    url: `https://${baseHost}/details/flickr-ows`,
  }, {
    title: 'Cover Art',
    url: `https://${baseHost}/details/coverartarchive`,
  }, {
    title: 'USGS Maps',
    url: `https://${baseHost}/details/maps_usgs`,
  }],
  links: [{
    title: 'NASA Images',
    url: `https://${baseHost}/details/nasa`,
  }, {
    title: 'Solar System Collection',
    url: `https://${baseHost}/details/solarsystemcollection`,
  }, {
    title: 'Ames Research Center',
    url: `https://${baseHost}/details/amesresearchcenterimagelibrary`,
  }]
});

const user = ({
  baseHost = prodHost,
  catUrl,
  username,
  isAdmin,
  identifier,
  uploader,
  biblio,
}) => {
  const generalLinks = [{
    href: `https://${baseHost}/create`,
    title: 'Upload',
    analyticsEvent: 'UserUpload',
  }, {
    href: `https://${baseHost}/details/@${username}`,
    title: 'My library',
    analyticsEvent: 'UserLibrary',
  }, {
    href: `https://${baseHost}/details/@${username}?tab=loans`,
    title: 'My loans',
    analyticsEvent: 'UserLoans',
  }, {
    href: `https://${baseHost}/details/fav-${username}`,
    title: 'My favorites',
    analyticsEvent: 'UserFavorites',
  }, {
    href: `https://${baseHost}/details/@${username}/web-archive`,
    title: 'My web archive',
    analyticsEvent: 'UserWebArchive',
  }, {
    href: `https://${baseHost}/account/index.php?settings=1`,
    title: 'Edit settings',
    analyticsEvent: 'UserSettings',
  }, {
    href: 'https://help.archive.org',
    title: 'Get help',
    analyticsEvent: 'UserHelp',
  }, {
    href: `https://${baseHost}/account/logout`,
    title: 'Log out',
    analyticsEvent: 'UserLogOut',
  }];

  const adminLinks = [{
    title: 'ADMINS:'
  }, {
    title: 'item:'
  }, {
    href: `https://${baseHost}/editxml/${identifier}`,
    title: 'edit xml',
    analyticsEvent: 'AdminUserEditXML',
  }, {
    href: `https://${baseHost}/edit.php?redir=1&identifier=${identifier}`,
    title: 'edit files',
    analyticsEvent: 'AdminUserEditFiles',
  }, {
    href: `https://${baseHost}/download/${identifier}/`,
    title: 'download',
    analyticsEvent: 'AdminUserDownload',
  }, {
    href: `https://${baseHost}/metadata/${identifier}/`,
    title: 'metadata',
    analyticsEvent: 'AdminUserMetadata',
  }, {
    href: `${catUrl}/history/${identifier}`,
    title: 'history',
    analyticsEvent: 'AdminUserHistory',
  }, {
    href: `https://${baseHost}/manage/${identifier}`,
    title: 'manage',
    analyticsEvent: 'AdminUserManager',
  }, {
    href: `https://${baseHost}/manage/${identifier}#make_dark`,
    title: 'curate',
    analyticsEvent: 'AdminUserCurate',
  }, {
    href: `https://${baseHost}/manage/${identifier}#modify_xml`,
    title: 'modify xml',
    analyticsEvent: 'AdminUserModifyXML',
  }, {
    href: `https://${baseHost}/services/flags/admin.php?identifier=${identifier}`,
    title: 'manage flags',
    analyticsEvent: 'AdminUserManageFlags',
  }];

  const biblioLinks = [{
    href: `${biblio}&ignored=${identifier}`,
    title: 'biblio',
    analyticsEvent: 'AdminUserBiblio',
  }, {
    href: `https://${baseHost}/bookview.php?mode=debug&identifier=${identifier}`,
    title: 'bookview',
    analyticsEvent: 'AdminUserBookView',
  }, {
    href: `https://${baseHost}/download/${identifier}/format=Single Page Processed JP2 ZIP`,
    title: 'jp2 zip',
    analyticsEvent: 'AdminUserJP2Zip',
  }];

  const uploaderLinks = [{
    title: 'uploader:'
  }, {
    title: uploader,
  }, {
    href: `https://${baseHost}/admins/useradmin.php?searchUser=${uploader}&ignore=${identifier}`,
    title: 'user admin',
    analyticsEvent: 'AdminUserUserAdmin',
  }, {
    href: `https://${baseHost}/admins/setadmin.php?user=${uploader}&ignore=${identifier}`,
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

const signedOut = (baseHost = prodHost) => ([{
  href: `https://${baseHost}/account/signup`,
  title: 'Sign up for free',
  analyticsEvent: 'SignUpDropdown',
}, {
  href: `https://${baseHost}/account/login`,
  title: 'Log in',
  analyticsEvent: 'LogInDropdown',
}]);

const more = (baseHost = prodHost) => ([
  { label: 'About', url: `https://${baseHost}/about/` },
  { label: 'Blog', url: 'https://blog.archive.org/' },
  { label: 'Projects', url: `https://${baseHost}/projects/` },
  { label: 'Help', url: `https://${baseHost}/about/faqs.php` },
  { label: 'Donate', url: `https://${baseHost}/donate/` },
  { label: 'Contact', url: `https://${baseHost}/about/contact.php` },
  { label: 'Jobs', url: `https://${baseHost}/about/jobs.php` },
  { label: 'Volunteer', url: `https://${baseHost}/about/volunteerpositions.php` },
  { label: 'People', url: `https://${baseHost}/about/bios.php` },
]);

const wayback = {
  mobileAppsLinks: () => ([{
    url: 'https://apps.apple.com/us/app/wayback-machine/id1201888313',
    title: 'Wayback Machine (iPhone, iPad)',
    external: true,
  }, {
    url: 'https://play.google.com/store/apps/details?id=com.archive.waybackmachine&hl=en_US',
    title: 'Wayback Machine (Android)',
    external: true,
  }]),
  browserExtensionsLinks: () => ([{
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
  }]),
  archiveItLinks: () => ([{
    url: 'https://www.archive-it.org/explore',
    title: 'Explore the Collections',
  }, {
    url: 'https://www.archive-it.org/blog/learn-more/',
    title: 'Learn More',
  }, {
    url: 'https://www.archive-it.org/contact-us',
    title: 'Build Collections',
  }]),
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
