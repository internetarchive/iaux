import React from 'react';
import IAReactComponent from '../IAReactComponent';
import { formats } from '../../util.js';
import { AnchorDownload } from './AnchorDownload';
import { I8nSpan, I8nStr, I8nIcon } from "../../../../../dweb-archive/components/Languages";

/**
 *  The Download Options box on the details page
 *
 *  Renders as a list of file types and other download options.
 *
 *  Behavior
 *    constructor: none for the component itself, but each file or group of files is an anchor to download using AnchorDownload
 *    render: builds a dictionary of formats, and then renders from this (functionality could be in constructor)
 *
 * <DetailsDownloadOptions
 *   identifier="AboutBan1935"      Identifier of item
 *   files_count=10                 Number of files in the item
 *   files=[ArchiveFile*]           Array of ArchiveFiles or of objects {metadata{format, name, source}} but they must have a method .downloadable()
 *   disconnected                   True if browser cant see archive directly (to access compressed zips)
 * />
 */

export default class DetailsDownloadOptions extends IAReactComponent {

  constructor(props) {
    super(props); //disconnected
  }

  downloadableFilesDict() {
    return this.props.files.reduce((res, af) => {
      const format = af.metadata.format;
      const formatInfo = formats("format", format);
      if (formatInfo && !!formatInfo.downloadable) { // Note on image it EXCLUDED JPEG Thumb, but included JPEG*Thumb
        if (!res[format]) { res[format] = []; }
        res[format].push(af);
      }
      return res;
    }, {});
  }


  render() {
    // Build a dictionary of file formats
    //TODO Add the 'reachable' test in Anchor Download to this filter

    const downloadableFilesDict = this.downloadableFilesDict();
    const filesCount = this.props.files_count;
    const originalFilesCount = this.props.files.filter(f => f.metadata.source === 'original').length + 1; // Adds in Archive BitTorrent
    const compressURL = `https://archive.org/compress/${this.props.identifier}`; // leave as direct link, else need to zip and store each item in IPFS
    const compressAllURL = `https://archive.org/compress/${this.props.identifier}/formats=JSON,METADATA,JPEG,ARCHIVE BITTORRENT,MUSICBRAINZ METADATA`; // As above leave as direct
    return (
      <section className="boxy item-download-options">
        <div className="download-button" role="heading" aria-level="5"><I8nSpan en="DOWNLOAD OPTIONS"/></div>
        {Object.keys(downloadableFilesDict).sort().map(k => (
          <div className="format-group" key={k}>
            <div className="summary-rite">
              <AnchorDownload className="stealth" identifier={this.props.identifier} format={k} source={downloadableFilesDict[k]} title={k} disconnected={this.props.disconnected}>
                <span className="hover-badge-stealth">
                  <I8nIcon className="iconochive-download" en="download"/>
                  {downloadableFilesDict[k].length} {' '} {I8nStr("files")}
                </span>
              </AnchorDownload>
            </div>
            {/* TODO on archive.org this pops up when hovered over */}
            <AnchorDownload
              className="format-summary download-pill"
              identifier={this.props.identifier}
              format={k}
              source={downloadableFilesDict[k]}
              title={k}
              data-toggle="tooltip"
              data-placement="auto left"
              data-container="body"
              target="_blank"
              disconnected={this.props.disconnected}
            >
              {formats('format', k).downloadable}
              {' '}
              <I8nIcon className="iconochive-download" en="download"/>
            </AnchorDownload>
          </div>
        ))}
        <div className="show-all">
          {(this.props.disconnected) ? null :
            <div className="pull-right">
              <a className="boxy-ttl hover-badge" href={compressURL}>
                <I8nIcon className="iconochive-download" en="download"/>
                {' '}{filesCount}{' '}{I8nStr("Files")}
              </a>
              <br/>
              <a className="boxy-ttl hover-badge" href={compressAllURL}>
                <I8nSpan className="iconochive-download" en="download"/>
                {originalFilesCount}{' '}{I8nStr("Original")}
              </a>
              <br/>
            </div>
          }
          <AnchorDownload className="boxy-ttl" identifier={this.props.identifier} disconnected={this.props.disconnected}><I8nSpan en="SHOW ALL"/></AnchorDownload>
          <br clear="all" className="clearfix" />
        </div>
      </section>
    );
  }
}
