/* eslint-disable class-methods-use-this */
export type Duration = number;

export interface FieldParser<T> {
  parseValue(rawValue: string): T | undefined;
}

export class NumberParser implements FieldParser<number> {
  parseValue(rawValue: string): number | undefined {
    const value = parseFloat(rawValue);
    if (Number.isNaN(value)) {
      return undefined;
    }
    return parseFloat(rawValue);
  }
}

export class StringParser implements FieldParser<string> {
  parseValue(rawValue: string): string {
    return String(rawValue);
  }
}

export class DateParser implements FieldParser<Date> {
  parseValue(rawValue: string): Date | undefined {
    const parsed = Date.parse(rawValue);
    return Number.isNaN(parsed) ? undefined : new Date(rawValue);
  }
}

export class DurationParser implements FieldParser<Duration> {
  parseValue(rawValue: string): Duration {
    const componentArray: string[] = rawValue.split(':');
    const componentCount: number = componentArray.length;
    const seconds: number = componentArray
      .map((element: string, index: number) => {
        const componentValue: number = parseFloat(element);
        const exponent: number = componentCount - 1 - index;
        const multiplier: number = 60 ** exponent;
        return componentValue * Math.floor(multiplier);
      })
      .reduce((a, b) => a + b, 0);

    return seconds;
  }
}
