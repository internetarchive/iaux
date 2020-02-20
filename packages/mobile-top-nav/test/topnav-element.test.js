import { html, fixture, expect } from '@open-wc/testing';

import '../src/topnav-element';

describe('<topnav-element>', () => {
  it('defaults all menus to closed and not animating', async () => {
    const topnavElement = await fixture(html`<topnav-element></topnav-element>`);

    [
      'userMenuOpen',
      'userMenuAnimate',
      'searchMenuOpen',
      'searchMenuAnimate',
      'mediaMenuOpen',
      'mediaMenuAnimate',
    ].forEach((prop) => {
      expect(topnavElement[prop]).to.be.false;
    });
  });

  ['media', 'user'].forEach((menuType) => {
    it(`toggles ${menuType} menu open and animating`, async () => {
      const topnavElement = await fixture(html`<topnav-element></topnav-element>`);

      topnavElement[`${menuType}Menu`]();

      expect(topnavElement[`${menuType}MenuAnimate`]).to.be.true;
      expect(topnavElement[`${menuType}MenuOpen`]).to.be.true;
    });
  });

  it('toggles search menu open and animating', async () => {
    const topnavElement = await fixture(html`<topnav-element></topnav-element>`);

    topnavElement.searchMenu();

    expect(topnavElement.searchMenuAnimate).to.be.true;
    expect(topnavElement.searchMenuFade).to.be.true;
    expect(topnavElement.searchMenuOpen).to.be.true;
  });
});
