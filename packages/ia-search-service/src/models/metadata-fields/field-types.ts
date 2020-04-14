/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetadataField } from './metadata-field';
import {
  Duration,
  DateParser,
  DurationParser,
  NumberParser,
  StringParser,
  BooleanParser,
} from './field-parsers';

class SharedParsers {
  static dateParser = new DateParser();

  static durationParser = new DurationParser();

  static numberParser = new NumberParser();

  static stringParser = new StringParser();

  static booleanParser = new BooleanParser();
}

export class DateField extends MetadataField<Date, DateParser> {
  constructor(rawValue: any) {
    super(SharedParsers.dateParser, rawValue);
  }
}

export class DurationField extends MetadataField<Duration, DurationParser> {
  constructor(rawValue: any) {
    super(SharedParsers.durationParser, rawValue);
  }
}

export class NumberField extends MetadataField<number, NumberParser> {
  constructor(rawValue: any) {
    super(SharedParsers.numberParser, rawValue);
  }
}

export class StringField extends MetadataField<string, StringParser> {
  constructor(rawValue: any) {
    super(SharedParsers.stringParser, rawValue);
  }
}

export class BooleanField extends MetadataField<boolean, BooleanParser> {
  constructor(rawValue: any) {
    super(SharedParsers.booleanParser, rawValue);
  }
}
