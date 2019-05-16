import React from 'react';
import IAReactComponent from '../IAReactComponent';
import AnchorDetails from "../AnchorDetails";
import ArchiveMember from "@internetarchive/dweb-archivecontroller/ArchiveMember.js";
import {canonicalUrl} from "../../util.js";

/*
    List of collections on details page]
    Its passed a list of collections, and mapping to titles.
    If titles arent supplied it will attempt to find through ArchiveMember.expand so dependend on ArchiveMember if not supplying titles.

    <DetailsCollectionList collections=["prelinger"*]  collectionTitles={prelinger: "Prelinger Archives"} />

 */
export default class DetailsCollectionList extends IAReactComponent {

    constructor(props) {
        super(props); //collections
        this.state.collectionTitles = (typeof this.props.collectionTitles === "undefined") ? {} : this.props.collectionTitles;
        this.state.expansionTried = false;
    }
    loadcallable(unused_enclosingElement) {
        //expand a list of collections into a list of titles either through collectionTitles if supplied (e.g. from dweb gateway) or via a new Search query
        if (!this.state.expansionTried) {
            this.state.expansionTried = true;
            ArchiveMember.expand(this.props.collections.filter(k => !this.state.collectionTitles[k]), (err, res) => { // res = { id: AS(id) }
                const collectionTitles = Object.assign({}, this.state.collectionTitles, Object.map(res, (k, v) => [k, v.title]));
                this.setState({collectionTitles: collectionTitles});
            });
        }
    }

    render() { return (
        <div className="boxy collection-list">
            <section className="collection-list" ref={this.load}>
                <h5 className="collection-title">IN COLLECTIONS</h5>
                {this.props.collections.map(collection =>
                    <div className="collection-item" key={collection}>
                        <AnchorDetails identifier={collection} data-event-click-tracking={`CollectionList|${collection}`}
                        >{this.state.collectionTitles[collection] || collection}</AnchorDetails>
                        <div className="item-img">
                            <AnchorDetails identifier={collection} style={{backgroundImage: `url(${canonicalUrl('/services/img/'+collection)})`}}
                                aria-hidden="true" data-event-click-tracking={`CollectionList|${collection}`}></AnchorDetails>
                        </div>
                    </div>
                )}
            </section>
        </div>
    ); }
}
