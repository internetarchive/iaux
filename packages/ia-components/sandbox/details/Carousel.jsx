import React from "react";
import IAReactComponent from '../IAReactComponent';
import { AnchorDownload } from './AnchorDownload';
import { ImageDweb } from './Image';
import { I18nStr } from '../languages/Languages';

//TODO-CAROUSEL
/** Carousel
 *
 * <Carousel
 *    identifier = string     Standard Archive identifier
 *    disconnected            True if browser cant see archive.org (e.g. on dweb-mirror)
 *    slides = [ {            Array of objects
 *      filename,               Name of file within Identifier (i.e. matches name field of ITEM.files)
 *      source                  optional pointer to ArchiveFile object that Dweb will sue to fetch/download images
 *    }* ]
 *
 * Technical: The code for switching images comes from archive.org, I believe its using bootstrap. It could probably be written to be local
 *
 * Issues: CSS doesnt quite work - has the "<" and ">" slightly above the image.
 */

class Carousel extends IAReactComponent {
  constructor(props) {
        super(props); // identifier, slides: [ {filename, source: ArchiveFile} ]  // The source is optional, make it more efficient on Dweb
        this.state.startAt = 0;
     }

    render() { return (
      <div className="details-carousel-wrapper">
          <section id="ia-carousel" className="carousel slide" data-ride="carousel"
                   data-interval="false" aria-label={I18nStr("Item image slideshow")}>
            <ol className="carousel-indicators" style={{display:"none"}}>
                {this.props.slides.map((slide,i) => (
                  <li key={i} data-target="#ia-carousel" data-slide-to={i} className={i===this.state.startAt ? "active" : undefined}
                      role="button" tabIndex="0" aria-label={I18nStr("Go to image")+" "+ i}></li>
                ))}
              </ol>
              <div className="carousel-inner">
                  {this.props.slides.map((slide,i) => ( // may need to have to set first slide as "className" active
                    <div key={i} className={i===this.state.startAt ? "item active" : "item"}>
                        <AnchorDownload className="carousel-image-wrapper"
                                        identifier={this.props.identifier}
                                        filename={slide.filename}
                                        source={slide.source}
                                        title={I18nStr("Open full sized image")}
                                        disconnected={this.props.disconnected}>
                            <ImageDweb
                              className="rot0 carousel-image"
                              alt={I18nStr("item image")+" #1"}
                              source={slide.source}/>
                        </AnchorDownload>
                        <div className="carousel-caption">
                            {slide.filename}
                        </div>
                    </div>
                  ))}
              </div>
              <a className="left carousel-control" href="#ia-carousel" data-slide="prev" aria-label={I18nStr("Previous")}>
                  <span className="iconochive iconochive-left"></span>
              </a>
              <a className="right carousel-control" href="#ia-carousel" data-slide="next" aria-label={I18nStr("Next")}>
                  <span className="iconochive iconochive-right"></span>
              </a>
          </section>
      </div>
    )}
}
export {Carousel}