import { prodUrl } from '../constants';

const texts = (baseUrl = prodUrl) => ({
  heading: 'Books',
  iconLinks: [{
    title: 'National Emergency Library',
    icon: `https://${baseUrl}/images/national-emergency-library-logo-padded.png`,
    url: `https://${baseUrl}/details/nationalemergencylibrary`,
  }, {
    title: 'Open Library',
    icon: `https://${baseUrl}/images/widgetOL.png`,
    url: 'https://openlibrary.org/',
  }],
  featuredLinks: [{
    title: 'All Books',
    url: `https://${baseUrl}/details/books`,
  }, {
    title: 'All Texts',
    url: `https://${baseUrl}/details/texts`,
  }, {
    title: 'This Just In',
    url: `https://${baseUrl}/search.php?query=mediatype:texts&sort=-publicdate`,
  }, {
    title: 'Smithsonian Libraries',
    url: `https://${baseUrl}/details/smithsonian`,
  }, {
    title: 'FEDLINK (US)',
    url: `https://${baseUrl}/details/fedlink`,
  }, {
    title: 'Genealogy',
    url: `https://${baseUrl}/details/genealogy`,
  }, {
    title: 'Lincoln Collection',
    url: `https://${baseUrl}/details/lincolncollection`,
  }],
  links: [{
    title: 'American Libraries',
    url: `https://${baseUrl}/details/americana`,
  }, {
    title: 'Canadian Libraries',
    url: `https://${baseUrl}/details/toronto`,
  }, {
    title: 'Universal Library',
    url: `https://${baseUrl}/details/universallibrary`,
  }, {
    title: 'Community Texts',
    url: `https://${baseUrl}/details/opensource`,
  }, {
    title: 'Project Gutenberg',
    url: `https://${baseUrl}/details/gutenberg`,
  }, {
    title: 'Biodiversity Heritage Library',
    url: `https://${baseUrl}/details/biodiversity`,
  }, {
    title: 'Children\'s Library',
    url: `https://${baseUrl}/details/iacl`,
  }, {
    title: 'Books by Language',
    url: `https://${baseUrl}/details/booksbylanguage`,
  }, {
    title: 'Additional Collections',
    url: `https://${baseUrl}/details/additional_collections`,
  }],
});

const video = (baseUrl = prodUrl) => ({
  heading: 'Video',
  iconLinks: [{
    icon: `https://${baseUrl}/services/img/tv`,
    title: 'TV News',
    url: `https://${baseUrl}/details/tv`,
  }, {
    icon: `https://${baseUrl}/services/img/911`,
    title: 'Understanding 9/11',
    url: `https://${baseUrl}/details/911`,
  }],
  featuredLinks: [{
    title: 'All video',
    url: `https://${baseUrl}/details/movies`,
  }, {
    title: 'This Just In',
    url: `https://${baseUrl}/search.php?query=mediatype:movies&sort=-publicdate`,
  }, {
    title: 'Prelinger Archives',
    url: `https://${baseUrl}/details/prelinger`,
  }, {
    title: 'Democracy Now!',
    url: `https://${baseUrl}/details/democracy_now_vid`,
  }, {
    title: 'Occupy Wall Street',
    url: `https://${baseUrl}/details/occupywallstreet`,
  }, {
    title: 'TV NSA Clip Library',
    url: `https://${baseUrl}/details/nsa`,
  }],
  links: [{
    title: 'Animation & Cartoons',
    url: `https://${baseUrl}/details/animationandcartoons`,
  }, {
    title: 'Arts & Music',
    url: `https://${baseUrl}/details/artsandmusicvideos`,
  }, {
    title: 'Computers & Technology',
    url: `https://${baseUrl}/details/computersandtechvideos`,
  }, {
    title: 'Cultural & Academic Films',
    url: `https://${baseUrl}/details/culturalandacademicfilms`,
  }, {
    title: 'Ephemeral Films',
    url: `https://${baseUrl}/details/ephemera`,
  }, {
    title: 'Movies',
    url: `https://${baseUrl}/details/moviesandfilms`,
  }, {
    title: 'News & Public Affairs',
    url: `https://${baseUrl}/details/newsandpublicaffairs`,
  }, {
    title: 'Spirituality & Religion',
    url: `https://${baseUrl}/details/spiritualityandreligion`,
  }, {
    title: 'Sports Videos',
    url: `https://${baseUrl}/details/sports`,
  }, {
    title: 'Television',
    url: `https://${baseUrl}/details/television`,
  }, {
    title: 'Videogame Videos',
    url: `https://${baseUrl}/details/gamevideos`,
  }, {
    title: 'Vlogs',
    url: `https://${baseUrl}/details/vlogs`,
  }, {
    title: 'Youth Media',
    url: `https://${baseUrl}/details/youth_media`,
  }, {
    title: 'Norton Media Center',
    url: `https://${baseUrl}/details/nmcma`,
  }]
});

const audio = (baseUrl = prodUrl) => ({
  heading: 'Internet Archive Audio',
  iconLinks: [{
    icon: `https://${baseUrl}/services/img/etree`,
    title: 'Live Music Archive',
    url: `https://${baseUrl}/details/etree`,
  }, {
    icon: `https://${baseUrl}/services/img/librivoxaudio`,
    title: 'Librivox Free Audio',
    url: `https://${baseUrl}/details/librivoxaudio`,
  }],
  featuredLinks: [{
    title: 'All audio',
    url: `https://${baseUrl}/details/audio`,
  }, {
    title: 'This Just In',
    url: `https://${baseUrl}/search.php?query=mediatype:audio&sort=-publicdate`,
  }, {
    title: 'Grateful Dead',
    url: `https://${baseUrl}/details/GratefulDead`,
  }, {
    title: 'Netlabels',
    url: `https://${baseUrl}/details/netlabels`,
  }, {
    title: 'Old Time Radio',
    url: `https://${baseUrl}/details/oldtimeradio`,
  }, {
    title: '78 RPMs and Cylinder Recordings',
    url: `https://${baseUrl}/details/78rpm`,
  }],
  links: [{
    title: 'Audio Books & Poetry',
    url: `https://${baseUrl}/details/audio_bookspoetry`,
  }, {
    title: 'Community Audio',
    url: `https://${baseUrl}/details/opensource_audio`,
  }, {
    title: 'Computers, Technology and Science',
    url: `https://${baseUrl}/details/audio_tech`,
  }, {
    title: 'Music, Arts & Culture',
    url: `https://${baseUrl}/details/audio_music`,
  }, {
    title: 'News & Public Affairs',
    url: `https://${baseUrl}/details/audio_news`,
  }, {
    title: 'Non-English Audio',
    url: `https://${baseUrl}/details/audio_foreign`,
  }, {
    title: 'Spirituality & Religion',
    url: `https://${baseUrl}/details/audio_religion`,
  }, {
    title: 'Podcasts',
    url: `https://${baseUrl}/details/podcasts`,
  }],
});

const software = (baseUrl = prodUrl) => ({
  heading: 'Software',
  iconLinks: [{
    icon: `https://${baseUrl}/services/img/internetarcade`,
    title: 'Internet Arcade',
    url: `https://${baseUrl}/details/internetarcade`,
  }, {
    icon: `https://${baseUrl}/services/img/consolelivingroom`,
    title: 'Console Living Room',
    url: `https://${baseUrl}/details/consolelivingroom`,
  }],
  featuredLinks: [{
    title: 'All software',
    url: `https://${baseUrl}/details/software`,
  }, {
    title: 'latest This Just In',
    url: `https://${baseUrl}/search.php?query=mediatype:software&sort=-publicdate`,
  }, {
    title: 'Old School Emulation',
    url: `https://${baseUrl}/details/tosec`,
  }, {
    title: 'MS-DOS Games',
    url: `https://${baseUrl}/details/softwarelibrary_msdos_games`,
  }, {
    title: 'Historical Software',
    url: `https://${baseUrl}/details/historicalsoftware`,
  }, {
    title: 'Classic PC Games',
    url: `https://${baseUrl}/details/classicpcgames`,
  }, {
    title: 'Software Library',
    url: `https://${baseUrl}/details/softwarelibrary`,
  }],
  links: [{
    title: 'Kodi Archive and Support File',
    url: `https://${baseUrl}/details/kodi_archive`,
  }, {
    title: 'Community Software',
    url: `https://${baseUrl}/details/open_source_software`,
  }, {
    title: 'Vintage Software',
    url: `https://${baseUrl}/details/vintagesoftware`,
  }, {
    title: 'APK',
    url: `https://${baseUrl}/details/apkarchive`,
  }, {
    title: 'MS-DOS',
    url: `https://${baseUrl}/details/softwarelibrary_msdos`,
  }, {
    title: 'CD-ROM Software',
    url: `https://${baseUrl}/details/cd-roms`,
  }, {
    title: 'CD-ROM Software Library',
    url: `https://${baseUrl}/details/cdromsoftware`,
  }, {
    title: 'Software Sites',
    url: `https://${baseUrl}/details/softwaresites`,
  }, {
    title: 'Tucows Software Library',
    url: `https://${baseUrl}/details/tucows`,
  }, {
    title: 'Shareware CD-ROMs',
    url: `https://${baseUrl}/details/cdbbsarchive`,
  }, {
    title: 'Software Capsules Compilation',
    url: `https://${baseUrl}/details/softwarecapsules`,
  }, {
    title: 'CD-ROM Images',
    url: `https://${baseUrl}/details/cdromimages`,
  }, {
    title: 'ZX Spectrum',
    url: `https://${baseUrl}/details/softwarelibrary_zx_spectrum`,
  }, {
    title: 'DOOM Level CD',
    url: `https://${baseUrl}/details/doom-cds`,
  }],
});

const images = (baseUrl = prodUrl) => ({
  heading: 'Images',
  iconLinks: [{
    icon: `https://${baseUrl}/services/img/metropolitanmuseumofart-gallery`,
    title: 'Metropolitan Museum',
    url: `https://${baseUrl}/details/metropolitanmuseumofart-gallery`,
  }, {
    icon: `https://${baseUrl}/services/img/brooklynmuseum`,
    title: 'Brooklyn Museum',
    url: `https://${baseUrl}/details/brooklynmuseum`,
  }],
  featuredLinks: [{
    title: 'All images',
    url: `https://${baseUrl}/details/image`,
  }, {
    title: 'This Just In',
    url: `https://${baseUrl}/search.php?query=mediatype:image&sort=-publicdate`,
  }, {
    title: 'Flickr Commons',
    url: `https://${baseUrl}/details/flickrcommons`,
  }, {
    title: 'Occupy Wall Street Flickr',
    url: `https://${baseUrl}/details/flickr-ows`,
  }, {
    title: 'Cover Art',
    url: `https://${baseUrl}/details/coverartarchive`,
  }, {
    title: 'USGS Maps',
    url: `https://${baseUrl}/details/maps_usgs`,
  }],
  links: [{
    title: 'NASA Images',
    url: `https://${baseUrl}/details/nasa`,
  }, {
    title: 'Solar System Collection',
    url: `https://${baseUrl}/details/solarsystemcollection`,
  }, {
    title: 'Ames Research Center',
    url: `https://${baseUrl}/details/amesresearchcenterimagelibrary`,
  }]
});

const user = ({
  baseUrl = prodUrl,
  catUrl,
  username,
  isAdmin,
  identifier,
  uploader,
  biblio,
}) => {
  const generalLinks = [{
    href: `https://${baseUrl}/create`,
    title: 'Upload',
    analyticsEvent: 'UserUpload',
  }, {
    href: `https://${baseUrl}/details/@${username}`,
    title: 'My library',
    analyticsEvent: 'UserLibrary',
  }, {
    href: `https://${baseUrl}/details/@${username}?tab=loans`,
    title: 'My loans',
    analyticsEvent: 'UserLoans',
  }, {
    href: `https://${baseUrl}/details/fav-${username}`,
    title: 'My favorites',
    analyticsEvent: 'UserFavorites',
  }, {
    href: `https://${baseUrl}/details/@${username}/web-archive`,
    title: 'My web archive',
    analyticsEvent: 'UserWebArchive',
  }, {
    href: `https://${baseUrl}/account/index.php?settings=1`,
    title: 'Edit settings',
    analyticsEvent: 'UserSettings',
  }, {
    href: 'https://help.archive.org',
    title: 'Get help',
    analyticsEvent: 'UserHelp',
  }, {
    href: `https://${baseUrl}/account/logout`,
    title: 'Log out',
    analyticsEvent: 'UserLogOut',
  }];

  const adminLinks = [{
    title: 'ADMINS:'
  }, {
    title: 'item:'
  }, {
    href: `https://${baseUrl}/editxml/${identifier}`,
    title: 'edit xml',
    analyticsEvent: 'AdminUserEditXML',
  }, {
    href: `https://${baseUrl}/edit.php?redir=1&identifier=${identifier}`,
    title: 'edit files',
    analyticsEvent: 'AdminUserEditFiles',
  }, {
    href: `https://${baseUrl}/download/${identifier}/`,
    title: 'download',
    analyticsEvent: 'AdminUserDownload',
  }, {
    href: `https://${baseUrl}/metadata/${identifier}/`,
    title: 'metadata',
    analyticsEvent: 'AdminUserMetadata',
  }, {
    href: `${catUrl}/history/${identifier}`,
    title: 'history',
    analyticsEvent: 'AdminUserHistory',
  }, {
    href: `https://${baseUrl}/manage/${identifier}`,
    title: 'manage',
    analyticsEvent: 'AdminUserManager',
  }, {
    href: `https://${baseUrl}/manage/${identifier}#make_dark`,
    title: 'curate',
    analyticsEvent: 'AdminUserCurate',
  }, {
    href: `https://${baseUrl}/manage/${identifier}#modify_xml`,
    title: 'modify xml',
    analyticsEvent: 'AdminUserModifyXML',
  }, {
    href: `https://${baseUrl}/services/flags/admin.php?identifier=${identifier}`,
    title: 'manage flags',
    analyticsEvent: 'AdminUserManageFlags',
  }];

  const biblioLinks = [{
    href: `${biblio}&ignored=${identifier}`,
    title: 'biblio',
    analyticsEvent: 'AdminUserBiblio',
  }, {
    href: `https://${baseUrl}/bookview.php?mode=debug&identifier=${identifier}`,
    title: 'bookview',
    analyticsEvent: 'AdminUserBookView',
  }, {
    href: `https://${baseUrl}/download/${identifier}/format=Single Page Processed JP2 ZIP`,
    title: 'jp2 zip',
    analyticsEvent: 'AdminUserJP2Zip',
  }];

  const uploaderLinks = [{
    title: 'uploader:'
  }, {
    title: uploader,
  }, {
    href: `https://${baseUrl}/admins/useradmin.php?searchUser=${uploader}&ignore=${identifier}`,
    title: 'user admin',
    analyticsEvent: 'AdminUserUserAdmin',
  }, {
    href: `https://${baseUrl}/admins/setadmin.php?user=${uploader}&ignore=${identifier}`,
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

const signedOut = (baseUrl = prodUrl) => ([{
  href: `https://${baseUrl}/account/signup`,
  title: 'Sign up for free',
  analyticsEvent: 'SignUpDropdown',
}, {
  href: `https://${baseUrl}/account/login`,
  title: 'Log in',
  analyticsEvent: 'LogInDropdown',
}]);

const more = (baseUrl = prodUrl) => ([
  { label: 'About', url: `https://${baseUrl}/about/` },
  { label: 'Blog', url: 'https://blog.archive.org/' },
  { label: 'Projects', url: `https://${baseUrl}/projects/` },
  { label: 'Help', url: `https://${baseUrl}/about/faqs.php` },
  { label: 'Donate', url: `https://${baseUrl}/donate/` },
  { label: 'Contact', url: `https://${baseUrl}/about/contact.php` },
  { label: 'Jobs', url: `https://${baseUrl}/about/jobs.php` },
  { label: 'Volunteer', url: `https://${baseUrl}/about/volunteerpositions.php` },
  { label: 'People', url: `https://${baseUrl}/about/bios.php` },
]);

export {
  audio,
  images,
  more,
  signedOut,
  software,
  texts,
  user,
  video,
};
