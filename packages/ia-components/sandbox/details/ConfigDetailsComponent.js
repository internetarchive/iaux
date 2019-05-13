import ReactDOM from "react-dom";

const debug = require('debug')('dweb-archive:ConfigDetailsComponent');
const canonicaljson = require('@stratumn/canonicaljson');
import React from "react";
import IAReactComponent from '../IAReactComponent';
const ACUtil = require('@internetarchive/dweb-archivecontroller/Util'); // For Object.deeperAssign
//DwebTransports is not needed, its a global
//TODO-CONFIG make it be empty if not on mirror

export default class ConfigDetailsComponent extends IAReactComponent {
    /* -- Not used with ReactFake yet
    static propTypes = {
        identifier: PropTypes.string,
        user: PropTypes.object,
        default: PropTypes.object,
        merged: PropTypes.object,
        oldhash: PropTypes.string,
        level: PropTypes.string,
        search: PropTypes.object,
        rows: PropType.integer,
        searchLevel: PropTypes.string,
    };
    */
    constructor(props)
    {
        super(props);   // { identifier, level, search }
        this.setState(props);
        ConfigDetailsComponent.instance = this; // Allow finding it
    }

    loaded() {
        return (typeof this.state.level !== "undefined");
    }
    static findAndSetState(state) {
        this.instance.setState(state);
    }
    /* TODO-DWEBNAV
    static insertInside(elementId, props={}) { //TODO-UXLOCAL probably obsolete
        // Called from nav_details to display the config info
        const parentElement = document.getElementById(elementId); // Note this isnt a Component, cos its in the archive.html
        const el = new this(props).render(); // Will be loading asynchronously
        while (parentElement.lastChild) {
            parentElement.removeChild(parentElement.lastChild);
        }
        //React.addKids(parentElement, el); // Using addKids to force the "ref" to be used //TODO-IAUX probably doesnt have addKids ?
        ReactDOM.render(el, parentElement)
    }
     */
    render() {
        //if (this.isFakeReact || !this.loaded()) {
        //    return <span ref={this.load}>Loading ...</span>
        //} else { // Pure IAUX
        //TODO-CONFIG make it hideable with red/yellow/green spider button or similar
        //TODO-CONFIG make it editable
        //TODO-CONFIG dont show search if its not a collection - but note we dont (currently) know that here.
        /*
        {(!this.state.level) ? null : // Only show this bug if crawling
            this.state.level === "details"
                ? <img src="/images/noun_Ladybug_1869205.svg" alt={"crawl "+this.state.level}/>
                : this.state.level === "all"
                ? <img src="/images/noun_Ladybug_1869205_red.svg" alt={"crawl "+this.state.level} />
                : null
        }
        */
        return (
            <ul>
            <li className={"crawl"+(this.state.level || "none")} data-id={this.props.identifier}  key={this.props.identifier} onClick={this.onClick}>
                {this.state.level ? `Crawling ${this.state.level}` : "Not Crawling"}
                { (this.state.search && ConfigDetailsComponent._levels.indexOf(this.state.level) >= ConfigDetailsComponent._levels.indexOf("details"))
                    ?
                    <span>{`  Search ${this.state.search.rows} rows at ${this.state.search.level}`}</span>
                    : null }
            </li>
            </ul>
        );
    }

    /*
    loadcallable(enclosingEl) {
        // Called by React when the Loading... div is displayed
        const urlConfig = [ACUtil.gatewayServer(), "info"].join('/');
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
        const configmerged = Object.deeperAssign({}, configdefault, configuser); // Cheating, but assumes no arrays needing merging
        // noinspection JSUnresolvedVariable
        // Note there is similar code in dweb-mirror.MirrorConfig.crawlMember
        const task = configmerged.apps.crawl.tasks.find(t => t.identifier.includes(identifier));
        const isDetailsOrMore = task && ConfigDetailsComponent._levels.indexOf(task.level) >= ConfigDetailsComponent._levels.indexOf("details");
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

            // For some reason (probably because added via ReactDOM.render above) it thinks unmounted so setState not re-rendering, so redo here for now (till nav-dweb moved into React)
            const parentElement = document.getElementById('dweb-mirrorconfig'); // Note this isnt a Component, cos its in the archive.html
            const el = this.render(); // Will be loading asynchronously
            ReactDOM.render(el, parentElement)

            const urlSetConfig = [ACUtil.gatewayServer(), "admin/setconfig", this.state.identifier, level || "none"].join('/');
            DwebTransports.httptools.p_GET(urlSetConfig, {}, (err, info) => {
                // Gets back info, but not currently using
                if (err) {
                    debug("Failed to set config level for %s to %s", this.state.identifier, this.state.level)
                }
            });
        }
    }
}
ConfigDetailsComponent._levels = ["tile", "metadata", "details", "all"]; //  *** NOTE THIS LINE IS IN dweb-mirror.CrawlManager && dweb-archive/components/ConfigDetailsComponent.js
