// import React from '../../ReactFake';
import React from 'react';
import IAReactComponent from '../IAReactComponent';
import { ImageDweb } from '../details/Image';

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
   *  On Render Dweb: Renders a <Img> and then an img is retrieved decentralized and inserted TODO (maybe) make an outer component setState and rerender
   *  On Render !Dweb: Render an <img> just like normal
   *  On Click enclosing component should be directing click to navigate to the item
   */

  render() {
    return <ImageDweb
      className={this.props.className}
      src={`https://archive.org/services/img/${this.props.identifier}`}
      alt={this.props.identifier}
      imgname={this.props.imgname}/>;
  }
}
