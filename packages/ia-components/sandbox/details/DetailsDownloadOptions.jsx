import React from 'react';
import { formats, downloadableFormat } from '../../util';
import { AnchorDownload } from './AnchorDownload';
import { I18nSpan, I18nStr, I18nIcon } from '../languages/Languages';
/* eslint-disable prefer-destructuring, operator-linebreak, max-len */
/* eslint-disable react/destructuring-assignment, react/prop-types, react/jsx-one-expression-per-line */
/* global DwebArchive */

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

export default class DetailsDownloadOptions extends React.Component {
  downloadableFilesDict() {
    return this.props.files.reduce((res, af) => {
      const format = af.metadata.format;
      if (downloadableFormat(format)) {
        if (!res[format]) { res[format] = []; }
        res[format].push(af);
      }
      return res;
    }, {});
  }


  render() {
    // Build a dictionary of file formats
    // TODO Add the 'reachable' test in Anchor Download to this filter
    // TODO See https://github.com/internetarchive/dweb-mirror/issues/246 for missing files issue

    const downloadableFilesDict = this.downloadableFilesDict();
    const filesCount = this.props.files_count;
    const originalFilesCount = this.props.files.filter(f => f.metadata.source === 'original').length + 1; // Adds in Archive BitTorrent
    const compressURL = `https://archive.org/compress/${this.props.identifier}`; // leave as direct link, else need to zip and store each item in IPFS
    const compressAllURL = `https://archive.org/compress/${this.props.identifier}/formats=JSON,METADATA,JPEG,ARCHIVE BITTORRENT,MUSICBRAINZ METADATA`; // As above leave as direct
    // noinspection HtmlUnknownTarget,JSUnresolvedVariable
    return (
      <section className="boxy item-download-options">
        <div className="download-button" role="heading" aria-level="5"><I18nSpan en="DOWNLOAD OPTIONS" /></div>
        {Object.keys(downloadableFilesDict).sort().map(k => (
          <div className="format-group" key={k}>
            <div className="summary-rite">
              <AnchorDownload className="stealth" identifier={this.props.identifier} format={k} source={downloadableFilesDict[k]} title={k} disconnected={this.props.disconnected}>
                <span className="hover-badge-stealth">
                  <I18nIcon className="iconochive-download" en="download" />
                  {downloadableFilesDict[k].length} {' '} {I18nStr('files')}
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
              <I18nIcon className="iconochive-download" en="download" />
            </AnchorDownload>
            {(typeof DwebArchive === 'undefined' || !DwebArchive.mirror || (k !== 'Epub')) ? null : (
              <a href={`/epubreader/index.html?bookPath=/download/${this.props.identifier}/${downloadableFilesDict[k][0].metadata.name}`} title="Read online">
                <I18nIcon className="iconochive-eye" en="Read online" />
              </a>
            )}
          </div>
        ))}
        <div className="show-all">
          {(this.props.disconnected) ? null : (
            <div className="pull-right">
              <a className="boxy-ttl hover-badge" href={compressURL}>
                <I18nIcon className="iconochive-download" en="download" />
                {' '}{filesCount}{' '}{I18nStr('Files')}
              </a>
              <br />
              <a className="boxy-ttl hover-badge" href={compressAllURL}>
                <I18nSpan className="iconochive-download" en="download" />
                {originalFilesCount}{' '}{I18nStr('Original')}
              </a>
              <br />
            </div>
          )}
          <AnchorDownload className="boxy-ttl" identifier={this.props.identifier} disconnected={this.props.disconnected}><I18nSpan en="SHOW ALL" /></AnchorDownload>
          <br clear="all" className="clearfix" />
        </div>
      </section>
    );
  }
}

// Code review Mitra 2019-11-15 exc HTML comparison
