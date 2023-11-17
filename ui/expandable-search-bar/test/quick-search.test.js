import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import { QuickSearch, QuickSearchEntry } from '../index';

describe('QuickSearch', () => {
  it('can be initialized with quickSearches', async () => {
    const entry1 = new QuickSearchEntry('foo', { some_data: 'bar' })
    const entry2 = new QuickSearchEntry('bam', { some_data: 'baz' })
    const searches = [entry1, entry2];

    const el = await fixture(html`
      <quick-search .quickSearches=${searches}></quick-search>
    `);

    expect(el.shadowRoot.querySelectorAll('li').length).to.equal(2);
  });

  it('emits a `searchTermSelected` event when an entry is selected', async () => {
    const entry1 = new QuickSearchEntry('foo', { some_data: 'bar' })
    const entry2 = new QuickSearchEntry('bam', { some_data: 'baz' })
    const searches = [entry1, entry2];

    const el = await fixture(html`
      <quick-search .quickSearches=${searches}></quick-search>
    `);

    const link = el.shadowRoot.querySelector('li a');
    const event = new MouseEvent('click');

    setTimeout(() => { link.dispatchEvent(event); });
    const response = await oneEvent(el, 'searchTermSelected');
    expect(response.detail.searchEntry).to.eql(entry1);
  });

});
