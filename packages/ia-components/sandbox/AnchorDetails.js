import React from 'react';
import IAReactComponent from './IAReactComponent';
const debug = require('debug')('ia-components:AnchorDetails');
import {ObjectFilter} from '../util.js';

export default class AnchorDetails extends IAReactComponent {
    // Component that encapsulates the difference between four options: Dweb||IAUX, React||FakeReact for links.
    // NOTE the one impossible combination is using React:AnchorDetails inside FakeReact element as will be passed wrong kind of children

    /*
    React+!Dweb: no onClick unless want analytics
    FakeReact+!Dweb: No onClick unless want analytics
    React+Dweb:  onClick={this.click}
    FakeReact+Dweb: strangely seems to work with onClick={this.click}
    */
    constructor(props)
    {
        super(props);
    }
    clickCallable(ev) {
        // Note this is only called in dweb; !Dweb has a director href
        debug("Clicking on link to details: %s",this.props.identifier);
        DwebArchive.Nav.nav_details(this.props.identifier);
        return false; // Dont propogate event
    }
    render() {
        // this.props passes identifier which is required for Dweb, but typically also passes tabIndex, class, title
        const url = new URL(`https://archive.org/details/${this.props.identifier}`);
        const usp = new URLSearchParams;
        AnchorDetails.urlparms.forEach(k=> usp.append(k, this.props[k]))
        usp.search = usp; // Note this copies, not updatable
        const anchorProps = ObjectFilter(this.props, (k,v)=>(!AnchorDetails.urlparms.includes(k) && !['chidren'].includes(k)));
        return ( // Note there is intentionally no spacing in case JSX adds a unwanted line break
            (typeof DwebArchive === "undefined") ?
                <a href={url.href} {...anchorProps}>{this.props.children}</a>
                :
                // This is the Dweb version for React|!React
                <a href={url.href} onClick={this.onClick}  {...anchorProps}>{this.props.children}</a>
        );
    }
}
AnchorDetails.urlparms=['sort']; // Properties that go in the URL to details
//Note other propTypes are passed to underlying Anchor - ones known in use are: tabIndex, id, className, data-event-click-tracking, title
