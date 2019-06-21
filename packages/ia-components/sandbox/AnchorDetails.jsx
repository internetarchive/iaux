import React from 'react';
import IAReactComponent from './IAReactComponent';
import { ObjectFilter } from '../util.js';

const debug = require('debug')('ia-components:AnchorDetails');

/**
 * Component used as an anchor to a Details page
 * Encapsulates differences between four options  Dweb||IAUX
 * There is an AnchorDetailsFake in dweb-archive for places where this has to be embeded in ReactFake
 *
 * Behavior:
 * On render we split props between the Anchor and the URL and build the URL.
 *
 * On click - behavior varies between Dweb and IAUX
 *      Dweb:   Navigate via the Nav.nav_details function
 *      !Dweb:  normal Anchor behavior to go to the href
 **
 * <AnchorDetails
 *  identifier  of item
 *  reload      if set, passed to Nav.nav_details as an opt
 *  sort        passed to URL as a parameter
 *  Any other properties are passed to the <a />
 *
 */

/**
 * Component used as an anchor to a Details page
 * Encapsulates differences between four options  Dweb||IAUX
 * There is an AnchorDetailsFake in dweb-archive for places where this has to be embeded in ReactFake
 *
 * Behavior:
 * On render we split props between the Anchor and the URL and build the URL.
 *
 * On click - behavior varies between Dweb and IAUX
 *      Dweb:   Navigate via the Nav.nav_details function
 *      !Dweb:  normal Anchor behavior to go to the href
 **
 * <AnchorDetails
 *  identifier  of item
 *  reload      if set, passed to Nav.nav_details as an opt
 *  sort        passed to URL as a parameter
 *  Any other properties are passed to the <a />
 *
 */

export default class AnchorDetails extends IAReactComponent {
  // Component that encapsulates the difference between four options: Dweb||IAUX, React||FakeReact for links.
  // NOTE the one impossible combination is using React:AnchorDetails inside FakeReact element as will be passed wrong kind of children

  /*
    React+!Dweb: no onClick unless want analytics
    FakeReact+!Dweb: No onClick unless want analytics
    React+Dweb:  onClick={this.click}
    FakeReact+Dweb: strangely seems to work with onClick={this.click}
    */
  constructor(props) {
    super(props); // { identifier, reload }
    this.setState({
      urlProps: ObjectFilter(this.props, (k, v) => AnchorDetails.urlparms.includes(k)),
      anchorProps: ObjectFilter(this.props, (k, v) => (!AnchorDetails.urlparms.includes(k) && !['children'].includes(k)))
    });
  }

  clickCallable(ev) {
    // Note this is only called in dweb; !Dweb has a director href
    debug('Clicking on link to details: %s', this.props.identifier);
    DwebArchive.Nav.nav_details(this.props.identifier, { noCache: this.props.reload, wanthistory: !this.props.reload });
    return false; // Dont propogate event
  }

  render() {
    // this.props passes identifier which is required for Dweb, but typically also passes tabIndex, class, title
    const url = new URL(`https://archive.org/details/${this.props.identifier}`);
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
