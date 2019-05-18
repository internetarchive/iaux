import React from 'react';
import IAReactComponent from './IAReactComponent';
import {AnchorDetails} from '@internetarchive/ia-components/index.js';
import {canonicalUrl} from '../Util.js';

/**
 *  List of collections on details page
 *
 * <DetailsCollectionList
 *   collections=["prelinger","video"]                    List of collections to display
 *   collectionTitles={prelinger: "Prelinger Archives"}   Mapping collections to title
 * />
 *
 * Typically the caller will expand collections list asynchronously and set collectionTitles - see dweb-archive/components/DetailsCollectionListWrapper
 */

export default class DetailsCollectionList extends IAReactComponent {
  constructor(props) {
    super(props); // collections collectionTitles
  }

  render() {
    return (
      <div className="boxy collection-list">
        <section className="collection-list">
          <h5 className="collection-title">IN COLLECTIONS</h5>
          {this.props.collections.map(collection =>
              <div className="collection-item" key={collection}>
                <AnchorDetails identifier={collection} data-event-click-tracking={`CollectionList|${collection}`}
                >{this.props.collectionTitles[collection] || collection}</AnchorDetails>
                <div className="item-img">
                  <AnchorDetails identifier={collection} style={{backgroundImage: `url(${canonicalUrl('/services/img/'+collection)})`}}
                                 aria-hidden="true" data-event-click-tracking={`CollectionList|${collection}`}></AnchorDetails>
                </div>
              </div>
          )}
        </section>
      </div>
    );
  }
}
