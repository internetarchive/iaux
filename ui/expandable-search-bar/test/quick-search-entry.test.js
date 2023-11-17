import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import { QuickSearchEntry } from '../index';

describe('QuickSearchEntry', () => {
  it('can be initialized with data', async () => {
    const entry = new QuickSearchEntry('foo', { some_data: 'bar' })

    expect(entry.displayText).to.equal('foo');
    expect(entry.data.some_data).to.equal('bar');
  });

  it('can be initialized without data', async () => {
    const entry = new QuickSearchEntry('foo')

    expect(entry.displayText).to.equal('foo');
    expect(entry.data).to.eql({});
  });
});
