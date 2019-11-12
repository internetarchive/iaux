import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import promisedSleep from './promised-sleep';

import '../lib/src/radio-player';

describe('Radio Player', () => {
  it('defaults to 0 results', async () => {
    const el = await fixture(html`
      <search-results-switcher></search-results-switcher>
    `);

    expect(el.numberOfResults).to.equal(0);
    expect(el.currentResultIndex).to.equal(0);
  });

  it('renders the number of results correctly', async () => {
    const el = await fixture(html`
      <search-results-switcher numberOfResults='7'></search-results-switcher>
    `);

    const shadowRoot = el.shadowRoot;

    expect(shadowRoot.getElementById('current-result').innerText).to.equal('1');
    expect(shadowRoot.getElementById('number-of-results').innerText).to.equal('7');
  });

  it('increments the values properly and emits event when changed', async () => {
    const el = await fixture(html`
      <search-results-switcher numberOfResults='7'></search-results-switcher>
    `);

    const shadowRoot = el.shadowRoot;

    const clickEvent = new MouseEvent('click');
    const nextButton = shadowRoot.getElementById('next-button');

    setTimeout(() => { nextButton.dispatchEvent(clickEvent); });
    const response = await oneEvent(el, 'searchResultIndexChanged');
    expect(response.detail.searchResultIndex).to.equal(1);
    expect(el.currentResultIndex).to.equal(1);
  });

  it('wraps around to the beginning if it reaches the end', async () => {
    const el = await fixture(html`
      <search-results-switcher numberOfResults='7'></search-results-switcher>
    `);

    el.currentResultIndex = 6;

    const shadowRoot = el.shadowRoot;

    const clickEvent = new MouseEvent('click');
    const nextButton = shadowRoot.getElementById('next-button');

    setTimeout(() => { nextButton.dispatchEvent(clickEvent); });
    const response = await oneEvent(el, 'searchResultIndexChanged');
    expect(response.detail.searchResultIndex).to.equal(0);
    expect(el.currentResultIndex).to.equal(0);
  });

  it('decrements the values properly and emits event when changed', async () => {
    const el = await fixture(html`
      <search-results-switcher numberOfResults='7'></search-results-switcher>
    `);

    el.currentResultIndex = 4

    const shadowRoot = el.shadowRoot;

    const clickEvent = new MouseEvent('click');
    const nextButton = shadowRoot.getElementById('previous-button');

    setTimeout(() => { nextButton.dispatchEvent(clickEvent); });
    const response = await oneEvent(el, 'searchResultIndexChanged');
    expect(response.detail.searchResultIndex).to.equal(3);
    expect(el.currentResultIndex).to.equal(3);
  });

  it('wraps around to the end if it reaches the beginning', async () => {
    const el = await fixture(html`
      <search-results-switcher numberOfResults='7'></search-results-switcher>
    `);

    const shadowRoot = el.shadowRoot;

    const clickEvent = new MouseEvent('click');
    const nextButton = shadowRoot.getElementById('previous-button');

    setTimeout(() => { nextButton.dispatchEvent(clickEvent); });
    const response = await oneEvent(el, 'searchResultIndexChanged');
    expect(response.detail.searchResultIndex).to.equal(6);
    expect(el.currentResultIndex).to.equal(6);
  });


});
