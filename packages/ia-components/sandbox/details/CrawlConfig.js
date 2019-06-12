import ReactDOM from "react-dom";

const debug = require('debug')('dweb-archive:CrawlConfig');
import canonicaljson from '@stratumn/canonicaljson';
import React from "react";
import IAReactComponent from '../IAReactComponent';
import {gatewayServer} from '../../util.js';
//DwebTransports is not needed, its a global

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
 *   It rerenders, showing new level
 *   It sends the new level to the server.
 *
 * <CrawlConfig
 *  identifier  of item
 *  level       Current crawling level of object
 *  search      Current search parameters for crawl
 *  downloaded  true if item downloaded to details level (displayed as white if not crawling)
 *  />
 *
 */



export default class CrawlConfig extends IAReactComponent {
    /* -- Not used with ReactFake yet
    static propTypes = {
        identifier: PropTypes.string,
        level: PropTypes.string,
        search: PropTypes.object,
        downloaded: ProbTypes.boolean
    };
    */
    constructor(props)
    {
        super(props);   // { identifier, level, search, downloaded }
        this.setState(props);
        CrawlConfig.instance = this; // Allow finding it
    }

    loaded() {
        return (typeof this.state.level !== "undefined");
    }
    static findAndSetState(state) {
        this.instance.setState(state);
    }
    render() {
        //TODO-CONFIG make it editable
        if ((typeof DwebArchive === "undefined") || (DwebArchive.mirror === null))  {
            return null
        } else {
            const className = "crawl" + (this.state.level ?  this.state.level : this.state.downloaded ? "downloaded" : "none");
            return (
              <ul>
                  <li className={className} data-id={this.props.identifier}  key={this.props.identifier} onClick={this.onClick}>
                      {this.state.level ? `Crawling ${this.state.level}` : this.state.downloaded ? "Downloaded" : "Not Crawling"}
                      { (this.state.search && CrawlConfig._levels.indexOf(this.state.level) >= CrawlConfig._levels.indexOf("details"))
                        ?
                        <span>{`  Search ${this.state.search.rows} rows at ${this.state.search.level}`}</span>
                        : null }
                  </li>
              </ul>
            );
        }
    }

    /*
    loadcallable(enclosingEl) {
        // Called by React when the Loading... div is displayed
        const urlConfig = [gatewayServer(), "info"].join('/');
        this.enclosingElement = enclosingEl; // Tell it where to render inside when info found
        DwebTransports.httptools.p_GET(urlConfig, {}, (err, info) => {
            if (err) {
                debug("Config Failed to get info");
            } else {
                this.stateFromInfo(info, (err, res) => this.setState(res));
            }
        });
    }
    stateFromInfo(info, cb) {
        const identifier = this.props.identifier;
        const config = info.config; // Mixed in with other info
        const configdefault = config[0];
        const configuser = config[1] || {};
        const configmerged = ObjectDeeperAssign({}, configdefault, configuser); // Cheating, but assumes no arrays needing merging
        // noinspection JSUnresolvedVariable
        // Note there is similar code in dweb-mirror.MirrorConfig.crawlMember
        const task = configmerged.apps.crawl.tasks.find(t => t.identifier.includes(identifier));
        const isDetailsOrMore = task && CrawlConfig._levels.indexOf(task.level) >= CrawlConfig._levels.indexOf("details");
        // noinspection JSUnresolvedVariable
        const search = task && ( task.search  || (isDetailsOrMore && configmerged.apps.crawl.opts.defaultDetailsSearch));
        // noinspection JSUnusedGlobalSymbols
        cb(null, {
            task, configdefault, configuser, configmerged,
            oldhash: info.hash,
            level: task && task.level,
            rows: search && search.rows,
            searchLevel: search && search.level
        });
    }
    */
    clickCallable() {
        // Cycle through possible states on click
        debug("%s: Crawl clicked", this.state.identifier);

        if (!this.state.identifier) {
            debug("Clicking but not an identifier");
        } else {
            // Do the UI part first, so responsive
            // Bump the level to next one
            // TODO Note its handling of search is not quite correct, if it cycles to all, and is non-default search then server will lose the search value,
            // TODO and cycling back to details will think its still there.
            // TODO since planning on allowing editing of search, should handle then.
            const level = this.state.level === "details" ? "all"
              : this.state.level === "all" ? undefined
                : "details";
            this.setState({level});

            // Tell server the desired new state.
            const urlSetConfig = [gatewayServer(), "admin/setconfig", this.state.identifier, level || "none"].join('/');
            DwebTransports.httptools.p_GET(urlSetConfig, {}, (err, info) => {
                // Gets back info, but not currently using
                if (err) {
                    debug("Failed to set config level for %s to %s", this.state.identifier, this.state.level)
                }
            });
        }
    }
}
CrawlConfig._levels = ["tile", "metadata", "details", "all"]; //  *** NOTE THIS LINE IS IN dweb-mirror.CrawlManager && dweb-archive/components/CrawlConfig.js
