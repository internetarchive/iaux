
import React from 'react';
import { ObjectFilter } from '../../util';
import IAReactComponent from '../IAReactComponent';
import AnchorDownload from './AnchorDownload';

const debug = require('debug')('Image Components');

/**
 *  Image display components
 *
 * <ImageMainTheatre
 *  source  [ArchiveFile]  // Single ArchiveFile but in an array
 *  alt     Alt text
 *  src     URL of image (for !Dweb)
 *  caption Caption to go under image
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


  // TODO-IAUX see https://github.com/internetarchive/dweb-archive/issues/113 refactoring this
  loadcallable(enclosingspan) { // Defined as a closure so that can access identifier
    // TODO this may move to a method on the source (e.g. on ArchiveFile)
    const name = this.props.imgname || (this.props.source && this.props.source.metadata.name);
    DwebArchive.ReactFake.loadImg3(enclosingspan, name , this.props.source || this.props.src, (err, unusedEl) => {
      if (err) {
        debug('Fail to load %s: %s', name, err.message);
      } else {
        AJS.tiler(); // Make it redraw after img size known TODO see where/if this is needed
      }
    });
  }

  render() {
    // noinspection HtmlRequiredAltAttribute
    return (
      typeof DwebArchive !== 'undefined'
      // TODO-DWEB build img processing from ReactFake into this
        ? <img ref={this.load} {...this.state.imgProps} />
        : <img {...this.state.imgProps} src={this.props.src} />
    );
  }
}
// Parameters not to pass down to img tag automatically
ImageDweb.specificParms = ['src', 'source']; // Known in use includes: className, id, alt

class ImageMainTheatre extends IAReactComponent {

  render() {
    return (
      <div className="details-carousel-wrapper">
        <section
          id="ia-carousel"
          className="carousel slide"
          data-ride="carousel"
          data-interval="false"
          aria-label="Item image slideshow"
          style={{ maxHeight: '600px' }}
        >
          <ol className="carousel-indicators" style={{ display: 'none' }}>
            <li
              data-target="#ia-carousel"
              data-slide-to="0"
              className=" active"
              role="button"
              tabIndex="0"
              aria-label="Go to image 1"
            />
          </ol>

          <div className="carousel-inner">
            <div className="item active">
              <AnchorDownload
                className="carousel-image-wrapper"
                source={this.props.source}
                title="Open full sized image"
                target="_blank"
              >
                {/* --Separate window so dont break DWeb--*/}
                <ImageDweb className="rot0 carousel-image" source={this.props.source} id="streamContainer" src={this.props.src} alt={this.props.alt} />
              </AnchorDownload>
              <div className="carousel-caption">
                {this.props.caption}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export { ImageDweb, ImageMainTheatre };
