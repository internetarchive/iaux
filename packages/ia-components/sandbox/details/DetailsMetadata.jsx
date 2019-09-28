import React from 'react';
import IAReactComponent from '../IAReactComponent';
import { AnchorSearch } from './AnchorSearch';
import {DetailsActionButtons, DetailsFlags} from './DetailsActionButtons';
import {DetailsReviews} from './DetailsReviews';
import DetailsCollectionList from './DetailsCollectionList';
import DetailsDownloadOptions from './DetailsDownloadOptions';
import { languageMapping } from '../../util.js';
import { I18nSpan, I18nIcon } from "../languages/Languages";

const metadataListKeyStrings = { ocr: 'OCR', runtime: 'Run time', ppi: 'PPI' }; // Metadata with something other than capitalize first letter
const metadataListExclude = [
  // This list has metadata that should not be listed in a table because it is handled in some other way
  'backup_location', 'collection', 'creator', 'credits', 'curation', 'date', 'description', 'licenseurl', 'magnetlink', 'mediatype',
  'public', 'publicdate', 'publisher', 'subject', 'thumbnaillinks', 'title', 'updatedate', 'updater', 'uploader',
];

class AnchorSearches extends IAReactComponent {
  /**
   * Render a list of <AnchorSearch> for one or more values in a specific field
   *
   * <AnchorSearches
   *    field=STRING    Search for value(s) in this field
   *    value=STRING || [STRING*] Either a string, or a series of alternatives
   *    itemProp=STRING optional, for search engines TODO pass this down to AnchorSearch (should be in a span wrapping the value)
   *  />
   */
  // Props field, value: array or string mapping: object (optional)
  render() {
    return (Array.isArray(this.props.value)
      ? this.props.value.map(v => (
        <span key={v}>
          <AnchorSearch field={this.props.field} value={v} rel="nofollow" itemProp={this.props.itemProp}>{v}</AnchorSearch>
          {' '}
        </span>
      ))
      : (
        <>
          <AnchorSearch key={this.props.field} field={this.props.field} value={this.props.value} rel="nofollow">{this.props.mapping ? (this.props.mapping[this.props.value] || this.props.value) : this.props.value}</AnchorSearch>
          {' '}
        </>
      )
    );
  }
}
class DetailsMetadataField extends IAReactComponent {
  /**
   * Display a single field of metadata, allows for flexibility to handle a lot of the cases.
   *
   * <DetailsMetadataField
   *    name=ENSTRING               Override default name for field
   *    field=METADATAFIELD       Metadata Field Name (will be translated for display, but not for function)
   *    value=STRING | [STRING*]  Value(s) in that field (will not be translated)
   *    itemProp=STRING           Optional - for search engines (will not be translated)
   * />
   *
   * Behavior on rendering:
   *  Determines the name for the field, using the `name` prop, or a mapping in here, or by uppercasing the first character
   *  Values are rendered as anchors to searches
   */
  // props: field=k value: v|[v*], mapping: {v: string},  className, role, itemProp
  constructor(props) {
    super(props);
    this.state.name = this.props.name //TODO-I8N separate translation table for metadata fields - mapping Capitalized string
      || metadataListKeyStrings[this.props.field]
      || (this.props.field.charAt(0).toUpperCase() + this.props.field.substr(1)); //TODO-I8N should really use locale dependent capitalization BUT capitalized field is translated
  }

  render() {
    return !(this.props.value && this.props.value.length) ? null : (
      <dl className="metadata-definition">
        <dt>{this.state.name}</dt>
        <dd><AnchorSearches field={this.props.field} value={this.props.value} mapping={this.props.mapping}
                            itemProp={this.props.itemProp} /></dd>
      </dl>
    );
  }
}


class DetailsMetadataTitle extends IAReactComponent {
  /**
   * Displays the metadata title and by-line for this item,
   *
   * <DetailsMetadataTitle
   *  metadata=OBJECT   metadata object as returned by API after sanitizing (will not be translated)
   * />
   *
   * Behavior on rendering:
   *  Displays title, icon and byline to go above metadata
   */
  render() {
    const md = this.props.metadata;
    return (
      <>
        <h1 style={{ fontSize: '30px', marginBottom: 0 }}>
          <div className="left-icon">
            <I18nIcon className={`iconochive-${md.mediatype} ${md.mediatype}`} en={md.mediatype}/>
          </div>
          <span itemProp="name">{md.title}</span>
        </h1>
        {/*Note archive.org wraps inside dd with a span but only for this field*/}
        <DetailsMetadataField field="creator" value={md.creator} name="by" />
      </>
    )
  }
}
class DetailsMetadata extends IAReactComponent {
  /**
   * Displays the metadata for this item,
   *
   * <DetailsMetadata
   *  metadata=OBJECT   metadata object as returned by API after santizing
   *  description=STRING  sanitized description (i.e. unsafe HTML stripped out and multiple values concatenated)
   * />
   *
   * Behavior on rendering:
   *  Displays some known metadata fields, then displays the rest using default behaviors
   */

  // TODO-DETAILS note the structure of this has changed - see the difference in originals between multitrackaudio and mbid for example
  // TODO-DETAILS https://github.com/internetarchive/dweb-archive/issues/130
  render() {
    const md = this.props.metadata; // Shortcut
    return (
      <>
        <div className="row metadata-list" role="list">
          <DetailsMetadataField field="date" value={md.date} name="Publication date" itemProp="datePublished" />
          {!md.licenceurl ? null : ( // TODO this is wrong, its hard coding one specific licence
            <dl className="metadata-definition">
              <dt><I18nSpan en="Usage"/></dt>
              <dd>
                <a
                  rel="license"
                  title="http://creativecommons.org/licenses/by-nc-nd/2.0/"
                  href="http://creativecommons.org/licenses/by-nc-nd/2.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                ><I18nSpan en="Attribution-NonCommercial-NoDerivs"/>
                  <img className="cclic" src="./images/cc/cc.png" />
                  <img className="cclic" src="./images/cc/by.png" />
                  <img className="cclic" src="./images/cc/nc.png" />
                  <img className="cclic" src="./images/cc/nd.png" />
                </a>
              </dd>
            </dl>
          ) }
          <DetailsMetadataField field="subject" value={md.subject} name="Topics" itemProp="keywords" />
          <DetailsMetadataField field="publisher" value={md.publisher} name="Publishers" itemProp="publisher" />
          <DetailsMetadataField field="sponsor" value={md.sponsor} name="Sponsor" itemProp="sponsor" />
          <DetailsMetadataField field="contributor" value={md.contributor} name="Contributors" />
          <DetailsMetadataField className="key-val-big" field="language" value={md.language} name="Languages" mapping={languageMapping} />
        </div>
        <div className="clearfix" />
        {/* Contains HTML (supposedly safe) inserted via innerHTML thing */}
        { !md.description ? null : (
          <div id="descript" itemProp="description" dangerouslySetInnerHTML={{ __html: this.props.description }} />
        )}
        { !md.credits ? null : ( // TODO postprocess Credits like description esp \n to <br> as in item=commute
          <>
            <h2 style={{ fontSize: '18px' }}><I18nSpan en="Credits"/></h2>
            <p className="content">{(md.credits || []).join(', ')}</p>
          </>
        )}

        <div className="metadata-expandable-list" role="list">
          {/* List of keys in the metadata that are not empty strings or empty arrays */}
          { Object.keys(md).filter(k => (!metadataListExclude.includes(k)) && md[k] && md[k].length).map(k => (
            <DetailsMetadataField key={k} field={k} value={md[k]} />))
          }
        </div>
      </>
    );
  }
}


class DetailsAbout extends IAReactComponent {
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
  *   reviews: [ {}* ]    See DetailsReviews for structure
  *   files_count          Count of files
  *   collection_titles {COLLECTION: "COLLECTION TITLE"}    Mapping from collection to title of collection for any collection its a member of
  *   disconnected      True if browser cannot see archive.org directly
  * />
  */

  constructor(props) {
    super(props);
  }
  render() {
    /* This sits underneth theatre-ia-wrap DIV that is built by theatreIaWrap */
    const md = this.props.metadata;
    //TODO-DETAILS note the structure of this has changed - see the difference in originals between multitrackaudio and mbid for example
    // TODO-DETAILS https://github.com/internetarchive/dweb-archive/issues/130
    return (
      <>
        <div className="container container-ia item-details-about"></div>
        <div className="container container-ia width-max relative-row-wrap">
        </div>
        <div className="container container-ia width-max relative-row-wrap info-top">
          <div className="container container-ia">
            <div className="relative-row row">
              <div className="thats-right col-sm-4 col-sm-push-8">
                <DetailsActionButtons identifier={md.identifier} title={md.title} disconnected={this.props.disconnected} />
              </div>
              <div className="thats-left item-details-metadata col-sm-8 col-sm-pull-4">
                <DetailsMetadataTitle metadata={md}/>
                <br/>
              </div>
            </div>
          </div>
        </div>
        <div className="container container-ia width-max relative-row-wrap">
          <div className="container container-ia">
            <div className="relative-row row">
              <div className="col-sm-8 thats-left item-details-metadata">
                <div className="actions-ia">
                </div>
                <DetailsMetadata metadata={md}
                                 description={this.props.description}/>
                {/* TODO need an dweb way to submit a review*/}
                <DetailsReviews reviews={this.props.reviews} disconnected={this.props.disconnected}
                                writeReviewsURL={`https://archive.org/write-review.php?identifier=${md.identifier}` }/>
              </div>
              <div className="col-sm-4 thats-right item-details-archive-info">
                {/*TODO need section className=boxy item-stats-summary- not obvious where data from, its not in metadata */}
                <DetailsDownloadOptions identifier={md.identifier} files={this.props.files} files_count={this.props.files_count} disconnected={this.props.disconnected}/>
                <DetailsCollectionList collections={md.collection} collectionTitles={this.props.collection_titles}/>
                {/* <DetailsUploaderBox identifier={} name={} date={}> see https://github.com/internetarchive/dweb-archive/issues/24 */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

}
export { DetailsMetadata, DetailsAbout };

