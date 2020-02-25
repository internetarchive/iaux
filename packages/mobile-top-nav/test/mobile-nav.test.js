import {
  html,
  fixture,
  expect,
  oneEvent,
} from '@open-wc/testing';

import '../src/mobile-nav';

describe('<mobile-nav>', () => {
  it('defaults all menus to closed', async () => {
    const el = await fixture(html`<mobile-nav></mobile-nav>`);

    [
      'userMenuOpen',
      'searchMenuFade',
      'searchMenuOpen',
      'mediaMenuOpen',
    ].forEach((prop) => {
      expect(el[prop]).to.be.false;
    });
  });

  it('emits an event when hamburger button is pressed', async () => {
    const el = await fixture(html`<mobile-nav></mobile-nav>`);
    const clickEvent = new MouseEvent('click');

    setTimeout(() => el.shadowRoot.querySelector('button.hamburger').dispatchEvent(clickEvent));
    const response = await oneEvent(el, 'mediaMenu');

    expect(response).to.exist;
  });

  it('emits an event when search button is pressed', async () => {
    const el = await fixture(html`<mobile-nav></mobile-nav>`);
    const clickEvent = new MouseEvent('click');

    setTimeout(() => el.shadowRoot.querySelector('.search-trigger button').dispatchEvent(clickEvent));
    const response = await oneEvent(el, 'searchMenu');

    expect(response).to.exist;
  });

  it('emits an event when user button is pressed', async () => {
    const el = await fixture(html`<mobile-nav></mobile-nav>`);
    const clickEvent = new MouseEvent('click');

    setTimeout(() => el.shadowRoot.querySelector('button.user-menu').dispatchEvent(clickEvent));
    const response = await oneEvent(el, 'userMenu');

    expect(response).to.exist;
  });
});
