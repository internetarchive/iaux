// const debug = require('debug')('dweb-archive:SearchSwitcher');
import React from 'react';
import IAReactComponent from '../IAReactComponent';
import { AnchorSearch } from './AnchorSearch';

class SearchSwitcher extends IAReactComponent {
/**
 * <SearchSwitcher
 *    identifier: identifier of collection, undefined for searches
 *    query:  Existing query, as a data structure or string
 * />
 *
 * Renders a div with a set of AnchorSearch to switch to different sorts
 */

  render() {
    return (
      <div className="topinblock">
        <div className="hidden-xs hidden-sm">
          <div className="sort-by">
            SORT BY
          </div>
          {/*--TODO-DETAILS this dropdown doesnt reorder, test other UI elements in vicinity as well see https://github.com/internetarchive/dweb-archive/issues/15--*/}
          <span className="big-label blue-pop">{/*TODO-ISSUE dweb-archive#57 remove relevance on Collections*/}
            {(!this.props.identifier) ? // Dont show on collections
              <AnchorSearch className="ikind stealth in" data-id="relevance" query={this.props.query}>RELEVANCE</AnchorSearch>
              : undefined}
            {(!this.props.identifier) ? // Dont show on collections
              <div className="iconochive-dot ikind-sep"></div>
              : undefined}
            <AnchorSearch className="ikind stealth" data-id="views" query={this.props.query} sort="-downloads">VIEWS</AnchorSearch>
            <div className="iconochive-dot ikind-sep"></div>
            <AnchorSearch className="ikind stealth" data-id="title" query={this.props.query} sort="titleSorter">TITLE</AnchorSearch>
            <div className="iconochive-dot ikind-sep"></div>
            <AnchorSearch className="ikind stealth" id="date_switcher" data-id="date-archived" query={this.props.query} sort="-publicdate">DATE ARCHIVED</AnchorSearch>
            <div className="iconochive-dot ikind-sep hidden"></div>
            <AnchorSearch className="ikind stealth hidden" data-id="date-published" query={this.props.query} sort="-date">DATE PUBLISHED</AnchorSearch>
            <div className="iconochive-dot ikind-sep hidden"></div>
            <AnchorSearch className="ikind stealth hidden" data-id="date-reviewed" query={this.props.query} sort="-reviewdate">DATE REVIEWED</AnchorSearch>
            <div className="iconochive-dot ikind-sep"></div>
            <AnchorSearch className="ikind stealth" data-id="creator" query={this.props.query} sort="creatorSorter">CREATOR</AnchorSearch>
          </span>
        </div>
      </div>
    );
  }
}
export {SearchSwitcher}