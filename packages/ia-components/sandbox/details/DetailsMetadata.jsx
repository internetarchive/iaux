import React from 'react';
import IAReactComponent from '../IAReactComponent';
import { AnchorSearch } from './AnchorSearch';
import {DetailsActionButtons, DetailsFlags} from './DetailsActionButtons';
import {DetailsReviews} from './DetailsReviews';
import DetailsCollectionList from './DetailsCollectionList';
import DetailsDownloadOptions from './DetailsDownloadOptions';
import { languageMapping } from '../../util.js';

/**
 *  List of metadata on details page
 *
 *  Renders as a <></> of div each containing in most, but not all cases a <span className=key> and <span className=value>
 *
 *  Behavior none for the component itself, most elements are clickable through to searches
 *
 * Technical Notes:
 *  The content has to be supplied as "metadata" and collection_titles and description,
 *  there is a wrapper in dweb-archive to do this in DetailsAboutWrapper
 *
 * <DetailsAbout>
 *   metadata: {}         As in ARCHIVEITEM.metadata or metadata API after processing to enforce strings and arrays
 *   description: string  Passed separately since needs to be preprocessed to eliminate hacks and to correct URLs
 *   files: [ArchiveFile] ArchiveFile or similar structure as in Files part of Metadata API
 *   files_count          Count of files
 *   collection_titles {COLLECTION: "COLLECTION TITLE"}    Mapping from collection to title of collection for any collection its a member of
 *   browser2archive      True if browser can see archive.org directly
 * />
 *
 */

const metadataListKeyStrings = { ocr: 'OCR', runtime: 'Run time', ppi: 'PPI' }; // Metadata with something other than capitalize first letter
const metadataListExclude = [
  // This list has metadata that should not be listed in a table because it is handled in some other way
  // "added-date", "adder",          // TODO see note below about "adder" and uncomment here when box added
  'backup_location', 'collection', 'creator', 'credits', 'curation', 'date', 'description', 'licenseurl', 'magnetlink', 'mediatype',
  'public', 'publicdate', 'publisher', 'subject', 'thumbnaillinks', 'title', 'updatedate', 'updater', 'uploader',
];

class AnchorSearches extends IAReactComponent {
  // Props field, value: array or string mapping: object (optional)
  render() {
    return (Array.isArray(this.props.value)
      ? this.props.value.map(v => (
        <span key={v}>
          <AnchorSearch field={this.props.field} value={v}>{v}</AnchorSearch>
          {' '}
        </span>
      ))
      : (
        <>
          <AnchorSearch key={this.props.field} field={this.props.field} value={this.props.value}>{this.props.mapping ? (this.props.mapping[this.props.value] || this.props.value) : this.props.value}</AnchorSearch>
          {' '}
        </>
      )
    );
  }
}
class DetailsMetadataField extends IAReactComponent {
  // Display a single field of metadata, allows for flexibility to handle a lot of the cases.
  // props: field=k value: v|[v*], mapping: {v: string},  className, role, itemprop
  constructor(props) {
    super(props);
    this.state.name = this.props.name
      || metadataListKeyStrings[this.props.field]
      || (this.props.field.charAt(0).toUpperCase() + this.props.field.substr(1));
  }

  render() {
    return !(this.props.value && this.props.value.length) ? null : (
      <div className={this.props.className} role={this.props.role}>
        <span className="key">{this.state.name}</span>
        {' '}
        <span className="value" itemProp={this.props.itemprop}>
          <AnchorSearches field={this.props.field} value={this.props.value} mapping={this.props.mapping} />
        </span>
      </div>
    );
  }
}

class DetailsMetadata extends IAReactComponent {
  // Props metadata, description

  // TODO-DETAILS note the structure of this has changed - see the difference in originals between multitrackaudio and mbid for example
  render() {
    const md = this.props.metadata; // Shortcut
    return (
      <>
        <h1 style={{ fontSize: '30px', marginBottom: 0 }}>
          <div className="left-icon">
            <span className={`iconochive-${md.mediatype} ${md.mediatype}`} aria-hidden="true" />
            <span
              className="sr-only"
            >
              {md.mediatype}
            </span>
          </div>
          <span itemProp="name">{md.title}</span>
        </h1>

        <div className="actions-ia">
          {/* TODO check if this is used anywhere */}
        </div>

        <DetailsMetadataField className="key-val-big" field="creator" value={md.creator} name="by" />
        <br />
        <DetailsMetadataField className="key-val-big" field="date" value={md.date} name="Publication date" itemprop="datePublished" />
        {!md.licenceurl ? null : ( // TODO this is wrong, its hard coding one specific licence
          <div className="key-val-big">
            Usage
            {' '}
            <a
              rel="license"
              title="http://creativecommons.org/licenses/by-nc-nd/2.0/"
              href="http://creativecommons.org/licenses/by-nc-nd/2.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://creativecommons.org/licenses/by-nc-nd/2.0/
              <img className="cclic" src="./images/cc/cc.png" />
              <img className="cclic" src="./images/cc/by.png" />
              <img className="cclic" src="./images/cc/nc.png" />
              <img className="cclic" src="./images/cc/nd.png" />
            </a>
          </div>
        ) }
        <DetailsMetadataField className="key-val-big" field="subject" value={md.subject} name="Topics" itemprop="keywords" />
        <DetailsMetadataField field="publisher" value={md.publisher} name="Publishers" itemprop="publisher" />
        <DetailsMetadataField field="contributor" value={md.contributor} name="Contributors" />
        <DetailsMetadataField className="key-val-big" field="language" value={md.language} name="Languages" mapping={languageMapping} />
        <div className="clearfix" />
        {/* Contains HTML (supposedly safe) inserted via innerHTML thing */}
        { !md.description ? null : (<div id="descript" itemProp="description" dangerouslySetInnerHTML={{ __html: this.props.description }} />)}
        { !md.credits ? null : (
          <>
            <h2 style={{ fontSize: '18px' }}>Credits</h2>
            <p className="content">{(md.credits || []).join(', ')}</p>
          </>
        )}

        <div className="metadata-expandable-list" role="list">
          {/* List of keys in the metadata that are not empty strings or empty arrays */}
          { Object.keys(md).filter(k => (!metadataListExclude.includes(k)) && md[k] && md[k].length).map(k => (
            <DetailsMetadataField key={k} field={k} value={md[k]} role="listitem" />))
          }
        </div>
      </>
    );
  }
}


class DetailsAbout extends IAReactComponent {
  // Props  metadata description files files_count collection_titles  browser2archive

  render() {
    /* This sits underneth theatre-ia-wrap DIV that is built by theatreIaWrap */
    const md = this.props.metadata;
    //TODO-DETAILS note the structure of this has changed - see the difference in originals between multitrackaudio and mbid for example
    return (
      <div className="container container-ia item-details-about">
        <div className="relative-row row">
          <div className="thats-right" style={{textAlign:"right"}}>
            <DetailsActionButtons identifier={md.identifier} title={md.title} browser2archive={this.props.browser2archive} />
          </div>
          {/*-- flag initialization moved to browserAfter() --*/}
          <div className="col-sm-8 thats-left item-details-metadata">
            <DetailsMetadata metadata={md}
                             description={this.props.description}/>
            {/* TODO need an dweb way to submit a review*/}
            <DetailsReviews reviews={this.reviews}
                            writeReviewsURL={`https://archive.org/write-review.php?identifier=${md.identifier}`}/>
          </div>
          {/*--/.col-md-10--*/}
          <div className="col-sm-4 thats-right item-details-archive-info">
            {/*TODO need section className=boxy item-stats-summary- not obvious where data from, its not in metadata */}
            <DetailsDownloadOptions identifier={md.identifier} files={this.props.files} files_count={this.props.files_count} browser2archive={this.props.browser2archive}/>
            <DetailsCollectionList collections={md.collection} collectionTitles={this.props.collection_titles}/>
            {/* <DetailsUploaderBox identifier={} name={} date={}> see https://github.com/internetarchive/dweb-archive/issues/24 */}
          </div>
        </div>
      </div>
    );
  }

}
export { DetailsMetadata, DetailsAbout };

