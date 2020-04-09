/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldParser } from './field-parsers';

class MetadataField<Type, FieldParserType extends FieldParser<Type>> {
  rawValue?: any;

  values: Type[] = [];

  get value(): Type | undefined {
    return this.values.length > 0 ? this.values[0] : undefined;
  }

  constructor(parser: FieldParserType, rawValue?: any) {
    this.parser = parser;
    this.rawValue = rawValue;

    this.processRawValue();
  }

  private parser: FieldParserType;

  private processRawValue(): void {
    if (this.rawValue === undefined) {
      return;
    }

    if (Array.isArray(this.rawValue)) {
      this.rawValue.forEach(value => {
        this.parseAndPersistValue(value);
      });
    } else {
      this.parseAndPersistValue(this.rawValue);
    }
  }

  private parseAndPersistValue(value: any): void {
    const parsedValue = this.parser.parseValue(value);
    if (parsedValue) {
      this.values.push(parsedValue);
    }
  }
}

export { MetadataField };
