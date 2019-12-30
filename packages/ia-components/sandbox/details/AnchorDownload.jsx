/* global DwebArchive, Nav */
/* eslint-disable max-len, no-nested-ternary, object-curly-newline, react/destructuring-assignment, react/prop-types */
import React from 'react';
import { ObjectFilter } from '../../util';

const eachSeries = require('async/eachSeries');

const debug = require('debug')('ia-components:AnchorDownload');

/**
 * Component used as an anchor where it should engage part of the download functionality.
 * It a clone of AnchorDetails with only minor changes
 *
 * Behavior:
 * On construction we work out the appropriate URL depending on the props,
 *   this is complex see constructor()
 *
 * On click - behavior varies between Dweb and IAUX
 *      Dweb:   download the source property via DwebArchive.Nav.nav_download
 *      !Dweb:  normal Anchor behavior to go to the href
 *
 * Technical:
 *  AnchorDetails, AnchorSearch and to a lesser extend AnchorDownload are almost the same, changes on one probably need to be propogated to the others
 *
 * <AnchorDownload
 *  identifier  of item
 *  filename    Name of file to download
 *  source      [ArchiveFile]
 *  format      argument to formats parameter
 *              - if this is present we'll download the .../compress/IDENTIFIER/formats=FORMAT
 *  disconnected - true if browser cant reach the archive for direct links
 *  any other properties wil be passed to Url if in urlparms and to Anchor otherwise
 * >
 *  children...
 * </AnchorDownload>
 *
 * Technical notes:
 *    Several cases and examples are handled including: (DDO = DetailsDownloadOptions)
 *    !source e.g. "Show All" in DDO => download/IDENTIFIER or on dweb: downloadDirectory(identifier)
 *    format e.g. any format line in DDO => download/identifier/formats=FORMAT&file=IDENTIFIER.zip  dweb - nav_download which iterates over files
 *  Any other properties are passed to the <a />
 *
 */

function downloadUrl(el, url, fileName, options) {
  // Weird workaround for a browser problem, download data as a blob,
  // edit parameters of an anchor to open this file in a new window,
  // and click it to perform the opening.
  // browser.downloads.download({filename: this.metadata.name, url: objectURL});   //Doesnt work
  // Downloads.fetch(objectURL, this.metadata.name);   // Doesnt work
  const a = document.createElement('a');
  a.href = url;
  a.target = (options && options.target) || '_blank'; // Open in new window by default
  a.onclick = undefined;
  a.download = fileName;
  a.click();
  document.removeChild(a);
  // URL.revokeObjectURL(url)    //TODO figure out when can do this - maybe last one, or maybe dont care?
}

function downloadViaAnchor(el, source, options, cb) {
  if (Array.isArray(source)) {
    // Note cant do these in parallel as it does odd stuff to "el" to work around a browser bug
    eachSeries(source,
      (s, cb1) => { downloadViaAnchor(el, s, options, cb1); },
      (err) => { if (cb) cb(err) });
  } else { // TODO could also handle source being a string
    source.blobUrl((err, url) => {
      if (err) {
        debug('ERROR: failed to download %s', err.message);
        cb(null); // Ignore and move on to next one
      } else {
        downloadUrl(el, url, source.metadata.name, options);
        cb(null);
      }
    });
  }
}

function reachable({ disconnected, source, identifier, filename }) {
  // Note that multi element arrays arent reachable if disconnected because they need "compress" which we dont currently support on dweb-mirror
  return (!disconnected
    || (source
      ? (Array.isArray(source) ? source.every(s => s.downloaded) : source.downloaded )
      : (identifier && !filename) // Just an identifier = want directory
    ));
}
class AnchorDownload extends React.Component {
  constructor(props) {
    // TODO-NAMING check that these urls get routed - if just anchors then have problems on dweb-mirror
    super(props);
    this.onClick = this.onClick.bind(this);
    // TODO-STATE this might have the issue of constructor not being re-run and needing componentDidMount catch
    // this.props passes identifier which is required for Dweb, but typically also passes tabIndex, class, title
    const url = new URL((this.props.filename && typeof this.props.filename === 'string') // filename = foo.jpg
      ? `https://archive.org/download/${this.props.identifier}/${this.props.filename}`
      : (this.props.source && Array.isArray(this.props.source) && this.props.source.length === 1) // source = [ArchiveFile]
        ? `https://archive.org/download/${this.props.identifier}/${this.props.source[0].metadata.name}`
        : this.props.format // source = [ArchiveFile]
          // Note - this is a broken, illegal URL with an '&' in middle of the URL not the parameters but that is what IA requires
          ? `https://archive.org/compress/${this.props.identifier}/formats=${this.props.format}&file=/${this.props.identifier}.zip`
          // just identifier e.g. "ShowAll" on DetailsDownloadOptions"
          // identifier only, !Dweb or Dweb as Dweb will handle through onClick anyway
          : `https://archive.org/download/${this.props.identifier}`);
    // url is not routed() because only used by non-Dweb, Dweb uses onClick
    this.state = { url }
    const usp = new URLSearchParams();
    // Copy any parameters in AnchorDownload.urlparms to usp for inclusion in the href=
    AnchorDownload.urlparms.forEach(k => usp.append(k, this.props[k]));
    this.state.url.search = usp; // Note this copies, not updatable
    // Copy any parameters not specified in AnchorDownload.urlparms to anchorProps for inclusion in the <a>
    this.state.anchorProps = ObjectFilter(this.props,
      (k, unusedV) => (!AnchorDownload.urlparms.includes(k) && !['disconnected'].includes(k)));
  }

  onClick(ev) {
    // Note this is only called in dweb; !Dweb has a direct href and on Dweb source is (currently) always set.
    // TODO-DWEB its likely that this is not correct for those that should go to ".../compress/..."
    debug('Clicking on link to download: %s', this.props.identifier);
    // noinspection JSIgnoredPromiseFromCall,JSUnresolvedFunction
    if (this.props.source) {
      downloadViaAnchor(ev.currentTarget, this.props.source)
    } else { // No source, must be plain identifier
      Nav.factory(this.props.identifier, {wanthistory: true, download: 1}); // ignore promise
    }
    ev.preventDefault(); // Prevent it going to the anchor (equivalent to "return false" in non-React
  }

  render() {
    // Note that anchorProps are passed on from constructor to the Anchor,
    return ( // Note there is intentionally no spacing in case JSX adds a unwanted line break /
      // /TODO-GREY this could be CSS instead of removed
      typeof DwebArchive === 'undefined'
        ? <a href={this.state.url.href} {...this.state.anchorProps} rel="noopener noreferrer" target="_blank">{this.props.children}</a>
        : reachable(this.props) // Its Dweb, but is it reachable (uses props. disconnected, source, identifier, filename)
        ? <a href={this.state.url.href} onClick={this.onClick} {...this.state.anchorProps}>{this.props.children}</a>
        : null
    );
  }
}
AnchorDownload.urlparms = []; // Properties that go in the URL to download
// Other props are passed to anchor,
// known inuse include: className, source, title, data-toggle data-placement data-container target

export { AnchorDownload, reachable }