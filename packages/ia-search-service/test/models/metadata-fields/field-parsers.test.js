import { expect } from '@open-wc/testing';

import {
  NumberParser,
  DateParser,
  DurationParser,
  StringParser,
  BooleanParser
} from '../../../lib/models/metadata-fields/field-parsers';

describe('NumberParser', () => {
  it('can parse int strings', async () => {
    const parser = new NumberParser();
    const response = parser.parseValue('3');
    expect(response).to.equal(3);
  });

  it('can parse ints', async () => {
    const parser = new NumberParser();
    const response = parser.parseValue(3);
    expect(response).to.equal(3);
  });

  it('can parse float strings', async () => {
    const parser = new NumberParser();
    const response = parser.parseValue('3.14');
    expect(response).to.equal(3.14);
  });

  it('can parse floats', async () => {
    const parser = new NumberParser();
    const response = parser.parseValue(3.14);
    expect(response).to.equal(3.14);
  });

  it('returns undefined if the number is not a number', async () => {
    const parser = new NumberParser();
    const response = parser.parseValue('qab');
    expect(response).to.be.undefined;
  });
});

describe('StringParser', () => {
  it('can parse strings', async () => {
    const parser = new StringParser();
    const response = parser.parseValue('3');
    expect(response).to.equal('3');
  });

  it('can parse numbers', async () => {
    const parser = new StringParser();
    const response = parser.parseValue(3.14);
    expect(response).to.equal('3.14');
  });
});

describe('DateParser', () => {
  it('can parse date-only strings', async () => {
    const parser = new DateParser();
    const response = parser.parseValue('2020-06-20');
    const expected = new Date();
    expected.setUTCHours(0);
    expected.setUTCMinutes(0);
    expected.setUTCSeconds(0);
    expected.setUTCMilliseconds(0);
    expected.setUTCMonth(5);
    expected.setUTCDate(20);
    expected.setUTCFullYear(2020);
    expect(response.getTime()).to.equal(expected.getTime());
  });

  it('can parse date-time strings', async () => {
    const parser = new DateParser();
    const response = parser.parseValue('2020-06-20 3:46:23');
    const expected = new Date();
    expected.setHours(3);
    expected.setMinutes(46);
    expected.setSeconds(23);
    expected.setUTCMilliseconds(0);
    expected.setUTCMonth(5);
    expected.setUTCDate(20);
    expected.setUTCFullYear(2020);
    expect(response.getTime()).to.equal(expected.getTime());
  });

  it('can parse ISO8601 strings', async () => {
    const parser = new DateParser();
    const response = parser.parseValue('2020-06-20T13:37:15');
    const expected = new Date();
    expected.setHours(13);
    expected.setMinutes(37);
    expected.setSeconds(15);
    expected.setUTCMilliseconds(0);
    expected.setUTCMonth(5);
    expected.setUTCDate(20);
    expected.setUTCFullYear(2020);
    expect(response.getTime()).to.equal(expected.getTime());
  });

  it('can parse "c.a. yyyy" formatted dates', async () => {
    const parser = new DateParser();
    const response = parser.parseValue('c.a. 2020');
    const expected = new Date();
    expected.setHours(0);
    expected.setMinutes(0);
    expected.setSeconds(0);
    expected.setMilliseconds(0);
    expected.setMonth(0);
    expected.setDate(1);
    expected.setFullYear(2020);
    expect(response.getTime()).to.equal(expected.getTime());
  });

  it('can parse "ca yyyy" formatted dates', async () => {
    const parser = new DateParser();
    const response = parser.parseValue('ca 2020');
    const expected = new Date();
    expected.setHours(0);
    expected.setMinutes(0);
    expected.setSeconds(0);
    expected.setMilliseconds(0);
    expected.setMonth(0);
    expected.setDate(1);
    expected.setFullYear(2020);
    expect(response.getTime()).to.equal(expected.getTime());
  });

  it('can parse "[yyyy]" formatted dates', async () => {
    const parser = new DateParser();
    const response = parser.parseValue('[2020]');
    const expected = new Date();
    expected.setUTCHours(0);
    expected.setUTCMinutes(0);
    expected.setUTCSeconds(0);
    expected.setUTCMilliseconds(0);
    expected.setUTCMonth(0);
    expected.setUTCDate(1);
    expected.setUTCFullYear(2020);
    expect(response.getTime()).to.equal(expected.getTime());
  });

  it('returns undefined if it is a bad date', async () => {
    const parser = new DateParser();
    const response = parser.parseValue('absjkdvfnskj');
    expect(response).to.be.undefined;
  });
});

describe('DurationParser', () => {
  it('can parse mm:ss format', async () => {
    const parser = new DurationParser();
    const response = parser.parseValue('45:23');
    const expected = 23 + (45 * 60);
    expect(response).to.equal(expected);
  });

  it('can parse hh:mm:ss format', async () => {
    const parser = new DurationParser();
    const response = parser.parseValue('3:45:23');
    const expected = 23 + (45 * 60) + (3 * 60 * 60);
    expect(response).to.equal(expected);
  });

  it('can parse decimal format', async () => {
    const parser = new DurationParser();
    const response = parser.parseValue('345.23');
    expect(response).to.equal(345.23);
  });
});

describe('BooleanParser', () => {
  it('can parse number truthy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue(1);
    expect(response).to.be.true;
  });

  it('can parse number falsy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue(0);
    expect(response).to.be.false;
  });

  it('can parse string number truthy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('1');
    expect(response).to.be.true;
  });

  it('can parse string number falsy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('0');
    expect(response).to.be.false;
  });

  it('can parse words truthy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('true');
    expect(response).to.be.true;
  });

  it('can parse words falsy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('false');
    expect(response).to.be.false;
  });

  it('can parse boolean truthy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue(true);
    expect(response).to.be.true;
  });

  it('can parse boolean falsy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue(false);
    expect(response).to.be.false;
  });

  it('can parse date truthy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue(Date());
    expect(response).to.be.true;
  });

  it('can parse undefined falsy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue(undefined);
    expect(response).to.be.false;
  });
});
