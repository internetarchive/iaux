/* global DwebArchive */
import React from 'react';
import { ObjectFilter } from '../../util';
// const debug = require('debug')('Image Components');

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
 *    ...             other props passed to <img>
 * />
 */

class ImageDweb extends React.Component {
  // Image that can, but doesnt have to be loaded via Dweb

  constructor(props) {
    super(props);
    this.state = {
      src: (!DwebArchive && this.props.src) || this.props.url, // If not Dweb then can load from src like <img>
    };
  }

  componentDidMount() {
    // DwebArchive.page = this;
    if (DwebArchive) {
      this.setSrcFromProps();
    }
    this.tilingAndSizing();
  }

  componentDidUpdate(prevProps, unusedPrevState, unusedSnapshot) {
    if ((prevProps.source !== this.props.source) || (prevProps.src !== this.props.src)) {
      this.setSrcFromProps();
    }
    this.tilingAndSizing();
  }

  setSrcFromProps() {
    // Should be called at initialization or if props.source, or .src changes
    const urls = this.props.source || this.props.src; // ArchiveFile or Url or string should be fine
    if (urls) { // Sometimes ImageDweb called with no image, or filled in later.
      // TODO imgname might be obsolete and unused (check dweb-archive and iaux)
      const name = this.props.imgname || (typeof this.props.source === "string" && this.props.source) || (this.props.source && this.props.source.metadata && this.props.source.metadata.name) || "unknown.png";
      DwebArchive.getImageURI(name, urls, (err, url) => {
        if (!err) this.setState({src: url}); //TODO its possible there is a race if this happens before mounting
      })
    }
  }

  tilingAndSizing() {
    if (this.state.src) {
      AJS.tiler();
    }
    // Need to do this here since there is a bug in Firefox causing its test of img.complete to return true prematurely.
    if (this.state.src && this.props.className && this.props.className.includes("carousel-image")) {
      AJS.theatresize();
      AJS.carouselsize('#ia-carousel', true);
    }
  }
  render() {
    //const notImgProps = ObjectFilter(this.props, (k, unusedV) => ImageDweb.specificParms.includes(k));
    const imgProps = ObjectFilter(this.props, (k, unusedV) => (!ImageDweb.specificParms.includes(k) && !['children'].includes(k)));
    // noinspection HtmlRequiredAltAttribute
    return (
      <img {...imgProps} src={this.state.src} />
    );
  }
}
// Parameters not to pass down to img tag automatically
ImageDweb.specificParms = ['src', 'source']; // Known in use includes: className, id, alt

export { ImageDweb };
// Code Review - Mitra - 2019-10-09
