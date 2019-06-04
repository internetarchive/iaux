const debug = require('debug')('ia-components:RelatedItems');
//Note this component is Real-React only, it may or may not work in ReactFake
import React from 'react';
import IAReactComponent from '../IAReactComponent'; // Encapsulates differences between dweb-archive/ReactFake and iaux/React
import TileComponent from "./TileComponent";

/* RelatedItems is a component intended for the bottom of details page to display related items.
    It should be called either with members=[member*] in which case it will render them immediately
    dweb-archive uses RelatedItemsWrapper that has the functionality of loading the related item from an "item" or "identifier"

    It should be easy to build a wrapper to hook this into IAUX's (underdeveloped) related items service if anyone wants to use that.

    Members are, or should look like, ArchiveMember as defined in the dweb-archivecontroller repo.
    If there is an alternative structure that is suitable for passing in, then it should be easy to handle any minor differences here.

    Its currently used in dweb-archive/Details.js via RelatedItemsWrapper
 */


export default class RelatedItems extends IAReactComponent {
  /* -- Not used with ReactFake or current IAUX yet
  static propTypes = {
      identifier: PropTypes.string,
      members: PropTypes.array, // of ArchiveMembers or similar
      item:   ArchiveItem (essentially something that has a relatedItems({...}) method that can return [member*]
   */
  constructor(props) {
    super(props); //identifier, members
  }

  render() {
    return ((! this.props.identifier) ? null :
      // Static or asynchronously loaded members handled here
      <div id="also-found" className="container container-ia width-max"
           data-identifier={this.props.identifier}>
        { (!this.props.members) ? <span>Loading related items...</span> :

          <div className="row">
            <div className="col-xs-12 tilebars" style={{display: "block"}}>
              <h5 className="small-label">SIMILAR ITEMS (based on metadata){/*<span id="playplayset">
                        *<a data-reactroot="" className="stealth" href="#play-items" data-event-click-tracking="Playset|PlayAllLink"><span
                        className="iconochive-play" aria-hidden="true"></span><span className="sr-only">play</span><span
                        className="hidden-xs-span"> Play All</span><br></a></span>*/}</h5>
              <div id="also-found-result">
                <section data-reactroot="" aria-label="Related Items">
                  { this.props.members.map(member =>
                    // Note this is odd - results normally encloses all the tasks, but AJS.tiler doesnt seem to work without this
                    <div className="results" key={member.identifier} style={{visibility: "visible"}}>
                      <TileComponent member={member}/>
                    </div>
                  ) }
                </section>
              </div>
            </div>
          </div>
        }
      </div>
      // No related items on home page, searches, maybe other places
    );
  }
}

