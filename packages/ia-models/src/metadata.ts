import { MetadataField } from './metadata-field';
import { Duration, IAStringParser, IANumberParser, IADateParser, IADurationParser } from './ia-field-parsers';

export default class Metadata {
  collection?: MetadataField<string, IAStringParser>;
  track?: MetadataField<number, IANumberParser>;
  date?: MetadataField<Date, IADateParser>;
  duration?: MetadataField<Duration, IADurationParser>
  indexdate?: MetadataField<Date, IADateParser>;

  constructor(json: any) {
    let stringParser: IAStringParser = new IAStringParser();
    let numberParser: IANumberParser = new IANumberParser();
    let dateParser: IADateParser = new IADateParser();
    let durationParser: IADurationParser = new IADurationParser();

    this.collection = new MetadataField(json.collection, stringParser);
    this.track = new MetadataField(json.track, numberParser);
    this.date = new MetadataField(json.date, dateParser);
    this.duration = new MetadataField(json.duration, durationParser);
  }
}
