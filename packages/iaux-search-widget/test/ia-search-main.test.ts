import { html, fixture, expect } from '@open-wc/testing';
import type { IauxSearchWidget } from '../src/components/iaux-search-widget';
import '../src/components/iaux-search-widget';

describe('check url', () => {
  it('not have key ', async () => {
    const el = await fixture<IauxSearchWidget>(
      html`<iaux-search-widget></iaux-search-widget>`
    );
    el.queryParam = 'hello';
    el.addSearchField();
    await el.updateComplete;

    expect(
      el.shadowRoot?.querySelector('#search-field-container .search-fields')
    ).to.exist;
  });

  it('has a and query from url. ', async () => {
    const el = await fixture<IauxSearchWidget>(
      html`<iaux-search-widget></iaux-search-widget>`
    );

    const query = `title:(aruna)`;
    el.queryParam = query;
    await el.updateComplete;

    expect(el.queryParam).to.equal(query);
    expect(el.queryParam).to.equal('title:(aruna)');
  });
});

describe('check default defined element', () => {
  it('defualt search field', async () => {
    const el = await fixture<IauxSearchWidget>(
      html`<iaux-search-widget></iaux-search-widget>`
    );
    const urlSearch = '';
    expect(urlSearch).to.empty;
    el.queryParam = urlSearch;
    await el.updateComplete;
    const searchFields = el.shadowRoot?.querySelector('.search-fields');
    expect(searchFields).to.exist;
  });
});
