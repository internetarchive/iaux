export type Duration = number;

export interface IAFieldParser<T> {
  parseValue(rawValue: string): T;
}

export class IANumberParser implements IAFieldParser<number> {
  parseValue(rawValue: string): number {
    return parseFloat(rawValue);
  }
}

export class IAStringParser implements IAFieldParser<string> {
  parseValue(rawValue: string): string {
    return rawValue;
  }
}

export class IADateParser implements IAFieldParser<Date> {
  parseValue(rawValue: string): Date {
    return new Date(rawValue);
  }
}

export class IADurationParser implements IAFieldParser<Duration> {
  parseValue(rawValue: string): Duration {

    let componentArray: string[] = rawValue.split(':')
    let componentCount: number = componentArray.length
    let seconds: number = componentArray.map((element: string, index: number) => {
      let componentValue: number = parseFloat(element)
      let exponent: number = (componentCount - 1) - index
      let multiplier: number = Math.pow(60, exponent)
      return componentValue * Math.floor(multiplier)
    }).reduce((a, b) => a + b, 0);

    return seconds;
  }
}
