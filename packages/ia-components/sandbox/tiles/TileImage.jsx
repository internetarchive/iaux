// import React from '../../ReactFake';
import React from 'react';
import IAReactComponent from '../IAReactComponent';

const debug = require('debug')('ia-components:TileImage');

export default class TileImage extends IAReactComponent {
  /*
   * <TileImage
   *    identifier =string    identifier of the item
   *    member = ArchiveMember or {
   *    className = string    Passed to generated img
   *    imgname = string      Name of the file - usually "__ia_thumbs.jpg"
   * />
   * Behavior
   *  On Render Dweb: Renders a <Span> and then an img is retrieved decentralized and inserted TODO (maybe) make an outer component setState and rerender
   *  On Render !Dweb: Render an <img>
   *  On Click enclosing component should be directing click to navigate to the item
   */

  // TODO-IAUX push this functionality up a level
  // loadImg is only called in the ReactFake case, not in the "real" React.
  loadcallable(enclosingspan) { // Defined as a closure so that can access identifier
    DwebArchive.ReactFake.p_loadImg(enclosingspan, '__ia_thumb.jpg', `/services/img/${this.props.identifier}`, (err, el) => {
      if (err) {
        debug('Fail to load %s: %s', '/services/img/${this.props.identifier', err.message);
      } else {
        DwebArchive.ReactFake.setAttributes(el, 'img', { className: this.props.className, imgname: this.props.imgname });
        AJS.tiler(); // Make it redraw after img size known
      }
    }); // //Intentionally no host so ReactFake will process
  }

  render() {
    if (typeof DwebArchive !== 'undefined') {
      // TODO-DWEB build img processing from ReactFake into tile-tile-image and ParentTileImg but wait till have non-tile images as well
      return <span ref={this.load} />;
    }
    return <img className={this.props.className} src={`https://archive.org/services/img/${this.identifier}`} alt={this.identifier} />;
  }
}
