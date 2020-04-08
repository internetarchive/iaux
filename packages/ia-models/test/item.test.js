import { expect } from '@open-wc/testing';

import { Item } from '../lib/item';
import { File } from '../lib/file';
import { Metadata } from '../lib/metadata';

describe('Item', () => {
  it('can be instantiated with metadata', async () => {
    const metadata = new Metadata({ identifier: 'foo' })
    const item = new Item(metadata);
    expect(item.metadata.identifier).to.equal('foo');
  });
});
