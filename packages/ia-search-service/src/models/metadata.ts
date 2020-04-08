import { DateField, StringField, NumberField, DurationField } from './metadata-fields/field-types';

export class Metadata {
  rawResponse: any;
  identifier: string;

  collection: StringField;
  track: NumberField;
  date: DateField;
  duration: DurationField;
  indexdate: DateField;

  constructor(json: any) {
    this.rawResponse = json;
    this.identifier = json.identifier;

    this.collection = new StringField(json.collection);
    this.track = new NumberField(json.track);
    this.date = new DateField(json.date);
    this.indexdate = new DateField(json.indexdate);
    this.duration = new DurationField(json.duration);
  }
}
