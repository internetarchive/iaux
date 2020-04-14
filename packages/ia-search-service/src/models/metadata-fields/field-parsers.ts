/* eslint-disable class-methods-use-this */
export type Duration = number;

export interface FieldParserInterface<T> {
  parseValue(rawValue: string): T | undefined;
}

export class NumberParser implements FieldParserInterface<number> {
  parseValue(rawValue: string): number | undefined {
    const value = parseFloat(rawValue);
    if (Number.isNaN(value)) {
      return undefined;
    }
    return parseFloat(rawValue);
  }
}

export class StringParser implements FieldParserInterface<string> {
  parseValue(rawValue: string): string {
    return String(rawValue);
  }
}

export class BooleanParser implements FieldParserInterface<boolean> {
  parseValue(rawValue: string): boolean {
    if (rawValue === 'false' || rawValue === '0') {
      return false;
    }
    return Boolean(rawValue);
  }
}

export class DateParser implements FieldParserInterface<Date> {
  parseValue(rawValue: string): Date | undefined {
    // try different date parsing
    return this.parseJSDate(rawValue) || this.parseBracketDate(rawValue);
  }

  // handles "[yyyy]" format
  private parseBracketDate(rawValue: string): Date | undefined {
    const yearMatch = rawValue.match(/\[([0-9]{4})\]/);
    if (!yearMatch || yearMatch.length < 2) {
      return undefined;
    }
    return this.parseJSDate(yearMatch[1]);
  }

  // uses javascript's `Date.parse()`, which handles many formats, including `c.a. 2020`
  private parseJSDate(rawValue: string): Date | undefined {
    const parsed = Date.parse(rawValue);
    return Number.isNaN(parsed) ? undefined : new Date(rawValue);
  }
}

export class DurationParser implements FieldParserInterface<Duration> {
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
