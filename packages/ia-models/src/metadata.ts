import { MetadataField } from './metadata-field';
import {
  Duration, IAStringParser, IANumberParser, IADateParser, IADurationParser
} from './ia-field-parsers';

class Metadata {
  identifier: string;

  collection: MetadataField<string, IAStringParser>;

  track?: MetadataField<number, IANumberParser>;

  date?: MetadataField<Date, IADateParser>;

  duration?: MetadataField<Duration, IADurationParser>;

  indexdate?: MetadataField<Date, IADateParser>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(json: any) {
    const stringParser: IAStringParser = new IAStringParser();
    const numberParser: IANumberParser = new IANumberParser();
    const dateParser: IADateParser = new IADateParser();
    const durationParser: IADurationParser = new IADurationParser();

    this.identifier = json.identifier;

    this.collection = new MetadataField(json.collection, stringParser);

    if (json.track) {
      this.track = new MetadataField(json.track, numberParser);
    }

    if (json.date) {
      this.date = new MetadataField(json.date, dateParser);
    }

    if (json.duration) {
      this.duration = new MetadataField(json.duration, durationParser);
    }
  }
}

export { Metadata };
