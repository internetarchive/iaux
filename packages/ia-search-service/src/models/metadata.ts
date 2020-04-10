/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import { DateField, StringField, NumberField, DurationField } from './metadata-fields/field-types';

/**
 * Metadata is an expansive model that describes an Item.
 *
 * The fields in here get casted to their respective field types. See `metadata-fields/field-type`.
 *
 * Add additional fields as needed.
 *
 * @export
 * @class Metadata
 */
export class Metadata {
  /**
   * This is the raw metadata reponse; useful for inspecting the raw data returned from the server.
   *
   * @type {*}
   * @memberof Metadata
   */
  rawMetadata: any;

  identifier: string;

  collection: StringField;

  creator: StringField;

  mediatype: StringField;

  track: NumberField;

  date: DateField;

  duration: DurationField;

  indexdate: DateField;

  downloads: NumberField;

  title: StringField;

  num_reviews: NumberField;

  description: StringField;

  constructor(json: any) {
    this.rawMetadata = json;
    this.identifier = json.identifier;

    this.collection = new StringField(json.collection);
    this.track = new NumberField(json.track);
    this.date = new DateField(json.date);
    this.indexdate = new DateField(json.indexdate);
    this.duration = new DurationField(json.duration);
    this.creator = new StringField(json.creator);
    this.mediatype = new StringField(json.mediatype);
    this.downloads = new NumberField(json.downloads);
    this.title = new StringField(json.title);
    this.num_reviews = new NumberField(json.num_reviews);
    this.description = new StringField(json.description);
  }
}
