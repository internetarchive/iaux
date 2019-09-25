
import React from 'react';
import { ObjectFilter } from '../../util';
import IAReactComponent from '../IAReactComponent';
import { AnchorDownload } from './AnchorDownload';
const debug = require('debug')('Image Components');

/**
 *  Image display components/**
 *
 *  Render an image with a caption and an anchor to download it
 */

/**
 * <ImageDweb
 *    EITHER
 *      source  Flexible dweb parameter include ArchiveFile, ArchiveMember, relative urls, dweb: names, and arrays of alternatives (see dweb-archive/ReactSupport)
 *    OR
 *      src           as in <img>
 *    url (optional)  if provided will be used immediately and then overridden when src|source have been fetched
 *    alt String      as in <img> (not translated because in many cases comes from content)
 *    imgname optional name used for alt tag and mime type when rendering via blob
 * />

 */

class ImageDweb extends IAReactComponent {
  // Image that can, but doesnt have to be loaded via Dweb

  constructor(props) {
    super(props);
    this.setState({
      src: (!DwebArchive && this.props.src) || this.props.url, // If not Dweb then can load from src like <img>
      notImgProps: ObjectFilter(this.props, (k, unusedV) => ImageDweb.specificParms.includes(k)),
      imgProps: ObjectFilter(this.props, (k, unusedV) => (!ImageDweb.specificParms.includes(k) && !['children'].includes(k)))
    });
    if (DwebArchive) {
      const urls = this.props.source || this.props.src; // ArchiveFile or Url or string should be fine
      if (urls) { // Sometimes ImageDweb called with no image, or filled in later.
        //TODO imgname might be obsolete and unused (check dweb-archive and iaux)
        const name = this.props.imgname || (typeof this.props.source === "string" && this.props.source) || (this.props.source && this.props.source.metadata && this.props.source.metadata.name) || "unknown.png";
        DwebArchive.getImageURI(name, urls, (err, url) => {
          if (!err) this.setState({src: url});
        })
      }
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

