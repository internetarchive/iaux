import { expect } from '@open-wc/testing';

import { Metadata } from '../../lib/models/metadata';

describe('Metadata', () => {
  it('properly instantiates metadata with identifier', async () => {
    const json = { identifier: 'foo', collection: 'bar' };
    const metadata = new Metadata(json);
    expect(metadata.identifier).to.equal('foo');
  });
});
