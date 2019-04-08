//import React from '../../ReactFake';
import React from 'react';
import IAReactComponent from '../IAReactComponent';

export default class TileImage extends IAReactComponent {
    /* Used in IAUX, but not in ReactFake
    static propTypes = {
        identifier: PropTypes.string.isRequired,
        member: PropTypes.object, // Unused currently
        className: PropTypes.string, // Not sure what type this is
        imgname: PropTypes.string,
    };
    */
    constructor(props)
    {
        super(props);
    }
    // loadImg is only called in the ReactFake case, not in the "real" React.
    loadcallable(enclosingspan) { // Defined as a closure so that can access identifier
        DwebArchive.ReactFake.p_loadImg(enclosingspan, "__ia_thumb.jpg", `/services/img/${this.props.identifier}`, (err, el) => {
            DwebArchive.ReactFake.setAttributes(el, "img", {className: this.props.className, imgname: this.props.imgname});
            AJS.tiler(); // Make it redraw after img size known
        }) ////Intentionally no host so ReactFake will process
    }

    render() {
        if (typeof DwebArchive !== "undefined") {
            //TODO-DWEB build img processing from ReactFake into tile-tile-image and ParentTileImg but wait till have non-tile images as well
            return <span ref={this.load}></span>
        } else {
            return <img src={`https://archive.org/services/img/${this.identifier}`} alt={this.identifier}/>;
        }
    }
}
