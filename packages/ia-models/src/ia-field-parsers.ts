type Duration = number;

interface IAFieldParser<T> {
  parseValue(rawValue: string): T;
}

class IANumberParser implements IAFieldParser<number> {
  parseValue(rawValue: string): number {
    return parseFloat(rawValue);
  }
}

class IAStringParser implements IAFieldParser<string> {
  parseValue(rawValue: string): string {
    return rawValue;
  }
}

class IADateParser implements IAFieldParser<Date> {
  parseValue(rawValue: string): Date {
    return new Date(rawValue);
  }
}

class IADurationParser implements IAFieldParser<Duration> {
  parseValue(rawValue: string): Duration {

    const componentArray: string[] = rawValue.split(':')
    const componentCount: number = componentArray.length
    const seconds: number = componentArray.map((element: string, index: number) => {
      const componentValue: number = parseFloat(element)
      const exponent: number = (componentCount - 1) - index
      const multiplier: number = Math.pow(60, exponent)
      return componentValue * Math.floor(multiplier)
    }).reduce((a, b) => a + b, 0);

    return seconds;
  }
}

export {
  Duration,
  IAFieldParser,
  IANumberParser,
  IAStringParser,
  IADateParser,
  IADurationParser,
}
