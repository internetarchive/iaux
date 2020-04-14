/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import {
  DateField,
  StringField,
  NumberField,
  DurationField,
  BooleanField,
} from './metadata-fields/field-types';

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

  addeddate: DateField;

  audio_codec: StringField;

  audio_sample_rate: NumberField;

  collection: StringField;

  contributor: StringField;

  coverage: StringField;

  creator: StringField;

  date: DateField;

  description: StringField;

  downloads: NumberField;

  duration: DurationField;

  indexdate: DateField;

  language: StringField;

  length: DurationField;

  mediatype: StringField;

  noindex: BooleanField;

  num_reviews: NumberField;

  publicdate: DateField;

  start_localtime: DateField;

  start_time: DateField;

  stop_time: DateField;

  subject: StringField;

  title: StringField;

  track: NumberField;

  uploader: StringField;

  utc_offset: NumberField;

  year: NumberField;

  constructor(json: any) {
    this.rawMetadata = json;
    this.identifier = json.identifier;

    this.addeddate = new DateField(json.addeddate);
    this.audio_codec = new StringField(json.audio_codec);
    this.audio_sample_rate = new NumberField(json.audio_sample_rate);
    this.collection = new StringField(json.collection);
    this.contributor = new StringField(json.contributor);
    this.coverage = new StringField(json.coverage);
    this.creator = new StringField(json.creator);
    this.date = new DateField(json.date);
    this.description = new StringField(json.description);
    this.downloads = new NumberField(json.downloads);
    this.duration = new DurationField(json.duration);
    this.indexdate = new DateField(json.indexdate);
    this.language = new StringField(json.language);
    this.length = new DurationField(json.length);
    this.mediatype = new StringField(json.mediatype);
    this.noindex = new BooleanField(json.noindex);
    this.num_reviews = new NumberField(json.num_reviews);
    this.publicdate = new DateField(json.publicdate);
    this.start_localtime = new DateField(json.start_localtime);
    this.start_time = new DateField(json.start_time);
    this.stop_time = new DateField(json.stop_time);
    this.subject = new StringField(json.subject);
    this.title = new StringField(json.title);
    this.track = new NumberField(json.track);
    this.uploader = new StringField(json.uploader);
    this.utc_offset = new NumberField(json.utc_offset);
    this.year = new NumberField(json.year);
  }
}
