import { IAFieldParser } from './ia-field-parsers';

export class MetadataField<Type, FieldType extends IAFieldParser<Type>> {
  rawValue: any;
  values: Type[] = [];

  get value(): Type | undefined {
    return this.values[0];
  }

  constructor(rawValue: any, parser: FieldType) {
    this.rawValue = rawValue;

    if (Array.isArray(rawValue)) {
      for (let value of (rawValue as [string])) {
        let parsedValue = parser.parseValue(value);
        this.values.push(parsedValue);
      }
    } else {
      this.values = [parser.parseValue(rawValue)]
    }
  }
}
