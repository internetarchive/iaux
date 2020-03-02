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

  it('emits an event when search button is pressed', async () => {
    const el = await fixture(component);
    const clickEvent = new MouseEvent('click');

    setTimeout(() => el.shadowRoot.querySelector('.search').dispatchEvent(clickEvent));
    const response = await oneEvent(el, 'searchMenu');

    expect(response).to.exist;
  });
});
