import React from 'react';
import { stringify } from '@stratumn/canonicaljson';
import IAReactComponent from '../IAReactComponent';
import { ObjectFilter, ObjectFromEntries } from '../../util';

const debug = require('debug')('ia-components:AnchorSearch');

/**
 * Component used as an anchor to a Search page
 *
 * Behavior:
 * On render we split props between the Anchor and the URL and build the URL.
 *
 * On click - behavior varies between Dweb and IAUX
 *      Dweb:   Navigate via the Nav.navSearch function
 *      !Dweb:  normal Anchor behavior to go to the href
 *
 * Technical:
 *  AnchorDetails, AnchorSearch and to a lesser extend AnchorDownload are almost the same, changes on one probably need to be propagated to the others
 *
 * <AnchorSearch
 *  query       Object { field: value}   OR string (value can be Array, in which case it is OR-ed
 *  reload      if set, passed to Nav.navSearch as an opt TODO implement this
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
  if (typeof query === "object") {
    return Object.entries(query).map(kv => _onefield(kv[0], kv[1])).join(' AND '); // k1:v1 AND k2:v2
  } else {
    return query;
  }
}
// End of DUPLICATEDCODE#0003

class AnchorSearch extends IAReactComponent {
  /**
   * Render an Anchor that navigates to a search
   *
   * <AnchorSearch
   *  query   string in form can pass to URL or object like {collection: foo, title: bar} or string like 'collection:"foo" AND title:"bar"'
   *  field,value pair to turn into a query field=value
   *  sort
   *  reload  Force a reload of query if supported (Dweb only)
   *
   *  Behavior:
   *    on Dweb - click handler fires and calls navSearch
   *    not on Dweb:  URL embedded in anchor, onClick can be passed if want analytics
   */

  constructor(props) {
    super(props); // { query || field & value, sort, reload }
    //TODO-STATE this might have the issue of constructor not being re-run and needing componentDidMount catch
    this.setState({
      query: this.props.query || ObjectFromEntries([[this.props.field, this.props.value]]),
      urlProps: ObjectFilter(this.props, (k, unusedV) => AnchorSearch.urlparms.includes(k)),  //sort, reload, query
      anchorProps: ObjectFilter(this.props, (k, unusedV) => (!AnchorSearch.urlparms.includes(k) && !['children'].includes(k)))
    });
  }

  clickCallable(unusedEvent) {
    // Note this is only called in dweb; !Dweb has a director href
    debug('Clicking on link to search: %s', this.state.query);
    DwebArchive.Nav.navSearch(
      this.state.query,
      { noCache: this.props.reload, wanthistory: !this.props.reload, sort: this.props.sort });
    return false; // Dont propagate event
  }

  render() {
    const url = new URL('https://archive.org/search.php');
    const usp = new URLSearchParams();
    Object.entries(this.state.urlProps)
      .forEach(kv => {
        if (!["query", "sort"].includes(kv[0]))  // Filter out query and sort handled seperately
          usp.append(kv[0], kv[1])});
    if (this.state.query) {
      usp.append('query', queryFrom(this.state.query));
    }
    if (this.props.sort) {
      if (Array.isArray(this.props.sort)) {
        this.props.sort.forEach(s => usp.append('sort', s));
      } else {
        usp.append('sort', this.props.sort);
      }
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
