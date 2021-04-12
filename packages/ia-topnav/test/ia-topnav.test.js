import {
  html,
  fixture,
  expect,
  oneEvent,
} from '@open-wc/testing';

import '../src/ia-topnav';

const container = ({
  username = '',
  screenName = '',
  config = {},
  baseHost = ''
}) => (
  html`<ia-topnav .screenName=${screenName} .username=${username} .baseHost=${baseHost} .config=${config}></ia-topnav>`
);

const verifyClosed = (instance) => {
  expect(instance.mediaSliderOpen).to.be.false;
  expect(instance.selectedMenuOption).to.equal('');
};

const verifyOpened = (instance, mediatype) => {
  expect(instance.mediaSliderOpen).to.be.true;
  expect(instance.selectedMenuOption).to.equal(mediatype);
};

describe('<ia-topnav>', () => {
  it('assigns a value to "search in" from outside event', async () => {
    const el = await fixture(container());
    const query = 'atari';
    const searchMenu = el
      .shadowRoot
      .querySelector('search-menu');

    searchMenu.searchInChanged({
      target: {
        value: query
      }
    });
    await el.updateComplete;

    expect(el.searchIn).to.equal(query);
  });

  it('dispatches an analyticsClick event when trackClick event fired', async () => {
    const el = await fixture(container());
    const clickEvent = new MouseEvent('click');

    setTimeout(() => (
      el
        .shadowRoot
        .querySelector('primary-nav')
        .shadowRoot
        .querySelector('.hamburger')
        .dispatchEvent(clickEvent)
    ));
    const response = await oneEvent(el, 'trackClick');

    expect(response).to.exist;
  });

  it('dispatches an analyticsSubmit event when trackSubmit event fired', async () => {
    const el = await fixture(container());
    const submitEvent = new Event('submit');
    const form = el
      .shadowRoot
      .querySelector('primary-nav')
      .shadowRoot
      .querySelector('nav-search')
      .shadowRoot
      .querySelector('form');

    form.addEventListener('submit', e => e.preventDefault());
    form.querySelector('[name=query]').value = 'atari';
    setTimeout(() => form.dispatchEvent(submitEvent));
    const response = await oneEvent(el, 'trackSubmit');

    expect(response).to.exist;
  });

  it('closes all menus when close-layer clicked', async () => {
    const el = await fixture(container());

    el.openMenu = 'media';
    el.selectedMenuOption = 'texts';
    el.mediaSliderOpen = true;
    await el.updateComplete;
    el.closeMenus();
    await el.updateComplete;

    expect(el.mediaSliderOpen).to.be.false;
    expect(el.openMenu).to.equal('');
    expect(el.selectedMenuOption).to.equal('');
  });

  it('sets media slider to closed', async () => {
    const el = await fixture(container());

    el.mediaSliderOpen = true;
    el.selectedMenuOption = 'foo';
    el.closeMediaSlider();

    verifyClosed(el);
  });

  it('toggles media slider visibility and starts animation', async () => {
    const el = await fixture(container());
    const mediatype = 'foo';

    el.selectedMenuOption = mediatype;
    el.openMediaSlider();

    verifyOpened(el, mediatype);
  });

  it('closes media slider if selected menu type is the open menu type', async () => {
    const el = await fixture(container());
    const mediatype = 'foo';

    el.selectedMenuOption = mediatype;
    el.mediaTypeSelected({
      detail: {
        mediatype
      }
    });

    verifyClosed(el);
  });

  it('opens media slider menu and starts animation', async () => {
    const el = await fixture(container());
    const mediatype = 'foo';

    el.mediaTypeSelected({
      detail: {
        mediatype
      }
    });

    verifyOpened(el, mediatype);
  });

  it('closes slider when menu closed', async () => {
    const el = await fixture(container());

    el.openMenu = 'media';
    el.selectedMenuOption = 'foo';
    el.mediaSliderOpen = true;
    await el.updateComplete;

    el.menuToggled({ detail: { menuName: '' } });
    await el.updateComplete;

    expect(el.selectedMenuOption).to.equal('');
  });

  it('toggles search menu tabindex when dropdown open', async () => {
    const el = await fixture(container());

    el.openMenu = 'search';
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('search-menu').getAttribute('tabindex')).to.equal('');
  });

  it('toggles user menu tabindex when dropdown open', async () => {
    const el = await fixture(container({ username: 'shaneriley' }));

    el.openMenu = 'user';
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('user-menu').getAttribute('tabindex')).to.equal('');
  });

  it('toggles signed out menu tabindex when dropdown open', async () => {
    const el = await fixture(container());

    el.openMenu = 'login';
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('signed-out-dropdown').getAttribute('tabindex')).to.equal('');
  });

  it('toggles search menu when search toggle button clicked', async () => {
    const el = await fixture(container());
    el.shadowRoot.querySelector('primary-nav').shadowRoot.querySelector('.search-trigger').click();
    await el.updateComplete;

    expect(el.openMenu).to.equal('search');
  });

  it('toggles user menu when search user avatar clicked', async () => {
    const el = await fixture(container({
      username: 'shaneriley',
      screenName: 'shaneriley',
    }));

    el.shadowRoot.querySelector('primary-nav').shadowRoot.querySelector('.user-menu').click();
    await el.updateComplete;

    expect(el.openMenu).to.equal('user');
  });

  it('uses baseHost to render logo link to homepage', async () => {
    const el = await fixture(container({ baseHost: 'archive.org' }));
    const logoLink = el
      .shadowRoot
      .querySelector('primary-nav')
      .shadowRoot
      .querySelector('.link-home');
    expect(logoLink.getAttribute('href')).to.match(/archive\.org/);
  });

  it('uses uploadURL to render upload link', async () => {
    const el = await fixture(container({ config: { uploadURL: 'https://archive.org/create' } }));
    const uploadLink = el
      .shadowRoot
      .querySelector('primary-nav')
      .shadowRoot
      .querySelector('.upload');
    expect(uploadLink.getAttribute('href')).to.match(/archive\.org\/create/);
  });

  describe('sets baseHost properly', async () => {
    it('sets the baseHost on the common child components', async () => {
      const el = await fixture(container({ baseHost: 'foo.org' }));
      const componentSelectors = ['primary-nav', 'media-slider', 'desktop-subnav', 'search-menu'];
      componentSelectors.forEach((selector) => {
        const component = el.shadowRoot.querySelector(selector);
        expect(component.baseHost).to.equal('foo.org');
      });
    });

    it('sets the baseHost on the signed out dropdown', async () => {
      const el = await fixture(container({ baseHost: 'foo.org' }));
      const signedOutDropdown = el.shadowRoot.querySelector('signed-out-dropdown');
      expect(signedOutDropdown.baseHost).to.equal('foo.org');
    });

    it('sets the baseHost on the user dropdown', async () => {
      const el = await fixture(container({ username: 'foo', baseHost: 'foo.org' }));
      const signedOutDropdown = el.shadowRoot.querySelector('user-menu');
      expect(signedOutDropdown.baseHost).to.equal('foo.org');
    });
  });
});
