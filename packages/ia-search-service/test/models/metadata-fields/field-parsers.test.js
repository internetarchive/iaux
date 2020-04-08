import { expect } from '@open-wc/testing';

import {
  NumberParser,
  DateParser,
  DurationParser,
  StringParser
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

  it('returns NaN if the number is not a number', async () => {
    const parser = new NumberParser();
    const response = parser.parseValue('qab');
    expect(response).to.be.NaN;
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
