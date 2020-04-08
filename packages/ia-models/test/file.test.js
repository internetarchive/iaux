import { expect } from '@open-wc/testing';

import { File } from '../lib/file';

describe('File', () => {
  it('can be instantiated with a name', async () => {
    const file = new File('foo.jpg');
    expect(file.name).to.equal('foo.jpg');
  });
});
