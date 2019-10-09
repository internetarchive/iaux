import React from 'react';
import IAReactComponent from '../IAReactComponent';
import AnchorDetails from '../AnchorDetails';
import {ImageDweb} from "../details/Image";
const debug = require('debug')('ia-components:TileComponent');
// import PropTypes from 'prop-types'
import { I18nSpan, I18nIcon, I18nStr } from "../languages/Languages";


/* USE OUTSIDE DWEB
For use outside Dweb its going to need the "collection0title" which is the title of the 0th collection in the collections the item is part of, its
popped up when the user mouses over the top left corner.
This is (reasonably) not provided by the search. I'm guessing in the Php that there is a cache mapping collection > collection.title.
In Dweb it is added to the metadata by the gateway
Once other use's figure out how to handle this the interface might need tweaking, for example to pass in an optional prop "collection0title"
*/



function number_format(nStr) // this is just addCommas now
{
  // http://www.mredkj.com/javascript/numberFormat.html
  nStr += '';
  const x = nStr.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + ',' + '$2');
  return x1 + x2;
}


export default class TileComponent extends IAReactComponent {
  /**
   * <TileComponent
   *    identifier: IDENTIFIER
   *    member: ARCHIVEMEMBER
   *    parentidentifier: IDENTIFIER
   * />
   *
   */
  constructor(props) {
    super(props);
    //TODO-STATE this might have the issue of constructor not being re-run and needing componentDidMount catch
    this.state.identifier = props.identifier || props.member.identifier;

    try {
      console.assert(this.props.member, 'If using TileComponent.render should have a member with at least mediatype to work with');
      const member = this.props.member;
      const item = this.props.item;
      const isCollection = (member.mediatype === 'collection');
      const collection0 = member.collection0() || (item && item.metadata.collection[0]);
      const by = member.creator || member.creatorSorter || (item && item.metadata.creator); // Should be array
      const collection = member.collection || (item && item.metadata.collection) || []; // Should be array (note fav-xxx dont have collection)
      const nFavorites = collection.filter(e => e.startsWith('fav-')).length; // Jira added since cant get this any more
      const collectionSize = member.item_count; // TODO really hard to get https://github.com/internetarchive/dweb-archive/issues/91
      const classes = ['item-ia'];
      if (isCollection) classes.push('collection-ia');
      if (member.crawl) classes.push(`crawl-${member.crawl.level}`); // Whether crawled or not and at what level
      const useDate = (member.publicdate || member.updateddate || (item && item.metadata.publicdate));
      const date = useDate && useDate.substr(0, 10);
      this.setState({
        isCollection,
        collection0,
        by,
        nFavorites,
        collectionSize,
        date,
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
        imageurl: '/services/img/'+this.state.identifier, //Intentionally rooted URL so dweb, mirror and other should all handle it see dweb-archive/ReactSupport for docs
        parentimageurl: (member && member.collection0thumbnaillinks && (member.collection0thumbnaillinks.length > 0))
          ? member.collection0thumbnaillinks
          : ('/services/img/' + collection0)
      });
    } catch (err) { // Catch error here as not generating debugging info at caller level for some reason
      debug('ERROR in TileComponent.constructor for %s: %s', this.state.identifier, err.message);
    }
  }

  iconnameClass(mediatype) {
    // Get the class for the icon, has to handle some exceptions - there used to be many more obsolete mediatypes without iconochive's but these appear to have been cleaned up
    const exceptions = { account: 'person', video: 'movies' };
    return `iconochive-${exceptions[mediatype] || mediatype}`;
  }

  render() {
    //Until DM issue#211 have to fake disconencted for item="local" as dont have downloaded
    return ( (this.props.disconnected && !(this.state.downloaded && this.state.downloaded.details)) ? null :
      <div className={this.state.classes.join(' ')} data-id={this.state.identifier} key={this.state.identifier}>
        {/* -- Add in experimental crawl notification for dweb-mirror, if member.crawl=undefined then ignored --*/}
        {(!(this.state.crawl.level || (this.state.downloaded && this.state.downloaded.details))) ? null // Only show this bug if crawling
          : (
            <div className="item-crawl">
              <div className="item-crawl-img">
                { this.state.crawl.level === 'details'
                  ? <img src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20" height="20"><circle cx="10" cy="10" r="9" fill="green" /></svg>' alt={`crawl ${this.state.crawl.level}`} />
                  : this.state.crawl.level === 'all'
                    ? <img src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20" height="20"><circle cx="10" cy="10" r="9" fill="blue" /></svg>' alt={`crawl ${this.state.crawl.level}`} />
                    : (this.state.downloaded && this.state.downloaded.details)
                      ? <img src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20" height="20"><circle cx="10" cy="10" r="9" fill="white" /></svg>' alt={`crawl ${this.state.crawl.level}`} />
                      : null
                            }
              </div>
            </div>
          )
                }
        { (this.state.collection0) // Believe, but not certain, that there is always going to be a collection0
          ? (
            <AnchorDetails className="stealth" tabIndex="-1" identifier={this.state.collection0}>
              <div className="item-parent">
                {/*archive.org uses a background image on the div but that makes it hard to intercept*/}
                <div className="item-parent-img">
                  <ImageDweb className="item-parent-img" src={this.state.parentimageurl} alt={this.state.collection0} imgname= '__ia_thumb.jpg'/>
                </div>
                <div className="item-parent-ttl">{this.state.collection0title}</div>
              </div>
              {/* .item-parent */}
            </AnchorDetails>
          )
          : undefined }
        <div className="hidden-tiles views C C1">
          <nobr className="hidden-xs">{number_format(this.state.downloads)}</nobr>
          <nobr className="hidden-sm hidden-md hidden-lg">{number_format(this.state.downloads)}</nobr>
        </div>


        <div className="C234">
          <div className="item-ttl C C2">
            <AnchorDetails identifier={this.state.identifier} title={this.state.title}>
              <div className="tile-img">
                <ImageDweb
                  className="item-img clipW clipH"
                  src={this.state.imageurl}
                  alt={this.state.identifier}
                  imgname="__ia_thumb.jpg"/>
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
                <span title={this.state.byTitle}>{this.state.byTitle}</span>
              </div>
            )
            : undefined }
        </div>
        {/* .C234 */}
        {this.state.isCollection ? this.renderDivCollectionStats() : this.renderDivStatbar() }
      </div>
    );
  }


  renderDivCollectionStats() {
    return (
      <div className="collection-stats">
        <div className="iconochive-collection topinblock hidden-lists" aria-hidden="true" />
        <I18nSpan className="sr-only" en="collection"/>
        {typeof this.state.collectionSize === 'undefined' ? null
          : (
            <div className="num-items topinblock">
              {number_format(this.state.collectionSize)}
              <div className="micro-label"><I18nSpan en="ITEMS"/></div>
            </div>
          )
                }
        <div className="num-items hidden-tiles">
          {number_format(this.state.downloads)}
          <div className="micro-label"><I18nSpan en="VIEWS"/></div>
        </div>
      </div>
    );
  }

  renderDivStatbar() { // <div class=statbar>
    return (
      <div className="statbar ">
        <div className="mt-icon C C5">
          <I18nIcon className={this.state.iconnameClass} en={this.state.mediatype}/>
        </div>
        <h6 className="stat ">
          <I18nIcon className="iconochive-eye" en="eye"/>
          <nobr>{number_format(this.state.downloads)}</nobr>
        </h6>

        { typeof this.state.nFavorites === 'undefined' ? undefined
          : (
            <h6 className="stat">
              <I18nIcon className="iconochive-favorite" en="favorite"/>
              {' '}
              {number_format(this.state.nFavorites)}
              {' '}

            </h6>
          )
                }
        <h6 className="stat">
          <I18nIcon className="iconochive-comment" en="comment"/>
          {' '}
          {number_format(this.state.numReviews)}
        </h6>
      </div>
    );
  }
}
