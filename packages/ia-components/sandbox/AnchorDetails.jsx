/* global DwebArchive */
import React from 'react';
import { ObjectFilter } from '../util.js';

const debug = require('debug')('ia-components:AnchorDetails');

/**
 * Component used as an anchor to a Details page
 * Encapsulates differences between options  Dweb||IAUX
 *
 * Behavior:
 * On render we split props between the Anchor and the URL and build the URL.
 *
 * On click - behavior varies between Dweb and IAUX
 *      Dweb:   Navigate via the Nav.nav_details function
 *      !Dweb:  normal Anchor behavior to go to the href
 *
 * Technical:
 *  AnchorDetails, AnchorSearch and to a lesser extend AnchorDownload are almost the same, changes on one probably need to be propogated to the others
 *
 * <AnchorDetails
 *  identifier  of item
 *  reload      if set, passed to Nav.nav_details as an opt
 *  sort        passed to URL as a parameter
 *  Any other properties are passed to the (see list at bottom of ones known to be in use)
 *
 */

export default class AnchorDetails extends React.Component {
  // Component that encapsulates the difference between four options: Dweb||IAUX for links.

  /*
    React+!Dweb: no onClick unless want analytics
    React+Dweb:  onClick={this.click}
    */

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {};
  }
  static getDerivedStateFromProps(props, unusedState) {
    return {
      urlProps: ObjectFilter(props, (k, v) => AnchorDetails.urlparms.includes(k)),
      anchorProps: ObjectFilter(props, (k, v) => (!AnchorDetails.urlparms.includes(k) && !['children'].includes(k)))
    };
  }

  onClick(ev) {
    // Note this is only called in dweb; !Dweb has a director href
    debug('Clicking on link to details: %s', this.props.identifier);
    DwebArchive.Nav.factory(this.props.identifier, { noCache: this.props.reload, wanthistory: !this.props.reload }); // Ignore promise returned
    ev.preventDefault(); // Dont propogate event
  }

  render() {
    // this.props passes identifier which is required for Dweb, but typically also passes tabIndex, class, title
    const url = new URL( (this.props.identifier === "home" && (typeof DwebArchive === "undefined"))
                ? 'https://archive.org'
                : `https://archive.org/details/${this.props.identifier}`);
    const usp = new URLSearchParams();
    Object.entries(this.state.urlProps).forEach(kv => usp.append(kv[0], kv[1]));
    url.search = usp; // Note this copies, not updatable
    return ( // Note there is intentionally no spacing in case JSX adds a unwanted line break
      (typeof DwebArchive === 'undefined')
        ? <a href={url.href} {...this.state.anchorProps}>{this.props.children}</a>
        :
      // This is the Dweb version for React|!React
        <a href={url.href} onClick={this.onClick} {...this.state.anchorProps}>{this.props.children}</a>
    );
  }
}
AnchorDetails.urlparms = ['sort', 'reload']; // Properties that go in the URL to details
// Note other propTypes are passed to underlying Anchor - ones known in use are: tabIndex, id, className, data-event-click-tracking, title
