import React from 'react';
import IAReactComponent from '../IAReactComponent';
import { ObjectFilter } from '../../util';

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

class AnchorDownload extends IAReactComponent {
  constructor(props) {
    super(props);

    // this.props passes identifier which is required for Dweb, but typically also passes tabIndex, class, title
    this.state.url = new URL(((this.props.filename && typeof this.props.filename === 'string') // filename = foo.jpg
      ? `https://archive.org/download/${this.props.identifier}/${this.props.filename}`
      : (this.props.source && Array.isArray(this.props.source) && this.props.source.length === 1) // source = [ArchiveFile]
        ? `https://archive.org/download/${this.props.identifier}/${this.props.source[0].metadata.name}`
        : this.props.format // source = [ArchiveFile]
        // Note - this is a broken, illegal URL with an '&' in middle of the URL not the parameters but that is what IA requires
          ? `https://archive.org/compress/${this.props.identifier}/formats=${this.props.format}&file=/${this.props.identifier}.zip`
          : (typeof DwebArchive === 'undefined') // just identifier e.g. "ShowAll" on DetailsDownloadOptions"
            ? `https://archive.org/download/${this.props.identifier}`   // identifier only, !Dweb
            : `https://dweb.archive.org/download/${this.props.identifier}`)); // identifier only, dweb
    const usp = new URLSearchParams();
    // Copy any parameters in AnchorDownload.urlparms to usp for inclusion in the href=
    AnchorDownload.urlparms.forEach(k => usp.append(k, this.props[k]));
    this.state.url.search = usp; // Note this copies, not updatable
    // Copy any parameters not specified in AnchorDownload.urlparms to anchorProps for inclusion in the <a>
    this.state.anchorProps = ObjectFilter(this.props, (k, unusedV) => !AnchorDownload.urlparms.includes(k));
  }

  clickCallable(unusedEvent) {
    // Note this is only called in dweb; !Dweb has a direct href and on Dweb source is (currently) always set.
    // TODO-DWEB its likely that this is not correct for those that should go to ".../compress/..."
    debug('Clicking on link to download: %s', this.props.identifier);
    // noinspection JSIgnoredPromiseFromCall,JSUnresolvedFunction
    if (this.props.source) {
      DwebArchive.Nav.nav_download(this.props.source, {wanthistory: true});
    } else { // No source, must be plain identifier
      DwebArchive.Nav.nav_downloaddirectory(this.props.identifier, {wanthistory: true});
    }
    return false; // Stop event propagating
  }

  render() {
    // Note that anchorProps are passed on from constructor to the Anchor,
    return ( // Note there is intentionally no spacing in case JSX adds a unwanted line break
      (typeof DwebArchive === 'undefined')
        ? <a href={this.state.url.href} {...this.state.anchorProps} rel="noopener noreferrer" target="_blank">{this.props.children}</a>
        : // This is the Dweb version for React|!React
        <a href={this.state.url.href} onClick={this.onClick} {...this.state.anchorProps}>{this.props.children}</a>
    );
  }
}
AnchorDownload.urlparms = []; // Properties that go in the URL to download
// Other props are passed to anchor,
// known inuse include: className, source, title, data-toggle data-placement data-container target

export { AnchorDownload }