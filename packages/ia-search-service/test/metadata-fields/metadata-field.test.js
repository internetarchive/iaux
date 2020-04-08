import { expect } from '@open-wc/testing';

import {
  MetadataField,
} from '../../lib/metadata-fields/metadata-field';

describe('Metadata Field', () => {
  it('can be properly instantiated with single value', () => {
    class MockParser {
      parseValue(rawValue) {
        return rawValue;
      }
    }

    let parser = new MockParser();
    let metadataField = new MetadataField(parser, 'foo');

    expect(metadataField.rawValue).to.equal('foo');
    expect(metadataField.value).to.equal('foo');
    expect(metadataField.values).to.deep.equal(['foo']);
  });

  it('can be properly instantiated with array value', () => {
    class MockParser {
      parseValue(rawValue) {
        return rawValue;
      }
    }

    let parser = new MockParser();
    let metadataField = new MetadataField(parser, ['foo', 'bar', 'baz']);

    expect(metadataField.rawValue).to.deep.equal(['foo', 'bar', 'baz']);
    expect(metadataField.value).to.equal('foo');
    expect(metadataField.values).to.deep.equal(['foo', 'bar', 'baz']);
  });

  it('properly casts values to expected parser type for single values', () => {
    class MockFloatParser {
      parseValue(rawValue) {
        return parseFloat(rawValue);
      }
    }

    let parser = new MockFloatParser();
    let metadataField = new MetadataField(parser, '1.3');

    expect(metadataField.rawValue).to.equal('1.3');
    expect(metadataField.value).to.equal(1.3);
    expect(metadataField.values).to.deep.equal([1.3]);
  });

  it('properly casts values to expected parser type for array values', () => {
    class MockFloatParser {
      parseValue(rawValue) {
        return parseFloat(rawValue);
      }
    }

    let parser = new MockFloatParser();
    let metadataField = new MetadataField(parser, ['1.3', '2.4', '4.5']);

    expect(metadataField.rawValue).to.deep.equal(['1.3', '2.4', '4.5']);
    expect(metadataField.value).to.equal(1.3);
    expect(metadataField.values).to.deep.equal([1.3, 2.4, 4.5]);
  });
});
