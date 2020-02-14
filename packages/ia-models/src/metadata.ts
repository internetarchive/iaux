import { MetadataField } from './metadata-field';
import { Duration, IAStringParser, IANumberParser, IADateParser, IADurationParser } from './ia-field-parsers';

export default class Metadata {
  collection?: MetadataField<string, IAStringParser>;
  track?: MetadataField<number, IANumberParser>;
  date?: MetadataField<Date, IADateParser>;
  duration?: MetadataField<Duration, IADurationParser>
  indexdate?: MetadataField<Date, IADateParser>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    const stringParser: IAStringParser = new IAStringParser();
    const numberParser: IANumberParser = new IANumberParser();
    const dateParser: IADateParser = new IADateParser();
    const durationParser: IADurationParser = new IADurationParser();

    this.collection = new MetadataField(json.collection, stringParser);
    this.track = new MetadataField(json.track, numberParser);
    this.date = new MetadataField(json.date, dateParser);
    this.duration = new MetadataField(json.duration, durationParser);
  }
}
