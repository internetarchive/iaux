/* eslint-disable max-len, react/prop-types, prefer-destructuring, react/destructuring-assignment, no-nested-ternary */
/* eslint-disable prefer-template, react/jsx-first-prop-new-line, react/jsx-max-props-per-line, class-methods-use-this */
/* eslint-disable operator-linebreak, react/jsx-wrap-multilines, react/jsx-closing-bracket-location, react/jsx-indent */
/* Reasoning behind eslint disables
  react/prop-type: Haven't implemented prop-types on this code at all yet,
  prefer-destructuring & react/destructuring-assignment: its an absurd requirement that leads to crappy code
  no-nested-ternary: ternarys are used where it makes for the clearest code
  prefer-template: concatenating strings is more efficient, and makes for more readable code.
  jsx-first-prop-new-line, jsx-max-props-per-line: doesnt make code any more readable
  operator-linebreak: breaks the jsx '? null :' pattern, which if reorganized break other eslint rules
  react/jsx-closing-bracket-location, react/jsx-indent, react/jsx-wrap-multilines: make code less readable
  class-methods-use-this: a method on an object shouldnt change from class to non-class based on structure of internal implementation.
  max-len removed for obvious reasons that breaking this line to put one or two words on a new line is counter-productive
*/
import React from 'react';
import AnchorDetails from '../AnchorDetails';
import { ImageDweb } from '../details/Image';
import { I18nSpan, I18nIcon } from '../languages/Languages';

const debug = require('debug')('ia-components:TileComponent');
// import PropTypes from 'prop-types'


/* USE OUTSIDE DWEB
For use outside Dweb its going to need the "collection0title" which is the title of the 0th collection in the collections the item is part of, its
popped up when the user mouses over the top left corner.
This is (reasonably) not provided by the search. I'm guessing in the Php that there is a cache mapping collection > collection.title.
In Dweb it is added to the metadata by the gateway
Once other use's figure out how to handle this the interface might need tweaking, for example to pass in an optional prop "collection0title"
*/

function numberFormat(nnStr) { // this is just addCommas now
  // http://www.mredkj.com/javascript/numberFormat.html
  let nStr = nnStr; // eslint hates parameter reassignment
  nStr += '';
  const x = nStr.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) x1 = x1.replace(rgx, '$1,$2');
  return x1 + x2;
}


/**
 * <TileComponent
 *    identifier: IDENTIFIER
 *    member: ARCHIVEMEMBER
 *    parentidentifier: IDENTIFIER
 * />
 *
 */
export default class TileComponent extends React.Component {
  constructor(props) {
    super(props);
    // TODO-STATE this might have the issue of constructor not being re-run and needing componentDidMount catch, but it should be used with a unique key
    const identifier = props.identifier || props.member.identifier;
    try {
      const member = this.props.member;
      const item = this.props.item;
      const query = props.query || (item && item.query) || (member && member.query);
      const isCollection = (member.mediatype === 'collection');
      const collection0 = member.collection0() || (item && item.metadata && item.metadata.collection && item.metadata.collection[0]);
      const by = member.creator || member.creatorSorter || (item && item.metadata.creator); // Should be array
      const collection = member.collection || (item && item.metadata && item.metadata.collection) || []; // Should be array (note fav-xxx dont have collection)
      const nFavorites = collection.filter(e => e.startsWith('fav-')).length; // Jira added since cant get this any more
      const collectionSize = member.item_count; // TODO really hard to get https://github.com/internetarchive/dweb-archive/issues/91
      const classes = ['item-ia'];
      if (isCollection) classes.push('collection-ia');
      if (member.crawl) classes.push(`crawl-${member.crawl.level}`); // Whether crawled or not and at what level
      const useDate = (member.publicdate || member.updateddate || (item && item.metadata.publicdate));
      const date = useDate && useDate.substr(0, 10);
      // Intentionally rooted URL so dweb, mirror and other should all handle it see dweb-archive/ReactSupport for docs
      const imageurl = identifier ? ('/services/img/' + identifier) : query ? '/images/search-saved.png' : '/images/notfound.png';
      this.state = {
        identifier,
        isCollection,
        collection0,
        by,
        nFavorites,
        collectionSize,
        date,
        imageurl,
        mediatype: member.mediatype,
        collection0title: member.collection0title || (item && item.collection_titles[collection0]), // TODO-IAUX collection_titles is dweb only, unsure how server side IAUX gets it
        classes,
        byTitle: Array.isArray(by) ? by.join(',') : by,
        downloads: member.downloads, // Often undefined
        title: member.title || (item && item.metadata.title),
        iconnameClass: this.iconnameClass(member.mediatype),
        numReviews: member.num_reviews || (item && item.reviews && item.reviews.length) || 0,
        crawl: member.crawl || {},
        downloaded: member.downloaded,
        parentimageurl: '/services/img/' + collection0
      };
    } catch (err) { // Catch error here as not generating debugging info at caller level for some reason
      debug('ERROR in TileComponent.constructor for %s: %s', identifier, err.message);
    }
  }

  iconnameClass(mediatype) {
    // Get the class for the icon, has to handle some exceptions - there used to be many more obsolete mediatypes
    // without iconochive's but these appear to have been cleaned up
    const exceptions = { account: 'person', video: 'movies' };
    return `iconochive-${exceptions[mediatype] || mediatype}`;
  }

  renderDivStatbar() { // <div class=statbar>
    return (
      <div className="statbar ">
        <div className="mt-icon C C5">
          <I18nIcon className={this.state.iconnameClass} en={this.state.mediatype} />
        </div>
        <h6 className="stat ">
          <I18nIcon className="iconochive-eye" en="eye" />
          <nobr>{numberFormat(this.state.downloads)}</nobr>
        </h6>

        { typeof this.state.nFavorites === 'undefined' ? undefined
          : (
            <h6 className="stat">
              <I18nIcon className="iconochive-favorite" en="favorite" />
              {' '}
              {numberFormat(this.state.nFavorites)}
              {' '}

            </h6>
          )
        }
        <h6 className="stat">
          <I18nIcon className="iconochive-comment" en="comment" />
          {' '}
          {numberFormat(this.state.numReviews)}
        </h6>
      </div>
    );
  }

  renderDivCollectionStats() {
    return (
      <div className="collection-stats">
        <div className="iconochive-collection topinblock hidden-lists" aria-hidden="true" />
        <I18nSpan className="sr-only" en="collection" />
        {typeof this.state.collectionSize === 'undefined' ? null
          : (
            <div className="num-items topinblock">
              {numberFormat(this.state.collectionSize)}
              <div className="micro-label"><I18nSpan en="ITEMS" /></div>
            </div>
          )
        }
        <div className="num-items hidden-tiles">
          {numberFormat(this.state.downloads)}
          <div className="micro-label"><I18nSpan en="VIEWS" /></div>
        </div>
      </div>
    );
  }

  render() {
    // Until DM issue#211 have to fake disconnected for item="local" as dont have downloaded
    return ((this.props.disconnected && !(this.state.downloaded && this.state.downloaded.details)) ? null :
      <div className={this.state.classes.join(' ')} data-id={this.state.identifier}
        data-mediatype={this.state.mediatype} key={this.state.identifier}>
        {/* -- Add in experimental crawl notification for dweb-mirror, if member.crawl=undefined then ignored --*/}
        {(!(this.state.crawl.level || (this.state.downloaded && this.state.downloaded.details))) ? null // Only show this bug if crawling
          : (
            <div className="item-crawl">
              <div className="item-crawl-img">
                {this.state.crawl.level === 'details'
                  ? <img
                    src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20" height="20"><circle cx="10" cy="10" r="9" fill="green" /></svg>'
                    alt={`crawl ${this.state.crawl.level}`} />
                  : this.state.crawl.level === 'all'
                    ? <img
                      src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20" height="20"><circle cx="10" cy="10" r="9" fill="blue" /></svg>'
                      alt={`crawl ${this.state.crawl.level}`} />
                    : (this.state.downloaded && this.state.downloaded.details)
                      ? <img
                        src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20" height="20"><circle cx="10" cy="10" r="9" fill="white" /></svg>'
                        alt={`crawl ${this.state.crawl.level}`} />
                      : null
                }
              </div>
            </div>
          )
        }
        {(this.state.collection0) // Believe, but not certain, that there is always going to be a collection0
          ? (
            <AnchorDetails className="stealth" tabIndex="-1" identifier={this.state.collection0}>
              <div className="item-parent">
                {/* archive.org uses a background image on the div but that makes it hard to intercept */}
                <div className="item-parent-img">
                  <ImageDweb className="item-parent-img" src={this.state.parentimageurl} alt={this.state.collection0}
                    imgname="__ia_thumb.jpg" />
                </div>
                <div className="item-parent-ttl">{this.state.collection0title}</div>
              </div>
              {/* .item-parent */}
            </AnchorDetails>
          )
          : undefined}
        <div className="hidden-tiles views C C1">
          <nobr className="hidden-xs">{numberFormat(this.state.downloads)}</nobr>
          <nobr className="hidden-sm hidden-md hidden-lg">{numberFormat(this.state.downloads)}</nobr>
        </div>


        <div className="C234">
          <div className="item-ttl C C2">
            <AnchorDetails identifier={this.state.identifier} title={this.state.title}>
              <div className="tile-img">
                <ImageDweb
                  className="item-img"
                  style={{ height: '124px' }}
                  src={this.state.imageurl}
                  alt={this.state.identifier}
                  imgname="__ia_thumb.jpg"
                />
              </div>
              <div className="ttl">
                {this.state.title}
              </div>
            </AnchorDetails>
          </div>

          <div className="hidden-tiles pubdate C C3">
            <nobr className="hidden-xs">{this.state.date}</nobr>
            <nobr className="hidden-sm hidden-md hidden-lg">{this.state.date}</nobr>
          </div>

          {this.state.by && this.state.by.length
            ? (
              <div className="by C C4">
                <span className="hidden-lists">by </span>
                <span className="byv" title={this.state.byTitle}>{this.state.byTitle}</span>
              </div>
            )
            : undefined}
        </div>
        {/* .C234 */}
        {this.state.isCollection ? this.renderDivCollectionStats() : this.renderDivStatbar()}
      </div>
    );
  }
}
// Regular code review Mitra 2019-01-11
