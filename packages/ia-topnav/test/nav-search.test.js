import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../src/nav-search';

const component = html`<nav-search></nav-search>`;

describe('<nav-search>', () => {
  it('defaults to closed', async () => {
    const el = await fixture(component);

    expect(el.open).to.be.false;
  });

  it('does not allow search form to submit if query empty', async () => {
    const el = await fixture(component);

    const result = el.search({
      preventDefault: () => {}
    });

    expect(result).to.be.false;
  });

  it('redirects to the TV details page when search inside is TV', async () => {
    const query = 'bananas';
    const submitEvent = {
      type: 'submit',
      preventDefault: () => {}
    };
    const locationHandler = sinon.fake();
    const el = await fixture(html`<nav-search .locationHandler=${locationHandler}></nav-search>`);

    el.searchIn = 'TV';

    await el.updateComplete;

    el.shadowRoot.querySelector('[name=query]').value = query;
    el.search(submitEvent);

    expect(locationHandler.callCount).to.equal(1);
    expect(locationHandler.firstArg).to.contain(`/details/tv?q=${query}`);
  });

  it('prefills the search query when present in config', async () => {
    const config = {
      searchQuery: 'bananas'
    };
    const el = await fixture(html`<nav-search .config=${config}></nav-search>`);

    expect(el.shadowRoot.querySelector('[name="query"]').value).to.equal(config.searchQuery);
  });

  it('conditionally renders `sin` input based on `searchIn` truthiness', async () => {
    const el = await fixture(component);

    expect(el.shadowRoot.querySelector('[name="sin"]')).to.be.null;

    el.searchIn = 'TV';
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('[name="sin"]')).not.to.be.null;
  });
});
