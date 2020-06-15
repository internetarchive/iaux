import {
  html,
  fixture,
  expect,
  oneEvent,
} from '@open-wc/testing';

import '../src/nav-search';

const component = html`<nav-search></nav-search>`;

describe('<nav-search>', () => {
  it('defaults to closed', async () => {
    const el = await fixture(component);

    expect(el.open).to.be.false;
  });

  it('emits an event when form submitted', async () => {
    const el = await fixture(component);
    const submitEvent = new Event('submit');

    setTimeout(() => el.shadowRoot.querySelector('form').dispatchEvent(submitEvent));
    const response = await oneEvent(el, 'navSearch');

    expect(response).to.exist;
  });
});
