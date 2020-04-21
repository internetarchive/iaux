import {
  html,
  fixture,
  expect,
  oneEvent,
} from '@open-wc/testing';

import '../src/ia-topnav';

const container = html`<ia-topnav></ia-topnav>`;

const verifyClosed = (instance) => {
  expect(instance.mediaSliderAnimate).to.be.true;
  expect(instance.mediaSliderOpen).to.be.false;
  expect(instance.selectedMenuOption).to.equal('');
};

const verifyOpened = (instance, mediatype) => {
  expect(instance.mediaSliderOpen).to.be.true;
  expect(instance.mediaSliderAnimate).to.be.true;
  expect(instance.selectedMenuOption).to.equal(mediatype);
};

describe('<ia-topnav>', () => {
  it('defaults all menus to closed and not animating', async () => {
    const topnavElement = await fixture(container);

    [
      'userMenuOpen',
      'userMenuAnimate',
      'searchMenuOpen',
      'searchMenuAnimate',
      'mediaMenuOpen',
    ].forEach((prop) => {
      expect(topnavElement[prop]).to.be.false;
    });
  });

  it('toggles user menu open and animating', async () => {
    const el = await fixture(container);

    el.userMenu();

    expect(el.userMenuAnimate).to.be.true;
    expect(el.userMenuOpen).to.be.true;
  });

  it('toggles media menu open and animating', async () => {
    const el = await fixture(container);

    el.mediaMenu();

    expect(el.mediaMenuOpen).to.be.true;
  });

  it('toggles search menu open and animating', async () => {
    const el = await fixture(container);

    el.searchMenu();

    expect(el.searchMenuAnimate).to.be.true;
    expect(el.searchMenuOpen).to.be.true;
  });

  it('assigns a value to "search in" from outside event', async () => {
    const el = await fixture(container);
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
    const el = await fixture(container);
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
    const el = await fixture(container);
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
    const el = await fixture(container);
    const menus = ['media', 'search', 'user'];

    menus.forEach((menu) => {
      el[`${menu}MenuOpen`] = true;
    });

    await el.updateComplete;
    el.closeMenus();
    await el.updateComplete;

    menus.forEach((menu) => {
      expect(el[`${menu}MenuOpen`]).to.be.false;
    });
  });

  it('sets media slider to closed', async () => {
    const el = await fixture(container);

    el.mediaSliderOpen = true;
    el.selectedMenuOption = 'foo';
    el.closeMediaSlider();

    verifyClosed(el);
  });

  it('toggles media slider visibility and starts animation', async () => {
    const el = await fixture(container);
    const mediatype = 'foo';

    el.selectedMenuOption = mediatype;
    el.toggleMediaSlider();

    verifyOpened(el, mediatype);
  });

  it('closes media slider if selected menu type is the open menu type', async () => {
    const el = await fixture(container);
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
    const el = await fixture(container);
    const mediatype = 'foo';

    el.mediaTypeSelected({
      detail: {
        mediatype
      }
    });

    verifyOpened(el, mediatype);
  });

  it('closes slider when menu closed', async () => {
    const el = await fixture(container);

    el.selectedMenuOption = 'foo';
    el.mediaMenuOpen = true;
    await el.updateComplete;
    el.mediaSliderOpen = true;
    await el.updateComplete;
    el.mediaMenuOpen = false;
    await el.updateComplete;

    expect(el.selectedMenuOption).to.equal('');
  });

  it('toggles signed out dropdown', async () => {
    const el = await fixture(container);

    el.signedOutMenu();
    await el.updateComplete;

    expect(el.signedOutMenuOpen).to.be.true;
  });
});
