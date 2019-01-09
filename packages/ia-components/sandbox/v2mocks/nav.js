import React from 'react'
import PropTypes from 'prop-types';

export default () => {
  return <div id="navwrap1">
    <div id="navwrap2">
      <div id="nav-tophat" className="collapse">
        <div className="row toprow web" style={{maxWidth: 1000, margin: 'auto'}}>
          <div className="col-xs-12">
            <div className="wayback-txt">
              Search the history of over 335 billion                        <a style={{display: 'inline'}} href="https://blog.archive.org/2016/10/23/defining-web-pages-web-sites-and-web-captures/">web pages</a> on the Internet.
            </div>
            <div className="roundbox7 wayback-main">
              <div className="row">
                <div className="col-sm-6" style={{paddingLeft: 0, paddingRight: 0}}>
                  <a style={{paddingBottom: 0}} href="https://archive.org/web/"><img src="https://archive.org/images/WaybackLogoSmall.png" alt="Wayback Machine" /></a>
                </div>
                <div className="col-sm-6" style={{paddingTop: 13}}>
                  <form style={{position: 'relative'}}>
                    <span className="iconochive-search" aria-hidden="true" /><span className="sr-only">search</span>                              <label htmlFor="nav-wb-url" className="sr-only">Search the Wayback Machine</label>
                    <input id="nav-wb-url" className="form-control input-sm roundbox20" type="text" placeholder="enter URL or keywords" name="url" autoComplete="off" />
                  </form>
                </div>
              </div>{/*/.row*/}
            </div>{/*/.wayback-main*/}
          </div>
        </div>{/*./row*/}
        <div className="row toprow fivecolumns texts">
          <div className="col-sm-2 col-xs-7 col-sm-push-4">
            <div className="linx">
              <h5>Featured</h5>
              <a href="https://archive.org/details/texts"><span className="iconochive-texts" aria-hidden="true" /><span className="sr-only">texts</span> All Texts</a>
              <a href="https://archive.org/search.php?query=mediatype:texts&sort=-publicdate"><span className="iconochive-latest" aria-hidden="true" /><span className="sr-only">latest</span> This Just In</a>
              <a href="https://archive.org/details/smithsonian" title="Smithsonian Libraries">Smithsonian Libraries</a>                                                          <a href="https://archive.org/details/fedlink" title="FEDLINK (US)">FEDLINK (US)</a>                                                          <a href="https://archive.org/details/genealogy" title="Genealogy">Genealogy</a>                                                          <a href="https://archive.org/details/lincolncollection" title="Lincoln Collection">Lincoln Collection</a>                                                          <a href="https://archive.org/details/additional_collections" title="Additional Collections">Additional Collections</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-5 col-sm-pull-2">
            <div className="widgets">
              <center className="items_list">
                <div className="items_list_img">
                  <a href="https://archive.org/details/inlibrary?sort=-publicdate" style={{backgroundImage: 'url("https://archive.org/images/book-lend.png")'}} aria-hidden="true" data-event-click-tracking="DetailsPage|CollectionLink" />
                </div>
                <a className="stealth boxy-label" data-event-click-tracking="DetailsPage|CollectionLink" href="https://archive.org/details/inlibrary?sort=-publicdate">Books to Borrow</a>
              </center>
            </div>{/*/.widgets*/}
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-7 col-sm-push-2">
            <div className="linx ">
              <h5>Top</h5>
              <a href="https://archive.org/details/americana" title="American Libraries">American Libraries</a>                                                          <a href="https://archive.org/details/toronto" title="Canadian Libraries">Canadian Libraries</a>                                                          <a href="https://archive.org/details/universallibrary" title="Universal Library">Universal Library</a>                                                          <a href="https://archive.org/details/opensource" title="Community Texts">Community Texts</a>                                                          <a href="https://archive.org/details/gutenberg" title="Project Gutenberg">Project Gutenberg</a>                                                          <a href="https://archive.org/details/biodiversity" title="Biodiversity Heritage Library">Biodiversity Heritage Library</a>                                                          <a href="https://archive.org/details/iacl" title="Children's Library">Children's Library</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-5 col-sm-pull-4">
            <div className="widgets">
              <center className="items_list">
                <div className="items_list_img">
                  <a href="https://openlibrary.org" style={{backgroundImage: 'url("https://archive.org/images/widgetOL.png")'}} aria-hidden="true" data-event-click-tracking="DetailsPage|CollectionLink" />
                </div>
                <a className="stealth boxy-label" data-event-click-tracking="DetailsPage|CollectionLink" href="https://openlibrary.org">Open Library</a>
              </center>
            </div>{/*/.widgets*/}
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-7">
            <div className="linx linx-topped">
              <a href="https://archive.org/details/ds_gamefront" title="Archive Team: Gamefront Files">Archive Team: Gamefront Files</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
        </div>{/*/.row*/}
        <div className="row toprow fivecolumns movies">
          <div className="col-sm-2 col-xs-7 col-sm-push-4">
            <div className="linx">
              <h5>Featured</h5>
              <a href="https://archive.org/details/movies"><span className="iconochive-movies" aria-hidden="true" /><span className="sr-only">movies</span> All Video</a>
              <a href="https://archive.org/search.php?query=mediatype:movies&sort=-publicdate"><span className="iconochive-latest" aria-hidden="true" /><span className="sr-only">latest</span> This Just In</a>
              <a href="https://archive.org/details/prelinger" title="Prelinger Archives">Prelinger Archives</a>                                                          <a href="https://archive.org/details/democracy_now_vid" title="Democracy Now!">Democracy Now!</a>                                                          <a href="https://archive.org/details/occupywallstreet" title="Occupy Wall Street">Occupy Wall Street</a>                                                          <a href="https://archive.org/details/nsa" title="TV NSA Clip Library">TV NSA Clip Library</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-5 col-sm-pull-2">
            <div className="widgets">
              <center className="items_list">        <div className="items_list_img">
                  <a href="https://archive.org/details/tv" style={{backgroundImage: 'url("https://archive.org/services/img/tv")'}} aria-hidden="true" data-event-click-tracking="DetailsPage|CollectionLink" />
                </div>
                <a className="stealth boxy-label" data-event-click-tracking="DetailsPage|CollectionLink" href="https://archive.org/details/tv">TV News</a></center>                        </div>{/*/.widgets*/}
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-7 col-sm-push-2">
            <div className="linx ">
              <h5>Top</h5>
              <a href="https://archive.org/details/animationandcartoons" title="Animation & Cartoons">Animation &amp; Cartoons</a>                                                          <a href="https://archive.org/details/artsandmusicvideos" title="Arts & Music">Arts &amp; Music</a>                                                          <a href="https://archive.org/details/opensource_movies" title="Community Video">Community Video</a>                                                          <a href="https://archive.org/details/computersandtechvideos" title="Computers & Technology">Computers &amp; Technology</a>                                                          <a href="https://archive.org/details/culturalandacademicfilms" title="Cultural & Academic Films">Cultural &amp; Academic Films</a>                                                          <a href="https://archive.org/details/ephemera" title="Ephemeral Films">Ephemeral Films</a>                                                          <a href="https://archive.org/details/moviesandfilms" title="Movies">Movies</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-5 col-sm-pull-4">
            <div className="widgets">
              <center className="items_list">        <div className="items_list_img">
                  <a href="https://archive.org/details/911" style={{backgroundImage: 'url("https://archive.org/services/img/911")'}} aria-hidden="true" data-event-click-tracking="DetailsPage|CollectionLink" />
                </div>
                <a className="stealth boxy-label" data-event-click-tracking="DetailsPage|CollectionLink" href="https://archive.org/details/911">Understanding 9/11</a></center>                        </div>{/*/.widgets*/}
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-7">
            <div className="linx linx-topped">
              <a href="https://archive.org/details/newsandpublicaffairs" title="News & Public Affairs">News &amp; Public Affairs</a>                                                          <a href="https://archive.org/details/spiritualityandreligion" title="Spirituality & Religion">Spirituality &amp; Religion</a>                                                          <a href="https://archive.org/details/sports" title="Sports Videos">Sports Videos</a>                                                          <a href="https://archive.org/details/television" title="Television">Television</a>                                                          <a href="https://archive.org/details/gamevideos" title="Videogame Videos">Videogame Videos</a>                                                          <a href="https://archive.org/details/vlogs" title="Vlogs">Vlogs</a>                                                          <a href="https://archive.org/details/youth_media" title="Youth Media">Youth Media</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
        </div>{/*/.row*/}
        <div className="row toprow fivecolumns audio">
          <div className="col-sm-2 col-xs-7 col-sm-push-4">
            <div className="linx">
              <h5>Featured</h5>
              <a href="https://archive.org/details/audio"><span className="iconochive-audio" aria-hidden="true" /><span className="sr-only">audio</span> All Audio</a>
              <a href="https://archive.org/search.php?query=mediatype:audio&sort=-publicdate"><span className="iconochive-latest" aria-hidden="true" /><span className="sr-only">latest</span> This Just In</a>
              <a href="https://archive.org/details/GratefulDead" title="Grateful Dead">Grateful Dead</a>                                                          <a href="https://archive.org/details/netlabels" title="Netlabels">Netlabels</a>                                                          <a href="https://archive.org/details/oldtimeradio" title="Old Time Radio">Old Time Radio</a>                                                          <a href="https://archive.org/details/78rpm" title="78 RPMs and Cylinder Recordings">78 RPMs and Cylinder Recordings</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-5 col-sm-pull-2">
            <div className="widgets">
              <center className="items_list">        <div className="items_list_img">
                  <a href="https://archive.org/details/etree" style={{backgroundImage: 'url("https://archive.org/services/img/etree")'}} aria-hidden="true" data-event-click-tracking="DetailsPage|CollectionLink" />
                </div>
                <a className="stealth boxy-label" data-event-click-tracking="DetailsPage|CollectionLink" href="https://archive.org/details/etree">Live Music Archive</a></center>                        </div>{/*/.widgets*/}
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-7 col-sm-push-2">
            <div className="linx ">
              <h5>Top</h5>
              <a href="https://archive.org/details/audio_bookspoetry" title="Audio Books & Poetry">Audio Books &amp; Poetry</a>                                                          <a href="https://archive.org/details/opensource_audio" title="Community Audio">Community Audio</a>                                                          <a href="https://archive.org/details/audio_tech" title="Computers & Technology">Computers &amp; Technology</a>                                                          <a href="https://archive.org/details/audio_music" title="Music, Arts & Culture">Music, Arts &amp; Culture</a>                                                          <a href="https://archive.org/details/audio_news" title="News & Public Affairs">News &amp; Public Affairs</a>                                                          <a href="https://archive.org/details/audio_foreign" title="Non-English Audio">Non-English Audio</a>                                                          <a href="https://archive.org/details/radioprograms" title="Radio Programs">Radio Programs</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-5 col-sm-pull-4">
            <div className="widgets">
              <center className="items_list">        <div className="items_list_img">
                  <a href="https://archive.org/details/librivoxaudio" style={{backgroundImage: 'url("https://archive.org/services/img/librivoxaudio")'}} aria-hidden="true" data-event-click-tracking="DetailsPage|CollectionLink" />
                </div>
                <a className="stealth boxy-label" data-event-click-tracking="DetailsPage|CollectionLink" href="https://archive.org/details/librivoxaudio">Librivox Free Audiobook</a></center>                        </div>{/*/.widgets*/}
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-7">
            <div className="linx linx-topped">
              <a href="https://archive.org/details/audio_religion" title="Spirituality & Religion">Spirituality &amp; Religion</a>                                                          <a href="https://archive.org/details/podcasts" title="Podcasts">Podcasts</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
        </div>{/*/.row*/}
        <div className="row toprow fivecolumns software">
          <div className="col-sm-2 col-xs-7 col-sm-push-4">
            <div className="linx">
              <h5>Featured</h5>
              <a href="https://archive.org/details/software"><span className="iconochive-software" aria-hidden="true" /><span className="sr-only">software</span> All Software</a>
              <a href="https://archive.org/search.php?query=mediatype:software&sort=-publicdate"><span className="iconochive-latest" aria-hidden="true" /><span className="sr-only">latest</span> This Just In</a>
              <a href="https://archive.org/details/tosec" title="Old School Emulation">Old School Emulation</a>                                                          <a href="https://archive.org/details/softwarelibrary_msdos_games" title="MS-DOS Games">MS-DOS Games</a>                                                          <a href="https://archive.org/details/historicalsoftware" title="Historical Software">Historical Software</a>                                                          <a href="https://archive.org/details/classicpcgames" title="Classic PC Games">Classic PC Games</a>                                                          <a href="https://archive.org/details/softwarelibrary" title="Software Library">Software Library</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-5 col-sm-pull-2">
            <div className="widgets">
              <center className="items_list">        <div className="items_list_img">
                  <a href="https://archive.org/details/internetarcade" style={{backgroundImage: 'url("https://archive.org/services/img/internetarcade")'}} aria-hidden="true" data-event-click-tracking="DetailsPage|CollectionLink" />
                </div>
                <a className="stealth boxy-label" data-event-click-tracking="DetailsPage|CollectionLink" href="https://archive.org/details/internetarcade">Internet Arcade</a></center>                        </div>{/*/.widgets*/}
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-7 col-sm-push-2">
            <div className="linx ">
              <h5>Top</h5>
              <a href="https://archive.org/details/open_source_software" title="Community Software">Community Software</a>                                                          <a href="https://archive.org/details/apkarchive" title="APK">APK</a>                                                          <a href="https://archive.org/details/softwarelibrary_msdos" title="MS-DOS">MS-DOS</a>                                                          <a href="https://archive.org/details/cd-roms" title="CD-ROM Software">CD-ROM Software</a>                                                          <a href="https://archive.org/details/softwaresites" title="Software Sites">Software Sites</a>                                                          <a href="https://archive.org/details/tucows" title="Tucows Software Library">Tucows Software Library</a>                                                          <a href="https://archive.org/details/ipaarchive" title="IPA Software">IPA Software</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-5 col-sm-pull-4">
            <div className="widgets">
              <center className="items_list">        <div className="items_list_img">
                  <a href="https://archive.org/details/consolelivingroom" style={{backgroundImage: 'url("https://archive.org/services/img/consolelivingroom")'}} aria-hidden="true" data-event-click-tracking="DetailsPage|CollectionLink" />
                </div>
                <a className="stealth boxy-label" data-event-click-tracking="DetailsPage|CollectionLink" href="https://archive.org/details/consolelivingroom">Console Living Room</a></center>                        </div>{/*/.widgets*/}
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-7">
            <div className="linx linx-topped">
              <a href="https://archive.org/details/cdromsoftware" title="CD-ROM Software Library">CD-ROM Software Library</a>                                                          <a href="https://archive.org/details/cdromimages" title="CD-ROM Images">CD-ROM Images</a>                                                          <a href="https://archive.org/details/cdbbsarchive" title="Shareware CD-ROMs">Shareware CD-ROMs</a>                                                          <a href="https://archive.org/details/softwarelibrary_zx_spectrum" title="ZX Spectrum">ZX Spectrum</a>                                                          <a href="https://archive.org/details/zx_spectrum_library_games" title="ZX Spectrum Library: Games">ZX Spectrum Library: Games</a>                                                          <a href="https://archive.org/details/kodi_archive" title="Kodi Archive and Support File">Kodi Archive and Support File</a>                                                          <a href="https://archive.org/details/softwarelibrary_apple" title="Apple Computer">Apple Computer</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
        </div>{/*/.row*/}
        <div className="row toprow fivecolumns image">
          <div className="col-sm-2 col-xs-7 col-sm-push-4">
            <div className="linx">
              <h5>Featured</h5>
              <a href="https://archive.org/details/image"><span className="iconochive-image" aria-hidden="true" /><span className="sr-only">image</span> All Image</a>
              <a href="https://archive.org/search.php?query=mediatype:image&sort=-publicdate"><span className="iconochive-latest" aria-hidden="true" /><span className="sr-only">latest</span> This Just In</a>
              <a href="https://archive.org/details/flickrcommons" title="Flickr Commons">Flickr Commons</a>                                                          <a href="https://archive.org/details/flickr-ows" title="Occupy Wall Street Flickr">Occupy Wall Street Flickr</a>                                                          <a href="https://archive.org/details/coverartarchive" title="Cover Art">Cover Art</a>                                                          <a href="https://archive.org/details/maps_usgs" title="USGS Maps">USGS Maps</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-5 col-sm-pull-2">
            <div className="widgets">
              <center className="items_list">        <div className="items_list_img">
                  <a href="https://archive.org/details/metropolitanmuseumofart-gallery" style={{backgroundImage: 'url("https://archive.org/services/img/metropolitanmuseumofart-gallery")'}} aria-hidden="true" data-event-click-tracking="DetailsPage|CollectionLink" />
                </div>
                <a className="stealth boxy-label" data-event-click-tracking="DetailsPage|CollectionLink" href="https://archive.org/details/metropolitanmuseumofart-gallery">Metropolitan Museum</a></center>                        </div>{/*/.widgets*/}
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-7 col-sm-push-2">
            <div className="linx ">
              <h5>Top</h5>
              <a href="https://archive.org/details/nasa">NASA Images</a>                                                          <a href="https://archive.org/details/solarsystemcollection">Solar System Collection</a>                                                          <a href="https://archive.org/details/amesresearchcenterimagelibrary">Ames Research Center</a>                                                    </div>
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-5 col-sm-pull-4">
            <div className="widgets">
              <center className="items_list">        <div className="items_list_img">
                  <a href="https://archive.org/details/brooklynmuseum" style={{backgroundImage: 'url("https://archive.org/services/img/brooklynmuseum")'}} aria-hidden="true" data-event-click-tracking="DetailsPage|CollectionLink" />
                </div>
                <a className="stealth boxy-label" data-event-click-tracking="DetailsPage|CollectionLink" href="https://archive.org/details/brooklynmuseum">Brooklyn Museum</a></center>                        </div>{/*/.widgets*/}
          </div>{/*/.col-sm-2*/}
          <div className="col-sm-2 col-xs-7">
            <div className="linx linx-topped">
            </div>
          </div>{/*/.col-sm-2*/}
        </div>{/*/.row*/}
      </div>{/*/#nav-tophat*/}
      <div className="navbar navbar-inverse navbar-static-top" role="navigation">
        <div id="nav-tophat-helper" className="hidden-xs" />
        <ul className="nav navbar-nav navbar-main">
          <li className="dropdown dropdown-ia pull-left">
            <a title className="navia-link web" data-top-kind="web" href="https://archive.org/web/" data-toggle="tooltip" target="_top" data-placement="bottom" data-original-title="Web"><span className="iconochive-web" aria-hidden="true" /><span className="sr-only">web</span></a>
          </li>
          <li className="dropdown dropdown-ia pull-left">
            <a title className="navia-link texts" data-top-kind="texts" href="https://archive.org/details/texts" data-toggle="tooltip" target="_top" data-placement="bottom" data-original-title="Texts"><span className="iconochive-texts" aria-hidden="true" /><span className="sr-only">texts</span></a>
          </li>
          <li className="dropdown dropdown-ia pull-left">
            <a title className="navia-link movies" data-top-kind="movies" href="https://archive.org/details/movies" data-toggle="tooltip" target="_top" data-placement="bottom" data-original-title="Video"><span className="iconochive-movies" aria-hidden="true" /><span className="sr-only">movies</span></a>
          </li>
          <li className="dropdown dropdown-ia pull-left">
            <a title className="navia-link audio" data-top-kind="audio" href="https://archive.org/details/audio" data-toggle="tooltip" target="_top" data-placement="bottom" data-original-title="Audio"><span className="iconochive-audio" aria-hidden="true" /><span className="sr-only">audio</span></a>
          </li>
          <li className="dropdown dropdown-ia pull-left">
            <a title className="navia-link software" data-top-kind="software" href="https://archive.org/details/software" data-toggle="tooltip" target="_top" data-placement="bottom" data-original-title="Software"><span className="iconochive-software" aria-hidden="true" /><span className="sr-only">software</span></a>
          </li>
          <li className="dropdown dropdown-ia pull-left rightmost">
            <a title className="navia-link image" data-top-kind="image" href="https://archive.org/details/image" data-toggle="tooltip" target="_top" data-placement="bottom" data-original-title="Image"><span className="iconochive-image" aria-hidden="true" /><span className="sr-only">image</span></a>
          </li>
          <li className="navbar-brand-li"><a className="navbar-brand" href="https://archive.org/" target="_top"><span className="iconochive-logo" aria-hidden="true" /><span className="sr-only">logo</span></a></li>
          <li className="nav-hamburger dropdown dropdown-ia pull-right hidden-sm hidden-md hidden-lg">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-hamburger-menu" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <div className="navbar-collapse collapse" id="nav-hamburger-menu" aria-expanded="false">
                  <ul id className="nav navbar-nav">
                    <li><a target="_top" data-event-click-tracking="TopNav|AboutLink" href="https://archive.org/about/">ABOUT</a></li>
                    <li><a target="_top" data-event-click-tracking="TopNav|ContactLink" href="https://archive.org/about/contact.php">CONTACT</a></li>
                    <li><a target="_top" data-event-click-tracking="TopNav|BlogLink" href="//blog.archive.org">BLOG</a></li>
                    <li><a target="_top" data-event-click-tracking="TopNav|ProjectsLink" href="https://archive.org/projects">PROJECTS</a></li>
                    <li><a target="_top" data-event-click-tracking="TopNav|HelpLink" href="https://archive.org/about/faqs.php">HELP</a></li>
                    <li><a target="_top" data-event-click-tracking="TopNav|DonateLink" href="https://archive.org/donate">DONATE</a></li>
                    <li><a target="_top" data-event-click-tracking="TopNav|JobsLink" href="https://archive.org/about/jobs.php">JOBS</a></li>
                    <li><a target="_top" data-event-click-tracking="TopNav|VolunteerLink" href="https://archive.org/about/volunteerpositions.php">VOLUNTEER</a></li>
                    <li><a target="_top" data-event-click-tracking="TopNav|PeopleLink" href="https://archive.org/about/bios.php">PEOPLE</a></li>
                  </ul>
                </div>{/* /.navbar-collapse */}
              </div>
            </div>{/* /.container-fluid */}
          </li>
          <li id="nav-search" className="dropdown dropdown-ia pull-right">
            <a href="https://archive.org/search.php" aria-hidden="true"><span className="iconochive-search" aria-hidden="true" /><span className="sr-only">search</span></a>
            <div className="searchbar">
              <form className="search-form js-search-form" method="get" role="search" action="https://archive.org/searchresults.php" target="_top" data-event-form-tracking="TopNav|SearchForm" data-wayback-machine-search-url="https://web.archive.org/web/*/">
                <input id="search-bar-2" className="js-search-bar" placeholder="Search" type="text" name="search"  aria-controls="navbar_search_options" aria-label="Search the Archive. Filters and Advanced Search available below." />
                <div id="navbar_search_options" className="search-options js-search-options" aria-expanded="false" aria-label="Search Options" data-keep-open-when-changed="false">
                  <fieldset>
                    <label>
                      <input type="radio" name="sin" defaultChecked />
                      <span>Search metadata</span>
                    </label>
                    <label>
                      <input type="radio" name="sin" defaultValue="TXT" />
                      <span>Search text contents</span>
                    </label>
                    <label>
                      <input type="radio" name="sin" defaultValue="TV" />
                      <span>Search TV news captions</span>
                    </label>
                    <label>
                      <input type="radio" name="sin" defaultValue="WEB" />
                      <span>Search archived web sites</span>
                    </label>
                  </fieldset>
                  <a href="https://archive.org/advancedsearch.php" className="search-options__advanced-search-link" >Advanced Search</a>
                </div>
                <input type="submit" defaultValue="Search" />
              </form>
            </div>{/*/.searchbar */}
          </li>
          <li className="dropdown dropdown-ia pull-right">
            <a href="https://archive.org/create" _target="top" data-toggle="tooltip" data-placement="bottom" title data-original-title="Upload"><span className="iconochive-upload" aria-hidden="true" /><span className="sr-only">upload</span></a>
          </li>
          <li className="dropdown dropdown-ia pull-right leftmost">
            <a href="https://archive.org/account/login.php" style={{paddingRight: 0}} _target="top"><span className="iconochive-person" aria-hidden="true" /><span className="sr-only">person</span><span className="hidden-xs-span">SIGN IN</span></a>
          </li>
        </ul>
        <ul id="nav-abouts" className>
          <li><a target="_top" data-event-click-tracking="TopNav|AboutLink" href="https://archive.org/about/">ABOUT</a></li>
          <li><a target="_top" data-event-click-tracking="TopNav|ContactLink" href="https://archive.org/about/contact.php">CONTACT</a></li>
          <li><a target="_top" data-event-click-tracking="TopNav|BlogLink" href="//blog.archive.org">BLOG</a></li>
          <li><a target="_top" data-event-click-tracking="TopNav|ProjectsLink" href="https://archive.org/projects">PROJECTS</a></li>
          <li><a target="_top" data-event-click-tracking="TopNav|HelpLink" href="https://archive.org/about/faqs.php">HELP</a></li>
          <li><a target="_top" data-event-click-tracking="TopNav|DonateLink" href="https://archive.org/donate">DONATE</a></li>
          <li><a target="_top" data-event-click-tracking="TopNav|JobsLink" href="https://archive.org/about/jobs.php">JOBS</a></li>
          <li><a target="_top" data-event-click-tracking="TopNav|VolunteerLink" href="https://archive.org/about/volunteerpositions.php">VOLUNTEER</a></li>
          <li><a target="_top" data-event-click-tracking="TopNav|PeopleLink" href="https://archive.org/about/bios.php">PEOPLE</a></li>
        </ul>
      </div>{/*/.navbar*/}
    </div>{/*#navwrap1*/}
  </div>
}