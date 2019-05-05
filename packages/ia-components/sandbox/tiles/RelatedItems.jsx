const debug = require('debug')('ia-components:RelatedItems');
//Note this component is Real-React only, it may or may not work in ReactFake
import React from 'react';
import IAReactComponent from '../IAReactComponent'; // Encapsulates differences between dweb-archive/ReactFake and iaux/React
import TileComponent from "./TileComponent.jsx";

/* RelatedItems is a component intended for the bottom of details page to display related items.
    It can be called either with members=[member*] in which case it will render them immediately
    or more usually will be called with item=ArchiveItem in which case it will call ArchiveItem.relatedMembers and render the result via RelatedItemsInner
    It should be easy to hook this into IAUX's related items service if anyone wants to use that.

    Members are, or should look like, ArchiveMember as defined in the dweb-archivecontroller repo.
    If there is an alternative structure that is suitable for passing in, then it should be easy to handle any minor differences here.

    Its currently used in dweb-archive/Details.js
 */

class RelatedItemsInner extends IAReactComponent {
    // Utility component run when asynchronous fetch returns

    constructor(props)
    {
        super(props) //members
        console.assert(props.members)
    }
    render() { return (
        <div className="row">
            <div className="col-xs-12 tilebars" style={{display: "block"}}>
                <h5 className="small-label">SIMILAR ITEMS (based on metadata){/*<span id="playplayset">
                        *<a data-reactroot="" className="stealth" href="#play-items" data-event-click-tracking="Playset|PlayAllLink"><span
                        className="iconochive-play" aria-hidden="true"></span><span className="sr-only">play</span><span
                        className="hidden-xs-span"> Play All</span><br></a></span>*/}</h5>
                <div id="also-found-result">
                    <section data-reactroot="" aria-label="Related Items">
                        { this.props.members.map(member => // Note this is odd - results normally encloses all teh tasks, but AJS.tiler doesnt seem to work without this
                            <div className="results" key={member.identifier} style={{visibility: "visible"}}>
                                <TileComponent member={member}/>
                            </div>
                        ) }
                    </section>
                </div>
            </div>
        </div>
    )}
}

export default class RelatedItems extends IAReactComponent {
    /* -- Not used with ReactFake or current IAUX yet
    static propTypes = {
        identifier: PropTypes.string,
        members: PropTypes.array, // of ArchiveMembers or similar
        item:   ArchiveItem (essentially something that has a relatedItems({...}) method that can return [member*]
     */
    constructor(props)
    {
        super(props); //identifier, members, item
        this.state.members = this.props.members; // Maybe undefined, but has to be in .state so can change
        console.assert(this.props.item || this.props.members,"Must pass either item or members")
    }

    loadcallable(enclosingdiv) {
        // called via ref=this.load when the component is loaded, triggers async load via API if .members undefined
        if (this.props.item && !this.state.members) {
            this.props.item.relatedItems({wantStream:false, wantMembers:true}, (err, members) => {
                if (!err) { // If there is an error then fetch_json will have reported it, and can just ignore it here and not display
                    // In real react, rely on side-effect of setting state, this is untested in ReactFake
                    this.setState({members: members});
                    //Next two lines dont work in React as cant .appendChild a React obj to DOM but in real react setState triggers a rerender
                    //while (enclosingdiv.lastChild) { enclosingdiv.removeChild(enclosingdiv.lastChild); } // Remove "Loading related..."
                    //enclosingdiv.appendChild( <RelatedItemsInner members={members}/> );
                }
            });
        }
    }

    render() {
        return ((this.props.identifier) ?
                    // Static or asynchronously loaded members handled here
                    <div id="also-found" className="container container-ia width-max"
                        data-identifier={this.props.identifier} ref={this.load}>
                        {!this.state.members ?
                            <span>Loading related items...</span>
                            :
                            <RelatedItemsInner members={this.state.members}/>
                        }
                    </div>
                // No related items on home page, searches, maybe other places
                : null);
    }
}

