import React from 'react'
import IAReactComponent from '../IAReactComponent';

export default class ParentTileImg extends IAReactComponent {
    /* -- Not used with ReactFake yet
    static propTypes = {
        identifier: PropTypes.string,
        member: PropTypes.object,
        parentidentifier: PropTypes.string,
    };
    */
    constructor(props) {
        super(props);
    }
    // Note this is only called in the dweb-archive/ReactFake case
    loadcallable(enclosingspan) { // Defined as a closure so that can access identifier (in real React), in ReactFake its called with ref.call(this,enclosingspan)
        let urls;
        if (this.props.member && this.props.member.collection0thumbnaillinks && (this.props.member.collection0thumbnaillinks.length > 0) ) {
            urls = this.props.member.collection0thumbnaillinks;
        } else {
            if (!this.props.parentidentifier) {
                this.props.parentidentifier = this.props.member.collection0()
                    //TODO WOnt work its async || new ArchiveItem(this.props.member.identifier).fetch_metadata().metadata.collection[0];
            }
            urls = `/services/img/${this.props.parentidentifier}`;    // Intentionally no host - so works on both archive.org and via ReactFake.loadImg() on dweb and localhost
        }
        DwebArchive.ReactFake.p_loadImg(enclosingspan, "__ia_thumb.jpg", urls);
    }
    render() {
        if (typeof DwebArchive !== "undefined") {
            //TODO-DWEB build img processing from ReactFake into tile-tile-image and ParentTileImg but wait till have non-tile images as well
            // Returns <span> which ReactFake.loadImg fills in
            return <span ref={this.load}></span>;
        } else { // Pure IAUX
            return <img src={`https://archive.org/services/img/${this.identifier}`}/>; // Note requires a way to determine parent collection identifier
        }
    }
}
