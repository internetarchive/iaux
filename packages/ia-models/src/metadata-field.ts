import { IAFieldParser } from './ia-field-parsers';

class MetadataField<Type, FieldType extends IAFieldParser<Type>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawValue: any;

  values: Type[] = [];

  get value(): Type | undefined {
    return this.values[0];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(rawValue: any, parser: FieldType) {
    this.rawValue = rawValue;

    if (Array.isArray(rawValue)) {
      for (const value of (rawValue as [string])) {
        const parsedValue = parser.parseValue(value);
        this.values.push(parsedValue);
      }
    } else {
      this.values = [parser.parseValue(rawValue)]
    }
  }
}

export { MetadataField };
