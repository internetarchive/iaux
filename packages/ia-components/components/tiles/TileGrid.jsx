import React from 'react';
import TileComponent from './TileComponent';
import { I18nSpan, I18nIcon, I18nStr } from "../languages/Languages";

const debug = require('debug')('ia-components:TileGrid');
// import PropTypes from 'prop-types' // Not currently used by IAUX

/* This is the inner part of a tile grid, see dweb-archive/Search.js for an example of its use
    There are two components here.
    <TileGrid members=[ArchiveMember*] disconnected=BOOL>
    <ScrollableTileGrid item=ARCHIVEITEM disconnected=BOOL>
    Both depend on dweb-archivecontroller since TileComponent does, and in particular ScrollableTileGrid calls ArchiveItem.proto.more() to update

    They depend on the CSS copied from archive.org to dweb-archive.org, that could be put inside this component if required.

 */

class TileGrid extends React.Component {
  /**
   * <TileGrid members=[ArchiveMember*] disconnected=BOOL>
   **/
  render() {
    return (
      <div className="results" id="appendTiles">
        <div className="item-ia mobile-header hidden-tiles" data-id="__mobile_header__">
          <div className="views C C1">
            <I18nIcon className="iconochive-eye" en="eye"/>
          </div>
          <div className="C234">
            <div className="C C2">Title</div>
            <div className="pubdate C C3">
              <div>
                <div><I18nSpan en="Date Archived"/></div>
              </div>
            </div>
            <div className="by C C4"><I18nSpan en="Creator"/></div>
          </div>
          <div className="C C5" />
        </div>
        {this.props.members.map((member,i) => ( // Note rendering tiles is quick, its the fetch of the img (async) which is slow.
          <TileComponent key={member.identifier || member.query || i} member={member} disconnected={this.props.disconnected}/>
        ))}
      </div>
    );
  }
}

class ScrollableTileGrid extends React.Component {
  /**
   * <ScrollableTileGrid item=ARCHIVEITEM disconnected=BOOL/>
   */
  constructor(props) {
    super(props); // item
    this.state = {xxx: true}; // Used as a toggle to force rerender
    this.onClick = this.onClick.bind(this)
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // Replaces AJS.scrolled which doesnt have a way to send a click to a react object
  handleScroll(ev) {
    //debug('scrolling caught for %s', this.props.item.itemid);
    //TODO remove dependence below on jquery
    const newtop = $(window).scrollTop();
    const selector = '.more_search:visible';
    const $e = $(selector);
    if (!$e.length) return;

    // make the edge detect for "hit bottom" 40 pixels from the bottom
    const check = (($e.offset().top + $e.outerHeight()) - $(window).height()) - 40;
    if (newtop > check) {
      if (!AJS.more_searching) {
        this.doMore();
      } else {
        debug('patience please');
      }
    }
  }

  doMore() {
    debug('Getting more');
    AJS.more_searching = true;
    const el = document.getElementById('appendTiles'); // Get the el, before the search in case user clicks away we add to right place
    this.props.item.more({}, (err, newmembers) => { // Appends to this.members but returns just the new ones
      this.setState({ xxx: !this.state.xxx }); // Force it to rerender since its state.members didnt change, but the contents of it did.
      AJS.more_searching = false;
    });
  }

  onClick(ev) { // More
    this.more();
    ev.preventDefault();
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div id="ikind-search" className="ikind in">
          <TileGrid members={(this.props.item.membersFav || []).concat(this.props.item.membersSearch || [])} disconnected={this.props.disconnected} />
          <center className="more_search">
            <a className="btn btn-info btn-sm" onClick={this.onClick} style={{ visibility: 'hidden' }} href="#"><I18nSpan en="MORE RESULTS"/></a>
            <br />
            <span className="more-search-fetching">
              <span en="Fetching more results"/>
              <img
                src="/images/loading.gif"
                alt={I18nStr("loading")}
              />
            </span>
          </center>
        </div>
      </div>
    );
    // AJS.tiler(); Don't run AJS.tiler here as it will tile before any loaded and just give one column stopping inner AJS.tiler's from working
  }
}

export { TileGrid, ScrollableTileGrid };
