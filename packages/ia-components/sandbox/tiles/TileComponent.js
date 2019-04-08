const debug = require('debug')('dweb-archive:TileComponent');
//import React from '../../ReactFake';
import React from 'react';
import IAReactComponent from '../IAReactComponent'; // Encapsulates differences between dweb-archive/ReactFake and iaux/React
//import PropTypes from 'prop-types'
//TODO-IAUX need to standardise API as this uses the "ArchiveMemberSearch" class to provide necessary details for the Tile.
//import ArchiveMemberSearch from "@internetarchive/dweb-archivecontroller/ArchiveMemberSearch";
import Util from "../../Util"; //TODO-IAUX for mediatype_canonical and number_format which need porting to some kind of common libary between IAUX and dweb-archive
import TileImage from "./TileImage";
import ParentTileImg from "./ParentTileImg";
//Both these fail - not compiling the JSX
//import TileImage from "@internetarchive/ia-components/sandbox/tiles/TileImage";
//import TileImage from "../../iaux/packages/ia-components/sandbox/tiles/TileImage";


export default class TileComponent extends IAReactComponent {
    /* -- Not used with ReactFake yet
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

    render() {
        try {
            console.assert(this.props.member, "If using loadAndSync should have a member with at least mediatype to work with");
            // We need some data for tiles, if its not found then have to fetch item metadata and then render
            //TODO = catch cases (if-any) where this is triggered (maybe related, maybe fav-brewster) and see if can use expansion instead
            // note test of creator is bad, as for example the "etree" entry in audio collection doesnt have a creator, publicdate or title would be better, but will try ArchiveMemberSearch
            //console.assert(this.props.member.creator && this.props.member.creator.length, "next code shouldnt be needed as expand");
            //console.assert(this.props.member instanceof ArchiveMemberSearch, "next code shouldnt be needed as expand");
            /*
            if (!(this.props.member.creator && this.props.member.creator.length)) { // This may not be best test
                if (!this.props.item) this.props.item = new ArchiveItem({itemid: this.state.identifier});
                if (!this.props.item.metadata) {
                    this.props.item.fetch_metadata((err, ai) => {
                        if (err) {
                            debug("Failed to read metadata for %s", this.state.identifier);
                            enclosingdiv.parentNode.removeChild(enclosingdiv);
                        } else {
                            this.loadAndSync(enclosingdiv);
                        }
                    });
                    return;
                } // If metadata drop through
            }
            */
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
                collection0title: member.collection0title || (item && item.collection_titles[collection0]),
                classes: 'item-ia' + (isCollection ? ' collection-ia' : ''),
                byTitle: Array.isArray(by) ? by.join(',') : by,
                downloads: member.downloads, // Often undefined
                title: member.title || (item && item.metadata.title),
                date: (member.publicdate || member.updateddate || (item && item.metadata.publicdate)).substr(0, 10), // No current cases where none of these dates exist
                // Convert the mediatype into a canonical one (text, image etc)
                // TODO-IAUX this is in Util - needs porting to the IAUX repo
                iconnameClass: "iconochive-"+Util.mediatype_canonical(member.mediatype),
                numReviews: member.num_reviews || (item && item.reviews && item.reviews.length) || 0
            })
        } catch(err) { // Catch error here as not generating debugging info at caller level for some reason
            debug("ERROR in TileComponent.loadAndSync for %s:", this.state.identifier, err.message);
            enclosingdiv.parentNode.removeChild(enclosingdiv);
        }
        return (
        <div className={this.state.classes} data-id={this.state.identifier}  key={this.state.identifier}>
            { (this.state.collection0) ? //TODO make it work for ParentTileImage in new TileComponent then remove this condition
                <a className="stealth" tabIndex="-1" href={`/details/${this.state.collection0}`} onClick={`Nav.nav_details("${this.state.collection0}");`}>
                    <div className="item-parent">
                        <div className="item-parent-img">
                            <ParentTileImg member={this.props.member} identifier={this.state.identifier} parentidentifier={this.state.collection0} />
                        </div>
                        <div className="item-parent-ttl">{this.state.collection0title}</div>
                    </div>{/*.item-parent*/}
                </a>
                : undefined }
            <div className="hidden-tiles views C C1">
                <nobr className="hidden-xs">{Util.number_format(this.state.downloads)}</nobr>
                <nobr className="hidden-sm hidden-md hidden-lg">{Util.number_format(this.state.downloads)}</nobr>
            </div>


            <div className="C234">
                <div className="item-ttl C C2">
                    <a onClick={`Nav.nav_details("${this.state.identifier}");`} title={this.state.title}>
                        <div className="tile-img">
                            <TileImage className="item-img clipW clipH" imgname={"__ia_thumb.jpg"} member={this.props.member} identifier={this.state.identifier} />
                            {/*<img className="item-img clipW clipH" imgname={imgname} src={member}/>*/}
                        </div>{/*.tile-img*/}
                        <div className="ttl">
                            {this.state.title}
                        </div>
                    </a>
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
                    {Util.number_format(this.state.collectionSize)} <div className="micro-label">ITEMS</div>
                </div>
                <div className="num-items hidden-tiles">
                    {Util.number_format(this.state.downloads)}
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
                    <nobr>{Util.number_format(Util.number_format(this.state.downloads))}</nobr>
                </h6>

                { typeof this.state.nFavorites === "undefined" ? undefined :
                    <h6 className="stat">
                        <span className="iconochive-favorite" aria-hidden="true"></span><span
                        className="sr-only">favorite</span> {Util.number_format(this.state.nFavorites)} </h6>
                }
                <h6 className="stat">
                    <span className="iconochive-comment" aria-hidden="true"></span><span className="sr-only">comment</span> {Util.number_format(this.state.numReviews)}
                </h6>
            </div>
        )
    }


}
