
import React from 'react';
import { ObjectFilter } from '../../util';
import IAReactComponent from '../IAReactComponent';
import { AnchorDownload } from './AnchorDownload';

const debug = require('debug')('Image Components');

/**
 *  Image display components
 *
 * <ImageDweb
 *    EITHER
 *      source  Flexible dweb parameter include ArchiveFile, ArchiveMember, relative urls, dweb: names, and arrays of alternatives (see dweb-archive/ReactSupport)
 *    OR
 *      src     as in <img>
 *    alt     as in <img>
 * />
 * <ImageMainTheatre
 *  source  [ArchiveFile]  // Single ArchiveFile but in an array
 *  alt     Alt text
 *  src     URL of image (for !Dweb)
 *  caption Caption to go under image
 *  identifier
 *  mediatype
 *  />
 *
 *  Render an image with a caption and an anchor to download it
 */

class ImageDweb extends IAReactComponent {
  // Image that can, but doesnt have to be loaded via Dweb

  constructor(props) {
    super(props); // { source, src, alt }
    this.setState({
      notImgProps: ObjectFilter(this.props, (k, unusedV) => ImageDweb.specificParms.includes(k)),
      imgProps: ObjectFilter(this.props, (k, unusedV) => (!ImageDweb.specificParms.includes(k) && !['children'].includes(k)))
    });
  }

  loadcallable(enclosingspan) { // Defined as a closure so that can access identifier
    // Its unclear why, but sometimes React calls this with enclosingspan === null, which is meaningless as missign the <img> to
    // load into, skipping doesnt seem to be an issue and maybe its timing and element has already gone away?
    if (enclosingspan) {
      // TODO this may move to a method on the source (e.g. on ArchiveFile)
      const name = this.props.imgname || (this.props.source && this.props.source.metadata.name);
      DwebArchive.loadImg(enclosingspan, name, this.props.source || this.props.src, (err, unusedEl) => {
        if (err) {
          debug('Fail to load %s: %s', name, err.message);
        } else {
          AJS.tiler(); // Make it redraw after img size known TODO see where/if this is needed
        }
      });
    }
  }

  render() {
    // noinspection HtmlRequiredAltAttribute
    return (
      typeof DwebArchive !== 'undefined'
        ? <img ref={this.load} {...this.state.imgProps} />
        : <img {...this.state.imgProps} src={this.props.src} />
    );
  }
}
// Parameters not to pass down to img tag automatically
ImageDweb.specificParms = ['src', 'source']; // Known in use includes: className, id, alt

export { ImageDweb };

