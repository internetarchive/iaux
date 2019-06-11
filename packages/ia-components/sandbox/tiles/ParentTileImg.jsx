// import React from '../../ReactFake';
// import IAFakeReactComponent from '../IAFakeReactComponent';
import React from 'react';
import IAReactComponent from '../IAReactComponent';

export default class ParentTileImg extends IAReactComponent {
  /* Unused...
    static propTypes = {
        identifier: PropTypes.string, OR
        member: PropTypes.object (will be followed to get parentidentifier) (the object we want the parent of)
        parentidentifier: PropTypes.string,
    };
    */

  //TODO-IAUX remove dependence on this functionality, have higher level component figure the parent identifier.

  // Note this is only called in the dweb-archive/ReactFake case
  loadcallable(enclosingspan) { // Defined as a closure so that can access identifier (in real React), in ReactFake its called with ref.call(this,enclosingspan)
    let urls;
    if (this.props.member && this.props.member.collection0thumbnaillinks && (this.props.member.collection0thumbnaillinks.length > 0)) {
      urls = this.props.member.collection0thumbnaillinks;
    } else {
      if (!this.props.parentidentifier) {
        this.props.parentidentifier = this.props.member.collection0();
      }
      urls = `/services/img/${this.props.parentidentifier}`; // Intentionally no host - so works on both archive.org and via ReactFake.loadImg() on dweb and localhost
    }
    DwebArchive.ReactFake.p_loadImg(enclosingspan, '__ia_thumb.jpg', urls);
  }

  render() {
    if (typeof DwebArchive !== 'undefined') {
      // TODO-DWEB build img processing from ReactFake into tile-tile-image and ParentTileImg but wait till have non-tile images as well
      // Returns <span> which ReactFake.loadImg fills in
      return <span ref={this.load}></span>;
    } else { // Pure IAUX
      return <img src={`https://archive.org/services/img/${this.identifier}`}/>; // Note requires a way to determine parent collection identifier
    }
  }
}