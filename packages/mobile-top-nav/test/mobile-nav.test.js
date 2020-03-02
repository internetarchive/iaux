import {
  html,
  fixture,
  expect,
  oneEvent,
} from '@open-wc/testing';

import '../src/mobile-nav';

const config = {
  baseUrl: 'archive.org',
  username: 'shaneriley',
};

const component = () => (
  html`<mobile-nav .config=${config}></mobile-nav>`
);

describe('<mobile-nav>', () => {
  it('defaults all menus to closed', async () => {
    const el = await fixture(component());

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
    const el = await fixture(component());
    const clickEvent = new MouseEvent('click');

    setTimeout(() => el.shadowRoot.querySelector('button.hamburger').dispatchEvent(clickEvent));
    const response = await oneEvent(el, 'mediaMenu');

    expect(response).to.exist;
  });

  it('emits an event when search button is pressed', async () => {
    const el = await fixture(component());
    const clickEvent = new MouseEvent('click');

    setTimeout(() => el.shadowRoot.querySelector('.search-trigger button').dispatchEvent(clickEvent));
    const response = await oneEvent(el, 'searchMenu');

    expect(response).to.exist;
  });

  it('emits an event when user button is pressed', async () => {
    const el = await fixture(component());
    const clickEvent = new MouseEvent('click');

    setTimeout(() => el.shadowRoot.querySelector('button.user-menu').dispatchEvent(clickEvent));
    const response = await oneEvent(el, 'userMenu');

    expect(response).to.exist;
  });

  it('renders the login link when no username present', async () => {
    config.username = '';
    const el = await fixture(component());

    expect(el.shadowRoot.querySelector('login-button')).to.not.be.undefined;
  });
});
