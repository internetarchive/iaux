import React from 'react';
import ReactDOM from 'react-dom';
import IAReactComponent from '../IAReactComponent';
import AnchorDetails from '../AnchorDetails';
import CrawlConfig from './CrawlConfig';
const debug = require('debug')('NavWrap');

/**
 * Components used to draw the top part of the navigation on a details or search page.
 *
 * It includes several subcomponents, but generally only <NavWrap item=ArchiveItem /> should be used
 *
 * <NavWrap
 *    item = ArchiveItem  passed to DwebNavDIV (optional if not on Dweb)
 * />
 * Behavior
 *   On Render: Renders the head of a details or search page including NavWebDIV, NavBrandLI NavSearchLI NavUploadLI NavAboutsUL DwebNavDIV
 *   On Click: See behavior of sub-components
 *
 * <NavAboutsUL/>
 * Behavior:
 *  On rendering: renders a <UL> containing an <LI> for each of the ABOUT ... PEOPLE buttons
 *
 * <NavSearchLI/>
 * Behavior:
 *   Renders: an <LI/> with a form and search icon as used on the Details page
 *   On submit: Calls Nav.nav_search - this makes it Dweb only, if someone else uses it then a non-dweb version of onSubmit will be required
 *
 * <NavUploadLI/>
 * Behavior:
 *   Renders an Upload <LI/> icon
 *   On click: Goes to "https://archive.org/create" since this functionality is not supported on Dweb yet
 *
 * <NavBrandLI/>
 * Behavior:
 *   Renders an Internet Archive Icon
 *   On click: Goes to Nav.nav_home it needs a non-dweb version and will get this via replacing with <AnchorDetails identifier="home">
 *
 * <class >NavMediatypeLI
 *    mediatype string  e.g. "texts"
 *  />
 *  Behavior
 *    Renders the icon for the mediatype
 *    On click navigates to that mediatype collection
 *
 * <NavWebDIV />
 * Behavior
 *  Renders the Wayback search icon with a nested search engine
 *  Onclick - unclear - this is copied from archive.org site and could use some research
 *
 * <DwebNavButtons
 *    identifier string   For current page
 * />
 * Behavior
 *  Renders a <UL> with a row of buttons Reload | Settings | Local
 *  OnClick
 *    Reload reloads the current page via an AnchorDetails
 *    Settings an Local navigate to those special pages
 *
 * <DwebNavDIV
 *    item= {             // ArchiveItem
 *      itemid: identifier,
 *      downloaded: bool,
 *      crawl: object (optional) passed as props to CrawlConfig
 *    }
 * />
 * Renders: A navigation row with the DwebStatusDIV (transport status buttons), CrawlConfig and DwebNavButtons
 * OnClick: See those subcomponents
 *
 * <DwebStatusLI
 *    name =  string    Name of transport e.g. HTTP
 *    status = integer  Status of transport 0 is ok, anything else is not connected (yet)
 * />
 * Renders: a button
 * Onclick: Toggles paused on the transport with that name
 *
 * <DwebStatusDIV/>
 * Behavior
 *  On construction: requests status from DwebTransports TODO move behavior to higher level (maybe)
 *  Renders a group of DwebStatusLI which are indicators of Dweb Transport connections
 *    Does nothing if DwebTransports not defined
 *  OnClick see DwebStatusLI
 *
 */


class NavAboutsUL extends IAReactComponent {
  //Props: none

  render() {
    return (
      <ul id="nav-abouts">
            {/* --TODO-BOOTSTRAP ongoing, was trying to make these eg. /about and use name lookup, but fails because not CORS and have not built gateway, and there is no "headless" version of these pages--*/}
                <li key="about"><a target="_top" data-event-click-tracking="TopNav|AboutLink"
                                   href="https://archive.org/about/">ABOUT</a>
              </li>
                <li key="contact"><a target="_top" data-event-click-tracking="TopNav|ContactLink"
                                     href="https://archive.org/about/contact.php">CONTACT</a></li>
                <li key="blog"><a target="_top" data-event-click-tracking="TopNav|BlogLink"
                                  href="https://blog.archive.org">BLOG</a>{/*--TODO-BOOTSTRAP this was //blog, no good reason why not forcing https --*/}
              </li>
                <li key="projects"><a target="_top" data-event-click-tracking="TopNav|ProjectsLink"
                                      href="https://archive.org/projects">PROJECTS</a></li>
                <li key="faqs"><a target="_top" data-event-click-tracking="TopNav|HelpLink"
                                  href="https://archive.org/about/faqs.php">HELP</a></li>
                <li key="donate"><a target="_top" data-event-click-tracking="TopNav|DonateLink"
                                    href="https://archive.org/donate">DONATE</a></li>
                <li key="jobs"><a target="_top" data-event-click-tracking="TopNav|JobsLink"
                                  href="https://archive.org/about/jobs.php">JOBS</a></li>
                <li key="volunteerpositions"><a target="_top" data-event-click-tracking="TopNav|VolunteerLink"
                                                href="https://archive.org/about/volunteerpositions.php">VOLUNTEER</a></li>
                <li key="bios"><a target="_top" data-event-click-tracking="TopNav|PeopleLink"
                                  href="https://archive.org/about/bios.php">PEOPLE</a></li>
          </ul>
    );
  }
}

class NavSearchLI extends IAReactComponent {
  constructor(props) {
    super(props); // None
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
      // TODO-IAUX this is dweb-archive only, needs a version that works in raw IAUX
      debug('Search submitted');
    // noinspection JSUnresolvedFunction,JSUnresolvedVariable
    Nav.nav_search(this.state.value, {wanthistory: true});
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
    // noinspection JSUnresolvedVariable
    return (( typeof DwebArchive === "undefined") ? null :  // Component may be required, but is not yet defined for non-Dweb
        <li id="nav-search" className="dropdown dropdown-ia pull-right" key="search">
          <a onClick={this.onClick}>
            <span className="iconochive-search" aria-hidden="true"/>
            <span className="sr-only">search</span>
          </a>
          <div className="searchbar">
            <form
              className="search-form js-search-form" role="search"
              onSubmit={this.onSubmit}
              data-event-form-tracking="TopNav|SearchForm"
              data-wayback-machine-search-url="https://web.archive.org/web/*/"
            >
              <label htmlFor="search-bar-2" className="sr-only">Search the Archive</label>
              <input
                id="search-bar-2" className="js-search-bar" placeholder="Search" type="text"
                onChange={this.onChange}
                name="search" defaultValue=""
                aria-controls="navbar_search_options"
                aria-label="Search the Archive. Filters and Advanced Search available below."
              />
              <input type="submit" value="Search"/>
            </form>
          </div>
        </li>
    );
  }
}
class NavUploadLI extends IAReactComponent {
  //Props: none

  render() {
    return (
      <li className="dropdown dropdown-ia pull-right" key="upload">
            <a
                href="https://archive.org/create" target="top" data-toggle="tooltip"
                data-placement="bottom" title="Upload"
              >
                <span className="iconochive-upload" aria-hidden="true" />
                <span className="sr-only">upload</span>
              </a>
          </li>
    );
  }
}
class NavBrandLI extends IAReactComponent {
  //Props: none
  //TODO change this to a AnchorDetails that goes to "home"

  clickCallable(unusedEvent) {
    // noinspection JSUnresolvedFunction
    Nav.nav_home({wanthistory: true});
    return false;
  }

  render() {
    return (
      <li className="navbar-brand-li" key="brand">
            <a className="navbar-brand" onClick={this.onClick} target="_top">
                <span className="iconochive-logo" aria-hidden="true" />
                <span className="sr-only">logo</span>
              </a>
          </li>
    );
  }
}

class NavMediatypeLI extends IAReactComponent {
  // props: mediatype
  // Renders the icon for the mediatype
  // On click navigates to that mediatype collection

  render() {
    return (
      <li key={`mt${this.props.mediatype}`} className="dropdown dropdown-ia pull-left">
            <AnchorDetails
                title={this.props.mediatype} className={`navia-link ${this.props.mediatype}`} identifier={this.props.mediatype}
              >{/* --disabled till top hat worked on dweb-archive issue#70 -- data-top-kind={mt} data-toggle="tooltip" target="_top" data-placement="bottom"--*/}
                <span className={`iconochive-${ this.props.mediatype}`} aria-hidden="true" />
                <span className="sr-only">{this.props.mediatype}</span>
              </AnchorDetails>
          </li>
    );
  }
}

class NavWebDIV extends IAReactComponent {
  // Props: None
  // Renders the Wayback search icon with a nested search engine
  // On click - unclear - this is copied from archive.org site

  loadCallable(el) {
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
            <div className="row toprow web" style={{maxWidth:1000, margin: "auto"}}>
            <div className="col-xs-12">
                <div className="wayback-txt">
                        Search the history of over 338 billion
                        <a style={{display:"inline"}}
                           href="https://blog.archive.org/2016/10/23/defining-web-pages-web-sites-and-web-captures/">web
                            pages</a> on the Internet.
                  </div>
                <div className="roundbox7 wayback-main">
                    <div className="row">
                        <div className="col-sm-6" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <a style={{paddingBottom:0}} href="https://archive.org/web/"><img
                                    src="/images/WaybackLogoSmall.png" alt="Wayback Machine"/></a>
                          </div>
                        <div className="col-sm-6" style={{ paddingTop: 13 }}>
                                <form style={{position:"relative"}}>
                                    <span className="iconochive-search" aria-hidden="true" ref={this.load}></span><span
                                    className="sr-only">search</span> <label htmlFor="nav-wb-url" className="sr-only">Search
                                    the Wayback
                                    Machine</label>
                                    <input id="nav-wb-url" className="form-control input-sm roundbox20"
                                    type="text"
                                    placeholder="enter URL or keywords" name="url" autoComplete="off"
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
  // <DwebNavButtons
  //  identifier string   For current page
  // />
  // Renders a <UL> with a row of buttons Reload | Settings | Local
  // OnClick Reload reloads the current page via an AnchorDetails
  //  Settings an Local navigate to those special pages
  /* -- Not used yet
    static propTypes = {
      identifier: props.string};
  */

  render() {
    // TODO add date downloaded here - maybe just on hover
    // SEE-OTHER-ADD-SPECIAL-PAGE in dweb-archive dweb-archivecontroller dweb-mirror
    // TODO find suitable Iconochive's for Settings & Local
    return (
      <ul className="dwebnavbuttons">
            <li className="reload"><AnchorDetails identifier={this.props.identifier} reload>Reload</AnchorDetails></li>
            <li className="settings"><AnchorDetails identifier="settings">Settings</AnchorDetails></li>
            <li className="local"><AnchorDetails identifier="local">Local</AnchorDetails></li>
          </ul>
    );
  }

  clickCallable() {
    debug('%s: Reload clicked'); // this.props.identifier if ste it
  }
}

class DwebNavDIV extends IAReactComponent {
  /*
   * <DwebNavDIV
   *    item= {             // ArchiveItem
   *      itemid: identifier,
   *      downloaded: { ... }, passed to CrawlConfig
   *      crawl: object (optional) passed as props to CrawlConfig
   *    }
   * />
   * Renders: A navigation row with the DwebStatusDIV (transport status buttons), CrawlConfig and DwebNavButtons
   * OnClick: See those subcomponents
   *
   *    Note the props could be passed as fields, but but whole component is null unless on dweb.
   */

  render() {
    // Alternative to complex nav-dweb code
    const crawl = Object.assign({ identifier: this.props.item.itemid, downloaded: this.props.item.downloaded }, this.props.item.crawl);
        return ((typeof DwebArchive === "undefined") ? null :
                <div id="nav-dweb"><span
                    className="dweb-nav-left">DWeb</span>:
                  <DwebStatusDIV />
                    {!DwebArchive.mirror ? null :
                        <>
                          <div id="dweb-mirrorconfig"><CrawlConfig {...crawl} /></div>
                          <div id="dweb-mirrorreload"><DwebNavButtons identifier={this.props.item.itemid} /></div>
                        </>
                    }
                  {/* --<a href="https://docs.google.com/forms/d/e/1FAIpQLSe7pXiSLrmeLoKvlDi2wODcL3ro7D6LegPksb86jr5bCJa7Ig/viewform" target="_blank"><img src="./images/feedback.svg"/></a>--*/}
                </div>
    );
  }
}

const TRANSPORT_STATUS_FAILED = 1; // From dweb-transport/Transport.js

class DwebStatusLI extends IAReactComponent {
  /*
   * <DwebStatusLI
   *    name =  string    Name of transport e.g. HTTP
   *    status = integer  Status of transport 0 is ok, anything else is not connected (yet)
   * />
   * Renders: a button
   * Onclick: Toggles paused on the transport with that name
   *
   */
  constructor(props) {
    super(props); // name, status
    this.setState({ status: props.status }); // Copy to state as will (soon) be changed by Transports
  }

  clickCallable(unusedEv) {
    debug('Toggling transport for %s', this.props.name);
    // noinspection JSUnresolvedFunction

    DwebTransports.togglePaused(this.props.name, (err, s) => {
      // TODO display err.message if hover
      this.setState({ error: err, status: err ? TRANSPORT_STATUS_FAILED : s });
    });
  }

  render() {
    return <li className={`transportstatus${this.state.status}`} onClick={this.onClick} key={`status${this.props.name}`}>{this.props.name}</li>;
  }
}

class DwebStatusDIV extends IAReactComponent {
  /* <DwebStatusDIV/>
   * On construction: requests status from DwebTransports TODO move behavior to higher level (maybe)
   * Renders a group of DwebStatusLI which are indicators of Dweb Transport connections
   *    Does nothing if DwebTransports not defined
   * OnClick see DwebStatusLI
   *
   * TODO unlike the previous version this wont change if something else toggles the state of transport
   * TODO should probably have the functionality at higher level, but since its Dweb only, and it makes much more sense
   *      to have functionality here, then leaving for now
   */

  constructor(props) {
    super(props); // none
    if (typeof DwebTransports !== 'undefined') {
      // TODO-DWEBNAV need to tell Transports to set this status when changes
            // noinspection JSUnresolvedFunction
      DwebTransports.p_statuses((err, statuses) =>  // e.g. [ { name: HTTP: status: 0 }* ]
                this.setState({statuses}));
    }
  }

  render() {
    // Alternative to complex nav-dweb code
        return ((typeof DwebTransports === "undefined") ? null :
                <div id="dweb-status">
                    {typeof this.state.statuses === "undefined" ? "Loading" :
<ul>
                            {this.state.statuses.map(s =>
                                <DwebStatusLI {...s} key={s.name}/>
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
   *    item = ArchiveItem  passed to DwebNavDIV (optional if not on Dweb)
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
            <NavWebDIV />
              {/* TODO-DETAILS-INFOREQD Need to figure out how to auto-generator the other rows of nav-tophat for each media type */}
          </div>

          <div id="nav-dweb-parent" className="navbar navbar-inverse navbar-static-top" role="navigation">
            <div id="nav-tophat-helper" className="hidden-xs" />
            <ul className="nav navbar-nav navbar-main">
              {['web', 'texts', 'movies', 'audio', 'software', 'image'].map(mediatype => (
                <NavMediatypeLI mediatype={mediatype} key={mediatype} />
              ))}
              <NavBrandLI />
              <NavSearchLI />
              <NavUploadLI />
            </ul>
            <NavAboutsUL />
            <DwebNavDIV item={this.props.item} />
          </div>
        </div>
      </div>
    );
  }
}
export { NavWrap };
