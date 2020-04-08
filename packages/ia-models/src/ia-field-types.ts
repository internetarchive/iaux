import { MetadataField } from "./metadata-field";
import { Duration, IADateParser, IADurationParser, IANumberParser, IAStringParser } from "./ia-field-parsers";

class SharedParsers {
  static dateParser = new IADateParser();
  static durationParser = new IADurationParser();
  static numberParser = new IANumberParser();
  static stringParser = new IAStringParser();
}

export class DateField extends MetadataField<Date, IADateParser> {
  constructor(rawValue: any) {
    super(SharedParsers.dateParser, rawValue);
  }
}

export class DurationField extends MetadataField<Duration, IADurationParser> {
  constructor(rawValue: any) {
    super(SharedParsers.durationParser, rawValue);
  }
}

export class NumberField extends MetadataField<number, IANumberParser> {
  constructor(rawValue: any) {
    super(SharedParsers.numberParser, rawValue);
  }
}

export class StringField extends MetadataField<string, IAStringParser> {
  constructor(rawValue: any) {
    super(SharedParsers.stringParser, rawValue);
  }
}
