import React from 'react';
import { stringify } from '@stratumn/canonicaljson';
import IAReactComponent from '../IAReactComponent';
import { ObjectFilter, ObjectFromEntries } from '../../util';

const debug = require('debug')('ia-components:AnchorSearch');

/**
 * Component used as an anchor to a Search page
 * There should be an AnchorSearchFake in dweb-archive for places where this has to be embedded in ReactFake but moving over to React rapidly anyway
 *
 * Behavior:
 * On render we split props between the Anchor and the URL and build the URL.
 *
 * On click - behavior varies between Dweb and IAUX
 *      Dweb:   Navigate via the Nav.nav_details function
 *      !Dweb:  normal Anchor behavior to go to the href
 *
 * Technical:
 *  AnchorDetails, AnchorSearch and to a lesser extend AnchorDownload are almost the same, changes on one probably need to be propagated to the others
 *
 * <AnchorSearch
 *  query       Object { field: value}   OR string (value can be Array, in which case it is OR-ed
 *  reload      if set, passed to Nav.nav_details as an opt TODO implement this
 *  TODO implement maybe: sort        passed to URL as a parameter
 *  Any other properties are passed to the <a />
 *
 *  TODO look for places this could be used
 *
 */

// See other almost DUPLICATEDCODE#003 (iaux and dweb-archive)
function _onefield(key, value) {
  return Array.isArray(value)
    ? value.map(v => _onefield(key, v)).join(' OR ')
    // This next line uses stringify instead of toString() because we want  '"abc"' and '1' i.e. quotes if its a string
    : (`${key}:${stringify(value)}`);
}

function queryFrom(query) {
  return Object.entries(query).map(kv => _onefield(kv[0], kv[1])).join(' AND '); // k1:v1 AND k2:v2
}
// End of DUPLICATEDCODE#0003

class AnchorSearch extends IAReactComponent {
  // NOTE the one impossible combination is using React:AnchorSearch inside FakeReact element as will be passed wrong kind of children

  /*
    !Dweb: no onClick unless want analytics
    Dweb:  onClick={this.click}
    */
  constructor(props) {
    super(props); // { query, field, sort, value, reload }
    this.setState({
      query: this.props.query || ObjectFromEntries([[this.props.field, this.props.value]]),
      urlProps: ObjectFilter(this.props, (k, unusedV) => AnchorSearch.urlparms.includes(k)),
      anchorProps: ObjectFilter(this.props, (k, unusedV) => (!AnchorSearch.urlparms.includes(k) && !['children'].includes(k)))
    });
  }

  clickCallable(unusedEvent) {
    // Note this is only called in dweb; !Dweb has a director href
    debug('Clicking on link to search: %s', this.state.query);
    DwebArchive.Nav.nav_search(
      { query: this.state.query, sort: this.props.sort },
      { noCache: this.props.reload, wanthistory: !this.props.reload });
    return false; // Dont propagate event
  }

  render() {
    const url = new URL('https://archive.org/search.php');
    const usp = new URLSearchParams();
    Object.entries(this.state.urlProps).forEach(kv => usp.append(kv[0], kv[1]));
    usp.append('query', queryFrom(this.state.query));
    if (this.props.sort) {
      usp.append('sort', this.props.sort);
    }
    // noinspection JSValidateTypes
    url.search = usp; // Note this copies, not updatable
    return ( // Note there is intentionally no spacing in case JSX adds a unwanted line break
      (typeof DwebArchive === 'undefined')
        ? <a href={url.href} {...this.state.anchorProps}>{this.props.children}</a> /* !Dweb */
        : <a href={url.href} onClick={this.onClick} {...this.state.anchorProps}>{this.props.children}</a> /* Dweb */
    );
  }
}
AnchorSearch.urlparms = ['sort', 'reload', 'query']; // Properties that go as arguments in the URL to details
// Note other propTypes are passed to underlying Anchor - ones known in use are: className data-id TODO have these on AnchorDetails: tabIndex, id, data-event-click-tracking, title
export { AnchorSearch };
