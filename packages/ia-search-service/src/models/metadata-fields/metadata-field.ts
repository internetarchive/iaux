import { FieldParser } from './field-parsers';

class MetadataField<Type, FieldParserType extends FieldParser<Type>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawValue?: any;

  values: Type[] = [];

  get value(): Type | undefined {
    return this.values.length > 0 ? this.values[0] : undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        const parsedValue = this.parser.parseValue(value);
        this.values.push(parsedValue);
      });
    } else {
      this.values = [this.parser.parseValue(this.rawValue)];
    }
  }
}

export { MetadataField };
