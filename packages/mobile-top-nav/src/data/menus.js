const texts = {
  heading: 'Books',
  iconLinks: [{
    title: 'Books to Borrow',
    icon: 'https://archive.org/images/book-lend.png',
    url: 'https://archive.org/details/inlibrary?sort=-publicdate',
  }, {
    title: 'Open Library',
    icon: 'https://archive.org/images/widgetOL.png',
    url: 'https://openlibrary.org/',
  }],
  featuredLinks: [{
    title: 'All Books',
    url: 'https://archive.org/details/books',
  }, {
    title: 'All Texts',
    url: 'https://archive.org/details/texts',
  }, {
    title: 'This Just In',
    url: 'https://archive.org/search.php?query=mediatype:texts&sort=-publicdate',
  }, {
    title: 'Smithsonian Libraries',
    url: 'https://archive.org/details/smithsonian',
  }, {
    title: 'FEDLINK (US)',
    url: 'https://archive.org/details/fedlink',
  }, {
    title: 'Genealogy',
    url: 'https://archive.org/details/genealogy',
  }, {
    title: 'Lincoln Collection',
    url: 'https://archive.org/details/lincolncollection',
  }],
  links: [{
    title: 'American Libraries',
    url: 'https://archive.org/details/americana',
  }, {
    title: 'Canadian Libraries',
    url: 'https://archive.org/details/toronto',
  }, {
    title: 'Universal Library',
    url: 'https://archive.org/details/universallibrary',
  }, {
    title: 'Community Texts',
    url: 'https://archive.org/details/opensource',
  }, {
    title: 'Project Gutenberg',
    url: 'https://archive.org/details/gutenberg',
  }, {
    title: 'Biodiversity Heritage Library',
    url: 'https://archive.org/details/biodiversity',
  }, {
    title: 'Children\'s Library',
    url: 'https://archive.org/details/iacl',
  }, {
    title: 'Halesowen Chronicle Newspaper',
    url: 'https://archive.org/details/halesowen-chronicle-newspaper',
  }, {
    title: 'Kidderminster Chronicle Newspaper',
    url: 'https://archive.org/details/kidderminster-chronicle-newspaper',
  }, {
    title: 'Harlow Star Newspaper',
    url: 'https://archive.org/details/harlow-star-newspaper',
  }, {
    title: 'Mk News Newspaper',
    url: 'https://archive.org/details/mk-news-newspaper',
  }, {
    title: 'Books by Language',
    url: 'https://archive.org/details/booksbylanguage',
  }, {
    title: 'Additional Collections',
    url: 'https://archive.org/details/additional_collections',
  }],
};

const video = {
  heading: 'Video',
  iconLinks: [{
    icon: 'https://archive.org/services/img/tv',
    title: 'TV News',
    url: 'https://archive.org/details/tv',
  }, {
    icon: 'https://archive.org/services/img/911',
    title: 'Understanding 9/11',
    url: 'https://archive.org/details/911',
  }],
  featuredLinks: [{
    title: 'All video',
    url: 'https://archive.org/details/movies',
  }, {
    title: 'This Just In',
    url: 'https://archive.org/search.php?query=mediatype:movies&sort=-publicdate',
  }, {
    title: 'Prelinger Archives',
    url: 'https://archive.org/details/prelinger',
  }, {
    title: 'Democracy Now!',
    url: 'https://archive.org/details/democracy_now_vid',
  }, {
    title: 'Occupy Wall Street',
    url: 'https://archive.org/details/occupywallstreet',
  }, {
    title: 'TV NSA Clip Library',
    url: 'https://archive.org/details/nsa',
  }],
  links: [{
    title: 'Animation & Cartoons',
    url: 'https://archive.org/details/animationandcartoons',
  }, {
    title: 'Arts & Music',
    url: 'https://archive.org/details/artsandmusicvideos',
  }, {
    title: 'Computers & Technology',
    url: 'https://archive.org/details/computersandtechvideos',
  }, {
    title: 'Cultural & Academic Films',
    url: 'https://archive.org/details/culturalandacademicfilms',
  }, {
    title: 'Ephemeral Films',
    url: 'https://archive.org/details/ephemera',
  }, {
    title: 'Movies',
    url: 'https://archive.org/details/moviesandfilms',
  }, {
    title: 'News & Public Affairs',
    url: 'https://archive.org/details/newsandpublicaffairs',
  }, {
    title: 'Spirituality & Religion',
    url: 'https://archive.org/details/spiritualityandreligion',
  }, {
    title: 'Sports Videos',
    url: 'https://archive.org/details/sports',
  }, {
    title: 'Television',
    url: 'https://archive.org/details/television',
  }, {
    title: 'Videogame Videos',
    url: 'https://archive.org/details/gamevideos',
  }, {
    title: 'Vlogs',
    url: 'https://archive.org/details/vlogs',
  }, {
    title: 'Youth Media',
    url: 'https://archive.org/details/youth_media',
  }, {
    title: 'Regent Park TV',
    url: 'https://archive.org/details/rptv1on',
  }]
};

const audio = {
  heading: 'Internet Archive Audio',
  iconLinks: [{
    icon: 'https://archive.org/services/img/etree',
    title: 'Live Music Archive',
    url: 'https://archive.org/details/etree',
  }, {
    icon: 'https://archive.org/services/img/librivoxaudio',
    title: 'Librivox Free Audio',
    url: 'https://archive.org/details/librivoxaudio',
  }],
  featuredLinks: [{
    title: 'All audio',
    url: 'https://archive.org/details/audio',
  }, {
    title: 'This Just In',
    url: 'https://archive.org/search.php?query=mediatype:audio&sort=-publicdate',
  }, {
    title: 'Grateful Dead',
    url: 'https://archive.org/details/GratefulDead',
  }, {
    title: 'Netlabels',
    url: 'https://archive.org/details/netlabels',
  }, {
    title: 'Old Time Radio',
    url: 'https://archive.org/details/oldtimeradio',
  }, {
    title: '78 RPMs and Cylinder Recordings',
    url: 'https://archive.org/details/78rpm',
  }],
  links: [{
    title: 'Audio Books & Poetry',
    url: 'https://archive.org/details/audio_bookspoetry',
  }, {
    title: 'Community Audio',
    url: 'https://archive.org/details/opensource_audio',
  }, {
    title: 'Computers & Technology',
    url: 'https://archive.org/details/audio_tech',
  }, {
    title: 'Music, Arts & Culture',
    url: 'https://archive.org/details/audio_music',
  }, {
    title: 'News & Public Affairs',
    url: 'https://archive.org/details/audio_news',
  }, {
    title: 'Non-English Audio',
    url: 'https://archive.org/details/audio_foreign',
  }, {
    title: 'Spirituality & Religion',
    url: 'https://archive.org/details/audio_religion',
  }, {
    title: 'Fat Tuesday',
    url: 'https://archive.org/details/FatTuesdayBand',
  }, {
    title: 'Podcasts',
    url: 'https://archive.org/details/podcasts',
  }],
};

const software = {
  heading: 'Software',
  iconLinks: [{
    icon: 'https://archive.org/services/img/internetarcade',
    title: 'Internet Arcade',
    url: 'https://archive.org/details/internetarcade',
  }, {
    icon: 'https://archive.org/services/img/consolelivingroom',
    title: 'Console Living Room',
    url: 'https://archive.org/details/consolelivingroom',
  }],
  featuredLinks: [{
    title: 'All software',
    url: 'https://archive.org/details/software',
  }, {
    title: 'latest This Just In',
    url: 'https://archive.org/search.php?query=mediatype:software&sort=-publicdate',
  }, {
    title: 'Old School Emulation',
    url: 'https://archive.org/details/tosec',
  }, {
    title: 'MS-DOS Games',
    url: 'https://archive.org/details/softwarelibrary_msdos_games',
  }, {
    title: 'Historical Software',
    url: 'https://archive.org/details/historicalsoftware',
  }, {
    title: 'Classic PC Games',
    url: 'https://archive.org/details/classicpcgames',
  }, {
    title: 'Software Library',
    url: 'https://archive.org/details/softwarelibrary',
  }],
  links: [{
    title: 'Kodi Archive and Support File',
    url: 'https://archive.org/details/kodi_archive',
  }, {
    title: 'Community Software',
    url: 'https://archive.org/details/open_source_software',
  }, {
    title: 'Vintage Software',
    url: 'https://archive.org/details/vintagesoftware',
  }, {
    title: 'APK',
    url: 'https://archive.org/details/apkarchive',
  }, {
    title: 'MS-DOS',
    url: 'https://archive.org/details/softwarelibrary_msdos',
  }, {
    title: 'CD-ROM Software',
    url: 'https://archive.org/details/cd-roms',
  }, {
    title: 'CD-ROM Software Library',
    url: 'https://archive.org/details/cdromsoftware',
  }, {
    title: 'Software Sites',
    url: 'https://archive.org/details/softwaresites',
  }, {
    title: 'Tucows Software Library',
    url: 'https://archive.org/details/tucows',
  }, {
    title: 'Shareware CD-ROMs',
    url: 'https://archive.org/details/cdbbsarchive',
  }, {
    title: 'CD-ROM Images',
    url: 'https://archive.org/details/cdromimages',
  }, {
    title: 'Software Capsules Compilation',
    url: 'https://archive.org/details/softwarecapsules',
  }, {
    title: 'ZX Spectrum',
    url: 'https://archive.org/details/softwarelibrary_zx_spectrum',
  }, {
    title: 'DOOM Level CD',
    url: 'https://archive.org/details/doom-cds',
  }],
};

const images = {
  heading: 'Images',
  iconLinks: [{
    icon: 'https://archive.org/services/img/metropolitanmuseumofart-gallery',
    title: 'Metropolitan Museum',
    url: 'https://archive.org/details/metropolitanmuseumofart-gallery',
  }, {
    icon: 'https://archive.org/services/img/brooklynmuseum',
    title: 'Brooklyn Museum',
    url: 'https://archive.org/details/brooklynmuseum',
  }],
  featuredLinks: [{
    title: 'All images',
    url: 'https://archive.org/details/image',
  }, {
    title: 'This Just In',
    url: 'https://archive.org/search.php?query=mediatype:image&sort=-publicdate',
  }, {
    title: 'Flickr Commons',
    url: 'https://archive.org/details/flickrcommons',
  }, {
    title: 'Occupy Wall Street Flickr',
    url: 'https://archive.org/details/flickr-ows',
  }, {
    title: 'Cover Art',
    url: 'https://archive.org/details/coverartarchive',
  }, {
    title: 'USGS Maps',
    url: 'https://archive.org/details/maps_usgs',
  }],
  links: [{
    title: 'NASA Images',
    url: 'https://archive.org/details/nasa',
  }, {
    title: 'Solar System Collection',
    url: 'https://archive.org/details/solarsystemcollection',
  }, {
    title: 'Ames Research Center',
    url: 'https://archive.org/details/amesresearchcenterimagelibrary',
  }]
};

export default {
  texts,
  video,
  audio,
  software,
  images,
};
