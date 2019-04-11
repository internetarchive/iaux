const debug = require('debug')('dweb-archive:TileComponent');
//import React from '../../ReactFake';
import React from 'react';
import IAReactComponent from '../IAReactComponent'; // Encapsulates differences between dweb-archive/ReactFake and iaux/React
//import PropTypes from 'prop-types'
//TODO-IAUX need to standardise API as this uses the "ArchiveMemberSearch" class to provide necessary details for the Tile.
//import ArchiveMemberSearch from "@internetarchive/dweb-archivecontroller/ArchiveMemberSearch";
import TileImage from "./TileImage";
import ParentTileImg from "./ParentTileImg";
import AnchorDetails from "../AnchorDetails";


function number_format(nStr) //this is just addCommas now
{
    //http://www.mredkj.com/javascript/numberFormat.html
    nStr += '';
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}


export default class TileComponent extends IAReactComponent {
    /* -- Not used with ReactFake or current IAUX yet
    static propTypes = {
        identifier: PropTypes.string,
        member: PropTypes.object,
        parentidentifier: PropTypes.string,
        //item: PropTypes.string - if ever have a case where have the item then edit code below to use, rather than refetching
    };
    */
    constructor(props)
    {
        super(props);
        this.state.identifier = props.identifier || props.member.identifier;
    }

    iconnameClass(mediatype) {
        // Get the class for the icon, has to handle some exceptions - there used to be many more obsolete mediatypes without iconochive's but these appear to have been cleaned up
        const exceptions = { account: "person", video: "movies"}
        return "iconochive-"+ (exceptions[mediatype] || mediatype)
    }

    render() {
        try {
            console.assert(this.props.member, "If using TileComponent.render should have a member with at least mediatype to work with");
            const member = this.props.member;
            const item = this.props.item;
            const isCollection = (member.mediatype === 'collection');
            const collection0 = member.collection0() || (item && item.metadata.collection[0]);
            const by = member.creator || member.creatorSorter || (item && item.metadata.creator); // Should be array
            const collection = member.collection || (item && item.metadata.collection); // Should be array
            const nFavorites = collection.filter(e => e.startsWith('fav-')).length;  // Jira added since cant get this any more
            const collectionSize = member.item_count; //TODO really hard to get https://github.com/internetarchive/dweb-archive/issues/91
            this.setState({
                isCollection, collection0, by, nFavorites, collectionSize,
                mediatype: member.mediatype,
                collection0title: member.collection0title || (item && item.collection_titles[collection0]),  //TODO-IAUX collection_titles is dweb only, unsure how server side IAUX gets it
                classes: 'item-ia' + (isCollection ? ' collection-ia' : ''),
                byTitle: Array.isArray(by) ? by.join(',') : by,
                downloads: member.downloads, // Often undefined
                title: member.title || (item && item.metadata.title),
                date: (member.publicdate || member.updateddate || (item && item.metadata.publicdate)).substr(0, 10), // No current cases where none of these dates exist
                iconnameClass: this.iconnameClass(member.mediatype),
                numReviews: member.num_reviews || (item && item.reviews && item.reviews.length) || 0
            })
        } catch(err) { // Catch error here as not generating debugging info at caller level for some reason
            debug("ERROR in TileComponent.render for %s:", this.state.identifier, err.message);
            enclosingdiv.parentNode.removeChild(enclosingdiv);
        }
        return (
            <div className={this.state.classes} data-id={this.state.identifier}  key={this.state.identifier}>
                { (this.state.collection0) ? // Believe, but not certain, that there is always going to be a collection0
                    <AnchorDetails className="stealth" tabIndex="-1" identifier={this.state.collection0}>
                        <div className="item-parent">
                            <div className="item-parent-img">
                                <ParentTileImg member={this.props.member} identifier={this.state.identifier} parentidentifier={this.state.collection0} />
                            </div>
                            <div className="item-parent-ttl">{this.state.collection0title}</div>
                        </div>{/*.item-parent*/}
                    </AnchorDetails>
                    : undefined }
                <div className="hidden-tiles views C C1">
                    <nobr className="hidden-xs">{number_format(this.state.downloads)}</nobr>
                    <nobr className="hidden-sm hidden-md hidden-lg">{number_format(this.state.downloads)}</nobr>
                </div>


                <div className="C234">
                    <div className="item-ttl C C2">
                        <AnchorDetails identifier={this.state.identifier} title={this.state.title}>
                            <div className="tile-img">
                                <TileImage className="item-img clipW clipH" imgname={"__ia_thumb.jpg"} member={this.props.member} identifier={this.state.identifier} />
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

                    {this.state.by && this.state.by.length ?
                        <div className="by C C4">
                            <span className="hidden-lists">by </span>
                            <span title={this.state.byTitle}>{this.state.byTitle}</span>
                        </div>
                        : undefined }
                </div>{/*.C234*/}
                {this.state.isCollection ? this.renderDivCollectionStats() : this.renderDivStatbar() }
            </div>
        );
    }


    renderDivCollectionStats(){
        //TODO fix 000 in num_items see https://github.com/internetarchive/dweb-archive/issues/91
        return (
            <div className="collection-stats">
                <div className="iconochive-collection topinblock hidden-lists" aria-hidden="true"></div>
                <span className="sr-only">collection</span>
                <div className="num-items topinblock">
                    {number_format(this.state.collectionSize)} <div className="micro-label">ITEMS</div>
                </div>
                <div className="num-items hidden-tiles">
                    {number_format(this.state.downloads)}
                    <div className="micro-label">VIEWS</div>
                </div>
            </div>
        );
    }

    renderDivStatbar() { // <div class=statbar>
        return (
            <div className="statbar ">
                <div className="mt-icon C C5">
                    <span className={this.state.iconnameClass} aria-hidden="true"></span><span className="sr-only">{this.state.mediatype}</span></div>
                <h6 className="stat ">
                    <span className="iconochive-eye" aria-hidden="true"></span><span className="sr-only">eye</span>
                    <nobr>{number_format(this.state.downloads)}</nobr>
                </h6>

                { typeof this.state.nFavorites === "undefined" ? undefined :
                    <h6 className="stat">
                        <span className="iconochive-favorite" aria-hidden="true"></span><span
                        className="sr-only">favorite</span> {number_format(this.state.nFavorites)} </h6>
                }
                <h6 className="stat">
                    <span className="iconochive-comment" aria-hidden="true"></span><span className="sr-only">comment</span> {number_format(this.state.numReviews)}
                </h6>
            </div>
        )
    }


}
