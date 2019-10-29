/* global DwebArchive, DWebTransports, Nav */
import React from 'react';
import IAReactComponent from '../IAReactComponent';
import AnchorDetails from '../AnchorDetails';
import { AnchorSearch } from './AnchorSearch';
import CrawlConfig from './CrawlConfig';
import {AnchorModalGo} from "./ModalGo";
import { I18nSpan, I18nStr, I18nIcon, currentISO, languageConfig } from '../languages/Languages';

const debug = require('debug')('NavWrap');

/**
 * Components used to draw the top part of the navigation on a details or search page.
 *
 * It includes several subcomponents, but generally only <NavWrap item=ArchiveItem /> should be used
 */

/**
 * <NavAboutsLI
 *    key=STRING    Not clear how used (this was on the LI, but React removes it anyway)
 *    data-event-click-tracking=STRING  For click tracking mechanisms (not used offline?)
 *    href=URL
 *    en=ENSTRING   For translation and display
 */
class NavAboutsLI extends IAReactComponent {
  render() {
    return (
      <li><a target="_top" data-event-click-tracking={this.props["data-event-click-tracking"]} href={this.props.href}><I18nSpan en={this.props.en}/></a></li>
    );
  }
}

/**
 * <NavAboutsUL
 *    disconnected=BOOL   True to not display since cannot reach archive.org
 * />
 *
 * Behavior:
 *  On rendering: renders a <UL> containing an <LI> for each of the ABOUT ... PEOPLE buttons
 */
class NavAboutsUL extends IAReactComponent {

  render() {
    return (
      this.props.disconnected ? null :
        <ul id="nav-abouts">
          {/* --TODO-BOOTSTRAP ongoing, was trying to make these eg. /about and use name lookup, but fails because not CORS and have not built gateway, and there is no "headless" version of these pages--*/}
          <NavAboutsLI key="about" data-event-click-tracking="TopNav|AboutLink" href="https://archive.org/about/" en="ABOUT" />
          <NavAboutsLI key="contact" data-event-click-tracking="TopNav|ContactLink" href="https://archive.org/about/contact.php" en="CONTACT" />
          <NavAboutsLI key="blog" data-event-click-tracking="TopNav|BlogLink" href="https://blog.archive.org" en="BLOG" />
          <NavAboutsLI key="projects" data-event-click-tracking="TopNav|ProjectsLink" href="https://archive.org/projects" en="PROJECTS" />
          <NavAboutsLI key="faqs" data-event-click-tracking="TopNav|HelpLink" href="https://archive.org/about/faqs.php" en="HELP" />
          <NavAboutsLI key="donate" data-event-click-tracking="TopNav|DonateLink" href="https://archive.org/donate" en="DONATE" />
          <NavAboutsLI key="jobs" data-event-click-tracking="TopNav|JobsLink" href="https://archive.org/about/jobs.php" en="JOBS" />
          <NavAboutsLI key="volunteerpositions" data-event-click-tracking="TopNav|VolunteerLink" href="https://archive.org/about/volunteerpositions.php" en="VOLUNTEER" />
          <NavAboutsLI key="bios" data-event-click-tracking="TopNav|PeopleLink" href="https://archive.org/about/bios.php" en="PEOPLE" />
        </ul>
    );
  }
}

/** <NavSearchLI/>
 * Behavior:
 *   Renders: an <LI/> with a form and search icon as used on the Details page
 *   On submit: Calls Nav.navSearch - this makes it Dweb only, if someone else uses it then a non-dweb version of onSubmit will be required
 */
class NavSearchLI extends IAReactComponent {
  constructor(props) {
    super(props); // None
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    // TODO-IAUX this is dweb-archive only, needs a version that works in raw IAUX
    debug('Search submitted %s',this.state.value);
    // noinspection JSUnresolvedFunction,JSUnresolvedVariable
    Nav.navSearch(this.state.value, {wanthistory: true});
    event.preventDefault();
  }

  clickCallable(unusedEvent) {
    // this.formElement.submit(); // TODO Doesnt work - not sure why
    this.onSubmit(unusedEvent);
    return false;
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    // TODO Component is required, but is not yet defined for non-Dweb
    // noinspection JSUnresolvedVariable
    return ((typeof DwebArchive === "undefined" || this.props.disconnected) ? null :
        <li id="nav-search" className="dropdown dropdown-ia pull-right" key="search">
          <a onClick={this.onClick}><I18nIcon className="iconochive-search" en="search" /></a>
          <div className="searchbar">
            <form
              className="search-form js-search-form"
              role="search"
              onSubmit={this.onSubmit}
              data-event-form-tracking="TopNav|SearchForm"
              data-wayback-machine-search-url="https://web.archive.org/web/*/"
            >
              <label htmlFor="search-bar-2" className="sr-only"><I18nSpan en="Search the Archive"/></label>
              <input
                id="search-bar-2" className="js-search-bar" placeholder={I18nStr("Search")} type="text"
                onChange={this.onChange}
                name="search" defaultValue=""
                aria-controls="navbar_search_options"
                aria-label={I18nStr("Search the Archive. Filters and Advanced Search available below.")}
              />
              <input type="submit" value="Search"/>
            </form>
          </div>
        </li>
    );
  }
}
class NavUploadLI extends IAReactComponent {
  /*
   * <NavUploadLI
   *   disconnected     True if cannot see archive.org
   * />
   * Behavior:
   *   Renders an Upload <LI/> icon
   *   On click: Goes to "https://archive.org/create" since this functionality is not supported on Dweb yet
   */

  render() {
    return (
        this.props.disconnected ? null :
          <li className="dropdown dropdown-ia pull-right" key="upload">
            <a
              href="https://archive.org/create" target="top" data-toggle="tooltip"
              data-placement="bottom" title={I18nStr("Upload")}
            >
              <I18nIcon className="iconochive-upload" en="upload"/>
            </a>
          </li>
    );
  }
}
class NavBrandLI extends IAReactComponent {
  /**
   * <NavBrandLI/>
   * Behavior:
   *   Renders an Internet Archive Icon
   *   On click: Goes to Nav.nav_home it needs a non-dweb version and will get this via replacing with <AnchorDetails identifier="home">
   */

  render() {
    return (
      <li className="navbar-brand-li" key="brand">
        <AnchorDetails className="navbar-brand" identifier={"home"} target="_top">
          <I18nIcon className="iconochive-logo" en="logo"/>
        </AnchorDetails>
      </li>
    );
  }
}

class NavMediatypeLI extends IAReactComponent {
  /**
   * <class >NavMediatypeLI
   *    mediatype EN-STRING  e.g. "texts"
   *  />
   *  Behavior
   *    Renders the icon for the mediatype
   *    On click navigates to that mediatype collection
   */

  render() {
    return (
      <li key={`mt${this.props.mediatype}`} className="dropdown dropdown-ia pull-left">
            <AnchorDetails
                title={I18nStr(this.props.mediatype)} className={`navia-link ${this.props.mediatype}`} identifier={this.props.mediatype}
              >{/* --disabled till top hat worked on dweb-archive issue#70 -- data-top-kind={mt} data-toggle="tooltip" target="_top" data-placement="bottom"--*/}
                <I18nIcon className={`iconochive-${ this.props.mediatype}`} en={this.props.mediatype}/>
              </AnchorDetails>
          </li>
    );
  }
}

class NavWebDIV extends IAReactComponent {
  /** <NavWebDIV
   *     disconnected     True if cannot see archive.org
   * />
   *
   * Behavior
   *  Renders the Wayback search icon with a nested search engine
   *  Onclick - unclear - this is copied from archive.org site and could use some research
   *
   */

  loadcallable(el) {
    this.hideableElement = el;
  }

  clickCallable() {
    this.hideableElement.hide();
    return false;
    // This looks wrong, the old Jquery specific search was which wouldn't appear to hide anything
    // $(this).css('padding-left','').parent().find('.iconochive-search').hide();
  }

  render() {
    // noinspection HtmlUnknownTarget,HtmlUnknownTarget,CheckTagEmptyBody
    return (
      this.props.disconnected ? null :
          <div className="row toprow web" style={{maxWidth: 1000, margin: "auto"}}>
            <div className="col-xs-12">
              <div className="wayback-txt">
                <I18nSpan en="Search the history of over 338 billion"/>
                <a style={{display: "inline"}}
                   href="https://blog.archive.org/2016/10/23/defining-web-pages-web-sites-and-web-captures/"><I18nSpan en="web pages"/></a> <I18nSpan en="on the Internet."/>
              </div>
              <div className="roundbox7 wayback-main">
                <div className="row">
                  <div className="col-sm-6" style={{paddingLeft: 0, paddingRight: 0}}>
                    <a style={{paddingBottom: 0}} href="https://archive.org/web/"><img
                      src="/images/WaybackLogoSmall.png" alt="Wayback Machine"/></a>
                  </div>
                  <div className="col-sm-6" style={{paddingTop: 13}}>
                    <form style={{position: "relative"}}>
                      <I18nIcon className="iconochive-search" iconref={this.load} en="search"/> <label htmlFor="nav-wb-url" className="sr-only"><I18nSpan en="Search the Wayback Machine"/></label>
                      <input id="nav-wb-url" className="form-control input-sm roundbox20"
                             type="text"
                             placeholder={I18nStr("enter URL or keywords")} name="url" autoComplete="off"
                             onClick={this.onClick}/>
                    </form>
                  </div>
                </div>
                {/* --/.row--*/}
              </div>
              {/* --/.wayback-main--*/}
            </div>
          </div>
    );
  }
}

class DwebNavButtons extends IAReactComponent {
  /**
   * <DwebNavButtons
   * identifier string   For current page
   * query, sort         For current page if its a search
   * mirror2gateway      True if on DwebMirror and can see gateway
   * canSave             True if can save this content
   * />
   *
   * Behavior
   *  Renders a <UL> with a row of buttons Reload | Settings | Local
   *  OnClick
   *    Reload reloads the current page via an AnchorDetails
   *    Settings an Local navigate to those special pages
   */

  render() {
    // TODO add date downloaded here - maybe just on hover
    // SEE-OTHER-ADD-SPECIAL-PAGE in dweb-archive dweb-archivecontroller dweb-mirror
    // TODO find suitable Iconochive's for Settings & Local then replace SVGs used in .css
    return (
      <ul className="dwebnavbuttons">
        {!this.props.mirror2gateway
          ? null
          : <li className="reload">
            <span className="iconochive-Refresh"></span>
            {this.props.identifier
              ? <AnchorDetails identifier={this.props.identifier} reload><I18nSpan en="Reload"/></AnchorDetails>
              : <AnchorSearch query={this.props.query} sort={this.props.sort} reload><I18nSpan en="Reload"/></AnchorSearch>
            }
          </li>
        }
        <li className="settings">
          <span className="iconochive-gear"/>
          <AnchorDetails identifier="settings"><I18nSpan en="Settings"/>&nbsp;&nbsp;{languageConfig[currentISO()].flag}</AnchorDetails></li>
        { !this.props.canSave ? null :
          <li className="save"><span className="iconochive-download"></span>
            <AnchorModalGo
              id="save-button"
              className="button"
              opts={{ ignore_lnk: 1 }}
              type="button"
              aria-haspopup="true"
              data-target="#save-modal"
              data-toggle="tooltip"
              data-container="body"
              data-placement="bottom"
              en="Save this item"
              ><I18nSpan en="Save"/>
            </AnchorModalGo></li>
        }
        <li className="local"><span className="iconochive-folder"></span>
          <AnchorDetails identifier="local"><I18nSpan en="Local"/></AnchorDetails></li>
      </ul>
    );
  }

  clickCallable() {
    debug('%s: Reload clicked'); // this.props.identifier if ste it
  }
}

class DwebNavDIV extends IAReactComponent {
  /**
   * <DwebNavDIV
   *    item= {             // ArchiveItem
   *      itemid: identifier,
   *      query:  string or object,
   *      sort:   string,
   *      downloaded: { ... }, passed to CrawlConfig
   *      crawl: object (optional) passed as props to CrawlConfig (strings in English)
   *      canSave: bool   true if can save
   *    }
   *   transportStatuses=[{name: STRING, status: INT} Status of connected transports
   *   transportsClickable = BOOL
   *   mirror2gateway=BOOL  True if connected to a mirror that can see its upstream gateway
   *   disconnected=BOOL    True if disconnected from upstream (so disable UI dependent on upstream)
   * />
   * Renders: A navigation row with the DwebStatusDIV (transport status buttons), CrawlConfig and DwebNavButtons
   * OnClick: See those subcomponents
   *
   *    Note the props could be passed as fields, but but whole component is null unless on dweb.
   */

  render() {
    // Alternative to complex nav-dweb code
    const crawl = Object.assign({ identifier: this.props.item.itemid, query: this.props.item.query, downloaded: this.props.item.downloaded }, this.props.item.crawl);
        return ((typeof DwebArchive === "undefined") ? null :
                <div id="nav-dweb">
                  { DwebArchive.mirror
                    ? <I18nSpan className="dweb-nav-left" en="Offline"/>
                    : <span className="dweb-nav-left">DWeb</span>}:
                  <DwebStatusDIV statuses={this.props.transportStatuses}/>
                    {!DwebArchive.mirror ? null :
                        <>
                          <div id="dweb-mirrorconfig"><CrawlConfig {...crawl} /></div>
                          <div id="dweb-mirrorreload"><DwebNavButtons identifier={this.props.item.itemid}
                                                                      query={this.props.item.query}
                                                                      sort={this.props.item.sort}
                                                                      mirror2gateway={this.props.mirror2gateway}
                                                                      canSave={this.props.canSave}/></div>
                        </>
                    }
                  {/* --<a href="https://docs.google.com/forms/d/e/1FAIpQLSe7pXiSLrmeLoKvlDi2wODcL3ro7D6LegPksb86jr5bCJa7Ig/viewform" target="_blank"><img src="./images/feedback.svg"/></a>--*/}
                </div>
    );
  }
}

const TRANSPORT_STATUS_FAILED = 1; // From dweb-transport/Transport.js

class DwebStatusLI extends React.Component {
  /**
   * <DwebStatusLI
   *    name =  string    Name of transport e.g. HTTP
   *    status = integer  Status of transport 0 is ok, anything else is not connected (yet)
   *    clickable = BOOL  True if can click the status to change it
   * />
   * Renders: a button
   * Onclick: Toggles paused on the transport with that name
   *
   */
  constructor(props) {
    super(props); // name, status
    this.state = {status: props.status }; // Copy to state as will (soon) be changed by Transports
    this.onClick = this.onClick.bind(this);
  }

  onClick(ev) {
    debug('Toggling transport for %s', this.props.name);
    // noinspection JSUnresolvedFunction
    DwebTransports.togglePaused(this.props.name, (err, s) => {
      // TODO display err.message if hover
      this.setState({ error: err, status: err ? TRANSPORT_STATUS_FAILED : s });
    });
    ev.preventDefault(); // Prevent click propogating (equivalent to "return false" in non-React
  }

  render() {
    return <li className={`transportstatus${this.state.status}`} onClick={this.onClick} key={`status${this.props.name}`}><I18nSpan en={this.props.name} /></li>;
  }
}

class DwebStatusDIV extends IAReactComponent {
  /**
   /* <DwebStatusDIV
   *   statuses = [{name: STRING, status: INT]
   *   clickable = BOOL
   * />
   *
   * Behavior
   *  Renders a group of DwebStatusLI which are indicators of Dweb Transport connections
   *  OnClick see DwebStatusLI
   */

  render() {
    // Alternative to complex nav-dweb code
    return ((typeof DwebTransports === 'undefined') ? null :
      <div id='dweb-status'>
        {typeof this.props.statuses === 'undefined' ?
          I18nStr('Connecting')+'  '
          :
          <ul>
            {this.props.statuses.map(s =>
              <DwebStatusLI {...s} clickable={this.props.clicakable} key={s.name}/>
            )}
          </ul>
        }
      </div>
    );
  }
}

class NavWrap extends IAReactComponent {
  /*
   * <NavWrap
   *   item = ArchiveItem  passed to DwebNavDIV (optional if not on Dweb), should have ".crawl" = {}
   *   canSave=BOOL        True if can save
   *   transportStatuses=[{name: STRING, status: INT} Status of connected transports
   *   mirror2gateway=BOOL  True if connected to a mirror that can see its upstream gateway
   *   disconnected=BOOL    True if disconnected from upstream (so disable UI dependent on upstream)
   *   transportsClickable=BOOL True if can click on transports to pause them
   * />
   * Behavior
   *   On Render: Renders the head of a details or search page including NavDwebDIV, NavBrandLI NavSearchLI NavUploadLI NavAboutsUL DwebNavDIV
   *   On Click: See behavior of sub-components
   *
   */

  render() {
    /* The navigation stuff.   Order is navwrap : maincontent : itemDetailsAbout */
    /* navwrap1( navwrap2 (navhat; navbar( nav-tophat-helper; navbar-main; nav-about))) */
    { /* --TODO-DETAILS update navwrap to match actual code in both search.html and commute.html--*/
    }
    // noinspection CheckTagEmptyBody
    return (
      <div id="navwrap1">
        <div id="navwrap2">
          <div id="nav-tophat" className="collapse">
            <NavWebDIV disconnected={this.props.disconnected} />
              {/* TODO-DETAILS-INFOREQD Need to figure out how to auto-generator the other rows of nav-tophat for each media type */}
          </div>

          <div id="nav-dweb-parent" className="navbar navbar-inverse navbar-static-top" role="navigation">
            <div id="nav-tophat-helper" className="hidden-xs" />
            <ul className="nav navbar-nav navbar-main">
              {['web', 'texts', 'movies', 'audio', 'software', 'image'].map(mediatype => (
                <NavMediatypeLI mediatype={mediatype} key={mediatype} />
              ))}
              <NavBrandLI />
              <NavSearchLI disconnected={this.props.disconnected} />
              <NavUploadLI disconnected={this.props.disconnected}/>
            </ul>
            <NavAboutsUL disconnected={this.props.disconnected} />
            <DwebNavDIV item={this.props.item}
                        transportStatuses={this.props.transportStatuses}
                        mirror2gateway={this.props.mirror2gateway}
                        canSave={this.props.canSave}
                        transportsClickable={this.props.transportsClickable}
            />
          </div>
        </div>
      </div>
    );
  }
}

export { NavWrap };
