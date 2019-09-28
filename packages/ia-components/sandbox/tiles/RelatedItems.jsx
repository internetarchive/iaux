import React from 'react';
import IAReactComponent from '../IAReactComponent';
import TileComponent from './TileComponent';
import {I18nStr, I18nSpan} from '../languages/Languages';

//Unused: const debug = require('debug')('ia-components:RelatedItems');

/**
 *
 * <RelatedItems
 *    identifier = string Identifier of item displaying related items for
 *    members = [ ArchiveMember ]
 *           or [ { object } ]  where object has the fields of a member (as returned by Gio's related api) as required for TileComponent
 *    disconnected = BOOL       True if browser cannot see archive.org
 *    loading = BOOL            True if in process of loading - if not then don't display this section
 * />
 * RelatedItems is a component intended for the bottom of details page to display related items.
 * It should be called either with members=[member*] in which case it will render them immediately
 * dweb-archive uses RelatedItemsWrapper that has the functionality of loading the related item from an "item" or "identifier"
 *
 * It should be easy to build a wrapper to hook this into IAUX's (underdeveloped) related items service if anyone wants to use that.
 *
 * Members are, or should look like, ArchiveMember as defined in the dweb-archivecontroller repo. or as returned by Gio's related API
 *
 * Its currently used in dweb-archive/Details.js via RelatedItemsWrapper which finds the Members
 * For use without dweb-archivecontroller it will need to call the Related Items API and pass the results here.
 */


export default class RelatedItems extends IAReactComponent {

  render() {
    return ((!this.props.identifier) ? null
      // Static or asynchronously loaded members handled here
      : (
        <div
          id="also-found"
          className="container container-ia width-max"
          data-identifier={this.props.identifier}
        >
          { (!this.props.members && !this.state.loading)
            ? null
            : this.state.loading
            ? <I18nSpan en="Loading related items">...</I18nSpan>
            :
              <div className="row">
                <div className="col-xs-12 tilebars" style={{ display: 'block' }}>
                  <h5 className="small-label">
                    <I18nSpan en="SIMILAR ITEMS (based on metadata)"/>
                    {/* <span id="playplayset">
                        *<a data-reactroot="" className="stealth" href="#play-items" data-event-click-tracking="Playset|PlayAllLink">
                        <I18nIcon className="iconochive-play" en="play" xs="Play All"/><br></a></span> */}
                  </h5>
                  <div id="also-found-result">
                    <section data-reactroot="" aria-label={I18nStr("Related Items")}>
                      { // Note this is odd - results normally encloses all the tasks, but AJS.tiler doesnt seem to work without this
                    this.props.members.map(member => (
                      <div className="results" key={member.identifier} style={{ visibility: 'visible' }}>
                        <TileComponent member={member} disconnected={this.props.disconnected}/>
                      </div>
                    )) }
                    </section>
                  </div>
                </div>
              </div>
        }
        </div>
      )
      // No related items on home page, searches, maybe other places
    );
  }
}
