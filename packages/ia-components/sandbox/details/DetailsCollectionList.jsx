import React from 'react';
import IAReactComponent from '../IAReactComponent';
import AnchorDetails from '../AnchorDetails';
import { canonicalUrl } from '../../util';
import { I18nSpan } from '../languages/Languages';

/**
 *  List of collections on details page
 *
 *  Renders as a list of collections, with images for each.
 *
 *  Behavior none for the component itself, but each collection (text and image) is an anchor to navigate to the collection
 *
 * Technical Notes:
 *  The collectionTitles should be supplied, there is a wrapper in dweb-archive to do this, as there was a preference (Isa) not to
 *  include that functionality here.
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
          <h5 className="collection-title"><I18nSpan en="IN COLLECTIONS"/></h5>
          {this.props.collections.map(collection => (
            <div className="collection-item" key={collection}>
              <AnchorDetails
                identifier={collection}
                data-event-click-tracking={`CollectionList|${collection}`}
              >
                {this.props.collectionTitles[collection] || collection}
              </AnchorDetails>
              <div className="item-img">
                <AnchorDetails
                  identifier={collection}
                  style={{ backgroundImage: `url(${canonicalUrl(`/services/img/${collection}`)})` }}
                  aria-hidden="true"
                  data-event-click-tracking={`CollectionList|${collection}`}
                />
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }
}
