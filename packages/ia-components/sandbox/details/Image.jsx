
import React from 'react';
import { ObjectFilter } from '../../util';
import IAReactComponent from '../IAReactComponent';
import { AnchorDownload } from './AnchorDownload';
const debug = require('debug')('Image Components');

/**
 *  Image display components
 *
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

/**
 * <ImageDweb
 *    EITHER
 *      source  Flexible dweb parameter include ArchiveFile, ArchiveMember, relative urls, dweb: names, and arrays of alternatives (see dweb-archive/ReactSupport)
 *    OR
 *      src     as in <img>
 *    alt     as in <img>
 *    imgname optional name used for alt tag and mime type when rendering via blob
 * />

 */

class ImageDweb extends IAReactComponent {
  // Image that can, but doesnt have to be loaded via Dweb

  constructor(props) {
    super(props);
    this.setState({
      src: this.props.url,
      notImgProps: ObjectFilter(this.props, (k, unusedV) => ImageDweb.specificParms.includes(k)),
      imgProps: ObjectFilter(this.props, (k, unusedV) => (!ImageDweb.specificParms.includes(k) && !['children'].includes(k)))
    });
    if (DwebArchive) {
      //TODO imgname might be obsolete and unused (check dweb-archive and iaux)
      const name = this.props.imgname || (typeof this.props.source === "string" && this.props.source) || (this.props.source && this.props.source.metadata && this.props.source.metadata.name) || "unknown.png";
      DwebArchive.getImageURI(name, this.props.source || this.props.src, (err, url) => {
        if (!err) this.setState({src: url});
      })
    }
  }

  componentDidMount() {
    //DwebArchive.page = this;
    super.componentDidMount();
    this.componentDidMountOrUpdate()
  }

  componentDidUpdate() {
    super.componentDidUpdate();
    this.componentDidMountOrUpdate()
  }

  componentDidMountOrUpdate() {
    if (this.state.src) {
      AJS.tiler();
    }
    // Need to do this here since there is a bug in Firefox causing its test of img.complete to return true prematurely.
    if (this.state.src && this.state.imgProps.className && this.state.imgProps.className.includes("carousel-image")) {
      AJS.theatresize();
      AJS.carouselsize('#ia-carousel', true);
    }
  }
  render() {
    return (
      <img {...this.state.imgProps} src={this.state.src} />
    );
  }
}
// Parameters not to pass down to img tag automatically
ImageDweb.specificParms = ['src', 'source']; // Known in use includes: className, id, alt

export { ImageDweb };

