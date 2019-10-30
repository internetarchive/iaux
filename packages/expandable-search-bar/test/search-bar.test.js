import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import { ExpandableSearchBar, QuickSearch, QuickSearchEntry } from '../index';

describe('ExpandableSearchBar', () => {
  it('defaults to closed and not expandable', async () => {
    const el = await fixture(html`
      <expandable-search-bar></expandable-search-bar>
    `);

    expect(el.isOpen).to.equal(false);
    expect(el.showsDisclosure).to.equal(false);
  });

  it('has `is-open` class when opened', async () => {
    const el = await fixture(html`
      <expandable-search-bar isOpen='true'></expandable-search-bar>
    `);

    const container = el.shadowRoot.querySelector('.container');

    expect(container.classList.contains('is-open')).to.equal(true);
  });

  it('has `shows-disclosure` class when expandable', async () => {
    const el = await fixture(html`
      <expandable-search-bar showsDisclosure='true'></expandable-search-bar>
    `);

    const container = el.shadowRoot.querySelector('.container');

    expect(container.classList.contains('shows-disclosure')).to.equal(true);
  });

  it('has `is-searching` class when there is a search term', async () => {
    const el = await fixture(html`
      <expandable-search-bar searchTerm='foo'></expandable-search-bar>
    `);

    const container = el.shadowRoot.querySelector('.search-bar');

    expect(container.classList.contains('is-searching')).to.equal(true);
  });

  it('clears the search term when the X button is pressed', async () => {
    const el = await fixture(html`
      <expandable-search-bar searchTerm='foo'></expandable-search-bar>
    `);

    expect(el.searchTerm).to.equal('foo');

    const button = el.shadowRoot.getElementById('clear-search-button');
    const event = new MouseEvent('click');
    button.dispatchEvent(event);
    expect(el.searchTerm).to.equal('');
  });

  it('emits a `searchCleared` event when the X button is pressed', async () => {
    const el = await fixture(html`
      <expandable-search-bar searchTerm='foo'></expandable-search-bar>
    `);

    const button = el.shadowRoot.getElementById('clear-search-button');
    const event = new MouseEvent('click');

    setTimeout(() => { button.dispatchEvent(event); });
    const response = await oneEvent(el, 'searchCleared');
    expect(response).to.exist;
  });

  it('emits a `inputchange` event when the input is changed', async () => {
    const el = await fixture(html`
      <expandable-search-bar></expandable-search-bar>
    `);

    const input = el.shadowRoot.getElementById('search-input');
    const event = new KeyboardEvent('keyup', { key: 'A' });

    setTimeout(() => { input.dispatchEvent(event); });
    const response = await oneEvent(el, 'inputchange');
    expect(response).to.exist;
  });

  it('emits a `enterKeyPressed` event when the enter key is pressed', async () => {
    const el = await fixture(html`
      <expandable-search-bar searchTerm='foo'></expandable-search-bar>
    `);

    const input = el.shadowRoot.getElementById('search-input');
    const event = new KeyboardEvent('keyup', { key: 'Enter' });

    setTimeout(() => { input.dispatchEvent(event); });
    const response = await oneEvent(el, 'enterKeyPressed');
    expect(response.detail.value).to.equal('foo');
  });

  it('changes open/closed when disclosure clicked', async () => {
    const el = await fixture(html`
      <expandable-search-bar showsDisclosure='true'></expandable-search-bar>
    `);
    expect(el.isOpen).to.equal(false);

    const button = el.shadowRoot.getElementById('disclosure-button');
    const event = new MouseEvent('click');
    button.dispatchEvent(event);
    expect(el.isOpen).to.equal(true);
  });

  it('handles quick search clicks', async () => {
    const entry1 = new QuickSearchEntry('foo', { some_data: 'bar' })
    const entry2 = new QuickSearchEntry('bam', { some_data: 'baz' })
    const searches = [entry1, entry2];

    const el = await fixture(html`
      <expandable-search-bar
        .quickSearches=${searches}
        showsDisclosure='true'
        isOpen='true'>
      </expandable-search-bar>
    `);
    expect(el.isOpen).to.equal(true);

    const quickSearch = el.shadowRoot.querySelector('quick-search');
    const quickSearchEntryLink = quickSearch.shadowRoot.querySelector('li a');
    const event = new MouseEvent('click');

    setTimeout(() => { quickSearchEntryLink.dispatchEvent(event); });
    const response = await oneEvent(el, 'quickSearchSelected');

    expect(response.detail.quickSearchEntry).to.eql(entry1);
    expect(el.isOpen).to.equal(false);
  });
});
