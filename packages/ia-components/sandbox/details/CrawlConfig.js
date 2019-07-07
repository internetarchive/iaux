// DwebTransports is not needed, its a global
import React from 'react';
import prettierBytes from 'prettier-bytes';
import IAReactComponent from '../IAReactComponent';
import { gatewayServer } from '../../util';

const debug = require('debug')('dweb-archive:CrawlConfig');
// DwebTransports is not needed, its a global

/**
 * Component used in a tile bar on dweb-mirror to display and control Crawl functionality.
 * It renders a button which indicates whether the viewed item is being crawled, and info about that crawl,
 * and allows changing the crawl status.
 *
 * Note this component is under development (May 2019) and will likely change to be more functional, which is why there is
 * commented out code there.
 *
 * Behavior:
 * On construction: it sets an instance variable on the class so other parts of the UI can send info to it.
 *
 * On Clicking:
 *   It cycles the "level" through none / "details" / "all"
 *   It re-renders, showing new level
 *   It sends the new level to the server.
 *
 * <CrawlConfig
 *  identifier              of item
 *  level       string      Current crawling level of object
 *  search      {}          Current search parameters for crawl
 *  downloaded {
 *    details:  boolean - true if downloaded at least all files for minimum UI
 *    files_all_count: int  How many files in total (inc downloaded and otherwise, but not JSON)
 *    files_all_size: int   Total size if all downloaded (this won't be perfectly accurate as doent include metadata etc)
 *    files_count: int      How many files downloaded
 *    files_size:           Size in bytes downloaded for this item
 *    members_all_count:    Number of files in a collection or search
 *    members_details_count:  How many members downloaded to minimum UI level
 *    members_size          Size in bytes downloaded (adding members together)
 *   }
 *  />
 *
 */


export default class CrawlConfig extends IAReactComponent {
  constructor(props) {
    super(props); // { identifier, level, search, downloaded, query }
    this.setState({
      level: props.level,
      clickable: this.props.identifier && !CrawlConfig.unclickable.includes(this.props.identifier)
    })
    CrawlConfig.instance = this; // Allow finding it
  }

  render() {
    // TODO-CONFIG make it editable
    // noinspection JSUnresolvedVariable
    if ((typeof DwebArchive === 'undefined') || (DwebArchive.mirror === null) || (CrawlConfig.undisplayable.includes(this.props.identifier))) {
      return null;
    }
    const className = `crawl${this.state.level ? this.state.level : this.props.downloaded ? 'downloaded' : 'none'}`;
    const isDownloaded = this.props.downloaded && this.props.downloaded.details;
    const dl = this.props.downloaded; // Speed up access below
    return (
      (!this.props.identifier && !this.props.query) ? null :
        <ul>
          <li className={className} data-id={this.props.identifier} key={this.props.identifier} onClick={this.state.clickable ? this.onClick : undefined}>
            <span>{this.state.level ? `Crawling ${this.state.level}` : isDownloaded ? 'Downloaded' : 'Not Downloaded'} </span>
            {!dl ? null
              : dl.members_all_count
                ? <span>{`${prettierBytes(dl.members_size)} in ${dl.members_details_count} of ${dl.members_all_count} items`}</span>
                : dl.pages_size
                  ? <span>{prettierBytes(dl.files_size + dl.pages_size)} </span>
                  : <span>{prettierBytes(dl.files_size) + " / " + prettierBytes(dl.files_all_size)} </span>
            }
            { (this.props.search && CrawlConfig._levels.indexOf(this.props.level) >= CrawlConfig._levels.indexOf('details'))
              ? <span>{`  Searching ${this.props.search.rows} rows at ${this.props.search.level}`}</span>
              : null }
          </li>
        </ul>
    );
  }

  clickCallable() {
    // Cycle through possible states on click
    debug('%s: Crawl clicked', this.props.identifier);

    if (!this.state.clickable) {
      debug('Clicking but %s', this.props.identifier ? ("invalid identifier "+this.props.identifier) : "but not an identifier");
    } else {
      // Do the UI part first, so responsive
      // Bump the level to next one
      // TODO Note its handling of search is not quite correct, if it cycles to all, and is non-default search then server will lose the search value,
      // TODO and cycling back to details will think its still there.
      // TODO since planning on allowing editing of search, should handle then.
      const level = this.state.level === 'details'
        ? 'all'
        : this.state.level === 'all'
          ? undefined
          : 'details';
      this.setState({ level });

      // Tell server the desired new state.
      const urlSetConfig = [gatewayServer(), 'admin/setconfig', this.props.identifier, level || 'none'].join('/');
      // noinspection JSUnresolvedFunction,JSUnresolvedVariable
      DwebTransports.httptools.p_GET(urlSetConfig, {}, (err, unusedInfo) => {
        // Gets back info, but not currently using
        if (err) {
          debug('Failed to set config level for %s to %s', this.props.identifier, this.state.level);
        }
      });
    }
  }
}
CrawlConfig.undisplayable = ['settings'];
CrawlConfig.unclickable = ['local'];
CrawlConfig._levels = ['tile', 'metadata', 'details', 'all']; //  *** NOTE THIS LINE IS IN dweb-mirror.CrawlManager && dweb-archive/components/CrawlConfig.js
